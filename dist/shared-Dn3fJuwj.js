import "./ToastProvider-BKjV21G4.js";
import { t as e } from "./cn-DhjIN-s0.js";
import { i as t } from "./DetailSection-DD8ayw5R.js";
import { t as n } from "./Button-BhS4-R6_.js";
import { t as r } from "./Card-RQCeAPNU.js";
import "./FormField-BpwfwG7t.js";
import "./IconButton-C3DMtvSx.js";
import { a as i } from "./ChoiceList-CqeHO1Cn.js";
import "./SegmentedControl-pVesnE3W.js";
import "./Banner-C3Wgh62A.js";
import "./Chart-DUoOhhMu.js";
import { c as a, f as o, l as s, p as c, s as l, t as u } from "./Chip-YhQI5B9P.js";
import { t as d } from "./overlayStack-BFH9XXvN.js";
import { t as f } from "./Modal-CyoyiNKN.js";
import "./ConfirmDialog-Cd8NZEXi.js";
import { t as p } from "./EmptyState-JzzL2z1E.js";
import "./PermissionDeniedCard-BMjG5fxY.js";
import { t as m } from "./Spinner-CLcq5z8N.js";
import { n as h, t as g } from "./CardHeader-gV2Grsqb.js";
import { i as _, n as v, r as y, t as b } from "./focusTrap-CmWJlptm.js";
import "./SkeletonCard-CGe8XFPB.js";
import { c as x, i as S, s as C } from "./ChannelHeader-C0n2KYEb.js";
import "./FileUploadDrop-BRRQBXdS.js";
import "./DockedPanelContext-pH9A5z1h.js";
import { t as w } from "./Input-DLknWXri.js";
import { t as T } from "./Textarea-Dz4doxTv.js";
import { n as E, t as D } from "./Avatar-BzicCOft.js";
import "./FloatingPanel-CclkXzq4.js";
import "./StatusDot-Bgx2zxgC.js";
import "./InlineAlert-Myf3oJZf.js";
import "./Badge-NPe_5OA9.js";
import "./PresenceAvatars-BkzMACtv.js";
import { t as O } from "./InlinePopover-DFdI8hw1.js";
import { t as k } from "./ActivityFeed-C9KAtqCl.js";
import { t as ee } from "./InlinePlaceholder-51dbPRGn.js";
import "./DropdownMenu-Claynsfu.js";
import "./ChangeDiff-CzO8zCc-.js";
import "./Select-CqVokE2v.js";
import "./NumberInput-PlADgrip.js";
import "./Slider-CUwLSARC.js";
import "./Checkbox-DqN9RkXK.js";
import { Children as te, createContext as ne, isValidElement as re, useCallback as A, useContext as ie, useEffect as j, useId as M, useLayoutEffect as ae, useMemo as N, useRef as P, useState as F } from "react";
import { Fragment as I, jsx as L, jsxs as R } from "react/jsx-runtime";
import { Command as z } from "cmdk";
import { createPortal as B } from "react-dom";
import oe from "react-markdown";
import se from "remark-gfm";
//#region src/components/ui/Icons.tsx
function V(e, t) {
	return {
		width: e,
		height: e,
		viewBox: "0 0 16 16",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: 1.5,
		strokeLinecap: "round",
		strokeLinejoin: "round",
		"aria-hidden": !0,
		...t
	};
}
function ce({ size: e = 16, ...t }) {
	return /* @__PURE__ */ L("svg", {
		...V(e, t),
		children: /* @__PURE__ */ L("path", { d: "M8 3.5v9M3.5 8h9" })
	});
}
function le({ size: e = 16, ...t }) {
	return /* @__PURE__ */ L("svg", {
		...V(e, t),
		children: /* @__PURE__ */ L("path", { d: "M4 4l8 8M12 4l-8 8" })
	});
}
function ue({ size: e = 16, ...t }) {
	return /* @__PURE__ */ L("svg", {
		...V(e, t),
		children: /* @__PURE__ */ L("path", { d: "M13.5 10a1.5 1.5 0 0 1-1.5 1.5H5.5L2.5 14V3.5A1.5 1.5 0 0 1 4 2h8a1.5 1.5 0 0 1 1.5 1.5z" })
	});
}
function de({ size: e = 16, ...t }) {
	return /* @__PURE__ */ L("svg", {
		...V(e, t),
		children: /* @__PURE__ */ L("path", { d: "M3 8.5V13a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V8.5M10.5 4.5 8 2 5.5 4.5M8 2v8" })
	});
}
function fe({ size: e = 16, dir: t = "down", ...n }) {
	let r = t === "down" ? "M4 6l4 4 4-4" : t === "up" ? "M4 10l4-4 4 4" : t === "left" ? "M10 4 6 8l4 4" : "M6 4l4 4-4 4";
	return /* @__PURE__ */ L("svg", {
		...V(e, n),
		children: /* @__PURE__ */ L("path", { d: r })
	});
}
function pe({ size: e = 16, ...t }) {
	return /* @__PURE__ */ R("svg", {
		...V(e, t),
		children: [/* @__PURE__ */ L("circle", {
			cx: "8",
			cy: "8",
			r: "5.5"
		}), /* @__PURE__ */ L("path", { d: "M8 5v3l2 1.5" })]
	});
}
function me({ size: e = 16, ...t }) {
	return /* @__PURE__ */ R("svg", {
		...V(e, t),
		children: [/* @__PURE__ */ L("path", { d: "M9.5 2H4.5A1.5 1.5 0 0 0 3 3.5v9A1.5 1.5 0 0 0 4.5 14h7a1.5 1.5 0 0 0 1.5-1.5V5.5z" }), /* @__PURE__ */ L("path", { d: "M9.5 2v3.5H13M6 9h4M6 11.5h4" })]
	});
}
//#endregion
//#region src/components/shared/CodeBlock.tsx
var he = /* @__PURE__ */ "import.export.from.as.const.let.var.function.return.default.if.else.switch.case.break.new.typeof.instanceof.in.of.interface.type.extends.implements.class.async.await.true.false.null.undefined.this.super.try.catch.finally.throw.for.while.do.continue.public.private.protected.readonly.static.enum".split("."), ge = [
	"if",
	"then",
	"else",
	"fi",
	"for",
	"do",
	"done",
	"while",
	"case",
	"esac",
	"function",
	"return",
	"export",
	"local",
	"in"
], _e = /* @__PURE__ */ "cd.ls.echo.cat.grep.sed.awk.find.cp.mv.rm.mkdir.rmdir.touch.chmod.chown.pwd.which.npm.yarn.pnpm.npx.git.node.curl.wget".split(".");
function ve(e) {
	return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function ye(e, t) {
	let n = e.replace(/(\/\/.*?)(\n|$)/g, `<span style="color:${t.comment}">$1</span>$2`);
	n = n.replace(/(\/\*[\s\S]*?\*\/)/g, `<span style="color:${t.comment}">$1</span>`), n = n.replace(/("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)/g, `<span style="color:${t.string}">$1</span>`);
	let r = RegExp(`\\b(${he.join("|")})\\b`, "g");
	return n = n.replace(r, `<span style="color:${t.keyword}">$1</span>`), n = n.replace(/\b(\d+(?:\.\d+)?)\b/g, `<span style="color:${t.number}">$1</span>`), n;
}
function be(e, t) {
	let n = e.replace(/("(?:[^"\\]|\\.)*")(\s*:)/g, `<span style="color:${t.property}">$1</span>$2`);
	return n = n.replace(/("(?:[^"\\]|\\.)*")/g, `<span style="color:${t.string}">$1</span>`), n = n.replace(/\b(true|false|null)\b/g, `<span style="color:${t.keyword}">$1</span>`), n = n.replace(/\b(-?\d+(?:\.\d+)?)\b/g, `<span style="color:${t.number}">$1</span>`), n;
}
function xe(e, t) {
	let n = e.replace(/(#.*?)(\n|$)/g, `<span style="color:${t.comment}">$1</span>$2`);
	n = n.replace(/("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')/g, `<span style="color:${t.string}">$1</span>`);
	let r = RegExp(`\\b(${ge.join("|")})\\b`, "g");
	n = n.replace(r, `<span style="color:${t.keyword}">$1</span>`);
	let i = RegExp(`\\b(${_e.join("|")})\\b`, "g");
	return n = n.replace(i, `<span style="color:${t.builtin}">$1</span>`), n = n.replace(/(\$\w+|\$\{[^}]+\})/g, `<span style="color:${t.variable}">$1</span>`), n;
}
var Se = {
	comment: "var(--color-neutral)",
	string: "#4ade80",
	keyword: "var(--color-state-pending)",
	number: "#fbbf24",
	property: "#7dd3fc",
	builtin: "#c4b5fd",
	variable: "#fbbf24"
}, Ce = {
	comment: "var(--color-neutral)",
	string: "#15803d",
	keyword: "var(--color-info-fg)",
	number: "#a16207",
	property: "#0369a1",
	builtin: "var(--color-cat-ai)",
	variable: "#a16207"
};
function we(e, t, n) {
	let r = n === "dark" ? Se : Ce, i = ve(e);
	switch (t) {
		case "json": return be(i, r);
		case "bash":
		case "sh": return xe(i, r);
		case "text": return i;
		default: return ye(i, r);
	}
}
function Te({ code: t, language: n = "tsx", theme: r = "dark", copyButton: i = !0, showLineNumbers: a = !1, className: o, style: s, "data-testid": c, ariaLabel: l }) {
	let [u, d] = F(!1), f = A(() => {
		typeof navigator > "u" || !navigator.clipboard || navigator.clipboard.writeText(t).then(() => {
			d(!0), setTimeout(() => d(!1), 1500);
		}).catch(() => {});
	}, [t]), p = r === "dark", m = N(() => t.split("\n"), [t]), h = N(() => we(t, n, r), [
		t,
		n,
		r
	]);
	return /* @__PURE__ */ R("div", {
		"data-testid": c,
		"data-language": n,
		"data-theme": r,
		className: e("relative rounded-lg border font-mono text-[13px] leading-relaxed overflow-hidden", p ? "bg-surface-inverse text-text-inverse border-border-emphasis" : "bg-surface-panel text-text-primary border-border", o),
		style: s,
		"aria-label": l ?? `Code (${n})`,
		children: [i && /* @__PURE__ */ L("button", {
			type: "button",
			onClick: f,
			"aria-label": u ? "Copied" : "Copy code",
			className: e("absolute top-2 right-2 text-[11px] px-2 py-1 rounded border transition-opacity", p ? "bg-surface-inverse text-text-inverse border-border-emphasis hover:bg-neutral" : "bg-surface text-text-primary border-border-emphasis hover:bg-surface-hover"),
			"data-copied": u ? "true" : "false",
			children: u ? "Copied" : "Copy"
		}), /* @__PURE__ */ L("pre", {
			className: "m-0 px-4 py-3 overflow-x-auto",
			children: a ? /* @__PURE__ */ R("div", {
				className: "flex",
				children: [/* @__PURE__ */ L("div", {
					className: e("select-none pr-3 text-right", p ? "text-neutral" : "text-text-tertiary"),
					"aria-hidden": "true",
					children: m.map((e, t) => /* @__PURE__ */ L("div", { children: t + 1 }, t))
				}), /* @__PURE__ */ L("code", {
					className: "flex-1 block",
					dangerouslySetInnerHTML: { __html: h }
				})]
			}) : /* @__PURE__ */ L("code", {
				className: "block",
				dangerouslySetInnerHTML: { __html: h }
			})
		})]
	});
}
//#endregion
//#region src/components/shared/CommandPalette.tsx
var Ee = "cui:command-palette:recents", De = 5;
function Oe(e, t) {
	if (!e || typeof window > "u") return [];
	try {
		let n = window.localStorage.getItem(e);
		if (!n) return [];
		let r = JSON.parse(n);
		return Array.isArray(r) ? r.filter((e) => typeof e == "string").slice(0, t) : [];
	} catch {
		return [];
	}
}
function ke(e, t) {
	if (!(!e || typeof window > "u")) try {
		window.localStorage.setItem(e, JSON.stringify(t));
	} catch {}
}
var Ae = ne(null);
function H() {
	let e = ie(Ae);
	if (!e) throw Error("useCommandPalette must be used inside a <CommandPaletteProvider>.");
	return e;
}
function je() {
	let { open: e, close: t, toggle: n, isOpen: r, query: i } = H();
	return {
		open: e,
		close: t,
		toggle: n,
		isOpen: r,
		query: i
	};
}
function U(e, t) {
	let n = t.toLowerCase().split("+").map((e) => e.trim()).filter(Boolean);
	if (n.length === 0) return !1;
	let r = n[n.length - 1], i = new Set(n.slice(0, -1)), a = i.has("cmd") || i.has("meta"), o = i.has("ctrl"), s = i.has("mod"), c = i.has("shift"), l = i.has("alt");
	if (s) {
		if (!e.metaKey && !e.ctrlKey) return !1;
	} else if (a !== e.metaKey || o !== e.ctrlKey) return !1;
	return c !== e.shiftKey || l !== e.altKey ? !1 : e.key.toLowerCase() === r;
}
function Me({ commands: e, getDynamicCommands: t, recentsKey: n = Ee, recentsLimit: r = De, children: i }) {
	let [a, o] = F(!1), [s, c] = F(""), [l, u] = F(() => /* @__PURE__ */ new Map()), [d, f] = F(() => Oe(n, r)), p = A((e) => {
		n !== null && f((t) => {
			let i = [e, ...t.filter((t) => t !== e)].slice(0, r);
			return ke(n, i), i;
		});
	}, [n, r]), m = A(() => o(!0), []), h = A(() => {
		o(!1), c("");
	}, []), g = A(() => o((e) => !e), []), _ = A((e) => {
		u((t) => {
			let n = new Map(t);
			return n.set(e.id, e), n;
		});
	}, []), v = A((e) => {
		u((t) => {
			if (!t.has(e)) return t;
			let n = new Map(t);
			return n.delete(e), n;
		});
	}, []);
	j(() => {
		let e = (e) => {
			(e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k" && (e.preventDefault(), o((e) => !e));
		};
		return window.addEventListener("keydown", e, !0), () => window.removeEventListener("keydown", e, !0);
	}, []);
	let y = N(() => {
		let n = t ? t(s) : [];
		return [
			...e ?? [],
			...n,
			...l.values()
		].filter((e) => !e.when || e.when());
	}, [
		e,
		t,
		s,
		l
	]), b = P(y);
	b.current = y, j(() => {
		let e = (e) => {
			if (!((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k")) {
				for (let t of b.current) if (t.hotkey && U(e, t.hotkey)) {
					e.preventDefault(), Promise.resolve().then(() => t.run());
					return;
				}
			}
		};
		return window.addEventListener("keydown", e), () => window.removeEventListener("keydown", e);
	}, []);
	let x = {
		open: m,
		close: h,
		toggle: g,
		isOpen: a,
		query: s,
		setQuery: c,
		mergedCommands: y,
		registerCommand: _,
		unregisterCommand: v,
		recents: d,
		noteSelection: p
	};
	return /* @__PURE__ */ L(Ae.Provider, {
		value: x,
		children: i
	});
}
function Ne(e) {
	let { registerCommand: t, unregisterCommand: n } = H();
	j(() => (t(e), () => n(e.id)), [
		e,
		t,
		n
	]);
}
function Pe(e) {
	let t = /* @__PURE__ */ new Map();
	for (let n of e) {
		let e = n.group ?? null, r = t.get(e);
		r ? r.push(n) : t.set(e, [n]);
	}
	return Array.from(t.entries()).map(([e, t]) => ({
		groupName: e,
		items: t
	}));
}
function Fe({ placeholder: t = "Type a command or search…", emptyState: n, className: r } = {}) {
	let { isOpen: i, close: a, query: o, setQuery: s, mergedCommands: c, recents: l, noteSelection: u } = H(), d = N(() => {
		if (o.trim() !== "" || l.length === 0) return [];
		let e = new Map(c.map((e) => [e.id, e]));
		return l.map((t) => e.get(t)).filter((e) => !!e);
	}, [
		c,
		o,
		l
	]), p = N(() => Pe(c), [c]), m = A((e) => {
		u(e.id), a(), Promise.resolve().then(() => e.run());
	}, [a, u]);
	return /* @__PURE__ */ L(f, {
		open: i,
		onClose: a,
		ariaLabel: "Command palette",
		maxWidth: 640,
		rawChildren: !0,
		backdropTestId: "command-palette-backdrop",
		children: /* @__PURE__ */ R(z, {
			label: "Command palette",
			value: void 0,
			className: e("flex flex-col gap-0 w-full", r),
			"data-testid": "command-palette",
			children: [/* @__PURE__ */ L(z.Input, {
				value: o,
				onValueChange: s,
				placeholder: t,
				"data-autofocus": !0,
				className: e("w-full px-3 py-2.5 text-sm border-0 border-b border-border", "outline-none bg-transparent text-text-primary placeholder:text-text-tertiary"),
				"data-testid": "command-palette-input"
			}), /* @__PURE__ */ R(z.List, {
				className: "max-h-[360px] overflow-y-auto py-2",
				children: [
					/* @__PURE__ */ L(z.Empty, {
						className: "px-3 py-6 text-center text-sm text-text-tertiary",
						children: n ?? "No results."
					}),
					d.length > 0 && /* @__PURE__ */ L(z.Group, {
						heading: "Recent",
						"data-testid": "command-palette-group-recent",
						children: d.map((t) => /* @__PURE__ */ R(z.Item, {
							value: `recent-${t.id} ${t.label}`,
							keywords: t.keywords,
							onSelect: () => m(t),
							"data-testid": `command-palette-recent-${t.id}`,
							className: e("flex items-center gap-2 px-3 py-2 mx-1 rounded-md cursor-pointer text-sm", "text-text-primary aria-selected:bg-surface-hover"),
							children: [t.icon && /* @__PURE__ */ L("span", {
								className: "shrink-0 text-text-secondary",
								children: t.icon
							}), /* @__PURE__ */ L("span", {
								className: "flex-1 truncate",
								children: t.label
							})]
						}, `recent-${t.id}`))
					}),
					p.map(({ groupName: t, items: n }) => /* @__PURE__ */ L(z.Group, {
						heading: t ?? void 0,
						children: n.map((t) => /* @__PURE__ */ R(z.Item, {
							value: `${t.id} ${t.label} ${(t.keywords ?? []).join(" ")}`,
							keywords: t.keywords,
							onSelect: () => m(t),
							"data-testid": `command-palette-item-${t.id}`,
							className: e("flex items-center gap-2 px-3 py-2 mx-1 rounded-md cursor-pointer text-sm", "text-text-primary aria-selected:bg-surface-hover"),
							children: [
								t.icon && /* @__PURE__ */ L("span", {
									className: "shrink-0 text-text-secondary",
									children: t.icon
								}),
								/* @__PURE__ */ L("span", {
									className: "flex-1 truncate",
									children: t.label
								}),
								t.hint && /* @__PURE__ */ L("span", {
									className: "text-xs text-text-tertiary truncate",
									children: t.hint
								}),
								t.shortcut && t.shortcut.length > 0 && /* @__PURE__ */ L("span", {
									className: "flex items-center gap-1 shrink-0",
									children: t.shortcut.map((n, r) => /* @__PURE__ */ L("kbd", {
										className: e("inline-flex items-center justify-center min-w-[18px] h-[18px] px-1", "text-[10px] font-mono font-medium", "bg-surface-hover text-text-secondary", "border border-border rounded"),
										children: n
									}, `${t.id}-kbd-${r}`))
								})
							]
						}, t.id))
					}, t ?? "__ungrouped__"))
				]
			})]
		})
	});
}
function Ie({ className: t } = {}) {
	let { toggle: n } = H();
	return /* @__PURE__ */ R("button", {
		type: "button",
		onClick: n,
		"data-testid": "command-palette-hint",
		className: e("inline-flex items-center gap-1.5 px-2 py-1 rounded-md", "text-xs text-text-secondary bg-surface-hover", "border border-border hover:bg-surface-panel", "cursor-pointer transition-colors", t),
		"aria-label": "Open command palette",
		children: [/* @__PURE__ */ L("kbd", {
			className: "font-mono text-[11px]",
			children: "⌘K"
		}), /* @__PURE__ */ L("span", { children: "Search" })]
	});
}
//#endregion
//#region src/components/shared/CapabilityDeniedFallback.tsx
var Le = "🔒";
function Re({ capabilityName: e, title: t, description: n, actionLabel: r, onAction: i, actions: a, icon: o, testId: s = "capability-denied-fallback" }) {
	let c = t ?? (e ? `${e} is unavailable` : "Feature unavailable"), l = n ?? (e ? `${e} is not enabled for this workspace. Contact your administrator to request access.` : "This feature is not enabled for your account. Contact your administrator to request access.");
	return /* @__PURE__ */ L(p, {
		icon: o === null ? void 0 : o ?? Le,
		title: c,
		description: l,
		actionLabel: r,
		onAction: i,
		actions: a,
		testId: s
	});
}
//#endregion
//#region src/components/shared/ErrorState.tsx
function ze({ icon: t = "⚠️", title: n, body: r, description: i, actionLabel: a, onAction: o, action: s, testId: c = "error-state", actionTestId: l = "error-state-action" }) {
	let u = i ?? r;
	return /* @__PURE__ */ R("div", {
		role: "alert",
		"data-testid": c,
		className: e("flex flex-col items-center justify-center min-h-[220px]", "text-text-secondary gap-2 p-8 font-[inherit]"),
		children: [
			t && (typeof t == "string" ? /* @__PURE__ */ L("div", {
				className: "text-[52px] mb-2",
				"aria-hidden": !0,
				children: t
			}) : /* @__PURE__ */ L("div", {
				className: "mb-2",
				children: t
			})),
			/* @__PURE__ */ L("div", {
				className: "text-[17px] font-semibold text-[var(--color-state-error,#dc2626)]",
				children: n
			}),
			u && /* @__PURE__ */ L("div", {
				className: "text-[13px] text-center max-w-[340px] text-text-secondary leading-normal",
				children: u
			}),
			s ? /* @__PURE__ */ L("div", {
				className: "mt-2.5",
				children: s
			}) : a && o && /* @__PURE__ */ L("button", {
				"data-testid": l,
				onClick: o,
				type: "button",
				className: e("mt-2.5 px-[22px] py-[9px] text-sm font-semibold", "bg-surface text-text-primary border border-border rounded-lg cursor-pointer font-[inherit]", "hover:bg-surface-panel"),
				children: a
			})
		]
	});
}
//#endregion
//#region src/components/shared/LoadingState.tsx
function Be({ label: t = "Loading…", description: n, spinnerSize: r = "lg", spinnerColor: i, testId: a = "loading-state" }) {
	return /* @__PURE__ */ R("div", {
		role: "status",
		"aria-live": "polite",
		"data-testid": a,
		className: e("flex flex-col items-center justify-center min-h-[220px]", "text-text-secondary gap-3 p-8 font-[inherit]"),
		children: [
			/* @__PURE__ */ L(m, {
				size: r,
				color: i,
				decorative: !0
			}),
			/* @__PURE__ */ L("div", {
				className: "text-[15px] font-medium text-text-primary",
				children: t
			}),
			n && /* @__PURE__ */ L("div", {
				className: "text-[13px] text-center max-w-[340px] text-text-secondary leading-normal",
				children: n
			})
		]
	});
}
//#endregion
//#region src/components/shared/ShortcutsHelp.tsx
var Ve = [
	{
		title: "Global",
		rows: [
			{
				keys: "⌘/Ctrl + K",
				action: "Command palette",
				planned: !0
			},
			{
				keys: "?",
				action: "Show shortcut help"
			},
			{
				keys: "g p",
				action: "Go to Pipelines",
				planned: !0
			},
			{
				keys: "g o",
				action: "Go to Observability dashboard",
				planned: !0
			}
		]
	},
	{
		title: "List view (/pipelines)",
		rows: [
			{
				keys: "Esc",
				action: "Clear selection"
			},
			{
				keys: "⌘/Ctrl + A",
				action: "Select all visible pipelines"
			},
			{
				keys: "Delete / Backspace",
				action: "Delete selected pipelines"
			},
			{
				keys: "⌘/Ctrl + N",
				action: "New pipeline",
				planned: !0
			},
			{
				keys: "/",
				action: "Focus search",
				planned: !0
			},
			{
				keys: "Enter",
				action: "Open focused pipeline in editor",
				planned: !0
			},
			{
				keys: "R",
				action: "Run focused pipeline (if published)",
				planned: !0
			}
		]
	},
	{
		title: "Editor (/pipelines/:id)",
		rows: [
			{
				keys: "⌘/Ctrl + S",
				action: "Save now"
			},
			{
				keys: "⌘/Ctrl + Enter",
				action: "Run (if published)"
			},
			{
				keys: "⌘/Ctrl + .",
				action: "Cancel running"
			},
			{
				keys: "⌘/Ctrl + Shift + P",
				action: "Publish"
			},
			{
				keys: "⌘/Ctrl + Z  /  ⌘/Ctrl + Shift + Z",
				action: "Undo / Redo"
			},
			{
				keys: "⌘/Ctrl + C / X / V / D",
				action: "Copy / Cut / Paste / Duplicate"
			},
			{
				keys: "⌘/Ctrl + A",
				action: "Select all nodes"
			},
			{
				keys: "⌘/Ctrl + F",
				action: "Focus palette search"
			},
			{
				keys: "Backspace / Delete",
				action: "Delete selection"
			},
			{
				keys: "1 – 8",
				action: "Insert node type by palette order"
			},
			{
				keys: "Arrow keys",
				action: "Nudge 4px"
			},
			{
				keys: "Shift + Arrow",
				action: "Nudge 16px"
			},
			{
				keys: "F",
				action: "Fit view"
			},
			{
				keys: "Shift + F",
				action: "Zoom to selection"
			},
			{
				keys: "⌘/Ctrl + 0",
				action: "Reset zoom to 1.0×"
			},
			{
				keys: "M",
				action: "Toggle minimap"
			},
			{
				keys: "G",
				action: "Toggle grid snap"
			},
			{
				keys: "⌘/Ctrl + /",
				action: "Toggle execution log"
			},
			{
				keys: "Space + drag",
				action: "Pan canvas"
			},
			{
				keys: "Esc",
				action: "Deselect / close config panel / close modal"
			}
		]
	},
	{
		title: "Replay view",
		rows: [
			{
				keys: "Space",
				action: "Play / pause",
				planned: !0
			},
			{
				keys: "j  /  ←",
				action: "Back 1 event",
				planned: !0
			},
			{
				keys: "k  /  →",
				action: "Forward 1 event",
				planned: !0
			},
			{
				keys: "Shift + J / ←",
				action: "Back 10 events",
				planned: !0
			},
			{
				keys: "Shift + K / →",
				action: "Forward 10 events",
				planned: !0
			},
			{
				keys: "Home",
				action: "Seek to start",
				planned: !0
			},
			{
				keys: "End",
				action: "Seek to end",
				planned: !0
			},
			{
				keys: "0 – 9",
				action: "Seek to 0% / 10% / … / 90%",
				planned: !0
			}
		]
	},
	{
		title: "Observability events view",
		rows: [
			{
				keys: "/",
				action: "Focus filter search",
				planned: !0
			},
			{
				keys: "L",
				action: "Toggle Live / Paused",
				planned: !0
			},
			{
				keys: "⌘/Ctrl + E",
				action: "Export JSONL",
				planned: !0
			},
			{
				keys: "Arrow keys",
				action: "Navigate event list",
				planned: !0
			},
			{
				keys: "Enter",
				action: "Open in detail pane",
				planned: !0
			}
		]
	}
];
function He({ open: t, onClose: n }) {
	return /* @__PURE__ */ R(f, {
		open: t,
		onClose: n,
		title: "Keyboard shortcuts",
		maxWidth: 560,
		cardStyle: {
			maxHeight: "85vh",
			display: "flex",
			flexDirection: "column"
		},
		rawChildren: !0,
		children: [
			/* @__PURE__ */ L("div", {
				className: "text-base font-semibold text-text-primary mb-2.5",
				children: "Keyboard shortcuts"
			}),
			/* @__PURE__ */ L("div", {
				className: "overflow-y-auto pr-1",
				children: Ve.map((t, n) => /* @__PURE__ */ R("div", { children: [/* @__PURE__ */ L("div", {
					className: e("text-[12px] font-bold text-text-primary uppercase tracking-[0.05em] mb-1.5", n === 0 ? "mt-0 pt-0" : "mt-4 pt-1.5 border-t border-border-subtle"),
					children: t.title
				}), /* @__PURE__ */ L("div", { children: t.rows.map((n, r) => /* @__PURE__ */ R("div", {
					className: e("flex items-baseline justify-between py-1 text-[13px] gap-4", n.planned && "opacity-60"),
					"data-planned": n.planned ? "true" : void 0,
					children: [/* @__PURE__ */ L("span", {
						className: e("font-mono text-[12px] border rounded px-1.5 py-px whitespace-nowrap shrink-0", n.planned ? "text-text-tertiary bg-surface border-border-subtle line-through" : "text-text-primary bg-surface-hover border-border"),
						children: n.keys
					}), /* @__PURE__ */ R("span", {
						className: "text-neutral text-right flex-1",
						children: [n.action, n.planned && /* @__PURE__ */ L("span", {
							className: "ml-1.5 text-[10px] uppercase tracking-wide text-text-tertiary",
							children: "planned"
						})]
					})]
				}, `${t.title}-${r}`)) })] }, t.title))
			}),
			/* @__PURE__ */ L("div", {
				className: "flex justify-end mt-[18px]",
				children: /* @__PURE__ */ L("button", {
					onClick: n,
					className: "py-1.5 px-3.5 text-[13px] font-semibold border border-border rounded-md bg-surface text-text-primary cursor-pointer font-[inherit]",
					children: "Close"
				})
			})
		]
	});
}
//#endregion
//#region src/components/shared/SkipLink.tsx
var Ue = {
	position: "fixed",
	top: "8px",
	left: "8px",
	zIndex: 1e3,
	padding: "8px 14px",
	borderRadius: "6px",
	fontSize: "14px",
	fontWeight: 600,
	textDecoration: "none",
	background: "var(--color-surface, #ffffff)",
	color: "var(--color-text-primary, #0f172a)",
	border: "1px solid var(--color-border, #cbd5e1)",
	outline: "2px solid var(--color-primary, #6366f1)",
	outlineOffset: "2px"
};
function We({ targetId: e = "main-content", children: t = "Skip to main content", className: n, onSkip: r }) {
	let [i, a] = F(!1);
	return /* @__PURE__ */ L("a", {
		href: `#${e}`,
		className: n,
		style: i ? Ue : C,
		onFocus: () => a(!0),
		onBlur: () => a(!1),
		onClick: () => {
			document.getElementById(e)?.focus(), r?.();
		},
		children: t
	});
}
//#endregion
//#region src/components/shared/LiveRegion.tsx
function Ge(e, t) {
	let [n, r] = F(e), i = P(e), a = P(0), o = P(null);
	return j(() => {
		if (i.current = e, t <= 0) {
			r(e);
			return;
		}
		let n = Date.now() - a.current;
		if (n >= t) {
			a.current = Date.now(), r(e);
			return;
		}
		o.current ||= setTimeout(() => {
			o.current = null, a.current = Date.now(), r(i.current);
		}, t - n);
	}, [e, t]), j(() => () => {
		o.current && clearTimeout(o.current);
	}, []), n;
}
function Ke({ message: e, politeness: t = "polite", atomic: n = !0, throttleMs: r = 0, role: i = "status", "data-testid": a }) {
	let o = Ge(e, r);
	return /* @__PURE__ */ L(x, {
		as: "div",
		"data-testid": a,
		children: /* @__PURE__ */ L("div", {
			...i === "none" ? null : { role: i },
			"aria-live": t,
			"aria-atomic": n,
			children: o
		})
	});
}
//#endregion
//#region src/components/shared/StatCard.tsx
var qe = {
	positive: "text-[var(--color-success)]",
	negative: "text-[var(--color-danger)]",
	neutral: "text-[var(--color-text-secondary)]"
};
function Je(e) {
	return e.tone ?? (e.direction === "up" ? "positive" : "negative");
}
function Ye({ label: t, value: n, accent: r = !1, danger: i = !1, hint: a, title: o, delta: s, sparklineData: c, to: l, as: u, onClick: d, mono: f = !1, className: p, style: m, "data-testid": g }) {
	let _ = e("block rounded-lg border p-3 no-underline transition-colors", !r && !i && "bg-[var(--color-surface)] border-[var(--color-border)]", r && "bg-[var(--color-primary-soft)] border-l-[3px] border-l-[var(--color-primary)] border-[var(--color-border)]", i && "bg-[var(--color-danger-bg)] border-l-[3px] border-l-[var(--color-danger)] border-[var(--color-border)]", (l || d) && "hover:bg-[var(--color-surface-hover)] cursor-pointer", p), v = c && c.length > 0 ? c : null, y = null;
	if (s) {
		let t = Je(s), n = s.direction === "up" ? "▲" : "▼", r = s.direction === "up" ? "+" : "-", i = s.suffix ?? "%", a = Math.abs(s.value), o = s["aria-label"] ?? `${s.direction} ${a}${i}`;
		y = /* @__PURE__ */ R("div", {
			"data-testid": "stat-card-delta",
			"data-direction": s.direction,
			"data-tone": t,
			"aria-label": o,
			className: e("mt-1 text-[12px] font-medium leading-tight", qe[t]),
			children: [
				/* @__PURE__ */ R("span", {
					"aria-hidden": "true",
					children: [n, " "]
				}),
				r,
				a,
				i
			]
		});
	}
	let b = /* @__PURE__ */ R(I, { children: [
		/* @__PURE__ */ L("div", {
			className: "text-[12px] uppercase tracking-wide text-[var(--color-text-tertiary)]",
			children: t
		}),
		/* @__PURE__ */ R("div", {
			className: "mt-1 flex items-center gap-2",
			children: [/* @__PURE__ */ L("div", {
				className: e("text-[24px] font-bold leading-tight text-[var(--color-text-primary)]", f && "font-mono"),
				children: n
			}), v && /* @__PURE__ */ L(h, {
				data: v,
				width: 80,
				height: 20
			})]
		}),
		y,
		a != null && /* @__PURE__ */ L("div", {
			className: "mt-1 text-[11px] italic text-[var(--color-text-tertiary)]",
			children: a
		})
	] });
	return l ? u ? /* @__PURE__ */ L(u, {
		to: l,
		title: o,
		"data-testid": g,
		className: _,
		style: m,
		children: b
	}) : /* @__PURE__ */ L("a", {
		href: l,
		title: o,
		"data-testid": g,
		className: _,
		style: m,
		children: b
	}) : d ? /* @__PURE__ */ L("button", {
		type: "button",
		onClick: d,
		title: o,
		"data-testid": g,
		className: e(_, "w-full text-left"),
		style: m,
		children: b
	}) : /* @__PURE__ */ L("div", {
		"data-testid": g,
		title: o,
		className: _,
		style: m,
		children: b
	});
}
//#endregion
//#region src/components/shared/FollowBanner.tsx
function Xe({ name: t, onStop: n, autoStopOnInteract: r = !0, className: i, "data-testid": a = "follow-banner" }) {
	let o = P(null);
	return j(() => {
		if (!t || !r) return;
		let e = setTimeout(() => {
			let e = () => n(), t = [
				"mousedown",
				"keydown",
				"wheel"
			];
			for (let n of t) window.addEventListener(n, e, {
				once: !0,
				passive: !0
			});
			o.current = () => {
				for (let n of t) window.removeEventListener(n, e);
			};
		}, 500);
		return () => {
			clearTimeout(e), o.current?.(), o.current = null;
		};
	}, [
		t,
		r,
		n
	]), t ? /* @__PURE__ */ R("div", {
		"data-testid": a,
		className: e("flex items-center justify-center gap-2 px-4 py-1.5 shrink-0", "bg-info-bg border-b border-info-border text-info-fg text-[12.5px] font-medium", i),
		children: [/* @__PURE__ */ R("span", { children: ["Following ", t] }), /* @__PURE__ */ L("button", {
			type: "button",
			onClick: n,
			className: "text-[11.5px] font-semibold px-2 py-0.5 rounded border border-info-border bg-transparent text-info-fg cursor-pointer",
			children: "Stop"
		})]
	}) : null;
}
//#endregion
//#region src/components/shared/SuggestionCard.tsx
function W({ reason: t, title: n, label: r, tone: i = "neutral", meta: a, context: o, onSelect: c, actionLabel: l = "Use this", disabled: u = !1, className: d, "data-testid": f }) {
	return /* @__PURE__ */ R("button", {
		type: "button",
		"data-testid": f,
		onClick: c,
		disabled: u,
		"aria-label": `${n} — ${t}`,
		className: e("group w-full text-left flex flex-col gap-1.5 rounded-lg border p-3 transition-colors", "border-border bg-surface hover:border-border-emphasis hover:bg-surface-hover", "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1", u ? "opacity-60 cursor-not-allowed" : "cursor-pointer", d),
		children: [
			/* @__PURE__ */ R("span", {
				className: "flex items-center gap-2 min-w-0",
				children: [r && /* @__PURE__ */ L("span", {
					className: e("shrink-0 text-[10px] font-semibold uppercase tracking-wide px-1.5 py-0.5 rounded", s[i]),
					children: r
				}), /* @__PURE__ */ L("span", {
					className: "text-[11px] text-text-secondary truncate",
					children: t
				})]
			}),
			/* @__PURE__ */ L("span", {
				className: "text-[13px] font-medium text-text-primary line-clamp-2",
				children: n
			}),
			(a || o) && /* @__PURE__ */ R("span", {
				className: "flex items-center gap-2 text-[11px] text-text-tertiary min-w-0",
				children: [a, o && /* @__PURE__ */ L("span", {
					className: "truncate",
					children: o
				})]
			}),
			/* @__PURE__ */ R("span", {
				"aria-hidden": "true",
				className: "text-[11px] font-semibold text-primary opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity",
				children: [l, " →"]
			})
		]
	});
}
//#endregion
//#region src/components/shared/TaskComposer.tsx
function Ze({ title: t, description: r, titlePlaceholder: i = "Title", promptPlaceholder: a = "What should it do?", suggestions: o, suggestionsTitle: s = "Suggested next", suggestionsLoading: c = !1, suggestionsEmpty: l, onSubmit: u, onChooseSuggestion: d, submitLabel: f = "Queue", hint: p, busy: m = !1, className: h, "data-testid": g }) {
	let [_, v] = F(""), [y, b] = F(""), [x, S] = F(void 0), C = M(), E = M();
	j(() => {
		x && o && !o.some((e) => e.id === x) && S(void 0);
	}, [x, o]);
	let D = _.trim().length > 0 && y.trim().length > 0 && !m;
	function O() {
		D && (u({
			title: _.trim(),
			prompt: y.trim(),
			...x ? { suggestionId: x } : {}
		}), v(""), b(""), S(void 0));
	}
	function k(e) {
		d?.(e), v(e.fillTitle ?? e.title), b(e.prompt), S(e.id);
	}
	let ee = c || (o?.length ?? 0) > 0 || !!l;
	return /* @__PURE__ */ R("section", {
		"data-testid": g,
		className: e("rounded-lg border border-border bg-surface overflow-hidden", h),
		children: [
			/* @__PURE__ */ R("div", {
				className: "px-3.5 pt-3 pb-1",
				children: [/* @__PURE__ */ L("h3", {
					className: "text-xs font-semibold text-text-secondary tracking-wide select-none uppercase",
					children: t
				}), r && /* @__PURE__ */ L("p", {
					className: "mt-1 text-[12px] text-text-tertiary",
					children: r
				})]
			}),
			ee && /* @__PURE__ */ R("div", {
				className: "px-3.5 pt-2 pb-1",
				children: [/* @__PURE__ */ L("div", {
					className: "text-[11px] font-semibold text-text-tertiary tracking-wide uppercase mb-2",
					children: s
				}), c ? /* @__PURE__ */ L("div", {
					className: "grid gap-2 sm:grid-cols-2 lg:grid-cols-4",
					"aria-busy": "true",
					children: [
						0,
						1,
						2,
						3
					].map((e) => /* @__PURE__ */ L("div", { className: "h-[92px] rounded-lg border border-border bg-surface-panel animate-pulse" }, e))
				}) : (o?.length ?? 0) > 0 ? /* @__PURE__ */ L("div", {
					className: "grid gap-2 sm:grid-cols-2 lg:grid-cols-4",
					children: o.map((e) => /* @__PURE__ */ L(W, {
						"data-testid": `suggestion-${e.id}`,
						reason: e.reason,
						title: e.title,
						...e.label ? { label: e.label } : {},
						...e.tone ? { tone: e.tone } : {},
						...e.meta ? { meta: e.meta } : {},
						...e.context ? { context: e.context } : {},
						onSelect: () => k(e),
						disabled: m
					}, e.id))
				}) : /* @__PURE__ */ L("div", {
					className: "text-[12px] text-text-tertiary",
					children: l
				})]
			}),
			/* @__PURE__ */ R("div", {
				className: "px-3.5 pt-2 pb-2 flex flex-col gap-2",
				children: [
					/* @__PURE__ */ L("label", {
						className: "sr-only",
						htmlFor: C,
						children: i
					}),
					/* @__PURE__ */ L(w, {
						id: C,
						value: _,
						onChange: (e) => v(e.target.value),
						placeholder: i,
						disabled: m
					}),
					/* @__PURE__ */ L("label", {
						className: "sr-only",
						htmlFor: E,
						children: a
					}),
					/* @__PURE__ */ L(T, {
						id: E,
						value: y,
						onChange: (e) => b(e.target.value),
						placeholder: a,
						disabled: m,
						rows: 3,
						onKeyDown: (e) => {
							e.key === "Enter" && (e.metaKey || e.ctrlKey) && (e.preventDefault(), O());
						}
					})
				]
			}),
			/* @__PURE__ */ R("div", {
				className: "px-3.5 pb-3 flex items-center gap-3",
				children: [
					p && /* @__PURE__ */ L("span", {
						className: "text-[11px] text-text-tertiary select-none",
						children: p
					}),
					/* @__PURE__ */ L("span", { className: "flex-1" }),
					/* @__PURE__ */ L(n, {
						size: "sm",
						onClick: O,
						disabled: !D,
						children: m ? "Queueing…" : f
					})
				]
			})
		]
	});
}
//#endregion
//#region src/components/shared/ExpertCard.tsx
var G = 4, Qe = 3;
function $e({ name: t, title: r, subtitle: i, imageUrl: a, matchedSkills: o, otherSkills: s = [], contexts: c = [], evidence: l = [], evidenceLabel: d = "Seen in", onAsk: f, askLabel: p = "Ask for help", footerExtra: m, onOpen: h, className: g, "data-testid": _ }) {
	let v = s.filter((e) => !o.some((t) => t.name.toLowerCase() === e.toLowerCase())), y = l.slice(0, Qe), b = v.slice(0, G);
	return /* @__PURE__ */ R("div", {
		"data-testid": _,
		onClick: h,
		className: e("flex flex-col gap-2.5 rounded-lg border border-border bg-surface p-3.5 min-w-0", h && "cursor-pointer hover:border-border-emphasis hover:bg-surface-hover transition-colors", g),
		children: [
			/* @__PURE__ */ R("div", {
				className: "flex items-center gap-2.5 min-w-0",
				children: [/* @__PURE__ */ L(D, {
					name: t,
					size: 36,
					...a ? { src: a } : {}
				}), /* @__PURE__ */ R("div", {
					className: "flex flex-col min-w-0",
					children: [/* @__PURE__ */ L("span", {
						className: "text-[13.5px] font-semibold text-text-primary truncate",
						children: t
					}), (r || i) && /* @__PURE__ */ R("span", {
						className: "text-[11.5px] text-text-secondary truncate",
						children: [
							r,
							r && i ? " · " : "",
							i
						]
					})]
				})]
			}),
			o.length > 0 && /* @__PURE__ */ R("div", {
				className: "flex flex-wrap items-center gap-1",
				children: [
					o.map((e) => /* @__PURE__ */ L(u, {
						tone: "accent",
						size: "xs",
						solid: (e.strength ?? 0) >= .7,
						children: e.name
					}, e.name)),
					b.map((e) => /* @__PURE__ */ L(u, {
						tone: "neutral",
						size: "xs",
						children: e
					}, e)),
					v.length > G && /* @__PURE__ */ R("span", {
						className: "text-[10.5px] text-text-tertiary",
						children: ["+", v.length - G]
					})
				]
			}),
			c.length > 0 && /* @__PURE__ */ R("div", {
				className: "text-[11px] text-text-tertiary truncate",
				title: c.join(", "),
				children: ["Working on ", c.join(", ")]
			}),
			y.length > 0 && /* @__PURE__ */ R("div", {
				className: "flex flex-col gap-1 min-w-0",
				children: [/* @__PURE__ */ L("span", {
					className: "text-[10px] font-semibold uppercase tracking-wide text-text-tertiary select-none",
					children: d
				}), y.map((e) => /* @__PURE__ */ R("div", {
					className: "flex items-center gap-1.5 min-w-0",
					children: [e.source && /* @__PURE__ */ L(u, {
						tone: "neutral",
						size: "xs",
						mono: !0,
						children: e.source
					}), e.href ? /* @__PURE__ */ L("a", {
						href: e.href,
						onClick: (e) => e.stopPropagation(),
						className: "text-[11.5px] text-text-secondary no-underline hover:underline truncate",
						children: e.title
					}) : /* @__PURE__ */ L("span", {
						className: "text-[11.5px] text-text-secondary truncate",
						children: e.title
					})]
				}, e.id))]
			}),
			(f || m) && /* @__PURE__ */ R("div", {
				className: "mt-auto pt-1 flex items-center gap-2",
				children: [
					m,
					/* @__PURE__ */ L("span", { className: "flex-1" }),
					f && /* @__PURE__ */ L(n, {
						size: "sm",
						onClick: (e) => {
							e.stopPropagation(), f();
						},
						children: p
					})
				]
			})
		]
	});
}
//#endregion
//#region src/components/shared/ConsultCard.tsx
var et = {
	pending: "warning",
	answered: "success",
	expired: "neutral",
	withdrawn: "neutral"
};
function tt({ question: t, context: r, origin: i = [], askedAt: a, status: o, answer: s, answeredBy: c, onAnswer: l, answerPlaceholder: d = "Answer the agent — it is waiting on this…", busy: f = !1, footer: p, flush: m = !1, className: h, "data-testid": g }) {
	let [_, v] = F(""), y = _.trim().length > 0 && !f;
	function b() {
		!y || !l || (l(_.trim()), v(""));
	}
	return /* @__PURE__ */ R("section", {
		"data-testid": g,
		className: e("flex flex-col gap-2.5 min-w-0", !m && "rounded-lg border bg-surface p-3.5", !m && (o === "pending" ? "border-warning/50" : "border-border"), h),
		children: [
			/* @__PURE__ */ R("div", {
				className: "flex items-center gap-2 min-w-0",
				children: [
					/* @__PURE__ */ L(u, {
						tone: et[o],
						size: "xs",
						dot: o === "pending" ? "pulse" : "static",
						uppercase: !0,
						children: o === "pending" ? "agent waiting" : o
					}),
					i.map((e) => /* @__PURE__ */ L(u, {
						tone: "neutral",
						size: "xs",
						mono: !0,
						children: e
					}, e)),
					/* @__PURE__ */ L("span", { className: "flex-1" }),
					a && /* @__PURE__ */ L("span", {
						className: "text-[10.5px] text-text-tertiary whitespace-nowrap",
						children: a
					})
				]
			}),
			/* @__PURE__ */ L("p", {
				className: "m-0 text-[13.5px] font-medium text-text-primary leading-snug",
				children: t
			}),
			r && /* @__PURE__ */ L("p", {
				className: "m-0 text-[12px] text-text-secondary leading-snug border-l-2 border-border pl-2.5",
				children: r
			}),
			o === "answered" && s && /* @__PURE__ */ R("div", {
				className: "flex flex-col gap-1",
				children: [/* @__PURE__ */ R("span", {
					className: "text-[10px] font-semibold uppercase tracking-wide text-text-tertiary select-none",
					children: ["Answer", c ? ` — ${c}` : ""]
				}), /* @__PURE__ */ L("p", {
					className: "m-0 text-[12.5px] text-text-primary leading-snug",
					children: s
				})]
			}),
			o === "expired" && /* @__PURE__ */ L("p", {
				className: "m-0 text-[11.5px] text-text-tertiary",
				children: "Expired unanswered — the agent stopped waiting."
			}),
			o === "pending" && l && /* @__PURE__ */ R("div", {
				className: "flex flex-col gap-2",
				children: [/* @__PURE__ */ L(T, {
					value: _,
					onChange: (e) => v(e.target.value),
					placeholder: d,
					rows: 2,
					disabled: f,
					onKeyDown: (e) => {
						e.key === "Enter" && (e.metaKey || e.ctrlKey) && (e.preventDefault(), b());
					}
				}), /* @__PURE__ */ R("div", {
					className: "flex items-center gap-2",
					children: [
						p,
						/* @__PURE__ */ L("span", { className: "flex-1" }),
						/* @__PURE__ */ L(n, {
							size: "sm",
							onClick: b,
							disabled: !y,
							children: f ? "Sending…" : "Send answer"
						})
					]
				})]
			}),
			(o !== "pending" || !l) && p && /* @__PURE__ */ L("div", {
				className: "flex items-center gap-2",
				children: p
			})
		]
	});
}
//#endregion
//#region src/components/shared/DiffViewer.tsx
var nt = /^@@ -(\d+)(?:,\d+)? \+(\d+)(?:,\d+)? @@/;
function K(e) {
	let t = [], n = null, r = 0, i = 0;
	for (let a of e.split("\n")) {
		if (a.startsWith("diff --git ")) {
			let e = a.match(/^diff --git a\/(.*) b\/(.*)$/);
			n = {
				path: e?.[2] ?? a.slice(11),
				oldPath: e && e[1] !== e[2] ? e[1] : null,
				status: e && e[1] !== e[2] ? "renamed" : "modified",
				adds: 0,
				dels: 0,
				lines: [],
				binary: !1
			}, t.push(n);
			continue;
		}
		if (!n) continue;
		if (a.startsWith("new file mode")) {
			n.status = "added";
			continue;
		}
		if (a.startsWith("deleted file mode")) {
			n.status = "deleted";
			continue;
		}
		if (a.startsWith("Binary files ")) {
			n.binary = !0;
			continue;
		}
		if (a.startsWith("index ") || a.startsWith("--- ") || a.startsWith("+++ ") || a.startsWith("similarity index") || a.startsWith("rename from") || a.startsWith("rename to")) continue;
		let e = a.match(nt);
		if (e) {
			r = parseInt(e[1], 10), i = parseInt(e[2], 10), n.lines.push({
				kind: "hunk",
				text: a,
				oldNo: null,
				newNo: null
			});
			continue;
		}
		if (n.lines.length !== 0) {
			if (a.startsWith("+")) n.lines.push({
				kind: "add",
				text: a.slice(1),
				oldNo: null,
				newNo: i++
			}), n.adds++;
			else if (a.startsWith("-")) n.lines.push({
				kind: "del",
				text: a.slice(1),
				oldNo: r++,
				newNo: null
			}), n.dels++;
			else if (a.startsWith("\\")) continue;
			else n.lines.push({
				kind: "ctx",
				text: a.startsWith(" ") ? a.slice(1) : a,
				oldNo: r++,
				newNo: i++
			});
		}
	}
	return t;
}
var rt = {
	added: "success",
	deleted: "danger",
	renamed: "info",
	modified: "neutral"
}, it = {
	critical: "danger",
	warning: "warning",
	info: "info"
}, q = {
	add: "bg-success-bg/40",
	del: "bg-danger-bg/40",
	ctx: "",
	hunk: "bg-surface-hover"
};
function J({ a: e }) {
	return /* @__PURE__ */ R("div", {
		className: "flex items-start gap-2 px-3 py-2 border-y border-border bg-surface-panel",
		children: [/* @__PURE__ */ L(u, {
			tone: it[e.severity ?? "info"],
			size: "xs",
			uppercase: !0,
			children: e.severity ?? "note"
		}), /* @__PURE__ */ R("div", {
			className: "min-w-0",
			children: [/* @__PURE__ */ L("span", {
				className: "text-[12px] text-text-primary leading-snug",
				children: e.note
			}), e.author && /* @__PURE__ */ R("span", {
				className: "ml-2 text-[10.5px] text-text-tertiary whitespace-nowrap",
				children: ["— ", e.author]
			})]
		})]
	});
}
function at({ file: t, annotations: n, collapsed: r, onToggle: i, maxLines: a }) {
	let { pinned: o, floating: s } = N(() => {
		let e = /* @__PURE__ */ new Map(), r = [], i = new Set(t.lines.filter((e) => e.newNo != null).map((e) => e.newNo));
		for (let t of n) if (t.line != null && i.has(t.line)) {
			let n = e.get(t.line) ?? [];
			n.push(t), e.set(t.line, n);
		} else r.push(t);
		return {
			pinned: e,
			floating: r
		};
	}, [t, n]), c = t.lines.slice(0, a), l = t.lines.length > a;
	return /* @__PURE__ */ R("div", {
		className: "border border-border rounded-lg overflow-hidden bg-surface",
		children: [/* @__PURE__ */ R("button", {
			type: "button",
			onClick: i,
			"aria-expanded": !r,
			className: "w-full flex items-center gap-2 px-3 py-2 bg-surface-panel border-0 cursor-pointer text-left hover:bg-surface-hover min-w-0",
			children: [
				/* @__PURE__ */ L("span", {
					"aria-hidden": !0,
					className: "text-[10px] text-text-tertiary",
					children: r ? "▸" : "▾"
				}),
				/* @__PURE__ */ L("span", {
					className: "text-[12px] font-mono font-semibold text-text-primary truncate",
					children: t.oldPath ? `${t.oldPath} → ${t.path}` : t.path
				}),
				/* @__PURE__ */ L(u, {
					tone: rt[t.status],
					size: "xs",
					children: t.status
				}),
				n.length > 0 && /* @__PURE__ */ R(u, {
					tone: "warning",
					size: "xs",
					mono: !0,
					children: [
						n.length,
						" note",
						n.length === 1 ? "" : "s"
					]
				}),
				/* @__PURE__ */ L("span", { className: "flex-1" }),
				/* @__PURE__ */ R("span", {
					className: "text-[11px] font-mono tabular-nums whitespace-nowrap",
					children: [
						/* @__PURE__ */ R("span", {
							className: "text-success",
							children: ["+", t.adds]
						}),
						" ",
						/* @__PURE__ */ R("span", {
							className: "text-danger",
							children: ["−", t.dels]
						})
					]
				})
			]
		}), !r && /* @__PURE__ */ R("div", {
			className: "overflow-x-auto",
			children: [s.map((e, t) => /* @__PURE__ */ L(J, { a: e }, `f${t}`)), t.binary ? /* @__PURE__ */ L("div", {
				className: "px-3 py-2 text-[12px] text-text-tertiary",
				children: "Binary file — no text diff."
			}) : /* @__PURE__ */ L("table", {
				className: "w-full border-collapse font-mono text-[11.5px] leading-[1.5]",
				children: /* @__PURE__ */ R("tbody", { children: [c.map((t, n) => t.kind === "hunk" ? /* @__PURE__ */ L("tr", {
					className: q.hunk,
					children: /* @__PURE__ */ L("td", {
						colSpan: 3,
						className: "px-3 py-0.5 text-[10.5px] text-text-tertiary select-none",
						children: t.text
					})
				}, n) : /* @__PURE__ */ R(I, { children: [/* @__PURE__ */ R("tr", {
					className: q[t.kind],
					children: [
						/* @__PURE__ */ L("td", {
							className: "w-[3.2em] px-1.5 text-right text-[10px] text-text-tertiary select-none align-top tabular-nums border-r border-border/60",
							children: t.oldNo ?? ""
						}),
						/* @__PURE__ */ L("td", {
							className: "w-[3.2em] px-1.5 text-right text-[10px] text-text-tertiary select-none align-top tabular-nums border-r border-border/60",
							children: t.newNo ?? ""
						}),
						/* @__PURE__ */ R("td", {
							className: e("px-2 whitespace-pre align-top", t.kind === "add" && "text-success", t.kind === "del" && "text-danger", t.kind === "ctx" && "text-text-secondary"),
							children: [/* @__PURE__ */ L("span", {
								className: "select-none inline-block w-[1ch] mr-1 text-text-tertiary",
								children: t.kind === "add" ? "+" : t.kind === "del" ? "-" : " "
							}), t.text || " "]
						})
					]
				}, n), t.newNo != null && o.get(t.newNo)?.map((e, t) => /* @__PURE__ */ L("tr", { children: /* @__PURE__ */ L("td", {
					colSpan: 3,
					className: "p-0",
					children: /* @__PURE__ */ L(J, { a: e })
				}) }, `${n}-a${t}`))] })), l && /* @__PURE__ */ L("tr", { children: /* @__PURE__ */ R("td", {
					colSpan: 3,
					className: "px-3 py-1.5 text-[11px] text-text-tertiary",
					children: [
						"… ",
						t.lines.length - a,
						" more lines in this file not shown."
					]
				}) })] })
			})]
		})]
	});
}
function ot({ diff: t, annotations: n = [], defaultCollapsed: r = !1, maxLinesPerFile: i = 800, truncatedNote: a, className: o, "data-testid": s }) {
	let c = N(() => K(t), [t]), [l, u] = F(() => r ? new Set(c.map((e) => e.path)) : /* @__PURE__ */ new Set()), d = P(/* @__PURE__ */ new Map()), f = N(() => {
		let e = /* @__PURE__ */ new Map();
		for (let t of n) {
			let n = e.get(t.file) ?? [];
			n.push(t), e.set(t.file, n);
		}
		return e;
	}, [n]);
	function p(e) {
		u((t) => {
			let n = new Set(t);
			return n.has(e) ? n.delete(e) : n.add(e), n;
		});
	}
	function m(e) {
		u((t) => {
			let n = new Set(t);
			return n.delete(e), n;
		}), requestAnimationFrame(() => {
			d.current.get(e)?.scrollIntoView({
				behavior: "smooth",
				block: "start"
			});
		});
	}
	if (c.length === 0) return /* @__PURE__ */ L("div", {
		"data-testid": s,
		className: e("text-[12px] text-text-tertiary", o),
		children: "No parseable diff."
	});
	let h = c.reduce((e, t) => e + t.adds, 0), g = c.reduce((e, t) => e + t.dels, 0);
	return /* @__PURE__ */ R("div", {
		"data-testid": s,
		className: e("flex flex-col gap-2 min-w-0", o),
		children: [
			/* @__PURE__ */ R("div", {
				className: "flex items-center gap-1.5 flex-wrap",
				children: [/* @__PURE__ */ R("span", {
					className: "text-[11px] text-text-secondary font-medium whitespace-nowrap",
					children: [
						c.length,
						" file",
						c.length === 1 ? "" : "s",
						" ",
						/* @__PURE__ */ R("span", {
							className: "font-mono tabular-nums",
							children: [
								/* @__PURE__ */ R("span", {
									className: "text-success",
									children: ["+", h]
								}),
								" ",
								/* @__PURE__ */ R("span", {
									className: "text-danger",
									children: ["−", g]
								})
							]
						})
					]
				}), c.map((t) => /* @__PURE__ */ L("button", {
					type: "button",
					onClick: () => m(t.path),
					title: t.path,
					className: e("px-1.5 py-0.5 rounded border border-border bg-surface text-[10.5px] font-mono cursor-pointer", "text-text-secondary hover:border-border-emphasis hover:text-text-primary truncate max-w-[220px]", (f.get(t.path)?.length ?? 0) > 0 && "border-warning/60"),
					children: t.path.split("/").pop()
				}, t.path))]
			}),
			a && /* @__PURE__ */ L("div", {
				className: "text-[11px] text-warning",
				children: a
			}),
			c.map((e) => /* @__PURE__ */ L("div", {
				ref: (t) => {
					d.current.set(e.path, t);
				},
				children: /* @__PURE__ */ L(at, {
					file: e,
					annotations: f.get(e.path) ?? [],
					collapsed: l.has(e.path),
					onToggle: () => p(e.path),
					maxLines: i
				})
			}, e.path))
		]
	});
}
//#endregion
//#region src/components/shared/KPIGrid.tsx
var st = {
	1: "sm:grid-cols-1",
	2: "sm:grid-cols-2",
	3: "sm:grid-cols-3",
	4: "sm:grid-cols-4"
};
function ct({ children: t, columns: n = 4, dense: r = !1, className: i, style: a, "data-testid": o = "kpi-grid" }) {
	return /* @__PURE__ */ L("div", {
		"data-testid": o,
		className: e("grid grid-cols-1", st[n], r ? "gap-2" : "gap-4", i),
		style: a,
		children: t
	});
}
//#endregion
//#region src/components/shared/ProgressBar.tsx
var lt = {
	sm: "h-1.5",
	md: "h-2"
};
function ut({ value: t, max: n = 100, color: r, size: i = "md", label: a, showRatio: o = !0, className: s, style: c, "data-testid": l, "aria-label": u }) {
	let d = n > 0 ? n : 100, f = Math.max(0, Math.min(t, d)), p = Math.min(100, f / d * 100), m = r ?? "var(--color-primary)";
	return /* @__PURE__ */ R("div", {
		"data-testid": l,
		className: e("w-full", s),
		style: c,
		children: [a != null && /* @__PURE__ */ R("div", {
			className: "flex items-center justify-between mb-1 text-[12px] text-[var(--color-text-secondary)]",
			children: [/* @__PURE__ */ L("span", { children: a }), /* @__PURE__ */ L("span", {
				className: "text-[var(--color-text-tertiary)] tabular-nums",
				children: o ? `${f}/${d}` : `${Math.round(p)}%`
			})]
		}), /* @__PURE__ */ L("div", {
			role: "progressbar",
			"aria-valuenow": f,
			"aria-valuemin": 0,
			"aria-valuemax": d,
			"aria-label": u,
			className: e("w-full rounded-full overflow-hidden bg-[var(--color-surface-hover)]", lt[i]),
			children: /* @__PURE__ */ L("div", {
				className: "h-full rounded-full transition-all duration-300",
				style: {
					width: `${p}%`,
					background: m
				}
			})
		})]
	});
}
//#endregion
//#region src/components/shared/UserChip.tsx
function dt({ name: t, label: n, avatarSize: r = 20, avatarColor: a, presence: o, onClick: s, className: c, style: l, title: u, "data-testid": d = "user-chip" }) {
	return /* @__PURE__ */ R(s ? "button" : "span", {
		type: s ? "button" : void 0,
		onClick: s,
		title: u ?? t,
		"data-testid": d,
		className: e("inline-flex items-center gap-1.5 rounded-full px-1.5 py-0.5 text-[12px] text-text-primary", s && "hover:bg-surface-hover cursor-pointer transition-colors", !s && "cursor-default", c),
		style: l,
		children: [
			/* @__PURE__ */ L(D, {
				name: t,
				size: r,
				color: a
			}),
			/* @__PURE__ */ L("span", {
				className: "font-medium leading-none",
				children: n ?? t
			}),
			o && /* @__PURE__ */ L(i, {
				state: o,
				size: "xs"
			})
		]
	});
}
//#endregion
//#region src/components/shared/EntityCell.tsx
function ft({ label: t, id: n, href: r, mono: i = !1, className: a, labelClassName: o }) {
	let s = /* @__PURE__ */ L("span", {
		className: "truncate",
		children: t
	});
	return /* @__PURE__ */ R("div", {
		className: e("flex flex-col min-w-0", a),
		children: [/* @__PURE__ */ L("div", {
			className: e("font-medium text-[var(--color-text-primary)] truncate text-sm", o),
			children: r ? /* @__PURE__ */ L("a", {
				href: r,
				className: "hover:text-[var(--color-primary)] hover:underline",
				children: s
			}) : s
		}), n && /* @__PURE__ */ L("div", {
			className: e("text-[10px] font-mono text-[var(--color-text-tertiary)] truncate mt-0.5", i && "tracking-tight"),
			children: n
		})]
	});
}
//#endregion
//#region src/components/shared/Drawer.tsx
function pt({ open: t, onClose: n, title: r, subtitle: i, width: a = 460, children: o, footer: s, "aria-label": c, "data-testid": l }) {
	let u = P(null), f = P(null), p = M(), m = d(t);
	return j(() => {
		if (!t) return;
		let e = (e) => {
			if (e.key === "Escape") {
				m() && n();
				return;
			}
			m() && y(e, u.current);
		};
		return window.addEventListener("keydown", e), () => window.removeEventListener("keydown", e);
	}, [
		t,
		n,
		m
	]), j(() => {
		if (t) return f.current = typeof document < "u" ? document.activeElement : null, b(u.current), () => {
			v(f.current), f.current = null;
		};
	}, [t]), t ? B(/* @__PURE__ */ R("div", {
		className: "fixed inset-0 z-[9000]",
		"data-testid": l,
		children: [/* @__PURE__ */ L("div", {
			className: "absolute inset-0 bg-black/30 backdrop-blur-[1px]",
			onClick: n,
			"aria-hidden": "true"
		}), /* @__PURE__ */ R("aside", {
			ref: u,
			role: "dialog",
			"aria-modal": "true",
			"aria-labelledby": r ? p : void 0,
			"aria-label": r ? void 0 : c,
			className: e("absolute right-0 top-0 h-full bg-surface shadow-xl flex flex-col", "transition-transform duration-200", t ? "translate-x-0" : "translate-x-full"),
			style: { width: a },
			children: [
				/* @__PURE__ */ R("div", {
					className: "flex items-start justify-between p-5 border-b border-[var(--color-border)] flex-shrink-0",
					children: [/* @__PURE__ */ R("div", {
						className: "min-w-0",
						children: [r && /* @__PURE__ */ L("h2", {
							id: p,
							className: "text-base font-semibold text-[var(--color-text-primary)]",
							children: r
						}), i && /* @__PURE__ */ L("p", {
							className: "text-sm text-[var(--color-text-secondary)] mt-0.5",
							children: i
						})]
					}), /* @__PURE__ */ L("button", {
						type: "button",
						onClick: n,
						className: "ml-4 flex-shrink-0 p-1 rounded hover:bg-[var(--color-surface-hover)] text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] transition-colors",
						"aria-label": "Close",
						children: /* @__PURE__ */ L("svg", {
							width: "16",
							height: "16",
							viewBox: "0 0 16 16",
							fill: "none",
							children: /* @__PURE__ */ L("path", {
								d: "M4 4l8 8M12 4l-8 8",
								stroke: "currentColor",
								strokeWidth: "1.5",
								strokeLinecap: "round"
							})
						})
					})]
				}),
				/* @__PURE__ */ L("div", {
					className: "flex-1 overflow-y-auto p-5",
					children: o
				}),
				s && /* @__PURE__ */ L("div", {
					className: "flex-shrink-0 border-t border-[var(--color-border)] p-4 bg-[var(--color-surface-inset,#f8fafc)]",
					children: s
				})
			]
		})]
	}), document.body) : null;
}
//#endregion
//#region src/components/shared/CollapsibleSection.tsx
function mt(e, t) {
	if (!e || typeof window > "u") return t;
	try {
		let n = window.localStorage.getItem(e);
		return n === null ? t : n === "true";
	} catch {
		return t;
	}
}
function ht({ title: t, defaultOpen: n = !1, badge: r, actions: i, children: a, className: o, storageKey: s, "data-testid": c }) {
	let [l, u] = F(() => mt(s, n)), d = M(), f = P(null), p = P(null);
	return j(() => {
		if (s && !(typeof window > "u")) try {
			window.localStorage.setItem(s, String(l));
		} catch {}
	}, [l, s]), /* @__PURE__ */ R("div", {
		className: e("border border-[var(--color-border)] rounded-lg overflow-hidden", o),
		children: [/* @__PURE__ */ R("div", {
			className: "flex items-stretch bg-[var(--color-surface)]",
			children: [/* @__PURE__ */ R("button", {
				type: "button",
				ref: f,
				"data-testid": c,
				className: "flex-1 min-w-0 flex items-center justify-between px-4 py-3 bg-transparent hover:bg-[var(--color-surface-hover)] transition-colors text-left",
				onClick: () => {
					if (l) {
						let e = typeof document > "u" ? null : document.activeElement;
						e && p.current?.contains(e) && f.current?.focus();
					}
					u((e) => !e);
				},
				"aria-expanded": l,
				"aria-controls": d,
				children: [/* @__PURE__ */ L("span", {
					className: "text-sm font-semibold text-[var(--color-text-primary)]",
					children: t
				}), /* @__PURE__ */ R("div", {
					className: "flex items-center gap-2",
					children: [r, /* @__PURE__ */ L("svg", {
						className: e("w-4 h-4 text-[var(--color-text-tertiary)] transition-transform", l && "rotate-180"),
						viewBox: "0 0 16 16",
						fill: "none",
						"aria-hidden": "true",
						children: /* @__PURE__ */ L("path", {
							d: "M4 6l4 4 4-4",
							stroke: "currentColor",
							strokeWidth: "1.5",
							strokeLinecap: "round",
							strokeLinejoin: "round"
						})
					})]
				})]
			}), i && /* @__PURE__ */ L("div", {
				className: "flex items-center gap-2 pr-4 shrink-0",
				children: i
			})]
		}), l && /* @__PURE__ */ L("div", {
			id: d,
			ref: p,
			className: "border-t border-[var(--color-border)] bg-surface",
			children: a
		})]
	});
}
//#endregion
//#region src/components/shared/PageHeader.tsx
function gt({ title: t, description: n, actions: r, back: i, badge: a, className: o }) {
	return /* @__PURE__ */ R("div", {
		className: e("flex flex-col gap-1.5", o),
		children: [
			i && /* @__PURE__ */ R("a", {
				href: i.to,
				onClick: i.onClick,
				className: "inline-flex items-center gap-1 text-xs text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] mb-1 w-fit",
				children: [/* @__PURE__ */ L("svg", {
					width: "12",
					height: "12",
					viewBox: "0 0 12 12",
					fill: "none",
					"aria-hidden": "true",
					children: /* @__PURE__ */ L("path", {
						d: "M7 2L3 6l4 4",
						stroke: "currentColor",
						strokeWidth: "1.5",
						strokeLinecap: "round",
						strokeLinejoin: "round"
					})
				}), i.label]
			}),
			/* @__PURE__ */ R("div", {
				className: "flex items-center justify-between gap-4",
				children: [/* @__PURE__ */ R("div", {
					className: "min-w-0 flex items-center gap-2.5",
					children: [/* @__PURE__ */ L("h1", {
						className: "text-xl font-semibold text-[var(--color-text-primary)] leading-tight",
						children: t
					}), a]
				}), r && /* @__PURE__ */ L("div", {
					className: "flex-shrink-0 flex items-center gap-2",
					children: r
				})]
			}),
			n && /* @__PURE__ */ L("p", {
				className: "text-sm text-[var(--color-text-secondary)]",
				children: n
			})
		]
	});
}
//#endregion
//#region src/components/shared/LogStream.tsx
var _t = {
	debug: "DEBUG",
	info: "INFO",
	warn: "WARN",
	error: "ERROR"
}, Y = {
	debug: "text-[var(--color-text-tertiary)]",
	info: "text-[var(--color-info,#3b82f6)]",
	warn: "text-[var(--color-warning,#d97706)]",
	error: "text-[var(--color-danger,#dc2626)]"
};
function X({ lines: t, follow: n = !0, showTimestamp: i = !0, showLevel: a = !0, showSource: o = !0, title: s = "Log stream", headerSlot: c, emptyMessage: l = "No log lines yet.", maxHeight: u, onClear: d, className: f, style: p, "data-testid": m = "log-stream" }) {
	let h = P(null), [_, v] = F(!1);
	j(() => {
		if (!n || _) return;
		let e = h.current;
		e && (e.scrollTop = e.scrollHeight);
	}, [
		t,
		n,
		_
	]);
	let y = () => {
		let e = h.current;
		if (!e) return;
		let t = e.scrollHeight - e.scrollTop - e.clientHeight < 24;
		v(!t);
	}, b = () => {
		let e = h.current;
		e && (e.scrollTop = e.scrollHeight, v(!1));
	}, x = /* @__PURE__ */ R("div", {
		className: "flex items-center gap-2",
		children: [/* @__PURE__ */ R("span", {
			className: "text-[10px] text-[var(--color-text-tertiary)]",
			"data-testid": `${m}-count`,
			children: [
				t.length,
				" ",
				t.length === 1 ? "line" : "lines"
			]
		}), d && /* @__PURE__ */ L("button", {
			type: "button",
			onClick: d,
			"data-testid": `${m}-clear`,
			className: e("text-[10px] uppercase tracking-wide", "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]", "border border-[var(--color-border)] rounded px-1.5 py-0.5", "cursor-pointer bg-transparent"),
			children: "Clear"
		})]
	});
	return /* @__PURE__ */ R(r, {
		"data-testid": m,
		className: e("flex flex-col", f),
		style: p,
		children: [s !== null && /* @__PURE__ */ L("div", {
			className: "px-4 py-3 border-b border-[var(--color-border)]",
			children: /* @__PURE__ */ L(g, {
				title: s,
				meta: c ?? x
			})
		}), /* @__PURE__ */ R("div", {
			className: "relative flex-1 min-h-0 flex",
			children: [/* @__PURE__ */ L("div", {
				ref: h,
				onScroll: y,
				role: "log",
				"aria-live": n ? "polite" : "off",
				"data-testid": `${m}-scroll`,
				className: e("flex-1 overflow-y-auto", "font-mono text-[12px] leading-[1.55]", "bg-[var(--color-surface-subtle,#0b1020)] text-[var(--color-text-primary,#e5e7eb)]", "py-2"),
				style: { maxHeight: u },
				children: t.length === 0 ? /* @__PURE__ */ L("div", {
					"data-testid": `${m}-empty`,
					className: "px-3 py-6 text-center text-[11px] text-[var(--color-text-tertiary)]",
					children: l
				}) : t.map((t) => {
					let n = t.level ?? "info", r = String(n), s = _t[n] ?? r.toUpperCase(), c = Y[n] ?? Y.info;
					return /* @__PURE__ */ R("div", {
						role: "listitem",
						"data-testid": `${m}-line`,
						"data-level": t.level || void 0,
						className: "flex items-baseline gap-2 px-3 hover:bg-[var(--color-surface,rgba(255,255,255,0.04))]",
						children: [
							i && t.timestamp && /* @__PURE__ */ L("span", {
								className: "shrink-0 text-[var(--color-text-tertiary)] tabular-nums",
								children: t.timestamp
							}),
							a && t.level && /* @__PURE__ */ L("span", {
								className: e("shrink-0 font-semibold uppercase text-[10px] w-[44px]", c),
								"aria-label": `level ${r.toLowerCase()}`,
								children: s
							}),
							o && t.source && /* @__PURE__ */ R("span", {
								className: "shrink-0 text-[var(--color-text-secondary)]",
								children: [
									"[",
									t.source,
									"]"
								]
							}),
							/* @__PURE__ */ L("span", {
								className: "flex-1 whitespace-pre-wrap break-words",
								children: t.message
							})
						]
					}, t.id);
				})
			}), n && _ && /* @__PURE__ */ L("button", {
				type: "button",
				"data-testid": `${m}-jump`,
				onClick: b,
				className: e("absolute bottom-3 left-1/2 -translate-x-1/2", "px-3 py-1 text-[10px] font-semibold uppercase tracking-wide", "bg-primary text-white rounded-full border-none cursor-pointer", "shadow-[0_2px_8px_rgba(0,0,0,0.25)]"),
				children: "Jump to live ↓"
			})]
		})]
	});
}
var vt = X;
//#endregion
//#region src/components/shared/ThumbnailCard.tsx
function yt({ title: t, description: n, category: r, categoryTone: i = "neutral", thumbnail: a, icon: o = "🧩", thumbnailHeight: s = 160, href: c, onClick: l, badge: d, meta: f, className: p, style: m, "data-testid": h = "thumbnail-card" }) {
	let g = e("group block w-full text-left bg-[var(--color-surface,#fff)]", "rounded-xl border border-[var(--color-border)] overflow-hidden", "transition-[box-shadow,transform] duration-150", (c || l) && "cursor-pointer hover:shadow-[0_8px_25px_rgba(0,0,0,0.08)] hover:-translate-y-0.5", p), _ = /* @__PURE__ */ R(I, { children: [/* @__PURE__ */ R("div", {
		"data-testid": `${h}-thumb`,
		className: e("relative flex items-center justify-center", "bg-gradient-to-br from-[var(--color-primary-bg,#eef2ff)] to-[var(--color-surface,#ffffff)]", "border-b border-[var(--color-border)]"),
		style: { height: s },
		children: [a ? /* @__PURE__ */ L("img", {
			src: a,
			alt: "",
			className: "w-full h-full object-cover"
		}) : /* @__PURE__ */ L("span", {
			className: "text-5xl opacity-50",
			"aria-hidden": !0,
			children: o
		}), d && /* @__PURE__ */ L("span", {
			"data-testid": `${h}-badge`,
			className: "absolute top-2 right-2",
			children: d
		})]
	}), /* @__PURE__ */ R("div", {
		className: "px-4 py-3",
		children: [
			/* @__PURE__ */ R("div", {
				className: "flex items-center gap-2 mb-1.5",
				children: [r && /* @__PURE__ */ L(u, {
					tone: i,
					size: "xs",
					"data-testid": `${h}-category`,
					children: r
				}), f && /* @__PURE__ */ L("span", {
					className: "ml-auto",
					children: f
				})]
			}),
			/* @__PURE__ */ L("div", {
				className: "text-[14px] font-semibold text-[var(--color-text-primary)] leading-snug",
				children: t
			}),
			n && /* @__PURE__ */ L("div", {
				className: "mt-1 text-[12px] text-[var(--color-text-secondary)] leading-snug",
				children: n
			})
		]
	})] });
	return c ? /* @__PURE__ */ L("a", {
		href: c,
		onClick: l,
		"data-testid": h,
		className: e(g, "no-underline text-inherit"),
		style: m,
		children: _
	}) : l ? /* @__PURE__ */ L("button", {
		type: "button",
		onClick: l,
		"data-testid": h,
		className: e(g, "font-inherit"),
		style: m,
		children: _
	}) : /* @__PURE__ */ L("div", {
		"data-testid": h,
		className: g,
		style: m,
		children: _
	});
}
//#endregion
//#region src/components/shared/CatalogGrid.tsx
var bt = {
	1: "sm:grid-cols-1",
	2: "sm:grid-cols-2",
	3: "sm:grid-cols-2 lg:grid-cols-3",
	4: "sm:grid-cols-2 lg:grid-cols-4",
	5: "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
};
function xt({ children: t, columns: n = 3, dense: r = !1, className: i, style: a, "data-testid": o = "catalog-grid" }) {
	return /* @__PURE__ */ L("div", {
		"data-testid": o,
		"data-columns": n,
		className: e("grid grid-cols-1", bt[n], r ? "gap-3" : "gap-5", i),
		style: a,
		children: t
	});
}
//#endregion
//#region src/components/shared/StackDiagram.tsx
function St({ orientation: t, variant: n }) {
	if (n === "none") return null;
	let r = t === "vertical", i = n === "arrow" ? r ? "↓" : "→" : r ? "│" : "─";
	return /* @__PURE__ */ L("div", {
		"data-testid": "stack-diagram-connector",
		"aria-hidden": !0,
		className: e("flex items-center justify-center text-[var(--color-text-tertiary)]", r ? "h-5 text-base" : "w-5 text-base"),
		children: i
	});
}
function Ct({ layers: t, orientation: n = "vertical", connector: r = "arrow", className: i, style: s, "data-testid": u = "stack-diagram" }) {
	let d = n === "vertical";
	return /* @__PURE__ */ L("div", {
		"data-testid": u,
		"data-orientation": n,
		"data-connector": r,
		className: e("flex", d ? "flex-col items-stretch" : "flex-row items-stretch flex-wrap", i),
		style: s,
		children: t.map((i, s) => {
			let u = c(i.tone ?? "neutral");
			return /* @__PURE__ */ R("div", {
				className: e("flex", "flex-col"),
				children: [/* @__PURE__ */ R("div", {
					"data-testid": "stack-diagram-layer",
					"data-tone": u,
					className: e("rounded-md border px-3 py-2", l[u], a[u], !d && "min-w-[140px]"),
					children: [/* @__PURE__ */ R("div", {
						className: "flex items-center gap-2",
						children: [
							i.icon != null && /* @__PURE__ */ L("span", {
								className: "shrink-0 text-[14px] leading-none",
								"aria-hidden": !0,
								children: i.icon
							}),
							/* @__PURE__ */ L("span", {
								className: e("text-[12px] font-semibold", o[u]),
								children: i.label
							}),
							i.meta != null && /* @__PURE__ */ L("span", {
								className: "ml-auto text-[10px] text-[var(--color-text-tertiary)] shrink-0",
								children: i.meta
							})
						]
					}), i.description != null && /* @__PURE__ */ L("div", {
						className: "mt-0.5 text-[11px] leading-snug text-[var(--color-text-secondary)]",
						children: i.description
					})]
				}), s < t.length - 1 && /* @__PURE__ */ L(St, {
					orientation: n,
					variant: r
				})]
			}, i.id);
		})
	});
}
var wt = Ct;
//#endregion
//#region src/components/shared/ChatComposer.tsx
function Tt({ value: t, onChange: n, onSubmit: r, disabled: i = !1, multiline: a = !1, placeholder: o, submitLabel: s = "→", className: c, style: l, autoFocus: u, maxRows: d = 4, "aria-label": f = "Message", "aria-labelledby": p, submitAriaLabel: m = "Send" }) {
	let h = !i && t.trim().length > 0, g = typeof s == "string" && /\p{L}|\p{N}/u.test(s) ? void 0 : m, _ = p ? void 0 : f, v = () => {
		h && r();
	}, y = (e) => {
		if (e.key === "Enter") {
			if (a && e.shiftKey) return;
			e.preventDefault(), v();
		}
	}, b = e("flex-1 px-3 py-2 text-sm rounded-lg border border-[var(--color-border-field,#d1d5db)] bg-surface text-[var(--color-text-primary)]", "placeholder:text-[var(--color-text-tertiary)]", "focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent", "resize-none", i && "opacity-50 cursor-not-allowed bg-[var(--color-surface-hover)]");
	return /* @__PURE__ */ R("div", {
		className: e("flex items-end gap-2 p-3 border-t border-[var(--color-border)] bg-[var(--color-surface)]", c),
		style: l,
		children: [a ? /* @__PURE__ */ L("textarea", {
			"aria-label": _,
			"aria-labelledby": p,
			className: b,
			value: t,
			onChange: (e) => n(e.target.value),
			onKeyDown: y,
			disabled: i,
			placeholder: o,
			autoFocus: u,
			rows: 2,
			style: {
				maxHeight: `${d * 1.5 + 1}rem`,
				overflowY: "auto"
			}
		}) : /* @__PURE__ */ L("input", {
			type: "text",
			"aria-label": _,
			"aria-labelledby": p,
			className: b,
			value: t,
			onChange: (e) => n(e.target.value),
			onKeyDown: y,
			disabled: i,
			placeholder: o,
			autoFocus: u
		}), /* @__PURE__ */ L("button", {
			type: "button",
			"aria-label": g,
			onClick: v,
			disabled: !h,
			className: e("px-3 py-2 rounded-lg text-sm font-semibold transition-colors flex-shrink-0", h ? "bg-[var(--color-primary)] text-white hover:opacity-90" : "bg-[var(--color-surface-hover)] text-[var(--color-text-tertiary)] cursor-not-allowed"),
			children: s
		})]
	});
}
//#endregion
//#region src/components/shared/ToolCallStrip.tsx
function Et({ name: t, done: n, className: r }) {
	return /* @__PURE__ */ R("span", {
		className: e("inline-flex items-center gap-1 text-[10.5px] font-mono px-2 py-0.5 rounded-full", n ? "bg-[var(--color-success-bg,#f0fdf4)] text-[var(--color-success,#16a34a)]" : "bg-[var(--color-info-bg,#eff6ff)] text-[var(--color-info,#1d4ed8)]", r),
		children: [t, n ? " ✓" : "…"]
	});
}
function Dt({ toolCalls: t, className: n }) {
	return /* @__PURE__ */ L("div", {
		className: e("flex flex-wrap gap-1.5 py-1", n),
		children: t.map((e) => /* @__PURE__ */ L(Et, {
			name: e.name,
			done: e.done
		}, e.id))
	});
}
//#endregion
//#region src/components/shared/MessageBubble.tsx
function Ot({ role: t, content: n, toolCalls: r, streaming: i = !1, agentName: a, userName: o, renderMarkdown: s, className: c }) {
	let l = t === "user" ? o || "You" : a || "Assistant";
	return /* @__PURE__ */ R("div", {
		className: e("flex flex-col gap-1.5 py-3", c),
		children: [
			/* @__PURE__ */ L("div", {
				className: "text-[11px] font-semibold uppercase tracking-wide text-[var(--color-text-tertiary)]",
				children: l
			}),
			r && r.length > 0 && /* @__PURE__ */ L(Dt, { toolCalls: r }),
			t === "user" ? /* @__PURE__ */ L("div", {
				className: "text-sm text-[var(--color-text-primary)] whitespace-pre-wrap",
				children: n
			}) : /* @__PURE__ */ L("div", {
				className: "text-sm text-[var(--color-text-primary)] prose-sm max-w-none",
				children: n ? s ? s(n) : /* @__PURE__ */ L("span", {
					className: "whitespace-pre-wrap",
					children: n
				}) : i ? /* @__PURE__ */ L(S, {}) : null
			})
		]
	});
}
//#endregion
//#region src/components/shared/ThinkingBlock.tsx
function kt({ content: t, streaming: n = !1, defaultOpen: r = !1, className: i }) {
	let a = n || !t ? "Thinking" : "Thought";
	return /* @__PURE__ */ R("details", {
		open: r,
		className: e("rounded-md border border-[var(--color-border)] overflow-hidden text-sm group", i),
		children: [/* @__PURE__ */ R("summary", {
			className: "flex items-center gap-2 px-3 py-2 cursor-pointer select-none bg-[var(--color-surface)] hover:bg-[var(--color-surface-hover)] text-[var(--color-text-tertiary)] list-none",
			children: [
				/* @__PURE__ */ L("svg", {
					className: "w-3.5 h-3.5 transition-transform group-open:rotate-90",
					xmlns: "http://www.w3.org/2000/svg",
					viewBox: "0 0 20 20",
					fill: "currentColor",
					"aria-hidden": "true",
					children: /* @__PURE__ */ L("path", {
						fillRule: "evenodd",
						d: "M7.21 14.77a.75.75 0 010-1.06L10.94 10 7.21 6.29a.75.75 0 011.08-1.04l4.25 4.25a.75.75 0 010 1.06l-4.25 4.25a.75.75 0 01-1.08-.04z",
						clipRule: "evenodd"
					})
				}),
				/* @__PURE__ */ L("span", {
					className: "text-[11px] font-semibold uppercase tracking-wide",
					children: a
				}),
				n && !t && /* @__PURE__ */ L(S, { size: "sm" })
			]
		}), /* @__PURE__ */ L("div", {
			className: "px-3 py-2 text-xs text-[var(--color-text-secondary)] italic border-t border-[var(--color-border)] bg-surface whitespace-pre-wrap leading-relaxed",
			children: t || /* @__PURE__ */ L(S, {})
		})]
	});
}
//#endregion
//#region src/components/shared/QuickPromptGrid.tsx
function At({ prompts: t, onSelect: n, columns: r, title: i, className: a }) {
	let o = r ? `repeat(${r}, minmax(0, 1fr))` : "repeat(auto-fit, minmax(220px, 1fr))";
	return /* @__PURE__ */ R("div", {
		className: e("flex flex-col gap-3", a),
		children: [i && /* @__PURE__ */ L("p", {
			className: "text-xs font-semibold uppercase tracking-wide text-[var(--color-text-tertiary)] text-center",
			children: i
		}), /* @__PURE__ */ L("div", {
			style: {
				display: "grid",
				gridTemplateColumns: o,
				gap: 10
			},
			children: t.map((e, t) => /* @__PURE__ */ R("button", {
				type: "button",
				onClick: () => n(e.label),
				className: "flex flex-col gap-1 px-4 py-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] hover:bg-[var(--color-surface-hover)] hover:border-[var(--color-border-emphasis,#cbd5e1)] text-left transition-colors",
				children: [/* @__PURE__ */ L("span", {
					className: "text-sm font-medium text-[var(--color-text-primary)]",
					children: e.label
				}), e.hint && /* @__PURE__ */ L("span", {
					className: "text-xs text-[var(--color-text-tertiary)]",
					children: e.hint
				})]
			}, t))
		})]
	});
}
//#endregion
//#region src/components/shared/FollowUpChips.tsx
function jt({ suggestions: t, onSelect: n, onRefresh: r, label: i, className: a }) {
	return /* @__PURE__ */ R("div", {
		className: e("flex items-center flex-wrap gap-1.5 py-2", a),
		children: [
			i && /* @__PURE__ */ L("span", {
				className: "text-xs text-[var(--color-text-tertiary)] mr-1",
				children: i
			}),
			t.map((e, t) => /* @__PURE__ */ L("button", {
				type: "button",
				onClick: () => n(e),
				className: "inline-flex items-center px-3 py-1 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] text-xs text-[var(--color-text-secondary)] hover:bg-[var(--color-primary)] hover:text-white hover:border-[var(--color-primary)] transition-colors",
				children: e
			}, t)),
			r && /* @__PURE__ */ L("button", {
				type: "button",
				onClick: r,
				className: "inline-flex items-center justify-center w-7 h-7 rounded-full border border-[var(--color-border)] text-[var(--color-text-tertiary)] hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text-primary)] transition-colors text-base",
				title: "Refresh suggestions",
				children: "↻"
			})
		]
	});
}
//#endregion
//#region src/components/shared/UserMenu.tsx
function Mt({ user: t, items: n, className: r, "data-testid": i }) {
	let [a, o] = F(!1), s = P(null), c = A(() => o(!1), []);
	return j(() => {
		if (!a) return;
		let e = (e) => {
			s.current && !s.current.contains(e.target) && c();
		};
		return document.addEventListener("mousedown", e), () => document.removeEventListener("mousedown", e);
	}, [a, c]), _(a, c), /* @__PURE__ */ R("div", {
		ref: s,
		"data-testid": i,
		className: e("relative inline-block", r),
		children: [/* @__PURE__ */ R("button", {
			type: "button",
			"aria-label": `User menu for ${t.name}`,
			"aria-expanded": a,
			"aria-haspopup": "menu",
			onClick: () => o((e) => !e),
			className: e("flex items-center gap-2 bg-transparent border-none cursor-pointer p-1 rounded-lg", "hover:bg-[var(--color-surface-hover)] transition-colors duration-100", a && "bg-[var(--color-surface-hover)]"),
			children: [
				t.avatarUrl ? /* @__PURE__ */ L("img", {
					src: t.avatarUrl,
					alt: t.name,
					className: "w-8 h-8 rounded-full object-cover"
				}) : /* @__PURE__ */ L(D, {
					name: t.name,
					size: 32
				}),
				/* @__PURE__ */ R("div", {
					className: "flex flex-col items-start text-left min-w-0 hidden sm:flex",
					children: [/* @__PURE__ */ L("span", {
						className: "text-sm font-medium text-[var(--color-text-primary)] leading-tight truncate max-w-[120px]",
						children: t.name
					}), /* @__PURE__ */ L("span", {
						className: "text-xs text-[var(--color-text-tertiary)] leading-tight truncate max-w-[120px]",
						children: t.email
					})]
				}),
				/* @__PURE__ */ L("svg", {
					width: "12",
					height: "12",
					viewBox: "0 0 12 12",
					fill: "none",
					"aria-hidden": "true",
					className: e("text-[var(--color-text-tertiary)] transition-transform duration-150", a ? "rotate-180" : "rotate-0"),
					children: /* @__PURE__ */ L("path", {
						d: "M2 4l4 4 4-4",
						stroke: "currentColor",
						strokeWidth: "1.5",
						strokeLinecap: "round",
						strokeLinejoin: "round"
					})
				})
			]
		}), a && /* @__PURE__ */ R("div", {
			role: "menu",
			"aria-label": "User menu",
			className: e("absolute right-0 top-[calc(100%+6px)] min-w-[200px] z-[200]", "bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl shadow-md overflow-hidden"),
			children: [/* @__PURE__ */ R("div", {
				className: "px-3 py-2.5 border-b border-[var(--color-border)]",
				children: [/* @__PURE__ */ L("p", {
					className: "text-sm font-semibold text-[var(--color-text-primary)] truncate",
					children: t.name
				}), /* @__PURE__ */ L("p", {
					className: "text-xs text-[var(--color-text-tertiary)] truncate",
					children: t.email
				})]
			}), /* @__PURE__ */ L("div", {
				className: "py-1",
				children: n.map((t, n) => /* @__PURE__ */ R("div", { children: [t.separator && n > 0 && /* @__PURE__ */ L("div", { className: "my-1 border-t border-[var(--color-border)]" }), /* @__PURE__ */ R("button", {
					type: "button",
					role: "menuitem",
					onClick: () => {
						t.onClick(), c();
					},
					className: e("flex items-center gap-2.5 w-full text-left px-3 py-2", "text-sm border-none cursor-pointer font-[inherit] transition-colors duration-100", t.danger ? "text-danger-fg bg-transparent hover:bg-danger-bg" : "text-[var(--color-text-primary)] bg-transparent hover:bg-[var(--color-surface-hover)]"),
					children: [t.icon && /* @__PURE__ */ L("span", {
						className: "shrink-0 text-base leading-none",
						"aria-hidden": "true",
						children: t.icon
					}), t.label]
				})] }, n))
			})]
		})]
	});
}
//#endregion
//#region src/components/shared/Breadcrumbs.tsx
function Nt({ item: t, isLast: n, block: r = !1, afterActivate: i }) {
	let a = (e) => {
		t.onClick?.(e), i?.();
	}, o = e("text-sm leading-snug transition-colors duration-100", n ? "text-[var(--color-text-primary)] font-medium cursor-default" : "text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] font-normal", r && "block w-full px-3 py-1.5 rounded-sm hover:bg-[var(--color-surface-hover)]");
	return n || !t.href && !t.onClick ? /* @__PURE__ */ L("span", {
		className: o,
		"aria-current": n ? "page" : void 0,
		children: t.label
	}) : t.href ? /* @__PURE__ */ L("a", {
		href: t.href,
		onClick: a,
		className: e(o, "no-underline"),
		children: t.label
	}) : /* @__PURE__ */ L("button", {
		type: "button",
		onClick: a,
		className: e(o, "border-none bg-transparent cursor-pointer font-[inherit] p-0", r && "text-left px-3 py-1.5"),
		children: t.label
	});
}
function Pt(e, t) {
	if (e.length <= t) return e;
	let n = e.slice(0, 1), r = e.slice(-(t - 2 > 0 ? t - 2 : 1));
	return [
		...n,
		null,
		...r
	];
}
function Ft(e, t) {
	let n = t - 2 > 0 ? t - 2 : 1;
	return e.slice(1, e.length - n);
}
function It({ items: e }) {
	let [t, n] = F(!1), r = P(null);
	return /* @__PURE__ */ R(I, { children: [/* @__PURE__ */ L("button", {
		ref: r,
		type: "button",
		"aria-label": "Show hidden breadcrumbs",
		"aria-expanded": t,
		"aria-haspopup": "true",
		onClick: () => n((e) => !e),
		className: "text-sm text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] border-none bg-transparent cursor-pointer px-1 py-0 rounded-sm leading-snug",
		children: "…"
	}), /* @__PURE__ */ L(O, {
		trigger: r,
		open: t,
		onClose: () => n(!1),
		"aria-label": "Hidden breadcrumbs",
		"data-testid": "breadcrumb-overflow",
		className: "min-w-[160px] py-1",
		children: /* @__PURE__ */ L("ol", {
			className: "list-none m-0 p-0",
			children: e.map((e, t) => /* @__PURE__ */ L("li", { children: /* @__PURE__ */ L(Nt, {
				item: e,
				isLast: !1,
				block: !0,
				afterActivate: () => n(!1)
			}) }, `${e.label}-${t}`))
		})
	})] });
}
function Lt({ items: t, separator: n = "/", maxItems: r, overflow: i = "ellipsis", minItems: a, className: o, "data-testid": s }) {
	if (t.length === 0 || a != null && t.length < a) return null;
	let c = r == null ? t : Pt(t, r), l = r == null ? [] : Ft(t, r);
	return /* @__PURE__ */ L("nav", {
		"aria-label": "Breadcrumb",
		"data-testid": s,
		className: e("flex items-center", o),
		children: /* @__PURE__ */ L("ol", {
			className: "flex items-center gap-1 flex-wrap list-none m-0 p-0",
			children: c.map((e, t) => {
				let r = t === c.length - 1;
				return /* @__PURE__ */ R("li", {
					className: "flex items-center gap-1",
					children: [e === null ? i === "menu" && l.length > 0 ? /* @__PURE__ */ L(It, { items: l }) : /* @__PURE__ */ L("span", {
						className: "text-sm text-[var(--color-text-tertiary)] select-none",
						"aria-label": "More items",
						title: "Some items are hidden",
						children: "…"
					}) : /* @__PURE__ */ L(Nt, {
						item: e,
						isLast: r
					}), !r && /* @__PURE__ */ L("span", {
						className: "text-[var(--color-text-tertiary)] text-sm select-none",
						"aria-hidden": "true",
						children: n
					})]
				}, t);
			})
		})
	});
}
//#endregion
//#region src/components/shared/ProjectCard.tsx
var Rt = {
	active: {
		bg: "var(--color-success-bg)",
		border: "#86efac",
		text: "var(--color-success-fg)",
		accent: "var(--color-success)"
	},
	in_progress: {
		bg: "var(--color-info-bg)",
		border: "var(--color-state-pending)",
		text: "var(--color-info-fg)",
		accent: "var(--color-info)"
	},
	completed: {
		bg: "var(--color-success-bg)",
		border: "#86efac",
		text: "var(--color-success-fg)",
		accent: "var(--color-success)"
	},
	archived: {
		bg: "var(--color-surface-inset)",
		border: "var(--color-border-field)",
		text: "var(--color-neutral)",
		accent: "var(--color-text-tertiary)"
	},
	planning: {
		bg: "#fefce8",
		border: "#fde047",
		text: "#713f12",
		accent: "#eab308"
	},
	paused: {
		bg: "var(--color-caution-bg)",
		border: "#fdba74",
		text: "#9a3412",
		accent: "var(--color-caution)"
	}
}, zt = {
	bg: "var(--color-surface-hover)",
	border: "var(--color-border-field)",
	text: "var(--color-text-primary)",
	accent: "var(--color-neutral)"
};
function Bt({ status: e, colors: t }) {
	return /* @__PURE__ */ R("span", {
		style: {
			display: "inline-flex",
			alignItems: "center",
			gap: 4,
			padding: "2px 9px",
			borderRadius: 9999,
			fontSize: 10,
			fontWeight: 700,
			background: t.bg,
			color: t.text,
			border: `1px solid ${t.border}`,
			textTransform: "uppercase",
			letterSpacing: "0.04em",
			whiteSpace: "nowrap",
			flexShrink: 0
		},
		children: [/* @__PURE__ */ L("span", { style: {
			width: 5,
			height: 5,
			borderRadius: "50%",
			background: t.accent
		} }), e.replace(/_/g, " ")]
	});
}
function Vt({ name: e, id: t, status: n, statusColors: r, contributorNames: i = [], contributorCount: a, activityItems: o = [], presenceDotColor: s = "var(--color-border-field)", activityLabel: c = "", cardIndex: l = 0, onClick: u, className: d, style: f, minHeight: p = 190 }) {
	let m = {
		...Rt,
		...r
	}[(n ?? "unknown").toLowerCase().replace(/ /g, "_")] ?? zt, h = a === void 0 ? 0 : Math.max(0, a - i.length), g = l % 8 * 525;
	return /* @__PURE__ */ R(u ? "button" : "div", {
		type: u ? "button" : void 0,
		onClick: u,
		className: d,
		style: {
			background: "var(--color-surface, #fff)",
			border: "1.5px solid var(--color-border, #e5e7eb)",
			borderTop: `3px solid ${m.accent}`,
			borderRadius: 10,
			padding: "14px 16px 12px",
			cursor: u ? "pointer" : "default",
			display: "flex",
			flexDirection: "column",
			gap: 10,
			transition: "box-shadow 0.15s, transform 0.1s",
			minHeight: p,
			width: "100%",
			textAlign: "left",
			font: "inherit",
			color: "inherit",
			...f
		},
		onMouseEnter: (e) => {
			let t = e.currentTarget;
			t.style.boxShadow = "0 4px 16px rgba(0,0,0,0.08)", t.style.transform = "translateY(-1px)", t.style.borderColor = m.border;
		},
		onMouseLeave: (e) => {
			let t = e.currentTarget;
			t.style.boxShadow = "none", t.style.transform = "none", t.style.borderColor = "var(--color-border)";
		},
		children: [
			/* @__PURE__ */ R("div", {
				style: {
					display: "flex",
					alignItems: "flex-start",
					justifyContent: "space-between",
					gap: 8
				},
				children: [/* @__PURE__ */ R("div", {
					style: {
						flex: 1,
						minWidth: 0
					},
					children: [/* @__PURE__ */ L("h3", {
						style: {
							margin: "0 0 3px",
							fontSize: 13.5,
							fontWeight: 700,
							color: "var(--color-text-primary, #111827)",
							lineHeight: 1.35
						},
						children: e
					}), t && /* @__PURE__ */ L("span", {
						style: {
							fontSize: 10,
							fontFamily: "ui-monospace, \"SFMono-Regular\", Menlo, monospace",
							color: "var(--color-text-tertiary)",
							letterSpacing: "0.02em"
						},
						children: t
					})]
				}), n && /* @__PURE__ */ L(Bt, {
					status: n,
					colors: m
				})]
			}),
			/* @__PURE__ */ L(k, {
				items: o,
				staggerMs: g
			}),
			/* @__PURE__ */ R("div", {
				style: {
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
					paddingTop: 8,
					borderTop: "1px solid var(--color-border-subtle, #f3f4f6)",
					gap: 8
				},
				children: [/* @__PURE__ */ R("div", {
					style: {
						display: "flex",
						alignItems: "center",
						gap: 8,
						minWidth: 0
					},
					children: [i.length > 0 ? /* @__PURE__ */ L(E, {
						names: i,
						maxVisible: 5,
						size: 24
					}) : /* @__PURE__ */ R("span", {
						style: {
							fontSize: 12,
							color: "var(--color-text-tertiary)"
						},
						children: [/* @__PURE__ */ L("strong", {
							style: { color: "var(--color-text-primary)" },
							children: a ?? 0
						}), " contributors"]
					}), i.length > 0 && h > 0 && /* @__PURE__ */ R("span", {
						style: {
							fontSize: 11,
							color: "var(--color-text-tertiary)"
						},
						children: [
							"+",
							h,
							" more"
						]
					})]
				}), c && /* @__PURE__ */ R("div", {
					style: {
						display: "flex",
						alignItems: "center",
						gap: 5,
						flexShrink: 0
					},
					children: [/* @__PURE__ */ L("span", { style: {
						width: 6,
						height: 6,
						borderRadius: "50%",
						background: s,
						flexShrink: 0
					} }), /* @__PURE__ */ L("span", {
						style: {
							fontSize: 11,
							color: "var(--color-text-tertiary)",
							whiteSpace: "nowrap"
						},
						children: c
					})]
				})]
			})
		]
	});
}
//#endregion
//#region src/components/shared/SubNavLayout.tsx
function Ht(e) {
	let t = [], n = /* @__PURE__ */ new Map();
	for (let r of e) {
		let e = r.group ?? null;
		if (e === null) {
			(t.length === 0 || t[0].name !== null) && (t.unshift({
				name: null,
				items: []
			}), n.forEach((e, t) => n.set(t, e + 1))), t[0].items.push(r);
			continue;
		}
		let i = n.get(e);
		i === void 0 && (i = t.length, n.set(e, i), t.push({
			name: e,
			items: []
		})), t[i].items.push(r);
	}
	return t;
}
function Ut({ items: e, storageKey: t, title: n, renderNavItem: r }) {
	let i = N(() => Ht(e), [e]), a = i.some((e) => e.name !== null);
	return /* @__PURE__ */ L("nav", {
		className: "flex-1 overflow-y-auto py-1",
		children: a ? i.map((e) => e.name === null ? /* @__PURE__ */ L(Gt, {
			items: e.items,
			renderNavItem: r
		}, "__ungrouped") : /* @__PURE__ */ L(Kt, {
			name: e.name,
			items: e.items,
			storageKey: `${t}.${n}.${e.name}`,
			renderNavItem: r
		}, e.name)) : /* @__PURE__ */ L(Gt, {
			items: e,
			renderNavItem: r
		})
	});
}
function Wt({ title: e, items: t, titleAction: n, railHeader: r, railWidth: i = 220, storageKey: a = "subnav", secondaryTitle: o, secondaryItems: s, secondaryStorageKey: c, secondaryRailWidth: l = 200, renderNavItem: u, children: d }) {
	let f = s && s.length > 0;
	return /* @__PURE__ */ R("div", {
		className: "flex h-full min-h-0",
		children: [
			/* @__PURE__ */ R("aside", {
				className: "flex-none border-r border-[var(--color-border)] bg-[var(--color-surface)] flex flex-col overflow-hidden",
				style: { width: i },
				children: [
					/* @__PURE__ */ R("div", {
						className: "flex items-center justify-between px-4 py-[14px] border-b border-[var(--color-border)]",
						children: [/* @__PURE__ */ L("span", {
							className: "text-[11px] font-semibold text-[var(--color-text-tertiary)] uppercase tracking-[0.05em]",
							children: e
						}), n]
					}),
					r && /* @__PURE__ */ L("div", {
						className: "px-3 py-2 border-b border-[var(--color-border)]",
						children: r
					}),
					/* @__PURE__ */ L(Ut, {
						items: t,
						storageKey: a,
						title: e,
						renderNavItem: u
					})
				]
			}),
			f && /* @__PURE__ */ R("aside", {
				className: "flex-none border-r border-[var(--color-border)] bg-[var(--color-surface)] flex flex-col overflow-hidden",
				style: { width: l },
				children: [/* @__PURE__ */ L("div", {
					className: "flex items-center justify-between px-4 py-[14px] border-b border-[var(--color-border)]",
					children: /* @__PURE__ */ L("span", {
						className: "text-[11px] font-semibold text-[var(--color-text-tertiary)] uppercase tracking-[0.05em]",
						children: o ?? ""
					})
				}), /* @__PURE__ */ L(Ut, {
					items: s,
					storageKey: c ?? `${a}.secondary`,
					title: o ?? "secondary",
					renderNavItem: u
				})]
			}),
			/* @__PURE__ */ L("main", {
				className: "flex-1 min-w-0 overflow-auto p-6",
				children: d
			})
		]
	});
}
function Gt({ items: e, renderNavItem: t }) {
	return /* @__PURE__ */ L(I, { children: e.map((e) => /* @__PURE__ */ L(qt, {
		item: e,
		renderNavItem: t
	}, e.path)) });
}
function Kt({ name: e, items: t, storageKey: n, renderNavItem: r }) {
	let [i, a] = F(() => typeof window > "u" ? !1 : window.localStorage?.getItem(n) === "1");
	j(() => {
		typeof window > "u" || (i ? window.localStorage?.setItem(n, "1") : window.localStorage?.removeItem(n));
	}, [i, n]);
	let o = M(), s = P(null), c = P(null), l = () => {
		if (!i) {
			let e = typeof document > "u" ? null : document.activeElement;
			e && c.current?.contains(e) && s.current?.focus();
		}
		a((e) => !e);
	}, u = t.find((e) => e.groupScrollAfter)?.groupScrollAfter, d = u ? {
		maxHeight: u * 38,
		overflowY: "auto"
	} : void 0;
	return /* @__PURE__ */ R("section", {
		className: "border-b border-[var(--color-border)]",
		children: [/* @__PURE__ */ R("button", {
			type: "button",
			ref: s,
			onClick: l,
			className: "flex items-center gap-1.5 w-full px-3 py-2 bg-transparent border-none cursor-pointer text-[var(--color-text-tertiary)] text-[10px] font-bold tracking-[0.05em] uppercase text-left",
			"aria-expanded": !i,
			"aria-controls": o,
			children: [
				/* @__PURE__ */ L("span", {
					className: "text-[10px] w-[10px] inline-block",
					"aria-hidden": "true",
					children: i ? "▸" : "▾"
				}),
				/* @__PURE__ */ L("span", {
					className: "flex-1",
					children: e
				}),
				/* @__PURE__ */ L("span", {
					className: "text-[9px] font-medium text-[var(--color-text-tertiary)] bg-[var(--color-bg)] px-[5px] py-px rounded-[6px] border border-[var(--color-border)]",
					children: t.length
				})
			]
		}), !i && /* @__PURE__ */ L("div", {
			id: o,
			ref: c,
			style: d,
			children: t.map((e) => /* @__PURE__ */ L(qt, {
				item: e,
				renderNavItem: r
			}, e.path))
		})]
	});
}
function qt({ item: e, renderNavItem: t }) {
	let n = e.accent === "danger" ? "var(--color-danger)" : e.accent === "warning" ? "var(--color-warning)" : e.accent === "success" ? "var(--color-success)" : void 0, r = /* @__PURE__ */ R(I, { children: [/* @__PURE__ */ R("div", {
		className: "flex items-center justify-between gap-2",
		children: [/* @__PURE__ */ L("span", {
			className: "text-[13px] font-medium text-[var(--color-text-secondary)]",
			style: n ? { color: n } : void 0,
			children: e.label
		}), e.count !== void 0 && /* @__PURE__ */ L("span", {
			className: "text-[10px] font-medium text-[var(--color-text-tertiary)] bg-[var(--color-surface)] px-[6px] py-px rounded-[8px] border border-[var(--color-border)]",
			children: e.count
		})]
	}), e.hint && /* @__PURE__ */ L("div", {
		className: "text-[10px] text-[var(--color-text-tertiary)] mt-0.5",
		children: e.hint
	})] });
	return e.onClick ? /* @__PURE__ */ L("button", {
		type: "button",
		onClick: e.onClick,
		className: "block w-full px-[14px] py-2 border-l-[3px] border-transparent border-t-0 border-r-0 border-b-0 bg-transparent text-[var(--color-text-secondary)] text-left cursor-pointer font-[inherit]",
		children: r
	}) : t ? /* @__PURE__ */ L(I, { children: t(e, r, {
		display: "block",
		padding: "8px 14px",
		borderLeft: "3px solid transparent",
		color: "var(--color-text-secondary)",
		textDecoration: "none",
		cursor: "pointer"
	}) }) : /* @__PURE__ */ L("a", {
		href: e.path,
		className: "block px-[14px] py-2 border-l-[3px] border-transparent text-[var(--color-text-secondary)] no-underline cursor-pointer",
		children: r
	});
}
var Jt = {
	borderLeft: "3px solid var(--color-primary)",
	background: "var(--color-surface-hover)",
	color: "var(--color-text-primary)"
}, Yt = {
	narrow: "w-44",
	default: "w-56",
	wide: "w-64"
}, Xt = {
	surface: {
		rail: "bg-surface border-border",
		divider: "border-border",
		title: "text-text-tertiary",
		group: "text-text-tertiary",
		label: "text-text-secondary",
		labelActive: "text-text-primary",
		hint: "text-text-tertiary",
		badge: "bg-surface-inset text-text-tertiary border-border",
		hover: "hover:bg-surface-hover",
		active: "bg-surface-hover border-l-primary"
	},
	code: {
		rail: "bg-code-panel border-code-border",
		divider: "border-code-border",
		title: "text-code-muted",
		group: "text-code-muted",
		label: "text-code-subtle",
		labelActive: "text-code-text",
		hint: "text-code-muted",
		badge: "bg-code-surface text-code-subtle border-code-border",
		hover: "hover:bg-code-surface",
		active: "bg-code-surface border-l-code-blue"
	}
};
function Zt(e, t) {
	return e.id ?? e.to ?? `item-${t}`;
}
function Qt(e, t, n) {
	return !t || !e.to ? !1 : t === e.to ? !0 : n === "exact" || e.to === "/" ? !1 : t.startsWith(e.to.endsWith("/") ? e.to : `${e.to}/`);
}
function $t(e) {
	let t = [], n = [], r = /* @__PURE__ */ new Map();
	for (let i of e) {
		if (!i.group) {
			t.push(i);
			continue;
		}
		let e = r.get(i.group);
		e === void 0 && (e = n.length, r.set(i.group, e), n.push({
			name: i.group,
			items: []
		})), n[e].items.push(i);
	}
	let i = [];
	return t.length > 0 && i.push({
		name: null,
		items: t
	}), i.concat(n);
}
function en({ item: t, active: n, palette: r, renderLink: i }) {
	let a = /* @__PURE__ */ R(I, { children: [/* @__PURE__ */ R("span", {
		className: "flex items-center gap-2 min-w-0",
		children: [
			t.icon && /* @__PURE__ */ L("span", {
				className: "flex-none",
				"aria-hidden": "true",
				children: t.icon
			}),
			/* @__PURE__ */ L("span", {
				className: e("truncate text-[13px] font-medium", n ? r.labelActive : r.label),
				children: t.label
			}),
			t.badge != null && /* @__PURE__ */ L("span", {
				className: e("ml-auto flex-none rounded-full border px-1.5 text-[10px] font-medium leading-4", r.badge),
				children: t.badge
			})
		]
	}), t.hint && /* @__PURE__ */ L("span", {
		className: e("mt-0.5 block truncate text-[10px]", r.hint),
		children: t.hint
	})] }), o = e("block w-full border-l-[3px] border-transparent px-3 py-1.5 text-left no-underline", r.hover, n && r.active, t.disabled && "pointer-events-none opacity-50");
	if (t.onClick || !t.to) return /* @__PURE__ */ L("button", {
		type: "button",
		onClick: t.onClick,
		disabled: t.disabled,
		"aria-current": n ? "page" : void 0,
		className: e(o, "cursor-pointer bg-transparent font-[inherit]"),
		children: a
	});
	let s = {
		href: t.to,
		className: o,
		"aria-current": n ? "page" : void 0,
		"aria-disabled": t.disabled || void 0,
		children: a
	};
	return i ? /* @__PURE__ */ L(I, { children: i(t, s) }) : /* @__PURE__ */ L("a", { ...s });
}
function tn({ name: t, items: n, activeHref: r, match: i, palette: a, storageKey: o, renderLink: s }) {
	let [c, l] = F(() => {
		if (!o || typeof window > "u") return !1;
		try {
			return window.localStorage?.getItem(o) === "1";
		} catch {
			return !1;
		}
	});
	j(() => {
		if (!(!o || typeof window > "u")) try {
			c ? window.localStorage?.setItem(o, "1") : window.localStorage?.removeItem(o);
		} catch {}
	}, [c, o]);
	let u = M(), d = P(null), f = P(null), p = A(() => {
		if (!c) {
			let e = typeof document > "u" ? null : document.activeElement;
			e && f.current?.contains(e) && d.current?.focus();
		}
		l((e) => !e);
	}, [c]);
	return /* @__PURE__ */ R("section", { children: [/* @__PURE__ */ R("button", {
		ref: d,
		type: "button",
		onClick: p,
		"aria-expanded": !c,
		"aria-controls": u,
		className: e("flex w-full cursor-pointer items-center gap-1.5 border-none bg-transparent px-3 py-1.5 text-left text-[10px] font-bold uppercase tracking-[0.06em]", a.group),
		children: [/* @__PURE__ */ L("span", {
			"aria-hidden": "true",
			className: "inline-block w-2.5 text-[10px]",
			children: c ? "▸" : "▾"
		}), /* @__PURE__ */ L("span", {
			className: "flex-1 truncate",
			children: t
		})]
	}), !c && /* @__PURE__ */ L("div", {
		id: u,
		ref: f,
		children: n.map((e, t) => /* @__PURE__ */ L(en, {
			item: e,
			active: Qt(e, r, i),
			palette: a,
			renderLink: s
		}, Zt(e, t)))
	})] });
}
function nn({ title: t, items: n, activeHref: r, match: i = "prefix", titleAction: a, header: o, footer: s, width: c = "default", storageKey: l, renderLink: u, tone: d = "surface", "aria-label": f, className: p, "data-testid": m }) {
	let h = Xt[d], g = N(() => $t(n), [n]);
	return /* @__PURE__ */ R("nav", {
		"aria-label": f ?? (typeof t == "string" ? t : void 0) ?? "Navigation",
		"data-testid": m,
		className: e("flex flex-none flex-col overflow-hidden border-r", Yt[c], h.rail, p),
		children: [
			(t != null || a) && /* @__PURE__ */ R("div", {
				className: e("flex flex-none items-center justify-between gap-2 border-b px-3 py-2.5", h.divider),
				children: [/* @__PURE__ */ L("span", {
					className: e("truncate text-[11px] font-semibold uppercase tracking-[0.05em]", h.title),
					children: t
				}), a]
			}),
			o && /* @__PURE__ */ L("div", {
				className: e("flex-none border-b px-2 py-2", h.divider),
				children: o
			}),
			/* @__PURE__ */ L("div", {
				className: "min-h-0 flex-1 overflow-y-auto py-1",
				children: g.map((e, t) => e.name === null ? /* @__PURE__ */ L("div", { children: e.items.map((e, t) => /* @__PURE__ */ L(en, {
					item: e,
					active: Qt(e, r, i),
					palette: h,
					renderLink: u
				}, Zt(e, t))) }, "__ungrouped") : /* @__PURE__ */ L(tn, {
					name: e.name,
					items: e.items,
					activeHref: r,
					match: i,
					palette: h,
					storageKey: l ? `${l}.g${t}.${e.name}` : void 0,
					renderLink: u
				}, e.name))
			}),
			s && /* @__PURE__ */ L("div", {
				className: e("flex-none border-t px-2 py-2", h.divider),
				children: s
			})
		]
	});
}
function rn({ rails: t, activeHref: n, renderLink: r, tone: i, storageKey: a, children: o, className: s, "data-testid": c }) {
	return /* @__PURE__ */ R("div", {
		"data-testid": c,
		className: e("flex h-full min-h-0 w-full", s),
		children: [t.map(({ id: e, ...t }) => /* @__PURE__ */ L(nn, {
			...t,
			activeHref: t.activeHref ?? n,
			renderLink: t.renderLink ?? r,
			tone: t.tone ?? i,
			storageKey: a ? `${a}.${e}` : void 0
		}, e)), /* @__PURE__ */ L("div", {
			className: "flex min-h-0 min-w-0 flex-1 flex-col",
			children: o
		})]
	});
}
//#endregion
//#region src/components/shared/Toolbar.tsx
var an = {
	sm: "min-h-9 px-3 gap-2 text-xs",
	md: "min-h-11 px-4 gap-2.5 text-[13px]"
}, on = {
	surface: "bg-surface text-text-primary border-border",
	code: "bg-code-panel text-code-text border-code-border"
}, sn = {
	surface: "bg-border",
	code: "bg-code-border"
}, cn = "a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex=\"-1\"])";
function ln({ children: t, end: n, tone: r = "surface", size: i = "sm", sticky: a = !1, bordered: o = !0, wrap: s = !1, className: c, "aria-label": l = "Toolbar", "data-testid": u }) {
	let d = P(null), f = A((e) => {
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
		let r = Array.from(n.querySelectorAll(cn));
		if (r.length === 0) return;
		let i = r.indexOf(document.activeElement), a;
		a = e.key === "Home" ? 0 : e.key === "End" ? r.length - 1 : i < 0 ? 0 : (i + (e.key === "ArrowRight" ? 1 : -1) + r.length) % r.length, r[a]?.focus(), e.preventDefault();
	}, []);
	return /* @__PURE__ */ R("div", {
		ref: d,
		role: "toolbar",
		"aria-label": l,
		"aria-orientation": "horizontal",
		"data-testid": u,
		onKeyDown: f,
		className: e("flex flex-none", s ? "items-start py-1.5" : "items-center", an[i], on[r], o && "border-b", a && "sticky top-0 z-20", c),
		children: [/* @__PURE__ */ L("div", {
			className: e("flex min-w-0 flex-1 items-center gap-2", s ? "flex-wrap gap-y-1.5" : "overflow-x-auto"),
			children: t
		}), n && /* @__PURE__ */ L("div", {
			className: "flex flex-none items-center gap-2 pl-2",
			children: n
		})]
	});
}
function un({ children: t, divided: n = !1, tone: r = "surface", className: i, "aria-label": a }) {
	return /* @__PURE__ */ R(I, { children: [n && /* @__PURE__ */ L(dn, { tone: r }), /* @__PURE__ */ L("div", {
		role: a ? "group" : void 0,
		"aria-label": a,
		className: e("flex flex-none items-center gap-1.5", i),
		children: t
	})] });
}
function dn({ tone: t = "surface", className: n }) {
	return /* @__PURE__ */ L("span", {
		role: "separator",
		"aria-orientation": "vertical",
		className: e("h-4 w-px flex-none", sn[t], n)
	});
}
function fn({ children: t, tone: n = "surface", className: r }) {
	return /* @__PURE__ */ L("span", {
		className: e("flex-none whitespace-nowrap", n === "code" ? "text-code-subtle" : "text-text-tertiary", r),
		children: t
	});
}
//#endregion
//#region src/components/shared/WorkArea.tsx
var pn = {
	surface: {
		column: "bg-surface-panel",
		divider: "border-border",
		status: "bg-surface text-text-tertiary"
	},
	code: {
		column: "bg-code-bg",
		divider: "border-code-border",
		status: "bg-code-panel text-code-subtle"
	}
};
function mn({ breadcrumbs: t, toolbar: n, children: r, status: i, padded: a = !0, tone: o = "surface", className: s, bodyClassName: c, "data-testid": l }) {
	let u = pn[o];
	return /* @__PURE__ */ R("div", {
		"data-testid": l,
		className: e("flex h-full min-h-0 min-w-0 flex-1 flex-col", u.column, s),
		children: [
			t && /* @__PURE__ */ L("div", {
				className: e("flex flex-none items-center overflow-x-auto border-b px-3 py-1.5", u.divider),
				children: t
			}),
			n,
			/* @__PURE__ */ L("div", {
				className: e("min-h-0 flex-1 overflow-auto", a && "p-6", c),
				children: r
			}),
			i && /* @__PURE__ */ L("div", {
				className: e("flex flex-none items-center gap-3 border-t px-3 py-1 text-[11px]", u.divider, u.status),
				children: i
			})
		]
	});
}
//#endregion
//#region src/components/shared/Link.tsx
var hn = "text-primary no-underline hover:underline";
function gn(e) {
	let t = new Set((e ?? "").split(/\s+/).filter(Boolean));
	return t.add("noopener"), t.add("noreferrer"), [...t].join(" ");
}
function _n({ href: t, children: n, external: r = !1, unstyled: i = !1, target: a, rel: o, className: s, ...c }) {
	let l = r ? "_blank" : a, u = l === "_blank";
	return /* @__PURE__ */ L("a", {
		...c,
		href: t,
		target: l,
		rel: u ? gn(o) : o,
		className: e(!i && hn, s),
		children: n
	});
}
//#endregion
//#region src/components/pipelines/nodes/NodeCard.tsx
var vn = {
	success: "border-success",
	error: "border-danger",
	warning: "border-warning",
	info: "border-info",
	neutral: "border-border-emphasis",
	pending: "border-accent"
};
function yn({ icon: n, label: i, subtitle: a, status: o = "neutral", statusLabel: s, body: c, selected: l = !1, accentClass: u, className: d, onClick: f }) {
	let p = s ?? o.charAt(0).toUpperCase() + o.slice(1), m = vn[o];
	return /* @__PURE__ */ R(r, {
		className: e("relative w-40 transition-shadow duration-200 border-2", f && "cursor-pointer", m, l && "shadow-[0_0_0_3px_rgba(99,102,241,0.25)]", !l && "shadow-sm", !l && f && "hover:shadow-md", d),
		onClick: f,
		children: [
			u && /* @__PURE__ */ L("div", { className: e("absolute left-0 top-0 bottom-0 w-1 rounded-l-lg", u) }),
			/* @__PURE__ */ R("div", {
				className: e("flex items-center justify-between gap-2 px-2.5 py-2 border-b border-border-subtle", u && "pl-3.5"),
				children: [/* @__PURE__ */ R("div", {
					className: "flex items-center gap-1.5 min-w-0",
					children: [/* @__PURE__ */ L("span", {
						className: "text-sm leading-none shrink-0",
						"aria-hidden": "true",
						children: n
					}), /* @__PURE__ */ L("span", {
						className: "text-xs font-semibold text-text-primary truncate",
						children: i
					})]
				}), /* @__PURE__ */ L(t, {
					state: o,
					label: p,
					size: "sm"
				})]
			}),
			a && /* @__PURE__ */ L("div", {
				className: "px-2.5 pt-1.5 pb-0 text-[11px] text-neutral truncate",
				children: a
			}),
			c && /* @__PURE__ */ L("div", {
				className: "px-2.5 pb-2 pt-1 text-xs text-text-secondary",
				children: c
			})
		]
	});
}
//#endregion
//#region src/components/shared/MetaLine.tsx
var bn = {
	xs: "text-[11px]",
	sm: "text-[12px]"
}, xn = {
	tertiary: "text-text-tertiary",
	secondary: "text-text-secondary"
};
function Sn(e) {
	return e == null || e === !1 || e === !0 ? !1 : typeof e == "string" ? e.trim() !== "" : !Array.isArray(e) || te.toArray(e).some(Sn);
}
function Cn({ items: t, separator: n = "·", size: r = "xs", tone: i = "tertiary", className: a, "data-testid": o }) {
	let s = t.filter(Sn);
	return s.length === 0 ? null : /* @__PURE__ */ L("div", {
		className: e("flex flex-wrap items-center gap-x-1.5 gap-y-0.5", bn[r], xn[i], a),
		"data-testid": o,
		children: s.map((e, t) => /* @__PURE__ */ R("span", {
			className: "flex items-center gap-1.5",
			children: [t > 0 ? /* @__PURE__ */ L("span", {
				"aria-hidden": "true",
				children: n
			}) : null, e]
		}, t))
	});
}
//#endregion
//#region src/components/shared/BoardColumn.tsx
function wn({ label: t, count: n, children: r, emptyLabel: i = "Nothing here", action: a, className: o, "data-testid": s }) {
	let c = r == null || r === !1 || Array.isArray(r) && r.length === 0;
	return /* @__PURE__ */ R("section", {
		className: e("flex flex-col gap-1.5 min-w-0", o),
		"data-testid": s,
		children: [/* @__PURE__ */ R("header", {
			className: "flex items-baseline justify-between gap-2 text-[11px] uppercase tracking-[0.04em] text-text-tertiary",
			children: [/* @__PURE__ */ L("span", {
				className: "truncate",
				children: t
			}), a ?? (n === void 0 ? null : /* @__PURE__ */ L("span", {
				className: "tabular-nums",
				children: n
			}))]
		}), c ? /* @__PURE__ */ L(ee, { children: i }) : /* @__PURE__ */ L("div", {
			className: "flex flex-col gap-1.5",
			children: r
		})]
	});
}
//#endregion
//#region src/components/shared/FormRow.tsx
var Tn = {
	sm: "gap-2",
	md: "gap-3",
	lg: "gap-4"
}, En = {
	sm: "flex-col sm:flex-row",
	md: "flex-col md:flex-row"
};
function Dn({ children: t, stackBelow: n = "sm", gap: r = "md", className: i, "data-testid": a }) {
	return /* @__PURE__ */ L("div", {
		className: e("flex items-start", En[n], Tn[r], i),
		"data-testid": a,
		children: te.map(t, (e) => re(e) ? /* @__PURE__ */ L("div", {
			className: "flex-1 basis-0 min-w-0",
			children: e
		}) : e)
	});
}
//#endregion
//#region src/components/shared/DetailHeader.tsx
function On({ title: t, badge: n, description: r, meta: i, aside: a, asideWidth: o = 260, as: s = "h2", className: c, "data-testid": l }) {
	return /* @__PURE__ */ R("div", {
		className: e("flex flex-wrap items-start justify-between gap-3", c),
		"data-testid": l,
		children: [/* @__PURE__ */ R("div", {
			className: "flex flex-col gap-1.5 min-w-0 flex-1",
			children: [
				/* @__PURE__ */ R("div", {
					className: "flex flex-wrap items-center gap-2",
					children: [/* @__PURE__ */ L(s, {
						className: e("m-0", s === "h2" ? "text-[18px]" : "text-[15px]"),
						children: t
					}), n]
				}),
				r ? /* @__PURE__ */ L("p", {
					className: "m-0 max-w-[72ch] text-[13px] text-text-secondary",
					children: r
				}) : null,
				i
			]
		}), a ? /* @__PURE__ */ L("aside", {
			className: "flex flex-col gap-2 shrink-0",
			style: { width: o },
			children: a
		}) : null]
	});
}
//#endregion
//#region src/components/shared/ReviewThread.tsx
var kn = {
	problem: "problem statement",
	analysis: "analysis",
	option: "options",
	question: "question",
	answer: "answer",
	artifact: "artifact",
	revision: "revision",
	decision: "decision"
}, An = {
	problem: "info",
	analysis: "neutral",
	option: "info",
	question: "warning",
	answer: "success",
	artifact: "purple",
	revision: "info",
	decision: "accent"
};
function Z({ name: e, type: t, url: n }) {
	return /* @__PURE__ */ R("div", {
		className: "flex items-center gap-3 rounded-md border border-dashed border-border bg-surface-hover/40 px-3 py-2.5",
		children: [
			/* @__PURE__ */ L("span", {
				className: "text-lg",
				role: "img",
				"aria-label": "artifact",
				children: "🖼️"
			}),
			/* @__PURE__ */ R("div", {
				className: "min-w-0",
				children: [/* @__PURE__ */ L("div", {
					className: "truncate text-xs font-medium text-text-primary",
					children: e
				}), t && /* @__PURE__ */ L("div", {
					className: "text-[10.5px] text-text-tertiary",
					children: t
				})]
			}),
			/* @__PURE__ */ L("div", { className: "flex-1" }),
			n ? /* @__PURE__ */ L("a", {
				href: n,
				target: "_blank",
				rel: "noreferrer",
				className: "text-[11px] text-primary no-underline hover:underline",
				children: "open →"
			}) : /* @__PURE__ */ L("span", {
				className: "text-[10.5px] text-text-tertiary",
				children: "stored with the run"
			})
		]
	});
}
function jn({ post: t, labels: r, tones: i, onAnswer: a, busy: o, placeholder: s, submitLabel: c }) {
	let [l, d] = F(""), f = t.kind === "question" && !t.resolved;
	return /* @__PURE__ */ R("div", {
		className: e("border-b border-border px-4 py-3 last:border-b-0", f && "bg-warning-bg/20"),
		children: [
			/* @__PURE__ */ R("div", {
				className: "flex min-w-0 items-center gap-2",
				children: [
					t.authorKind === "human" ? /* @__PURE__ */ L(D, {
						name: t.authorName,
						size: 20
					}) : /* @__PURE__ */ L("span", {
						className: "text-[13px]",
						role: "img",
						"aria-label": "agent",
						children: "🤖"
					}),
					/* @__PURE__ */ L("span", {
						className: "truncate text-xs font-semibold text-text-primary",
						children: t.authorName
					}),
					/* @__PURE__ */ L(u, {
						tone: i[t.kind] ?? "neutral",
						size: "xs",
						uppercase: !0,
						children: r[t.kind] ?? t.kind
					}),
					f && /* @__PURE__ */ L(u, {
						tone: "warning",
						size: "xs",
						dot: "pulse",
						children: "needs a human"
					}),
					t.kind === "question" && t.resolved && /* @__PURE__ */ L(u, {
						tone: "success",
						size: "xs",
						children: "resolved"
					}),
					/* @__PURE__ */ L("div", { className: "flex-1" }),
					t.timeLabel && /* @__PURE__ */ L("span", {
						className: "whitespace-nowrap text-[11px] text-text-tertiary",
						children: t.timeLabel
					})
				]
			}),
			/* @__PURE__ */ L("div", {
				className: "mt-1.5 whitespace-pre-wrap pl-7 text-xs leading-relaxed text-text-secondary",
				children: t.body
			}),
			t.artifact && /* @__PURE__ */ L("div", {
				className: "mt-2 ml-7",
				children: /* @__PURE__ */ L(Z, {
					name: t.artifact.name,
					type: t.artifact.type,
					url: t.artifact.url
				})
			}),
			f && a && /* @__PURE__ */ R("div", {
				className: "mt-2.5 ml-7 flex flex-col gap-2",
				children: [/* @__PURE__ */ L(T, {
					value: l,
					onChange: (e) => d(e.target.value),
					placeholder: s,
					rows: 2,
					"aria-label": "Answer this question"
				}), /* @__PURE__ */ L("div", { children: /* @__PURE__ */ L(n, {
					size: "sm",
					variant: "primary",
					disabled: !l.trim() || o,
					onClick: () => a(t.id, l.trim()),
					children: o ? "Sending…" : c
				}) })]
			})
		]
	});
}
function Mn({ posts: t, onAnswer: n, answerBusy: r = !1, answerPlaceholder: i = "Answer the agent — your answer resolves the question and the loop continues.", answerLabel: a = "Answer & continue the loop", kindLabels: o, kindTones: s, emptyLabel: c = "No posts yet — an agent opens the thread by restating the problem.", className: l, "data-testid": u }) {
	let d = {
		...kn,
		...o
	}, f = {
		...An,
		...s
	};
	return /* @__PURE__ */ L("div", {
		className: e("overflow-hidden rounded-lg border border-border bg-surface", l),
		...u ? { "data-testid": u } : {},
		children: t.length === 0 ? /* @__PURE__ */ L("div", {
			className: "px-4 py-8 text-center text-xs text-text-tertiary",
			children: c
		}) : t.map((e) => /* @__PURE__ */ L(jn, {
			post: e,
			labels: d,
			tones: f,
			onAnswer: n,
			busy: r,
			placeholder: i,
			submitLabel: a
		}, e.id))
	});
}
//#endregion
//#region src/components/shared/RailLayout.tsx
var Nn = {
	sm: "lg:w-[260px]",
	md: "lg:w-[300px]",
	lg: "lg:w-[340px]"
};
function Pn({ children: t, rail: n, railWidth: r = "md", className: i, "data-testid": a }) {
	return /* @__PURE__ */ R("div", {
		className: e("flex flex-col gap-4 lg:flex-row lg:items-start", i),
		...a ? { "data-testid": a } : {},
		children: [/* @__PURE__ */ L("div", {
			className: "min-w-0 flex-1",
			children: t
		}), /* @__PURE__ */ L("aside", {
			className: e("w-full shrink-0 lg:sticky lg:top-4", Nn[r]),
			children: /* @__PURE__ */ L("div", {
				className: "overflow-hidden rounded-lg border border-border bg-surface",
				children: n
			})
		})]
	});
}
function Fn({ title: t, children: n, className: r }) {
	return /* @__PURE__ */ R("section", {
		className: e("border-b border-border px-3.5 py-3 last:border-b-0", r),
		children: [/* @__PURE__ */ L("h3", {
			className: "mb-2 text-[10px] font-semibold uppercase tracking-wide text-text-tertiary",
			children: t
		}), /* @__PURE__ */ L("div", {
			className: "flex flex-col gap-2 text-xs text-text-secondary",
			children: n
		})]
	});
}
//#endregion
//#region src/components/shared/SignoffPanel.tsx
function In({ signoffs: t, required: n = 2, actions: r, emptyHint: i, className: a, "data-testid": o }) {
	let s = t.filter((e) => e.decision === "approve").length, c = i ?? `none yet — ${n} approvals ratify the decision`;
	return /* @__PURE__ */ R("div", {
		className: e("flex flex-wrap items-center gap-3 rounded-lg border border-border bg-surface px-4 py-3", a),
		...o ? { "data-testid": o } : {},
		children: [
			/* @__PURE__ */ L("span", {
				className: "text-xs font-semibold text-text-primary",
				children: "Sign-offs"
			}),
			t.length === 0 ? /* @__PURE__ */ L("span", {
				className: "text-xs text-text-tertiary",
				children: c
			}) : /* @__PURE__ */ R(I, { children: [t.map((e) => /* @__PURE__ */ R("span", {
				className: "flex items-center gap-1.5",
				title: e.role ? `${e.name} · ${e.role}` : e.name,
				children: [
					/* @__PURE__ */ L(D, {
						name: e.name,
						size: 18
					}),
					/* @__PURE__ */ L("span", {
						className: "text-xs text-text-secondary",
						children: e.name
					}),
					/* @__PURE__ */ L(u, {
						tone: e.decision === "approve" ? "success" : "danger",
						size: "xs",
						children: e.decision === "approve" ? "✓" : "✕"
					})
				]
			}, e.name)), /* @__PURE__ */ R("span", {
				className: "text-[11px] text-text-tertiary",
				children: [
					s,
					"/",
					n,
					" approvals"
				]
			})] }),
			/* @__PURE__ */ L("div", { className: "flex-1" }),
			r
		]
	});
}
//#endregion
//#region src/components/shared/StatStrip.tsx
var Ln = {
	default: "text-text-primary",
	accent: "text-primary",
	danger: "text-danger"
};
function Q({ item: t, flush: n }) {
	return /* @__PURE__ */ R("div", {
		className: e("min-w-0 px-4 py-2.5", (n === "start" || n === "both") && "pl-0", (n === "end" || n === "both") && "pr-0"),
		children: [/* @__PURE__ */ L("div", {
			className: "whitespace-nowrap text-[10px] font-semibold uppercase tracking-wide text-text-tertiary",
			children: t.label
		}), /* @__PURE__ */ R("div", {
			className: "mt-0.5 flex min-w-0 items-baseline gap-2",
			children: [/* @__PURE__ */ L("span", {
				className: e("text-[17px] font-bold leading-none tabular-nums", Ln[t.tone ?? "default"]),
				children: t.value
			}), t.hint != null && /* @__PURE__ */ L("span", {
				className: "min-w-0 truncate text-[11px] text-text-tertiary",
				children: t.hint
			})]
		})]
	});
}
function Rn({ items: t, frameless: n = !1, className: r, "aria-label": i, "data-testid": a }) {
	return /* @__PURE__ */ L("div", {
		role: "group",
		className: e("flex divide-x divide-border overflow-x-auto", !n && "rounded-lg border border-border bg-surface", r),
		...i ? { "aria-label": i } : {},
		...a ? { "data-testid": a } : {},
		children: t.map((e, r) => {
			let i = n ? t.length === 1 ? "both" : r === 0 ? "start" : r === t.length - 1 ? "end" : void 0 : void 0;
			return e.href ? /* @__PURE__ */ L("a", {
				href: e.href,
				className: "min-w-0 flex-1 no-underline transition-colors hover:bg-surface-hover",
				children: /* @__PURE__ */ L(Q, {
					item: e,
					flush: i
				})
			}, e.label) : e.onSelect ? /* @__PURE__ */ L("button", {
				type: "button",
				onClick: e.onSelect,
				className: "min-w-0 flex-1 cursor-pointer border-none bg-transparent p-0 text-left transition-colors hover:bg-surface-hover",
				children: /* @__PURE__ */ L(Q, {
					item: e,
					flush: i
				})
			}, e.label) : /* @__PURE__ */ L("div", {
				className: "min-w-0 flex-1",
				children: /* @__PURE__ */ L(Q, {
					item: e,
					flush: i
				})
			}, e.label);
		})
	});
}
//#endregion
//#region src/components/shared/PersonHoverCard.tsx
function zn({ person: t, children: n, actions: r, details: a, interactiveChild: o = !1, openDelay: s = 450, closeDelay: c = 250, className: l, "data-testid": u = "person-hover-card" }) {
	let d = P(null), [f, p] = F(!1), m = P(null), h = A(() => {
		m.current &&= (clearTimeout(m.current), null);
	}, []);
	j(() => h, [h]);
	let g = A(() => {
		h(), m.current = setTimeout(() => p(!0), s);
	}, [h, s]), _ = A(() => {
		h(), m.current = setTimeout(() => p(!1), c);
	}, [h, c]);
	return /* @__PURE__ */ R(I, { children: [/* @__PURE__ */ L("span", {
		ref: d,
		...o ? {} : {
			tabIndex: 0,
			role: "button",
			"aria-haspopup": "dialog",
			onKeyDown: (e) => {
				(e.key === "Enter" || e.key === " ") && (e.preventDefault(), p((e) => !e)), e.key === "Escape" && p(!1);
			}
		},
		"aria-expanded": f,
		"data-testid": `${u}-trigger`,
		className: e("rounded-sm underline-offset-2", o ? "inline-flex" : "cursor-default hover:underline", l),
		onMouseEnter: g,
		onMouseLeave: _,
		onFocus: () => p(!0),
		children: n
	}), /* @__PURE__ */ L(O, {
		trigger: d,
		open: f,
		onClose: () => {
			h(), p(!1);
		},
		placement: "bottom-start",
		"aria-label": `About ${t.displayName}`,
		"data-testid": u,
		children: /* @__PURE__ */ R("div", {
			className: "w-72 p-3",
			onMouseEnter: h,
			onMouseLeave: _,
			children: [
				/* @__PURE__ */ R("div", {
					className: "flex items-start gap-3",
					children: [/* @__PURE__ */ L(D, {
						name: t.displayName,
						src: t.avatarUrl,
						color: t.color,
						size: 40
					}), /* @__PURE__ */ R("div", {
						className: "min-w-0 flex-1",
						children: [
							/* @__PURE__ */ R("div", {
								className: "flex items-center gap-1.5",
								children: [/* @__PURE__ */ L("span", {
									className: "truncate text-sm font-semibold text-text-primary",
									children: t.displayName
								}), t.online !== void 0 && /* @__PURE__ */ L(i, { state: t.online ? "online" : "offline" })]
							}),
							t.title && /* @__PURE__ */ L("div", {
								className: "truncate text-xs text-text-secondary",
								children: t.title
							}),
							t.department && /* @__PURE__ */ L("div", {
								className: "truncate text-xs text-text-tertiary",
								children: t.department
							})
						]
					})]
				}),
				t.statusText && /* @__PURE__ */ L("div", {
					className: "mt-2 truncate text-xs italic text-text-secondary",
					children: t.statusText
				}),
				(t.email || t.localTime) && /* @__PURE__ */ R("div", {
					className: "mt-2 space-y-0.5 border-t border-border pt-2",
					children: [t.email && /* @__PURE__ */ L("div", {
						className: "truncate text-xs text-text-secondary",
						children: t.email
					}), t.localTime && /* @__PURE__ */ R("div", {
						className: "text-xs text-text-tertiary",
						children: [t.localTime, " local time"]
					})]
				}),
				a && /* @__PURE__ */ L("div", {
					className: "mt-2 border-t border-border pt-2",
					children: a
				}),
				r && /* @__PURE__ */ L("div", {
					className: "mt-3 flex items-center gap-2",
					children: r
				})
			]
		})
	})] });
}
//#endregion
//#region src/components/shared/MasterDetail.tsx
function Bn(e) {
	if (!e || typeof window > "u") return !1;
	try {
		return window.localStorage.getItem(e) === "compact";
	} catch {
		return !1;
	}
}
function Vn(e, t) {
	if (!(!e || typeof window > "u")) try {
		window.localStorage.setItem(e, t ? "compact" : "expanded");
	} catch {}
}
function Hn({ direction: t }) {
	return /* @__PURE__ */ L("svg", {
		className: e("h-4 w-4", t === "right" && "rotate-180"),
		viewBox: "0 0 16 16",
		fill: "none",
		"aria-hidden": "true",
		children: /* @__PURE__ */ L("path", {
			d: "M10 3L5 8l5 5",
			stroke: "currentColor",
			strokeWidth: "1.5",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		})
	});
}
function Un({ index: t, selected: n }) {
	return /* @__PURE__ */ L("span", {
		className: e("flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-semibold", n ? "bg-primary text-white" : "bg-surface-inset text-text-tertiary"),
		children: t + 1
	});
}
function Wn({ items: t, keyOf: n, selectedKey: r, onSelect: i, renderRow: a, renderCompactRow: o, renderDetail: s, railTitle: c, railWidth: l = 340, compactWidth: u = 72, storageKey: d, emptyDetail: f, className: p, "data-testid": m = "master-detail" }) {
	let [h, g] = F(() => Bn(d)), _ = A(() => {
		g((e) => {
			let t = !e;
			return Vn(d, t), t;
		});
	}, [d]), v = N(() => t.findIndex((e) => n(e) === r), [
		t,
		n,
		r
	]), y = v >= 0 ? t[v] : null;
	return /* @__PURE__ */ R("div", {
		className: e("flex overflow-hidden rounded-lg border border-border bg-surface", p),
		"data-testid": m,
		children: [/* @__PURE__ */ R("nav", {
			className: "flex flex-shrink-0 flex-col overflow-y-auto border-r border-border",
			style: { width: h ? u : l },
			onKeyDown: (e) => {
				if (e.key !== "ArrowDown" && e.key !== "ArrowUp" || t.length === 0) return;
				e.preventDefault();
				let r = e.key === "ArrowDown" ? 1 : -1;
				i(n(t[((v >= 0 ? v : r > 0 ? -1 : 0) + r + t.length) % t.length]));
			},
			"aria-label": typeof c == "string" ? c : "Items",
			"data-testid": `${m}-rail`,
			children: [/* @__PURE__ */ R("div", {
				className: e("flex items-center gap-1 border-b border-border px-3 py-2", h ? "justify-center" : "justify-between"),
				children: [!h && c && /* @__PURE__ */ L("span", {
					className: "truncate text-xs font-semibold uppercase tracking-wide text-text-tertiary",
					children: c
				}), /* @__PURE__ */ L("button", {
					type: "button",
					onClick: _,
					"aria-label": h ? "Expand list" : "Collapse list",
					"data-testid": `${m}-toggle`,
					className: "flex-shrink-0 rounded-md p-1 text-text-tertiary transition-colors hover:bg-surface-hover hover:text-text-primary",
					children: /* @__PURE__ */ L(Hn, { direction: h ? "right" : "left" })
				})]
			}), /* @__PURE__ */ L("div", {
				className: "flex flex-col",
				children: t.map((t, s) => {
					let c = n(t), l = c === r;
					return /* @__PURE__ */ L("div", {
						role: "button",
						tabIndex: 0,
						"aria-current": l,
						onClick: () => i(c),
						onKeyDown: (e) => {
							(e.key === "Enter" || e.key === " ") && (e.preventDefault(), i(c));
						},
						"data-testid": `${m}-row-${c}`,
						className: e("cursor-pointer border-l-2 text-left transition-colors", l ? "border-primary bg-surface-hover" : "border-transparent hover:bg-surface-hover"),
						children: h ? o?.(t, s, l) ?? /* @__PURE__ */ L("div", {
							className: "flex justify-center py-2.5",
							children: /* @__PURE__ */ L(Un, {
								index: s,
								selected: l
							})
						}) : a(t, s, l)
					}, c);
				})
			})]
		}), /* @__PURE__ */ L("div", {
			className: "min-w-0 flex-1 overflow-y-auto",
			"data-testid": `${m}-detail`,
			children: y ? s(y, v) : f
		})]
	});
}
//#endregion
//#region src/components/shared/TreeView.tsx
function Gn(e) {
	let t = /* @__PURE__ */ new Map();
	e.forEach((e) => t.set(e.id, {
		...e,
		children: []
	}));
	let n = [];
	return t.forEach((e) => {
		let r = e.parentId ? t.get(e.parentId) : void 0;
		r ? r.children.push(e) : n.push(e);
	}), n;
}
function Kn(e) {
	return typeof CSS < "u" && typeof CSS.escape == "function" ? CSS.escape(e) : e;
}
function qn(e, t) {
	let n = /* @__PURE__ */ new Set();
	if (!t) return n;
	let r = new Map(e.map((e) => [e.id, e])), i = r.get(t);
	for (; i?.parentId;) n.add(i.parentId), i = r.get(i.parentId);
	return n;
}
function Jn({ expanded: t }) {
	return /* @__PURE__ */ L("svg", {
		className: e("h-3.5 w-3.5 transition-transform", t ? "" : "-rotate-90"),
		viewBox: "0 0 16 16",
		fill: "none",
		"aria-hidden": "true",
		children: /* @__PURE__ */ L("path", {
			d: "M4 6l4 4 4-4",
			stroke: "currentColor",
			strokeWidth: "1.5",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		})
	});
}
function Yn(e) {
	let t = e.currentTarget.getBoundingClientRect(), n = e.clientY - t.top;
	return n < t.height / 3 ? "before" : n > t.height * 2 / 3 ? "after" : "into";
}
function Xn({ entry: t, depth: n, expanded: r, onToggle: i, selectedId: a, onSelect: o, renderTrailing: s, dragEnabled: c, dragRef: l, dropTarget: u, setDropTarget: d, onDrop: f, testId: p, focusedId: m, setFocusedId: h }) {
	let g = r.has(t.id), _ = t.children.length > 0, v = t.id === a, y = u?.id === t.id;
	return /* @__PURE__ */ R("div", { children: [/* @__PURE__ */ R("div", {
		draggable: c && !t.disabled && t.status !== "pending",
		onDragStart: (e) => {
			t.disabled || (e.dataTransfer.setData("text/plain", t.id), e.dataTransfer.effectAllowed = "move", l.current = { id: t.id });
		},
		onDragOver: (e) => {
			let n = l.current;
			!n || n.id === t.id || (e.preventDefault(), e.dataTransfer.dropEffect = "move", d({
				id: t.id,
				position: Yn(e)
			}));
		},
		onDragLeave: () => {
			u?.id === t.id && d(null);
		},
		onDrop: (e) => {
			let n = l.current;
			if (!n || n.id === t.id) return;
			e.preventDefault();
			let r = Yn(e);
			d(null), f(t.id, r), l.current = null;
		},
		onDragEnd: () => {
			l.current = null, d(null);
		},
		onClick: () => !t.disabled && o(t.id),
		role: "treeitem",
		"aria-selected": v,
		"aria-disabled": t.disabled,
		"aria-level": n + 1,
		"aria-busy": t.status === "pending" || void 0,
		"data-status": t.status,
		..._ ? { "aria-expanded": g } : {},
		tabIndex: m === t.id ? 0 : -1,
		onFocus: () => h(t.id),
		"data-testid": `${p}-row-${t.id}`,
		className: e("group flex items-center gap-1 border-l-2 py-1.5 pr-2 text-sm transition-colors", c && !t.disabled ? "cursor-grab active:cursor-grabbing" : "cursor-pointer", v ? "border-primary bg-surface-hover font-semibold text-text-primary" : "border-transparent text-text-secondary hover:bg-surface-hover", t.disabled && "cursor-not-allowed opacity-50", t.status === "pending" && "pointer-events-none opacity-50", t.status === "moved" && "bg-success/10", y && u?.position === "into" && "ring-1 ring-inset ring-primary", y && u?.position === "before" && "shadow-[inset_0_2px_0_0_var(--color-primary)]", y && u?.position === "after" && "shadow-[inset_0_-2px_0_0_var(--color-primary)]"),
		style: { paddingLeft: n * 14 + 8 },
		children: [
			_ ? /* @__PURE__ */ L("button", {
				type: "button",
				onClick: (e) => {
					e.stopPropagation(), i(t.id);
				},
				"aria-label": g ? "Collapse" : "Expand",
				className: "flex h-5 w-5 flex-shrink-0 items-center justify-center text-text-tertiary hover:text-text-primary",
				children: /* @__PURE__ */ L(Jn, { expanded: g })
			}) : /* @__PURE__ */ L("span", {
				className: "h-5 w-5 flex-shrink-0",
				"aria-hidden": "true"
			}),
			/* @__PURE__ */ L("span", {
				className: "min-w-0 flex-1 truncate",
				title: t.title,
				children: t.title
			}),
			t.meta && /* @__PURE__ */ L("span", {
				className: "flex-shrink-0 text-xs text-text-tertiary",
				children: t.meta
			}),
			t.badge,
			s?.(t)
		]
	}), g && t.children.map((e) => /* @__PURE__ */ L(Xn, {
		entry: e,
		depth: n + 1,
		expanded: r,
		onToggle: i,
		selectedId: a,
		onSelect: o,
		renderTrailing: s,
		dragEnabled: c,
		dragRef: l,
		dropTarget: u,
		setDropTarget: d,
		onDrop: f,
		testId: p,
		focusedId: m,
		setFocusedId: h
	}, e.id))] });
}
function Zn(e, t) {
	let n = [], r = (e) => {
		for (let i of e) n.push(i.id), t.has(i.id) && i.children.length > 0 && r(i.children);
	};
	return r(e), n;
}
function Qn({ nodes: t, selectedId: n, onSelect: r, defaultExpanded: i, expanded: a, onToggle: o, onReorder: s, renderTrailing: c, className: l, "data-testid": u = "tree-view" }) {
	let d = N(() => Gn(t), [t]), [f, p] = F(() => new Set(i ?? [])), m = a !== void 0, h = N(() => m ? new Set(a) : f, [
		m,
		a,
		f
	]), [g, _] = F(null), v = P(null), y = P(null), [b, x] = F(null), S = N(() => new Map(t.map((e) => [e.id, e])), [t]);
	j(() => {
		let e = qn(t, n);
		if (e.size !== 0) {
			if (m) {
				e.forEach((e) => {
					a.includes(e) || o?.(e, !0);
				});
				return;
			}
			p((t) => {
				let n = !1, r = new Set(t);
				return e.forEach((e) => {
					r.has(e) || (r.add(e), n = !0);
				}), n ? r : t;
			});
		}
	}, [t, n]);
	let C = (e, t) => {
		o?.(e, t), !m && p((n) => {
			if (n.has(e) === t) return n;
			let r = new Set(n);
			return t ? r.add(e) : r.delete(e), r;
		});
	}, w = (e) => C(e, !h.has(e)), T = N(() => Zn(d, h), [d, h]), E = g && T.includes(g) ? g : n && T.includes(n) ? n : T[0] ?? null, D = (e) => {
		e && (_(e), y.current?.querySelector(`[data-testid="${u}-row-${Kn(e)}"]`)?.focus());
	}, O = (e) => {
		let n = e.target.closest("[role=\"treeitem\"]");
		if (!n) return;
		let i = `${u}-row-`, a = (n.getAttribute("data-testid") ?? "").slice(i.length);
		if (!a || !S.has(a)) return;
		let o = T.indexOf(a), s = S.get(a), c = t.some((e) => e.parentId === a);
		switch (e.key) {
			case "ArrowDown":
				e.preventDefault(), D(T[Math.min(o + 1, T.length - 1)] ?? null);
				return;
			case "ArrowUp":
				e.preventDefault(), D(T[Math.max(o - 1, 0)] ?? null);
				return;
			case "Home":
				e.preventDefault(), D(T[0] ?? null);
				return;
			case "End":
				e.preventDefault(), D(T[T.length - 1] ?? null);
				return;
			case "ArrowRight":
				e.preventDefault(), c && !h.has(a) ? C(a, !0) : c && D(T[o + 1] ?? null);
				return;
			case "ArrowLeft":
				e.preventDefault(), c && h.has(a) ? C(a, !1) : D(s.parentId);
				return;
			case "Enter":
			case " ":
				e.preventDefault(), s.disabled || r(a), c && w(a);
				return;
		}
	}, k = (e, n) => {
		let r = v.current?.id;
		if (!r || !s) return;
		let i = S.get(e);
		if (!i) return;
		let a = i;
		for (; a?.parentId;) {
			if (a.parentId === r) return;
			a = S.get(a.parentId);
		}
		if (n === "into") {
			let n = t.filter((t) => t.parentId === e && t.id !== r).length;
			s(r, e, n);
			return;
		}
		let o = t.filter((e) => e.parentId === i.parentId && e.id !== r).map((e) => e.id).indexOf(e);
		o !== -1 && s(r, i.parentId, n === "before" ? o : o + 1);
	};
	return t.length === 0 ? null : /* @__PURE__ */ L("div", {
		ref: y,
		role: "tree",
		className: e("flex flex-col", l),
		"data-testid": u,
		onKeyDown: O,
		children: d.map((e) => /* @__PURE__ */ L(Xn, {
			entry: e,
			depth: 0,
			expanded: h,
			onToggle: w,
			selectedId: n,
			onSelect: r,
			renderTrailing: c,
			dragEnabled: !!s,
			dragRef: v,
			dropTarget: b,
			setDropTarget: x,
			onDrop: k,
			testId: u,
			focusedId: E,
			setFocusedId: _
		}, e.id))
	});
}
//#endregion
//#region src/components/shared/WorkflowStepper.tsx
var $n = {
	sm: "h-5 w-5",
	md: "h-6 w-6"
}, er = {
	sm: "text-[10px]",
	md: "text-[11px]"
};
function tr() {
	return /* @__PURE__ */ L("svg", {
		viewBox: "0 0 16 16",
		fill: "none",
		className: "h-3 w-3",
		"aria-hidden": "true",
		children: /* @__PURE__ */ L("path", {
			d: "M3.5 8.5l3 3 6-6.5",
			stroke: "currentColor",
			strokeWidth: "1.75",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		})
	});
}
function nr({ steps: t, size: n = "md", className: r, "data-testid": i = "workflow-stepper" }) {
	return /* @__PURE__ */ L("ol", {
		className: e("flex items-center overflow-x-auto", r),
		"data-testid": i,
		children: t.map((r, i) => {
			let a = i === t.length - 1, o = t[i + 1], s = r.done ? o?.done ? "bg-success" : "bg-gradient-to-r from-success to-success/30" : "bg-border";
			return /* @__PURE__ */ R("li", {
				"aria-current": r.active ? "step" : void 0,
				className: "flex flex-1 items-center last:flex-none",
				children: [/* @__PURE__ */ R("div", {
					className: "flex items-center gap-1.5 whitespace-nowrap",
					children: [/* @__PURE__ */ L("div", {
						className: e("flex flex-shrink-0 items-center justify-center rounded-full transition-colors", $n[n], r.done ? "bg-success text-white" : r.active ? "border-2 border-info bg-info-bg" : "border border-border bg-surface-inset"),
						children: r.done ? /* @__PURE__ */ L(tr, {}) : r.active ? /* @__PURE__ */ L("span", { className: "h-2 w-2 rounded-full bg-info" }) : null
					}), /* @__PURE__ */ L("span", {
						className: e("font-medium leading-none", er[n], r.active ? "text-text-primary" : r.done ? "text-text-secondary" : "text-text-tertiary"),
						children: r.label
					})]
				}), !a && /* @__PURE__ */ L("div", { className: e("mx-2 h-1 flex-1 rounded-full transition-colors", s) })]
			}, r.step);
		})
	});
}
//#endregion
//#region src/components/shared/Wizard.tsx
function rr() {
	return /* @__PURE__ */ L("svg", {
		viewBox: "0 0 16 16",
		fill: "none",
		className: "h-3 w-3",
		"aria-hidden": "true",
		children: /* @__PURE__ */ L("path", {
			d: "M3.5 8.5l3 3 6-6.5",
			stroke: "currentColor",
			strokeWidth: "1.75",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		})
	});
}
function ir({ steps: t, activeKey: n, onStep: r, onFinish: i, finishLabel: a = "Finish", className: o, "data-testid": s = "wizard" }) {
	let c = t.findIndex((e) => e.key === n), l = c >= 0 ? t[c] : t[0], u = l?.canAdvance ?? !0, d = c === t.length - 1;
	return /* @__PURE__ */ R("div", {
		className: e("flex flex-col gap-4 sm:flex-row", o),
		"data-testid": s,
		children: [/* @__PURE__ */ L("ol", {
			className: "flex flex-shrink-0 flex-col gap-1 sm:w-56",
			"data-testid": `${s}-rail`,
			children: t.map((t, i) => {
				let a = i < c, o = t.key === n;
				return /* @__PURE__ */ L("li", { children: /* @__PURE__ */ R("button", {
					type: "button",
					onClick: () => r(t.key),
					"aria-current": o ? "step" : void 0,
					"data-testid": `${s}-step-${t.key}`,
					className: e("flex w-full items-center gap-2.5 rounded-md px-2.5 py-2 text-left text-sm transition-colors", o ? "bg-surface-hover font-semibold text-text-primary" : "text-text-secondary hover:bg-surface-hover"),
					children: [/* @__PURE__ */ L("span", {
						className: e("flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full text-[11px] font-semibold", a ? "bg-success text-white" : o ? "border-2 border-info bg-info-bg text-info-fg" : "border border-border bg-surface-inset text-text-tertiary"),
						children: a ? /* @__PURE__ */ L(rr, {}) : i + 1
					}), /* @__PURE__ */ L("span", {
						className: "truncate",
						children: t.label
					})]
				}) }, t.key);
			})
		}), /* @__PURE__ */ R("div", {
			className: "flex min-w-0 flex-1 flex-col gap-4",
			children: [/* @__PURE__ */ L("div", {
				className: "min-w-0 flex-1",
				"data-testid": `${s}-content`,
				children: l?.content
			}), /* @__PURE__ */ R("div", {
				className: "flex items-center justify-between gap-2 border-t border-border pt-3",
				children: [/* @__PURE__ */ L("button", {
					type: "button",
					onClick: () => {
						c > 0 && r(t[c - 1].key);
					},
					disabled: c <= 0,
					"data-testid": `${s}-back`,
					className: "rounded-md px-3 py-1.5 text-sm font-semibold text-text-secondary transition-colors hover:bg-surface-hover disabled:cursor-not-allowed disabled:opacity-50",
					children: "Back"
				}), /* @__PURE__ */ L("button", {
					type: "button",
					onClick: () => {
						u && (d ? i?.() : r(t[c + 1].key));
					},
					disabled: !u,
					"data-testid": `${s}-next`,
					className: "rounded-md bg-primary px-3.5 py-1.5 text-sm font-semibold text-white transition-colors hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-50",
					children: d ? a : "Next"
				})]
			})]
		})]
	});
}
//#endregion
//#region src/components/shared/MarkdownView.tsx
var ar = [
	"tsx",
	"ts",
	"jsx",
	"js",
	"json",
	"bash",
	"sh",
	"text"
];
function or(e) {
	let t = /language-(\w+)/.exec(e ?? "")?.[1]?.toLowerCase();
	return ar.includes(t ?? "") ? t : "text";
}
function $(e) {
	return typeof e == "string" || typeof e == "number" ? String(e) : Array.isArray(e) ? e.map($).join("") : e && typeof e == "object" && "props" in e ? $(e.props?.children) : "";
}
var sr = {
	table({ children: e }) {
		return /* @__PURE__ */ L("div", {
			className: "overflow-x-auto",
			children: /* @__PURE__ */ L("table", {
				className: "w-full border-collapse text-sm",
				children: e
			})
		});
	},
	th({ children: e }) {
		return /* @__PURE__ */ L("th", {
			className: "border-b border-border px-3 py-1.5 text-left font-semibold text-text-primary",
			children: e
		});
	},
	td({ children: e }) {
		return /* @__PURE__ */ L("td", {
			className: "border-b border-border px-3 py-1.5 text-text-secondary",
			children: e
		});
	},
	a({ href: e, children: t }) {
		return /* @__PURE__ */ L("a", {
			href: e,
			target: "_blank",
			rel: "noreferrer",
			className: "text-primary underline underline-offset-2 hover:text-primary-hover",
			children: t
		});
	},
	h1({ children: e }) {
		return /* @__PURE__ */ L("h1", {
			className: "mb-3 mt-6 text-xl font-bold text-text-primary first:mt-0",
			children: e
		});
	},
	h2({ children: e }) {
		return /* @__PURE__ */ L("h2", {
			className: "mb-2 mt-5 text-lg font-bold text-text-primary first:mt-0",
			children: e
		});
	},
	h3({ children: e }) {
		return /* @__PURE__ */ L("h3", {
			className: "mb-2 mt-4 text-base font-semibold text-text-primary first:mt-0",
			children: e
		});
	},
	p({ children: e }) {
		return /* @__PURE__ */ L("p", {
			className: "mb-3 text-sm leading-relaxed text-text-secondary last:mb-0",
			children: e
		});
	},
	ul({ children: e }) {
		return /* @__PURE__ */ L("ul", {
			className: "mb-3 list-disc space-y-1 pl-5 text-sm text-text-secondary",
			children: e
		});
	},
	ol({ children: e }) {
		return /* @__PURE__ */ L("ol", {
			className: "mb-3 list-decimal space-y-1 pl-5 text-sm text-text-secondary",
			children: e
		});
	},
	blockquote({ children: e }) {
		return /* @__PURE__ */ L("blockquote", {
			className: "mb-3 border-l-2 border-border pl-3 text-sm italic text-text-tertiary",
			children: e
		});
	},
	hr() {
		return /* @__PURE__ */ L("hr", { className: "my-4 border-border" });
	},
	pre({ children: e, className: t }) {
		return /* @__PURE__ */ L(cr, {
			className: t,
			children: e
		});
	},
	code({ className: e, children: t }) {
		return e ? /* @__PURE__ */ L("code", {
			className: e,
			children: t
		}) : /* @__PURE__ */ L("code", {
			className: "rounded bg-surface-inset px-1 py-0.5 text-[13px] text-text-primary",
			children: t
		});
	}
};
function cr({ children: e, className: t }) {
	let n = Array.isArray(e) ? e[0] : e, r = or(n && typeof n == "object" && "props" in n ? n.props?.className : void 0), i = $(e).replace(/\n$/, "");
	return /* @__PURE__ */ L(Te, {
		code: i,
		language: r,
		className: "mb-3",
		copyButton: !0
	});
}
function lr({ markdown: t, className: n, "data-testid": r = "markdown-view" }) {
	return /* @__PURE__ */ L("div", {
		className: e("min-w-0", n),
		"data-testid": r,
		children: /* @__PURE__ */ L(oe, {
			remarkPlugins: [se],
			components: sr,
			children: t
		})
	});
}
//#endregion
//#region src/components/shared/Tooltip.tsx
function ur(e, t, n) {
	switch (t) {
		case "top": return {
			position: "fixed",
			bottom: window.innerHeight - e.top + n,
			left: e.left + e.width / 2,
			transform: "translateX(-50%)"
		};
		case "left": return {
			position: "fixed",
			top: e.top + e.height / 2,
			right: window.innerWidth - e.left + n,
			transform: "translateY(-50%)"
		};
		case "right": return {
			position: "fixed",
			top: e.top + e.height / 2,
			left: e.right + n,
			transform: "translateY(-50%)"
		};
		default: return {
			position: "fixed",
			top: e.bottom + n,
			left: e.left + e.width / 2,
			transform: "translateX(-50%)"
		};
	}
}
function dr({ content: t, children: n, placement: r = "top", openDelay: i = 350, closeDelay: a = 100, disabled: o = !1, className: s, "data-testid": c = "tooltip" }) {
	let [l, u] = F(!1), [d, f] = F(null), p = P(null), m = P(null), h = M(), g = A(() => {
		m.current &&= (clearTimeout(m.current), null);
	}, []);
	j(() => g, [g]);
	let _ = A(() => {
		let e = p.current;
		e && f(ur(e.getBoundingClientRect(), r, 6));
	}, [r]);
	ae(() => {
		l ? _() : f(null);
	}, [l, _]);
	let v = A(() => {
		o || (g(), m.current = setTimeout(() => u(!0), i));
	}, [
		g,
		o,
		i
	]), y = A(() => {
		g(), m.current = setTimeout(() => u(!1), a);
	}, [g, a]), b = A(() => {
		g(), u(!1);
	}, [g]);
	return /* @__PURE__ */ R(I, { children: [/* @__PURE__ */ L("span", {
		ref: p,
		className: "inline-flex",
		onMouseEnter: v,
		onMouseLeave: y,
		onFocus: () => {
			g(), u(!0);
		},
		onBlur: b,
		onKeyDown: (e) => {
			e.key === "Escape" && b();
		},
		"aria-describedby": l ? h : void 0,
		children: n
	}), l && d && typeof document < "u" && B(/* @__PURE__ */ L("div", {
		role: "tooltip",
		id: h,
		"data-testid": c,
		className: e("pointer-events-none z-[9500] max-w-xs rounded-md border border-border bg-surface px-2 py-1 text-xs text-text-primary shadow-lg", s),
		style: d,
		children: t
	}), document.body)] });
}
//#endregion
export { ct as $, Jt as A, Tt as B, ln as C, le as Ct, nn as D, de as Dt, dn as E, ce as Et, At as F, X as G, Ct as H, kt as I, ht as J, vt as K, Ot as L, Lt as M, Mt as N, rn as O, jt as P, ut as Q, Et as R, mn as S, fe as St, fn as T, pe as Tt, xt as U, wt as V, yt as W, ft as X, pt as Y, dt as Z, Dn as _, U as _t, Qn as a, W as at, yn as b, Te as bt, Rn as c, Ke as ct, Fn as d, Be as dt, ot as et, Z as f, ze as ft, On as g, Me as gt, Mn as h, Ie as ht, nr as i, Ze as it, Vt as j, Wt as k, In as l, We as lt, An as m, Fe as mt, lr as n, tt as nt, Wn as o, Xe as ot, kn as p, Re as pt, gt as q, ir as r, $e as rt, zn as s, Ye as st, dr as t, K as tt, Pn as u, He as ut, wn as v, je as vt, un as w, me as wt, _n as x, ue as xt, Cn as y, Ne as yt, Dt as z };
