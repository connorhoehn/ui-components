import { t as e } from "./cn-DhjIN-s0.js";
import "./ToastProvider-BVUJvzmK.js";
import { c as t } from "./usePromptContext-CUNhKC01.js";
import "./FilterPopover-B8Z9FZ4W.js";
import { _ as n, c as r, f as i, g as a, h as o, l as s, p as c, t as l, u } from "./overlayStack-CHdlnODN.js";
import { t as d } from "./Card-RQCeAPNU.js";
import "./Table-CypeBEj0.js";
import { t as f } from "./Chip-4IBrlduZ.js";
import "./DataTable-CcQZDoUb.js";
import { t as p } from "./IconButton-DDeXW3mZ.js";
import { K as m, R as h, T as g, p as _, u as v } from "./Icons-BSEVGRI6.js";
import "./Stack-CkiMw5K0.js";
import "./Text-BMaVbS3F.js";
import "./Badge-BGDepkwI.js";
import "./Banner-IBpLsSJQ.js";
import "./Chart-DRtuaJHd.js";
import { t as y } from "./Modal-DMFNRUDx.js";
import { t as b } from "./ConfirmDialog-CSS_SMC6.js";
import { t as x } from "./Input-DLknWXri.js";
import { t as S } from "./EmptyState-zKbpAhFD.js";
import "./ErrorState-Czna8rFK.js";
import "./Drawer-vgGETlwD.js";
import "./Spinner-CLcq5z8N.js";
import "./SearchInput-Dau1QZ7U.js";
import "./FormField-E8Z0ppOp.js";
import { t as C } from "./Sparkline-Ci_cmVWU.js";
import { i as w } from "./focusTrap-C5l9cvTe.js";
import "./SkeletonCard-CGe8XFPB.js";
import { a as T, i as E, o as D } from "./ChannelHeader-qvaO7oMR.js";
import "./Slider-izEq1bGO.js";
import "./Tabs-CWj6ZL7J.js";
import "./DockedPanelContext-pH9A5z1h.js";
import { t as O } from "./Textarea-Dz4doxTv.js";
import { n as k, t as A } from "./Avatar-DeJWic2B.js";
import "./TitledFrame-D8PekrkI.js";
import "./DotMeter-BDVkadI8.js";
import "./StatusDot-Bgx2zxgC.js";
import { i as j } from "./ChoiceList-DXzbK-3K.js";
import "./SegmentedControl-CKYHtOJ0.js";
import "./RovingToolbar-CmQag9q6.js";
import "./InlineAlert-CRnIKeAF.js";
import "./CardHeader-CsPhVpCm.js";
import "./PageHeader-DOSl8dnN.js";
import "./NotificationCenter-B__ZOx5D.js";
import "./LogStream-J2cxfOVI.js";
import "./RisingParticles-DqlZf8HC.js";
import "./backdropTone-BF54k8gW.js";
import "./RippleGridBackground-DTc7RHie.js";
import "./FollowUpChips-BD9scwlC.js";
import "./PresenceAvatars-Dmtv09Kg.js";
import "./FileUploadDrop-Ds6LsAtK.js";
import { t as M } from "./InlinePopover-DpXHdWeE.js";
import { t as ee } from "./ActivityFeed-ay5wcWka.js";
import { a as te, c as N, d as ne, i as re, l as P, n as ie, o as ae, r as oe } from "./railType-DxAfixMZ.js";
import "./SectionLabel-bcrhNYOr.js";
import { t as se } from "./InlinePlaceholder-51dbPRGn.js";
import "./PopoverForm-BCCYkHYg.js";
import "./FloatingPanel-6GL9dXGL.js";
import { t as ce } from "./DropdownMenu-CHrQvZgc.js";
import "./ChangeDiff-CzO8zCc-.js";
import { t as le } from "./StatusPill-C-aN2Pzz.js";
import "./Select-D3fGI8SO.js";
import "./NumberInput-PlADgrip.js";
import "./Checkbox-Dftwml_V.js";
import { n as ue } from "./FileKindMark-Pyuz3FHF.js";
import "./Tooltip-af4BrR7T.js";
import { Children as de, Fragment as fe, createContext as pe, isValidElement as me, useCallback as F, useContext as he, useEffect as I, useId as L, useMemo as R, useRef as z, useState as B } from "react";
import { Fragment as V, jsx as H, jsxs as U } from "react/jsx-runtime";
import { Command as W } from "cmdk";
import ge from "react-markdown";
import _e from "remark-gfm";
//#region src/components/shared/CodeBlock.tsx
var ve = /* @__PURE__ */ "import.export.from.as.const.let.var.function.return.default.if.else.switch.case.break.new.typeof.instanceof.in.of.interface.type.extends.implements.class.async.await.true.false.null.undefined.this.super.try.catch.finally.throw.for.while.do.continue.public.private.protected.readonly.static.enum".split("."), ye = [
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
], be = /* @__PURE__ */ "cd.ls.echo.cat.grep.sed.awk.find.cp.mv.rm.mkdir.rmdir.touch.chmod.chown.pwd.which.npm.yarn.pnpm.npx.git.node.curl.wget".split(".");
function xe(e) {
	return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function Se(e, t) {
	let n = e.replace(/(\/\/.*?)(\n|$)/g, `<span style="color:${t.comment}">$1</span>$2`);
	n = n.replace(/(\/\*[\s\S]*?\*\/)/g, `<span style="color:${t.comment}">$1</span>`), n = n.replace(/("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)/g, `<span style="color:${t.string}">$1</span>`);
	let r = RegExp(`\\b(${ve.join("|")})\\b`, "g");
	return n = n.replace(r, `<span style="color:${t.keyword}">$1</span>`), n = n.replace(/\b(\d+(?:\.\d+)?)\b/g, `<span style="color:${t.number}">$1</span>`), n;
}
function Ce(e, t) {
	let n = e.replace(/("(?:[^"\\]|\\.)*")(\s*:)/g, `<span style="color:${t.property}">$1</span>$2`);
	return n = n.replace(/("(?:[^"\\]|\\.)*")/g, `<span style="color:${t.string}">$1</span>`), n = n.replace(/\b(true|false|null)\b/g, `<span style="color:${t.keyword}">$1</span>`), n = n.replace(/\b(-?\d+(?:\.\d+)?)\b/g, `<span style="color:${t.number}">$1</span>`), n;
}
function we(e, t) {
	let n = e.replace(/(#.*?)(\n|$)/g, `<span style="color:${t.comment}">$1</span>$2`);
	n = n.replace(/("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')/g, `<span style="color:${t.string}">$1</span>`);
	let r = RegExp(`\\b(${ye.join("|")})\\b`, "g");
	n = n.replace(r, `<span style="color:${t.keyword}">$1</span>`);
	let i = RegExp(`\\b(${be.join("|")})\\b`, "g");
	return n = n.replace(i, `<span style="color:${t.builtin}">$1</span>`), n = n.replace(/(\$\w+|\$\{[^}]+\})/g, `<span style="color:${t.variable}">$1</span>`), n;
}
var Te = {
	comment: "var(--color-neutral)",
	string: "#4ade80",
	keyword: "var(--color-state-pending)",
	number: "#fbbf24",
	property: "#7dd3fc",
	builtin: "#c4b5fd",
	variable: "#fbbf24"
}, Ee = {
	comment: "var(--color-code-comment)",
	string: "var(--color-code-green)",
	keyword: "var(--color-code-mauve)",
	number: "var(--color-code-peach)",
	property: "var(--color-code-blue)",
	builtin: "var(--color-code-mauve)",
	variable: "var(--color-code-yellow)"
}, De = {
	comment: "var(--color-neutral)",
	string: "#15803d",
	keyword: "var(--color-info-fg)",
	number: "#a16207",
	property: "#0369a1",
	builtin: "var(--color-cat-ai)",
	variable: "#a16207"
};
function Oe(e, t, n) {
	let r = n === "light" ? De : n === "console" ? Ee : Te, i = xe(e);
	switch (t) {
		case "json": return Ce(i, r);
		case "bash":
		case "sh": return we(i, r);
		case "text": return i;
		default: return Se(i, r);
	}
}
function ke({ code: t, language: n = "tsx", theme: r = "dark", copyButton: i = !0, showLineNumbers: a = !1, className: o, style: s, "data-testid": c, ariaLabel: l }) {
	let [u, d] = B(!1), f = F(() => {
		typeof navigator > "u" || !navigator.clipboard || navigator.clipboard.writeText(t).then(() => {
			d(!0), setTimeout(() => d(!1), 1500);
		}).catch(() => {});
	}, [t]), p = r === "dark", m = r === "console", h = R(() => t.split("\n"), [t]), g = R(() => Oe(t, n, r), [
		t,
		n,
		r
	]);
	return /* @__PURE__ */ U("div", {
		"data-testid": c,
		"data-language": n,
		"data-theme": r,
		className: e("relative rounded-lg border font-mono text-[13px] leading-relaxed overflow-hidden", m ? "bg-code-bg text-code-text border-code-border" : p ? "bg-surface-inverse text-text-inverse border-border-emphasis" : "bg-surface-panel text-text-primary border-border", o),
		style: s,
		"aria-label": l ?? `Code (${n})`,
		children: [i && /* @__PURE__ */ H("button", {
			type: "button",
			onClick: f,
			"aria-label": u ? "Copied" : "Copy code",
			className: e("absolute top-2 right-2 text-[11px] px-2 py-1 rounded border transition-opacity", m ? "bg-code-panel text-code-text border-code-border hover:bg-code-raised" : p ? "bg-surface-inverse text-text-inverse border-border-emphasis hover:bg-neutral" : "bg-surface text-text-primary border-border-emphasis hover:bg-surface-hover"),
			"data-copied": u ? "true" : "false",
			children: u ? "Copied" : "Copy"
		}), /* @__PURE__ */ H("pre", {
			className: "m-0 px-4 py-3 overflow-x-auto",
			children: a ? /* @__PURE__ */ U("div", {
				className: "flex",
				children: [/* @__PURE__ */ H("div", {
					className: e("select-none pr-3 text-right", m ? "text-code-comment" : p ? "text-neutral" : "text-text-tertiary"),
					"aria-hidden": "true",
					children: h.map((e, t) => /* @__PURE__ */ H("div", { children: t + 1 }, t))
				}), /* @__PURE__ */ H("code", {
					className: "flex-1 block",
					dangerouslySetInnerHTML: { __html: g }
				})]
			}) : /* @__PURE__ */ H("code", {
				className: "block",
				dangerouslySetInnerHTML: { __html: g }
			})
		})]
	});
}
//#endregion
//#region src/components/shared/CommandPalette.tsx
var Ae = "cui:command-palette:recents", je = 5;
function Me(e, t) {
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
function Ne(e, t) {
	if (!(!e || typeof window > "u")) try {
		window.localStorage.setItem(e, JSON.stringify(t));
	} catch {}
}
var Pe = pe(null);
function G() {
	let e = he(Pe);
	if (!e) throw Error("useCommandPalette must be used inside a <CommandPaletteProvider>.");
	return e;
}
function Fe() {
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
function Ie({ commands: e, getDynamicCommands: t, recentsKey: n = Ae, recentsLimit: r = je, children: i }) {
	let [a, o] = B(!1), [s, c] = B(""), [l, u] = B(() => /* @__PURE__ */ new Map()), [d, f] = B(() => Me(n, r)), p = F((e) => {
		n !== null && f((t) => {
			let i = [e, ...t.filter((t) => t !== e)].slice(0, r);
			return Ne(n, i), i;
		});
	}, [n, r]), m = F(() => o(!0), []), h = F(() => {
		o(!1), c("");
	}, []), g = F(() => o((e) => !e), []), _ = F((e) => {
		u((t) => {
			let n = new Map(t);
			return n.set(e.id, e), n;
		});
	}, []), v = F((e) => {
		u((t) => {
			if (!t.has(e)) return t;
			let n = new Map(t);
			return n.delete(e), n;
		});
	}, []);
	I(() => {
		let e = (e) => {
			(e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k" && (e.preventDefault(), o((e) => !e));
		};
		return window.addEventListener("keydown", e, !0), () => window.removeEventListener("keydown", e, !0);
	}, []);
	let y = R(() => {
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
	]), b = z(y);
	b.current = y, I(() => {
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
	return /* @__PURE__ */ H(Pe.Provider, {
		value: x,
		children: i
	});
}
function Le(e) {
	let { registerCommand: t, unregisterCommand: n } = G();
	I(() => (t(e), () => n(e.id)), [
		e,
		t,
		n
	]);
}
function Re(e) {
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
function ze({ placeholder: t = "Type a command or search…", emptyState: n, className: r } = {}) {
	let { isOpen: i, close: a, query: o, setQuery: s, mergedCommands: c, recents: l, noteSelection: u } = G(), d = R(() => {
		if (o.trim() !== "" || l.length === 0) return [];
		let e = new Map(c.map((e) => [e.id, e]));
		return l.map((t) => e.get(t)).filter((e) => !!e);
	}, [
		c,
		o,
		l
	]), f = R(() => Re(c), [c]), p = F((e) => {
		u(e.id), a(), Promise.resolve().then(() => e.run());
	}, [a, u]);
	return /* @__PURE__ */ H(y, {
		open: i,
		onClose: a,
		ariaLabel: "Command palette",
		maxWidth: 640,
		rawChildren: !0,
		backdropTestId: "command-palette-backdrop",
		children: /* @__PURE__ */ U(W, {
			label: "Command palette",
			value: void 0,
			className: e("flex flex-col gap-0 w-full", r),
			"data-testid": "command-palette",
			children: [/* @__PURE__ */ H(W.Input, {
				value: o,
				onValueChange: s,
				placeholder: t,
				"data-autofocus": !0,
				className: e("w-full px-3 py-2.5 text-sm border-0 border-b border-border", "outline-none bg-transparent text-text-primary placeholder:text-text-tertiary"),
				"data-testid": "command-palette-input"
			}), /* @__PURE__ */ U(W.List, {
				className: "max-h-[360px] overflow-y-auto py-2",
				children: [
					/* @__PURE__ */ H(W.Empty, {
						className: "px-3 py-6 text-center text-sm text-text-tertiary",
						children: n ?? "No results."
					}),
					d.length > 0 && /* @__PURE__ */ H(W.Group, {
						heading: "Recent",
						"data-testid": "command-palette-group-recent",
						children: d.map((t) => /* @__PURE__ */ U(W.Item, {
							value: `recent-${t.id} ${t.label}`,
							keywords: t.keywords,
							onSelect: () => p(t),
							"data-testid": `command-palette-recent-${t.id}`,
							className: e("flex items-center gap-2 px-3 py-2 mx-1 rounded-md cursor-pointer text-sm", "text-text-primary aria-selected:bg-surface-hover"),
							children: [t.icon && /* @__PURE__ */ H("span", {
								className: "shrink-0 text-text-secondary",
								children: t.icon
							}), /* @__PURE__ */ H("span", {
								className: "flex-1 truncate",
								children: t.label
							})]
						}, `recent-${t.id}`))
					}),
					f.map(({ groupName: t, items: n }) => /* @__PURE__ */ H(W.Group, {
						heading: t ?? void 0,
						children: n.map((t) => /* @__PURE__ */ U(W.Item, {
							value: `${t.id} ${t.label} ${(t.keywords ?? []).join(" ")}`,
							keywords: t.keywords,
							onSelect: () => p(t),
							"data-testid": `command-palette-item-${t.id}`,
							className: e("flex items-center gap-2 px-3 py-2 mx-1 rounded-md cursor-pointer text-sm", "text-text-primary aria-selected:bg-surface-hover"),
							children: [
								t.icon && /* @__PURE__ */ H("span", {
									className: "shrink-0 text-text-secondary",
									children: t.icon
								}),
								/* @__PURE__ */ H("span", {
									className: "flex-1 truncate",
									children: t.label
								}),
								t.hint && /* @__PURE__ */ H("span", {
									className: "text-xs text-text-tertiary truncate",
									children: t.hint
								}),
								t.shortcut && t.shortcut.length > 0 && /* @__PURE__ */ H("span", {
									className: "flex items-center gap-1 shrink-0",
									children: t.shortcut.map((n, r) => /* @__PURE__ */ H("kbd", {
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
function Be({ className: t, label: n = "Search", size: r = "sm" } = {}) {
	let { toggle: i } = G();
	return /* @__PURE__ */ U("button", {
		type: "button",
		onClick: i,
		"data-testid": "command-palette-hint",
		className: e("inline-flex items-center rounded-md border border-border", r === "md" ? "h-9 gap-2 bg-surface px-3 text-[13px] font-medium text-text-primary shadow-sm hover:bg-surface-hover" : "gap-1.5 px-2 py-1 text-xs text-text-secondary bg-surface-hover hover:bg-surface-panel", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", "cursor-pointer transition-colors", t),
		"aria-label": "Open command palette",
		"aria-keyshortcuts": "Meta+K Control+K",
		children: [/* @__PURE__ */ H("kbd", {
			className: e("font-mono", r === "md" ? "text-[12px] text-text-secondary" : "text-[11px]"),
			children: "⌘K"
		}), /* @__PURE__ */ H("span", { children: n })]
	});
}
//#endregion
//#region src/components/shared/PickerDialog.tsx
function Ve({ open: t, title: n, body: r, options: i, confirmLabel: a = "Choose", onPick: o, onCancel: s, searchPlaceholder: c = "Search…", emptyText: l = "Nothing to choose from.", loading: u = !1, initialId: d, "data-testid": f = "picker-dialog" }) {
	let [p, m] = B(""), [h, g] = B(d ?? null), _ = z(null);
	I(() => {
		t && (m(""), g(d ?? null));
	}, [t, d]);
	let v = R(() => {
		let e = p.trim().toLowerCase();
		return e ? i.filter((t) => `${t.label} ${t.description ?? ""}`.toLowerCase().includes(e)) : i;
	}, [i, p]), y = v.filter((e) => !e.disabled), S = y.find((e) => e.id === h) ?? null, C = (e) => {
		let t = e ? i.find((t) => t.id === e && !t.disabled) : void 0;
		t && o(t.id);
	}, w = (e) => {
		if (e.key === "Enter") {
			e.preventDefault(), C(S?.id ?? (y.length === 1 ? y[0].id : null));
			return;
		}
		if (e.key !== "ArrowDown" && e.key !== "ArrowUp" || (e.preventDefault(), y.length === 0)) return;
		let t = S ? y.indexOf(S) : -1, n = e.key === "ArrowDown" ? Math.min(y.length - 1, t + 1) : Math.max(0, t - 1), r = y[n].id;
		g(r), _.current?.querySelector(`[data-option-id="${CSS.escape(r)}"]`)?.scrollIntoView({ block: "nearest" });
	};
	return /* @__PURE__ */ H(b, {
		open: t,
		title: n,
		...r ? { body: r } : {},
		confirmLabel: a,
		confirmDisabled: !S,
		onConfirm: () => C(S?.id ?? null),
		onCancel: s,
		children: /* @__PURE__ */ U("div", {
			className: "flex flex-col gap-2",
			"data-testid": f,
			onKeyDown: w,
			children: [i.length > 6 && /* @__PURE__ */ H(x, {
				autoFocus: !0,
				size: "md",
				value: p,
				onChange: (e) => m(e.target.value),
				placeholder: c,
				"aria-label": c,
				"data-testid": `${f}-search`
			}), /* @__PURE__ */ H("div", {
				ref: _,
				role: "listbox",
				"aria-label": n,
				tabIndex: i.length > 6 ? -1 : 0,
				className: "flex max-h-[320px] flex-col overflow-y-auto rounded-md border border-border py-1",
				children: u ? /* @__PURE__ */ H("div", {
					className: "px-3 py-2 text-[13px] text-text-tertiary",
					children: "Loading…"
				}) : v.length === 0 ? /* @__PURE__ */ H("div", {
					className: "px-3 py-2 text-[13px] text-text-tertiary",
					"data-testid": `${f}-empty`,
					children: l
				}) : v.map((t) => {
					let n = t.id === S?.id;
					return /* @__PURE__ */ U("button", {
						type: "button",
						role: "option",
						"aria-selected": n,
						"aria-disabled": t.disabled || void 0,
						title: t.disabled ? t.disabledReason : void 0,
						"data-option-id": t.id,
						"data-testid": `${f}-option-${t.id}`,
						onClick: () => {
							t.disabled || g(t.id);
						},
						onDoubleClick: () => C(t.id),
						className: e("flex w-full items-center gap-2.5 border-none py-1.5 pr-3 text-left text-[13px] font-[inherit]", He[Math.min(t.depth ?? 0, He.length - 1)], t.disabled ? "cursor-not-allowed bg-transparent text-text-tertiary" : n ? "cursor-pointer bg-primary-bg text-primary-fg" : "cursor-pointer bg-transparent text-text-primary hover:bg-surface-hover"),
						children: [t.icon && /* @__PURE__ */ H("span", {
							className: "flex w-4 shrink-0 items-center justify-center",
							"aria-hidden": "true",
							children: t.icon
						}), /* @__PURE__ */ U("span", {
							className: "flex min-w-0 flex-1 flex-col",
							children: [/* @__PURE__ */ H("span", {
								className: "truncate",
								children: t.label
							}), (t.description || t.disabled && t.disabledReason) && /* @__PURE__ */ H("span", {
								className: "truncate text-xs text-text-tertiary",
								children: t.disabled && t.disabledReason ? t.disabledReason : t.description
							})]
						})]
					}, t.id);
				})
			})]
		})
	});
}
var He = [
	"pl-3",
	"pl-7",
	"pl-11",
	"pl-[3.75rem]",
	"pl-[4.75rem]",
	"pl-[5.75rem]"
], Ue = "🔒";
function We({ capabilityName: e, title: t, description: n, actionLabel: r, onAction: i, actions: a, icon: o, testId: s = "capability-denied-fallback" }) {
	let c = t ?? (e ? `${e} is unavailable` : "Feature unavailable"), l = n ?? (e ? `${e} is not enabled for this workspace. Contact your administrator to request access.` : "This feature is not enabled for your account. Contact your administrator to request access.");
	return /* @__PURE__ */ H(S, {
		icon: o === null ? void 0 : o ?? Ue,
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
function Ge(e) {
	return e.rows ?? e.shortcuts ?? [];
}
function Ke(e) {
	return e.action ?? e.label ?? "";
}
var qe = [
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
function Je({ open: t, onClose: n, sections: r = qe }) {
	return /* @__PURE__ */ U(y, {
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
			/* @__PURE__ */ H("div", {
				className: "text-base font-semibold text-text-primary mb-2.5",
				children: "Keyboard shortcuts"
			}),
			/* @__PURE__ */ H("div", {
				className: "overflow-y-auto pr-1",
				children: r.map((t, n) => /* @__PURE__ */ U("div", { children: [/* @__PURE__ */ H("div", {
					className: e("text-[12px] font-bold text-text-primary uppercase tracking-[0.05em] mb-1.5", n === 0 ? "mt-0 pt-0" : "mt-4 pt-1.5 border-t border-border-subtle"),
					children: t.title
				}), /* @__PURE__ */ H("div", { children: Ge(t).map((n, r) => /* @__PURE__ */ U("div", {
					className: e("flex items-baseline justify-between py-1 text-[13px] gap-4", n.planned && "opacity-60"),
					"data-planned": n.planned ? "true" : void 0,
					children: [Array.isArray(n.keys) ? /* @__PURE__ */ H("span", {
						className: "flex shrink-0 items-baseline gap-1",
						children: n.keys.map((t, r) => /* @__PURE__ */ H("span", {
							className: e("font-mono text-[12px] border rounded px-1.5 py-px whitespace-nowrap shrink-0", n.planned ? "text-text-tertiary bg-surface border-border-subtle line-through" : "text-text-primary bg-surface-hover border-border"),
							children: t
						}, `${t}-${r}`))
					}) : /* @__PURE__ */ H("span", {
						className: e("font-mono text-[12px] border rounded px-1.5 py-px whitespace-nowrap shrink-0", n.planned ? "text-text-tertiary bg-surface border-border-subtle line-through" : "text-text-primary bg-surface-hover border-border"),
						children: n.keys
					}), /* @__PURE__ */ U("span", {
						className: "text-neutral text-right flex-1",
						children: [Ke(n), n.planned && /* @__PURE__ */ H("span", {
							className: "ml-1.5 text-[10px] uppercase tracking-wide text-text-tertiary",
							children: "planned"
						})]
					})]
				}, `${t.title}-${r}`)) })] }, t.title))
			}),
			/* @__PURE__ */ H("div", {
				className: "flex justify-end mt-[18px]",
				children: /* @__PURE__ */ H("button", {
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
var Ye = {
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
function Xe({ targetId: e = "main-content", children: t = "Skip to main content", className: n, onSkip: r }) {
	let [i, a] = B(!1);
	return /* @__PURE__ */ H("a", {
		href: `#${e}`,
		className: n,
		style: i ? Ye : T,
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
function Ze(e, t) {
	let [n, r] = B(e), i = z(e), a = z(0), o = z(null);
	return I(() => {
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
	}, [e, t]), I(() => () => {
		o.current && clearTimeout(o.current);
	}, []), n;
}
function Qe({ message: e, politeness: t = "polite", atomic: n = !0, throttleMs: r = 0, role: i = "status", "data-testid": a }) {
	let o = Ze(e, r);
	return /* @__PURE__ */ H(D, {
		as: "div",
		"data-testid": a,
		children: /* @__PURE__ */ H("div", {
			...i === "none" ? null : { role: i },
			"aria-live": t,
			"aria-atomic": n,
			children: o
		})
	});
}
//#endregion
//#region src/components/shared/StatCard.tsx
var $e = {
	positive: "text-[var(--color-success)]",
	negative: "text-[var(--color-danger)]",
	neutral: "text-[var(--color-text-secondary)]"
};
function et(e) {
	return e.tone ?? (e.direction === "up" ? "positive" : "negative");
}
function tt({ label: t, value: n, accent: r = !1, danger: i = !1, hint: a, title: o, delta: s, sparklineData: c, to: l, as: u, onClick: d, mono: f = !1, className: p, style: m, "data-testid": h }) {
	let g = e("block rounded-lg border p-3 no-underline transition-colors", !r && !i && "bg-[var(--color-surface)] border-[var(--color-border)]", r && "bg-[var(--color-primary-soft)] border-l-[3px] border-l-[var(--color-primary)] border-[var(--color-border)]", i && "bg-[var(--color-danger-bg)] border-l-[3px] border-l-[var(--color-danger)] border-[var(--color-border)]", (l || d) && "hover:bg-[var(--color-surface-hover)] cursor-pointer", p), _ = c && c.length > 0 ? c : null, v = null;
	if (s) {
		let t = et(s), n = s.direction === "up" ? "▲" : "▼", r = s.direction === "up" ? "+" : "-", i = s.suffix ?? "%", a = Math.abs(s.value), o = s["aria-label"] ?? `${s.direction} ${a}${i}`;
		v = /* @__PURE__ */ U("div", {
			"data-testid": "stat-card-delta",
			"data-direction": s.direction,
			"data-tone": t,
			"aria-label": o,
			className: e("mt-1 text-[12px] font-medium leading-tight", $e[t]),
			children: [
				/* @__PURE__ */ U("span", {
					"aria-hidden": "true",
					children: [n, " "]
				}),
				r,
				a,
				i
			]
		});
	}
	let y = /* @__PURE__ */ U(V, { children: [
		/* @__PURE__ */ H("div", {
			className: "text-[12px] uppercase tracking-wide text-[var(--color-text-tertiary)]",
			children: t
		}),
		/* @__PURE__ */ U("div", {
			className: "mt-1 flex items-center gap-2",
			children: [/* @__PURE__ */ H("div", {
				className: e("text-[24px] font-bold leading-tight text-[var(--color-text-primary)]", f && "font-mono"),
				children: n
			}), _ && /* @__PURE__ */ H(C, {
				data: _,
				width: 80,
				height: 20
			})]
		}),
		v,
		a != null && /* @__PURE__ */ H("div", {
			className: "mt-1 text-[11px] italic text-[var(--color-text-tertiary)]",
			children: a
		})
	] });
	return l ? u ? /* @__PURE__ */ H(u, {
		to: l,
		title: o,
		"data-testid": h,
		className: g,
		style: m,
		children: y
	}) : /* @__PURE__ */ H("a", {
		href: l,
		title: o,
		"data-testid": h,
		className: g,
		style: m,
		children: y
	}) : d ? /* @__PURE__ */ H("button", {
		type: "button",
		onClick: d,
		title: o,
		"data-testid": h,
		className: e(g, "w-full text-left"),
		style: m,
		children: y
	}) : /* @__PURE__ */ H("div", {
		"data-testid": h,
		title: o,
		className: g,
		style: m,
		children: y
	});
}
//#endregion
//#region src/components/shared/SuggestionCard.tsx
function nt({ reason: t, title: n, label: r, tone: i = "neutral", meta: a, context: o, onSelect: s, actionLabel: c = "Use this", disabled: l = !1, className: d, "data-testid": f }) {
	return /* @__PURE__ */ U("button", {
		type: "button",
		"data-testid": f,
		onClick: s,
		disabled: l,
		"aria-label": `${n} — ${t}`,
		className: e("group w-full text-left flex flex-col gap-1.5 rounded-lg border p-3 transition-colors", "border-border bg-surface hover:border-border-emphasis hover:bg-surface-hover", "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1", l ? "opacity-60 cursor-not-allowed" : "cursor-pointer", d),
		children: [
			/* @__PURE__ */ U("span", {
				className: "flex items-center gap-2 min-w-0",
				children: [r && /* @__PURE__ */ H("span", {
					className: e("shrink-0 text-[10px] font-semibold uppercase tracking-wide px-1.5 py-0.5 rounded", u[i]),
					children: r
				}), /* @__PURE__ */ H("span", {
					className: "text-[11px] text-text-secondary truncate",
					children: t
				})]
			}),
			/* @__PURE__ */ H("span", {
				className: "text-[13px] font-medium text-text-primary line-clamp-2",
				children: n
			}),
			(a || o) && /* @__PURE__ */ U("span", {
				className: "flex items-center gap-2 text-[11px] text-text-tertiary min-w-0",
				children: [a, o && /* @__PURE__ */ H("span", {
					className: "truncate",
					children: o
				})]
			}),
			/* @__PURE__ */ U("span", {
				"aria-hidden": "true",
				className: "text-[11px] font-semibold text-primary opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity",
				children: [c, " →"]
			})
		]
	});
}
//#endregion
//#region src/components/shared/TaskComposer.tsx
function rt({ title: t, description: r, titlePlaceholder: i = "Title", promptPlaceholder: a = "What should it do?", suggestions: o, suggestionsTitle: s = "Suggested next", suggestionsLoading: c = !1, suggestionsEmpty: l, onSubmit: u, onChooseSuggestion: d, submitLabel: f = "Queue", hint: p, busy: m = !1, className: h, "data-testid": g }) {
	let [_, v] = B(""), [y, b] = B(""), [S, C] = B(void 0), w = L(), T = L();
	I(() => {
		S && o && !o.some((e) => e.id === S) && C(void 0);
	}, [S, o]);
	let E = _.trim().length > 0 && y.trim().length > 0 && !m;
	function D() {
		E && (u({
			title: _.trim(),
			prompt: y.trim(),
			...S ? { suggestionId: S } : {}
		}), v(""), b(""), C(void 0));
	}
	function k(e) {
		d?.(e), v(e.fillTitle ?? e.title), b(e.prompt), C(e.id);
	}
	let A = c || (o?.length ?? 0) > 0 || !!l;
	return /* @__PURE__ */ U("section", {
		"data-testid": g,
		className: e("rounded-lg border border-border bg-surface overflow-hidden", h),
		children: [
			/* @__PURE__ */ U("div", {
				className: "px-3.5 pt-3 pb-1",
				children: [/* @__PURE__ */ H("h3", {
					className: "text-xs font-semibold text-text-secondary tracking-wide select-none uppercase",
					children: t
				}), r && /* @__PURE__ */ H("p", {
					className: "mt-1 text-[12px] text-text-tertiary",
					children: r
				})]
			}),
			A && /* @__PURE__ */ U("div", {
				className: "px-3.5 pt-2 pb-1",
				children: [/* @__PURE__ */ H("div", {
					className: "text-[11px] font-semibold text-text-tertiary tracking-wide uppercase mb-2",
					children: s
				}), c ? /* @__PURE__ */ H("div", {
					className: "grid gap-2 sm:grid-cols-2 lg:grid-cols-4",
					"aria-busy": "true",
					children: [
						0,
						1,
						2,
						3
					].map((e) => /* @__PURE__ */ H("div", { className: "h-[92px] rounded-lg border border-border bg-surface-panel animate-pulse" }, e))
				}) : (o?.length ?? 0) > 0 ? /* @__PURE__ */ H("div", {
					className: "grid gap-2 sm:grid-cols-2 lg:grid-cols-4",
					children: o.map((e) => /* @__PURE__ */ H(nt, {
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
				}) : /* @__PURE__ */ H("div", {
					className: "text-[12px] text-text-tertiary",
					children: l
				})]
			}),
			/* @__PURE__ */ U("div", {
				className: "px-3.5 pt-2 pb-2 flex flex-col gap-2",
				children: [
					/* @__PURE__ */ H("label", {
						className: "sr-only",
						htmlFor: w,
						children: i
					}),
					/* @__PURE__ */ H(x, {
						id: w,
						value: _,
						onChange: (e) => v(e.target.value),
						placeholder: i,
						disabled: m
					}),
					/* @__PURE__ */ H("label", {
						className: "sr-only",
						htmlFor: T,
						children: a
					}),
					/* @__PURE__ */ H(O, {
						id: T,
						value: y,
						onChange: (e) => b(e.target.value),
						placeholder: a,
						disabled: m,
						rows: 3,
						onKeyDown: (e) => {
							e.key === "Enter" && (e.metaKey || e.ctrlKey) && (e.preventDefault(), D());
						}
					})
				]
			}),
			/* @__PURE__ */ U("div", {
				className: "px-3.5 pb-3 flex items-center gap-3",
				children: [
					p && /* @__PURE__ */ H("span", {
						className: "text-[11px] text-text-tertiary select-none",
						children: p
					}),
					/* @__PURE__ */ H("span", { className: "flex-1" }),
					/* @__PURE__ */ H(n, {
						size: "sm",
						onClick: D,
						disabled: !E,
						children: m ? "Queueing…" : f
					})
				]
			})
		]
	});
}
//#endregion
//#region src/components/shared/ExpertCard.tsx
var q = 4, it = 3;
function at({ name: t, title: r, subtitle: i, imageUrl: a, matchedSkills: o, otherSkills: s = [], contexts: c = [], evidence: l = [], evidenceLabel: u = "Seen in", onAsk: d, askLabel: p = "Ask for help", footerExtra: m, onOpen: h, className: g, "data-testid": _ }) {
	let v = s.filter((e) => !o.some((t) => t.name.toLowerCase() === e.toLowerCase())), y = l.slice(0, it), b = v.slice(0, q);
	return /* @__PURE__ */ U("div", {
		"data-testid": _,
		onClick: h,
		className: e("flex flex-col gap-2.5 rounded-lg border border-border bg-surface p-3.5 min-w-0", h && "cursor-pointer hover:border-border-emphasis hover:bg-surface-hover transition-colors", g),
		children: [
			/* @__PURE__ */ U("div", {
				className: "flex items-center gap-2.5 min-w-0",
				children: [/* @__PURE__ */ H(A, {
					name: t,
					size: 36,
					...a ? { src: a } : {}
				}), /* @__PURE__ */ U("div", {
					className: "flex flex-col min-w-0",
					children: [/* @__PURE__ */ H("span", {
						className: "text-[13.5px] font-semibold text-text-primary truncate",
						children: t
					}), (r || i) && /* @__PURE__ */ U("span", {
						className: "text-[11.5px] text-text-secondary truncate",
						children: [
							r,
							r && i ? " · " : "",
							i
						]
					})]
				})]
			}),
			o.length > 0 && /* @__PURE__ */ U("div", {
				className: "flex flex-wrap items-center gap-1",
				children: [
					o.map((e) => /* @__PURE__ */ H(f, {
						tone: "accent",
						size: "xs",
						solid: (e.strength ?? 0) >= .7,
						children: e.name
					}, e.name)),
					b.map((e) => /* @__PURE__ */ H(f, {
						tone: "neutral",
						size: "xs",
						children: e
					}, e)),
					v.length > q && /* @__PURE__ */ U("span", {
						className: "text-[10.5px] text-text-tertiary",
						children: ["+", v.length - q]
					})
				]
			}),
			c.length > 0 && /* @__PURE__ */ U("div", {
				className: "text-[11px] text-text-tertiary truncate",
				title: c.join(", "),
				children: ["Working on ", c.join(", ")]
			}),
			y.length > 0 && /* @__PURE__ */ U("div", {
				className: "flex flex-col gap-1 min-w-0",
				children: [/* @__PURE__ */ H("span", {
					className: "text-[10px] font-semibold uppercase tracking-wide text-text-tertiary select-none",
					children: u
				}), y.map((e) => /* @__PURE__ */ U("div", {
					className: "flex items-center gap-1.5 min-w-0",
					children: [e.source && /* @__PURE__ */ H(f, {
						tone: "neutral",
						size: "xs",
						mono: !0,
						children: e.source
					}), e.href ? /* @__PURE__ */ H("a", {
						href: e.href,
						onClick: (e) => e.stopPropagation(),
						className: "text-[11.5px] text-text-secondary no-underline hover:underline truncate",
						children: e.title
					}) : /* @__PURE__ */ H("span", {
						className: "text-[11.5px] text-text-secondary truncate",
						children: e.title
					})]
				}, e.id))]
			}),
			(d || m) && /* @__PURE__ */ U("div", {
				className: "mt-auto pt-1 flex items-center gap-2",
				children: [
					m,
					/* @__PURE__ */ H("span", { className: "flex-1" }),
					d && /* @__PURE__ */ H(n, {
						size: "sm",
						onClick: (e) => {
							e.stopPropagation(), d();
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
var ot = {
	pending: "warning",
	answered: "success",
	expired: "neutral",
	withdrawn: "neutral"
};
function st({ question: t, context: r, origin: i = [], askedAt: a, status: o, answer: s, answeredBy: c, onAnswer: l, answerPlaceholder: u = "Answer the agent — it is waiting on this…", busy: d = !1, footer: p, flush: m = !1, className: h, "data-testid": g }) {
	let [_, v] = B(""), y = _.trim().length > 0 && !d;
	function b() {
		!y || !l || (l(_.trim()), v(""));
	}
	return /* @__PURE__ */ U("section", {
		"data-testid": g,
		className: e("flex flex-col gap-2.5 min-w-0", !m && "rounded-lg border bg-surface p-3.5", !m && (o === "pending" ? "border-warning/50" : "border-border"), h),
		children: [
			/* @__PURE__ */ U("div", {
				className: "flex items-center gap-2 min-w-0",
				children: [
					/* @__PURE__ */ H(f, {
						tone: ot[o],
						size: "xs",
						dot: o === "pending" ? "pulse" : "static",
						uppercase: !0,
						children: o === "pending" ? "agent waiting" : o
					}),
					i.map((e) => /* @__PURE__ */ H(f, {
						tone: "neutral",
						size: "xs",
						mono: !0,
						children: e
					}, e)),
					/* @__PURE__ */ H("span", { className: "flex-1" }),
					a && /* @__PURE__ */ H("span", {
						className: "text-[10.5px] text-text-tertiary whitespace-nowrap",
						children: a
					})
				]
			}),
			/* @__PURE__ */ H("p", {
				className: "m-0 text-[13.5px] font-medium text-text-primary leading-snug",
				children: t
			}),
			r && /* @__PURE__ */ H("p", {
				className: "m-0 text-[12px] text-text-secondary leading-snug border-l-2 border-border pl-2.5",
				children: r
			}),
			o === "answered" && s && /* @__PURE__ */ U("div", {
				className: "flex flex-col gap-1",
				children: [/* @__PURE__ */ U("span", {
					className: "text-[10px] font-semibold uppercase tracking-wide text-text-tertiary select-none",
					children: ["Answer", c ? ` — ${c}` : ""]
				}), /* @__PURE__ */ H("p", {
					className: "m-0 text-[12.5px] text-text-primary leading-snug",
					children: s
				})]
			}),
			o === "expired" && /* @__PURE__ */ H("p", {
				className: "m-0 text-[11.5px] text-text-tertiary",
				children: "Expired unanswered — the agent stopped waiting."
			}),
			o === "pending" && l && /* @__PURE__ */ U("div", {
				className: "flex flex-col gap-2",
				children: [/* @__PURE__ */ H(O, {
					value: _,
					onChange: (e) => v(e.target.value),
					placeholder: u,
					rows: 2,
					disabled: d,
					onKeyDown: (e) => {
						e.key === "Enter" && (e.metaKey || e.ctrlKey) && (e.preventDefault(), b());
					}
				}), /* @__PURE__ */ U("div", {
					className: "flex items-center gap-2",
					children: [
						p,
						/* @__PURE__ */ H("span", { className: "flex-1" }),
						/* @__PURE__ */ H(n, {
							size: "sm",
							onClick: b,
							disabled: !y,
							children: d ? "Sending…" : "Send answer"
						})
					]
				})]
			}),
			(o !== "pending" || !l) && p && /* @__PURE__ */ H("div", {
				className: "flex items-center gap-2",
				children: p
			})
		]
	});
}
//#endregion
//#region src/components/shared/DiffViewer.tsx
var ct = /^@@ -(\d+)(?:,\d+)? \+(\d+)(?:,\d+)? @@/;
function lt(e) {
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
		let e = a.match(ct);
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
var ut = {
	added: "success",
	deleted: "danger",
	renamed: "info",
	modified: "neutral"
}, dt = {
	critical: "danger",
	warning: "warning",
	info: "info"
}, ft = {
	add: "bg-success-bg/40",
	del: "bg-danger-bg/40",
	ctx: "",
	hunk: "bg-surface-hover"
};
function pt({ a: e }) {
	return /* @__PURE__ */ U("div", {
		className: "flex items-start gap-2 px-3 py-2 border-y border-border bg-surface-panel",
		children: [/* @__PURE__ */ H(f, {
			tone: dt[e.severity ?? "info"],
			size: "xs",
			uppercase: !0,
			children: e.severity ?? "note"
		}), /* @__PURE__ */ U("div", {
			className: "min-w-0",
			children: [/* @__PURE__ */ H("span", {
				className: "text-[12px] text-text-primary leading-snug",
				children: e.note
			}), e.author && /* @__PURE__ */ U("span", {
				className: "ml-2 text-[10.5px] text-text-tertiary whitespace-nowrap",
				children: ["— ", e.author]
			})]
		})]
	});
}
function mt({ file: t, annotations: n, collapsed: r, onToggle: i, maxLines: a }) {
	let { pinned: o, floating: s } = R(() => {
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
	return /* @__PURE__ */ U("div", {
		className: "border border-border rounded-lg overflow-hidden bg-surface",
		children: [/* @__PURE__ */ U("button", {
			type: "button",
			onClick: i,
			"aria-expanded": !r,
			className: "w-full flex items-center gap-2 px-3 py-2 bg-surface-panel border-0 cursor-pointer text-left hover:bg-surface-hover min-w-0",
			children: [
				/* @__PURE__ */ H("span", {
					"aria-hidden": !0,
					className: "text-[10px] text-text-tertiary",
					children: r ? "▸" : "▾"
				}),
				/* @__PURE__ */ H("span", {
					className: "text-[12px] font-mono font-semibold text-text-primary truncate",
					children: t.oldPath ? `${t.oldPath} → ${t.path}` : t.path
				}),
				/* @__PURE__ */ H(f, {
					tone: ut[t.status],
					size: "xs",
					children: t.status
				}),
				n.length > 0 && /* @__PURE__ */ U(f, {
					tone: "warning",
					size: "xs",
					mono: !0,
					children: [
						n.length,
						" note",
						n.length === 1 ? "" : "s"
					]
				}),
				/* @__PURE__ */ H("span", { className: "flex-1" }),
				/* @__PURE__ */ U("span", {
					className: "text-[11px] font-mono tabular-nums whitespace-nowrap",
					children: [
						/* @__PURE__ */ U("span", {
							className: "text-success",
							children: ["+", t.adds]
						}),
						" ",
						/* @__PURE__ */ U("span", {
							className: "text-danger",
							children: ["−", t.dels]
						})
					]
				})
			]
		}), !r && /* @__PURE__ */ U("div", {
			className: "overflow-x-auto",
			children: [s.map((e, t) => /* @__PURE__ */ H(pt, { a: e }, `f${t}`)), t.binary ? /* @__PURE__ */ H("div", {
				className: "px-3 py-2 text-[12px] text-text-tertiary",
				children: "Binary file — no text diff."
			}) : /* @__PURE__ */ H("table", {
				className: "w-full border-collapse font-mono text-[11.5px] leading-[1.5]",
				children: /* @__PURE__ */ U("tbody", { children: [c.map((t, n) => t.kind === "hunk" ? /* @__PURE__ */ H("tr", {
					className: ft.hunk,
					children: /* @__PURE__ */ H("td", {
						colSpan: 3,
						className: "px-3 py-0.5 text-[10.5px] text-text-tertiary select-none",
						children: t.text
					})
				}, n) : /* @__PURE__ */ U(V, { children: [/* @__PURE__ */ U("tr", {
					className: ft[t.kind],
					children: [
						/* @__PURE__ */ H("td", {
							className: "w-[3.2em] px-1.5 text-right text-[10px] text-text-tertiary select-none align-top tabular-nums border-r border-border/60",
							children: t.oldNo ?? ""
						}),
						/* @__PURE__ */ H("td", {
							className: "w-[3.2em] px-1.5 text-right text-[10px] text-text-tertiary select-none align-top tabular-nums border-r border-border/60",
							children: t.newNo ?? ""
						}),
						/* @__PURE__ */ U("td", {
							className: e("px-2 whitespace-pre align-top", t.kind === "add" && "text-success", t.kind === "del" && "text-danger", t.kind === "ctx" && "text-text-secondary"),
							children: [/* @__PURE__ */ H("span", {
								className: "select-none inline-block w-[1ch] mr-1 text-text-tertiary",
								children: t.kind === "add" ? "+" : t.kind === "del" ? "-" : " "
							}), t.text || " "]
						})
					]
				}, n), t.newNo != null && o.get(t.newNo)?.map((e, t) => /* @__PURE__ */ H("tr", { children: /* @__PURE__ */ H("td", {
					colSpan: 3,
					className: "p-0",
					children: /* @__PURE__ */ H(pt, { a: e })
				}) }, `${n}-a${t}`))] })), l && /* @__PURE__ */ H("tr", { children: /* @__PURE__ */ U("td", {
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
function ht({ diff: t, annotations: n = [], defaultCollapsed: r = !1, maxLinesPerFile: i = 800, truncatedNote: a, className: o, "data-testid": s }) {
	let c = R(() => lt(t), [t]), [l, u] = B(() => r ? new Set(c.map((e) => e.path)) : /* @__PURE__ */ new Set()), d = z(/* @__PURE__ */ new Map()), f = R(() => {
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
	if (c.length === 0) return /* @__PURE__ */ H("div", {
		"data-testid": s,
		className: e("text-[12px] text-text-tertiary", o),
		children: "No parseable diff."
	});
	let h = c.reduce((e, t) => e + t.adds, 0), g = c.reduce((e, t) => e + t.dels, 0);
	return /* @__PURE__ */ U("div", {
		"data-testid": s,
		className: e("flex flex-col gap-2 min-w-0", o),
		children: [
			/* @__PURE__ */ U("div", {
				className: "flex items-center gap-1.5 flex-wrap",
				children: [/* @__PURE__ */ U("span", {
					className: "text-[11px] text-text-secondary font-medium whitespace-nowrap",
					children: [
						c.length,
						" file",
						c.length === 1 ? "" : "s",
						" ",
						/* @__PURE__ */ U("span", {
							className: "font-mono tabular-nums",
							children: [
								/* @__PURE__ */ U("span", {
									className: "text-success",
									children: ["+", h]
								}),
								" ",
								/* @__PURE__ */ U("span", {
									className: "text-danger",
									children: ["−", g]
								})
							]
						})
					]
				}), c.map((t) => /* @__PURE__ */ H("button", {
					type: "button",
					onClick: () => m(t.path),
					title: t.path,
					className: e("px-1.5 py-0.5 rounded border border-border bg-surface text-[10.5px] font-mono cursor-pointer", "text-text-secondary hover:border-border-emphasis hover:text-text-primary truncate max-w-[220px]", (f.get(t.path)?.length ?? 0) > 0 && "border-warning/60"),
					children: t.path.split("/").pop()
				}, t.path))]
			}),
			a && /* @__PURE__ */ H("div", {
				className: "text-[11px] text-warning",
				children: a
			}),
			c.map((e) => /* @__PURE__ */ H("div", {
				ref: (t) => {
					d.current.set(e.path, t);
				},
				children: /* @__PURE__ */ H(mt, {
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
var gt = {
	1: "sm:grid-cols-1",
	2: "sm:grid-cols-2",
	3: "sm:grid-cols-3",
	4: "sm:grid-cols-4"
}, _t = {
	1: "md:grid-cols-1",
	2: "md:grid-cols-2",
	3: "md:grid-cols-3",
	4: "md:grid-cols-4"
}, vt = {
	1: "lg:grid-cols-1",
	2: "lg:grid-cols-2",
	3: "lg:grid-cols-3",
	4: "lg:grid-cols-4"
};
function yt({ children: t, columns: n = 4, mdColumns: r, dense: i = !1, className: a, style: o, "data-testid": s = "kpi-grid" }) {
	return /* @__PURE__ */ H("div", {
		"data-testid": s,
		className: e("grid grid-cols-1", r ? void 0 : gt[n], r && _t[r], r && vt[n], i ? "gap-2" : "gap-4", a),
		style: o,
		children: t
	});
}
//#endregion
//#region src/components/shared/ProgressBar.tsx
var bt = {
	sm: "h-1.5",
	md: "h-2"
};
function J({ value: t, max: n = 100, color: r, size: i = "md", completeTone: s, label: l, valueLabel: u, showRatio: d = !0, labelClassName: f, className: p, style: m, "data-testid": h, "aria-label": g }) {
	let _ = n > 0 ? n : 100, v = Math.max(0, Math.min(t, _)), y = Math.min(100, v / _ * 100), b = s !== void 0 && y >= 100 ? o(s) : null, x = b ? a(b) : r ?? "var(--color-primary)";
	return /* @__PURE__ */ U("div", {
		"data-testid": h,
		className: e("w-full", p),
		style: m,
		children: [l != null && /* @__PURE__ */ U("div", {
			className: e("flex items-center justify-between mb-1 text-[12px] text-[var(--color-text-secondary)]", f),
			children: [/* @__PURE__ */ H("span", { children: l }), /* @__PURE__ */ H("span", {
				className: e("tabular-nums", b ? c[b] : "text-[var(--color-text-tertiary)]"),
				children: u ?? (d ? `${v}/${_}` : `${Math.round(y)}%`)
			})]
		}), /* @__PURE__ */ H("div", {
			role: "progressbar",
			"aria-valuenow": v,
			"aria-valuemin": 0,
			"aria-valuemax": _,
			"aria-label": g,
			className: e("w-full rounded-full overflow-hidden bg-[var(--color-surface-hover)]", bt[i]),
			children: /* @__PURE__ */ H("div", {
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
var xt = "max-w-none text-text-primary [&>*:first-child]:mt-0 [&>*:last-child]:mb-0 [&_h1]:font-semibold [&_h2]:font-semibold [&_h3]:font-semibold [&_h4]:font-semibold [&_h1]:pb-2 [&_h1]:border-b [&_h1]:border-border [&_h4]:pb-1 [&_h4]:border-b [&_h4]:border-border [&_p]:my-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:my-2 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:my-2 [&_li]:mb-1 [&_li]:last:mb-0 [&_blockquote]:border-l-2 [&_blockquote]:border-border [&_blockquote]:pl-3 [&_blockquote]:my-2 [&_blockquote]:italic [&_blockquote]:text-text-secondary [&_code]:font-mono [&_code]:text-[0.85em] [&_code]:rounded [&_code]:px-1 [&_code]:py-0.5 [&_code]:bg-surface-inset [&_pre]:font-mono [&_pre]:text-xs [&_pre]:rounded-md [&_pre]:border [&_pre]:border-border [&_pre]:bg-surface-inset [&_pre]:p-3 [&_pre]:overflow-x-auto [&_pre]:my-2 [&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_pre_code]:rounded-none [&_pre_code]:text-[inherit] [&_a]:underline-offset-2 [&_a:hover]:underline", St = {
	sm: "text-[13px] leading-snug [&_h1]:text-sm [&_h2]:text-sm [&_h3]:text-[13px] [&_h4]:text-[13px] [&_h1]:mt-3 [&_h2]:mt-3 [&_h3]:mt-2.5 [&_h4]:mt-2.5 [&_h1]:mb-1.5 [&_h2]:mb-1.5 [&_h3]:mb-1 [&_h4]:mb-1",
	md: "text-sm leading-relaxed [&_h1]:text-xl [&_h2]:text-lg [&_h3]:text-base [&_h4]:text-sm [&_h1]:mt-6 [&_h2]:mt-5 [&_h3]:mt-4 [&_h4]:mt-4 [&_h1]:mb-3 [&_h2]:mb-2 [&_h3]:mb-1.5 [&_h4]:mb-1.5"
}, Ct = "[&_h1]:text-text-primary [&_h2]:text-text-primary [&_h3]:text-text-primary [&_h4]:text-text-primary [&_a]:text-primary", wt = {
	neutral: "[&_h1]:text-neutral-fg [&_h2]:text-neutral-fg [&_h3]:text-neutral-fg [&_h4]:text-neutral-fg [&_a]:text-neutral-fg",
	success: "[&_h1]:text-success-fg [&_h2]:text-success-fg [&_h3]:text-success-fg [&_h4]:text-success-fg [&_a]:text-success-fg",
	warning: "[&_h1]:text-warning-fg [&_h2]:text-warning-fg [&_h3]:text-warning-fg [&_h4]:text-warning-fg [&_a]:text-warning-fg",
	danger: "[&_h1]:text-danger-fg [&_h2]:text-danger-fg [&_h3]:text-danger-fg [&_h4]:text-danger-fg [&_a]:text-danger-fg",
	info: "[&_h1]:text-info-fg [&_h2]:text-info-fg [&_h3]:text-info-fg [&_h4]:text-info-fg [&_a]:text-info-fg",
	caution: "[&_h1]:text-caution-fg [&_h2]:text-caution-fg [&_h3]:text-caution-fg [&_h4]:text-caution-fg [&_a]:text-caution-fg",
	accent: "[&_h1]:text-accent-fg [&_h2]:text-accent-fg [&_h3]:text-accent-fg [&_h4]:text-accent-fg [&_a]:text-accent-fg"
};
function Tt({ children: t, size: n = "md", tone: r, className: i, "data-testid": a }) {
	let s = r === void 0 ? void 0 : o(r);
	return /* @__PURE__ */ H("div", {
		"data-testid": a,
		className: e(xt, St[n], s ? wt[s] : Ct, i),
		children: t
	});
}
//#endregion
//#region src/components/shared/UserChip.tsx
function Et({ name: t, label: n, avatarSize: r = 20, avatarColor: i, presence: a, onClick: o, className: s, style: c, title: l, labelClassName: u, "data-testid": d = "user-chip" }) {
	return /* @__PURE__ */ U(o ? "button" : "span", {
		type: o ? "button" : void 0,
		onClick: o,
		title: l ?? t,
		"data-testid": d,
		className: e("inline-flex items-center gap-1.5 rounded-full px-1.5 py-0.5 text-[12px] text-text-primary", o && "hover:bg-surface-hover cursor-pointer transition-colors", !o && "cursor-default", s),
		style: c,
		children: [
			/* @__PURE__ */ H(A, {
				name: t,
				size: r,
				color: i
			}),
			/* @__PURE__ */ H("span", {
				className: e("font-medium leading-none", u),
				children: n ?? t
			}),
			a && /* @__PURE__ */ H(j, {
				state: a,
				size: "xs"
			})
		]
	});
}
//#endregion
//#region src/components/shared/EntityCell.tsx
function Dt({ label: t, id: n, href: r, mono: i = !1, className: a, labelClassName: o }) {
	let s = /* @__PURE__ */ H("span", {
		className: "truncate",
		children: t
	});
	return /* @__PURE__ */ U("div", {
		className: e("flex flex-col min-w-0", a),
		children: [/* @__PURE__ */ H("div", {
			className: e("font-medium text-[var(--color-text-primary)] truncate text-sm", o),
			children: r ? /* @__PURE__ */ H("a", {
				href: r,
				className: "hover:text-[var(--color-primary)] hover:underline",
				children: s
			}) : s
		}), n && /* @__PURE__ */ H("div", {
			className: e("text-[10px] font-mono text-[var(--color-text-tertiary)] truncate mt-0.5", i && "tracking-tight"),
			children: n
		})]
	});
}
//#endregion
//#region src/components/shared/CollapsibleSection.tsx
function Ot(e, t) {
	if (!e || typeof window > "u") return t;
	try {
		let n = window.localStorage.getItem(e);
		return n === null ? t : n === "true";
	} catch {
		return t;
	}
}
function kt({ title: t, defaultOpen: n = !1, badge: r, actions: i, children: a, className: o, storageKey: s, density: c = "default", "data-testid": l }) {
	let [u, d] = B(() => Ot(s, n)), f = c === "compact", p = L(), m = z(null), h = z(null);
	return I(() => {
		if (s && !(typeof window > "u")) try {
			window.localStorage.setItem(s, String(u));
		} catch {}
	}, [u, s]), /* @__PURE__ */ U("div", {
		className: e("border border-[var(--color-border)] rounded-lg overflow-hidden", o),
		children: [/* @__PURE__ */ U("div", {
			className: "flex items-stretch bg-[var(--color-surface)]",
			children: [/* @__PURE__ */ U("button", {
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
				children: [/* @__PURE__ */ H("span", {
					className: e("font-semibold text-[var(--color-text-primary)]", f ? "text-xs" : "text-sm"),
					children: t
				}), /* @__PURE__ */ U("div", {
					className: "flex items-center gap-2",
					children: [r, /* @__PURE__ */ H("svg", {
						className: e("text-[var(--color-text-tertiary)] transition-transform", f ? "w-3 h-3" : "w-4 h-4", u && "rotate-180"),
						viewBox: "0 0 16 16",
						fill: "none",
						"aria-hidden": "true",
						children: /* @__PURE__ */ H("path", {
							d: "M4 6l4 4 4-4",
							stroke: "currentColor",
							strokeWidth: "1.5",
							strokeLinecap: "round",
							strokeLinejoin: "round"
						})
					})]
				})]
			}), i && /* @__PURE__ */ H("div", {
				className: "flex items-center gap-2 pr-4 shrink-0",
				children: i
			})]
		}), u && /* @__PURE__ */ H("div", {
			id: p,
			ref: h,
			className: "border-t border-[var(--color-border)] bg-surface",
			children: a
		})]
	});
}
//#endregion
//#region src/components/shared/ThumbnailCard.tsx
function At({ title: t, description: n, category: r, categoryTone: i = "neutral", thumbnail: a, icon: o = "🧩", thumbnailHeight: s = 160, href: c, onClick: l, badge: u, meta: d, className: p, style: m, "data-testid": h = "thumbnail-card" }) {
	let g = e("group block w-full text-left bg-[var(--color-surface,#fff)]", "rounded-xl border border-[var(--color-border)] overflow-hidden", "transition-[box-shadow,transform] duration-150", (c || l) && "cursor-pointer hover:shadow-[0_8px_25px_rgba(0,0,0,0.08)] hover:-translate-y-0.5", p), _ = /* @__PURE__ */ U(V, { children: [/* @__PURE__ */ U("div", {
		"data-testid": `${h}-thumb`,
		className: e("relative flex items-center justify-center", "bg-gradient-to-br from-[var(--color-primary-bg,#eef2ff)] to-[var(--color-surface,#ffffff)]", "border-b border-[var(--color-border)]"),
		style: { height: s },
		children: [a ? /* @__PURE__ */ H("img", {
			src: a,
			alt: "",
			className: "w-full h-full object-cover"
		}) : /* @__PURE__ */ H("span", {
			className: "text-5xl opacity-50",
			"aria-hidden": !0,
			children: o
		}), u && /* @__PURE__ */ H("span", {
			"data-testid": `${h}-badge`,
			className: "absolute top-2 right-2",
			children: u
		})]
	}), /* @__PURE__ */ U("div", {
		className: "px-4 py-3",
		children: [
			/* @__PURE__ */ U("div", {
				className: "flex items-center gap-2 mb-1.5",
				children: [r && /* @__PURE__ */ H(f, {
					tone: i,
					size: "xs",
					"data-testid": `${h}-category`,
					children: r
				}), d && /* @__PURE__ */ H("span", {
					className: "ml-auto",
					children: d
				})]
			}),
			/* @__PURE__ */ H("div", {
				className: "text-[14px] font-semibold text-[var(--color-text-primary)] leading-snug",
				children: t
			}),
			n && /* @__PURE__ */ H("div", {
				className: "mt-1 text-[12px] text-[var(--color-text-secondary)] leading-snug",
				children: n
			})
		]
	})] });
	return c ? /* @__PURE__ */ H("a", {
		href: c,
		onClick: l,
		"data-testid": h,
		className: e(g, "no-underline text-inherit"),
		style: m,
		children: _
	}) : l ? /* @__PURE__ */ H("button", {
		type: "button",
		onClick: l,
		"data-testid": h,
		className: e(g, "font-inherit"),
		style: m,
		children: _
	}) : /* @__PURE__ */ H("div", {
		"data-testid": h,
		className: g,
		style: m,
		children: _
	});
}
//#endregion
//#region src/components/shared/CatalogGrid.tsx
var jt = {
	1: "sm:grid-cols-1",
	2: "sm:grid-cols-2",
	3: "sm:grid-cols-2 lg:grid-cols-3",
	4: "sm:grid-cols-2 lg:grid-cols-4",
	5: "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
};
function Mt({ children: t, columns: n = 3, dense: r = !1, className: i, style: a, "data-testid": o = "catalog-grid" }) {
	return /* @__PURE__ */ H("div", {
		"data-testid": o,
		"data-columns": n,
		className: e("grid grid-cols-1", jt[n], r ? "gap-3" : "gap-5", i),
		style: a,
		children: t
	});
}
//#endregion
//#region src/components/shared/StackDiagram.tsx
function Nt({ orientation: t, variant: n }) {
	if (n === "none") return null;
	let r = t === "vertical", i = n === "arrow" ? r ? "↓" : "→" : r ? "│" : "─";
	return /* @__PURE__ */ H("div", {
		"data-testid": "stack-diagram-connector",
		"aria-hidden": !0,
		className: e("flex items-center justify-center text-[var(--color-text-tertiary)]", r ? "h-5 text-base" : "w-5 text-base"),
		children: i
	});
}
function Pt({ layers: t, orientation: n = "vertical", connector: i = "arrow", className: a, style: l, "data-testid": u = "stack-diagram" }) {
	let d = n === "vertical";
	return /* @__PURE__ */ H("div", {
		"data-testid": u,
		"data-orientation": n,
		"data-connector": i,
		className: e("flex", d ? "flex-col items-stretch" : "flex-row items-stretch flex-wrap", a),
		style: l,
		children: t.map((a, l) => {
			let u = o(a.tone ?? "neutral");
			return /* @__PURE__ */ U("div", {
				className: e("flex", "flex-col"),
				children: [/* @__PURE__ */ U("div", {
					"data-testid": "stack-diagram-layer",
					"data-tone": u,
					className: e("rounded-md border px-3 py-2", r[u], s[u], !d && "min-w-[140px]"),
					children: [/* @__PURE__ */ U("div", {
						className: "flex items-center gap-2",
						children: [
							a.icon != null && /* @__PURE__ */ H("span", {
								className: "shrink-0 text-[14px] leading-none",
								"aria-hidden": !0,
								children: a.icon
							}),
							/* @__PURE__ */ H("span", {
								className: e("text-[12px] font-semibold", c[u]),
								children: a.label
							}),
							a.meta != null && /* @__PURE__ */ H("span", {
								className: "ml-auto text-[10px] text-[var(--color-text-tertiary)] shrink-0",
								children: a.meta
							})
						]
					}), a.description != null && /* @__PURE__ */ H("div", {
						className: "mt-0.5 text-[11px] leading-snug text-[var(--color-text-secondary)]",
						children: a.description
					})]
				}), l < t.length - 1 && /* @__PURE__ */ H(Nt, {
					orientation: n,
					variant: i
				})]
			}, a.id);
		})
	});
}
var Ft = Pt;
//#endregion
//#region src/components/shared/ChatComposer.tsx
function It({ value: t, onChange: n, onSubmit: r, disabled: i = !1, multiline: a = !1, placeholder: o, submitLabel: s = "→", className: c, style: l, autoFocus: u, maxRows: d = 4, "aria-label": f = "Message", "aria-labelledby": p, submitAriaLabel: m = "Send" }) {
	let h = !i && t.trim().length > 0, g = typeof s == "string" && /\p{L}|\p{N}/u.test(s) ? void 0 : m, _ = p ? void 0 : f, v = () => {
		h && r();
	}, y = (e) => {
		if (e.key === "Enter") {
			if (a && e.shiftKey) return;
			e.preventDefault(), v();
		}
	}, b = e("flex-1 px-3 py-2 text-sm rounded-lg border border-[var(--color-border-field,#d1d5db)] bg-surface text-[var(--color-text-primary)]", "placeholder:text-[var(--color-text-tertiary)]", "focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent", "resize-none", i && "opacity-50 cursor-not-allowed bg-[var(--color-surface-hover)]");
	return /* @__PURE__ */ U("div", {
		className: e("flex items-end gap-2 p-3 border-t border-[var(--color-border)] bg-[var(--color-surface)]", c),
		style: l,
		children: [a ? /* @__PURE__ */ H("textarea", {
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
		}) : /* @__PURE__ */ H("input", {
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
		}), /* @__PURE__ */ H("button", {
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
function Lt({ name: t, done: n, title: r, className: i }) {
	return /* @__PURE__ */ U("span", {
		title: r,
		className: e("inline-flex items-center gap-1 text-[10.5px] font-mono px-2 py-0.5 rounded-full", n ? "bg-[var(--color-success-bg,#f0fdf4)] text-[var(--color-success,#16a34a)]" : "bg-[var(--color-info-bg,#eff6ff)] text-[var(--color-info,#1d4ed8)]", i),
		children: [t, n ? " ✓" : "…"]
	});
}
function Rt({ toolCalls: t, className: n }) {
	return /* @__PURE__ */ H("div", {
		className: e("flex flex-wrap gap-1.5 py-1", n),
		children: t.map((e) => /* @__PURE__ */ H(Lt, {
			name: e.name,
			done: e.done
		}, e.id))
	});
}
//#endregion
//#region src/components/shared/MessageBubble.tsx
function zt({ role: t, content: n, toolCalls: r, streaming: i = !1, agentName: a, userName: o, renderMarkdown: s, className: c }) {
	let l = t === "user" ? o || "You" : a || "Assistant";
	return /* @__PURE__ */ U("div", {
		className: e("flex flex-col gap-1.5 py-3", c),
		children: [
			/* @__PURE__ */ H("div", {
				className: "text-[11px] font-semibold uppercase tracking-wide text-[var(--color-text-tertiary)]",
				children: l
			}),
			r && r.length > 0 && /* @__PURE__ */ H(Rt, { toolCalls: r }),
			t === "user" ? /* @__PURE__ */ H("div", {
				className: "text-sm text-[var(--color-text-primary)] whitespace-pre-wrap",
				children: n
			}) : /* @__PURE__ */ H("div", {
				className: "text-sm text-[var(--color-text-primary)] prose-sm max-w-none",
				children: n ? s ? s(n) : /* @__PURE__ */ H("span", {
					className: "whitespace-pre-wrap",
					children: n
				}) : i ? /* @__PURE__ */ H(E, {}) : null
			})
		]
	});
}
//#endregion
//#region src/components/shared/ThinkingBlock.tsx
function Bt({ content: t, streaming: n = !1, defaultOpen: r = !1, className: i }) {
	let a = n || !t ? "Thinking" : "Thought";
	return /* @__PURE__ */ U("details", {
		open: r,
		className: e("rounded-md border border-[var(--color-border)] overflow-hidden text-sm group", i),
		children: [/* @__PURE__ */ U("summary", {
			className: "flex items-center gap-2 px-3 py-2 cursor-pointer select-none bg-[var(--color-surface)] hover:bg-[var(--color-surface-hover)] text-[var(--color-text-tertiary)] list-none",
			children: [
				/* @__PURE__ */ H("svg", {
					className: "w-3.5 h-3.5 transition-transform group-open:rotate-90",
					xmlns: "http://www.w3.org/2000/svg",
					viewBox: "0 0 20 20",
					fill: "currentColor",
					"aria-hidden": "true",
					children: /* @__PURE__ */ H("path", {
						fillRule: "evenodd",
						d: "M7.21 14.77a.75.75 0 010-1.06L10.94 10 7.21 6.29a.75.75 0 011.08-1.04l4.25 4.25a.75.75 0 010 1.06l-4.25 4.25a.75.75 0 01-1.08-.04z",
						clipRule: "evenodd"
					})
				}),
				/* @__PURE__ */ H("span", {
					className: "text-[11px] font-semibold uppercase tracking-wide",
					children: a
				}),
				n && !t && /* @__PURE__ */ H(E, { size: "sm" })
			]
		}), /* @__PURE__ */ H("div", {
			className: "px-3 py-2 text-xs text-[var(--color-text-secondary)] italic border-t border-[var(--color-border)] bg-surface whitespace-pre-wrap leading-relaxed",
			children: t || /* @__PURE__ */ H(E, {})
		})]
	});
}
//#endregion
//#region src/components/shared/QuickPromptGrid.tsx
function Vt({ prompts: t, onSelect: n, columns: r, title: i, className: a }) {
	let o = r ? `repeat(${r}, minmax(0, 1fr))` : "repeat(auto-fit, minmax(220px, 1fr))";
	return /* @__PURE__ */ U("div", {
		className: e("flex flex-col gap-3", a),
		children: [i && /* @__PURE__ */ H("p", {
			className: "text-xs font-semibold uppercase tracking-wide text-[var(--color-text-tertiary)] text-center",
			children: i
		}), /* @__PURE__ */ H("div", {
			style: {
				display: "grid",
				gridTemplateColumns: o,
				gap: 10
			},
			children: t.map((e, t) => /* @__PURE__ */ U("button", {
				type: "button",
				onClick: () => n(e.label),
				className: "flex flex-col gap-1 px-4 py-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] hover:bg-[var(--color-surface-hover)] hover:border-[var(--color-border-emphasis,#cbd5e1)] text-left transition-colors",
				children: [/* @__PURE__ */ H("span", {
					className: "text-sm font-medium text-[var(--color-text-primary)]",
					children: e.label
				}), e.hint && /* @__PURE__ */ H("span", {
					className: "text-xs text-[var(--color-text-tertiary)]",
					children: e.hint
				})]
			}, t))
		})]
	});
}
//#endregion
//#region src/components/shared/UserMenu.tsx
function Ht({ user: t, items: n, className: r, "data-testid": i }) {
	let [a, o] = B(!1), s = z(null), c = F(() => o(!1), []);
	return I(() => {
		if (!a) return;
		let e = (e) => {
			s.current && !s.current.contains(e.target) && c();
		};
		return document.addEventListener("mousedown", e), () => document.removeEventListener("mousedown", e);
	}, [a, c]), w(a, c), /* @__PURE__ */ U("div", {
		ref: s,
		"data-testid": i,
		className: e("relative inline-block", r),
		children: [/* @__PURE__ */ U("button", {
			type: "button",
			"aria-label": `User menu for ${t.name}`,
			"aria-expanded": a,
			"aria-haspopup": "menu",
			onClick: () => o((e) => !e),
			className: e("flex items-center gap-2 bg-transparent border-none cursor-pointer p-1 rounded-lg", "hover:bg-[var(--color-surface-hover)] transition-colors duration-100", a && "bg-[var(--color-surface-hover)]"),
			children: [
				t.avatarUrl ? /* @__PURE__ */ H("img", {
					src: t.avatarUrl,
					alt: t.name,
					className: "w-8 h-8 rounded-full object-cover"
				}) : /* @__PURE__ */ H(A, {
					name: t.name,
					size: 32
				}),
				/* @__PURE__ */ U("div", {
					className: "flex flex-col items-start text-left min-w-0 hidden sm:flex",
					children: [/* @__PURE__ */ H("span", {
						className: "text-sm font-medium text-[var(--color-text-primary)] leading-tight truncate max-w-[120px]",
						children: t.name
					}), /* @__PURE__ */ H("span", {
						className: "text-xs text-[var(--color-text-tertiary)] leading-tight truncate max-w-[120px]",
						children: t.email
					})]
				}),
				/* @__PURE__ */ H("svg", {
					width: "12",
					height: "12",
					viewBox: "0 0 12 12",
					fill: "none",
					"aria-hidden": "true",
					className: e("text-[var(--color-text-tertiary)] transition-transform duration-150", a ? "rotate-180" : "rotate-0"),
					children: /* @__PURE__ */ H("path", {
						d: "M2 4l4 4 4-4",
						stroke: "currentColor",
						strokeWidth: "1.5",
						strokeLinecap: "round",
						strokeLinejoin: "round"
					})
				})
			]
		}), a && /* @__PURE__ */ U("div", {
			role: "menu",
			"aria-label": "User menu",
			className: e("absolute right-0 top-[calc(100%+6px)] min-w-[200px] z-[200]", "bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl shadow-md overflow-hidden"),
			children: [/* @__PURE__ */ U("div", {
				className: "px-3 py-2.5 border-b border-[var(--color-border)]",
				children: [/* @__PURE__ */ H("p", {
					className: "text-sm font-semibold text-[var(--color-text-primary)] truncate",
					children: t.name
				}), /* @__PURE__ */ H("p", {
					className: "text-xs text-[var(--color-text-tertiary)] truncate",
					children: t.email
				})]
			}), /* @__PURE__ */ H("div", {
				className: "py-1",
				children: n.map((t, n) => /* @__PURE__ */ U("div", { children: [t.separator && n > 0 && /* @__PURE__ */ H("div", { className: "my-1 border-t border-[var(--color-border)]" }), /* @__PURE__ */ U("button", {
					type: "button",
					role: "menuitem",
					onClick: () => {
						t.onClick(), c();
					},
					className: e("flex items-center gap-2.5 w-full text-left px-3 py-2", "text-sm border-none cursor-pointer font-[inherit] transition-colors duration-100", t.danger ? "text-danger-fg bg-transparent hover:bg-danger-bg" : "text-[var(--color-text-primary)] bg-transparent hover:bg-[var(--color-surface-hover)]"),
					children: [t.icon && /* @__PURE__ */ H("span", {
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
var Ut = {
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
}, Wt = {
	bg: "var(--color-surface-hover)",
	border: "var(--color-border-field)",
	text: "var(--color-text-primary)",
	accent: "var(--color-neutral)"
};
function Gt({ status: e, colors: t }) {
	return /* @__PURE__ */ U("span", {
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
		children: [/* @__PURE__ */ H("span", { style: {
			width: 5,
			height: 5,
			borderRadius: "50%",
			background: t.accent
		} }), e.replace(/_/g, " ")]
	});
}
function Kt({ name: e, id: t, status: n, statusColors: r, contributorNames: i = [], contributorCount: a, activityItems: o = [], presenceDotColor: s = "var(--color-border-field)", activityLabel: c = "", cardIndex: l = 0, onClick: u, className: d, style: f, minHeight: p = 190 }) {
	let m = {
		...Ut,
		...r
	}[(n ?? "unknown").toLowerCase().replace(/ /g, "_")] ?? Wt, h = a === void 0 ? 0 : Math.max(0, a - i.length), g = l % 8 * 525;
	return /* @__PURE__ */ U(u ? "button" : "div", {
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
			/* @__PURE__ */ U("div", {
				style: {
					display: "flex",
					alignItems: "flex-start",
					justifyContent: "space-between",
					gap: 8
				},
				children: [/* @__PURE__ */ U("div", {
					style: {
						flex: 1,
						minWidth: 0
					},
					children: [/* @__PURE__ */ H("h3", {
						style: {
							margin: "0 0 3px",
							fontSize: 13.5,
							fontWeight: 700,
							color: "var(--color-text-primary, #111827)",
							lineHeight: 1.35
						},
						children: e
					}), t && /* @__PURE__ */ H("span", {
						style: {
							fontSize: 10,
							fontFamily: "ui-monospace, \"SFMono-Regular\", Menlo, monospace",
							color: "var(--color-text-tertiary)",
							letterSpacing: "0.02em"
						},
						children: t
					})]
				}), n && /* @__PURE__ */ H(Gt, {
					status: n,
					colors: m
				})]
			}),
			/* @__PURE__ */ H(ee, {
				items: o,
				staggerMs: g
			}),
			/* @__PURE__ */ U("div", {
				style: {
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
					paddingTop: 8,
					borderTop: "1px solid var(--color-border-subtle, #f3f4f6)",
					gap: 8
				},
				children: [/* @__PURE__ */ U("div", {
					style: {
						display: "flex",
						alignItems: "center",
						gap: 8,
						minWidth: 0
					},
					children: [i.length > 0 ? /* @__PURE__ */ H(k, {
						names: i,
						maxVisible: 5,
						size: 24
					}) : /* @__PURE__ */ U("span", {
						style: {
							fontSize: 12,
							color: "var(--color-text-tertiary)"
						},
						children: [/* @__PURE__ */ H("strong", {
							style: { color: "var(--color-text-primary)" },
							children: a ?? 0
						}), " contributors"]
					}), i.length > 0 && h > 0 && /* @__PURE__ */ U("span", {
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
				}), c && /* @__PURE__ */ U("div", {
					style: {
						display: "flex",
						alignItems: "center",
						gap: 5,
						flexShrink: 0
					},
					children: [/* @__PURE__ */ H("span", { style: {
						width: 6,
						height: 6,
						borderRadius: "50%",
						background: s,
						flexShrink: 0
					} }), /* @__PURE__ */ H("span", {
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
function qt(e) {
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
function Jt({ items: e, storageKey: t, title: n, renderNavItem: r, railLabel: i }) {
	let a = R(() => qt(e), [e]), o = a.some((e) => e.name !== null);
	return /* @__PURE__ */ H("nav", {
		"aria-label": i,
		className: "flex-1 overflow-y-auto py-1",
		children: o ? a.map((e) => e.name === null ? /* @__PURE__ */ H(Xt, {
			items: e.items,
			renderNavItem: r
		}, "__ungrouped") : /* @__PURE__ */ H(Zt, {
			name: e.name,
			items: e.items,
			storageKey: `${t}.${n}.${e.name}`,
			renderNavItem: r
		}, e.name)) : /* @__PURE__ */ H(Xt, {
			items: e,
			renderNavItem: r
		})
	});
}
function Yt({ title: e, items: t, titleAction: n, railHeader: r, railWidth: i = 220, storageKey: a = "subnav", secondaryTitle: o, secondaryItems: s, secondaryStorageKey: c, secondaryRailWidth: l = 200, renderNavItem: u, railLabel: d, contentAs: f = "main", contentLabel: p, children: m }) {
	let h = f, g = s && s.length > 0;
	return /* @__PURE__ */ U("div", {
		className: "flex h-full min-h-0",
		children: [
			/* @__PURE__ */ U("aside", {
				className: "flex-none border-r border-[var(--color-border)] bg-[var(--color-surface)] flex flex-col overflow-hidden",
				style: { width: i },
				children: [
					/* @__PURE__ */ U("div", {
						className: "flex items-center justify-between px-4 py-[14px] border-b border-[var(--color-border)]",
						children: [/* @__PURE__ */ H("span", {
							className: "text-[11px] font-semibold text-[var(--color-text-tertiary)] uppercase tracking-[0.05em]",
							children: e
						}), n]
					}),
					r && /* @__PURE__ */ H("div", {
						className: "px-3 py-2 border-b border-[var(--color-border)]",
						children: r
					}),
					/* @__PURE__ */ H(Jt, {
						items: t,
						storageKey: a,
						title: e,
						renderNavItem: u,
						railLabel: d
					})
				]
			}),
			g && /* @__PURE__ */ U("aside", {
				className: "flex-none border-r border-[var(--color-border)] bg-[var(--color-surface)] flex flex-col overflow-hidden",
				style: { width: l },
				children: [/* @__PURE__ */ H("div", {
					className: "flex items-center justify-between px-4 py-[14px] border-b border-[var(--color-border)]",
					children: /* @__PURE__ */ H("span", {
						className: "text-[11px] font-semibold text-[var(--color-text-tertiary)] uppercase tracking-[0.05em]",
						children: o ?? ""
					})
				}), /* @__PURE__ */ H(Jt, {
					items: s,
					storageKey: c ?? `${a}.secondary`,
					title: o ?? "secondary",
					renderNavItem: u
				})]
			}),
			/* @__PURE__ */ H(h, {
				"aria-label": p,
				className: "flex-1 min-w-0 overflow-auto p-6",
				children: m
			})
		]
	});
}
function Xt({ items: e, renderNavItem: t }) {
	return /* @__PURE__ */ H(V, { children: e.map((e) => /* @__PURE__ */ H(Qt, {
		item: e,
		renderNavItem: t
	}, e.path)) });
}
function Zt({ name: t, items: n, storageKey: r, renderNavItem: i }) {
	let [a, o] = B(() => typeof window > "u" ? !1 : window.localStorage?.getItem(r) === "1");
	I(() => {
		typeof window > "u" || (a ? window.localStorage?.setItem(r, "1") : window.localStorage?.removeItem(r));
	}, [a, r]);
	let s = L(), c = z(null), l = z(null), u = () => {
		if (!a) {
			let e = typeof document > "u" ? null : document.activeElement;
			e && l.current?.contains(e) && c.current?.focus();
		}
		o((e) => !e);
	}, d = n.find((e) => e.groupScrollAfter)?.groupScrollAfter, f = d ? {
		maxHeight: d * 40,
		overflowY: "auto"
	} : void 0;
	return /* @__PURE__ */ U("section", {
		className: "border-b border-[var(--color-border)]",
		children: [/* @__PURE__ */ U("button", {
			type: "button",
			ref: c,
			onClick: u,
			className: e("flex items-center gap-1.5 w-full px-2 bg-transparent border-none cursor-pointer text-left hover:bg-surface-hover", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary", ae, re, te),
			"aria-expanded": !a,
			"aria-controls": s,
			"data-testid": "subnav-group-header",
			children: [
				/* @__PURE__ */ H("span", {
					className: "grid h-5 w-5 shrink-0 place-items-center",
					"aria-hidden": "true",
					children: /* @__PURE__ */ H(ne, { open: !a })
				}),
				/* @__PURE__ */ H("span", {
					className: "min-w-0 flex-1 truncate",
					children: t
				}),
				/* @__PURE__ */ H("span", {
					className: e("shrink-0 pr-1", oe),
					"aria-label": `${n.length} items`,
					"data-testid": "subnav-group-count",
					children: n.length
				})
			]
		}), !a && /* @__PURE__ */ H("div", {
			id: s,
			ref: l,
			style: f,
			children: n.map((e) => /* @__PURE__ */ H(Qt, {
				item: e,
				renderNavItem: i
			}, e.path))
		})]
	});
}
function Qt({ item: t, renderNavItem: n }) {
	let r = t.accent === "danger" ? "var(--color-danger)" : t.accent === "warning" ? "var(--color-warning)" : t.accent === "success" ? "var(--color-success)" : void 0, i = /* @__PURE__ */ U(V, { children: [/* @__PURE__ */ U("div", {
		className: "flex min-w-0 items-center justify-between gap-2",
		children: [/* @__PURE__ */ H("span", {
			className: e("min-w-0 truncate", N),
			style: r ? { color: r } : void 0,
			"data-testid": "subnav-item-label",
			children: t.label
		}), t.count !== void 0 && /* @__PURE__ */ H("span", {
			className: e("shrink-0", "text-[13px] font-medium leading-5 tabular-nums text-text-tertiary"),
			"data-testid": "subnav-item-count",
			children: t.count
		})]
	}), t.hint && /* @__PURE__ */ H("div", {
		className: "text-[12px] leading-4 text-[var(--color-text-tertiary)] mt-0.5",
		children: t.hint
	})] });
	return t.onClick ? /* @__PURE__ */ H("button", {
		type: "button",
		onClick: t.onClick,
		className: e("block w-full px-[14px] border-l-[3px] border-transparent border-t-0 border-r-0 border-b-0 bg-transparent text-text-primary text-left cursor-pointer font-[inherit] hover:bg-surface-hover", P),
		children: i
	}) : n ? /* @__PURE__ */ H(V, { children: n(t, i, {
		display: "block",
		padding: "9px 14px",
		borderLeft: "3px solid transparent",
		color: "var(--color-text-primary)",
		textDecoration: "none",
		cursor: "pointer"
	}) }) : /* @__PURE__ */ H("a", {
		href: t.path,
		className: en,
		children: i
	});
}
var $t = {
	borderLeft: "3px solid var(--color-primary)",
	background: "color-mix(in srgb, var(--color-primary) 8%, transparent)",
	color: "var(--color-text-primary)"
}, en = `block px-[14px] ${P} border-l-[3px] border-transparent text-text-primary no-underline cursor-pointer hover:bg-surface-hover`, tn = `block px-[14px] ${P} border-l-[3px] border-primary ${ie} text-text-primary no-underline cursor-pointer`, nn = e("flex w-full min-w-0 items-center gap-2.5 rounded-md border-0 bg-transparent px-2.5 py-[6px] text-left", N, "text-text-primary no-underline [font-family:inherit]", "transition-colors duration-100 hover:bg-surface-hover", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary");
function rn({ items: t, "aria-label": n = "Views", className: r, "data-testid": i = "rail-nav-list" }) {
	return t.length === 0 ? null : /* @__PURE__ */ H("nav", {
		"aria-label": n,
		className: e("min-w-0", r),
		"data-testid": i,
		children: /* @__PURE__ */ H("ul", {
			className: "m-0 flex list-none flex-col p-0",
			children: t.map((t) => {
				let n = /* @__PURE__ */ U(V, { children: [
					t.icon != null && /* @__PURE__ */ H("span", {
						className: "flex shrink-0 items-center text-text-secondary",
						children: t.icon
					}),
					/* @__PURE__ */ H("span", {
						className: "min-w-0 flex-1 truncate",
						title: t.label,
						children: t.label
					}),
					typeof t.count == "number" && /* @__PURE__ */ H("span", {
						className: e("shrink-0", "text-[13px] font-medium leading-5 tabular-nums text-text-tertiary"),
						"aria-label": `${t.count} items`,
						"data-testid": `${i}-count-${t.id}`,
						children: t.count
					})
				] }), r = {
					className: e(nn, t.current ? "font-semibold" : void 0, t.disabled ? "cursor-default opacity-60 hover:bg-transparent" : "cursor-pointer"),
					"data-testid": `${i}-item-${t.id}`,
					"data-current": t.current || void 0,
					"aria-current": t.current ? "page" : void 0
				};
				return /* @__PURE__ */ H("li", {
					className: "min-w-0",
					children: t.href && !t.disabled ? /* @__PURE__ */ H("a", {
						href: t.href,
						onClick: () => t.onSelect?.(),
						...r,
						children: n
					}) : /* @__PURE__ */ H("button", {
						type: "button",
						disabled: t.disabled,
						title: t.disabled ? t.disabledReason : void 0,
						onClick: () => {
							t.disabled || t.onSelect?.();
						},
						...r,
						children: n
					})
				}, t.id);
			})
		})
	});
}
//#endregion
//#region src/components/shared/NavRail.tsx
var an = {
	narrow: "w-44",
	default: "w-56",
	wide: "w-64"
}, on = {
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
		active: "bg-primary/8 border-l-primary"
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
function sn(e, t) {
	return e.id ?? e.to ?? `item-${t}`;
}
function cn(e, t, n) {
	return !t || !e.to ? !1 : t === e.to ? !0 : n === "exact" || e.to === "/" ? !1 : t.startsWith(e.to.endsWith("/") ? e.to : `${e.to}/`);
}
function ln(e) {
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
function un({ item: t, active: n, palette: r, renderLink: i, size: a = "sm" }) {
	let o = /* @__PURE__ */ U(V, { children: [/* @__PURE__ */ U("span", {
		className: "flex items-center gap-2 min-w-0",
		children: [
			t.icon && /* @__PURE__ */ H("span", {
				className: "flex-none",
				"aria-hidden": "true",
				children: t.icon
			}),
			/* @__PURE__ */ H("span", {
				className: e("truncate", N, r.labelActive),
				children: t.label
			}),
			t.badge != null && /* @__PURE__ */ H("span", {
				className: e("ml-auto flex-none", "text-[13px] font-medium leading-5 tabular-nums text-text-tertiary", r.hint),
				"data-testid": "nav-rail-badge",
				children: t.badge
			})
		]
	}), t.hint && /* @__PURE__ */ H("span", {
		className: e("mt-0.5 block truncate text-[12px] leading-4", r.hint),
		children: t.hint
	})] }), s = e("block w-full border-l-[3px] border-transparent text-left no-underline", a === "md" ? "ml-[18px] w-auto mr-2 rounded-r pl-[15px] pr-2" : "px-3", P, r.hover, n && r.active, t.disabled && "pointer-events-none opacity-50");
	if (t.onClick || !t.to) return /* @__PURE__ */ H("button", {
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
	return i ? /* @__PURE__ */ H(V, { children: i(t, c) }) : /* @__PURE__ */ H("a", { ...c });
}
function dn({ name: t, items: n, activeHref: r, match: i, palette: a, storageKey: o, renderLink: s, size: c = "sm", divided: l = !1 }) {
	let [u, d] = B(() => {
		if (!o || typeof window > "u") return !1;
		try {
			return window.localStorage?.getItem(o) === "1";
		} catch {
			return !1;
		}
	});
	I(() => {
		if (!(!o || typeof window > "u")) try {
			u ? window.localStorage?.setItem(o, "1") : window.localStorage?.removeItem(o);
		} catch {}
	}, [u, o]);
	let f = L(), p = z(null), m = z(null), h = F(() => {
		if (!u) {
			let e = typeof document > "u" ? null : document.activeElement;
			e && m.current?.contains(e) && p.current?.focus();
		}
		d((e) => !e);
	}, [u]);
	return /* @__PURE__ */ U("section", {
		className: e(c === "md" && "pb-1"),
		children: [
			l && /* @__PURE__ */ H("div", {
				"aria-hidden": "true",
				className: e("mx-5 mb-2 mt-1 border-t", a.divider)
			}),
			/* @__PURE__ */ U("button", {
				ref: p,
				type: "button",
				onClick: h,
				"aria-expanded": !u,
				"aria-controls": f,
				className: e("flex w-full cursor-pointer items-center gap-1.5 border-none bg-transparent text-left", re, ae, c === "md" ? "px-3.5" : "px-2", a.group),
				children: [/* @__PURE__ */ H("span", {
					"aria-hidden": "true",
					className: "grid h-5 w-5 shrink-0 place-items-center",
					children: /* @__PURE__ */ H(ne, { open: !u })
				}), /* @__PURE__ */ H("span", {
					className: "flex-1 truncate",
					children: t
				})]
			}),
			!u && /* @__PURE__ */ H("div", {
				id: f,
				ref: m,
				children: n.map((e, t) => /* @__PURE__ */ H(un, {
					item: e,
					active: cn(e, r, i),
					palette: a,
					renderLink: s,
					size: c
				}, sn(e, t)))
			})
		]
	});
}
function fn({ title: t, items: n, activeHref: r, match: i = "prefix", titleAction: a, header: o, footer: s, width: c = "default", storageKey: l, renderLink: u, tone: d = "surface", size: f = "sm", "aria-label": p, className: m, "data-testid": h }) {
	let g = on[d], _ = R(() => ln(n), [n]);
	return /* @__PURE__ */ U("nav", {
		"aria-label": p ?? (typeof t == "string" ? t : void 0) ?? "Navigation",
		"data-testid": h,
		className: e("flex flex-none flex-col overflow-hidden border-r", an[c], g.rail, m),
		children: [
			(t != null || a) && /* @__PURE__ */ U("div", {
				className: e("flex flex-none items-center justify-between gap-2", f === "md" ? "h-12 pl-5 pr-3" : "border-b px-3 py-2.5", g.divider),
				children: [/* @__PURE__ */ H("span", {
					className: e("truncate text-[11px] font-semibold uppercase tracking-[0.05em]", g.title),
					children: t
				}), a]
			}),
			o && /* @__PURE__ */ H("div", {
				className: e("flex-none border-b px-2 py-2", g.divider),
				children: o
			}),
			/* @__PURE__ */ H("div", {
				className: "min-h-0 flex-1 overflow-y-auto py-1",
				children: _.map((e, t) => e.name === null ? /* @__PURE__ */ H("div", { children: e.items.map((e, t) => /* @__PURE__ */ H(un, {
					item: e,
					active: cn(e, r, i),
					palette: g,
					renderLink: u,
					size: f
				}, sn(e, t))) }, "__ungrouped") : /* @__PURE__ */ H(dn, {
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
			s && /* @__PURE__ */ H("div", {
				className: e("flex-none border-t px-2 py-2", g.divider),
				children: s
			})
		]
	});
}
function pn({ rails: t, activeHref: n, renderLink: r, tone: i, storageKey: a, children: o, className: s, "data-testid": c }) {
	return /* @__PURE__ */ U("div", {
		"data-testid": c,
		className: e("flex h-full min-h-0 w-full", s),
		children: [t.map(({ id: e, ...t }) => /* @__PURE__ */ H(fn, {
			...t,
			activeHref: t.activeHref ?? n,
			renderLink: t.renderLink ?? r,
			tone: t.tone ?? i,
			storageKey: a ? `${a}.${e}` : void 0
		}, e)), /* @__PURE__ */ H("div", {
			className: "flex min-h-0 min-w-0 flex-1 flex-col",
			children: o
		})]
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
	return /* @__PURE__ */ U("div", {
		"data-testid": l,
		className: e("flex h-full min-h-0 min-w-0 flex-1 flex-col", u.column, s),
		children: [
			t && /* @__PURE__ */ H("div", {
				className: e("flex flex-none items-center overflow-x-auto border-b px-3 py-1.5", u.divider),
				children: t
			}),
			n,
			/* @__PURE__ */ H("div", {
				className: e("min-h-0 flex-1 overflow-auto", a && "p-6", c),
				children: r
			}),
			i && /* @__PURE__ */ H("div", {
				className: e("flex flex-none items-center gap-3 border-t px-3 py-1 text-[11px]", u.divider, u.status),
				children: i
			})
		]
	});
}
//#endregion
//#region src/components/shared/InlineMenu.tsx
var gn = {
	"bottom-start": "top-full left-0 mt-1",
	"bottom-end": "top-full right-0 mt-1",
	"top-start": "bottom-full left-0 mb-1",
	"top-end": "bottom-full right-0 mb-1"
};
function _n({ open: t, onClose: n, placement: r = "bottom-start", trigger: i, role: a = "group", className: o, "data-testid": s = "inline-menu", "aria-label": c, "aria-labelledby": u, children: d }) {
	let f = z(null), p = l(t);
	return I(() => {
		if (!t) return;
		let e = (e) => {
			e.key === "Escape" && p() && (e.stopPropagation(), n());
		};
		return window.addEventListener("keydown", e), () => window.removeEventListener("keydown", e);
	}, [
		t,
		n,
		p
	]), I(() => {
		if (!t) return;
		let e = (e) => {
			let t = e.target;
			t && (f.current?.contains(t) || i?.current?.contains(t) || n());
		};
		return document.addEventListener("mousedown", e), () => document.removeEventListener("mousedown", e);
	}, [
		t,
		n,
		i
	]), t ? /* @__PURE__ */ H("div", {
		ref: f,
		role: a,
		"aria-label": c,
		"aria-labelledby": u,
		"data-testid": s,
		"data-placement": r,
		className: e("absolute z-20 min-w-[160px] rounded-lg border border-border bg-surface", "shadow-lg p-1 text-sm text-text-primary", gn[r], o),
		children: d
	}) : null;
}
//#endregion
//#region src/components/shared/Link.tsx
var vn = "text-primary no-underline hover:underline";
function yn(e) {
	let t = new Set((e ?? "").split(/\s+/).filter(Boolean));
	return t.add("noopener"), t.add("noreferrer"), [...t].join(" ");
}
function bn({ href: t, children: n, external: r = !1, unstyled: i = !1, target: a, rel: o, className: s, ...c }) {
	let l = r ? "_blank" : a, u = l === "_blank";
	return /* @__PURE__ */ H("a", {
		...c,
		href: t,
		target: l,
		rel: u ? yn(o) : o,
		className: e(!i && vn, s),
		children: n
	});
}
//#endregion
//#region src/components/pipelines/nodes/NodeCard.tsx
var xn = {
	success: "border-success",
	error: "border-danger",
	warning: "border-warning",
	info: "border-info",
	neutral: "border-border-emphasis",
	pending: "border-accent"
};
function Sn({ icon: t, label: n, subtitle: r, status: i = "neutral", statusLabel: a, body: o, selected: s = !1, accentClass: c, className: l, onClick: u }) {
	let f = a ?? i.charAt(0).toUpperCase() + i.slice(1), p = xn[i];
	return /* @__PURE__ */ U(d, {
		className: e("relative w-40 transition-shadow duration-200 border-2", u && "cursor-pointer", p, s && "shadow-[0_0_0_3px_rgba(99,102,241,0.25)]", !s && "shadow-sm", !s && u && "hover:shadow-md", l),
		onClick: u,
		children: [
			c && /* @__PURE__ */ H("div", { className: e("absolute left-0 top-0 bottom-0 w-1 rounded-l-lg", c) }),
			/* @__PURE__ */ U("div", {
				className: e("flex items-center justify-between gap-2 px-2.5 py-2 border-b border-border-subtle", c && "pl-3.5"),
				children: [/* @__PURE__ */ U("div", {
					className: "flex items-center gap-1.5 min-w-0",
					children: [/* @__PURE__ */ H("span", {
						className: "text-sm leading-none shrink-0",
						"aria-hidden": "true",
						children: t
					}), /* @__PURE__ */ H("span", {
						className: "text-xs font-semibold text-text-primary truncate",
						children: n
					})]
				}), /* @__PURE__ */ H(le, {
					state: i,
					label: f,
					size: "sm"
				})]
			}),
			r && /* @__PURE__ */ H("div", {
				className: "px-2.5 pt-1.5 pb-0 text-[11px] text-neutral truncate",
				children: r
			}),
			o && /* @__PURE__ */ H("div", {
				className: "px-2.5 pb-2 pt-1 text-xs text-text-secondary",
				children: o
			})
		]
	});
}
//#endregion
//#region src/components/shared/BoardColumn.tsx
function Cn({ label: t, count: n, children: r, emptyLabel: i = "Nothing here", action: a, className: o, "data-testid": s }) {
	let c = r == null || r === !1 || Array.isArray(r) && r.length === 0;
	return /* @__PURE__ */ U("section", {
		className: e("flex flex-col gap-1.5 min-w-0", o),
		"data-testid": s,
		children: [/* @__PURE__ */ U("header", {
			className: "flex items-baseline justify-between gap-2 text-[11px] uppercase tracking-[0.04em] text-text-tertiary",
			children: [/* @__PURE__ */ H("span", {
				className: "truncate",
				children: t
			}), a ?? (n === void 0 ? null : /* @__PURE__ */ H("span", {
				className: "tabular-nums",
				children: n
			}))]
		}), c ? /* @__PURE__ */ H(se, { children: i }) : /* @__PURE__ */ H("div", {
			className: "flex flex-col gap-1.5",
			children: r
		})]
	});
}
//#endregion
//#region src/components/shared/FormRow.tsx
var wn = {
	sm: "gap-2",
	md: "gap-3",
	lg: "gap-4"
}, Tn = {
	sm: "flex-col sm:flex-row",
	md: "flex-col md:flex-row"
};
function En({ children: t, stackBelow: n = "sm", gap: r = "md", className: i, "data-testid": a }) {
	return /* @__PURE__ */ H("div", {
		className: e("flex items-start", Tn[n], wn[r], i),
		"data-testid": a,
		children: de.map(t, (e) => me(e) ? /* @__PURE__ */ H("div", {
			className: "flex-1 basis-0 min-w-0",
			children: e
		}) : e)
	});
}
//#endregion
//#region src/components/shared/DetailHeader.tsx
function Dn({ title: t, badge: n, description: r, meta: i, aside: a, asideWidth: o = 260, as: s = "h2", className: c, "data-testid": l }) {
	return /* @__PURE__ */ U("div", {
		className: e("flex flex-wrap items-start justify-between gap-3", c),
		"data-testid": l,
		children: [/* @__PURE__ */ U("div", {
			className: "flex flex-col gap-1.5 min-w-0 flex-1",
			children: [
				/* @__PURE__ */ U("div", {
					className: "flex flex-wrap items-center gap-2",
					children: [/* @__PURE__ */ H(s, {
						className: e("m-0", s === "h2" ? "text-[18px]" : "text-[15px]"),
						children: t
					}), n]
				}),
				r ? /* @__PURE__ */ H("p", {
					className: "m-0 max-w-[72ch] text-[13px] text-text-secondary",
					children: r
				}) : null,
				i
			]
		}), a ? /* @__PURE__ */ H("aside", {
			className: "flex flex-col gap-2 shrink-0",
			style: { width: o },
			children: a
		}) : null]
	});
}
//#endregion
//#region src/components/shared/ReviewThread.tsx
var On = {
	problem: "problem statement",
	analysis: "analysis",
	option: "options",
	question: "question",
	answer: "answer",
	artifact: "artifact",
	revision: "revision",
	decision: "decision"
}, kn = {
	problem: "info",
	analysis: "neutral",
	option: "info",
	question: "warning",
	answer: "success",
	artifact: "purple",
	revision: "info",
	decision: "accent"
};
function An({ name: e, type: t, url: n }) {
	return /* @__PURE__ */ U("div", {
		className: "flex items-center gap-3 rounded-md border border-dashed border-border bg-surface-hover/40 px-3 py-2.5",
		children: [
			/* @__PURE__ */ H("span", {
				className: "text-lg",
				role: "img",
				"aria-label": "artifact",
				children: "🖼️"
			}),
			/* @__PURE__ */ U("div", {
				className: "min-w-0",
				children: [/* @__PURE__ */ H("div", {
					className: "truncate text-xs font-medium text-text-primary",
					children: e
				}), t && /* @__PURE__ */ H("div", {
					className: "text-[10.5px] text-text-tertiary",
					children: t
				})]
			}),
			/* @__PURE__ */ H("div", { className: "flex-1" }),
			n ? /* @__PURE__ */ H("a", {
				href: n,
				target: "_blank",
				rel: "noreferrer",
				className: "text-[11px] text-primary no-underline hover:underline",
				children: "open →"
			}) : /* @__PURE__ */ H("span", {
				className: "text-[10.5px] text-text-tertiary",
				children: "stored with the run"
			})
		]
	});
}
function jn({ post: t, labels: r, tones: i, onAnswer: a, busy: o, placeholder: s, submitLabel: c }) {
	let [l, u] = B(""), d = t.kind === "question" && !t.resolved;
	return /* @__PURE__ */ U("div", {
		className: e("border-b border-border px-4 py-3 last:border-b-0", d && "bg-warning-bg/20"),
		children: [
			/* @__PURE__ */ U("div", {
				className: "flex min-w-0 items-center gap-2",
				children: [
					t.authorKind === "human" ? /* @__PURE__ */ H(A, {
						name: t.authorName,
						size: 20
					}) : /* @__PURE__ */ H("span", {
						className: "text-[13px]",
						role: "img",
						"aria-label": "agent",
						children: "🤖"
					}),
					/* @__PURE__ */ H("span", {
						className: "truncate text-xs font-semibold text-text-primary",
						children: t.authorName
					}),
					/* @__PURE__ */ H(f, {
						tone: i[t.kind] ?? "neutral",
						size: "xs",
						uppercase: !0,
						children: r[t.kind] ?? t.kind
					}),
					d && /* @__PURE__ */ H(f, {
						tone: "warning",
						size: "xs",
						dot: "pulse",
						children: "needs a human"
					}),
					t.kind === "question" && t.resolved && /* @__PURE__ */ H(f, {
						tone: "success",
						size: "xs",
						children: "resolved"
					}),
					/* @__PURE__ */ H("div", { className: "flex-1" }),
					t.timeLabel && /* @__PURE__ */ H("span", {
						className: "whitespace-nowrap text-[11px] text-text-tertiary",
						children: t.timeLabel
					})
				]
			}),
			/* @__PURE__ */ H("div", {
				className: "mt-1.5 whitespace-pre-wrap pl-7 text-xs leading-relaxed text-text-secondary",
				children: t.body
			}),
			t.artifact && /* @__PURE__ */ H("div", {
				className: "mt-2 ml-7",
				children: /* @__PURE__ */ H(An, {
					name: t.artifact.name,
					type: t.artifact.type,
					url: t.artifact.url
				})
			}),
			d && a && /* @__PURE__ */ U("div", {
				className: "mt-2.5 ml-7 flex flex-col gap-2",
				children: [/* @__PURE__ */ H(O, {
					value: l,
					onChange: (e) => u(e.target.value),
					placeholder: s,
					rows: 2,
					"aria-label": "Answer this question"
				}), /* @__PURE__ */ H("div", { children: /* @__PURE__ */ H(n, {
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
		...On,
		...o
	}, f = {
		...kn,
		...s
	};
	return /* @__PURE__ */ H("div", {
		className: e("overflow-hidden rounded-lg border border-border bg-surface", l),
		...u ? { "data-testid": u } : {},
		children: t.length === 0 ? /* @__PURE__ */ H("div", {
			className: "px-4 py-8 text-center text-xs text-text-tertiary",
			children: c
		}) : t.map((e) => /* @__PURE__ */ H(jn, {
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
	return /* @__PURE__ */ U("div", {
		className: e("flex flex-col gap-4 lg:flex-row lg:items-start", i),
		...a ? { "data-testid": a } : {},
		children: [/* @__PURE__ */ H("div", {
			className: "min-w-0 flex-1",
			children: t
		}), /* @__PURE__ */ H("aside", {
			className: e("w-full shrink-0 lg:sticky lg:top-4", Nn[r]),
			children: /* @__PURE__ */ H("div", {
				className: "overflow-hidden rounded-lg border border-border bg-surface",
				children: n
			})
		})]
	});
}
function Fn({ title: t, children: n, className: r }) {
	return /* @__PURE__ */ U("section", {
		className: e("border-b border-border px-3.5 py-3 last:border-b-0", r),
		children: [/* @__PURE__ */ H("h3", {
			className: "mb-2 text-[10px] font-semibold uppercase tracking-wide text-text-tertiary",
			children: t
		}), /* @__PURE__ */ H("div", {
			className: "flex flex-col gap-2 text-xs text-text-secondary",
			children: n
		})]
	});
}
//#endregion
//#region src/components/shared/SignoffPanel.tsx
function In({ signoffs: t, required: n = 2, actions: r, emptyHint: i, className: a, "data-testid": o }) {
	let s = t.filter((e) => e.decision === "approve").length, c = i ?? `none yet — ${n} approvals ratify the decision`;
	return /* @__PURE__ */ U("div", {
		className: e("flex flex-wrap items-center gap-3 rounded-lg border border-border bg-surface px-4 py-3", a),
		...o ? { "data-testid": o } : {},
		children: [
			/* @__PURE__ */ H("span", {
				className: "text-xs font-semibold text-text-primary",
				children: "Sign-offs"
			}),
			t.length === 0 ? /* @__PURE__ */ H("span", {
				className: "text-xs text-text-tertiary",
				children: c
			}) : /* @__PURE__ */ U(V, { children: [t.map((e) => /* @__PURE__ */ U("span", {
				className: "flex items-center gap-1.5",
				title: e.role ? `${e.name} · ${e.role}` : e.name,
				children: [
					/* @__PURE__ */ H(A, {
						name: e.name,
						size: 18
					}),
					/* @__PURE__ */ H("span", {
						className: "text-xs text-text-secondary",
						children: e.name
					}),
					/* @__PURE__ */ H(f, {
						tone: e.decision === "approve" ? "success" : "danger",
						size: "xs",
						children: e.decision === "approve" ? "✓" : "✕"
					})
				]
			}, e.name)), /* @__PURE__ */ U("span", {
				className: "text-[11px] text-text-tertiary",
				children: [
					s,
					"/",
					n,
					" approvals"
				]
			})] }),
			/* @__PURE__ */ H("div", { className: "flex-1" }),
			r
		]
	});
}
//#endregion
//#region src/components/shared/StatStrip.tsx
var Y = {
	default: "text-text-primary",
	accent: "text-primary",
	danger: "text-danger"
};
function X({ progress: e, label: t }) {
	return !e || !(e.max > 0) || !Number.isFinite(e.value) ? null : /* @__PURE__ */ H(J, {
		value: e.value,
		max: e.max,
		size: "sm",
		"aria-label": t,
		className: "mt-2 max-w-[20rem]",
		"data-testid": "stat-strip-progress"
	});
}
function Ln({ item: t, first: n, last: r }) {
	return /* @__PURE__ */ U("div", {
		className: e("min-w-0 py-3", n ? "pl-0 pr-6" : "px-6", r && !n && "pr-0"),
		"data-testid": "stat-strip-cluster",
		children: [
			/* @__PURE__ */ U("div", {
				className: "flex min-w-0 items-baseline gap-1.5 whitespace-nowrap",
				children: [/* @__PURE__ */ H("span", {
					className: e("text-[17px] font-bold leading-6 tabular-nums", Y[t.tone ?? "default"]),
					children: t.value
				}), /* @__PURE__ */ H("span", {
					className: "min-w-0 truncate text-[15px] leading-6 text-text-secondary",
					children: t.label
				})]
			}),
			/* @__PURE__ */ H(X, {
				progress: t.progress,
				label: t.label
			}),
			t.hint != null && /* @__PURE__ */ H("div", {
				className: "mt-0.5 truncate text-[12px] text-text-tertiary",
				children: t.hint
			})
		]
	});
}
function Rn({ item: t }) {
	let n = t.progress && t.progress.max > 0 && Number.isFinite(t.progress.value);
	return /* @__PURE__ */ U("span", {
		className: "flex min-w-0 items-center whitespace-nowrap",
		"data-testid": "stat-strip-cluster",
		children: [/* @__PURE__ */ U("span", {
			className: "flex min-w-0 items-baseline gap-1.5",
			children: [/* @__PURE__ */ H("span", {
				className: e("text-[16px] font-semibold leading-6 tabular-nums", Y[t.tone ?? "default"]),
				children: t.value
			}), /* @__PURE__ */ H("span", {
				className: "min-w-0 truncate text-[15px] leading-6 text-text-secondary",
				children: t.label
			})]
		}), n && /* @__PURE__ */ H(J, {
			value: t.progress.value,
			max: t.progress.max,
			size: "sm",
			"aria-label": t.label,
			className: "ml-[18px] w-[150px] shrink-0",
			"data-testid": "stat-strip-progress"
		})]
	});
}
function Z({ item: t, flush: n }) {
	return /* @__PURE__ */ U("div", {
		className: e("min-w-0 px-4 py-2.5", (n === "start" || n === "both") && "pl-0", (n === "end" || n === "both") && "pr-0"),
		children: [
			/* @__PURE__ */ H("div", {
				className: "whitespace-nowrap text-[10px] font-semibold uppercase tracking-wide text-text-tertiary",
				children: t.label
			}),
			/* @__PURE__ */ U("div", {
				className: "mt-0.5 flex min-w-0 items-baseline gap-2",
				children: [/* @__PURE__ */ H("span", {
					className: e("text-[17px] font-bold leading-none tabular-nums", Y[t.tone ?? "default"]),
					children: t.value
				}), t.hint != null && /* @__PURE__ */ H("span", {
					className: "min-w-0 truncate text-[11px] text-text-tertiary",
					children: t.hint
				})]
			}),
			t.status && /* @__PURE__ */ U("div", {
				className: "mt-1 flex min-w-0 items-center gap-1.5 text-[12px]",
				"data-testid": "stat-strip-status",
				children: [/* @__PURE__ */ H("span", {
					"aria-hidden": "true",
					className: e("inline-block h-2 w-2 shrink-0 rounded-full", i[t.status.tone ?? "neutral"])
				}), /* @__PURE__ */ H("span", {
					className: e("min-w-0 truncate", t.status.tone && t.status.tone !== "neutral" ? c[t.status.tone] : "text-text-secondary"),
					children: t.status.label
				})]
			}),
			/* @__PURE__ */ H(X, {
				progress: t.progress,
				label: t.label
			})
		]
	});
}
function zn({ connector: t }) {
	let n = t?.tone;
	return /* @__PURE__ */ U("div", {
		className: e("flex shrink-0 flex-col items-center justify-center gap-1 self-center px-1", n ? c[n] : "text-text-tertiary"),
		"data-testid": "stat-strip-connector",
		children: [/* @__PURE__ */ U("svg", {
			"aria-hidden": "true",
			width: "56",
			height: "8",
			viewBox: "0 0 56 8",
			className: "block",
			children: [/* @__PURE__ */ H("line", {
				x1: "0",
				y1: "4",
				x2: "50",
				y2: "4",
				stroke: "currentColor",
				strokeWidth: "1.25"
			}), /* @__PURE__ */ H("path", {
				d: "M49 0.5 L55 4 L49 7.5 Z",
				fill: "currentColor"
			})]
		}), t?.label && /* @__PURE__ */ H("span", {
			className: "whitespace-nowrap text-[11px] leading-none",
			children: t.label
		})]
	});
}
function Bn({ items: t, frameless: n = !1, connectors: r, variant: i = "default", className: a, "aria-label": o, "data-testid": s }) {
	let c = !!r && r.length > 0;
	return i === "line" ? /* @__PURE__ */ H("div", {
		role: "group",
		"data-variant": "line",
		className: e("flex min-w-0 flex-wrap items-center gap-y-1", a),
		...o ? { "aria-label": o } : {},
		...s ? { "data-testid": s } : {},
		children: t.map((e, t) => {
			let n = e.title ? { title: e.title } : {}, r = /* @__PURE__ */ H(Rn, { item: e }), i;
			return i = e.href ? /* @__PURE__ */ H("a", {
				href: e.href,
				className: "min-w-0 rounded no-underline hover:underline",
				...n,
				children: r
			}) : e.onSelect ? /* @__PURE__ */ H("button", {
				type: "button",
				onClick: e.onSelect,
				className: "min-w-0 cursor-pointer rounded border-none bg-transparent p-0 text-left hover:underline",
				...n,
				children: r
			}) : /* @__PURE__ */ H("span", {
				className: "min-w-0",
				...n,
				children: r
			}), /* @__PURE__ */ U(fe, { children: [t > 0 && /* @__PURE__ */ H("span", {
				"aria-hidden": "true",
				className: "mx-5 text-[15px] leading-6 text-text-secondary",
				"data-testid": "stat-strip-separator",
				children: "•"
			}), i] }, e.label);
		})
	}) : i === "inline" ? /* @__PURE__ */ H("div", {
		role: "group",
		"data-variant": "inline",
		className: e("flex items-center divide-x divide-border overflow-x-auto border-b border-border pb-1", a),
		...o ? { "aria-label": o } : {},
		...s ? { "data-testid": s } : {},
		children: t.map((e, n) => {
			let r = e.title ? { title: e.title } : {}, i = /* @__PURE__ */ H(Ln, {
				item: e,
				first: n === 0,
				last: n === t.length - 1
			});
			return e.href ? /* @__PURE__ */ H("a", {
				href: e.href,
				className: "min-w-0 flex-1 no-underline hover:bg-surface-hover",
				...r,
				children: i
			}, e.label) : e.onSelect ? /* @__PURE__ */ H("button", {
				type: "button",
				onClick: e.onSelect,
				className: "min-w-0 flex-1 cursor-pointer border-none bg-transparent p-0 text-left hover:bg-surface-hover",
				...r,
				children: i
			}, e.label) : /* @__PURE__ */ H("div", {
				className: "min-w-0 flex-1",
				...r,
				children: i
			}, e.label);
		})
	}) : /* @__PURE__ */ H("div", {
		role: "group",
		className: e("flex overflow-x-auto", c ? "items-stretch" : "divide-x divide-border", !n && "rounded-lg border border-border bg-surface", a),
		...o ? { "aria-label": o } : {},
		...s ? { "data-testid": s } : {},
		children: t.map((e, i) => {
			let a = n ? t.length === 1 ? "both" : i === 0 ? "start" : i === t.length - 1 ? "end" : void 0 : void 0, o = e.title ? { title: e.title } : {}, s;
			return s = e.href ? /* @__PURE__ */ H("a", {
				href: e.href,
				className: "min-w-0 flex-1 no-underline transition-colors hover:bg-surface-hover",
				...o,
				children: /* @__PURE__ */ H(Z, {
					item: e,
					flush: a
				})
			}) : e.onSelect ? /* @__PURE__ */ H("button", {
				type: "button",
				onClick: e.onSelect,
				className: "min-w-0 flex-1 cursor-pointer border-none bg-transparent p-0 text-left transition-colors hover:bg-surface-hover",
				...o,
				children: /* @__PURE__ */ H(Z, {
					item: e,
					flush: a
				})
			}) : /* @__PURE__ */ H("div", {
				className: "min-w-0 flex-1",
				...o,
				children: /* @__PURE__ */ H(Z, {
					item: e,
					flush: a
				})
			}), /* @__PURE__ */ U(fe, { children: [s, c && i < t.length - 1 && /* @__PURE__ */ H(zn, { connector: r[i] })] }, e.label);
		})
	});
}
//#endregion
//#region src/components/shared/KeyValue.tsx
function Vn({ items: t, layout: n = "row", labelWidth: r = "w-28", divided: i = !1, className: a, "aria-label": o, "data-testid": s = "key-value" }) {
	if (t.length === 0) return null;
	let c = n === "row", l = c && i;
	return /* @__PURE__ */ H("dl", {
		className: e("m-0 min-w-0", n === "grid" ? "grid grid-cols-2 gap-x-6 gap-y-3" : l ? "flex flex-col border-t border-border" : c ? "flex flex-col gap-1.5" : "flex flex-col gap-3", a),
		"data-layout": n,
		"data-divided": l || void 0,
		"data-testid": s,
		...o ? { "aria-label": o } : {},
		children: t.map((t, n) => /* @__PURE__ */ U("div", {
			className: e("min-w-0", l ? "flex min-h-[38px] items-center gap-3 border-b border-border px-2.5 py-1.5" : c ? "flex items-baseline gap-3" : "flex flex-col gap-0.5"),
			"data-testid": `${s}-item`,
			children: [
				/* @__PURE__ */ H("dt", {
					className: e("m-0", l ? e("shrink-0 text-[15px] text-text-primary", r) : "text-text-secondary", !l && (c ? e("shrink-0 text-[13px]", r) : "text-[12px]")),
					children: t.label
				}),
				/* @__PURE__ */ H("dd", {
					className: e("m-0 min-w-0 truncate", l ? "text-sm" : "text-[13px]", t.muted ? "text-text-tertiary" : "text-text-primary", c && "flex-1", t.mono && "font-mono text-[12px]"),
					...t.title ? { title: t.title } : {},
					children: t.value
				}),
				c && t.action != null && t.action !== !1 && /* @__PURE__ */ H("dd", {
					className: "m-0 flex shrink-0 items-center",
					"data-testid": `${s}-action`,
					children: t.action
				})
			]
		}, `${t.label}-${n}`))
	});
}
//#endregion
//#region src/components/shared/PersonHoverCard.tsx
function Hn({ person: t, children: n, actions: r, details: i, interactiveChild: a = !1, openDelay: o = 450, closeDelay: s = 250, className: c, "data-testid": l = "person-hover-card" }) {
	let u = z(null), [d, f] = B(!1), p = z(null), m = F(() => {
		p.current &&= (clearTimeout(p.current), null);
	}, []);
	I(() => m, [m]);
	let h = F(() => {
		m(), p.current = setTimeout(() => f(!0), o);
	}, [m, o]), g = F(() => {
		m(), p.current = setTimeout(() => f(!1), s);
	}, [m, s]);
	return /* @__PURE__ */ U(V, { children: [/* @__PURE__ */ H("span", {
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
	}), /* @__PURE__ */ H(M, {
		trigger: u,
		open: d,
		onClose: () => {
			m(), f(!1);
		},
		placement: "bottom-start",
		"aria-label": `About ${t.displayName}`,
		"data-testid": l,
		children: /* @__PURE__ */ U("div", {
			className: "w-72 p-3",
			onMouseEnter: m,
			onMouseLeave: g,
			children: [
				/* @__PURE__ */ U("div", {
					className: "flex items-start gap-3",
					children: [/* @__PURE__ */ H(A, {
						name: t.displayName,
						src: t.avatarUrl,
						color: t.color,
						size: 40
					}), /* @__PURE__ */ U("div", {
						className: "min-w-0 flex-1",
						children: [
							/* @__PURE__ */ U("div", {
								className: "flex items-center gap-1.5",
								children: [/* @__PURE__ */ H("span", {
									className: "truncate text-sm font-semibold text-text-primary",
									children: t.displayName
								}), t.online !== void 0 && /* @__PURE__ */ H(j, { state: t.online ? "online" : "offline" })]
							}),
							t.title && /* @__PURE__ */ H("div", {
								className: "truncate text-xs text-text-secondary",
								children: t.title
							}),
							t.department && /* @__PURE__ */ H("div", {
								className: "truncate text-xs text-text-tertiary",
								children: t.department
							})
						]
					})]
				}),
				t.statusText && /* @__PURE__ */ H("div", {
					className: "mt-2 truncate text-xs italic text-text-secondary",
					children: t.statusText
				}),
				(t.email || t.localTime) && /* @__PURE__ */ U("div", {
					className: "mt-2 space-y-0.5 border-t border-border pt-2",
					children: [t.email && /* @__PURE__ */ H("div", {
						className: "truncate text-xs text-text-secondary",
						children: t.email
					}), t.localTime && /* @__PURE__ */ U("div", {
						className: "text-xs text-text-tertiary",
						children: [t.localTime, " local time"]
					})]
				}),
				i && /* @__PURE__ */ H("div", {
					className: "mt-2 border-t border-border pt-2",
					children: i
				}),
				r && /* @__PURE__ */ H("div", {
					className: "mt-3 flex items-center gap-2",
					children: r
				})
			]
		})
	})] });
}
//#endregion
//#region src/components/shared/MasterDetail.tsx
function Un(e) {
	if (!e || typeof window > "u") return !1;
	try {
		return window.localStorage.getItem(e) === "compact";
	} catch {
		return !1;
	}
}
function Wn(e, t) {
	if (!(!e || typeof window > "u")) try {
		window.localStorage.setItem(e, t ? "compact" : "expanded");
	} catch {}
}
function Gn({ direction: t }) {
	return /* @__PURE__ */ H("svg", {
		className: e("h-4 w-4", t === "right" && "rotate-180"),
		viewBox: "0 0 16 16",
		fill: "none",
		"aria-hidden": "true",
		children: /* @__PURE__ */ H("path", {
			d: "M10 3L5 8l5 5",
			stroke: "currentColor",
			strokeWidth: "1.5",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		})
	});
}
function Kn({ index: t, selected: n }) {
	return /* @__PURE__ */ H("span", {
		className: e("flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-semibold", n ? "bg-primary text-on-primary" : "bg-surface-inset text-text-tertiary"),
		children: t + 1
	});
}
function qn({ items: t, keyOf: n, selectedKey: r, onSelect: i, renderRow: a, renderCompactRow: o, renderDetail: s, railTitle: c, railWidth: l = 340, compactWidth: u = 72, storageKey: d, emptyDetail: f, className: p, "data-testid": m = "master-detail" }) {
	let [h, g] = B(() => Un(d)), _ = F(() => {
		g((e) => {
			let t = !e;
			return Wn(d, t), t;
		});
	}, [d]), v = R(() => t.findIndex((e) => n(e) === r), [
		t,
		n,
		r
	]), y = v >= 0 ? t[v] : null;
	return /* @__PURE__ */ U("div", {
		className: e("flex overflow-hidden rounded-lg border border-border bg-surface", p),
		"data-testid": m,
		children: [/* @__PURE__ */ U("nav", {
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
			children: [/* @__PURE__ */ U("div", {
				className: e("flex items-center gap-1 border-b border-border px-3 py-2", h ? "justify-center" : "justify-between"),
				children: [!h && c && /* @__PURE__ */ H("span", {
					className: "truncate text-xs font-semibold uppercase tracking-wide text-text-tertiary",
					children: c
				}), /* @__PURE__ */ H("button", {
					type: "button",
					onClick: _,
					"aria-label": h ? "Expand list" : "Collapse list",
					"data-testid": `${m}-toggle`,
					className: "flex-shrink-0 rounded-md p-1 text-text-tertiary transition-colors hover:bg-surface-hover hover:text-text-primary",
					children: /* @__PURE__ */ H(Gn, { direction: h ? "right" : "left" })
				})]
			}), /* @__PURE__ */ H("div", {
				className: "flex flex-col",
				children: t.map((t, s) => {
					let c = n(t), l = c === r;
					return /* @__PURE__ */ H("div", {
						role: "button",
						tabIndex: 0,
						"aria-current": l,
						onClick: () => i(c),
						onKeyDown: (e) => {
							(e.key === "Enter" || e.key === " ") && (e.preventDefault(), i(c));
						},
						"data-testid": `${m}-row-${c}`,
						className: e("cursor-pointer border-l-2 text-left transition-colors", l ? "border-primary bg-surface-hover" : "border-transparent hover:bg-surface-hover"),
						children: h ? o?.(t, s, l) ?? /* @__PURE__ */ H("div", {
							className: "flex justify-center py-2.5",
							children: /* @__PURE__ */ H(Kn, {
								index: s,
								selected: l
							})
						}) : a(t, s, l)
					}, c);
				})
			})]
		}), /* @__PURE__ */ H("div", {
			className: "min-w-0 flex-1 overflow-y-auto",
			"data-testid": `${m}-detail`,
			children: y ? s(y, v) : f
		})]
	});
}
//#endregion
//#region src/components/shared/TreeView.tsx
function Jn(e) {
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
function Yn(e) {
	return typeof CSS < "u" && typeof CSS.escape == "function" ? CSS.escape(e) : e;
}
function Xn(e, t) {
	let n = /* @__PURE__ */ new Set();
	if (!t) return n;
	let r = new Map(e.map((e) => [e.id, e])), i = r.get(t);
	for (; i?.parentId;) n.add(i.parentId), i = r.get(i.parentId);
	return n;
}
function Zn({ expanded: t }) {
	return /* @__PURE__ */ H("svg", {
		className: e("h-3.5 w-3.5 transition-transform", t ? "" : "-rotate-90"),
		viewBox: "0 0 16 16",
		fill: "none",
		"aria-hidden": "true",
		children: /* @__PURE__ */ H("path", {
			d: "M4 6l4 4 4-4",
			stroke: "currentColor",
			strokeWidth: "1.5",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		})
	});
}
function Qn(e) {
	let t = e.currentTarget.getBoundingClientRect(), n = e.clientY - t.top;
	return n < t.height / 3 ? "before" : n > t.height * 2 / 3 ? "after" : "into";
}
function $n({ entry: t, depth: n, expanded: r, onToggle: i, selectedId: a, onSelect: o, renderTrailing: s, rowMenu: c, rowMenuLabel: l, dragEnabled: u, canDragNode: d, canDrop: f, dragRef: p, dropTarget: m, setDropTarget: h, onDrop: g, testId: _, focusedId: v, setFocusedId: y, size: b }) {
	let x = r.has(t.id), S = t.children.length > 0, C = t.id === a, w = m?.id === t.id, T = u && !t.disabled && t.status !== "pending" && (d?.(t) ?? !0), E = c?.(t), D = !!E && E.some((e) => e.items.length > 0), O = b === "md";
	return /* @__PURE__ */ U("div", { children: [/* @__PURE__ */ U("div", {
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
			let r = Qn(e);
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
			let r = Qn(e);
			h(null), f(n.id, t.id, r) && g(t.id, r), p.current = null;
		},
		onDragEnd: () => {
			p.current = null, h(null);
		},
		onClick: () => {
			t.disabled || (o(t.id), S && i(t.id));
		},
		...D ? { onContextMenu: (e) => {
			e.preventDefault(), er(e.currentTarget);
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
			S ? /* @__PURE__ */ H("button", {
				type: "button",
				onClick: (e) => {
					e.stopPropagation(), i(t.id);
				},
				"aria-label": x ? "Collapse" : "Expand",
				className: "flex h-5 w-5 flex-shrink-0 items-center justify-center text-text-tertiary hover:text-text-primary",
				children: /* @__PURE__ */ H(Zn, { expanded: x })
			}) : /* @__PURE__ */ H("span", {
				className: "h-5 w-5 flex-shrink-0",
				"aria-hidden": "true"
			}),
			t.icon && /* @__PURE__ */ H("span", {
				className: e("flex flex-shrink-0 items-center", O && (C ? "text-primary-fg" : "text-text-secondary")),
				"data-testid": `${_}-icon-${t.id}`,
				children: t.icon
			}),
			/* @__PURE__ */ H("span", {
				className: "min-w-0 flex-1 truncate",
				title: t.title,
				children: t.title
			}),
			t.meta && /* @__PURE__ */ H("span", {
				className: e("flex-shrink-0 text-text-tertiary", O ? "text-[13px] tabular-nums" : "text-xs"),
				children: t.meta
			}),
			t.hoverMeta && /* @__PURE__ */ H("span", {
				"data-testid": `${_}-hover-meta-${t.id}`,
				className: "sr-only flex-shrink-0 text-xs text-text-tertiary group-hover:not-sr-only group-focus:not-sr-only group-focus-within:not-sr-only",
				children: t.hoverMeta
			}),
			t.badge,
			s?.(t),
			D && /* @__PURE__ */ H("span", {
				"data-tree-row-menu": "",
				className: e("flex flex-shrink-0 items-center", O && "pointer-events-none absolute inset-y-0 right-1.5 opacity-0 group-hover:pointer-events-auto group-hover:opacity-100 group-focus:pointer-events-auto group-focus:opacity-100 group-focus-within:pointer-events-auto group-focus-within:opacity-100 has-[[aria-expanded=true]]:pointer-events-auto has-[[aria-expanded=true]]:opacity-100"),
				onClick: (e) => e.stopPropagation(),
				onContextMenu: (e) => e.stopPropagation(),
				children: /* @__PURE__ */ H(ce, {
					trigger: /* @__PURE__ */ H("span", {
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
	}), x && t.children.map((e) => /* @__PURE__ */ H($n, {
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
function er(e) {
	let t = e.querySelector("[data-tree-row-menu] button[aria-haspopup=\"menu\"]");
	return t ? (t.getAttribute("aria-expanded") !== "true" && t.click(), !0) : !1;
}
function tr(e, t) {
	let n = [], r = (e) => {
		for (let i of e) n.push(i.id), t.has(i.id) && i.children.length > 0 && r(i.children);
	};
	return r(e), n;
}
function nr({ nodes: t, selectedId: n, onSelect: r, defaultExpanded: i, expanded: a, onToggle: o, onReorder: s, canDragNode: c, canDropNode: l, renderTrailing: u, rowMenu: d, rowMenuLabel: f, size: p = "sm", className: m, "data-testid": h = "tree-view" }) {
	let g = R(() => Jn(t), [t]), [_, v] = B(() => new Set(i ?? [])), y = a !== void 0, b = R(() => y ? new Set(a) : _, [
		y,
		a,
		_
	]), [x, S] = B(null), C = z(null), w = z(null), [T, E] = B(null), D = R(() => new Map(t.map((e) => [e.id, e])), [t]);
	I(() => {
		let e = Xn(t, n);
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
	}, k = (e) => O(e, !b.has(e)), A = R(() => tr(g, b), [g, b]), j = x && A.includes(x) ? x : n && A.includes(n) ? n : A[0] ?? null, M = (e) => {
		e && (S(e), w.current?.querySelector(`[data-testid="${h}-row-${Yn(e)}"]`)?.focus());
	}, ee = (e) => {
		let n = e.target, i = n.closest("[role=\"treeitem\"]");
		if (!i || n.closest("[data-tree-row-menu]")) return;
		if (e.key === "F10" && e.shiftKey || e.key === "ContextMenu") {
			er(i) && e.preventDefault();
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
	}, te = (e, n) => {
		let r = C.current?.id;
		if (!r || !s) return;
		let i = D.get(e);
		if (!i || !N(r, e, n)) return;
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
	function N(e, t, n) {
		let r = D.get(e), i = D.get(t);
		if (!r || !i || e === t || r.disabled || i.disabled || r.status === "pending" || i.status === "pending" || c?.(r) === !1 || l?.(r, i, n) === !1) return !1;
		let a = i;
		for (; a?.parentId;) {
			if (a.parentId === e) return !1;
			a = D.get(a.parentId);
		}
		return !0;
	}
	return t.length === 0 ? null : /* @__PURE__ */ H("div", {
		ref: w,
		role: "tree",
		className: e("flex flex-col", m),
		"data-testid": h,
		onKeyDown: ee,
		children: g.map((e) => /* @__PURE__ */ H($n, {
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
			canDrop: N,
			dragRef: C,
			dropTarget: T,
			setDropTarget: E,
			onDrop: te,
			testId: h,
			focusedId: j,
			setFocusedId: S
		}, e.id))
	});
}
//#endregion
//#region src/components/shared/TaskStrip.tsx
var rr = {
	queued: "Starting",
	running: "Running",
	paused: "Paused",
	awaiting: "Needs you",
	done: "Done",
	failed: "Failed",
	stopped: "Stopped"
}, ir = {
	queued: "bg-info",
	running: "bg-info animate-pulse motion-reduce:animate-none",
	paused: "bg-warning",
	awaiting: "bg-warning",
	done: "bg-success",
	failed: "bg-danger",
	stopped: "bg-border-emphasis"
};
function ar(e) {
	return /* @__PURE__ */ U("svg", {
		width: 12,
		height: 12,
		viewBox: "0 0 16 16",
		fill: "currentColor",
		"aria-hidden": "true",
		...e,
		children: [/* @__PURE__ */ H("rect", {
			x: "4",
			y: "3",
			width: "3",
			height: "10",
			rx: "0.75"
		}), /* @__PURE__ */ H("rect", {
			x: "9",
			y: "3",
			width: "3",
			height: "10",
			rx: "0.75"
		})]
	});
}
function or(e) {
	return /* @__PURE__ */ H("svg", {
		width: 12,
		height: 12,
		viewBox: "0 0 16 16",
		fill: "currentColor",
		"aria-hidden": "true",
		...e,
		children: /* @__PURE__ */ H("path", { d: "M5 3.2v9.6a.6.6 0 0 0 .9.5l7.4-4.8a.6.6 0 0 0 0-1L5.9 2.7a.6.6 0 0 0-.9.5Z" })
	});
}
function sr(e) {
	return /* @__PURE__ */ H("svg", {
		width: 12,
		height: 12,
		viewBox: "0 0 16 16",
		fill: "currentColor",
		"aria-hidden": "true",
		...e,
		children: /* @__PURE__ */ H("rect", {
			x: "3.5",
			y: "3.5",
			width: "9",
			height: "9",
			rx: "1.25"
		})
	});
}
function cr(e) {
	return typeof e != "number" || !Number.isFinite(e) ? null : Math.round(Math.max(0, Math.min(100, e)));
}
function lr({ label: t, status: r, phase: i, percent: a, icon: o, onPause: s, onResume: c, onStop: l, onOpen: u, onDismiss: d, className: f, "data-testid": m = "task-strip" }) {
	let h = cr(a), g = r === "running" || r === "queued" || r === "paused" || r === "awaiting", v = i ?? rr[r];
	return /* @__PURE__ */ U("div", {
		"data-testid": m,
		"data-status": r,
		"aria-busy": r === "running" || r === "queued" || void 0,
		className: e("flex h-[30px] min-w-0 items-center gap-2 rounded-t-lg border border-b-0 border-border bg-surface px-2 text-xs", f),
		children: [
			o ?? /* @__PURE__ */ H("span", {
				"aria-hidden": "true",
				className: e("inline-block h-1.5 w-1.5 shrink-0 rounded-full", ir[r])
			}),
			/* @__PURE__ */ U("p", {
				role: "status",
				"aria-live": "polite",
				className: "m-0 flex min-w-0 shrink items-center gap-1 truncate",
				"data-testid": `${m}-label`,
				children: [
					/* @__PURE__ */ H("span", {
						className: "truncate font-semibold text-text-primary",
						children: t
					}),
					/* @__PURE__ */ H("span", {
						"aria-hidden": "true",
						className: "text-text-tertiary",
						children: "·"
					}),
					/* @__PURE__ */ H("span", {
						className: "truncate text-text-secondary",
						"data-testid": `${m}-phase`,
						children: v
					}),
					h !== null && /* @__PURE__ */ U("span", {
						className: "shrink-0 text-text-secondary",
						"data-testid": `${m}-percent`,
						children: [
							"· ",
							h,
							"%"
						]
					})
				]
			}),
			h === null ? /* @__PURE__ */ H("span", {
				className: "flex-1",
				"aria-hidden": "true"
			}) : /* @__PURE__ */ H(J, {
				value: h,
				size: "sm",
				"aria-label": `${t}: ${h}%`,
				className: "min-w-[3rem] flex-1",
				"data-testid": `${m}-bar`
			}),
			/* @__PURE__ */ U("span", {
				className: "flex shrink-0 items-center gap-0.5",
				children: [
					u && /* @__PURE__ */ H(n, {
						variant: "ghost",
						size: "sm",
						onClick: u,
						"data-testid": `${m}-open`,
						children: "Open run"
					}),
					r === "paused" && c && /* @__PURE__ */ H(p, {
						size: "sm",
						"aria-label": "Resume task",
						title: "Resume",
						onClick: c,
						"data-testid": `${m}-resume`,
						children: /* @__PURE__ */ H(or, {})
					}),
					g && r !== "paused" && s && /* @__PURE__ */ H(p, {
						size: "sm",
						"aria-label": "Pause task",
						title: "Pause",
						onClick: s,
						"data-testid": `${m}-pause`,
						children: /* @__PURE__ */ H(ar, {})
					}),
					g && l && /* @__PURE__ */ H(p, {
						size: "sm",
						"aria-label": "Stop task",
						title: "Stop",
						onClick: l,
						"data-testid": `${m}-stop`,
						children: /* @__PURE__ */ H(sr, {})
					}),
					d && /* @__PURE__ */ H(p, {
						size: "sm",
						"aria-label": "Hide task strip",
						title: "Hide",
						onClick: d,
						"data-testid": `${m}-dismiss`,
						children: /* @__PURE__ */ H(_, { size: 12 })
					})
				]
			})
		]
	});
}
//#endregion
//#region src/components/shared/WorkflowStepper.tsx
var ur = {
	sm: "h-5 w-5",
	md: "h-6 w-6"
}, dr = {
	sm: "text-[10px]",
	md: "text-[11px]"
};
function fr() {
	return /* @__PURE__ */ H("svg", {
		viewBox: "0 0 16 16",
		fill: "none",
		className: "h-3 w-3",
		"aria-hidden": "true",
		children: /* @__PURE__ */ H("path", {
			d: "M3.5 8.5l3 3 6-6.5",
			stroke: "currentColor",
			strokeWidth: "1.75",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		})
	});
}
function pr({ steps: t, size: n = "md", className: r, "data-testid": i = "workflow-stepper" }) {
	return /* @__PURE__ */ H("ol", {
		className: e("flex items-center overflow-x-auto", r),
		"data-testid": i,
		children: t.map((r, i) => {
			let a = i === t.length - 1, o = t[i + 1], s = r.done ? o?.done ? "bg-success" : "bg-gradient-to-r from-success to-success/30" : "bg-border";
			return /* @__PURE__ */ U("li", {
				"aria-current": r.active ? "step" : void 0,
				className: "flex flex-1 items-center last:flex-none",
				children: [/* @__PURE__ */ U("div", {
					className: "flex items-center gap-1.5 whitespace-nowrap",
					children: [/* @__PURE__ */ H("div", {
						className: e("flex flex-shrink-0 items-center justify-center rounded-full transition-colors", ur[n], r.done ? "bg-success text-white" : r.active ? "border-2 border-info bg-info-bg" : "border border-border bg-surface-inset"),
						children: r.done ? /* @__PURE__ */ H(fr, {}) : r.active ? /* @__PURE__ */ H("span", { className: "h-2 w-2 rounded-full bg-info" }) : null
					}), /* @__PURE__ */ H("span", {
						className: e("font-medium leading-none", dr[n], r.active ? "text-text-primary" : r.done ? "text-text-secondary" : "text-text-tertiary"),
						children: r.label
					})]
				}), !a && /* @__PURE__ */ H("div", { className: e("mx-2 h-1 flex-1 rounded-full transition-colors", s) })]
			}, r.step);
		})
	});
}
//#endregion
//#region src/components/shared/Wizard.tsx
function mr() {
	return /* @__PURE__ */ H("svg", {
		viewBox: "0 0 16 16",
		fill: "none",
		className: "h-3 w-3",
		"aria-hidden": "true",
		children: /* @__PURE__ */ H("path", {
			d: "M3.5 8.5l3 3 6-6.5",
			stroke: "currentColor",
			strokeWidth: "1.75",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		})
	});
}
function hr({ steps: t, activeKey: n, onStep: r, onFinish: i, finishLabel: a = "Finish", className: o, "data-testid": s = "wizard" }) {
	let c = t.findIndex((e) => e.key === n), l = c >= 0 ? t[c] : t[0], u = l?.canAdvance ?? !0, d = c === t.length - 1;
	return /* @__PURE__ */ U("div", {
		className: e("flex flex-col gap-4 sm:flex-row", o),
		"data-testid": s,
		children: [/* @__PURE__ */ H("ol", {
			className: "flex flex-shrink-0 flex-col gap-1 sm:w-56",
			"data-testid": `${s}-rail`,
			children: t.map((t, i) => {
				let a = i < c, o = t.key === n;
				return /* @__PURE__ */ H("li", { children: /* @__PURE__ */ U("button", {
					type: "button",
					onClick: () => r(t.key),
					"aria-current": o ? "step" : void 0,
					"data-testid": `${s}-step-${t.key}`,
					className: e("flex w-full items-center gap-2.5 rounded-md px-2.5 py-2 text-left text-sm transition-colors", o ? "bg-surface-hover font-semibold text-text-primary" : "text-text-secondary hover:bg-surface-hover"),
					children: [/* @__PURE__ */ H("span", {
						className: e("flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full text-[11px] font-semibold", a ? "bg-success text-white" : o ? "border-2 border-info bg-info-bg text-info-fg" : "border border-border bg-surface-inset text-text-tertiary"),
						children: a ? /* @__PURE__ */ H(mr, {}) : i + 1
					}), /* @__PURE__ */ H("span", {
						className: "truncate",
						children: t.label
					})]
				}) }, t.key);
			})
		}), /* @__PURE__ */ U("div", {
			className: "flex min-w-0 flex-1 flex-col gap-4",
			children: [/* @__PURE__ */ H("div", {
				className: "min-w-0 flex-1",
				"data-testid": `${s}-content`,
				children: l?.content
			}), /* @__PURE__ */ U("div", {
				className: "flex items-center justify-between gap-2 border-t border-border pt-3",
				children: [/* @__PURE__ */ H("button", {
					type: "button",
					onClick: () => {
						c > 0 && r(t[c - 1].key);
					},
					disabled: c <= 0,
					"data-testid": `${s}-back`,
					className: "rounded-md px-3 py-1.5 text-sm font-semibold text-text-secondary transition-colors hover:bg-surface-hover disabled:cursor-not-allowed disabled:opacity-50",
					children: "Back"
				}), /* @__PURE__ */ H("button", {
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
var gr = [
	"tsx",
	"ts",
	"jsx",
	"js",
	"json",
	"bash",
	"sh",
	"text"
];
function _r(e) {
	let t = /language-(\w+)/.exec(e ?? "")?.[1]?.toLowerCase();
	return gr.includes(t ?? "") ? t : "text";
}
function Q(e) {
	return typeof e == "string" || typeof e == "number" ? String(e) : Array.isArray(e) ? e.map(Q).join("") : e && typeof e == "object" && "props" in e ? Q(e.props?.children) : "";
}
var vr = {
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
	let n = vr[t], r = {
		table({ children: t }) {
			return /* @__PURE__ */ H("div", {
				className: "overflow-x-auto",
				children: /* @__PURE__ */ H("table", {
					className: e("w-full border-collapse", n.body),
					children: t
				})
			});
		},
		th({ children: e }) {
			return /* @__PURE__ */ H("th", {
				className: "border-b border-border px-3 py-1.5 text-left font-semibold text-text-primary",
				children: e
			});
		},
		td({ children: e }) {
			return /* @__PURE__ */ H("td", {
				className: "border-b border-border px-3 py-1.5 text-text-secondary",
				children: e
			});
		},
		a({ href: e, children: t }) {
			return /* @__PURE__ */ H("a", {
				href: e,
				target: "_blank",
				rel: "noreferrer",
				className: "text-primary underline underline-offset-2 hover:text-primary-hover",
				children: t
			});
		},
		h1({ children: t }) {
			return /* @__PURE__ */ H("h1", {
				className: e(n.h1, "text-text-primary first:mt-0"),
				children: t
			});
		},
		h2({ children: t }) {
			return /* @__PURE__ */ H("h2", {
				className: e(n.h2, "text-text-primary first:mt-0"),
				children: t
			});
		},
		h3({ children: t }) {
			return /* @__PURE__ */ H("h3", {
				className: e(n.h3, "text-text-primary first:mt-0"),
				children: t
			});
		},
		p({ children: t }) {
			return /* @__PURE__ */ H("p", {
				className: e("mb-3 leading-relaxed text-text-secondary last:mb-0", n.body),
				children: t
			});
		},
		ul({ children: t }) {
			return /* @__PURE__ */ H("ul", {
				className: e("mb-3 list-disc space-y-1 pl-5 text-text-secondary", n.body),
				children: t
			});
		},
		ol({ children: t }) {
			return /* @__PURE__ */ H("ol", {
				className: e("mb-3 list-decimal space-y-1 pl-5 text-text-secondary", n.body),
				children: t
			});
		},
		blockquote({ children: t }) {
			return /* @__PURE__ */ H("blockquote", {
				className: e("mb-3 border-l-2 border-border pl-3 italic text-text-tertiary", n.body),
				children: t
			});
		},
		hr() {
			return /* @__PURE__ */ H("hr", { className: "my-4 border-border" });
		},
		pre({ children: e, className: t }) {
			return /* @__PURE__ */ H(br, {
				className: t,
				children: e
			});
		},
		code({ className: t, children: r }) {
			return t ? /* @__PURE__ */ H("code", {
				className: t,
				children: r
			}) : /* @__PURE__ */ H("code", {
				className: e("rounded bg-surface-inset px-1 py-0.5 text-text-primary", n.inlineCode),
				children: r
			});
		}
	};
	return n.h4 && (r.h4 = ({ children: t }) => /* @__PURE__ */ H("h4", {
		className: e(n.h4, "text-text-primary first:mt-0"),
		children: t
	})), r;
}
var yr = {
	sm: $("sm"),
	md: $("md"),
	lg: $("lg")
};
function br({ children: e, className: t }) {
	let n = Array.isArray(e) ? e[0] : e, r = _r(n && typeof n == "object" && "props" in n ? n.props?.className : void 0), i = Q(e).replace(/\n$/, "");
	return /* @__PURE__ */ H(ke, {
		code: i,
		language: r,
		className: "mb-3",
		copyButton: !0
	});
}
function xr({ markdown: t, scale: n = "md", className: r, "data-testid": i = "markdown-view" }) {
	return /* @__PURE__ */ H("div", {
		className: e("min-w-0", r),
		"data-scale": n,
		"data-testid": i,
		children: /* @__PURE__ */ H(ge, {
			remarkPlugins: [_e],
			components: yr[n] ?? yr.md,
			children: t
		})
	});
}
//#endregion
//#region src/components/shared/AttachToggle.tsx
function Sr({ attached: t, onToggle: n, labels: r = {
	add: "Add",
	added: "Added"
}, size: i = "md", tabIndex: a, className: o, "aria-label": s, "data-testid": c = "attach-toggle" }) {
	return /* @__PURE__ */ U("button", {
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
		children: [t ? /* @__PURE__ */ H(v, { size: i === "sm" ? 14 : 16 }) : /* @__PURE__ */ H(m, { size: i === "sm" ? 14 : 18 }), t ? r.added : r.add]
	});
}
//#endregion
//#region src/components/shared/DocumentResultList.tsx
function Cr(e, t = Date.now()) {
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
function wr({ items: n, currentId: r, onCurrentChange: i, onOpen: a, onToggleAttach: o, draggable: s = !0, onDragStartItem: c, rowMenu: l, rowTrailing: u, emptyState: d, now: f, toggleLabels: p, "aria-label": m = "Documents", className: _, "data-testid": v = "document-result-list" }) {
	let y = z(/* @__PURE__ */ new Map()), b = f ?? Date.now(), x = n.some((e) => e.id === r) ? r : n[0]?.id, S = F((e) => {
		let t = n[Math.max(0, Math.min(n.length - 1, e))];
		t && (y.current.get(t.id)?.focus(), i?.(t.id));
	}, [n, i]), C = (e, t, r) => {
		switch (e.key) {
			case "ArrowDown":
				e.preventDefault(), S(t + 1);
				break;
			case "ArrowUp":
				e.preventDefault(), S(t - 1);
				break;
			case "Home":
				e.preventDefault(), S(0);
				break;
			case "End":
				e.preventDefault(), S(n.length - 1);
				break;
			case "Enter":
			case " ": e.preventDefault(), a(r);
		}
	};
	return n.length ? /* @__PURE__ */ H("ul", {
		"aria-label": m,
		"data-testid": v,
		className: e("m-0 flex list-none flex-col p-0", _),
		children: n.map((n, d) => {
			let f = n.id === r, m = n.id === x, _ = Cr(n.updatedAt, b), v = l?.(n), S = u?.(n) ?? n.trailing ?? null;
			return /* @__PURE__ */ U("li", {
				"data-testid": "document-result-row",
				"data-id": n.id,
				"data-current": f || void 0,
				className: e("group relative flex items-center gap-4 border-b border-border-subtle pl-4 pr-3 transition-colors duration-100", f ? "bg-primary-bg" : "hover:bg-surface-hover"),
				children: [
					f && /* @__PURE__ */ H("span", {
						"aria-hidden": "true",
						className: "absolute inset-y-0 left-0 w-[3px] rounded-r bg-primary"
					}),
					/* @__PURE__ */ U("div", {
						ref: (e) => {
							e ? y.current.set(n.id, e) : y.current.delete(n.id);
						},
						role: "link",
						tabIndex: m ? 0 : -1,
						"aria-current": f || void 0,
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
						onKeyDown: (e) => C(e, d, n),
						className: "flex min-w-0 flex-1 cursor-pointer items-center gap-[18px] py-2.5 outline-none focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary",
						children: [/* @__PURE__ */ H(ue, {
							kind: n.kind,
							variant: "app",
							size: "xl"
						}), /* @__PURE__ */ U("span", {
							className: "flex min-w-0 flex-col gap-0.5",
							children: [
								/* @__PURE__ */ H("span", {
									className: "truncate text-base font-semibold leading-snug text-text-primary",
									children: n.title
								}),
								n.summary && /* @__PURE__ */ H("span", {
									className: "truncate text-[14.5px] leading-snug text-text-secondary",
									children: n.summary
								}),
								(n.folder || _) && /* @__PURE__ */ U("span", {
									className: "flex min-w-0 items-center gap-1.5 text-sm leading-snug text-text-tertiary",
									children: [
										n.folder && /* @__PURE__ */ H(g, {
											size: 15,
											className: "shrink-0"
										}),
										n.folder && /* @__PURE__ */ H("span", {
											className: "truncate",
											children: n.folder
										}),
										n.folder && _ && /* @__PURE__ */ H("span", {
											"aria-hidden": "true",
											children: "·"
										}),
										_ && /* @__PURE__ */ H("span", {
											className: "shrink-0",
											children: _
										})
									]
								})
							]
						})]
					}),
					S != null && S !== !1 && /* @__PURE__ */ H("span", {
						className: "flex max-h-8 shrink-0 items-center",
						"data-testid": "document-result-trailing",
						children: S
					}),
					o && /* @__PURE__ */ H(Sr, {
						attached: !!n.attached,
						onToggle: () => o(n),
						labels: p,
						tabIndex: m ? 0 : -1,
						"aria-label": `${n.attached ? "Remove" : "Add"} ${n.title}`,
						className: e(!n.attached && !f && "opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 focus-visible:opacity-100")
					}),
					v && v.length > 0 && /* @__PURE__ */ H("span", {
						className: "shrink-0 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100",
						children: /* @__PURE__ */ H(ce, {
							trigger: /* @__PURE__ */ H(h, { size: 16 }),
							triggerLabel: `More actions for ${n.title}`,
							triggerTabIndex: m ? 0 : -1,
							triggerClassName: "h-8 w-8 border-none px-0",
							align: "end",
							sections: v,
							"data-testid": "document-result-menu"
						})
					})
				]
			}, n.id);
		})
	}) : /* @__PURE__ */ H(V, { children: d ?? null });
}
//#endregion
//#region src/components/shared/FilePickerButton.tsx
function Tr({ onFiles: t, accept: n, multiple: r = !1, variant: i = "secondary", icon: a, disabled: o, children: s, className: c, "aria-label": l, "data-testid": u = "file-picker-button" }) {
	let d = z(null);
	return /* @__PURE__ */ U(V, { children: [/* @__PURE__ */ U("button", {
		type: "button",
		disabled: o,
		"aria-label": l,
		"data-testid": u,
		onClick: () => d.current?.click(),
		className: e("inline-flex h-9 cursor-pointer items-center gap-2 rounded-lg px-3.5 text-[15px] font-medium transition-colors duration-100", "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-50", i === "primary" ? "border-none bg-primary text-on-primary hover:bg-primary-hover" : "border border-border bg-surface text-text-primary hover:bg-surface-hover", c),
		children: [a, s]
	}), /* @__PURE__ */ H("input", {
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
export { Tt as $, hn as A, Vt as B, Mn as C, Sn as D, Cn as E, tn as F, It as G, zt as H, $t as I, Mt as J, Ft as K, en as L, pn as M, rn as N, bn as O, Yt as P, Et as Q, Kt as R, kn as S, En as T, Lt as U, Bt as V, Rt as W, kt as X, At as Y, Dt as Z, In as _, K as _t, xr as a, at, An as b, ke as bt, ir as c, tt as ct, cr as d, Je as dt, J as et, nr as f, We as ft, Bn as g, Ie as gt, Vn as h, Be as ht, Sr as i, st as it, fn as j, _n as k, rr as l, Qe as lt, Hn as m, ze as mt, wr as n, ht as nt, hr as o, rt as ot, qn as p, Ve as pt, Pt as q, Cr as r, lt as rt, pr as s, nt as st, Tr as t, yt as tt, lr as u, Xe as ut, Pn as v, Fe as vt, Dn as w, On as x, Fn as y, Le as yt, Ht as z };
