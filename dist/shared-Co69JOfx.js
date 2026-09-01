import "./ToastProvider-BKjV21G4.js";
import { t as e } from "./cn-DhjIN-s0.js";
import "./StatusPill-CLcnxWgo.js";
import { t } from "./Button-wU9TwJvB.js";
import { t as n } from "./Card-DWAlG4MZ.js";
import "./FormField-qzkrC8vN.js";
import "./IconButton-C3DMtvSx.js";
import "./Banner-BLOg1hC_.js";
import "./Chart-DUoOhhMu.js";
import { c as r, f as i, l as a, p as o, s, t as c } from "./Chip-YhQI5B9P.js";
import { t as l } from "./overlayStack-BFH9XXvN.js";
import { t as u } from "./Modal-CyoyiNKN.js";
import "./ConfirmDialog-Cd8NZEXi.js";
import { t as d } from "./EmptyState-ClmWoqCb.js";
import { n as f } from "./PermissionDeniedCard-B9cc5d5O.js";
import { n as p, t as m } from "./CardHeader-MBY5yyXT.js";
import { i as h, n as g, r as _, t as v } from "./focusTrap-CmWJlptm.js";
import "./SkeletonCard-CGe8XFPB.js";
import "./FileUploadDrop-DMLKYoZL.js";
import "./DockedPanelContext-pH9A5z1h.js";
import { t as y } from "./Input-DLknWXri.js";
import { t as b } from "./Textarea-Dz4doxTv.js";
import "./FloatingPanel-CNQWLXV-.js";
import { t as x } from "./StatusDot-Bgx2zxgC.js";
import { t as S } from "./PresenceDot-3gBZGPvX.js";
import { n as C, t as w } from "./Avatar-BzicCOft.js";
import { n as T } from "./Badge-CIF88QKG.js";
import { t as E } from "./InlinePopover-DFdI8hw1.js";
import { createContext as D, useCallback as O, useContext as k, useEffect as A, useId as j, useMemo as M, useRef as N, useState as P } from "react";
import { Fragment as F, jsx as I, jsxs as L } from "react/jsx-runtime";
import { Command as R } from "cmdk";
import { createPortal as ee } from "react-dom";
//#region src/components/shared/CodeBlock.tsx
var te = /* @__PURE__ */ "import.export.from.as.const.let.var.function.return.default.if.else.switch.case.break.new.typeof.instanceof.in.of.interface.type.extends.implements.class.async.await.true.false.null.undefined.this.super.try.catch.finally.throw.for.while.do.continue.public.private.protected.readonly.static.enum".split("."), ne = [
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
], re = /* @__PURE__ */ "cd.ls.echo.cat.grep.sed.awk.find.cp.mv.rm.mkdir.rmdir.touch.chmod.chown.pwd.which.npm.yarn.pnpm.npx.git.node.curl.wget".split(".");
function ie(e) {
	return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function ae(e, t) {
	let n = e.replace(/(\/\/.*?)(\n|$)/g, `<span style="color:${t.comment}">$1</span>$2`);
	n = n.replace(/(\/\*[\s\S]*?\*\/)/g, `<span style="color:${t.comment}">$1</span>`), n = n.replace(/("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)/g, `<span style="color:${t.string}">$1</span>`);
	let r = RegExp(`\\b(${te.join("|")})\\b`, "g");
	return n = n.replace(r, `<span style="color:${t.keyword}">$1</span>`), n = n.replace(/\b(\d+(?:\.\d+)?)\b/g, `<span style="color:${t.number}">$1</span>`), n;
}
function oe(e, t) {
	let n = e.replace(/("(?:[^"\\]|\\.)*")(\s*:)/g, `<span style="color:${t.property}">$1</span>$2`);
	return n = n.replace(/("(?:[^"\\]|\\.)*")/g, `<span style="color:${t.string}">$1</span>`), n = n.replace(/\b(true|false|null)\b/g, `<span style="color:${t.keyword}">$1</span>`), n = n.replace(/\b(-?\d+(?:\.\d+)?)\b/g, `<span style="color:${t.number}">$1</span>`), n;
}
function se(e, t) {
	let n = e.replace(/(#.*?)(\n|$)/g, `<span style="color:${t.comment}">$1</span>$2`);
	n = n.replace(/("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')/g, `<span style="color:${t.string}">$1</span>`);
	let r = RegExp(`\\b(${ne.join("|")})\\b`, "g");
	n = n.replace(r, `<span style="color:${t.keyword}">$1</span>`);
	let i = RegExp(`\\b(${re.join("|")})\\b`, "g");
	return n = n.replace(i, `<span style="color:${t.builtin}">$1</span>`), n = n.replace(/(\$\w+|\$\{[^}]+\})/g, `<span style="color:${t.variable}">$1</span>`), n;
}
var ce = {
	comment: "var(--color-neutral)",
	string: "#4ade80",
	keyword: "var(--color-state-pending)",
	number: "#fbbf24",
	property: "#7dd3fc",
	builtin: "#c4b5fd",
	variable: "#fbbf24"
}, le = {
	comment: "var(--color-neutral)",
	string: "#15803d",
	keyword: "var(--color-info-fg)",
	number: "#a16207",
	property: "#0369a1",
	builtin: "var(--color-cat-ai)",
	variable: "#a16207"
};
function ue(e, t, n) {
	let r = n === "dark" ? ce : le, i = ie(e);
	switch (t) {
		case "json": return oe(i, r);
		case "bash":
		case "sh": return se(i, r);
		case "text": return i;
		default: return ae(i, r);
	}
}
function de({ code: t, language: n = "tsx", theme: r = "dark", copyButton: i = !0, showLineNumbers: a = !1, className: o, style: s, "data-testid": c, ariaLabel: l }) {
	let [u, d] = P(!1), f = O(() => {
		typeof navigator > "u" || !navigator.clipboard || navigator.clipboard.writeText(t).then(() => {
			d(!0), setTimeout(() => d(!1), 1500);
		}).catch(() => {});
	}, [t]), p = r === "dark", m = M(() => t.split("\n"), [t]), h = M(() => ue(t, n, r), [
		t,
		n,
		r
	]);
	return /* @__PURE__ */ L("div", {
		"data-testid": c,
		"data-language": n,
		"data-theme": r,
		className: e("relative rounded-lg border font-mono text-[13px] leading-relaxed overflow-hidden", p ? "bg-surface-inverse text-text-inverse border-border-emphasis" : "bg-surface-panel text-text-primary border-border", o),
		style: s,
		"aria-label": l ?? `Code (${n})`,
		children: [i && /* @__PURE__ */ I("button", {
			type: "button",
			onClick: f,
			"aria-label": u ? "Copied" : "Copy code",
			className: e("absolute top-2 right-2 text-[11px] px-2 py-1 rounded border transition-opacity", p ? "bg-surface-inverse text-text-inverse border-border-emphasis hover:bg-neutral" : "bg-surface text-text-primary border-border-emphasis hover:bg-surface-hover"),
			"data-copied": u ? "true" : "false",
			children: u ? "Copied" : "Copy"
		}), /* @__PURE__ */ I("pre", {
			className: "m-0 px-4 py-3 overflow-x-auto",
			children: a ? /* @__PURE__ */ L("div", {
				className: "flex",
				children: [/* @__PURE__ */ I("div", {
					className: e("select-none pr-3 text-right", p ? "text-neutral" : "text-text-tertiary"),
					"aria-hidden": "true",
					children: m.map((e, t) => /* @__PURE__ */ I("div", { children: t + 1 }, t))
				}), /* @__PURE__ */ I("code", {
					className: "flex-1 block",
					dangerouslySetInnerHTML: { __html: h }
				})]
			}) : /* @__PURE__ */ I("code", {
				className: "block",
				dangerouslySetInnerHTML: { __html: h }
			})
		})]
	});
}
//#endregion
//#region src/components/shared/CommandPalette.tsx
var fe = "cui:command-palette:recents", pe = 5;
function me(e, t) {
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
function he(e, t) {
	if (!(!e || typeof window > "u")) try {
		window.localStorage.setItem(e, JSON.stringify(t));
	} catch {}
}
var z = D(null);
function B() {
	let e = k(z);
	if (!e) throw Error("useCommandPalette must be used inside a <CommandPaletteProvider>.");
	return e;
}
function ge() {
	let { open: e, close: t, toggle: n, isOpen: r, query: i } = B();
	return {
		open: e,
		close: t,
		toggle: n,
		isOpen: r,
		query: i
	};
}
function V(e, t) {
	let n = t.toLowerCase().split("+").map((e) => e.trim()).filter(Boolean);
	if (n.length === 0) return !1;
	let r = n[n.length - 1], i = new Set(n.slice(0, -1)), a = i.has("cmd") || i.has("meta"), o = i.has("ctrl"), s = i.has("mod"), c = i.has("shift"), l = i.has("alt");
	if (s) {
		if (!e.metaKey && !e.ctrlKey) return !1;
	} else if (a !== e.metaKey || o !== e.ctrlKey) return !1;
	return c !== e.shiftKey || l !== e.altKey ? !1 : e.key.toLowerCase() === r;
}
function _e({ commands: e, getDynamicCommands: t, recentsKey: n = fe, recentsLimit: r = pe, children: i }) {
	let [a, o] = P(!1), [s, c] = P(""), [l, u] = P(() => /* @__PURE__ */ new Map()), [d, f] = P(() => me(n, r)), p = O((e) => {
		n !== null && f((t) => {
			let i = [e, ...t.filter((t) => t !== e)].slice(0, r);
			return he(n, i), i;
		});
	}, [n, r]), m = O(() => o(!0), []), h = O(() => {
		o(!1), c("");
	}, []), g = O(() => o((e) => !e), []), _ = O((e) => {
		u((t) => {
			let n = new Map(t);
			return n.set(e.id, e), n;
		});
	}, []), v = O((e) => {
		u((t) => {
			if (!t.has(e)) return t;
			let n = new Map(t);
			return n.delete(e), n;
		});
	}, []);
	A(() => {
		let e = (e) => {
			(e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k" && (e.preventDefault(), o((e) => !e));
		};
		return window.addEventListener("keydown", e, !0), () => window.removeEventListener("keydown", e, !0);
	}, []);
	let y = M(() => {
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
	]), b = N(y);
	b.current = y, A(() => {
		let e = (e) => {
			if (!((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k")) {
				for (let t of b.current) if (t.hotkey && V(e, t.hotkey)) {
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
	return /* @__PURE__ */ I(z.Provider, {
		value: x,
		children: i
	});
}
function ve(e) {
	let { registerCommand: t, unregisterCommand: n } = B();
	A(() => (t(e), () => n(e.id)), [
		e,
		t,
		n
	]);
}
function ye(e) {
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
function be({ placeholder: t = "Type a command or search…", emptyState: n, className: r } = {}) {
	let { isOpen: i, close: a, query: o, setQuery: s, mergedCommands: c, recents: l, noteSelection: d } = B(), f = M(() => {
		if (o.trim() !== "" || l.length === 0) return [];
		let e = new Map(c.map((e) => [e.id, e]));
		return l.map((t) => e.get(t)).filter((e) => !!e);
	}, [
		c,
		o,
		l
	]), p = M(() => ye(c), [c]), m = O((e) => {
		d(e.id), a(), Promise.resolve().then(() => e.run());
	}, [a, d]);
	return /* @__PURE__ */ I(u, {
		open: i,
		onClose: a,
		ariaLabel: "Command palette",
		maxWidth: 640,
		rawChildren: !0,
		backdropTestId: "command-palette-backdrop",
		children: /* @__PURE__ */ L(R, {
			label: "Command palette",
			value: void 0,
			className: e("flex flex-col gap-0 w-full", r),
			"data-testid": "command-palette",
			children: [/* @__PURE__ */ I(R.Input, {
				value: o,
				onValueChange: s,
				placeholder: t,
				"data-autofocus": !0,
				className: e("w-full px-3 py-2.5 text-sm border-0 border-b border-border", "outline-none bg-transparent text-text-primary placeholder:text-text-tertiary"),
				"data-testid": "command-palette-input"
			}), /* @__PURE__ */ L(R.List, {
				className: "max-h-[360px] overflow-y-auto py-2",
				children: [
					/* @__PURE__ */ I(R.Empty, {
						className: "px-3 py-6 text-center text-sm text-text-tertiary",
						children: n ?? "No results."
					}),
					f.length > 0 && /* @__PURE__ */ I(R.Group, {
						heading: "Recent",
						"data-testid": "command-palette-group-recent",
						children: f.map((t) => /* @__PURE__ */ L(R.Item, {
							value: `recent-${t.id} ${t.label}`,
							keywords: t.keywords,
							onSelect: () => m(t),
							"data-testid": `command-palette-recent-${t.id}`,
							className: e("flex items-center gap-2 px-3 py-2 mx-1 rounded-md cursor-pointer text-sm", "text-text-primary aria-selected:bg-surface-hover"),
							children: [t.icon && /* @__PURE__ */ I("span", {
								className: "shrink-0 text-text-secondary",
								children: t.icon
							}), /* @__PURE__ */ I("span", {
								className: "flex-1 truncate",
								children: t.label
							})]
						}, `recent-${t.id}`))
					}),
					p.map(({ groupName: t, items: n }) => /* @__PURE__ */ I(R.Group, {
						heading: t ?? void 0,
						children: n.map((t) => /* @__PURE__ */ L(R.Item, {
							value: `${t.id} ${t.label} ${(t.keywords ?? []).join(" ")}`,
							keywords: t.keywords,
							onSelect: () => m(t),
							"data-testid": `command-palette-item-${t.id}`,
							className: e("flex items-center gap-2 px-3 py-2 mx-1 rounded-md cursor-pointer text-sm", "text-text-primary aria-selected:bg-surface-hover"),
							children: [
								t.icon && /* @__PURE__ */ I("span", {
									className: "shrink-0 text-text-secondary",
									children: t.icon
								}),
								/* @__PURE__ */ I("span", {
									className: "flex-1 truncate",
									children: t.label
								}),
								t.hint && /* @__PURE__ */ I("span", {
									className: "text-xs text-text-tertiary truncate",
									children: t.hint
								}),
								t.shortcut && t.shortcut.length > 0 && /* @__PURE__ */ I("span", {
									className: "flex items-center gap-1 shrink-0",
									children: t.shortcut.map((n, r) => /* @__PURE__ */ I("kbd", {
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
function xe({ className: t } = {}) {
	let { toggle: n } = B();
	return /* @__PURE__ */ L("button", {
		type: "button",
		onClick: n,
		"data-testid": "command-palette-hint",
		className: e("inline-flex items-center gap-1.5 px-2 py-1 rounded-md", "text-xs text-text-secondary bg-surface-hover", "border border-border hover:bg-surface-panel", "cursor-pointer transition-colors", t),
		"aria-label": "Open command palette",
		children: [/* @__PURE__ */ I("kbd", {
			className: "font-mono text-[11px]",
			children: "⌘K"
		}), /* @__PURE__ */ I("span", { children: "Search" })]
	});
}
//#endregion
//#region src/components/shared/CapabilityDeniedFallback.tsx
var Se = "🔒";
function Ce({ capabilityName: e, title: t, description: n, actionLabel: r, onAction: i, actions: a, icon: o, testId: s = "capability-denied-fallback" }) {
	let c = t ?? (e ? `${e} is unavailable` : "Feature unavailable"), l = n ?? (e ? `${e} is not enabled for this workspace. Contact your administrator to request access.` : "This feature is not enabled for your account. Contact your administrator to request access.");
	return /* @__PURE__ */ I(d, {
		icon: o === null ? void 0 : o ?? Se,
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
function we({ icon: t = "⚠️", title: n, body: r, description: i, actionLabel: a, onAction: o, action: s, testId: c = "error-state", actionTestId: l = "error-state-action" }) {
	let u = i ?? r;
	return /* @__PURE__ */ L("div", {
		role: "alert",
		"data-testid": c,
		className: e("flex flex-col items-center justify-center min-h-[220px]", "text-text-secondary gap-2 p-8 font-[inherit]"),
		children: [
			t && (typeof t == "string" ? /* @__PURE__ */ I("div", {
				className: "text-[52px] mb-2",
				"aria-hidden": !0,
				children: t
			}) : /* @__PURE__ */ I("div", {
				className: "mb-2",
				children: t
			})),
			/* @__PURE__ */ I("div", {
				className: "text-[17px] font-semibold text-[var(--color-state-error,#dc2626)]",
				children: n
			}),
			u && /* @__PURE__ */ I("div", {
				className: "text-[13px] text-center max-w-[340px] text-text-secondary leading-normal",
				children: u
			}),
			s ? /* @__PURE__ */ I("div", {
				className: "mt-2.5",
				children: s
			}) : a && o && /* @__PURE__ */ I("button", {
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
function Te({ label: t = "Loading…", description: n, spinnerSize: r = "lg", spinnerColor: i, testId: a = "loading-state" }) {
	return /* @__PURE__ */ L("div", {
		role: "status",
		"aria-live": "polite",
		"data-testid": a,
		className: e("flex flex-col items-center justify-center min-h-[220px]", "text-text-secondary gap-3 p-8 font-[inherit]"),
		children: [
			/* @__PURE__ */ I(f, {
				size: r,
				color: i,
				"aria-label": t
			}),
			/* @__PURE__ */ I("div", {
				className: "text-[15px] font-medium text-text-primary",
				children: t
			}),
			n && /* @__PURE__ */ I("div", {
				className: "text-[13px] text-center max-w-[340px] text-text-secondary leading-normal",
				children: n
			})
		]
	});
}
//#endregion
//#region src/components/shared/ShortcutsHelp.tsx
var Ee = [
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
function De({ open: t, onClose: n }) {
	return /* @__PURE__ */ L(u, {
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
			/* @__PURE__ */ I("div", {
				className: "text-base font-semibold text-text-primary mb-2.5",
				children: "Keyboard shortcuts"
			}),
			/* @__PURE__ */ I("div", {
				className: "overflow-y-auto pr-1",
				children: Ee.map((t, n) => /* @__PURE__ */ L("div", { children: [/* @__PURE__ */ I("div", {
					className: e("text-[12px] font-bold text-text-primary uppercase tracking-[0.05em] mb-1.5", n === 0 ? "mt-0 pt-0" : "mt-4 pt-1.5 border-t border-border-subtle"),
					children: t.title
				}), /* @__PURE__ */ I("div", { children: t.rows.map((n, r) => /* @__PURE__ */ L("div", {
					className: e("flex items-baseline justify-between py-1 text-[13px] gap-4", n.planned && "opacity-60"),
					"data-planned": n.planned ? "true" : void 0,
					children: [/* @__PURE__ */ I("span", {
						className: e("font-mono text-[12px] border rounded px-1.5 py-px whitespace-nowrap shrink-0", n.planned ? "text-text-tertiary bg-surface border-border-subtle line-through" : "text-text-primary bg-surface-hover border-border"),
						children: n.keys
					}), /* @__PURE__ */ L("span", {
						className: "text-neutral text-right flex-1",
						children: [n.action, n.planned && /* @__PURE__ */ I("span", {
							className: "ml-1.5 text-[10px] uppercase tracking-wide text-text-tertiary",
							children: "planned"
						})]
					})]
				}, `${t.title}-${r}`)) })] }, t.title))
			}),
			/* @__PURE__ */ I("div", {
				className: "flex justify-end mt-[18px]",
				children: /* @__PURE__ */ I("button", {
					onClick: n,
					className: "py-1.5 px-3.5 text-[13px] font-semibold border border-border rounded-md bg-surface text-text-primary cursor-pointer font-[inherit]",
					children: "Close"
				})
			})
		]
	});
}
//#endregion
//#region src/components/shared/Tabs.tsx
var Oe = {
	sm: "px-2.5 py-1 text-xs",
	md: "px-3 py-1.5 text-sm"
};
function ke(e) {
	switch (e) {
		case "underline": return "inline-flex items-center gap-1 border-b border-[var(--color-border)]";
		case "pill": return "inline-flex items-center gap-1";
		case "segmented": return "inline-flex items-center rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-inset,#f8fafc)] p-0.5 gap-0.5";
	}
}
function Ae(t, n, r) {
	return t === "underline" ? e("-mb-px border-b-2 rounded-none", n ? "border-[var(--color-primary)] text-[var(--color-text-primary)]" : "border-transparent text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]", r && "opacity-50 cursor-not-allowed hover:text-[var(--color-text-secondary)]") : t === "pill" ? e("rounded-full", n ? "bg-[var(--color-primary)] text-white" : "text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text-primary)]", r && "opacity-50 cursor-not-allowed hover:bg-transparent") : e("rounded-md", n ? "bg-surface shadow-sm text-[var(--color-text-primary)] border border-[var(--color-border)]" : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)]", r && "opacity-50 cursor-not-allowed hover:bg-transparent");
}
function je({ items: t, value: n, onValueChange: r, variant: i = "underline", size: a = "md", className: o, style: s, "aria-label": c, idPrefix: l }) {
	let u = j(), d = l ?? u, f = N(/* @__PURE__ */ new Map()), p = M(() => t.filter((e) => !e.disabled).map((e) => e.id), [t]), m = O((e) => {
		f.current.get(e)?.focus();
	}, []), h = O((e, t) => {
		if (p.length === 0) return;
		let n = p.indexOf(t), i = null;
		switch (e.key) {
			case "ArrowRight":
			case "ArrowDown":
				i = n === -1 ? 0 : (n + 1) % p.length;
				break;
			case "ArrowLeft":
			case "ArrowUp":
				i = n === -1 ? p.length - 1 : (n - 1 + p.length) % p.length;
				break;
			case "Home":
				i = 0;
				break;
			case "End":
				i = p.length - 1;
				break;
			case "Enter":
			case " ":
				e.preventDefault(), r(t);
				return;
			default: return;
		}
		if (i !== null) {
			e.preventDefault();
			let t = p[i];
			r(t), m(t);
		}
	}, [
		p,
		r,
		m
	]);
	return /* @__PURE__ */ I("div", {
		role: "tablist",
		"aria-label": c,
		className: e(ke(i), o),
		style: s,
		children: t.map((t) => {
			let o = t.id === n;
			return /* @__PURE__ */ L("button", {
				ref: (e) => {
					e ? f.current.set(t.id, e) : f.current.delete(t.id);
				},
				type: "button",
				role: "tab",
				id: `${d}-tab-${t.id}`,
				"aria-controls": `${d}-panel-${t.id}`,
				"aria-selected": o,
				"aria-disabled": t.disabled || void 0,
				tabIndex: o ? 0 : -1,
				disabled: t.disabled,
				onClick: () => !t.disabled && r(t.id),
				onKeyDown: (e) => h(e, t.id),
				className: e("inline-flex items-center gap-1.5 font-medium transition-colors cursor-pointer", Oe[a], Ae(i, o, !!t.disabled)),
				children: [
					t.icon,
					/* @__PURE__ */ I("span", { children: t.label }),
					t.badge !== void 0 && t.badge !== null && /* @__PURE__ */ I("span", {
						className: e("ml-1 inline-flex items-center justify-center rounded-full px-1.5 min-w-[20px] text-[10px] font-semibold", o && i === "pill" ? "bg-white/20 text-white" : "bg-[var(--color-surface-hover)] text-[var(--color-text-secondary)]"),
						children: t.badge
					})
				]
			}, t.id);
		})
	});
}
function Me({ id: e, when: t, idPrefix: n, className: r, style: i, children: a }) {
	return e === t ? /* @__PURE__ */ I("div", {
		role: "tabpanel",
		id: n ? `${n}-panel-${e}` : void 0,
		"aria-labelledby": n ? `${n}-tab-${e}` : void 0,
		tabIndex: 0,
		className: r,
		style: i,
		children: a
	}) : null;
}
//#endregion
//#region src/components/shared/StatCard.tsx
var Ne = {
	positive: "text-[var(--color-success)]",
	negative: "text-[var(--color-danger)]",
	neutral: "text-[var(--color-text-secondary)]"
};
function Pe(e) {
	return e.tone ?? (e.direction === "up" ? "positive" : "negative");
}
function Fe({ label: t, value: n, accent: r = !1, danger: i = !1, hint: a, delta: o, sparklineData: s, to: c, as: l, onClick: u, mono: d = !1, className: f, style: m, "data-testid": h }) {
	let g = e("block rounded-lg border p-3 no-underline transition-colors", !r && !i && "bg-[var(--color-surface)] border-[var(--color-border)]", r && "bg-[var(--color-primary-soft)] border-l-[3px] border-l-[var(--color-primary)] border-[var(--color-border)]", i && "bg-[var(--color-danger-bg)] border-l-[3px] border-l-[var(--color-danger)] border-[var(--color-border)]", (c || u) && "hover:bg-[var(--color-surface-hover)] cursor-pointer", f), _ = s && s.length > 0 ? s : null, v = null;
	if (o) {
		let t = Pe(o), n = o.direction === "up" ? "▲" : "▼", r = o.direction === "up" ? "+" : "-", i = o.suffix ?? "%", a = Math.abs(o.value), s = o["aria-label"] ?? `${o.direction} ${a}${i}`;
		v = /* @__PURE__ */ L("div", {
			"data-testid": "stat-card-delta",
			"data-direction": o.direction,
			"data-tone": t,
			"aria-label": s,
			className: e("mt-1 text-[12px] font-medium leading-tight", Ne[t]),
			children: [
				/* @__PURE__ */ L("span", {
					"aria-hidden": "true",
					children: [n, " "]
				}),
				r,
				a,
				i
			]
		});
	}
	let y = /* @__PURE__ */ L(F, { children: [
		/* @__PURE__ */ I("div", {
			className: "text-[12px] uppercase tracking-wide text-[var(--color-text-tertiary)]",
			children: t
		}),
		/* @__PURE__ */ L("div", {
			className: "mt-1 flex items-center gap-2",
			children: [/* @__PURE__ */ I("div", {
				className: e("text-[24px] font-bold leading-tight text-[var(--color-text-primary)]", d && "font-mono"),
				children: n
			}), _ && /* @__PURE__ */ I(p, {
				data: _,
				width: 80,
				height: 20
			})]
		}),
		v,
		a != null && /* @__PURE__ */ I("div", {
			className: "mt-1 text-[11px] italic text-[var(--color-text-tertiary)]",
			children: a
		})
	] });
	return c ? l ? /* @__PURE__ */ I(l, {
		to: c,
		"data-testid": h,
		className: g,
		style: m,
		children: y
	}) : /* @__PURE__ */ I("a", {
		href: c,
		"data-testid": h,
		className: g,
		style: m,
		children: y
	}) : u ? /* @__PURE__ */ I("button", {
		type: "button",
		onClick: u,
		"data-testid": h,
		className: e(g, "w-full text-left"),
		style: m,
		children: y
	}) : /* @__PURE__ */ I("div", {
		"data-testid": h,
		className: g,
		style: m,
		children: y
	});
}
//#endregion
//#region src/components/shared/FollowBanner.tsx
function Ie({ name: t, onStop: n, autoStopOnInteract: r = !0, className: i, "data-testid": a = "follow-banner" }) {
	let o = N(null);
	return A(() => {
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
	]), t ? /* @__PURE__ */ L("div", {
		"data-testid": a,
		className: e("flex items-center justify-center gap-2 px-4 py-1.5 shrink-0", "bg-info-bg border-b border-info-border text-info-fg text-[12.5px] font-medium", i),
		children: [/* @__PURE__ */ L("span", { children: ["Following ", t] }), /* @__PURE__ */ I("button", {
			type: "button",
			onClick: n,
			className: "text-[11.5px] font-semibold px-2 py-0.5 rounded border border-info-border bg-transparent text-info-fg cursor-pointer",
			children: "Stop"
		})]
	}) : null;
}
//#endregion
//#region src/components/shared/SuggestionCard.tsx
function H({ reason: t, title: n, label: r, tone: i = "neutral", meta: o, context: s, onSelect: c, actionLabel: l = "Use this", disabled: u = !1, className: d, "data-testid": f }) {
	return /* @__PURE__ */ L("button", {
		type: "button",
		"data-testid": f,
		onClick: c,
		disabled: u,
		"aria-label": `${n} — ${t}`,
		className: e("group w-full text-left flex flex-col gap-1.5 rounded-lg border p-3 transition-colors", "border-border bg-surface hover:border-border-emphasis hover:bg-surface-hover", "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1", u ? "opacity-60 cursor-not-allowed" : "cursor-pointer", d),
		children: [
			/* @__PURE__ */ L("span", {
				className: "flex items-center gap-2 min-w-0",
				children: [r && /* @__PURE__ */ I("span", {
					className: e("shrink-0 text-[10px] font-semibold uppercase tracking-wide px-1.5 py-0.5 rounded", a[i]),
					children: r
				}), /* @__PURE__ */ I("span", {
					className: "text-[11px] text-text-secondary truncate",
					children: t
				})]
			}),
			/* @__PURE__ */ I("span", {
				className: "text-[13px] font-medium text-text-primary line-clamp-2",
				children: n
			}),
			(o || s) && /* @__PURE__ */ L("span", {
				className: "flex items-center gap-2 text-[11px] text-text-tertiary min-w-0",
				children: [o, s && /* @__PURE__ */ I("span", {
					className: "truncate",
					children: s
				})]
			}),
			/* @__PURE__ */ L("span", {
				"aria-hidden": "true",
				className: "text-[11px] font-semibold text-primary opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity",
				children: [l, " →"]
			})
		]
	});
}
//#endregion
//#region src/components/shared/TaskComposer.tsx
function Le({ title: n, description: r, titlePlaceholder: i = "Title", promptPlaceholder: a = "What should it do?", suggestions: o, suggestionsTitle: s = "Suggested next", suggestionsLoading: c = !1, suggestionsEmpty: l, onSubmit: u, onChooseSuggestion: d, submitLabel: f = "Queue", hint: p, busy: m = !1, className: h, "data-testid": g }) {
	let [_, v] = P(""), [x, S] = P(""), [C, w] = P(void 0), T = j(), E = j();
	A(() => {
		C && o && !o.some((e) => e.id === C) && w(void 0);
	}, [C, o]);
	let D = _.trim().length > 0 && x.trim().length > 0 && !m;
	function O() {
		D && (u({
			title: _.trim(),
			prompt: x.trim(),
			...C ? { suggestionId: C } : {}
		}), v(""), S(""), w(void 0));
	}
	function k(e) {
		d?.(e), v(e.fillTitle ?? e.title), S(e.prompt), w(e.id);
	}
	let M = c || (o?.length ?? 0) > 0 || !!l;
	return /* @__PURE__ */ L("section", {
		"data-testid": g,
		className: e("rounded-lg border border-border bg-surface overflow-hidden", h),
		children: [
			/* @__PURE__ */ L("div", {
				className: "px-3.5 pt-3 pb-1",
				children: [/* @__PURE__ */ I("h3", {
					className: "text-xs font-semibold text-text-secondary tracking-wide select-none uppercase",
					children: n
				}), r && /* @__PURE__ */ I("p", {
					className: "mt-1 text-[12px] text-text-tertiary",
					children: r
				})]
			}),
			M && /* @__PURE__ */ L("div", {
				className: "px-3.5 pt-2 pb-1",
				children: [/* @__PURE__ */ I("div", {
					className: "text-[11px] font-semibold text-text-tertiary tracking-wide uppercase mb-2",
					children: s
				}), c ? /* @__PURE__ */ I("div", {
					className: "grid gap-2 sm:grid-cols-2 lg:grid-cols-4",
					"aria-busy": "true",
					children: [
						0,
						1,
						2,
						3
					].map((e) => /* @__PURE__ */ I("div", { className: "h-[92px] rounded-lg border border-border bg-surface-panel animate-pulse" }, e))
				}) : (o?.length ?? 0) > 0 ? /* @__PURE__ */ I("div", {
					className: "grid gap-2 sm:grid-cols-2 lg:grid-cols-4",
					children: o.map((e) => /* @__PURE__ */ I(H, {
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
				}) : /* @__PURE__ */ I("div", {
					className: "text-[12px] text-text-tertiary",
					children: l
				})]
			}),
			/* @__PURE__ */ L("div", {
				className: "px-3.5 pt-2 pb-2 flex flex-col gap-2",
				children: [
					/* @__PURE__ */ I("label", {
						className: "sr-only",
						htmlFor: T,
						children: i
					}),
					/* @__PURE__ */ I(y, {
						id: T,
						value: _,
						onChange: (e) => v(e.target.value),
						placeholder: i,
						disabled: m
					}),
					/* @__PURE__ */ I("label", {
						className: "sr-only",
						htmlFor: E,
						children: a
					}),
					/* @__PURE__ */ I(b, {
						id: E,
						value: x,
						onChange: (e) => S(e.target.value),
						placeholder: a,
						disabled: m,
						rows: 3,
						onKeyDown: (e) => {
							e.key === "Enter" && (e.metaKey || e.ctrlKey) && (e.preventDefault(), O());
						}
					})
				]
			}),
			/* @__PURE__ */ L("div", {
				className: "px-3.5 pb-3 flex items-center gap-3",
				children: [
					p && /* @__PURE__ */ I("span", {
						className: "text-[11px] text-text-tertiary select-none",
						children: p
					}),
					/* @__PURE__ */ I("span", { className: "flex-1" }),
					/* @__PURE__ */ I(t, {
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
//#region src/components/shared/KPIGrid.tsx
var Re = {
	1: "sm:grid-cols-1",
	2: "sm:grid-cols-2",
	3: "sm:grid-cols-3",
	4: "sm:grid-cols-4"
};
function ze({ children: t, columns: n = 4, dense: r = !1, className: i, style: a, "data-testid": o = "kpi-grid" }) {
	return /* @__PURE__ */ I("div", {
		"data-testid": o,
		className: e("grid grid-cols-1", Re[n], r ? "gap-2" : "gap-4", i),
		style: a,
		children: t
	});
}
//#endregion
//#region src/components/shared/ProgressBar.tsx
var Be = {
	sm: "h-1.5",
	md: "h-2"
};
function Ve({ value: t, max: n = 100, color: r, size: i = "md", label: a, showRatio: o = !0, className: s, style: c, "data-testid": l, "aria-label": u }) {
	let d = n > 0 ? n : 100, f = Math.max(0, Math.min(t, d)), p = Math.min(100, f / d * 100), m = r ?? "var(--color-primary)";
	return /* @__PURE__ */ L("div", {
		"data-testid": l,
		className: e("w-full", s),
		style: c,
		children: [a != null && /* @__PURE__ */ L("div", {
			className: "flex items-center justify-between mb-1 text-[12px] text-[var(--color-text-secondary)]",
			children: [/* @__PURE__ */ I("span", { children: a }), /* @__PURE__ */ I("span", {
				className: "text-[var(--color-text-tertiary)] tabular-nums",
				children: o ? `${f}/${d}` : `${Math.round(p)}%`
			})]
		}), /* @__PURE__ */ I("div", {
			role: "progressbar",
			"aria-valuenow": f,
			"aria-valuemin": 0,
			"aria-valuemax": d,
			"aria-label": u,
			className: e("w-full rounded-full overflow-hidden bg-[var(--color-surface-hover)]", Be[i]),
			children: /* @__PURE__ */ I("div", {
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
function He({ name: t, label: n, avatarSize: r = 20, avatarColor: i, presence: a, onClick: o, className: s, style: c, title: l, "data-testid": u = "user-chip" }) {
	return /* @__PURE__ */ L(o ? "button" : "span", {
		type: o ? "button" : void 0,
		onClick: o,
		title: l ?? t,
		"data-testid": u,
		className: e("inline-flex items-center gap-1.5 rounded-full px-1.5 py-0.5 text-[12px] text-text-primary", o && "hover:bg-surface-hover cursor-pointer transition-colors", !o && "cursor-default", s),
		style: c,
		children: [
			/* @__PURE__ */ I(w, {
				name: t,
				size: r,
				color: i
			}),
			/* @__PURE__ */ I("span", {
				className: "font-medium leading-none",
				children: n ?? t
			}),
			a && /* @__PURE__ */ I(S, {
				state: a,
				size: "xs"
			})
		]
	});
}
//#endregion
//#region src/components/shared/SegmentedControl.tsx
var Ue = {
	sm: "px-2.5 py-1 text-xs",
	md: "px-3 py-1.5 text-sm"
}, We = "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)]", Ge = "bg-surface shadow-sm text-[var(--color-text-primary)] border border-[var(--color-border)]";
function Ke({ options: t, value: n, onChange: r, size: i = "md", className: a }) {
	return /* @__PURE__ */ I("div", {
		role: "group",
		className: e("inline-flex items-center rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-inset,#f8fafc)] p-0.5 gap-0.5", a),
		children: t.map((t) => {
			let a = t.value === n;
			return /* @__PURE__ */ L("button", {
				type: "button",
				onClick: () => r(t.value),
				"aria-pressed": a,
				className: e("inline-flex items-center gap-1.5 rounded-md font-medium transition-all cursor-pointer", Ue[i], a ? Ge : We),
				children: [t.icon, t.label]
			}, t.value);
		})
	});
}
//#endregion
//#region src/components/shared/EntityCell.tsx
function qe({ label: t, id: n, href: r, mono: i = !1, className: a, labelClassName: o }) {
	let s = /* @__PURE__ */ I("span", {
		className: "truncate",
		children: t
	});
	return /* @__PURE__ */ L("div", {
		className: e("flex flex-col min-w-0", a),
		children: [/* @__PURE__ */ I("div", {
			className: e("font-medium text-[var(--color-text-primary)] truncate text-sm", o),
			children: r ? /* @__PURE__ */ I("a", {
				href: r,
				className: "hover:text-[var(--color-primary)] hover:underline",
				children: s
			}) : s
		}), n && /* @__PURE__ */ I("div", {
			className: e("text-[10px] font-mono text-[var(--color-text-tertiary)] truncate mt-0.5", i && "tracking-tight"),
			children: n
		})]
	});
}
//#endregion
//#region src/components/shared/Drawer.tsx
function Je({ open: t, onClose: n, title: r, subtitle: i, width: a = 460, children: o, footer: s, "aria-label": c, "data-testid": u }) {
	let d = N(null), f = N(null), p = j(), m = l(t);
	return A(() => {
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
	]), A(() => {
		if (t) return f.current = typeof document < "u" ? document.activeElement : null, v(d.current), () => {
			g(f.current), f.current = null;
		};
	}, [t]), t ? ee(/* @__PURE__ */ L("div", {
		className: "fixed inset-0 z-[9000]",
		"data-testid": u,
		children: [/* @__PURE__ */ I("div", {
			className: "absolute inset-0 bg-black/30 backdrop-blur-[1px]",
			onClick: n,
			"aria-hidden": "true"
		}), /* @__PURE__ */ L("aside", {
			ref: d,
			role: "dialog",
			"aria-modal": "true",
			"aria-labelledby": r ? p : void 0,
			"aria-label": r ? void 0 : c,
			className: e("absolute right-0 top-0 h-full bg-surface shadow-xl flex flex-col", "transition-transform duration-200", t ? "translate-x-0" : "translate-x-full"),
			style: { width: a },
			children: [
				/* @__PURE__ */ L("div", {
					className: "flex items-start justify-between p-5 border-b border-[var(--color-border)] flex-shrink-0",
					children: [/* @__PURE__ */ L("div", {
						className: "min-w-0",
						children: [r && /* @__PURE__ */ I("h2", {
							id: p,
							className: "text-base font-semibold text-[var(--color-text-primary)]",
							children: r
						}), i && /* @__PURE__ */ I("p", {
							className: "text-sm text-[var(--color-text-secondary)] mt-0.5",
							children: i
						})]
					}), /* @__PURE__ */ I("button", {
						type: "button",
						onClick: n,
						className: "ml-4 flex-shrink-0 p-1 rounded hover:bg-[var(--color-surface-hover)] text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] transition-colors",
						"aria-label": "Close",
						children: /* @__PURE__ */ I("svg", {
							width: "16",
							height: "16",
							viewBox: "0 0 16 16",
							fill: "none",
							children: /* @__PURE__ */ I("path", {
								d: "M4 4l8 8M12 4l-8 8",
								stroke: "currentColor",
								strokeWidth: "1.5",
								strokeLinecap: "round"
							})
						})
					})]
				}),
				/* @__PURE__ */ I("div", {
					className: "flex-1 overflow-y-auto p-5",
					children: o
				}),
				s && /* @__PURE__ */ I("div", {
					className: "flex-shrink-0 border-t border-[var(--color-border)] p-4 bg-[var(--color-surface-inset,#f8fafc)]",
					children: s
				})
			]
		})]
	}), document.body) : null;
}
//#endregion
//#region src/components/shared/CollapsibleSection.tsx
function Ye(e, t) {
	if (!e || typeof window > "u") return t;
	try {
		let n = window.localStorage.getItem(e);
		return n === null ? t : n === "true";
	} catch {
		return t;
	}
}
function Xe({ title: t, defaultOpen: n = !1, badge: r, children: i, className: a, storageKey: o }) {
	let [s, c] = P(() => Ye(o, n)), l = j(), u = N(null), d = N(null);
	return A(() => {
		if (o && !(typeof window > "u")) try {
			window.localStorage.setItem(o, String(s));
		} catch {}
	}, [s, o]), /* @__PURE__ */ L("div", {
		className: e("border border-[var(--color-border)] rounded-lg overflow-hidden", a),
		children: [/* @__PURE__ */ L("button", {
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
			children: [/* @__PURE__ */ I("span", {
				className: "text-sm font-semibold text-[var(--color-text-primary)]",
				children: t
			}), /* @__PURE__ */ L("div", {
				className: "flex items-center gap-2",
				children: [r, /* @__PURE__ */ I("svg", {
					className: e("w-4 h-4 text-[var(--color-text-tertiary)] transition-transform", s && "rotate-180"),
					viewBox: "0 0 16 16",
					fill: "none",
					"aria-hidden": "true",
					children: /* @__PURE__ */ I("path", {
						d: "M4 6l4 4 4-4",
						stroke: "currentColor",
						strokeWidth: "1.5",
						strokeLinecap: "round",
						strokeLinejoin: "round"
					})
				})]
			})]
		}), s && /* @__PURE__ */ I("div", {
			id: l,
			ref: d,
			className: "border-t border-[var(--color-border)] bg-surface",
			children: i
		})]
	});
}
//#endregion
//#region src/components/shared/SearchInput.tsx
var U = {
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
function Ze({ value: t, onChange: n, placeholder: r, onClear: i, tone: a = "surface", className: o, inputClassName: s, style: c, autoFocus: l, "aria-label": u }) {
	let d = U[a] ?? U.surface;
	return /* @__PURE__ */ L("div", {
		className: e("relative inline-flex items-center", o),
		style: c,
		children: [
			/* @__PURE__ */ L("svg", {
				className: e("absolute left-3 w-3.5 h-3.5 pointer-events-none", d.icon),
				viewBox: "0 0 16 16",
				fill: "none",
				"aria-hidden": "true",
				children: [/* @__PURE__ */ I("circle", {
					cx: "7",
					cy: "7",
					r: "4.5",
					stroke: "currentColor",
					strokeWidth: "1.5"
				}), /* @__PURE__ */ I("path", {
					d: "M10.5 10.5L14 14",
					stroke: "currentColor",
					strokeWidth: "1.5",
					strokeLinecap: "round"
				})]
			}),
			/* @__PURE__ */ I("input", {
				type: "text",
				value: t,
				onChange: (e) => n(e.target.value),
				placeholder: r ?? "Search…",
				autoFocus: l,
				"aria-label": u ?? r ?? "Search",
				className: e("w-full pl-8 pr-7 py-1.5 text-sm rounded-md border focus:outline-none focus:ring-2 transition-colors", d.field, s)
			}),
			t && /* @__PURE__ */ I("button", {
				type: "button",
				onClick: () => {
					n(""), i?.();
				},
				className: e("absolute right-2 p-0.5 rounded", d.clear),
				"aria-label": "Clear search",
				children: /* @__PURE__ */ I("svg", {
					width: "12",
					height: "12",
					viewBox: "0 0 12 12",
					fill: "none",
					children: /* @__PURE__ */ I("path", {
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
var W = {
	error: "bg-[var(--color-danger-bg,#fef2f2)] border-[var(--color-danger,#dc2626)] text-[var(--color-danger,#dc2626)]",
	success: "bg-[var(--color-success-bg,#f0fdf4)] border-[var(--color-success,#16a34a)] text-[var(--color-success,#16a34a)]",
	info: "bg-[var(--color-info-bg,#eff6ff)] border-[var(--color-info,#2563eb)] text-[var(--color-info,#2563eb)]",
	warning: "bg-[var(--color-warning-bg,#fffbeb)] border-[var(--color-warning,#f59e0b)] text-[var(--color-warning,#f59e0b)]"
}, Qe = {
	surface: W,
	code: {
		error: "bg-code-surface border-code-red text-code-red",
		success: "bg-code-surface border-code-green text-code-green",
		info: "bg-code-surface border-code-blue text-code-blue",
		warning: "bg-code-surface border-code-peach text-code-peach"
	}
};
function $e({ tone: t, palette: n = "surface", children: r, onDismiss: i, className: a }) {
	return /* @__PURE__ */ L("div", {
		role: t === "error" || t === "warning" ? "alert" : "status",
		"aria-live": t === "error" || t === "warning" ? "assertive" : "polite",
		className: e("flex items-start gap-2 px-3 py-2 rounded-md border-l-[3px] text-sm", (Qe[n] ?? W)[t], a),
		children: [/* @__PURE__ */ I("span", {
			className: "flex-1",
			children: r
		}), i && /* @__PURE__ */ I("button", {
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
function et({ title: t, description: n, actions: r, back: i, badge: a, className: o }) {
	return /* @__PURE__ */ L("div", {
		className: e("flex flex-col gap-1.5", o),
		children: [
			i && /* @__PURE__ */ L("a", {
				href: i.to,
				onClick: i.onClick,
				className: "inline-flex items-center gap-1 text-xs text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] mb-1 w-fit",
				children: [/* @__PURE__ */ I("svg", {
					width: "12",
					height: "12",
					viewBox: "0 0 12 12",
					fill: "none",
					"aria-hidden": "true",
					children: /* @__PURE__ */ I("path", {
						d: "M7 2L3 6l4 4",
						stroke: "currentColor",
						strokeWidth: "1.5",
						strokeLinecap: "round",
						strokeLinejoin: "round"
					})
				}), i.label]
			}),
			/* @__PURE__ */ L("div", {
				className: "flex items-center justify-between gap-4",
				children: [/* @__PURE__ */ L("div", {
					className: "min-w-0 flex items-center gap-2.5",
					children: [/* @__PURE__ */ I("h1", {
						className: "text-xl font-semibold text-[var(--color-text-primary)] leading-tight",
						children: t
					}), a]
				}), r && /* @__PURE__ */ I("div", {
					className: "flex-shrink-0 flex items-center gap-2",
					children: r
				})]
			}),
			n && /* @__PURE__ */ I("p", {
				className: "text-sm text-[var(--color-text-secondary)]",
				children: n
			})
		]
	});
}
//#endregion
//#region src/components/shared/ThinkingDots.tsx
function G({ size: t = "md", color: n, className: r }) {
	let i = t === "sm" ? 4 : 6, a = n || "var(--color-text-tertiary, #94a3b8)";
	return /* @__PURE__ */ L(F, { children: [/* @__PURE__ */ I("style", { children: "\n        @keyframes thinkDot {\n          0%, 80%, 100% { transform: scale(1); opacity: 0.4; }\n          40% { transform: scale(1.3); opacity: 1; }\n        }\n      " }), /* @__PURE__ */ I("span", {
		className: e("inline-flex items-center gap-1", r),
		children: [
			0,
			1,
			2
		].map((e) => /* @__PURE__ */ I("span", { style: {
			width: i,
			height: i,
			borderRadius: "50%",
			background: a,
			display: "inline-block",
			animation: `thinkDot 1.2s ease-in-out ${e * .2}s infinite`
		} }, e))
	})] });
}
//#endregion
//#region src/components/shared/TypingIndicator.tsx
function K(e) {
	if (e.length === 0) return "";
	if (e.length === 1) return `${e[0]} is typing…`;
	if (e.length === 2) return `${e[0]} and ${e[1]} are typing…`;
	let t = e.length - 2;
	return `${e[0]}, ${e[1]} and ${t} other${t > 1 ? "s" : ""} are typing…`;
}
function tt({ names: t, compact: n = !1, color: r, size: i = "sm", className: a, "data-testid": o = "typing-indicator" }) {
	return t.length === 0 ? null : /* @__PURE__ */ L("span", {
		role: "status",
		"aria-live": "polite",
		"data-testid": o,
		className: e("inline-flex items-center gap-1.5 text-[12px] text-text-tertiary", a),
		children: [/* @__PURE__ */ I(G, {
			size: i,
			color: r
		}), !n && /* @__PURE__ */ I("span", { children: K(t) })]
	});
}
//#endregion
//#region src/components/shared/LogStream.tsx
var nt = {
	debug: "DEBUG",
	info: "INFO",
	warn: "WARN",
	error: "ERROR"
}, q = {
	debug: "text-[var(--color-text-tertiary)]",
	info: "text-[var(--color-info,#3b82f6)]",
	warn: "text-[var(--color-warning,#d97706)]",
	error: "text-[var(--color-danger,#dc2626)]"
};
function J({ lines: t, follow: r = !0, showTimestamp: i = !0, showLevel: a = !0, showSource: o = !0, title: s = "Log stream", headerSlot: c, emptyMessage: l = "No log lines yet.", maxHeight: u, onClear: d, className: f, style: p, "data-testid": h = "log-stream" }) {
	let g = N(null), [_, v] = P(!1);
	A(() => {
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
	}, x = /* @__PURE__ */ L("div", {
		className: "flex items-center gap-2",
		children: [/* @__PURE__ */ L("span", {
			className: "text-[10px] text-[var(--color-text-tertiary)]",
			"data-testid": `${h}-count`,
			children: [
				t.length,
				" ",
				t.length === 1 ? "line" : "lines"
			]
		}), d && /* @__PURE__ */ I("button", {
			type: "button",
			onClick: d,
			"data-testid": `${h}-clear`,
			className: e("text-[10px] uppercase tracking-wide", "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]", "border border-[var(--color-border)] rounded px-1.5 py-0.5", "cursor-pointer bg-transparent"),
			children: "Clear"
		})]
	});
	return /* @__PURE__ */ L(n, {
		"data-testid": h,
		className: e("flex flex-col", f),
		style: p,
		children: [s !== null && /* @__PURE__ */ I("div", {
			className: "px-4 py-3 border-b border-[var(--color-border)]",
			children: /* @__PURE__ */ I(m, {
				title: s,
				meta: c ?? x
			})
		}), /* @__PURE__ */ L("div", {
			className: "relative flex-1 min-h-0 flex",
			children: [/* @__PURE__ */ I("div", {
				ref: g,
				onScroll: y,
				role: "log",
				"aria-live": r ? "polite" : "off",
				"data-testid": `${h}-scroll`,
				className: e("flex-1 overflow-y-auto", "font-mono text-[12px] leading-[1.55]", "bg-[var(--color-surface-subtle,#0b1020)] text-[var(--color-text-primary,#e5e7eb)]", "py-2"),
				style: { maxHeight: u },
				children: t.length === 0 ? /* @__PURE__ */ I("div", {
					"data-testid": `${h}-empty`,
					className: "px-3 py-6 text-center text-[11px] text-[var(--color-text-tertiary)]",
					children: l
				}) : t.map((t) => {
					let n = t.level ?? "info", r = String(n), s = nt[n] ?? r.toUpperCase(), c = q[n] ?? q.info;
					return /* @__PURE__ */ L("div", {
						role: "listitem",
						"data-testid": `${h}-line`,
						"data-level": t.level || void 0,
						className: "flex items-baseline gap-2 px-3 hover:bg-[var(--color-surface,rgba(255,255,255,0.04))]",
						children: [
							i && t.timestamp && /* @__PURE__ */ I("span", {
								className: "shrink-0 text-[var(--color-text-tertiary)] tabular-nums",
								children: t.timestamp
							}),
							a && t.level && /* @__PURE__ */ I("span", {
								className: e("shrink-0 font-semibold uppercase text-[10px] w-[44px]", c),
								"aria-label": `level ${r.toLowerCase()}`,
								children: s
							}),
							o && t.source && /* @__PURE__ */ L("span", {
								className: "shrink-0 text-[var(--color-text-secondary)]",
								children: [
									"[",
									t.source,
									"]"
								]
							}),
							/* @__PURE__ */ I("span", {
								className: "flex-1 whitespace-pre-wrap break-words",
								children: t.message
							})
						]
					}, t.id);
				})
			}), r && _ && /* @__PURE__ */ I("button", {
				type: "button",
				"data-testid": `${h}-jump`,
				onClick: b,
				className: e("absolute bottom-3 left-1/2 -translate-x-1/2", "px-3 py-1 text-[10px] font-semibold uppercase tracking-wide", "bg-primary text-white rounded-full border-none cursor-pointer", "shadow-[0_2px_8px_rgba(0,0,0,0.25)]"),
				children: "Jump to live ↓"
			})]
		})]
	});
}
var rt = J;
//#endregion
//#region src/components/shared/ThumbnailCard.tsx
function it({ title: t, description: n, category: r, categoryTone: i = "neutral", thumbnail: a, icon: o = "🧩", thumbnailHeight: s = 160, href: l, onClick: u, badge: d, meta: f, className: p, style: m, "data-testid": h = "thumbnail-card" }) {
	let g = e("group block w-full text-left bg-[var(--color-surface,#fff)]", "rounded-xl border border-[var(--color-border)] overflow-hidden", "transition-[box-shadow,transform] duration-150", (l || u) && "cursor-pointer hover:shadow-[0_8px_25px_rgba(0,0,0,0.08)] hover:-translate-y-0.5", p), _ = /* @__PURE__ */ L(F, { children: [/* @__PURE__ */ L("div", {
		"data-testid": `${h}-thumb`,
		className: e("relative flex items-center justify-center", "bg-gradient-to-br from-[var(--color-primary-bg,#eef2ff)] to-[var(--color-surface,#ffffff)]", "border-b border-[var(--color-border)]"),
		style: { height: s },
		children: [a ? /* @__PURE__ */ I("img", {
			src: a,
			alt: "",
			className: "w-full h-full object-cover"
		}) : /* @__PURE__ */ I("span", {
			className: "text-5xl opacity-50",
			"aria-hidden": !0,
			children: o
		}), d && /* @__PURE__ */ I("span", {
			"data-testid": `${h}-badge`,
			className: "absolute top-2 right-2",
			children: d
		})]
	}), /* @__PURE__ */ L("div", {
		className: "px-4 py-3",
		children: [
			/* @__PURE__ */ L("div", {
				className: "flex items-center gap-2 mb-1.5",
				children: [r && /* @__PURE__ */ I(c, {
					tone: i,
					size: "xs",
					"data-testid": `${h}-category`,
					children: r
				}), f && /* @__PURE__ */ I("span", {
					className: "ml-auto",
					children: f
				})]
			}),
			/* @__PURE__ */ I("div", {
				className: "text-[14px] font-semibold text-[var(--color-text-primary)] leading-snug",
				children: t
			}),
			n && /* @__PURE__ */ I("div", {
				className: "mt-1 text-[12px] text-[var(--color-text-secondary)] leading-snug",
				children: n
			})
		]
	})] });
	return l ? /* @__PURE__ */ I("a", {
		href: l,
		onClick: u,
		"data-testid": h,
		className: e(g, "no-underline text-inherit"),
		style: m,
		children: _
	}) : u ? /* @__PURE__ */ I("button", {
		type: "button",
		onClick: u,
		"data-testid": h,
		className: e(g, "font-inherit"),
		style: m,
		children: _
	}) : /* @__PURE__ */ I("div", {
		"data-testid": h,
		className: g,
		style: m,
		children: _
	});
}
//#endregion
//#region src/components/shared/CatalogGrid.tsx
var at = {
	1: "sm:grid-cols-1",
	2: "sm:grid-cols-2",
	3: "sm:grid-cols-2 lg:grid-cols-3",
	4: "sm:grid-cols-2 lg:grid-cols-4",
	5: "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
};
function ot({ children: t, columns: n = 3, dense: r = !1, className: i, style: a, "data-testid": o = "catalog-grid" }) {
	return /* @__PURE__ */ I("div", {
		"data-testid": o,
		"data-columns": n,
		className: e("grid grid-cols-1", at[n], r ? "gap-3" : "gap-5", i),
		style: a,
		children: t
	});
}
//#endregion
//#region src/components/shared/StackDiagram.tsx
function st({ orientation: t, variant: n }) {
	if (n === "none") return null;
	let r = t === "vertical", i = n === "arrow" ? r ? "↓" : "→" : r ? "│" : "─";
	return /* @__PURE__ */ I("div", {
		"data-testid": "stack-diagram-connector",
		"aria-hidden": !0,
		className: e("flex items-center justify-center text-[var(--color-text-tertiary)]", r ? "h-5 text-base" : "w-5 text-base"),
		children: i
	});
}
function Y({ layers: t, orientation: n = "vertical", connector: a = "arrow", className: c, style: l, "data-testid": u = "stack-diagram" }) {
	let d = n === "vertical";
	return /* @__PURE__ */ I("div", {
		"data-testid": u,
		"data-orientation": n,
		"data-connector": a,
		className: e("flex", d ? "flex-col items-stretch" : "flex-row items-stretch flex-wrap", c),
		style: l,
		children: t.map((c, l) => {
			let u = o(c.tone ?? "neutral");
			return /* @__PURE__ */ L("div", {
				className: e("flex", "flex-col"),
				children: [/* @__PURE__ */ L("div", {
					"data-testid": "stack-diagram-layer",
					"data-tone": u,
					className: e("rounded-md border px-3 py-2", s[u], r[u], !d && "min-w-[140px]"),
					children: [/* @__PURE__ */ L("div", {
						className: "flex items-center gap-2",
						children: [
							c.icon != null && /* @__PURE__ */ I("span", {
								className: "shrink-0 text-[14px] leading-none",
								"aria-hidden": !0,
								children: c.icon
							}),
							/* @__PURE__ */ I("span", {
								className: e("text-[12px] font-semibold", i[u]),
								children: c.label
							}),
							c.meta != null && /* @__PURE__ */ I("span", {
								className: "ml-auto text-[10px] text-[var(--color-text-tertiary)] shrink-0",
								children: c.meta
							})
						]
					}), c.description != null && /* @__PURE__ */ I("div", {
						className: "mt-0.5 text-[11px] leading-snug text-[var(--color-text-secondary)]",
						children: c.description
					})]
				}), l < t.length - 1 && /* @__PURE__ */ I(st, {
					orientation: n,
					variant: a
				})]
			}, c.id);
		})
	});
}
var ct = Y;
//#endregion
//#region src/components/shared/ChatComposer.tsx
function lt({ value: t, onChange: n, onSubmit: r, disabled: i = !1, multiline: a = !1, placeholder: o, submitLabel: s = "→", className: c, style: l, autoFocus: u, maxRows: d = 4, "aria-label": f = "Message", "aria-labelledby": p, submitAriaLabel: m = "Send" }) {
	let h = !i && t.trim().length > 0, g = typeof s == "string" && /\p{L}|\p{N}/u.test(s) ? void 0 : m, _ = p ? void 0 : f, v = () => {
		h && r();
	}, y = (e) => {
		if (e.key === "Enter") {
			if (a && e.shiftKey) return;
			e.preventDefault(), v();
		}
	}, b = e("flex-1 px-3 py-2 text-sm rounded-lg border border-[var(--color-border-field,#d1d5db)] bg-surface text-[var(--color-text-primary)]", "placeholder:text-[var(--color-text-tertiary)]", "focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent", "resize-none", i && "opacity-50 cursor-not-allowed bg-[var(--color-surface-hover)]");
	return /* @__PURE__ */ L("div", {
		className: e("flex items-end gap-2 p-3 border-t border-[var(--color-border)] bg-[var(--color-surface)]", c),
		style: l,
		children: [a ? /* @__PURE__ */ I("textarea", {
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
		}) : /* @__PURE__ */ I("input", {
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
		}), /* @__PURE__ */ I("button", {
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
function X({ name: t, done: n, className: r }) {
	return /* @__PURE__ */ L("span", {
		className: e("inline-flex items-center gap-1 text-[10.5px] font-mono px-2 py-0.5 rounded-full", n ? "bg-[var(--color-success-bg,#f0fdf4)] text-[var(--color-success,#16a34a)]" : "bg-[var(--color-info-bg,#eff6ff)] text-[var(--color-info,#1d4ed8)]", r),
		children: [t, n ? " ✓" : "…"]
	});
}
function Z({ toolCalls: t, className: n }) {
	return /* @__PURE__ */ I("div", {
		className: e("flex flex-wrap gap-1.5 py-1", n),
		children: t.map((e) => /* @__PURE__ */ I(X, {
			name: e.name,
			done: e.done
		}, e.id))
	});
}
//#endregion
//#region src/components/shared/MessageBubble.tsx
function ut({ role: t, content: n, toolCalls: r, streaming: i = !1, agentName: a, userName: o, renderMarkdown: s, className: c }) {
	let l = t === "user" ? o || "You" : a || "Assistant";
	return /* @__PURE__ */ L("div", {
		className: e("flex flex-col gap-1.5 py-3", c),
		children: [
			/* @__PURE__ */ I("div", {
				className: "text-[11px] font-semibold uppercase tracking-wide text-[var(--color-text-tertiary)]",
				children: l
			}),
			r && r.length > 0 && /* @__PURE__ */ I(Z, { toolCalls: r }),
			t === "user" ? /* @__PURE__ */ I("div", {
				className: "text-sm text-[var(--color-text-primary)] whitespace-pre-wrap",
				children: n
			}) : /* @__PURE__ */ I("div", {
				className: "text-sm text-[var(--color-text-primary)] prose-sm max-w-none",
				children: n ? s ? s(n) : /* @__PURE__ */ I("span", {
					className: "whitespace-pre-wrap",
					children: n
				}) : i ? /* @__PURE__ */ I(G, {}) : null
			})
		]
	});
}
//#endregion
//#region src/components/shared/ThinkingBlock.tsx
function dt({ content: t, streaming: n = !1, defaultOpen: r = !1, className: i }) {
	let a = n || !t ? "Thinking" : "Thought";
	return /* @__PURE__ */ L("details", {
		open: r,
		className: e("rounded-md border border-[var(--color-border)] overflow-hidden text-sm group", i),
		children: [/* @__PURE__ */ L("summary", {
			className: "flex items-center gap-2 px-3 py-2 cursor-pointer select-none bg-[var(--color-surface)] hover:bg-[var(--color-surface-hover)] text-[var(--color-text-tertiary)] list-none",
			children: [
				/* @__PURE__ */ I("svg", {
					className: "w-3.5 h-3.5 transition-transform group-open:rotate-90",
					xmlns: "http://www.w3.org/2000/svg",
					viewBox: "0 0 20 20",
					fill: "currentColor",
					"aria-hidden": "true",
					children: /* @__PURE__ */ I("path", {
						fillRule: "evenodd",
						d: "M7.21 14.77a.75.75 0 010-1.06L10.94 10 7.21 6.29a.75.75 0 011.08-1.04l4.25 4.25a.75.75 0 010 1.06l-4.25 4.25a.75.75 0 01-1.08-.04z",
						clipRule: "evenodd"
					})
				}),
				/* @__PURE__ */ I("span", {
					className: "text-[11px] font-semibold uppercase tracking-wide",
					children: a
				}),
				n && !t && /* @__PURE__ */ I(G, { size: "sm" })
			]
		}), /* @__PURE__ */ I("div", {
			className: "px-3 py-2 text-xs text-[var(--color-text-secondary)] italic border-t border-[var(--color-border)] bg-surface whitespace-pre-wrap leading-relaxed",
			children: t || /* @__PURE__ */ I(G, {})
		})]
	});
}
//#endregion
//#region src/components/shared/QuickPromptGrid.tsx
function ft({ prompts: t, onSelect: n, columns: r, title: i, className: a }) {
	let o = r ? `repeat(${r}, minmax(0, 1fr))` : "repeat(auto-fit, minmax(220px, 1fr))";
	return /* @__PURE__ */ L("div", {
		className: e("flex flex-col gap-3", a),
		children: [i && /* @__PURE__ */ I("p", {
			className: "text-xs font-semibold uppercase tracking-wide text-[var(--color-text-tertiary)] text-center",
			children: i
		}), /* @__PURE__ */ I("div", {
			style: {
				display: "grid",
				gridTemplateColumns: o,
				gap: 10
			},
			children: t.map((e, t) => /* @__PURE__ */ L("button", {
				type: "button",
				onClick: () => n(e.label),
				className: "flex flex-col gap-1 px-4 py-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] hover:bg-[var(--color-surface-hover)] hover:border-[var(--color-border-emphasis,#cbd5e1)] text-left transition-colors",
				children: [/* @__PURE__ */ I("span", {
					className: "text-sm font-medium text-[var(--color-text-primary)]",
					children: e.label
				}), e.hint && /* @__PURE__ */ I("span", {
					className: "text-xs text-[var(--color-text-tertiary)]",
					children: e.hint
				})]
			}, t))
		})]
	});
}
//#endregion
//#region src/components/shared/FollowUpChips.tsx
function pt({ suggestions: t, onSelect: n, onRefresh: r, label: i, className: a }) {
	return /* @__PURE__ */ L("div", {
		className: e("flex items-center flex-wrap gap-1.5 py-2", a),
		children: [
			i && /* @__PURE__ */ I("span", {
				className: "text-xs text-[var(--color-text-tertiary)] mr-1",
				children: i
			}),
			t.map((e, t) => /* @__PURE__ */ I("button", {
				type: "button",
				onClick: () => n(e),
				className: "inline-flex items-center px-3 py-1 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] text-xs text-[var(--color-text-secondary)] hover:bg-[var(--color-primary)] hover:text-white hover:border-[var(--color-primary)] transition-colors",
				children: e
			}, t)),
			r && /* @__PURE__ */ I("button", {
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
//#region src/components/shared/ChannelHeader.tsx
function mt({ name: t, memberCount: n, description: r, actions: i, avatarUrl: a, online: o, onMembersClick: s, className: c }) {
	return /* @__PURE__ */ L("div", {
		className: e("flex items-center justify-between gap-4 px-6 py-3", "border-b border-[var(--color-border)] bg-[var(--color-surface)]", c),
		children: [/* @__PURE__ */ L("div", {
			className: "flex items-center gap-3 min-w-0",
			children: [/* @__PURE__ */ L("div", {
				className: "relative shrink-0",
				children: [a ? /* @__PURE__ */ I("img", {
					src: a,
					alt: t,
					className: "w-9 h-9 rounded-full object-cover"
				}) : /* @__PURE__ */ I(w, {
					name: t,
					size: 36
				}), o !== void 0 && /* @__PURE__ */ I("span", {
					className: "absolute -bottom-0.5 -right-0.5",
					children: /* @__PURE__ */ I(x, {
						color: o ? "var(--color-success)" : "var(--color-text-tertiary)",
						size: "sm",
						"aria-label": o ? "Online" : "Offline"
					})
				})]
			}), /* @__PURE__ */ L("div", {
				className: "min-w-0 flex flex-col gap-0.5",
				children: [/* @__PURE__ */ L("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ I("h2", {
						className: "text-[15px] font-semibold text-[var(--color-text-primary)] leading-tight truncate",
						children: t
					}), n !== void 0 && /* @__PURE__ */ L("button", {
						type: "button",
						onClick: s,
						disabled: !s,
						className: e("text-[11px] font-medium text-[var(--color-text-tertiary)]", "bg-transparent border-none p-0 leading-none", s && "cursor-pointer hover:text-[var(--color-text-secondary)]", !s && "cursor-default"),
						children: [
							n,
							" ",
							n === 1 ? "member" : "members"
						]
					})]
				}), r && /* @__PURE__ */ I("p", {
					className: "text-[12px] text-[var(--color-text-tertiary)] truncate leading-tight",
					children: r
				})]
			})]
		}), i && /* @__PURE__ */ I("div", {
			className: "flex items-center gap-2 shrink-0",
			children: i
		})]
	});
}
//#endregion
//#region src/components/shared/UserMenu.tsx
function ht({ user: t, items: n, className: r, "data-testid": i }) {
	let [a, o] = P(!1), s = N(null), c = O(() => o(!1), []);
	return A(() => {
		if (!a) return;
		let e = (e) => {
			s.current && !s.current.contains(e.target) && c();
		};
		return document.addEventListener("mousedown", e), () => document.removeEventListener("mousedown", e);
	}, [a, c]), h(a, c), /* @__PURE__ */ L("div", {
		ref: s,
		"data-testid": i,
		className: e("relative inline-block", r),
		children: [/* @__PURE__ */ L("button", {
			type: "button",
			"aria-label": `User menu for ${t.name}`,
			"aria-expanded": a,
			"aria-haspopup": "menu",
			onClick: () => o((e) => !e),
			className: e("flex items-center gap-2 bg-transparent border-none cursor-pointer p-1 rounded-lg", "hover:bg-[var(--color-surface-hover)] transition-colors duration-100", a && "bg-[var(--color-surface-hover)]"),
			children: [
				t.avatarUrl ? /* @__PURE__ */ I("img", {
					src: t.avatarUrl,
					alt: t.name,
					className: "w-8 h-8 rounded-full object-cover"
				}) : /* @__PURE__ */ I(w, {
					name: t.name,
					size: 32
				}),
				/* @__PURE__ */ L("div", {
					className: "flex flex-col items-start text-left min-w-0 hidden sm:flex",
					children: [/* @__PURE__ */ I("span", {
						className: "text-sm font-medium text-[var(--color-text-primary)] leading-tight truncate max-w-[120px]",
						children: t.name
					}), /* @__PURE__ */ I("span", {
						className: "text-xs text-[var(--color-text-tertiary)] leading-tight truncate max-w-[120px]",
						children: t.email
					})]
				}),
				/* @__PURE__ */ I("svg", {
					width: "12",
					height: "12",
					viewBox: "0 0 12 12",
					fill: "none",
					"aria-hidden": "true",
					className: e("text-[var(--color-text-tertiary)] transition-transform duration-150", a ? "rotate-180" : "rotate-0"),
					children: /* @__PURE__ */ I("path", {
						d: "M2 4l4 4 4-4",
						stroke: "currentColor",
						strokeWidth: "1.5",
						strokeLinecap: "round",
						strokeLinejoin: "round"
					})
				})
			]
		}), a && /* @__PURE__ */ L("div", {
			role: "menu",
			"aria-label": "User menu",
			className: e("absolute right-0 top-[calc(100%+6px)] min-w-[200px] z-[200]", "bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl shadow-md overflow-hidden"),
			children: [/* @__PURE__ */ L("div", {
				className: "px-3 py-2.5 border-b border-[var(--color-border)]",
				children: [/* @__PURE__ */ I("p", {
					className: "text-sm font-semibold text-[var(--color-text-primary)] truncate",
					children: t.name
				}), /* @__PURE__ */ I("p", {
					className: "text-xs text-[var(--color-text-tertiary)] truncate",
					children: t.email
				})]
			}), /* @__PURE__ */ I("div", {
				className: "py-1",
				children: n.map((t, n) => /* @__PURE__ */ L("div", { children: [t.separator && n > 0 && /* @__PURE__ */ I("div", { className: "my-1 border-t border-[var(--color-border)]" }), /* @__PURE__ */ L("button", {
					type: "button",
					role: "menuitem",
					onClick: () => {
						t.onClick(), c();
					},
					className: e("flex items-center gap-2.5 w-full text-left px-3 py-2", "text-sm border-none cursor-pointer font-[inherit] transition-colors duration-100", t.danger ? "text-danger-fg bg-transparent hover:bg-danger-bg" : "text-[var(--color-text-primary)] bg-transparent hover:bg-[var(--color-surface-hover)]"),
					children: [t.icon && /* @__PURE__ */ I("span", {
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
function Q({ item: t, isLast: n, block: r = !1, afterActivate: i }) {
	let a = (e) => {
		t.onClick?.(e), i?.();
	}, o = e("text-sm leading-snug transition-colors duration-100", n ? "text-[var(--color-text-primary)] font-medium cursor-default" : "text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] font-normal", r && "block w-full px-3 py-1.5 rounded-sm hover:bg-[var(--color-surface-hover)]");
	return n || !t.href && !t.onClick ? /* @__PURE__ */ I("span", {
		className: o,
		"aria-current": n ? "page" : void 0,
		children: t.label
	}) : t.href ? /* @__PURE__ */ I("a", {
		href: t.href,
		onClick: a,
		className: e(o, "no-underline"),
		children: t.label
	}) : /* @__PURE__ */ I("button", {
		type: "button",
		onClick: a,
		className: e(o, "border-none bg-transparent cursor-pointer font-[inherit] p-0", r && "text-left px-3 py-1.5"),
		children: t.label
	});
}
function gt(e, t) {
	if (e.length <= t) return e;
	let n = e.slice(0, 1), r = e.slice(-(t - 2 > 0 ? t - 2 : 1));
	return [
		...n,
		null,
		...r
	];
}
function _t(e, t) {
	let n = t - 2 > 0 ? t - 2 : 1;
	return e.slice(1, e.length - n);
}
function vt({ items: e }) {
	let [t, n] = P(!1), r = N(null);
	return /* @__PURE__ */ L(F, { children: [/* @__PURE__ */ I("button", {
		ref: r,
		type: "button",
		"aria-label": "Show hidden breadcrumbs",
		"aria-expanded": t,
		"aria-haspopup": "true",
		onClick: () => n((e) => !e),
		className: "text-sm text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] border-none bg-transparent cursor-pointer px-1 py-0 rounded-sm leading-snug",
		children: "…"
	}), /* @__PURE__ */ I(E, {
		trigger: r,
		open: t,
		onClose: () => n(!1),
		"aria-label": "Hidden breadcrumbs",
		"data-testid": "breadcrumb-overflow",
		className: "min-w-[160px] py-1",
		children: /* @__PURE__ */ I("ol", {
			className: "list-none m-0 p-0",
			children: e.map((e, t) => /* @__PURE__ */ I("li", { children: /* @__PURE__ */ I(Q, {
				item: e,
				isLast: !1,
				block: !0,
				afterActivate: () => n(!1)
			}) }, `${e.label}-${t}`))
		})
	})] });
}
function yt({ items: t, separator: n = "/", maxItems: r, overflow: i = "ellipsis", minItems: a, className: o, "data-testid": s }) {
	if (t.length === 0 || a != null && t.length < a) return null;
	let c = r == null ? t : gt(t, r), l = r == null ? [] : _t(t, r);
	return /* @__PURE__ */ I("nav", {
		"aria-label": "Breadcrumb",
		"data-testid": s,
		className: e("flex items-center", o),
		children: /* @__PURE__ */ I("ol", {
			className: "flex items-center gap-1 flex-wrap list-none m-0 p-0",
			children: c.map((e, t) => {
				let r = t === c.length - 1;
				return /* @__PURE__ */ L("li", {
					className: "flex items-center gap-1",
					children: [e === null ? i === "menu" && l.length > 0 ? /* @__PURE__ */ I(vt, { items: l }) : /* @__PURE__ */ I("span", {
						className: "text-sm text-[var(--color-text-tertiary)] select-none",
						"aria-label": "More items",
						title: "Some items are hidden",
						children: "…"
					}) : /* @__PURE__ */ I(Q, {
						item: e,
						isLast: r
					}), !r && /* @__PURE__ */ I("span", {
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
var bt = {
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
}, xt = {
	bg: "var(--color-surface-hover)",
	border: "var(--color-border-field)",
	text: "var(--color-text-primary)",
	accent: "var(--color-neutral)"
};
function St({ status: e, colors: t }) {
	return /* @__PURE__ */ L("span", {
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
		children: [/* @__PURE__ */ I("span", { style: {
			width: 5,
			height: 5,
			borderRadius: "50%",
			background: t.accent
		} }), e.replace(/_/g, " ")]
	});
}
function Ct({ name: e, id: t, status: n, statusColors: r, contributorNames: i = [], contributorCount: a, activityItems: o = [], presenceDotColor: s = "var(--color-border-field)", activityLabel: c = "", cardIndex: l = 0, onClick: u, className: d, style: f, minHeight: p = 190 }) {
	let m = {
		...bt,
		...r
	}[(n ?? "unknown").toLowerCase().replace(/ /g, "_")] ?? xt, h = a === void 0 ? 0 : Math.max(0, a - i.length), g = l % 8 * 525;
	return /* @__PURE__ */ L(u ? "button" : "div", {
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
			/* @__PURE__ */ L("div", {
				style: {
					display: "flex",
					alignItems: "flex-start",
					justifyContent: "space-between",
					gap: 8
				},
				children: [/* @__PURE__ */ L("div", {
					style: {
						flex: 1,
						minWidth: 0
					},
					children: [/* @__PURE__ */ I("h3", {
						style: {
							margin: "0 0 3px",
							fontSize: 13.5,
							fontWeight: 700,
							color: "var(--color-text-primary, #111827)",
							lineHeight: 1.35
						},
						children: e
					}), t && /* @__PURE__ */ I("span", {
						style: {
							fontSize: 10,
							fontFamily: "ui-monospace, \"SFMono-Regular\", Menlo, monospace",
							color: "var(--color-text-tertiary)",
							letterSpacing: "0.02em"
						},
						children: t
					})]
				}), n && /* @__PURE__ */ I(St, {
					status: n,
					colors: m
				})]
			}),
			/* @__PURE__ */ I(T, {
				items: o,
				staggerMs: g
			}),
			/* @__PURE__ */ L("div", {
				style: {
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
					paddingTop: 8,
					borderTop: "1px solid var(--color-border-subtle, #f3f4f6)",
					gap: 8
				},
				children: [/* @__PURE__ */ L("div", {
					style: {
						display: "flex",
						alignItems: "center",
						gap: 8,
						minWidth: 0
					},
					children: [i.length > 0 ? /* @__PURE__ */ I(C, {
						names: i,
						maxVisible: 5,
						size: 24
					}) : /* @__PURE__ */ L("span", {
						style: {
							fontSize: 12,
							color: "var(--color-text-tertiary)"
						},
						children: [/* @__PURE__ */ I("strong", {
							style: { color: "var(--color-text-primary)" },
							children: a ?? 0
						}), " contributors"]
					}), i.length > 0 && h > 0 && /* @__PURE__ */ L("span", {
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
				}), c && /* @__PURE__ */ L("div", {
					style: {
						display: "flex",
						alignItems: "center",
						gap: 5,
						flexShrink: 0
					},
					children: [/* @__PURE__ */ I("span", { style: {
						width: 6,
						height: 6,
						borderRadius: "50%",
						background: s,
						flexShrink: 0
					} }), /* @__PURE__ */ I("span", {
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
function wt(e) {
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
function $({ items: e, storageKey: t, title: n, renderNavItem: r }) {
	let i = M(() => wt(e), [e]), a = i.some((e) => e.name !== null);
	return /* @__PURE__ */ I("nav", {
		className: "flex-1 overflow-y-auto py-1",
		children: a ? i.map((e) => e.name === null ? /* @__PURE__ */ I(Et, {
			items: e.items,
			renderNavItem: r
		}, "__ungrouped") : /* @__PURE__ */ I(Dt, {
			name: e.name,
			items: e.items,
			storageKey: `${t}.${n}.${e.name}`,
			renderNavItem: r
		}, e.name)) : /* @__PURE__ */ I(Et, {
			items: e,
			renderNavItem: r
		})
	});
}
function Tt({ title: e, items: t, titleAction: n, railHeader: r, railWidth: i = 220, storageKey: a = "subnav", secondaryTitle: o, secondaryItems: s, secondaryStorageKey: c, secondaryRailWidth: l = 200, renderNavItem: u, children: d }) {
	let f = s && s.length > 0;
	return /* @__PURE__ */ L("div", {
		className: "flex h-full min-h-0",
		children: [
			/* @__PURE__ */ L("aside", {
				className: "flex-none border-r border-[var(--color-border)] bg-[var(--color-surface)] flex flex-col overflow-hidden",
				style: { width: i },
				children: [
					/* @__PURE__ */ L("div", {
						className: "flex items-center justify-between px-4 py-[14px] border-b border-[var(--color-border)]",
						children: [/* @__PURE__ */ I("span", {
							className: "text-[11px] font-semibold text-[var(--color-text-tertiary)] uppercase tracking-[0.05em]",
							children: e
						}), n]
					}),
					r && /* @__PURE__ */ I("div", {
						className: "px-3 py-2 border-b border-[var(--color-border)]",
						children: r
					}),
					/* @__PURE__ */ I($, {
						items: t,
						storageKey: a,
						title: e,
						renderNavItem: u
					})
				]
			}),
			f && /* @__PURE__ */ L("aside", {
				className: "flex-none border-r border-[var(--color-border)] bg-[var(--color-surface)] flex flex-col overflow-hidden",
				style: { width: l },
				children: [/* @__PURE__ */ I("div", {
					className: "flex items-center justify-between px-4 py-[14px] border-b border-[var(--color-border)]",
					children: /* @__PURE__ */ I("span", {
						className: "text-[11px] font-semibold text-[var(--color-text-tertiary)] uppercase tracking-[0.05em]",
						children: o ?? ""
					})
				}), /* @__PURE__ */ I($, {
					items: s,
					storageKey: c ?? `${a}.secondary`,
					title: o ?? "secondary",
					renderNavItem: u
				})]
			}),
			/* @__PURE__ */ I("main", {
				className: "flex-1 min-w-0 overflow-auto p-6",
				children: d
			})
		]
	});
}
function Et({ items: e, renderNavItem: t }) {
	return /* @__PURE__ */ I(F, { children: e.map((e) => /* @__PURE__ */ I(Ot, {
		item: e,
		renderNavItem: t
	}, e.path)) });
}
function Dt({ name: e, items: t, storageKey: n, renderNavItem: r }) {
	let [i, a] = P(() => typeof window > "u" ? !1 : window.localStorage?.getItem(n) === "1");
	A(() => {
		typeof window > "u" || (i ? window.localStorage?.setItem(n, "1") : window.localStorage?.removeItem(n));
	}, [i, n]);
	let o = j(), s = N(null), c = N(null), l = () => {
		if (!i) {
			let e = typeof document > "u" ? null : document.activeElement;
			e && c.current?.contains(e) && s.current?.focus();
		}
		a((e) => !e);
	}, u = t.find((e) => e.groupScrollAfter)?.groupScrollAfter, d = u ? {
		maxHeight: u * 38,
		overflowY: "auto"
	} : void 0;
	return /* @__PURE__ */ L("section", {
		className: "border-b border-[var(--color-border)]",
		children: [/* @__PURE__ */ L("button", {
			type: "button",
			ref: s,
			onClick: l,
			className: "flex items-center gap-1.5 w-full px-3 py-2 bg-transparent border-none cursor-pointer text-[var(--color-text-tertiary)] text-[10px] font-bold tracking-[0.05em] uppercase text-left",
			"aria-expanded": !i,
			"aria-controls": o,
			children: [
				/* @__PURE__ */ I("span", {
					className: "text-[10px] w-[10px] inline-block",
					"aria-hidden": "true",
					children: i ? "▸" : "▾"
				}),
				/* @__PURE__ */ I("span", {
					className: "flex-1",
					children: e
				}),
				/* @__PURE__ */ I("span", {
					className: "text-[9px] font-medium text-[var(--color-text-tertiary)] bg-[var(--color-bg)] px-[5px] py-px rounded-[6px] border border-[var(--color-border)]",
					children: t.length
				})
			]
		}), !i && /* @__PURE__ */ I("div", {
			id: o,
			ref: c,
			style: d,
			children: t.map((e) => /* @__PURE__ */ I(Ot, {
				item: e,
				renderNavItem: r
			}, e.path))
		})]
	});
}
function Ot({ item: e, renderNavItem: t }) {
	let n = e.accent === "danger" ? "var(--color-danger)" : e.accent === "warning" ? "var(--color-warning)" : e.accent === "success" ? "var(--color-success)" : void 0, r = /* @__PURE__ */ L(F, { children: [/* @__PURE__ */ L("div", {
		className: "flex items-center justify-between gap-2",
		children: [/* @__PURE__ */ I("span", {
			className: "text-[13px] font-medium text-[var(--color-text-secondary)]",
			style: n ? { color: n } : void 0,
			children: e.label
		}), e.count !== void 0 && /* @__PURE__ */ I("span", {
			className: "text-[10px] font-medium text-[var(--color-text-tertiary)] bg-[var(--color-surface)] px-[6px] py-px rounded-[8px] border border-[var(--color-border)]",
			children: e.count
		})]
	}), e.hint && /* @__PURE__ */ I("div", {
		className: "text-[10px] text-[var(--color-text-tertiary)] mt-0.5",
		children: e.hint
	})] });
	return e.onClick ? /* @__PURE__ */ I("button", {
		type: "button",
		onClick: e.onClick,
		className: "block w-full px-[14px] py-2 border-l-[3px] border-transparent border-t-0 border-r-0 border-b-0 bg-transparent text-[var(--color-text-secondary)] text-left cursor-pointer font-[inherit]",
		children: r
	}) : t ? /* @__PURE__ */ I(F, { children: t(e, r, {
		display: "block",
		padding: "8px 14px",
		borderLeft: "3px solid transparent",
		color: "var(--color-text-secondary)",
		textDecoration: "none",
		cursor: "pointer"
	}) }) : /* @__PURE__ */ I("a", {
		href: e.path,
		className: "block px-[14px] py-2 border-l-[3px] border-transparent text-[var(--color-text-secondary)] no-underline cursor-pointer",
		children: r
	});
}
var kt = {
	borderLeft: "3px solid var(--color-primary)",
	background: "var(--color-surface-hover)",
	color: "var(--color-text-primary)"
}, At = {
	narrow: "w-44",
	default: "w-56",
	wide: "w-64"
}, jt = {
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
function Mt(e, t) {
	return e.id ?? e.to ?? `item-${t}`;
}
function Nt(e, t, n) {
	return !t || !e.to ? !1 : t === e.to ? !0 : n === "exact" || e.to === "/" ? !1 : t.startsWith(e.to.endsWith("/") ? e.to : `${e.to}/`);
}
function Pt(e) {
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
function Ft({ item: t, active: n, palette: r, renderLink: i }) {
	let a = /* @__PURE__ */ L(F, { children: [/* @__PURE__ */ L("span", {
		className: "flex items-center gap-2 min-w-0",
		children: [
			t.icon && /* @__PURE__ */ I("span", {
				className: "flex-none",
				"aria-hidden": "true",
				children: t.icon
			}),
			/* @__PURE__ */ I("span", {
				className: e("truncate text-[13px] font-medium", n ? r.labelActive : r.label),
				children: t.label
			}),
			t.badge != null && /* @__PURE__ */ I("span", {
				className: e("ml-auto flex-none rounded-full border px-1.5 text-[10px] font-medium leading-4", r.badge),
				children: t.badge
			})
		]
	}), t.hint && /* @__PURE__ */ I("span", {
		className: e("mt-0.5 block truncate text-[10px]", r.hint),
		children: t.hint
	})] }), o = e("block w-full border-l-[3px] border-transparent px-3 py-1.5 text-left no-underline", r.hover, n && r.active, t.disabled && "pointer-events-none opacity-50");
	if (t.onClick || !t.to) return /* @__PURE__ */ I("button", {
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
	return i ? /* @__PURE__ */ I(F, { children: i(t, s) }) : /* @__PURE__ */ I("a", { ...s });
}
function It({ name: t, items: n, activeHref: r, match: i, palette: a, storageKey: o, renderLink: s }) {
	let [c, l] = P(() => {
		if (!o || typeof window > "u") return !1;
		try {
			return window.localStorage?.getItem(o) === "1";
		} catch {
			return !1;
		}
	});
	A(() => {
		if (!(!o || typeof window > "u")) try {
			c ? window.localStorage?.setItem(o, "1") : window.localStorage?.removeItem(o);
		} catch {}
	}, [c, o]);
	let u = j(), d = N(null), f = N(null), p = O(() => {
		if (!c) {
			let e = typeof document > "u" ? null : document.activeElement;
			e && f.current?.contains(e) && d.current?.focus();
		}
		l((e) => !e);
	}, [c]);
	return /* @__PURE__ */ L("section", { children: [/* @__PURE__ */ L("button", {
		ref: d,
		type: "button",
		onClick: p,
		"aria-expanded": !c,
		"aria-controls": u,
		className: e("flex w-full cursor-pointer items-center gap-1.5 border-none bg-transparent px-3 py-1.5 text-left text-[10px] font-bold uppercase tracking-[0.06em]", a.group),
		children: [/* @__PURE__ */ I("span", {
			"aria-hidden": "true",
			className: "inline-block w-2.5 text-[10px]",
			children: c ? "▸" : "▾"
		}), /* @__PURE__ */ I("span", {
			className: "flex-1 truncate",
			children: t
		})]
	}), !c && /* @__PURE__ */ I("div", {
		id: u,
		ref: f,
		children: n.map((e, t) => /* @__PURE__ */ I(Ft, {
			item: e,
			active: Nt(e, r, i),
			palette: a,
			renderLink: s
		}, Mt(e, t)))
	})] });
}
function Lt({ title: t, items: n, activeHref: r, match: i = "prefix", titleAction: a, header: o, footer: s, width: c = "default", storageKey: l, renderLink: u, tone: d = "surface", "aria-label": f, className: p, "data-testid": m }) {
	let h = jt[d], g = M(() => Pt(n), [n]);
	return /* @__PURE__ */ L("nav", {
		"aria-label": f ?? (typeof t == "string" ? t : void 0) ?? "Navigation",
		"data-testid": m,
		className: e("flex flex-none flex-col overflow-hidden border-r", At[c], h.rail, p),
		children: [
			(t != null || a) && /* @__PURE__ */ L("div", {
				className: e("flex flex-none items-center justify-between gap-2 border-b px-3 py-2.5", h.divider),
				children: [/* @__PURE__ */ I("span", {
					className: e("truncate text-[11px] font-semibold uppercase tracking-[0.05em]", h.title),
					children: t
				}), a]
			}),
			o && /* @__PURE__ */ I("div", {
				className: e("flex-none border-b px-2 py-2", h.divider),
				children: o
			}),
			/* @__PURE__ */ I("div", {
				className: "min-h-0 flex-1 overflow-y-auto py-1",
				children: g.map((e, t) => e.name === null ? /* @__PURE__ */ I("div", { children: e.items.map((e, t) => /* @__PURE__ */ I(Ft, {
					item: e,
					active: Nt(e, r, i),
					palette: h,
					renderLink: u
				}, Mt(e, t))) }, "__ungrouped") : /* @__PURE__ */ I(It, {
					name: e.name,
					items: e.items,
					activeHref: r,
					match: i,
					palette: h,
					storageKey: l ? `${l}.g${t}.${e.name}` : void 0,
					renderLink: u
				}, e.name))
			}),
			s && /* @__PURE__ */ I("div", {
				className: e("flex-none border-t px-2 py-2", h.divider),
				children: s
			})
		]
	});
}
function Rt({ rails: t, activeHref: n, renderLink: r, tone: i, storageKey: a, children: o, className: s, "data-testid": c }) {
	return /* @__PURE__ */ L("div", {
		"data-testid": c,
		className: e("flex h-full min-h-0 w-full", s),
		children: [t.map(({ id: e, ...t }) => /* @__PURE__ */ I(Lt, {
			...t,
			activeHref: t.activeHref ?? n,
			renderLink: t.renderLink ?? r,
			tone: t.tone ?? i,
			storageKey: a ? `${a}.${e}` : void 0
		}, e)), /* @__PURE__ */ I("div", {
			className: "flex min-h-0 min-w-0 flex-1 flex-col",
			children: o
		})]
	});
}
//#endregion
//#region src/components/shared/Toolbar.tsx
var zt = {
	sm: "min-h-9 px-3 gap-2 text-xs",
	md: "min-h-11 px-4 gap-2.5 text-[13px]"
}, Bt = {
	surface: "bg-surface text-text-primary border-border",
	code: "bg-code-panel text-code-text border-code-border"
}, Vt = {
	surface: "bg-border",
	code: "bg-code-border"
}, Ht = "a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex=\"-1\"])";
function Ut({ children: t, end: n, tone: r = "surface", size: i = "sm", sticky: a = !1, bordered: o = !0, className: s, "aria-label": c = "Toolbar", "data-testid": l }) {
	let u = N(null), d = O((e) => {
		if (![
			"ArrowLeft",
			"ArrowRight",
			"Home",
			"End"
		].includes(e.key)) return;
		let t = u.current;
		if (!t) return;
		let n = Array.from(t.querySelectorAll(Ht));
		if (n.length === 0) return;
		let r = n.indexOf(document.activeElement), i;
		i = e.key === "Home" ? 0 : e.key === "End" ? n.length - 1 : r < 0 ? 0 : (r + (e.key === "ArrowRight" ? 1 : -1) + n.length) % n.length, n[i]?.focus(), e.preventDefault();
	}, []);
	return /* @__PURE__ */ L("div", {
		ref: u,
		role: "toolbar",
		"aria-label": c,
		"aria-orientation": "horizontal",
		"data-testid": l,
		onKeyDown: d,
		className: e("flex flex-none items-center", zt[i], Bt[r], o && "border-b", a && "sticky top-0 z-20", s),
		children: [/* @__PURE__ */ I("div", {
			className: "flex min-w-0 flex-1 items-center gap-2 overflow-x-auto",
			children: t
		}), n && /* @__PURE__ */ I("div", {
			className: "flex flex-none items-center gap-2 pl-2",
			children: n
		})]
	});
}
function Wt({ children: t, divided: n = !1, tone: r = "surface", className: i, "aria-label": a }) {
	return /* @__PURE__ */ L(F, { children: [n && /* @__PURE__ */ I(Gt, { tone: r }), /* @__PURE__ */ I("div", {
		role: a ? "group" : void 0,
		"aria-label": a,
		className: e("flex flex-none items-center gap-1.5", i),
		children: t
	})] });
}
function Gt({ tone: t = "surface", className: n }) {
	return /* @__PURE__ */ I("span", {
		role: "separator",
		"aria-orientation": "vertical",
		className: e("h-4 w-px flex-none", Vt[t], n)
	});
}
function Kt({ children: t, tone: n = "surface", className: r }) {
	return /* @__PURE__ */ I("span", {
		className: e("flex-none whitespace-nowrap", n === "code" ? "text-code-subtle" : "text-text-tertiary", r),
		children: t
	});
}
//#endregion
//#region src/components/shared/WorkArea.tsx
var qt = {
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
function Jt({ breadcrumbs: t, toolbar: n, children: r, status: i, padded: a = !0, tone: o = "surface", className: s, bodyClassName: c, "data-testid": l }) {
	let u = qt[o];
	return /* @__PURE__ */ L("div", {
		"data-testid": l,
		className: e("flex h-full min-h-0 min-w-0 flex-1 flex-col", u.column, s),
		children: [
			t && /* @__PURE__ */ I("div", {
				className: e("flex flex-none items-center overflow-x-auto border-b px-3 py-1.5", u.divider),
				children: t
			}),
			n,
			/* @__PURE__ */ I("div", {
				className: e("min-h-0 flex-1 overflow-auto", a && "p-6", c),
				children: r
			}),
			i && /* @__PURE__ */ I("div", {
				className: e("flex flex-none items-center gap-3 border-t px-3 py-1 text-[11px]", u.divider, u.status),
				children: i
			})
		]
	});
}
//#endregion
//#region src/components/shared/InlinePlaceholder.tsx
var Yt = {
	xs: "text-[11px] gap-2",
	sm: "text-[13px] gap-3"
}, Xt = {
	start: "justify-start text-left",
	center: "justify-center text-center"
}, Zt = {
	surface: "text-text-tertiary",
	code: "text-code-raised"
};
function Qt({ children: t, action: n, size: r = "xs", align: i = "start", tone: a = "surface", className: o, "data-testid": s = "inline-placeholder" }) {
	return /* @__PURE__ */ L("div", {
		"data-testid": s,
		className: e("flex items-center flex-wrap leading-normal", Yt[r] ?? Yt.xs, Xt[i] ?? Xt.start, Zt[a] ?? Zt.surface, o),
		children: [/* @__PURE__ */ I("span", { children: t }), n != null && /* @__PURE__ */ I("span", {
			className: "shrink-0",
			children: n
		})]
	});
}
//#endregion
//#region src/components/shared/DropdownMenu.tsx
function $t({ trigger: t, triggerLabel: n = "Open menu", triggerTitle: r, triggerClassName: i, align: a = "start", sections: o, className: s, "data-testid": c = "dropdown-menu" }) {
	let [l, u] = P(!1), d = N(null), f = N(null), p = O(() => u(!1), []), m = O((e) => {
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
	return /* @__PURE__ */ L(F, { children: [/* @__PURE__ */ I("button", {
		ref: d,
		type: "button",
		"aria-label": n,
		"aria-haspopup": "menu",
		"aria-expanded": l,
		title: r,
		onClick: () => u((e) => !e),
		className: e("inline-flex items-center justify-center gap-1.5 cursor-pointer", "rounded-md border border-[var(--color-border)] px-2 py-1", "text-base leading-none text-[var(--color-text-secondary)]", "bg-transparent hover:bg-[var(--color-surface-hover)] transition-colors duration-100", l && "bg-[var(--color-surface-hover)]", i),
		children: t
	}), /* @__PURE__ */ I(E, {
		trigger: d,
		open: l,
		onClose: p,
		placement: a === "end" ? "bottom-end" : "bottom-start",
		className: e("min-w-[180px] p-0 overflow-hidden rounded-lg", s),
		"data-testid": c,
		children: /* @__PURE__ */ I("div", {
			ref: f,
			role: "menu",
			"aria-label": n,
			onKeyDown: m,
			className: "py-1",
			children: o.map((t, n) => /* @__PURE__ */ L("div", {
				role: "group",
				"aria-label": t.label,
				children: [
					n > 0 && /* @__PURE__ */ I("div", {
						role: "separator",
						className: "my-1 border-t border-[var(--color-border)]"
					}),
					t.label && /* @__PURE__ */ I("div", {
						className: "px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-[var(--color-text-tertiary)]",
						children: t.label
					}),
					t.items.map((t, n) => /* @__PURE__ */ L("button", {
						type: "button",
						role: "menuitem",
						"aria-current": t.active || void 0,
						onClick: () => {
							t.onSelect(), p();
						},
						className: e("flex items-center gap-2.5 w-full text-left px-3.5 py-2", "text-sm border-none cursor-pointer font-[inherit] transition-colors duration-100", t.danger ? "text-danger-fg bg-transparent hover:bg-danger-bg" : t.active ? "font-semibold text-[var(--color-text-primary)] bg-[var(--color-surface-hover)]" : "font-normal text-[var(--color-text-primary)] bg-transparent hover:bg-[var(--color-surface-hover)]"),
						children: [t.icon && /* @__PURE__ */ I("span", {
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
export { xe as $, K as A, Ve as B, ct as C, J as D, it as E, Xe as F, Fe as G, Le as H, Je as I, De as J, Me as K, qe as L, et as M, $e as N, rt as O, Ze as P, be as Q, Ke as R, lt as S, ot as T, H as U, ze as V, Ie as W, we as X, Te as Y, Ce as Z, ft as _, Wt as a, X as b, Lt as c, kt as d, _e as et, Ct as f, pt as g, mt as h, Ut as i, de as it, G as j, tt as k, Rt as l, ht as m, Qt as n, ge as nt, Kt as o, yt as p, je as q, Jt as r, ve as rt, Gt as s, $t as t, V as tt, Tt as u, dt as v, Y as w, Z as x, ut as y, He as z };
