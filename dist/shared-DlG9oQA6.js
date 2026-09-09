import "./ToastProvider-BKjV21G4.js";
import { t as e } from "./cn-DhjIN-s0.js";
import "./DetailSection-DD8ayw5R.js";
import { t } from "./Button-wU9TwJvB.js";
import { t as n } from "./Card-DWAlG4MZ.js";
import "./FormField-BpwfwG7t.js";
import "./IconButton-C3DMtvSx.js";
import "./SegmentedControl-pVesnE3W.js";
import "./Banner-C3Wgh62A.js";
import "./Chart-DUoOhhMu.js";
import { c as r, f as i, l as a, p as o, s, t as c } from "./Chip-YhQI5B9P.js";
import { t as l } from "./overlayStack-BFH9XXvN.js";
import { t as u } from "./Modal-CyoyiNKN.js";
import "./ConfirmDialog-Cd8NZEXi.js";
import { t as d } from "./EmptyState-ClmWoqCb.js";
import { n as f } from "./PermissionDeniedCard-_tOyQ7zf.js";
import { n as p, t as m } from "./CardHeader-C-7rFLKD.js";
import { i as h, n as g, r as _, t as v } from "./focusTrap-CmWJlptm.js";
import "./SkeletonCard-CGe8XFPB.js";
import { c as y, i as b, s as x } from "./ChannelHeader-oAzX0935.js";
import "./FileUploadDrop-BRRQBXdS.js";
import "./DockedPanelContext-pH9A5z1h.js";
import { t as S } from "./Input-DLknWXri.js";
import { t as C } from "./Textarea-Dz4doxTv.js";
import { n as w, t as T } from "./Avatar-BzicCOft.js";
import { i as E } from "./FloatingPanel-CVnSIFM0.js";
import "./StatusDot-Bgx2zxgC.js";
import { t as D } from "./PresenceDot-3gBZGPvX.js";
import "./Badge-B_L-ZBbN.js";
import "./PresenceAvatars-BkzMACtv.js";
import { t as O } from "./InlinePopover-DFdI8hw1.js";
import { t as k } from "./ActivityFeed-C9KAtqCl.js";
import "./Select-CqVokE2v.js";
import "./NumberInput-PlADgrip.js";
import "./Checkbox-DqN9RkXK.js";
import { Children as A, createContext as ee, isValidElement as te, useCallback as j, useContext as ne, useEffect as M, useId as N, useLayoutEffect as re, useMemo as P, useRef as F, useState as I } from "react";
import { Fragment as L, jsx as R, jsxs as z } from "react/jsx-runtime";
import { Command as B } from "cmdk";
import { createPortal as V } from "react-dom";
import ie from "react-markdown";
import ae from "remark-gfm";
//#region src/components/ui/Stack.tsx
var oe = {
	none: "gap-0",
	xs: "gap-1.5",
	sm: "gap-2",
	md: "gap-3",
	lg: "gap-4",
	xl: "gap-6"
}, se = {
	start: "items-start",
	center: "items-center",
	end: "items-end",
	baseline: "items-baseline",
	stretch: "items-stretch"
}, ce = {
	start: "justify-start",
	center: "justify-center",
	end: "justify-end",
	between: "justify-between"
};
function H(t, { gap: n = "md", align: r, justify: i, wrap: a }) {
	return e("flex", t === "col" ? "flex-col" : "flex-row", oe[n], r ? se[r] : void 0, i ? ce[i] : void 0, a ? "flex-wrap" : void 0);
}
function le({ children: t, gap: n, align: r, justify: i, wrap: a = !1, as: o = "div", className: s, ...c }) {
	return /* @__PURE__ */ R(o, {
		className: e(H("col", {
			gap: n,
			align: r,
			justify: i,
			wrap: a
		}), s),
		...c,
		children: t
	});
}
function ue({ children: t, gap: n = "sm", align: r = "center", justify: i, wrap: a = !0, as: o = "div", className: s, ...c }) {
	return /* @__PURE__ */ R(o, {
		className: e(H("row", {
			gap: n,
			align: r,
			justify: i,
			wrap: a
		}), s),
		...c,
		children: t
	});
}
//#endregion
//#region src/components/shared/CodeBlock.tsx
var de = /* @__PURE__ */ "import.export.from.as.const.let.var.function.return.default.if.else.switch.case.break.new.typeof.instanceof.in.of.interface.type.extends.implements.class.async.await.true.false.null.undefined.this.super.try.catch.finally.throw.for.while.do.continue.public.private.protected.readonly.static.enum".split("."), fe = [
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
], pe = /* @__PURE__ */ "cd.ls.echo.cat.grep.sed.awk.find.cp.mv.rm.mkdir.rmdir.touch.chmod.chown.pwd.which.npm.yarn.pnpm.npx.git.node.curl.wget".split(".");
function me(e) {
	return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function he(e, t) {
	let n = e.replace(/(\/\/.*?)(\n|$)/g, `<span style="color:${t.comment}">$1</span>$2`);
	n = n.replace(/(\/\*[\s\S]*?\*\/)/g, `<span style="color:${t.comment}">$1</span>`), n = n.replace(/("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)/g, `<span style="color:${t.string}">$1</span>`);
	let r = RegExp(`\\b(${de.join("|")})\\b`, "g");
	return n = n.replace(r, `<span style="color:${t.keyword}">$1</span>`), n = n.replace(/\b(\d+(?:\.\d+)?)\b/g, `<span style="color:${t.number}">$1</span>`), n;
}
function ge(e, t) {
	let n = e.replace(/("(?:[^"\\]|\\.)*")(\s*:)/g, `<span style="color:${t.property}">$1</span>$2`);
	return n = n.replace(/("(?:[^"\\]|\\.)*")/g, `<span style="color:${t.string}">$1</span>`), n = n.replace(/\b(true|false|null)\b/g, `<span style="color:${t.keyword}">$1</span>`), n = n.replace(/\b(-?\d+(?:\.\d+)?)\b/g, `<span style="color:${t.number}">$1</span>`), n;
}
function _e(e, t) {
	let n = e.replace(/(#.*?)(\n|$)/g, `<span style="color:${t.comment}">$1</span>$2`);
	n = n.replace(/("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')/g, `<span style="color:${t.string}">$1</span>`);
	let r = RegExp(`\\b(${fe.join("|")})\\b`, "g");
	n = n.replace(r, `<span style="color:${t.keyword}">$1</span>`);
	let i = RegExp(`\\b(${pe.join("|")})\\b`, "g");
	return n = n.replace(i, `<span style="color:${t.builtin}">$1</span>`), n = n.replace(/(\$\w+|\$\{[^}]+\})/g, `<span style="color:${t.variable}">$1</span>`), n;
}
var ve = {
	comment: "var(--color-neutral)",
	string: "#4ade80",
	keyword: "var(--color-state-pending)",
	number: "#fbbf24",
	property: "#7dd3fc",
	builtin: "#c4b5fd",
	variable: "#fbbf24"
}, ye = {
	comment: "var(--color-neutral)",
	string: "#15803d",
	keyword: "var(--color-info-fg)",
	number: "#a16207",
	property: "#0369a1",
	builtin: "var(--color-cat-ai)",
	variable: "#a16207"
};
function be(e, t, n) {
	let r = n === "dark" ? ve : ye, i = me(e);
	switch (t) {
		case "json": return ge(i, r);
		case "bash":
		case "sh": return _e(i, r);
		case "text": return i;
		default: return he(i, r);
	}
}
function U({ code: t, language: n = "tsx", theme: r = "dark", copyButton: i = !0, showLineNumbers: a = !1, className: o, style: s, "data-testid": c, ariaLabel: l }) {
	let [u, d] = I(!1), f = j(() => {
		typeof navigator > "u" || !navigator.clipboard || navigator.clipboard.writeText(t).then(() => {
			d(!0), setTimeout(() => d(!1), 1500);
		}).catch(() => {});
	}, [t]), p = r === "dark", m = P(() => t.split("\n"), [t]), h = P(() => be(t, n, r), [
		t,
		n,
		r
	]);
	return /* @__PURE__ */ z("div", {
		"data-testid": c,
		"data-language": n,
		"data-theme": r,
		className: e("relative rounded-lg border font-mono text-[13px] leading-relaxed overflow-hidden", p ? "bg-surface-inverse text-text-inverse border-border-emphasis" : "bg-surface-panel text-text-primary border-border", o),
		style: s,
		"aria-label": l ?? `Code (${n})`,
		children: [i && /* @__PURE__ */ R("button", {
			type: "button",
			onClick: f,
			"aria-label": u ? "Copied" : "Copy code",
			className: e("absolute top-2 right-2 text-[11px] px-2 py-1 rounded border transition-opacity", p ? "bg-surface-inverse text-text-inverse border-border-emphasis hover:bg-neutral" : "bg-surface text-text-primary border-border-emphasis hover:bg-surface-hover"),
			"data-copied": u ? "true" : "false",
			children: u ? "Copied" : "Copy"
		}), /* @__PURE__ */ R("pre", {
			className: "m-0 px-4 py-3 overflow-x-auto",
			children: a ? /* @__PURE__ */ z("div", {
				className: "flex",
				children: [/* @__PURE__ */ R("div", {
					className: e("select-none pr-3 text-right", p ? "text-neutral" : "text-text-tertiary"),
					"aria-hidden": "true",
					children: m.map((e, t) => /* @__PURE__ */ R("div", { children: t + 1 }, t))
				}), /* @__PURE__ */ R("code", {
					className: "flex-1 block",
					dangerouslySetInnerHTML: { __html: h }
				})]
			}) : /* @__PURE__ */ R("code", {
				className: "block",
				dangerouslySetInnerHTML: { __html: h }
			})
		})]
	});
}
//#endregion
//#region src/components/shared/CommandPalette.tsx
var xe = "cui:command-palette:recents", Se = 5;
function Ce(e, t) {
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
function we(e, t) {
	if (!(!e || typeof window > "u")) try {
		window.localStorage.setItem(e, JSON.stringify(t));
	} catch {}
}
var W = ee(null);
function G() {
	let e = ne(W);
	if (!e) throw Error("useCommandPalette must be used inside a <CommandPaletteProvider>.");
	return e;
}
function Te() {
	let { open: e, close: t, toggle: n, isOpen: r, query: i } = G();
	return {
		open: e,
		close: t,
		toggle: n,
		isOpen: r,
		query: i
	};
}
function K(e, t) {
	let n = t.toLowerCase().split("+").map((e) => e.trim()).filter(Boolean);
	if (n.length === 0) return !1;
	let r = n[n.length - 1], i = new Set(n.slice(0, -1)), a = i.has("cmd") || i.has("meta"), o = i.has("ctrl"), s = i.has("mod"), c = i.has("shift"), l = i.has("alt");
	if (s) {
		if (!e.metaKey && !e.ctrlKey) return !1;
	} else if (a !== e.metaKey || o !== e.ctrlKey) return !1;
	return c !== e.shiftKey || l !== e.altKey ? !1 : e.key.toLowerCase() === r;
}
function Ee({ commands: e, getDynamicCommands: t, recentsKey: n = xe, recentsLimit: r = Se, children: i }) {
	let [a, o] = I(!1), [s, c] = I(""), [l, u] = I(() => /* @__PURE__ */ new Map()), [d, f] = I(() => Ce(n, r)), p = j((e) => {
		n !== null && f((t) => {
			let i = [e, ...t.filter((t) => t !== e)].slice(0, r);
			return we(n, i), i;
		});
	}, [n, r]), m = j(() => o(!0), []), h = j(() => {
		o(!1), c("");
	}, []), g = j(() => o((e) => !e), []), _ = j((e) => {
		u((t) => {
			let n = new Map(t);
			return n.set(e.id, e), n;
		});
	}, []), v = j((e) => {
		u((t) => {
			if (!t.has(e)) return t;
			let n = new Map(t);
			return n.delete(e), n;
		});
	}, []);
	M(() => {
		let e = (e) => {
			(e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k" && (e.preventDefault(), o((e) => !e));
		};
		return window.addEventListener("keydown", e, !0), () => window.removeEventListener("keydown", e, !0);
	}, []);
	let y = P(() => {
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
	]), b = F(y);
	b.current = y, M(() => {
		let e = (e) => {
			if (!((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k")) {
				for (let t of b.current) if (t.hotkey && K(e, t.hotkey)) {
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
	return /* @__PURE__ */ R(W.Provider, {
		value: x,
		children: i
	});
}
function De(e) {
	let { registerCommand: t, unregisterCommand: n } = G();
	M(() => (t(e), () => n(e.id)), [
		e,
		t,
		n
	]);
}
function Oe(e) {
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
function ke({ placeholder: t = "Type a command or search…", emptyState: n, className: r } = {}) {
	let { isOpen: i, close: a, query: o, setQuery: s, mergedCommands: c, recents: l, noteSelection: d } = G(), f = P(() => {
		if (o.trim() !== "" || l.length === 0) return [];
		let e = new Map(c.map((e) => [e.id, e]));
		return l.map((t) => e.get(t)).filter((e) => !!e);
	}, [
		c,
		o,
		l
	]), p = P(() => Oe(c), [c]), m = j((e) => {
		d(e.id), a(), Promise.resolve().then(() => e.run());
	}, [a, d]);
	return /* @__PURE__ */ R(u, {
		open: i,
		onClose: a,
		ariaLabel: "Command palette",
		maxWidth: 640,
		rawChildren: !0,
		backdropTestId: "command-palette-backdrop",
		children: /* @__PURE__ */ z(B, {
			label: "Command palette",
			value: void 0,
			className: e("flex flex-col gap-0 w-full", r),
			"data-testid": "command-palette",
			children: [/* @__PURE__ */ R(B.Input, {
				value: o,
				onValueChange: s,
				placeholder: t,
				"data-autofocus": !0,
				className: e("w-full px-3 py-2.5 text-sm border-0 border-b border-border", "outline-none bg-transparent text-text-primary placeholder:text-text-tertiary"),
				"data-testid": "command-palette-input"
			}), /* @__PURE__ */ z(B.List, {
				className: "max-h-[360px] overflow-y-auto py-2",
				children: [
					/* @__PURE__ */ R(B.Empty, {
						className: "px-3 py-6 text-center text-sm text-text-tertiary",
						children: n ?? "No results."
					}),
					f.length > 0 && /* @__PURE__ */ R(B.Group, {
						heading: "Recent",
						"data-testid": "command-palette-group-recent",
						children: f.map((t) => /* @__PURE__ */ z(B.Item, {
							value: `recent-${t.id} ${t.label}`,
							keywords: t.keywords,
							onSelect: () => m(t),
							"data-testid": `command-palette-recent-${t.id}`,
							className: e("flex items-center gap-2 px-3 py-2 mx-1 rounded-md cursor-pointer text-sm", "text-text-primary aria-selected:bg-surface-hover"),
							children: [t.icon && /* @__PURE__ */ R("span", {
								className: "shrink-0 text-text-secondary",
								children: t.icon
							}), /* @__PURE__ */ R("span", {
								className: "flex-1 truncate",
								children: t.label
							})]
						}, `recent-${t.id}`))
					}),
					p.map(({ groupName: t, items: n }) => /* @__PURE__ */ R(B.Group, {
						heading: t ?? void 0,
						children: n.map((t) => /* @__PURE__ */ z(B.Item, {
							value: `${t.id} ${t.label} ${(t.keywords ?? []).join(" ")}`,
							keywords: t.keywords,
							onSelect: () => m(t),
							"data-testid": `command-palette-item-${t.id}`,
							className: e("flex items-center gap-2 px-3 py-2 mx-1 rounded-md cursor-pointer text-sm", "text-text-primary aria-selected:bg-surface-hover"),
							children: [
								t.icon && /* @__PURE__ */ R("span", {
									className: "shrink-0 text-text-secondary",
									children: t.icon
								}),
								/* @__PURE__ */ R("span", {
									className: "flex-1 truncate",
									children: t.label
								}),
								t.hint && /* @__PURE__ */ R("span", {
									className: "text-xs text-text-tertiary truncate",
									children: t.hint
								}),
								t.shortcut && t.shortcut.length > 0 && /* @__PURE__ */ R("span", {
									className: "flex items-center gap-1 shrink-0",
									children: t.shortcut.map((n, r) => /* @__PURE__ */ R("kbd", {
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
function Ae({ className: t } = {}) {
	let { toggle: n } = G();
	return /* @__PURE__ */ z("button", {
		type: "button",
		onClick: n,
		"data-testid": "command-palette-hint",
		className: e("inline-flex items-center gap-1.5 px-2 py-1 rounded-md", "text-xs text-text-secondary bg-surface-hover", "border border-border hover:bg-surface-panel", "cursor-pointer transition-colors", t),
		"aria-label": "Open command palette",
		children: [/* @__PURE__ */ R("kbd", {
			className: "font-mono text-[11px]",
			children: "⌘K"
		}), /* @__PURE__ */ R("span", { children: "Search" })]
	});
}
//#endregion
//#region src/components/shared/CapabilityDeniedFallback.tsx
var je = "🔒";
function Me({ capabilityName: e, title: t, description: n, actionLabel: r, onAction: i, actions: a, icon: o, testId: s = "capability-denied-fallback" }) {
	let c = t ?? (e ? `${e} is unavailable` : "Feature unavailable"), l = n ?? (e ? `${e} is not enabled for this workspace. Contact your administrator to request access.` : "This feature is not enabled for your account. Contact your administrator to request access.");
	return /* @__PURE__ */ R(d, {
		icon: o === null ? void 0 : o ?? je,
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
function Ne({ icon: t = "⚠️", title: n, body: r, description: i, actionLabel: a, onAction: o, action: s, testId: c = "error-state", actionTestId: l = "error-state-action" }) {
	let u = i ?? r;
	return /* @__PURE__ */ z("div", {
		role: "alert",
		"data-testid": c,
		className: e("flex flex-col items-center justify-center min-h-[220px]", "text-text-secondary gap-2 p-8 font-[inherit]"),
		children: [
			t && (typeof t == "string" ? /* @__PURE__ */ R("div", {
				className: "text-[52px] mb-2",
				"aria-hidden": !0,
				children: t
			}) : /* @__PURE__ */ R("div", {
				className: "mb-2",
				children: t
			})),
			/* @__PURE__ */ R("div", {
				className: "text-[17px] font-semibold text-[var(--color-state-error,#dc2626)]",
				children: n
			}),
			u && /* @__PURE__ */ R("div", {
				className: "text-[13px] text-center max-w-[340px] text-text-secondary leading-normal",
				children: u
			}),
			s ? /* @__PURE__ */ R("div", {
				className: "mt-2.5",
				children: s
			}) : a && o && /* @__PURE__ */ R("button", {
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
function Pe({ label: t = "Loading…", description: n, spinnerSize: r = "lg", spinnerColor: i, testId: a = "loading-state" }) {
	return /* @__PURE__ */ z("div", {
		role: "status",
		"aria-live": "polite",
		"data-testid": a,
		className: e("flex flex-col items-center justify-center min-h-[220px]", "text-text-secondary gap-3 p-8 font-[inherit]"),
		children: [
			/* @__PURE__ */ R(f, {
				size: r,
				color: i,
				decorative: !0
			}),
			/* @__PURE__ */ R("div", {
				className: "text-[15px] font-medium text-text-primary",
				children: t
			}),
			n && /* @__PURE__ */ R("div", {
				className: "text-[13px] text-center max-w-[340px] text-text-secondary leading-normal",
				children: n
			})
		]
	});
}
//#endregion
//#region src/components/shared/ShortcutsHelp.tsx
var Fe = [
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
function Ie({ open: t, onClose: n }) {
	return /* @__PURE__ */ z(u, {
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
			/* @__PURE__ */ R("div", {
				className: "text-base font-semibold text-text-primary mb-2.5",
				children: "Keyboard shortcuts"
			}),
			/* @__PURE__ */ R("div", {
				className: "overflow-y-auto pr-1",
				children: Fe.map((t, n) => /* @__PURE__ */ z("div", { children: [/* @__PURE__ */ R("div", {
					className: e("text-[12px] font-bold text-text-primary uppercase tracking-[0.05em] mb-1.5", n === 0 ? "mt-0 pt-0" : "mt-4 pt-1.5 border-t border-border-subtle"),
					children: t.title
				}), /* @__PURE__ */ R("div", { children: t.rows.map((n, r) => /* @__PURE__ */ z("div", {
					className: e("flex items-baseline justify-between py-1 text-[13px] gap-4", n.planned && "opacity-60"),
					"data-planned": n.planned ? "true" : void 0,
					children: [/* @__PURE__ */ R("span", {
						className: e("font-mono text-[12px] border rounded px-1.5 py-px whitespace-nowrap shrink-0", n.planned ? "text-text-tertiary bg-surface border-border-subtle line-through" : "text-text-primary bg-surface-hover border-border"),
						children: n.keys
					}), /* @__PURE__ */ z("span", {
						className: "text-neutral text-right flex-1",
						children: [n.action, n.planned && /* @__PURE__ */ R("span", {
							className: "ml-1.5 text-[10px] uppercase tracking-wide text-text-tertiary",
							children: "planned"
						})]
					})]
				}, `${t.title}-${r}`)) })] }, t.title))
			}),
			/* @__PURE__ */ R("div", {
				className: "flex justify-end mt-[18px]",
				children: /* @__PURE__ */ R("button", {
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
var Le = {
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
function Re({ targetId: e = "main-content", children: t = "Skip to main content", className: n, onSkip: r }) {
	let [i, a] = I(!1);
	return /* @__PURE__ */ R("a", {
		href: `#${e}`,
		className: n,
		style: i ? Le : x,
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
function ze(e, t) {
	let [n, r] = I(e), i = F(e), a = F(0), o = F(null);
	return M(() => {
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
	}, [e, t]), M(() => () => {
		o.current && clearTimeout(o.current);
	}, []), n;
}
function Be({ message: e, politeness: t = "polite", atomic: n = !0, throttleMs: r = 0, role: i = "status", "data-testid": a }) {
	let o = ze(e, r);
	return /* @__PURE__ */ R(y, {
		as: "div",
		"data-testid": a,
		children: /* @__PURE__ */ R("div", {
			...i === "none" ? null : { role: i },
			"aria-live": t,
			"aria-atomic": n,
			children: o
		})
	});
}
//#endregion
//#region src/components/shared/StatCard.tsx
var Ve = {
	positive: "text-[var(--color-success)]",
	negative: "text-[var(--color-danger)]",
	neutral: "text-[var(--color-text-secondary)]"
};
function He(e) {
	return e.tone ?? (e.direction === "up" ? "positive" : "negative");
}
function Ue({ label: t, value: n, accent: r = !1, danger: i = !1, hint: a, title: o, delta: s, sparklineData: c, to: l, as: u, onClick: d, mono: f = !1, className: m, style: h, "data-testid": g }) {
	let _ = e("block rounded-lg border p-3 no-underline transition-colors", !r && !i && "bg-[var(--color-surface)] border-[var(--color-border)]", r && "bg-[var(--color-primary-soft)] border-l-[3px] border-l-[var(--color-primary)] border-[var(--color-border)]", i && "bg-[var(--color-danger-bg)] border-l-[3px] border-l-[var(--color-danger)] border-[var(--color-border)]", (l || d) && "hover:bg-[var(--color-surface-hover)] cursor-pointer", m), v = c && c.length > 0 ? c : null, y = null;
	if (s) {
		let t = He(s), n = s.direction === "up" ? "▲" : "▼", r = s.direction === "up" ? "+" : "-", i = s.suffix ?? "%", a = Math.abs(s.value), o = s["aria-label"] ?? `${s.direction} ${a}${i}`;
		y = /* @__PURE__ */ z("div", {
			"data-testid": "stat-card-delta",
			"data-direction": s.direction,
			"data-tone": t,
			"aria-label": o,
			className: e("mt-1 text-[12px] font-medium leading-tight", Ve[t]),
			children: [
				/* @__PURE__ */ z("span", {
					"aria-hidden": "true",
					children: [n, " "]
				}),
				r,
				a,
				i
			]
		});
	}
	let b = /* @__PURE__ */ z(L, { children: [
		/* @__PURE__ */ R("div", {
			className: "text-[12px] uppercase tracking-wide text-[var(--color-text-tertiary)]",
			children: t
		}),
		/* @__PURE__ */ z("div", {
			className: "mt-1 flex items-center gap-2",
			children: [/* @__PURE__ */ R("div", {
				className: e("text-[24px] font-bold leading-tight text-[var(--color-text-primary)]", f && "font-mono"),
				children: n
			}), v && /* @__PURE__ */ R(p, {
				data: v,
				width: 80,
				height: 20
			})]
		}),
		y,
		a != null && /* @__PURE__ */ R("div", {
			className: "mt-1 text-[11px] italic text-[var(--color-text-tertiary)]",
			children: a
		})
	] });
	return l ? u ? /* @__PURE__ */ R(u, {
		to: l,
		title: o,
		"data-testid": g,
		className: _,
		style: h,
		children: b
	}) : /* @__PURE__ */ R("a", {
		href: l,
		title: o,
		"data-testid": g,
		className: _,
		style: h,
		children: b
	}) : d ? /* @__PURE__ */ R("button", {
		type: "button",
		onClick: d,
		title: o,
		"data-testid": g,
		className: e(_, "w-full text-left"),
		style: h,
		children: b
	}) : /* @__PURE__ */ R("div", {
		"data-testid": g,
		title: o,
		className: _,
		style: h,
		children: b
	});
}
//#endregion
//#region src/components/shared/FollowBanner.tsx
function We({ name: t, onStop: n, autoStopOnInteract: r = !0, className: i, "data-testid": a = "follow-banner" }) {
	let o = F(null);
	return M(() => {
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
	]), t ? /* @__PURE__ */ z("div", {
		"data-testid": a,
		className: e("flex items-center justify-center gap-2 px-4 py-1.5 shrink-0", "bg-info-bg border-b border-info-border text-info-fg text-[12.5px] font-medium", i),
		children: [/* @__PURE__ */ z("span", { children: ["Following ", t] }), /* @__PURE__ */ R("button", {
			type: "button",
			onClick: n,
			className: "text-[11.5px] font-semibold px-2 py-0.5 rounded border border-info-border bg-transparent text-info-fg cursor-pointer",
			children: "Stop"
		})]
	}) : null;
}
//#endregion
//#region src/components/shared/SuggestionCard.tsx
function q({ reason: t, title: n, label: r, tone: i = "neutral", meta: o, context: s, onSelect: c, actionLabel: l = "Use this", disabled: u = !1, className: d, "data-testid": f }) {
	return /* @__PURE__ */ z("button", {
		type: "button",
		"data-testid": f,
		onClick: c,
		disabled: u,
		"aria-label": `${n} — ${t}`,
		className: e("group w-full text-left flex flex-col gap-1.5 rounded-lg border p-3 transition-colors", "border-border bg-surface hover:border-border-emphasis hover:bg-surface-hover", "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1", u ? "opacity-60 cursor-not-allowed" : "cursor-pointer", d),
		children: [
			/* @__PURE__ */ z("span", {
				className: "flex items-center gap-2 min-w-0",
				children: [r && /* @__PURE__ */ R("span", {
					className: e("shrink-0 text-[10px] font-semibold uppercase tracking-wide px-1.5 py-0.5 rounded", a[i]),
					children: r
				}), /* @__PURE__ */ R("span", {
					className: "text-[11px] text-text-secondary truncate",
					children: t
				})]
			}),
			/* @__PURE__ */ R("span", {
				className: "text-[13px] font-medium text-text-primary line-clamp-2",
				children: n
			}),
			(o || s) && /* @__PURE__ */ z("span", {
				className: "flex items-center gap-2 text-[11px] text-text-tertiary min-w-0",
				children: [o, s && /* @__PURE__ */ R("span", {
					className: "truncate",
					children: s
				})]
			}),
			/* @__PURE__ */ z("span", {
				"aria-hidden": "true",
				className: "text-[11px] font-semibold text-primary opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity",
				children: [l, " →"]
			})
		]
	});
}
//#endregion
//#region src/components/shared/TaskComposer.tsx
function Ge({ title: n, description: r, titlePlaceholder: i = "Title", promptPlaceholder: a = "What should it do?", suggestions: o, suggestionsTitle: s = "Suggested next", suggestionsLoading: c = !1, suggestionsEmpty: l, onSubmit: u, onChooseSuggestion: d, submitLabel: f = "Queue", hint: p, busy: m = !1, className: h, "data-testid": g }) {
	let [_, v] = I(""), [y, b] = I(""), [x, w] = I(void 0), T = N(), E = N();
	M(() => {
		x && o && !o.some((e) => e.id === x) && w(void 0);
	}, [x, o]);
	let D = _.trim().length > 0 && y.trim().length > 0 && !m;
	function O() {
		D && (u({
			title: _.trim(),
			prompt: y.trim(),
			...x ? { suggestionId: x } : {}
		}), v(""), b(""), w(void 0));
	}
	function k(e) {
		d?.(e), v(e.fillTitle ?? e.title), b(e.prompt), w(e.id);
	}
	let A = c || (o?.length ?? 0) > 0 || !!l;
	return /* @__PURE__ */ z("section", {
		"data-testid": g,
		className: e("rounded-lg border border-border bg-surface overflow-hidden", h),
		children: [
			/* @__PURE__ */ z("div", {
				className: "px-3.5 pt-3 pb-1",
				children: [/* @__PURE__ */ R("h3", {
					className: "text-xs font-semibold text-text-secondary tracking-wide select-none uppercase",
					children: n
				}), r && /* @__PURE__ */ R("p", {
					className: "mt-1 text-[12px] text-text-tertiary",
					children: r
				})]
			}),
			A && /* @__PURE__ */ z("div", {
				className: "px-3.5 pt-2 pb-1",
				children: [/* @__PURE__ */ R("div", {
					className: "text-[11px] font-semibold text-text-tertiary tracking-wide uppercase mb-2",
					children: s
				}), c ? /* @__PURE__ */ R("div", {
					className: "grid gap-2 sm:grid-cols-2 lg:grid-cols-4",
					"aria-busy": "true",
					children: [
						0,
						1,
						2,
						3
					].map((e) => /* @__PURE__ */ R("div", { className: "h-[92px] rounded-lg border border-border bg-surface-panel animate-pulse" }, e))
				}) : (o?.length ?? 0) > 0 ? /* @__PURE__ */ R("div", {
					className: "grid gap-2 sm:grid-cols-2 lg:grid-cols-4",
					children: o.map((e) => /* @__PURE__ */ R(q, {
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
				}) : /* @__PURE__ */ R("div", {
					className: "text-[12px] text-text-tertiary",
					children: l
				})]
			}),
			/* @__PURE__ */ z("div", {
				className: "px-3.5 pt-2 pb-2 flex flex-col gap-2",
				children: [
					/* @__PURE__ */ R("label", {
						className: "sr-only",
						htmlFor: T,
						children: i
					}),
					/* @__PURE__ */ R(S, {
						id: T,
						value: _,
						onChange: (e) => v(e.target.value),
						placeholder: i,
						disabled: m
					}),
					/* @__PURE__ */ R("label", {
						className: "sr-only",
						htmlFor: E,
						children: a
					}),
					/* @__PURE__ */ R(C, {
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
			/* @__PURE__ */ z("div", {
				className: "px-3.5 pb-3 flex items-center gap-3",
				children: [
					p && /* @__PURE__ */ R("span", {
						className: "text-[11px] text-text-tertiary select-none",
						children: p
					}),
					/* @__PURE__ */ R("span", { className: "flex-1" }),
					/* @__PURE__ */ R(t, {
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
var J = 4, Ke = 3;
function qe({ name: n, title: r, subtitle: i, imageUrl: a, matchedSkills: o, otherSkills: s = [], contexts: l = [], evidence: u = [], evidenceLabel: d = "Seen in", onAsk: f, askLabel: p = "Ask for help", footerExtra: m, onOpen: h, className: g, "data-testid": _ }) {
	let v = s.filter((e) => !o.some((t) => t.name.toLowerCase() === e.toLowerCase())), y = u.slice(0, Ke), b = v.slice(0, J);
	return /* @__PURE__ */ z("div", {
		"data-testid": _,
		onClick: h,
		className: e("flex flex-col gap-2.5 rounded-lg border border-border bg-surface p-3.5 min-w-0", h && "cursor-pointer hover:border-border-emphasis hover:bg-surface-hover transition-colors", g),
		children: [
			/* @__PURE__ */ z("div", {
				className: "flex items-center gap-2.5 min-w-0",
				children: [/* @__PURE__ */ R(T, {
					name: n,
					size: 36,
					...a ? { src: a } : {}
				}), /* @__PURE__ */ z("div", {
					className: "flex flex-col min-w-0",
					children: [/* @__PURE__ */ R("span", {
						className: "text-[13.5px] font-semibold text-text-primary truncate",
						children: n
					}), (r || i) && /* @__PURE__ */ z("span", {
						className: "text-[11.5px] text-text-secondary truncate",
						children: [
							r,
							r && i ? " · " : "",
							i
						]
					})]
				})]
			}),
			o.length > 0 && /* @__PURE__ */ z("div", {
				className: "flex flex-wrap items-center gap-1",
				children: [
					o.map((e) => /* @__PURE__ */ R(c, {
						tone: "accent",
						size: "xs",
						solid: (e.strength ?? 0) >= .7,
						children: e.name
					}, e.name)),
					b.map((e) => /* @__PURE__ */ R(c, {
						tone: "neutral",
						size: "xs",
						children: e
					}, e)),
					v.length > J && /* @__PURE__ */ z("span", {
						className: "text-[10.5px] text-text-tertiary",
						children: ["+", v.length - J]
					})
				]
			}),
			l.length > 0 && /* @__PURE__ */ z("div", {
				className: "text-[11px] text-text-tertiary truncate",
				title: l.join(", "),
				children: ["Working on ", l.join(", ")]
			}),
			y.length > 0 && /* @__PURE__ */ z("div", {
				className: "flex flex-col gap-1 min-w-0",
				children: [/* @__PURE__ */ R("span", {
					className: "text-[10px] font-semibold uppercase tracking-wide text-text-tertiary select-none",
					children: d
				}), y.map((e) => /* @__PURE__ */ z("div", {
					className: "flex items-center gap-1.5 min-w-0",
					children: [e.source && /* @__PURE__ */ R(c, {
						tone: "neutral",
						size: "xs",
						mono: !0,
						children: e.source
					}), e.href ? /* @__PURE__ */ R("a", {
						href: e.href,
						onClick: (e) => e.stopPropagation(),
						className: "text-[11.5px] text-text-secondary no-underline hover:underline truncate",
						children: e.title
					}) : /* @__PURE__ */ R("span", {
						className: "text-[11.5px] text-text-secondary truncate",
						children: e.title
					})]
				}, e.id))]
			}),
			(f || m) && /* @__PURE__ */ z("div", {
				className: "mt-auto pt-1 flex items-center gap-2",
				children: [
					m,
					/* @__PURE__ */ R("span", { className: "flex-1" }),
					f && /* @__PURE__ */ R(t, {
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
var Je = {
	pending: "warning",
	answered: "success",
	expired: "neutral",
	withdrawn: "neutral"
};
function Ye({ question: n, context: r, origin: i = [], askedAt: a, status: o, answer: s, answeredBy: l, onAnswer: u, answerPlaceholder: d = "Answer the agent — it is waiting on this…", busy: f = !1, footer: p, className: m, "data-testid": h }) {
	let [g, _] = I(""), v = g.trim().length > 0 && !f;
	function y() {
		!v || !u || (u(g.trim()), _(""));
	}
	return /* @__PURE__ */ z("section", {
		"data-testid": h,
		className: e("rounded-lg border bg-surface p-3.5 flex flex-col gap-2.5 min-w-0", o === "pending" ? "border-warning/50" : "border-border", m),
		children: [
			/* @__PURE__ */ z("div", {
				className: "flex items-center gap-2 min-w-0",
				children: [
					/* @__PURE__ */ R(c, {
						tone: Je[o],
						size: "xs",
						dot: o === "pending" ? "pulse" : "static",
						uppercase: !0,
						children: o === "pending" ? "agent waiting" : o
					}),
					i.map((e) => /* @__PURE__ */ R(c, {
						tone: "neutral",
						size: "xs",
						mono: !0,
						children: e
					}, e)),
					/* @__PURE__ */ R("span", { className: "flex-1" }),
					a && /* @__PURE__ */ R("span", {
						className: "text-[10.5px] text-text-tertiary whitespace-nowrap",
						children: a
					})
				]
			}),
			/* @__PURE__ */ R("p", {
				className: "m-0 text-[13.5px] font-medium text-text-primary leading-snug",
				children: n
			}),
			r && /* @__PURE__ */ R("p", {
				className: "m-0 text-[12px] text-text-secondary leading-snug border-l-2 border-border pl-2.5",
				children: r
			}),
			o === "answered" && s && /* @__PURE__ */ z("div", {
				className: "flex flex-col gap-1",
				children: [/* @__PURE__ */ z("span", {
					className: "text-[10px] font-semibold uppercase tracking-wide text-text-tertiary select-none",
					children: ["Answer", l ? ` — ${l}` : ""]
				}), /* @__PURE__ */ R("p", {
					className: "m-0 text-[12.5px] text-text-primary leading-snug",
					children: s
				})]
			}),
			o === "expired" && /* @__PURE__ */ R("p", {
				className: "m-0 text-[11.5px] text-text-tertiary",
				children: "Expired unanswered — the agent stopped waiting."
			}),
			o === "pending" && u && /* @__PURE__ */ z("div", {
				className: "flex flex-col gap-2",
				children: [/* @__PURE__ */ R(C, {
					value: g,
					onChange: (e) => _(e.target.value),
					placeholder: d,
					rows: 2,
					disabled: f,
					onKeyDown: (e) => {
						e.key === "Enter" && (e.metaKey || e.ctrlKey) && (e.preventDefault(), y());
					}
				}), /* @__PURE__ */ z("div", {
					className: "flex items-center gap-2",
					children: [
						p,
						/* @__PURE__ */ R("span", { className: "flex-1" }),
						/* @__PURE__ */ R(t, {
							size: "sm",
							onClick: y,
							disabled: !v,
							children: f ? "Sending…" : "Send answer"
						})
					]
				})]
			}),
			o !== "pending" && p && /* @__PURE__ */ R("div", {
				className: "flex items-center gap-2",
				children: p
			})
		]
	});
}
//#endregion
//#region src/components/shared/DiffViewer.tsx
var Xe = /^@@ -(\d+)(?:,\d+)? \+(\d+)(?:,\d+)? @@/;
function Y(e) {
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
		let e = a.match(Xe);
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
var Ze = {
	added: "success",
	deleted: "danger",
	renamed: "info",
	modified: "neutral"
}, Qe = {
	critical: "danger",
	warning: "warning",
	info: "info"
}, X = {
	add: "bg-success-bg/40",
	del: "bg-danger-bg/40",
	ctx: "",
	hunk: "bg-surface-hover"
};
function $e({ a: e }) {
	return /* @__PURE__ */ z("div", {
		className: "flex items-start gap-2 px-3 py-2 border-y border-border bg-surface-panel",
		children: [/* @__PURE__ */ R(c, {
			tone: Qe[e.severity ?? "info"],
			size: "xs",
			uppercase: !0,
			children: e.severity ?? "note"
		}), /* @__PURE__ */ z("div", {
			className: "min-w-0",
			children: [/* @__PURE__ */ R("span", {
				className: "text-[12px] text-text-primary leading-snug",
				children: e.note
			}), e.author && /* @__PURE__ */ z("span", {
				className: "ml-2 text-[10.5px] text-text-tertiary whitespace-nowrap",
				children: ["— ", e.author]
			})]
		})]
	});
}
function et({ file: t, annotations: n, collapsed: r, onToggle: i, maxLines: a }) {
	let { pinned: o, floating: s } = P(() => {
		let e = /* @__PURE__ */ new Map(), r = [], i = new Set(t.lines.filter((e) => e.newNo != null).map((e) => e.newNo));
		for (let t of n) if (t.line != null && i.has(t.line)) {
			let n = e.get(t.line) ?? [];
			n.push(t), e.set(t.line, n);
		} else r.push(t);
		return {
			pinned: e,
			floating: r
		};
	}, [t, n]), l = t.lines.slice(0, a), u = t.lines.length > a;
	return /* @__PURE__ */ z("div", {
		className: "border border-border rounded-lg overflow-hidden bg-surface",
		children: [/* @__PURE__ */ z("button", {
			type: "button",
			onClick: i,
			"aria-expanded": !r,
			className: "w-full flex items-center gap-2 px-3 py-2 bg-surface-panel border-0 cursor-pointer text-left hover:bg-surface-hover min-w-0",
			children: [
				/* @__PURE__ */ R("span", {
					"aria-hidden": !0,
					className: "text-[10px] text-text-tertiary",
					children: r ? "▸" : "▾"
				}),
				/* @__PURE__ */ R("span", {
					className: "text-[12px] font-mono font-semibold text-text-primary truncate",
					children: t.oldPath ? `${t.oldPath} → ${t.path}` : t.path
				}),
				/* @__PURE__ */ R(c, {
					tone: Ze[t.status],
					size: "xs",
					children: t.status
				}),
				n.length > 0 && /* @__PURE__ */ z(c, {
					tone: "warning",
					size: "xs",
					mono: !0,
					children: [
						n.length,
						" note",
						n.length === 1 ? "" : "s"
					]
				}),
				/* @__PURE__ */ R("span", { className: "flex-1" }),
				/* @__PURE__ */ z("span", {
					className: "text-[11px] font-mono tabular-nums whitespace-nowrap",
					children: [
						/* @__PURE__ */ z("span", {
							className: "text-success",
							children: ["+", t.adds]
						}),
						" ",
						/* @__PURE__ */ z("span", {
							className: "text-danger",
							children: ["−", t.dels]
						})
					]
				})
			]
		}), !r && /* @__PURE__ */ z("div", {
			className: "overflow-x-auto",
			children: [s.map((e, t) => /* @__PURE__ */ R($e, { a: e }, `f${t}`)), t.binary ? /* @__PURE__ */ R("div", {
				className: "px-3 py-2 text-[12px] text-text-tertiary",
				children: "Binary file — no text diff."
			}) : /* @__PURE__ */ R("table", {
				className: "w-full border-collapse font-mono text-[11.5px] leading-[1.5]",
				children: /* @__PURE__ */ z("tbody", { children: [l.map((t, n) => t.kind === "hunk" ? /* @__PURE__ */ R("tr", {
					className: X.hunk,
					children: /* @__PURE__ */ R("td", {
						colSpan: 3,
						className: "px-3 py-0.5 text-[10.5px] text-text-tertiary select-none",
						children: t.text
					})
				}, n) : /* @__PURE__ */ z(L, { children: [/* @__PURE__ */ z("tr", {
					className: X[t.kind],
					children: [
						/* @__PURE__ */ R("td", {
							className: "w-[3.2em] px-1.5 text-right text-[10px] text-text-tertiary select-none align-top tabular-nums border-r border-border/60",
							children: t.oldNo ?? ""
						}),
						/* @__PURE__ */ R("td", {
							className: "w-[3.2em] px-1.5 text-right text-[10px] text-text-tertiary select-none align-top tabular-nums border-r border-border/60",
							children: t.newNo ?? ""
						}),
						/* @__PURE__ */ z("td", {
							className: e("px-2 whitespace-pre align-top", t.kind === "add" && "text-success", t.kind === "del" && "text-danger", t.kind === "ctx" && "text-text-secondary"),
							children: [/* @__PURE__ */ R("span", {
								className: "select-none inline-block w-[1ch] mr-1 text-text-tertiary",
								children: t.kind === "add" ? "+" : t.kind === "del" ? "-" : " "
							}), t.text || " "]
						})
					]
				}, n), t.newNo != null && o.get(t.newNo)?.map((e, t) => /* @__PURE__ */ R("tr", { children: /* @__PURE__ */ R("td", {
					colSpan: 3,
					className: "p-0",
					children: /* @__PURE__ */ R($e, { a: e })
				}) }, `${n}-a${t}`))] })), u && /* @__PURE__ */ R("tr", { children: /* @__PURE__ */ z("td", {
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
function tt({ diff: t, annotations: n = [], defaultCollapsed: r = !1, maxLinesPerFile: i = 800, truncatedNote: a, className: o, "data-testid": s }) {
	let c = P(() => Y(t), [t]), [l, u] = I(() => r ? new Set(c.map((e) => e.path)) : /* @__PURE__ */ new Set()), d = F(/* @__PURE__ */ new Map()), f = P(() => {
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
	if (c.length === 0) return /* @__PURE__ */ R("div", {
		"data-testid": s,
		className: e("text-[12px] text-text-tertiary", o),
		children: "No parseable diff."
	});
	let h = c.reduce((e, t) => e + t.adds, 0), g = c.reduce((e, t) => e + t.dels, 0);
	return /* @__PURE__ */ z("div", {
		"data-testid": s,
		className: e("flex flex-col gap-2 min-w-0", o),
		children: [
			/* @__PURE__ */ z("div", {
				className: "flex items-center gap-1.5 flex-wrap",
				children: [/* @__PURE__ */ z("span", {
					className: "text-[11px] text-text-secondary font-medium whitespace-nowrap",
					children: [
						c.length,
						" file",
						c.length === 1 ? "" : "s",
						" ",
						/* @__PURE__ */ z("span", {
							className: "font-mono tabular-nums",
							children: [
								/* @__PURE__ */ z("span", {
									className: "text-success",
									children: ["+", h]
								}),
								" ",
								/* @__PURE__ */ z("span", {
									className: "text-danger",
									children: ["−", g]
								})
							]
						})
					]
				}), c.map((t) => /* @__PURE__ */ R("button", {
					type: "button",
					onClick: () => m(t.path),
					title: t.path,
					className: e("px-1.5 py-0.5 rounded border border-border bg-surface text-[10.5px] font-mono cursor-pointer", "text-text-secondary hover:border-border-emphasis hover:text-text-primary truncate max-w-[220px]", (f.get(t.path)?.length ?? 0) > 0 && "border-warning/60"),
					children: t.path.split("/").pop()
				}, t.path))]
			}),
			a && /* @__PURE__ */ R("div", {
				className: "text-[11px] text-warning",
				children: a
			}),
			c.map((e) => /* @__PURE__ */ R("div", {
				ref: (t) => {
					d.current.set(e.path, t);
				},
				children: /* @__PURE__ */ R(et, {
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
var nt = {
	1: "sm:grid-cols-1",
	2: "sm:grid-cols-2",
	3: "sm:grid-cols-3",
	4: "sm:grid-cols-4"
};
function rt({ children: t, columns: n = 4, dense: r = !1, className: i, style: a, "data-testid": o = "kpi-grid" }) {
	return /* @__PURE__ */ R("div", {
		"data-testid": o,
		className: e("grid grid-cols-1", nt[n], r ? "gap-2" : "gap-4", i),
		style: a,
		children: t
	});
}
//#endregion
//#region src/components/shared/ProgressBar.tsx
var it = {
	sm: "h-1.5",
	md: "h-2"
};
function at({ value: t, max: n = 100, color: r, size: i = "md", label: a, showRatio: o = !0, className: s, style: c, "data-testid": l, "aria-label": u }) {
	let d = n > 0 ? n : 100, f = Math.max(0, Math.min(t, d)), p = Math.min(100, f / d * 100), m = r ?? "var(--color-primary)";
	return /* @__PURE__ */ z("div", {
		"data-testid": l,
		className: e("w-full", s),
		style: c,
		children: [a != null && /* @__PURE__ */ z("div", {
			className: "flex items-center justify-between mb-1 text-[12px] text-[var(--color-text-secondary)]",
			children: [/* @__PURE__ */ R("span", { children: a }), /* @__PURE__ */ R("span", {
				className: "text-[var(--color-text-tertiary)] tabular-nums",
				children: o ? `${f}/${d}` : `${Math.round(p)}%`
			})]
		}), /* @__PURE__ */ R("div", {
			role: "progressbar",
			"aria-valuenow": f,
			"aria-valuemin": 0,
			"aria-valuemax": d,
			"aria-label": u,
			className: e("w-full rounded-full overflow-hidden bg-[var(--color-surface-hover)]", it[i]),
			children: /* @__PURE__ */ R("div", {
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
function ot({ name: t, label: n, avatarSize: r = 20, avatarColor: i, presence: a, onClick: o, className: s, style: c, title: l, "data-testid": u = "user-chip" }) {
	return /* @__PURE__ */ z(o ? "button" : "span", {
		type: o ? "button" : void 0,
		onClick: o,
		title: l ?? t,
		"data-testid": u,
		className: e("inline-flex items-center gap-1.5 rounded-full px-1.5 py-0.5 text-[12px] text-text-primary", o && "hover:bg-surface-hover cursor-pointer transition-colors", !o && "cursor-default", s),
		style: c,
		children: [
			/* @__PURE__ */ R(T, {
				name: t,
				size: r,
				color: i
			}),
			/* @__PURE__ */ R("span", {
				className: "font-medium leading-none",
				children: n ?? t
			}),
			a && /* @__PURE__ */ R(D, {
				state: a,
				size: "xs"
			})
		]
	});
}
//#endregion
//#region src/components/shared/EntityCell.tsx
function st({ label: t, id: n, href: r, mono: i = !1, className: a, labelClassName: o }) {
	let s = /* @__PURE__ */ R("span", {
		className: "truncate",
		children: t
	});
	return /* @__PURE__ */ z("div", {
		className: e("flex flex-col min-w-0", a),
		children: [/* @__PURE__ */ R("div", {
			className: e("font-medium text-[var(--color-text-primary)] truncate text-sm", o),
			children: r ? /* @__PURE__ */ R("a", {
				href: r,
				className: "hover:text-[var(--color-primary)] hover:underline",
				children: s
			}) : s
		}), n && /* @__PURE__ */ R("div", {
			className: e("text-[10px] font-mono text-[var(--color-text-tertiary)] truncate mt-0.5", i && "tracking-tight"),
			children: n
		})]
	});
}
//#endregion
//#region src/components/shared/Drawer.tsx
function ct({ open: t, onClose: n, title: r, subtitle: i, width: a = 460, children: o, footer: s, "aria-label": c, "data-testid": u }) {
	let d = F(null), f = F(null), p = N(), m = l(t);
	return M(() => {
		if (!t) return;
		let e = (e) => {
			if (e.key === "Escape") {
				m() && n();
				return;
			}
			m() && _(e, d.current);
		};
		return window.addEventListener("keydown", e), () => window.removeEventListener("keydown", e);
	}, [
		t,
		n,
		m
	]), M(() => {
		if (t) return f.current = typeof document < "u" ? document.activeElement : null, v(d.current), () => {
			g(f.current), f.current = null;
		};
	}, [t]), t ? V(/* @__PURE__ */ z("div", {
		className: "fixed inset-0 z-[9000]",
		"data-testid": u,
		children: [/* @__PURE__ */ R("div", {
			className: "absolute inset-0 bg-black/30 backdrop-blur-[1px]",
			onClick: n,
			"aria-hidden": "true"
		}), /* @__PURE__ */ z("aside", {
			ref: d,
			role: "dialog",
			"aria-modal": "true",
			"aria-labelledby": r ? p : void 0,
			"aria-label": r ? void 0 : c,
			className: e("absolute right-0 top-0 h-full bg-surface shadow-xl flex flex-col", "transition-transform duration-200", t ? "translate-x-0" : "translate-x-full"),
			style: { width: a },
			children: [
				/* @__PURE__ */ z("div", {
					className: "flex items-start justify-between p-5 border-b border-[var(--color-border)] flex-shrink-0",
					children: [/* @__PURE__ */ z("div", {
						className: "min-w-0",
						children: [r && /* @__PURE__ */ R("h2", {
							id: p,
							className: "text-base font-semibold text-[var(--color-text-primary)]",
							children: r
						}), i && /* @__PURE__ */ R("p", {
							className: "text-sm text-[var(--color-text-secondary)] mt-0.5",
							children: i
						})]
					}), /* @__PURE__ */ R("button", {
						type: "button",
						onClick: n,
						className: "ml-4 flex-shrink-0 p-1 rounded hover:bg-[var(--color-surface-hover)] text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] transition-colors",
						"aria-label": "Close",
						children: /* @__PURE__ */ R("svg", {
							width: "16",
							height: "16",
							viewBox: "0 0 16 16",
							fill: "none",
							children: /* @__PURE__ */ R("path", {
								d: "M4 4l8 8M12 4l-8 8",
								stroke: "currentColor",
								strokeWidth: "1.5",
								strokeLinecap: "round"
							})
						})
					})]
				}),
				/* @__PURE__ */ R("div", {
					className: "flex-1 overflow-y-auto p-5",
					children: o
				}),
				s && /* @__PURE__ */ R("div", {
					className: "flex-shrink-0 border-t border-[var(--color-border)] p-4 bg-[var(--color-surface-inset,#f8fafc)]",
					children: s
				})
			]
		})]
	}), document.body) : null;
}
//#endregion
//#region src/components/shared/CollapsibleSection.tsx
function lt(e, t) {
	if (!e || typeof window > "u") return t;
	try {
		let n = window.localStorage.getItem(e);
		return n === null ? t : n === "true";
	} catch {
		return t;
	}
}
function ut({ title: t, defaultOpen: n = !1, badge: r, children: i, className: a, storageKey: o }) {
	let [s, c] = I(() => lt(o, n)), l = N(), u = F(null), d = F(null);
	return M(() => {
		if (o && !(typeof window > "u")) try {
			window.localStorage.setItem(o, String(s));
		} catch {}
	}, [s, o]), /* @__PURE__ */ z("div", {
		className: e("border border-[var(--color-border)] rounded-lg overflow-hidden", a),
		children: [/* @__PURE__ */ z("button", {
			type: "button",
			ref: u,
			className: "w-full flex items-center justify-between px-4 py-3 bg-[var(--color-surface)] hover:bg-[var(--color-surface-hover)] transition-colors text-left",
			onClick: () => {
				if (s) {
					let e = typeof document > "u" ? null : document.activeElement;
					e && d.current?.contains(e) && u.current?.focus();
				}
				c((e) => !e);
			},
			"aria-expanded": s,
			"aria-controls": l,
			children: [/* @__PURE__ */ R("span", {
				className: "text-sm font-semibold text-[var(--color-text-primary)]",
				children: t
			}), /* @__PURE__ */ z("div", {
				className: "flex items-center gap-2",
				children: [r, /* @__PURE__ */ R("svg", {
					className: e("w-4 h-4 text-[var(--color-text-tertiary)] transition-transform", s && "rotate-180"),
					viewBox: "0 0 16 16",
					fill: "none",
					"aria-hidden": "true",
					children: /* @__PURE__ */ R("path", {
						d: "M4 6l4 4 4-4",
						stroke: "currentColor",
						strokeWidth: "1.5",
						strokeLinecap: "round",
						strokeLinejoin: "round"
					})
				})]
			})]
		}), s && /* @__PURE__ */ R("div", {
			id: l,
			ref: d,
			className: "border-t border-[var(--color-border)] bg-surface",
			children: i
		})]
	});
}
//#endregion
//#region src/components/shared/SearchInput.tsx
var dt = {
	surface: {
		icon: "text-[var(--color-text-tertiary)]",
		field: "border-[var(--color-border-field,#d1d5db)] bg-surface text-[var(--color-text-primary)] placeholder:text-[var(--color-text-tertiary)] focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)]",
		clear: "text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)]"
	},
	code: {
		icon: "text-code-muted",
		field: "border-code-border bg-code-surface text-code-text placeholder:text-code-muted focus:ring-code-blue focus:border-code-blue",
		clear: "text-code-muted hover:text-code-text hover:bg-code-raised"
	}
};
function ft({ value: t, onChange: n, placeholder: r, onClear: i, tone: a = "surface", className: o, inputClassName: s, style: c, autoFocus: l, "aria-label": u, "data-testid": d }) {
	let f = dt[a] ?? dt.surface;
	return /* @__PURE__ */ z("div", {
		className: e("relative inline-flex items-center", o),
		style: c,
		children: [
			/* @__PURE__ */ z("svg", {
				className: e("absolute left-3 w-3.5 h-3.5 pointer-events-none", f.icon),
				viewBox: "0 0 16 16",
				fill: "none",
				"aria-hidden": "true",
				children: [/* @__PURE__ */ R("circle", {
					cx: "7",
					cy: "7",
					r: "4.5",
					stroke: "currentColor",
					strokeWidth: "1.5"
				}), /* @__PURE__ */ R("path", {
					d: "M10.5 10.5L14 14",
					stroke: "currentColor",
					strokeWidth: "1.5",
					strokeLinecap: "round"
				})]
			}),
			/* @__PURE__ */ R("input", {
				type: "text",
				value: t,
				onChange: (e) => n(e.target.value),
				placeholder: r ?? "Search…",
				autoFocus: l,
				"aria-label": u ?? r ?? "Search",
				"data-testid": d,
				className: e("w-full pl-8 pr-7 py-1.5 text-sm rounded-md border focus:outline-none focus:ring-2 transition-colors", f.field, s)
			}),
			t && /* @__PURE__ */ R("button", {
				type: "button",
				onClick: () => {
					n(""), i?.();
				},
				className: e("absolute right-2 p-0.5 rounded", f.clear),
				"aria-label": "Clear search",
				children: /* @__PURE__ */ R("svg", {
					width: "12",
					height: "12",
					viewBox: "0 0 12 12",
					fill: "none",
					children: /* @__PURE__ */ R("path", {
						d: "M2 2l8 8M10 2l-8 8",
						stroke: "currentColor",
						strokeWidth: "1.5",
						strokeLinecap: "round"
					})
				})
			})
		]
	});
}
//#endregion
//#region src/components/shared/InlineAlert.tsx
var pt = {
	error: "bg-[var(--color-danger-bg,#fef2f2)] border-[var(--color-danger,#dc2626)] text-[var(--color-danger,#dc2626)]",
	success: "bg-[var(--color-success-bg,#f0fdf4)] border-[var(--color-success,#16a34a)] text-[var(--color-success,#16a34a)]",
	info: "bg-[var(--color-info-bg,#eff6ff)] border-[var(--color-info,#2563eb)] text-[var(--color-info,#2563eb)]",
	warning: "bg-[var(--color-warning-bg,#fffbeb)] border-[var(--color-warning,#f59e0b)] text-[var(--color-warning,#f59e0b)]"
}, mt = {
	surface: pt,
	code: {
		error: "bg-code-surface border-code-red text-code-red",
		success: "bg-code-surface border-code-green text-code-green",
		info: "bg-code-surface border-code-blue text-code-blue",
		warning: "bg-code-surface border-code-peach text-code-peach"
	}
};
function ht({ tone: t, palette: n = "surface", children: r, onDismiss: i, className: a }) {
	return /* @__PURE__ */ z("div", {
		role: t === "error" || t === "warning" ? "alert" : "status",
		"aria-live": t === "error" || t === "warning" ? "assertive" : "polite",
		className: e("flex items-start gap-2 px-3 py-2 rounded-md border-l-[3px] text-sm", (mt[n] ?? pt)[t], a),
		children: [/* @__PURE__ */ R("span", {
			className: "flex-1",
			children: r
		}), i && /* @__PURE__ */ R("button", {
			type: "button",
			onClick: i,
			"aria-label": "Dismiss",
			className: "flex-shrink-0 opacity-70 hover:opacity-100",
			children: "✕"
		})]
	});
}
//#endregion
//#region src/components/shared/PageHeader.tsx
function gt({ title: t, description: n, actions: r, back: i, badge: a, className: o }) {
	return /* @__PURE__ */ z("div", {
		className: e("flex flex-col gap-1.5", o),
		children: [
			i && /* @__PURE__ */ z("a", {
				href: i.to,
				onClick: i.onClick,
				className: "inline-flex items-center gap-1 text-xs text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] mb-1 w-fit",
				children: [/* @__PURE__ */ R("svg", {
					width: "12",
					height: "12",
					viewBox: "0 0 12 12",
					fill: "none",
					"aria-hidden": "true",
					children: /* @__PURE__ */ R("path", {
						d: "M7 2L3 6l4 4",
						stroke: "currentColor",
						strokeWidth: "1.5",
						strokeLinecap: "round",
						strokeLinejoin: "round"
					})
				}), i.label]
			}),
			/* @__PURE__ */ z("div", {
				className: "flex items-center justify-between gap-4",
				children: [/* @__PURE__ */ z("div", {
					className: "min-w-0 flex items-center gap-2.5",
					children: [/* @__PURE__ */ R("h1", {
						className: "text-xl font-semibold text-[var(--color-text-primary)] leading-tight",
						children: t
					}), a]
				}), r && /* @__PURE__ */ R("div", {
					className: "flex-shrink-0 flex items-center gap-2",
					children: r
				})]
			}),
			n && /* @__PURE__ */ R("p", {
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
}, vt = {
	debug: "text-[var(--color-text-tertiary)]",
	info: "text-[var(--color-info,#3b82f6)]",
	warn: "text-[var(--color-warning,#d97706)]",
	error: "text-[var(--color-danger,#dc2626)]"
};
function Z({ lines: t, follow: r = !0, showTimestamp: i = !0, showLevel: a = !0, showSource: o = !0, title: s = "Log stream", headerSlot: c, emptyMessage: l = "No log lines yet.", maxHeight: u, onClear: d, className: f, style: p, "data-testid": h = "log-stream" }) {
	let g = F(null), [_, v] = I(!1);
	M(() => {
		if (!r || _) return;
		let e = g.current;
		e && (e.scrollTop = e.scrollHeight);
	}, [
		t,
		r,
		_
	]);
	let y = () => {
		let e = g.current;
		if (!e) return;
		let t = e.scrollHeight - e.scrollTop - e.clientHeight < 24;
		v(!t);
	}, b = () => {
		let e = g.current;
		e && (e.scrollTop = e.scrollHeight, v(!1));
	}, x = /* @__PURE__ */ z("div", {
		className: "flex items-center gap-2",
		children: [/* @__PURE__ */ z("span", {
			className: "text-[10px] text-[var(--color-text-tertiary)]",
			"data-testid": `${h}-count`,
			children: [
				t.length,
				" ",
				t.length === 1 ? "line" : "lines"
			]
		}), d && /* @__PURE__ */ R("button", {
			type: "button",
			onClick: d,
			"data-testid": `${h}-clear`,
			className: e("text-[10px] uppercase tracking-wide", "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]", "border border-[var(--color-border)] rounded px-1.5 py-0.5", "cursor-pointer bg-transparent"),
			children: "Clear"
		})]
	});
	return /* @__PURE__ */ z(n, {
		"data-testid": h,
		className: e("flex flex-col", f),
		style: p,
		children: [s !== null && /* @__PURE__ */ R("div", {
			className: "px-4 py-3 border-b border-[var(--color-border)]",
			children: /* @__PURE__ */ R(m, {
				title: s,
				meta: c ?? x
			})
		}), /* @__PURE__ */ z("div", {
			className: "relative flex-1 min-h-0 flex",
			children: [/* @__PURE__ */ R("div", {
				ref: g,
				onScroll: y,
				role: "log",
				"aria-live": r ? "polite" : "off",
				"data-testid": `${h}-scroll`,
				className: e("flex-1 overflow-y-auto", "font-mono text-[12px] leading-[1.55]", "bg-[var(--color-surface-subtle,#0b1020)] text-[var(--color-text-primary,#e5e7eb)]", "py-2"),
				style: { maxHeight: u },
				children: t.length === 0 ? /* @__PURE__ */ R("div", {
					"data-testid": `${h}-empty`,
					className: "px-3 py-6 text-center text-[11px] text-[var(--color-text-tertiary)]",
					children: l
				}) : t.map((t) => {
					let n = t.level ?? "info", r = String(n), s = _t[n] ?? r.toUpperCase(), c = vt[n] ?? vt.info;
					return /* @__PURE__ */ z("div", {
						role: "listitem",
						"data-testid": `${h}-line`,
						"data-level": t.level || void 0,
						className: "flex items-baseline gap-2 px-3 hover:bg-[var(--color-surface,rgba(255,255,255,0.04))]",
						children: [
							i && t.timestamp && /* @__PURE__ */ R("span", {
								className: "shrink-0 text-[var(--color-text-tertiary)] tabular-nums",
								children: t.timestamp
							}),
							a && t.level && /* @__PURE__ */ R("span", {
								className: e("shrink-0 font-semibold uppercase text-[10px] w-[44px]", c),
								"aria-label": `level ${r.toLowerCase()}`,
								children: s
							}),
							o && t.source && /* @__PURE__ */ z("span", {
								className: "shrink-0 text-[var(--color-text-secondary)]",
								children: [
									"[",
									t.source,
									"]"
								]
							}),
							/* @__PURE__ */ R("span", {
								className: "flex-1 whitespace-pre-wrap break-words",
								children: t.message
							})
						]
					}, t.id);
				})
			}), r && _ && /* @__PURE__ */ R("button", {
				type: "button",
				"data-testid": `${h}-jump`,
				onClick: b,
				className: e("absolute bottom-3 left-1/2 -translate-x-1/2", "px-3 py-1 text-[10px] font-semibold uppercase tracking-wide", "bg-primary text-white rounded-full border-none cursor-pointer", "shadow-[0_2px_8px_rgba(0,0,0,0.25)]"),
				children: "Jump to live ↓"
			})]
		})]
	});
}
var yt = Z;
//#endregion
//#region src/components/shared/ThumbnailCard.tsx
function bt({ title: t, description: n, category: r, categoryTone: i = "neutral", thumbnail: a, icon: o = "🧩", thumbnailHeight: s = 160, href: l, onClick: u, badge: d, meta: f, className: p, style: m, "data-testid": h = "thumbnail-card" }) {
	let g = e("group block w-full text-left bg-[var(--color-surface,#fff)]", "rounded-xl border border-[var(--color-border)] overflow-hidden", "transition-[box-shadow,transform] duration-150", (l || u) && "cursor-pointer hover:shadow-[0_8px_25px_rgba(0,0,0,0.08)] hover:-translate-y-0.5", p), _ = /* @__PURE__ */ z(L, { children: [/* @__PURE__ */ z("div", {
		"data-testid": `${h}-thumb`,
		className: e("relative flex items-center justify-center", "bg-gradient-to-br from-[var(--color-primary-bg,#eef2ff)] to-[var(--color-surface,#ffffff)]", "border-b border-[var(--color-border)]"),
		style: { height: s },
		children: [a ? /* @__PURE__ */ R("img", {
			src: a,
			alt: "",
			className: "w-full h-full object-cover"
		}) : /* @__PURE__ */ R("span", {
			className: "text-5xl opacity-50",
			"aria-hidden": !0,
			children: o
		}), d && /* @__PURE__ */ R("span", {
			"data-testid": `${h}-badge`,
			className: "absolute top-2 right-2",
			children: d
		})]
	}), /* @__PURE__ */ z("div", {
		className: "px-4 py-3",
		children: [
			/* @__PURE__ */ z("div", {
				className: "flex items-center gap-2 mb-1.5",
				children: [r && /* @__PURE__ */ R(c, {
					tone: i,
					size: "xs",
					"data-testid": `${h}-category`,
					children: r
				}), f && /* @__PURE__ */ R("span", {
					className: "ml-auto",
					children: f
				})]
			}),
			/* @__PURE__ */ R("div", {
				className: "text-[14px] font-semibold text-[var(--color-text-primary)] leading-snug",
				children: t
			}),
			n && /* @__PURE__ */ R("div", {
				className: "mt-1 text-[12px] text-[var(--color-text-secondary)] leading-snug",
				children: n
			})
		]
	})] });
	return l ? /* @__PURE__ */ R("a", {
		href: l,
		onClick: u,
		"data-testid": h,
		className: e(g, "no-underline text-inherit"),
		style: m,
		children: _
	}) : u ? /* @__PURE__ */ R("button", {
		type: "button",
		onClick: u,
		"data-testid": h,
		className: e(g, "font-inherit"),
		style: m,
		children: _
	}) : /* @__PURE__ */ R("div", {
		"data-testid": h,
		className: g,
		style: m,
		children: _
	});
}
//#endregion
//#region src/components/shared/CatalogGrid.tsx
var xt = {
	1: "sm:grid-cols-1",
	2: "sm:grid-cols-2",
	3: "sm:grid-cols-2 lg:grid-cols-3",
	4: "sm:grid-cols-2 lg:grid-cols-4",
	5: "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
};
function St({ children: t, columns: n = 3, dense: r = !1, className: i, style: a, "data-testid": o = "catalog-grid" }) {
	return /* @__PURE__ */ R("div", {
		"data-testid": o,
		"data-columns": n,
		className: e("grid grid-cols-1", xt[n], r ? "gap-3" : "gap-5", i),
		style: a,
		children: t
	});
}
//#endregion
//#region src/components/shared/StackDiagram.tsx
function Ct({ orientation: t, variant: n }) {
	if (n === "none") return null;
	let r = t === "vertical", i = n === "arrow" ? r ? "↓" : "→" : r ? "│" : "─";
	return /* @__PURE__ */ R("div", {
		"data-testid": "stack-diagram-connector",
		"aria-hidden": !0,
		className: e("flex items-center justify-center text-[var(--color-text-tertiary)]", r ? "h-5 text-base" : "w-5 text-base"),
		children: i
	});
}
function wt({ layers: t, orientation: n = "vertical", connector: a = "arrow", className: c, style: l, "data-testid": u = "stack-diagram" }) {
	let d = n === "vertical";
	return /* @__PURE__ */ R("div", {
		"data-testid": u,
		"data-orientation": n,
		"data-connector": a,
		className: e("flex", d ? "flex-col items-stretch" : "flex-row items-stretch flex-wrap", c),
		style: l,
		children: t.map((c, l) => {
			let u = o(c.tone ?? "neutral");
			return /* @__PURE__ */ z("div", {
				className: e("flex", "flex-col"),
				children: [/* @__PURE__ */ z("div", {
					"data-testid": "stack-diagram-layer",
					"data-tone": u,
					className: e("rounded-md border px-3 py-2", s[u], r[u], !d && "min-w-[140px]"),
					children: [/* @__PURE__ */ z("div", {
						className: "flex items-center gap-2",
						children: [
							c.icon != null && /* @__PURE__ */ R("span", {
								className: "shrink-0 text-[14px] leading-none",
								"aria-hidden": !0,
								children: c.icon
							}),
							/* @__PURE__ */ R("span", {
								className: e("text-[12px] font-semibold", i[u]),
								children: c.label
							}),
							c.meta != null && /* @__PURE__ */ R("span", {
								className: "ml-auto text-[10px] text-[var(--color-text-tertiary)] shrink-0",
								children: c.meta
							})
						]
					}), c.description != null && /* @__PURE__ */ R("div", {
						className: "mt-0.5 text-[11px] leading-snug text-[var(--color-text-secondary)]",
						children: c.description
					})]
				}), l < t.length - 1 && /* @__PURE__ */ R(Ct, {
					orientation: n,
					variant: a
				})]
			}, c.id);
		})
	});
}
var Tt = wt;
//#endregion
//#region src/components/shared/ChatComposer.tsx
function Et({ value: t, onChange: n, onSubmit: r, disabled: i = !1, multiline: a = !1, placeholder: o, submitLabel: s = "→", className: c, style: l, autoFocus: u, maxRows: d = 4, "aria-label": f = "Message", "aria-labelledby": p, submitAriaLabel: m = "Send" }) {
	let h = !i && t.trim().length > 0, g = typeof s == "string" && /\p{L}|\p{N}/u.test(s) ? void 0 : m, _ = p ? void 0 : f, v = () => {
		h && r();
	}, y = (e) => {
		if (e.key === "Enter") {
			if (a && e.shiftKey) return;
			e.preventDefault(), v();
		}
	}, b = e("flex-1 px-3 py-2 text-sm rounded-lg border border-[var(--color-border-field,#d1d5db)] bg-surface text-[var(--color-text-primary)]", "placeholder:text-[var(--color-text-tertiary)]", "focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent", "resize-none", i && "opacity-50 cursor-not-allowed bg-[var(--color-surface-hover)]");
	return /* @__PURE__ */ z("div", {
		className: e("flex items-end gap-2 p-3 border-t border-[var(--color-border)] bg-[var(--color-surface)]", c),
		style: l,
		children: [a ? /* @__PURE__ */ R("textarea", {
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
		}) : /* @__PURE__ */ R("input", {
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
		}), /* @__PURE__ */ R("button", {
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
function Dt({ name: t, done: n, className: r }) {
	return /* @__PURE__ */ z("span", {
		className: e("inline-flex items-center gap-1 text-[10.5px] font-mono px-2 py-0.5 rounded-full", n ? "bg-[var(--color-success-bg,#f0fdf4)] text-[var(--color-success,#16a34a)]" : "bg-[var(--color-info-bg,#eff6ff)] text-[var(--color-info,#1d4ed8)]", r),
		children: [t, n ? " ✓" : "…"]
	});
}
function Ot({ toolCalls: t, className: n }) {
	return /* @__PURE__ */ R("div", {
		className: e("flex flex-wrap gap-1.5 py-1", n),
		children: t.map((e) => /* @__PURE__ */ R(Dt, {
			name: e.name,
			done: e.done
		}, e.id))
	});
}
//#endregion
//#region src/components/shared/MessageBubble.tsx
function kt({ role: t, content: n, toolCalls: r, streaming: i = !1, agentName: a, userName: o, renderMarkdown: s, className: c }) {
	let l = t === "user" ? o || "You" : a || "Assistant";
	return /* @__PURE__ */ z("div", {
		className: e("flex flex-col gap-1.5 py-3", c),
		children: [
			/* @__PURE__ */ R("div", {
				className: "text-[11px] font-semibold uppercase tracking-wide text-[var(--color-text-tertiary)]",
				children: l
			}),
			r && r.length > 0 && /* @__PURE__ */ R(Ot, { toolCalls: r }),
			t === "user" ? /* @__PURE__ */ R("div", {
				className: "text-sm text-[var(--color-text-primary)] whitespace-pre-wrap",
				children: n
			}) : /* @__PURE__ */ R("div", {
				className: "text-sm text-[var(--color-text-primary)] prose-sm max-w-none",
				children: n ? s ? s(n) : /* @__PURE__ */ R("span", {
					className: "whitespace-pre-wrap",
					children: n
				}) : i ? /* @__PURE__ */ R(b, {}) : null
			})
		]
	});
}
//#endregion
//#region src/components/shared/ThinkingBlock.tsx
function At({ content: t, streaming: n = !1, defaultOpen: r = !1, className: i }) {
	let a = n || !t ? "Thinking" : "Thought";
	return /* @__PURE__ */ z("details", {
		open: r,
		className: e("rounded-md border border-[var(--color-border)] overflow-hidden text-sm group", i),
		children: [/* @__PURE__ */ z("summary", {
			className: "flex items-center gap-2 px-3 py-2 cursor-pointer select-none bg-[var(--color-surface)] hover:bg-[var(--color-surface-hover)] text-[var(--color-text-tertiary)] list-none",
			children: [
				/* @__PURE__ */ R("svg", {
					className: "w-3.5 h-3.5 transition-transform group-open:rotate-90",
					xmlns: "http://www.w3.org/2000/svg",
					viewBox: "0 0 20 20",
					fill: "currentColor",
					"aria-hidden": "true",
					children: /* @__PURE__ */ R("path", {
						fillRule: "evenodd",
						d: "M7.21 14.77a.75.75 0 010-1.06L10.94 10 7.21 6.29a.75.75 0 011.08-1.04l4.25 4.25a.75.75 0 010 1.06l-4.25 4.25a.75.75 0 01-1.08-.04z",
						clipRule: "evenodd"
					})
				}),
				/* @__PURE__ */ R("span", {
					className: "text-[11px] font-semibold uppercase tracking-wide",
					children: a
				}),
				n && !t && /* @__PURE__ */ R(b, { size: "sm" })
			]
		}), /* @__PURE__ */ R("div", {
			className: "px-3 py-2 text-xs text-[var(--color-text-secondary)] italic border-t border-[var(--color-border)] bg-surface whitespace-pre-wrap leading-relaxed",
			children: t || /* @__PURE__ */ R(b, {})
		})]
	});
}
//#endregion
//#region src/components/shared/QuickPromptGrid.tsx
function jt({ prompts: t, onSelect: n, columns: r, title: i, className: a }) {
	let o = r ? `repeat(${r}, minmax(0, 1fr))` : "repeat(auto-fit, minmax(220px, 1fr))";
	return /* @__PURE__ */ z("div", {
		className: e("flex flex-col gap-3", a),
		children: [i && /* @__PURE__ */ R("p", {
			className: "text-xs font-semibold uppercase tracking-wide text-[var(--color-text-tertiary)] text-center",
			children: i
		}), /* @__PURE__ */ R("div", {
			style: {
				display: "grid",
				gridTemplateColumns: o,
				gap: 10
			},
			children: t.map((e, t) => /* @__PURE__ */ z("button", {
				type: "button",
				onClick: () => n(e.label),
				className: "flex flex-col gap-1 px-4 py-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] hover:bg-[var(--color-surface-hover)] hover:border-[var(--color-border-emphasis,#cbd5e1)] text-left transition-colors",
				children: [/* @__PURE__ */ R("span", {
					className: "text-sm font-medium text-[var(--color-text-primary)]",
					children: e.label
				}), e.hint && /* @__PURE__ */ R("span", {
					className: "text-xs text-[var(--color-text-tertiary)]",
					children: e.hint
				})]
			}, t))
		})]
	});
}
//#endregion
//#region src/components/shared/FollowUpChips.tsx
function Mt({ suggestions: t, onSelect: n, onRefresh: r, label: i, className: a }) {
	return /* @__PURE__ */ z("div", {
		className: e("flex items-center flex-wrap gap-1.5 py-2", a),
		children: [
			i && /* @__PURE__ */ R("span", {
				className: "text-xs text-[var(--color-text-tertiary)] mr-1",
				children: i
			}),
			t.map((e, t) => /* @__PURE__ */ R("button", {
				type: "button",
				onClick: () => n(e),
				className: "inline-flex items-center px-3 py-1 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] text-xs text-[var(--color-text-secondary)] hover:bg-[var(--color-primary)] hover:text-white hover:border-[var(--color-primary)] transition-colors",
				children: e
			}, t)),
			r && /* @__PURE__ */ R("button", {
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
function Nt({ user: t, items: n, className: r, "data-testid": i }) {
	let [a, o] = I(!1), s = F(null), c = j(() => o(!1), []);
	return M(() => {
		if (!a) return;
		let e = (e) => {
			s.current && !s.current.contains(e.target) && c();
		};
		return document.addEventListener("mousedown", e), () => document.removeEventListener("mousedown", e);
	}, [a, c]), h(a, c), /* @__PURE__ */ z("div", {
		ref: s,
		"data-testid": i,
		className: e("relative inline-block", r),
		children: [/* @__PURE__ */ z("button", {
			type: "button",
			"aria-label": `User menu for ${t.name}`,
			"aria-expanded": a,
			"aria-haspopup": "menu",
			onClick: () => o((e) => !e),
			className: e("flex items-center gap-2 bg-transparent border-none cursor-pointer p-1 rounded-lg", "hover:bg-[var(--color-surface-hover)] transition-colors duration-100", a && "bg-[var(--color-surface-hover)]"),
			children: [
				t.avatarUrl ? /* @__PURE__ */ R("img", {
					src: t.avatarUrl,
					alt: t.name,
					className: "w-8 h-8 rounded-full object-cover"
				}) : /* @__PURE__ */ R(T, {
					name: t.name,
					size: 32
				}),
				/* @__PURE__ */ z("div", {
					className: "flex flex-col items-start text-left min-w-0 hidden sm:flex",
					children: [/* @__PURE__ */ R("span", {
						className: "text-sm font-medium text-[var(--color-text-primary)] leading-tight truncate max-w-[120px]",
						children: t.name
					}), /* @__PURE__ */ R("span", {
						className: "text-xs text-[var(--color-text-tertiary)] leading-tight truncate max-w-[120px]",
						children: t.email
					})]
				}),
				/* @__PURE__ */ R("svg", {
					width: "12",
					height: "12",
					viewBox: "0 0 12 12",
					fill: "none",
					"aria-hidden": "true",
					className: e("text-[var(--color-text-tertiary)] transition-transform duration-150", a ? "rotate-180" : "rotate-0"),
					children: /* @__PURE__ */ R("path", {
						d: "M2 4l4 4 4-4",
						stroke: "currentColor",
						strokeWidth: "1.5",
						strokeLinecap: "round",
						strokeLinejoin: "round"
					})
				})
			]
		}), a && /* @__PURE__ */ z("div", {
			role: "menu",
			"aria-label": "User menu",
			className: e("absolute right-0 top-[calc(100%+6px)] min-w-[200px] z-[200]", "bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl shadow-md overflow-hidden"),
			children: [/* @__PURE__ */ z("div", {
				className: "px-3 py-2.5 border-b border-[var(--color-border)]",
				children: [/* @__PURE__ */ R("p", {
					className: "text-sm font-semibold text-[var(--color-text-primary)] truncate",
					children: t.name
				}), /* @__PURE__ */ R("p", {
					className: "text-xs text-[var(--color-text-tertiary)] truncate",
					children: t.email
				})]
			}), /* @__PURE__ */ R("div", {
				className: "py-1",
				children: n.map((t, n) => /* @__PURE__ */ z("div", { children: [t.separator && n > 0 && /* @__PURE__ */ R("div", { className: "my-1 border-t border-[var(--color-border)]" }), /* @__PURE__ */ z("button", {
					type: "button",
					role: "menuitem",
					onClick: () => {
						t.onClick(), c();
					},
					className: e("flex items-center gap-2.5 w-full text-left px-3 py-2", "text-sm border-none cursor-pointer font-[inherit] transition-colors duration-100", t.danger ? "text-danger-fg bg-transparent hover:bg-danger-bg" : "text-[var(--color-text-primary)] bg-transparent hover:bg-[var(--color-surface-hover)]"),
					children: [t.icon && /* @__PURE__ */ R("span", {
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
function Pt({ item: t, isLast: n, block: r = !1, afterActivate: i }) {
	let a = (e) => {
		t.onClick?.(e), i?.();
	}, o = e("text-sm leading-snug transition-colors duration-100", n ? "text-[var(--color-text-primary)] font-medium cursor-default" : "text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] font-normal", r && "block w-full px-3 py-1.5 rounded-sm hover:bg-[var(--color-surface-hover)]");
	return n || !t.href && !t.onClick ? /* @__PURE__ */ R("span", {
		className: o,
		"aria-current": n ? "page" : void 0,
		children: t.label
	}) : t.href ? /* @__PURE__ */ R("a", {
		href: t.href,
		onClick: a,
		className: e(o, "no-underline"),
		children: t.label
	}) : /* @__PURE__ */ R("button", {
		type: "button",
		onClick: a,
		className: e(o, "border-none bg-transparent cursor-pointer font-[inherit] p-0", r && "text-left px-3 py-1.5"),
		children: t.label
	});
}
function Ft(e, t) {
	if (e.length <= t) return e;
	let n = e.slice(0, 1), r = e.slice(-(t - 2 > 0 ? t - 2 : 1));
	return [
		...n,
		null,
		...r
	];
}
function It(e, t) {
	let n = t - 2 > 0 ? t - 2 : 1;
	return e.slice(1, e.length - n);
}
function Lt({ items: e }) {
	let [t, n] = I(!1), r = F(null);
	return /* @__PURE__ */ z(L, { children: [/* @__PURE__ */ R("button", {
		ref: r,
		type: "button",
		"aria-label": "Show hidden breadcrumbs",
		"aria-expanded": t,
		"aria-haspopup": "true",
		onClick: () => n((e) => !e),
		className: "text-sm text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] border-none bg-transparent cursor-pointer px-1 py-0 rounded-sm leading-snug",
		children: "…"
	}), /* @__PURE__ */ R(O, {
		trigger: r,
		open: t,
		onClose: () => n(!1),
		"aria-label": "Hidden breadcrumbs",
		"data-testid": "breadcrumb-overflow",
		className: "min-w-[160px] py-1",
		children: /* @__PURE__ */ R("ol", {
			className: "list-none m-0 p-0",
			children: e.map((e, t) => /* @__PURE__ */ R("li", { children: /* @__PURE__ */ R(Pt, {
				item: e,
				isLast: !1,
				block: !0,
				afterActivate: () => n(!1)
			}) }, `${e.label}-${t}`))
		})
	})] });
}
function Rt({ items: t, separator: n = "/", maxItems: r, overflow: i = "ellipsis", minItems: a, className: o, "data-testid": s }) {
	if (t.length === 0 || a != null && t.length < a) return null;
	let c = r == null ? t : Ft(t, r), l = r == null ? [] : It(t, r);
	return /* @__PURE__ */ R("nav", {
		"aria-label": "Breadcrumb",
		"data-testid": s,
		className: e("flex items-center", o),
		children: /* @__PURE__ */ R("ol", {
			className: "flex items-center gap-1 flex-wrap list-none m-0 p-0",
			children: c.map((e, t) => {
				let r = t === c.length - 1;
				return /* @__PURE__ */ z("li", {
					className: "flex items-center gap-1",
					children: [e === null ? i === "menu" && l.length > 0 ? /* @__PURE__ */ R(Lt, { items: l }) : /* @__PURE__ */ R("span", {
						className: "text-sm text-[var(--color-text-tertiary)] select-none",
						"aria-label": "More items",
						title: "Some items are hidden",
						children: "…"
					}) : /* @__PURE__ */ R(Pt, {
						item: e,
						isLast: r
					}), !r && /* @__PURE__ */ R("span", {
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
var zt = {
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
}, Bt = {
	bg: "var(--color-surface-hover)",
	border: "var(--color-border-field)",
	text: "var(--color-text-primary)",
	accent: "var(--color-neutral)"
};
function Vt({ status: e, colors: t }) {
	return /* @__PURE__ */ z("span", {
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
		children: [/* @__PURE__ */ R("span", { style: {
			width: 5,
			height: 5,
			borderRadius: "50%",
			background: t.accent
		} }), e.replace(/_/g, " ")]
	});
}
function Ht({ name: e, id: t, status: n, statusColors: r, contributorNames: i = [], contributorCount: a, activityItems: o = [], presenceDotColor: s = "var(--color-border-field)", activityLabel: c = "", cardIndex: l = 0, onClick: u, className: d, style: f, minHeight: p = 190 }) {
	let m = {
		...zt,
		...r
	}[(n ?? "unknown").toLowerCase().replace(/ /g, "_")] ?? Bt, h = a === void 0 ? 0 : Math.max(0, a - i.length), g = l % 8 * 525;
	return /* @__PURE__ */ z(u ? "button" : "div", {
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
			/* @__PURE__ */ z("div", {
				style: {
					display: "flex",
					alignItems: "flex-start",
					justifyContent: "space-between",
					gap: 8
				},
				children: [/* @__PURE__ */ z("div", {
					style: {
						flex: 1,
						minWidth: 0
					},
					children: [/* @__PURE__ */ R("h3", {
						style: {
							margin: "0 0 3px",
							fontSize: 13.5,
							fontWeight: 700,
							color: "var(--color-text-primary, #111827)",
							lineHeight: 1.35
						},
						children: e
					}), t && /* @__PURE__ */ R("span", {
						style: {
							fontSize: 10,
							fontFamily: "ui-monospace, \"SFMono-Regular\", Menlo, monospace",
							color: "var(--color-text-tertiary)",
							letterSpacing: "0.02em"
						},
						children: t
					})]
				}), n && /* @__PURE__ */ R(Vt, {
					status: n,
					colors: m
				})]
			}),
			/* @__PURE__ */ R(k, {
				items: o,
				staggerMs: g
			}),
			/* @__PURE__ */ z("div", {
				style: {
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
					paddingTop: 8,
					borderTop: "1px solid var(--color-border-subtle, #f3f4f6)",
					gap: 8
				},
				children: [/* @__PURE__ */ z("div", {
					style: {
						display: "flex",
						alignItems: "center",
						gap: 8,
						minWidth: 0
					},
					children: [i.length > 0 ? /* @__PURE__ */ R(w, {
						names: i,
						maxVisible: 5,
						size: 24
					}) : /* @__PURE__ */ z("span", {
						style: {
							fontSize: 12,
							color: "var(--color-text-tertiary)"
						},
						children: [/* @__PURE__ */ R("strong", {
							style: { color: "var(--color-text-primary)" },
							children: a ?? 0
						}), " contributors"]
					}), i.length > 0 && h > 0 && /* @__PURE__ */ z("span", {
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
				}), c && /* @__PURE__ */ z("div", {
					style: {
						display: "flex",
						alignItems: "center",
						gap: 5,
						flexShrink: 0
					},
					children: [/* @__PURE__ */ R("span", { style: {
						width: 6,
						height: 6,
						borderRadius: "50%",
						background: s,
						flexShrink: 0
					} }), /* @__PURE__ */ R("span", {
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
function Ut(e) {
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
function Wt({ items: e, storageKey: t, title: n, renderNavItem: r }) {
	let i = P(() => Ut(e), [e]), a = i.some((e) => e.name !== null);
	return /* @__PURE__ */ R("nav", {
		className: "flex-1 overflow-y-auto py-1",
		children: a ? i.map((e) => e.name === null ? /* @__PURE__ */ R(Kt, {
			items: e.items,
			renderNavItem: r
		}, "__ungrouped") : /* @__PURE__ */ R(qt, {
			name: e.name,
			items: e.items,
			storageKey: `${t}.${n}.${e.name}`,
			renderNavItem: r
		}, e.name)) : /* @__PURE__ */ R(Kt, {
			items: e,
			renderNavItem: r
		})
	});
}
function Gt({ title: e, items: t, titleAction: n, railHeader: r, railWidth: i = 220, storageKey: a = "subnav", secondaryTitle: o, secondaryItems: s, secondaryStorageKey: c, secondaryRailWidth: l = 200, renderNavItem: u, children: d }) {
	let f = s && s.length > 0;
	return /* @__PURE__ */ z("div", {
		className: "flex h-full min-h-0",
		children: [
			/* @__PURE__ */ z("aside", {
				className: "flex-none border-r border-[var(--color-border)] bg-[var(--color-surface)] flex flex-col overflow-hidden",
				style: { width: i },
				children: [
					/* @__PURE__ */ z("div", {
						className: "flex items-center justify-between px-4 py-[14px] border-b border-[var(--color-border)]",
						children: [/* @__PURE__ */ R("span", {
							className: "text-[11px] font-semibold text-[var(--color-text-tertiary)] uppercase tracking-[0.05em]",
							children: e
						}), n]
					}),
					r && /* @__PURE__ */ R("div", {
						className: "px-3 py-2 border-b border-[var(--color-border)]",
						children: r
					}),
					/* @__PURE__ */ R(Wt, {
						items: t,
						storageKey: a,
						title: e,
						renderNavItem: u
					})
				]
			}),
			f && /* @__PURE__ */ z("aside", {
				className: "flex-none border-r border-[var(--color-border)] bg-[var(--color-surface)] flex flex-col overflow-hidden",
				style: { width: l },
				children: [/* @__PURE__ */ R("div", {
					className: "flex items-center justify-between px-4 py-[14px] border-b border-[var(--color-border)]",
					children: /* @__PURE__ */ R("span", {
						className: "text-[11px] font-semibold text-[var(--color-text-tertiary)] uppercase tracking-[0.05em]",
						children: o ?? ""
					})
				}), /* @__PURE__ */ R(Wt, {
					items: s,
					storageKey: c ?? `${a}.secondary`,
					title: o ?? "secondary",
					renderNavItem: u
				})]
			}),
			/* @__PURE__ */ R("main", {
				className: "flex-1 min-w-0 overflow-auto p-6",
				children: d
			})
		]
	});
}
function Kt({ items: e, renderNavItem: t }) {
	return /* @__PURE__ */ R(L, { children: e.map((e) => /* @__PURE__ */ R(Jt, {
		item: e,
		renderNavItem: t
	}, e.path)) });
}
function qt({ name: e, items: t, storageKey: n, renderNavItem: r }) {
	let [i, a] = I(() => typeof window > "u" ? !1 : window.localStorage?.getItem(n) === "1");
	M(() => {
		typeof window > "u" || (i ? window.localStorage?.setItem(n, "1") : window.localStorage?.removeItem(n));
	}, [i, n]);
	let o = N(), s = F(null), c = F(null), l = () => {
		if (!i) {
			let e = typeof document > "u" ? null : document.activeElement;
			e && c.current?.contains(e) && s.current?.focus();
		}
		a((e) => !e);
	}, u = t.find((e) => e.groupScrollAfter)?.groupScrollAfter, d = u ? {
		maxHeight: u * 38,
		overflowY: "auto"
	} : void 0;
	return /* @__PURE__ */ z("section", {
		className: "border-b border-[var(--color-border)]",
		children: [/* @__PURE__ */ z("button", {
			type: "button",
			ref: s,
			onClick: l,
			className: "flex items-center gap-1.5 w-full px-3 py-2 bg-transparent border-none cursor-pointer text-[var(--color-text-tertiary)] text-[10px] font-bold tracking-[0.05em] uppercase text-left",
			"aria-expanded": !i,
			"aria-controls": o,
			children: [
				/* @__PURE__ */ R("span", {
					className: "text-[10px] w-[10px] inline-block",
					"aria-hidden": "true",
					children: i ? "▸" : "▾"
				}),
				/* @__PURE__ */ R("span", {
					className: "flex-1",
					children: e
				}),
				/* @__PURE__ */ R("span", {
					className: "text-[9px] font-medium text-[var(--color-text-tertiary)] bg-[var(--color-bg)] px-[5px] py-px rounded-[6px] border border-[var(--color-border)]",
					children: t.length
				})
			]
		}), !i && /* @__PURE__ */ R("div", {
			id: o,
			ref: c,
			style: d,
			children: t.map((e) => /* @__PURE__ */ R(Jt, {
				item: e,
				renderNavItem: r
			}, e.path))
		})]
	});
}
function Jt({ item: e, renderNavItem: t }) {
	let n = e.accent === "danger" ? "var(--color-danger)" : e.accent === "warning" ? "var(--color-warning)" : e.accent === "success" ? "var(--color-success)" : void 0, r = /* @__PURE__ */ z(L, { children: [/* @__PURE__ */ z("div", {
		className: "flex items-center justify-between gap-2",
		children: [/* @__PURE__ */ R("span", {
			className: "text-[13px] font-medium text-[var(--color-text-secondary)]",
			style: n ? { color: n } : void 0,
			children: e.label
		}), e.count !== void 0 && /* @__PURE__ */ R("span", {
			className: "text-[10px] font-medium text-[var(--color-text-tertiary)] bg-[var(--color-surface)] px-[6px] py-px rounded-[8px] border border-[var(--color-border)]",
			children: e.count
		})]
	}), e.hint && /* @__PURE__ */ R("div", {
		className: "text-[10px] text-[var(--color-text-tertiary)] mt-0.5",
		children: e.hint
	})] });
	return e.onClick ? /* @__PURE__ */ R("button", {
		type: "button",
		onClick: e.onClick,
		className: "block w-full px-[14px] py-2 border-l-[3px] border-transparent border-t-0 border-r-0 border-b-0 bg-transparent text-[var(--color-text-secondary)] text-left cursor-pointer font-[inherit]",
		children: r
	}) : t ? /* @__PURE__ */ R(L, { children: t(e, r, {
		display: "block",
		padding: "8px 14px",
		borderLeft: "3px solid transparent",
		color: "var(--color-text-secondary)",
		textDecoration: "none",
		cursor: "pointer"
	}) }) : /* @__PURE__ */ R("a", {
		href: e.path,
		className: "block px-[14px] py-2 border-l-[3px] border-transparent text-[var(--color-text-secondary)] no-underline cursor-pointer",
		children: r
	});
}
var Yt = {
	borderLeft: "3px solid var(--color-primary)",
	background: "var(--color-surface-hover)",
	color: "var(--color-text-primary)"
}, Xt = {
	narrow: "w-44",
	default: "w-56",
	wide: "w-64"
}, Zt = {
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
function Qt(e, t) {
	return e.id ?? e.to ?? `item-${t}`;
}
function $t(e, t, n) {
	return !t || !e.to ? !1 : t === e.to ? !0 : n === "exact" || e.to === "/" ? !1 : t.startsWith(e.to.endsWith("/") ? e.to : `${e.to}/`);
}
function en(e) {
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
function tn({ item: t, active: n, palette: r, renderLink: i }) {
	let a = /* @__PURE__ */ z(L, { children: [/* @__PURE__ */ z("span", {
		className: "flex items-center gap-2 min-w-0",
		children: [
			t.icon && /* @__PURE__ */ R("span", {
				className: "flex-none",
				"aria-hidden": "true",
				children: t.icon
			}),
			/* @__PURE__ */ R("span", {
				className: e("truncate text-[13px] font-medium", n ? r.labelActive : r.label),
				children: t.label
			}),
			t.badge != null && /* @__PURE__ */ R("span", {
				className: e("ml-auto flex-none rounded-full border px-1.5 text-[10px] font-medium leading-4", r.badge),
				children: t.badge
			})
		]
	}), t.hint && /* @__PURE__ */ R("span", {
		className: e("mt-0.5 block truncate text-[10px]", r.hint),
		children: t.hint
	})] }), o = e("block w-full border-l-[3px] border-transparent px-3 py-1.5 text-left no-underline", r.hover, n && r.active, t.disabled && "pointer-events-none opacity-50");
	if (t.onClick || !t.to) return /* @__PURE__ */ R("button", {
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
	return i ? /* @__PURE__ */ R(L, { children: i(t, s) }) : /* @__PURE__ */ R("a", { ...s });
}
function nn({ name: t, items: n, activeHref: r, match: i, palette: a, storageKey: o, renderLink: s }) {
	let [c, l] = I(() => {
		if (!o || typeof window > "u") return !1;
		try {
			return window.localStorage?.getItem(o) === "1";
		} catch {
			return !1;
		}
	});
	M(() => {
		if (!(!o || typeof window > "u")) try {
			c ? window.localStorage?.setItem(o, "1") : window.localStorage?.removeItem(o);
		} catch {}
	}, [c, o]);
	let u = N(), d = F(null), f = F(null), p = j(() => {
		if (!c) {
			let e = typeof document > "u" ? null : document.activeElement;
			e && f.current?.contains(e) && d.current?.focus();
		}
		l((e) => !e);
	}, [c]);
	return /* @__PURE__ */ z("section", { children: [/* @__PURE__ */ z("button", {
		ref: d,
		type: "button",
		onClick: p,
		"aria-expanded": !c,
		"aria-controls": u,
		className: e("flex w-full cursor-pointer items-center gap-1.5 border-none bg-transparent px-3 py-1.5 text-left text-[10px] font-bold uppercase tracking-[0.06em]", a.group),
		children: [/* @__PURE__ */ R("span", {
			"aria-hidden": "true",
			className: "inline-block w-2.5 text-[10px]",
			children: c ? "▸" : "▾"
		}), /* @__PURE__ */ R("span", {
			className: "flex-1 truncate",
			children: t
		})]
	}), !c && /* @__PURE__ */ R("div", {
		id: u,
		ref: f,
		children: n.map((e, t) => /* @__PURE__ */ R(tn, {
			item: e,
			active: $t(e, r, i),
			palette: a,
			renderLink: s
		}, Qt(e, t)))
	})] });
}
function rn({ title: t, items: n, activeHref: r, match: i = "prefix", titleAction: a, header: o, footer: s, width: c = "default", storageKey: l, renderLink: u, tone: d = "surface", "aria-label": f, className: p, "data-testid": m }) {
	let h = Zt[d], g = P(() => en(n), [n]);
	return /* @__PURE__ */ z("nav", {
		"aria-label": f ?? (typeof t == "string" ? t : void 0) ?? "Navigation",
		"data-testid": m,
		className: e("flex flex-none flex-col overflow-hidden border-r", Xt[c], h.rail, p),
		children: [
			(t != null || a) && /* @__PURE__ */ z("div", {
				className: e("flex flex-none items-center justify-between gap-2 border-b px-3 py-2.5", h.divider),
				children: [/* @__PURE__ */ R("span", {
					className: e("truncate text-[11px] font-semibold uppercase tracking-[0.05em]", h.title),
					children: t
				}), a]
			}),
			o && /* @__PURE__ */ R("div", {
				className: e("flex-none border-b px-2 py-2", h.divider),
				children: o
			}),
			/* @__PURE__ */ R("div", {
				className: "min-h-0 flex-1 overflow-y-auto py-1",
				children: g.map((e, t) => e.name === null ? /* @__PURE__ */ R("div", { children: e.items.map((e, t) => /* @__PURE__ */ R(tn, {
					item: e,
					active: $t(e, r, i),
					palette: h,
					renderLink: u
				}, Qt(e, t))) }, "__ungrouped") : /* @__PURE__ */ R(nn, {
					name: e.name,
					items: e.items,
					activeHref: r,
					match: i,
					palette: h,
					storageKey: l ? `${l}.g${t}.${e.name}` : void 0,
					renderLink: u
				}, e.name))
			}),
			s && /* @__PURE__ */ R("div", {
				className: e("flex-none border-t px-2 py-2", h.divider),
				children: s
			})
		]
	});
}
function an({ rails: t, activeHref: n, renderLink: r, tone: i, storageKey: a, children: o, className: s, "data-testid": c }) {
	return /* @__PURE__ */ z("div", {
		"data-testid": c,
		className: e("flex h-full min-h-0 w-full", s),
		children: [t.map(({ id: e, ...t }) => /* @__PURE__ */ R(rn, {
			...t,
			activeHref: t.activeHref ?? n,
			renderLink: t.renderLink ?? r,
			tone: t.tone ?? i,
			storageKey: a ? `${a}.${e}` : void 0
		}, e)), /* @__PURE__ */ R("div", {
			className: "flex min-h-0 min-w-0 flex-1 flex-col",
			children: o
		})]
	});
}
//#endregion
//#region src/components/shared/Toolbar.tsx
var on = {
	sm: "min-h-9 px-3 gap-2 text-xs",
	md: "min-h-11 px-4 gap-2.5 text-[13px]"
}, sn = {
	surface: "bg-surface text-text-primary border-border",
	code: "bg-code-panel text-code-text border-code-border"
}, cn = {
	surface: "bg-border",
	code: "bg-code-border"
}, ln = "a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex=\"-1\"])";
function un({ children: t, end: n, tone: r = "surface", size: i = "sm", sticky: a = !1, bordered: o = !0, wrap: s = !1, className: c, "aria-label": l = "Toolbar", "data-testid": u }) {
	let d = F(null), f = j((e) => {
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
		let r = Array.from(n.querySelectorAll(ln));
		if (r.length === 0) return;
		let i = r.indexOf(document.activeElement), a;
		a = e.key === "Home" ? 0 : e.key === "End" ? r.length - 1 : i < 0 ? 0 : (i + (e.key === "ArrowRight" ? 1 : -1) + r.length) % r.length, r[a]?.focus(), e.preventDefault();
	}, []);
	return /* @__PURE__ */ z("div", {
		ref: d,
		role: "toolbar",
		"aria-label": l,
		"aria-orientation": "horizontal",
		"data-testid": u,
		onKeyDown: f,
		className: e("flex flex-none", s ? "items-start py-1.5" : "items-center", on[i], sn[r], o && "border-b", a && "sticky top-0 z-20", c),
		children: [/* @__PURE__ */ R("div", {
			className: e("flex min-w-0 flex-1 items-center gap-2", s ? "flex-wrap gap-y-1.5" : "overflow-x-auto"),
			children: t
		}), n && /* @__PURE__ */ R("div", {
			className: "flex flex-none items-center gap-2 pl-2",
			children: n
		})]
	});
}
function dn({ children: t, divided: n = !1, tone: r = "surface", className: i, "aria-label": a }) {
	return /* @__PURE__ */ z(L, { children: [n && /* @__PURE__ */ R(fn, { tone: r }), /* @__PURE__ */ R("div", {
		role: a ? "group" : void 0,
		"aria-label": a,
		className: e("flex flex-none items-center gap-1.5", i),
		children: t
	})] });
}
function fn({ tone: t = "surface", className: n }) {
	return /* @__PURE__ */ R("span", {
		role: "separator",
		"aria-orientation": "vertical",
		className: e("h-4 w-px flex-none", cn[t], n)
	});
}
function pn({ children: t, tone: n = "surface", className: r }) {
	return /* @__PURE__ */ R("span", {
		className: e("flex-none whitespace-nowrap", n === "code" ? "text-code-subtle" : "text-text-tertiary", r),
		children: t
	});
}
//#endregion
//#region src/components/shared/WorkArea.tsx
var mn = {
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
function hn({ breadcrumbs: t, toolbar: n, children: r, status: i, padded: a = !0, tone: o = "surface", className: s, bodyClassName: c, "data-testid": l }) {
	let u = mn[o];
	return /* @__PURE__ */ z("div", {
		"data-testid": l,
		className: e("flex h-full min-h-0 min-w-0 flex-1 flex-col", u.column, s),
		children: [
			t && /* @__PURE__ */ R("div", {
				className: e("flex flex-none items-center overflow-x-auto border-b px-3 py-1.5", u.divider),
				children: t
			}),
			n,
			/* @__PURE__ */ R("div", {
				className: e("min-h-0 flex-1 overflow-auto", a && "p-6", c),
				children: r
			}),
			i && /* @__PURE__ */ R("div", {
				className: e("flex flex-none items-center gap-3 border-t px-3 py-1 text-[11px]", u.divider, u.status),
				children: i
			})
		]
	});
}
//#endregion
//#region src/components/shared/DropdownMenu.tsx
function gn({ trigger: t, triggerLabel: n = "Open menu", triggerTitle: r, triggerClassName: i, align: a = "start", sections: o, className: s, "data-testid": c = "dropdown-menu" }) {
	let [l, u] = I(!1), d = F(null), f = F(null), p = j(() => u(!1), []), m = j((e) => {
		if (![
			"ArrowDown",
			"ArrowUp",
			"Home",
			"End"
		].includes(e.key)) return;
		let t = f.current;
		if (!t) return;
		let n = Array.from(t.querySelectorAll("[role=\"menuitem\"]"));
		if (n.length === 0) return;
		e.preventDefault();
		let r = n.indexOf(document.activeElement), i;
		i = e.key === "Home" ? 0 : e.key === "End" ? n.length - 1 : e.key === "ArrowDown" ? r < 0 ? 0 : (r + 1) % n.length : r <= 0 ? n.length - 1 : r - 1, n[i].focus();
	}, []);
	return /* @__PURE__ */ z(L, { children: [/* @__PURE__ */ R("button", {
		ref: d,
		type: "button",
		"aria-label": n,
		"aria-haspopup": "menu",
		"aria-expanded": l,
		title: r,
		onClick: () => u((e) => !e),
		className: e("inline-flex items-center justify-center gap-1.5 cursor-pointer", "rounded-md border border-[var(--color-border)] px-2 py-1", "text-base leading-none text-[var(--color-text-secondary)]", "bg-transparent hover:bg-[var(--color-surface-hover)] transition-colors duration-100", l && "bg-[var(--color-surface-hover)]", i),
		children: t
	}), /* @__PURE__ */ R(O, {
		trigger: d,
		open: l,
		onClose: p,
		placement: a === "end" ? "bottom-end" : "bottom-start",
		className: e("min-w-[180px] p-0 overflow-hidden rounded-lg", s),
		"data-testid": c,
		children: /* @__PURE__ */ R("div", {
			ref: f,
			role: "menu",
			"aria-label": n,
			onKeyDown: m,
			className: "py-1",
			children: o.map((t, n) => /* @__PURE__ */ z("div", {
				role: "group",
				"aria-label": t.label,
				children: [
					n > 0 && /* @__PURE__ */ R("div", {
						role: "separator",
						className: "my-1 border-t border-[var(--color-border)]"
					}),
					t.label && /* @__PURE__ */ R("div", {
						className: "px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-[var(--color-text-tertiary)]",
						children: t.label
					}),
					t.items.map((t, n) => /* @__PURE__ */ z("button", {
						type: "button",
						role: "menuitem",
						"aria-current": t.active || void 0,
						onClick: () => {
							t.onSelect(), p();
						},
						className: e("flex items-center gap-2.5 w-full text-left px-3.5 py-2", "text-sm border-none cursor-pointer font-[inherit] transition-colors duration-100", t.danger ? "text-danger-fg bg-transparent hover:bg-danger-bg" : t.active ? "font-semibold text-[var(--color-text-primary)] bg-[var(--color-surface-hover)]" : "font-normal text-[var(--color-text-primary)] bg-transparent hover:bg-[var(--color-surface-hover)]"),
						children: [t.icon && /* @__PURE__ */ R("span", {
							className: "shrink-0 text-base leading-none",
							"aria-hidden": "true",
							children: t.icon
						}), t.label]
					}, n))
				]
			}, n))
		})
	})] });
}
//#endregion
//#region src/components/shared/MetaLine.tsx
var _n = {
	xs: "text-[11px]",
	sm: "text-[12px]"
}, vn = {
	tertiary: "text-text-tertiary",
	secondary: "text-text-secondary"
};
function yn(e) {
	return e == null || e === !1 || e === !0 ? !1 : typeof e == "string" ? e.trim() !== "" : !Array.isArray(e) || A.toArray(e).some(yn);
}
function bn({ items: t, separator: n = "·", size: r = "xs", tone: i = "tertiary", className: a, "data-testid": o }) {
	let s = t.filter(yn);
	return s.length === 0 ? null : /* @__PURE__ */ R("div", {
		className: e("flex flex-wrap items-center gap-x-1.5 gap-y-0.5", _n[r], vn[i], a),
		"data-testid": o,
		children: s.map((e, t) => /* @__PURE__ */ z("span", {
			className: "flex items-center gap-1.5",
			children: [t > 0 ? /* @__PURE__ */ R("span", {
				"aria-hidden": "true",
				children: n
			}) : null, e]
		}, t))
	});
}
//#endregion
//#region src/components/shared/BoardColumn.tsx
function xn({ label: t, count: n, children: r, emptyLabel: i = "Nothing here", action: a, className: o, "data-testid": s }) {
	let c = r == null || r === !1 || Array.isArray(r) && r.length === 0;
	return /* @__PURE__ */ z("section", {
		className: e("flex flex-col gap-1.5 min-w-0", o),
		"data-testid": s,
		children: [/* @__PURE__ */ z("header", {
			className: "flex items-baseline justify-between gap-2 text-[11px] uppercase tracking-[0.04em] text-text-tertiary",
			children: [/* @__PURE__ */ R("span", {
				className: "truncate",
				children: t
			}), a ?? (n === void 0 ? null : /* @__PURE__ */ R("span", {
				className: "tabular-nums",
				children: n
			}))]
		}), c ? /* @__PURE__ */ R(E, { children: i }) : /* @__PURE__ */ R("div", {
			className: "flex flex-col gap-1.5",
			children: r
		})]
	});
}
//#endregion
//#region src/components/shared/FormRow.tsx
var Sn = {
	sm: "gap-2",
	md: "gap-3",
	lg: "gap-4"
}, Cn = {
	sm: "flex-col sm:flex-row",
	md: "flex-col md:flex-row"
};
function wn({ children: t, stackBelow: n = "sm", gap: r = "md", className: i, "data-testid": a }) {
	return /* @__PURE__ */ R("div", {
		className: e("flex items-start", Cn[n], Sn[r], i),
		"data-testid": a,
		children: A.map(t, (e) => te(e) ? /* @__PURE__ */ R("div", {
			className: "flex-1 basis-0 min-w-0",
			children: e
		}) : e)
	});
}
//#endregion
//#region src/components/shared/DetailHeader.tsx
function Tn({ title: t, badge: n, description: r, meta: i, aside: a, asideWidth: o = 260, as: s = "h2", className: c, "data-testid": l }) {
	return /* @__PURE__ */ z("div", {
		className: e("flex flex-wrap items-start justify-between gap-3", c),
		"data-testid": l,
		children: [/* @__PURE__ */ z("div", {
			className: "flex flex-col gap-1.5 min-w-0 flex-1",
			children: [
				/* @__PURE__ */ z("div", {
					className: "flex flex-wrap items-center gap-2",
					children: [/* @__PURE__ */ R(s, {
						className: e("m-0", s === "h2" ? "text-[18px]" : "text-[15px]"),
						children: t
					}), n]
				}),
				r ? /* @__PURE__ */ R("p", {
					className: "m-0 max-w-[72ch] text-[13px] text-text-secondary",
					children: r
				}) : null,
				i
			]
		}), a ? /* @__PURE__ */ R("aside", {
			className: "flex flex-col gap-2 shrink-0",
			style: { width: o },
			children: a
		}) : null]
	});
}
//#endregion
//#region src/components/shared/ReviewThread.tsx
var En = {
	problem: "problem statement",
	analysis: "analysis",
	option: "options",
	question: "question",
	answer: "answer",
	artifact: "artifact",
	revision: "revision",
	decision: "decision"
}, Dn = {
	problem: "info",
	analysis: "neutral",
	option: "info",
	question: "warning",
	answer: "success",
	artifact: "purple",
	revision: "info",
	decision: "accent"
};
function On({ name: e, type: t, url: n }) {
	return /* @__PURE__ */ z("div", {
		className: "flex items-center gap-3 rounded-md border border-dashed border-border bg-surface-hover/40 px-3 py-2.5",
		children: [
			/* @__PURE__ */ R("span", {
				className: "text-lg",
				role: "img",
				"aria-label": "artifact",
				children: "🖼️"
			}),
			/* @__PURE__ */ z("div", {
				className: "min-w-0",
				children: [/* @__PURE__ */ R("div", {
					className: "truncate text-xs font-medium text-text-primary",
					children: e
				}), t && /* @__PURE__ */ R("div", {
					className: "text-[10.5px] text-text-tertiary",
					children: t
				})]
			}),
			/* @__PURE__ */ R("div", { className: "flex-1" }),
			n ? /* @__PURE__ */ R("a", {
				href: n,
				target: "_blank",
				rel: "noreferrer",
				className: "text-[11px] text-primary no-underline hover:underline",
				children: "open →"
			}) : /* @__PURE__ */ R("span", {
				className: "text-[10.5px] text-text-tertiary",
				children: "stored with the run"
			})
		]
	});
}
function kn({ post: n, labels: r, tones: i, onAnswer: a, busy: o, placeholder: s, submitLabel: l }) {
	let [u, d] = I(""), f = n.kind === "question" && !n.resolved;
	return /* @__PURE__ */ z("div", {
		className: e("border-b border-border px-4 py-3 last:border-b-0", f && "bg-warning-bg/20"),
		children: [
			/* @__PURE__ */ z("div", {
				className: "flex min-w-0 items-center gap-2",
				children: [
					n.authorKind === "human" ? /* @__PURE__ */ R(T, {
						name: n.authorName,
						size: 20
					}) : /* @__PURE__ */ R("span", {
						className: "text-[13px]",
						role: "img",
						"aria-label": "agent",
						children: "🤖"
					}),
					/* @__PURE__ */ R("span", {
						className: "truncate text-xs font-semibold text-text-primary",
						children: n.authorName
					}),
					/* @__PURE__ */ R(c, {
						tone: i[n.kind] ?? "neutral",
						size: "xs",
						uppercase: !0,
						children: r[n.kind] ?? n.kind
					}),
					f && /* @__PURE__ */ R(c, {
						tone: "warning",
						size: "xs",
						dot: "pulse",
						children: "needs a human"
					}),
					n.kind === "question" && n.resolved && /* @__PURE__ */ R(c, {
						tone: "success",
						size: "xs",
						children: "resolved"
					}),
					/* @__PURE__ */ R("div", { className: "flex-1" }),
					n.timeLabel && /* @__PURE__ */ R("span", {
						className: "whitespace-nowrap text-[11px] text-text-tertiary",
						children: n.timeLabel
					})
				]
			}),
			/* @__PURE__ */ R("div", {
				className: "mt-1.5 whitespace-pre-wrap pl-7 text-xs leading-relaxed text-text-secondary",
				children: n.body
			}),
			n.artifact && /* @__PURE__ */ R("div", {
				className: "mt-2 ml-7",
				children: /* @__PURE__ */ R(On, {
					name: n.artifact.name,
					type: n.artifact.type,
					url: n.artifact.url
				})
			}),
			f && a && /* @__PURE__ */ z("div", {
				className: "mt-2.5 ml-7 flex flex-col gap-2",
				children: [/* @__PURE__ */ R(C, {
					value: u,
					onChange: (e) => d(e.target.value),
					placeholder: s,
					rows: 2,
					"aria-label": "Answer this question"
				}), /* @__PURE__ */ R("div", { children: /* @__PURE__ */ R(t, {
					size: "sm",
					variant: "primary",
					disabled: !u.trim() || o,
					onClick: () => a(n.id, u.trim()),
					children: o ? "Sending…" : l
				}) })]
			})
		]
	});
}
function An({ posts: t, onAnswer: n, answerBusy: r = !1, answerPlaceholder: i = "Answer the agent — your answer resolves the question and the loop continues.", answerLabel: a = "Answer & continue the loop", kindLabels: o, kindTones: s, emptyLabel: c = "No posts yet — an agent opens the thread by restating the problem.", className: l, "data-testid": u }) {
	let d = {
		...En,
		...o
	}, f = {
		...Dn,
		...s
	};
	return /* @__PURE__ */ R("div", {
		className: e("overflow-hidden rounded-lg border border-border bg-surface", l),
		...u ? { "data-testid": u } : {},
		children: t.length === 0 ? /* @__PURE__ */ R("div", {
			className: "px-4 py-8 text-center text-xs text-text-tertiary",
			children: c
		}) : t.map((e) => /* @__PURE__ */ R(kn, {
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
var jn = {
	sm: "lg:w-[260px]",
	md: "lg:w-[300px]",
	lg: "lg:w-[340px]"
};
function Mn({ children: t, rail: n, railWidth: r = "md", className: i, "data-testid": a }) {
	return /* @__PURE__ */ z("div", {
		className: e("flex flex-col gap-4 lg:flex-row lg:items-start", i),
		...a ? { "data-testid": a } : {},
		children: [/* @__PURE__ */ R("div", {
			className: "min-w-0 flex-1",
			children: t
		}), /* @__PURE__ */ R("aside", {
			className: e("w-full shrink-0 lg:sticky lg:top-4", jn[r]),
			children: /* @__PURE__ */ R("div", {
				className: "overflow-hidden rounded-lg border border-border bg-surface",
				children: n
			})
		})]
	});
}
function Nn({ title: t, children: n, className: r }) {
	return /* @__PURE__ */ z("section", {
		className: e("border-b border-border px-3.5 py-3 last:border-b-0", r),
		children: [/* @__PURE__ */ R("h3", {
			className: "mb-2 text-[10px] font-semibold uppercase tracking-wide text-text-tertiary",
			children: t
		}), /* @__PURE__ */ R("div", {
			className: "flex flex-col gap-2 text-xs text-text-secondary",
			children: n
		})]
	});
}
//#endregion
//#region src/components/shared/SignoffPanel.tsx
function Pn({ signoffs: t, required: n = 2, actions: r, emptyHint: i, className: a, "data-testid": o }) {
	let s = t.filter((e) => e.decision === "approve").length, l = i ?? `none yet — ${n} approvals ratify the decision`;
	return /* @__PURE__ */ z("div", {
		className: e("flex flex-wrap items-center gap-3 rounded-lg border border-border bg-surface px-4 py-3", a),
		...o ? { "data-testid": o } : {},
		children: [
			/* @__PURE__ */ R("span", {
				className: "text-xs font-semibold text-text-primary",
				children: "Sign-offs"
			}),
			t.length === 0 ? /* @__PURE__ */ R("span", {
				className: "text-xs text-text-tertiary",
				children: l
			}) : /* @__PURE__ */ z(L, { children: [t.map((e) => /* @__PURE__ */ z("span", {
				className: "flex items-center gap-1.5",
				title: e.role ? `${e.name} · ${e.role}` : e.name,
				children: [
					/* @__PURE__ */ R(T, {
						name: e.name,
						size: 18
					}),
					/* @__PURE__ */ R("span", {
						className: "text-xs text-text-secondary",
						children: e.name
					}),
					/* @__PURE__ */ R(c, {
						tone: e.decision === "approve" ? "success" : "danger",
						size: "xs",
						children: e.decision === "approve" ? "✓" : "✕"
					})
				]
			}, e.name)), /* @__PURE__ */ z("span", {
				className: "text-[11px] text-text-tertiary",
				children: [
					s,
					"/",
					n,
					" approvals"
				]
			})] }),
			/* @__PURE__ */ R("div", { className: "flex-1" }),
			r
		]
	});
}
//#endregion
//#region src/components/shared/StatStrip.tsx
var Fn = {
	default: "text-text-primary",
	accent: "text-primary",
	danger: "text-danger"
};
function Q({ item: t, flush: n }) {
	return /* @__PURE__ */ z("div", {
		className: e("min-w-0 px-4 py-2.5", (n === "start" || n === "both") && "pl-0", (n === "end" || n === "both") && "pr-0"),
		children: [/* @__PURE__ */ R("div", {
			className: "whitespace-nowrap text-[10px] font-semibold uppercase tracking-wide text-text-tertiary",
			children: t.label
		}), /* @__PURE__ */ z("div", {
			className: "mt-0.5 flex min-w-0 items-baseline gap-2",
			children: [/* @__PURE__ */ R("span", {
				className: e("text-[17px] font-bold leading-none tabular-nums", Fn[t.tone ?? "default"]),
				children: t.value
			}), t.hint != null && /* @__PURE__ */ R("span", {
				className: "min-w-0 truncate text-[11px] text-text-tertiary",
				children: t.hint
			})]
		})]
	});
}
function In({ items: t, frameless: n = !1, className: r, "aria-label": i, "data-testid": a }) {
	return /* @__PURE__ */ R("div", {
		role: "group",
		className: e("flex divide-x divide-border overflow-x-auto", !n && "rounded-lg border border-border bg-surface", r),
		...i ? { "aria-label": i } : {},
		...a ? { "data-testid": a } : {},
		children: t.map((e, r) => {
			let i = n ? t.length === 1 ? "both" : r === 0 ? "start" : r === t.length - 1 ? "end" : void 0 : void 0;
			return e.href ? /* @__PURE__ */ R("a", {
				href: e.href,
				className: "min-w-0 flex-1 no-underline transition-colors hover:bg-surface-hover",
				children: /* @__PURE__ */ R(Q, {
					item: e,
					flush: i
				})
			}, e.label) : e.onSelect ? /* @__PURE__ */ R("button", {
				type: "button",
				onClick: e.onSelect,
				className: "min-w-0 flex-1 cursor-pointer border-none bg-transparent p-0 text-left transition-colors hover:bg-surface-hover",
				children: /* @__PURE__ */ R(Q, {
					item: e,
					flush: i
				})
			}, e.label) : /* @__PURE__ */ R("div", {
				className: "min-w-0 flex-1",
				children: /* @__PURE__ */ R(Q, {
					item: e,
					flush: i
				})
			}, e.label);
		})
	});
}
//#endregion
//#region src/components/shared/PersonHoverCard.tsx
function Ln({ person: t, children: n, actions: r, details: i, interactiveChild: a = !1, openDelay: o = 450, closeDelay: s = 250, className: c, "data-testid": l = "person-hover-card" }) {
	let u = F(null), [d, f] = I(!1), p = F(null), m = j(() => {
		p.current &&= (clearTimeout(p.current), null);
	}, []);
	M(() => m, [m]);
	let h = j(() => {
		m(), p.current = setTimeout(() => f(!0), o);
	}, [m, o]), g = j(() => {
		m(), p.current = setTimeout(() => f(!1), s);
	}, [m, s]);
	return /* @__PURE__ */ z(L, { children: [/* @__PURE__ */ R("span", {
		ref: u,
		...a ? {} : {
			tabIndex: 0,
			role: "button",
			"aria-haspopup": "dialog",
			onKeyDown: (e) => {
				(e.key === "Enter" || e.key === " ") && (e.preventDefault(), f((e) => !e)), e.key === "Escape" && f(!1);
			}
		},
		"aria-expanded": d,
		"data-testid": `${l}-trigger`,
		className: e("rounded-sm underline-offset-2", a ? "inline-flex" : "cursor-default hover:underline", c),
		onMouseEnter: h,
		onMouseLeave: g,
		onFocus: () => f(!0),
		children: n
	}), /* @__PURE__ */ R(O, {
		trigger: u,
		open: d,
		onClose: () => {
			m(), f(!1);
		},
		placement: "bottom-start",
		"aria-label": `About ${t.displayName}`,
		"data-testid": l,
		children: /* @__PURE__ */ z("div", {
			className: "w-72 p-3",
			onMouseEnter: m,
			onMouseLeave: g,
			children: [
				/* @__PURE__ */ z("div", {
					className: "flex items-start gap-3",
					children: [/* @__PURE__ */ R(T, {
						name: t.displayName,
						src: t.avatarUrl,
						color: t.color,
						size: 40
					}), /* @__PURE__ */ z("div", {
						className: "min-w-0 flex-1",
						children: [
							/* @__PURE__ */ z("div", {
								className: "flex items-center gap-1.5",
								children: [/* @__PURE__ */ R("span", {
									className: "truncate text-sm font-semibold text-text-primary",
									children: t.displayName
								}), t.online !== void 0 && /* @__PURE__ */ R(D, { state: t.online ? "online" : "offline" })]
							}),
							t.title && /* @__PURE__ */ R("div", {
								className: "truncate text-xs text-text-secondary",
								children: t.title
							}),
							t.department && /* @__PURE__ */ R("div", {
								className: "truncate text-xs text-text-tertiary",
								children: t.department
							})
						]
					})]
				}),
				t.statusText && /* @__PURE__ */ R("div", {
					className: "mt-2 truncate text-xs italic text-text-secondary",
					children: t.statusText
				}),
				(t.email || t.localTime) && /* @__PURE__ */ z("div", {
					className: "mt-2 space-y-0.5 border-t border-border pt-2",
					children: [t.email && /* @__PURE__ */ R("div", {
						className: "truncate text-xs text-text-secondary",
						children: t.email
					}), t.localTime && /* @__PURE__ */ z("div", {
						className: "text-xs text-text-tertiary",
						children: [t.localTime, " local time"]
					})]
				}),
				i && /* @__PURE__ */ R("div", {
					className: "mt-2 border-t border-border pt-2",
					children: i
				}),
				r && /* @__PURE__ */ R("div", {
					className: "mt-3 flex items-center gap-2",
					children: r
				})
			]
		})
	})] });
}
//#endregion
//#region src/components/shared/MasterDetail.tsx
function Rn(e) {
	if (!e || typeof window > "u") return !1;
	try {
		return window.localStorage.getItem(e) === "compact";
	} catch {
		return !1;
	}
}
function zn(e, t) {
	if (!(!e || typeof window > "u")) try {
		window.localStorage.setItem(e, t ? "compact" : "expanded");
	} catch {}
}
function Bn({ direction: t }) {
	return /* @__PURE__ */ R("svg", {
		className: e("h-4 w-4", t === "right" && "rotate-180"),
		viewBox: "0 0 16 16",
		fill: "none",
		"aria-hidden": "true",
		children: /* @__PURE__ */ R("path", {
			d: "M10 3L5 8l5 5",
			stroke: "currentColor",
			strokeWidth: "1.5",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		})
	});
}
function Vn({ index: t, selected: n }) {
	return /* @__PURE__ */ R("span", {
		className: e("flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-semibold", n ? "bg-primary text-white" : "bg-surface-inset text-text-tertiary"),
		children: t + 1
	});
}
function Hn({ items: t, keyOf: n, selectedKey: r, onSelect: i, renderRow: a, renderCompactRow: o, renderDetail: s, railTitle: c, railWidth: l = 340, compactWidth: u = 72, storageKey: d, emptyDetail: f, className: p, "data-testid": m = "master-detail" }) {
	let [h, g] = I(() => Rn(d)), _ = j(() => {
		g((e) => {
			let t = !e;
			return zn(d, t), t;
		});
	}, [d]), v = P(() => t.findIndex((e) => n(e) === r), [
		t,
		n,
		r
	]), y = v >= 0 ? t[v] : null;
	return /* @__PURE__ */ z("div", {
		className: e("flex overflow-hidden rounded-lg border border-border bg-surface", p),
		"data-testid": m,
		children: [/* @__PURE__ */ z("nav", {
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
			children: [/* @__PURE__ */ z("div", {
				className: e("flex items-center gap-1 border-b border-border px-3 py-2", h ? "justify-center" : "justify-between"),
				children: [!h && c && /* @__PURE__ */ R("span", {
					className: "truncate text-xs font-semibold uppercase tracking-wide text-text-tertiary",
					children: c
				}), /* @__PURE__ */ R("button", {
					type: "button",
					onClick: _,
					"aria-label": h ? "Expand list" : "Collapse list",
					"data-testid": `${m}-toggle`,
					className: "flex-shrink-0 rounded-md p-1 text-text-tertiary transition-colors hover:bg-surface-hover hover:text-text-primary",
					children: /* @__PURE__ */ R(Bn, { direction: h ? "right" : "left" })
				})]
			}), /* @__PURE__ */ R("div", {
				className: "flex flex-col",
				children: t.map((t, s) => {
					let c = n(t), l = c === r;
					return /* @__PURE__ */ R("div", {
						role: "button",
						tabIndex: 0,
						"aria-current": l,
						onClick: () => i(c),
						onKeyDown: (e) => {
							(e.key === "Enter" || e.key === " ") && (e.preventDefault(), i(c));
						},
						"data-testid": `${m}-row-${c}`,
						className: e("cursor-pointer border-l-2 text-left transition-colors", l ? "border-primary bg-surface-hover" : "border-transparent hover:bg-surface-hover"),
						children: h ? o?.(t, s, l) ?? /* @__PURE__ */ R("div", {
							className: "flex justify-center py-2.5",
							children: /* @__PURE__ */ R(Vn, {
								index: s,
								selected: l
							})
						}) : a(t, s, l)
					}, c);
				})
			})]
		}), /* @__PURE__ */ R("div", {
			className: "min-w-0 flex-1 overflow-y-auto",
			"data-testid": `${m}-detail`,
			children: y ? s(y, v) : f
		})]
	});
}
//#endregion
//#region src/components/shared/TreeView.tsx
function Un(e) {
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
function Wn(e) {
	return typeof CSS < "u" && typeof CSS.escape == "function" ? CSS.escape(e) : e;
}
function Gn(e, t) {
	let n = /* @__PURE__ */ new Set();
	if (!t) return n;
	let r = new Map(e.map((e) => [e.id, e])), i = r.get(t);
	for (; i?.parentId;) n.add(i.parentId), i = r.get(i.parentId);
	return n;
}
function Kn({ expanded: t }) {
	return /* @__PURE__ */ R("svg", {
		className: e("h-3.5 w-3.5 transition-transform", t ? "" : "-rotate-90"),
		viewBox: "0 0 16 16",
		fill: "none",
		"aria-hidden": "true",
		children: /* @__PURE__ */ R("path", {
			d: "M4 6l4 4 4-4",
			stroke: "currentColor",
			strokeWidth: "1.5",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		})
	});
}
function qn(e) {
	let t = e.currentTarget.getBoundingClientRect(), n = e.clientY - t.top;
	return n < t.height / 3 ? "before" : n > t.height * 2 / 3 ? "after" : "into";
}
function Jn({ entry: t, depth: n, expanded: r, onToggle: i, selectedId: a, onSelect: o, renderTrailing: s, dragEnabled: c, dragRef: l, dropTarget: u, setDropTarget: d, onDrop: f, testId: p, focusedId: m, setFocusedId: h }) {
	let g = r.has(t.id), _ = t.children.length > 0, v = t.id === a, y = u?.id === t.id;
	return /* @__PURE__ */ z("div", { children: [/* @__PURE__ */ z("div", {
		draggable: c && !t.disabled && t.status !== "pending",
		onDragStart: (e) => {
			t.disabled || (e.dataTransfer.setData("text/plain", t.id), e.dataTransfer.effectAllowed = "move", l.current = { id: t.id });
		},
		onDragOver: (e) => {
			let n = l.current;
			!n || n.id === t.id || (e.preventDefault(), e.dataTransfer.dropEffect = "move", d({
				id: t.id,
				position: qn(e)
			}));
		},
		onDragLeave: () => {
			u?.id === t.id && d(null);
		},
		onDrop: (e) => {
			let n = l.current;
			if (!n || n.id === t.id) return;
			e.preventDefault();
			let r = qn(e);
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
			_ ? /* @__PURE__ */ R("button", {
				type: "button",
				onClick: (e) => {
					e.stopPropagation(), i(t.id);
				},
				"aria-label": g ? "Collapse" : "Expand",
				className: "flex h-5 w-5 flex-shrink-0 items-center justify-center text-text-tertiary hover:text-text-primary",
				children: /* @__PURE__ */ R(Kn, { expanded: g })
			}) : /* @__PURE__ */ R("span", {
				className: "h-5 w-5 flex-shrink-0",
				"aria-hidden": "true"
			}),
			/* @__PURE__ */ R("span", {
				className: "min-w-0 flex-1 truncate",
				title: t.title,
				children: t.title
			}),
			t.meta && /* @__PURE__ */ R("span", {
				className: "flex-shrink-0 text-xs text-text-tertiary",
				children: t.meta
			}),
			t.badge,
			s?.(t)
		]
	}), g && t.children.map((e) => /* @__PURE__ */ R(Jn, {
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
function Yn(e, t) {
	let n = [], r = (e) => {
		for (let i of e) n.push(i.id), t.has(i.id) && i.children.length > 0 && r(i.children);
	};
	return r(e), n;
}
function Xn({ nodes: t, selectedId: n, onSelect: r, defaultExpanded: i, expanded: a, onToggle: o, onReorder: s, renderTrailing: c, className: l, "data-testid": u = "tree-view" }) {
	let d = P(() => Un(t), [t]), [f, p] = I(() => new Set(i ?? [])), m = a !== void 0, h = P(() => m ? new Set(a) : f, [
		m,
		a,
		f
	]), [g, _] = I(null), v = F(null), y = F(null), [b, x] = I(null), S = P(() => new Map(t.map((e) => [e.id, e])), [t]);
	M(() => {
		let e = Gn(t, n);
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
	}, w = (e) => C(e, !h.has(e)), T = P(() => Yn(d, h), [d, h]), E = g && T.includes(g) ? g : n && T.includes(n) ? n : T[0] ?? null, D = (e) => {
		e && (_(e), y.current?.querySelector(`[data-testid="${u}-row-${Wn(e)}"]`)?.focus());
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
	return t.length === 0 ? null : /* @__PURE__ */ R("div", {
		ref: y,
		role: "tree",
		className: e("flex flex-col", l),
		"data-testid": u,
		onKeyDown: O,
		children: d.map((e) => /* @__PURE__ */ R(Jn, {
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
var Zn = {
	sm: "h-5 w-5",
	md: "h-6 w-6"
}, Qn = {
	sm: "text-[10px]",
	md: "text-[11px]"
};
function $n() {
	return /* @__PURE__ */ R("svg", {
		viewBox: "0 0 16 16",
		fill: "none",
		className: "h-3 w-3",
		"aria-hidden": "true",
		children: /* @__PURE__ */ R("path", {
			d: "M3.5 8.5l3 3 6-6.5",
			stroke: "currentColor",
			strokeWidth: "1.75",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		})
	});
}
function er({ steps: t, size: n = "md", className: r, "data-testid": i = "workflow-stepper" }) {
	return /* @__PURE__ */ R("ol", {
		className: e("flex items-center overflow-x-auto", r),
		"data-testid": i,
		children: t.map((r, i) => {
			let a = i === t.length - 1, o = t[i + 1], s = r.done ? o?.done ? "bg-success" : "bg-gradient-to-r from-success to-success/30" : "bg-border";
			return /* @__PURE__ */ z("li", {
				"aria-current": r.active ? "step" : void 0,
				className: "flex flex-1 items-center last:flex-none",
				children: [/* @__PURE__ */ z("div", {
					className: "flex items-center gap-1.5 whitespace-nowrap",
					children: [/* @__PURE__ */ R("div", {
						className: e("flex flex-shrink-0 items-center justify-center rounded-full transition-colors", Zn[n], r.done ? "bg-success text-white" : r.active ? "border-2 border-info bg-info-bg" : "border border-border bg-surface-inset"),
						children: r.done ? /* @__PURE__ */ R($n, {}) : r.active ? /* @__PURE__ */ R("span", { className: "h-2 w-2 rounded-full bg-info" }) : null
					}), /* @__PURE__ */ R("span", {
						className: e("font-medium leading-none", Qn[n], r.active ? "text-text-primary" : r.done ? "text-text-secondary" : "text-text-tertiary"),
						children: r.label
					})]
				}), !a && /* @__PURE__ */ R("div", { className: e("mx-2 h-1 flex-1 rounded-full transition-colors", s) })]
			}, r.step);
		})
	});
}
//#endregion
//#region src/components/shared/Wizard.tsx
function tr() {
	return /* @__PURE__ */ R("svg", {
		viewBox: "0 0 16 16",
		fill: "none",
		className: "h-3 w-3",
		"aria-hidden": "true",
		children: /* @__PURE__ */ R("path", {
			d: "M3.5 8.5l3 3 6-6.5",
			stroke: "currentColor",
			strokeWidth: "1.75",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		})
	});
}
function nr({ steps: t, activeKey: n, onStep: r, onFinish: i, finishLabel: a = "Finish", className: o, "data-testid": s = "wizard" }) {
	let c = t.findIndex((e) => e.key === n), l = c >= 0 ? t[c] : t[0], u = l?.canAdvance ?? !0, d = c === t.length - 1;
	return /* @__PURE__ */ z("div", {
		className: e("flex flex-col gap-4 sm:flex-row", o),
		"data-testid": s,
		children: [/* @__PURE__ */ R("ol", {
			className: "flex flex-shrink-0 flex-col gap-1 sm:w-56",
			"data-testid": `${s}-rail`,
			children: t.map((t, i) => {
				let a = i < c, o = t.key === n;
				return /* @__PURE__ */ R("li", { children: /* @__PURE__ */ z("button", {
					type: "button",
					onClick: () => r(t.key),
					"aria-current": o ? "step" : void 0,
					"data-testid": `${s}-step-${t.key}`,
					className: e("flex w-full items-center gap-2.5 rounded-md px-2.5 py-2 text-left text-sm transition-colors", o ? "bg-surface-hover font-semibold text-text-primary" : "text-text-secondary hover:bg-surface-hover"),
					children: [/* @__PURE__ */ R("span", {
						className: e("flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full text-[11px] font-semibold", a ? "bg-success text-white" : o ? "border-2 border-info bg-info-bg text-info-fg" : "border border-border bg-surface-inset text-text-tertiary"),
						children: a ? /* @__PURE__ */ R(tr, {}) : i + 1
					}), /* @__PURE__ */ R("span", {
						className: "truncate",
						children: t.label
					})]
				}) }, t.key);
			})
		}), /* @__PURE__ */ z("div", {
			className: "flex min-w-0 flex-1 flex-col gap-4",
			children: [/* @__PURE__ */ R("div", {
				className: "min-w-0 flex-1",
				"data-testid": `${s}-content`,
				children: l?.content
			}), /* @__PURE__ */ z("div", {
				className: "flex items-center justify-between gap-2 border-t border-border pt-3",
				children: [/* @__PURE__ */ R("button", {
					type: "button",
					onClick: () => {
						c > 0 && r(t[c - 1].key);
					},
					disabled: c <= 0,
					"data-testid": `${s}-back`,
					className: "rounded-md px-3 py-1.5 text-sm font-semibold text-text-secondary transition-colors hover:bg-surface-hover disabled:cursor-not-allowed disabled:opacity-50",
					children: "Back"
				}), /* @__PURE__ */ R("button", {
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
var rr = [
	"tsx",
	"ts",
	"jsx",
	"js",
	"json",
	"bash",
	"sh",
	"text"
];
function ir(e) {
	let t = /language-(\w+)/.exec(e ?? "")?.[1]?.toLowerCase();
	return rr.includes(t ?? "") ? t : "text";
}
function $(e) {
	return typeof e == "string" || typeof e == "number" ? String(e) : Array.isArray(e) ? e.map($).join("") : e && typeof e == "object" && "props" in e ? $(e.props?.children) : "";
}
var ar = {
	table({ children: e }) {
		return /* @__PURE__ */ R("div", {
			className: "overflow-x-auto",
			children: /* @__PURE__ */ R("table", {
				className: "w-full border-collapse text-sm",
				children: e
			})
		});
	},
	th({ children: e }) {
		return /* @__PURE__ */ R("th", {
			className: "border-b border-border px-3 py-1.5 text-left font-semibold text-text-primary",
			children: e
		});
	},
	td({ children: e }) {
		return /* @__PURE__ */ R("td", {
			className: "border-b border-border px-3 py-1.5 text-text-secondary",
			children: e
		});
	},
	a({ href: e, children: t }) {
		return /* @__PURE__ */ R("a", {
			href: e,
			target: "_blank",
			rel: "noreferrer",
			className: "text-primary underline underline-offset-2 hover:text-primary-hover",
			children: t
		});
	},
	h1({ children: e }) {
		return /* @__PURE__ */ R("h1", {
			className: "mb-3 mt-6 text-xl font-bold text-text-primary first:mt-0",
			children: e
		});
	},
	h2({ children: e }) {
		return /* @__PURE__ */ R("h2", {
			className: "mb-2 mt-5 text-lg font-bold text-text-primary first:mt-0",
			children: e
		});
	},
	h3({ children: e }) {
		return /* @__PURE__ */ R("h3", {
			className: "mb-2 mt-4 text-base font-semibold text-text-primary first:mt-0",
			children: e
		});
	},
	p({ children: e }) {
		return /* @__PURE__ */ R("p", {
			className: "mb-3 text-sm leading-relaxed text-text-secondary last:mb-0",
			children: e
		});
	},
	ul({ children: e }) {
		return /* @__PURE__ */ R("ul", {
			className: "mb-3 list-disc space-y-1 pl-5 text-sm text-text-secondary",
			children: e
		});
	},
	ol({ children: e }) {
		return /* @__PURE__ */ R("ol", {
			className: "mb-3 list-decimal space-y-1 pl-5 text-sm text-text-secondary",
			children: e
		});
	},
	blockquote({ children: e }) {
		return /* @__PURE__ */ R("blockquote", {
			className: "mb-3 border-l-2 border-border pl-3 text-sm italic text-text-tertiary",
			children: e
		});
	},
	hr() {
		return /* @__PURE__ */ R("hr", { className: "my-4 border-border" });
	},
	pre({ children: e, className: t }) {
		return /* @__PURE__ */ R(or, {
			className: t,
			children: e
		});
	},
	code({ className: e, children: t }) {
		return e ? /* @__PURE__ */ R("code", {
			className: e,
			children: t
		}) : /* @__PURE__ */ R("code", {
			className: "rounded bg-surface-inset px-1 py-0.5 text-[13px] text-text-primary",
			children: t
		});
	}
};
function or({ children: e, className: t }) {
	let n = Array.isArray(e) ? e[0] : e, r = ir(n && typeof n == "object" && "props" in n ? n.props?.className : void 0), i = $(e).replace(/\n$/, "");
	return /* @__PURE__ */ R(U, {
		code: i,
		language: r,
		className: "mb-3",
		copyButton: !0
	});
}
function sr({ markdown: t, className: n, "data-testid": r = "markdown-view" }) {
	return /* @__PURE__ */ R("div", {
		className: e("min-w-0", n),
		"data-testid": r,
		children: /* @__PURE__ */ R(ie, {
			remarkPlugins: [ae],
			components: ar,
			children: t
		})
	});
}
//#endregion
//#region src/components/shared/Tooltip.tsx
function cr(e, t, n) {
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
function lr({ content: t, children: n, placement: r = "top", openDelay: i = 350, closeDelay: a = 100, disabled: o = !1, className: s, "data-testid": c = "tooltip" }) {
	let [l, u] = I(!1), [d, f] = I(null), p = F(null), m = F(null), h = N(), g = j(() => {
		m.current &&= (clearTimeout(m.current), null);
	}, []);
	M(() => g, [g]);
	let _ = j(() => {
		let e = p.current;
		e && f(cr(e.getBoundingClientRect(), r, 6));
	}, [r]);
	re(() => {
		l ? _() : f(null);
	}, [l, _]);
	let v = j(() => {
		o || (g(), m.current = setTimeout(() => u(!0), i));
	}, [
		g,
		o,
		i
	]), y = j(() => {
		g(), m.current = setTimeout(() => u(!1), a);
	}, [g, a]), b = j(() => {
		g(), u(!1);
	}, [g]);
	return /* @__PURE__ */ z(L, { children: [/* @__PURE__ */ R("span", {
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
	}), l && d && typeof document < "u" && V(/* @__PURE__ */ R("div", {
		role: "tooltip",
		id: h,
		"data-testid": c,
		className: e("pointer-events-none z-[9500] max-w-xs rounded-md border border-border bg-surface px-2 py-1 text-xs text-text-primary shadow-lg", s),
		style: d,
		children: t
	}), document.body)] });
}
//#endregion
export { at as $, Ht as A, Tt as B, dn as C, le as Ct, an as D, rn as E, At as F, yt as G, St as H, kt as I, ft as J, gt as K, Dt as L, Nt as M, Mt as N, Gt as O, jt as P, ot as Q, Ot as R, un as S, ue as St, fn as T, bt as U, wt as V, Z as W, ct as X, ut as Y, st as Z, wn as _, Ee as _t, Xn as a, Ge as at, gn as b, De as bt, In as c, Ue as ct, Nn as d, Ie as dt, rt as et, On as f, Pe as ft, Tn as g, Ae as gt, An as h, ke as ht, er as i, qe as it, Rt as j, Yt as k, Pn as l, Be as lt, Dn as m, Me as mt, sr as n, Y as nt, Hn as o, q as ot, En as p, Ne as pt, ht as q, nr as r, Ye as rt, Ln as s, We as st, lr as t, tt, Mn as u, Re as ut, xn as v, K as vt, pn as w, hn as x, U as xt, bn as y, Te as yt, Et as z };
