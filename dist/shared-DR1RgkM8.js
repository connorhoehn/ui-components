import "./ToastProvider-BqgHlzIs.js";
import { t as e } from "./cn-DhjIN-s0.js";
import "./StatusPill-csAutHMY.js";
import "./Button-CTpms90-.js";
import { t } from "./Card-CcJetqWt.js";
import "./FormField-BqiOU8mh.js";
import "./FileUploadDrop-CpLUJEjW.js";
import "./Banner-BLOg1hC_.js";
import "./Chart-B40fkHgm.js";
import { c as n, n as r, r as i, s as a } from "./tones-DRPja4Vj.js";
import { t as o } from "./Chip-2lIuHwy5.js";
import { t as s } from "./Modal-B75saHcP.js";
import "./ConfirmDialog-Dz8muYP8.js";
import { t as c } from "./EmptyState-CUHf5NYN.js";
import { n as l } from "./PermissionDeniedCard-CbMdNs9F.js";
import { n as u, t as d } from "./CardHeader-pBmYPYUU.js";
import "./SkeletonCard-CGe8XFPB.js";
import { t as f } from "./StatusDot-Bgx2zxgC.js";
import { n as p, t as m } from "./Avatar-u3ZNK9l2.js";
import { n as h } from "./Badge-BYt6cZLc.js";
import { createContext as g, useCallback as _, useContext as v, useEffect as y, useId as b, useLayoutEffect as x, useMemo as S, useRef as C, useState as w } from "react";
import { Fragment as T, jsx as E, jsxs as D } from "react/jsx-runtime";
import { Command as O } from "cmdk";
import { createPortal as k } from "react-dom";
//#region src/components/shared/CodeBlock.tsx
var ee = /* @__PURE__ */ "import.export.from.as.const.let.var.function.return.default.if.else.switch.case.break.new.typeof.instanceof.in.of.interface.type.extends.implements.class.async.await.true.false.null.undefined.this.super.try.catch.finally.throw.for.while.do.continue.public.private.protected.readonly.static.enum".split("."), te = [
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
], A = /* @__PURE__ */ "cd.ls.echo.cat.grep.sed.awk.find.cp.mv.rm.mkdir.rmdir.touch.chmod.chown.pwd.which.npm.yarn.pnpm.npx.git.node.curl.wget".split(".");
function ne(e) {
	return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function re(e, t) {
	let n = e.replace(/(\/\/.*?)(\n|$)/g, `<span style="color:${t.comment}">$1</span>$2`);
	n = n.replace(/(\/\*[\s\S]*?\*\/)/g, `<span style="color:${t.comment}">$1</span>`), n = n.replace(/("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)/g, `<span style="color:${t.string}">$1</span>`);
	let r = RegExp(`\\b(${ee.join("|")})\\b`, "g");
	return n = n.replace(r, `<span style="color:${t.keyword}">$1</span>`), n = n.replace(/\b(\d+(?:\.\d+)?)\b/g, `<span style="color:${t.number}">$1</span>`), n;
}
function ie(e, t) {
	let n = e.replace(/("(?:[^"\\]|\\.)*")(\s*:)/g, `<span style="color:${t.property}">$1</span>$2`);
	return n = n.replace(/("(?:[^"\\]|\\.)*")/g, `<span style="color:${t.string}">$1</span>`), n = n.replace(/\b(true|false|null)\b/g, `<span style="color:${t.keyword}">$1</span>`), n = n.replace(/\b(-?\d+(?:\.\d+)?)\b/g, `<span style="color:${t.number}">$1</span>`), n;
}
function ae(e, t) {
	let n = e.replace(/(#.*?)(\n|$)/g, `<span style="color:${t.comment}">$1</span>$2`);
	n = n.replace(/("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')/g, `<span style="color:${t.string}">$1</span>`);
	let r = RegExp(`\\b(${te.join("|")})\\b`, "g");
	n = n.replace(r, `<span style="color:${t.keyword}">$1</span>`);
	let i = RegExp(`\\b(${A.join("|")})\\b`, "g");
	return n = n.replace(i, `<span style="color:${t.builtin}">$1</span>`), n = n.replace(/(\$\w+|\$\{[^}]+\})/g, `<span style="color:${t.variable}">$1</span>`), n;
}
var oe = {
	comment: "var(--color-neutral)",
	string: "#4ade80",
	keyword: "var(--color-state-pending)",
	number: "#fbbf24",
	property: "#7dd3fc",
	builtin: "#c4b5fd",
	variable: "#fbbf24"
}, se = {
	comment: "var(--color-neutral)",
	string: "#15803d",
	keyword: "var(--color-info-fg)",
	number: "#a16207",
	property: "#0369a1",
	builtin: "var(--color-cat-ai)",
	variable: "#a16207"
};
function ce(e, t, n) {
	let r = n === "dark" ? oe : se, i = ne(e);
	switch (t) {
		case "json": return ie(i, r);
		case "bash":
		case "sh": return ae(i, r);
		case "text": return i;
		default: return re(i, r);
	}
}
function le({ code: t, language: n = "tsx", theme: r = "dark", copyButton: i = !0, showLineNumbers: a = !1, className: o, style: s, "data-testid": c, ariaLabel: l }) {
	let [u, d] = w(!1), f = _(() => {
		typeof navigator > "u" || !navigator.clipboard || navigator.clipboard.writeText(t).then(() => {
			d(!0), setTimeout(() => d(!1), 1500);
		}).catch(() => {});
	}, [t]), p = r === "dark", m = S(() => t.split("\n"), [t]), h = S(() => ce(t, n, r), [
		t,
		n,
		r
	]);
	return /* @__PURE__ */ D("div", {
		"data-testid": c,
		"data-language": n,
		"data-theme": r,
		className: e("relative rounded-lg border font-mono text-[13px] leading-relaxed overflow-hidden", p ? "bg-surface-inverse text-text-inverse border-border-emphasis" : "bg-surface-panel text-text-primary border-border", o),
		style: s,
		"aria-label": l ?? `Code (${n})`,
		children: [i && /* @__PURE__ */ E("button", {
			type: "button",
			onClick: f,
			"aria-label": u ? "Copied" : "Copy code",
			className: e("absolute top-2 right-2 text-[11px] px-2 py-1 rounded border transition-opacity", p ? "bg-surface-inverse text-text-inverse border-border-emphasis hover:bg-neutral" : "bg-white text-text-primary border-border-emphasis hover:bg-surface-hover"),
			"data-copied": u ? "true" : "false",
			children: u ? "Copied" : "Copy"
		}), /* @__PURE__ */ E("pre", {
			className: "m-0 px-4 py-3 overflow-x-auto",
			children: a ? /* @__PURE__ */ D("div", {
				className: "flex",
				children: [/* @__PURE__ */ E("div", {
					className: e("select-none pr-3 text-right", p ? "text-neutral" : "text-text-tertiary"),
					"aria-hidden": "true",
					children: m.map((e, t) => /* @__PURE__ */ E("div", { children: t + 1 }, t))
				}), /* @__PURE__ */ E("code", {
					className: "flex-1 block",
					dangerouslySetInnerHTML: { __html: h }
				})]
			}) : /* @__PURE__ */ E("code", {
				className: "block",
				dangerouslySetInnerHTML: { __html: h }
			})
		})]
	});
}
//#endregion
//#region src/components/shared/CommandPalette.tsx
var ue = "cui:command-palette:recents", de = 5;
function fe(e, t) {
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
function pe(e, t) {
	if (!(!e || typeof window > "u")) try {
		window.localStorage.setItem(e, JSON.stringify(t));
	} catch {}
}
var j = g(null);
function M() {
	let e = v(j);
	if (!e) throw Error("useCommandPalette must be used inside a <CommandPaletteProvider>.");
	return e;
}
function me() {
	let { open: e, close: t, toggle: n, isOpen: r, query: i } = M();
	return {
		open: e,
		close: t,
		toggle: n,
		isOpen: r,
		query: i
	};
}
function N(e, t) {
	let n = t.toLowerCase().split("+").map((e) => e.trim()).filter(Boolean);
	if (n.length === 0) return !1;
	let r = n[n.length - 1], i = new Set(n.slice(0, -1)), a = i.has("cmd") || i.has("meta"), o = i.has("ctrl"), s = i.has("mod"), c = i.has("shift"), l = i.has("alt");
	if (s) {
		if (!e.metaKey && !e.ctrlKey) return !1;
	} else if (a !== e.metaKey || o !== e.ctrlKey) return !1;
	return c !== e.shiftKey || l !== e.altKey ? !1 : e.key.toLowerCase() === r;
}
function P({ commands: e, getDynamicCommands: t, recentsKey: n = ue, recentsLimit: r = de, children: i }) {
	let [a, o] = w(!1), [s, c] = w(""), [l, u] = w(() => /* @__PURE__ */ new Map()), [d, f] = w(() => fe(n, r)), p = _((e) => {
		n !== null && f((t) => {
			let i = [e, ...t.filter((t) => t !== e)].slice(0, r);
			return pe(n, i), i;
		});
	}, [n, r]), m = _(() => o(!0), []), h = _(() => {
		o(!1), c("");
	}, []), g = _(() => o((e) => !e), []), v = _((e) => {
		u((t) => {
			let n = new Map(t);
			return n.set(e.id, e), n;
		});
	}, []), b = _((e) => {
		u((t) => {
			if (!t.has(e)) return t;
			let n = new Map(t);
			return n.delete(e), n;
		});
	}, []);
	y(() => {
		let e = (e) => {
			(e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k" && (e.preventDefault(), o((e) => !e));
		};
		return window.addEventListener("keydown", e, !0), () => window.removeEventListener("keydown", e, !0);
	}, []);
	let x = S(() => {
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
	]), T = C(x);
	T.current = x, y(() => {
		let e = (e) => {
			if (!((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k")) {
				for (let t of T.current) if (t.hotkey && N(e, t.hotkey)) {
					e.preventDefault(), Promise.resolve().then(() => t.run());
					return;
				}
			}
		};
		return window.addEventListener("keydown", e), () => window.removeEventListener("keydown", e);
	}, []);
	let D = {
		open: m,
		close: h,
		toggle: g,
		isOpen: a,
		query: s,
		setQuery: c,
		mergedCommands: x,
		registerCommand: v,
		unregisterCommand: b,
		recents: d,
		noteSelection: p
	};
	return /* @__PURE__ */ E(j.Provider, {
		value: D,
		children: i
	});
}
function F(e) {
	let { registerCommand: t, unregisterCommand: n } = M();
	y(() => (t(e), () => n(e.id)), [
		e,
		t,
		n
	]);
}
function I(e) {
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
function L({ placeholder: t = "Type a command or search…", emptyState: n, className: r } = {}) {
	let { isOpen: i, close: a, query: o, setQuery: c, mergedCommands: l, recents: u, noteSelection: d } = M(), f = S(() => {
		if (o.trim() !== "" || u.length === 0) return [];
		let e = new Map(l.map((e) => [e.id, e]));
		return u.map((t) => e.get(t)).filter((e) => !!e);
	}, [
		l,
		o,
		u
	]), p = S(() => I(l), [l]), m = _((e) => {
		d(e.id), a(), Promise.resolve().then(() => e.run());
	}, [a, d]);
	return /* @__PURE__ */ E(s, {
		open: i,
		onClose: a,
		maxWidth: 640,
		rawChildren: !0,
		backdropTestId: "command-palette-backdrop",
		children: /* @__PURE__ */ D(O, {
			label: "Command palette",
			value: void 0,
			className: e("flex flex-col gap-0 w-full", r),
			"data-testid": "command-palette",
			children: [/* @__PURE__ */ E(O.Input, {
				value: o,
				onValueChange: c,
				placeholder: t,
				"data-autofocus": !0,
				className: e("w-full px-3 py-2.5 text-sm border-0 border-b border-border", "outline-none bg-transparent text-text-primary placeholder:text-text-tertiary"),
				"data-testid": "command-palette-input"
			}), /* @__PURE__ */ D(O.List, {
				className: "max-h-[360px] overflow-y-auto py-2",
				children: [
					/* @__PURE__ */ E(O.Empty, {
						className: "px-3 py-6 text-center text-sm text-text-tertiary",
						children: n ?? "No results."
					}),
					f.length > 0 && /* @__PURE__ */ E(O.Group, {
						heading: "Recent",
						"data-testid": "command-palette-group-recent",
						children: f.map((t) => /* @__PURE__ */ D(O.Item, {
							value: `recent-${t.id} ${t.label}`,
							keywords: t.keywords,
							onSelect: () => m(t),
							"data-testid": `command-palette-recent-${t.id}`,
							className: e("flex items-center gap-2 px-3 py-2 mx-1 rounded-md cursor-pointer text-sm", "text-text-primary aria-selected:bg-surface-hover"),
							children: [t.icon && /* @__PURE__ */ E("span", {
								className: "shrink-0 text-text-secondary",
								children: t.icon
							}), /* @__PURE__ */ E("span", {
								className: "flex-1 truncate",
								children: t.label
							})]
						}, `recent-${t.id}`))
					}),
					p.map(({ groupName: t, items: n }) => /* @__PURE__ */ E(O.Group, {
						heading: t ?? void 0,
						children: n.map((t) => /* @__PURE__ */ D(O.Item, {
							value: `${t.id} ${t.label} ${(t.keywords ?? []).join(" ")}`,
							keywords: t.keywords,
							onSelect: () => m(t),
							"data-testid": `command-palette-item-${t.id}`,
							className: e("flex items-center gap-2 px-3 py-2 mx-1 rounded-md cursor-pointer text-sm", "text-text-primary aria-selected:bg-surface-hover"),
							children: [
								t.icon && /* @__PURE__ */ E("span", {
									className: "shrink-0 text-text-secondary",
									children: t.icon
								}),
								/* @__PURE__ */ E("span", {
									className: "flex-1 truncate",
									children: t.label
								}),
								t.hint && /* @__PURE__ */ E("span", {
									className: "text-xs text-text-tertiary truncate",
									children: t.hint
								}),
								t.shortcut && t.shortcut.length > 0 && /* @__PURE__ */ E("span", {
									className: "flex items-center gap-1 shrink-0",
									children: t.shortcut.map((n, r) => /* @__PURE__ */ E("kbd", {
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
function R({ className: t } = {}) {
	let { toggle: n } = M();
	return /* @__PURE__ */ D("button", {
		type: "button",
		onClick: n,
		"data-testid": "command-palette-hint",
		className: e("inline-flex items-center gap-1.5 px-2 py-1 rounded-md", "text-xs text-text-secondary bg-surface-hover", "border border-border hover:bg-surface-panel", "cursor-pointer transition-colors", t),
		"aria-label": "Open command palette",
		children: [/* @__PURE__ */ E("kbd", {
			className: "font-mono text-[11px]",
			children: "⌘K"
		}), /* @__PURE__ */ E("span", { children: "Search" })]
	});
}
//#endregion
//#region src/components/shared/CapabilityDeniedFallback.tsx
var z = "🔒";
function he({ capabilityName: e, title: t, description: n, actionLabel: r, onAction: i, actions: a, icon: o, testId: s = "capability-denied-fallback" }) {
	let l = t ?? (e ? `${e} is unavailable` : "Feature unavailable"), u = n ?? (e ? `${e} is not enabled for this workspace. Contact your administrator to request access.` : "This feature is not enabled for your account. Contact your administrator to request access.");
	return /* @__PURE__ */ E(c, {
		icon: o === null ? void 0 : o ?? z,
		title: l,
		description: u,
		actionLabel: r,
		onAction: i,
		actions: a,
		testId: s
	});
}
//#endregion
//#region src/components/shared/ErrorState.tsx
function ge({ icon: t = "⚠️", title: n, body: r, description: i, actionLabel: a, onAction: o, action: s, testId: c = "error-state", actionTestId: l = "error-state-action" }) {
	let u = i ?? r;
	return /* @__PURE__ */ D("div", {
		role: "alert",
		"data-testid": c,
		className: e("flex flex-col items-center justify-center min-h-[220px]", "text-text-secondary gap-2 p-8 font-[inherit]"),
		children: [
			t && (typeof t == "string" ? /* @__PURE__ */ E("div", {
				className: "text-[52px] mb-2",
				"aria-hidden": !0,
				children: t
			}) : /* @__PURE__ */ E("div", {
				className: "mb-2",
				children: t
			})),
			/* @__PURE__ */ E("div", {
				className: "text-[17px] font-semibold text-[var(--color-state-error,#dc2626)]",
				children: n
			}),
			u && /* @__PURE__ */ E("div", {
				className: "text-[13px] text-center max-w-[340px] text-text-secondary leading-normal",
				children: u
			}),
			s ? /* @__PURE__ */ E("div", {
				className: "mt-2.5",
				children: s
			}) : a && o && /* @__PURE__ */ E("button", {
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
function _e({ label: t = "Loading…", description: n, spinnerSize: r = "lg", spinnerColor: i, testId: a = "loading-state" }) {
	return /* @__PURE__ */ D("div", {
		role: "status",
		"aria-live": "polite",
		"data-testid": a,
		className: e("flex flex-col items-center justify-center min-h-[220px]", "text-text-secondary gap-3 p-8 font-[inherit]"),
		children: [
			/* @__PURE__ */ E(l, {
				size: r,
				color: i,
				"aria-label": t
			}),
			/* @__PURE__ */ E("div", {
				className: "text-[15px] font-medium text-text-primary",
				children: t
			}),
			n && /* @__PURE__ */ E("div", {
				className: "text-[13px] text-center max-w-[340px] text-text-secondary leading-normal",
				children: n
			})
		]
	});
}
//#endregion
//#region src/components/shared/ShortcutsHelp.tsx
var ve = [
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
function ye({ open: t, onClose: n }) {
	return /* @__PURE__ */ D(s, {
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
			/* @__PURE__ */ E("div", {
				className: "text-base font-semibold text-text-primary mb-2.5",
				children: "Keyboard shortcuts"
			}),
			/* @__PURE__ */ E("div", {
				className: "overflow-y-auto pr-1",
				children: ve.map((t, n) => /* @__PURE__ */ D("div", { children: [/* @__PURE__ */ E("div", {
					className: e("text-[12px] font-bold text-text-primary uppercase tracking-[0.05em] mb-1.5", n === 0 ? "mt-0 pt-0" : "mt-4 pt-1.5 border-t border-border-subtle"),
					children: t.title
				}), /* @__PURE__ */ E("div", { children: t.rows.map((n, r) => /* @__PURE__ */ D("div", {
					className: e("flex items-baseline justify-between py-1 text-[13px] gap-4", n.planned && "opacity-60"),
					"data-planned": n.planned ? "true" : void 0,
					children: [/* @__PURE__ */ E("span", {
						className: e("font-mono text-[12px] border rounded px-1.5 py-px whitespace-nowrap shrink-0", n.planned ? "text-text-tertiary bg-surface border-border-subtle line-through" : "text-text-primary bg-surface-hover border-border"),
						children: n.keys
					}), /* @__PURE__ */ D("span", {
						className: "text-neutral text-right flex-1",
						children: [n.action, n.planned && /* @__PURE__ */ E("span", {
							className: "ml-1.5 text-[10px] uppercase tracking-wide text-text-tertiary",
							children: "planned"
						})]
					})]
				}, `${t.title}-${r}`)) })] }, t.title))
			}),
			/* @__PURE__ */ E("div", {
				className: "flex justify-end mt-[18px]",
				children: /* @__PURE__ */ E("button", {
					onClick: n,
					className: "py-1.5 px-3.5 text-[13px] font-semibold border border-border rounded-md bg-white text-text-primary cursor-pointer font-[inherit]",
					children: "Close"
				})
			})
		]
	});
}
//#endregion
//#region src/components/shared/Tabs.tsx
var be = {
	sm: "px-2.5 py-1 text-xs",
	md: "px-3 py-1.5 text-sm"
};
function xe(e) {
	switch (e) {
		case "underline": return "inline-flex items-center gap-1 border-b border-[var(--color-border)]";
		case "pill": return "inline-flex items-center gap-1";
		case "segmented": return "inline-flex items-center rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-inset,#f8fafc)] p-0.5 gap-0.5";
	}
}
function Se(t, n, r) {
	return t === "underline" ? e("-mb-px border-b-2 rounded-none", n ? "border-[var(--color-primary)] text-[var(--color-text-primary)]" : "border-transparent text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]", r && "opacity-50 cursor-not-allowed hover:text-[var(--color-text-secondary)]") : t === "pill" ? e("rounded-full", n ? "bg-[var(--color-primary)] text-white" : "text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text-primary)]", r && "opacity-50 cursor-not-allowed hover:bg-transparent") : e("rounded-md", n ? "bg-white shadow-sm text-[var(--color-text-primary)] border border-[var(--color-border)]" : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)]", r && "opacity-50 cursor-not-allowed hover:bg-transparent");
}
function Ce({ items: t, value: n, onValueChange: r, variant: i = "underline", size: a = "md", className: o, style: s, "aria-label": c, idPrefix: l }) {
	let u = b(), d = l ?? u, f = C(/* @__PURE__ */ new Map()), p = S(() => t.filter((e) => !e.disabled).map((e) => e.id), [t]), m = _((e) => {
		f.current.get(e)?.focus();
	}, []), h = _((e, t) => {
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
	return /* @__PURE__ */ E("div", {
		role: "tablist",
		"aria-label": c,
		className: e(xe(i), o),
		style: s,
		children: t.map((t) => {
			let o = t.id === n;
			return /* @__PURE__ */ D("button", {
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
				className: e("inline-flex items-center gap-1.5 font-medium transition-colors cursor-pointer", be[a], Se(i, o, !!t.disabled)),
				children: [
					t.icon,
					/* @__PURE__ */ E("span", { children: t.label }),
					t.badge !== void 0 && t.badge !== null && /* @__PURE__ */ E("span", {
						className: e("ml-1 inline-flex items-center justify-center rounded-full px-1.5 min-w-[20px] text-[10px] font-semibold", o && i === "pill" ? "bg-white/20 text-white" : "bg-[var(--color-surface-hover)] text-[var(--color-text-secondary)]"),
						children: t.badge
					})
				]
			}, t.id);
		})
	});
}
function we({ id: e, when: t, idPrefix: n, className: r, style: i, children: a }) {
	return e === t ? /* @__PURE__ */ E("div", {
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
var Te = {
	positive: "text-[var(--color-success)]",
	negative: "text-[var(--color-danger)]",
	neutral: "text-[var(--color-text-secondary)]"
};
function Ee(e) {
	return e.tone ?? (e.direction === "up" ? "positive" : "negative");
}
function De({ label: t, value: n, accent: r = !1, danger: i = !1, hint: a, delta: o, sparklineData: s, to: c, as: l, onClick: d, mono: f = !1, className: p, style: m, "data-testid": h }) {
	let g = e("block rounded-lg border p-3 no-underline transition-colors", !r && !i && "bg-[var(--color-surface)] border-[var(--color-border)]", r && "bg-[var(--color-primary-soft)] border-l-[3px] border-l-[var(--color-primary)] border-[var(--color-border)]", i && "bg-[var(--color-danger-bg)] border-l-[3px] border-l-[var(--color-danger)] border-[var(--color-border)]", (c || d) && "hover:bg-[var(--color-surface-hover)] cursor-pointer", p), _ = s && s.length > 0 ? s : null, v = null;
	if (o) {
		let t = Ee(o), n = o.direction === "up" ? "▲" : "▼", r = o.direction === "up" ? "+" : "-", i = o.suffix ?? "%", a = Math.abs(o.value), s = o["aria-label"] ?? `${o.direction} ${a}${i}`;
		v = /* @__PURE__ */ D("div", {
			"data-testid": "stat-card-delta",
			"data-direction": o.direction,
			"data-tone": t,
			"aria-label": s,
			className: e("mt-1 text-[12px] font-medium leading-tight", Te[t]),
			children: [
				/* @__PURE__ */ D("span", {
					"aria-hidden": "true",
					children: [n, " "]
				}),
				r,
				a,
				i
			]
		});
	}
	let y = /* @__PURE__ */ D(T, { children: [
		/* @__PURE__ */ E("div", {
			className: "text-[12px] uppercase tracking-wide text-[var(--color-text-tertiary)]",
			children: t
		}),
		/* @__PURE__ */ D("div", {
			className: "mt-1 flex items-center gap-2",
			children: [/* @__PURE__ */ E("div", {
				className: e("text-[24px] font-bold leading-tight text-[var(--color-text-primary)]", f && "font-mono"),
				children: n
			}), _ && /* @__PURE__ */ E(u, {
				data: _,
				width: 80,
				height: 20
			})]
		}),
		v,
		a != null && /* @__PURE__ */ E("div", {
			className: "mt-1 text-[11px] italic text-[var(--color-text-tertiary)]",
			children: a
		})
	] });
	return c ? l ? /* @__PURE__ */ E(l, {
		to: c,
		"data-testid": h,
		className: g,
		style: m,
		children: y
	}) : /* @__PURE__ */ E("a", {
		href: c,
		"data-testid": h,
		className: g,
		style: m,
		children: y
	}) : d ? /* @__PURE__ */ E("button", {
		type: "button",
		onClick: d,
		"data-testid": h,
		className: e(g, "w-full text-left"),
		style: m,
		children: y
	}) : /* @__PURE__ */ E("div", {
		"data-testid": h,
		className: g,
		style: m,
		children: y
	});
}
//#endregion
//#region src/components/shared/KPIGrid.tsx
var Oe = {
	1: "sm:grid-cols-1",
	2: "sm:grid-cols-2",
	3: "sm:grid-cols-3",
	4: "sm:grid-cols-4"
};
function ke({ children: t, columns: n = 4, dense: r = !1, className: i, style: a, "data-testid": o = "kpi-grid" }) {
	return /* @__PURE__ */ E("div", {
		"data-testid": o,
		className: e("grid grid-cols-1", Oe[n], r ? "gap-2" : "gap-4", i),
		style: a,
		children: t
	});
}
//#endregion
//#region src/components/shared/ProgressBar.tsx
var Ae = {
	sm: "h-1.5",
	md: "h-2"
};
function je({ value: t, max: n = 100, color: r, size: i = "md", label: a, showRatio: o = !0, className: s, style: c, "data-testid": l, "aria-label": u }) {
	let d = n > 0 ? n : 100, f = Math.max(0, Math.min(t, d)), p = Math.min(100, f / d * 100), m = r ?? "var(--color-primary)";
	return /* @__PURE__ */ D("div", {
		"data-testid": l,
		className: e("w-full", s),
		style: c,
		children: [a != null && /* @__PURE__ */ D("div", {
			className: "flex items-center justify-between mb-1 text-[12px] text-[var(--color-text-secondary)]",
			children: [/* @__PURE__ */ E("span", { children: a }), /* @__PURE__ */ E("span", {
				className: "text-[var(--color-text-tertiary)] tabular-nums",
				children: o ? `${f}/${d}` : `${Math.round(p)}%`
			})]
		}), /* @__PURE__ */ E("div", {
			role: "progressbar",
			"aria-valuenow": f,
			"aria-valuemin": 0,
			"aria-valuemax": d,
			"aria-label": u,
			className: e("w-full rounded-full overflow-hidden bg-[var(--color-surface-hover)]", Ae[i]),
			children: /* @__PURE__ */ E("div", {
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
//#region src/components/shared/PresenceDot.tsx
var Me = {
	online: "var(--color-success, #22c55e)",
	away: "var(--color-state-pending, #f59e0b)",
	busy: "var(--color-state-error, #ef4444)",
	offline: "var(--color-text-tertiary, #94a3b8)",
	unknown: "var(--color-text-tertiary, #94a3b8)"
}, Ne = {
	online: "Online",
	away: "Away",
	busy: "Busy",
	offline: "Offline",
	unknown: "Unknown presence"
};
function B({ state: e, ariaLabel: t, label: n, pulse: r, size: i = "sm", className: a, style: o, title: s, "data-testid": c }) {
	let l = r ?? e === "online", u = t ?? Ne[e];
	return /* @__PURE__ */ E(f, {
		color: Me[e],
		pulse: l,
		size: i,
		label: n,
		className: a,
		style: o,
		title: s,
		"data-testid": c ?? `presence-${e}`,
		"aria-label": u
	});
}
//#endregion
//#region src/components/shared/UserChip.tsx
function Pe({ name: t, label: n, avatarSize: r = 20, avatarColor: i, presence: a, onClick: o, className: s, style: c, title: l, "data-testid": u = "user-chip" }) {
	return /* @__PURE__ */ D(o ? "button" : "span", {
		type: o ? "button" : void 0,
		onClick: o,
		title: l ?? t,
		"data-testid": u,
		className: e("inline-flex items-center gap-1.5 rounded-full px-1.5 py-0.5 text-[12px] text-text-primary", o && "hover:bg-surface-hover cursor-pointer transition-colors", !o && "cursor-default", s),
		style: c,
		children: [
			/* @__PURE__ */ E(m, {
				name: t,
				size: r,
				color: i
			}),
			/* @__PURE__ */ E("span", {
				className: "font-medium leading-none",
				children: n ?? t
			}),
			a && /* @__PURE__ */ E(B, {
				state: a,
				size: "xs"
			})
		]
	});
}
//#endregion
//#region src/components/shared/SegmentedControl.tsx
var Fe = {
	sm: "px-2.5 py-1 text-xs",
	md: "px-3 py-1.5 text-sm"
}, Ie = "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)]", Le = "bg-white shadow-sm text-[var(--color-text-primary)] border border-[var(--color-border)]";
function Re({ options: t, value: n, onChange: r, size: i = "md", className: a }) {
	return /* @__PURE__ */ E("div", {
		role: "group",
		className: e("inline-flex items-center rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-inset,#f8fafc)] p-0.5 gap-0.5", a),
		children: t.map((t) => {
			let a = t.value === n;
			return /* @__PURE__ */ D("button", {
				type: "button",
				onClick: () => r(t.value),
				"aria-pressed": a,
				className: e("inline-flex items-center gap-1.5 rounded-md font-medium transition-all cursor-pointer", Fe[i], a ? Le : Ie),
				children: [t.icon, t.label]
			}, t.value);
		})
	});
}
//#endregion
//#region src/components/shared/EntityCell.tsx
function ze({ label: t, id: n, href: r, mono: i = !1, className: a, labelClassName: o }) {
	let s = /* @__PURE__ */ E("span", {
		className: "truncate",
		children: t
	});
	return /* @__PURE__ */ D("div", {
		className: e("flex flex-col min-w-0", a),
		children: [/* @__PURE__ */ E("div", {
			className: e("font-medium text-[var(--color-text-primary)] truncate text-sm", o),
			children: r ? /* @__PURE__ */ E("a", {
				href: r,
				className: "hover:text-[var(--color-primary)] hover:underline",
				children: s
			}) : s
		}), n && /* @__PURE__ */ E("div", {
			className: e("text-[10px] font-mono text-[var(--color-text-tertiary)] truncate mt-0.5", i && "tracking-tight"),
			children: n
		})]
	});
}
//#endregion
//#region src/components/shared/Drawer.tsx
var Be = [
	"a[href]",
	"button:not([disabled])",
	"input:not([disabled]):not([type=\"hidden\"])",
	"select:not([disabled])",
	"textarea:not([disabled])",
	"[tabindex]:not([tabindex=\"-1\"])",
	"[contenteditable=\"true\"]"
].join(",");
function Ve({ open: t, onClose: n, title: r, subtitle: i, width: a = 460, children: o, footer: s, "data-testid": c }) {
	let l = C(null);
	return y(() => {
		if (!t) return;
		let e = (e) => {
			e.key === "Escape" && n();
		};
		return window.addEventListener("keydown", e), () => window.removeEventListener("keydown", e);
	}, [t, n]), y(() => {
		if (!t) return;
		let e = l.current;
		if (!e) return;
		let n = e.querySelector(Be);
		n ? n.focus() : (e.setAttribute("tabindex", "-1"), e.focus());
	}, [t]), t ? k(/* @__PURE__ */ D("div", {
		className: "fixed inset-0 z-[9000]",
		"data-testid": c,
		children: [/* @__PURE__ */ E("div", {
			className: "absolute inset-0 bg-black/30 backdrop-blur-[1px]",
			onClick: n,
			"aria-hidden": "true"
		}), /* @__PURE__ */ D("aside", {
			ref: l,
			role: "dialog",
			"aria-modal": "true",
			"aria-label": r,
			className: e("absolute right-0 top-0 h-full bg-white shadow-xl flex flex-col", "transition-transform duration-200", t ? "translate-x-0" : "translate-x-full"),
			style: { width: a },
			children: [
				/* @__PURE__ */ D("div", {
					className: "flex items-start justify-between p-5 border-b border-[var(--color-border)] flex-shrink-0",
					children: [/* @__PURE__ */ D("div", {
						className: "min-w-0",
						children: [r && /* @__PURE__ */ E("h2", {
							className: "text-base font-semibold text-[var(--color-text-primary)]",
							children: r
						}), i && /* @__PURE__ */ E("p", {
							className: "text-sm text-[var(--color-text-secondary)] mt-0.5",
							children: i
						})]
					}), /* @__PURE__ */ E("button", {
						type: "button",
						onClick: n,
						className: "ml-4 flex-shrink-0 p-1 rounded hover:bg-[var(--color-surface-hover)] text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] transition-colors",
						"aria-label": "Close",
						children: /* @__PURE__ */ E("svg", {
							width: "16",
							height: "16",
							viewBox: "0 0 16 16",
							fill: "none",
							children: /* @__PURE__ */ E("path", {
								d: "M4 4l8 8M12 4l-8 8",
								stroke: "currentColor",
								strokeWidth: "1.5",
								strokeLinecap: "round"
							})
						})
					})]
				}),
				/* @__PURE__ */ E("div", {
					className: "flex-1 overflow-y-auto p-5",
					children: o
				}),
				s && /* @__PURE__ */ E("div", {
					className: "flex-shrink-0 border-t border-[var(--color-border)] p-4 bg-[var(--color-surface-inset,#f8fafc)]",
					children: s
				})
			]
		})]
	}), document.body) : null;
}
//#endregion
//#region src/components/shared/CollapsibleSection.tsx
function He(e, t) {
	if (!e || typeof window > "u") return t;
	try {
		let n = window.localStorage.getItem(e);
		return n === null ? t : n === "true";
	} catch {
		return t;
	}
}
function Ue({ title: t, defaultOpen: n = !1, badge: r, children: i, className: a, storageKey: o }) {
	let [s, c] = w(() => He(o, n));
	return y(() => {
		if (o && !(typeof window > "u")) try {
			window.localStorage.setItem(o, String(s));
		} catch {}
	}, [s, o]), /* @__PURE__ */ D("div", {
		className: e("border border-[var(--color-border)] rounded-lg overflow-hidden", a),
		children: [/* @__PURE__ */ D("button", {
			type: "button",
			className: "w-full flex items-center justify-between px-4 py-3 bg-[var(--color-surface)] hover:bg-[var(--color-surface-hover)] transition-colors text-left",
			onClick: () => c((e) => !e),
			"aria-expanded": s,
			children: [/* @__PURE__ */ E("span", {
				className: "text-sm font-semibold text-[var(--color-text-primary)]",
				children: t
			}), /* @__PURE__ */ D("div", {
				className: "flex items-center gap-2",
				children: [r, /* @__PURE__ */ E("svg", {
					className: e("w-4 h-4 text-[var(--color-text-tertiary)] transition-transform", s && "rotate-180"),
					viewBox: "0 0 16 16",
					fill: "none",
					"aria-hidden": "true",
					children: /* @__PURE__ */ E("path", {
						d: "M4 6l4 4 4-4",
						stroke: "currentColor",
						strokeWidth: "1.5",
						strokeLinecap: "round",
						strokeLinejoin: "round"
					})
				})]
			})]
		}), s && /* @__PURE__ */ E("div", {
			className: "border-t border-[var(--color-border)] bg-white",
			children: i
		})]
	});
}
//#endregion
//#region src/components/shared/SearchInput.tsx
function We({ value: t, onChange: n, placeholder: r, onClear: i, className: a, style: o, autoFocus: s, "aria-label": c }) {
	return /* @__PURE__ */ D("div", {
		className: e("relative inline-flex items-center", a),
		style: o,
		children: [
			/* @__PURE__ */ D("svg", {
				className: "absolute left-3 w-3.5 h-3.5 text-[var(--color-text-tertiary)] pointer-events-none",
				viewBox: "0 0 16 16",
				fill: "none",
				"aria-hidden": "true",
				children: [/* @__PURE__ */ E("circle", {
					cx: "7",
					cy: "7",
					r: "4.5",
					stroke: "currentColor",
					strokeWidth: "1.5"
				}), /* @__PURE__ */ E("path", {
					d: "M10.5 10.5L14 14",
					stroke: "currentColor",
					strokeWidth: "1.5",
					strokeLinecap: "round"
				})]
			}),
			/* @__PURE__ */ E("input", {
				type: "text",
				value: t,
				onChange: (e) => n(e.target.value),
				placeholder: r ?? "Search…",
				autoFocus: s,
				"aria-label": c,
				className: "w-full pl-8 pr-7 py-1.5 text-sm rounded-md border border-[var(--color-border-field,#d1d5db)] bg-white text-[var(--color-text-primary)] placeholder:text-[var(--color-text-tertiary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] transition-colors"
			}),
			t && /* @__PURE__ */ E("button", {
				type: "button",
				onClick: () => {
					n(""), i?.();
				},
				className: "absolute right-2 p-0.5 rounded text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)]",
				"aria-label": "Clear search",
				children: /* @__PURE__ */ E("svg", {
					width: "12",
					height: "12",
					viewBox: "0 0 12 12",
					fill: "none",
					children: /* @__PURE__ */ E("path", {
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
var Ge = {
	error: "bg-[var(--color-danger-bg,#fef2f2)] border-[var(--color-danger,#dc2626)] text-[var(--color-danger,#dc2626)]",
	success: "bg-[var(--color-success-bg,#f0fdf4)] border-[var(--color-success,#16a34a)] text-[var(--color-success,#16a34a)]",
	info: "bg-[var(--color-info-bg,#eff6ff)] border-[var(--color-info,#2563eb)] text-[var(--color-info,#2563eb)]",
	warning: "bg-[var(--color-warning-bg,#fffbeb)] border-[var(--color-warning,#f59e0b)] text-[var(--color-warning,#f59e0b)]"
};
function Ke({ tone: t, children: n, onDismiss: r, className: i }) {
	return /* @__PURE__ */ D("div", {
		role: t === "error" || t === "warning" ? "alert" : "status",
		"aria-live": t === "error" || t === "warning" ? "assertive" : "polite",
		className: e("flex items-start gap-2 px-3 py-2 rounded-md border-l-[3px] text-sm", Ge[t], i),
		children: [/* @__PURE__ */ E("span", {
			className: "flex-1",
			children: n
		}), r && /* @__PURE__ */ E("button", {
			type: "button",
			onClick: r,
			"aria-label": "Dismiss",
			className: "flex-shrink-0 opacity-70 hover:opacity-100",
			children: "✕"
		})]
	});
}
//#endregion
//#region src/components/shared/PageHeader.tsx
function qe({ title: t, description: n, actions: r, back: i, badge: a, className: o }) {
	return /* @__PURE__ */ D("div", {
		className: e("flex flex-col gap-1.5", o),
		children: [
			i && /* @__PURE__ */ D("a", {
				href: i.to,
				onClick: i.onClick,
				className: "inline-flex items-center gap-1 text-xs text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] mb-1 w-fit",
				children: [/* @__PURE__ */ E("svg", {
					width: "12",
					height: "12",
					viewBox: "0 0 12 12",
					fill: "none",
					"aria-hidden": "true",
					children: /* @__PURE__ */ E("path", {
						d: "M7 2L3 6l4 4",
						stroke: "currentColor",
						strokeWidth: "1.5",
						strokeLinecap: "round",
						strokeLinejoin: "round"
					})
				}), i.label]
			}),
			/* @__PURE__ */ D("div", {
				className: "flex items-center justify-between gap-4",
				children: [/* @__PURE__ */ D("div", {
					className: "min-w-0 flex items-center gap-2.5",
					children: [/* @__PURE__ */ E("h1", {
						className: "text-xl font-semibold text-[var(--color-text-primary)] leading-tight",
						children: t
					}), a]
				}), r && /* @__PURE__ */ E("div", {
					className: "flex-shrink-0 flex items-center gap-2",
					children: r
				})]
			}),
			n && /* @__PURE__ */ E("p", {
				className: "text-sm text-[var(--color-text-secondary)]",
				children: n
			})
		]
	});
}
//#endregion
//#region src/components/shared/ThinkingDots.tsx
function V({ size: t = "md", color: n, className: r }) {
	let i = t === "sm" ? 4 : 6, a = n || "var(--color-text-tertiary, #94a3b8)";
	return /* @__PURE__ */ D(T, { children: [/* @__PURE__ */ E("style", { children: "\n        @keyframes thinkDot {\n          0%, 80%, 100% { transform: scale(1); opacity: 0.4; }\n          40% { transform: scale(1.3); opacity: 1; }\n        }\n      " }), /* @__PURE__ */ E("span", {
		className: e("inline-flex items-center gap-1", r),
		children: [
			0,
			1,
			2
		].map((e) => /* @__PURE__ */ E("span", { style: {
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
function H(e) {
	if (e.length === 0) return "";
	if (e.length === 1) return `${e[0]} is typing…`;
	if (e.length === 2) return `${e[0]} and ${e[1]} are typing…`;
	let t = e.length - 2;
	return `${e[0]}, ${e[1]} and ${t} other${t > 1 ? "s" : ""} are typing…`;
}
function Je({ names: t, compact: n = !1, color: r, size: i = "sm", className: a, "data-testid": o = "typing-indicator" }) {
	return t.length === 0 ? null : /* @__PURE__ */ D("span", {
		role: "status",
		"aria-live": "polite",
		"data-testid": o,
		className: e("inline-flex items-center gap-1.5 text-[12px] text-text-tertiary", a),
		children: [/* @__PURE__ */ E(V, {
			size: i,
			color: r
		}), !n && /* @__PURE__ */ E("span", { children: H(t) })]
	});
}
//#endregion
//#region src/components/shared/LogStream.tsx
var U = {
	debug: "DEBUG",
	info: "INFO",
	warn: "WARN",
	error: "ERROR"
}, Ye = {
	debug: "text-[var(--color-text-tertiary)]",
	info: "text-[var(--color-info,#3b82f6)]",
	warn: "text-[var(--color-warning,#d97706)]",
	error: "text-[var(--color-danger,#dc2626)]"
};
function W({ lines: n, follow: r = !0, showTimestamp: i = !0, showLevel: a = !0, showSource: o = !0, title: s = "Log stream", headerSlot: c, emptyMessage: l = "No log lines yet.", maxHeight: u, onClear: f, className: p, style: m, "data-testid": h = "log-stream" }) {
	let g = C(null), [_, v] = w(!1);
	y(() => {
		if (!r || _) return;
		let e = g.current;
		e && (e.scrollTop = e.scrollHeight);
	}, [
		n,
		r,
		_
	]);
	let b = () => {
		let e = g.current;
		if (!e) return;
		let t = e.scrollHeight - e.scrollTop - e.clientHeight < 24;
		v(!t);
	}, x = () => {
		let e = g.current;
		e && (e.scrollTop = e.scrollHeight, v(!1));
	}, S = /* @__PURE__ */ D("div", {
		className: "flex items-center gap-2",
		children: [/* @__PURE__ */ D("span", {
			className: "text-[10px] text-[var(--color-text-tertiary)]",
			"data-testid": `${h}-count`,
			children: [
				n.length,
				" ",
				n.length === 1 ? "line" : "lines"
			]
		}), f && /* @__PURE__ */ E("button", {
			type: "button",
			onClick: f,
			"data-testid": `${h}-clear`,
			className: e("text-[10px] uppercase tracking-wide", "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]", "border border-[var(--color-border)] rounded px-1.5 py-0.5", "cursor-pointer bg-transparent"),
			children: "Clear"
		})]
	});
	return /* @__PURE__ */ D(t, {
		"data-testid": h,
		className: e("flex flex-col", p),
		style: m,
		children: [s !== null && /* @__PURE__ */ E("div", {
			className: "px-4 py-3 border-b border-[var(--color-border)]",
			children: /* @__PURE__ */ E(d, {
				title: s,
				meta: c ?? S
			})
		}), /* @__PURE__ */ D("div", {
			className: "relative flex-1 min-h-0 flex",
			children: [/* @__PURE__ */ E("div", {
				ref: g,
				onScroll: b,
				role: "log",
				"aria-live": r ? "polite" : "off",
				"data-testid": `${h}-scroll`,
				className: e("flex-1 overflow-y-auto", "font-mono text-[12px] leading-[1.55]", "bg-[var(--color-surface-subtle,#0b1020)] text-[var(--color-text-primary,#e5e7eb)]", "py-2"),
				style: { maxHeight: u },
				children: n.length === 0 ? /* @__PURE__ */ E("div", {
					"data-testid": `${h}-empty`,
					className: "px-3 py-6 text-center text-[11px] text-[var(--color-text-tertiary)]",
					children: l
				}) : n.map((t) => {
					let n = t.level ?? "info";
					return /* @__PURE__ */ D("div", {
						role: "listitem",
						"data-testid": `${h}-line`,
						"data-level": t.level || void 0,
						className: "flex items-baseline gap-2 px-3 hover:bg-[var(--color-surface,rgba(255,255,255,0.04))]",
						children: [
							i && t.timestamp && /* @__PURE__ */ E("span", {
								className: "shrink-0 text-[var(--color-text-tertiary)] tabular-nums",
								children: t.timestamp
							}),
							a && t.level && /* @__PURE__ */ E("span", {
								className: e("shrink-0 font-semibold uppercase text-[10px] w-[44px]", Ye[n]),
								"aria-label": `level ${U[n].toLowerCase()}`,
								children: U[n]
							}),
							o && t.source && /* @__PURE__ */ D("span", {
								className: "shrink-0 text-[var(--color-text-secondary)]",
								children: [
									"[",
									t.source,
									"]"
								]
							}),
							/* @__PURE__ */ E("span", {
								className: "flex-1 whitespace-pre-wrap break-words",
								children: t.message
							})
						]
					}, t.id);
				})
			}), r && _ && /* @__PURE__ */ E("button", {
				type: "button",
				"data-testid": `${h}-jump`,
				onClick: x,
				className: e("absolute bottom-3 left-1/2 -translate-x-1/2", "px-3 py-1 text-[10px] font-semibold uppercase tracking-wide", "bg-primary text-white rounded-full border-none cursor-pointer", "shadow-[0_2px_8px_rgba(0,0,0,0.25)]"),
				children: "Jump to live ↓"
			})]
		})]
	});
}
var Xe = W;
//#endregion
//#region src/components/shared/ThumbnailCard.tsx
function Ze({ title: t, description: n, category: r, categoryTone: i = "neutral", thumbnail: a, icon: s = "🧩", thumbnailHeight: c = 160, href: l, onClick: u, badge: d, meta: f, className: p, style: m, "data-testid": h = "thumbnail-card" }) {
	let g = e("group block w-full text-left bg-[var(--color-surface,#fff)]", "rounded-xl border border-[var(--color-border)] overflow-hidden", "transition-[box-shadow,transform] duration-150", (l || u) && "cursor-pointer hover:shadow-[0_8px_25px_rgba(0,0,0,0.08)] hover:-translate-y-0.5", p), _ = /* @__PURE__ */ D(T, { children: [/* @__PURE__ */ D("div", {
		"data-testid": `${h}-thumb`,
		className: e("relative flex items-center justify-center", "bg-gradient-to-br from-[var(--color-primary-bg,#eef2ff)] to-[var(--color-surface,#ffffff)]", "border-b border-[var(--color-border)]"),
		style: { height: c },
		children: [a ? /* @__PURE__ */ E("img", {
			src: a,
			alt: "",
			className: "w-full h-full object-cover"
		}) : /* @__PURE__ */ E("span", {
			className: "text-5xl opacity-50",
			"aria-hidden": !0,
			children: s
		}), d && /* @__PURE__ */ E("span", {
			"data-testid": `${h}-badge`,
			className: "absolute top-2 right-2",
			children: d
		})]
	}), /* @__PURE__ */ D("div", {
		className: "px-4 py-3",
		children: [
			/* @__PURE__ */ D("div", {
				className: "flex items-center gap-2 mb-1.5",
				children: [r && /* @__PURE__ */ E(o, {
					tone: i,
					size: "xs",
					"data-testid": `${h}-category`,
					children: r
				}), f && /* @__PURE__ */ E("span", {
					className: "ml-auto",
					children: f
				})]
			}),
			/* @__PURE__ */ E("div", {
				className: "text-[14px] font-semibold text-[var(--color-text-primary)] leading-snug",
				children: t
			}),
			n && /* @__PURE__ */ E("div", {
				className: "mt-1 text-[12px] text-[var(--color-text-secondary)] leading-snug",
				children: n
			})
		]
	})] });
	return l ? /* @__PURE__ */ E("a", {
		href: l,
		onClick: u,
		"data-testid": h,
		className: e(g, "no-underline text-inherit"),
		style: m,
		children: _
	}) : u ? /* @__PURE__ */ E("button", {
		type: "button",
		onClick: u,
		"data-testid": h,
		className: e(g, "font-inherit"),
		style: m,
		children: _
	}) : /* @__PURE__ */ E("div", {
		"data-testid": h,
		className: g,
		style: m,
		children: _
	});
}
//#endregion
//#region src/components/shared/CatalogGrid.tsx
var Qe = {
	1: "sm:grid-cols-1",
	2: "sm:grid-cols-2",
	3: "sm:grid-cols-2 lg:grid-cols-3",
	4: "sm:grid-cols-2 lg:grid-cols-4",
	5: "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
};
function $e({ children: t, columns: n = 3, dense: r = !1, className: i, style: a, "data-testid": o = "catalog-grid" }) {
	return /* @__PURE__ */ E("div", {
		"data-testid": o,
		"data-columns": n,
		className: e("grid grid-cols-1", Qe[n], r ? "gap-3" : "gap-5", i),
		style: a,
		children: t
	});
}
//#endregion
//#region src/components/shared/StackDiagram.tsx
function et({ orientation: t, variant: n }) {
	if (n === "none") return null;
	let r = t === "vertical", i = n === "arrow" ? r ? "↓" : "→" : r ? "│" : "─";
	return /* @__PURE__ */ E("div", {
		"data-testid": "stack-diagram-connector",
		"aria-hidden": !0,
		className: e("flex items-center justify-center text-[var(--color-text-tertiary)]", r ? "h-5 text-base" : "w-5 text-base"),
		children: i
	});
}
function G({ layers: t, orientation: o = "vertical", connector: s = "arrow", className: c, style: l, "data-testid": u = "stack-diagram" }) {
	let d = o === "vertical";
	return /* @__PURE__ */ E("div", {
		"data-testid": u,
		"data-orientation": o,
		"data-connector": s,
		className: e("flex", d ? "flex-col items-stretch" : "flex-row items-stretch flex-wrap", c),
		style: l,
		children: t.map((c, l) => {
			let u = n(c.tone ?? "neutral");
			return /* @__PURE__ */ D("div", {
				className: e("flex", "flex-col"),
				children: [/* @__PURE__ */ D("div", {
					"data-testid": "stack-diagram-layer",
					"data-tone": u,
					className: e("rounded-md border px-3 py-2", r[u], i[u], !d && "min-w-[140px]"),
					children: [/* @__PURE__ */ D("div", {
						className: "flex items-center gap-2",
						children: [
							c.icon != null && /* @__PURE__ */ E("span", {
								className: "shrink-0 text-[14px] leading-none",
								"aria-hidden": !0,
								children: c.icon
							}),
							/* @__PURE__ */ E("span", {
								className: e("text-[12px] font-semibold", a[u]),
								children: c.label
							}),
							c.meta != null && /* @__PURE__ */ E("span", {
								className: "ml-auto text-[10px] text-[var(--color-text-tertiary)] shrink-0",
								children: c.meta
							})
						]
					}), c.description != null && /* @__PURE__ */ E("div", {
						className: "mt-0.5 text-[11px] leading-snug text-[var(--color-text-secondary)]",
						children: c.description
					})]
				}), l < t.length - 1 && /* @__PURE__ */ E(et, {
					orientation: o,
					variant: s
				})]
			}, c.id);
		})
	});
}
var tt = G;
//#endregion
//#region src/components/shared/ChatComposer.tsx
function nt({ value: t, onChange: n, onSubmit: r, disabled: i = !1, multiline: a = !1, placeholder: o, submitLabel: s = "→", className: c, style: l, autoFocus: u, maxRows: d = 4 }) {
	let f = !i && t.trim().length > 0, p = () => {
		f && r();
	}, m = (e) => {
		if (e.key === "Enter") {
			if (a && e.shiftKey) return;
			e.preventDefault(), p();
		}
	}, h = e("flex-1 px-3 py-2 text-sm rounded-lg border border-[var(--color-border-field,#d1d5db)] bg-white text-[var(--color-text-primary)]", "placeholder:text-[var(--color-text-tertiary)]", "focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent", "resize-none", i && "opacity-50 cursor-not-allowed bg-[var(--color-surface-hover)]");
	return /* @__PURE__ */ D("div", {
		className: e("flex items-end gap-2 p-3 border-t border-[var(--color-border)] bg-[var(--color-surface)]", c),
		style: l,
		children: [a ? /* @__PURE__ */ E("textarea", {
			className: h,
			value: t,
			onChange: (e) => n(e.target.value),
			onKeyDown: m,
			disabled: i,
			placeholder: o,
			autoFocus: u,
			rows: 2,
			style: {
				maxHeight: `${d * 1.5 + 1}rem`,
				overflowY: "auto"
			}
		}) : /* @__PURE__ */ E("input", {
			type: "text",
			className: h,
			value: t,
			onChange: (e) => n(e.target.value),
			onKeyDown: m,
			disabled: i,
			placeholder: o,
			autoFocus: u
		}), /* @__PURE__ */ E("button", {
			type: "button",
			onClick: p,
			disabled: !f,
			className: e("px-3 py-2 rounded-lg text-sm font-semibold transition-colors flex-shrink-0", f ? "bg-[var(--color-primary)] text-white hover:opacity-90" : "bg-[var(--color-surface-hover)] text-[var(--color-text-tertiary)] cursor-not-allowed"),
			children: s
		})]
	});
}
//#endregion
//#region src/components/shared/ToolCallStrip.tsx
function K({ name: t, done: n, className: r }) {
	return /* @__PURE__ */ D("span", {
		className: e("inline-flex items-center gap-1 text-[10.5px] font-mono px-2 py-0.5 rounded-full", n ? "bg-[var(--color-success-bg,#f0fdf4)] text-[var(--color-success,#16a34a)]" : "bg-[var(--color-info-bg,#eff6ff)] text-[var(--color-info,#1d4ed8)]", r),
		children: [t, n ? " ✓" : "…"]
	});
}
function q({ toolCalls: t, className: n }) {
	return /* @__PURE__ */ E("div", {
		className: e("flex flex-wrap gap-1.5 py-1", n),
		children: t.map((e) => /* @__PURE__ */ E(K, {
			name: e.name,
			done: e.done
		}, e.id))
	});
}
//#endregion
//#region src/components/shared/MessageBubble.tsx
function rt({ role: t, content: n, toolCalls: r, streaming: i = !1, agentName: a, userName: o, renderMarkdown: s, className: c }) {
	let l = t === "user" ? o || "You" : a || "Assistant";
	return /* @__PURE__ */ D("div", {
		className: e("flex flex-col gap-1.5 py-3", c),
		children: [
			/* @__PURE__ */ E("div", {
				className: "text-[11px] font-semibold uppercase tracking-wide text-[var(--color-text-tertiary)]",
				children: l
			}),
			r && r.length > 0 && /* @__PURE__ */ E(q, { toolCalls: r }),
			t === "user" ? /* @__PURE__ */ E("div", {
				className: "text-sm text-[var(--color-text-primary)] whitespace-pre-wrap",
				children: n
			}) : /* @__PURE__ */ E("div", {
				className: "text-sm text-[var(--color-text-primary)] prose-sm max-w-none",
				children: n ? s ? s(n) : /* @__PURE__ */ E("span", {
					className: "whitespace-pre-wrap",
					children: n
				}) : i ? /* @__PURE__ */ E(V, {}) : null
			})
		]
	});
}
//#endregion
//#region src/components/shared/ThinkingBlock.tsx
function it({ content: t, streaming: n = !1, defaultOpen: r = !1, className: i }) {
	let a = n || !t ? "Thinking" : "Thought";
	return /* @__PURE__ */ D("details", {
		open: r,
		className: e("rounded-md border border-[var(--color-border)] overflow-hidden text-sm group", i),
		children: [/* @__PURE__ */ D("summary", {
			className: "flex items-center gap-2 px-3 py-2 cursor-pointer select-none bg-[var(--color-surface)] hover:bg-[var(--color-surface-hover)] text-[var(--color-text-tertiary)] list-none",
			children: [
				/* @__PURE__ */ E("svg", {
					className: "w-3.5 h-3.5 transition-transform group-open:rotate-90",
					xmlns: "http://www.w3.org/2000/svg",
					viewBox: "0 0 20 20",
					fill: "currentColor",
					"aria-hidden": "true",
					children: /* @__PURE__ */ E("path", {
						fillRule: "evenodd",
						d: "M7.21 14.77a.75.75 0 010-1.06L10.94 10 7.21 6.29a.75.75 0 011.08-1.04l4.25 4.25a.75.75 0 010 1.06l-4.25 4.25a.75.75 0 01-1.08-.04z",
						clipRule: "evenodd"
					})
				}),
				/* @__PURE__ */ E("span", {
					className: "text-[11px] font-semibold uppercase tracking-wide",
					children: a
				}),
				n && !t && /* @__PURE__ */ E(V, { size: "sm" })
			]
		}), /* @__PURE__ */ E("div", {
			className: "px-3 py-2 text-xs text-[var(--color-text-secondary)] italic border-t border-[var(--color-border)] bg-white whitespace-pre-wrap leading-relaxed",
			children: t || /* @__PURE__ */ E(V, {})
		})]
	});
}
//#endregion
//#region src/components/shared/QuickPromptGrid.tsx
function at({ prompts: t, onSelect: n, columns: r, title: i, className: a }) {
	let o = r ? `repeat(${r}, minmax(0, 1fr))` : "repeat(auto-fit, minmax(220px, 1fr))";
	return /* @__PURE__ */ D("div", {
		className: e("flex flex-col gap-3", a),
		children: [i && /* @__PURE__ */ E("p", {
			className: "text-xs font-semibold uppercase tracking-wide text-[var(--color-text-tertiary)] text-center",
			children: i
		}), /* @__PURE__ */ E("div", {
			style: {
				display: "grid",
				gridTemplateColumns: o,
				gap: 10
			},
			children: t.map((e, t) => /* @__PURE__ */ D("button", {
				type: "button",
				onClick: () => n(e.label),
				className: "flex flex-col gap-1 px-4 py-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] hover:bg-[var(--color-surface-hover)] hover:border-[var(--color-border-emphasis,#cbd5e1)] text-left transition-colors",
				children: [/* @__PURE__ */ E("span", {
					className: "text-sm font-medium text-[var(--color-text-primary)]",
					children: e.label
				}), e.hint && /* @__PURE__ */ E("span", {
					className: "text-xs text-[var(--color-text-tertiary)]",
					children: e.hint
				})]
			}, t))
		})]
	});
}
//#endregion
//#region src/components/shared/FollowUpChips.tsx
function ot({ suggestions: t, onSelect: n, onRefresh: r, label: i, className: a }) {
	return /* @__PURE__ */ D("div", {
		className: e("flex items-center flex-wrap gap-1.5 py-2", a),
		children: [
			i && /* @__PURE__ */ E("span", {
				className: "text-xs text-[var(--color-text-tertiary)] mr-1",
				children: i
			}),
			t.map((e, t) => /* @__PURE__ */ E("button", {
				type: "button",
				onClick: () => n(e),
				className: "inline-flex items-center px-3 py-1 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] text-xs text-[var(--color-text-secondary)] hover:bg-[var(--color-primary)] hover:text-white hover:border-[var(--color-primary)] transition-colors",
				children: e
			}, t)),
			r && /* @__PURE__ */ E("button", {
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
function st({ name: t, memberCount: n, description: r, actions: i, avatarUrl: a, online: o, onMembersClick: s, className: c }) {
	return /* @__PURE__ */ D("div", {
		className: e("flex items-center justify-between gap-4 px-6 py-3", "border-b border-[var(--color-border)] bg-[var(--color-surface)]", c),
		children: [/* @__PURE__ */ D("div", {
			className: "flex items-center gap-3 min-w-0",
			children: [/* @__PURE__ */ D("div", {
				className: "relative shrink-0",
				children: [a ? /* @__PURE__ */ E("img", {
					src: a,
					alt: t,
					className: "w-9 h-9 rounded-full object-cover"
				}) : /* @__PURE__ */ E(m, {
					name: t,
					size: 36
				}), o !== void 0 && /* @__PURE__ */ E("span", {
					className: "absolute -bottom-0.5 -right-0.5",
					children: /* @__PURE__ */ E(f, {
						color: o ? "var(--color-success)" : "var(--color-text-tertiary)",
						size: "sm",
						"aria-label": o ? "Online" : "Offline"
					})
				})]
			}), /* @__PURE__ */ D("div", {
				className: "min-w-0 flex flex-col gap-0.5",
				children: [/* @__PURE__ */ D("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ E("h2", {
						className: "text-[15px] font-semibold text-[var(--color-text-primary)] leading-tight truncate",
						children: t
					}), n !== void 0 && /* @__PURE__ */ D("button", {
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
				}), r && /* @__PURE__ */ E("p", {
					className: "text-[12px] text-[var(--color-text-tertiary)] truncate leading-tight",
					children: r
				})]
			})]
		}), i && /* @__PURE__ */ E("div", {
			className: "flex items-center gap-2 shrink-0",
			children: i
		})]
	});
}
//#endregion
//#region src/components/shared/UserMenu.tsx
function ct({ user: t, items: n, className: r, "data-testid": i }) {
	let [a, o] = w(!1), s = C(null), c = _(() => o(!1), []);
	return y(() => {
		if (!a) return;
		let e = (e) => {
			s.current && !s.current.contains(e.target) && c();
		};
		return document.addEventListener("mousedown", e), () => document.removeEventListener("mousedown", e);
	}, [a, c]), y(() => {
		if (!a) return;
		let e = (e) => {
			e.key === "Escape" && c();
		};
		return document.addEventListener("keydown", e), () => document.removeEventListener("keydown", e);
	}, [a, c]), /* @__PURE__ */ D("div", {
		ref: s,
		"data-testid": i,
		className: e("relative inline-block", r),
		children: [/* @__PURE__ */ D("button", {
			type: "button",
			"aria-label": `User menu for ${t.name}`,
			"aria-expanded": a,
			"aria-haspopup": "menu",
			onClick: () => o((e) => !e),
			className: e("flex items-center gap-2 bg-transparent border-none cursor-pointer p-1 rounded-lg", "hover:bg-[var(--color-surface-hover)] transition-colors duration-100", a && "bg-[var(--color-surface-hover)]"),
			children: [
				t.avatarUrl ? /* @__PURE__ */ E("img", {
					src: t.avatarUrl,
					alt: t.name,
					className: "w-8 h-8 rounded-full object-cover"
				}) : /* @__PURE__ */ E(m, {
					name: t.name,
					size: 32
				}),
				/* @__PURE__ */ D("div", {
					className: "flex flex-col items-start text-left min-w-0 hidden sm:flex",
					children: [/* @__PURE__ */ E("span", {
						className: "text-sm font-medium text-[var(--color-text-primary)] leading-tight truncate max-w-[120px]",
						children: t.name
					}), /* @__PURE__ */ E("span", {
						className: "text-xs text-[var(--color-text-tertiary)] leading-tight truncate max-w-[120px]",
						children: t.email
					})]
				}),
				/* @__PURE__ */ E("svg", {
					width: "12",
					height: "12",
					viewBox: "0 0 12 12",
					fill: "none",
					"aria-hidden": "true",
					className: e("text-[var(--color-text-tertiary)] transition-transform duration-150", a ? "rotate-180" : "rotate-0"),
					children: /* @__PURE__ */ E("path", {
						d: "M2 4l4 4 4-4",
						stroke: "currentColor",
						strokeWidth: "1.5",
						strokeLinecap: "round",
						strokeLinejoin: "round"
					})
				})
			]
		}), a && /* @__PURE__ */ D("div", {
			role: "menu",
			"aria-label": "User menu",
			className: e("absolute right-0 top-[calc(100%+6px)] min-w-[200px] z-[200]", "bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl shadow-md overflow-hidden"),
			children: [/* @__PURE__ */ D("div", {
				className: "px-3 py-2.5 border-b border-[var(--color-border)]",
				children: [/* @__PURE__ */ E("p", {
					className: "text-sm font-semibold text-[var(--color-text-primary)] truncate",
					children: t.name
				}), /* @__PURE__ */ E("p", {
					className: "text-xs text-[var(--color-text-tertiary)] truncate",
					children: t.email
				})]
			}), /* @__PURE__ */ E("div", {
				className: "py-1",
				children: n.map((t, n) => /* @__PURE__ */ D("div", { children: [t.separator && n > 0 && /* @__PURE__ */ E("div", { className: "my-1 border-t border-[var(--color-border)]" }), /* @__PURE__ */ D("button", {
					type: "button",
					role: "menuitem",
					onClick: () => {
						t.onClick(), c();
					},
					className: e("flex items-center gap-2.5 w-full text-left px-3 py-2", "text-sm border-none cursor-pointer font-[inherit] transition-colors duration-100", t.danger ? "text-danger-fg bg-transparent hover:bg-danger-bg" : "text-[var(--color-text-primary)] bg-transparent hover:bg-[var(--color-surface-hover)]"),
					children: [t.icon && /* @__PURE__ */ E("span", {
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
function lt({ item: t, isLast: n }) {
	let r = e("text-sm leading-snug transition-colors duration-100", n ? "text-[var(--color-text-primary)] font-medium cursor-default" : "text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] font-normal");
	return n || !t.href && !t.onClick ? /* @__PURE__ */ E("span", {
		className: r,
		"aria-current": n ? "page" : void 0,
		children: t.label
	}) : t.href ? /* @__PURE__ */ E("a", {
		href: t.href,
		onClick: t.onClick,
		className: e(r, "no-underline"),
		children: t.label
	}) : /* @__PURE__ */ E("button", {
		type: "button",
		onClick: t.onClick,
		className: e(r, "border-none bg-transparent cursor-pointer font-[inherit] p-0"),
		children: t.label
	});
}
function ut(e, t) {
	if (e.length <= t) return e;
	let n = e.slice(0, 1), r = e.slice(-(t - 2 > 0 ? t - 2 : 1));
	return [
		...n,
		null,
		...r
	];
}
function dt({ items: t, separator: n = "/", maxItems: r, className: i, "data-testid": a }) {
	if (t.length === 0) return null;
	let o = r == null ? t : ut(t, r);
	return /* @__PURE__ */ E("nav", {
		"aria-label": "Breadcrumb",
		"data-testid": a,
		className: e("flex items-center", i),
		children: /* @__PURE__ */ E("ol", {
			className: "flex items-center gap-1 flex-wrap list-none m-0 p-0",
			children: o.map((e, t) => {
				let r = t === o.length - 1;
				return /* @__PURE__ */ D("li", {
					className: "flex items-center gap-1",
					children: [e === null ? /* @__PURE__ */ E("span", {
						className: "text-sm text-[var(--color-text-tertiary)] select-none",
						"aria-label": "More items",
						title: "Some items are hidden",
						children: "…"
					}) : /* @__PURE__ */ E(lt, {
						item: e,
						isLast: r
					}), !r && /* @__PURE__ */ E("span", {
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
var ft = {
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
}, pt = {
	bg: "var(--color-surface-hover)",
	border: "var(--color-border-field)",
	text: "var(--color-text-primary)",
	accent: "var(--color-neutral)"
};
function mt({ status: e, colors: t }) {
	return /* @__PURE__ */ D("span", {
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
		children: [/* @__PURE__ */ E("span", { style: {
			width: 5,
			height: 5,
			borderRadius: "50%",
			background: t.accent
		} }), e.replace(/_/g, " ")]
	});
}
function ht({ name: e, id: t, status: n, statusColors: r, contributorNames: i = [], contributorCount: a, activityItems: o = [], presenceDotColor: s = "var(--color-border-field)", activityLabel: c = "", cardIndex: l = 0, onClick: u, className: d, style: f, minHeight: m = 190 }) {
	let g = {
		...ft,
		...r
	}[(n ?? "unknown").toLowerCase().replace(/ /g, "_")] ?? pt, _ = a === void 0 ? 0 : Math.max(0, a - i.length), v = l % 8 * 525;
	return /* @__PURE__ */ D("button", {
		type: "button",
		onClick: u,
		className: d,
		style: {
			background: "#fff",
			border: "1.5px solid #e5e7eb",
			borderTop: `3px solid ${g.accent}`,
			borderRadius: 10,
			padding: "14px 16px 12px",
			cursor: "pointer",
			display: "flex",
			flexDirection: "column",
			gap: 10,
			transition: "box-shadow 0.15s, transform 0.1s",
			minHeight: m,
			width: "100%",
			textAlign: "left",
			font: "inherit",
			color: "inherit",
			...f
		},
		onMouseEnter: (e) => {
			let t = e.currentTarget;
			t.style.boxShadow = "0 4px 16px rgba(0,0,0,0.08)", t.style.transform = "translateY(-1px)", t.style.borderColor = g.border;
		},
		onMouseLeave: (e) => {
			let t = e.currentTarget;
			t.style.boxShadow = "none", t.style.transform = "none", t.style.borderColor = "var(--color-border)";
		},
		children: [
			/* @__PURE__ */ D("div", {
				style: {
					display: "flex",
					alignItems: "flex-start",
					justifyContent: "space-between",
					gap: 8
				},
				children: [/* @__PURE__ */ D("div", {
					style: {
						flex: 1,
						minWidth: 0
					},
					children: [/* @__PURE__ */ E("h3", {
						style: {
							margin: "0 0 3px",
							fontSize: 13.5,
							fontWeight: 700,
							color: "#111827",
							lineHeight: 1.35
						},
						children: e
					}), t && /* @__PURE__ */ E("span", {
						style: {
							fontSize: 10,
							fontFamily: "ui-monospace, \"SFMono-Regular\", Menlo, monospace",
							color: "var(--color-text-tertiary)",
							letterSpacing: "0.02em"
						},
						children: t
					})]
				}), n && /* @__PURE__ */ E(mt, {
					status: n,
					colors: g
				})]
			}),
			/* @__PURE__ */ E(h, {
				items: o,
				staggerMs: v
			}),
			/* @__PURE__ */ D("div", {
				style: {
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
					paddingTop: 8,
					borderTop: "1px solid #f3f4f6",
					gap: 8
				},
				children: [/* @__PURE__ */ D("div", {
					style: {
						display: "flex",
						alignItems: "center",
						gap: 8,
						minWidth: 0
					},
					children: [i.length > 0 ? /* @__PURE__ */ E(p, {
						names: i,
						maxVisible: 5,
						size: 24
					}) : /* @__PURE__ */ D("span", {
						style: {
							fontSize: 12,
							color: "var(--color-text-tertiary)"
						},
						children: [/* @__PURE__ */ E("strong", {
							style: { color: "var(--color-text-primary)" },
							children: a ?? 0
						}), " contributors"]
					}), i.length > 0 && _ > 0 && /* @__PURE__ */ D("span", {
						style: {
							fontSize: 11,
							color: "var(--color-text-tertiary)"
						},
						children: [
							"+",
							_,
							" more"
						]
					})]
				}), c && /* @__PURE__ */ D("div", {
					style: {
						display: "flex",
						alignItems: "center",
						gap: 5,
						flexShrink: 0
					},
					children: [/* @__PURE__ */ E("span", { style: {
						width: 6,
						height: 6,
						borderRadius: "50%",
						background: s,
						flexShrink: 0
					} }), /* @__PURE__ */ E("span", {
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
function gt(e) {
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
function J({ items: e, storageKey: t, title: n, renderNavItem: r }) {
	let i = S(() => gt(e), [e]), a = i.some((e) => e.name !== null);
	return /* @__PURE__ */ E("nav", {
		className: "flex-1 overflow-y-auto py-1",
		children: a ? i.map((e) => e.name === null ? /* @__PURE__ */ E(X, {
			items: e.items,
			renderNavItem: r
		}, "__ungrouped") : /* @__PURE__ */ E(_t, {
			name: e.name,
			items: e.items,
			storageKey: `${t}.${n}.${e.name}`,
			renderNavItem: r
		}, e.name)) : /* @__PURE__ */ E(X, {
			items: e,
			renderNavItem: r
		})
	});
}
function Y({ title: e, items: t, titleAction: n, railHeader: r, railWidth: i = 220, storageKey: a = "subnav", secondaryTitle: o, secondaryItems: s, secondaryStorageKey: c, secondaryRailWidth: l = 200, renderNavItem: u, children: d }) {
	let f = s && s.length > 0;
	return /* @__PURE__ */ D("div", {
		className: "flex h-full min-h-0",
		children: [
			/* @__PURE__ */ D("aside", {
				className: "flex-none border-r border-[var(--color-border)] bg-[var(--color-surface)] flex flex-col overflow-hidden",
				style: { width: i },
				children: [
					/* @__PURE__ */ D("div", {
						className: "flex items-center justify-between px-4 py-[14px] border-b border-[var(--color-border)]",
						children: [/* @__PURE__ */ E("span", {
							className: "text-[11px] font-semibold text-[var(--color-text-tertiary)] uppercase tracking-[0.05em]",
							children: e
						}), n]
					}),
					r && /* @__PURE__ */ E("div", {
						className: "px-3 py-2 border-b border-[var(--color-border)]",
						children: r
					}),
					/* @__PURE__ */ E(J, {
						items: t,
						storageKey: a,
						title: e,
						renderNavItem: u
					})
				]
			}),
			f && /* @__PURE__ */ D("aside", {
				className: "flex-none border-r border-[var(--color-border)] bg-[var(--color-surface)] flex flex-col overflow-hidden",
				style: { width: l },
				children: [/* @__PURE__ */ E("div", {
					className: "flex items-center justify-between px-4 py-[14px] border-b border-[var(--color-border)]",
					children: /* @__PURE__ */ E("span", {
						className: "text-[11px] font-semibold text-[var(--color-text-tertiary)] uppercase tracking-[0.05em]",
						children: o ?? ""
					})
				}), /* @__PURE__ */ E(J, {
					items: s,
					storageKey: c ?? `${a}.secondary`,
					title: o ?? "secondary",
					renderNavItem: u
				})]
			}),
			/* @__PURE__ */ E("main", {
				className: "flex-1 min-w-0 overflow-auto p-6",
				children: d
			})
		]
	});
}
function X({ items: e, renderNavItem: t }) {
	return /* @__PURE__ */ E(T, { children: e.map((e) => /* @__PURE__ */ E(Z, {
		item: e,
		renderNavItem: t
	}, e.path)) });
}
function _t({ name: e, items: t, storageKey: n, renderNavItem: r }) {
	let [i, a] = w(() => typeof window > "u" ? !1 : window.localStorage?.getItem(n) === "1");
	y(() => {
		typeof window > "u" || (i ? window.localStorage?.setItem(n, "1") : window.localStorage?.removeItem(n));
	}, [i, n]);
	let o = t.find((e) => e.groupScrollAfter)?.groupScrollAfter, s = o ? {
		maxHeight: o * 38,
		overflowY: "auto"
	} : void 0;
	return /* @__PURE__ */ D("section", {
		className: "border-b border-[var(--color-border)]",
		children: [/* @__PURE__ */ D("button", {
			type: "button",
			onClick: () => a((e) => !e),
			className: "flex items-center gap-1.5 w-full px-3 py-2 bg-transparent border-none cursor-pointer text-[var(--color-text-tertiary)] text-[10px] font-bold tracking-[0.05em] uppercase text-left",
			"aria-expanded": !i,
			children: [
				/* @__PURE__ */ E("span", {
					className: "text-[10px] w-[10px] inline-block",
					"aria-hidden": "true",
					children: i ? "▸" : "▾"
				}),
				/* @__PURE__ */ E("span", {
					className: "flex-1",
					children: e
				}),
				/* @__PURE__ */ E("span", {
					className: "text-[9px] font-medium text-[var(--color-text-tertiary)] bg-[var(--color-bg)] px-[5px] py-px rounded-[6px] border border-[var(--color-border)]",
					children: t.length
				})
			]
		}), !i && /* @__PURE__ */ E("div", {
			style: s,
			children: t.map((e) => /* @__PURE__ */ E(Z, {
				item: e,
				renderNavItem: r
			}, e.path))
		})]
	});
}
function Z({ item: e, renderNavItem: t }) {
	let n = e.accent === "danger" ? "var(--color-danger)" : e.accent === "warning" ? "var(--color-warning)" : e.accent === "success" ? "var(--color-success)" : void 0, r = /* @__PURE__ */ D(T, { children: [/* @__PURE__ */ D("div", {
		className: "flex items-center justify-between gap-2",
		children: [/* @__PURE__ */ E("span", {
			className: "text-[13px] font-medium text-[var(--color-text-secondary)]",
			style: n ? { color: n } : void 0,
			children: e.label
		}), e.count !== void 0 && /* @__PURE__ */ E("span", {
			className: "text-[10px] font-medium text-[var(--color-text-tertiary)] bg-[var(--color-surface)] px-[6px] py-px rounded-[8px] border border-[var(--color-border)]",
			children: e.count
		})]
	}), e.hint && /* @__PURE__ */ E("div", {
		className: "text-[10px] text-[var(--color-text-tertiary)] mt-0.5",
		children: e.hint
	})] });
	return e.onClick ? /* @__PURE__ */ E("button", {
		type: "button",
		onClick: e.onClick,
		className: "block w-full px-[14px] py-2 border-l-[3px] border-transparent border-t-0 border-r-0 border-b-0 bg-transparent text-[var(--color-text-secondary)] text-left cursor-pointer font-[inherit]",
		children: r
	}) : t ? /* @__PURE__ */ E(T, { children: t(e, r, {
		display: "block",
		padding: "8px 14px",
		borderLeft: "3px solid transparent",
		color: "var(--color-text-secondary)",
		textDecoration: "none",
		cursor: "pointer"
	}) }) : /* @__PURE__ */ E("a", {
		href: e.path,
		className: "block px-[14px] py-2 border-l-[3px] border-transparent text-[var(--color-text-secondary)] no-underline cursor-pointer",
		children: r
	});
}
var vt = {
	borderLeft: "3px solid var(--color-primary)",
	background: "var(--color-surface-hover)",
	color: "var(--color-text-primary)"
}, yt = [
	"a[href]",
	"button:not([disabled])",
	"input:not([disabled]):not([type=\"hidden\"])",
	"select:not([disabled])",
	"textarea:not([disabled])",
	"[tabindex]:not([tabindex=\"-1\"])",
	"[contenteditable=\"true\"]"
].join(",");
function Q(e) {
	return Array.from(e.querySelectorAll(yt)).filter((e) => e.getAttribute("aria-hidden") !== "true");
}
function bt(e, t, n) {
	return t === "right" ? {
		position: "fixed",
		top: e.top,
		left: e.right + n
	} : t === "bottom-end" ? {
		position: "fixed",
		top: e.bottom + n,
		left: e.right,
		transform: "translateX(-100%)"
	} : {
		position: "fixed",
		top: e.bottom + n,
		left: e.left
	};
}
function $({ trigger: t, open: n, onClose: r, placement: i = "bottom-start", offset: a = 6, className: o, zIndex: s = 9500, "data-testid": c = "inline-popover", children: l }) {
	let u = C(null), [d, f] = w(null), p = C(null), m = _(() => {
		let e = t.current;
		if (!e) return;
		let n = e.getBoundingClientRect();
		f(bt(n, i, a));
	}, [
		t,
		i,
		a
	]);
	return x(() => {
		if (!n) {
			f(null);
			return;
		}
		m();
	}, [n, m]), y(() => {
		if (!n) return;
		let e = () => m();
		return window.addEventListener("scroll", e, !0), window.addEventListener("resize", e), () => {
			window.removeEventListener("scroll", e, !0), window.removeEventListener("resize", e);
		};
	}, [n, m]), y(() => {
		if (!n) return;
		let e = typeof document < "u" ? document.activeElement : null;
		return p.current = e, queueMicrotask(() => {
			let e = u.current;
			if (!e) return;
			let t = Q(e);
			t.length > 0 ? t[0].focus() : (e.setAttribute("tabindex", "-1"), e.focus());
		}), () => {
			let e = p.current;
			e && typeof e.focus == "function" && document.contains(e) && e.focus(), p.current = null;
		};
	}, [n]), y(() => {
		if (!n) return;
		let e = (e) => {
			if (e.key === "Escape") {
				e.stopPropagation(), r();
				return;
			}
			if (e.key !== "Tab") return;
			let t = u.current;
			if (!t) return;
			let n = Q(t);
			if (n.length === 0) {
				e.preventDefault();
				return;
			}
			let i = n[0], a = n[n.length - 1], o = document.activeElement;
			if (!o || !t.contains(o)) {
				e.preventDefault(), i.focus();
				return;
			}
			e.shiftKey && o === i ? (e.preventDefault(), a.focus()) : !e.shiftKey && o === a && (e.preventDefault(), i.focus());
		};
		return window.addEventListener("keydown", e), () => window.removeEventListener("keydown", e);
	}, [n, r]), y(() => {
		if (!n) return;
		let e = (e) => {
			let n = e.target;
			n && (u.current?.contains(n) || t.current?.contains(n) || r());
		};
		return document.addEventListener("mousedown", e), () => document.removeEventListener("mousedown", e);
	}, [
		n,
		r,
		t
	]), !n || !d || typeof document > "u" ? null : k(/* @__PURE__ */ E("div", {
		ref: u,
		role: "dialog",
		"data-testid": c,
		"data-placement": i,
		className: e("min-w-[160px] rounded-lg border border-border bg-white", "shadow-lg p-1 text-sm text-text-primary", o),
		style: {
			...d,
			zIndex: s
		},
		children: l
	}), document.body);
}
//#endregion
//#region src/components/shared/DropdownMenu.tsx
function xt({ trigger: t, triggerLabel: n = "Open menu", triggerTitle: r, triggerClassName: i, align: a = "start", sections: o, className: s, "data-testid": c = "dropdown-menu" }) {
	let [l, u] = w(!1), d = C(null), f = C(null), p = _(() => u(!1), []), m = _((e) => {
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
	return /* @__PURE__ */ D(T, { children: [/* @__PURE__ */ E("button", {
		ref: d,
		type: "button",
		"aria-label": n,
		"aria-haspopup": "menu",
		"aria-expanded": l,
		title: r,
		onClick: () => u((e) => !e),
		className: e("inline-flex items-center justify-center gap-1.5 cursor-pointer", "rounded-md border border-[var(--color-border)] px-2 py-1", "text-base leading-none text-[var(--color-text-secondary)]", "bg-transparent hover:bg-[var(--color-surface-hover)] transition-colors duration-100", l && "bg-[var(--color-surface-hover)]", i),
		children: t
	}), /* @__PURE__ */ E($, {
		trigger: d,
		open: l,
		onClose: p,
		placement: a === "end" ? "bottom-end" : "bottom-start",
		className: e("min-w-[180px] p-0 overflow-hidden rounded-lg", s),
		"data-testid": c,
		children: /* @__PURE__ */ E("div", {
			ref: f,
			role: "menu",
			"aria-label": n,
			onKeyDown: m,
			className: "py-1",
			children: o.map((t, n) => /* @__PURE__ */ D("div", {
				role: "group",
				"aria-label": t.label,
				children: [
					n > 0 && /* @__PURE__ */ E("div", {
						role: "separator",
						className: "my-1 border-t border-[var(--color-border)]"
					}),
					t.label && /* @__PURE__ */ E("div", {
						className: "px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-[var(--color-text-tertiary)]",
						children: t.label
					}),
					t.items.map((t, n) => /* @__PURE__ */ D("button", {
						type: "button",
						role: "menuitem",
						"aria-current": t.active || void 0,
						onClick: () => {
							t.onSelect(), p();
						},
						className: e("flex items-center gap-2.5 w-full text-left px-3.5 py-2", "text-sm border-none cursor-pointer font-[inherit] transition-colors duration-100", t.danger ? "text-danger-fg bg-transparent hover:bg-danger-bg" : t.active ? "font-semibold text-[var(--color-text-primary)] bg-[var(--color-surface-hover)]" : "font-normal text-[var(--color-text-primary)] bg-transparent hover:bg-[var(--color-surface-hover)]"),
						children: [t.icon && /* @__PURE__ */ E("span", {
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
export { ze as A, _e as B, H as C, We as D, Ke as E, ke as F, P as G, he as H, De as I, F as J, N as K, we as L, Pe as M, B as N, Ue as O, je as P, Ce as R, Je as S, qe as T, L as U, ge as V, R as W, le as Y, G as _, ht as a, W as b, st as c, it as d, rt as f, tt as g, nt as h, vt as i, Re as j, Ve as k, ot as l, q as m, $ as n, dt as o, K as p, me as q, Y as r, ct as s, xt as t, at as u, $e as v, V as w, Xe as x, Ze as y, ye as z };
