import { t as e } from "./cn-DhjIN-s0.js";
import "./ToastProvider-B0D0SLKU.js";
import { c as t } from "./usePromptContext-CUNhKC01.js";
import "./FilterPopover-CnQpKKUg.js";
import { c as n, d as r, f as i, g as a, h as o, l as s, m as c, s as l } from "./tones-CEbHiujQ.js";
import { t as u } from "./Card-RQCeAPNU.js";
import "./Table-CypeBEj0.js";
import "./DataTable-3jKrGxjU.js";
import { t as d } from "./IconButton-DDeXW3mZ.js";
import { N as f, b as p, f as m, l as h, z as g } from "./Icons-rzhVAphQ.js";
import "./Stack-CkiMw5K0.js";
import "./Text-DKY7kP9m.js";
import "./Banner-DISeKZt9.js";
import "./Chart-vw45ceIw.js";
import { t as _ } from "./Chip-S5_92B2V.js";
import { t as v } from "./overlayStack-BFH9XXvN.js";
import { t as y } from "./Modal-CyoyiNKN.js";
import "./ConfirmDialog-Cd8NZEXi.js";
import { t as b } from "./EmptyState-DFWbBBcY.js";
import "./SegmentedControl-X19S_gNQ.js";
import "./PermissionDeniedCard-CtpfHZh8.js";
import "./Spinner-CLcq5z8N.js";
import "./SearchInput-Dau1QZ7U.js";
import "./FormField-E8Z0ppOp.js";
import { t as x } from "./Sparkline-Ci_cmVWU.js";
import { i as S, n as C, r as w, t as T } from "./focusTrap-CmWJlptm.js";
import "./SkeletonCard-CGe8XFPB.js";
import { a as E, i as D, o as O } from "./ChannelHeader-CdLfUCax.js";
import "./FileUploadDrop-CKIokvhQ.js";
import "./Tabs-DjNsAODd.js";
import "./DockedPanelContext-pH9A5z1h.js";
import { t as k } from "./Input-DLknWXri.js";
import { t as A } from "./Textarea-Dz4doxTv.js";
import { n as j, t as M } from "./Avatar-B_FZn2OW.js";
import "./TitledFrame-D8PekrkI.js";
import "./DotMeter-BDVkadI8.js";
import "./StatusDot-Bgx2zxgC.js";
import { r as N } from "./PopoverForm-z6JPF7T4.js";
import "./RovingToolbar-CmQag9q6.js";
import "./InlineAlert-CRnIKeAF.js";
import "./CardHeader-CsPhVpCm.js";
import "./PageHeader-DOSl8dnN.js";
import "./NotificationCenter-CT1jTrxL.js";
import "./Tooltip-BI68huUY.js";
import "./RisingParticles-DqlZf8HC.js";
import "./backdropTone-BF54k8gW.js";
import "./RippleGridBackground-DTc7RHie.js";
import "./FollowUpChips-BD9scwlC.js";
import "./PresenceAvatars-D9yEP-l5.js";
import { t as ee } from "./InlinePopover-D102uoo1.js";
import { t as P } from "./ActivityFeed-BotodCTS.js";
import "./SectionLabel-bcrhNYOr.js";
import "./Badge-DDEc9FjV.js";
import { t as te } from "./InlinePlaceholder-51dbPRGn.js";
import "./FloatingPanel-6GL9dXGL.js";
import { t as F } from "./DropdownMenu-DUAebTA4.js";
import "./ChangeDiff-CzO8zCc-.js";
import { t as ne } from "./StatusPill-C-aN2Pzz.js";
import "./Select-BT7pq1sa.js";
import "./NumberInput-PlADgrip.js";
import "./Slider-CUwLSARC.js";
import "./Checkbox-DKF-CjpG.js";
import { n as re } from "./FileKindMark-XQ27Yxr8.js";
import "./ChoiceList-CaZ4rZrS.js";
import { Children as ie, Fragment as ae, createContext as oe, isValidElement as se, useCallback as I, useContext as ce, useEffect as L, useId as R, useMemo as z, useRef as B, useState as V } from "react";
import { Fragment as H, jsx as U, jsxs as W } from "react/jsx-runtime";
import { Command as G } from "cmdk";
import { createPortal as le } from "react-dom";
import ue from "react-markdown";
import de from "remark-gfm";
//#region src/components/shared/CodeBlock.tsx
var fe = /* @__PURE__ */ "import.export.from.as.const.let.var.function.return.default.if.else.switch.case.break.new.typeof.instanceof.in.of.interface.type.extends.implements.class.async.await.true.false.null.undefined.this.super.try.catch.finally.throw.for.while.do.continue.public.private.protected.readonly.static.enum".split("."), pe = [
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
], me = /* @__PURE__ */ "cd.ls.echo.cat.grep.sed.awk.find.cp.mv.rm.mkdir.rmdir.touch.chmod.chown.pwd.which.npm.yarn.pnpm.npx.git.node.curl.wget".split(".");
function he(e) {
	return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function ge(e, t) {
	let n = e.replace(/(\/\/.*?)(\n|$)/g, `<span style="color:${t.comment}">$1</span>$2`);
	n = n.replace(/(\/\*[\s\S]*?\*\/)/g, `<span style="color:${t.comment}">$1</span>`), n = n.replace(/("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)/g, `<span style="color:${t.string}">$1</span>`);
	let r = RegExp(`\\b(${fe.join("|")})\\b`, "g");
	return n = n.replace(r, `<span style="color:${t.keyword}">$1</span>`), n = n.replace(/\b(\d+(?:\.\d+)?)\b/g, `<span style="color:${t.number}">$1</span>`), n;
}
function _e(e, t) {
	let n = e.replace(/("(?:[^"\\]|\\.)*")(\s*:)/g, `<span style="color:${t.property}">$1</span>$2`);
	return n = n.replace(/("(?:[^"\\]|\\.)*")/g, `<span style="color:${t.string}">$1</span>`), n = n.replace(/\b(true|false|null)\b/g, `<span style="color:${t.keyword}">$1</span>`), n = n.replace(/\b(-?\d+(?:\.\d+)?)\b/g, `<span style="color:${t.number}">$1</span>`), n;
}
function ve(e, t) {
	let n = e.replace(/(#.*?)(\n|$)/g, `<span style="color:${t.comment}">$1</span>$2`);
	n = n.replace(/("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')/g, `<span style="color:${t.string}">$1</span>`);
	let r = RegExp(`\\b(${pe.join("|")})\\b`, "g");
	n = n.replace(r, `<span style="color:${t.keyword}">$1</span>`);
	let i = RegExp(`\\b(${me.join("|")})\\b`, "g");
	return n = n.replace(i, `<span style="color:${t.builtin}">$1</span>`), n = n.replace(/(\$\w+|\$\{[^}]+\})/g, `<span style="color:${t.variable}">$1</span>`), n;
}
var ye = {
	comment: "var(--color-neutral)",
	string: "#4ade80",
	keyword: "var(--color-state-pending)",
	number: "#fbbf24",
	property: "#7dd3fc",
	builtin: "#c4b5fd",
	variable: "#fbbf24"
}, be = {
	comment: "var(--color-code-comment)",
	string: "var(--color-code-green)",
	keyword: "var(--color-code-mauve)",
	number: "var(--color-code-peach)",
	property: "var(--color-code-blue)",
	builtin: "var(--color-code-mauve)",
	variable: "var(--color-code-yellow)"
}, xe = {
	comment: "var(--color-neutral)",
	string: "#15803d",
	keyword: "var(--color-info-fg)",
	number: "#a16207",
	property: "#0369a1",
	builtin: "var(--color-cat-ai)",
	variable: "#a16207"
};
function Se(e, t, n) {
	let r = n === "light" ? xe : n === "console" ? be : ye, i = he(e);
	switch (t) {
		case "json": return _e(i, r);
		case "bash":
		case "sh": return ve(i, r);
		case "text": return i;
		default: return ge(i, r);
	}
}
function Ce({ code: t, language: n = "tsx", theme: r = "dark", copyButton: i = !0, showLineNumbers: a = !1, className: o, style: s, "data-testid": c, ariaLabel: l }) {
	let [u, d] = V(!1), f = I(() => {
		typeof navigator > "u" || !navigator.clipboard || navigator.clipboard.writeText(t).then(() => {
			d(!0), setTimeout(() => d(!1), 1500);
		}).catch(() => {});
	}, [t]), p = r === "dark", m = r === "console", h = z(() => t.split("\n"), [t]), g = z(() => Se(t, n, r), [
		t,
		n,
		r
	]);
	return /* @__PURE__ */ W("div", {
		"data-testid": c,
		"data-language": n,
		"data-theme": r,
		className: e("relative rounded-lg border font-mono text-[13px] leading-relaxed overflow-hidden", m ? "bg-code-bg text-code-text border-code-border" : p ? "bg-surface-inverse text-text-inverse border-border-emphasis" : "bg-surface-panel text-text-primary border-border", o),
		style: s,
		"aria-label": l ?? `Code (${n})`,
		children: [i && /* @__PURE__ */ U("button", {
			type: "button",
			onClick: f,
			"aria-label": u ? "Copied" : "Copy code",
			className: e("absolute top-2 right-2 text-[11px] px-2 py-1 rounded border transition-opacity", m ? "bg-code-panel text-code-text border-code-border hover:bg-code-raised" : p ? "bg-surface-inverse text-text-inverse border-border-emphasis hover:bg-neutral" : "bg-surface text-text-primary border-border-emphasis hover:bg-surface-hover"),
			"data-copied": u ? "true" : "false",
			children: u ? "Copied" : "Copy"
		}), /* @__PURE__ */ U("pre", {
			className: "m-0 px-4 py-3 overflow-x-auto",
			children: a ? /* @__PURE__ */ W("div", {
				className: "flex",
				children: [/* @__PURE__ */ U("div", {
					className: e("select-none pr-3 text-right", m ? "text-code-comment" : p ? "text-neutral" : "text-text-tertiary"),
					"aria-hidden": "true",
					children: h.map((e, t) => /* @__PURE__ */ U("div", { children: t + 1 }, t))
				}), /* @__PURE__ */ U("code", {
					className: "flex-1 block",
					dangerouslySetInnerHTML: { __html: g }
				})]
			}) : /* @__PURE__ */ U("code", {
				className: "block",
				dangerouslySetInnerHTML: { __html: g }
			})
		})]
	});
}
//#endregion
//#region src/components/shared/CommandPalette.tsx
var we = "cui:command-palette:recents", Te = 5;
function Ee(e, t) {
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
function De(e, t) {
	if (!(!e || typeof window > "u")) try {
		window.localStorage.setItem(e, JSON.stringify(t));
	} catch {}
}
var Oe = oe(null);
function K() {
	let e = ce(Oe);
	if (!e) throw Error("useCommandPalette must be used inside a <CommandPaletteProvider>.");
	return e;
}
function ke() {
	let { open: e, close: t, toggle: n, isOpen: r, query: i } = K();
	return {
		open: e,
		close: t,
		toggle: n,
		isOpen: r,
		query: i
	};
}
function Ae(e, t) {
	let n = t.toLowerCase().split("+").map((e) => e.trim()).filter(Boolean);
	if (n.length === 0) return !1;
	let r = n[n.length - 1], i = new Set(n.slice(0, -1)), a = i.has("cmd") || i.has("meta"), o = i.has("ctrl"), s = i.has("mod"), c = i.has("shift"), l = i.has("alt");
	if (s) {
		if (!e.metaKey && !e.ctrlKey) return !1;
	} else if (a !== e.metaKey || o !== e.ctrlKey) return !1;
	return c !== e.shiftKey || l !== e.altKey ? !1 : e.key.toLowerCase() === r;
}
function je({ commands: e, getDynamicCommands: t, recentsKey: n = we, recentsLimit: r = Te, children: i }) {
	let [a, o] = V(!1), [s, c] = V(""), [l, u] = V(() => /* @__PURE__ */ new Map()), [d, f] = V(() => Ee(n, r)), p = I((e) => {
		n !== null && f((t) => {
			let i = [e, ...t.filter((t) => t !== e)].slice(0, r);
			return De(n, i), i;
		});
	}, [n, r]), m = I(() => o(!0), []), h = I(() => {
		o(!1), c("");
	}, []), g = I(() => o((e) => !e), []), _ = I((e) => {
		u((t) => {
			let n = new Map(t);
			return n.set(e.id, e), n;
		});
	}, []), v = I((e) => {
		u((t) => {
			if (!t.has(e)) return t;
			let n = new Map(t);
			return n.delete(e), n;
		});
	}, []);
	L(() => {
		let e = (e) => {
			(e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k" && (e.preventDefault(), o((e) => !e));
		};
		return window.addEventListener("keydown", e, !0), () => window.removeEventListener("keydown", e, !0);
	}, []);
	let y = z(() => {
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
	]), b = B(y);
	b.current = y, L(() => {
		let e = (e) => {
			if (!((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k")) {
				for (let t of b.current) if (t.hotkey && Ae(e, t.hotkey)) {
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
	return /* @__PURE__ */ U(Oe.Provider, {
		value: x,
		children: i
	});
}
function Me(e) {
	let { registerCommand: t, unregisterCommand: n } = K();
	L(() => (t(e), () => n(e.id)), [
		e,
		t,
		n
	]);
}
function Ne(e) {
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
function Pe({ placeholder: t = "Type a command or search…", emptyState: n, className: r } = {}) {
	let { isOpen: i, close: a, query: o, setQuery: s, mergedCommands: c, recents: l, noteSelection: u } = K(), d = z(() => {
		if (o.trim() !== "" || l.length === 0) return [];
		let e = new Map(c.map((e) => [e.id, e]));
		return l.map((t) => e.get(t)).filter((e) => !!e);
	}, [
		c,
		o,
		l
	]), f = z(() => Ne(c), [c]), p = I((e) => {
		u(e.id), a(), Promise.resolve().then(() => e.run());
	}, [a, u]);
	return /* @__PURE__ */ U(y, {
		open: i,
		onClose: a,
		ariaLabel: "Command palette",
		maxWidth: 640,
		rawChildren: !0,
		backdropTestId: "command-palette-backdrop",
		children: /* @__PURE__ */ W(G, {
			label: "Command palette",
			value: void 0,
			className: e("flex flex-col gap-0 w-full", r),
			"data-testid": "command-palette",
			children: [/* @__PURE__ */ U(G.Input, {
				value: o,
				onValueChange: s,
				placeholder: t,
				"data-autofocus": !0,
				className: e("w-full px-3 py-2.5 text-sm border-0 border-b border-border", "outline-none bg-transparent text-text-primary placeholder:text-text-tertiary"),
				"data-testid": "command-palette-input"
			}), /* @__PURE__ */ W(G.List, {
				className: "max-h-[360px] overflow-y-auto py-2",
				children: [
					/* @__PURE__ */ U(G.Empty, {
						className: "px-3 py-6 text-center text-sm text-text-tertiary",
						children: n ?? "No results."
					}),
					d.length > 0 && /* @__PURE__ */ U(G.Group, {
						heading: "Recent",
						"data-testid": "command-palette-group-recent",
						children: d.map((t) => /* @__PURE__ */ W(G.Item, {
							value: `recent-${t.id} ${t.label}`,
							keywords: t.keywords,
							onSelect: () => p(t),
							"data-testid": `command-palette-recent-${t.id}`,
							className: e("flex items-center gap-2 px-3 py-2 mx-1 rounded-md cursor-pointer text-sm", "text-text-primary aria-selected:bg-surface-hover"),
							children: [t.icon && /* @__PURE__ */ U("span", {
								className: "shrink-0 text-text-secondary",
								children: t.icon
							}), /* @__PURE__ */ U("span", {
								className: "flex-1 truncate",
								children: t.label
							})]
						}, `recent-${t.id}`))
					}),
					f.map(({ groupName: t, items: n }) => /* @__PURE__ */ U(G.Group, {
						heading: t ?? void 0,
						children: n.map((t) => /* @__PURE__ */ W(G.Item, {
							value: `${t.id} ${t.label} ${(t.keywords ?? []).join(" ")}`,
							keywords: t.keywords,
							onSelect: () => p(t),
							"data-testid": `command-palette-item-${t.id}`,
							className: e("flex items-center gap-2 px-3 py-2 mx-1 rounded-md cursor-pointer text-sm", "text-text-primary aria-selected:bg-surface-hover"),
							children: [
								t.icon && /* @__PURE__ */ U("span", {
									className: "shrink-0 text-text-secondary",
									children: t.icon
								}),
								/* @__PURE__ */ U("span", {
									className: "flex-1 truncate",
									children: t.label
								}),
								t.hint && /* @__PURE__ */ U("span", {
									className: "text-xs text-text-tertiary truncate",
									children: t.hint
								}),
								t.shortcut && t.shortcut.length > 0 && /* @__PURE__ */ U("span", {
									className: "flex items-center gap-1 shrink-0",
									children: t.shortcut.map((n, r) => /* @__PURE__ */ U("kbd", {
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
function Fe({ className: t, label: n = "Search", size: r = "sm" } = {}) {
	let { toggle: i } = K();
	return /* @__PURE__ */ W("button", {
		type: "button",
		onClick: i,
		"data-testid": "command-palette-hint",
		className: e("inline-flex items-center rounded-md border border-border", r === "md" ? "h-9 gap-2 bg-surface px-3 text-[13px] font-medium text-text-primary shadow-sm hover:bg-surface-hover" : "gap-1.5 px-2 py-1 text-xs text-text-secondary bg-surface-hover hover:bg-surface-panel", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", "cursor-pointer transition-colors", t),
		"aria-label": "Open command palette",
		"aria-keyshortcuts": "Meta+K Control+K",
		children: [/* @__PURE__ */ U("kbd", {
			className: e("font-mono", r === "md" ? "text-[12px] text-text-secondary" : "text-[11px]"),
			children: "⌘K"
		}), /* @__PURE__ */ U("span", { children: n })]
	});
}
//#endregion
//#region src/components/shared/CapabilityDeniedFallback.tsx
var Ie = "🔒";
function Le({ capabilityName: e, title: t, description: n, actionLabel: r, onAction: i, actions: a, icon: o, testId: s = "capability-denied-fallback" }) {
	let c = t ?? (e ? `${e} is unavailable` : "Feature unavailable"), l = n ?? (e ? `${e} is not enabled for this workspace. Contact your administrator to request access.` : "This feature is not enabled for your account. Contact your administrator to request access.");
	return /* @__PURE__ */ U(b, {
		icon: o === null ? void 0 : o ?? Ie,
		title: c,
		description: l,
		actionLabel: r,
		onAction: i,
		actions: a,
		testId: s
	});
}
//#endregion
//#region src/components/shared/ShortcutsHelp.tsx
function Re(e) {
	return e.rows ?? e.shortcuts ?? [];
}
function ze(e) {
	return e.action ?? e.label ?? "";
}
var Be = [
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
function Ve({ open: t, onClose: n, sections: r = Be }) {
	return /* @__PURE__ */ W(y, {
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
			/* @__PURE__ */ U("div", {
				className: "text-base font-semibold text-text-primary mb-2.5",
				children: "Keyboard shortcuts"
			}),
			/* @__PURE__ */ U("div", {
				className: "overflow-y-auto pr-1",
				children: r.map((t, n) => /* @__PURE__ */ W("div", { children: [/* @__PURE__ */ U("div", {
					className: e("text-[12px] font-bold text-text-primary uppercase tracking-[0.05em] mb-1.5", n === 0 ? "mt-0 pt-0" : "mt-4 pt-1.5 border-t border-border-subtle"),
					children: t.title
				}), /* @__PURE__ */ U("div", { children: Re(t).map((n, r) => /* @__PURE__ */ W("div", {
					className: e("flex items-baseline justify-between py-1 text-[13px] gap-4", n.planned && "opacity-60"),
					"data-planned": n.planned ? "true" : void 0,
					children: [Array.isArray(n.keys) ? /* @__PURE__ */ U("span", {
						className: "flex shrink-0 items-baseline gap-1",
						children: n.keys.map((t, r) => /* @__PURE__ */ U("span", {
							className: e("font-mono text-[12px] border rounded px-1.5 py-px whitespace-nowrap shrink-0", n.planned ? "text-text-tertiary bg-surface border-border-subtle line-through" : "text-text-primary bg-surface-hover border-border"),
							children: t
						}, `${t}-${r}`))
					}) : /* @__PURE__ */ U("span", {
						className: e("font-mono text-[12px] border rounded px-1.5 py-px whitespace-nowrap shrink-0", n.planned ? "text-text-tertiary bg-surface border-border-subtle line-through" : "text-text-primary bg-surface-hover border-border"),
						children: n.keys
					}), /* @__PURE__ */ W("span", {
						className: "text-neutral text-right flex-1",
						children: [ze(n), n.planned && /* @__PURE__ */ U("span", {
							className: "ml-1.5 text-[10px] uppercase tracking-wide text-text-tertiary",
							children: "planned"
						})]
					})]
				}, `${t.title}-${r}`)) })] }, t.title))
			}),
			/* @__PURE__ */ U("div", {
				className: "flex justify-end mt-[18px]",
				children: /* @__PURE__ */ U("button", {
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
var He = {
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
function Ue({ targetId: e = "main-content", children: t = "Skip to main content", className: n, onSkip: r }) {
	let [i, a] = V(!1);
	return /* @__PURE__ */ U("a", {
		href: `#${e}`,
		className: n,
		style: i ? He : E,
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
function We(e, t) {
	let [n, r] = V(e), i = B(e), a = B(0), o = B(null);
	return L(() => {
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
	}, [e, t]), L(() => () => {
		o.current && clearTimeout(o.current);
	}, []), n;
}
function Ge({ message: e, politeness: t = "polite", atomic: n = !0, throttleMs: r = 0, role: i = "status", "data-testid": a }) {
	let o = We(e, r);
	return /* @__PURE__ */ U(O, {
		as: "div",
		"data-testid": a,
		children: /* @__PURE__ */ U("div", {
			...i === "none" ? null : { role: i },
			"aria-live": t,
			"aria-atomic": n,
			children: o
		})
	});
}
//#endregion
//#region src/components/shared/StatCard.tsx
var Ke = {
	positive: "text-[var(--color-success)]",
	negative: "text-[var(--color-danger)]",
	neutral: "text-[var(--color-text-secondary)]"
};
function qe(e) {
	return e.tone ?? (e.direction === "up" ? "positive" : "negative");
}
function Je({ label: t, value: n, accent: r = !1, danger: i = !1, hint: a, title: o, delta: s, sparklineData: c, to: l, as: u, onClick: d, mono: f = !1, className: p, style: m, "data-testid": h }) {
	let g = e("block rounded-lg border p-3 no-underline transition-colors", !r && !i && "bg-[var(--color-surface)] border-[var(--color-border)]", r && "bg-[var(--color-primary-soft)] border-l-[3px] border-l-[var(--color-primary)] border-[var(--color-border)]", i && "bg-[var(--color-danger-bg)] border-l-[3px] border-l-[var(--color-danger)] border-[var(--color-border)]", (l || d) && "hover:bg-[var(--color-surface-hover)] cursor-pointer", p), _ = c && c.length > 0 ? c : null, v = null;
	if (s) {
		let t = qe(s), n = s.direction === "up" ? "▲" : "▼", r = s.direction === "up" ? "+" : "-", i = s.suffix ?? "%", a = Math.abs(s.value), o = s["aria-label"] ?? `${s.direction} ${a}${i}`;
		v = /* @__PURE__ */ W("div", {
			"data-testid": "stat-card-delta",
			"data-direction": s.direction,
			"data-tone": t,
			"aria-label": o,
			className: e("mt-1 text-[12px] font-medium leading-tight", Ke[t]),
			children: [
				/* @__PURE__ */ W("span", {
					"aria-hidden": "true",
					children: [n, " "]
				}),
				r,
				a,
				i
			]
		});
	}
	let y = /* @__PURE__ */ W(H, { children: [
		/* @__PURE__ */ U("div", {
			className: "text-[12px] uppercase tracking-wide text-[var(--color-text-tertiary)]",
			children: t
		}),
		/* @__PURE__ */ W("div", {
			className: "mt-1 flex items-center gap-2",
			children: [/* @__PURE__ */ U("div", {
				className: e("text-[24px] font-bold leading-tight text-[var(--color-text-primary)]", f && "font-mono"),
				children: n
			}), _ && /* @__PURE__ */ U(x, {
				data: _,
				width: 80,
				height: 20
			})]
		}),
		v,
		a != null && /* @__PURE__ */ U("div", {
			className: "mt-1 text-[11px] italic text-[var(--color-text-tertiary)]",
			children: a
		})
	] });
	return l ? u ? /* @__PURE__ */ U(u, {
		to: l,
		title: o,
		"data-testid": h,
		className: g,
		style: m,
		children: y
	}) : /* @__PURE__ */ U("a", {
		href: l,
		title: o,
		"data-testid": h,
		className: g,
		style: m,
		children: y
	}) : d ? /* @__PURE__ */ U("button", {
		type: "button",
		onClick: d,
		title: o,
		"data-testid": h,
		className: e(g, "w-full text-left"),
		style: m,
		children: y
	}) : /* @__PURE__ */ U("div", {
		"data-testid": h,
		title: o,
		className: g,
		style: m,
		children: y
	});
}
//#endregion
//#region src/components/shared/FollowBanner.tsx
function Ye({ name: t, onStop: n, autoStopOnInteract: r = !0, className: i, "data-testid": a = "follow-banner" }) {
	let o = B(null);
	return L(() => {
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
	]), t ? /* @__PURE__ */ W("div", {
		"data-testid": a,
		className: e("flex items-center justify-center gap-2 px-4 py-1.5 shrink-0", "bg-info-bg border-b border-info-border text-info-fg text-[12.5px] font-medium", i),
		children: [/* @__PURE__ */ W("span", { children: ["Following ", t] }), /* @__PURE__ */ U("button", {
			type: "button",
			onClick: n,
			className: "text-[11.5px] font-semibold px-2 py-0.5 rounded border border-info-border bg-transparent text-info-fg cursor-pointer",
			children: "Stop"
		})]
	}) : null;
}
//#endregion
//#region src/components/shared/SuggestionCard.tsx
function Xe({ reason: t, title: n, label: r, tone: i = "neutral", meta: a, context: o, onSelect: c, actionLabel: l = "Use this", disabled: u = !1, className: d, "data-testid": f }) {
	return /* @__PURE__ */ W("button", {
		type: "button",
		"data-testid": f,
		onClick: c,
		disabled: u,
		"aria-label": `${n} — ${t}`,
		className: e("group w-full text-left flex flex-col gap-1.5 rounded-lg border p-3 transition-colors", "border-border bg-surface hover:border-border-emphasis hover:bg-surface-hover", "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1", u ? "opacity-60 cursor-not-allowed" : "cursor-pointer", d),
		children: [
			/* @__PURE__ */ W("span", {
				className: "flex items-center gap-2 min-w-0",
				children: [r && /* @__PURE__ */ U("span", {
					className: e("shrink-0 text-[10px] font-semibold uppercase tracking-wide px-1.5 py-0.5 rounded", s[i]),
					children: r
				}), /* @__PURE__ */ U("span", {
					className: "text-[11px] text-text-secondary truncate",
					children: t
				})]
			}),
			/* @__PURE__ */ U("span", {
				className: "text-[13px] font-medium text-text-primary line-clamp-2",
				children: n
			}),
			(a || o) && /* @__PURE__ */ W("span", {
				className: "flex items-center gap-2 text-[11px] text-text-tertiary min-w-0",
				children: [a, o && /* @__PURE__ */ U("span", {
					className: "truncate",
					children: o
				})]
			}),
			/* @__PURE__ */ W("span", {
				"aria-hidden": "true",
				className: "text-[11px] font-semibold text-primary opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity",
				children: [l, " →"]
			})
		]
	});
}
//#endregion
//#region src/components/shared/TaskComposer.tsx
function Ze({ title: t, description: n, titlePlaceholder: r = "Title", promptPlaceholder: i = "What should it do?", suggestions: o, suggestionsTitle: s = "Suggested next", suggestionsLoading: c = !1, suggestionsEmpty: l, onSubmit: u, onChooseSuggestion: d, submitLabel: f = "Queue", hint: p, busy: m = !1, className: h, "data-testid": g }) {
	let [_, v] = V(""), [y, b] = V(""), [x, S] = V(void 0), C = R(), w = R();
	L(() => {
		x && o && !o.some((e) => e.id === x) && S(void 0);
	}, [x, o]);
	let T = _.trim().length > 0 && y.trim().length > 0 && !m;
	function E() {
		T && (u({
			title: _.trim(),
			prompt: y.trim(),
			...x ? { suggestionId: x } : {}
		}), v(""), b(""), S(void 0));
	}
	function D(e) {
		d?.(e), v(e.fillTitle ?? e.title), b(e.prompt), S(e.id);
	}
	let O = c || (o?.length ?? 0) > 0 || !!l;
	return /* @__PURE__ */ W("section", {
		"data-testid": g,
		className: e("rounded-lg border border-border bg-surface overflow-hidden", h),
		children: [
			/* @__PURE__ */ W("div", {
				className: "px-3.5 pt-3 pb-1",
				children: [/* @__PURE__ */ U("h3", {
					className: "text-xs font-semibold text-text-secondary tracking-wide select-none uppercase",
					children: t
				}), n && /* @__PURE__ */ U("p", {
					className: "mt-1 text-[12px] text-text-tertiary",
					children: n
				})]
			}),
			O && /* @__PURE__ */ W("div", {
				className: "px-3.5 pt-2 pb-1",
				children: [/* @__PURE__ */ U("div", {
					className: "text-[11px] font-semibold text-text-tertiary tracking-wide uppercase mb-2",
					children: s
				}), c ? /* @__PURE__ */ U("div", {
					className: "grid gap-2 sm:grid-cols-2 lg:grid-cols-4",
					"aria-busy": "true",
					children: [
						0,
						1,
						2,
						3
					].map((e) => /* @__PURE__ */ U("div", { className: "h-[92px] rounded-lg border border-border bg-surface-panel animate-pulse" }, e))
				}) : (o?.length ?? 0) > 0 ? /* @__PURE__ */ U("div", {
					className: "grid gap-2 sm:grid-cols-2 lg:grid-cols-4",
					children: o.map((e) => /* @__PURE__ */ U(Xe, {
						"data-testid": `suggestion-${e.id}`,
						reason: e.reason,
						title: e.title,
						...e.label ? { label: e.label } : {},
						...e.tone ? { tone: e.tone } : {},
						...e.meta ? { meta: e.meta } : {},
						...e.context ? { context: e.context } : {},
						onSelect: () => D(e),
						disabled: m
					}, e.id))
				}) : /* @__PURE__ */ U("div", {
					className: "text-[12px] text-text-tertiary",
					children: l
				})]
			}),
			/* @__PURE__ */ W("div", {
				className: "px-3.5 pt-2 pb-2 flex flex-col gap-2",
				children: [
					/* @__PURE__ */ U("label", {
						className: "sr-only",
						htmlFor: C,
						children: r
					}),
					/* @__PURE__ */ U(k, {
						id: C,
						value: _,
						onChange: (e) => v(e.target.value),
						placeholder: r,
						disabled: m
					}),
					/* @__PURE__ */ U("label", {
						className: "sr-only",
						htmlFor: w,
						children: i
					}),
					/* @__PURE__ */ U(A, {
						id: w,
						value: y,
						onChange: (e) => b(e.target.value),
						placeholder: i,
						disabled: m,
						rows: 3,
						onKeyDown: (e) => {
							e.key === "Enter" && (e.metaKey || e.ctrlKey) && (e.preventDefault(), E());
						}
					})
				]
			}),
			/* @__PURE__ */ W("div", {
				className: "px-3.5 pb-3 flex items-center gap-3",
				children: [
					p && /* @__PURE__ */ U("span", {
						className: "text-[11px] text-text-tertiary select-none",
						children: p
					}),
					/* @__PURE__ */ U("span", { className: "flex-1" }),
					/* @__PURE__ */ U(a, {
						size: "sm",
						onClick: E,
						disabled: !T,
						children: m ? "Queueing…" : f
					})
				]
			})
		]
	});
}
//#endregion
//#region src/components/shared/ExpertCard.tsx
var q = 4, Qe = 3;
function $e({ name: t, title: n, subtitle: r, imageUrl: i, matchedSkills: o, otherSkills: s = [], contexts: c = [], evidence: l = [], evidenceLabel: u = "Seen in", onAsk: d, askLabel: f = "Ask for help", footerExtra: p, onOpen: m, className: h, "data-testid": g }) {
	let v = s.filter((e) => !o.some((t) => t.name.toLowerCase() === e.toLowerCase())), y = l.slice(0, Qe), b = v.slice(0, q);
	return /* @__PURE__ */ W("div", {
		"data-testid": g,
		onClick: m,
		className: e("flex flex-col gap-2.5 rounded-lg border border-border bg-surface p-3.5 min-w-0", m && "cursor-pointer hover:border-border-emphasis hover:bg-surface-hover transition-colors", h),
		children: [
			/* @__PURE__ */ W("div", {
				className: "flex items-center gap-2.5 min-w-0",
				children: [/* @__PURE__ */ U(M, {
					name: t,
					size: 36,
					...i ? { src: i } : {}
				}), /* @__PURE__ */ W("div", {
					className: "flex flex-col min-w-0",
					children: [/* @__PURE__ */ U("span", {
						className: "text-[13.5px] font-semibold text-text-primary truncate",
						children: t
					}), (n || r) && /* @__PURE__ */ W("span", {
						className: "text-[11.5px] text-text-secondary truncate",
						children: [
							n,
							n && r ? " · " : "",
							r
						]
					})]
				})]
			}),
			o.length > 0 && /* @__PURE__ */ W("div", {
				className: "flex flex-wrap items-center gap-1",
				children: [
					o.map((e) => /* @__PURE__ */ U(_, {
						tone: "accent",
						size: "xs",
						solid: (e.strength ?? 0) >= .7,
						children: e.name
					}, e.name)),
					b.map((e) => /* @__PURE__ */ U(_, {
						tone: "neutral",
						size: "xs",
						children: e
					}, e)),
					v.length > q && /* @__PURE__ */ W("span", {
						className: "text-[10.5px] text-text-tertiary",
						children: ["+", v.length - q]
					})
				]
			}),
			c.length > 0 && /* @__PURE__ */ W("div", {
				className: "text-[11px] text-text-tertiary truncate",
				title: c.join(", "),
				children: ["Working on ", c.join(", ")]
			}),
			y.length > 0 && /* @__PURE__ */ W("div", {
				className: "flex flex-col gap-1 min-w-0",
				children: [/* @__PURE__ */ U("span", {
					className: "text-[10px] font-semibold uppercase tracking-wide text-text-tertiary select-none",
					children: u
				}), y.map((e) => /* @__PURE__ */ W("div", {
					className: "flex items-center gap-1.5 min-w-0",
					children: [e.source && /* @__PURE__ */ U(_, {
						tone: "neutral",
						size: "xs",
						mono: !0,
						children: e.source
					}), e.href ? /* @__PURE__ */ U("a", {
						href: e.href,
						onClick: (e) => e.stopPropagation(),
						className: "text-[11.5px] text-text-secondary no-underline hover:underline truncate",
						children: e.title
					}) : /* @__PURE__ */ U("span", {
						className: "text-[11.5px] text-text-secondary truncate",
						children: e.title
					})]
				}, e.id))]
			}),
			(d || p) && /* @__PURE__ */ W("div", {
				className: "mt-auto pt-1 flex items-center gap-2",
				children: [
					p,
					/* @__PURE__ */ U("span", { className: "flex-1" }),
					d && /* @__PURE__ */ U(a, {
						size: "sm",
						onClick: (e) => {
							e.stopPropagation(), d();
						},
						children: f
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
function tt({ question: t, context: n, origin: r = [], askedAt: i, status: o, answer: s, answeredBy: c, onAnswer: l, answerPlaceholder: u = "Answer the agent — it is waiting on this…", busy: d = !1, footer: f, flush: p = !1, className: m, "data-testid": h }) {
	let [g, v] = V(""), y = g.trim().length > 0 && !d;
	function b() {
		!y || !l || (l(g.trim()), v(""));
	}
	return /* @__PURE__ */ W("section", {
		"data-testid": h,
		className: e("flex flex-col gap-2.5 min-w-0", !p && "rounded-lg border bg-surface p-3.5", !p && (o === "pending" ? "border-warning/50" : "border-border"), m),
		children: [
			/* @__PURE__ */ W("div", {
				className: "flex items-center gap-2 min-w-0",
				children: [
					/* @__PURE__ */ U(_, {
						tone: et[o],
						size: "xs",
						dot: o === "pending" ? "pulse" : "static",
						uppercase: !0,
						children: o === "pending" ? "agent waiting" : o
					}),
					r.map((e) => /* @__PURE__ */ U(_, {
						tone: "neutral",
						size: "xs",
						mono: !0,
						children: e
					}, e)),
					/* @__PURE__ */ U("span", { className: "flex-1" }),
					i && /* @__PURE__ */ U("span", {
						className: "text-[10.5px] text-text-tertiary whitespace-nowrap",
						children: i
					})
				]
			}),
			/* @__PURE__ */ U("p", {
				className: "m-0 text-[13.5px] font-medium text-text-primary leading-snug",
				children: t
			}),
			n && /* @__PURE__ */ U("p", {
				className: "m-0 text-[12px] text-text-secondary leading-snug border-l-2 border-border pl-2.5",
				children: n
			}),
			o === "answered" && s && /* @__PURE__ */ W("div", {
				className: "flex flex-col gap-1",
				children: [/* @__PURE__ */ W("span", {
					className: "text-[10px] font-semibold uppercase tracking-wide text-text-tertiary select-none",
					children: ["Answer", c ? ` — ${c}` : ""]
				}), /* @__PURE__ */ U("p", {
					className: "m-0 text-[12.5px] text-text-primary leading-snug",
					children: s
				})]
			}),
			o === "expired" && /* @__PURE__ */ U("p", {
				className: "m-0 text-[11.5px] text-text-tertiary",
				children: "Expired unanswered — the agent stopped waiting."
			}),
			o === "pending" && l && /* @__PURE__ */ W("div", {
				className: "flex flex-col gap-2",
				children: [/* @__PURE__ */ U(A, {
					value: g,
					onChange: (e) => v(e.target.value),
					placeholder: u,
					rows: 2,
					disabled: d,
					onKeyDown: (e) => {
						e.key === "Enter" && (e.metaKey || e.ctrlKey) && (e.preventDefault(), b());
					}
				}), /* @__PURE__ */ W("div", {
					className: "flex items-center gap-2",
					children: [
						f,
						/* @__PURE__ */ U("span", { className: "flex-1" }),
						/* @__PURE__ */ U(a, {
							size: "sm",
							onClick: b,
							disabled: !y,
							children: d ? "Sending…" : "Send answer"
						})
					]
				})]
			}),
			(o !== "pending" || !l) && f && /* @__PURE__ */ U("div", {
				className: "flex items-center gap-2",
				children: f
			})
		]
	});
}
//#endregion
//#region src/components/shared/DiffViewer.tsx
var nt = /^@@ -(\d+)(?:,\d+)? \+(\d+)(?:,\d+)? @@/;
function J(e) {
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
}, Y = {
	add: "bg-success-bg/40",
	del: "bg-danger-bg/40",
	ctx: "",
	hunk: "bg-surface-hover"
};
function at({ a: e }) {
	return /* @__PURE__ */ W("div", {
		className: "flex items-start gap-2 px-3 py-2 border-y border-border bg-surface-panel",
		children: [/* @__PURE__ */ U(_, {
			tone: it[e.severity ?? "info"],
			size: "xs",
			uppercase: !0,
			children: e.severity ?? "note"
		}), /* @__PURE__ */ W("div", {
			className: "min-w-0",
			children: [/* @__PURE__ */ U("span", {
				className: "text-[12px] text-text-primary leading-snug",
				children: e.note
			}), e.author && /* @__PURE__ */ W("span", {
				className: "ml-2 text-[10.5px] text-text-tertiary whitespace-nowrap",
				children: ["— ", e.author]
			})]
		})]
	});
}
function ot({ file: t, annotations: n, collapsed: r, onToggle: i, maxLines: a }) {
	let { pinned: o, floating: s } = z(() => {
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
	return /* @__PURE__ */ W("div", {
		className: "border border-border rounded-lg overflow-hidden bg-surface",
		children: [/* @__PURE__ */ W("button", {
			type: "button",
			onClick: i,
			"aria-expanded": !r,
			className: "w-full flex items-center gap-2 px-3 py-2 bg-surface-panel border-0 cursor-pointer text-left hover:bg-surface-hover min-w-0",
			children: [
				/* @__PURE__ */ U("span", {
					"aria-hidden": !0,
					className: "text-[10px] text-text-tertiary",
					children: r ? "▸" : "▾"
				}),
				/* @__PURE__ */ U("span", {
					className: "text-[12px] font-mono font-semibold text-text-primary truncate",
					children: t.oldPath ? `${t.oldPath} → ${t.path}` : t.path
				}),
				/* @__PURE__ */ U(_, {
					tone: rt[t.status],
					size: "xs",
					children: t.status
				}),
				n.length > 0 && /* @__PURE__ */ W(_, {
					tone: "warning",
					size: "xs",
					mono: !0,
					children: [
						n.length,
						" note",
						n.length === 1 ? "" : "s"
					]
				}),
				/* @__PURE__ */ U("span", { className: "flex-1" }),
				/* @__PURE__ */ W("span", {
					className: "text-[11px] font-mono tabular-nums whitespace-nowrap",
					children: [
						/* @__PURE__ */ W("span", {
							className: "text-success",
							children: ["+", t.adds]
						}),
						" ",
						/* @__PURE__ */ W("span", {
							className: "text-danger",
							children: ["−", t.dels]
						})
					]
				})
			]
		}), !r && /* @__PURE__ */ W("div", {
			className: "overflow-x-auto",
			children: [s.map((e, t) => /* @__PURE__ */ U(at, { a: e }, `f${t}`)), t.binary ? /* @__PURE__ */ U("div", {
				className: "px-3 py-2 text-[12px] text-text-tertiary",
				children: "Binary file — no text diff."
			}) : /* @__PURE__ */ U("table", {
				className: "w-full border-collapse font-mono text-[11.5px] leading-[1.5]",
				children: /* @__PURE__ */ W("tbody", { children: [c.map((t, n) => t.kind === "hunk" ? /* @__PURE__ */ U("tr", {
					className: Y.hunk,
					children: /* @__PURE__ */ U("td", {
						colSpan: 3,
						className: "px-3 py-0.5 text-[10.5px] text-text-tertiary select-none",
						children: t.text
					})
				}, n) : /* @__PURE__ */ W(H, { children: [/* @__PURE__ */ W("tr", {
					className: Y[t.kind],
					children: [
						/* @__PURE__ */ U("td", {
							className: "w-[3.2em] px-1.5 text-right text-[10px] text-text-tertiary select-none align-top tabular-nums border-r border-border/60",
							children: t.oldNo ?? ""
						}),
						/* @__PURE__ */ U("td", {
							className: "w-[3.2em] px-1.5 text-right text-[10px] text-text-tertiary select-none align-top tabular-nums border-r border-border/60",
							children: t.newNo ?? ""
						}),
						/* @__PURE__ */ W("td", {
							className: e("px-2 whitespace-pre align-top", t.kind === "add" && "text-success", t.kind === "del" && "text-danger", t.kind === "ctx" && "text-text-secondary"),
							children: [/* @__PURE__ */ U("span", {
								className: "select-none inline-block w-[1ch] mr-1 text-text-tertiary",
								children: t.kind === "add" ? "+" : t.kind === "del" ? "-" : " "
							}), t.text || " "]
						})
					]
				}, n), t.newNo != null && o.get(t.newNo)?.map((e, t) => /* @__PURE__ */ U("tr", { children: /* @__PURE__ */ U("td", {
					colSpan: 3,
					className: "p-0",
					children: /* @__PURE__ */ U(at, { a: e })
				}) }, `${n}-a${t}`))] })), l && /* @__PURE__ */ U("tr", { children: /* @__PURE__ */ W("td", {
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
function st({ diff: t, annotations: n = [], defaultCollapsed: r = !1, maxLinesPerFile: i = 800, truncatedNote: a, className: o, "data-testid": s }) {
	let c = z(() => J(t), [t]), [l, u] = V(() => r ? new Set(c.map((e) => e.path)) : /* @__PURE__ */ new Set()), d = B(/* @__PURE__ */ new Map()), f = z(() => {
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
	if (c.length === 0) return /* @__PURE__ */ U("div", {
		"data-testid": s,
		className: e("text-[12px] text-text-tertiary", o),
		children: "No parseable diff."
	});
	let h = c.reduce((e, t) => e + t.adds, 0), g = c.reduce((e, t) => e + t.dels, 0);
	return /* @__PURE__ */ W("div", {
		"data-testid": s,
		className: e("flex flex-col gap-2 min-w-0", o),
		children: [
			/* @__PURE__ */ W("div", {
				className: "flex items-center gap-1.5 flex-wrap",
				children: [/* @__PURE__ */ W("span", {
					className: "text-[11px] text-text-secondary font-medium whitespace-nowrap",
					children: [
						c.length,
						" file",
						c.length === 1 ? "" : "s",
						" ",
						/* @__PURE__ */ W("span", {
							className: "font-mono tabular-nums",
							children: [
								/* @__PURE__ */ W("span", {
									className: "text-success",
									children: ["+", h]
								}),
								" ",
								/* @__PURE__ */ W("span", {
									className: "text-danger",
									children: ["−", g]
								})
							]
						})
					]
				}), c.map((t) => /* @__PURE__ */ U("button", {
					type: "button",
					onClick: () => m(t.path),
					title: t.path,
					className: e("px-1.5 py-0.5 rounded border border-border bg-surface text-[10.5px] font-mono cursor-pointer", "text-text-secondary hover:border-border-emphasis hover:text-text-primary truncate max-w-[220px]", (f.get(t.path)?.length ?? 0) > 0 && "border-warning/60"),
					children: t.path.split("/").pop()
				}, t.path))]
			}),
			a && /* @__PURE__ */ U("div", {
				className: "text-[11px] text-warning",
				children: a
			}),
			c.map((e) => /* @__PURE__ */ U("div", {
				ref: (t) => {
					d.current.set(e.path, t);
				},
				children: /* @__PURE__ */ U(ot, {
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
var ct = {
	1: "sm:grid-cols-1",
	2: "sm:grid-cols-2",
	3: "sm:grid-cols-3",
	4: "sm:grid-cols-4"
}, lt = {
	1: "md:grid-cols-1",
	2: "md:grid-cols-2",
	3: "md:grid-cols-3",
	4: "md:grid-cols-4"
}, ut = {
	1: "lg:grid-cols-1",
	2: "lg:grid-cols-2",
	3: "lg:grid-cols-3",
	4: "lg:grid-cols-4"
};
function dt({ children: t, columns: n = 4, mdColumns: r, dense: i = !1, className: a, style: o, "data-testid": s = "kpi-grid" }) {
	return /* @__PURE__ */ U("div", {
		"data-testid": s,
		className: e("grid grid-cols-1", r ? void 0 : ct[n], r && lt[r], r && ut[n], i ? "gap-2" : "gap-4", a),
		style: o,
		children: t
	});
}
//#endregion
//#region src/components/shared/ProgressBar.tsx
var ft = {
	sm: "h-1.5",
	md: "h-2"
};
function pt({ value: t, max: n = 100, color: r, size: a = "md", completeTone: s, label: l, valueLabel: u, showRatio: d = !0, labelClassName: f, className: p, style: m, "data-testid": h, "aria-label": g }) {
	let _ = n > 0 ? n : 100, v = Math.max(0, Math.min(t, _)), y = Math.min(100, v / _ * 100), b = s !== void 0 && y >= 100 ? c(s) : null, x = b ? o(b) : r ?? "var(--color-primary)";
	return /* @__PURE__ */ W("div", {
		"data-testid": h,
		className: e("w-full", p),
		style: m,
		children: [l != null && /* @__PURE__ */ W("div", {
			className: e("flex items-center justify-between mb-1 text-[12px] text-[var(--color-text-secondary)]", f),
			children: [/* @__PURE__ */ U("span", { children: l }), /* @__PURE__ */ U("span", {
				className: e("tabular-nums", b ? i[b] : "text-[var(--color-text-tertiary)]"),
				children: u ?? (d ? `${v}/${_}` : `${Math.round(y)}%`)
			})]
		}), /* @__PURE__ */ U("div", {
			role: "progressbar",
			"aria-valuenow": v,
			"aria-valuemin": 0,
			"aria-valuemax": _,
			"aria-label": g,
			className: e("w-full rounded-full overflow-hidden bg-[var(--color-surface-hover)]", ft[a]),
			children: /* @__PURE__ */ U("div", {
				className: "h-full rounded-full transition-all duration-300",
				style: {
					width: `${y}%`,
					background: x
				}
			})
		})]
	});
}
//#endregion
//#region src/components/shared/Prose.tsx
var mt = "max-w-none text-text-primary [&>*:first-child]:mt-0 [&>*:last-child]:mb-0 [&_h1]:font-semibold [&_h2]:font-semibold [&_h3]:font-semibold [&_h4]:font-semibold [&_h1]:pb-2 [&_h1]:border-b [&_h1]:border-border [&_h4]:pb-1 [&_h4]:border-b [&_h4]:border-border [&_p]:my-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:my-2 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:my-2 [&_li]:mb-1 [&_li]:last:mb-0 [&_blockquote]:border-l-2 [&_blockquote]:border-border [&_blockquote]:pl-3 [&_blockquote]:my-2 [&_blockquote]:italic [&_blockquote]:text-text-secondary [&_code]:font-mono [&_code]:text-[0.85em] [&_code]:rounded [&_code]:px-1 [&_code]:py-0.5 [&_code]:bg-surface-inset [&_pre]:font-mono [&_pre]:text-xs [&_pre]:rounded-md [&_pre]:border [&_pre]:border-border [&_pre]:bg-surface-inset [&_pre]:p-3 [&_pre]:overflow-x-auto [&_pre]:my-2 [&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_pre_code]:rounded-none [&_pre_code]:text-[inherit] [&_a]:underline-offset-2 [&_a:hover]:underline", ht = {
	sm: "text-[13px] leading-snug [&_h1]:text-sm [&_h2]:text-sm [&_h3]:text-[13px] [&_h4]:text-[13px] [&_h1]:mt-3 [&_h2]:mt-3 [&_h3]:mt-2.5 [&_h4]:mt-2.5 [&_h1]:mb-1.5 [&_h2]:mb-1.5 [&_h3]:mb-1 [&_h4]:mb-1",
	md: "text-sm leading-relaxed [&_h1]:text-xl [&_h2]:text-lg [&_h3]:text-base [&_h4]:text-sm [&_h1]:mt-6 [&_h2]:mt-5 [&_h3]:mt-4 [&_h4]:mt-4 [&_h1]:mb-3 [&_h2]:mb-2 [&_h3]:mb-1.5 [&_h4]:mb-1.5"
}, gt = "[&_h1]:text-text-primary [&_h2]:text-text-primary [&_h3]:text-text-primary [&_h4]:text-text-primary [&_a]:text-primary", _t = {
	neutral: "[&_h1]:text-neutral-fg [&_h2]:text-neutral-fg [&_h3]:text-neutral-fg [&_h4]:text-neutral-fg [&_a]:text-neutral-fg",
	success: "[&_h1]:text-success-fg [&_h2]:text-success-fg [&_h3]:text-success-fg [&_h4]:text-success-fg [&_a]:text-success-fg",
	warning: "[&_h1]:text-warning-fg [&_h2]:text-warning-fg [&_h3]:text-warning-fg [&_h4]:text-warning-fg [&_a]:text-warning-fg",
	danger: "[&_h1]:text-danger-fg [&_h2]:text-danger-fg [&_h3]:text-danger-fg [&_h4]:text-danger-fg [&_a]:text-danger-fg",
	info: "[&_h1]:text-info-fg [&_h2]:text-info-fg [&_h3]:text-info-fg [&_h4]:text-info-fg [&_a]:text-info-fg",
	caution: "[&_h1]:text-caution-fg [&_h2]:text-caution-fg [&_h3]:text-caution-fg [&_h4]:text-caution-fg [&_a]:text-caution-fg",
	accent: "[&_h1]:text-accent-fg [&_h2]:text-accent-fg [&_h3]:text-accent-fg [&_h4]:text-accent-fg [&_a]:text-accent-fg"
};
function vt({ children: t, size: n = "md", tone: r, className: i, "data-testid": a }) {
	let o = r === void 0 ? void 0 : c(r);
	return /* @__PURE__ */ U("div", {
		"data-testid": a,
		className: e(mt, ht[n], o ? _t[o] : gt, i),
		children: t
	});
}
//#endregion
//#region src/components/shared/UserChip.tsx
function yt({ name: t, label: n, avatarSize: r = 20, avatarColor: i, presence: a, onClick: o, className: s, style: c, title: l, labelClassName: u, "data-testid": d = "user-chip" }) {
	return /* @__PURE__ */ W(o ? "button" : "span", {
		type: o ? "button" : void 0,
		onClick: o,
		title: l ?? t,
		"data-testid": d,
		className: e("inline-flex items-center gap-1.5 rounded-full px-1.5 py-0.5 text-[12px] text-text-primary", o && "hover:bg-surface-hover cursor-pointer transition-colors", !o && "cursor-default", s),
		style: c,
		children: [
			/* @__PURE__ */ U(M, {
				name: t,
				size: r,
				color: i
			}),
			/* @__PURE__ */ U("span", {
				className: e("font-medium leading-none", u),
				children: n ?? t
			}),
			a && /* @__PURE__ */ U(N, {
				state: a,
				size: "xs"
			})
		]
	});
}
//#endregion
//#region src/components/shared/EntityCell.tsx
function bt({ label: t, id: n, href: r, mono: i = !1, className: a, labelClassName: o }) {
	let s = /* @__PURE__ */ U("span", {
		className: "truncate",
		children: t
	});
	return /* @__PURE__ */ W("div", {
		className: e("flex flex-col min-w-0", a),
		children: [/* @__PURE__ */ U("div", {
			className: e("font-medium text-[var(--color-text-primary)] truncate text-sm", o),
			children: r ? /* @__PURE__ */ U("a", {
				href: r,
				className: "hover:text-[var(--color-primary)] hover:underline",
				children: s
			}) : s
		}), n && /* @__PURE__ */ U("div", {
			className: e("text-[10px] font-mono text-[var(--color-text-tertiary)] truncate mt-0.5", i && "tracking-tight"),
			children: n
		})]
	});
}
//#endregion
//#region src/components/shared/Drawer.tsx
function xt({ open: t, onClose: n, title: r, subtitle: i, width: a, children: o, footer: s, docked: c = !1, actions: l, className: u, bodyClassName: d, "aria-label": f, "data-testid": p, closeLabel: m = "Close", modal: h = !0, trapFocus: g = !0, backdrop: _ = !0 }) {
	let y = B(null), b = B(null), x = R(), S = h && !c, E = v(t && !c), D = a ?? (c ? void 0 : 460);
	if (L(() => {
		if (!t || c) return;
		let e = (e) => {
			if (e.key === "Escape") {
				S && E() && n();
				return;
			}
			g && E() && w(e, y.current);
		};
		return window.addEventListener("keydown", e), () => window.removeEventListener("keydown", e);
	}, [
		t,
		n,
		E,
		c,
		S,
		g
	]), L(() => {
		if (!(!t || c || !g)) return b.current = typeof document < "u" ? document.activeElement : null, T(y.current), () => {
			C(b.current), b.current = null;
		};
	}, [
		t,
		c,
		g
	]), !t) return null;
	let O = !!(r || i || l), k = /* @__PURE__ */ W("div", {
		className: "flex items-start justify-between p-5 border-b border-[var(--color-border)] flex-shrink-0",
		children: [/* @__PURE__ */ W("div", {
			className: "min-w-0",
			children: [r && /* @__PURE__ */ U("h2", {
				id: x,
				className: "text-base font-semibold text-[var(--color-text-primary)]",
				children: r
			}), i && /* @__PURE__ */ U("p", {
				className: "text-sm text-[var(--color-text-secondary)] mt-0.5",
				children: i
			})]
		}), /* @__PURE__ */ W("div", {
			className: "ml-4 flex flex-shrink-0 items-center gap-1",
			children: [l, /* @__PURE__ */ U("button", {
				type: "button",
				onClick: n,
				className: "flex-shrink-0 p-1 rounded hover:bg-[var(--color-surface-hover)] text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] transition-colors",
				"aria-label": m,
				children: /* @__PURE__ */ U("svg", {
					width: "16",
					height: "16",
					viewBox: "0 0 16 16",
					fill: "none",
					children: /* @__PURE__ */ U("path", {
						d: "M4 4l8 8M12 4l-8 8",
						stroke: "currentColor",
						strokeWidth: "1.5",
						strokeLinecap: "round"
					})
				})
			})]
		})]
	}), A = /* @__PURE__ */ U("div", {
		className: e("flex-1 overflow-y-auto p-5", d),
		children: o
	}), j = s ? /* @__PURE__ */ U("div", {
		className: "flex-shrink-0 border-t border-[var(--color-border)] p-4 bg-[var(--color-surface-inset,#f8fafc)]",
		children: s
	}) : null;
	return c ? /* @__PURE__ */ W("aside", {
		ref: y,
		role: "complementary",
		"aria-labelledby": r ? x : void 0,
		"aria-label": r ? void 0 : f,
		"data-testid": p,
		"data-docked": "true",
		className: e("relative flex h-full min-h-0 flex-shrink-0 flex-col overflow-hidden", "bg-surface border-l border-[var(--color-border)]", D === void 0 && "w-full", u),
		...D === void 0 ? {} : { style: { width: D } },
		children: [
			O && k,
			A,
			j
		]
	}) : le(/* @__PURE__ */ W("div", {
		className: e("fixed inset-0 z-[9000]", !_ && "pointer-events-none"),
		"data-testid": p,
		children: [_ && /* @__PURE__ */ U("div", {
			className: "absolute inset-0 bg-black/30 backdrop-blur-[1px]",
			onClick: n,
			"aria-hidden": "true"
		}), /* @__PURE__ */ W("aside", {
			ref: y,
			role: S ? "dialog" : "complementary",
			"aria-modal": S ? "true" : void 0,
			"aria-labelledby": r ? x : void 0,
			"aria-label": r ? void 0 : f,
			className: e("absolute right-0 top-0 h-full bg-surface shadow-xl flex flex-col", "transition-transform duration-200", !_ && "pointer-events-auto", t ? "translate-x-0" : "translate-x-full", u),
			style: { width: D },
			children: [
				O && k,
				A,
				j
			]
		})]
	}), document.body);
}
//#endregion
//#region src/components/shared/CollapsibleSection.tsx
function St(e, t) {
	if (!e || typeof window > "u") return t;
	try {
		let n = window.localStorage.getItem(e);
		return n === null ? t : n === "true";
	} catch {
		return t;
	}
}
function Ct({ title: t, defaultOpen: n = !1, badge: r, actions: i, children: a, className: o, storageKey: s, density: c = "default", "data-testid": l }) {
	let [u, d] = V(() => St(s, n)), f = c === "compact", p = R(), m = B(null), h = B(null);
	return L(() => {
		if (s && !(typeof window > "u")) try {
			window.localStorage.setItem(s, String(u));
		} catch {}
	}, [u, s]), /* @__PURE__ */ W("div", {
		className: e("border border-[var(--color-border)] rounded-lg overflow-hidden", o),
		children: [/* @__PURE__ */ W("div", {
			className: "flex items-stretch bg-[var(--color-surface)]",
			children: [/* @__PURE__ */ W("button", {
				type: "button",
				ref: m,
				"data-testid": l,
				className: e("flex-1 min-w-0 flex items-center justify-between bg-transparent hover:bg-[var(--color-surface-hover)] transition-colors text-left", f ? "px-2.5 py-1.5" : "px-4 py-3"),
				onClick: () => {
					if (u) {
						let e = typeof document > "u" ? null : document.activeElement;
						e && h.current?.contains(e) && m.current?.focus();
					}
					d((e) => !e);
				},
				"aria-expanded": u,
				"aria-controls": p,
				children: [/* @__PURE__ */ U("span", {
					className: e("font-semibold text-[var(--color-text-primary)]", f ? "text-xs" : "text-sm"),
					children: t
				}), /* @__PURE__ */ W("div", {
					className: "flex items-center gap-2",
					children: [r, /* @__PURE__ */ U("svg", {
						className: e("text-[var(--color-text-tertiary)] transition-transform", f ? "w-3 h-3" : "w-4 h-4", u && "rotate-180"),
						viewBox: "0 0 16 16",
						fill: "none",
						"aria-hidden": "true",
						children: /* @__PURE__ */ U("path", {
							d: "M4 6l4 4 4-4",
							stroke: "currentColor",
							strokeWidth: "1.5",
							strokeLinecap: "round",
							strokeLinejoin: "round"
						})
					})]
				})]
			}), i && /* @__PURE__ */ U("div", {
				className: "flex items-center gap-2 pr-4 shrink-0",
				children: i
			})]
		}), u && /* @__PURE__ */ U("div", {
			id: p,
			ref: h,
			className: "border-t border-[var(--color-border)] bg-surface",
			children: a
		})]
	});
}
//#endregion
//#region src/components/shared/ThumbnailCard.tsx
function wt({ title: t, description: n, category: r, categoryTone: i = "neutral", thumbnail: a, icon: o = "🧩", thumbnailHeight: s = 160, href: c, onClick: l, badge: u, meta: d, className: f, style: p, "data-testid": m = "thumbnail-card" }) {
	let h = e("group block w-full text-left bg-[var(--color-surface,#fff)]", "rounded-xl border border-[var(--color-border)] overflow-hidden", "transition-[box-shadow,transform] duration-150", (c || l) && "cursor-pointer hover:shadow-[0_8px_25px_rgba(0,0,0,0.08)] hover:-translate-y-0.5", f), g = /* @__PURE__ */ W(H, { children: [/* @__PURE__ */ W("div", {
		"data-testid": `${m}-thumb`,
		className: e("relative flex items-center justify-center", "bg-gradient-to-br from-[var(--color-primary-bg,#eef2ff)] to-[var(--color-surface,#ffffff)]", "border-b border-[var(--color-border)]"),
		style: { height: s },
		children: [a ? /* @__PURE__ */ U("img", {
			src: a,
			alt: "",
			className: "w-full h-full object-cover"
		}) : /* @__PURE__ */ U("span", {
			className: "text-5xl opacity-50",
			"aria-hidden": !0,
			children: o
		}), u && /* @__PURE__ */ U("span", {
			"data-testid": `${m}-badge`,
			className: "absolute top-2 right-2",
			children: u
		})]
	}), /* @__PURE__ */ W("div", {
		className: "px-4 py-3",
		children: [
			/* @__PURE__ */ W("div", {
				className: "flex items-center gap-2 mb-1.5",
				children: [r && /* @__PURE__ */ U(_, {
					tone: i,
					size: "xs",
					"data-testid": `${m}-category`,
					children: r
				}), d && /* @__PURE__ */ U("span", {
					className: "ml-auto",
					children: d
				})]
			}),
			/* @__PURE__ */ U("div", {
				className: "text-[14px] font-semibold text-[var(--color-text-primary)] leading-snug",
				children: t
			}),
			n && /* @__PURE__ */ U("div", {
				className: "mt-1 text-[12px] text-[var(--color-text-secondary)] leading-snug",
				children: n
			})
		]
	})] });
	return c ? /* @__PURE__ */ U("a", {
		href: c,
		onClick: l,
		"data-testid": m,
		className: e(h, "no-underline text-inherit"),
		style: p,
		children: g
	}) : l ? /* @__PURE__ */ U("button", {
		type: "button",
		onClick: l,
		"data-testid": m,
		className: e(h, "font-inherit"),
		style: p,
		children: g
	}) : /* @__PURE__ */ U("div", {
		"data-testid": m,
		className: h,
		style: p,
		children: g
	});
}
//#endregion
//#region src/components/shared/CatalogGrid.tsx
var Tt = {
	1: "sm:grid-cols-1",
	2: "sm:grid-cols-2",
	3: "sm:grid-cols-2 lg:grid-cols-3",
	4: "sm:grid-cols-2 lg:grid-cols-4",
	5: "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
};
function Et({ children: t, columns: n = 3, dense: r = !1, className: i, style: a, "data-testid": o = "catalog-grid" }) {
	return /* @__PURE__ */ U("div", {
		"data-testid": o,
		"data-columns": n,
		className: e("grid grid-cols-1", Tt[n], r ? "gap-3" : "gap-5", i),
		style: a,
		children: t
	});
}
//#endregion
//#region src/components/shared/StackDiagram.tsx
function Dt({ orientation: t, variant: n }) {
	if (n === "none") return null;
	let r = t === "vertical", i = n === "arrow" ? r ? "↓" : "→" : r ? "│" : "─";
	return /* @__PURE__ */ U("div", {
		"data-testid": "stack-diagram-connector",
		"aria-hidden": !0,
		className: e("flex items-center justify-center text-[var(--color-text-tertiary)]", r ? "h-5 text-base" : "w-5 text-base"),
		children: i
	});
}
function Ot({ layers: t, orientation: r = "vertical", connector: a = "arrow", className: o, style: s, "data-testid": u = "stack-diagram" }) {
	let d = r === "vertical";
	return /* @__PURE__ */ U("div", {
		"data-testid": u,
		"data-orientation": r,
		"data-connector": a,
		className: e("flex", d ? "flex-col items-stretch" : "flex-row items-stretch flex-wrap", o),
		style: s,
		children: t.map((o, s) => {
			let u = c(o.tone ?? "neutral");
			return /* @__PURE__ */ W("div", {
				className: e("flex", "flex-col"),
				children: [/* @__PURE__ */ W("div", {
					"data-testid": "stack-diagram-layer",
					"data-tone": u,
					className: e("rounded-md border px-3 py-2", l[u], n[u], !d && "min-w-[140px]"),
					children: [/* @__PURE__ */ W("div", {
						className: "flex items-center gap-2",
						children: [
							o.icon != null && /* @__PURE__ */ U("span", {
								className: "shrink-0 text-[14px] leading-none",
								"aria-hidden": !0,
								children: o.icon
							}),
							/* @__PURE__ */ U("span", {
								className: e("text-[12px] font-semibold", i[u]),
								children: o.label
							}),
							o.meta != null && /* @__PURE__ */ U("span", {
								className: "ml-auto text-[10px] text-[var(--color-text-tertiary)] shrink-0",
								children: o.meta
							})
						]
					}), o.description != null && /* @__PURE__ */ U("div", {
						className: "mt-0.5 text-[11px] leading-snug text-[var(--color-text-secondary)]",
						children: o.description
					})]
				}), s < t.length - 1 && /* @__PURE__ */ U(Dt, {
					orientation: r,
					variant: a
				})]
			}, o.id);
		})
	});
}
var kt = Ot;
//#endregion
//#region src/components/shared/ChatComposer.tsx
function At({ value: t, onChange: n, onSubmit: r, disabled: i = !1, multiline: a = !1, placeholder: o, submitLabel: s = "→", className: c, style: l, autoFocus: u, maxRows: d = 4, "aria-label": f = "Message", "aria-labelledby": p, submitAriaLabel: m = "Send" }) {
	let h = !i && t.trim().length > 0, g = typeof s == "string" && /\p{L}|\p{N}/u.test(s) ? void 0 : m, _ = p ? void 0 : f, v = () => {
		h && r();
	}, y = (e) => {
		if (e.key === "Enter") {
			if (a && e.shiftKey) return;
			e.preventDefault(), v();
		}
	}, b = e("flex-1 px-3 py-2 text-sm rounded-lg border border-[var(--color-border-field,#d1d5db)] bg-surface text-[var(--color-text-primary)]", "placeholder:text-[var(--color-text-tertiary)]", "focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent", "resize-none", i && "opacity-50 cursor-not-allowed bg-[var(--color-surface-hover)]");
	return /* @__PURE__ */ W("div", {
		className: e("flex items-end gap-2 p-3 border-t border-[var(--color-border)] bg-[var(--color-surface)]", c),
		style: l,
		children: [a ? /* @__PURE__ */ U("textarea", {
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
		}) : /* @__PURE__ */ U("input", {
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
		}), /* @__PURE__ */ U("button", {
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
function jt({ name: t, done: n, title: r, className: i }) {
	return /* @__PURE__ */ W("span", {
		title: r,
		className: e("inline-flex items-center gap-1 text-[10.5px] font-mono px-2 py-0.5 rounded-full", n ? "bg-[var(--color-success-bg,#f0fdf4)] text-[var(--color-success,#16a34a)]" : "bg-[var(--color-info-bg,#eff6ff)] text-[var(--color-info,#1d4ed8)]", i),
		children: [t, n ? " ✓" : "…"]
	});
}
function Mt({ toolCalls: t, className: n }) {
	return /* @__PURE__ */ U("div", {
		className: e("flex flex-wrap gap-1.5 py-1", n),
		children: t.map((e) => /* @__PURE__ */ U(jt, {
			name: e.name,
			done: e.done
		}, e.id))
	});
}
//#endregion
//#region src/components/shared/MessageBubble.tsx
function Nt({ role: t, content: n, toolCalls: r, streaming: i = !1, agentName: a, userName: o, renderMarkdown: s, className: c }) {
	let l = t === "user" ? o || "You" : a || "Assistant";
	return /* @__PURE__ */ W("div", {
		className: e("flex flex-col gap-1.5 py-3", c),
		children: [
			/* @__PURE__ */ U("div", {
				className: "text-[11px] font-semibold uppercase tracking-wide text-[var(--color-text-tertiary)]",
				children: l
			}),
			r && r.length > 0 && /* @__PURE__ */ U(Mt, { toolCalls: r }),
			t === "user" ? /* @__PURE__ */ U("div", {
				className: "text-sm text-[var(--color-text-primary)] whitespace-pre-wrap",
				children: n
			}) : /* @__PURE__ */ U("div", {
				className: "text-sm text-[var(--color-text-primary)] prose-sm max-w-none",
				children: n ? s ? s(n) : /* @__PURE__ */ U("span", {
					className: "whitespace-pre-wrap",
					children: n
				}) : i ? /* @__PURE__ */ U(D, {}) : null
			})
		]
	});
}
//#endregion
//#region src/components/shared/ThinkingBlock.tsx
function Pt({ content: t, streaming: n = !1, defaultOpen: r = !1, className: i }) {
	let a = n || !t ? "Thinking" : "Thought";
	return /* @__PURE__ */ W("details", {
		open: r,
		className: e("rounded-md border border-[var(--color-border)] overflow-hidden text-sm group", i),
		children: [/* @__PURE__ */ W("summary", {
			className: "flex items-center gap-2 px-3 py-2 cursor-pointer select-none bg-[var(--color-surface)] hover:bg-[var(--color-surface-hover)] text-[var(--color-text-tertiary)] list-none",
			children: [
				/* @__PURE__ */ U("svg", {
					className: "w-3.5 h-3.5 transition-transform group-open:rotate-90",
					xmlns: "http://www.w3.org/2000/svg",
					viewBox: "0 0 20 20",
					fill: "currentColor",
					"aria-hidden": "true",
					children: /* @__PURE__ */ U("path", {
						fillRule: "evenodd",
						d: "M7.21 14.77a.75.75 0 010-1.06L10.94 10 7.21 6.29a.75.75 0 011.08-1.04l4.25 4.25a.75.75 0 010 1.06l-4.25 4.25a.75.75 0 01-1.08-.04z",
						clipRule: "evenodd"
					})
				}),
				/* @__PURE__ */ U("span", {
					className: "text-[11px] font-semibold uppercase tracking-wide",
					children: a
				}),
				n && !t && /* @__PURE__ */ U(D, { size: "sm" })
			]
		}), /* @__PURE__ */ U("div", {
			className: "px-3 py-2 text-xs text-[var(--color-text-secondary)] italic border-t border-[var(--color-border)] bg-surface whitespace-pre-wrap leading-relaxed",
			children: t || /* @__PURE__ */ U(D, {})
		})]
	});
}
//#endregion
//#region src/components/shared/QuickPromptGrid.tsx
function Ft({ prompts: t, onSelect: n, columns: r, title: i, className: a }) {
	let o = r ? `repeat(${r}, minmax(0, 1fr))` : "repeat(auto-fit, minmax(220px, 1fr))";
	return /* @__PURE__ */ W("div", {
		className: e("flex flex-col gap-3", a),
		children: [i && /* @__PURE__ */ U("p", {
			className: "text-xs font-semibold uppercase tracking-wide text-[var(--color-text-tertiary)] text-center",
			children: i
		}), /* @__PURE__ */ U("div", {
			style: {
				display: "grid",
				gridTemplateColumns: o,
				gap: 10
			},
			children: t.map((e, t) => /* @__PURE__ */ W("button", {
				type: "button",
				onClick: () => n(e.label),
				className: "flex flex-col gap-1 px-4 py-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] hover:bg-[var(--color-surface-hover)] hover:border-[var(--color-border-emphasis,#cbd5e1)] text-left transition-colors",
				children: [/* @__PURE__ */ U("span", {
					className: "text-sm font-medium text-[var(--color-text-primary)]",
					children: e.label
				}), e.hint && /* @__PURE__ */ U("span", {
					className: "text-xs text-[var(--color-text-tertiary)]",
					children: e.hint
				})]
			}, t))
		})]
	});
}
//#endregion
//#region src/components/shared/UserMenu.tsx
function It({ user: t, items: n, className: r, "data-testid": i }) {
	let [a, o] = V(!1), s = B(null), c = I(() => o(!1), []);
	return L(() => {
		if (!a) return;
		let e = (e) => {
			s.current && !s.current.contains(e.target) && c();
		};
		return document.addEventListener("mousedown", e), () => document.removeEventListener("mousedown", e);
	}, [a, c]), S(a, c), /* @__PURE__ */ W("div", {
		ref: s,
		"data-testid": i,
		className: e("relative inline-block", r),
		children: [/* @__PURE__ */ W("button", {
			type: "button",
			"aria-label": `User menu for ${t.name}`,
			"aria-expanded": a,
			"aria-haspopup": "menu",
			onClick: () => o((e) => !e),
			className: e("flex items-center gap-2 bg-transparent border-none cursor-pointer p-1 rounded-lg", "hover:bg-[var(--color-surface-hover)] transition-colors duration-100", a && "bg-[var(--color-surface-hover)]"),
			children: [
				t.avatarUrl ? /* @__PURE__ */ U("img", {
					src: t.avatarUrl,
					alt: t.name,
					className: "w-8 h-8 rounded-full object-cover"
				}) : /* @__PURE__ */ U(M, {
					name: t.name,
					size: 32
				}),
				/* @__PURE__ */ W("div", {
					className: "flex flex-col items-start text-left min-w-0 hidden sm:flex",
					children: [/* @__PURE__ */ U("span", {
						className: "text-sm font-medium text-[var(--color-text-primary)] leading-tight truncate max-w-[120px]",
						children: t.name
					}), /* @__PURE__ */ U("span", {
						className: "text-xs text-[var(--color-text-tertiary)] leading-tight truncate max-w-[120px]",
						children: t.email
					})]
				}),
				/* @__PURE__ */ U("svg", {
					width: "12",
					height: "12",
					viewBox: "0 0 12 12",
					fill: "none",
					"aria-hidden": "true",
					className: e("text-[var(--color-text-tertiary)] transition-transform duration-150", a ? "rotate-180" : "rotate-0"),
					children: /* @__PURE__ */ U("path", {
						d: "M2 4l4 4 4-4",
						stroke: "currentColor",
						strokeWidth: "1.5",
						strokeLinecap: "round",
						strokeLinejoin: "round"
					})
				})
			]
		}), a && /* @__PURE__ */ W("div", {
			role: "menu",
			"aria-label": "User menu",
			className: e("absolute right-0 top-[calc(100%+6px)] min-w-[200px] z-[200]", "bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl shadow-md overflow-hidden"),
			children: [/* @__PURE__ */ W("div", {
				className: "px-3 py-2.5 border-b border-[var(--color-border)]",
				children: [/* @__PURE__ */ U("p", {
					className: "text-sm font-semibold text-[var(--color-text-primary)] truncate",
					children: t.name
				}), /* @__PURE__ */ U("p", {
					className: "text-xs text-[var(--color-text-tertiary)] truncate",
					children: t.email
				})]
			}), /* @__PURE__ */ U("div", {
				className: "py-1",
				children: n.map((t, n) => /* @__PURE__ */ W("div", { children: [t.separator && n > 0 && /* @__PURE__ */ U("div", { className: "my-1 border-t border-[var(--color-border)]" }), /* @__PURE__ */ W("button", {
					type: "button",
					role: "menuitem",
					onClick: () => {
						t.onClick(), c();
					},
					className: e("flex items-center gap-2.5 w-full text-left px-3 py-2", "text-sm border-none cursor-pointer font-[inherit] transition-colors duration-100", t.danger ? "text-danger-fg bg-transparent hover:bg-danger-bg" : "text-[var(--color-text-primary)] bg-transparent hover:bg-[var(--color-surface-hover)]"),
					children: [t.icon && /* @__PURE__ */ U("span", {
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
//#region src/components/shared/ProjectCard.tsx
var Lt = {
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
}, Rt = {
	bg: "var(--color-surface-hover)",
	border: "var(--color-border-field)",
	text: "var(--color-text-primary)",
	accent: "var(--color-neutral)"
};
function zt({ status: e, colors: t }) {
	return /* @__PURE__ */ W("span", {
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
		children: [/* @__PURE__ */ U("span", { style: {
			width: 5,
			height: 5,
			borderRadius: "50%",
			background: t.accent
		} }), e.replace(/_/g, " ")]
	});
}
function Bt({ name: e, id: t, status: n, statusColors: r, contributorNames: i = [], contributorCount: a, activityItems: o = [], presenceDotColor: s = "var(--color-border-field)", activityLabel: c = "", cardIndex: l = 0, onClick: u, className: d, style: f, minHeight: p = 190 }) {
	let m = {
		...Lt,
		...r
	}[(n ?? "unknown").toLowerCase().replace(/ /g, "_")] ?? Rt, h = a === void 0 ? 0 : Math.max(0, a - i.length), g = l % 8 * 525;
	return /* @__PURE__ */ W(u ? "button" : "div", {
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
			/* @__PURE__ */ W("div", {
				style: {
					display: "flex",
					alignItems: "flex-start",
					justifyContent: "space-between",
					gap: 8
				},
				children: [/* @__PURE__ */ W("div", {
					style: {
						flex: 1,
						minWidth: 0
					},
					children: [/* @__PURE__ */ U("h3", {
						style: {
							margin: "0 0 3px",
							fontSize: 13.5,
							fontWeight: 700,
							color: "var(--color-text-primary, #111827)",
							lineHeight: 1.35
						},
						children: e
					}), t && /* @__PURE__ */ U("span", {
						style: {
							fontSize: 10,
							fontFamily: "ui-monospace, \"SFMono-Regular\", Menlo, monospace",
							color: "var(--color-text-tertiary)",
							letterSpacing: "0.02em"
						},
						children: t
					})]
				}), n && /* @__PURE__ */ U(zt, {
					status: n,
					colors: m
				})]
			}),
			/* @__PURE__ */ U(P, {
				items: o,
				staggerMs: g
			}),
			/* @__PURE__ */ W("div", {
				style: {
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
					paddingTop: 8,
					borderTop: "1px solid var(--color-border-subtle, #f3f4f6)",
					gap: 8
				},
				children: [/* @__PURE__ */ W("div", {
					style: {
						display: "flex",
						alignItems: "center",
						gap: 8,
						minWidth: 0
					},
					children: [i.length > 0 ? /* @__PURE__ */ U(j, {
						names: i,
						maxVisible: 5,
						size: 24
					}) : /* @__PURE__ */ W("span", {
						style: {
							fontSize: 12,
							color: "var(--color-text-tertiary)"
						},
						children: [/* @__PURE__ */ U("strong", {
							style: { color: "var(--color-text-primary)" },
							children: a ?? 0
						}), " contributors"]
					}), i.length > 0 && h > 0 && /* @__PURE__ */ W("span", {
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
				}), c && /* @__PURE__ */ W("div", {
					style: {
						display: "flex",
						alignItems: "center",
						gap: 5,
						flexShrink: 0
					},
					children: [/* @__PURE__ */ U("span", { style: {
						width: 6,
						height: 6,
						borderRadius: "50%",
						background: s,
						flexShrink: 0
					} }), /* @__PURE__ */ U("span", {
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
function Vt(e) {
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
function Ht({ items: e, storageKey: t, title: n, renderNavItem: r, railLabel: i }) {
	let a = z(() => Vt(e), [e]), o = a.some((e) => e.name !== null);
	return /* @__PURE__ */ U("nav", {
		"aria-label": i,
		className: "flex-1 overflow-y-auto py-1",
		children: o ? a.map((e) => e.name === null ? /* @__PURE__ */ U(Wt, {
			items: e.items,
			renderNavItem: r
		}, "__ungrouped") : /* @__PURE__ */ U(Gt, {
			name: e.name,
			items: e.items,
			storageKey: `${t}.${n}.${e.name}`,
			renderNavItem: r
		}, e.name)) : /* @__PURE__ */ U(Wt, {
			items: e,
			renderNavItem: r
		})
	});
}
function Ut({ title: e, items: t, titleAction: n, railHeader: r, railWidth: i = 220, storageKey: a = "subnav", secondaryTitle: o, secondaryItems: s, secondaryStorageKey: c, secondaryRailWidth: l = 200, renderNavItem: u, railLabel: d, contentAs: f = "main", contentLabel: p, children: m }) {
	let h = f, g = s && s.length > 0;
	return /* @__PURE__ */ W("div", {
		className: "flex h-full min-h-0",
		children: [
			/* @__PURE__ */ W("aside", {
				className: "flex-none border-r border-[var(--color-border)] bg-[var(--color-surface)] flex flex-col overflow-hidden",
				style: { width: i },
				children: [
					/* @__PURE__ */ W("div", {
						className: "flex items-center justify-between px-4 py-[14px] border-b border-[var(--color-border)]",
						children: [/* @__PURE__ */ U("span", {
							className: "text-[11px] font-semibold text-[var(--color-text-tertiary)] uppercase tracking-[0.05em]",
							children: e
						}), n]
					}),
					r && /* @__PURE__ */ U("div", {
						className: "px-3 py-2 border-b border-[var(--color-border)]",
						children: r
					}),
					/* @__PURE__ */ U(Ht, {
						items: t,
						storageKey: a,
						title: e,
						renderNavItem: u,
						railLabel: d
					})
				]
			}),
			g && /* @__PURE__ */ W("aside", {
				className: "flex-none border-r border-[var(--color-border)] bg-[var(--color-surface)] flex flex-col overflow-hidden",
				style: { width: l },
				children: [/* @__PURE__ */ U("div", {
					className: "flex items-center justify-between px-4 py-[14px] border-b border-[var(--color-border)]",
					children: /* @__PURE__ */ U("span", {
						className: "text-[11px] font-semibold text-[var(--color-text-tertiary)] uppercase tracking-[0.05em]",
						children: o ?? ""
					})
				}), /* @__PURE__ */ U(Ht, {
					items: s,
					storageKey: c ?? `${a}.secondary`,
					title: o ?? "secondary",
					renderNavItem: u
				})]
			}),
			/* @__PURE__ */ U(h, {
				"aria-label": p,
				className: "flex-1 min-w-0 overflow-auto p-6",
				children: m
			})
		]
	});
}
function Wt({ items: e, renderNavItem: t }) {
	return /* @__PURE__ */ U(H, { children: e.map((e) => /* @__PURE__ */ U(Kt, {
		item: e,
		renderNavItem: t
	}, e.path)) });
}
function Gt({ name: e, items: t, storageKey: n, renderNavItem: r }) {
	let [i, a] = V(() => typeof window > "u" ? !1 : window.localStorage?.getItem(n) === "1");
	L(() => {
		typeof window > "u" || (i ? window.localStorage?.setItem(n, "1") : window.localStorage?.removeItem(n));
	}, [i, n]);
	let o = R(), s = B(null), c = B(null), l = () => {
		if (!i) {
			let e = typeof document > "u" ? null : document.activeElement;
			e && c.current?.contains(e) && s.current?.focus();
		}
		a((e) => !e);
	}, u = t.find((e) => e.groupScrollAfter)?.groupScrollAfter, d = u ? {
		maxHeight: u * 38,
		overflowY: "auto"
	} : void 0;
	return /* @__PURE__ */ W("section", {
		className: "border-b border-[var(--color-border)]",
		children: [/* @__PURE__ */ W("button", {
			type: "button",
			ref: s,
			onClick: l,
			className: "flex items-center gap-1.5 w-full px-3 py-2 bg-transparent border-none cursor-pointer text-[var(--color-text-tertiary)] text-[10px] font-bold tracking-[0.05em] uppercase text-left",
			"aria-expanded": !i,
			"aria-controls": o,
			children: [
				/* @__PURE__ */ U("span", {
					className: "text-[10px] w-[10px] inline-block",
					"aria-hidden": "true",
					children: i ? "▸" : "▾"
				}),
				/* @__PURE__ */ U("span", {
					className: "flex-1",
					children: e
				}),
				/* @__PURE__ */ U("span", {
					className: "text-[9px] font-medium text-[var(--color-text-tertiary)] bg-[var(--color-bg)] px-[5px] py-px rounded-[6px] border border-[var(--color-border)]",
					children: t.length
				})
			]
		}), !i && /* @__PURE__ */ U("div", {
			id: o,
			ref: c,
			style: d,
			children: t.map((e) => /* @__PURE__ */ U(Kt, {
				item: e,
				renderNavItem: r
			}, e.path))
		})]
	});
}
function Kt({ item: e, renderNavItem: t }) {
	let n = e.accent === "danger" ? "var(--color-danger)" : e.accent === "warning" ? "var(--color-warning)" : e.accent === "success" ? "var(--color-success)" : void 0, r = /* @__PURE__ */ W(H, { children: [/* @__PURE__ */ W("div", {
		className: "flex items-center justify-between gap-2",
		children: [/* @__PURE__ */ U("span", {
			className: "text-[13px] font-medium text-[var(--color-text-secondary)]",
			style: n ? { color: n } : void 0,
			children: e.label
		}), e.count !== void 0 && /* @__PURE__ */ U("span", {
			className: "text-[10px] font-medium text-[var(--color-text-tertiary)] bg-[var(--color-surface)] px-[6px] py-px rounded-[8px] border border-[var(--color-border)]",
			children: e.count
		})]
	}), e.hint && /* @__PURE__ */ U("div", {
		className: "text-[10px] text-[var(--color-text-tertiary)] mt-0.5",
		children: e.hint
	})] });
	return e.onClick ? /* @__PURE__ */ U("button", {
		type: "button",
		onClick: e.onClick,
		className: "block w-full px-[14px] py-2 border-l-[3px] border-transparent border-t-0 border-r-0 border-b-0 bg-transparent text-[var(--color-text-secondary)] text-left cursor-pointer font-[inherit]",
		children: r
	}) : t ? /* @__PURE__ */ U(H, { children: t(e, r, {
		display: "block",
		padding: "8px 14px",
		borderLeft: "3px solid transparent",
		color: "var(--color-text-secondary)",
		textDecoration: "none",
		cursor: "pointer"
	}) }) : /* @__PURE__ */ U("a", {
		href: e.path,
		className: "block px-[14px] py-2 border-l-[3px] border-transparent text-[var(--color-text-secondary)] no-underline cursor-pointer",
		children: r
	});
}
var qt = {
	borderLeft: "3px solid var(--color-primary)",
	background: "var(--color-surface-hover)",
	color: "var(--color-text-primary)"
}, Jt = "block px-[14px] py-2 border-l-[3px] border-transparent text-text-secondary no-underline cursor-pointer", Yt = "block px-[14px] py-2 border-l-[3px] border-primary bg-surface-hover text-text-primary no-underline cursor-pointer", Xt = {
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
function tn({ item: t, active: n, palette: r, renderLink: i, size: a = "sm" }) {
	let o = /* @__PURE__ */ W(H, { children: [/* @__PURE__ */ W("span", {
		className: "flex items-center gap-2 min-w-0",
		children: [
			t.icon && /* @__PURE__ */ U("span", {
				className: "flex-none",
				"aria-hidden": "true",
				children: t.icon
			}),
			/* @__PURE__ */ U("span", {
				className: e("truncate", a === "md" ? "text-[15px] font-normal" : "text-[13px] font-medium", n || a === "md" ? r.labelActive : r.label),
				children: t.label
			}),
			t.badge != null && /* @__PURE__ */ U("span", {
				className: e("ml-auto flex-none rounded-full border px-1.5 text-[10px] font-medium leading-4", r.badge),
				children: t.badge
			})
		]
	}), t.hint && /* @__PURE__ */ U("span", {
		className: e("mt-0.5 block truncate text-[10px]", r.hint),
		children: t.hint
	})] }), s = e("block w-full border-l-[3px] border-transparent text-left no-underline", a === "md" ? "ml-[18px] w-auto mr-2 rounded-r py-[7px] pl-[15px] pr-2" : "px-3 py-1.5", r.hover, n && r.active, t.disabled && "pointer-events-none opacity-50");
	if (t.onClick || !t.to) return /* @__PURE__ */ U("button", {
		type: "button",
		onClick: t.onClick,
		disabled: t.disabled,
		"aria-current": n ? "page" : void 0,
		className: e(s, "cursor-pointer bg-transparent font-[inherit]"),
		children: o
	});
	let c = {
		href: t.to,
		className: s,
		"aria-current": n ? "page" : void 0,
		"aria-disabled": t.disabled || void 0,
		children: o
	};
	return i ? /* @__PURE__ */ U(H, { children: i(t, c) }) : /* @__PURE__ */ U("a", { ...c });
}
function nn({ name: t, items: n, activeHref: r, match: i, palette: a, storageKey: o, renderLink: s, size: c = "sm", divided: l = !1 }) {
	let [u, d] = V(() => {
		if (!o || typeof window > "u") return !1;
		try {
			return window.localStorage?.getItem(o) === "1";
		} catch {
			return !1;
		}
	});
	L(() => {
		if (!(!o || typeof window > "u")) try {
			u ? window.localStorage?.setItem(o, "1") : window.localStorage?.removeItem(o);
		} catch {}
	}, [u, o]);
	let f = R(), p = B(null), m = B(null), h = I(() => {
		if (!u) {
			let e = typeof document > "u" ? null : document.activeElement;
			e && m.current?.contains(e) && p.current?.focus();
		}
		d((e) => !e);
	}, [u]);
	return /* @__PURE__ */ W("section", {
		className: e(c === "md" && "pb-1"),
		children: [
			l && /* @__PURE__ */ U("div", {
				"aria-hidden": "true",
				className: e("mx-5 mb-2 mt-1 border-t", a.divider)
			}),
			/* @__PURE__ */ W("button", {
				ref: p,
				type: "button",
				onClick: h,
				"aria-expanded": !u,
				"aria-controls": f,
				className: e("flex w-full cursor-pointer items-center gap-1.5 border-none bg-transparent text-left font-bold uppercase tracking-[0.06em]", c === "md" ? "px-5 py-1.5 text-[11px]" : "px-3 py-1.5 text-[10px]", a.group),
				children: [/* @__PURE__ */ U("span", {
					"aria-hidden": "true",
					className: "inline-block w-2.5 text-[10px]",
					children: u ? "▸" : "▾"
				}), /* @__PURE__ */ U("span", {
					className: "flex-1 truncate",
					children: t
				})]
			}),
			!u && /* @__PURE__ */ U("div", {
				id: f,
				ref: m,
				children: n.map((e, t) => /* @__PURE__ */ U(tn, {
					item: e,
					active: $t(e, r, i),
					palette: a,
					renderLink: s,
					size: c
				}, Qt(e, t)))
			})
		]
	});
}
function rn({ title: t, items: n, activeHref: r, match: i = "prefix", titleAction: a, header: o, footer: s, width: c = "default", storageKey: l, renderLink: u, tone: d = "surface", size: f = "sm", "aria-label": p, className: m, "data-testid": h }) {
	let g = Zt[d], _ = z(() => en(n), [n]);
	return /* @__PURE__ */ W("nav", {
		"aria-label": p ?? (typeof t == "string" ? t : void 0) ?? "Navigation",
		"data-testid": h,
		className: e("flex flex-none flex-col overflow-hidden border-r", Xt[c], g.rail, m),
		children: [
			(t != null || a) && /* @__PURE__ */ W("div", {
				className: e("flex flex-none items-center justify-between gap-2", f === "md" ? "h-12 pl-5 pr-3" : "border-b px-3 py-2.5", g.divider),
				children: [/* @__PURE__ */ U("span", {
					className: e("truncate text-[11px] font-semibold uppercase tracking-[0.05em]", g.title),
					children: t
				}), a]
			}),
			o && /* @__PURE__ */ U("div", {
				className: e("flex-none border-b px-2 py-2", g.divider),
				children: o
			}),
			/* @__PURE__ */ U("div", {
				className: "min-h-0 flex-1 overflow-y-auto py-1",
				children: _.map((e, t) => e.name === null ? /* @__PURE__ */ U("div", { children: e.items.map((e, t) => /* @__PURE__ */ U(tn, {
					item: e,
					active: $t(e, r, i),
					palette: g,
					renderLink: u,
					size: f
				}, Qt(e, t))) }, "__ungrouped") : /* @__PURE__ */ U(nn, {
					name: e.name,
					items: e.items,
					activeHref: r,
					match: i,
					palette: g,
					storageKey: l ? `${l}.g${t}.${e.name}` : void 0,
					renderLink: u,
					size: f,
					divided: f === "md" && t > 0
				}, e.name))
			}),
			s && /* @__PURE__ */ U("div", {
				className: e("flex-none border-t px-2 py-2", g.divider),
				children: s
			})
		]
	});
}
function an({ rails: t, activeHref: n, renderLink: r, tone: i, storageKey: a, children: o, className: s, "data-testid": c }) {
	return /* @__PURE__ */ W("div", {
		"data-testid": c,
		className: e("flex h-full min-h-0 w-full", s),
		children: [t.map(({ id: e, ...t }) => /* @__PURE__ */ U(rn, {
			...t,
			activeHref: t.activeHref ?? n,
			renderLink: t.renderLink ?? r,
			tone: t.tone ?? i,
			storageKey: a ? `${a}.${e}` : void 0
		}, e)), /* @__PURE__ */ U("div", {
			className: "flex min-h-0 min-w-0 flex-1 flex-col",
			children: o
		})]
	});
}
//#endregion
//#region src/components/shared/WorkArea.tsx
var on = {
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
function sn({ breadcrumbs: t, toolbar: n, children: r, status: i, padded: a = !0, tone: o = "surface", className: s, bodyClassName: c, "data-testid": l }) {
	let u = on[o];
	return /* @__PURE__ */ W("div", {
		"data-testid": l,
		className: e("flex h-full min-h-0 min-w-0 flex-1 flex-col", u.column, s),
		children: [
			t && /* @__PURE__ */ U("div", {
				className: e("flex flex-none items-center overflow-x-auto border-b px-3 py-1.5", u.divider),
				children: t
			}),
			n,
			/* @__PURE__ */ U("div", {
				className: e("min-h-0 flex-1 overflow-auto", a && "p-6", c),
				children: r
			}),
			i && /* @__PURE__ */ U("div", {
				className: e("flex flex-none items-center gap-3 border-t px-3 py-1 text-[11px]", u.divider, u.status),
				children: i
			})
		]
	});
}
//#endregion
//#region src/components/shared/InlineMenu.tsx
var cn = {
	"bottom-start": "top-full left-0 mt-1",
	"bottom-end": "top-full right-0 mt-1",
	"top-start": "bottom-full left-0 mb-1",
	"top-end": "bottom-full right-0 mb-1"
};
function ln({ open: t, onClose: n, placement: r = "bottom-start", trigger: i, role: a = "group", className: o, "data-testid": s = "inline-menu", "aria-label": c, "aria-labelledby": l, children: u }) {
	let d = B(null), f = v(t);
	return L(() => {
		if (!t) return;
		let e = (e) => {
			e.key === "Escape" && f() && (e.stopPropagation(), n());
		};
		return window.addEventListener("keydown", e), () => window.removeEventListener("keydown", e);
	}, [
		t,
		n,
		f
	]), L(() => {
		if (!t) return;
		let e = (e) => {
			let t = e.target;
			t && (d.current?.contains(t) || i?.current?.contains(t) || n());
		};
		return document.addEventListener("mousedown", e), () => document.removeEventListener("mousedown", e);
	}, [
		t,
		n,
		i
	]), t ? /* @__PURE__ */ U("div", {
		ref: d,
		role: a,
		"aria-label": c,
		"aria-labelledby": l,
		"data-testid": s,
		"data-placement": r,
		className: e("absolute z-20 min-w-[160px] rounded-lg border border-border bg-surface", "shadow-lg p-1 text-sm text-text-primary", cn[r], o),
		children: u
	}) : null;
}
//#endregion
//#region src/components/shared/Link.tsx
var un = "text-primary no-underline hover:underline";
function dn(e) {
	let t = new Set((e ?? "").split(/\s+/).filter(Boolean));
	return t.add("noopener"), t.add("noreferrer"), [...t].join(" ");
}
function fn({ href: t, children: n, external: r = !1, unstyled: i = !1, target: a, rel: o, className: s, ...c }) {
	let l = r ? "_blank" : a, u = l === "_blank";
	return /* @__PURE__ */ U("a", {
		...c,
		href: t,
		target: l,
		rel: u ? dn(o) : o,
		className: e(!i && un, s),
		children: n
	});
}
//#endregion
//#region src/components/pipelines/nodes/NodeCard.tsx
var pn = {
	success: "border-success",
	error: "border-danger",
	warning: "border-warning",
	info: "border-info",
	neutral: "border-border-emphasis",
	pending: "border-accent"
};
function mn({ icon: t, label: n, subtitle: r, status: i = "neutral", statusLabel: a, body: o, selected: s = !1, accentClass: c, className: l, onClick: d }) {
	let f = a ?? i.charAt(0).toUpperCase() + i.slice(1), p = pn[i];
	return /* @__PURE__ */ W(u, {
		className: e("relative w-40 transition-shadow duration-200 border-2", d && "cursor-pointer", p, s && "shadow-[0_0_0_3px_rgba(99,102,241,0.25)]", !s && "shadow-sm", !s && d && "hover:shadow-md", l),
		onClick: d,
		children: [
			c && /* @__PURE__ */ U("div", { className: e("absolute left-0 top-0 bottom-0 w-1 rounded-l-lg", c) }),
			/* @__PURE__ */ W("div", {
				className: e("flex items-center justify-between gap-2 px-2.5 py-2 border-b border-border-subtle", c && "pl-3.5"),
				children: [/* @__PURE__ */ W("div", {
					className: "flex items-center gap-1.5 min-w-0",
					children: [/* @__PURE__ */ U("span", {
						className: "text-sm leading-none shrink-0",
						"aria-hidden": "true",
						children: t
					}), /* @__PURE__ */ U("span", {
						className: "text-xs font-semibold text-text-primary truncate",
						children: n
					})]
				}), /* @__PURE__ */ U(ne, {
					state: i,
					label: f,
					size: "sm"
				})]
			}),
			r && /* @__PURE__ */ U("div", {
				className: "px-2.5 pt-1.5 pb-0 text-[11px] text-neutral truncate",
				children: r
			}),
			o && /* @__PURE__ */ U("div", {
				className: "px-2.5 pb-2 pt-1 text-xs text-text-secondary",
				children: o
			})
		]
	});
}
//#endregion
//#region src/components/shared/BoardColumn.tsx
function hn({ label: t, count: n, children: r, emptyLabel: i = "Nothing here", action: a, className: o, "data-testid": s }) {
	let c = r == null || r === !1 || Array.isArray(r) && r.length === 0;
	return /* @__PURE__ */ W("section", {
		className: e("flex flex-col gap-1.5 min-w-0", o),
		"data-testid": s,
		children: [/* @__PURE__ */ W("header", {
			className: "flex items-baseline justify-between gap-2 text-[11px] uppercase tracking-[0.04em] text-text-tertiary",
			children: [/* @__PURE__ */ U("span", {
				className: "truncate",
				children: t
			}), a ?? (n === void 0 ? null : /* @__PURE__ */ U("span", {
				className: "tabular-nums",
				children: n
			}))]
		}), c ? /* @__PURE__ */ U(te, { children: i }) : /* @__PURE__ */ U("div", {
			className: "flex flex-col gap-1.5",
			children: r
		})]
	});
}
//#endregion
//#region src/components/shared/FormRow.tsx
var gn = {
	sm: "gap-2",
	md: "gap-3",
	lg: "gap-4"
}, _n = {
	sm: "flex-col sm:flex-row",
	md: "flex-col md:flex-row"
};
function vn({ children: t, stackBelow: n = "sm", gap: r = "md", className: i, "data-testid": a }) {
	return /* @__PURE__ */ U("div", {
		className: e("flex items-start", _n[n], gn[r], i),
		"data-testid": a,
		children: ie.map(t, (e) => se(e) ? /* @__PURE__ */ U("div", {
			className: "flex-1 basis-0 min-w-0",
			children: e
		}) : e)
	});
}
//#endregion
//#region src/components/shared/DetailHeader.tsx
function yn({ title: t, badge: n, description: r, meta: i, aside: a, asideWidth: o = 260, as: s = "h2", className: c, "data-testid": l }) {
	return /* @__PURE__ */ W("div", {
		className: e("flex flex-wrap items-start justify-between gap-3", c),
		"data-testid": l,
		children: [/* @__PURE__ */ W("div", {
			className: "flex flex-col gap-1.5 min-w-0 flex-1",
			children: [
				/* @__PURE__ */ W("div", {
					className: "flex flex-wrap items-center gap-2",
					children: [/* @__PURE__ */ U(s, {
						className: e("m-0", s === "h2" ? "text-[18px]" : "text-[15px]"),
						children: t
					}), n]
				}),
				r ? /* @__PURE__ */ U("p", {
					className: "m-0 max-w-[72ch] text-[13px] text-text-secondary",
					children: r
				}) : null,
				i
			]
		}), a ? /* @__PURE__ */ U("aside", {
			className: "flex flex-col gap-2 shrink-0",
			style: { width: o },
			children: a
		}) : null]
	});
}
//#endregion
//#region src/components/shared/ReviewThread.tsx
var bn = {
	problem: "problem statement",
	analysis: "analysis",
	option: "options",
	question: "question",
	answer: "answer",
	artifact: "artifact",
	revision: "revision",
	decision: "decision"
}, xn = {
	problem: "info",
	analysis: "neutral",
	option: "info",
	question: "warning",
	answer: "success",
	artifact: "purple",
	revision: "info",
	decision: "accent"
};
function Sn({ name: e, type: t, url: n }) {
	return /* @__PURE__ */ W("div", {
		className: "flex items-center gap-3 rounded-md border border-dashed border-border bg-surface-hover/40 px-3 py-2.5",
		children: [
			/* @__PURE__ */ U("span", {
				className: "text-lg",
				role: "img",
				"aria-label": "artifact",
				children: "🖼️"
			}),
			/* @__PURE__ */ W("div", {
				className: "min-w-0",
				children: [/* @__PURE__ */ U("div", {
					className: "truncate text-xs font-medium text-text-primary",
					children: e
				}), t && /* @__PURE__ */ U("div", {
					className: "text-[10.5px] text-text-tertiary",
					children: t
				})]
			}),
			/* @__PURE__ */ U("div", { className: "flex-1" }),
			n ? /* @__PURE__ */ U("a", {
				href: n,
				target: "_blank",
				rel: "noreferrer",
				className: "text-[11px] text-primary no-underline hover:underline",
				children: "open →"
			}) : /* @__PURE__ */ U("span", {
				className: "text-[10.5px] text-text-tertiary",
				children: "stored with the run"
			})
		]
	});
}
function Cn({ post: t, labels: n, tones: r, onAnswer: i, busy: o, placeholder: s, submitLabel: c }) {
	let [l, u] = V(""), d = t.kind === "question" && !t.resolved;
	return /* @__PURE__ */ W("div", {
		className: e("border-b border-border px-4 py-3 last:border-b-0", d && "bg-warning-bg/20"),
		children: [
			/* @__PURE__ */ W("div", {
				className: "flex min-w-0 items-center gap-2",
				children: [
					t.authorKind === "human" ? /* @__PURE__ */ U(M, {
						name: t.authorName,
						size: 20
					}) : /* @__PURE__ */ U("span", {
						className: "text-[13px]",
						role: "img",
						"aria-label": "agent",
						children: "🤖"
					}),
					/* @__PURE__ */ U("span", {
						className: "truncate text-xs font-semibold text-text-primary",
						children: t.authorName
					}),
					/* @__PURE__ */ U(_, {
						tone: r[t.kind] ?? "neutral",
						size: "xs",
						uppercase: !0,
						children: n[t.kind] ?? t.kind
					}),
					d && /* @__PURE__ */ U(_, {
						tone: "warning",
						size: "xs",
						dot: "pulse",
						children: "needs a human"
					}),
					t.kind === "question" && t.resolved && /* @__PURE__ */ U(_, {
						tone: "success",
						size: "xs",
						children: "resolved"
					}),
					/* @__PURE__ */ U("div", { className: "flex-1" }),
					t.timeLabel && /* @__PURE__ */ U("span", {
						className: "whitespace-nowrap text-[11px] text-text-tertiary",
						children: t.timeLabel
					})
				]
			}),
			/* @__PURE__ */ U("div", {
				className: "mt-1.5 whitespace-pre-wrap pl-7 text-xs leading-relaxed text-text-secondary",
				children: t.body
			}),
			t.artifact && /* @__PURE__ */ U("div", {
				className: "mt-2 ml-7",
				children: /* @__PURE__ */ U(Sn, {
					name: t.artifact.name,
					type: t.artifact.type,
					url: t.artifact.url
				})
			}),
			d && i && /* @__PURE__ */ W("div", {
				className: "mt-2.5 ml-7 flex flex-col gap-2",
				children: [/* @__PURE__ */ U(A, {
					value: l,
					onChange: (e) => u(e.target.value),
					placeholder: s,
					rows: 2,
					"aria-label": "Answer this question"
				}), /* @__PURE__ */ U("div", { children: /* @__PURE__ */ U(a, {
					size: "sm",
					variant: "primary",
					disabled: !l.trim() || o,
					onClick: () => i(t.id, l.trim()),
					children: o ? "Sending…" : c
				}) })]
			})
		]
	});
}
function wn({ posts: t, onAnswer: n, answerBusy: r = !1, answerPlaceholder: i = "Answer the agent — your answer resolves the question and the loop continues.", answerLabel: a = "Answer & continue the loop", kindLabels: o, kindTones: s, emptyLabel: c = "No posts yet — an agent opens the thread by restating the problem.", className: l, "data-testid": u }) {
	let d = {
		...bn,
		...o
	}, f = {
		...xn,
		...s
	};
	return /* @__PURE__ */ U("div", {
		className: e("overflow-hidden rounded-lg border border-border bg-surface", l),
		...u ? { "data-testid": u } : {},
		children: t.length === 0 ? /* @__PURE__ */ U("div", {
			className: "px-4 py-8 text-center text-xs text-text-tertiary",
			children: c
		}) : t.map((e) => /* @__PURE__ */ U(Cn, {
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
var Tn = {
	sm: "lg:w-[260px]",
	md: "lg:w-[300px]",
	lg: "lg:w-[340px]"
};
function En({ children: t, rail: n, railWidth: r = "md", className: i, "data-testid": a }) {
	return /* @__PURE__ */ W("div", {
		className: e("flex flex-col gap-4 lg:flex-row lg:items-start", i),
		...a ? { "data-testid": a } : {},
		children: [/* @__PURE__ */ U("div", {
			className: "min-w-0 flex-1",
			children: t
		}), /* @__PURE__ */ U("aside", {
			className: e("w-full shrink-0 lg:sticky lg:top-4", Tn[r]),
			children: /* @__PURE__ */ U("div", {
				className: "overflow-hidden rounded-lg border border-border bg-surface",
				children: n
			})
		})]
	});
}
function Dn({ title: t, children: n, className: r }) {
	return /* @__PURE__ */ W("section", {
		className: e("border-b border-border px-3.5 py-3 last:border-b-0", r),
		children: [/* @__PURE__ */ U("h3", {
			className: "mb-2 text-[10px] font-semibold uppercase tracking-wide text-text-tertiary",
			children: t
		}), /* @__PURE__ */ U("div", {
			className: "flex flex-col gap-2 text-xs text-text-secondary",
			children: n
		})]
	});
}
//#endregion
//#region src/components/shared/SignoffPanel.tsx
function On({ signoffs: t, required: n = 2, actions: r, emptyHint: i, className: a, "data-testid": o }) {
	let s = t.filter((e) => e.decision === "approve").length, c = i ?? `none yet — ${n} approvals ratify the decision`;
	return /* @__PURE__ */ W("div", {
		className: e("flex flex-wrap items-center gap-3 rounded-lg border border-border bg-surface px-4 py-3", a),
		...o ? { "data-testid": o } : {},
		children: [
			/* @__PURE__ */ U("span", {
				className: "text-xs font-semibold text-text-primary",
				children: "Sign-offs"
			}),
			t.length === 0 ? /* @__PURE__ */ U("span", {
				className: "text-xs text-text-tertiary",
				children: c
			}) : /* @__PURE__ */ W(H, { children: [t.map((e) => /* @__PURE__ */ W("span", {
				className: "flex items-center gap-1.5",
				title: e.role ? `${e.name} · ${e.role}` : e.name,
				children: [
					/* @__PURE__ */ U(M, {
						name: e.name,
						size: 18
					}),
					/* @__PURE__ */ U("span", {
						className: "text-xs text-text-secondary",
						children: e.name
					}),
					/* @__PURE__ */ U(_, {
						tone: e.decision === "approve" ? "success" : "danger",
						size: "xs",
						children: e.decision === "approve" ? "✓" : "✕"
					})
				]
			}, e.name)), /* @__PURE__ */ W("span", {
				className: "text-[11px] text-text-tertiary",
				children: [
					s,
					"/",
					n,
					" approvals"
				]
			})] }),
			/* @__PURE__ */ U("div", { className: "flex-1" }),
			r
		]
	});
}
//#endregion
//#region src/components/shared/StatStrip.tsx
var kn = {
	default: "text-text-primary",
	accent: "text-primary",
	danger: "text-danger"
};
function X({ item: t, flush: n }) {
	return /* @__PURE__ */ W("div", {
		className: e("min-w-0 px-4 py-2.5", (n === "start" || n === "both") && "pl-0", (n === "end" || n === "both") && "pr-0"),
		children: [
			/* @__PURE__ */ U("div", {
				className: "whitespace-nowrap text-[10px] font-semibold uppercase tracking-wide text-text-tertiary",
				children: t.label
			}),
			/* @__PURE__ */ W("div", {
				className: "mt-0.5 flex min-w-0 items-baseline gap-2",
				children: [/* @__PURE__ */ U("span", {
					className: e("text-[17px] font-bold leading-none tabular-nums", kn[t.tone ?? "default"]),
					children: t.value
				}), t.hint != null && /* @__PURE__ */ U("span", {
					className: "min-w-0 truncate text-[11px] text-text-tertiary",
					children: t.hint
				})]
			}),
			t.status && /* @__PURE__ */ W("div", {
				className: "mt-1 flex min-w-0 items-center gap-1.5 text-[12px]",
				"data-testid": "stat-strip-status",
				children: [/* @__PURE__ */ U("span", {
					"aria-hidden": "true",
					className: e("inline-block h-2 w-2 shrink-0 rounded-full", r[t.status.tone ?? "neutral"])
				}), /* @__PURE__ */ U("span", {
					className: e("min-w-0 truncate", t.status.tone && t.status.tone !== "neutral" ? i[t.status.tone] : "text-text-secondary"),
					children: t.status.label
				})]
			})
		]
	});
}
function An({ connector: t }) {
	let n = t?.tone;
	return /* @__PURE__ */ W("div", {
		className: e("flex shrink-0 flex-col items-center justify-center gap-1 self-center px-1", n ? i[n] : "text-text-tertiary"),
		"data-testid": "stat-strip-connector",
		children: [/* @__PURE__ */ W("svg", {
			"aria-hidden": "true",
			width: "56",
			height: "8",
			viewBox: "0 0 56 8",
			className: "block",
			children: [/* @__PURE__ */ U("line", {
				x1: "0",
				y1: "4",
				x2: "50",
				y2: "4",
				stroke: "currentColor",
				strokeWidth: "1.25"
			}), /* @__PURE__ */ U("path", {
				d: "M49 0.5 L55 4 L49 7.5 Z",
				fill: "currentColor"
			})]
		}), t?.label && /* @__PURE__ */ U("span", {
			className: "whitespace-nowrap text-[11px] leading-none",
			children: t.label
		})]
	});
}
function jn({ items: t, frameless: n = !1, connectors: r, className: i, "aria-label": a, "data-testid": o }) {
	let s = !!r && r.length > 0;
	return /* @__PURE__ */ U("div", {
		role: "group",
		className: e("flex overflow-x-auto", s ? "items-stretch" : "divide-x divide-border", !n && "rounded-lg border border-border bg-surface", i),
		...a ? { "aria-label": a } : {},
		...o ? { "data-testid": o } : {},
		children: t.map((e, i) => {
			let a = n ? t.length === 1 ? "both" : i === 0 ? "start" : i === t.length - 1 ? "end" : void 0 : void 0, o = e.title ? { title: e.title } : {}, c;
			return c = e.href ? /* @__PURE__ */ U("a", {
				href: e.href,
				className: "min-w-0 flex-1 no-underline transition-colors hover:bg-surface-hover",
				...o,
				children: /* @__PURE__ */ U(X, {
					item: e,
					flush: a
				})
			}) : e.onSelect ? /* @__PURE__ */ U("button", {
				type: "button",
				onClick: e.onSelect,
				className: "min-w-0 flex-1 cursor-pointer border-none bg-transparent p-0 text-left transition-colors hover:bg-surface-hover",
				...o,
				children: /* @__PURE__ */ U(X, {
					item: e,
					flush: a
				})
			}) : /* @__PURE__ */ U("div", {
				className: "min-w-0 flex-1",
				...o,
				children: /* @__PURE__ */ U(X, {
					item: e,
					flush: a
				})
			}), /* @__PURE__ */ W(ae, { children: [c, s && i < t.length - 1 && /* @__PURE__ */ U(An, { connector: r[i] })] }, e.label);
		})
	});
}
//#endregion
//#region src/components/shared/KeyValue.tsx
function Mn({ items: t, layout: n = "row", labelWidth: r = "w-28", className: i, "aria-label": a, "data-testid": o = "key-value" }) {
	if (t.length === 0) return null;
	let s = n === "row";
	return /* @__PURE__ */ U("dl", {
		className: e("m-0 min-w-0", n === "grid" ? "grid grid-cols-2 gap-x-6 gap-y-3" : s ? "flex flex-col gap-1.5" : "flex flex-col gap-3", i),
		"data-layout": n,
		"data-testid": o,
		...a ? { "aria-label": a } : {},
		children: t.map((t, n) => /* @__PURE__ */ W("div", {
			className: e("min-w-0", s ? "flex items-baseline gap-3" : "flex flex-col gap-0.5"),
			"data-testid": `${o}-item`,
			children: [/* @__PURE__ */ U("dt", {
				className: e("m-0 text-text-secondary", s ? e("shrink-0 text-[13px]", r) : "text-[12px]"),
				children: t.label
			}), /* @__PURE__ */ U("dd", {
				className: e("m-0 min-w-0 truncate text-[13px] text-text-primary", s && "flex-1", t.mono && "font-mono text-[12px]"),
				...t.title ? { title: t.title } : {},
				children: t.value
			})]
		}, `${t.label}-${n}`))
	});
}
//#endregion
//#region src/components/shared/PersonHoverCard.tsx
function Nn({ person: t, children: n, actions: r, details: i, interactiveChild: a = !1, openDelay: o = 450, closeDelay: s = 250, className: c, "data-testid": l = "person-hover-card" }) {
	let u = B(null), [d, f] = V(!1), p = B(null), m = I(() => {
		p.current &&= (clearTimeout(p.current), null);
	}, []);
	L(() => m, [m]);
	let h = I(() => {
		m(), p.current = setTimeout(() => f(!0), o);
	}, [m, o]), g = I(() => {
		m(), p.current = setTimeout(() => f(!1), s);
	}, [m, s]);
	return /* @__PURE__ */ W(H, { children: [/* @__PURE__ */ U("span", {
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
	}), /* @__PURE__ */ U(ee, {
		trigger: u,
		open: d,
		onClose: () => {
			m(), f(!1);
		},
		placement: "bottom-start",
		"aria-label": `About ${t.displayName}`,
		"data-testid": l,
		children: /* @__PURE__ */ W("div", {
			className: "w-72 p-3",
			onMouseEnter: m,
			onMouseLeave: g,
			children: [
				/* @__PURE__ */ W("div", {
					className: "flex items-start gap-3",
					children: [/* @__PURE__ */ U(M, {
						name: t.displayName,
						src: t.avatarUrl,
						color: t.color,
						size: 40
					}), /* @__PURE__ */ W("div", {
						className: "min-w-0 flex-1",
						children: [
							/* @__PURE__ */ W("div", {
								className: "flex items-center gap-1.5",
								children: [/* @__PURE__ */ U("span", {
									className: "truncate text-sm font-semibold text-text-primary",
									children: t.displayName
								}), t.online !== void 0 && /* @__PURE__ */ U(N, { state: t.online ? "online" : "offline" })]
							}),
							t.title && /* @__PURE__ */ U("div", {
								className: "truncate text-xs text-text-secondary",
								children: t.title
							}),
							t.department && /* @__PURE__ */ U("div", {
								className: "truncate text-xs text-text-tertiary",
								children: t.department
							})
						]
					})]
				}),
				t.statusText && /* @__PURE__ */ U("div", {
					className: "mt-2 truncate text-xs italic text-text-secondary",
					children: t.statusText
				}),
				(t.email || t.localTime) && /* @__PURE__ */ W("div", {
					className: "mt-2 space-y-0.5 border-t border-border pt-2",
					children: [t.email && /* @__PURE__ */ U("div", {
						className: "truncate text-xs text-text-secondary",
						children: t.email
					}), t.localTime && /* @__PURE__ */ W("div", {
						className: "text-xs text-text-tertiary",
						children: [t.localTime, " local time"]
					})]
				}),
				i && /* @__PURE__ */ U("div", {
					className: "mt-2 border-t border-border pt-2",
					children: i
				}),
				r && /* @__PURE__ */ U("div", {
					className: "mt-3 flex items-center gap-2",
					children: r
				})
			]
		})
	})] });
}
//#endregion
//#region src/components/shared/MasterDetail.tsx
function Pn(e) {
	if (!e || typeof window > "u") return !1;
	try {
		return window.localStorage.getItem(e) === "compact";
	} catch {
		return !1;
	}
}
function Fn(e, t) {
	if (!(!e || typeof window > "u")) try {
		window.localStorage.setItem(e, t ? "compact" : "expanded");
	} catch {}
}
function In({ direction: t }) {
	return /* @__PURE__ */ U("svg", {
		className: e("h-4 w-4", t === "right" && "rotate-180"),
		viewBox: "0 0 16 16",
		fill: "none",
		"aria-hidden": "true",
		children: /* @__PURE__ */ U("path", {
			d: "M10 3L5 8l5 5",
			stroke: "currentColor",
			strokeWidth: "1.5",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		})
	});
}
function Ln({ index: t, selected: n }) {
	return /* @__PURE__ */ U("span", {
		className: e("flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-semibold", n ? "bg-primary text-on-primary" : "bg-surface-inset text-text-tertiary"),
		children: t + 1
	});
}
function Rn({ items: t, keyOf: n, selectedKey: r, onSelect: i, renderRow: a, renderCompactRow: o, renderDetail: s, railTitle: c, railWidth: l = 340, compactWidth: u = 72, storageKey: d, emptyDetail: f, className: p, "data-testid": m = "master-detail" }) {
	let [h, g] = V(() => Pn(d)), _ = I(() => {
		g((e) => {
			let t = !e;
			return Fn(d, t), t;
		});
	}, [d]), v = z(() => t.findIndex((e) => n(e) === r), [
		t,
		n,
		r
	]), y = v >= 0 ? t[v] : null;
	return /* @__PURE__ */ W("div", {
		className: e("flex overflow-hidden rounded-lg border border-border bg-surface", p),
		"data-testid": m,
		children: [/* @__PURE__ */ W("nav", {
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
			children: [/* @__PURE__ */ W("div", {
				className: e("flex items-center gap-1 border-b border-border px-3 py-2", h ? "justify-center" : "justify-between"),
				children: [!h && c && /* @__PURE__ */ U("span", {
					className: "truncate text-xs font-semibold uppercase tracking-wide text-text-tertiary",
					children: c
				}), /* @__PURE__ */ U("button", {
					type: "button",
					onClick: _,
					"aria-label": h ? "Expand list" : "Collapse list",
					"data-testid": `${m}-toggle`,
					className: "flex-shrink-0 rounded-md p-1 text-text-tertiary transition-colors hover:bg-surface-hover hover:text-text-primary",
					children: /* @__PURE__ */ U(In, { direction: h ? "right" : "left" })
				})]
			}), /* @__PURE__ */ U("div", {
				className: "flex flex-col",
				children: t.map((t, s) => {
					let c = n(t), l = c === r;
					return /* @__PURE__ */ U("div", {
						role: "button",
						tabIndex: 0,
						"aria-current": l,
						onClick: () => i(c),
						onKeyDown: (e) => {
							(e.key === "Enter" || e.key === " ") && (e.preventDefault(), i(c));
						},
						"data-testid": `${m}-row-${c}`,
						className: e("cursor-pointer border-l-2 text-left transition-colors", l ? "border-primary bg-surface-hover" : "border-transparent hover:bg-surface-hover"),
						children: h ? o?.(t, s, l) ?? /* @__PURE__ */ U("div", {
							className: "flex justify-center py-2.5",
							children: /* @__PURE__ */ U(Ln, {
								index: s,
								selected: l
							})
						}) : a(t, s, l)
					}, c);
				})
			})]
		}), /* @__PURE__ */ U("div", {
			className: "min-w-0 flex-1 overflow-y-auto",
			"data-testid": `${m}-detail`,
			children: y ? s(y, v) : f
		})]
	});
}
//#endregion
//#region src/components/shared/TreeView.tsx
function zn(e) {
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
function Bn(e) {
	return typeof CSS < "u" && typeof CSS.escape == "function" ? CSS.escape(e) : e;
}
function Vn(e, t) {
	let n = /* @__PURE__ */ new Set();
	if (!t) return n;
	let r = new Map(e.map((e) => [e.id, e])), i = r.get(t);
	for (; i?.parentId;) n.add(i.parentId), i = r.get(i.parentId);
	return n;
}
function Hn({ expanded: t }) {
	return /* @__PURE__ */ U("svg", {
		className: e("h-3.5 w-3.5 transition-transform", t ? "" : "-rotate-90"),
		viewBox: "0 0 16 16",
		fill: "none",
		"aria-hidden": "true",
		children: /* @__PURE__ */ U("path", {
			d: "M4 6l4 4 4-4",
			stroke: "currentColor",
			strokeWidth: "1.5",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		})
	});
}
function Un(e) {
	let t = e.currentTarget.getBoundingClientRect(), n = e.clientY - t.top;
	return n < t.height / 3 ? "before" : n > t.height * 2 / 3 ? "after" : "into";
}
function Wn({ entry: t, depth: n, expanded: r, onToggle: i, selectedId: a, onSelect: o, renderTrailing: s, rowMenu: c, rowMenuLabel: l, dragEnabled: u, canDragNode: d, canDrop: f, dragRef: p, dropTarget: m, setDropTarget: h, onDrop: g, testId: _, focusedId: v, setFocusedId: y, size: b }) {
	let x = r.has(t.id), S = t.children.length > 0, C = t.id === a, w = m?.id === t.id, T = u && !t.disabled && t.status !== "pending" && (d?.(t) ?? !0), E = c?.(t), D = !!E && E.some((e) => e.items.length > 0), O = b === "md";
	return /* @__PURE__ */ W("div", { children: [/* @__PURE__ */ W("div", {
		draggable: T,
		onDragStart: (e) => {
			if (!T) {
				e.preventDefault();
				return;
			}
			e.dataTransfer.setData("text/plain", t.id), e.dataTransfer.effectAllowed = "move", p.current = { id: t.id };
		},
		onDragOver: (e) => {
			let n = p.current;
			if (!n || n.id === t.id) return;
			let r = Un(e);
			if (!f(n.id, t.id, r)) {
				h(null);
				return;
			}
			e.preventDefault(), e.dataTransfer.dropEffect = "move", h({
				id: t.id,
				position: r
			});
		},
		onDragLeave: () => {
			m?.id === t.id && h(null);
		},
		onDrop: (e) => {
			let n = p.current;
			if (!n || n.id === t.id) return;
			e.preventDefault();
			let r = Un(e);
			h(null), f(n.id, t.id, r) && g(t.id, r), p.current = null;
		},
		onDragEnd: () => {
			p.current = null, h(null);
		},
		onClick: () => {
			t.disabled || (o(t.id), S && i(t.id));
		},
		...D ? { onContextMenu: (e) => {
			e.preventDefault(), Gn(e.currentTarget);
		} } : {},
		role: "treeitem",
		"aria-selected": C,
		"aria-disabled": t.disabled,
		"aria-level": n + 1,
		"aria-busy": t.status === "pending" || void 0,
		"data-status": t.status,
		...S ? { "aria-expanded": x } : {},
		tabIndex: v === t.id ? 0 : -1,
		onFocus: () => y(t.id),
		"data-testid": `${_}-row-${t.id}`,
		className: e("group relative flex items-center border-l-2 transition-colors", "select-none outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary", O ? "min-h-8 gap-1.5 py-1 pr-2.5 text-[15px] leading-6" : "gap-1 py-1.5 pr-2 text-sm", T ? "cursor-grab active:cursor-grabbing" : "cursor-pointer", C ? O ? "border-primary bg-primary-bg font-medium text-primary-fg" : "border-primary bg-surface-hover font-semibold text-text-primary" : O ? "border-transparent text-text-primary hover:bg-surface-hover" : "border-transparent text-text-secondary hover:bg-surface-hover", t.disabled && "cursor-not-allowed opacity-50", t.status === "pending" && "pointer-events-none opacity-50", t.status === "moved" && "bg-success/10", w && m?.position === "into" && "ring-1 ring-inset ring-primary", w && m?.position === "before" && "shadow-[inset_0_2px_0_0_var(--color-primary)]", w && m?.position === "after" && "shadow-[inset_0_-2px_0_0_var(--color-primary)]"),
		style: { paddingLeft: n * (O ? 18 : 14) + 8 },
		children: [
			S ? /* @__PURE__ */ U("button", {
				type: "button",
				onClick: (e) => {
					e.stopPropagation(), i(t.id);
				},
				"aria-label": x ? "Collapse" : "Expand",
				className: "flex h-5 w-5 flex-shrink-0 items-center justify-center text-text-tertiary hover:text-text-primary",
				children: /* @__PURE__ */ U(Hn, { expanded: x })
			}) : /* @__PURE__ */ U("span", {
				className: "h-5 w-5 flex-shrink-0",
				"aria-hidden": "true"
			}),
			t.icon && /* @__PURE__ */ U("span", {
				className: e("flex flex-shrink-0 items-center", O && (C ? "text-primary-fg" : "text-text-secondary")),
				"data-testid": `${_}-icon-${t.id}`,
				children: t.icon
			}),
			/* @__PURE__ */ U("span", {
				className: "min-w-0 flex-1 truncate",
				title: t.title,
				children: t.title
			}),
			t.meta && /* @__PURE__ */ U("span", {
				className: e("flex-shrink-0 text-text-tertiary", O ? "text-[13px] tabular-nums" : "text-xs"),
				children: t.meta
			}),
			t.hoverMeta && /* @__PURE__ */ U("span", {
				"data-testid": `${_}-hover-meta-${t.id}`,
				className: "sr-only flex-shrink-0 text-xs text-text-tertiary group-hover:not-sr-only group-focus:not-sr-only group-focus-within:not-sr-only",
				children: t.hoverMeta
			}),
			t.badge,
			s?.(t),
			D && /* @__PURE__ */ U("span", {
				"data-tree-row-menu": "",
				className: e("flex flex-shrink-0 items-center", O && "pointer-events-none absolute inset-y-0 right-1.5 opacity-0 group-hover:pointer-events-auto group-hover:opacity-100 group-focus:pointer-events-auto group-focus:opacity-100 group-focus-within:pointer-events-auto group-focus-within:opacity-100 has-[[aria-expanded=true]]:pointer-events-auto has-[[aria-expanded=true]]:opacity-100"),
				onClick: (e) => e.stopPropagation(),
				onContextMenu: (e) => e.stopPropagation(),
				children: /* @__PURE__ */ U(F, {
					trigger: /* @__PURE__ */ U("span", {
						"aria-hidden": "true",
						className: "text-sm leading-none",
						children: "⋯"
					}),
					triggerLabel: l?.(t) ?? `Actions for ${t.title}`,
					triggerTabIndex: v === t.id ? 0 : -1,
					triggerTestId: `${_}-menu-${t.id}`,
					align: "end",
					sections: E,
					"data-testid": `${_}-menu-panel-${t.id}`,
					triggerClassName: e("h-5 w-6 border-transparent px-0 py-0 opacity-0 transition-opacity motion-reduce:transition-none", "group-hover:opacity-100 group-focus:opacity-100 group-focus-within:opacity-100 focus-visible:opacity-100 aria-expanded:opacity-100", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", O && "h-6 w-7 bg-surface-hover")
				})
			})
		]
	}), x && t.children.map((e) => /* @__PURE__ */ U(Wn, {
		entry: e,
		depth: n + 1,
		expanded: r,
		onToggle: i,
		selectedId: a,
		onSelect: o,
		renderTrailing: s,
		size: b,
		rowMenu: c,
		rowMenuLabel: l,
		dragEnabled: u,
		canDragNode: d,
		canDrop: f,
		dragRef: p,
		dropTarget: m,
		setDropTarget: h,
		onDrop: g,
		testId: _,
		focusedId: v,
		setFocusedId: y
	}, e.id))] });
}
function Gn(e) {
	let t = e.querySelector("[data-tree-row-menu] button[aria-haspopup=\"menu\"]");
	return t ? (t.getAttribute("aria-expanded") !== "true" && t.click(), !0) : !1;
}
function Kn(e, t) {
	let n = [], r = (e) => {
		for (let i of e) n.push(i.id), t.has(i.id) && i.children.length > 0 && r(i.children);
	};
	return r(e), n;
}
function qn({ nodes: t, selectedId: n, onSelect: r, defaultExpanded: i, expanded: a, onToggle: o, onReorder: s, canDragNode: c, canDropNode: l, renderTrailing: u, rowMenu: d, rowMenuLabel: f, size: p = "sm", className: m, "data-testid": h = "tree-view" }) {
	let g = z(() => zn(t), [t]), [_, v] = V(() => new Set(i ?? [])), y = a !== void 0, b = z(() => y ? new Set(a) : _, [
		y,
		a,
		_
	]), [x, S] = V(null), C = B(null), w = B(null), [T, E] = V(null), D = z(() => new Map(t.map((e) => [e.id, e])), [t]);
	L(() => {
		let e = Vn(t, n);
		if (e.size !== 0) {
			if (y) {
				e.forEach((e) => {
					a.includes(e) || o?.(e, !0);
				});
				return;
			}
			v((t) => {
				let n = !1, r = new Set(t);
				return e.forEach((e) => {
					r.has(e) || (r.add(e), n = !0);
				}), n ? r : t;
			});
		}
	}, [t, n]);
	let O = (e, t) => {
		o?.(e, t), !y && v((n) => {
			if (n.has(e) === t) return n;
			let r = new Set(n);
			return t ? r.add(e) : r.delete(e), r;
		});
	}, k = (e) => O(e, !b.has(e)), A = z(() => Kn(g, b), [g, b]), j = x && A.includes(x) ? x : n && A.includes(n) ? n : A[0] ?? null, M = (e) => {
		e && (S(e), w.current?.querySelector(`[data-testid="${h}-row-${Bn(e)}"]`)?.focus());
	}, N = (e) => {
		let n = e.target, i = n.closest("[role=\"treeitem\"]");
		if (!i || n.closest("[data-tree-row-menu]")) return;
		if (e.key === "F10" && e.shiftKey || e.key === "ContextMenu") {
			Gn(i) && e.preventDefault();
			return;
		}
		let a = `${h}-row-`, o = (i.getAttribute("data-testid") ?? "").slice(a.length);
		if (!o || !D.has(o)) return;
		let s = A.indexOf(o), c = D.get(o), l = t.some((e) => e.parentId === o);
		switch (e.key) {
			case "ArrowDown":
				e.preventDefault(), M(A[Math.min(s + 1, A.length - 1)] ?? null);
				return;
			case "ArrowUp":
				e.preventDefault(), M(A[Math.max(s - 1, 0)] ?? null);
				return;
			case "Home":
				e.preventDefault(), M(A[0] ?? null);
				return;
			case "End":
				e.preventDefault(), M(A[A.length - 1] ?? null);
				return;
			case "ArrowRight":
				e.preventDefault(), l && !b.has(o) ? O(o, !0) : l && M(A[s + 1] ?? null);
				return;
			case "ArrowLeft":
				e.preventDefault(), l && b.has(o) ? O(o, !1) : M(c.parentId);
				return;
			case "Enter":
			case " ":
				e.preventDefault(), c.disabled || r(o), l && k(o);
				return;
		}
	}, ee = (e, n) => {
		let r = C.current?.id;
		if (!r || !s) return;
		let i = D.get(e);
		if (!i || !P(r, e, n)) return;
		let a = i;
		for (; a?.parentId;) {
			if (a.parentId === r) return;
			a = D.get(a.parentId);
		}
		if (n === "into") {
			let n = t.filter((t) => t.parentId === e && t.id !== r).length;
			s(r, e, n);
			return;
		}
		let o = t.filter((e) => e.parentId === i.parentId && e.id !== r).map((e) => e.id).indexOf(e);
		o !== -1 && s(r, i.parentId, n === "before" ? o : o + 1);
	};
	function P(e, t, n) {
		let r = D.get(e), i = D.get(t);
		if (!r || !i || e === t || r.disabled || i.disabled || r.status === "pending" || i.status === "pending" || c?.(r) === !1 || l?.(r, i, n) === !1) return !1;
		let a = i;
		for (; a?.parentId;) {
			if (a.parentId === e) return !1;
			a = D.get(a.parentId);
		}
		return !0;
	}
	return t.length === 0 ? null : /* @__PURE__ */ U("div", {
		ref: w,
		role: "tree",
		className: e("flex flex-col", m),
		"data-testid": h,
		onKeyDown: N,
		children: g.map((e) => /* @__PURE__ */ U(Wn, {
			entry: e,
			depth: 0,
			expanded: b,
			onToggle: k,
			selectedId: n,
			onSelect: r,
			renderTrailing: u,
			size: p,
			rowMenu: d,
			rowMenuLabel: f,
			dragEnabled: !!s,
			canDragNode: c,
			canDrop: P,
			dragRef: C,
			dropTarget: T,
			setDropTarget: E,
			onDrop: ee,
			testId: h,
			focusedId: j,
			setFocusedId: S
		}, e.id))
	});
}
//#endregion
//#region src/components/shared/TaskStrip.tsx
var Z = {
	queued: "Starting",
	running: "Running",
	paused: "Paused",
	awaiting: "Needs you",
	done: "Done",
	failed: "Failed",
	stopped: "Stopped"
}, Jn = {
	queued: "bg-info",
	running: "bg-info animate-pulse motion-reduce:animate-none",
	paused: "bg-warning",
	awaiting: "bg-warning",
	done: "bg-success",
	failed: "bg-danger",
	stopped: "bg-border-emphasis"
};
function Yn(e) {
	return /* @__PURE__ */ W("svg", {
		width: 12,
		height: 12,
		viewBox: "0 0 16 16",
		fill: "currentColor",
		"aria-hidden": "true",
		...e,
		children: [/* @__PURE__ */ U("rect", {
			x: "4",
			y: "3",
			width: "3",
			height: "10",
			rx: "0.75"
		}), /* @__PURE__ */ U("rect", {
			x: "9",
			y: "3",
			width: "3",
			height: "10",
			rx: "0.75"
		})]
	});
}
function Xn(e) {
	return /* @__PURE__ */ U("svg", {
		width: 12,
		height: 12,
		viewBox: "0 0 16 16",
		fill: "currentColor",
		"aria-hidden": "true",
		...e,
		children: /* @__PURE__ */ U("path", { d: "M5 3.2v9.6a.6.6 0 0 0 .9.5l7.4-4.8a.6.6 0 0 0 0-1L5.9 2.7a.6.6 0 0 0-.9.5Z" })
	});
}
function Zn(e) {
	return /* @__PURE__ */ U("svg", {
		width: 12,
		height: 12,
		viewBox: "0 0 16 16",
		fill: "currentColor",
		"aria-hidden": "true",
		...e,
		children: /* @__PURE__ */ U("rect", {
			x: "3.5",
			y: "3.5",
			width: "9",
			height: "9",
			rx: "1.25"
		})
	});
}
function Qn(e) {
	return typeof e != "number" || !Number.isFinite(e) ? null : Math.round(Math.max(0, Math.min(100, e)));
}
function $n({ label: t, status: n, phase: r, percent: i, icon: o, onPause: s, onResume: c, onStop: l, onOpen: u, onDismiss: f, className: p, "data-testid": h = "task-strip" }) {
	let g = Qn(i), _ = n === "running" || n === "queued" || n === "paused" || n === "awaiting", v = r ?? Z[n];
	return /* @__PURE__ */ W("div", {
		"data-testid": h,
		"data-status": n,
		"aria-busy": n === "running" || n === "queued" || void 0,
		className: e("flex h-[30px] min-w-0 items-center gap-2 rounded-t-lg border border-b-0 border-border bg-surface px-2 text-xs", p),
		children: [
			o ?? /* @__PURE__ */ U("span", {
				"aria-hidden": "true",
				className: e("inline-block h-1.5 w-1.5 shrink-0 rounded-full", Jn[n])
			}),
			/* @__PURE__ */ W("p", {
				role: "status",
				"aria-live": "polite",
				className: "m-0 flex min-w-0 shrink items-center gap-1 truncate",
				"data-testid": `${h}-label`,
				children: [
					/* @__PURE__ */ U("span", {
						className: "truncate font-semibold text-text-primary",
						children: t
					}),
					/* @__PURE__ */ U("span", {
						"aria-hidden": "true",
						className: "text-text-tertiary",
						children: "·"
					}),
					/* @__PURE__ */ U("span", {
						className: "truncate text-text-secondary",
						"data-testid": `${h}-phase`,
						children: v
					}),
					g !== null && /* @__PURE__ */ W("span", {
						className: "shrink-0 text-text-secondary",
						"data-testid": `${h}-percent`,
						children: [
							"· ",
							g,
							"%"
						]
					})
				]
			}),
			g === null ? /* @__PURE__ */ U("span", {
				className: "flex-1",
				"aria-hidden": "true"
			}) : /* @__PURE__ */ U(pt, {
				value: g,
				size: "sm",
				"aria-label": `${t}: ${g}%`,
				className: "min-w-[3rem] flex-1",
				"data-testid": `${h}-bar`
			}),
			/* @__PURE__ */ W("span", {
				className: "flex shrink-0 items-center gap-0.5",
				children: [
					u && /* @__PURE__ */ U(a, {
						variant: "ghost",
						size: "sm",
						onClick: u,
						"data-testid": `${h}-open`,
						children: "Open run"
					}),
					n === "paused" && c && /* @__PURE__ */ U(d, {
						size: "sm",
						"aria-label": "Resume task",
						title: "Resume",
						onClick: c,
						"data-testid": `${h}-resume`,
						children: /* @__PURE__ */ U(Xn, {})
					}),
					_ && n !== "paused" && s && /* @__PURE__ */ U(d, {
						size: "sm",
						"aria-label": "Pause task",
						title: "Pause",
						onClick: s,
						"data-testid": `${h}-pause`,
						children: /* @__PURE__ */ U(Yn, {})
					}),
					_ && l && /* @__PURE__ */ U(d, {
						size: "sm",
						"aria-label": "Stop task",
						title: "Stop",
						onClick: l,
						"data-testid": `${h}-stop`,
						children: /* @__PURE__ */ U(Zn, {})
					}),
					f && /* @__PURE__ */ U(d, {
						size: "sm",
						"aria-label": "Hide task strip",
						title: "Hide",
						onClick: f,
						"data-testid": `${h}-dismiss`,
						children: /* @__PURE__ */ U(m, { size: 12 })
					})
				]
			})
		]
	});
}
//#endregion
//#region src/components/shared/WorkflowStepper.tsx
var er = {
	sm: "h-5 w-5",
	md: "h-6 w-6"
}, tr = {
	sm: "text-[10px]",
	md: "text-[11px]"
};
function nr() {
	return /* @__PURE__ */ U("svg", {
		viewBox: "0 0 16 16",
		fill: "none",
		className: "h-3 w-3",
		"aria-hidden": "true",
		children: /* @__PURE__ */ U("path", {
			d: "M3.5 8.5l3 3 6-6.5",
			stroke: "currentColor",
			strokeWidth: "1.75",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		})
	});
}
function rr({ steps: t, size: n = "md", className: r, "data-testid": i = "workflow-stepper" }) {
	return /* @__PURE__ */ U("ol", {
		className: e("flex items-center overflow-x-auto", r),
		"data-testid": i,
		children: t.map((r, i) => {
			let a = i === t.length - 1, o = t[i + 1], s = r.done ? o?.done ? "bg-success" : "bg-gradient-to-r from-success to-success/30" : "bg-border";
			return /* @__PURE__ */ W("li", {
				"aria-current": r.active ? "step" : void 0,
				className: "flex flex-1 items-center last:flex-none",
				children: [/* @__PURE__ */ W("div", {
					className: "flex items-center gap-1.5 whitespace-nowrap",
					children: [/* @__PURE__ */ U("div", {
						className: e("flex flex-shrink-0 items-center justify-center rounded-full transition-colors", er[n], r.done ? "bg-success text-white" : r.active ? "border-2 border-info bg-info-bg" : "border border-border bg-surface-inset"),
						children: r.done ? /* @__PURE__ */ U(nr, {}) : r.active ? /* @__PURE__ */ U("span", { className: "h-2 w-2 rounded-full bg-info" }) : null
					}), /* @__PURE__ */ U("span", {
						className: e("font-medium leading-none", tr[n], r.active ? "text-text-primary" : r.done ? "text-text-secondary" : "text-text-tertiary"),
						children: r.label
					})]
				}), !a && /* @__PURE__ */ U("div", { className: e("mx-2 h-1 flex-1 rounded-full transition-colors", s) })]
			}, r.step);
		})
	});
}
//#endregion
//#region src/components/shared/Wizard.tsx
function ir() {
	return /* @__PURE__ */ U("svg", {
		viewBox: "0 0 16 16",
		fill: "none",
		className: "h-3 w-3",
		"aria-hidden": "true",
		children: /* @__PURE__ */ U("path", {
			d: "M3.5 8.5l3 3 6-6.5",
			stroke: "currentColor",
			strokeWidth: "1.75",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		})
	});
}
function ar({ steps: t, activeKey: n, onStep: r, onFinish: i, finishLabel: a = "Finish", className: o, "data-testid": s = "wizard" }) {
	let c = t.findIndex((e) => e.key === n), l = c >= 0 ? t[c] : t[0], u = l?.canAdvance ?? !0, d = c === t.length - 1;
	return /* @__PURE__ */ W("div", {
		className: e("flex flex-col gap-4 sm:flex-row", o),
		"data-testid": s,
		children: [/* @__PURE__ */ U("ol", {
			className: "flex flex-shrink-0 flex-col gap-1 sm:w-56",
			"data-testid": `${s}-rail`,
			children: t.map((t, i) => {
				let a = i < c, o = t.key === n;
				return /* @__PURE__ */ U("li", { children: /* @__PURE__ */ W("button", {
					type: "button",
					onClick: () => r(t.key),
					"aria-current": o ? "step" : void 0,
					"data-testid": `${s}-step-${t.key}`,
					className: e("flex w-full items-center gap-2.5 rounded-md px-2.5 py-2 text-left text-sm transition-colors", o ? "bg-surface-hover font-semibold text-text-primary" : "text-text-secondary hover:bg-surface-hover"),
					children: [/* @__PURE__ */ U("span", {
						className: e("flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full text-[11px] font-semibold", a ? "bg-success text-white" : o ? "border-2 border-info bg-info-bg text-info-fg" : "border border-border bg-surface-inset text-text-tertiary"),
						children: a ? /* @__PURE__ */ U(ir, {}) : i + 1
					}), /* @__PURE__ */ U("span", {
						className: "truncate",
						children: t.label
					})]
				}) }, t.key);
			})
		}), /* @__PURE__ */ W("div", {
			className: "flex min-w-0 flex-1 flex-col gap-4",
			children: [/* @__PURE__ */ U("div", {
				className: "min-w-0 flex-1",
				"data-testid": `${s}-content`,
				children: l?.content
			}), /* @__PURE__ */ W("div", {
				className: "flex items-center justify-between gap-2 border-t border-border pt-3",
				children: [/* @__PURE__ */ U("button", {
					type: "button",
					onClick: () => {
						c > 0 && r(t[c - 1].key);
					},
					disabled: c <= 0,
					"data-testid": `${s}-back`,
					className: "rounded-md px-3 py-1.5 text-sm font-semibold text-text-secondary transition-colors hover:bg-surface-hover disabled:cursor-not-allowed disabled:opacity-50",
					children: "Back"
				}), /* @__PURE__ */ U("button", {
					type: "button",
					onClick: () => {
						u && (d ? i?.() : r(t[c + 1].key));
					},
					disabled: !u,
					"data-testid": `${s}-next`,
					className: "rounded-md bg-primary px-3.5 py-1.5 text-sm font-semibold text-on-primary transition-colors hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-50",
					children: d ? a : "Next"
				})]
			})]
		})]
	});
}
//#endregion
//#region src/components/shared/MarkdownView.tsx
var or = [
	"tsx",
	"ts",
	"jsx",
	"js",
	"json",
	"bash",
	"sh",
	"text"
];
function sr(e) {
	let t = /language-(\w+)/.exec(e ?? "")?.[1]?.toLowerCase();
	return or.includes(t ?? "") ? t : "text";
}
function Q(e) {
	return typeof e == "string" || typeof e == "number" ? String(e) : Array.isArray(e) ? e.map(Q).join("") : e && typeof e == "object" && "props" in e ? Q(e.props?.children) : "";
}
var cr = {
	sm: {
		body: "text-[13px]",
		h1: "mb-2 mt-4 text-[17px] font-semibold",
		h2: "mb-1.5 mt-4 text-[15px] font-semibold",
		h3: "mb-1.5 mt-3 text-[14px] font-semibold",
		h4: "mb-1 mt-3 text-[13px] font-semibold",
		inlineCode: "text-[12px]"
	},
	md: {
		body: "text-sm",
		h1: "mb-3 mt-6 text-xl font-bold",
		h2: "mb-2 mt-5 text-lg font-bold",
		h3: "mb-2 mt-4 text-base font-semibold",
		h4: "",
		inlineCode: "text-[13px]"
	},
	lg: {
		body: "text-[15px]",
		h1: "mb-3 mt-7 text-2xl font-semibold",
		h2: "mb-2 mt-6 text-xl font-semibold",
		h3: "mb-2 mt-5 text-[17px] font-semibold",
		h4: "mb-1.5 mt-4 text-[15px] font-semibold",
		inlineCode: "text-[14px]"
	}
};
function $(t) {
	let n = cr[t], r = {
		table({ children: t }) {
			return /* @__PURE__ */ U("div", {
				className: "overflow-x-auto",
				children: /* @__PURE__ */ U("table", {
					className: e("w-full border-collapse", n.body),
					children: t
				})
			});
		},
		th({ children: e }) {
			return /* @__PURE__ */ U("th", {
				className: "border-b border-border px-3 py-1.5 text-left font-semibold text-text-primary",
				children: e
			});
		},
		td({ children: e }) {
			return /* @__PURE__ */ U("td", {
				className: "border-b border-border px-3 py-1.5 text-text-secondary",
				children: e
			});
		},
		a({ href: e, children: t }) {
			return /* @__PURE__ */ U("a", {
				href: e,
				target: "_blank",
				rel: "noreferrer",
				className: "text-primary underline underline-offset-2 hover:text-primary-hover",
				children: t
			});
		},
		h1({ children: t }) {
			return /* @__PURE__ */ U("h1", {
				className: e(n.h1, "text-text-primary first:mt-0"),
				children: t
			});
		},
		h2({ children: t }) {
			return /* @__PURE__ */ U("h2", {
				className: e(n.h2, "text-text-primary first:mt-0"),
				children: t
			});
		},
		h3({ children: t }) {
			return /* @__PURE__ */ U("h3", {
				className: e(n.h3, "text-text-primary first:mt-0"),
				children: t
			});
		},
		p({ children: t }) {
			return /* @__PURE__ */ U("p", {
				className: e("mb-3 leading-relaxed text-text-secondary last:mb-0", n.body),
				children: t
			});
		},
		ul({ children: t }) {
			return /* @__PURE__ */ U("ul", {
				className: e("mb-3 list-disc space-y-1 pl-5 text-text-secondary", n.body),
				children: t
			});
		},
		ol({ children: t }) {
			return /* @__PURE__ */ U("ol", {
				className: e("mb-3 list-decimal space-y-1 pl-5 text-text-secondary", n.body),
				children: t
			});
		},
		blockquote({ children: t }) {
			return /* @__PURE__ */ U("blockquote", {
				className: e("mb-3 border-l-2 border-border pl-3 italic text-text-tertiary", n.body),
				children: t
			});
		},
		hr() {
			return /* @__PURE__ */ U("hr", { className: "my-4 border-border" });
		},
		pre({ children: e, className: t }) {
			return /* @__PURE__ */ U(ur, {
				className: t,
				children: e
			});
		},
		code({ className: t, children: r }) {
			return t ? /* @__PURE__ */ U("code", {
				className: t,
				children: r
			}) : /* @__PURE__ */ U("code", {
				className: e("rounded bg-surface-inset px-1 py-0.5 text-text-primary", n.inlineCode),
				children: r
			});
		}
	};
	return n.h4 && (r.h4 = ({ children: t }) => /* @__PURE__ */ U("h4", {
		className: e(n.h4, "text-text-primary first:mt-0"),
		children: t
	})), r;
}
var lr = {
	sm: $("sm"),
	md: $("md"),
	lg: $("lg")
};
function ur({ children: e, className: t }) {
	let n = Array.isArray(e) ? e[0] : e, r = sr(n && typeof n == "object" && "props" in n ? n.props?.className : void 0), i = Q(e).replace(/\n$/, "");
	return /* @__PURE__ */ U(Ce, {
		code: i,
		language: r,
		className: "mb-3",
		copyButton: !0
	});
}
function dr({ markdown: t, scale: n = "md", className: r, "data-testid": i = "markdown-view" }) {
	return /* @__PURE__ */ U("div", {
		className: e("min-w-0", r),
		"data-scale": n,
		"data-testid": i,
		children: /* @__PURE__ */ U(ue, {
			remarkPlugins: [de],
			components: lr[n] ?? lr.md,
			children: t
		})
	});
}
//#endregion
//#region src/components/shared/AttachToggle.tsx
function fr({ attached: t, onToggle: n, labels: r = {
	add: "Add",
	added: "Added"
}, size: i = "md", tabIndex: a, className: o, "aria-label": s, "data-testid": c = "attach-toggle" }) {
	return /* @__PURE__ */ W("button", {
		type: "button",
		"aria-pressed": t,
		"aria-label": s,
		tabIndex: a,
		"data-testid": c,
		"data-attached": t || void 0,
		onClick: (e) => {
			e.stopPropagation(), n();
		},
		onKeyDown: (e) => e.stopPropagation(),
		className: e("inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-lg font-medium transition-colors duration-100", "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary", i === "sm" ? "h-7 px-2.5 text-[13px]" : "h-9 px-3 text-[15px]", t ? "border border-transparent bg-primary-bg text-primary-fg hover:border-primary-border" : "border border-border bg-surface text-text-primary hover:bg-surface-hover", o),
		children: [t ? /* @__PURE__ */ U(h, { size: i === "sm" ? 14 : 16 }) : /* @__PURE__ */ U(g, { size: i === "sm" ? 14 : 18 }), t ? r.added : r.add]
	});
}
//#endregion
//#region src/components/shared/DocumentResultList.tsx
function pr(e, t = Date.now()) {
	if (e == null || e === "") return null;
	let n = e instanceof Date ? e.getTime() : typeof e == "number" ? e : Date.parse(e);
	if (!Number.isFinite(n)) return null;
	let r = Math.floor((t - n) / 6e4);
	if (r < 1) return "just now";
	if (r < 60) return `${r}m ago`;
	let i = Math.floor(r / 60);
	if (i < 24) return `${i}h ago`;
	let a = Math.floor(i / 24);
	return a === 1 ? "Yesterday" : a < 7 ? `${a}d ago` : new Date(n).toLocaleDateString(void 0, {
		month: "short",
		day: "numeric"
	});
}
function mr({ items: n, currentId: r, onCurrentChange: i, onOpen: a, onToggleAttach: o, draggable: s = !0, onDragStartItem: c, rowMenu: l, emptyState: u, now: d, toggleLabels: m, "aria-label": h = "Documents", className: g, "data-testid": _ = "document-result-list" }) {
	let v = B(/* @__PURE__ */ new Map()), y = d ?? Date.now(), b = n.some((e) => e.id === r) ? r : n[0]?.id, x = I((e) => {
		let t = n[Math.max(0, Math.min(n.length - 1, e))];
		t && (v.current.get(t.id)?.focus(), i?.(t.id));
	}, [n, i]), S = (e, t, r) => {
		switch (e.key) {
			case "ArrowDown":
				e.preventDefault(), x(t + 1);
				break;
			case "ArrowUp":
				e.preventDefault(), x(t - 1);
				break;
			case "Home":
				e.preventDefault(), x(0);
				break;
			case "End":
				e.preventDefault(), x(n.length - 1);
				break;
			case "Enter":
			case " ": e.preventDefault(), a(r);
		}
	};
	return n.length ? /* @__PURE__ */ U("ul", {
		"aria-label": h,
		"data-testid": _,
		className: e("m-0 flex list-none flex-col p-0", g),
		children: n.map((n, u) => {
			let d = n.id === r, h = n.id === b, g = pr(n.updatedAt, y), _ = l?.(n);
			return /* @__PURE__ */ W("li", {
				"data-testid": "document-result-row",
				"data-id": n.id,
				"data-current": d || void 0,
				className: e("group relative flex items-center gap-4 border-b border-border-subtle pl-4 pr-3 transition-colors duration-100", d ? "bg-primary-bg" : "hover:bg-surface-hover"),
				children: [
					d && /* @__PURE__ */ U("span", {
						"aria-hidden": "true",
						className: "absolute inset-y-0 left-0 w-[3px] rounded-r bg-primary"
					}),
					/* @__PURE__ */ W("div", {
						ref: (e) => {
							e ? v.current.set(n.id, e) : v.current.delete(n.id);
						},
						role: "link",
						tabIndex: h ? 0 : -1,
						"aria-current": d || void 0,
						draggable: s,
						onDragStart: s ? (e) => {
							t(e.dataTransfer, [{
								id: n.id,
								title: n.title,
								kind: n.kind
							}]), c?.(n, e.dataTransfer);
						} : void 0,
						onClick: () => a(n),
						onFocus: () => {
							n.id !== r && i?.(n.id);
						},
						onKeyDown: (e) => S(e, u, n),
						className: "flex min-w-0 flex-1 cursor-pointer items-center gap-[18px] py-2.5 outline-none focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary",
						children: [/* @__PURE__ */ U(re, {
							kind: n.kind,
							variant: "app",
							size: "xl"
						}), /* @__PURE__ */ W("span", {
							className: "flex min-w-0 flex-col gap-0.5",
							children: [
								/* @__PURE__ */ U("span", {
									className: "truncate text-base font-semibold leading-snug text-text-primary",
									children: n.title
								}),
								n.summary && /* @__PURE__ */ U("span", {
									className: "truncate text-[14.5px] leading-snug text-text-secondary",
									children: n.summary
								}),
								(n.folder || g) && /* @__PURE__ */ W("span", {
									className: "flex min-w-0 items-center gap-1.5 text-sm leading-snug text-text-tertiary",
									children: [
										n.folder && /* @__PURE__ */ U(p, {
											size: 15,
											className: "shrink-0"
										}),
										n.folder && /* @__PURE__ */ U("span", {
											className: "truncate",
											children: n.folder
										}),
										n.folder && g && /* @__PURE__ */ U("span", {
											"aria-hidden": "true",
											children: "·"
										}),
										g && /* @__PURE__ */ U("span", {
											className: "shrink-0",
											children: g
										})
									]
								})
							]
						})]
					}),
					o && /* @__PURE__ */ U(fr, {
						attached: !!n.attached,
						onToggle: () => o(n),
						labels: m,
						tabIndex: h ? 0 : -1,
						"aria-label": `${n.attached ? "Remove" : "Add"} ${n.title}`,
						className: e(!n.attached && !d && "opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 focus-visible:opacity-100")
					}),
					_ && _.length > 0 && /* @__PURE__ */ U("span", {
						className: "shrink-0 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100",
						children: /* @__PURE__ */ U(F, {
							trigger: /* @__PURE__ */ U(f, { size: 16 }),
							triggerLabel: `More actions for ${n.title}`,
							triggerTabIndex: h ? 0 : -1,
							triggerClassName: "h-8 w-8 border-none px-0",
							align: "end",
							sections: _,
							"data-testid": "document-result-menu"
						})
					})
				]
			}, n.id);
		})
	}) : /* @__PURE__ */ U(H, { children: u ?? null });
}
//#endregion
//#region src/components/shared/FilePickerButton.tsx
function hr({ onFiles: t, accept: n, multiple: r = !1, variant: i = "secondary", icon: a, disabled: o, children: s, className: c, "aria-label": l, "data-testid": u = "file-picker-button" }) {
	let d = B(null);
	return /* @__PURE__ */ W(H, { children: [/* @__PURE__ */ W("button", {
		type: "button",
		disabled: o,
		"aria-label": l,
		"data-testid": u,
		onClick: () => d.current?.click(),
		className: e("inline-flex h-9 cursor-pointer items-center gap-2 rounded-lg px-3.5 text-[15px] font-medium transition-colors duration-100", "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-50", i === "primary" ? "border-none bg-primary text-on-primary hover:bg-primary-hover" : "border border-border bg-surface text-text-primary hover:bg-surface-hover", c),
		children: [a, s]
	}), /* @__PURE__ */ U("input", {
		ref: d,
		type: "file",
		hidden: !0,
		accept: n,
		multiple: r,
		"data-testid": `${u}-input`,
		onChange: (e) => {
			let n = Array.from(e.target.files ?? []);
			e.target.value = "", n.length && t(n);
		}
	})] });
}
//#endregion
export { vt as $, sn as A, Pt as B, wn as C, mn as D, hn as E, qt as F, kt as G, jt as H, Jt as I, wt as J, Ot as K, Bt as L, an as M, Ut as N, fn as O, Yt as P, yt as Q, It as R, xn as S, vn as T, Mt as U, Nt as V, At as W, xt as X, Ct as Y, bt as Z, On as _, Ae as _t, dr as a, $e as at, Sn as b, Ce as bt, Jn as c, Ye as ct, Qn as d, Ue as dt, pt as et, qn as f, Ve as ft, jn as g, je as gt, Mn as h, Fe as ht, fr as i, tt as it, rn as j, ln as k, Z as l, Je as lt, Nn as m, Pe as mt, mr as n, st as nt, ar as o, Ze as ot, Rn as p, Le as pt, Et as q, pr as r, J as rt, rr as s, Xe as st, hr as t, dt as tt, $n as u, Ge as ut, En as v, ke as vt, yn as w, bn as x, Dn as y, Me as yt, Ft as z };
