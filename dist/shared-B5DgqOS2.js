import { t as e } from "./cn-D4QmbyEy.js";
import "./ToastProvider-CJAceUvq.js";
import { c as t } from "./usePromptContext-CUNhKC01.js";
import "./FilterPopover-DGtR2n1P.js";
import { n } from "./Button-C2OEUpX-.js";
import { t as r } from "./Card-CbTNNNkk.js";
import { a as i, o as a, r as o } from "./Density-BgubVeSf.js";
import "./Table-JL7cMjRX.js";
import { c as s, f as c, h as l, l as u, p as d, t as f, u as p } from "./overlayStack-D0Hf2ZrU.js";
import { t as m } from "./Chip-0zFpfJ52.js";
import "./PageSection-BNrrRunD.js";
import { c as h } from "./Tabs-5OOt62a7.js";
import { K as g, et as _, f as v, k as y } from "./Icons-B_xESAH3.js";
import "./MediaIcons-_ai5Til2.js";
import "./FollowBanner-BYx1phT-.js";
import "./Badge-POenI45X.js";
import "./Banner-8ngXUtJu.js";
import "./Chart-kepXlehS.js";
import { t as b } from "./Modal-CjgKqXl7.js";
import { t as x } from "./ConfirmDialog-D5LLBfII.js";
import { t as S } from "./Input-CpLq80dw.js";
import "./DataTable-V7kdApvv.js";
import { t as C } from "./EmptyState-ClSHRgi-.js";
import { t as w } from "./ThinkingDots-BZOWJ3Fp.js";
import "./Drawer-DMvxyCIM.js";
import "./Spinner-CYflBP-c.js";
import { t as T } from "./StatusPill-c89IbU1L.js";
import "./FormField-BQhFpmZJ.js";
import { t as E } from "./Sparkline-BIYPNDRu.js";
import { i as D } from "./focusTrap-Cj-AL49l.js";
import "./FilterChip-DJ7CPwFA.js";
import "./SkeletonCard-D3FL0TB7.js";
import { a as O, i as k } from "./ChannelHeader-DVZMP9gf.js";
import "./Slider-DEbQCKD1.js";
import { n as A, t as j } from "./DropdownMenu-M27Ly7by.js";
import "./DockedPanelContext-pH9A5z1h.js";
import { t as M } from "./Textarea-Drx4YDDG.js";
import { n as ee, t as N } from "./Avatar-CmYYkk9C.js";
import { a as P } from "./TaskStrip-B8A4fORR.js";
import "./TitledFrame-B0QW93da.js";
import "./DotMeter-KxyExwVb.js";
import "./StatusDot-ClFcLvD7.js";
import { i as te } from "./ChoiceList-Be2PrFe2.js";
import "./Tooltip-DWyAb81m.js";
import "./SegmentedControl-CkpFmSce.js";
import "./SearchInput-8LpHL-oD.js";
import "./RovingToolbar-B1Fai5PF.js";
import "./InlineAlert-CBtteaVZ.js";
import "./CardHeader-C50GEAmo.js";
import "./NumberInput-axCowEor.js";
import { d as ne, f as re, p as ie } from "./PageHeader-7PJd1uEM.js";
import "./Text-82JZ-0H8.js";
import "./NotificationBell-DniaLUeD.js";
import "./LogStream-Bk8DVIVb.js";
import "./RisingParticles-BBIjT11W.js";
import "./backdropTone-BzPocySl.js";
import "./MeterRow-7m0okaBy.js";
import "./FollowUpChips-BWHw0Y0h.js";
import "./PresenceAvatars-DAgxQ3PF.js";
import "./FileUploadDrop-D3wVrrzM.js";
import { t as ae } from "./ActivityFeed-CkPp9rsm.js";
import { a as oe, c as F, d as I, i as L, l as R, o as se } from "./railType-DaEA_kg6.js";
import "./PopoverForm-DDaLhPEU.js";
import "./useMeasuredWidth-CdwaFQ-X.js";
import "./SectionLabel-Bn8Vvb-K.js";
import { t as ce } from "./InlinePlaceholder-CbIBYc-_.js";
import "./FloatingPanel-CP5vaOcJ.js";
import "./ChangeDiff-BHerlwTS.js";
import "./Link-h2c9gcsw.js";
import "./MetaLine-BtHTTScI.js";
import "./Select-C6OGjVyH.js";
import "./Checkbox-C70AGFS5.js";
import { n as le } from "./FileKindMark-DhjYpKjg.js";
import { Children as ue, Fragment as z, createContext as de, isValidElement as fe, useCallback as B, useContext as pe, useEffect as V, useId as H, useMemo as U, useRef as W, useState as G } from "react";
import { Fragment as K, jsx as q, jsxs as J } from "react/jsx-runtime";
import { Command as Y } from "cmdk";
import me from "react-markdown";
import he from "remark-gfm";
//#region src/components/shared/CodeBlock.tsx
var ge = /* @__PURE__ */ "import.export.from.as.const.let.var.function.return.default.if.else.switch.case.break.new.typeof.instanceof.in.of.interface.type.extends.implements.class.async.await.true.false.null.undefined.this.super.try.catch.finally.throw.for.while.do.continue.public.private.protected.readonly.static.enum".split("."), _e = [
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
], ve = /* @__PURE__ */ "cd.ls.echo.cat.grep.sed.awk.find.cp.mv.rm.mkdir.rmdir.touch.chmod.chown.pwd.which.npm.yarn.pnpm.npx.git.node.curl.wget".split(".");
function ye(e) {
	return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function be(e, t) {
	let n = e.replace(/(\/\/.*?)(\n|$)/g, `<span style="color:${t.comment}">$1</span>$2`);
	n = n.replace(/(\/\*[\s\S]*?\*\/)/g, `<span style="color:${t.comment}">$1</span>`), n = n.replace(/("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)/g, `<span style="color:${t.string}">$1</span>`);
	let r = RegExp(`\\b(${ge.join("|")})\\b`, "g");
	return n = n.replace(r, `<span style="color:${t.keyword}">$1</span>`), n = n.replace(/\b(\d+(?:\.\d+)?)\b/g, `<span style="color:${t.number}">$1</span>`), n;
}
function xe(e, t) {
	let n = e.replace(/("(?:[^"\\]|\\.)*")(\s*:)/g, `<span style="color:${t.property}">$1</span>$2`);
	return n = n.replace(/("(?:[^"\\]|\\.)*")/g, `<span style="color:${t.string}">$1</span>`), n = n.replace(/\b(true|false|null)\b/g, `<span style="color:${t.keyword}">$1</span>`), n = n.replace(/\b(-?\d+(?:\.\d+)?)\b/g, `<span style="color:${t.number}">$1</span>`), n;
}
function Se(e, t) {
	let n = e.replace(/(#.*?)(\n|$)/g, `<span style="color:${t.comment}">$1</span>$2`);
	n = n.replace(/("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')/g, `<span style="color:${t.string}">$1</span>`);
	let r = RegExp(`\\b(${_e.join("|")})\\b`, "g");
	n = n.replace(r, `<span style="color:${t.keyword}">$1</span>`);
	let i = RegExp(`\\b(${ve.join("|")})\\b`, "g");
	return n = n.replace(i, `<span style="color:${t.builtin}">$1</span>`), n = n.replace(/(\$\w+|\$\{[^}]+\})/g, `<span style="color:${t.variable}">$1</span>`), n;
}
var Ce = {
	comment: "var(--color-neutral)",
	string: "#4ade80",
	keyword: "var(--color-state-pending)",
	number: "#fbbf24",
	property: "#7dd3fc",
	builtin: "#c4b5fd",
	variable: "#fbbf24"
}, we = {
	comment: "var(--color-code-comment)",
	string: "var(--color-code-green)",
	keyword: "var(--color-code-mauve)",
	number: "var(--color-code-peach)",
	property: "var(--color-code-blue)",
	builtin: "var(--color-code-mauve)",
	variable: "var(--color-code-yellow)"
}, Te = {
	comment: "var(--color-neutral)",
	string: "#15803d",
	keyword: "var(--color-info-fg)",
	number: "#a16207",
	property: "#0369a1",
	builtin: "var(--color-cat-ai)",
	variable: "#a16207"
};
function Ee(e, t, n) {
	let r = n === "light" ? Te : n === "console" ? we : Ce, i = ye(e);
	switch (t) {
		case "json": return xe(i, r);
		case "bash":
		case "sh": return Se(i, r);
		case "text": return i;
		default: return be(i, r);
	}
}
function De({ code: t, language: n = "tsx", theme: r = "dark", copyButton: i = !0, showLineNumbers: a = !1, className: o, style: s, "data-testid": c, ariaLabel: l }) {
	let [u, d] = G(!1), f = B(() => {
		typeof navigator > "u" || !navigator.clipboard || navigator.clipboard.writeText(t).then(() => {
			d(!0), setTimeout(() => d(!1), 1500);
		}).catch(() => {});
	}, [t]), p = r === "dark", m = r === "console", h = U(() => t.split("\n"), [t]), g = U(() => Ee(t, n, r), [
		t,
		n,
		r
	]);
	return /* @__PURE__ */ J("div", {
		"data-testid": c,
		"data-language": n,
		"data-theme": r,
		className: e("relative rounded-lg border font-mono text-[13px] leading-relaxed overflow-hidden", m ? "bg-code-bg text-code-text border-code-border" : p ? "bg-surface-inverse text-text-inverse border-border-emphasis" : "bg-surface-panel text-text-primary border-border", o),
		style: s,
		"aria-label": l ?? `Code (${n})`,
		children: [i && /* @__PURE__ */ q("button", {
			type: "button",
			onClick: f,
			"aria-label": u ? "Copied" : "Copy code",
			className: e("absolute top-2 right-2 text-[11px] px-2 py-1 rounded border transition-opacity", m ? "bg-code-panel text-code-text border-code-border hover:bg-code-raised" : p ? "bg-surface-inverse text-text-inverse border-border-emphasis hover:bg-neutral" : "bg-surface text-text-primary border-border-emphasis hover:bg-surface-hover"),
			"data-copied": u ? "true" : "false",
			children: u ? "Copied" : "Copy"
		}), /* @__PURE__ */ q("pre", {
			className: "m-0 px-4 py-3 overflow-x-auto",
			children: a ? /* @__PURE__ */ J("div", {
				className: "flex",
				children: [/* @__PURE__ */ q("div", {
					className: e("select-none pr-3 text-right", m ? "text-code-comment" : p ? "text-neutral" : "text-text-tertiary"),
					"aria-hidden": "true",
					children: h.map((e, t) => /* @__PURE__ */ q("div", { children: t + 1 }, t))
				}), /* @__PURE__ */ q("code", {
					className: "flex-1 block",
					dangerouslySetInnerHTML: { __html: g }
				})]
			}) : /* @__PURE__ */ q("code", {
				className: "block",
				dangerouslySetInnerHTML: { __html: g }
			})
		})]
	});
}
//#endregion
//#region src/components/shared/CommandPalette.tsx
var Oe = "cui:command-palette:recents", ke = 5;
function Ae(e, t) {
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
function je(e, t) {
	if (!(!e || typeof window > "u")) try {
		window.localStorage.setItem(e, JSON.stringify(t));
	} catch {}
}
var Me = de(null);
function X() {
	let e = pe(Me);
	if (!e) throw Error("useCommandPalette must be used inside a <CommandPaletteProvider>.");
	return e;
}
function Ne() {
	let { open: e, close: t, toggle: n, isOpen: r, query: i } = X();
	return {
		open: e,
		close: t,
		toggle: n,
		isOpen: r,
		query: i
	};
}
function Pe(e, t) {
	let n = t.toLowerCase().split("+").map((e) => e.trim()).filter(Boolean);
	if (n.length === 0) return !1;
	let r = n[n.length - 1], i = new Set(n.slice(0, -1)), a = i.has("cmd") || i.has("meta"), o = i.has("ctrl"), s = i.has("mod"), c = i.has("shift"), l = i.has("alt");
	if (s) {
		if (!e.metaKey && !e.ctrlKey) return !1;
	} else if (a !== e.metaKey || o !== e.ctrlKey) return !1;
	return c !== e.shiftKey || l !== e.altKey ? !1 : e.key.toLowerCase() === r;
}
function Fe({ commands: e, getDynamicCommands: t, recentsKey: n = Oe, recentsLimit: r = ke, children: i }) {
	let [a, o] = G(!1), [s, c] = G(""), [l, u] = G(() => /* @__PURE__ */ new Map()), [d, f] = G(() => Ae(n, r)), p = B((e) => {
		n !== null && f((t) => {
			let i = [e, ...t.filter((t) => t !== e)].slice(0, r);
			return je(n, i), i;
		});
	}, [n, r]), m = B(() => o(!0), []), h = B(() => {
		o(!1), c("");
	}, []), g = B(() => o((e) => !e), []), _ = B((e) => {
		u((t) => {
			let n = new Map(t);
			return n.set(e.id, e), n;
		});
	}, []), v = B((e) => {
		u((t) => {
			if (!t.has(e)) return t;
			let n = new Map(t);
			return n.delete(e), n;
		});
	}, []);
	V(() => {
		let e = (e) => {
			(e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k" && (e.preventDefault(), o((e) => !e));
		};
		return window.addEventListener("keydown", e, !0), () => window.removeEventListener("keydown", e, !0);
	}, []);
	let y = U(() => {
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
	]), b = W(y);
	b.current = y, V(() => {
		let e = (e) => {
			if (!((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k")) {
				for (let t of b.current) if (t.hotkey && Pe(e, t.hotkey)) {
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
	return /* @__PURE__ */ q(Me.Provider, {
		value: x,
		children: i
	});
}
function Ie(e) {
	let { registerCommand: t, unregisterCommand: n } = X();
	V(() => (t(e), () => n(e.id)), [
		e,
		t,
		n
	]);
}
function Le(e) {
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
function Re({ placeholder: t = "Type a command or search…", emptyState: n, className: r } = {}) {
	let { isOpen: i, close: a, query: o, setQuery: s, mergedCommands: c, recents: l, noteSelection: u } = X(), d = U(() => {
		if (o.trim() !== "" || l.length === 0) return [];
		let e = new Map(c.map((e) => [e.id, e]));
		return l.map((t) => e.get(t)).filter((e) => !!e);
	}, [
		c,
		o,
		l
	]), f = U(() => Le(c), [c]), p = B((e) => {
		u(e.id), a(), Promise.resolve().then(() => e.run());
	}, [a, u]);
	return /* @__PURE__ */ q(b, {
		open: i,
		onClose: a,
		ariaLabel: "Command palette",
		maxWidth: 640,
		rawChildren: !0,
		backdropTestId: "command-palette-backdrop",
		children: /* @__PURE__ */ J(Y, {
			label: "Command palette",
			value: void 0,
			className: e("flex flex-col gap-0 w-full", r),
			"data-testid": "command-palette",
			children: [/* @__PURE__ */ q(Y.Input, {
				value: o,
				onValueChange: s,
				placeholder: t,
				"data-autofocus": !0,
				className: e("w-full px-3 py-2.5 text-sm border-0 border-b border-border", "outline-none bg-transparent text-text-primary placeholder:text-text-tertiary"),
				"data-testid": "command-palette-input"
			}), /* @__PURE__ */ J(Y.List, {
				className: "max-h-[360px] overflow-y-auto py-2",
				children: [
					/* @__PURE__ */ q(Y.Empty, {
						className: "px-3 py-6 text-center text-sm text-text-tertiary",
						children: n ?? "No results."
					}),
					d.length > 0 && /* @__PURE__ */ q(Y.Group, {
						heading: "Recent",
						"data-testid": "command-palette-group-recent",
						children: d.map((t) => /* @__PURE__ */ J(Y.Item, {
							value: `recent-${t.id} ${t.label}`,
							keywords: t.keywords,
							onSelect: () => p(t),
							"data-testid": `command-palette-recent-${t.id}`,
							className: e("flex items-center gap-2 px-3 py-2 mx-1 rounded-md cursor-pointer text-sm", "text-text-primary aria-selected:bg-surface-hover"),
							children: [t.icon && /* @__PURE__ */ q("span", {
								className: "shrink-0 text-text-secondary",
								children: t.icon
							}), /* @__PURE__ */ q("span", {
								className: "flex-1 truncate",
								children: t.label
							})]
						}, `recent-${t.id}`))
					}),
					f.map(({ groupName: t, items: n }) => /* @__PURE__ */ q(Y.Group, {
						heading: t ?? void 0,
						children: n.map((t) => /* @__PURE__ */ J(Y.Item, {
							value: `${t.id} ${t.label} ${(t.keywords ?? []).join(" ")}`,
							keywords: t.keywords,
							onSelect: () => p(t),
							"data-testid": `command-palette-item-${t.id}`,
							className: e("flex items-center gap-2 px-3 py-2 mx-1 rounded-md cursor-pointer text-sm", "text-text-primary aria-selected:bg-surface-hover"),
							children: [
								t.icon && /* @__PURE__ */ q("span", {
									className: "shrink-0 text-text-secondary",
									children: t.icon
								}),
								/* @__PURE__ */ q("span", {
									className: "flex-1 truncate",
									children: t.label
								}),
								t.hint && /* @__PURE__ */ q("span", {
									className: "text-xs text-text-tertiary truncate",
									children: t.hint
								}),
								t.shortcut && t.shortcut.length > 0 && /* @__PURE__ */ q("span", {
									className: "flex items-center gap-1 shrink-0",
									children: t.shortcut.map((n, r) => /* @__PURE__ */ q("kbd", {
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
function ze({ className: t, label: n = "Search", size: r = "sm" } = {}) {
	let { toggle: i } = X();
	return /* @__PURE__ */ J("button", {
		type: "button",
		onClick: i,
		"data-testid": "command-palette-hint",
		className: e("inline-flex items-center rounded-md border border-border", r === "md" ? "h-9 gap-2 bg-surface px-3 text-[13px] font-medium text-text-primary shadow-sm hover:bg-surface-hover" : "gap-1.5 px-2 py-1 text-xs text-text-secondary bg-surface-hover hover:bg-surface-panel", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", "cursor-pointer transition-colors", t),
		"aria-label": "Open command palette",
		"aria-keyshortcuts": "Meta+K Control+K",
		children: [/* @__PURE__ */ q("kbd", {
			className: e("font-mono", r === "md" ? "text-[12px] text-text-secondary" : "text-[11px]"),
			children: "⌘K"
		}), /* @__PURE__ */ q("span", { children: n })]
	});
}
//#endregion
//#region src/components/shared/PickerDialog.tsx
function Be({ open: t, title: n, body: r, options: i, confirmLabel: a = "Choose", onPick: o, onCancel: s, searchPlaceholder: c = "Search…", emptyText: l = "Nothing to choose from.", loading: u = !1, initialId: d, "data-testid": f = "picker-dialog" }) {
	let [p, m] = G(""), [h, g] = G(d ?? null), _ = W(null);
	V(() => {
		t && (m(""), g(d ?? null));
	}, [t, d]);
	let v = U(() => {
		let e = p.trim().toLowerCase();
		return e ? i.filter((t) => `${t.label} ${t.description ?? ""}`.toLowerCase().includes(e)) : i;
	}, [i, p]), y = v.filter((e) => !e.disabled), b = y.find((e) => e.id === h) ?? null, C = (e) => {
		let t = e ? i.find((t) => t.id === e && !t.disabled) : void 0;
		t && o(t.id);
	}, w = (e) => {
		if (e.key === "Enter") {
			e.preventDefault(), C(b?.id ?? (y.length === 1 ? y[0].id : null));
			return;
		}
		if (e.key !== "ArrowDown" && e.key !== "ArrowUp" || (e.preventDefault(), y.length === 0)) return;
		let t = b ? y.indexOf(b) : -1, n = e.key === "ArrowDown" ? Math.min(y.length - 1, t + 1) : Math.max(0, t - 1), r = y[n].id;
		g(r), _.current?.querySelector(`[data-option-id="${CSS.escape(r)}"]`)?.scrollIntoView({ block: "nearest" });
	};
	return /* @__PURE__ */ q(x, {
		open: t,
		title: n,
		...r ? { body: r } : {},
		confirmLabel: a,
		confirmDisabled: !b,
		onConfirm: () => C(b?.id ?? null),
		onCancel: s,
		children: /* @__PURE__ */ J("div", {
			className: "flex flex-col gap-2",
			"data-testid": f,
			onKeyDown: w,
			children: [i.length > 6 && /* @__PURE__ */ q(S, {
				autoFocus: !0,
				size: "md",
				value: p,
				onChange: (e) => m(e.target.value),
				placeholder: c,
				"aria-label": c,
				"data-testid": `${f}-search`
			}), /* @__PURE__ */ q("div", {
				ref: _,
				role: "listbox",
				"aria-label": n,
				tabIndex: i.length > 6 ? -1 : 0,
				className: "flex max-h-[320px] flex-col overflow-y-auto rounded-md border border-border py-1",
				children: u ? /* @__PURE__ */ q("div", {
					className: "px-3 py-2 text-[13px] text-text-tertiary",
					children: "Loading…"
				}) : v.length === 0 ? /* @__PURE__ */ q("div", {
					className: "px-3 py-2 text-[13px] text-text-tertiary",
					"data-testid": `${f}-empty`,
					children: l
				}) : v.map((t) => {
					let n = t.id === b?.id;
					return /* @__PURE__ */ J("button", {
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
						className: e("flex w-full items-center gap-2.5 border-none py-1.5 pr-3 text-left text-[13px] font-[inherit]", Ve[Math.min(t.depth ?? 0, Ve.length - 1)], t.disabled ? "cursor-not-allowed bg-transparent text-text-tertiary" : n ? "cursor-pointer bg-primary-bg text-primary-fg" : "cursor-pointer bg-transparent text-text-primary hover:bg-surface-hover"),
						children: [t.icon && /* @__PURE__ */ q("span", {
							className: "flex w-4 shrink-0 items-center justify-center",
							"aria-hidden": "true",
							children: t.icon
						}), /* @__PURE__ */ J("span", {
							className: "flex min-w-0 flex-1 flex-col",
							children: [/* @__PURE__ */ q("span", {
								className: "truncate",
								children: t.label
							}), (t.description || t.disabled && t.disabledReason) && /* @__PURE__ */ q("span", {
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
var Ve = [
	"pl-3",
	"pl-7",
	"pl-11",
	"pl-[3.75rem]",
	"pl-[4.75rem]",
	"pl-[5.75rem]"
], He = "🔒";
function Ue({ capabilityName: e, title: t, description: n, actionLabel: r, onAction: i, actions: a, icon: o, testId: s = "capability-denied-fallback" }) {
	let c = t ?? (e ? `${e} is unavailable` : "Feature unavailable"), l = n ?? (e ? `${e} is not enabled for this workspace. Contact your administrator to request access.` : "This feature is not enabled for your account. Contact your administrator to request access.");
	return /* @__PURE__ */ q(C, {
		icon: o === null ? void 0 : o ?? He,
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
function We(e) {
	return e.rows ?? e.shortcuts ?? [];
}
function Ge(e) {
	return e.action ?? e.label ?? "";
}
var Ke = [
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
function qe({ open: t, onClose: n, sections: r = Ke }) {
	return /* @__PURE__ */ J(b, {
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
			/* @__PURE__ */ q("div", {
				className: "text-base font-semibold text-text-primary mb-2.5",
				children: "Keyboard shortcuts"
			}),
			/* @__PURE__ */ q("div", {
				className: "overflow-y-auto pr-1",
				children: r.map((t, n) => /* @__PURE__ */ J("div", { children: [/* @__PURE__ */ q("div", {
					className: e("text-[12px] font-bold text-text-primary uppercase tracking-[0.05em] mb-1.5", n === 0 ? "mt-0 pt-0" : "mt-4 pt-1.5 border-t border-border-subtle"),
					children: t.title
				}), /* @__PURE__ */ q("div", { children: We(t).map((n, r) => /* @__PURE__ */ J("div", {
					className: e("flex items-baseline justify-between py-1 text-[13px] gap-4", n.planned && "opacity-60"),
					"data-planned": n.planned ? "true" : void 0,
					children: [Array.isArray(n.keys) ? /* @__PURE__ */ q("span", {
						className: "flex shrink-0 items-baseline gap-1",
						children: n.keys.map((t, r) => /* @__PURE__ */ q("span", {
							className: e("font-mono text-[12px] border rounded px-1.5 py-px whitespace-nowrap shrink-0", n.planned ? "text-text-tertiary bg-surface border-border-subtle line-through" : "text-text-primary bg-surface-hover border-border"),
							children: t
						}, `${t}-${r}`))
					}) : /* @__PURE__ */ q("span", {
						className: e("font-mono text-[12px] border rounded px-1.5 py-px whitespace-nowrap shrink-0", n.planned ? "text-text-tertiary bg-surface border-border-subtle line-through" : "text-text-primary bg-surface-hover border-border"),
						children: n.keys
					}), /* @__PURE__ */ J("span", {
						className: "text-neutral text-right flex-1",
						children: [Ge(n), n.planned && /* @__PURE__ */ q("span", {
							className: "ml-1.5 text-[10px] uppercase tracking-wide text-text-tertiary",
							children: "planned"
						})]
					})]
				}, `${t.title}-${r}`)) })] }, t.title))
			}),
			/* @__PURE__ */ q("div", {
				className: "flex justify-end mt-[18px]",
				children: /* @__PURE__ */ q("button", {
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
var Je = {
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
function Ye({ targetId: e = "main-content", children: t = "Skip to main content", className: n, onSkip: r }) {
	let [i, a] = G(!1);
	return /* @__PURE__ */ q("a", {
		href: `#${e}`,
		className: n,
		style: i ? Je : k,
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
function Xe(e, t) {
	let [n, r] = G(e), i = W(e), a = W(0), o = W(null);
	return V(() => {
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
	}, [e, t]), V(() => () => {
		o.current && clearTimeout(o.current);
	}, []), n;
}
function Ze({ message: e, politeness: t = "polite", atomic: n = !0, throttleMs: r = 0, role: i = "status", "data-testid": a }) {
	let o = Xe(e, r);
	return /* @__PURE__ */ q(O, {
		as: "div",
		"data-testid": a,
		children: /* @__PURE__ */ q("div", {
			...i === "none" ? null : { role: i },
			"aria-live": t,
			"aria-atomic": n,
			children: o
		})
	});
}
//#endregion
//#region src/components/shared/StatCard.tsx
var Qe = {
	positive: "text-[var(--color-success)]",
	negative: "text-[var(--color-danger)]",
	neutral: "text-[var(--color-text-secondary)]"
};
function $e(e) {
	return e.tone ?? (e.direction === "up" ? "positive" : "negative");
}
function et({ label: t, value: n, accent: r = !1, danger: i = !1, hint: a, title: o, delta: s, sparklineData: c, to: l, as: u, onClick: d, mono: f = !1, className: p, style: m, "data-testid": h }) {
	let g = e("block rounded-lg border p-3 no-underline transition-colors", !r && !i && "bg-[var(--color-surface)] border-[var(--color-border)]", r && "bg-[var(--color-primary-soft)] border-l-[3px] border-l-[var(--color-primary)] border-[var(--color-border)]", i && "bg-[var(--color-danger-bg)] border-l-[3px] border-l-[var(--color-danger)] border-[var(--color-border)]", (l || d) && "hover:bg-[var(--color-surface-hover)] cursor-pointer", p), _ = c && c.length > 0 ? c : null, v = null;
	if (s) {
		let t = $e(s), n = s.direction === "up" ? "▲" : "▼", r = s.direction === "up" ? "+" : "-", i = s.suffix ?? "%", a = Math.abs(s.value), o = s["aria-label"] ?? `${s.direction} ${a}${i}`;
		v = /* @__PURE__ */ J("div", {
			"data-testid": "stat-card-delta",
			"data-direction": s.direction,
			"data-tone": t,
			"aria-label": o,
			className: e("mt-1 text-[12px] font-medium leading-tight", Qe[t]),
			children: [
				/* @__PURE__ */ J("span", {
					"aria-hidden": "true",
					children: [n, " "]
				}),
				r,
				a,
				i
			]
		});
	}
	let y = /* @__PURE__ */ J(K, { children: [
		/* @__PURE__ */ q("div", {
			className: "text-[12px] uppercase tracking-wide text-[var(--color-text-tertiary)]",
			children: t
		}),
		/* @__PURE__ */ J("div", {
			className: "mt-1 flex items-center gap-2",
			children: [/* @__PURE__ */ q("div", {
				className: e("text-[24px] font-bold leading-tight text-[var(--color-text-primary)]", f && "font-mono"),
				children: n
			}), _ && /* @__PURE__ */ q(E, {
				data: _,
				width: 80,
				height: 20
			})]
		}),
		v,
		a != null && /* @__PURE__ */ q("div", {
			className: "mt-1 text-[11px] italic text-[var(--color-text-tertiary)]",
			children: a
		})
	] });
	return l ? u ? /* @__PURE__ */ q(u, {
		to: l,
		title: o,
		"data-testid": h,
		className: g,
		style: m,
		children: y
	}) : /* @__PURE__ */ q("a", {
		href: l,
		title: o,
		"data-testid": h,
		className: g,
		style: m,
		children: y
	}) : d ? /* @__PURE__ */ q("button", {
		type: "button",
		onClick: d,
		title: o,
		"data-testid": h,
		className: e(g, "w-full text-left"),
		style: m,
		children: y
	}) : /* @__PURE__ */ q("div", {
		"data-testid": h,
		title: o,
		className: g,
		style: m,
		children: y
	});
}
//#endregion
//#region src/components/shared/SuggestionCard.tsx
function tt({ reason: t, title: n, label: r, tone: i = "neutral", meta: a, context: o, onSelect: s, actionLabel: c = "Use this", disabled: l = !1, className: u, "data-testid": d }) {
	return /* @__PURE__ */ J("button", {
		type: "button",
		"data-testid": d,
		onClick: s,
		disabled: l,
		"aria-label": `${n} — ${t}`,
		className: e("group w-full text-left flex flex-col gap-1.5 rounded-lg border p-3 transition-colors", "border-border bg-surface hover:border-border-emphasis hover:bg-surface-hover", "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1", l ? "opacity-60 cursor-not-allowed" : "cursor-pointer", u),
		children: [
			/* @__PURE__ */ J("span", {
				className: "flex items-center gap-2 min-w-0",
				children: [r && /* @__PURE__ */ q("span", {
					className: e("shrink-0 text-[10px] font-semibold uppercase tracking-wide px-1.5 py-0.5 rounded", p[i]),
					children: r
				}), /* @__PURE__ */ q("span", {
					className: "text-[11px] text-text-secondary truncate",
					children: t
				})]
			}),
			/* @__PURE__ */ q("span", {
				className: "text-[13px] font-medium text-text-primary line-clamp-2",
				children: n
			}),
			(a || o) && /* @__PURE__ */ J("span", {
				className: "flex items-center gap-2 text-[11px] text-text-tertiary min-w-0",
				children: [a, o && /* @__PURE__ */ q("span", {
					className: "truncate",
					children: o
				})]
			}),
			/* @__PURE__ */ J("span", {
				"aria-hidden": "true",
				className: "text-[11px] font-semibold text-primary opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity",
				children: [c, " →"]
			})
		]
	});
}
//#endregion
//#region src/components/shared/TaskComposer.tsx
function nt({ title: t, description: r, titlePlaceholder: i = "Title", promptPlaceholder: a = "What should it do?", suggestions: o, suggestionsTitle: s = "Suggested next", suggestionsLoading: c = !1, suggestionsEmpty: l, onSubmit: u, onChooseSuggestion: d, submitLabel: f = "Queue", hint: p, busy: m = !1, className: h, "data-testid": g }) {
	let [_, v] = G(""), [y, b] = G(""), [x, C] = G(void 0), w = H(), T = H();
	V(() => {
		x && o && !o.some((e) => e.id === x) && C(void 0);
	}, [x, o]);
	let E = _.trim().length > 0 && y.trim().length > 0 && !m;
	function D() {
		E && (u({
			title: _.trim(),
			prompt: y.trim(),
			...x ? { suggestionId: x } : {}
		}), v(""), b(""), C(void 0));
	}
	function O(e) {
		d?.(e), v(e.fillTitle ?? e.title), b(e.prompt), C(e.id);
	}
	let k = c || (o?.length ?? 0) > 0 || !!l;
	return /* @__PURE__ */ J("section", {
		"data-testid": g,
		className: e("rounded-lg border border-border bg-surface overflow-hidden", h),
		children: [
			/* @__PURE__ */ J("div", {
				className: "px-3.5 pt-3 pb-1",
				children: [/* @__PURE__ */ q("h3", {
					className: "text-xs font-semibold text-text-secondary tracking-wide select-none uppercase",
					children: t
				}), r && /* @__PURE__ */ q("p", {
					className: "mt-1 text-[12px] text-text-tertiary",
					children: r
				})]
			}),
			k && /* @__PURE__ */ J("div", {
				className: "px-3.5 pt-2 pb-1",
				children: [/* @__PURE__ */ q("div", {
					className: "text-[11px] font-semibold text-text-tertiary tracking-wide uppercase mb-2",
					children: s
				}), c ? /* @__PURE__ */ q("div", {
					className: "grid gap-2 sm:grid-cols-2 lg:grid-cols-4",
					"aria-busy": "true",
					children: [
						0,
						1,
						2,
						3
					].map((e) => /* @__PURE__ */ q("div", { className: "h-[92px] rounded-lg border border-border bg-surface-panel animate-pulse" }, e))
				}) : (o?.length ?? 0) > 0 ? /* @__PURE__ */ q("div", {
					className: "grid gap-2 sm:grid-cols-2 lg:grid-cols-4",
					children: o.map((e) => /* @__PURE__ */ q(tt, {
						"data-testid": `suggestion-${e.id}`,
						reason: e.reason,
						title: e.title,
						...e.label ? { label: e.label } : {},
						...e.tone ? { tone: e.tone } : {},
						...e.meta ? { meta: e.meta } : {},
						...e.context ? { context: e.context } : {},
						onSelect: () => O(e),
						disabled: m
					}, e.id))
				}) : /* @__PURE__ */ q("div", {
					className: "text-[12px] text-text-tertiary",
					children: l
				})]
			}),
			/* @__PURE__ */ J("div", {
				className: "px-3.5 pt-2 pb-2 flex flex-col gap-2",
				children: [
					/* @__PURE__ */ q("label", {
						className: "sr-only",
						htmlFor: w,
						children: i
					}),
					/* @__PURE__ */ q(S, {
						id: w,
						value: _,
						onChange: (e) => v(e.target.value),
						placeholder: i,
						disabled: m
					}),
					/* @__PURE__ */ q("label", {
						className: "sr-only",
						htmlFor: T,
						children: a
					}),
					/* @__PURE__ */ q(M, {
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
			/* @__PURE__ */ J("div", {
				className: "px-3.5 pb-3 flex items-center gap-3",
				children: [
					p && /* @__PURE__ */ q("span", {
						className: "text-[11px] text-text-tertiary select-none",
						children: p
					}),
					/* @__PURE__ */ q("span", { className: "flex-1" }),
					/* @__PURE__ */ q(n, {
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
var rt = 4, it = 3;
function at({ name: t, title: r, subtitle: i, imageUrl: a, matchedSkills: o, otherSkills: s = [], contexts: c = [], evidence: l = [], evidenceLabel: u = "Seen in", onAsk: d, askLabel: f = "Ask for help", footerExtra: p, onOpen: h, className: g, "data-testid": _ }) {
	let v = s.filter((e) => !o.some((t) => t.name.toLowerCase() === e.toLowerCase())), y = l.slice(0, it), b = v.slice(0, rt);
	return /* @__PURE__ */ J("div", {
		"data-testid": _,
		onClick: h,
		className: e("flex flex-col gap-2.5 rounded-lg border border-border bg-surface p-3.5 min-w-0", h && "cursor-pointer hover:border-border-emphasis hover:bg-surface-hover transition-colors", g),
		children: [
			/* @__PURE__ */ J("div", {
				className: "flex items-center gap-2.5 min-w-0",
				children: [/* @__PURE__ */ q(N, {
					name: t,
					size: 36,
					...a ? { src: a } : {}
				}), /* @__PURE__ */ J("div", {
					className: "flex flex-col min-w-0",
					children: [/* @__PURE__ */ q("span", {
						className: "text-[13.5px] font-semibold text-text-primary truncate",
						children: t
					}), (r || i) && /* @__PURE__ */ J("span", {
						className: "text-[11.5px] text-text-secondary truncate",
						children: [
							r,
							r && i ? " · " : "",
							i
						]
					})]
				})]
			}),
			o.length > 0 && /* @__PURE__ */ J("div", {
				className: "flex flex-wrap items-center gap-1",
				children: [
					o.map((e) => /* @__PURE__ */ q(m, {
						tone: "accent",
						size: "xs",
						solid: (e.strength ?? 0) >= .7,
						children: e.name
					}, e.name)),
					b.map((e) => /* @__PURE__ */ q(m, {
						tone: "neutral",
						size: "xs",
						children: e
					}, e)),
					v.length > rt && /* @__PURE__ */ J("span", {
						className: "text-[10.5px] text-text-tertiary",
						children: ["+", v.length - rt]
					})
				]
			}),
			c.length > 0 && /* @__PURE__ */ J("div", {
				className: "text-[11px] text-text-tertiary truncate",
				title: c.join(", "),
				children: ["Working on ", c.join(", ")]
			}),
			y.length > 0 && /* @__PURE__ */ J("div", {
				className: "flex flex-col gap-1 min-w-0",
				children: [/* @__PURE__ */ q("span", {
					className: "text-[10px] font-semibold uppercase tracking-wide text-text-tertiary select-none",
					children: u
				}), y.map((e) => /* @__PURE__ */ J("div", {
					className: "flex items-center gap-1.5 min-w-0",
					children: [e.source && /* @__PURE__ */ q(m, {
						tone: "neutral",
						size: "xs",
						mono: !0,
						children: e.source
					}), e.href ? /* @__PURE__ */ q("a", {
						href: e.href,
						onClick: (e) => e.stopPropagation(),
						className: "text-[11.5px] text-text-secondary no-underline hover:underline truncate",
						children: e.title
					}) : /* @__PURE__ */ q("span", {
						className: "text-[11.5px] text-text-secondary truncate",
						children: e.title
					})]
				}, e.id))]
			}),
			(d || p) && /* @__PURE__ */ J("div", {
				className: "mt-auto pt-1 flex items-center gap-2",
				children: [
					p,
					/* @__PURE__ */ q("span", { className: "flex-1" }),
					d && /* @__PURE__ */ q(n, {
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
var ot = {
	pending: "warning",
	answered: "success",
	expired: "neutral",
	withdrawn: "neutral"
};
function st({ question: t, context: r, origin: i = [], askedAt: a, status: o, answer: s, answeredBy: c, onAnswer: l, answerPlaceholder: u = "Answer the agent — it is waiting on this…", busy: d = !1, footer: f, flush: p = !1, className: h, "data-testid": g }) {
	let [_, v] = G(""), y = _.trim().length > 0 && !d;
	function b() {
		!y || !l || (l(_.trim()), v(""));
	}
	return /* @__PURE__ */ J("section", {
		"data-testid": g,
		className: e("flex flex-col gap-2.5 min-w-0", !p && "rounded-lg border bg-surface p-3.5", !p && (o === "pending" ? "border-warning/50" : "border-border"), h),
		children: [
			/* @__PURE__ */ J("div", {
				className: "flex items-center gap-2 min-w-0",
				children: [
					/* @__PURE__ */ q(m, {
						tone: ot[o],
						size: "xs",
						dot: o === "pending" ? "pulse" : "static",
						uppercase: !0,
						children: o === "pending" ? "agent waiting" : o
					}),
					i.map((e) => /* @__PURE__ */ q(m, {
						tone: "neutral",
						size: "xs",
						mono: !0,
						children: e
					}, e)),
					/* @__PURE__ */ q("span", { className: "flex-1" }),
					a && /* @__PURE__ */ q("span", {
						className: "text-[10.5px] text-text-tertiary whitespace-nowrap",
						children: a
					})
				]
			}),
			/* @__PURE__ */ q("p", {
				className: "m-0 text-[13.5px] font-medium text-text-primary leading-snug",
				children: t
			}),
			r && /* @__PURE__ */ q("p", {
				className: "m-0 text-[12px] text-text-secondary leading-snug border-l-2 border-border pl-2.5",
				children: r
			}),
			o === "answered" && s && /* @__PURE__ */ J("div", {
				className: "flex flex-col gap-1",
				children: [/* @__PURE__ */ J("span", {
					className: "text-[10px] font-semibold uppercase tracking-wide text-text-tertiary select-none",
					children: ["Answer", c ? ` — ${c}` : ""]
				}), /* @__PURE__ */ q("p", {
					className: "m-0 text-[12.5px] text-text-primary leading-snug",
					children: s
				})]
			}),
			o === "expired" && /* @__PURE__ */ q("p", {
				className: "m-0 text-[11.5px] text-text-tertiary",
				children: "Expired unanswered — the agent stopped waiting."
			}),
			o === "pending" && l && /* @__PURE__ */ J("div", {
				className: "flex flex-col gap-2",
				children: [/* @__PURE__ */ q(M, {
					value: _,
					onChange: (e) => v(e.target.value),
					placeholder: u,
					rows: 2,
					disabled: d,
					onKeyDown: (e) => {
						e.key === "Enter" && (e.metaKey || e.ctrlKey) && (e.preventDefault(), b());
					}
				}), /* @__PURE__ */ J("div", {
					className: "flex items-center gap-2",
					children: [
						f,
						/* @__PURE__ */ q("span", { className: "flex-1" }),
						/* @__PURE__ */ q(n, {
							size: "sm",
							onClick: b,
							disabled: !y,
							children: d ? "Sending…" : "Send answer"
						})
					]
				})]
			}),
			(o !== "pending" || !l) && f && /* @__PURE__ */ q("div", {
				className: "flex items-center gap-2",
				children: f
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
	return /* @__PURE__ */ J("div", {
		className: "flex items-start gap-2 px-3 py-2 border-y border-border bg-surface-panel",
		children: [/* @__PURE__ */ q(m, {
			tone: dt[e.severity ?? "info"],
			size: "xs",
			uppercase: !0,
			children: e.severity ?? "note"
		}), /* @__PURE__ */ J("div", {
			className: "min-w-0",
			children: [/* @__PURE__ */ q("span", {
				className: "text-[12px] text-text-primary leading-snug",
				children: e.note
			}), e.author && /* @__PURE__ */ J("span", {
				className: "ml-2 text-[10.5px] text-text-tertiary whitespace-nowrap",
				children: ["— ", e.author]
			})]
		})]
	});
}
function mt({ file: t, annotations: n, collapsed: r, onToggle: i, maxLines: a }) {
	let { pinned: o, floating: s } = U(() => {
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
	return /* @__PURE__ */ J("div", {
		className: "border border-border rounded-lg overflow-hidden bg-surface",
		children: [/* @__PURE__ */ J("button", {
			type: "button",
			onClick: i,
			"aria-expanded": !r,
			className: "w-full flex items-center gap-2 px-3 py-2 bg-surface-panel border-0 cursor-pointer text-left hover:bg-surface-hover min-w-0",
			children: [
				/* @__PURE__ */ q("span", {
					"aria-hidden": !0,
					className: "text-[10px] text-text-tertiary",
					children: r ? "▸" : "▾"
				}),
				/* @__PURE__ */ q("span", {
					className: "text-[12px] font-mono font-semibold text-text-primary truncate",
					children: t.oldPath ? `${t.oldPath} → ${t.path}` : t.path
				}),
				/* @__PURE__ */ q(m, {
					tone: ut[t.status],
					size: "xs",
					children: t.status
				}),
				n.length > 0 && /* @__PURE__ */ J(m, {
					tone: "warning",
					size: "xs",
					mono: !0,
					children: [
						n.length,
						" note",
						n.length === 1 ? "" : "s"
					]
				}),
				/* @__PURE__ */ q("span", { className: "flex-1" }),
				/* @__PURE__ */ J("span", {
					className: "text-[11px] font-mono tabular-nums whitespace-nowrap",
					children: [
						/* @__PURE__ */ J("span", {
							className: "text-success",
							children: ["+", t.adds]
						}),
						" ",
						/* @__PURE__ */ J("span", {
							className: "text-danger",
							children: ["−", t.dels]
						})
					]
				})
			]
		}), !r && /* @__PURE__ */ J("div", {
			className: "overflow-x-auto",
			children: [s.map((e, t) => /* @__PURE__ */ q(pt, { a: e }, `f${t}`)), t.binary ? /* @__PURE__ */ q("div", {
				className: "px-3 py-2 text-[12px] text-text-tertiary",
				children: "Binary file — no text diff."
			}) : /* @__PURE__ */ q("table", {
				className: "w-full border-collapse font-mono text-[11.5px] leading-[1.5]",
				children: /* @__PURE__ */ J("tbody", { children: [c.map((t, n) => t.kind === "hunk" ? /* @__PURE__ */ q("tr", {
					className: ft.hunk,
					children: /* @__PURE__ */ q("td", {
						colSpan: 3,
						className: "px-3 py-0.5 text-[10.5px] text-text-tertiary select-none",
						children: t.text
					})
				}, n) : /* @__PURE__ */ J(K, { children: [/* @__PURE__ */ J("tr", {
					className: ft[t.kind],
					children: [
						/* @__PURE__ */ q("td", {
							className: "w-[3.2em] px-1.5 text-right text-[10px] text-text-tertiary select-none align-top tabular-nums border-r border-border/60",
							children: t.oldNo ?? ""
						}),
						/* @__PURE__ */ q("td", {
							className: "w-[3.2em] px-1.5 text-right text-[10px] text-text-tertiary select-none align-top tabular-nums border-r border-border/60",
							children: t.newNo ?? ""
						}),
						/* @__PURE__ */ J("td", {
							className: e("px-2 whitespace-pre align-top", t.kind === "add" && "text-success", t.kind === "del" && "text-danger", t.kind === "ctx" && "text-text-secondary"),
							children: [/* @__PURE__ */ q("span", {
								className: "select-none inline-block w-[1ch] mr-1 text-text-tertiary",
								children: t.kind === "add" ? "+" : t.kind === "del" ? "-" : " "
							}), t.text || " "]
						})
					]
				}, n), t.newNo != null && o.get(t.newNo)?.map((e, t) => /* @__PURE__ */ q("tr", { children: /* @__PURE__ */ q("td", {
					colSpan: 3,
					className: "p-0",
					children: /* @__PURE__ */ q(pt, { a: e })
				}) }, `${n}-a${t}`))] })), l && /* @__PURE__ */ q("tr", { children: /* @__PURE__ */ J("td", {
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
	let c = U(() => lt(t), [t]), [l, u] = G(() => r ? new Set(c.map((e) => e.path)) : /* @__PURE__ */ new Set()), d = W(/* @__PURE__ */ new Map()), f = U(() => {
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
	if (c.length === 0) return /* @__PURE__ */ q("div", {
		"data-testid": s,
		className: e("text-[12px] text-text-tertiary", o),
		children: "No parseable diff."
	});
	let h = c.reduce((e, t) => e + t.adds, 0), g = c.reduce((e, t) => e + t.dels, 0);
	return /* @__PURE__ */ J("div", {
		"data-testid": s,
		className: e("flex flex-col gap-2 min-w-0", o),
		children: [
			/* @__PURE__ */ J("div", {
				className: "flex items-center gap-1.5 flex-wrap",
				children: [/* @__PURE__ */ J("span", {
					className: "text-[11px] text-text-secondary font-medium whitespace-nowrap",
					children: [
						c.length,
						" file",
						c.length === 1 ? "" : "s",
						" ",
						/* @__PURE__ */ J("span", {
							className: "font-mono tabular-nums",
							children: [
								/* @__PURE__ */ J("span", {
									className: "text-success",
									children: ["+", h]
								}),
								" ",
								/* @__PURE__ */ J("span", {
									className: "text-danger",
									children: ["−", g]
								})
							]
						})
					]
				}), c.map((t) => /* @__PURE__ */ q("button", {
					type: "button",
					onClick: () => m(t.path),
					title: t.path,
					className: e("px-1.5 py-0.5 rounded border border-border bg-surface text-[10.5px] font-mono cursor-pointer", "text-text-secondary hover:border-border-emphasis hover:text-text-primary truncate max-w-[220px]", (f.get(t.path)?.length ?? 0) > 0 && "border-warning/60"),
					children: t.path.split("/").pop()
				}, t.path))]
			}),
			a && /* @__PURE__ */ q("div", {
				className: "text-[11px] text-warning",
				children: a
			}),
			c.map((e) => /* @__PURE__ */ q("div", {
				ref: (t) => {
					d.current.set(e.path, t);
				},
				children: /* @__PURE__ */ q(mt, {
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
	return /* @__PURE__ */ q("div", {
		"data-testid": s,
		className: e("grid grid-cols-1", r ? void 0 : gt[n], r && _t[r], r && vt[n], i ? "gap-2" : "gap-4", a),
		style: o,
		children: t
	});
}
//#endregion
//#region src/components/shared/Prose.tsx
var bt = "max-w-none text-text-primary [&>*:first-child]:mt-0 [&>*:last-child]:mb-0 [&_h1]:font-semibold [&_h2]:font-semibold [&_h3]:font-semibold [&_h4]:font-semibold [&_h1]:pb-2 [&_h1]:border-b [&_h1]:border-border [&_h4]:pb-1 [&_h4]:border-b [&_h4]:border-border [&_p]:my-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:my-2 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:my-2 [&_li]:mb-1 [&_li]:last:mb-0 [&_blockquote]:border-l-2 [&_blockquote]:border-border [&_blockquote]:pl-3 [&_blockquote]:my-2 [&_blockquote]:italic [&_blockquote]:text-text-secondary [&_code]:font-mono [&_code]:text-[0.85em] [&_code]:rounded [&_code]:px-1 [&_code]:py-0.5 [&_code]:bg-surface-inset [&_pre]:font-mono [&_pre]:text-xs [&_pre]:rounded-md [&_pre]:border [&_pre]:border-border [&_pre]:bg-surface-inset [&_pre]:p-3 [&_pre]:overflow-x-auto [&_pre]:my-2 [&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_pre_code]:rounded-none [&_pre_code]:text-[inherit] [&_a]:underline-offset-2 [&_a:hover]:underline", xt = {
	sm: "text-[13px] leading-snug [&_h1]:text-sm [&_h2]:text-sm [&_h3]:text-[13px] [&_h4]:text-[13px] [&_h1]:mt-3 [&_h2]:mt-3 [&_h3]:mt-2.5 [&_h4]:mt-2.5 [&_h1]:mb-1.5 [&_h2]:mb-1.5 [&_h3]:mb-1 [&_h4]:mb-1",
	md: "text-sm leading-relaxed [&_h1]:text-xl [&_h2]:text-lg [&_h3]:text-base [&_h4]:text-sm [&_h1]:mt-6 [&_h2]:mt-5 [&_h3]:mt-4 [&_h4]:mt-4 [&_h1]:mb-3 [&_h2]:mb-2 [&_h3]:mb-1.5 [&_h4]:mb-1.5"
}, St = "[&_h1]:text-text-primary [&_h2]:text-text-primary [&_h3]:text-text-primary [&_h4]:text-text-primary [&_a]:text-primary", Ct = {
	neutral: "[&_h1]:text-neutral-fg [&_h2]:text-neutral-fg [&_h3]:text-neutral-fg [&_h4]:text-neutral-fg [&_a]:text-neutral-fg",
	success: "[&_h1]:text-success-fg [&_h2]:text-success-fg [&_h3]:text-success-fg [&_h4]:text-success-fg [&_a]:text-success-fg",
	warning: "[&_h1]:text-warning-fg [&_h2]:text-warning-fg [&_h3]:text-warning-fg [&_h4]:text-warning-fg [&_a]:text-warning-fg",
	danger: "[&_h1]:text-danger-fg [&_h2]:text-danger-fg [&_h3]:text-danger-fg [&_h4]:text-danger-fg [&_a]:text-danger-fg",
	info: "[&_h1]:text-info-fg [&_h2]:text-info-fg [&_h3]:text-info-fg [&_h4]:text-info-fg [&_a]:text-info-fg",
	caution: "[&_h1]:text-caution-fg [&_h2]:text-caution-fg [&_h3]:text-caution-fg [&_h4]:text-caution-fg [&_a]:text-caution-fg",
	accent: "[&_h1]:text-accent-fg [&_h2]:text-accent-fg [&_h3]:text-accent-fg [&_h4]:text-accent-fg [&_a]:text-accent-fg"
};
function wt({ children: t, size: n = "md", tone: r, className: i, "data-testid": a }) {
	let o = r === void 0 ? void 0 : l(r);
	return /* @__PURE__ */ q("div", {
		"data-testid": a,
		className: e(bt, xt[n], o ? Ct[o] : St, i),
		children: t
	});
}
//#endregion
//#region src/components/shared/UserChip.tsx
function Tt({ name: t, label: n, avatarSize: r = 20, avatarColor: i, presence: a, onClick: o, className: s, style: c, title: l, labelClassName: u, "data-testid": d = "user-chip" }) {
	return /* @__PURE__ */ J(o ? "button" : "span", {
		type: o ? "button" : void 0,
		onClick: o,
		title: l ?? t,
		"data-testid": d,
		className: e("inline-flex items-center gap-1.5 rounded-full px-1.5 py-0.5 text-[12px] text-text-primary", o && "hover:bg-surface-hover cursor-pointer transition-colors", !o && "cursor-default", s),
		style: c,
		children: [
			/* @__PURE__ */ q(N, {
				name: t,
				size: r,
				color: i
			}),
			/* @__PURE__ */ q("span", {
				className: e("font-medium leading-none", u),
				children: n ?? t
			}),
			a && /* @__PURE__ */ q(te, {
				state: a,
				size: "xs"
			})
		]
	});
}
//#endregion
//#region src/components/shared/EntityCell.tsx
function Et({ label: t, id: n, href: r, mono: i = !1, className: a, labelClassName: o }) {
	let s = /* @__PURE__ */ q("span", {
		className: "truncate",
		children: t
	});
	return /* @__PURE__ */ J("div", {
		className: e("flex flex-col min-w-0", a),
		children: [/* @__PURE__ */ q("div", {
			className: e("font-medium text-[var(--color-text-primary)] truncate text-sm", o),
			children: r ? /* @__PURE__ */ q("a", {
				href: r,
				className: "hover:text-[var(--color-primary)] hover:underline",
				children: s
			}) : s
		}), n && /* @__PURE__ */ q("div", {
			className: e("text-[10px] font-mono text-[var(--color-text-tertiary)] truncate mt-0.5", i && "tracking-tight"),
			children: n
		})]
	});
}
//#endregion
//#region src/components/shared/CollapsibleSection.tsx
function Dt(e, t) {
	if (!e || typeof window > "u") return t;
	try {
		let n = window.localStorage.getItem(e);
		return n === null ? t : n === "true";
	} catch {
		return t;
	}
}
function Ot({ title: t, defaultOpen: n = !1, badge: r, actions: i, children: a, className: o, storageKey: s, density: c = "default", "data-testid": l }) {
	let [u, d] = G(() => Dt(s, n)), f = c === "compact", p = H(), m = W(null), h = W(null);
	return V(() => {
		if (s && !(typeof window > "u")) try {
			window.localStorage.setItem(s, String(u));
		} catch {}
	}, [u, s]), /* @__PURE__ */ J("div", {
		className: e("border border-[var(--color-border)] rounded-lg overflow-hidden", o),
		children: [/* @__PURE__ */ J("div", {
			className: "flex items-stretch bg-[var(--color-surface)]",
			children: [/* @__PURE__ */ J("button", {
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
				children: [/* @__PURE__ */ q("span", {
					className: e("font-semibold text-[var(--color-text-primary)]", f ? "text-xs" : "text-sm"),
					children: t
				}), /* @__PURE__ */ J("div", {
					className: "flex items-center gap-2",
					children: [r, /* @__PURE__ */ q("svg", {
						className: e("text-[var(--color-text-tertiary)] transition-transform", f ? "w-3 h-3" : "w-4 h-4", u && "rotate-180"),
						viewBox: "0 0 16 16",
						fill: "none",
						"aria-hidden": "true",
						children: /* @__PURE__ */ q("path", {
							d: "M4 6l4 4 4-4",
							stroke: "currentColor",
							strokeWidth: "1.5",
							strokeLinecap: "round",
							strokeLinejoin: "round"
						})
					})]
				})]
			}), i && /* @__PURE__ */ q("div", {
				className: "flex items-center gap-2 pr-4 shrink-0",
				children: i
			})]
		}), u && /* @__PURE__ */ q("div", {
			id: p,
			ref: h,
			className: "border-t border-[var(--color-border)] bg-surface",
			children: a
		})]
	});
}
//#endregion
//#region src/components/shared/useHeaderDensity.ts
var kt = 48, At = 1e3;
function jt(e) {
	if (typeof window > "u") return null;
	try {
		return window.localStorage.getItem(e) === "collapsed" ? "collapsed" : null;
	} catch {
		return null;
	}
}
function Mt(e, t) {
	try {
		t ? window.localStorage.setItem(e, "collapsed") : window.localStorage.removeItem(e);
	} catch {}
}
function Nt({ contentKind: e = "detail", containerHeight: t = null, preference: n = null, headerId: r = "page", scrollCollapse: i = !0 } = {}) {
	let a = re(r, e), o = ie(e), { density: s, collapsed: c } = ne({
		contentKind: e,
		containerHeight: t,
		preference: n
	}), [l, u] = G(() => ({
		key: a,
		manual: jt(a)
	})), [d, f] = G({
		key: a,
		on: !1
	}), p = l.key === a ? l.manual : jt(a), m = d.key === a && d.on;
	l.key !== a && u({
		key: a,
		manual: p
	}), d.key !== a && d.on && f({
		key: a,
		on: !1
	});
	let h = p === "collapsed" || p === null && (m && o || c), g = B(() => {
		h ? (Mt(a, !1), u({
			key: a,
			manual: "expanded"
		}), f({
			key: a,
			on: !1
		})) : (Mt(a, !0), u({
			key: a,
			manual: "collapsed"
		}));
	}, [h, a]), _ = W({
		enabled: !1,
		key: a
	});
	_.current = {
		enabled: i && o && p === null,
		key: a
	};
	let [v, y] = G(null);
	return V(() => {
		if (!v) return;
		let e = 0, t = () => {
			e = Date.now();
		}, n = (t) => {
			if (!_.current.enabled || Date.now() - e > At) return;
			let n = t.target instanceof HTMLElement ? t.target : null, r = n ? n.scrollTop : 0, i = _.current.key;
			r > 48 ? f((e) => e.key === i && e.on ? e : {
				key: i,
				on: !0
			}) : r <= 0 && f((e) => e.key === i && !e.on ? e : {
				key: i,
				on: !1
			});
		}, r = [
			"wheel",
			"touchmove",
			"keydown",
			"pointerdown"
		];
		return r.forEach((e) => v.addEventListener(e, t, {
			passive: !0,
			capture: !0
		})), v.addEventListener("scroll", n, {
			passive: !0,
			capture: !0
		}), () => {
			r.forEach((e) => v.removeEventListener(e, t, { capture: !0 })), v.removeEventListener("scroll", n, { capture: !0 });
		};
	}, [v]), {
		density: s,
		collapsed: h,
		toggleCollapsed: g,
		contentRef: y,
		headerProps: {
			density: s,
			collapsed: h,
			onToggleCollapsed: g
		}
	};
}
//#endregion
//#region src/components/shared/ThumbnailCard.tsx
function Pt({ title: t, description: n, category: r, categoryTone: i = "neutral", thumbnail: a, icon: o = "🧩", thumbnailHeight: s = 160, href: c, onClick: l, badge: u, meta: d, className: f, style: p, "data-testid": h = "thumbnail-card" }) {
	let g = e("group block w-full text-left bg-[var(--color-surface,#fff)]", "rounded-xl border border-[var(--color-border)] overflow-hidden", "transition-[box-shadow,transform] duration-150", (c || l) && "cursor-pointer hover:shadow-[0_8px_25px_rgba(0,0,0,0.08)] hover:-translate-y-0.5", f), _ = /* @__PURE__ */ J(K, { children: [/* @__PURE__ */ J("div", {
		"data-testid": `${h}-thumb`,
		className: e("relative flex items-center justify-center", "bg-gradient-to-br from-[var(--color-primary-bg,#eef2ff)] to-[var(--color-surface,#ffffff)]", "border-b border-[var(--color-border)]"),
		style: { height: s },
		children: [a ? /* @__PURE__ */ q("img", {
			src: a,
			alt: "",
			className: "w-full h-full object-cover"
		}) : /* @__PURE__ */ q("span", {
			className: "text-5xl opacity-50",
			"aria-hidden": !0,
			children: o
		}), u && /* @__PURE__ */ q("span", {
			"data-testid": `${h}-badge`,
			className: "absolute top-2 right-2",
			children: u
		})]
	}), /* @__PURE__ */ J("div", {
		className: "px-4 py-3",
		children: [
			/* @__PURE__ */ J("div", {
				className: "flex items-center gap-2 mb-1.5",
				children: [r && /* @__PURE__ */ q(m, {
					tone: i,
					size: "xs",
					"data-testid": `${h}-category`,
					children: r
				}), d && /* @__PURE__ */ q("span", {
					className: "ml-auto",
					children: d
				})]
			}),
			/* @__PURE__ */ q("div", {
				className: "text-[14px] font-semibold text-[var(--color-text-primary)] leading-snug",
				children: t
			}),
			n && /* @__PURE__ */ q("div", {
				className: "mt-1 text-[12px] text-[var(--color-text-secondary)] leading-snug",
				children: n
			})
		]
	})] });
	return c ? /* @__PURE__ */ q("a", {
		href: c,
		onClick: l,
		"data-testid": h,
		className: e(g, "no-underline text-inherit"),
		style: p,
		children: _
	}) : l ? /* @__PURE__ */ q("button", {
		type: "button",
		onClick: l,
		"data-testid": h,
		className: e(g, "font-inherit"),
		style: p,
		children: _
	}) : /* @__PURE__ */ q("div", {
		"data-testid": h,
		className: g,
		style: p,
		children: _
	});
}
//#endregion
//#region src/components/shared/CatalogGrid.tsx
var Ft = {
	1: "sm:grid-cols-1",
	2: "sm:grid-cols-2",
	3: "sm:grid-cols-2 lg:grid-cols-3",
	4: "sm:grid-cols-2 lg:grid-cols-4",
	5: "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
};
function It({ children: t, columns: n = 3, dense: r = !1, className: i, style: a, "data-testid": o = "catalog-grid" }) {
	return /* @__PURE__ */ q("div", {
		"data-testid": o,
		"data-columns": n,
		className: e("grid grid-cols-1", Ft[n], r ? "gap-3" : "gap-5", i),
		style: a,
		children: t
	});
}
//#endregion
//#region src/components/shared/StackDiagram.tsx
function Lt({ orientation: t, variant: n }) {
	if (n === "none") return null;
	let r = t === "vertical", i = n === "arrow" ? r ? "↓" : "→" : r ? "│" : "─";
	return /* @__PURE__ */ q("div", {
		"data-testid": "stack-diagram-connector",
		"aria-hidden": !0,
		className: e("flex items-center justify-center text-[var(--color-text-tertiary)]", r ? "h-5 text-base" : "w-5 text-base"),
		children: i
	});
}
function Rt({ layers: t, orientation: n = "vertical", connector: r = "arrow", className: i, style: a, "data-testid": o = "stack-diagram" }) {
	let c = n === "vertical";
	return /* @__PURE__ */ q("div", {
		"data-testid": o,
		"data-orientation": n,
		"data-connector": r,
		className: e("flex", c ? "flex-col items-stretch" : "flex-row items-stretch flex-wrap", i),
		style: a,
		children: t.map((i, a) => {
			let o = l(i.tone ?? "neutral");
			return /* @__PURE__ */ J("div", {
				className: e("flex", "flex-col"),
				children: [/* @__PURE__ */ J("div", {
					"data-testid": "stack-diagram-layer",
					"data-tone": o,
					className: e("rounded-md border px-3 py-2", s[o], u[o], !c && "min-w-[140px]"),
					children: [/* @__PURE__ */ J("div", {
						className: "flex items-center gap-2",
						children: [
							i.icon != null && /* @__PURE__ */ q("span", {
								className: "shrink-0 text-[14px] leading-none",
								"aria-hidden": !0,
								children: i.icon
							}),
							/* @__PURE__ */ q("span", {
								className: e("text-[12px] font-semibold", d[o]),
								children: i.label
							}),
							i.meta != null && /* @__PURE__ */ q("span", {
								className: "ml-auto text-[10px] text-[var(--color-text-tertiary)] shrink-0",
								children: i.meta
							})
						]
					}), i.description != null && /* @__PURE__ */ q("div", {
						className: "mt-0.5 text-[11px] leading-snug text-[var(--color-text-secondary)]",
						children: i.description
					})]
				}), a < t.length - 1 && /* @__PURE__ */ q(Lt, {
					orientation: n,
					variant: r
				})]
			}, i.id);
		})
	});
}
var zt = Rt;
//#endregion
//#region src/components/shared/ChatComposer.tsx
function Bt({ value: t, onChange: n, onSubmit: r, disabled: i = !1, multiline: a = !1, placeholder: o, submitLabel: s = "→", className: c, style: l, autoFocus: u, maxRows: d = 4, "aria-label": f = "Message", "aria-labelledby": p, submitAriaLabel: m = "Send" }) {
	let h = !i && t.trim().length > 0, g = typeof s == "string" && /\p{L}|\p{N}/u.test(s) ? void 0 : m, _ = p ? void 0 : f, v = () => {
		h && r();
	}, y = (e) => {
		if (e.key === "Enter") {
			if (a && e.shiftKey) return;
			e.preventDefault(), v();
		}
	}, b = e("flex-1 px-3 py-2 text-sm rounded-lg border border-[var(--color-border-field,#d1d5db)] bg-surface text-[var(--color-text-primary)]", "placeholder:text-[var(--color-text-tertiary)]", "focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent", "resize-none", i && "opacity-50 cursor-not-allowed bg-[var(--color-surface-hover)]");
	return /* @__PURE__ */ J("div", {
		className: e("flex items-end gap-2 p-3 border-t border-[var(--color-border)] bg-[var(--color-surface)]", c),
		style: l,
		children: [a ? /* @__PURE__ */ q("textarea", {
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
		}) : /* @__PURE__ */ q("input", {
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
		}), /* @__PURE__ */ q("button", {
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
function Vt({ name: t, done: n, title: r, className: i }) {
	return /* @__PURE__ */ J("span", {
		title: r,
		className: e("inline-flex items-center gap-1 text-[10.5px] font-mono px-2 py-0.5 rounded-full", n ? "bg-[var(--color-success-bg,#f0fdf4)] text-[var(--color-success,#16a34a)]" : "bg-[var(--color-info-bg,#eff6ff)] text-[var(--color-info,#1d4ed8)]", i),
		children: [t, n ? " ✓" : "…"]
	});
}
function Ht({ toolCalls: t, className: n }) {
	return /* @__PURE__ */ q("div", {
		className: e("flex flex-wrap gap-1.5 py-1", n),
		children: t.map((e) => /* @__PURE__ */ q(Vt, {
			name: e.name,
			done: e.done
		}, e.id))
	});
}
//#endregion
//#region src/components/shared/MessageBubble.tsx
function Ut({ role: t, content: n, toolCalls: r, streaming: i = !1, agentName: a, userName: o, renderMarkdown: s, className: c }) {
	let l = t === "user" ? o || "You" : a || "Assistant";
	return /* @__PURE__ */ J("div", {
		className: e("flex flex-col gap-1.5 py-3", c),
		children: [
			/* @__PURE__ */ q("div", {
				className: "text-[11px] font-semibold uppercase tracking-wide text-[var(--color-text-tertiary)]",
				children: l
			}),
			r && r.length > 0 && /* @__PURE__ */ q(Ht, { toolCalls: r }),
			t === "user" ? /* @__PURE__ */ q("div", {
				className: "text-sm text-[var(--color-text-primary)] whitespace-pre-wrap",
				children: n
			}) : /* @__PURE__ */ q("div", {
				className: "text-sm text-[var(--color-text-primary)] prose-sm max-w-none",
				children: n ? s ? s(n) : /* @__PURE__ */ q("span", {
					className: "whitespace-pre-wrap",
					children: n
				}) : i ? /* @__PURE__ */ q(w, {}) : null
			})
		]
	});
}
//#endregion
//#region src/components/shared/ThinkingBlock.tsx
function Wt({ content: t, streaming: n = !1, defaultOpen: r = !1, className: i }) {
	let a = n || !t ? "Thinking" : "Thought";
	return /* @__PURE__ */ J("details", {
		open: r,
		className: e("rounded-md border border-[var(--color-border)] overflow-hidden text-sm group", i),
		children: [/* @__PURE__ */ J("summary", {
			className: "flex items-center gap-2 px-3 py-2 cursor-pointer select-none bg-[var(--color-surface)] hover:bg-[var(--color-surface-hover)] text-[var(--color-text-tertiary)] list-none",
			children: [
				/* @__PURE__ */ q("svg", {
					className: "w-3.5 h-3.5 transition-transform group-open:rotate-90",
					xmlns: "http://www.w3.org/2000/svg",
					viewBox: "0 0 20 20",
					fill: "currentColor",
					"aria-hidden": "true",
					children: /* @__PURE__ */ q("path", {
						fillRule: "evenodd",
						d: "M7.21 14.77a.75.75 0 010-1.06L10.94 10 7.21 6.29a.75.75 0 011.08-1.04l4.25 4.25a.75.75 0 010 1.06l-4.25 4.25a.75.75 0 01-1.08-.04z",
						clipRule: "evenodd"
					})
				}),
				/* @__PURE__ */ q("span", {
					className: "text-[11px] font-semibold uppercase tracking-wide",
					children: a
				}),
				n && !t && /* @__PURE__ */ q(w, { size: "sm" })
			]
		}), /* @__PURE__ */ q("div", {
			className: "px-3 py-2 text-xs text-[var(--color-text-secondary)] italic border-t border-[var(--color-border)] bg-surface whitespace-pre-wrap leading-relaxed",
			children: t || /* @__PURE__ */ q(w, {})
		})]
	});
}
//#endregion
//#region src/components/shared/QuickPromptGrid.tsx
function Gt({ prompts: t, onSelect: n, columns: r, title: i, className: a }) {
	let o = r ? `repeat(${r}, minmax(0, 1fr))` : "repeat(auto-fit, minmax(220px, 1fr))";
	return /* @__PURE__ */ J("div", {
		className: e("flex flex-col gap-3", a),
		children: [i && /* @__PURE__ */ q("p", {
			className: "text-xs font-semibold uppercase tracking-wide text-[var(--color-text-tertiary)] text-center",
			children: i
		}), /* @__PURE__ */ q("div", {
			style: {
				display: "grid",
				gridTemplateColumns: o,
				gap: 10
			},
			children: t.map((e, t) => /* @__PURE__ */ J("button", {
				type: "button",
				onClick: () => n(e.label),
				className: "flex flex-col gap-1 px-4 py-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] hover:bg-[var(--color-surface-hover)] hover:border-[var(--color-border-emphasis,#cbd5e1)] text-left transition-colors",
				children: [/* @__PURE__ */ q("span", {
					className: "text-sm font-medium text-[var(--color-text-primary)]",
					children: e.label
				}), e.hint && /* @__PURE__ */ q("span", {
					className: "text-xs text-[var(--color-text-tertiary)]",
					children: e.hint
				})]
			}, t))
		})]
	});
}
//#endregion
//#region src/components/shared/UserMenu.tsx
function Kt({ user: t, items: n, className: r, "data-testid": i }) {
	let [a, o] = G(!1), s = W(null), c = B(() => o(!1), []);
	return V(() => {
		if (!a) return;
		let e = (e) => {
			s.current && !s.current.contains(e.target) && c();
		};
		return document.addEventListener("mousedown", e), () => document.removeEventListener("mousedown", e);
	}, [a, c]), D(a, c), /* @__PURE__ */ J("div", {
		ref: s,
		"data-testid": i,
		className: e("relative inline-block", r),
		children: [/* @__PURE__ */ J("button", {
			type: "button",
			"aria-label": `User menu for ${t.name}`,
			"aria-expanded": a,
			"aria-haspopup": "menu",
			onClick: () => o((e) => !e),
			className: e("flex items-center gap-2 bg-transparent border-none cursor-pointer p-1 rounded-lg", "hover:bg-[var(--color-surface-hover)] transition-colors duration-100", a && "bg-[var(--color-surface-hover)]"),
			children: [
				t.avatarUrl ? /* @__PURE__ */ q("img", {
					src: t.avatarUrl,
					alt: t.name,
					className: "w-8 h-8 rounded-full object-cover"
				}) : /* @__PURE__ */ q(N, {
					name: t.name,
					size: 32
				}),
				/* @__PURE__ */ J("div", {
					className: "flex flex-col items-start text-left min-w-0 hidden sm:flex",
					children: [/* @__PURE__ */ q("span", {
						className: "text-sm font-medium text-[var(--color-text-primary)] leading-tight truncate max-w-[120px]",
						children: t.name
					}), /* @__PURE__ */ q("span", {
						className: "text-xs text-[var(--color-text-tertiary)] leading-tight truncate max-w-[120px]",
						children: t.email
					})]
				}),
				/* @__PURE__ */ q("svg", {
					width: "12",
					height: "12",
					viewBox: "0 0 12 12",
					fill: "none",
					"aria-hidden": "true",
					className: e("text-[var(--color-text-tertiary)] transition-transform duration-150", a ? "rotate-180" : "rotate-0"),
					children: /* @__PURE__ */ q("path", {
						d: "M2 4l4 4 4-4",
						stroke: "currentColor",
						strokeWidth: "1.5",
						strokeLinecap: "round",
						strokeLinejoin: "round"
					})
				})
			]
		}), a && /* @__PURE__ */ J("div", {
			role: "menu",
			"aria-label": "User menu",
			className: e("absolute right-0 top-[calc(100%+6px)] min-w-[200px] z-[200]", "bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl shadow-md overflow-hidden"),
			children: [/* @__PURE__ */ J("div", {
				className: "px-3 py-2.5 border-b border-[var(--color-border)]",
				children: [/* @__PURE__ */ q("p", {
					className: "text-sm font-semibold text-[var(--color-text-primary)] truncate",
					children: t.name
				}), /* @__PURE__ */ q("p", {
					className: "text-xs text-[var(--color-text-tertiary)] truncate",
					children: t.email
				})]
			}), /* @__PURE__ */ q("div", {
				className: "py-1",
				children: n.map((t, n) => /* @__PURE__ */ J("div", { children: [t.separator && n > 0 && /* @__PURE__ */ q("div", { className: "my-1 border-t border-[var(--color-border)]" }), /* @__PURE__ */ J("button", {
					type: "button",
					role: "menuitem",
					onClick: () => {
						t.onClick(), c();
					},
					className: e("flex items-center gap-2.5 w-full text-left px-3 py-2", "text-sm border-none cursor-pointer font-[inherit] transition-colors duration-100", t.danger ? "text-danger-fg bg-transparent hover:bg-danger-bg" : "text-[var(--color-text-primary)] bg-transparent hover:bg-[var(--color-surface-hover)]"),
					children: [t.icon && /* @__PURE__ */ q("span", {
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
var qt = {
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
}, Jt = {
	bg: "var(--color-surface-hover)",
	border: "var(--color-border-field)",
	text: "var(--color-text-primary)",
	accent: "var(--color-neutral)"
};
function Yt({ status: e, colors: t }) {
	return /* @__PURE__ */ J("span", {
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
		children: [/* @__PURE__ */ q("span", { style: {
			width: 5,
			height: 5,
			borderRadius: "50%",
			background: t.accent
		} }), e.replace(/_/g, " ")]
	});
}
function Xt({ name: e, id: t, status: n, statusColors: r, contributorNames: i = [], contributorCount: a, activityItems: o = [], presenceDotColor: s = "var(--color-border-field)", activityLabel: c = "", cardIndex: l = 0, onClick: u, className: d, style: f, minHeight: p = 190 }) {
	let m = {
		...qt,
		...r
	}[(n ?? "unknown").toLowerCase().replace(/ /g, "_")] ?? Jt, h = a === void 0 ? 0 : Math.max(0, a - i.length), g = l % 8 * 525;
	return /* @__PURE__ */ J(u ? "button" : "div", {
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
			/* @__PURE__ */ J("div", {
				style: {
					display: "flex",
					alignItems: "flex-start",
					justifyContent: "space-between",
					gap: 8
				},
				children: [/* @__PURE__ */ J("div", {
					style: {
						flex: 1,
						minWidth: 0
					},
					children: [/* @__PURE__ */ q("h3", {
						style: {
							margin: "0 0 3px",
							fontSize: 13.5,
							fontWeight: 700,
							color: "var(--color-text-primary, #111827)",
							lineHeight: 1.35
						},
						children: e
					}), t && /* @__PURE__ */ q("span", {
						style: {
							fontSize: 10,
							fontFamily: "ui-monospace, \"SFMono-Regular\", Menlo, monospace",
							color: "var(--color-text-tertiary)",
							letterSpacing: "0.02em"
						},
						children: t
					})]
				}), n && /* @__PURE__ */ q(Yt, {
					status: n,
					colors: m
				})]
			}),
			/* @__PURE__ */ q(ae, {
				items: o,
				staggerMs: g
			}),
			/* @__PURE__ */ J("div", {
				style: {
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
					paddingTop: 8,
					borderTop: "1px solid var(--color-border-subtle, #f3f4f6)",
					gap: 8
				},
				children: [/* @__PURE__ */ J("div", {
					style: {
						display: "flex",
						alignItems: "center",
						gap: 8,
						minWidth: 0
					},
					children: [i.length > 0 ? /* @__PURE__ */ q(ee, {
						names: i,
						maxVisible: 5,
						size: 24
					}) : /* @__PURE__ */ J("span", {
						style: {
							fontSize: 12,
							color: "var(--color-text-tertiary)"
						},
						children: [/* @__PURE__ */ q("strong", {
							style: { color: "var(--color-text-primary)" },
							children: a ?? 0
						}), " contributors"]
					}), i.length > 0 && h > 0 && /* @__PURE__ */ J("span", {
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
				}), c && /* @__PURE__ */ J("div", {
					style: {
						display: "flex",
						alignItems: "center",
						gap: 5,
						flexShrink: 0
					},
					children: [/* @__PURE__ */ q("span", { style: {
						width: 6,
						height: 6,
						borderRadius: "50%",
						background: s,
						flexShrink: 0
					} }), /* @__PURE__ */ q("span", {
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
//#region src/components/shared/railFold.tsx
var Zt = 1180, Qt = 768;
function $t(e, t = {}) {
	let n = e.pathname.split("/").filter(Boolean), r = n.length > 0 && t.prefixes?.includes(n[0]) ? n.slice(1) : n, i = e.search ?? "", a = new URLSearchParams(i.startsWith("?") ? i.slice(1) : i), o = (t.drillParams ?? []).some((e) => a.get(e)), s = Math.max(1, r.length) + +!!o;
	return t.explored && !o && (s += 2), (t.leafRoutes ?? []).some((t) => t.test(e.pathname)) && (s = Math.max(s, 3)), s;
}
function en(e) {
	return e >= 3 ? "deep" : "shallow";
}
function Z(e, t) {
	return `${e}.${t}`;
}
function tn(e) {
	return e === "collapsed" || e !== "open" && null;
}
var nn = de("shallow");
function rn({ band: e, children: t }) {
	return /* @__PURE__ */ q(nn.Provider, {
		value: e,
		children: t
	});
}
function an() {
	return pe(nn);
}
function Q(e) {
	if (typeof window > "u") return null;
	try {
		return tn(window.localStorage.getItem(e));
	} catch {
		return null;
	}
}
function on({ storageKey: e, band: t, defaultFolded: n = !1 }) {
	let r = an(), i = t ?? r, [a, o] = G(() => ({
		shallow: Q(Z(e, "shallow")),
		deep: Q(Z(e, "deep"))
	})), [s, c] = G(e);
	s !== e && (c(e), o({
		shallow: Q(Z(e, "shallow")),
		deep: Q(Z(e, "deep"))
	}));
	let l = a[i], u = l ?? n;
	return {
		folded: u,
		toggle: B(() => {
			let t = !u;
			o((e) => ({
				...e,
				[i]: t
			}));
			try {
				window.localStorage.setItem(Z(e, i), t ? "collapsed" : "open");
			} catch {}
		}, [
			i,
			u,
			e
		]),
		band: i,
		remembered: l != null
	};
}
function sn() {
	let [e, t] = G(() => typeof window > "u" ? 1680 : window.innerWidth);
	return V(() => {
		let e = () => t(window.innerWidth);
		return window.addEventListener("resize", e), () => window.removeEventListener("resize", e);
	}, []), e;
}
//#endregion
//#region src/components/shared/RailNavList.tsx
var cn = e("flex w-full min-w-0 items-center gap-2.5 rounded-md border-0 bg-transparent px-2.5 py-[6px] text-left", F, "text-text-primary no-underline [font-family:inherit]", "transition-colors duration-100 hover:bg-surface-hover", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary");
function ln({ items: t, currentStyle: n = "weight", "aria-label": r = "Views", className: i, "data-testid": a = "rail-nav-list" }) {
	return t.length === 0 ? null : /* @__PURE__ */ q("nav", {
		"aria-label": r,
		className: e("min-w-0", i),
		"data-testid": a,
		children: /* @__PURE__ */ q("ul", {
			className: "m-0 flex list-none flex-col p-0",
			children: t.map((t) => {
				let r = /* @__PURE__ */ J(K, { children: [
					t.icon != null && /* @__PURE__ */ q("span", {
						className: "flex shrink-0 items-center text-text-secondary",
						children: t.icon
					}),
					/* @__PURE__ */ q("span", {
						className: "min-w-0 flex-1 truncate",
						title: t.label,
						children: t.label
					}),
					typeof t.count == "number" && /* @__PURE__ */ q("span", {
						className: e("shrink-0", "text-[12px] font-medium leading-4 tabular-nums text-text-tertiary"),
						"aria-label": `${t.count} items`,
						"data-testid": `${a}-count-${t.id}`,
						children: t.count
					})
				] }), i = {
					className: e(cn, t.current ? "font-semibold" : void 0, t.current && n === "tint" && "bg-primary/10", t.disabled ? "cursor-default opacity-60 hover:bg-transparent" : "cursor-pointer"),
					"data-testid": `${a}-item-${t.id}`,
					"data-current": t.current || void 0,
					"aria-current": t.current ? "page" : void 0
				};
				return /* @__PURE__ */ q("li", {
					className: "min-w-0",
					children: t.href && !t.disabled ? /* @__PURE__ */ q("a", {
						href: t.href,
						onClick: (e) => {
							t.onNavigate?.(e), t.onSelect?.();
						},
						...i,
						children: r
					}) : /* @__PURE__ */ q("button", {
						type: "button",
						disabled: t.disabled,
						title: t.disabled ? t.disabledReason : void 0,
						onClick: () => {
							t.disabled || t.onSelect?.();
						},
						...i,
						children: r
					})
				}, t.id);
			})
		})
	});
}
//#endregion
//#region src/components/shared/StackedRail.tsx
var $ = "border-y-0 border-r-0 border-l-[3px] border-solid border-transparent px-[14px]", un = e("flex w-full min-w-0 items-center gap-2.5 bg-transparent text-left", $, R, F, "text-text-primary no-underline [font-family:inherit]", "transition-colors duration-100 hover:bg-surface-hover", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"), dn = "border-l-primary", fn = R, pn = "flex h-5 w-[18px] shrink-0 items-center justify-start text-text-secondary";
function mn({ cancelGap: t, children: n }) {
	return /* @__PURE__ */ q("span", {
		className: e("flex shrink-0", t),
		"data-rail-gutter": "",
		children: n
	});
}
var hn = e("sr-only flex shrink-0 items-center gap-0.5", "group-hover/head:not-sr-only", "group-has-[:focus-visible]/head:not-sr-only", "group-data-[current]/head:not-sr-only", "has-[[aria-expanded=true]]:not-sr-only", "[@media(hover:none)]:not-sr-only"), gn = "hidden shrink-0 items-center pr-1 group-hover/row:flex group-focus-within/row:flex has-[[aria-expanded=true]]:flex";
function _n(e) {
	return {
		...e.draggable === void 0 ? {} : { draggable: e.draggable },
		...e.onDragStart ? { onDragStart: e.onDragStart } : {},
		...e.onDragOver ? { onDragOver: e.onDragOver } : {},
		...e.onDragEnter ? { onDragEnter: e.onDragEnter } : {},
		...e.onDragLeave ? { onDragLeave: e.onDragLeave } : {},
		...e.onDrop ? { onDrop: e.onDrop } : {},
		...e.onDragEnd ? { onDragEnd: e.onDragEnd } : {},
		...e.data ?? {}
	};
}
function vn(e) {
	return Array.isArray(e) && e.every((e) => e && typeof e == "object" && "label" in e && "onClick" in e);
}
function yn({ actions: e, className: t, testId: n }) {
	if (e == null || e === !1) return null;
	let r = {
		className: t ?? "flex shrink-0 items-center gap-0.5",
		...n ? { "data-testid": n } : {}
	};
	return vn(e) ? e.length === 0 ? null : /* @__PURE__ */ q("span", {
		...r,
		children: e.map((e) => /* @__PURE__ */ q(h, {
			"aria-label": e.label,
			title: e.label,
			size: "sm",
			variant: "ghost",
			className: "h-7 w-7 text-text-secondary",
			icon: e.icon,
			disabled: e.disabled,
			onClick: e.onClick,
			...e["data-testid"] ? { "data-testid": e["data-testid"] } : {}
		}, e.label))
	}) : /* @__PURE__ */ q("span", {
		...r,
		children: e
	});
}
function bn({ actions: e, title: t, testId: n }) {
	return !vn(e) || e.length < 2 ? /* @__PURE__ */ q(yn, { actions: e }) : /* @__PURE__ */ J(K, { children: [/* @__PURE__ */ q(yn, {
		actions: e,
		className: "flex shrink-0 items-center gap-0.5 @max-[15rem]:hidden",
		testId: `${n}-actions`
	}), /* @__PURE__ */ q("span", {
		className: "hidden shrink-0 items-center @max-[15rem]:flex",
		"data-testid": `${n}-actions-fold`,
		children: /* @__PURE__ */ q(j, {
			trigger: /* @__PURE__ */ q(g, { size: 14 }),
			triggerLabel: `${t} actions`,
			triggerTitle: `${t} actions`,
			triggerTestId: `${n}-actions-menu`,
			align: "end",
			"data-testid": `${n}-actions-panel`,
			sections: [{ items: e.map((e) => ({
				label: e.label,
				icon: e.icon,
				onSelect: e.onClick,
				...e.disabled ? { disabled: !0 } : {},
				...e["data-testid"] ? { "data-testid": `${e["data-testid"]}-item` } : {}
			})) }]
		})
	})] });
}
function xn(e, t) {
	return e.some((e) => t(e) || xn(e.children ?? [], t));
}
function Sn({ title: t, count: n, actions: r, groups: i, selectedId: a = null, currentStyle: o = "tint", "aria-label": s = "Navigation", className: c, "data-testid": l = "stacked-rail" }) {
	let u = W(null), [d, f] = G({}), [p, m] = G({}), [h, g] = G(null), _ = (e) => e.collapsible === !1 ? !0 : e.onToggle && e.open !== void 0 ? e.open : d[e.id] ?? e.open ?? !0, v = (e, t) => {
		e.onToggle?.(t), e.onToggle && e.open !== void 0 || f((n) => ({
			...n,
			[e.id]: t
		}));
	}, y = (e) => e.onToggle && e.open !== void 0 ? e.open : p[e.id] ?? e.open ?? !1, b = (e, t) => {
		e.onToggle?.(t), e.onToggle && e.open !== void 0 || m((n) => ({
			...n,
			[e.id]: t
		}));
	}, x = [];
	for (let e of i) {
		let t = e.collapsible !== !1, n = _(e);
		if (t && x.push({
			key: `g:${e.id}`,
			parentKey: null,
			hasChildren: !0,
			open: n,
			setOpen: (t) => v(e, t)
		}), !n) continue;
		let r = (e, t) => {
			for (let n of e) {
				let e = n.children ?? [], i = e.length > 0 && y(n);
				x.push({
					key: `r:${n.id}`,
					parentKey: t,
					hasChildren: e.length > 0,
					open: i,
					setOpen: (e) => b(n, e),
					row: n
				}), i && r(e, `r:${n.id}`);
			}
		};
		r(e.rows, t ? `g:${e.id}` : null);
	}
	let S = x.map((e) => e.key), C = (e) => !!e.current || a != null && e.id === a, w = x.find((e) => e.row && C(e.row))?.key, T = h && S.includes(h) ? h : w ?? S[0] ?? null, E = (e) => {
		if (!e) return;
		g(e);
		let t = typeof CSS < "u" && CSS.escape ? CSS.escape(e) : e.replace(/["\\]/g, "\\$&");
		u.current?.querySelector(`[data-rail-key="${t}"]`)?.focus();
	}, D = (e) => {
		let t = e.target, n = t.getAttribute("data-rail-key");
		if (!n) return;
		let r = S.indexOf(n), i = x[r];
		if (i) switch (e.key) {
			case "ArrowDown":
				e.preventDefault(), E(S[Math.min(r + 1, S.length - 1)]);
				return;
			case "ArrowUp":
				e.preventDefault(), E(S[Math.max(r - 1, 0)]);
				return;
			case "Home":
				e.preventDefault(), E(S[0]);
				return;
			case "End":
				e.preventDefault(), E(S[S.length - 1]);
				return;
			case "ArrowRight":
				e.preventDefault(), i.hasChildren && !i.open ? i.setOpen?.(!0) : i.hasChildren && E(S[r + 1]);
				return;
			case "ArrowLeft":
				e.preventDefault(), i.hasChildren && i.open ? i.setOpen?.(!1) : E(i.parentKey);
				return;
			case " ":
				t.tagName === "A" && (e.preventDefault(), t.click());
				return;
		}
	}, O = (t, n) => {
		let r = t.children ?? [], i = r.length > 0, a = i && y(t), s = C(t), c = `r:${t.id}`, u = t.testId ?? `${l}-row-${t.id}`, d = typeof t.menu == "function" ? t.menu(t) : t.menu, f = (e) => {
			if (t.disabled) {
				e?.preventDefault();
				return;
			}
			e && t.onNavigate?.(e), t.onSelect?.(), i && !t.href && !t.onSelect && b(t, !a);
		}, p = /* @__PURE__ */ J(K, { children: [
			(n > 0 || i) && /* @__PURE__ */ J(mn, {
				cancelGap: "-mr-2.5",
				children: [Array.from({ length: n }, (e, t) => /* @__PURE__ */ q("span", {
					className: "flex h-5 w-[18px] shrink-0 items-center justify-start text-text-secondary",
					"data-rail-step": "indent"
				}, t)), i && /* @__PURE__ */ q("span", {
					className: "flex h-5 w-[18px] shrink-0 items-center justify-start text-text-secondary",
					"data-rail-step": "caret",
					"data-testid": `${u}-caret`,
					onClick: (e) => {
						e.preventDefault(), e.stopPropagation(), b(t, !a);
					},
					children: /* @__PURE__ */ q(I, { open: a })
				})]
			}),
			t.icon != null && /* @__PURE__ */ q("span", {
				className: "flex shrink-0 items-center text-text-secondary",
				children: t.icon
			}),
			/* @__PURE__ */ q("span", {
				className: "min-w-0 flex-1 truncate",
				title: t.label,
				children: t.label
			}),
			t.meta !== void 0 && t.meta !== "" && /* @__PURE__ */ q("span", {
				className: e("shrink-0", "text-[12px] font-medium leading-4 tabular-nums text-text-tertiary"),
				"data-testid": `${u}-meta`,
				"data-meta-kind": typeof t.meta == "number" ? "count" : "text",
				...typeof t.meta == "number" ? { "aria-label": `${t.meta} items` } : {},
				children: t.meta
			}),
			t.trailing != null && t.trailing !== !1 && /* @__PURE__ */ q("span", {
				className: "flex h-5 shrink-0 items-center",
				"data-testid": `${u}-trailing`,
				children: t.trailing
			})
		] }), m = {
			className: e(un, s && dn, s && (o === "tint" ? "bg-primary/8" : "font-semibold"), t.disabled ? "cursor-default opacity-60 hover:bg-transparent" : "cursor-pointer", t.pending && "opacity-60"),
			"data-testid": u,
			"data-rail-key": c,
			"data-current": s || void 0,
			"data-depth": n,
			"data-pending": t.pending || void 0,
			"aria-current": s ? "page" : void 0,
			"aria-expanded": i ? a : void 0,
			"aria-busy": t.pending || void 0,
			"aria-disabled": t.disabled || void 0,
			title: t.disabled ? t.disabledReason : void 0,
			tabIndex: T === c ? 0 : -1,
			onFocus: () => g(c),
			..._n(t)
		};
		return /* @__PURE__ */ J("li", {
			className: "min-w-0",
			children: [/* @__PURE__ */ J("div", {
				className: "group/row flex min-w-0 items-center",
				children: [t.href && !t.disabled ? /* @__PURE__ */ q("a", {
					href: t.href,
					onClick: (e) => f(e),
					...m,
					children: p
				}) : /* @__PURE__ */ q("button", {
					type: "button",
					onClick: () => f(),
					...m,
					children: p
				}), d != null && d !== !1 && /* @__PURE__ */ q("span", {
					className: gn,
					"data-testid": `${u}-menu`,
					children: d
				})]
			}), a && /* @__PURE__ */ q("ul", {
				className: "m-0 flex list-none flex-col p-0",
				"data-testid": `${u}-children`,
				children: r.map((e) => O(e, n + 1))
			})]
		}, t.id);
	}, k = i.length > 0, A = `${l}-title`;
	return !k && !t ? null : /* @__PURE__ */ J("nav", {
		ref: u,
		"aria-label": s,
		className: e("flex min-w-0 flex-col", c),
		"data-testid": l,
		onKeyDown: D,
		children: [t && /* @__PURE__ */ J("div", {
			className: e("@container flex h-9 min-w-0 items-center gap-2", $),
			children: [
				/* @__PURE__ */ q(mn, {
					cancelGap: "-mr-2",
					children: /* @__PURE__ */ q("span", {
						className: "flex h-5 w-[18px] shrink-0 items-center justify-start text-text-secondary",
						"data-rail-step": "caption"
					})
				}),
				/* @__PURE__ */ q("span", {
					className: e("min-w-0 truncate", "text-[11px] font-semibold uppercase leading-4 tracking-wide", "text-text-secondary"),
					title: t,
					"data-testid": A,
					children: t
				}),
				typeof n == "number" && /* @__PURE__ */ q("span", {
					className: e("shrink-0", "text-[11px] font-medium leading-4 normal-case tracking-normal tabular-nums text-text-tertiary"),
					"aria-label": `${n} items`,
					"data-testid": `${l}-count`,
					children: n
				}),
				/* @__PURE__ */ q("span", { className: "flex-1" }),
				r != null && /* @__PURE__ */ q(bn, {
					actions: r,
					title: t,
					testId: l
				})
			]
		}), i.map((t) => {
			let n = t.collapsible !== !1, r = _(t), i = t.testId ?? `${l}-group-${t.id}`, a = `${i}-header`, o = `g:${t.id}`, s = /* @__PURE__ */ J(K, { children: [
				/* @__PURE__ */ q(mn, {
					cancelGap: "-mr-2",
					children: /* @__PURE__ */ q("span", {
						className: pn,
						"data-rail-step": n ? "caret" : "caption",
						"data-testid": `${a}-caret`,
						children: n && /* @__PURE__ */ q(I, { open: r })
					})
				}),
				/* @__PURE__ */ q("span", {
					className: "min-w-0 truncate",
					"data-testid": `${a}-label`,
					children: t.title
				}),
				typeof t.count == "number" && /* @__PURE__ */ q("span", {
					className: e("shrink-0", "text-[11px] font-medium leading-4 normal-case tracking-normal tabular-nums text-text-tertiary"),
					"aria-label": `${t.count} items`,
					"data-testid": `${i}-count`,
					children: t.count
				})
			] }), c = t.actions != null && t.actions !== !1 && !(Array.isArray(t.actions) && t.actions.length === 0), u = t.trailing != null && t.trailing !== !1, d = t.current ?? xn(t.rows, C), f = e("flex min-w-0 flex-1 items-center gap-2 bg-transparent text-left [font-family:inherit]", $, (c || u) && "pr-0", fn, L, oe);
			return /* @__PURE__ */ J("section", {
				"aria-labelledby": a,
				"aria-busy": t.pending || void 0,
				className: e("flex min-w-0 flex-col", t.pending && "opacity-60"),
				"data-testid": i,
				"data-group-id": t.id,
				"data-open": r,
				"data-pending": t.pending || void 0,
				children: [/* @__PURE__ */ J("div", {
					className: "group/head relative flex min-w-0 items-center gap-1 pr-1",
					"data-current": d || void 0,
					"data-testid": `${i}-head`,
					children: [
						n ? /* @__PURE__ */ q("button", {
							type: "button",
							id: a,
							"data-testid": a,
							title: t.title,
							"data-rail-key": o,
							"aria-expanded": r,
							tabIndex: T === o ? 0 : -1,
							onFocus: () => g(o),
							onClick: () => v(t, !r),
							className: e(f, "cursor-pointer hover:bg-surface-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"),
							..._n(t),
							children: s
						}) : /* @__PURE__ */ q("h3", {
							id: a,
							"data-testid": a,
							title: t.title,
							className: e("m-0", f),
							..._n(t),
							children: s
						}),
						u && /* @__PURE__ */ q("span", {
							className: "flex shrink-0 items-center",
							"data-testid": `${i}-trailing`,
							children: t.trailing
						}),
						c && /* @__PURE__ */ q(yn, {
							actions: t.actions,
							className: hn,
							testId: `${i}-actions`
						})
					]
				}), r && /* @__PURE__ */ q("ul", {
					className: "m-0 flex list-none flex-col p-0",
					"data-testid": `${i}-rows`,
					children: t.rows.length === 0 ? /* @__PURE__ */ q("li", {
						className: e("text-[13px] leading-5", $, fn, "text-text-tertiary"),
						"data-testid": `${i}-empty`,
						children: t.emptyLabel ?? "Nothing here yet."
					}) : t.rows.map((e) => O(e, 0))
				})]
			}, t.id);
		})]
	});
}
//#endregion
//#region src/components/shared/NavRail.tsx
var Cn = {
	narrow: "w-44",
	default: "w-56",
	wide: "w-64"
}, wn = {
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
function Tn(e, t) {
	return e.id ?? e.to ?? `item-${t}`;
}
function En(e, t, n) {
	return !t || !e.to ? !1 : t === e.to ? !0 : n === "exact" || e.to === "/" ? !1 : t.startsWith(e.to.endsWith("/") ? e.to : `${e.to}/`);
}
function Dn(e) {
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
function On({ item: t, active: n, palette: r, renderLink: i, size: a = "sm" }) {
	let o = /* @__PURE__ */ J(K, { children: [/* @__PURE__ */ J("span", {
		className: "flex items-center gap-2 min-w-0",
		children: [
			t.icon && /* @__PURE__ */ q("span", {
				className: "flex-none",
				"aria-hidden": "true",
				children: t.icon
			}),
			/* @__PURE__ */ q("span", {
				className: e("truncate", F, r.labelActive),
				children: t.label
			}),
			t.badge != null && /* @__PURE__ */ q("span", {
				className: e("ml-auto flex-none", "text-[12px] font-medium leading-4 tabular-nums text-text-tertiary", r.hint),
				"data-testid": "nav-rail-badge",
				children: t.badge
			})
		]
	}), t.hint && /* @__PURE__ */ q("span", {
		className: e("mt-0.5 block truncate text-[12px] leading-4", r.hint),
		children: t.hint
	})] }), s = e("block w-full border-l-[3px] border-transparent text-left no-underline", a === "md" ? "ml-[18px] w-auto mr-2 rounded-r pl-[15px] pr-2" : "px-3", R, r.hover, n && r.active, t.disabled && "pointer-events-none opacity-50");
	if (t.onClick || !t.to) return /* @__PURE__ */ q("button", {
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
	return i ? /* @__PURE__ */ q(K, { children: i(t, c) }) : /* @__PURE__ */ q("a", { ...c });
}
function kn({ name: t, items: n, activeHref: r, match: i, palette: a, storageKey: o, renderLink: s, size: c = "sm", divided: l = !1 }) {
	let [u, d] = G(() => {
		if (!o || typeof window > "u") return !1;
		try {
			return window.localStorage?.getItem(o) === "1";
		} catch {
			return !1;
		}
	});
	V(() => {
		if (!(!o || typeof window > "u")) try {
			u ? window.localStorage?.setItem(o, "1") : window.localStorage?.removeItem(o);
		} catch {}
	}, [u, o]);
	let f = H(), p = W(null), m = W(null), h = B(() => {
		if (!u) {
			let e = typeof document > "u" ? null : document.activeElement;
			e && m.current?.contains(e) && p.current?.focus();
		}
		d((e) => !e);
	}, [u]);
	return /* @__PURE__ */ J("section", {
		className: e(c === "md" && "pb-1"),
		children: [
			l && /* @__PURE__ */ q("div", {
				"aria-hidden": "true",
				className: e("mx-5 mb-2 mt-1 border-t", a.divider)
			}),
			/* @__PURE__ */ J("button", {
				ref: p,
				type: "button",
				onClick: h,
				"aria-expanded": !u,
				"aria-controls": f,
				className: e("flex w-full cursor-pointer items-center gap-1.5 border-none bg-transparent text-left", L, se, c === "md" ? "px-3.5" : "px-2", a.group),
				children: [/* @__PURE__ */ q("span", {
					"aria-hidden": "true",
					className: "grid h-5 w-5 shrink-0 place-items-center",
					children: /* @__PURE__ */ q(I, { open: !u })
				}), /* @__PURE__ */ q("span", {
					className: "flex-1 truncate",
					children: t
				})]
			}),
			!u && /* @__PURE__ */ q("div", {
				id: f,
				ref: m,
				children: n.map((e, t) => /* @__PURE__ */ q(On, {
					item: e,
					active: En(e, r, i),
					palette: a,
					renderLink: s,
					size: c
				}, Tn(e, t)))
			})
		]
	});
}
function An({ title: t, items: n, activeHref: r, match: i = "prefix", titleAction: a, header: o, footer: s, width: c = "default", storageKey: l, renderLink: u, tone: d = "surface", size: f = "sm", "aria-label": p, className: m, "data-testid": h }) {
	let g = wn[d], _ = U(() => Dn(n), [n]);
	return /* @__PURE__ */ J("nav", {
		"aria-label": p ?? (typeof t == "string" ? t : void 0) ?? "Navigation",
		"data-testid": h,
		className: e("flex flex-none flex-col overflow-hidden border-r", Cn[c], g.rail, m),
		children: [
			(t != null || a) && /* @__PURE__ */ J("div", {
				className: e("flex flex-none items-center justify-between gap-2", f === "md" ? "h-12 pl-5 pr-3" : "border-b px-3 py-2.5", g.divider),
				children: [/* @__PURE__ */ q("span", {
					className: e("truncate text-[11px] font-semibold uppercase tracking-[0.05em]", g.title),
					children: t
				}), a]
			}),
			o && /* @__PURE__ */ q("div", {
				className: e("flex-none border-b px-2 py-2", g.divider),
				children: o
			}),
			/* @__PURE__ */ q("div", {
				className: "min-h-0 flex-1 overflow-y-auto py-1",
				children: _.map((e, t) => e.name === null ? /* @__PURE__ */ q("div", { children: e.items.map((e, t) => /* @__PURE__ */ q(On, {
					item: e,
					active: En(e, r, i),
					palette: g,
					renderLink: u,
					size: f
				}, Tn(e, t))) }, "__ungrouped") : /* @__PURE__ */ q(kn, {
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
			s && /* @__PURE__ */ q("div", {
				className: e("flex-none border-t px-2 py-2", g.divider),
				children: s
			})
		]
	});
}
function jn({ rails: t, activeHref: n, renderLink: r, tone: i, storageKey: a, children: o, className: s, "data-testid": c }) {
	return /* @__PURE__ */ J("div", {
		"data-testid": c,
		className: e("flex h-full min-h-0 w-full", s),
		children: [t.map(({ id: e, ...t }) => /* @__PURE__ */ q(An, {
			...t,
			activeHref: t.activeHref ?? n,
			renderLink: t.renderLink ?? r,
			tone: t.tone ?? i,
			storageKey: a ? `${a}.${e}` : void 0
		}, e)), /* @__PURE__ */ q("div", {
			className: "flex min-h-0 min-w-0 flex-1 flex-col",
			children: o
		})]
	});
}
//#endregion
//#region src/components/shared/WorkArea.tsx
var Mn = {
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
function Nn({ breadcrumbs: t, toolbar: n, children: r, status: i, padded: a = !0, tone: o = "surface", className: s, bodyClassName: c, "data-testid": l }) {
	let u = Mn[o];
	return /* @__PURE__ */ J("div", {
		"data-testid": l,
		className: e("flex h-full min-h-0 min-w-0 flex-1 flex-col", u.column, s),
		children: [
			t && /* @__PURE__ */ q("div", {
				className: e("flex flex-none items-center overflow-x-auto border-b px-3 py-1.5", u.divider),
				children: t
			}),
			n,
			/* @__PURE__ */ q("div", {
				className: e("min-h-0 flex-1 overflow-auto", a && "p-6", c),
				children: r
			}),
			i && /* @__PURE__ */ q("div", {
				className: e("flex flex-none items-center gap-3 border-t px-3 py-1 text-[11px]", u.divider, u.status),
				children: i
			})
		]
	});
}
//#endregion
//#region src/components/shared/InlineMenu.tsx
var Pn = {
	"bottom-start": "top-full left-0 mt-1",
	"bottom-end": "top-full right-0 mt-1",
	"top-start": "bottom-full left-0 mb-1",
	"top-end": "bottom-full right-0 mb-1"
};
function Fn({ open: t, onClose: n, placement: r = "bottom-start", trigger: i, role: a = "group", className: o, "data-testid": s = "inline-menu", "aria-label": c, "aria-labelledby": l, children: u }) {
	let d = W(null), p = f(t);
	return V(() => {
		if (!t) return;
		let e = (e) => {
			e.key === "Escape" && p() && (e.stopPropagation(), n());
		};
		return window.addEventListener("keydown", e), () => window.removeEventListener("keydown", e);
	}, [
		t,
		n,
		p
	]), V(() => {
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
	]), t ? /* @__PURE__ */ q("div", {
		ref: d,
		role: a,
		"aria-label": c,
		"aria-labelledby": l,
		"data-testid": s,
		"data-placement": r,
		className: e("absolute z-20 min-w-[160px] rounded-lg border border-border bg-surface", "shadow-lg p-1 text-sm text-text-primary", Pn[r], o),
		children: u
	}) : null;
}
//#endregion
//#region src/components/pipelines/nodes/NodeCard.tsx
var In = {
	success: "border-success",
	error: "border-danger",
	warning: "border-warning",
	info: "border-info",
	neutral: "border-border-emphasis",
	pending: "border-accent"
};
function Ln({ icon: t, label: n, subtitle: i, status: a = "neutral", statusLabel: o, body: s, selected: c = !1, accentClass: l, className: u, onClick: d }) {
	let f = o ?? a.charAt(0).toUpperCase() + a.slice(1), p = In[a];
	return /* @__PURE__ */ J(r, {
		className: e("relative w-40 transition-shadow duration-200 border-2", d && "cursor-pointer", p, c && "shadow-[0_0_0_3px_rgba(99,102,241,0.25)]", !c && "shadow-sm", !c && d && "hover:shadow-md", u),
		onClick: d,
		children: [
			l && /* @__PURE__ */ q("div", { className: e("absolute left-0 top-0 bottom-0 w-1 rounded-l-lg", l) }),
			/* @__PURE__ */ J("div", {
				className: e("flex items-center justify-between gap-2 px-2.5 py-2 border-b border-border-subtle", l && "pl-3.5"),
				children: [/* @__PURE__ */ J("div", {
					className: "flex items-center gap-1.5 min-w-0",
					children: [/* @__PURE__ */ q("span", {
						className: "text-sm leading-none shrink-0",
						"aria-hidden": "true",
						children: t
					}), /* @__PURE__ */ q("span", {
						className: "text-xs font-semibold text-text-primary truncate",
						children: n
					})]
				}), /* @__PURE__ */ q(T, {
					state: a,
					label: f,
					size: "sm"
				})]
			}),
			i && /* @__PURE__ */ q("div", {
				className: "px-2.5 pt-1.5 pb-0 text-[11px] text-neutral truncate",
				children: i
			}),
			s && /* @__PURE__ */ q("div", {
				className: "px-2.5 pb-2 pt-1 text-xs text-text-secondary",
				children: s
			})
		]
	});
}
//#endregion
//#region src/components/shared/BoardColumn.tsx
function Rn({ label: t, count: n, children: r, emptyLabel: i = "Nothing here", action: a, className: o, "data-testid": s }) {
	let c = r == null || r === !1 || Array.isArray(r) && r.length === 0;
	return /* @__PURE__ */ J("section", {
		className: e("flex flex-col gap-1.5 min-w-0", o),
		"data-testid": s,
		children: [/* @__PURE__ */ J("header", {
			className: "flex items-baseline justify-between gap-2 text-[11px] uppercase tracking-[0.04em] text-text-tertiary",
			children: [/* @__PURE__ */ q("span", {
				className: "truncate",
				children: t
			}), a ?? (n === void 0 ? null : /* @__PURE__ */ q("span", {
				className: "tabular-nums",
				children: n
			}))]
		}), c ? /* @__PURE__ */ q(ce, { children: i }) : /* @__PURE__ */ q("div", {
			className: "flex flex-col gap-1.5",
			children: r
		})]
	});
}
//#endregion
//#region src/components/shared/FormRow.tsx
var zn = {
	sm: "gap-2",
	md: "gap-3",
	lg: "gap-4"
}, Bn = {
	sm: "flex-col sm:flex-row",
	md: "flex-col md:flex-row"
};
function Vn({ children: t, stackBelow: n = "sm", gap: r = "md", className: i, "data-testid": a }) {
	return /* @__PURE__ */ q("div", {
		className: e("flex items-start", Bn[n], zn[r], i),
		"data-testid": a,
		children: ue.map(t, (e) => fe(e) ? /* @__PURE__ */ q("div", {
			className: "flex-1 basis-0 min-w-0",
			children: e
		}) : e)
	});
}
//#endregion
//#region src/components/shared/DetailHeader.tsx
function Hn({ title: t, badge: n, description: r, meta: i, aside: a, asideWidth: o = 260, as: s = "h2", className: c, "data-testid": l }) {
	return /* @__PURE__ */ J("div", {
		className: e("flex flex-wrap items-start justify-between gap-3", c),
		"data-testid": l,
		children: [/* @__PURE__ */ J("div", {
			className: "flex flex-col gap-1.5 min-w-0 flex-1",
			children: [
				/* @__PURE__ */ J("div", {
					className: "flex flex-wrap items-center gap-2",
					children: [/* @__PURE__ */ q(s, {
						className: e("m-0", s === "h2" ? "text-[18px]" : "text-[15px]"),
						children: t
					}), n]
				}),
				r ? /* @__PURE__ */ q("p", {
					className: "m-0 max-w-[72ch] text-[13px] text-text-secondary",
					children: r
				}) : null,
				i
			]
		}), a ? /* @__PURE__ */ q("aside", {
			className: "flex flex-col gap-2 shrink-0",
			style: { width: o },
			children: a
		}) : null]
	});
}
//#endregion
//#region src/components/shared/ReviewThread.tsx
var Un = {
	problem: "problem statement",
	analysis: "analysis",
	option: "options",
	question: "question",
	answer: "answer",
	artifact: "artifact",
	revision: "revision",
	decision: "decision"
}, Wn = {
	problem: "info",
	analysis: "neutral",
	option: "info",
	question: "warning",
	answer: "success",
	artifact: "purple",
	revision: "info",
	decision: "accent"
};
function Gn({ name: e, type: t, url: n }) {
	return /* @__PURE__ */ J("div", {
		className: "flex items-center gap-3 rounded-md border border-dashed border-border bg-surface-hover/40 px-3 py-2.5",
		children: [
			/* @__PURE__ */ q("span", {
				className: "text-lg",
				role: "img",
				"aria-label": "artifact",
				children: "🖼️"
			}),
			/* @__PURE__ */ J("div", {
				className: "min-w-0",
				children: [/* @__PURE__ */ q("div", {
					className: "truncate text-xs font-medium text-text-primary",
					children: e
				}), t && /* @__PURE__ */ q("div", {
					className: "text-[10.5px] text-text-tertiary",
					children: t
				})]
			}),
			/* @__PURE__ */ q("div", { className: "flex-1" }),
			n ? /* @__PURE__ */ q("a", {
				href: n,
				target: "_blank",
				rel: "noreferrer",
				className: "text-[11px] text-primary no-underline hover:underline",
				children: "open →"
			}) : /* @__PURE__ */ q("span", {
				className: "text-[10.5px] text-text-tertiary",
				children: "stored with the run"
			})
		]
	});
}
function Kn({ post: t, labels: r, tones: i, onAnswer: a, busy: o, placeholder: s, submitLabel: c }) {
	let [l, u] = G(""), d = t.kind === "question" && !t.resolved;
	return /* @__PURE__ */ J("div", {
		className: e("border-b border-border px-4 py-3 last:border-b-0", d && "bg-warning-bg/20"),
		children: [
			/* @__PURE__ */ J("div", {
				className: "flex min-w-0 items-center gap-2",
				children: [
					t.authorKind === "human" ? /* @__PURE__ */ q(N, {
						name: t.authorName,
						size: 20
					}) : /* @__PURE__ */ q("span", {
						className: "text-[13px]",
						role: "img",
						"aria-label": "agent",
						children: "🤖"
					}),
					/* @__PURE__ */ q("span", {
						className: "truncate text-xs font-semibold text-text-primary",
						children: t.authorName
					}),
					/* @__PURE__ */ q(m, {
						tone: i[t.kind] ?? "neutral",
						size: "xs",
						uppercase: !0,
						children: r[t.kind] ?? t.kind
					}),
					d && /* @__PURE__ */ q(m, {
						tone: "warning",
						size: "xs",
						dot: "pulse",
						children: "needs a human"
					}),
					t.kind === "question" && t.resolved && /* @__PURE__ */ q(m, {
						tone: "success",
						size: "xs",
						children: "resolved"
					}),
					/* @__PURE__ */ q("div", { className: "flex-1" }),
					t.timeLabel && /* @__PURE__ */ q("span", {
						className: "whitespace-nowrap text-[11px] text-text-tertiary",
						children: t.timeLabel
					})
				]
			}),
			/* @__PURE__ */ q("div", {
				className: "mt-1.5 whitespace-pre-wrap pl-7 text-xs leading-relaxed text-text-secondary",
				children: t.body
			}),
			t.artifact && /* @__PURE__ */ q("div", {
				className: "mt-2 ml-7",
				children: /* @__PURE__ */ q(Gn, {
					name: t.artifact.name,
					type: t.artifact.type,
					url: t.artifact.url
				})
			}),
			d && a && /* @__PURE__ */ J("div", {
				className: "mt-2.5 ml-7 flex flex-col gap-2",
				children: [/* @__PURE__ */ q(M, {
					value: l,
					onChange: (e) => u(e.target.value),
					placeholder: s,
					rows: 2,
					"aria-label": "Answer this question"
				}), /* @__PURE__ */ q("div", { children: /* @__PURE__ */ q(n, {
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
function qn({ posts: t, onAnswer: n, answerBusy: r = !1, answerPlaceholder: i = "Answer the agent — your answer resolves the question and the loop continues.", answerLabel: a = "Answer & continue the loop", kindLabels: o, kindTones: s, emptyLabel: c = "No posts yet — an agent opens the thread by restating the problem.", className: l, "data-testid": u }) {
	let d = {
		...Un,
		...o
	}, f = {
		...Wn,
		...s
	};
	return /* @__PURE__ */ q("div", {
		className: e("overflow-hidden rounded-lg border border-border bg-surface", l),
		...u ? { "data-testid": u } : {},
		children: t.length === 0 ? /* @__PURE__ */ q("div", {
			className: "px-4 py-8 text-center text-xs text-text-tertiary",
			children: c
		}) : t.map((e) => /* @__PURE__ */ q(Kn, {
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
var Jn = {
	sm: "lg:w-[260px]",
	md: "lg:w-[300px]",
	lg: "lg:w-[340px]"
};
function Yn({ children: t, rail: n, railWidth: r = "md", className: i, "data-testid": a }) {
	return /* @__PURE__ */ J("div", {
		className: e("flex flex-col gap-4 lg:flex-row lg:items-start", i),
		...a ? { "data-testid": a } : {},
		children: [/* @__PURE__ */ q("div", {
			className: "min-w-0 flex-1",
			children: t
		}), /* @__PURE__ */ q("aside", {
			className: e("w-full shrink-0 lg:sticky lg:top-4", Jn[r]),
			children: /* @__PURE__ */ q("div", {
				className: "overflow-hidden rounded-lg border border-border bg-surface",
				children: n
			})
		})]
	});
}
function Xn({ title: t, children: n, className: r }) {
	return /* @__PURE__ */ J("section", {
		className: e("border-b border-border px-3.5 py-3 last:border-b-0", r),
		children: [/* @__PURE__ */ q("h3", {
			className: e("mb-2", L, oe),
			"data-testid": "rail-section-title",
			children: t
		}), /* @__PURE__ */ q("div", {
			className: "flex flex-col gap-2 text-xs text-text-secondary",
			children: n
		})]
	});
}
//#endregion
//#region src/components/shared/SignoffPanel.tsx
function Zn({ signoffs: t, required: n = 2, actions: r, emptyHint: i, className: a, "data-testid": o }) {
	let s = t.filter((e) => e.decision === "approve").length, c = i ?? `none yet — ${n} approvals ratify the decision`;
	return /* @__PURE__ */ J("div", {
		className: e("flex flex-wrap items-center gap-3 rounded-lg border border-border bg-surface px-4 py-3", a),
		...o ? { "data-testid": o } : {},
		children: [
			/* @__PURE__ */ q("span", {
				className: "text-xs font-semibold text-text-primary",
				children: "Sign-offs"
			}),
			t.length === 0 ? /* @__PURE__ */ q("span", {
				className: "text-xs text-text-tertiary",
				children: c
			}) : /* @__PURE__ */ J(K, { children: [t.map((e) => /* @__PURE__ */ J("span", {
				className: "flex items-center gap-1.5",
				title: e.role ? `${e.name} · ${e.role}` : e.name,
				children: [
					/* @__PURE__ */ q(N, {
						name: e.name,
						size: 18
					}),
					/* @__PURE__ */ q("span", {
						className: "text-xs text-text-secondary",
						children: e.name
					}),
					/* @__PURE__ */ q(m, {
						tone: e.decision === "approve" ? "success" : "danger",
						size: "xs",
						children: e.decision === "approve" ? "✓" : "✕"
					})
				]
			}, e.name)), /* @__PURE__ */ J("span", {
				className: "text-[11px] text-text-tertiary",
				children: [
					s,
					"/",
					n,
					" approvals"
				]
			})] }),
			/* @__PURE__ */ q("div", { className: "flex-1" }),
			r
		]
	});
}
//#endregion
//#region src/components/shared/StatStrip.tsx
var Qn = {
	default: "text-text-primary",
	accent: "text-primary",
	danger: "text-danger"
};
function $n({ progress: e, label: t }) {
	return !e || !(e.max > 0) || !Number.isFinite(e.value) ? null : /* @__PURE__ */ q(P, {
		value: e.value,
		max: e.max,
		size: "sm",
		"aria-label": t,
		className: "mt-2 max-w-[20rem]",
		"data-testid": "stat-strip-progress"
	});
}
function er({ item: t, first: n, last: r }) {
	return /* @__PURE__ */ J("div", {
		className: e("min-w-0 py-3", n ? "pl-0 pr-6" : "px-6", r && !n && "pr-0"),
		"data-testid": "stat-strip-cluster",
		children: [
			/* @__PURE__ */ J("div", {
				className: "flex min-w-0 items-baseline gap-1.5 whitespace-nowrap",
				children: [/* @__PURE__ */ q("span", {
					className: e("text-[17px] font-bold leading-6 tabular-nums", Qn[t.tone ?? "default"]),
					children: t.value
				}), /* @__PURE__ */ q("span", {
					className: "min-w-0 truncate text-[15px] leading-6 text-text-secondary",
					children: t.label
				})]
			}),
			/* @__PURE__ */ q($n, {
				progress: t.progress,
				label: t.label
			}),
			t.hint != null && /* @__PURE__ */ q("div", {
				className: "mt-0.5 truncate text-[12px] text-text-tertiary",
				children: t.hint
			})
		]
	});
}
function tr({ item: t, sm: n = !1 }) {
	let r = t.progress && t.progress.max > 0 && Number.isFinite(t.progress.value);
	return /* @__PURE__ */ J("span", {
		className: "flex min-w-0 items-center whitespace-nowrap",
		"data-testid": "stat-strip-cluster",
		children: [/* @__PURE__ */ J("span", {
			className: "flex min-w-0 items-baseline gap-1.5",
			children: [/* @__PURE__ */ q("span", {
				className: e("font-semibold tabular-nums", n ? "text-sm leading-5" : "text-[16px] leading-6", Qn[t.tone ?? "default"]),
				children: t.value
			}), /* @__PURE__ */ q("span", {
				className: e("min-w-0 truncate text-text-secondary", n ? "text-sm leading-5" : "text-[15px] leading-6"),
				children: t.label
			})]
		}), t.track == null ? r && /* @__PURE__ */ q(P, {
			value: t.progress.value,
			max: t.progress.max,
			size: "sm",
			"aria-label": t.label,
			className: "ml-[18px] w-[150px] shrink-0",
			"data-testid": "stat-strip-progress"
		}) : /* @__PURE__ */ q("span", {
			className: "ml-[18px] flex shrink-0 items-center",
			"data-testid": "stat-strip-track",
			children: t.track
		})]
	});
}
function nr({ item: t, flush: n }) {
	return /* @__PURE__ */ J("div", {
		className: e("min-w-0 px-4 py-2.5", (n === "start" || n === "both") && "pl-0", (n === "end" || n === "both") && "pr-0"),
		children: [
			/* @__PURE__ */ q("div", {
				className: "whitespace-nowrap text-[10px] font-semibold uppercase tracking-wide text-text-tertiary",
				children: t.label
			}),
			/* @__PURE__ */ J("div", {
				className: "mt-0.5 flex min-w-0 items-baseline gap-2",
				children: [/* @__PURE__ */ q("span", {
					className: e("text-[17px] font-bold leading-none tabular-nums", Qn[t.tone ?? "default"]),
					children: t.value
				}), t.hint != null && /* @__PURE__ */ q("span", {
					className: "min-w-0 truncate text-[11px] text-text-tertiary",
					children: t.hint
				})]
			}),
			t.status && /* @__PURE__ */ J("div", {
				className: "mt-1 flex min-w-0 items-center gap-1.5 text-[12px]",
				"data-testid": "stat-strip-status",
				children: [/* @__PURE__ */ q("span", {
					"aria-hidden": "true",
					className: e("inline-block h-2 w-2 shrink-0 rounded-full", c[t.status.tone ?? "neutral"])
				}), /* @__PURE__ */ q("span", {
					className: e("min-w-0 truncate", t.status.tone && t.status.tone !== "neutral" ? d[t.status.tone] : "text-text-secondary"),
					children: t.status.label
				})]
			}),
			/* @__PURE__ */ q($n, {
				progress: t.progress,
				label: t.label
			})
		]
	});
}
function rr({ connector: t }) {
	let n = t?.tone;
	return /* @__PURE__ */ J("div", {
		className: e("flex shrink-0 flex-col items-center justify-center gap-1 self-center px-1", n ? d[n] : "text-text-tertiary"),
		"data-testid": "stat-strip-connector",
		children: [/* @__PURE__ */ J("svg", {
			"aria-hidden": "true",
			width: "56",
			height: "8",
			viewBox: "0 0 56 8",
			className: "block",
			children: [/* @__PURE__ */ q("line", {
				x1: "0",
				y1: "4",
				x2: "50",
				y2: "4",
				stroke: "currentColor",
				strokeWidth: "1.25"
			}), /* @__PURE__ */ q("path", {
				d: "M49 0.5 L55 4 L49 7.5 Z",
				fill: "currentColor"
			})]
		}), t?.label && /* @__PURE__ */ q("span", {
			className: "whitespace-nowrap text-[11px] leading-none",
			children: t.label
		})]
	});
}
function ir({ items: t, frameless: n = !1, connectors: r, variant: a = "default", size: o, className: s, "aria-label": c, "data-testid": l }) {
	let u = i("StatStrip", o, {
		comfortable: "md",
		compact: "sm"
	}), d = !!r && r.length > 0;
	return a === "line" ? /* @__PURE__ */ q("div", {
		role: "group",
		"data-variant": "line",
		...u === "sm" ? { "data-size": "sm" } : {},
		className: e("flex min-w-0 flex-wrap items-center gap-y-1", s),
		...c ? { "aria-label": c } : {},
		...l ? { "data-testid": l } : {},
		children: t.map((t, n) => {
			let r = t.title ? { title: t.title } : {}, i = /* @__PURE__ */ q(tr, {
				item: t,
				sm: u === "sm"
			}), a;
			return a = t.href ? /* @__PURE__ */ q("a", {
				href: t.href,
				className: "min-w-0 rounded no-underline hover:underline",
				...r,
				children: i
			}) : t.onSelect ? /* @__PURE__ */ q("button", {
				type: "button",
				onClick: t.onSelect,
				className: "min-w-0 cursor-pointer rounded border-none bg-transparent p-0 text-left hover:underline",
				...r,
				children: i
			}) : /* @__PURE__ */ q("span", {
				className: "min-w-0",
				...r,
				children: i
			}), /* @__PURE__ */ J(z, { children: [n > 0 && /* @__PURE__ */ q("span", {
				"aria-hidden": "true",
				className: e("mx-5 text-text-secondary", u === "sm" ? "text-sm leading-5" : "text-[15px] leading-6"),
				"data-testid": "stat-strip-separator",
				children: "•"
			}), a] }, t.label);
		})
	}) : a === "inline" ? /* @__PURE__ */ q("div", {
		role: "group",
		"data-variant": "inline",
		className: e("flex items-center divide-x divide-border overflow-x-auto border-b border-border pb-1", s),
		...c ? { "aria-label": c } : {},
		...l ? { "data-testid": l } : {},
		children: t.map((e, n) => {
			let r = e.title ? { title: e.title } : {}, i = /* @__PURE__ */ q(er, {
				item: e,
				first: n === 0,
				last: n === t.length - 1
			});
			return e.href ? /* @__PURE__ */ q("a", {
				href: e.href,
				className: "min-w-0 flex-1 no-underline hover:bg-surface-hover",
				...r,
				children: i
			}, e.label) : e.onSelect ? /* @__PURE__ */ q("button", {
				type: "button",
				onClick: e.onSelect,
				className: "min-w-0 flex-1 cursor-pointer border-none bg-transparent p-0 text-left hover:bg-surface-hover",
				...r,
				children: i
			}, e.label) : /* @__PURE__ */ q("div", {
				className: "min-w-0 flex-1",
				...r,
				children: i
			}, e.label);
		})
	}) : /* @__PURE__ */ q("div", {
		role: "group",
		className: e("flex overflow-x-auto", d ? "items-stretch" : "divide-x divide-border", !n && "rounded-lg border border-border bg-surface", s),
		...c ? { "aria-label": c } : {},
		...l ? { "data-testid": l } : {},
		children: t.map((e, i) => {
			let a = n ? t.length === 1 ? "both" : i === 0 ? "start" : i === t.length - 1 ? "end" : void 0 : void 0, o = e.title ? { title: e.title } : {}, s;
			return s = e.href ? /* @__PURE__ */ q("a", {
				href: e.href,
				className: "min-w-0 flex-1 no-underline transition-colors hover:bg-surface-hover",
				...o,
				children: /* @__PURE__ */ q(nr, {
					item: e,
					flush: a
				})
			}) : e.onSelect ? /* @__PURE__ */ q("button", {
				type: "button",
				onClick: e.onSelect,
				className: "min-w-0 flex-1 cursor-pointer border-none bg-transparent p-0 text-left transition-colors hover:bg-surface-hover",
				...o,
				children: /* @__PURE__ */ q(nr, {
					item: e,
					flush: a
				})
			}) : /* @__PURE__ */ q("div", {
				className: "min-w-0 flex-1",
				...o,
				children: /* @__PURE__ */ q(nr, {
					item: e,
					flush: a
				})
			}), /* @__PURE__ */ J(z, { children: [s, d && i < t.length - 1 && /* @__PURE__ */ q(rr, { connector: r[i] })] }, e.label);
		})
	});
}
//#endregion
//#region src/components/shared/KeyValue.tsx
function ar({ items: t, layout: n = "row", labelWidth: r = "w-28", divided: i = !1, className: a, "aria-label": o, "data-testid": s = "key-value" }) {
	if (t.length === 0) return null;
	let c = n === "row", l = c && i;
	return /* @__PURE__ */ q("dl", {
		className: e("m-0 min-w-0", n === "grid" ? "grid grid-cols-2 gap-x-6 gap-y-3" : l ? "flex flex-col border-t border-border" : c ? "flex flex-col gap-1.5" : "flex flex-col gap-3", a),
		"data-layout": n,
		"data-divided": l || void 0,
		"data-testid": s,
		...o ? { "aria-label": o } : {},
		children: t.map((t, n) => /* @__PURE__ */ J("div", {
			className: e("min-w-0", l ? "flex min-h-[38px] items-center gap-3 border-b border-border px-2.5 py-1.5" : c ? "flex items-baseline gap-3" : "flex flex-col gap-0.5"),
			"data-testid": `${s}-item`,
			children: [
				/* @__PURE__ */ q("dt", {
					className: e("m-0", l ? e("shrink-0 text-[15px] text-text-primary", r) : "text-text-secondary", !l && (c ? e("shrink-0 text-[13px]", r) : "text-[12px]")),
					children: t.label
				}),
				/* @__PURE__ */ q("dd", {
					className: e("m-0 min-w-0 truncate", l ? "text-sm" : "text-[13px]", t.muted ? "text-text-tertiary" : "text-text-primary", c && "flex-1", t.mono && "font-mono text-[12px]"),
					...t.title ? { title: t.title } : {},
					children: t.value
				}),
				c && t.action != null && t.action !== !1 && /* @__PURE__ */ q("dd", {
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
function or({ person: t, children: n, actions: r, details: i, interactiveChild: a = !1, openDelay: o = 450, closeDelay: s = 250, className: c, "data-testid": l = "person-hover-card" }) {
	let u = W(null), [d, f] = G(!1), p = W(null), m = B(() => {
		p.current &&= (clearTimeout(p.current), null);
	}, []);
	V(() => m, [m]);
	let h = B(() => {
		m(), p.current = setTimeout(() => f(!0), o);
	}, [m, o]), g = B(() => {
		m(), p.current = setTimeout(() => f(!1), s);
	}, [m, s]);
	return /* @__PURE__ */ J(K, { children: [/* @__PURE__ */ q("span", {
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
	}), /* @__PURE__ */ q(A, {
		trigger: u,
		open: d,
		onClose: () => {
			m(), f(!1);
		},
		placement: "bottom-start",
		"aria-label": `About ${t.displayName}`,
		"data-testid": l,
		children: /* @__PURE__ */ J("div", {
			className: "w-72 p-3",
			onMouseEnter: m,
			onMouseLeave: g,
			children: [
				/* @__PURE__ */ J("div", {
					className: "flex items-start gap-3",
					children: [/* @__PURE__ */ q(N, {
						name: t.displayName,
						src: t.avatarUrl,
						color: t.color,
						size: 40
					}), /* @__PURE__ */ J("div", {
						className: "min-w-0 flex-1",
						children: [
							/* @__PURE__ */ J("div", {
								className: "flex items-center gap-1.5",
								children: [/* @__PURE__ */ q("span", {
									className: "truncate text-sm font-semibold text-text-primary",
									children: t.displayName
								}), t.online !== void 0 && /* @__PURE__ */ q(te, { state: t.online ? "online" : "offline" })]
							}),
							t.title && /* @__PURE__ */ q("div", {
								className: "truncate text-xs text-text-secondary",
								children: t.title
							}),
							t.department && /* @__PURE__ */ q("div", {
								className: "truncate text-xs text-text-tertiary",
								children: t.department
							})
						]
					})]
				}),
				t.statusText && /* @__PURE__ */ q("div", {
					className: "mt-2 truncate text-xs italic text-text-secondary",
					children: t.statusText
				}),
				(t.email || t.localTime) && /* @__PURE__ */ J("div", {
					className: "mt-2 space-y-0.5 border-t border-border pt-2",
					children: [t.email && /* @__PURE__ */ q("div", {
						className: "truncate text-xs text-text-secondary",
						children: t.email
					}), t.localTime && /* @__PURE__ */ J("div", {
						className: "text-xs text-text-tertiary",
						children: [t.localTime, " local time"]
					})]
				}),
				i && /* @__PURE__ */ q("div", {
					className: "mt-2 border-t border-border pt-2",
					children: i
				}),
				r && /* @__PURE__ */ q("div", {
					className: "mt-3 flex items-center gap-2",
					children: r
				})
			]
		})
	})] });
}
//#endregion
//#region src/components/shared/MasterDetail.tsx
function sr(e) {
	if (!e || typeof window > "u") return !1;
	try {
		return window.localStorage.getItem(e) === "compact";
	} catch {
		return !1;
	}
}
function cr(e, t) {
	if (!(!e || typeof window > "u")) try {
		window.localStorage.setItem(e, t ? "compact" : "expanded");
	} catch {}
}
function lr({ direction: t }) {
	return /* @__PURE__ */ q("svg", {
		className: e("h-4 w-4", t === "right" && "rotate-180"),
		viewBox: "0 0 16 16",
		fill: "none",
		"aria-hidden": "true",
		children: /* @__PURE__ */ q("path", {
			d: "M10 3L5 8l5 5",
			stroke: "currentColor",
			strokeWidth: "1.5",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		})
	});
}
function ur({ index: t, selected: n }) {
	return /* @__PURE__ */ q("span", {
		className: e("flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-semibold", n ? "bg-primary text-on-primary" : "bg-surface-inset text-text-tertiary"),
		children: t + 1
	});
}
function dr({ items: t, keyOf: n, selectedKey: r, onSelect: i, renderRow: a, renderCompactRow: o, renderDetail: s, railTitle: c, railWidth: l = 340, compactWidth: u = 72, storageKey: d, emptyDetail: f, paneFooter: p, className: m, "data-testid": h = "master-detail" }) {
	let [g, _] = G(() => sr(d)), v = B(() => {
		_((e) => {
			let t = !e;
			return cr(d, t), t;
		});
	}, [d]), y = U(() => t.findIndex((e) => n(e) === r), [
		t,
		n,
		r
	]), b = y >= 0 ? t[y] : null, x = (e) => {
		if (e.key !== "ArrowDown" && e.key !== "ArrowUp" || t.length === 0) return;
		e.preventDefault();
		let r = e.key === "ArrowDown" ? 1 : -1;
		i(n(t[((y >= 0 ? y : r > 0 ? -1 : 0) + r + t.length) % t.length]));
	}, S = b ? s(b, y) : f;
	return /* @__PURE__ */ J("div", {
		className: e("flex overflow-hidden rounded-lg border border-border bg-surface", m),
		"data-testid": h,
		children: [/* @__PURE__ */ J("nav", {
			className: "flex flex-shrink-0 flex-col overflow-y-auto border-r border-border",
			style: { width: g ? u : l },
			onKeyDown: x,
			"aria-label": typeof c == "string" ? c : "Items",
			"data-testid": `${h}-rail`,
			children: [/* @__PURE__ */ J("div", {
				className: e("flex items-center gap-1 border-b border-border px-3 py-2", g ? "justify-center" : "justify-between"),
				children: [!g && c && /* @__PURE__ */ q("span", {
					className: "truncate text-xs font-semibold uppercase tracking-wide text-text-tertiary",
					children: c
				}), /* @__PURE__ */ q("button", {
					type: "button",
					onClick: v,
					"aria-label": g ? "Expand list" : "Collapse list",
					"data-testid": `${h}-toggle`,
					className: "flex-shrink-0 rounded-md p-1 text-text-tertiary transition-colors hover:bg-surface-hover hover:text-text-primary",
					children: /* @__PURE__ */ q(lr, { direction: g ? "right" : "left" })
				})]
			}), /* @__PURE__ */ q("div", {
				className: "flex flex-col",
				children: t.map((t, s) => {
					let c = n(t), l = c === r;
					return /* @__PURE__ */ q("div", {
						role: "button",
						tabIndex: 0,
						"aria-current": l,
						onClick: () => i(c),
						onKeyDown: (e) => {
							(e.key === "Enter" || e.key === " ") && (e.preventDefault(), i(c));
						},
						"data-testid": `${h}-row-${c}`,
						className: e("cursor-pointer border-l-2 text-left transition-colors", l ? "border-primary bg-surface-hover" : "border-transparent hover:bg-surface-hover"),
						children: g ? o?.(t, s, l) ?? /* @__PURE__ */ q("div", {
							className: "flex justify-center py-2.5",
							children: /* @__PURE__ */ q(ur, {
								index: s,
								selected: l
							})
						}) : a(t, s, l)
					}, c);
				})
			})]
		}), p == null ? /* @__PURE__ */ q("div", {
			className: "min-w-0 flex-1 overflow-y-auto",
			"data-testid": `${h}-detail`,
			children: S
		}) : /* @__PURE__ */ J("div", {
			className: "flex min-h-0 min-w-0 flex-1 flex-col",
			"data-testid": `${h}-pane-column`,
			children: [/* @__PURE__ */ q("div", {
				className: "min-h-0 flex-1 overflow-y-auto",
				"data-testid": `${h}-detail`,
				children: S
			}), /* @__PURE__ */ q("div", {
				className: "shrink-0 bg-surface",
				"data-testid": `${h}-pane-footer`,
				children: p
			})]
		})]
	});
}
//#endregion
//#region src/components/shared/TreeView.tsx
function fr(e) {
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
function pr(e) {
	return typeof CSS < "u" && typeof CSS.escape == "function" ? CSS.escape(e) : e;
}
function mr(e, t) {
	let n = /* @__PURE__ */ new Set();
	if (!t) return n;
	let r = new Map(e.map((e) => [e.id, e])), i = r.get(t);
	for (; i?.parentId;) n.add(i.parentId), i = r.get(i.parentId);
	return n;
}
function hr({ expanded: t }) {
	return /* @__PURE__ */ q("svg", {
		className: e("h-3.5 w-3.5 transition-transform", t ? "" : "-rotate-90"),
		viewBox: "0 0 16 16",
		fill: "none",
		"aria-hidden": "true",
		children: /* @__PURE__ */ q("path", {
			d: "M4 6l4 4 4-4",
			stroke: "currentColor",
			strokeWidth: "1.5",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		})
	});
}
function gr(e) {
	let t = e.currentTarget.getBoundingClientRect(), n = e.clientY - t.top;
	return n < t.height / 3 ? "before" : n > t.height * 2 / 3 ? "after" : "into";
}
function _r({ entry: t, depth: n, expanded: r, onToggle: i, selectedId: a, onSelect: o, renderTrailing: s, rowMenu: c, rowMenuLabel: l, dragEnabled: u, canDragNode: d, canDrop: f, dragRef: p, dropTarget: m, setDropTarget: h, onDrop: g, testId: _, focusedId: v, setFocusedId: y, size: b }) {
	let x = r.has(t.id), S = t.children.length > 0, C = t.id === a, w = m?.id === t.id, T = u && !t.disabled && t.status !== "pending" && (d?.(t) ?? !0), E = c?.(t), D = !!E && E.some((e) => e.items.length > 0), O = b === "rail", k = b === "md" || O;
	return /* @__PURE__ */ J("div", { children: [/* @__PURE__ */ J("div", {
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
			let r = gr(e);
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
			let r = gr(e);
			h(null), f(n.id, t.id, r) && g(t.id, r), p.current = null;
		},
		onDragEnd: () => {
			p.current = null, h(null);
		},
		onClick: () => {
			t.disabled || (o(t.id), S && i(t.id));
		},
		...D ? { onContextMenu: (e) => {
			e.preventDefault(), vr(e.currentTarget);
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
		className: e("group relative flex items-center border-l-2 transition-colors", "select-none outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary", O ? e("min-h-9 gap-1.5 pr-2.5", R, F) : k ? "min-h-8 gap-1.5 py-1 pr-2.5 text-[15px] leading-6" : "gap-1 py-1.5 pr-2 text-sm", T ? "cursor-grab active:cursor-grabbing" : "cursor-pointer", C ? k ? "border-primary bg-primary-bg font-medium text-primary-fg" : "border-primary bg-surface-hover font-semibold text-text-primary" : k ? "border-transparent text-text-primary hover:bg-surface-hover" : "border-transparent text-text-secondary hover:bg-surface-hover", t.disabled && "cursor-not-allowed opacity-50", t.status === "pending" && "pointer-events-none opacity-50", t.status === "moved" && "bg-success/10", w && m?.position === "into" && "ring-1 ring-inset ring-primary", w && m?.position === "before" && "shadow-[inset_0_2px_0_0_var(--color-primary)]", w && m?.position === "after" && "shadow-[inset_0_-2px_0_0_var(--color-primary)]"),
		style: { paddingLeft: n * (k ? 18 : 14) + 8 },
		children: [
			S ? /* @__PURE__ */ q("button", {
				type: "button",
				onClick: (e) => {
					e.stopPropagation(), i(t.id);
				},
				"aria-label": x ? "Collapse" : "Expand",
				className: "flex h-5 w-5 flex-shrink-0 items-center justify-center text-text-tertiary hover:text-text-primary",
				children: /* @__PURE__ */ q(hr, { expanded: x })
			}) : /* @__PURE__ */ q("span", {
				className: "h-5 w-5 flex-shrink-0",
				"aria-hidden": "true"
			}),
			t.icon && /* @__PURE__ */ q("span", {
				className: e("flex flex-shrink-0 items-center", k && (C ? "text-primary-fg" : "text-text-secondary")),
				"data-testid": `${_}-icon-${t.id}`,
				children: t.icon
			}),
			/* @__PURE__ */ q("span", {
				className: "min-w-0 flex-1 truncate",
				title: t.title,
				children: t.title
			}),
			t.meta && /* @__PURE__ */ q("span", {
				className: e("flex-shrink-0 text-text-tertiary", O ? "text-[12px] font-medium leading-4 tabular-nums text-text-tertiary" : k ? "text-[13px] tabular-nums" : "text-xs"),
				children: t.meta
			}),
			t.hoverMeta && /* @__PURE__ */ q("span", {
				"data-testid": `${_}-hover-meta-${t.id}`,
				className: e("sr-only flex-shrink-0 text-text-tertiary", O ? "text-[12px] font-medium leading-4 tabular-nums text-text-tertiary" : "text-xs", "group-hover:not-sr-only group-focus:not-sr-only group-focus-within:not-sr-only"),
				children: t.hoverMeta
			}),
			t.badge,
			s?.(t),
			D && /* @__PURE__ */ q("span", {
				"data-tree-row-menu": "",
				className: e("flex flex-shrink-0 items-center", k && "pointer-events-none absolute inset-y-0 right-1.5 opacity-0 group-hover:pointer-events-auto group-hover:opacity-100 group-focus:pointer-events-auto group-focus:opacity-100 group-focus-within:pointer-events-auto group-focus-within:opacity-100 has-[[aria-expanded=true]]:pointer-events-auto has-[[aria-expanded=true]]:opacity-100"),
				onClick: (e) => e.stopPropagation(),
				onContextMenu: (e) => e.stopPropagation(),
				children: /* @__PURE__ */ q(j, {
					trigger: /* @__PURE__ */ q("span", {
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
					triggerClassName: e("h-5 w-6 border-transparent px-0 py-0 opacity-0 transition-opacity motion-reduce:transition-none", "group-hover:opacity-100 group-focus:opacity-100 group-focus-within:opacity-100 focus-visible:opacity-100 aria-expanded:opacity-100", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", k && "h-6 w-7 bg-surface-hover")
				})
			})
		]
	}), x && t.children.map((e) => /* @__PURE__ */ q(_r, {
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
function vr(e) {
	let t = e.querySelector("[data-tree-row-menu] button[aria-haspopup=\"menu\"]");
	return t ? (t.getAttribute("aria-expanded") !== "true" && t.click(), !0) : !1;
}
function yr(e, t) {
	let n = [], r = (e) => {
		for (let i of e) n.push(i.id), t.has(i.id) && i.children.length > 0 && r(i.children);
	};
	return r(e), n;
}
function br({ nodes: t, selectedId: n, onSelect: r, defaultExpanded: i, expanded: a, onToggle: o, onReorder: s, canDragNode: c, canDropNode: l, renderTrailing: u, rowMenu: d, rowMenuLabel: f, size: p = "sm", className: m, "data-testid": h = "tree-view" }) {
	let g = U(() => fr(t), [t]), [_, v] = G(() => new Set(i ?? [])), y = a !== void 0, b = U(() => y ? new Set(a) : _, [
		y,
		a,
		_
	]), [x, S] = G(null), C = W(null), w = W(null), [T, E] = G(null), D = U(() => new Map(t.map((e) => [e.id, e])), [t]);
	V(() => {
		let e = mr(t, n);
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
	}, k = (e) => O(e, !b.has(e)), A = U(() => yr(g, b), [g, b]), j = x && A.includes(x) ? x : n && A.includes(n) ? n : A[0] ?? null, M = (e) => {
		e && (S(e), w.current?.querySelector(`[data-testid="${h}-row-${pr(e)}"]`)?.focus());
	}, ee = (e) => {
		let n = e.target, i = n.closest("[role=\"treeitem\"]");
		if (!i || n.closest("[data-tree-row-menu]")) return;
		if (e.key === "F10" && e.shiftKey || e.key === "ContextMenu") {
			vr(i) && e.preventDefault();
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
	}, N = (e, n) => {
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
	return t.length === 0 ? null : /* @__PURE__ */ q("div", {
		ref: w,
		role: "tree",
		className: e("flex flex-col", m),
		"data-testid": h,
		onKeyDown: ee,
		children: g.map((e) => /* @__PURE__ */ q(_r, {
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
			onDrop: N,
			testId: h,
			focusedId: j,
			setFocusedId: S
		}, e.id))
	});
}
//#endregion
//#region src/components/shared/WorkflowStepper.tsx
var xr = {
	sm: "h-5 w-5",
	md: "h-6 w-6",
	compact: "h-4 w-4"
}, Sr = {
	sm: "text-[10px] font-medium leading-none",
	md: "text-[11px] font-medium leading-none",
	compact: "text-xs font-semibold leading-4"
};
function Cr({ compact: e }) {
	return /* @__PURE__ */ q("svg", {
		viewBox: "0 0 16 16",
		fill: "none",
		className: e ? "h-2.5 w-2.5" : "h-3 w-3",
		"aria-hidden": "true",
		children: /* @__PURE__ */ q("path", {
			d: "M3.5 8.5l3 3 6-6.5",
			stroke: "currentColor",
			strokeWidth: "1.75",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		})
	});
}
function wr({ steps: t, size: n, className: r, "aria-label": i, "data-testid": s = "workflow-stepper" }) {
	let c = o();
	n === "sm" && a("WorkflowStepper", "sm");
	let l = n ?? (c === "compact" ? "compact" : "md"), u = l === "compact";
	return /* @__PURE__ */ q("ol", {
		className: e(u ? "m-0 inline-flex list-none items-center p-0" : "flex items-center overflow-x-auto", r),
		"data-testid": s,
		...u ? { "data-density": "compact" } : {},
		...i ? { "aria-label": i } : {},
		children: t.map((n, r) => {
			let i = r === t.length - 1, a = t[r + 1], o = n.done ? a?.done ? "bg-success" : "bg-gradient-to-r from-success to-success/30" : "bg-border";
			return /* @__PURE__ */ J("li", {
				"aria-current": n.active ? "step" : void 0,
				className: u ? "flex items-center" : "flex flex-1 items-center last:flex-none",
				children: [/* @__PURE__ */ J("div", {
					className: e("flex items-center whitespace-nowrap", u ? "gap-1" : "gap-1.5"),
					children: [/* @__PURE__ */ q("div", {
						className: e("flex flex-shrink-0 items-center justify-center rounded-full transition-colors", xr[l], n.done ? "bg-success text-white" : n.active ? e(u ? "border-[1.5px]" : "border-2", "border-info bg-info-bg") : "border border-border bg-surface-inset"),
						children: n.done ? /* @__PURE__ */ q(Cr, { compact: u }) : n.active ? /* @__PURE__ */ q("span", { className: e("rounded-full bg-info", u ? "h-1.5 w-1.5" : "h-2 w-2") }) : null
					}), /* @__PURE__ */ q("span", {
						className: e(Sr[l], n.active ? "text-text-primary" : n.done ? "text-text-secondary" : "text-text-tertiary"),
						children: n.label
					})]
				}), !i && /* @__PURE__ */ q("div", {
					"aria-hidden": "true",
					className: e(u ? "mx-1.5 h-0.5 w-3" : "mx-2 h-1 flex-1", "rounded-full transition-colors", o)
				})]
			}, n.step);
		})
	});
}
//#endregion
//#region src/components/shared/Wizard.tsx
function Tr() {
	return /* @__PURE__ */ q("svg", {
		viewBox: "0 0 16 16",
		fill: "none",
		className: "h-3 w-3",
		"aria-hidden": "true",
		children: /* @__PURE__ */ q("path", {
			d: "M3.5 8.5l3 3 6-6.5",
			stroke: "currentColor",
			strokeWidth: "1.75",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		})
	});
}
function Er({ steps: t, activeKey: n, onStep: r, onFinish: i, finishLabel: a = "Finish", className: o, "data-testid": s = "wizard" }) {
	let c = t.findIndex((e) => e.key === n), l = c >= 0 ? t[c] : t[0], u = l?.canAdvance ?? !0, d = c === t.length - 1;
	return /* @__PURE__ */ J("div", {
		className: e("flex flex-col gap-4 sm:flex-row", o),
		"data-testid": s,
		children: [/* @__PURE__ */ q("ol", {
			className: "flex flex-shrink-0 flex-col gap-1 sm:w-56",
			"data-testid": `${s}-rail`,
			children: t.map((t, i) => {
				let a = i < c, o = t.key === n;
				return /* @__PURE__ */ q("li", { children: /* @__PURE__ */ J("button", {
					type: "button",
					onClick: () => r(t.key),
					"aria-current": o ? "step" : void 0,
					"data-testid": `${s}-step-${t.key}`,
					className: e("flex w-full items-center gap-2.5 rounded-md px-2.5 py-2 text-left text-sm transition-colors", o ? "bg-surface-hover font-semibold text-text-primary" : "text-text-secondary hover:bg-surface-hover"),
					children: [/* @__PURE__ */ q("span", {
						className: e("flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full text-[11px] font-semibold", a ? "bg-success text-white" : o ? "border-2 border-info bg-info-bg text-info-fg" : "border border-border bg-surface-inset text-text-tertiary"),
						children: a ? /* @__PURE__ */ q(Tr, {}) : i + 1
					}), /* @__PURE__ */ q("span", {
						className: "truncate",
						children: t.label
					})]
				}) }, t.key);
			})
		}), /* @__PURE__ */ J("div", {
			className: "flex min-w-0 flex-1 flex-col gap-4",
			children: [/* @__PURE__ */ q("div", {
				className: "min-w-0 flex-1",
				"data-testid": `${s}-content`,
				children: l?.content
			}), /* @__PURE__ */ J("div", {
				className: "flex items-center justify-between gap-2 border-t border-border pt-3",
				children: [/* @__PURE__ */ q("button", {
					type: "button",
					onClick: () => {
						c > 0 && r(t[c - 1].key);
					},
					disabled: c <= 0,
					"data-testid": `${s}-back`,
					className: "rounded-md px-3 py-1.5 text-sm font-semibold text-text-secondary transition-colors hover:bg-surface-hover disabled:cursor-not-allowed disabled:opacity-50",
					children: "Back"
				}), /* @__PURE__ */ q("button", {
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
var Dr = [
	"tsx",
	"ts",
	"jsx",
	"js",
	"json",
	"bash",
	"sh",
	"text"
];
function Or(e) {
	let t = /language-(\w+)/.exec(e ?? "")?.[1]?.toLowerCase();
	return Dr.includes(t ?? "") ? t : "text";
}
function kr(e) {
	return typeof e == "string" || typeof e == "number" ? String(e) : Array.isArray(e) ? e.map(kr).join("") : e && typeof e == "object" && "props" in e ? kr(e.props?.children) : "";
}
var Ar = {
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
function jr(t) {
	let n = Ar[t], r = {
		table({ children: t }) {
			return /* @__PURE__ */ q("div", {
				className: "overflow-x-auto",
				children: /* @__PURE__ */ q("table", {
					className: e("w-full border-collapse", n.body),
					children: t
				})
			});
		},
		th({ children: e }) {
			return /* @__PURE__ */ q("th", {
				className: "border-b border-border px-3 py-1.5 text-left font-semibold text-text-primary",
				children: e
			});
		},
		td({ children: e }) {
			return /* @__PURE__ */ q("td", {
				className: "border-b border-border px-3 py-1.5 text-text-secondary",
				children: e
			});
		},
		a({ href: e, children: t }) {
			return /* @__PURE__ */ q("a", {
				href: e,
				target: "_blank",
				rel: "noreferrer",
				className: "text-primary underline underline-offset-2 hover:text-primary-hover",
				children: t
			});
		},
		h1({ children: t }) {
			return /* @__PURE__ */ q("h1", {
				className: e(n.h1, "text-text-primary first:mt-0"),
				children: t
			});
		},
		h2({ children: t }) {
			return /* @__PURE__ */ q("h2", {
				className: e(n.h2, "text-text-primary first:mt-0"),
				children: t
			});
		},
		h3({ children: t }) {
			return /* @__PURE__ */ q("h3", {
				className: e(n.h3, "text-text-primary first:mt-0"),
				children: t
			});
		},
		p({ children: t }) {
			return /* @__PURE__ */ q("p", {
				className: e("mb-3 leading-relaxed text-text-secondary last:mb-0", n.body),
				children: t
			});
		},
		ul({ children: t }) {
			return /* @__PURE__ */ q("ul", {
				className: e("mb-3 list-disc space-y-1 pl-5 text-text-secondary", n.body),
				children: t
			});
		},
		ol({ children: t }) {
			return /* @__PURE__ */ q("ol", {
				className: e("mb-3 list-decimal space-y-1 pl-5 text-text-secondary", n.body),
				children: t
			});
		},
		blockquote({ children: t }) {
			return /* @__PURE__ */ q("blockquote", {
				className: e("mb-3 border-l-2 border-border pl-3 italic text-text-tertiary", n.body),
				children: t
			});
		},
		hr() {
			return /* @__PURE__ */ q("hr", { className: "my-4 border-border" });
		},
		pre({ children: e, className: t }) {
			return /* @__PURE__ */ q(Nr, {
				className: t,
				children: e
			});
		},
		code({ className: t, children: r }) {
			return t ? /* @__PURE__ */ q("code", {
				className: t,
				children: r
			}) : /* @__PURE__ */ q("code", {
				className: e("rounded bg-surface-inset px-1 py-0.5 text-text-primary", n.inlineCode),
				children: r
			});
		}
	};
	return n.h4 && (r.h4 = ({ children: t }) => /* @__PURE__ */ q("h4", {
		className: e(n.h4, "text-text-primary first:mt-0"),
		children: t
	})), r;
}
var Mr = {
	sm: jr("sm"),
	md: jr("md"),
	lg: jr("lg")
};
function Nr({ children: e, className: t }) {
	let n = Array.isArray(e) ? e[0] : e, r = Or(n && typeof n == "object" && "props" in n ? n.props?.className : void 0), i = kr(e).replace(/\n$/, "");
	return /* @__PURE__ */ q(De, {
		code: i,
		language: r,
		className: "mb-3",
		copyButton: !0
	});
}
function Pr({ markdown: t, scale: n = "md", className: r, "data-testid": i = "markdown-view" }) {
	return /* @__PURE__ */ q("div", {
		className: e("min-w-0", r),
		"data-scale": n,
		"data-testid": i,
		children: /* @__PURE__ */ q(me, {
			remarkPlugins: [he],
			components: Mr[n] ?? Mr.md,
			children: t
		})
	});
}
//#endregion
//#region src/components/shared/AttachToggle.tsx
function Fr({ attached: t, onToggle: n, labels: r = {
	add: "Add",
	added: "Added"
}, size: i = "md", tabIndex: a, className: o, "aria-label": s, "data-testid": c = "attach-toggle" }) {
	return /* @__PURE__ */ J("button", {
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
		className: e("inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-lg font-medium transition-colors duration-100", "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary", i === "sm" ? "h-7 px-2.5 text-[13px]" : "h-9 px-3.5 text-sm", t ? "border border-transparent bg-primary-bg text-primary-fg hover:border-primary-border" : "border border-border bg-surface text-text-primary hover:bg-surface-hover", o),
		children: [t ? /* @__PURE__ */ q(v, { size: i === "sm" ? 14 : 16 }) : /* @__PURE__ */ q(_, { size: i === "sm" ? 14 : 18 }), t ? r.added : r.add]
	});
}
//#endregion
//#region src/components/shared/DocumentResultList.tsx
function Ir(e, t = Date.now()) {
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
function Lr({ items: n, currentId: r, onCurrentChange: i, onOpen: a, onToggleAttach: o, draggable: s = !0, onDragStartItem: c, rowMenu: l, rowTrailing: u, emptyState: d, now: f, toggleLabels: p, "aria-label": m = "Documents", className: h, "data-testid": _ = "document-result-list" }) {
	let v = W(/* @__PURE__ */ new Map()), b = f ?? Date.now(), x = n.some((e) => e.id === r) ? r : n[0]?.id, S = B((e) => {
		let t = n[Math.max(0, Math.min(n.length - 1, e))];
		t && (v.current.get(t.id)?.focus(), i?.(t.id));
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
	return n.length ? /* @__PURE__ */ q("ul", {
		"aria-label": m,
		"data-testid": _,
		className: e("m-0 flex list-none flex-col p-0", h),
		children: n.map((n, d) => {
			let f = n.id === r, m = n.id === x, h = Ir(n.updatedAt, b), _ = l?.(n), S = u?.(n) ?? n.trailing ?? null;
			return /* @__PURE__ */ J("li", {
				"data-testid": "document-result-row",
				"data-id": n.id,
				"data-current": f || void 0,
				className: e("group relative flex items-center gap-4 border-b border-border-subtle pl-4 pr-3 transition-colors duration-100", f ? "bg-primary-bg" : "hover:bg-surface-hover"),
				children: [
					f && /* @__PURE__ */ q("span", {
						"aria-hidden": "true",
						className: "absolute inset-y-0 left-0 w-[3px] rounded-r bg-primary"
					}),
					/* @__PURE__ */ J("div", {
						ref: (e) => {
							e ? v.current.set(n.id, e) : v.current.delete(n.id);
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
						children: [/* @__PURE__ */ q(le, {
							kind: n.kind,
							variant: "app",
							size: "xl"
						}), /* @__PURE__ */ J("span", {
							className: "flex min-w-0 flex-col gap-0.5",
							children: [
								/* @__PURE__ */ q("span", {
									className: "truncate text-base font-semibold leading-snug text-text-primary",
									children: n.title
								}),
								n.summary && /* @__PURE__ */ q("span", {
									className: "truncate text-sm leading-snug text-text-secondary",
									children: n.summary
								}),
								(n.folder || h) && /* @__PURE__ */ J("span", {
									className: "flex min-w-0 items-center gap-1.5 text-sm leading-snug text-text-tertiary",
									children: [
										n.folder && /* @__PURE__ */ q(y, {
											size: 15,
											className: "shrink-0"
										}),
										n.folder && /* @__PURE__ */ q("span", {
											className: "truncate",
											children: n.folder
										}),
										n.folder && h && /* @__PURE__ */ q("span", {
											"aria-hidden": "true",
											children: "·"
										}),
										h && /* @__PURE__ */ q("span", {
											className: "shrink-0",
											children: h
										})
									]
								})
							]
						})]
					}),
					S != null && S !== !1 && /* @__PURE__ */ q("span", {
						className: "flex max-h-8 shrink-0 items-center",
						"data-testid": "document-result-trailing",
						children: S
					}),
					o && /* @__PURE__ */ q(Fr, {
						attached: !!n.attached,
						onToggle: () => o(n),
						labels: p,
						tabIndex: m ? 0 : -1,
						"aria-label": `${n.attached ? "Remove" : "Add"} ${n.title}`,
						className: e(!n.attached && !f && "opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 focus-visible:opacity-100")
					}),
					_ && _.length > 0 && /* @__PURE__ */ q("span", {
						className: "shrink-0 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100",
						children: /* @__PURE__ */ q(j, {
							trigger: /* @__PURE__ */ q(g, { size: 16 }),
							triggerLabel: `More actions for ${n.title}`,
							triggerTabIndex: m ? 0 : -1,
							triggerClassName: "h-8 w-8 border-none px-0",
							align: "end",
							sections: _,
							"data-testid": "document-result-menu"
						})
					})
				]
			}, n.id);
		})
	}) : /* @__PURE__ */ q(K, { children: d ?? null });
}
//#endregion
//#region src/components/shared/FilePickerButton.tsx
function Rr({ onFiles: t, accept: n, multiple: r = !1, variant: i = "secondary", icon: a, disabled: o, children: s, className: c, "aria-label": l, "data-testid": u = "file-picker-button" }) {
	let d = W(null);
	return /* @__PURE__ */ J(K, { children: [/* @__PURE__ */ J("button", {
		type: "button",
		disabled: o,
		"aria-label": l,
		"data-testid": u,
		onClick: () => d.current?.click(),
		className: e("inline-flex h-9 cursor-pointer items-center gap-2 rounded-lg px-3.5 text-sm font-medium transition-colors duration-100", "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-50", i === "primary" ? "border-none bg-primary text-on-primary hover:bg-primary-hover" : "border border-border bg-surface text-text-primary hover:bg-surface-hover", c),
		children: [a, s]
	}), /* @__PURE__ */ q("input", {
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
//#region src/components/shared/Highlight.tsx
var zr = (e) => e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
function Br(e, t) {
	let n = Array.from(new Set(t.map((e) => e.trim()).filter(Boolean))).sort((e, t) => t.length - e.length).map((e) => zr(e).replace(/\s+/g, "\\s+"));
	if (!e || n.length === 0) return e ? [{
		text: e,
		match: !1
	}] : [];
	let r = RegExp(`(?<![\\p{L}\\p{N}_])(?:${n.join("|")})(?![\\p{L}\\p{N}_])`, "giu"), i = [], a = 0;
	for (let t of e.matchAll(r)) {
		let n = t.index ?? 0;
		t[0].length !== 0 && (n > a && i.push({
			text: e.slice(a, n),
			match: !1
		}), i.push({
			text: t[0],
			match: !0
		}), a = n + t[0].length);
	}
	return a < e.length && i.push({
		text: e.slice(a),
		match: !1
	}), i;
}
function Vr({ text: t, terms: n, className: r, markClassName: i, "data-testid": a }) {
	let o = Br(t, n);
	return /* @__PURE__ */ q("span", {
		className: r,
		"data-testid": a,
		children: o.map((t, n) => t.match ? /* @__PURE__ */ q("mark", {
			className: e("rounded-sm bg-primary-bg px-0.5 text-inherit [box-decoration-break:clone]", i),
			children: t.text
		}, n) : /* @__PURE__ */ q(z, { children: t.text }, n))
	});
}
//#endregion
//#region src/components/shared/Combobox.tsx
var Hr = {
	sm: "min-h-7 text-[12px]",
	md: "min-h-9 text-[14px]"
};
function Ur(t) {
	let { options: n, placeholder: r, size: i = "sm", disabled: a, allowCustom: o, maxOptions: s = 8, emptyMessage: c = "No matches", filter: l, onQueryChange: u, className: d, "data-testid": f } = t, p = H(), h = `${p}-list`, g = W(null), [_, v] = G(""), [y, b] = G(!1), [x, S] = G(-1), C = t.multiple ? t.value : t.value ? [t.value] : [], w = (e) => n.find((t) => t.value === e)?.label ?? e, T = U(() => {
		let e = _.trim().toLowerCase(), t = l ?? ((e, t) => e.label.toLowerCase().includes(t));
		return n.filter((n) => !e || t(n, e)).slice(0, s);
	}, [
		n,
		_,
		l,
		s
	]), E = y && (T.length > 0 || _.trim().length > 0), D = (e) => {
		v(e), u?.(e);
	}, O = () => {
		b(!1), S(-1);
	}, k = (e) => {
		if (t.multiple) {
			let n = t.value.includes(e) ? t.value.filter((t) => t !== e) : [...t.value, e];
			t.onChange(n), D(""), S(-1);
		} else t.onChange(e), D(""), O();
	};
	V(() => {
		if (!y) return;
		let e = (e) => {
			g.current?.contains(e.target) || O();
		};
		return document.addEventListener("mousedown", e), () => document.removeEventListener("mousedown", e);
	}, [y]);
	let A = (e) => {
		switch (e.key) {
			case "ArrowDown":
				e.preventDefault(), y ? T.length && S((e) => Math.min(e + 1, T.length - 1)) : (b(!0), S(T.length ? 0 : -1));
				break;
			case "ArrowUp":
				if (!y) return;
				e.preventDefault(), S((e) => Math.max(e - 1, 0));
				break;
			case "Enter": {
				let t = y && x >= 0 ? T[x] : void 0;
				t && !t.disabled ? (e.preventDefault(), k(t.value)) : o && _.trim() && (e.preventDefault(), k(_.trim()));
				break;
			}
			case "Escape":
				y && (e.stopPropagation(), O());
				break;
			case "Backspace": t.multiple && !_ && t.value.length && t.onChange(t.value.slice(0, -1));
		}
	}, j = t.multiple || _ || y ? _ : C[0] ? w(C[0]) : "";
	return /* @__PURE__ */ J("div", {
		ref: g,
		className: e("relative min-w-0", d),
		"data-testid": f,
		children: [/* @__PURE__ */ J("div", {
			className: e("flex flex-wrap items-center gap-1 rounded-md border border-border-field bg-surface px-2 py-0.5 focus-within:border-primary", Hr[i], a && "opacity-60"),
			children: [t.multiple && t.value.map((e) => /* @__PURE__ */ q(m, {
				size: "xs",
				tone: "accent",
				onRemove: a ? void 0 : () => t.onChange(t.value.filter((t) => t !== e)),
				children: w(e)
			}, e)), /* @__PURE__ */ q("input", {
				role: "combobox",
				"aria-label": t["aria-label"],
				"aria-expanded": E,
				"aria-controls": h,
				"aria-autocomplete": "list",
				"aria-activedescendant": E && x >= 0 ? `${p}-opt-${x}` : void 0,
				disabled: a,
				value: j,
				placeholder: t.multiple && t.value.length ? void 0 : r,
				onChange: (e) => {
					D(e.target.value), b(!0), S(-1);
				},
				onKeyDown: A,
				className: "min-w-[4rem] flex-1 border-0 bg-transparent py-0.5 text-text-primary outline-none placeholder:text-text-tertiary"
			})]
		}), E && /* @__PURE__ */ q("ul", {
			id: h,
			role: "listbox",
			"aria-multiselectable": t.multiple || void 0,
			className: "absolute inset-x-0 top-full z-50 m-0 mt-1 max-h-64 list-none overflow-y-auto rounded-lg border border-border bg-surface p-1 shadow-lg",
			children: T.length === 0 ? /* @__PURE__ */ q("li", {
				role: "presentation",
				className: "px-2 py-1.5 text-[12px] text-text-tertiary",
				children: o ? `Press Enter to use "${_.trim()}"` : c
			}) : T.map((n, r) => {
				let i = C.includes(n.value);
				return /* @__PURE__ */ J("li", {
					id: `${p}-opt-${r}`,
					role: "option",
					"aria-selected": i,
					"aria-disabled": n.disabled || void 0,
					onMouseDown: (e) => {
						e.preventDefault(), n.disabled || k(n.value);
					},
					onMouseEnter: () => S(r),
					className: e("flex cursor-pointer select-none flex-col rounded px-2 py-1 text-[12px]", r === x ? "bg-primary-bg text-primary-fg" : i ? "font-semibold text-text-primary" : "text-text-primary", n.disabled && "cursor-not-allowed opacity-50"),
					children: [/* @__PURE__ */ J("span", { children: [i && t.multiple ? "✓ " : "", n.label] }), n.description && /* @__PURE__ */ q("span", {
						className: "text-[11px] text-text-tertiary",
						children: n.description
					})]
				}, n.value);
			})
		})]
	});
}
//#endregion
//#region src/components/shared/dataAccent.tsx
var Wr = [
	1,
	2,
	3,
	4,
	5,
	6,
	7,
	8
];
function Gr(e) {
	return e === void 0 || e === "" ? {} : typeof e == "number" ? { "data-accent": String(e) } : { style: { "--data-accent": e } };
}
function Kr({ accent: t, className: n, "data-testid": r }) {
	return /* @__PURE__ */ q("span", {
		"aria-hidden": !0,
		"data-testid": r,
		...Gr(t),
		className: e("block w-[5px] shrink-0 self-stretch bg-[var(--data-accent,var(--color-text-tertiary))]", n)
	});
}
//#endregion
//#region src/components/shared/Histogram.tsx
var qr = 100, Jr = 3;
function Yr({ buckets: t, labels: n, accent: r, height: i = 48, className: a, "aria-label": o, "data-testid": s }) {
	let c = Math.max(t.length, 1), l = Math.max(...t, 1), u = (qr - Jr * (c - 1)) / c, d = t.map((e, t) => `${n?.[t] ?? t + 1}: ${e}`).join(" | ");
	return /* @__PURE__ */ J("svg", {
		role: "img",
		"aria-label": o ?? `Distribution — ${d}`,
		"data-testid": s,
		viewBox: `0 0 ${qr} ${i}`,
		preserveAspectRatio: "none",
		height: i,
		width: "100%",
		...Gr(r),
		className: e("block w-full", a),
		children: [/* @__PURE__ */ q("title", { children: d }), t.map((e, t) => {
			let n = e / l, r = Math.max(2, Math.round(n * i));
			return /* @__PURE__ */ q("rect", {
				"data-testid": s ? `${s}-bar-${t}` : void 0,
				x: t * (u + Jr),
				y: i - r,
				width: u,
				height: r,
				rx: 1,
				opacity: .15 + .85 * n,
				className: "fill-[var(--data-accent,var(--color-primary))]"
			}, t);
		})]
	});
}
//#endregion
export { Ut as $, Ln as A, Ne as At, Qt as B, Gn as C, qe as Ct, Hn as D, ze as Dt, qn as E, Re as Et, hn as F, tn as G, en as H, un as I, sn as J, an as K, Sn as L, Nn as M, De as Mt, An as N, Vn as O, Fe as Ot, jn as P, Wt as Q, ln as R, Xn as S, Ye as St, Wn as T, Be as Tt, $t as U, rn as V, Z as W, Kt as X, Xt as Y, Gt as Z, or as _, at as _t, Ur as a, It as at, Zn as b, et as bt, Rr as c, Nt as ct, Fr as d, Tt as dt, Vt as et, Pr as f, wt as ft, dr as g, st as gt, br as h, lt as ht, Gr as i, Rt as it, Fn as j, Ie as jt, Rn as k, Pe as kt, Lr as l, Ot as lt, wr as m, ht as mt, Kr as n, Bt as nt, Vr as o, Pt as ot, Er as p, yt as pt, on as q, Wr as r, zt as rt, Br as s, kt as st, Yr as t, Ht as tt, Ir as u, Et as ut, ar as v, nt as vt, Un as w, Ue as wt, Yn as x, Ze as xt, ir as y, tt as yt, Zt as z };
