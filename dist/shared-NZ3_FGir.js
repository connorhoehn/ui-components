import { n as e } from "./useFullscreen-DfIEvnsc.js";
import { t } from "./cn-D4QmbyEy.js";
import "./ToastProvider-CJAceUvq.js";
import { c as n } from "./usePromptContext-CUNhKC01.js";
import { c as r } from "./GroupedList-DtSykFEm.js";
import { l as i, n as a, s as o, u as s } from "./Button-C-I3BxWI.js";
import { t as c } from "./Card-CbTNNNkk.js";
import "./Table-Cntt19RZ.js";
import { c as l, f as u, l as d, m as f, n as p, p as m, t as h, u as g } from "./overlayStack-DxIDMUs-.js";
import "./PageSection-B_rawbKy.js";
import { t as _ } from "./IconButton-J9jGN6eo.js";
import { D as v, E as y, I as b, J as x, K as S, M as C, P as w, W as T, f as E, h as D, ht as O, k, m as A, nt as j, rt as M, t as ee } from "./Icons-CqVFbuiZ.js";
import { c as te, d as N } from "./MediaIcons-_ai5Til2.js";
import { c as P, l as ne, n as F, t as I } from "./Text-AlKB4riU.js";
import "./FollowBanner-DnuzvkQu.js";
import "./Badge-D58pEJIm.js";
import "./Banner-DTMyQNum.js";
import "./Chart-CHhWLl8U.js";
import { t as re } from "./Modal-PO0F6rAp.js";
import { t as ie } from "./ConfirmDialog-BxFrBQ52.js";
import { t as ae } from "./Input-B0LB5k_L.js";
import { n as oe } from "./Select-BFyECVVL.js";
import { t as L } from "./Tooltip-Q0urBp4N.js";
import { t as se } from "./InlinePopover-Dx8-r-XU.js";
import "./Toolbar-DTMhrPmz.js";
import "./FormField-CQ27qxWt.js";
import "./SearchInput-DDKsA6gZ.js";
import { n as ce } from "./DataTable-CLja8caN.js";
import { t as le } from "./EmptyState-D5ucMp2y.js";
import { t as R } from "./ThinkingDots-52RnodUR.js";
import "./Drawer-DOaOGq3M.js";
import "./Spinner-CYflBP-c.js";
import { t as z } from "./StatusPill-CLkB5jFS.js";
import { t as B } from "./Sparkline-BIYPNDRu.js";
import { i as ue } from "./focusTrap-D9J7npjl.js";
import "./FilterChip-CRblMyt0.js";
import "./SkeletonCard-D3FL0TB7.js";
import { a as de, i as fe } from "./ChannelHeader-Dg9i_SJZ.js";
import "./Slider-DEbQCKD1.js";
import { t as pe } from "./DropdownMenu-DcFIdC5O.js";
import "./DockedPanelContext-pH9A5z1h.js";
import { t as me } from "./Textarea-BwvE1HPn.js";
import { n as V, r as he } from "./Avatar-GvBbrBxQ.js";
import { o as H } from "./DecisionPath-DsZclIl1.js";
import "./TitledFrame-B0QW93da.js";
import "./DotMeter-B6ZDgLU7.js";
import "./StatusDot-GwVn-q5q.js";
import { i as ge } from "./ChoiceList-B3BfW3Ls.js";
import "./SegmentedControl-CMpxVHLC.js";
import "./RovingToolbar-B1Fai5PF.js";
import { t as _e } from "./InlineAlert-BqOYETP1.js";
import "./CardHeader-DzQxX5J-.js";
import "./Breadcrumbs-DVQuOJ2R.js";
import { d as ve, f as ye, p as be, t as U } from "./PageHeader-DUgrZmT_.js";
import "./NotificationBell-Arag4pi9.js";
import "./LogStream-C9pn1oLa.js";
import "./RisingParticles-BBIjT11W.js";
import "./backdropTone-BzPocySl.js";
import "./MeterRow-7m0okaBy.js";
import "./FollowUpChips-BWHw0Y0h.js";
import "./PresenceAvatars-DQpu2QO1.js";
import "./FileUploadDrop-BuUUNs9k.js";
import { t as xe } from "./ActivityFeed-CF1uFMm2.js";
import { a as Se, c as Ce, d as we, i as Te, l as Ee, o as De } from "./railType-AsIPWdQ5.js";
import "./PopoverForm-BCwQf8d0.js";
import "./useMeasuredWidth-DtK0ADKg.js";
import "./SectionLabel-Ch_rkHQZ.js";
import "./InlinePlaceholder-DiPQ7hOM.js";
import "./FloatingPanel-CP5vaOcJ.js";
import "./ChangeDiff-CGfT-mcu.js";
import "./Link-h2c9gcsw.js";
import "./MetaLine-DFn2XXGU.js";
import "./NumberInput-C1JOoCoC.js";
import { t as Oe } from "./Checkbox-Dvt09s3H.js";
import { n as ke } from "./FileKindMark-BZmXUxaT.js";
import { Children as Ae, Fragment as je, createContext as Me, isValidElement as Ne, useCallback as W, useContext as Pe, useEffect as G, useId as K, useLayoutEffect as Fe, useMemo as q, useRef as J, useState as Y } from "react";
import { Fragment as X, jsx as Z, jsxs as Q } from "react/jsx-runtime";
import { Command as $ } from "cmdk";
import { createPortal as Ie } from "react-dom";
import Le from "react-markdown";
import Re from "remark-gfm";
//#region src/components/ui/SectionStack.tsx
var ze = {
	comfortable: "gap-6",
	compact: "gap-4"
}, Be = {
	comfortable: "gap-12",
	compact: "gap-8"
};
function Ve({ children: e, density: n, divided: r = !0, as: i = "div", className: a, ref: s, ...c }) {
	let l = o(n), u = i, d = Ae.toArray(e);
	return /* @__PURE__ */ Z(u, {
		ref: s,
		className: t("flex min-w-0 flex-col", r ? ze[l] : Be[l], a),
		"data-ui-section-stack": l,
		"data-divided": r ? void 0 : "false",
		...c,
		children: d.flatMap((e, t) => r && t > 0 ? [/* @__PURE__ */ Z("hr", {
			className: "m-0 w-full self-stretch border-0 border-t border-border",
			"data-ui-section-rule": ""
		}, `rule-${t}`), e] : [e])
	});
}
//#endregion
//#region src/components/shared/CodeBlock.tsx
var He = /* @__PURE__ */ "import.export.from.as.const.let.var.function.return.default.if.else.switch.case.break.new.typeof.instanceof.in.of.interface.type.extends.implements.class.async.await.true.false.null.undefined.this.super.try.catch.finally.throw.for.while.do.continue.public.private.protected.readonly.static.enum".split("."), Ue = [
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
], We = /* @__PURE__ */ "cd.ls.echo.cat.grep.sed.awk.find.cp.mv.rm.mkdir.rmdir.touch.chmod.chown.pwd.which.npm.yarn.pnpm.npx.git.node.curl.wget".split(".");
function Ge(e) {
	return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function Ke(e, t) {
	let n = e.replace(/(\/\/.*?)(\n|$)/g, `<span style="color:${t.comment}">$1</span>$2`);
	n = n.replace(/(\/\*[\s\S]*?\*\/)/g, `<span style="color:${t.comment}">$1</span>`), n = n.replace(/("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)/g, `<span style="color:${t.string}">$1</span>`);
	let r = RegExp(`\\b(${He.join("|")})\\b`, "g");
	return n = n.replace(r, `<span style="color:${t.keyword}">$1</span>`), n = n.replace(/\b(\d+(?:\.\d+)?)\b/g, `<span style="color:${t.number}">$1</span>`), n;
}
function qe(e, t) {
	let n = e.replace(/("(?:[^"\\]|\\.)*")(\s*:)/g, `<span style="color:${t.property}">$1</span>$2`);
	return n = n.replace(/("(?:[^"\\]|\\.)*")/g, `<span style="color:${t.string}">$1</span>`), n = n.replace(/\b(true|false|null)\b/g, `<span style="color:${t.keyword}">$1</span>`), n = n.replace(/\b(-?\d+(?:\.\d+)?)\b/g, `<span style="color:${t.number}">$1</span>`), n;
}
function Je(e, t) {
	let n = e.replace(/(#.*?)(\n|$)/g, `<span style="color:${t.comment}">$1</span>$2`);
	n = n.replace(/("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')/g, `<span style="color:${t.string}">$1</span>`);
	let r = RegExp(`\\b(${Ue.join("|")})\\b`, "g");
	n = n.replace(r, `<span style="color:${t.keyword}">$1</span>`);
	let i = RegExp(`\\b(${We.join("|")})\\b`, "g");
	return n = n.replace(i, `<span style="color:${t.builtin}">$1</span>`), n = n.replace(/(\$\w+|\$\{[^}]+\})/g, `<span style="color:${t.variable}">$1</span>`), n;
}
var Ye = {
	comment: "var(--color-neutral)",
	string: "#4ade80",
	keyword: "var(--color-state-pending)",
	number: "#fbbf24",
	property: "#7dd3fc",
	builtin: "#c4b5fd",
	variable: "#fbbf24"
}, Xe = {
	comment: "var(--color-code-comment)",
	string: "var(--color-code-green)",
	keyword: "var(--color-code-mauve)",
	number: "var(--color-code-peach)",
	property: "var(--color-code-blue)",
	builtin: "var(--color-code-mauve)",
	variable: "var(--color-code-yellow)"
}, Ze = {
	comment: "var(--color-neutral)",
	string: "#15803d",
	keyword: "var(--color-info-fg)",
	number: "#a16207",
	property: "#0369a1",
	builtin: "var(--color-cat-ai)",
	variable: "#a16207"
};
function Qe(e, t, n) {
	let r = n === "light" ? Ze : n === "console" ? Xe : Ye, i = Ge(e);
	switch (t) {
		case "json": return qe(i, r);
		case "bash":
		case "sh": return Je(i, r);
		case "text": return i;
		default: return Ke(i, r);
	}
}
function $e({ code: e, language: n = "tsx", theme: r = "dark", copyButton: i = !0, showLineNumbers: a = !1, className: o, style: s, "data-testid": c, ariaLabel: l }) {
	let [u, d] = Y(!1), f = W(() => {
		typeof navigator > "u" || !navigator.clipboard || navigator.clipboard.writeText(e).then(() => {
			d(!0), setTimeout(() => d(!1), 1500);
		}).catch(() => {});
	}, [e]), p = r === "dark", m = r === "console", h = q(() => e.split("\n"), [e]), g = q(() => Qe(e, n, r), [
		e,
		n,
		r
	]);
	return /* @__PURE__ */ Q("div", {
		"data-testid": c,
		"data-language": n,
		"data-theme": r,
		className: t("relative flex rounded-lg border overflow-hidden", m ? "bg-code-bg text-code-text border-code-border" : p ? "bg-surface-inverse text-text-inverse border-border-emphasis" : "bg-surface-panel text-text-primary border-border", o),
		style: s,
		"aria-label": l ?? `Code (${n})`,
		children: [i && /* @__PURE__ */ Z("button", {
			type: "button",
			onClick: f,
			"aria-label": u ? "Copied" : "Copy code",
			className: t("order-2 m-3 shrink-0 self-start font-[inherit] text-xs font-medium px-2 py-1 rounded border transition-opacity", m ? "bg-code-panel text-code-text border-code-border hover:bg-code-raised" : p ? "bg-surface-inverse text-text-inverse border-border-emphasis hover:bg-neutral" : "bg-surface text-text-primary border-border-emphasis hover:bg-surface-hover"),
			"data-copied": u ? "true" : "false",
			children: u ? "Copied" : "Copy"
		}), /* @__PURE__ */ Z("pre", {
			className: "m-0 min-w-0 flex-1 px-4 py-3 overflow-x-auto font-mono text-xs leading-relaxed",
			children: a ? /* @__PURE__ */ Q("div", {
				className: "flex",
				children: [/* @__PURE__ */ Z("div", {
					className: t("select-none pr-3 text-right", m ? "text-code-comment" : p ? "text-neutral" : "text-text-tertiary"),
					"aria-hidden": "true",
					children: h.map((e, t) => /* @__PURE__ */ Z("div", { children: t + 1 }, t))
				}), /* @__PURE__ */ Z("code", {
					className: "flex-1 block",
					dangerouslySetInnerHTML: { __html: g }
				})]
			}) : /* @__PURE__ */ Z("code", {
				className: "block",
				dangerouslySetInnerHTML: { __html: g }
			})
		})]
	});
}
//#endregion
//#region src/components/shared/CommandPalette.tsx
var et = "cui:command-palette:recents", tt = 5;
function nt(e, t) {
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
function rt(e, t) {
	if (!(!e || typeof window > "u")) try {
		window.localStorage.setItem(e, JSON.stringify(t));
	} catch {}
}
var it = Me(null);
function at() {
	let e = Pe(it);
	if (!e) throw Error("useCommandPalette must be used inside a <CommandPaletteProvider>.");
	return e;
}
function ot() {
	let { open: e, close: t, toggle: n, isOpen: r, query: i } = at();
	return {
		open: e,
		close: t,
		toggle: n,
		isOpen: r,
		query: i
	};
}
function st(e, t) {
	let n = t.toLowerCase().split("+").map((e) => e.trim()).filter(Boolean);
	if (n.length === 0) return !1;
	let r = n[n.length - 1], i = new Set(n.slice(0, -1)), a = i.has("cmd") || i.has("meta"), o = i.has("ctrl"), s = i.has("mod"), c = i.has("shift"), l = i.has("alt");
	if (s) {
		if (!e.metaKey && !e.ctrlKey) return !1;
	} else if (a !== e.metaKey || o !== e.ctrlKey) return !1;
	return c !== e.shiftKey || l !== e.altKey ? !1 : e.key.toLowerCase() === r;
}
function ct({ commands: e, getDynamicCommands: t, recentsKey: n = et, recentsLimit: r = tt, children: i }) {
	let [a, o] = Y(!1), [s, c] = Y(""), [l, u] = Y(() => /* @__PURE__ */ new Map()), [d, f] = Y(() => nt(n, r)), p = W((e) => {
		n !== null && f((t) => {
			let i = [e, ...t.filter((t) => t !== e)].slice(0, r);
			return rt(n, i), i;
		});
	}, [n, r]), m = W(() => o(!0), []), h = W(() => {
		o(!1), c("");
	}, []), g = W(() => o((e) => !e), []), _ = W((e) => {
		u((t) => {
			let n = new Map(t);
			return n.set(e.id, e), n;
		});
	}, []), v = W((e) => {
		u((t) => {
			if (!t.has(e)) return t;
			let n = new Map(t);
			return n.delete(e), n;
		});
	}, []);
	G(() => {
		let e = (e) => {
			(e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k" && (e.preventDefault(), o((e) => !e));
		};
		return window.addEventListener("keydown", e, !0), () => window.removeEventListener("keydown", e, !0);
	}, []);
	let y = q(() => {
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
	]), b = J(y);
	b.current = y, G(() => {
		let e = (e) => {
			if (!((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k")) {
				for (let t of b.current) if (t.hotkey && st(e, t.hotkey)) {
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
	return /* @__PURE__ */ Z(it.Provider, {
		value: x,
		children: i
	});
}
function lt(e) {
	let { registerCommand: t, unregisterCommand: n } = at();
	G(() => (t(e), () => n(e.id)), [
		e,
		t,
		n
	]);
}
function ut(e) {
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
function dt(e, t) {
	let n = t.trim().toLowerCase();
	if (!n) return 1;
	let r = e.toLowerCase(), i = n.split(/\s+/).filter(Boolean);
	if (i.every((e) => r.includes(e))) return r.startsWith(i[0]) ? 1 : .8;
	let a = 0;
	for (let e of n.replace(/\s+/g, "")) {
		if (a = r.indexOf(e, a), a < 0) return 0;
		a += 1;
	}
	return .1;
}
var ft = {
	status: "idle",
	groups: []
};
function pt(e, t, n, r, i) {
	let [a, o] = Y(ft), [s, c] = Y(0), l = J(n);
	l.current = n;
	let u = t.trim(), d = e && !!n && u.length >= i;
	G(() => {
		if (!d) {
			o(ft);
			return;
		}
		let e = new AbortController();
		o({
			status: "loading",
			groups: []
		});
		let t = setTimeout(() => {
			let t = l.current;
			t && t(u, { signal: e.signal }).then((t) => {
				e.signal.aborted || o({
					status: "done",
					groups: (t ?? []).filter((e) => e.items.length > 0)
				});
			}, () => {
				e.signal.aborted || o({
					status: "error",
					groups: []
				});
			});
		}, r);
		return () => {
			clearTimeout(t), e.abort();
		};
	}, [
		d,
		u,
		r,
		s
	]);
	let f = W(() => c((e) => e + 1), []);
	return {
		state: d ? a : ft,
		retry: f
	};
}
var mt = t("flex items-center gap-2 px-3 py-2 mx-1 rounded-md cursor-pointer text-sm", "text-text-primary aria-selected:bg-surface-hover");
function ht({ placeholder: e = "Type a command or search…", emptyState: n, className: r, searchRecords: i, onOpenRecord: a, recordDebounceMs: o = 200, minRecordQueryLength: s = 2 } = {}) {
	let { isOpen: c, close: l, query: u, setQuery: d, mergedCommands: f, recents: p, noteSelection: m } = at(), h = q(() => {
		if (u.trim() !== "" || p.length === 0) return [];
		let e = new Map(f.map((e) => [e.id, e]));
		return p.map((t) => e.get(t)).filter((e) => !!e);
	}, [
		f,
		u,
		p
	]), g = q(() => ut(f), [f]), { state: _, retry: v } = pt(c, u, i, o, s), y = u.trim(), b = q(() => y === "" ? f.length : f.filter((e) => dt(`${e.id} ${e.label} ${(e.keywords ?? []).join(" ")}`, y) > 0).length, [f, y]), x = b + _.groups.reduce((e, t) => e + t.items.length, 0), S = y !== "" && x === 0 && _.status !== "loading" && _.status !== "error", C = y === "" ? "" : _.status === "loading" ? `${b} commands. Searching records.` : _.status === "error" ? `${b} commands. Record search failed.` : x === 0 ? `No matches for ${y}` : `${x} ${x === 1 ? "result" : "results"}`, w = W((e) => {
		l(), Promise.resolve().then(() => {
			a ? a(e) : typeof window < "u" && window.location.assign(e.href);
		});
	}, [l, a]), T = W((e) => {
		m(e.id), l(), Promise.resolve().then(() => e.run());
	}, [l, m]);
	return /* @__PURE__ */ Z(re, {
		open: c,
		onClose: l,
		ariaLabel: "Command palette",
		maxWidth: 640,
		rawChildren: !0,
		backdropTestId: "command-palette-backdrop",
		children: /* @__PURE__ */ Q($, {
			label: "Command palette",
			value: void 0,
			filter: (e, t, n) => dt(`${e} ${(n ?? []).join(" ")}`, t),
			className: t("flex flex-col gap-0 w-full", r),
			"data-testid": "command-palette",
			children: [
				/* @__PURE__ */ Z($.Input, {
					value: u,
					onValueChange: d,
					placeholder: e,
					"data-autofocus": !0,
					className: t("w-full px-3 py-2.5 text-sm border-0 border-b border-border", "outline-none bg-transparent text-text-primary placeholder:text-text-tertiary"),
					"data-testid": "command-palette-input"
				}),
				/* @__PURE__ */ Q($.List, {
					"data-ui-listbox": "command-palette",
					className: "max-h-[360px] overflow-y-auto py-2",
					children: [
						S ? /* @__PURE__ */ Z("div", {
							className: "px-3 py-6 text-center text-sm text-text-tertiary",
							"data-testid": "command-palette-empty",
							children: n ?? `No matches for \u201c${y}\u201d`
						}) : null,
						h.length > 0 && /* @__PURE__ */ Z($.Group, {
							heading: "Recent",
							"data-testid": "command-palette-group-recent",
							children: h.map((e) => /* @__PURE__ */ Q($.Item, {
								value: `recent-${e.id} ${e.label}`,
								keywords: e.keywords,
								onSelect: () => T(e),
								"data-testid": `command-palette-recent-${e.id}`,
								className: t("flex items-center gap-2 px-3 py-2 mx-1 rounded-md cursor-pointer text-sm", "text-text-primary aria-selected:bg-surface-hover"),
								children: [e.icon && /* @__PURE__ */ Z("span", {
									className: "shrink-0 text-text-secondary",
									children: e.icon
								}), /* @__PURE__ */ Z("span", {
									className: "flex-1 truncate",
									children: e.label
								})]
							}, `recent-${e.id}`))
						}),
						g.map(({ groupName: e, items: n }) => /* @__PURE__ */ Z($.Group, {
							heading: e ?? void 0,
							children: n.map((e) => /* @__PURE__ */ Q($.Item, {
								value: `${e.id} ${e.label} ${(e.keywords ?? []).join(" ")}`,
								keywords: e.keywords,
								onSelect: () => T(e),
								"data-testid": `command-palette-item-${e.id}`,
								className: t("flex items-center gap-2 px-3 py-2 mx-1 rounded-md cursor-pointer text-sm", "text-text-primary aria-selected:bg-surface-hover"),
								children: [
									e.icon && /* @__PURE__ */ Z("span", {
										className: "shrink-0 text-text-secondary",
										children: e.icon
									}),
									/* @__PURE__ */ Z("span", {
										className: "flex-1 truncate",
										children: e.label
									}),
									e.hint && /* @__PURE__ */ Z("span", {
										className: "text-xs text-text-tertiary truncate",
										children: e.hint
									}),
									e.shortcut && e.shortcut.length > 0 && /* @__PURE__ */ Z("span", {
										className: "flex items-center gap-1 shrink-0",
										children: e.shortcut.map((n, r) => /* @__PURE__ */ Z("kbd", {
											className: t("inline-flex items-center justify-center min-w-[18px] h-[18px] px-1", "text-[11px] font-mono font-medium", "bg-surface-hover text-text-secondary", "border border-border rounded"),
											children: n
										}, `${e.id}-kbd-${r}`))
									})
								]
							}, e.id))
						}, e ?? "__ungrouped__")),
						_.groups.map((e) => /* @__PURE__ */ Z($.Group, {
							heading: e.group,
							forceMount: !0,
							"data-testid": `command-palette-records-${e.group}`,
							children: e.items.map((t) => /* @__PURE__ */ Q($.Item, {
								value: `record ${e.group} ${t.id} ${t.title}`,
								forceMount: !0,
								onSelect: () => w(t),
								"data-testid": `command-palette-record-${t.id}`,
								className: mt,
								children: [
									t.icon && /* @__PURE__ */ Z("span", {
										className: "shrink-0 text-text-secondary",
										children: t.icon
									}),
									/* @__PURE__ */ Q("span", {
										className: "min-w-0 flex-1",
										children: [/* @__PURE__ */ Z("span", {
											className: "block truncate",
											children: t.title
										}), t.subtitle && /* @__PURE__ */ Z("span", {
											className: "block truncate text-xs text-text-tertiary",
											children: t.subtitle
										})]
									}),
									/* @__PURE__ */ Z("span", {
										className: "shrink-0 rounded border border-border px-1.5 text-xs text-text-secondary",
										children: t.kind
									})
								]
							}, `${e.group}-${t.id}`))
						}, `records-${e.group}`)),
						_.status === "loading" && /* @__PURE__ */ Z("div", {
							className: "px-3 py-2 text-sm text-text-tertiary",
							"data-testid": "command-palette-records-loading",
							children: "Searching records…"
						}),
						_.status === "error" && /* @__PURE__ */ Q("div", {
							className: "flex items-center gap-2 px-3 py-2 text-sm text-text-secondary",
							"data-testid": "command-palette-records-error",
							children: [/* @__PURE__ */ Z("span", {
								className: "flex-1",
								children: "Couldn’t search records."
							}), /* @__PURE__ */ Z("button", {
								type: "button",
								onClick: v,
								className: "rounded border border-border px-2 py-0.5 text-xs hover:bg-surface-hover",
								children: "Retry"
							})]
						})
					]
				}),
				/* @__PURE__ */ Z("div", {
					role: "status",
					"aria-live": "polite",
					className: "sr-only",
					"data-testid": "command-palette-status",
					children: C
				})
			]
		})
	});
}
function gt({ className: e, label: n = "Search", size: r = "sm" } = {}) {
	let { toggle: i } = at();
	return /* @__PURE__ */ Q("button", {
		type: "button",
		onClick: i,
		"data-testid": "command-palette-hint",
		className: t("inline-flex items-center rounded-md border border-border", r === "md" ? "h-9 gap-2 bg-surface px-3 text-[13px] font-medium text-text-primary shadow-sm hover:bg-surface-hover" : "gap-1.5 px-2 py-1 text-xs text-text-secondary bg-surface-hover hover:bg-surface-panel", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", "cursor-pointer transition-colors", e),
		"aria-label": "Open command palette",
		"aria-keyshortcuts": "Meta+K Control+K",
		children: [/* @__PURE__ */ Z("kbd", {
			className: t("font-mono", r === "md" ? "text-[12px] text-text-secondary" : "text-[11px]"),
			children: "⌘K"
		}), /* @__PURE__ */ Z("span", { children: n })]
	});
}
//#endregion
//#region src/components/shared/PickerDialog.tsx
function _t({ open: e, title: n, body: r, options: i, confirmLabel: a = "Choose", onPick: o, onCancel: s, searchPlaceholder: c = "Search…", emptyText: l = "Nothing to choose from.", loading: u = !1, initialId: d, "data-testid": f = "picker-dialog" }) {
	let [p, m] = Y(""), [h, g] = Y(d ?? null), _ = J(null);
	G(() => {
		e && (m(""), g(d ?? null));
	}, [e, d]);
	let v = q(() => {
		let e = p.trim().toLowerCase();
		return e ? i.filter((t) => `${t.label} ${t.description ?? ""}`.toLowerCase().includes(e)) : i;
	}, [i, p]), y = v.filter((e) => !e.disabled), b = y.find((e) => e.id === h) ?? null, x = (e) => {
		let t = e ? i.find((t) => t.id === e && !t.disabled) : void 0;
		t && o(t.id);
	}, S = (e) => {
		if (e.key === "Enter") {
			e.preventDefault(), x(b?.id ?? (y.length === 1 ? y[0].id : null));
			return;
		}
		if (e.key !== "ArrowDown" && e.key !== "ArrowUp" || (e.preventDefault(), y.length === 0)) return;
		let t = b ? y.indexOf(b) : -1, n = e.key === "ArrowDown" ? Math.min(y.length - 1, t + 1) : Math.max(0, t - 1), r = y[n].id;
		g(r), _.current?.querySelector(`[data-option-id="${CSS.escape(r)}"]`)?.scrollIntoView({ block: "nearest" });
	};
	return /* @__PURE__ */ Z(ie, {
		open: e,
		title: n,
		...r ? { body: r } : {},
		confirmLabel: a,
		confirmDisabled: !b,
		onConfirm: () => x(b?.id ?? null),
		onCancel: s,
		children: /* @__PURE__ */ Q("div", {
			className: "flex flex-col gap-2",
			"data-testid": f,
			onKeyDown: S,
			children: [i.length > 6 && /* @__PURE__ */ Z(ae, {
				autoFocus: !0,
				size: "md",
				value: p,
				onChange: (e) => m(e.target.value),
				placeholder: c,
				"aria-label": c,
				"data-testid": `${f}-search`
			}), /* @__PURE__ */ Z("div", {
				ref: _,
				role: "listbox",
				"data-ui-listbox": "picker",
				"aria-label": n,
				tabIndex: i.length > 6 ? -1 : 0,
				className: "flex max-h-[320px] flex-col overflow-y-auto rounded-md border border-border py-1",
				children: u ? /* @__PURE__ */ Z("div", {
					className: "px-3 py-2 text-[13px] text-text-tertiary",
					children: "Loading…"
				}) : v.length === 0 ? /* @__PURE__ */ Z("div", {
					className: "px-3 py-2 text-[13px] text-text-tertiary",
					"data-testid": `${f}-empty`,
					children: l
				}) : v.map((e) => {
					let n = e.id === b?.id;
					return /* @__PURE__ */ Q("button", {
						type: "button",
						role: "option",
						"aria-selected": n,
						"aria-disabled": e.disabled || void 0,
						title: e.disabled ? e.disabledReason : void 0,
						"data-option-id": e.id,
						"data-testid": `${f}-option-${e.id}`,
						onClick: () => {
							e.disabled || g(e.id);
						},
						onDoubleClick: () => x(e.id),
						className: t("flex w-full items-center gap-2.5 border-none py-1.5 pr-3 text-left text-[13px] font-[inherit]", vt[Math.min(e.depth ?? 0, vt.length - 1)], e.disabled ? "cursor-not-allowed bg-transparent text-text-tertiary" : n ? "cursor-pointer bg-primary-bg text-primary-fg" : "cursor-pointer bg-transparent text-text-primary hover:bg-surface-hover"),
						children: [e.icon && /* @__PURE__ */ Z("span", {
							className: "flex w-4 shrink-0 items-center justify-center",
							"aria-hidden": "true",
							children: e.icon
						}), /* @__PURE__ */ Q("span", {
							className: "flex min-w-0 flex-1 flex-col",
							children: [/* @__PURE__ */ Z("span", {
								className: "truncate",
								children: e.label
							}), (e.description || e.disabled && e.disabledReason) && /* @__PURE__ */ Z("span", {
								className: "truncate text-xs text-text-tertiary",
								children: e.disabled && e.disabledReason ? e.disabledReason : e.description
							})]
						})]
					}, e.id);
				})
			})]
		})
	});
}
var vt = [
	"pl-3",
	"pl-7",
	"pl-11",
	"pl-[3.75rem]",
	"pl-[4.75rem]",
	"pl-[5.75rem]"
], yt = "🔒";
function bt({ capabilityName: e, title: t, description: n, actionLabel: r, onAction: i, actions: a, icon: o, testId: s = "capability-denied-fallback" }) {
	let c = t ?? (e ? `${e} is unavailable` : "Feature unavailable"), l = n ?? (e ? `${e} is not enabled for this workspace. Contact your administrator to request access.` : "This feature is not enabled for your account. Contact your administrator to request access.");
	return /* @__PURE__ */ Z(le, {
		icon: o === null ? void 0 : o ?? yt,
		title: c,
		description: l,
		actionLabel: r,
		onAction: i,
		actions: a,
		testId: s
	});
}
//#endregion
//#region src/components/shared/ImageCompare.tsx
var xt = {
	square: "aspect-square",
	landscape: "aspect-[4/3]",
	portrait: "aspect-[3/4]",
	wide: "aspect-video"
};
function St({ images: e, label: n = "Image comparison", aspect: i = "landscape", fit: a = "contain", zoomable: o = !0, className: s, "data-testid": c }) {
	let [l, u] = Y(null), d = e.slice(0, 3);
	if (d.length === 0) return null;
	let f = t("block h-full w-full", a === "cover" ? "object-cover" : "object-contain");
	return /* @__PURE__ */ Q("div", {
		className: t("@container", s),
		"data-testid": c,
		children: [/* @__PURE__ */ Z("ul", {
			"aria-label": n,
			"data-ui-image-compare": d.length,
			className: t("m-0 grid list-none grid-cols-1 gap-3 p-0", d.length === 2 && "@md:grid-cols-2", d.length >= 3 && "@md:grid-cols-2 @2xl:grid-cols-3"),
			children: d.map((e, n) => {
				let r = /* @__PURE__ */ Z("span", {
					"data-image-compare-frame": !0,
					className: t("block w-full overflow-hidden rounded-lg bg-surface-inset", xt[i]),
					children: /* @__PURE__ */ Z("img", {
						src: e.src,
						alt: e.alt ?? e.label,
						loading: "lazy",
						draggable: !1,
						className: f
					})
				});
				return /* @__PURE__ */ Z("li", {
					"data-image-compare-pane": n,
					className: "min-w-0",
					children: /* @__PURE__ */ Q("figure", {
						className: "m-0 flex flex-col gap-1.5",
						children: [o ? /* @__PURE__ */ Z("button", {
							type: "button",
							"aria-label": `Enlarge ${e.label}`,
							onClick: () => u(n),
							className: "block w-full cursor-zoom-in rounded-lg border-0 bg-transparent p-0 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
							children: r
						}) : r, /* @__PURE__ */ Q("figcaption", {
							className: "flex min-w-0 flex-col gap-0.5",
							children: [/* @__PURE__ */ Q("span", {
								className: "flex min-w-0 items-center gap-2",
								children: [/* @__PURE__ */ Z("span", {
									"data-image-compare-label": !0,
									className: "truncate text-sm font-medium text-text-primary",
									title: e.label,
									children: e.label
								}), e.meta != null && e.meta !== !1 && /* @__PURE__ */ Z("span", {
									className: "shrink-0",
									children: e.meta
								})]
							}), e.description && /* @__PURE__ */ Z("span", {
								className: "truncate text-xs text-text-secondary",
								title: e.description,
								children: e.description
							})]
						})]
					})
				}, `${n}-${e.src}`);
			})
		}), o && /* @__PURE__ */ Z(r, {
			images: d.map((e) => ({
				src: e.src,
				alt: e.alt ?? e.label,
				caption: e.description ? `${e.label} · ${e.description}` : e.label
			})),
			openIndex: l,
			onNavigate: u,
			onClose: () => u(null)
		})]
	});
}
//#endregion
//#region src/components/shared/ShortcutsHelp.tsx
function Ct(e) {
	return e.rows ?? e.shortcuts ?? [];
}
function wt(e) {
	return e.action ?? e.label ?? "";
}
var Tt = [
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
function Et({ open: e, onClose: n, sections: r = Tt }) {
	return /* @__PURE__ */ Q(re, {
		open: e,
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
			/* @__PURE__ */ Z("div", {
				className: "text-base font-semibold text-text-primary mb-2.5",
				children: "Keyboard shortcuts"
			}),
			/* @__PURE__ */ Z("div", {
				className: "overflow-y-auto pr-1",
				children: r.map((e, n) => /* @__PURE__ */ Q("div", { children: [/* @__PURE__ */ Z("div", {
					className: t("text-[12px] font-bold text-text-primary uppercase tracking-[0.05em] mb-1.5", n === 0 ? "mt-0 pt-0" : "mt-4 pt-1.5 border-t border-border-subtle"),
					children: e.title
				}), /* @__PURE__ */ Z("div", { children: Ct(e).map((n, r) => /* @__PURE__ */ Q("div", {
					className: t("flex items-baseline justify-between py-1 text-[13px] gap-4", n.planned && "opacity-60"),
					"data-planned": n.planned ? "true" : void 0,
					children: [Array.isArray(n.keys) ? /* @__PURE__ */ Z("span", {
						className: "flex shrink-0 items-baseline gap-1",
						children: n.keys.map((e, r) => /* @__PURE__ */ Z("span", {
							className: t("font-mono text-[12px] border rounded px-1.5 py-px whitespace-nowrap shrink-0", n.planned ? "text-text-tertiary bg-surface border-border-subtle line-through" : "text-text-primary bg-surface-hover border-border"),
							children: e
						}, `${e}-${r}`))
					}) : /* @__PURE__ */ Z("span", {
						className: t("font-mono text-[12px] border rounded px-1.5 py-px whitespace-nowrap shrink-0", n.planned ? "text-text-tertiary bg-surface border-border-subtle line-through" : "text-text-primary bg-surface-hover border-border"),
						children: n.keys
					}), /* @__PURE__ */ Q("span", {
						className: "text-neutral text-right flex-1",
						children: [wt(n), n.planned && /* @__PURE__ */ Z("span", {
							className: "ml-1.5 text-[10px] uppercase tracking-wide text-text-tertiary",
							children: "planned"
						})]
					})]
				}, `${e.title}-${r}`)) })] }, e.title))
			}),
			/* @__PURE__ */ Z("div", {
				className: "flex justify-end mt-[18px]",
				children: /* @__PURE__ */ Z("button", {
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
var Dt = {
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
function Ot({ targetId: e = "main-content", children: t = "Skip to main content", className: n, onSkip: r }) {
	let [i, a] = Y(!1);
	return /* @__PURE__ */ Z("a", {
		href: `#${e}`,
		className: n,
		style: i ? Dt : fe,
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
function kt(e, t) {
	let [n, r] = Y(e), i = J(e), a = J(0), o = J(null);
	return G(() => {
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
	}, [e, t]), G(() => () => {
		o.current && clearTimeout(o.current);
	}, []), n;
}
function At({ message: e, politeness: t = "polite", atomic: n = !0, throttleMs: r = 0, role: i = "status", "data-testid": a }) {
	let o = kt(e, r);
	return /* @__PURE__ */ Z(de, {
		as: "div",
		"data-testid": a,
		children: /* @__PURE__ */ Z("div", {
			...i === "none" ? null : { role: i },
			"aria-live": t,
			"aria-atomic": n,
			children: o
		})
	});
}
//#endregion
//#region src/components/shared/StatCard.tsx
var jt = {
	positive: "text-[var(--color-success)]",
	negative: "text-[var(--color-danger)]",
	neutral: "text-[var(--color-text-secondary)]"
};
function Mt(e) {
	return e.tone ?? (e.direction === "up" ? "positive" : "negative");
}
function Nt({ label: e, value: n, accent: r = !1, danger: a = !1, hint: o, title: s, delta: c, sparklineData: l, to: u, as: d, onClick: f, mono: p = !1, size: m, className: h, style: g, "data-testid": _ }) {
	let v = i("StatCard", m, {
		comfortable: "md",
		compact: "sm"
	}), y = t("block rounded-lg border p-3 no-underline transition-colors", !r && !a && "bg-[var(--color-surface)] border-[var(--color-border)]", r && "bg-[var(--color-primary-soft)] border-l-[3px] border-l-[var(--color-primary)] border-[var(--color-border)]", a && "bg-[var(--color-danger-bg)] border-l-[3px] border-l-[var(--color-danger)] border-[var(--color-border)]", (u || f) && "hover:bg-[var(--color-surface-hover)] cursor-pointer", h), b = l && l.length > 0 ? l : null, x = null;
	if (c) {
		let e = Mt(c), n = c.direction === "up" ? "▲" : "▼", r = c.direction === "up" ? "+" : "-", i = c.suffix ?? "%", a = Math.abs(c.value), o = c["aria-label"] ?? `${c.direction} ${a}${i}`;
		x = /* @__PURE__ */ Q("div", {
			"data-testid": "stat-card-delta",
			"data-direction": c.direction,
			"data-tone": e,
			"aria-label": o,
			className: t("mt-1 text-[12px] font-medium leading-tight", jt[e]),
			children: [
				/* @__PURE__ */ Q("span", {
					"aria-hidden": "true",
					children: [n, " "]
				}),
				r,
				a,
				i
			]
		});
	}
	let S = /* @__PURE__ */ Q(X, { children: [
		/* @__PURE__ */ Z("div", {
			className: "text-[12px] uppercase tracking-wide text-[var(--color-text-tertiary)]",
			children: e
		}),
		/* @__PURE__ */ Q("div", {
			className: "mt-1 flex items-center gap-2",
			children: [/* @__PURE__ */ Z("div", {
				className: t(v === "sm" ? "text-sm font-semibold leading-5 text-[var(--color-text-primary)]" : "text-[24px] font-bold leading-tight text-[var(--color-text-primary)]", p && "font-mono"),
				children: n
			}), b && /* @__PURE__ */ Z(B, {
				data: b,
				width: 80,
				height: 20
			})]
		}),
		x,
		o != null && /* @__PURE__ */ Z("div", {
			className: t("mt-1 italic text-[var(--color-text-tertiary)]", v === "sm" ? "text-xs" : "text-[11px]"),
			children: o
		})
	] });
	return u ? d ? /* @__PURE__ */ Z(d, {
		to: u,
		title: s,
		"data-testid": _,
		className: y,
		style: g,
		children: S
	}) : /* @__PURE__ */ Z("a", {
		href: u,
		title: s,
		"data-testid": _,
		className: y,
		style: g,
		children: S
	}) : f ? /* @__PURE__ */ Z("button", {
		type: "button",
		onClick: f,
		title: s,
		"data-testid": _,
		className: t(y, "w-full text-left"),
		style: g,
		children: S
	}) : /* @__PURE__ */ Z("div", {
		"data-testid": _,
		title: s,
		className: y,
		style: g,
		children: S
	});
}
//#endregion
//#region src/components/shared/FullscreenToggle.tsx
function Pt({ target: t, label: n = "Full screen", exitLabel: r = "Exit full screen", onChange: i, size: a = "sm", variant: o = "ghost", "data-testid": s = "fullscreen-toggle", ...c }) {
	let l = e(t);
	if (!l.supported) return null;
	let u = l.active ? r : n;
	return /* @__PURE__ */ Z(_, {
		...c,
		size: a,
		variant: o,
		"aria-label": u,
		title: u,
		"aria-pressed": l.active,
		"data-testid": s,
		"data-fullscreen": l.active ? "true" : "false",
		icon: l.active ? /* @__PURE__ */ Z(S, { size: 16 }) : /* @__PURE__ */ Z(T, { size: 16 }),
		onClick: () => {
			l.toggle().then(() => i?.(!!t.current && document.fullscreenElement === t.current));
		}
	});
}
//#endregion
//#region src/components/shared/SuggestionCard.tsx
function Ft({ reason: e, title: n, label: r, tone: i = "neutral", meta: a, context: o, onSelect: s, actionLabel: c = "Use this", disabled: l = !1, className: u, "data-testid": d }) {
	return /* @__PURE__ */ Q("button", {
		type: "button",
		"data-testid": d,
		onClick: s,
		disabled: l,
		"aria-label": `${n} — ${e}`,
		className: t("group w-full text-left flex flex-col gap-1.5 rounded-lg border p-3 transition-colors", "border-border bg-surface hover:border-border-emphasis hover:bg-surface-hover", "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1", l ? "opacity-60 cursor-not-allowed" : "cursor-pointer", u),
		children: [
			/* @__PURE__ */ Q("span", {
				className: "flex items-center gap-2 min-w-0",
				children: [r && /* @__PURE__ */ Z("span", {
					className: t("shrink-0 text-[10px] font-semibold uppercase tracking-wide px-1.5 py-0.5 rounded", g[i]),
					children: r
				}), /* @__PURE__ */ Z("span", {
					className: "text-[11px] text-text-secondary truncate",
					children: e
				})]
			}),
			/* @__PURE__ */ Z("span", {
				className: "text-[13px] font-medium text-text-primary line-clamp-2",
				children: n
			}),
			(a || o) && /* @__PURE__ */ Q("span", {
				className: "flex items-center gap-2 text-[11px] text-text-tertiary min-w-0",
				children: [a, o && /* @__PURE__ */ Z("span", {
					className: "truncate",
					children: o
				})]
			}),
			/* @__PURE__ */ Q("span", {
				"aria-hidden": "true",
				className: "text-[11px] font-semibold text-primary opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity",
				children: [c, " →"]
			})
		]
	});
}
//#endregion
//#region src/components/shared/TaskComposer.tsx
function It({ title: e, description: n, titlePlaceholder: r = "Title", promptPlaceholder: i = "What should it do?", suggestions: o, suggestionsTitle: s = "Suggested next", suggestionsLoading: c = !1, suggestionsEmpty: l, onSubmit: u, onChooseSuggestion: d, submitLabel: f = "Queue", hint: p, busy: m = !1, className: h, "data-testid": g }) {
	let [_, v] = Y(""), [y, b] = Y(""), [x, S] = Y(void 0), C = K(), w = K();
	G(() => {
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
	return /* @__PURE__ */ Q("section", {
		"data-testid": g,
		className: t("rounded-lg border border-border bg-surface overflow-hidden", h),
		children: [
			/* @__PURE__ */ Q("div", {
				className: "px-3.5 pt-3 pb-1",
				children: [/* @__PURE__ */ Z("h3", {
					className: "text-xs font-semibold text-text-secondary tracking-wide select-none uppercase",
					children: e
				}), n && /* @__PURE__ */ Z("p", {
					className: "mt-1 text-[12px] text-text-tertiary",
					children: n
				})]
			}),
			O && /* @__PURE__ */ Q("div", {
				className: "px-3.5 pt-2 pb-1",
				children: [/* @__PURE__ */ Z("div", {
					className: "text-[11px] font-semibold text-text-tertiary tracking-wide uppercase mb-2",
					children: s
				}), c ? /* @__PURE__ */ Z("div", {
					className: "grid gap-2 sm:grid-cols-2 lg:grid-cols-4",
					"aria-busy": "true",
					children: [
						0,
						1,
						2,
						3
					].map((e) => /* @__PURE__ */ Z("div", { className: "h-[92px] rounded-lg border border-border bg-surface-panel animate-pulse" }, e))
				}) : (o?.length ?? 0) > 0 ? /* @__PURE__ */ Z("div", {
					className: "grid gap-2 sm:grid-cols-2 lg:grid-cols-4",
					children: o.map((e) => /* @__PURE__ */ Z(Ft, {
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
				}) : /* @__PURE__ */ Z("div", {
					className: "text-[12px] text-text-tertiary",
					children: l
				})]
			}),
			/* @__PURE__ */ Q("div", {
				className: "px-3.5 pt-2 pb-2 flex flex-col gap-2",
				children: [
					/* @__PURE__ */ Z("label", {
						className: "sr-only",
						htmlFor: C,
						children: r
					}),
					/* @__PURE__ */ Z(ae, {
						id: C,
						value: _,
						onChange: (e) => v(e.target.value),
						placeholder: r,
						disabled: m
					}),
					/* @__PURE__ */ Z("label", {
						className: "sr-only",
						htmlFor: w,
						children: i
					}),
					/* @__PURE__ */ Z(me, {
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
			/* @__PURE__ */ Q("div", {
				className: "px-3.5 pb-3 flex items-center gap-3",
				children: [
					p && /* @__PURE__ */ Z("span", {
						className: "text-[11px] text-text-tertiary select-none",
						children: p
					}),
					/* @__PURE__ */ Z("span", { className: "flex-1" }),
					/* @__PURE__ */ Z(a, {
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
var Lt = 4, Rt = 3;
function zt({ name: e, title: n, subtitle: r, imageUrl: i, matchedSkills: o, otherSkills: s = [], contexts: c = [], evidence: l = [], evidenceLabel: u = "Seen in", onAsk: d, askLabel: f = "Ask for help", footerExtra: m, onOpen: h, className: g, "data-testid": _ }) {
	let v = s.filter((e) => !o.some((t) => t.name.toLowerCase() === e.toLowerCase())), y = l.slice(0, Rt), b = v.slice(0, Lt);
	return /* @__PURE__ */ Q("div", {
		"data-testid": _,
		onClick: h,
		className: t("flex flex-col gap-2.5 rounded-lg border border-border bg-surface p-3.5 min-w-0", h && "cursor-pointer hover:border-border-emphasis hover:bg-surface-hover transition-colors", g),
		children: [
			/* @__PURE__ */ Q("div", {
				className: "flex items-center gap-2.5 min-w-0",
				children: [/* @__PURE__ */ Z(V, {
					name: e,
					size: 36,
					...i ? { src: i } : {}
				}), /* @__PURE__ */ Q("div", {
					className: "flex flex-col min-w-0",
					children: [/* @__PURE__ */ Z("span", {
						className: "text-[13.5px] font-semibold text-text-primary truncate",
						children: e
					}), (n || r) && /* @__PURE__ */ Q("span", {
						className: "text-[11.5px] text-text-secondary truncate",
						children: [
							n,
							n && r ? " · " : "",
							r
						]
					})]
				})]
			}),
			o.length > 0 && /* @__PURE__ */ Q("div", {
				className: "flex flex-wrap items-center gap-1",
				children: [
					o.map((e) => /* @__PURE__ */ Z(p, {
						tone: "accent",
						size: "xs",
						solid: (e.strength ?? 0) >= .7,
						children: e.name
					}, e.name)),
					b.map((e) => /* @__PURE__ */ Z(p, {
						tone: "neutral",
						size: "xs",
						children: e
					}, e)),
					v.length > Lt && /* @__PURE__ */ Q("span", {
						className: "text-xs text-text-tertiary",
						children: ["+", v.length - Lt]
					})
				]
			}),
			c.length > 0 && /* @__PURE__ */ Q("div", {
				className: "text-xs text-text-tertiary truncate",
				title: c.join(", "),
				children: ["Working on ", c.join(", ")]
			}),
			y.length > 0 && /* @__PURE__ */ Q("div", {
				className: "flex flex-col gap-1 min-w-0",
				children: [/* @__PURE__ */ Z("span", {
					className: "text-xs font-semibold uppercase tracking-wide text-text-tertiary select-none",
					children: u
				}), y.map((e) => /* @__PURE__ */ Q("div", {
					className: "flex items-center gap-1.5 min-w-0",
					children: [e.source && /* @__PURE__ */ Z(p, {
						tone: "neutral",
						size: "xs",
						mono: !0,
						children: e.source
					}), e.href ? /* @__PURE__ */ Z("a", {
						href: e.href,
						onClick: (e) => e.stopPropagation(),
						className: "text-[11.5px] text-text-secondary no-underline hover:underline truncate",
						children: e.title
					}) : /* @__PURE__ */ Z("span", {
						className: "text-[11.5px] text-text-secondary truncate",
						children: e.title
					})]
				}, e.id))]
			}),
			(d || m) && /* @__PURE__ */ Q("div", {
				className: "mt-auto pt-1 flex items-center gap-2",
				children: [
					m,
					/* @__PURE__ */ Z("span", { className: "flex-1" }),
					d && /* @__PURE__ */ Z(a, {
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
var Bt = {
	pending: "warning",
	answered: "success",
	expired: "neutral",
	withdrawn: "neutral"
};
function Vt({ question: e, context: n, origin: r = [], askedAt: i, status: o, answer: s, answeredBy: c, onAnswer: l, answerPlaceholder: u = "Answer the agent — it is waiting on this…", busy: d = !1, footer: f, flush: m = !1, className: h, "data-testid": g }) {
	let [_, v] = Y(""), y = _.trim().length > 0 && !d;
	function b() {
		!y || !l || (l(_.trim()), v(""));
	}
	return /* @__PURE__ */ Q("section", {
		"data-testid": g,
		className: t("flex flex-col gap-2.5 min-w-0", !m && "rounded-lg border bg-surface p-3.5", !m && (o === "pending" ? "border-warning/50" : "border-border"), h),
		children: [
			/* @__PURE__ */ Q("div", {
				className: "flex items-center gap-2 min-w-0",
				children: [
					/* @__PURE__ */ Z(p, {
						tone: Bt[o],
						size: "xs",
						dot: o === "pending" ? "pulse" : "static",
						uppercase: !0,
						children: o === "pending" ? "agent waiting" : o
					}),
					r.map((e) => /* @__PURE__ */ Z(p, {
						tone: "neutral",
						size: "xs",
						mono: !0,
						children: e
					}, e)),
					/* @__PURE__ */ Z("span", { className: "flex-1" }),
					i && /* @__PURE__ */ Z("span", {
						className: "text-xs text-text-tertiary whitespace-nowrap",
						children: i
					})
				]
			}),
			/* @__PURE__ */ Z("p", {
				className: "m-0 text-[13.5px] font-medium text-text-primary leading-snug",
				children: e
			}),
			n && /* @__PURE__ */ Z("p", {
				className: "m-0 text-[12px] text-text-secondary leading-snug border-l-2 border-border pl-2.5",
				children: n
			}),
			o === "answered" && s && /* @__PURE__ */ Q("div", {
				className: "flex flex-col gap-1",
				children: [/* @__PURE__ */ Q("span", {
					className: "text-xs font-semibold uppercase tracking-wide text-text-tertiary select-none",
					children: ["Answer", c ? ` — ${c}` : ""]
				}), /* @__PURE__ */ Z("p", {
					className: "m-0 text-[12.5px] text-text-primary leading-snug",
					children: s
				})]
			}),
			o === "expired" && /* @__PURE__ */ Z("p", {
				className: "m-0 text-[11.5px] text-text-tertiary",
				children: "Expired unanswered — the agent stopped waiting."
			}),
			o === "pending" && l && /* @__PURE__ */ Q("div", {
				className: "flex flex-col gap-2",
				children: [/* @__PURE__ */ Z(me, {
					value: _,
					onChange: (e) => v(e.target.value),
					placeholder: u,
					rows: 2,
					disabled: d,
					onKeyDown: (e) => {
						e.key === "Enter" && (e.metaKey || e.ctrlKey) && (e.preventDefault(), b());
					}
				}), /* @__PURE__ */ Q("div", {
					className: "flex items-center gap-2",
					children: [
						f,
						/* @__PURE__ */ Z("span", { className: "flex-1" }),
						/* @__PURE__ */ Z(a, {
							size: "sm",
							onClick: b,
							disabled: !y,
							children: d ? "Sending…" : "Send answer"
						})
					]
				})]
			}),
			(o !== "pending" || !l) && f && /* @__PURE__ */ Z("div", {
				className: "flex items-center gap-2",
				children: f
			})
		]
	});
}
//#endregion
//#region src/components/shared/DiffViewer.tsx
var Ht = /^@@ -(\d+)(?:,\d+)? \+(\d+)(?:,\d+)? @@/;
function Ut(e) {
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
		let e = a.match(Ht);
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
var Wt = {
	added: "success",
	deleted: "danger",
	renamed: "info",
	modified: "neutral"
}, Gt = {
	critical: "danger",
	warning: "warning",
	info: "info"
}, Kt = {
	add: "bg-success-bg/40",
	del: "bg-danger-bg/40",
	ctx: "",
	hunk: "bg-surface-hover"
};
function qt({ a: e }) {
	return /* @__PURE__ */ Q("div", {
		className: "flex items-start gap-2 px-3 py-2 font-sans border-y border-border bg-surface-panel",
		children: [/* @__PURE__ */ Z(p, {
			tone: Gt[e.severity ?? "info"],
			size: "md",
			uppercase: !0,
			children: e.severity ?? "note"
		}), /* @__PURE__ */ Q("div", {
			className: "min-w-0",
			children: [/* @__PURE__ */ Z("span", {
				className: "text-[12px] text-text-primary leading-snug",
				children: e.note
			}), e.author && /* @__PURE__ */ Q("span", {
				className: "ml-2 text-xs text-text-tertiary whitespace-nowrap",
				children: ["— ", e.author]
			})]
		})]
	});
}
function Jt({ file: e, annotations: n, collapsed: r, onToggle: i, maxLines: a }) {
	let { pinned: o, floating: s } = q(() => {
		let t = /* @__PURE__ */ new Map(), r = [], i = new Set(e.lines.filter((e) => e.newNo != null).map((e) => e.newNo));
		for (let e of n) if (e.line != null && i.has(e.line)) {
			let n = t.get(e.line) ?? [];
			n.push(e), t.set(e.line, n);
		} else r.push(e);
		return {
			pinned: t,
			floating: r
		};
	}, [e, n]), c = e.lines.slice(0, a), l = e.lines.length > a;
	return /* @__PURE__ */ Q("div", {
		className: "border border-border rounded-lg overflow-hidden bg-surface",
		children: [/* @__PURE__ */ Q("button", {
			type: "button",
			onClick: i,
			"aria-expanded": !r,
			className: "w-full flex items-center gap-2 px-3 py-2 bg-surface-panel border-0 cursor-pointer text-left hover:bg-surface-hover min-w-0",
			children: [
				/* @__PURE__ */ Z(A, {
					dir: r ? "right" : "down",
					size: 12,
					className: "shrink-0 text-text-tertiary"
				}),
				/* @__PURE__ */ Z("span", {
					className: "text-[12px] font-mono font-semibold text-text-primary truncate",
					children: e.oldPath ? `${e.oldPath} → ${e.path}` : e.path
				}),
				/* @__PURE__ */ Z(p, {
					tone: Wt[e.status],
					size: "md",
					children: e.status
				}),
				n.length > 0 && /* @__PURE__ */ Q(p, {
					tone: "warning",
					size: "md",
					mono: !0,
					children: [
						n.length,
						" note",
						n.length === 1 ? "" : "s"
					]
				}),
				/* @__PURE__ */ Z("span", { className: "flex-1" }),
				/* @__PURE__ */ Q("span", {
					className: "text-xs font-mono tabular-nums whitespace-nowrap",
					children: [
						/* @__PURE__ */ Q("span", {
							className: "text-success-fg",
							children: ["+", e.adds]
						}),
						" ",
						/* @__PURE__ */ Q("span", {
							className: "text-danger-fg",
							children: ["−", e.dels]
						})
					]
				})
			]
		}), !r && /* @__PURE__ */ Q("div", {
			"data-ui-diff-scroll": "",
			className: "overflow-x-auto",
			children: [s.map((e, t) => /* @__PURE__ */ Z(qt, { a: e }, `f${t}`)), e.binary ? /* @__PURE__ */ Z("div", {
				className: "px-3 py-2 text-[12px] text-text-tertiary",
				children: "Binary file — no text diff."
			}) : /* @__PURE__ */ Z("table", {
				"data-ui-table-rows": "code-diff",
				className: "w-full border-collapse font-mono text-xs leading-[1.5]",
				children: /* @__PURE__ */ Q("tbody", { children: [c.map((e, n) => e.kind === "hunk" ? /* @__PURE__ */ Z("tr", {
					className: Kt.hunk,
					children: /* @__PURE__ */ Z("td", {
						colSpan: 3,
						className: "px-3 py-0.5 text-xs text-text-tertiary select-none",
						children: e.text
					})
				}, n) : /* @__PURE__ */ Q(je, { children: [/* @__PURE__ */ Q("tr", {
					"data-diff-line": e.kind,
					className: Kt[e.kind],
					children: [
						/* @__PURE__ */ Z("td", {
							"data-diff-cell": "gutter",
							className: "w-[3.2em] px-1.5 text-right text-xs leading-[1.5] text-text-tertiary select-none align-top tabular-nums border-r border-border/60",
							children: e.oldNo ?? ""
						}),
						/* @__PURE__ */ Z("td", {
							"data-diff-cell": "gutter",
							className: "w-[3.2em] px-1.5 text-right text-xs leading-[1.5] text-text-tertiary select-none align-top tabular-nums border-r border-border/60",
							children: e.newNo ?? ""
						}),
						/* @__PURE__ */ Q("td", {
							"data-diff-cell": "code",
							className: t("px-2 whitespace-pre align-top", e.kind === "add" && "text-success-fg", e.kind === "del" && "text-danger-fg", e.kind === "ctx" && "text-text-secondary"),
							children: [/* @__PURE__ */ Z("span", {
								className: "select-none inline-block w-[1ch] mr-1 text-text-tertiary",
								children: e.kind === "add" ? "+" : e.kind === "del" ? "-" : " "
							}), e.text || " "]
						})
					]
				}), e.newNo != null && o.get(e.newNo)?.map((e, t) => /* @__PURE__ */ Z("tr", { children: /* @__PURE__ */ Z("td", {
					colSpan: 3,
					className: "p-0",
					children: /* @__PURE__ */ Z(qt, { a: e })
				}) }, `${n}-a${t}`))] }, n)), l && /* @__PURE__ */ Z("tr", { children: /* @__PURE__ */ Q("td", {
					colSpan: 3,
					className: "px-3 py-1.5 text-xs text-text-tertiary",
					children: [
						"… ",
						e.lines.length - a,
						" more lines in this file not shown."
					]
				}) })] })
			})]
		})]
	});
}
function Yt({ diff: e, annotations: n = [], defaultCollapsed: r = !1, maxLinesPerFile: i = 800, truncatedNote: a, className: o, "data-testid": s }) {
	let c = q(() => Ut(e), [e]), [l, u] = Y(() => r ? new Set(c.map((e) => e.path)) : /* @__PURE__ */ new Set()), d = J(/* @__PURE__ */ new Map()), f = q(() => {
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
	if (c.length === 0) return /* @__PURE__ */ Z("div", {
		"data-testid": s,
		className: t("text-[12px] text-text-tertiary", o),
		children: "No parseable diff."
	});
	let h = c.reduce((e, t) => e + t.adds, 0), g = c.reduce((e, t) => e + t.dels, 0);
	return /* @__PURE__ */ Q("div", {
		"data-testid": s,
		className: t("flex flex-col gap-2 min-w-0", o),
		children: [
			/* @__PURE__ */ Q("div", {
				className: "flex items-center gap-1.5 flex-wrap",
				children: [/* @__PURE__ */ Q("span", {
					className: "text-xs text-text-secondary font-medium whitespace-nowrap",
					children: [
						c.length,
						" file",
						c.length === 1 ? "" : "s",
						" ",
						/* @__PURE__ */ Q("span", {
							className: "font-mono tabular-nums",
							children: [
								/* @__PURE__ */ Q("span", {
									className: "text-success-fg",
									children: ["+", h]
								}),
								" ",
								/* @__PURE__ */ Q("span", {
									className: "text-danger-fg",
									children: ["−", g]
								})
							]
						})
					]
				}), c.map((e) => /* @__PURE__ */ Z("button", {
					type: "button",
					onClick: () => m(e.path),
					title: e.path,
					className: t("px-1.5 py-0.5 rounded border border-border bg-surface text-xs cursor-pointer", "text-text-secondary hover:border-border-emphasis hover:text-text-primary truncate max-w-[220px]", (f.get(e.path)?.length ?? 0) > 0 && "border-warning/60"),
					children: /* @__PURE__ */ Z("code", {
						className: "font-mono",
						children: e.path.split("/").pop()
					})
				}, e.path))]
			}),
			a && /* @__PURE__ */ Z("div", {
				className: "text-xs text-warning",
				children: a
			}),
			c.map((e) => /* @__PURE__ */ Z("div", {
				ref: (t) => {
					d.current.set(e.path, t);
				},
				children: /* @__PURE__ */ Z(Jt, {
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
var Xt = {
	1: "sm:grid-cols-1",
	2: "sm:grid-cols-2",
	3: "sm:grid-cols-3",
	4: "sm:grid-cols-4"
}, Zt = {
	1: "md:grid-cols-1",
	2: "md:grid-cols-2",
	3: "md:grid-cols-3",
	4: "md:grid-cols-4"
}, Qt = {
	1: "lg:grid-cols-1",
	2: "lg:grid-cols-2",
	3: "lg:grid-cols-3",
	4: "lg:grid-cols-4"
};
function $t({ children: e, columns: n = 4, mdColumns: r, dense: i = !1, className: a, style: o, "data-testid": s = "kpi-grid" }) {
	return /* @__PURE__ */ Z("div", {
		"data-testid": s,
		className: t("grid grid-cols-1", r ? void 0 : Xt[n], r && Zt[r], r && Qt[n], i ? "gap-2" : "gap-4", a),
		style: o,
		children: e
	});
}
//#endregion
//#region src/components/shared/Prose.tsx
var en = "max-w-none text-text-primary [&>*:first-child]:mt-0 [&>*:last-child]:mb-0 [&_h1]:font-semibold [&_h2]:font-semibold [&_h3]:font-semibold [&_h4]:font-semibold [&_h1]:pb-2 [&_h1]:border-b [&_h1]:border-border [&_h4]:pb-1 [&_h4]:border-b [&_h4]:border-border [&_p]:my-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:my-2 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:my-2 [&_li]:mb-1 [&_li]:last:mb-0 [&_blockquote]:border-l-2 [&_blockquote]:border-border [&_blockquote]:pl-3 [&_blockquote]:my-2 [&_blockquote]:italic [&_blockquote]:text-text-secondary [&_code]:font-mono [&_code]:text-[0.85em] [&_code]:rounded [&_code]:px-1 [&_code]:py-0.5 [&_code]:bg-surface-inset [&_pre]:font-mono [&_pre]:text-xs [&_pre]:rounded-md [&_pre]:border [&_pre]:border-border [&_pre]:bg-surface-inset [&_pre]:p-3 [&_pre]:overflow-x-auto [&_pre]:my-2 [&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_pre_code]:rounded-none [&_pre_code]:text-[inherit] [&_a]:underline-offset-2 [&_a:hover]:underline", tn = {
	sm: "text-[13px] leading-snug [&_h1]:text-sm [&_h2]:text-sm [&_h3]:text-[13px] [&_h4]:text-[13px] [&_h1]:mt-3 [&_h2]:mt-3 [&_h3]:mt-2.5 [&_h4]:mt-2.5 [&_h1]:mb-1.5 [&_h2]:mb-1.5 [&_h3]:mb-1 [&_h4]:mb-1",
	md: "text-sm leading-relaxed [&_h1]:text-xl [&_h2]:text-lg [&_h3]:text-base [&_h4]:text-sm [&_h1]:mt-6 [&_h2]:mt-5 [&_h3]:mt-4 [&_h4]:mt-4 [&_h1]:mb-3 [&_h2]:mb-2 [&_h3]:mb-1.5 [&_h4]:mb-1.5"
}, nn = "[&_h1]:text-text-primary [&_h2]:text-text-primary [&_h3]:text-text-primary [&_h4]:text-text-primary [&_a]:text-primary", rn = {
	neutral: "[&_h1]:text-neutral-fg [&_h2]:text-neutral-fg [&_h3]:text-neutral-fg [&_h4]:text-neutral-fg [&_a]:text-neutral-fg",
	success: "[&_h1]:text-success-fg [&_h2]:text-success-fg [&_h3]:text-success-fg [&_h4]:text-success-fg [&_a]:text-success-fg",
	warning: "[&_h1]:text-warning-fg [&_h2]:text-warning-fg [&_h3]:text-warning-fg [&_h4]:text-warning-fg [&_a]:text-warning-fg",
	danger: "[&_h1]:text-danger-fg [&_h2]:text-danger-fg [&_h3]:text-danger-fg [&_h4]:text-danger-fg [&_a]:text-danger-fg",
	info: "[&_h1]:text-info-fg [&_h2]:text-info-fg [&_h3]:text-info-fg [&_h4]:text-info-fg [&_a]:text-info-fg",
	caution: "[&_h1]:text-caution-fg [&_h2]:text-caution-fg [&_h3]:text-caution-fg [&_h4]:text-caution-fg [&_a]:text-caution-fg",
	accent: "[&_h1]:text-accent-fg [&_h2]:text-accent-fg [&_h3]:text-accent-fg [&_h4]:text-accent-fg [&_a]:text-accent-fg"
};
function an({ children: e, size: n = "md", tone: r, className: i, "data-testid": a }) {
	let o = r === void 0 ? void 0 : f(r);
	return /* @__PURE__ */ Z("div", {
		"data-testid": a,
		className: t(en, tn[n], o ? rn[o] : nn, i),
		children: e
	});
}
//#endregion
//#region src/components/shared/UserChip.tsx
function on({ name: e, label: n, avatarSize: r = 20, avatarColor: i, presence: a, onClick: o, className: s, style: c, title: l, labelClassName: u, "data-testid": d = "user-chip" }) {
	return /* @__PURE__ */ Q(o ? "button" : "span", {
		type: o ? "button" : void 0,
		onClick: o,
		title: l ?? e,
		"data-testid": d,
		className: t("inline-flex items-center gap-1.5 rounded-full px-1.5 py-0.5 text-[12px] text-text-primary", o && "hover:bg-surface-hover cursor-pointer transition-colors", !o && "cursor-default", s),
		style: c,
		children: [
			/* @__PURE__ */ Z(V, {
				name: e,
				size: r,
				color: i
			}),
			/* @__PURE__ */ Z("span", {
				className: t("font-medium leading-none", u),
				children: n ?? e
			}),
			a && /* @__PURE__ */ Z(ge, {
				state: a,
				size: "xs"
			})
		]
	});
}
//#endregion
//#region src/components/shared/EntityCell.tsx
function sn({ label: e, id: n, href: r, mono: i = !1, className: a, labelClassName: o }) {
	let s = /* @__PURE__ */ Z("span", {
		className: "truncate",
		children: e
	});
	return /* @__PURE__ */ Q("div", {
		className: t("flex flex-col min-w-0", a),
		children: [/* @__PURE__ */ Z("div", {
			className: t("font-medium text-[var(--color-text-primary)] truncate text-sm", o),
			children: r ? /* @__PURE__ */ Z("a", {
				href: r,
				className: "hover:text-[var(--color-primary)] hover:underline",
				children: s
			}) : s
		}), n && /* @__PURE__ */ Z("div", {
			className: t("text-[10px] font-mono text-[var(--color-text-tertiary)] truncate mt-0.5", i && "tracking-tight"),
			children: n
		})]
	});
}
//#endregion
//#region src/components/shared/CollapsibleSection.tsx
function cn(e, t) {
	if (!e || typeof window > "u") return t;
	try {
		let n = window.localStorage.getItem(e);
		return n === null ? t : n === "true";
	} catch {
		return t;
	}
}
function ln({ title: e, defaultOpen: n = !1, badge: r, actions: i, children: a, className: o, storageKey: s, density: c = "default", "data-testid": l }) {
	let [u, d] = Y(() => cn(s, n)), f = c === "compact", p = K(), m = J(null), h = J(null);
	return G(() => {
		if (s && !(typeof window > "u")) try {
			window.localStorage.setItem(s, String(u));
		} catch {}
	}, [u, s]), /* @__PURE__ */ Q("div", {
		className: t("shrink-0 border border-[var(--color-border)] rounded-lg overflow-hidden", o),
		children: [/* @__PURE__ */ Q("div", {
			className: "flex items-stretch bg-[var(--color-surface)]",
			children: [/* @__PURE__ */ Q("button", {
				type: "button",
				ref: m,
				"data-testid": l,
				className: t("flex-1 min-w-0 flex items-center justify-between bg-transparent hover:bg-[var(--color-surface-hover)] transition-colors text-left", f ? "px-2.5 py-1.5" : "px-4 py-3"),
				onClick: () => {
					if (u) {
						let e = typeof document > "u" ? null : document.activeElement;
						e && h.current?.contains(e) && m.current?.focus();
					}
					d((e) => !e);
				},
				"aria-expanded": u,
				"aria-controls": p,
				children: [/* @__PURE__ */ Z("span", {
					className: t("font-semibold text-[var(--color-text-primary)]", f ? "text-xs" : "text-sm"),
					children: e
				}), /* @__PURE__ */ Q("div", {
					className: "flex items-center gap-2",
					children: [r, /* @__PURE__ */ Z("svg", {
						className: t("text-[var(--color-text-tertiary)] transition-transform", f ? "w-3 h-3" : "w-4 h-4", u && "rotate-180"),
						viewBox: "0 0 16 16",
						fill: "none",
						"aria-hidden": "true",
						children: /* @__PURE__ */ Z("path", {
							d: "M4 6l4 4 4-4",
							stroke: "currentColor",
							strokeWidth: "1.5",
							strokeLinecap: "round",
							strokeLinejoin: "round"
						})
					})]
				})]
			}), i && /* @__PURE__ */ Z("div", {
				className: "flex items-center gap-2 pr-4 shrink-0",
				children: i
			})]
		}), u && /* @__PURE__ */ Z("div", {
			id: p,
			ref: h,
			className: "border-t border-[var(--color-border)] bg-surface",
			children: a
		})]
	});
}
//#endregion
//#region src/components/shared/useHeaderDensity.ts
var un = 48, dn = 1e3;
function fn(e) {
	if (typeof window > "u") return null;
	try {
		return window.localStorage.getItem(e) === "collapsed" ? "collapsed" : null;
	} catch {
		return null;
	}
}
function pn(e, t) {
	try {
		t ? window.localStorage.setItem(e, "collapsed") : window.localStorage.removeItem(e);
	} catch {}
}
function mn({ contentKind: e = "detail", containerHeight: t = null, preference: n = null, headerId: r = "page", scrollCollapse: i = !0 } = {}) {
	let a = ye(r, e), o = be(e), { density: s, collapsed: c } = ve({
		contentKind: e,
		containerHeight: t,
		preference: n
	}), [l, u] = Y(() => ({
		key: a,
		manual: fn(a)
	})), [d, f] = Y({
		key: a,
		on: !1
	}), p = l.key === a ? l.manual : fn(a), m = d.key === a && d.on;
	l.key !== a && u({
		key: a,
		manual: p
	}), d.key !== a && d.on && f({
		key: a,
		on: !1
	});
	let h = p === "collapsed" || p === null && (m && o || c), g = W(() => {
		h ? (pn(a, !1), u({
			key: a,
			manual: "expanded"
		}), f({
			key: a,
			on: !1
		})) : (pn(a, !0), u({
			key: a,
			manual: "collapsed"
		}));
	}, [h, a]), _ = J({
		enabled: !1,
		key: a
	});
	_.current = {
		enabled: i && o && p === null,
		key: a
	};
	let [v, y] = Y(null);
	return G(() => {
		if (!v) return;
		let e = 0, t = () => {
			e = Date.now();
		}, n = (t) => {
			if (!_.current.enabled || Date.now() - e > dn) return;
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
function hn({ title: e, description: n, category: r, categoryTone: i = "neutral", thumbnail: a, icon: o = "🧩", thumbnailHeight: s = 160, href: c, onClick: l, badge: u, meta: d, className: f, style: m, "data-testid": h = "thumbnail-card" }) {
	let g = t("group block w-full text-left bg-[var(--color-surface,#fff)]", "rounded-xl border border-[var(--color-border)] overflow-hidden", "transition-[box-shadow,transform] duration-150", (c || l) && "cursor-pointer hover:shadow-[0_8px_25px_rgba(0,0,0,0.08)] hover:-translate-y-0.5", f), _ = /* @__PURE__ */ Q(X, { children: [/* @__PURE__ */ Q("div", {
		"data-testid": `${h}-thumb`,
		className: t("relative flex items-center justify-center", "bg-gradient-to-br from-[var(--color-primary-bg,#eef2ff)] to-[var(--color-surface,#ffffff)]", "border-b border-[var(--color-border)]"),
		style: { height: s },
		children: [a ? /* @__PURE__ */ Z("img", {
			src: a,
			alt: "",
			className: "w-full h-full object-cover"
		}) : /* @__PURE__ */ Z("span", {
			className: "text-5xl opacity-50",
			"aria-hidden": !0,
			children: o
		}), u && /* @__PURE__ */ Z("span", {
			"data-testid": `${h}-badge`,
			className: "absolute top-2 right-2",
			children: u
		})]
	}), /* @__PURE__ */ Q("div", {
		className: "px-4 py-3",
		children: [
			/* @__PURE__ */ Q("div", {
				className: "flex items-center gap-2 mb-1.5",
				children: [r && /* @__PURE__ */ Z(p, {
					tone: i,
					size: "xs",
					"data-testid": `${h}-category`,
					children: r
				}), d && /* @__PURE__ */ Z("span", {
					className: "ml-auto",
					children: d
				})]
			}),
			/* @__PURE__ */ Z("div", {
				className: "text-[14px] font-semibold text-[var(--color-text-primary)] leading-snug",
				children: e
			}),
			n && /* @__PURE__ */ Z("div", {
				className: "mt-1 text-[12px] text-[var(--color-text-secondary)] leading-snug",
				children: n
			})
		]
	})] });
	return c ? /* @__PURE__ */ Z("a", {
		href: c,
		onClick: l,
		"data-testid": h,
		className: t(g, "no-underline text-inherit"),
		style: m,
		children: _
	}) : l ? /* @__PURE__ */ Z("button", {
		type: "button",
		onClick: l,
		"data-testid": h,
		className: t(g, "font-inherit"),
		style: m,
		children: _
	}) : /* @__PURE__ */ Z("div", {
		"data-testid": h,
		className: g,
		style: m,
		children: _
	});
}
//#endregion
//#region src/components/shared/CatalogGrid.tsx
var gn = {
	1: "grid-cols-[minmax(13rem,1fr)]",
	2: "grid-cols-[repeat(2,minmax(13rem,1fr))]",
	3: "grid-cols-[repeat(3,minmax(13rem,1fr))]",
	4: "grid-cols-[repeat(4,minmax(13rem,1fr))]",
	5: "grid-cols-[repeat(5,minmax(13rem,1fr))]"
}, _n = {
	1: "sm:grid-cols-1",
	2: "sm:grid-cols-2",
	3: "sm:grid-cols-2 lg:grid-cols-3",
	4: "sm:grid-cols-2 lg:grid-cols-4",
	5: "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
};
function vn({ children: e, columns: n = 3, dense: r = !1, variant: i = "tiles", className: a, style: o, "data-testid": s = "catalog-grid" }) {
	return /* @__PURE__ */ Z("div", {
		"data-testid": s,
		"data-columns": n,
		...i === "lanes" ? { "data-ui-board": "" } : {},
		className: t(i === "lanes" ? t("grid items-stretch overflow-x-auto", gn[n]) : t("grid grid-cols-1", _n[n]), r ? "gap-3" : "gap-5", a),
		style: o,
		children: e
	});
}
//#endregion
//#region src/components/shared/StackDiagram.tsx
function yn({ orientation: e, variant: n }) {
	if (n === "none") return null;
	let r = e === "vertical", i = n === "arrow" ? r ? "↓" : "→" : r ? "│" : "─";
	return /* @__PURE__ */ Z("div", {
		"data-testid": "stack-diagram-connector",
		"aria-hidden": !0,
		className: t("flex items-center justify-center text-[var(--color-text-tertiary)]", r ? "h-5 text-base" : "w-5 text-base"),
		children: i
	});
}
function bn({ layers: e, orientation: n = "vertical", connector: r = "arrow", className: i, style: a, "data-testid": o = "stack-diagram" }) {
	let s = n === "vertical";
	return /* @__PURE__ */ Z("div", {
		"data-testid": o,
		"data-orientation": n,
		"data-connector": r,
		className: t("flex", s ? "flex-col items-stretch" : "flex-row items-stretch flex-wrap", i),
		style: a,
		children: e.map((i, a) => {
			let o = f(i.tone ?? "neutral");
			return /* @__PURE__ */ Q("div", {
				className: t("flex", "flex-col"),
				children: [/* @__PURE__ */ Q("div", {
					"data-testid": "stack-diagram-layer",
					"data-tone": o,
					className: t("rounded-md border px-3 py-2", l[o], d[o], !s && "min-w-[140px]"),
					children: [/* @__PURE__ */ Q("div", {
						className: "flex items-center gap-2",
						children: [
							i.icon != null && /* @__PURE__ */ Z("span", {
								className: "shrink-0 text-[14px] leading-none",
								"aria-hidden": !0,
								children: i.icon
							}),
							/* @__PURE__ */ Z("span", {
								className: t("text-[12px] font-semibold", m[o]),
								children: i.label
							}),
							i.meta != null && /* @__PURE__ */ Z("span", {
								className: "ml-auto text-[10px] text-[var(--color-text-tertiary)] shrink-0",
								children: i.meta
							})
						]
					}), i.description != null && /* @__PURE__ */ Z("div", {
						className: "mt-0.5 text-[11px] leading-snug text-[var(--color-text-secondary)]",
						children: i.description
					})]
				}), a < e.length - 1 && /* @__PURE__ */ Z(yn, {
					orientation: n,
					variant: r
				})]
			}, i.id);
		})
	});
}
var xn = bn;
//#endregion
//#region src/components/shared/ChatComposer.tsx
function Sn({ value: e, onChange: n, onSubmit: r, disabled: i = !1, multiline: a = !1, placeholder: o, submitLabel: s = "→", className: c, style: l, autoFocus: u, maxRows: d = 4, "aria-label": f = "Message", "aria-labelledby": p, submitAriaLabel: m = "Send" }) {
	let h = !i && e.trim().length > 0, g = typeof s == "string" && /\p{L}|\p{N}/u.test(s) ? void 0 : m, _ = p ? void 0 : f, v = () => {
		h && r();
	}, y = (e) => {
		if (e.key === "Enter") {
			if (a && e.shiftKey) return;
			e.preventDefault(), v();
		}
	}, b = t("flex-1 px-3 py-2 text-sm rounded-lg border border-[var(--color-border-field,#d1d5db)] bg-surface text-[var(--color-text-primary)]", "placeholder:text-[var(--color-text-tertiary)]", "focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent", "resize-none", i && "opacity-50 cursor-not-allowed bg-[var(--color-surface-hover)]");
	return /* @__PURE__ */ Q("div", {
		className: t("flex items-end gap-2 p-3 border-t border-[var(--color-border)] bg-[var(--color-surface)]", c),
		style: l,
		children: [a ? /* @__PURE__ */ Z("textarea", {
			"aria-label": _,
			"aria-labelledby": p,
			className: b,
			value: e,
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
		}) : /* @__PURE__ */ Z("input", {
			type: "text",
			"aria-label": _,
			"aria-labelledby": p,
			className: b,
			value: e,
			onChange: (e) => n(e.target.value),
			onKeyDown: y,
			disabled: i,
			placeholder: o,
			autoFocus: u
		}), /* @__PURE__ */ Z("button", {
			type: "button",
			"aria-label": g,
			onClick: v,
			disabled: !h,
			className: t("px-3 py-2 rounded-lg text-sm font-semibold transition-colors flex-shrink-0", h ? "bg-[var(--color-primary)] text-white hover:opacity-90" : "bg-[var(--color-surface-hover)] text-[var(--color-text-tertiary)] cursor-not-allowed"),
			children: s
		})]
	});
}
//#endregion
//#region src/components/shared/ToolCallStrip.tsx
function Cn({ name: e, done: n, title: r, className: i }) {
	return /* @__PURE__ */ Q("span", {
		title: r,
		className: t("inline-flex items-center gap-1 text-[10.5px] font-mono px-2 py-0.5 rounded-full", n ? "bg-[var(--color-success-bg,#f0fdf4)] text-[var(--color-success,#16a34a)]" : "bg-[var(--color-info-bg,#eff6ff)] text-[var(--color-info,#1d4ed8)]", i),
		children: [e, n ? " ✓" : "…"]
	});
}
function wn({ toolCalls: e, className: n }) {
	return /* @__PURE__ */ Z("div", {
		className: t("flex flex-wrap gap-1.5 py-1", n),
		children: e.map((e) => /* @__PURE__ */ Z(Cn, {
			name: e.name,
			done: e.done
		}, e.id))
	});
}
//#endregion
//#region src/components/shared/MessageBubble.tsx
function Tn({ role: e, content: n, toolCalls: r, streaming: i = !1, agentName: a, userName: o, renderMarkdown: s, className: c }) {
	let l = e === "user" ? o || "You" : a || "Assistant";
	return /* @__PURE__ */ Q("div", {
		className: t("flex flex-col gap-1.5 py-3", c),
		children: [
			/* @__PURE__ */ Z("div", {
				className: "text-[11px] font-semibold uppercase tracking-wide text-[var(--color-text-tertiary)]",
				children: l
			}),
			r && r.length > 0 && /* @__PURE__ */ Z(wn, { toolCalls: r }),
			e === "user" ? /* @__PURE__ */ Z("div", {
				className: "text-sm text-[var(--color-text-primary)] whitespace-pre-wrap",
				children: n
			}) : /* @__PURE__ */ Z("div", {
				className: "text-sm text-[var(--color-text-primary)] prose-sm max-w-none",
				children: n ? s ? s(n) : /* @__PURE__ */ Z("span", {
					className: "whitespace-pre-wrap",
					children: n
				}) : i ? /* @__PURE__ */ Z(R, {}) : null
			})
		]
	});
}
//#endregion
//#region src/components/shared/ThinkingBlock.tsx
function En({ content: e, streaming: n = !1, defaultOpen: r = !1, className: i }) {
	let a = n || !e ? "Thinking" : "Thought";
	return /* @__PURE__ */ Q("details", {
		open: r,
		className: t("rounded-md border border-[var(--color-border)] overflow-hidden text-sm group", i),
		children: [/* @__PURE__ */ Q("summary", {
			className: "flex items-center gap-2 px-3 py-2 cursor-pointer select-none bg-[var(--color-surface)] hover:bg-[var(--color-surface-hover)] text-[var(--color-text-tertiary)] list-none",
			children: [
				/* @__PURE__ */ Z("svg", {
					className: "w-3.5 h-3.5 transition-transform group-open:rotate-90",
					xmlns: "http://www.w3.org/2000/svg",
					viewBox: "0 0 20 20",
					fill: "currentColor",
					"aria-hidden": "true",
					children: /* @__PURE__ */ Z("path", {
						fillRule: "evenodd",
						d: "M7.21 14.77a.75.75 0 010-1.06L10.94 10 7.21 6.29a.75.75 0 011.08-1.04l4.25 4.25a.75.75 0 010 1.06l-4.25 4.25a.75.75 0 01-1.08-.04z",
						clipRule: "evenodd"
					})
				}),
				/* @__PURE__ */ Z("span", {
					className: "text-[11px] font-semibold uppercase tracking-wide",
					children: a
				}),
				n && !e && /* @__PURE__ */ Z(R, { size: "sm" })
			]
		}), /* @__PURE__ */ Z("div", {
			className: "px-3 py-2 text-xs text-[var(--color-text-secondary)] italic border-t border-[var(--color-border)] bg-surface whitespace-pre-wrap leading-relaxed",
			children: e || /* @__PURE__ */ Z(R, {})
		})]
	});
}
//#endregion
//#region src/components/shared/QuickPromptGrid.tsx
function Dn({ prompts: e, onSelect: n, columns: r, title: i, className: a }) {
	let o = r ? `repeat(${r}, minmax(0, 1fr))` : "repeat(auto-fit, minmax(220px, 1fr))";
	return /* @__PURE__ */ Q("div", {
		className: t("flex flex-col gap-3", a),
		children: [i && /* @__PURE__ */ Z("p", {
			className: "text-xs font-semibold uppercase tracking-wide text-[var(--color-text-tertiary)] text-center",
			children: i
		}), /* @__PURE__ */ Z("div", {
			style: {
				display: "grid",
				gridTemplateColumns: o,
				gap: 10
			},
			children: e.map((e, t) => /* @__PURE__ */ Q("button", {
				type: "button",
				onClick: () => n(e.label),
				className: "flex flex-col gap-1 px-4 py-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] hover:bg-[var(--color-surface-hover)] hover:border-[var(--color-border-emphasis,#cbd5e1)] text-left transition-colors",
				children: [/* @__PURE__ */ Z("span", {
					className: "text-sm font-medium text-[var(--color-text-primary)]",
					children: e.label
				}), e.hint && /* @__PURE__ */ Z("span", {
					className: "text-xs text-[var(--color-text-tertiary)]",
					children: e.hint
				})]
			}, t))
		})]
	});
}
//#endregion
//#region src/components/shared/UserMenu.tsx
function On({ user: e, items: n, className: r, "data-testid": i }) {
	let [a, o] = Y(!1), s = J(null), c = W(() => o(!1), []);
	return G(() => {
		if (!a) return;
		let e = (e) => {
			s.current && !s.current.contains(e.target) && c();
		};
		return document.addEventListener("mousedown", e), () => document.removeEventListener("mousedown", e);
	}, [a, c]), ue(a, c), /* @__PURE__ */ Q("div", {
		ref: s,
		"data-testid": i,
		className: t("relative inline-block", r),
		children: [/* @__PURE__ */ Q("button", {
			type: "button",
			"aria-label": `User menu for ${e.name}`,
			"aria-expanded": a,
			"aria-haspopup": "menu",
			onClick: () => o((e) => !e),
			className: t("flex items-center gap-2 bg-transparent border-none cursor-pointer p-1 rounded-lg", "hover:bg-[var(--color-surface-hover)] transition-colors duration-100", a && "bg-[var(--color-surface-hover)]"),
			children: [
				e.avatarUrl ? /* @__PURE__ */ Z("img", {
					src: e.avatarUrl,
					alt: e.name,
					className: "w-8 h-8 rounded-full object-cover"
				}) : /* @__PURE__ */ Z(V, {
					name: e.name,
					size: 32
				}),
				/* @__PURE__ */ Q("div", {
					className: "flex flex-col items-start text-left min-w-0 hidden sm:flex",
					children: [/* @__PURE__ */ Z("span", {
						className: "text-sm font-medium text-[var(--color-text-primary)] leading-tight truncate max-w-[120px]",
						children: e.name
					}), /* @__PURE__ */ Z("span", {
						className: "text-xs text-[var(--color-text-tertiary)] leading-tight truncate max-w-[120px]",
						children: e.email
					})]
				}),
				/* @__PURE__ */ Z("svg", {
					width: "12",
					height: "12",
					viewBox: "0 0 12 12",
					fill: "none",
					"aria-hidden": "true",
					className: t("text-[var(--color-text-tertiary)] transition-transform duration-150", a ? "rotate-180" : "rotate-0"),
					children: /* @__PURE__ */ Z("path", {
						d: "M2 4l4 4 4-4",
						stroke: "currentColor",
						strokeWidth: "1.5",
						strokeLinecap: "round",
						strokeLinejoin: "round"
					})
				})
			]
		}), a && /* @__PURE__ */ Q("div", {
			role: "menu",
			"aria-label": "User menu",
			className: t("absolute right-0 top-[calc(100%+6px)] min-w-[200px] z-[200]", "bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl shadow-md overflow-hidden"),
			children: [/* @__PURE__ */ Q("div", {
				className: "px-3 py-2.5 border-b border-[var(--color-border)]",
				children: [/* @__PURE__ */ Z("p", {
					className: "text-sm font-semibold text-[var(--color-text-primary)] truncate",
					children: e.name
				}), /* @__PURE__ */ Z("p", {
					className: "text-xs text-[var(--color-text-tertiary)] truncate",
					children: e.email
				})]
			}), /* @__PURE__ */ Z("div", {
				className: "py-1",
				children: n.map((e, n) => /* @__PURE__ */ Q("div", { children: [e.separator && n > 0 && /* @__PURE__ */ Z("div", { className: "my-1 border-t border-[var(--color-border)]" }), /* @__PURE__ */ Q("button", {
					type: "button",
					role: "menuitem",
					onClick: () => {
						e.onClick(), c();
					},
					className: t("flex items-center gap-2.5 w-full text-left px-3 py-2", "text-sm border-none cursor-pointer font-[inherit] transition-colors duration-100", e.danger ? "text-danger-fg bg-transparent hover:bg-danger-bg" : "text-[var(--color-text-primary)] bg-transparent hover:bg-[var(--color-surface-hover)]"),
					children: [e.icon && /* @__PURE__ */ Z("span", {
						className: "shrink-0 text-base leading-none",
						"aria-hidden": "true",
						children: e.icon
					}), e.label]
				})] }, n))
			})]
		})]
	});
}
//#endregion
//#region src/components/shared/ProjectCard.tsx
var kn = {
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
}, An = {
	bg: "var(--color-surface-hover)",
	border: "var(--color-border-field)",
	text: "var(--color-text-primary)",
	accent: "var(--color-neutral)"
};
function jn({ status: e, colors: t }) {
	return /* @__PURE__ */ Q("span", {
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
		children: [/* @__PURE__ */ Z("span", { style: {
			width: 5,
			height: 5,
			borderRadius: "50%",
			background: t.accent
		} }), e.replace(/_/g, " ")]
	});
}
function Mn({ name: e, id: t, status: n, statusColors: r, contributorNames: i = [], contributorCount: a, activityItems: o = [], presenceDotColor: s = "var(--color-border-field)", activityLabel: c = "", cardIndex: l = 0, onClick: u, className: d, style: f, minHeight: p = 190 }) {
	let m = {
		...kn,
		...r
	}[(n ?? "unknown").toLowerCase().replace(/ /g, "_")] ?? An, h = a === void 0 ? 0 : Math.max(0, a - i.length), g = l % 8 * 525;
	return /* @__PURE__ */ Q(u ? "button" : "div", {
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
			/* @__PURE__ */ Q("div", {
				style: {
					display: "flex",
					alignItems: "flex-start",
					justifyContent: "space-between",
					gap: 8
				},
				children: [/* @__PURE__ */ Q("div", {
					style: {
						flex: 1,
						minWidth: 0
					},
					children: [/* @__PURE__ */ Z("h3", {
						style: {
							margin: "0 0 3px",
							fontSize: 13.5,
							fontWeight: 700,
							color: "var(--color-text-primary, #111827)",
							lineHeight: 1.35
						},
						children: e
					}), t && /* @__PURE__ */ Z("span", {
						style: {
							fontSize: 10,
							fontFamily: "ui-monospace, \"SFMono-Regular\", Menlo, monospace",
							color: "var(--color-text-tertiary)",
							letterSpacing: "0.02em"
						},
						children: t
					})]
				}), n && /* @__PURE__ */ Z(jn, {
					status: n,
					colors: m
				})]
			}),
			/* @__PURE__ */ Z(xe, {
				items: o,
				staggerMs: g
			}),
			/* @__PURE__ */ Q("div", {
				style: {
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
					paddingTop: 8,
					borderTop: "1px solid var(--color-border-subtle, #f3f4f6)",
					gap: 8
				},
				children: [/* @__PURE__ */ Q("div", {
					style: {
						display: "flex",
						alignItems: "center",
						gap: 8,
						minWidth: 0
					},
					children: [i.length > 0 ? /* @__PURE__ */ Z(he, {
						names: i,
						maxVisible: 5,
						size: 24
					}) : /* @__PURE__ */ Q("span", {
						style: {
							fontSize: 12,
							color: "var(--color-text-tertiary)"
						},
						children: [/* @__PURE__ */ Z("strong", {
							style: { color: "var(--color-text-primary)" },
							children: a ?? 0
						}), " contributors"]
					}), i.length > 0 && h > 0 && /* @__PURE__ */ Q("span", {
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
				}), c && /* @__PURE__ */ Q("div", {
					style: {
						display: "flex",
						alignItems: "center",
						gap: 5,
						flexShrink: 0
					},
					children: [/* @__PURE__ */ Z("span", { style: {
						width: 6,
						height: 6,
						borderRadius: "50%",
						background: s,
						flexShrink: 0
					} }), /* @__PURE__ */ Z("span", {
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
var Nn = 1180, Pn = 768;
function Fn(e, t = {}) {
	let n = e.pathname.split("/").filter(Boolean), r = n.length > 0 && t.prefixes?.includes(n[0]) ? n.slice(1) : n, i = e.search ?? "", a = new URLSearchParams(i.startsWith("?") ? i.slice(1) : i), o = (t.drillParams ?? []).some((e) => a.get(e)), s = Math.max(1, r.length) + +!!o;
	return t.explored && !o && (s += 2), (t.leafRoutes ?? []).some((t) => t.test(e.pathname)) && (s = Math.max(s, 3)), s;
}
function In(e) {
	return e >= 3 ? "deep" : "shallow";
}
function Ln(e, t) {
	return `${e}.${t}`;
}
function Rn(e) {
	return e === "collapsed" || e !== "open" && null;
}
var zn = Me("shallow");
function Bn({ band: e, children: t }) {
	return /* @__PURE__ */ Z(zn.Provider, {
		value: e,
		children: t
	});
}
function Vn() {
	return Pe(zn);
}
function Hn(e) {
	if (typeof window > "u") return null;
	try {
		return Rn(window.localStorage.getItem(e));
	} catch {
		return null;
	}
}
function Un({ storageKey: e, band: t, defaultFolded: n = !1 }) {
	let r = Vn(), i = t ?? r, [a, o] = Y(() => ({
		shallow: Hn(Ln(e, "shallow")),
		deep: Hn(Ln(e, "deep"))
	})), [s, c] = Y(e);
	s !== e && (c(e), o({
		shallow: Hn(Ln(e, "shallow")),
		deep: Hn(Ln(e, "deep"))
	}));
	let l = a[i], u = l ?? n;
	return {
		folded: u,
		toggle: W(() => {
			let t = !u;
			o((e) => ({
				...e,
				[i]: t
			}));
			try {
				window.localStorage.setItem(Ln(e, i), t ? "collapsed" : "open");
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
function Wn() {
	let [e, t] = Y(() => typeof window > "u" ? 1680 : window.innerWidth);
	return G(() => {
		let e = () => t(window.innerWidth);
		return window.addEventListener("resize", e), () => window.removeEventListener("resize", e);
	}, []), e;
}
//#endregion
//#region src/components/shared/RailNavList.tsx
var Gn = t("flex w-full min-w-0 items-center gap-2.5 rounded-md border-0 bg-transparent px-2.5 py-[6px] text-left", Ce, "text-text-primary no-underline [font-family:inherit]", "transition-colors duration-100 hover:bg-surface-hover", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary");
function Kn({ items: e, currentStyle: n = "weight", "aria-label": r = "Views", className: i, "data-testid": a = "rail-nav-list" }) {
	return e.length === 0 ? null : /* @__PURE__ */ Z("nav", {
		"aria-label": r,
		className: t("min-w-0", i),
		"data-testid": a,
		children: /* @__PURE__ */ Z("ul", {
			className: "m-0 flex list-none flex-col p-0",
			children: e.map((e) => {
				let r = /* @__PURE__ */ Q(X, { children: [
					e.icon != null && /* @__PURE__ */ Z("span", {
						className: "flex shrink-0 items-center text-text-secondary",
						children: e.icon
					}),
					/* @__PURE__ */ Z("span", {
						className: "min-w-0 flex-1 truncate",
						title: e.label,
						"data-ui-text": "rail-item",
						children: e.label
					}),
					typeof e.count == "number" && /* @__PURE__ */ Z("span", {
						className: t("shrink-0", "text-[12px] font-medium leading-4 tabular-nums text-text-secondary"),
						"aria-label": `${e.count} items`,
						"data-testid": `${a}-count-${e.id}`,
						children: e.count
					})
				] }), i = {
					className: t(Gn, e.current && n === "weight" && "font-semibold", e.current && n === "tint" && "bg-primary/10", e.disabled ? "cursor-default opacity-60 hover:bg-transparent" : "cursor-pointer"),
					"data-testid": `${a}-item-${e.id}`,
					"data-current": e.current || void 0,
					"aria-current": e.current ? "page" : void 0
				};
				return /* @__PURE__ */ Z("li", {
					className: "min-w-0",
					children: e.href && !e.disabled ? /* @__PURE__ */ Z("a", {
						href: e.href,
						onClick: (t) => {
							e.onNavigate?.(t), e.onSelect?.();
						},
						...i,
						children: r
					}) : /* @__PURE__ */ Z("button", {
						type: "button",
						disabled: e.disabled,
						title: e.disabled ? e.disabledReason : void 0,
						onClick: () => {
							e.disabled || e.onSelect?.();
						},
						...i,
						children: r
					})
				}, e.id);
			})
		})
	});
}
//#endregion
//#region src/components/shared/StackedRail.tsx
var qn = "border-y-0 border-r-0 border-l-[3px] border-solid border-transparent px-[14px]", Jn = t("flex w-full min-w-0 items-center gap-2.5 bg-transparent text-left", qn, Ee, Ce, "text-text-primary no-underline [font-family:inherit]", "transition-colors duration-100 hover:bg-surface-hover", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"), Yn = "border-l-primary", Xn = Ee, Zn = "flex h-5 w-[18px] shrink-0 items-center justify-start text-text-secondary";
function Qn({ cancelGap: e, children: n }) {
	return /* @__PURE__ */ Z("span", {
		className: t("flex shrink-0", e),
		"data-rail-gutter": "",
		children: n
	});
}
var $n = t("sr-only flex shrink-0 items-center gap-0.5", "group-hover/head:not-sr-only", "group-has-[:focus-visible]/head:not-sr-only", "group-data-[current]/head:not-sr-only", "has-[[aria-expanded=true]]:not-sr-only", "[@media(hover:none)]:not-sr-only"), er = "hidden shrink-0 items-center pr-1 group-hover/row:flex group-focus-within/row:flex has-[[aria-expanded=true]]:flex";
function tr(e) {
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
function nr(e) {
	return Array.isArray(e) && e.every((e) => e && typeof e == "object" && "label" in e && "onClick" in e);
}
function rr({ actions: e, className: t, testId: n }) {
	if (e == null || e === !1) return null;
	let r = {
		className: t ?? "flex shrink-0 items-center gap-0.5",
		...n ? { "data-testid": n } : {}
	};
	return nr(e) ? e.length === 0 ? null : /* @__PURE__ */ Z("span", {
		...r,
		children: e.map((e) => /* @__PURE__ */ Z(_, {
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
	}) : /* @__PURE__ */ Z("span", {
		...r,
		children: e
	});
}
function ir({ actions: e, title: t, testId: n }) {
	return !nr(e) || e.length < 2 ? /* @__PURE__ */ Z(rr, { actions: e }) : /* @__PURE__ */ Q(X, { children: [/* @__PURE__ */ Z(rr, {
		actions: e,
		className: "flex shrink-0 items-center gap-0.5 @max-[15rem]:hidden",
		testId: `${n}-actions`
	}), /* @__PURE__ */ Z("span", {
		className: "hidden shrink-0 items-center @max-[15rem]:flex",
		"data-testid": `${n}-actions-fold`,
		children: /* @__PURE__ */ Z(pe, {
			trigger: /* @__PURE__ */ Z(x, { size: 14 }),
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
function ar(e, t) {
	return e.some((e) => t(e) || ar(e.children ?? [], t));
}
function or({ title: e, count: n, actions: r, groups: i, selectedId: a = null, currentStyle: o = "tint", "aria-label": s = "Navigation", className: c, "data-testid": l = "stacked-rail" }) {
	let u = J(null), [d, f] = Y({}), [p, m] = Y({}), [h, g] = Y(null), _ = (e) => e.collapsible === !1 ? !0 : e.onToggle && e.open !== void 0 ? e.open : d[e.id] ?? e.open ?? !0, v = (e, t) => {
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
	}, O = (e, n) => {
		let r = e.children ?? [], i = r.length > 0, a = i && y(e), s = C(e), c = `r:${e.id}`, u = e.testId ?? `${l}-row-${e.id}`, d = typeof e.menu == "function" ? e.menu(e) : e.menu, f = (t) => {
			if (e.disabled) {
				t?.preventDefault();
				return;
			}
			t && e.onNavigate?.(t), e.onSelect?.(), i && !e.href && !e.onSelect && b(e, !a);
		}, p = /* @__PURE__ */ Q(X, { children: [
			(n > 0 || i) && /* @__PURE__ */ Q(Qn, {
				cancelGap: "-mr-2.5",
				children: [Array.from({ length: n }, (e, t) => /* @__PURE__ */ Z("span", {
					className: "flex h-5 w-[18px] shrink-0 items-center justify-start text-text-secondary",
					"data-rail-step": "indent"
				}, t)), i && /* @__PURE__ */ Z("span", {
					className: "flex h-5 w-[18px] shrink-0 items-center justify-start text-text-secondary",
					"data-rail-step": "caret",
					"data-testid": `${u}-caret`,
					onClick: (t) => {
						t.preventDefault(), t.stopPropagation(), b(e, !a);
					},
					children: /* @__PURE__ */ Z(we, { open: a })
				})]
			}),
			e.icon != null && /* @__PURE__ */ Z("span", {
				className: "flex shrink-0 items-center text-text-secondary",
				children: e.icon
			}),
			/* @__PURE__ */ Z("span", {
				className: "min-w-0 flex-1 truncate",
				title: e.label,
				"data-ui-text": "rail-item",
				children: e.label
			}),
			e.meta !== void 0 && e.meta !== "" && /* @__PURE__ */ Z("span", {
				className: t("shrink-0", "text-[12px] font-medium leading-4 tabular-nums text-text-secondary"),
				"data-testid": `${u}-meta`,
				"data-meta-kind": typeof e.meta == "number" ? "count" : "text",
				...typeof e.meta == "number" ? { "aria-label": `${e.meta} items` } : {},
				children: e.meta
			}),
			e.trailing != null && e.trailing !== !1 && /* @__PURE__ */ Z("span", {
				className: "flex h-5 shrink-0 items-center",
				"data-testid": `${u}-trailing`,
				children: e.trailing
			})
		] }), m = {
			className: t(Jn, s && Yn, s && (o === "tint" ? "bg-primary/8" : "font-semibold"), e.disabled ? "cursor-default opacity-60 hover:bg-transparent" : "cursor-pointer", e.pending && "opacity-60"),
			"data-testid": u,
			"data-rail-key": c,
			"data-current": s || void 0,
			"data-depth": n,
			"data-pending": e.pending || void 0,
			"aria-current": s ? "page" : void 0,
			"aria-expanded": i ? a : void 0,
			"aria-busy": e.pending || void 0,
			"aria-disabled": e.disabled || void 0,
			title: e.disabled ? e.disabledReason : void 0,
			tabIndex: T === c ? 0 : -1,
			onFocus: () => g(c),
			...tr(e)
		};
		return /* @__PURE__ */ Q("li", {
			className: "min-w-0",
			children: [/* @__PURE__ */ Q("div", {
				className: "group/row flex min-w-0 items-center",
				children: [e.href && !e.disabled ? /* @__PURE__ */ Z("a", {
					href: e.href,
					onClick: (e) => f(e),
					...m,
					children: p
				}) : /* @__PURE__ */ Z("button", {
					type: "button",
					onClick: () => f(),
					...m,
					children: p
				}), d != null && d !== !1 && /* @__PURE__ */ Z("span", {
					className: er,
					"data-testid": `${u}-menu`,
					children: d
				})]
			}), a && /* @__PURE__ */ Z("ul", {
				className: "m-0 flex list-none flex-col p-0",
				"data-testid": `${u}-children`,
				children: r.map((e) => O(e, n + 1))
			})]
		}, e.id);
	}, k = i.length > 0, A = `${l}-title`;
	return !k && !e ? null : /* @__PURE__ */ Q("nav", {
		ref: u,
		"aria-label": s,
		className: t("flex min-w-0 flex-col", c),
		"data-testid": l,
		onKeyDown: D,
		children: [e && /* @__PURE__ */ Q("div", {
			className: t("@container flex h-9 min-w-0 items-center gap-2", qn),
			children: [
				/* @__PURE__ */ Z(Qn, {
					cancelGap: "-mr-2",
					children: /* @__PURE__ */ Z("span", {
						className: "flex h-5 w-[18px] shrink-0 items-center justify-start text-text-secondary",
						"data-rail-step": "caption"
					})
				}),
				/* @__PURE__ */ Z("span", {
					className: t("min-w-0 truncate", "text-[12px] font-semibold uppercase leading-4 tracking-wide", "text-text-secondary"),
					title: e,
					"data-testid": A,
					"data-ui-text": "rail-caption",
					children: e
				}),
				typeof n == "number" && /* @__PURE__ */ Z("span", {
					className: t("shrink-0", "text-[12px] font-medium leading-4 normal-case tracking-normal tabular-nums text-text-tertiary"),
					"aria-label": `${n} items`,
					"data-testid": `${l}-count`,
					"data-ui-text": "rail-caption",
					children: n
				}),
				/* @__PURE__ */ Z("span", { className: "flex-1" }),
				r != null && /* @__PURE__ */ Z(ir, {
					actions: r,
					title: e,
					testId: l
				})
			]
		}), i.map((e) => {
			let n = e.collapsible !== !1, r = _(e), i = e.testId ?? `${l}-group-${e.id}`, a = `${i}-header`, o = `g:${e.id}`, s = /* @__PURE__ */ Q(X, { children: [
				/* @__PURE__ */ Z(Qn, {
					cancelGap: "-mr-2",
					children: /* @__PURE__ */ Z("span", {
						className: Zn,
						"data-rail-step": n ? "caret" : "caption",
						"data-testid": `${a}-caret`,
						children: n && /* @__PURE__ */ Z(we, { open: r })
					})
				}),
				/* @__PURE__ */ Z("span", {
					className: "min-w-0 truncate",
					"data-testid": `${a}-label`,
					"data-ui-text": "rail-caption",
					children: e.title
				}),
				typeof e.count == "number" && /* @__PURE__ */ Z("span", {
					className: t("shrink-0", "text-[12px] font-medium leading-4 normal-case tracking-normal tabular-nums text-text-tertiary"),
					"aria-label": `${e.count} items`,
					"data-testid": `${i}-count`,
					"data-ui-text": "rail-caption",
					children: e.count
				})
			] }), c = e.actions != null && e.actions !== !1 && !(Array.isArray(e.actions) && e.actions.length === 0), u = e.trailing != null && e.trailing !== !1, d = e.current ?? ar(e.rows, C), f = t("flex min-w-0 flex-1 items-center gap-2 bg-transparent text-left [font-family:inherit]", qn, (c || u) && "pr-0", Xn, Te, Se);
			return /* @__PURE__ */ Q("section", {
				"aria-labelledby": a,
				"aria-busy": e.pending || void 0,
				className: t("flex min-w-0 flex-col", e.pending && "opacity-60"),
				"data-testid": i,
				"data-group-id": e.id,
				"data-open": r,
				"data-pending": e.pending || void 0,
				children: [/* @__PURE__ */ Q("div", {
					className: "group/head relative flex min-w-0 items-center gap-1 pr-1",
					"data-current": d || void 0,
					"data-testid": `${i}-head`,
					children: [
						n ? /* @__PURE__ */ Z("button", {
							type: "button",
							id: a,
							"data-testid": a,
							title: e.title,
							"data-rail-key": o,
							"aria-expanded": r,
							tabIndex: T === o ? 0 : -1,
							onFocus: () => g(o),
							onClick: () => v(e, !r),
							className: t(f, "cursor-pointer hover:bg-surface-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"),
							...tr(e),
							children: s
						}) : /* @__PURE__ */ Z("h3", {
							id: a,
							"data-testid": a,
							title: e.title,
							className: t("m-0", f),
							...tr(e),
							children: s
						}),
						u && /* @__PURE__ */ Z("span", {
							className: "flex shrink-0 items-center",
							"data-testid": `${i}-trailing`,
							children: e.trailing
						}),
						c && /* @__PURE__ */ Z(rr, {
							actions: e.actions,
							className: $n,
							testId: `${i}-actions`
						})
					]
				}), r && /* @__PURE__ */ Z("ul", {
					className: "m-0 flex list-none flex-col p-0",
					"data-testid": `${i}-rows`,
					children: e.rows.length === 0 ? /* @__PURE__ */ Z("li", {
						className: t("text-xs leading-5", qn, Xn, "text-text-tertiary"),
						"data-testid": `${i}-empty`,
						children: e.emptyLabel ?? "Nothing here yet."
					}) : e.rows.map((e) => O(e, 0))
				})]
			}, e.id);
		})]
	});
}
//#endregion
//#region src/components/shared/NavRail.tsx
var sr = {
	narrow: "w-44",
	default: "w-56",
	wide: "w-64"
}, cr = {
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
function lr(e, t) {
	return e.id ?? e.to ?? `item-${t}`;
}
function ur(e, t, n) {
	return !t || !e.to ? !1 : t === e.to ? !0 : n === "exact" || e.to === "/" ? !1 : t.startsWith(e.to.endsWith("/") ? e.to : `${e.to}/`);
}
function dr(e) {
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
function fr({ item: e, active: n, palette: r, renderLink: i, size: a = "sm" }) {
	let o = /* @__PURE__ */ Q(X, { children: [/* @__PURE__ */ Q("span", {
		className: "flex items-center gap-2 min-w-0",
		children: [
			e.icon && /* @__PURE__ */ Z("span", {
				className: "flex-none",
				"aria-hidden": "true",
				children: e.icon
			}),
			/* @__PURE__ */ Z("span", {
				className: t("truncate", Ce, r.labelActive),
				"data-ui-text": "rail-item",
				children: e.label
			}),
			e.badge != null && /* @__PURE__ */ Z("span", {
				className: t("ml-auto flex-none", "text-[12px] font-medium leading-4 tabular-nums text-text-secondary", r.label),
				"data-testid": "nav-rail-badge",
				children: e.badge
			})
		]
	}), e.hint && /* @__PURE__ */ Z("span", {
		className: t("mt-0.5 block truncate text-[12px] leading-4", r.hint),
		children: e.hint
	})] }), s = t("block w-full border-l-[3px] border-transparent text-left no-underline", a === "md" ? "ml-[18px] w-auto mr-2 rounded-r pl-[15px] pr-2" : "px-3", Ee, r.hover, n && r.active, e.disabled && "pointer-events-none opacity-50");
	if (e.onClick || !e.to) return /* @__PURE__ */ Z("button", {
		type: "button",
		onClick: e.onClick,
		disabled: e.disabled,
		"aria-current": n ? "page" : void 0,
		className: t(s, "cursor-pointer bg-transparent font-[inherit]"),
		children: o
	});
	let c = {
		href: e.to,
		className: s,
		"aria-current": n ? "page" : void 0,
		"aria-disabled": e.disabled || void 0,
		children: o
	};
	return i ? /* @__PURE__ */ Z(X, { children: i(e, c) }) : /* @__PURE__ */ Z("a", { ...c });
}
function pr({ name: e, items: n, activeHref: r, match: i, palette: a, storageKey: o, renderLink: s, size: c = "sm", divided: l = !1 }) {
	let [u, d] = Y(() => {
		if (!o || typeof window > "u") return !1;
		try {
			return window.localStorage?.getItem(o) === "1";
		} catch {
			return !1;
		}
	});
	G(() => {
		if (!(!o || typeof window > "u")) try {
			u ? window.localStorage?.setItem(o, "1") : window.localStorage?.removeItem(o);
		} catch {}
	}, [u, o]);
	let f = K(), p = J(null), m = J(null), h = W(() => {
		if (!u) {
			let e = typeof document > "u" ? null : document.activeElement;
			e && m.current?.contains(e) && p.current?.focus();
		}
		d((e) => !e);
	}, [u]);
	return /* @__PURE__ */ Q("section", {
		className: t(c === "md" && "pb-1"),
		children: [
			l && /* @__PURE__ */ Z("div", {
				"aria-hidden": "true",
				className: t("mx-5 mb-2 mt-1 border-t", a.divider)
			}),
			/* @__PURE__ */ Q("button", {
				ref: p,
				type: "button",
				onClick: h,
				"aria-expanded": !u,
				"aria-controls": f,
				className: t("flex w-full cursor-pointer items-center gap-1.5 border-none bg-transparent text-left", Te, De, c === "md" ? "px-3.5" : "px-2", a.group),
				children: [/* @__PURE__ */ Z("span", {
					"aria-hidden": "true",
					className: "grid h-5 w-5 shrink-0 place-items-center",
					children: /* @__PURE__ */ Z(we, { open: !u })
				}), /* @__PURE__ */ Z("span", {
					className: "flex-1 truncate",
					children: e
				})]
			}),
			!u && /* @__PURE__ */ Z("div", {
				id: f,
				ref: m,
				children: n.map((e, t) => /* @__PURE__ */ Z(fr, {
					item: e,
					active: ur(e, r, i),
					palette: a,
					renderLink: s,
					size: c
				}, lr(e, t)))
			})
		]
	});
}
function mr({ title: e, items: n, activeHref: r, match: i = "prefix", titleAction: a, header: o, footer: s, width: c = "default", storageKey: l, renderLink: u, tone: d = "surface", size: f = "sm", "aria-label": p, className: m, "data-testid": h }) {
	let g = cr[d], _ = q(() => dr(n), [n]);
	return /* @__PURE__ */ Q("nav", {
		"aria-label": p ?? (typeof e == "string" ? e : void 0) ?? "Navigation",
		"data-testid": h,
		className: t("flex flex-none flex-col overflow-hidden border-r", sr[c], g.rail, m),
		children: [
			(e != null || a) && /* @__PURE__ */ Q("div", {
				className: t("flex flex-none items-center justify-between gap-2", f === "md" ? "h-12 pl-5 pr-3" : "border-b px-3 py-2.5", g.divider),
				children: [/* @__PURE__ */ Z("span", {
					className: t("truncate text-[11px] font-semibold uppercase tracking-[0.05em]", g.title),
					children: e
				}), a]
			}),
			o && /* @__PURE__ */ Z("div", {
				className: t("flex-none border-b px-2 py-2", g.divider),
				children: o
			}),
			/* @__PURE__ */ Z("div", {
				className: "min-h-0 flex-1 overflow-y-auto py-1",
				children: _.map((e, t) => e.name === null ? /* @__PURE__ */ Z("div", { children: e.items.map((e, t) => /* @__PURE__ */ Z(fr, {
					item: e,
					active: ur(e, r, i),
					palette: g,
					renderLink: u,
					size: f
				}, lr(e, t))) }, "__ungrouped") : /* @__PURE__ */ Z(pr, {
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
			s && /* @__PURE__ */ Z("div", {
				className: t("flex-none border-t px-2 py-2", g.divider),
				children: s
			})
		]
	});
}
function hr({ rails: e, activeHref: n, renderLink: r, tone: i, storageKey: a, children: o, className: s, "data-testid": c }) {
	return /* @__PURE__ */ Q("div", {
		"data-testid": c,
		className: t("flex h-full min-h-0 w-full", s),
		children: [e.map(({ id: e, ...t }) => /* @__PURE__ */ Z(mr, {
			...t,
			activeHref: t.activeHref ?? n,
			renderLink: t.renderLink ?? r,
			tone: t.tone ?? i,
			storageKey: a ? `${a}.${e}` : void 0
		}, e)), /* @__PURE__ */ Z("div", {
			className: "flex min-h-0 min-w-0 flex-1 flex-col",
			children: o
		})]
	});
}
//#endregion
//#region src/components/shared/WorkArea.tsx
var gr = {
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
function _r({ breadcrumbs: e, toolbar: n, children: r, status: i, footer: a, padded: o = !0, tone: s = "surface", className: c, bodyClassName: l, "data-testid": u }) {
	let d = gr[s];
	return /* @__PURE__ */ Q("div", {
		"data-testid": u,
		className: t("flex h-full min-h-0 min-w-0 flex-1 flex-col", d.column, c),
		children: [
			e && /* @__PURE__ */ Z("div", {
				className: t("flex flex-none items-center overflow-x-auto border-b px-3 py-1.5", d.divider),
				children: e
			}),
			n,
			/* @__PURE__ */ Z("div", {
				className: t("min-h-0 flex-1 overflow-auto", o && "p-[var(--ui-page-gutter,1.5rem)]", l),
				children: r
			}),
			i && /* @__PURE__ */ Z("div", {
				className: t("flex flex-none items-center gap-3 border-t px-3 py-1 text-[11px]", d.divider, d.status),
				children: i
			}),
			a && /* @__PURE__ */ Z("div", {
				className: "min-w-0 shrink-0",
				"data-workarea-footer": !0,
				children: a
			})
		]
	});
}
//#endregion
//#region src/components/shared/InlineMenu.tsx
var vr = {
	"bottom-start": "top-full left-0 mt-1",
	"bottom-end": "top-full right-0 mt-1",
	"top-start": "bottom-full left-0 mb-1",
	"top-end": "bottom-full right-0 mb-1"
};
function yr({ open: e, onClose: n, placement: r = "bottom-start", trigger: i, role: a = "group", className: o, "data-testid": s = "inline-menu", "aria-label": c, "aria-labelledby": l, children: u }) {
	let d = J(null), f = h(e);
	return G(() => {
		if (!e) return;
		let t = (e) => {
			e.key === "Escape" && f() && (e.stopPropagation(), n());
		};
		return window.addEventListener("keydown", t), () => window.removeEventListener("keydown", t);
	}, [
		e,
		n,
		f
	]), G(() => {
		if (!e) return;
		let t = (e) => {
			let t = e.target;
			t && (d.current?.contains(t) || i?.current?.contains(t) || n());
		};
		return document.addEventListener("mousedown", t), () => document.removeEventListener("mousedown", t);
	}, [
		e,
		n,
		i
	]), e ? /* @__PURE__ */ Z("div", {
		ref: d,
		role: a,
		"aria-label": c,
		"aria-labelledby": l,
		"data-testid": s,
		"data-placement": r,
		className: t("absolute z-20 min-w-[160px] rounded-lg border border-border bg-surface", "shadow-lg p-1 text-sm text-text-primary", vr[r], o),
		children: u
	}) : null;
}
//#endregion
//#region src/components/pipelines/nodes/NodeCard.tsx
var br = {
	success: "border-success",
	error: "border-danger",
	warning: "border-warning",
	info: "border-info",
	neutral: "border-border-emphasis",
	pending: "border-accent"
};
function xr({ icon: e, label: n, subtitle: r, status: i = "neutral", statusLabel: a, body: o, selected: s = !1, accentClass: l, className: u, onClick: d }) {
	let f = a ?? i.charAt(0).toUpperCase() + i.slice(1), p = br[i];
	return /* @__PURE__ */ Q(c, {
		className: t("relative w-40 transition-shadow duration-200 border-2", d && "cursor-pointer", p, s && "shadow-[0_0_0_3px_rgba(99,102,241,0.25)]", !s && "shadow-sm", !s && d && "hover:shadow-md", u),
		onClick: d,
		children: [
			l && /* @__PURE__ */ Z("div", { className: t("absolute left-0 top-0 bottom-0 w-1 rounded-l-lg", l) }),
			/* @__PURE__ */ Q("div", {
				className: t("flex items-center justify-between gap-2 px-2.5 py-2 border-b border-border-subtle", l && "pl-3.5"),
				children: [/* @__PURE__ */ Q("div", {
					className: "flex items-center gap-1.5 min-w-0",
					children: [/* @__PURE__ */ Z("span", {
						className: "text-sm leading-none shrink-0",
						"aria-hidden": "true",
						children: e
					}), /* @__PURE__ */ Z("span", {
						className: "text-xs font-semibold text-text-primary truncate",
						children: n
					})]
				}), /* @__PURE__ */ Z(z, {
					state: i,
					label: f,
					size: "sm"
				})]
			}),
			r && /* @__PURE__ */ Z("div", {
				className: "px-2.5 pt-1.5 pb-0 text-[11px] text-neutral truncate",
				children: r
			}),
			o && /* @__PURE__ */ Z("div", {
				className: "px-2.5 pb-2 pt-1 text-xs text-text-secondary",
				children: o
			})
		]
	});
}
//#endregion
//#region src/components/shared/BoardColumn.tsx
function Sr({ label: e, count: n, children: r, emptyLabel: i = "Nothing here", action: a, className: o, "data-testid": s }) {
	let c = r == null || r === !1 || Array.isArray(r) && r.length === 0;
	return /* @__PURE__ */ Q("section", {
		className: t("flex h-full min-h-48 min-w-0 flex-col gap-2 rounded-lg p-2", "bg-[color-mix(in_srgb,var(--color-text-primary)_4%,transparent)]", o),
		"data-ui-board-lane": "",
		"data-testid": s,
		children: [/* @__PURE__ */ Q("header", {
			className: "flex h-6 shrink-0 items-center justify-between gap-2 px-1 text-[11px] font-semibold uppercase tracking-[0.04em] text-text-secondary",
			children: [/* @__PURE__ */ Z("span", {
				className: "truncate",
				children: e
			}), a ?? (n === void 0 ? null : /* @__PURE__ */ Z("span", {
				className: "tabular-nums text-text-tertiary",
				children: n
			}))]
		}), c ? /* @__PURE__ */ Z("div", {
			"data-board-lane-empty": "",
			className: "flex flex-1 items-center justify-center rounded-md border border-dashed border-border px-2 py-6 text-center text-[12px] text-text-tertiary",
			children: i
		}) : /* @__PURE__ */ Z("div", {
			className: "flex flex-col gap-2",
			children: r
		})]
	});
}
//#endregion
//#region src/components/shared/FormRow.tsx
var Cr = {
	sm: "gap-2",
	md: "gap-3",
	lg: "gap-4"
}, wr = {
	sm: "flex-col sm:flex-row",
	md: "flex-col md:flex-row"
};
function Tr({ children: e, stackBelow: n = "sm", gap: r = "md", className: i, "data-testid": a }) {
	return /* @__PURE__ */ Z("div", {
		className: t("flex items-start", wr[n], Cr[r], i),
		"data-testid": a,
		children: Ae.map(e, (e) => Ne(e) ? /* @__PURE__ */ Z("div", {
			className: "flex-1 basis-0 min-w-0",
			children: e
		}) : e)
	});
}
//#endregion
//#region src/components/shared/DetailHeader.tsx
function Er({ title: e, badge: n, description: r, meta: i, aside: a, asideWidth: o = 260, as: s = "h2", className: c, "data-testid": l }) {
	return /* @__PURE__ */ Q("div", {
		className: t("flex flex-wrap items-start justify-between gap-3", c),
		"data-testid": l,
		children: [/* @__PURE__ */ Q("div", {
			className: "flex flex-col gap-1.5 min-w-0 flex-1",
			children: [
				/* @__PURE__ */ Q("div", {
					className: "flex flex-wrap items-center gap-2",
					children: [/* @__PURE__ */ Z(s, {
						className: "m-0 text-sm font-semibold text-text-primary",
						children: e
					}), n]
				}),
				r ? /* @__PURE__ */ Z("p", {
					className: "m-0 max-w-[72ch] text-xs text-text-secondary",
					children: r
				}) : null,
				i
			]
		}), a ? /* @__PURE__ */ Z("div", {
			className: "flex max-w-full flex-col gap-2 shrink-0",
			style: { width: o },
			"data-detail-aside": "",
			children: a
		}) : null]
	});
}
//#endregion
//#region src/components/shared/ReviewThread.tsx
var Dr = {
	problem: "problem statement",
	analysis: "analysis",
	option: "options",
	question: "question",
	answer: "answer",
	artifact: "artifact",
	revision: "revision",
	decision: "decision"
}, Or = {
	problem: "info",
	analysis: "neutral",
	option: "info",
	question: "warning",
	answer: "success",
	artifact: "purple",
	revision: "info",
	decision: "accent"
};
function kr({ name: e, type: t, url: n }) {
	return /* @__PURE__ */ Q("div", {
		className: "flex items-center gap-3 rounded-md border border-dashed border-border bg-surface-hover/40 px-3 py-2.5",
		children: [
			/* @__PURE__ */ Z("span", {
				className: "text-lg",
				role: "img",
				"aria-label": "artifact",
				children: "🖼️"
			}),
			/* @__PURE__ */ Q("div", {
				className: "min-w-0",
				children: [/* @__PURE__ */ Z("div", {
					className: "truncate text-xs font-medium text-text-primary",
					children: e
				}), t && /* @__PURE__ */ Z("div", {
					className: "text-xs text-text-tertiary",
					children: t
				})]
			}),
			/* @__PURE__ */ Z("div", { className: "flex-1" }),
			n ? /* @__PURE__ */ Z("a", {
				href: n,
				target: "_blank",
				rel: "noreferrer",
				className: "text-xs text-primary no-underline hover:underline",
				children: "open →"
			}) : /* @__PURE__ */ Z("span", {
				className: "text-xs text-text-tertiary",
				children: "stored with the run"
			})
		]
	});
}
function Ar({ post: e, labels: n, tones: r, onAnswer: i, busy: o, placeholder: s, submitLabel: c, inline: l }) {
	let [u, d] = Y(""), f = e.kind === "question" && !e.resolved;
	return /* @__PURE__ */ Q("div", {
		className: t("border-b border-border py-3 last:border-b-0", l ? "px-0" : "px-4", f && "bg-warning-bg/20"),
		children: [
			/* @__PURE__ */ Q("div", {
				className: "flex min-w-0 items-center gap-2",
				children: [
					e.authorKind === "human" ? /* @__PURE__ */ Z(V, {
						name: e.authorName,
						src: e.avatarUrl,
						size: 20
					}) : /* @__PURE__ */ Z("span", {
						className: "text-[13px]",
						role: "img",
						"aria-label": "agent",
						children: "🤖"
					}),
					/* @__PURE__ */ Z("span", {
						className: "truncate text-xs font-semibold text-text-primary",
						children: e.authorName
					}),
					/* @__PURE__ */ Z(p, {
						tone: r[e.kind] ?? "neutral",
						size: "xs",
						uppercase: !0,
						children: n[e.kind] ?? e.kind
					}),
					f && /* @__PURE__ */ Z(p, {
						tone: "warning",
						size: "xs",
						dot: "pulse",
						children: "needs a human"
					}),
					e.kind === "question" && e.resolved && /* @__PURE__ */ Z(p, {
						tone: "success",
						size: "xs",
						children: "resolved"
					}),
					/* @__PURE__ */ Z("div", { className: "flex-1" }),
					e.timeLabel && /* @__PURE__ */ Z("span", {
						className: "whitespace-nowrap text-xs text-text-tertiary",
						children: e.timeLabel
					})
				]
			}),
			/* @__PURE__ */ Z("div", {
				className: "mt-1.5 whitespace-pre-wrap pl-7 text-xs leading-relaxed text-text-secondary",
				children: e.body
			}),
			e.artifact && /* @__PURE__ */ Z("div", {
				className: "mt-2 ml-7",
				children: /* @__PURE__ */ Z(kr, {
					name: e.artifact.name,
					type: e.artifact.type,
					url: e.artifact.url
				})
			}),
			f && i && /* @__PURE__ */ Q("div", {
				className: "mt-2.5 ml-7 flex flex-col gap-2",
				children: [/* @__PURE__ */ Z(me, {
					value: u,
					onChange: (e) => d(e.target.value),
					placeholder: s,
					rows: 2,
					"aria-label": "Answer this question"
				}), /* @__PURE__ */ Z("div", { children: /* @__PURE__ */ Z(a, {
					size: "sm",
					variant: "primary",
					disabled: !u.trim() || o,
					onClick: () => i(e.id, u.trim()),
					children: o ? "Sending…" : c
				}) })]
			})
		]
	});
}
function jr({ variant: e = "card", posts: n, onAnswer: r, answerBusy: i = !1, answerPlaceholder: a = "Answer the agent — your answer resolves the question and the loop continues.", answerLabel: o = "Answer & continue the loop", kindLabels: s, kindTones: c, emptyLabel: l = "No posts yet — an agent opens the thread by restating the problem.", className: u, "data-testid": d }) {
	let f = {
		...Dr,
		...s
	}, p = {
		...Or,
		...c
	};
	return /* @__PURE__ */ Z("div", {
		className: t("min-w-0 bg-surface", e === "card" && "overflow-hidden rounded-lg border border-border", u),
		"data-variant": e,
		...d ? { "data-testid": d } : {},
		children: n.length === 0 ? /* @__PURE__ */ Z("div", {
			className: "px-4 py-8 text-center text-xs text-text-tertiary",
			children: l
		}) : n.map((t) => /* @__PURE__ */ Z(Ar, {
			inline: e === "inline",
			post: t,
			labels: f,
			tones: p,
			onAnswer: r,
			busy: i,
			placeholder: a,
			submitLabel: o
		}, t.id))
	});
}
//#endregion
//#region src/components/shared/RailLayout.tsx
var Mr = {
	sm: "lg:w-[260px]",
	md: "lg:w-[300px]",
	lg: "lg:w-[340px]"
}, Nr = Me("card");
function Pr({ children: e, rail: n, railWidth: r = "md", variant: i = "card", className: a, "data-testid": o }) {
	return i === "plain" ? /* @__PURE__ */ Z("div", {
		className: t("@container min-w-0", a),
		"data-testid": o,
		"data-variant": "plain",
		children: /* @__PURE__ */ Q("div", {
			className: "flex min-w-0 flex-col gap-6 @3xl:flex-row @3xl:items-start",
			children: [/* @__PURE__ */ Z("div", {
				className: "min-w-0 flex-1",
				children: e
			}), /* @__PURE__ */ Z("aside", {
				"aria-label": "Record context",
				className: "w-full min-w-0 shrink-0 border-t border-border @3xl:w-[260px] @3xl:border-t-0 @3xl:border-l @3xl:pl-5",
				children: /* @__PURE__ */ Z(Nr.Provider, {
					value: "plain",
					children: n
				})
			})]
		})
	}) : /* @__PURE__ */ Q("div", {
		className: t("flex flex-col gap-4 lg:flex-row lg:items-start", a),
		...o ? { "data-testid": o } : {},
		children: [/* @__PURE__ */ Z("div", {
			className: "min-w-0 flex-1",
			children: e
		}), /* @__PURE__ */ Z("aside", {
			className: t("w-full shrink-0 lg:sticky lg:top-4", Mr[r]),
			children: /* @__PURE__ */ Z("div", {
				className: "overflow-hidden rounded-lg border border-border bg-surface",
				children: n
			})
		})]
	});
}
function Fr({ title: e, children: n, className: r, variant: i }) {
	let a = Pe(Nr), o = i ?? a, s = o === "plain" ? "h2" : "h3";
	return /* @__PURE__ */ Q("section", {
		className: t("border-b border-border py-3 last:border-b-0", o === "card" && "px-3.5", r),
		children: [/* @__PURE__ */ Z(s, {
			className: t("mb-2", Te, Se),
			"data-testid": "rail-section-title",
			children: e
		}), /* @__PURE__ */ Z("div", {
			className: "flex flex-col gap-2 text-xs text-text-secondary",
			children: n
		})]
	});
}
//#endregion
//#region src/components/shared/SignoffPanel.tsx
function Ir({ variant: e = "card", signoffs: n, required: r = 2, actions: i, emptyHint: a, className: o, "data-testid": s }) {
	let c = n.filter((e) => e.decision === "approve").length, l = a ?? `none yet — ${r} approvals ratify the decision`;
	return /* @__PURE__ */ Q("div", {
		className: t("flex flex-wrap items-center gap-3 border-border bg-surface py-3", e === "inline" ? "border-t" : "rounded-lg border px-4", o),
		"data-variant": e,
		...s ? { "data-testid": s } : {},
		children: [
			/* @__PURE__ */ Z("span", {
				className: "text-xs font-semibold text-text-primary",
				children: "Sign-offs"
			}),
			n.length === 0 ? /* @__PURE__ */ Z("span", {
				className: "text-xs text-text-tertiary",
				children: l
			}) : /* @__PURE__ */ Q(X, { children: [n.map((e) => /* @__PURE__ */ Q("span", {
				className: "flex items-center gap-1.5",
				title: e.role ? `${e.name} · ${e.role}` : e.name,
				children: [
					/* @__PURE__ */ Z(V, {
						name: e.name,
						src: e.avatarUrl,
						size: 18
					}),
					/* @__PURE__ */ Z("span", {
						className: "text-xs text-text-secondary",
						children: e.name
					}),
					/* @__PURE__ */ Z(p, {
						tone: e.decision === "approve" ? "success" : "danger",
						size: "xs",
						children: e.decision === "approve" ? "✓" : "✕"
					})
				]
			}, e.name)), /* @__PURE__ */ Q("span", {
				className: "text-[11px] text-text-tertiary",
				children: [
					c,
					"/",
					r,
					" approvals"
				]
			})] }),
			/* @__PURE__ */ Z("div", { className: "flex-1" }),
			i
		]
	});
}
//#endregion
//#region src/components/shared/StatStrip.tsx
var Lr = {
	default: "text-text-primary",
	accent: "text-primary",
	danger: "text-danger"
};
function Rr({ progress: e, label: t }) {
	return !e || !(e.max > 0) || !Number.isFinite(e.value) ? null : /* @__PURE__ */ Z(H, {
		value: e.value,
		max: e.max,
		size: "sm",
		"aria-label": t,
		className: "mt-2 max-w-[20rem]",
		"data-testid": "stat-strip-progress"
	});
}
function zr({ item: e, first: n, last: r }) {
	return /* @__PURE__ */ Q("div", {
		className: t("min-w-0 py-3", n ? "pl-0 pr-6" : "px-6", r && !n && "pr-0"),
		"data-testid": "stat-strip-cluster",
		children: [
			/* @__PURE__ */ Q("div", {
				className: "flex min-w-0 items-baseline gap-1.5 whitespace-nowrap",
				children: [/* @__PURE__ */ Z("span", {
					className: t("text-sm font-semibold leading-6 tabular-nums", Lr[e.tone ?? "default"]),
					children: e.value
				}), /* @__PURE__ */ Z("span", {
					className: "min-w-0 truncate text-sm leading-6 text-text-secondary",
					children: e.label
				})]
			}),
			/* @__PURE__ */ Z(Rr, {
				progress: e.progress,
				label: e.label
			}),
			e.hint != null && /* @__PURE__ */ Z("div", {
				className: "mt-0.5 truncate text-[12px] text-text-tertiary",
				children: e.hint
			})
		]
	});
}
function Br({ item: e, sm: n = !1 }) {
	let r = e.progress && e.progress.max > 0 && Number.isFinite(e.progress.value);
	return /* @__PURE__ */ Q("span", {
		className: "flex min-w-0 items-center whitespace-nowrap",
		"data-testid": "stat-strip-cluster",
		children: [/* @__PURE__ */ Q("span", {
			className: "flex min-w-0 items-baseline gap-1.5",
			children: [/* @__PURE__ */ Z("span", {
				className: t("font-semibold tabular-nums", n ? "text-sm leading-5" : "text-[16px] leading-6", Lr[e.tone ?? "default"]),
				children: e.value
			}), /* @__PURE__ */ Z("span", {
				className: t("min-w-0 truncate text-text-secondary", n ? "text-sm leading-5" : "text-[15px] leading-6"),
				children: e.label
			})]
		}), e.track == null ? r && /* @__PURE__ */ Z(H, {
			value: e.progress.value,
			max: e.progress.max,
			size: "sm",
			"aria-label": e.label,
			className: "ml-[18px] w-[150px] shrink-0",
			"data-testid": "stat-strip-progress"
		}) : /* @__PURE__ */ Z("span", {
			className: "ml-[18px] flex shrink-0 items-center",
			"data-testid": "stat-strip-track",
			children: e.track
		})]
	});
}
var Vr = {
	row: "@max-[40rem]:flex-col",
	cell: "@max-[40rem]:flex-none",
	cluster: "@max-[40rem]:flex @max-[40rem]:flex-wrap @max-[40rem]:items-baseline @max-[40rem]:gap-x-3 @max-[40rem]:gap-y-0.5 @max-[40rem]:py-1.5",
	inline: "@max-[40rem]:mt-0"
};
function Hr({ item: e, flush: n, control: r = !1, flow: i = !1 }) {
	return /* @__PURE__ */ Q("div", {
		"data-stat-control": r || void 0,
		className: t("min-w-0 px-4 py-2.5", (n === "start" || n === "both") && "pl-0", (n === "end" || n === "both") && "pr-0", i && Vr.cluster, i === "frameless" && "@max-[40rem]:px-0"),
		children: [
			/* @__PURE__ */ Z("div", {
				className: t("truncate uppercase tracking-wide text-text-tertiary", r ? "text-xs font-normal" : "text-xs font-semibold"),
				...e.title ? {} : { title: e.label },
				"data-testid": "stat-strip-label",
				children: e.label
			}),
			/* @__PURE__ */ Q("div", {
				className: t("mt-0.5 flex min-w-0 items-baseline gap-2", i && Vr.inline),
				children: [/* @__PURE__ */ Z("span", {
					className: t("leading-none tabular-nums", "text-sm font-semibold", Lr[e.tone ?? "default"]),
					children: e.value
				}), e.hint != null && /* @__PURE__ */ Z("span", {
					className: t("min-w-0 truncate text-text-tertiary", "text-xs"),
					children: e.hint
				})]
			}),
			e.status && /* @__PURE__ */ Q("div", {
				className: t("mt-1 flex min-w-0 items-center gap-1.5 text-[12px]", i && Vr.inline),
				"data-testid": "stat-strip-status",
				children: [/* @__PURE__ */ Z("span", {
					"aria-hidden": "true",
					className: t("inline-block h-2 w-2 shrink-0 rounded-full", u[e.status.tone ?? "neutral"])
				}), /* @__PURE__ */ Z("span", {
					className: t("min-w-0 truncate", e.status.tone && e.status.tone !== "neutral" ? m[e.status.tone] : "text-text-secondary"),
					children: e.status.label
				})]
			}),
			/* @__PURE__ */ Z(Rr, {
				progress: e.progress,
				label: e.label
			})
		]
	});
}
function Ur({ connector: e, frameless: n = !1 }) {
	let r = e?.tone;
	return /* @__PURE__ */ Q("div", {
		className: t("flex shrink-0 flex-col items-center justify-center gap-1 self-center px-1", "@max-[40rem]:flex-row @max-[40rem]:self-start @max-[40rem]:gap-1.5 @max-[40rem]:py-0.5", n ? "@max-[40rem]:px-0" : "@max-[40rem]:px-4", r ? m[r] : "text-text-tertiary"),
		"data-testid": "stat-strip-connector",
		children: [
			/* @__PURE__ */ Q("svg", {
				"aria-hidden": "true",
				width: "56",
				height: "8",
				viewBox: "0 0 56 8",
				className: "block @max-[40rem]:hidden",
				children: [/* @__PURE__ */ Z("line", {
					x1: "0",
					y1: "4",
					x2: "50",
					y2: "4",
					stroke: "currentColor",
					strokeWidth: "1.25"
				}), /* @__PURE__ */ Z("path", {
					d: "M49 0.5 L55 4 L49 7.5 Z",
					fill: "currentColor"
				})]
			}),
			/* @__PURE__ */ Q("svg", {
				"aria-hidden": "true",
				width: "8",
				height: "14",
				viewBox: "0 0 8 14",
				className: "hidden @max-[40rem]:block",
				children: [/* @__PURE__ */ Z("line", {
					x1: "4",
					y1: "0",
					x2: "4",
					y2: "8",
					stroke: "currentColor",
					strokeWidth: "1.25"
				}), /* @__PURE__ */ Z("path", {
					d: "M0.5 7 L4 13 L7.5 7 Z",
					fill: "currentColor"
				})]
			}),
			e?.label && /* @__PURE__ */ Z("span", {
				className: "whitespace-nowrap text-[12px] leading-none",
				children: e.label
			})
		]
	});
}
function Wr({ items: e, frameless: n = !1, connectors: r, variant: a = "default", size: o, className: s, "aria-label": c, "data-testid": l }) {
	let u = i("StatStrip", o, {
		comfortable: "md",
		compact: "sm"
	}), d = !!r && r.length > 0;
	if (a === "line") return /* @__PURE__ */ Z("div", {
		role: "group",
		"data-variant": "line",
		...u === "sm" ? { "data-size": "sm" } : {},
		className: t("flex min-w-0 flex-wrap items-center gap-y-1", s),
		...c ? { "aria-label": c } : {},
		...l ? { "data-testid": l } : {},
		children: e.map((n, r) => {
			let i = n.title ? { title: n.title } : {}, a = /* @__PURE__ */ Z(Br, {
				item: n,
				sm: u === "sm"
			}), o;
			return o = n.href ? /* @__PURE__ */ Z("a", {
				href: n.href,
				className: "min-w-0 rounded no-underline hover:underline",
				...i,
				children: a
			}) : n.onSelect ? /* @__PURE__ */ Z("button", {
				type: "button",
				onClick: n.onSelect,
				className: "min-w-0 cursor-pointer rounded border-none bg-transparent p-0 text-left hover:underline",
				...i,
				children: a
			}) : /* @__PURE__ */ Z("span", {
				className: "min-w-0",
				...i,
				children: a
			}), /* @__PURE__ */ Q("span", {
				className: "inline-flex min-w-0 items-baseline",
				"data-testid": "stat-strip-unit",
				children: [o, r < e.length - 1 && /* @__PURE__ */ Z("span", {
					"aria-hidden": "true",
					className: t("mx-5 text-text-secondary", u === "sm" ? "text-sm leading-5" : "text-[15px] leading-6"),
					"data-testid": "stat-strip-separator",
					children: "•"
				})]
			}, n.label);
		})
	});
	if (a === "inline") return /* @__PURE__ */ Z("div", {
		role: "group",
		"data-variant": "inline",
		className: t("flex items-center divide-x divide-border overflow-x-auto border-b border-border pb-1", s),
		...c ? { "aria-label": c } : {},
		...l ? { "data-testid": l } : {},
		children: e.map((t, n) => {
			let r = t.title ? { title: t.title } : {}, i = /* @__PURE__ */ Z(zr, {
				item: t,
				first: n === 0,
				last: n === e.length - 1
			});
			return t.href ? /* @__PURE__ */ Z("a", {
				href: t.href,
				className: "min-w-0 flex-1 no-underline hover:bg-surface-hover",
				...r,
				children: i
			}, t.label) : t.onSelect ? /* @__PURE__ */ Z("button", {
				type: "button",
				onClick: t.onSelect,
				className: "min-w-0 flex-1 cursor-pointer border-none bg-transparent p-0 text-left hover:bg-surface-hover",
				...r,
				children: i
			}, t.label) : /* @__PURE__ */ Z("div", {
				className: "min-w-0 flex-1",
				...r,
				children: i
			}, t.label);
		})
	});
	let f = d ? n ? "frameless" : "framed" : !1, p = e.map((i, a) => {
		let o = n ? e.length === 1 ? "both" : a === 0 ? "start" : a === e.length - 1 ? "end" : void 0 : void 0, s = i.title ? { title: i.title } : {}, c;
		return c = i.href ? /* @__PURE__ */ Z("a", {
			href: i.href,
			className: t("min-w-0 flex-1 no-underline transition-colors hover:bg-surface-hover", d && Vr.cell),
			...s,
			children: /* @__PURE__ */ Z(Hr, {
				item: i,
				flush: o,
				control: !0,
				flow: f
			})
		}) : i.onSelect ? /* @__PURE__ */ Z("button", {
			type: "button",
			onClick: i.onSelect,
			className: t("min-w-0 flex-1 cursor-pointer border-none bg-transparent p-0 text-left transition-colors hover:bg-surface-hover", d && Vr.cell),
			...s,
			children: /* @__PURE__ */ Z(Hr, {
				item: i,
				flush: o,
				control: !0,
				flow: f
			})
		}) : /* @__PURE__ */ Z("div", {
			className: t("min-w-0 flex-1", d && Vr.cell),
			...s,
			children: /* @__PURE__ */ Z(Hr, {
				item: i,
				flush: o,
				flow: f
			})
		}), /* @__PURE__ */ Q(je, { children: [c, d && a < e.length - 1 && /* @__PURE__ */ Z(Ur, {
			connector: r[a],
			frameless: n
		})] }, i.label);
	}), m = !n && "rounded-lg border border-border bg-surface", h = {
		role: "group",
		...c ? { "aria-label": c } : {},
		...l ? { "data-testid": l } : {}
	};
	return d ? /* @__PURE__ */ Z("div", {
		...h,
		"data-flow": "",
		className: t("@container min-w-0", m, s),
		children: /* @__PURE__ */ Z("div", {
			className: t("flex items-stretch overflow-x-auto", Vr.row),
			"data-stat-strip-row": "",
			children: p
		})
	}) : /* @__PURE__ */ Z("div", {
		...h,
		className: t("flex overflow-x-auto divide-x divide-border", m, s),
		children: p
	});
}
//#endregion
//#region src/components/shared/KeyValue.tsx
function Gr({ items: e, layout: n = "row", labelWidth: r = "w-28", divided: i = !1, responsive: a = !1, className: o, "aria-label": s, "data-testid": c = "key-value" }) {
	if (e.length === 0) return null;
	let l = n === "row", u = l && i;
	return /* @__PURE__ */ Z("dl", {
		className: t("m-0 min-w-0", a && "@container/key-value", n === "grid" ? "grid grid-cols-2 gap-x-6 gap-y-3" : u ? "flex flex-col border-t border-border" : l ? "flex flex-col gap-1.5" : "flex flex-col gap-3", o),
		"data-layout": n,
		"data-divided": u || void 0,
		"data-testid": c,
		...s ? { "aria-label": s } : {},
		children: e.map((e, n) => /* @__PURE__ */ Q("div", {
			className: t("min-w-0", a && u && "flex-wrap @lg/key-value:flex-nowrap", u ? "flex min-h-[38px] items-center gap-3 border-b border-border px-2.5 py-1.5" : l ? "flex items-baseline gap-3" : "flex flex-col gap-0.5"),
			"data-testid": `${c}-item`,
			children: [
				/* @__PURE__ */ Z("dt", {
					className: t("m-0", a && u && "basis-full @lg/key-value:basis-auto", u ? t("shrink-0 text-sm text-text-primary", r) : "text-text-secondary", !u && (l ? t("shrink-0 text-xs", r) : "text-[12px]")),
					children: e.label
				}),
				/* @__PURE__ */ Z("dd", {
					className: t("m-0 min-w-0 truncate", "text-sm", e.muted ? "text-text-tertiary" : "text-text-primary", l && "flex-1", e.mono && "font-mono text-[12px]"),
					...e.title ? { title: e.title } : {},
					children: e.value
				}),
				l && e.action != null && e.action !== !1 && /* @__PURE__ */ Z("dd", {
					className: "m-0 flex shrink-0 items-center",
					"data-testid": `${c}-action`,
					children: e.action
				})
			]
		}, `${e.label}-${n}`))
	});
}
//#endregion
//#region src/components/shared/PersonHoverCard.tsx
function Kr({ person: e, children: n, actions: r, details: i, interactiveChild: a = !1, openDelay: o = 450, closeDelay: s = 250, className: c, "data-testid": l = "person-hover-card" }) {
	let u = J(null), [d, f] = Y(!1), p = J(null), m = W(() => {
		p.current &&= (clearTimeout(p.current), null);
	}, []);
	G(() => m, [m]);
	let h = W(() => {
		m(), p.current = setTimeout(() => f(!0), o);
	}, [m, o]), g = W(() => {
		m(), p.current = setTimeout(() => f(!1), s);
	}, [m, s]);
	return /* @__PURE__ */ Q(X, { children: [/* @__PURE__ */ Z("span", {
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
		className: t("rounded-sm underline-offset-2", a ? "inline-flex" : "cursor-default hover:underline", c),
		onMouseEnter: h,
		onMouseLeave: g,
		onFocus: () => f(!0),
		children: n
	}), /* @__PURE__ */ Z(se, {
		trigger: u,
		open: d,
		onClose: () => {
			m(), f(!1);
		},
		placement: "bottom-start",
		"aria-label": `About ${e.displayName}`,
		"data-testid": l,
		children: /* @__PURE__ */ Q("div", {
			className: "w-72 p-3",
			onMouseEnter: m,
			onMouseLeave: g,
			children: [
				/* @__PURE__ */ Q("div", {
					className: "flex items-start gap-3",
					children: [/* @__PURE__ */ Z(V, {
						name: e.displayName,
						src: e.avatarUrl,
						color: e.color,
						size: 40
					}), /* @__PURE__ */ Q("div", {
						className: "min-w-0 flex-1",
						children: [
							/* @__PURE__ */ Q("div", {
								className: "flex items-center gap-1.5",
								children: [/* @__PURE__ */ Z("span", {
									className: "truncate text-sm font-semibold text-text-primary",
									children: e.displayName
								}), e.online !== void 0 && /* @__PURE__ */ Z(ge, { state: e.online ? "online" : "offline" })]
							}),
							e.title && /* @__PURE__ */ Z("div", {
								className: "truncate text-xs text-text-secondary",
								children: e.title
							}),
							e.department && /* @__PURE__ */ Z("div", {
								className: "truncate text-xs text-text-tertiary",
								children: e.department
							})
						]
					})]
				}),
				e.statusText && /* @__PURE__ */ Z("div", {
					className: "mt-2 truncate text-xs italic text-text-secondary",
					children: e.statusText
				}),
				(e.email || e.localTime) && /* @__PURE__ */ Q("div", {
					className: "mt-2 space-y-0.5 border-t border-border pt-2",
					children: [e.email && /* @__PURE__ */ Z("div", {
						className: "truncate text-xs text-text-secondary",
						children: e.email
					}), e.localTime && /* @__PURE__ */ Q("div", {
						className: "text-xs text-text-tertiary",
						children: [e.localTime, " local time"]
					})]
				}),
				i && /* @__PURE__ */ Z("div", {
					className: "mt-2 border-t border-border pt-2",
					children: i
				}),
				r && /* @__PURE__ */ Z("div", {
					className: "mt-3 flex items-center gap-2",
					children: r
				})
			]
		})
	})] });
}
//#endregion
//#region src/components/shared/MasterDetail.tsx
function qr(e) {
	if (!e || typeof window > "u") return !1;
	try {
		return window.localStorage.getItem(e) === "compact";
	} catch {
		return !1;
	}
}
function Jr(e, t) {
	if (!(!e || typeof window > "u")) try {
		window.localStorage.setItem(e, t ? "compact" : "expanded");
	} catch {}
}
function Yr({ direction: e }) {
	return /* @__PURE__ */ Z("svg", {
		className: t("h-4 w-4", e === "right" && "rotate-180"),
		viewBox: "0 0 16 16",
		fill: "none",
		"aria-hidden": "true",
		children: /* @__PURE__ */ Z("path", {
			d: "M10 3L5 8l5 5",
			stroke: "currentColor",
			strokeWidth: "1.5",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		})
	});
}
function Xr({ index: e, selected: n }) {
	return /* @__PURE__ */ Z("span", {
		className: t("flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-semibold", n ? "bg-primary text-on-primary" : "bg-surface-inset text-text-tertiary"),
		children: e + 1
	});
}
function Zr({ items: e, keyOf: n, selectedKey: r, onSelect: i, renderRow: a, renderCompactRow: o, renderDetail: s, railTitle: c, railWidth: l = 340, compactWidth: u = 72, storageKey: d, emptyDetail: f, paneFooter: p, className: m, "data-testid": h = "master-detail" }) {
	let [g, _] = Y(() => qr(d)), v = W(() => {
		_((e) => {
			let t = !e;
			return Jr(d, t), t;
		});
	}, [d]), y = q(() => e.findIndex((e) => n(e) === r), [
		e,
		n,
		r
	]), b = y >= 0 ? e[y] : null, x = (t) => {
		if (t.key !== "ArrowDown" && t.key !== "ArrowUp" || e.length === 0) return;
		t.preventDefault();
		let r = t.key === "ArrowDown" ? 1 : -1;
		i(n(e[((y >= 0 ? y : r > 0 ? -1 : 0) + r + e.length) % e.length]));
	}, S = b ? s(b, y) : f;
	return /* @__PURE__ */ Q("div", {
		className: t("flex overflow-hidden rounded-lg border border-border bg-surface", m),
		"data-testid": h,
		children: [/* @__PURE__ */ Q("nav", {
			className: "flex flex-shrink-0 flex-col overflow-y-auto border-r border-border",
			style: { width: g ? u : l },
			onKeyDown: x,
			"aria-label": typeof c == "string" ? c : "Items",
			"data-testid": `${h}-rail`,
			children: [/* @__PURE__ */ Q("div", {
				className: t("flex items-center gap-1 border-b border-border px-3 py-2", g ? "justify-center" : "justify-between"),
				children: [!g && c && /* @__PURE__ */ Z("span", {
					className: "truncate text-xs font-semibold uppercase tracking-wide text-text-tertiary",
					children: c
				}), /* @__PURE__ */ Z("button", {
					type: "button",
					onClick: v,
					"aria-label": g ? "Expand list" : "Collapse list",
					"data-testid": `${h}-toggle`,
					className: "flex-shrink-0 rounded-md p-1 text-text-tertiary transition-colors hover:bg-surface-hover hover:text-text-primary",
					children: /* @__PURE__ */ Z(Yr, { direction: g ? "right" : "left" })
				})]
			}), /* @__PURE__ */ Z("div", {
				className: "flex flex-col",
				children: e.map((e, s) => {
					let c = n(e), l = c === r;
					return /* @__PURE__ */ Z("div", {
						role: "button",
						tabIndex: 0,
						"aria-current": l,
						onClick: () => i(c),
						onKeyDown: (e) => {
							(e.key === "Enter" || e.key === " ") && (e.preventDefault(), i(c));
						},
						"data-testid": `${h}-row-${c}`,
						className: t("cursor-pointer border-l-2 text-left transition-colors", l ? "border-primary bg-surface-hover" : "border-transparent hover:bg-surface-hover"),
						children: g ? o?.(e, s, l) ?? /* @__PURE__ */ Z("div", {
							className: "flex justify-center py-2.5",
							children: /* @__PURE__ */ Z(Xr, {
								index: s,
								selected: l
							})
						}) : a(e, s, l)
					}, c);
				})
			})]
		}), p == null ? /* @__PURE__ */ Z("div", {
			className: "min-w-0 flex-1 overflow-y-auto",
			"data-testid": `${h}-detail`,
			children: S
		}) : /* @__PURE__ */ Q("div", {
			className: "flex min-h-0 min-w-0 flex-1 flex-col",
			"data-testid": `${h}-pane-column`,
			children: [/* @__PURE__ */ Z("div", {
				className: "min-h-0 flex-1 overflow-y-auto",
				"data-testid": `${h}-detail`,
				children: S
			}), /* @__PURE__ */ Z("div", {
				className: "shrink-0 bg-surface",
				"data-testid": `${h}-pane-footer`,
				children: p
			})]
		})]
	});
}
//#endregion
//#region src/components/shared/TreeView.tsx
function Qr(e) {
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
function $r(e) {
	return typeof CSS < "u" && typeof CSS.escape == "function" ? CSS.escape(e) : e;
}
function ei(e, t) {
	let n = /* @__PURE__ */ new Set();
	if (!t) return n;
	let r = new Map(e.map((e) => [e.id, e])), i = r.get(t);
	for (; i?.parentId;) n.add(i.parentId), i = r.get(i.parentId);
	return n;
}
function ti({ expanded: e }) {
	return /* @__PURE__ */ Z("svg", {
		className: t("h-3.5 w-3.5 transition-transform", e ? "" : "-rotate-90"),
		viewBox: "0 0 16 16",
		fill: "none",
		"aria-hidden": "true",
		children: /* @__PURE__ */ Z("path", {
			d: "M4 6l4 4 4-4",
			stroke: "currentColor",
			strokeWidth: "1.5",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		})
	});
}
function ni(e) {
	let t = e.currentTarget.getBoundingClientRect(), n = e.clientY - t.top;
	return n < t.height / 3 ? "before" : n > t.height * 2 / 3 ? "after" : "into";
}
function ri({ entry: e, depth: n, expanded: r, onToggle: i, selectedId: a, onSelect: o, renderTrailing: s, rowMenu: c, rowMenuLabel: l, dragEnabled: u, canDragNode: d, canDrop: f, dragRef: p, dropTarget: m, setDropTarget: h, onDrop: g, testId: _, focusedId: v, setFocusedId: y, size: b }) {
	let x = r.has(e.id), S = e.children.length > 0, C = e.id === a, w = m?.id === e.id, T = u && !e.disabled && e.status !== "pending" && (d?.(e) ?? !0), E = c?.(e), D = !!E && E.some((e) => e.items.length > 0), O = b === "rail", k = b === "md" || O;
	return /* @__PURE__ */ Q("div", { children: [/* @__PURE__ */ Q("div", {
		draggable: T,
		onDragStart: (t) => {
			if (!T) {
				t.preventDefault();
				return;
			}
			t.dataTransfer.setData("text/plain", e.id), t.dataTransfer.effectAllowed = "move", p.current = { id: e.id };
		},
		onDragOver: (t) => {
			let n = p.current;
			if (!n || n.id === e.id) return;
			let r = ni(t);
			if (!f(n.id, e.id, r)) {
				h(null);
				return;
			}
			t.preventDefault(), t.dataTransfer.dropEffect = "move", h({
				id: e.id,
				position: r
			});
		},
		onDragLeave: () => {
			m?.id === e.id && h(null);
		},
		onDrop: (t) => {
			let n = p.current;
			if (!n || n.id === e.id) return;
			t.preventDefault();
			let r = ni(t);
			h(null), f(n.id, e.id, r) && g(e.id, r), p.current = null;
		},
		onDragEnd: () => {
			p.current = null, h(null);
		},
		onClick: () => {
			e.disabled || (o(e.id), S && i(e.id));
		},
		...D ? { onContextMenu: (e) => {
			e.preventDefault(), ii(e.currentTarget);
		} } : {},
		role: "treeitem",
		"aria-selected": C,
		"aria-disabled": e.disabled,
		"aria-level": n + 1,
		"aria-busy": e.status === "pending" || void 0,
		"data-status": e.status,
		...S ? { "aria-expanded": x } : {},
		tabIndex: v === e.id ? 0 : -1,
		onFocus: () => y(e.id),
		"data-testid": `${_}-row-${e.id}`,
		className: t("group relative flex items-center border-l-2 transition-colors", "select-none outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary", O ? t("min-h-9 gap-1.5 pr-2.5", Ee, Ce) : k ? "min-h-8 gap-1.5 py-1 pr-2.5 text-[15px] leading-6" : "gap-1 py-1.5 pr-2 text-sm", T ? "cursor-grab active:cursor-grabbing" : "cursor-pointer", C ? k ? "border-primary bg-primary-bg font-medium text-primary-fg" : "border-primary bg-surface-hover font-semibold text-text-primary" : k ? "border-transparent text-text-primary hover:bg-surface-hover" : "border-transparent text-text-secondary hover:bg-surface-hover", e.disabled && "cursor-not-allowed opacity-50", e.status === "pending" && "pointer-events-none opacity-50", e.status === "moved" && "bg-success/10", w && m?.position === "into" && "ring-1 ring-inset ring-primary", w && m?.position === "before" && "shadow-[inset_0_2px_0_0_var(--color-primary)]", w && m?.position === "after" && "shadow-[inset_0_-2px_0_0_var(--color-primary)]"),
		style: { paddingLeft: n * (k ? 18 : 14) + 8 },
		children: [
			S ? /* @__PURE__ */ Z("button", {
				type: "button",
				onClick: (t) => {
					t.stopPropagation(), i(e.id);
				},
				"aria-label": x ? "Collapse" : "Expand",
				className: "flex h-5 w-5 flex-shrink-0 items-center justify-center text-text-tertiary hover:text-text-primary",
				children: /* @__PURE__ */ Z(ti, { expanded: x })
			}) : /* @__PURE__ */ Z("span", {
				className: "h-5 w-5 flex-shrink-0",
				"aria-hidden": "true"
			}),
			e.icon && /* @__PURE__ */ Z("span", {
				className: t("flex flex-shrink-0 items-center", k && (C ? "text-primary-fg" : "text-text-secondary")),
				"data-testid": `${_}-icon-${e.id}`,
				children: e.icon
			}),
			/* @__PURE__ */ Z("span", {
				className: "min-w-0 flex-1 truncate",
				title: e.title,
				"data-ui-text": O ? "rail-item" : void 0,
				children: e.title
			}),
			e.meta && /* @__PURE__ */ Z("span", {
				className: t("flex-shrink-0 text-text-tertiary", O ? "text-[12px] font-medium leading-4 tabular-nums text-text-secondary" : k ? "text-[13px] tabular-nums" : "text-xs"),
				children: e.meta
			}),
			e.hoverMeta && /* @__PURE__ */ Z("span", {
				"data-testid": `${_}-hover-meta-${e.id}`,
				className: t("sr-only flex-shrink-0 text-text-tertiary", O ? "text-[12px] font-medium leading-4 tabular-nums text-text-secondary" : "text-xs", "group-hover:not-sr-only group-focus:not-sr-only group-focus-within:not-sr-only"),
				children: e.hoverMeta
			}),
			e.badge,
			s?.(e),
			D && /* @__PURE__ */ Z("span", {
				"data-tree-row-menu": "",
				className: t("flex flex-shrink-0 items-center", k && "pointer-events-none absolute inset-y-0 right-1.5 opacity-0 group-hover:pointer-events-auto group-hover:opacity-100 group-focus:pointer-events-auto group-focus:opacity-100 group-focus-within:pointer-events-auto group-focus-within:opacity-100 has-[[aria-expanded=true]]:pointer-events-auto has-[[aria-expanded=true]]:opacity-100"),
				onClick: (e) => e.stopPropagation(),
				onContextMenu: (e) => e.stopPropagation(),
				children: /* @__PURE__ */ Z(pe, {
					trigger: /* @__PURE__ */ Z("span", {
						"aria-hidden": "true",
						className: "text-sm leading-none",
						children: "⋯"
					}),
					triggerLabel: l?.(e) ?? `Actions for ${e.title}`,
					triggerTabIndex: v === e.id ? 0 : -1,
					triggerTestId: `${_}-menu-${e.id}`,
					align: "end",
					sections: E,
					"data-testid": `${_}-menu-panel-${e.id}`,
					triggerClassName: t("h-5 w-6 border-transparent px-0 py-0 opacity-0 transition-opacity motion-reduce:transition-none", "group-hover:opacity-100 group-focus:opacity-100 group-focus-within:opacity-100 focus-visible:opacity-100 aria-expanded:opacity-100", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", k && "h-6 w-7 bg-surface-hover")
				})
			})
		]
	}), x && e.children.map((e) => /* @__PURE__ */ Z(ri, {
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
function ii(e) {
	let t = e.querySelector("[data-tree-row-menu] button[aria-haspopup=\"menu\"]");
	return t ? (t.getAttribute("aria-expanded") !== "true" && t.click(), !0) : !1;
}
function ai(e, t) {
	let n = [], r = (e) => {
		for (let i of e) n.push(i.id), t.has(i.id) && i.children.length > 0 && r(i.children);
	};
	return r(e), n;
}
function oi({ nodes: e, selectedId: n, onSelect: r, defaultExpanded: i, expanded: a, onToggle: o, onReorder: s, canDragNode: c, canDropNode: l, renderTrailing: u, rowMenu: d, rowMenuLabel: f, size: p = "sm", className: m, "data-testid": h = "tree-view" }) {
	let g = q(() => Qr(e), [e]), [_, v] = Y(() => new Set(i ?? [])), y = a !== void 0, b = q(() => y ? new Set(a) : _, [
		y,
		a,
		_
	]), [x, S] = Y(null), C = J(null), w = J(null), [T, E] = Y(null), D = q(() => new Map(e.map((e) => [e.id, e])), [e]);
	G(() => {
		let t = ei(e, n);
		if (t.size !== 0) {
			if (y) {
				t.forEach((e) => {
					a.includes(e) || o?.(e, !0);
				});
				return;
			}
			v((e) => {
				let n = !1, r = new Set(e);
				return t.forEach((e) => {
					r.has(e) || (r.add(e), n = !0);
				}), n ? r : e;
			});
		}
	}, [e, n]);
	let O = (e, t) => {
		o?.(e, t), !y && v((n) => {
			if (n.has(e) === t) return n;
			let r = new Set(n);
			return t ? r.add(e) : r.delete(e), r;
		});
	}, k = (e) => O(e, !b.has(e)), A = q(() => ai(g, b), [g, b]), j = x && A.includes(x) ? x : n && A.includes(n) ? n : A[0] ?? null, M = (e) => {
		e && (S(e), w.current?.querySelector(`[data-testid="${h}-row-${$r(e)}"]`)?.focus());
	}, ee = (t) => {
		let n = t.target, i = n.closest("[role=\"treeitem\"]");
		if (!i || n.closest("[data-tree-row-menu]")) return;
		if (t.key === "F10" && t.shiftKey || t.key === "ContextMenu") {
			ii(i) && t.preventDefault();
			return;
		}
		let a = `${h}-row-`, o = (i.getAttribute("data-testid") ?? "").slice(a.length);
		if (!o || !D.has(o)) return;
		let s = A.indexOf(o), c = D.get(o), l = e.some((e) => e.parentId === o);
		switch (t.key) {
			case "ArrowDown":
				t.preventDefault(), M(A[Math.min(s + 1, A.length - 1)] ?? null);
				return;
			case "ArrowUp":
				t.preventDefault(), M(A[Math.max(s - 1, 0)] ?? null);
				return;
			case "Home":
				t.preventDefault(), M(A[0] ?? null);
				return;
			case "End":
				t.preventDefault(), M(A[A.length - 1] ?? null);
				return;
			case "ArrowRight":
				t.preventDefault(), l && !b.has(o) ? O(o, !0) : l && M(A[s + 1] ?? null);
				return;
			case "ArrowLeft":
				t.preventDefault(), l && b.has(o) ? O(o, !1) : M(c.parentId);
				return;
			case "Enter":
			case " ":
				t.preventDefault(), c.disabled || r(o), l && k(o);
				return;
		}
	}, te = (t, n) => {
		let r = C.current?.id;
		if (!r || !s) return;
		let i = D.get(t);
		if (!i || !N(r, t, n)) return;
		let a = i;
		for (; a?.parentId;) {
			if (a.parentId === r) return;
			a = D.get(a.parentId);
		}
		if (n === "into") {
			let n = e.filter((e) => e.parentId === t && e.id !== r).length;
			s(r, t, n);
			return;
		}
		let o = e.filter((e) => e.parentId === i.parentId && e.id !== r).map((e) => e.id).indexOf(t);
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
	return e.length === 0 ? null : /* @__PURE__ */ Z("div", {
		ref: w,
		role: "tree",
		className: t("flex flex-col", m),
		"data-testid": h,
		onKeyDown: ee,
		children: g.map((e) => /* @__PURE__ */ Z(ri, {
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
//#region src/components/shared/WorkflowStepper.tsx
var si = {
	sm: "h-5 w-5",
	md: "h-6 w-6",
	compact: "h-4 w-4"
}, ci = {
	sm: "text-[10px] font-medium leading-none",
	md: "text-[11px] font-medium leading-none",
	compact: "text-xs font-semibold leading-4"
};
function li({ compact: e }) {
	return /* @__PURE__ */ Z("svg", {
		viewBox: "0 0 16 16",
		fill: "none",
		className: e ? "h-2.5 w-2.5" : "h-3 w-3",
		"aria-hidden": "true",
		children: /* @__PURE__ */ Z("path", {
			d: "M3.5 8.5l3 3 6-6.5",
			stroke: "currentColor",
			strokeWidth: "1.75",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		})
	});
}
function ui({ steps: e, size: n, wrap: r = !1, className: i, "aria-label": a, "data-testid": c = "workflow-stepper" }) {
	let l = o();
	n === "sm" && s("WorkflowStepper", "sm");
	let u = n ?? (l === "compact" ? "compact" : "md"), d = u === "compact", f = e.some((e) => e.description != null);
	return /* @__PURE__ */ Z("ol", {
		className: t(f || d ? "m-0 inline-flex w-fit max-w-full list-none p-0" : "flex", r ? "flex-wrap gap-y-2" : "overflow-x-auto", f ? "items-start" : "items-center", i),
		...r ? { "data-wrap": "" } : {},
		"data-testid": c,
		...d ? { "data-density": "compact" } : {},
		...a ? { "aria-label": a } : {},
		children: e.map((n, r) => {
			let i = r === e.length - 1, a = e[r + 1], o = n.done ? a?.done ? "bg-success" : "bg-gradient-to-r from-success to-success/30" : "bg-border", s = n.outcome ?? (n.done ? "done" : n.active ? "active" : "pending"), c = /* @__PURE__ */ Z("div", {
				className: t("flex flex-shrink-0 items-center justify-center rounded-full transition-colors", si[u], n.outcome === "failed" ? "border-2 border-danger bg-danger-bg text-danger" : n.outcome === "cancelled" ? "border-2 border-border bg-surface-inset text-text-secondary" : n.done ? "bg-success text-white" : n.active ? t(d ? "border-[1.5px]" : "border-2", "border-info bg-info-bg") : "border border-border bg-surface-inset"),
				children: n.outcome ? /* @__PURE__ */ Z("span", { className: t("rounded-full", n.outcome === "failed" ? "bg-danger" : "bg-text-secondary", d ? "h-1.5 w-1.5" : "h-2 w-2") }) : n.done ? /* @__PURE__ */ Z(li, { compact: d }) : n.active ? /* @__PURE__ */ Z("span", { className: t("rounded-full bg-info", d ? "h-1.5 w-1.5" : "h-2 w-2") }) : null
			}), l = /* @__PURE__ */ Z("span", {
				className: t(f ? "block text-xs font-semibold leading-4" : ci[u], n.active ? "text-text-primary" : n.done ? "text-text-secondary" : "text-text-tertiary"),
				children: n.label
			});
			return f ? /* @__PURE__ */ Q("li", {
				"aria-current": n.active ? "step" : void 0,
				"data-state": s,
				className: t("shrink-0", d ? "w-32" : "w-40"),
				children: [/* @__PURE__ */ Q("div", {
					className: "flex items-center",
					children: [c, !i && /* @__PURE__ */ Z("div", {
						"aria-hidden": "true",
						"data-workflow-connector": "",
						className: t("h-0.5 flex-1", o)
					})]
				}), /* @__PURE__ */ Q("div", {
					className: "mt-2 pr-3 space-y-1",
					children: [l, n.description != null && /* @__PURE__ */ Z("div", {
						"data-ui-text": "workflow-step-description",
						className: "text-xs text-text-secondary leading-5 break-words",
						children: n.description
					})]
				})]
			}, n.step) : /* @__PURE__ */ Q("li", {
				"aria-current": n.active ? "step" : void 0,
				"data-state": s,
				className: d ? "flex items-center" : "flex flex-1 items-center last:flex-none",
				children: [/* @__PURE__ */ Q("div", {
					className: t("flex items-center whitespace-nowrap", d ? "gap-1" : "gap-1.5"),
					children: [c, l]
				}), !i && /* @__PURE__ */ Z("div", {
					"aria-hidden": "true",
					className: t(d ? "mx-2 h-0.5 w-3" : "mx-2 h-1 flex-1", "rounded-full transition-colors", o)
				})]
			}, n.step);
		})
	});
}
//#endregion
//#region src/components/shared/Wizard.tsx
function di() {
	return /* @__PURE__ */ Z("svg", {
		viewBox: "0 0 16 16",
		fill: "none",
		className: "h-3 w-3",
		"aria-hidden": "true",
		children: /* @__PURE__ */ Z("path", {
			d: "M3.5 8.5l3 3 6-6.5",
			stroke: "currentColor",
			strokeWidth: "1.75",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		})
	});
}
function fi({ steps: e, activeKey: n, onStep: r, onFinish: i, finishLabel: a = "Finish", className: o, "data-testid": s = "wizard" }) {
	let c = e.findIndex((e) => e.key === n), l = c >= 0 ? e[c] : e[0], u = l?.canAdvance ?? !0, d = c === e.length - 1;
	return /* @__PURE__ */ Q("div", {
		className: t("flex flex-col gap-4 sm:flex-row", o),
		"data-testid": s,
		children: [/* @__PURE__ */ Z("ol", {
			className: "flex flex-shrink-0 flex-col gap-1 sm:w-56",
			"data-testid": `${s}-rail`,
			children: e.map((e, i) => {
				let a = i < c, o = e.key === n;
				return /* @__PURE__ */ Z("li", { children: /* @__PURE__ */ Q("button", {
					type: "button",
					onClick: () => r(e.key),
					"aria-current": o ? "step" : void 0,
					"data-testid": `${s}-step-${e.key}`,
					className: t("flex w-full items-center gap-2.5 rounded-md px-2.5 py-2 text-left text-sm transition-colors", o ? "bg-surface-hover font-semibold text-text-primary" : "text-text-secondary hover:bg-surface-hover"),
					children: [/* @__PURE__ */ Z("span", {
						className: t("flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full text-xs font-semibold", a ? "bg-success text-white" : o ? "border-2 border-info bg-info-bg text-info-fg" : "border border-border bg-surface-inset text-text-tertiary"),
						children: a ? /* @__PURE__ */ Z(di, {}) : i + 1
					}), /* @__PURE__ */ Z("span", {
						className: "truncate",
						children: e.label
					})]
				}) }, e.key);
			})
		}), /* @__PURE__ */ Q("div", {
			className: "flex min-w-0 flex-1 flex-col gap-4",
			children: [/* @__PURE__ */ Z("div", {
				className: "min-w-0 flex-1",
				"data-testid": `${s}-content`,
				children: l?.content
			}), /* @__PURE__ */ Q("div", {
				className: "flex items-center justify-between gap-2 border-t border-border pt-3",
				children: [/* @__PURE__ */ Z("button", {
					type: "button",
					onClick: () => {
						c > 0 && r(e[c - 1].key);
					},
					disabled: c <= 0,
					"data-testid": `${s}-back`,
					className: "rounded-md px-3 py-1.5 text-sm font-semibold text-text-secondary transition-colors hover:bg-surface-hover disabled:cursor-not-allowed disabled:opacity-50",
					children: "Back"
				}), /* @__PURE__ */ Z("button", {
					type: "button",
					onClick: () => {
						u && (d ? i?.() : r(e[c + 1].key));
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
//#region src/components/shared/FormWizard.tsx
var pi = "input:not([type=\"hidden\"]):not([disabled]), select:not([disabled]), textarea:not([disabled]), [role=\"combobox\"], button:not([disabled])";
function mi(e) {
	e && (e.querySelector("[aria-invalid=\"true\"]") ?? e.querySelector(pi))?.focus();
}
function hi({ sections: e, mode: n = "single", stepper: r, activeKey: i, onStepChange: o, summary: s, summaryTitle: c = "Summary", aside: l, actionsPlacement: u = "summary", onSubmit: d, submitLabel: f = "Submit", submittingLabel: p = "Submitting…", submitting: m = !1, submitDisabled: h = !1, submitError: g, onDismissError: _, secondaryActions: v, backLabel: y = "Back", nextLabel: b = "Next", "aria-label": x, className: S, "data-testid": C = "form-wizard" }) {
	let w = K(), T = q(() => e.filter((e) => !e.hidden), [e]), E = n === "stepped", [D, O] = Y(void 0), k = i ?? D, A = Math.max(0, T.findIndex((e) => e.key === k)), j = T[A], M = A >= T.length - 1, [ee, te] = Y(() => /* @__PURE__ */ new Set()), [N, P] = Y(null), ne = J(/* @__PURE__ */ new Map()), F = W((e) => {
		i === void 0 && O(e), o?.(e);
	}, [i, o]);
	G(() => {
		if (!N) return;
		let e = ne.current.get(N.key) ?? null;
		N.invalid ? mi(e) : e?.querySelector("[data-form-wizard-heading]")?.focus(), P(null);
	}, [N, A]);
	let I = (e) => te((t) => /* @__PURE__ */ new Set([...t, ...e])), re = () => {
		if (!j) return;
		if (j.error) {
			I([j.key]), P({
				key: j.key,
				invalid: !0
			});
			return;
		}
		let e = T[A + 1];
		e && (F(e.key), P({
			key: e.key,
			invalid: !1
		}));
	}, ie = () => {
		let e = T[A - 1];
		e && (F(e.key), P({
			key: e.key,
			invalid: !1
		}));
	}, ae = () => {
		if (m || h) return;
		let e = T.filter((e) => e.error);
		if (e.length) {
			I(e.map((e) => e.key));
			let t = e[0];
			E && t.key !== j?.key && F(t.key), P({
				key: t.key,
				invalid: !0
			});
			return;
		}
		d();
	}, oe = (e) => {
		e.preventDefault(), E && !M ? re() : ae();
	}, L = r ?? E, se = T.map((e, t) => ({
		step: t + 1,
		label: e.label ?? e.title,
		done: E ? t < A : !e.error,
		active: E ? t === A : !1
	})), ce = E ? j ? [j] : [] : T, le = s !== void 0 || l !== void 0, R = !E && s !== void 0 && u === "summary", z = T.filter((e) => e.error && ee.has(e.key)).length, B = E && !M ? /* @__PURE__ */ Z(a, {
		type: "submit",
		size: "sm",
		variant: "primary",
		"data-testid": `${C}-next`,
		children: b
	}) : /* @__PURE__ */ Z(a, {
		type: "submit",
		size: "sm",
		variant: "primary",
		disabled: m || h,
		"aria-busy": m || void 0,
		className: R ? "w-full justify-center" : void 0,
		"data-testid": `${C}-submit`,
		children: m ? p : f
	}), ue = /* @__PURE__ */ Q("div", {
		className: "flex flex-col gap-3",
		"data-form-wizard-actions": R ? "summary" : "form",
		children: [
			g && /* @__PURE__ */ Z(_e, {
				tone: "error",
				onDismiss: _,
				"data-testid": `${C}-error`,
				children: g
			}),
			z > 0 && !E && /* @__PURE__ */ Z("p", {
				className: "m-0 text-xs leading-4 text-danger-fg",
				role: "status",
				children: z === 1 ? "One section needs attention above." : `${z} sections need attention above.`
			}),
			R ? /* @__PURE__ */ Q("div", {
				className: "flex flex-col gap-2",
				children: [B, v]
			}) : /* @__PURE__ */ Q("div", {
				className: t("flex items-center gap-2", !E && "border-t border-border pt-4"),
				children: [E && /* @__PURE__ */ Z(a, {
					type: "button",
					size: "sm",
					variant: "ghost",
					onClick: ie,
					disabled: A === 0,
					"data-testid": `${C}-back`,
					children: y
				}), /* @__PURE__ */ Q("div", {
					className: "ml-auto flex items-center gap-2",
					children: [v, B]
				})]
			})
		]
	});
	return /* @__PURE__ */ Z(X, { children: /* @__PURE__ */ Z("div", {
		className: t("@container w-full min-w-0", S),
		"data-form-wizard": "",
		"data-form-wizard-mode": n,
		"data-testid": C,
		children: /* @__PURE__ */ Q("form", {
			noValidate: !0,
			"aria-label": x,
			onSubmit: oe,
			className: t("grid items-start gap-6", le && "@min-[56rem]:grid-cols-[minmax(0,48rem)_20rem]"),
			children: [/* @__PURE__ */ Q("div", {
				className: "flex min-w-0 max-w-3xl flex-col gap-6",
				"data-form-wizard-column": "",
				children: [
					L && T.length > 1 && /* @__PURE__ */ Z(ui, {
						size: "compact",
						steps: se,
						"aria-label": E ? `Step ${A + 1} of ${T.length}` : "Form sections",
						"data-testid": `${C}-stepper`
					}),
					ce.map((e, n) => {
						let r = `${w}-${e.key}-title`, i = `${w}-${e.key}-error`, a = !!e.error && ee.has(e.key);
						return /* @__PURE__ */ Q("section", {
							ref: (t) => {
								t ? ne.current.set(e.key, t) : ne.current.delete(e.key);
							},
							"aria-labelledby": r,
							"aria-describedby": a ? i : void 0,
							"data-form-wizard-section": e.key,
							"data-testid": e["data-testid"] ?? `${C}-section-${e.key}`,
							className: t("flex min-w-0 flex-col gap-4", !E && n > 0 && "border-t border-border pt-6"),
							children: [/* @__PURE__ */ Q("header", {
								className: "flex flex-col gap-1",
								children: [
									/* @__PURE__ */ Z("h2", {
										id: r,
										tabIndex: -1,
										"data-form-wizard-heading": "",
										className: "m-0 text-sm font-semibold leading-5 text-text-primary outline-none",
										children: e.title
									}),
									e.description && /* @__PURE__ */ Z("p", {
										className: "m-0 text-xs font-normal leading-4 text-text-secondary",
										children: e.description
									}),
									a && /* @__PURE__ */ Z("p", {
										id: i,
										role: "alert",
										className: "m-0 text-xs font-normal leading-4 text-danger-fg",
										"data-testid": `${C}-section-${e.key}-error`,
										children: e.error
									})
								]
							}), /* @__PURE__ */ Z("div", {
								className: "flex min-w-0 flex-col gap-4",
								children: e.content
							})]
						}, e.key);
					}),
					!R && ue
				]
			}), le && /* @__PURE__ */ Q("div", {
				className: "flex min-w-0 flex-col gap-4 @min-[56rem]:sticky @min-[56rem]:top-4",
				"data-form-wizard-side": "",
				children: [s !== void 0 && /* @__PURE__ */ Q("section", {
					"aria-labelledby": `${w}-summary`,
					"data-form-wizard-summary": "",
					className: "flex flex-col gap-4 rounded-lg border border-border bg-surface-panel p-4",
					"data-testid": `${C}-summary`,
					children: [
						/* @__PURE__ */ Z("h2", {
							id: `${w}-summary`,
							className: "m-0 text-sm font-semibold leading-5 text-text-primary",
							children: c
						}),
						/* @__PURE__ */ Z("div", {
							className: "flex min-w-0 flex-col gap-3",
							children: s
						}),
						R && ue
					]
				}), l !== void 0 && /* @__PURE__ */ Z("div", {
					className: "text-xs leading-4 text-text-secondary",
					"data-form-wizard-aside": "",
					children: l
				})]
			})]
		})
	}) });
}
//#endregion
//#region src/components/shared/MarkdownView.tsx
var gi = [
	"tsx",
	"ts",
	"jsx",
	"js",
	"json",
	"bash",
	"sh",
	"text"
];
function _i(e) {
	let t = /language-(\w+)/.exec(e ?? "")?.[1]?.toLowerCase();
	return gi.includes(t ?? "") ? t : "text";
}
function vi(e) {
	return typeof e == "string" || typeof e == "number" ? String(e) : Array.isArray(e) ? e.map(vi).join("") : e && typeof e == "object" && "props" in e ? vi(e.props?.children) : "";
}
var yi = {
	sm: {
		body: "text-sm",
		h1: "mb-2 mt-4 text-sm font-semibold",
		h2: "mb-1.5 mt-4 text-sm font-semibold",
		h3: "mb-1.5 mt-3 text-sm font-semibold",
		h4: "mb-1 mt-3 text-sm font-semibold",
		inlineCode: "text-[12px]"
	},
	md: {
		body: "text-sm",
		h1: "mb-3 mt-6 text-sm font-semibold",
		h2: "mb-2 mt-5 text-sm font-semibold",
		h3: "mb-2 mt-4 text-sm font-semibold",
		h4: "",
		inlineCode: "text-[12px]"
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
function bi(e) {
	let n = yi[e], r = {
		table({ children: e }) {
			return /* @__PURE__ */ Z("div", {
				className: "overflow-x-auto",
				children: /* @__PURE__ */ Z("table", {
					className: t("w-full border-collapse", n.body),
					children: e
				})
			});
		},
		th({ children: e }) {
			return /* @__PURE__ */ Z("th", {
				className: "border-b border-border px-3 py-1.5 text-left font-semibold text-text-primary",
				children: e
			});
		},
		td({ children: e }) {
			return /* @__PURE__ */ Z("td", {
				className: "border-b border-border px-3 py-1.5 text-text-secondary",
				children: e
			});
		},
		a({ href: e, children: t }) {
			return /* @__PURE__ */ Z("a", {
				href: e,
				target: "_blank",
				rel: "noreferrer",
				className: "text-primary underline underline-offset-2 hover:text-primary-hover",
				children: t
			});
		},
		h1({ children: e }) {
			return /* @__PURE__ */ Z("h1", {
				className: t(n.h1, "text-text-primary first:mt-0"),
				children: e
			});
		},
		h2({ children: e }) {
			return /* @__PURE__ */ Z("h2", {
				className: t(n.h2, "text-text-primary first:mt-0"),
				children: e
			});
		},
		h3({ children: e }) {
			return /* @__PURE__ */ Z("h3", {
				className: t(n.h3, "text-text-primary first:mt-0"),
				children: e
			});
		},
		p({ children: e }) {
			return /* @__PURE__ */ Z("p", {
				className: t("mb-3 leading-relaxed text-text-secondary last:mb-0", n.body),
				children: e
			});
		},
		ul({ children: e }) {
			return /* @__PURE__ */ Z("ul", {
				className: t("mb-3 list-disc space-y-1 pl-5 text-text-secondary", n.body),
				children: e
			});
		},
		ol({ children: e }) {
			return /* @__PURE__ */ Z("ol", {
				className: t("mb-3 list-decimal space-y-1 pl-5 text-text-secondary", n.body),
				children: e
			});
		},
		blockquote({ children: e }) {
			return /* @__PURE__ */ Z("blockquote", {
				className: t("mb-3 border-l-2 border-border pl-3 italic text-text-tertiary", n.body),
				children: e
			});
		},
		hr() {
			return /* @__PURE__ */ Z("hr", { className: "my-4 border-border" });
		},
		pre({ children: e, className: t }) {
			return /* @__PURE__ */ Z(Si, {
				className: t,
				children: e
			});
		},
		code({ className: e, children: r }) {
			return e ? /* @__PURE__ */ Z("code", {
				className: e,
				children: r
			}) : /* @__PURE__ */ Z("code", {
				"data-ui-inline-code": "",
				className: t("rounded bg-surface-inset px-1 py-0.5 text-text-primary", n.inlineCode),
				children: r
			});
		}
	};
	return n.h4 && (r.h4 = ({ children: e }) => /* @__PURE__ */ Z("h4", {
		className: t(n.h4, "text-text-primary first:mt-0"),
		children: e
	})), r;
}
var xi = {
	sm: bi("sm"),
	md: bi("md"),
	lg: bi("lg")
};
function Si({ children: e, className: t }) {
	let n = Array.isArray(e) ? e[0] : e, r = _i(n && typeof n == "object" && "props" in n ? n.props?.className : void 0), i = vi(e).replace(/\n$/, "");
	return /* @__PURE__ */ Z($e, {
		code: i,
		language: r,
		className: "mb-3",
		copyButton: !0
	});
}
function Ci({ markdown: e, scale: n = "md", className: r, "data-testid": i = "markdown-view" }) {
	return /* @__PURE__ */ Z("div", {
		className: t("min-w-0", r),
		"data-scale": n,
		"data-testid": i,
		children: /* @__PURE__ */ Z(Le, {
			remarkPlugins: [Re],
			components: xi[n] ?? xi.md,
			children: e
		})
	});
}
//#endregion
//#region src/components/shared/TenantSwitcher.tsx
var wi = 250, Ti = 300;
function Ei(e, t) {
	return e > 0 ? `${e} unread ${e === 1 ? "notice" : "notices"} in this inbox.${t ? "" : " Live updates are currently unavailable."}` : t ? "No unread notices in this inbox." : "Live notification updates are currently unavailable.";
}
function Di({ compact: e = !1 }) {
	return /* @__PURE__ */ Q("svg", {
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.25",
		className: e ? "size-5" : "size-6",
		children: [/* @__PURE__ */ Z("circle", {
			cx: "12",
			cy: "12",
			r: "6.5"
		}), /* @__PURE__ */ Z("ellipse", {
			cx: "12",
			cy: "12",
			rx: "11",
			ry: "3.5",
			transform: "rotate(-22 12 12)"
		})]
	});
}
function Oi({ label: e, size: n = "md", healthy: r = !1, motion: i = !0, destinations: o, onSelect: s, live: c = !1, showActivity: l = !0, blockedReason: u, emptyMessage: d = "No other tenants are available for your account.", resetKey: f, avatarColor: p = "var(--color-primary-bg)", avatarForeground: m = "var(--color-primary-fg)", triggerLabel: h, dialogLabel: g = "Switch tenant", errorFallback: _ = "Could not switch workspace. Try again.", className: v, "data-testid": y = "tenant-switcher" }) {
	let [x, S] = Y(!1), [C, w] = Y(!1), [T, E] = Y(""), D = J(null), O = J(null), k = J(void 0), A = K(), j = u != null && u !== !1, M = () => {
		clearTimeout(k.current), S(!1), E("");
	};
	G(() => () => clearTimeout(k.current), []), G(() => {
		M(), w(!1);
	}, [f]), G(() => {
		if (!x) return;
		let e = (e) => {
			D.current?.contains(e.target) || M();
		}, t = (e) => {
			if (e.key !== "Escape") return;
			let t = D.current?.contains(document.activeElement);
			M(), t && O.current?.focus();
		};
		return document.addEventListener("pointerdown", e), document.addEventListener("keydown", t), () => {
			document.removeEventListener("pointerdown", e), document.removeEventListener("keydown", t);
		};
	}, [x]);
	let te = async (e) => {
		if (!(C || j)) {
			w(!0), E("");
			try {
				await s(e);
			} catch (e) {
				E(e instanceof Error && e.message ? e.message : _), w(!1);
			}
		}
	};
	return /* @__PURE__ */ Q("div", {
		ref: D,
		className: t("tenant-switcher relative z-[60] min-w-0 max-w-full shrink-0", v),
		"data-testid": y,
		onPointerEnter: (e) => {
			e.pointerType === "mouse" && (clearTimeout(k.current), k.current = setTimeout(() => S(!0), wi));
		},
		onPointerLeave: () => {
			clearTimeout(k.current), D.current?.contains(document.activeElement) || (k.current = setTimeout(M, Ti));
		},
		onBlur: (e) => {
			e.currentTarget.contains(e.relatedTarget) || M();
		},
		onKeyDown: (e) => {
			e.key === "Escape" && (e.preventDefault(), M(), O.current?.focus()), e.key === "ArrowDown" && e.target === O.current && (e.preventDefault(), S(!0), requestAnimationFrame(() => D.current?.querySelector("[role=\"dialog\"] button")?.focus()));
		},
		children: [/* @__PURE__ */ Q("button", {
			ref: O,
			type: "button",
			className: t("tenant-switcher-trigger flex min-w-0 max-w-full cursor-pointer items-center gap-2 rounded-lg border-0 bg-transparent px-1 py-0.5 font-[inherit] text-text-primary", "hover:bg-surface-hover aria-expanded:bg-surface-hover", "focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-primary"),
			"aria-label": h ?? `${e}: switch tenant`,
			"aria-haspopup": "dialog",
			"aria-expanded": x,
			"aria-controls": x ? A : void 0,
			"data-testid": `${y}-trigger`,
			onClick: () => {
				clearTimeout(k.current), S(!0);
			},
			children: [/* @__PURE__ */ Q("span", {
				className: t("tenant-brand-planet relative grid shrink-0 place-items-center text-text-secondary", n === "sm" ? "size-[22px]" : "size-[26px]"),
				"aria-hidden": "true",
				children: [/* @__PURE__ */ Z(Di, { compact: n === "sm" }), r && /* @__PURE__ */ Z("span", {
					className: t("tenant-brand-orbit pointer-events-none absolute inset-0 [transform:rotate(12deg)]", i && "animate-[tenant-orbit-plane_40s_ease-in-out_infinite] motion-reduce:animate-none"),
					"aria-hidden": "true",
					"data-motion": i ? "on" : "off",
					children: /* @__PURE__ */ Z("span", { className: t("absolute left-[calc(50%-2px)] top-[calc(50%-2px)] size-1 rounded-full bg-success shadow-[0_0_0_1px_var(--color-surface)] [transform:translate(12px,7px)]", i && "animate-[tenant-orbit_5s_linear_infinite] motion-reduce:animate-none") })
				})]
			}), /* @__PURE__ */ Z(F, {
				size: n === "sm" ? "sm" : "base",
				weight: n === "sm" ? "medium" : "bold",
				className: t("tenant-brand-label min-w-0 truncate", n === "sm" ? "leading-5" : "leading-[22px]"),
				children: e
			})]
		}), x && /* @__PURE__ */ Z("div", {
			id: A,
			role: "dialog",
			"aria-label": g,
			"data-testid": `${y}-panel`,
			className: t("tenant-switcher-panel absolute left-0 top-[calc(100%+8px)] w-[min(224px,calc(100vw-32px))] rounded-xl border border-border bg-surface p-1.5 shadow-lg", "before:absolute before:inset-x-0 before:-top-2.5 before:h-2.5 before:content-['']"),
			children: /* @__PURE__ */ Q(ne, {
				gap: "sm",
				children: [
					T && /* @__PURE__ */ Z(_e, {
						tone: "error",
						children: T
					}),
					j && /* @__PURE__ */ Z(F, {
						as: "p",
						size: "xs",
						tone: "secondary",
						className: "m-0",
						children: u
					}),
					o.length > 0 && /* @__PURE__ */ Z(ne, {
						gap: "none",
						className: "tenant-destinations",
						children: o.map((e) => {
							let n = Math.max(0, e.unread ?? 0), r = Ei(n, c);
							return /* @__PURE__ */ Q(P, {
								role: "group",
								gap: "none",
								align: "center",
								wrap: !1,
								className: "tenant-destination rounded-md hover:bg-surface-hover focus-within:bg-surface-hover",
								"aria-label": n > 0 ? `${e.label}, ${n} unread notifications` : e.label,
								"data-testid": `${y}-destination-${e.id}`,
								children: [/* @__PURE__ */ Q(a, {
									variant: "ghost",
									size: "sm",
									className: t("tenant-destination-action h-[38px] min-w-0 flex-1 justify-start gap-2 border-0 bg-transparent px-2 py-1.5", "enabled:hover:bg-transparent focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary"),
									"aria-label": e.label,
									disabled: C || j,
									onClick: () => void te(e.id),
									children: [/* @__PURE__ */ Z("span", {
										"aria-hidden": "true",
										"data-tenant": e.id,
										children: /* @__PURE__ */ Z(V, {
											name: e.label,
											initials: e.initials ?? e.label.slice(0, 2),
											size: 24,
											color: p,
											foreground: m,
											showTitle: !1
										})
									}), /* @__PURE__ */ Z(F, {
										size: "sm",
										weight: "semibold",
										children: e.label
									})]
								}), l && /* @__PURE__ */ Z(L, {
									content: r,
									placement: "right",
									children: /* @__PURE__ */ Z("span", {
										tabIndex: 0,
										role: "img",
										"aria-label": `${e.label}: ${r}`,
										className: t("tenant-activity mr-2 inline-flex h-[30px] min-w-6 items-center justify-end gap-1 rounded-sm px-0.5 text-text-tertiary", "focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary", n > 0 && "tenant-activity-unread text-primary"),
										"data-status": n > 0 ? "unread" : c ? "empty" : "unavailable",
										children: n > 0 ? /* @__PURE__ */ Q(X, { children: [/* @__PURE__ */ Z(ee, {
											size: 14,
											"aria-hidden": "true"
										}), /* @__PURE__ */ Z("span", {
											className: "tenant-unread text-xs font-semibold tabular-nums",
											"aria-hidden": "true",
											children: n
										})] }) : /* @__PURE__ */ Z(b, {
											size: 14,
											"aria-hidden": "true"
										})
									})
								})]
							}, e.id);
						})
					}),
					o.length === 0 && /* @__PURE__ */ Z(F, {
						as: "p",
						size: "sm",
						tone: "secondary",
						className: "m-0",
						"data-testid": `${y}-empty`,
						children: d
					})
				]
			})
		})]
	});
}
//#endregion
//#region src/components/shared/AttachToggle.tsx
function ki({ attached: e, onToggle: n, labels: r = {
	add: "Add",
	added: "Added"
}, size: i = "md", tabIndex: a, className: o, "aria-label": s, "data-testid": c = "attach-toggle" }) {
	return /* @__PURE__ */ Q("button", {
		type: "button",
		"aria-pressed": e,
		"aria-label": s,
		tabIndex: a,
		"data-testid": c,
		"data-attached": e || void 0,
		onClick: (e) => {
			e.stopPropagation(), n();
		},
		onKeyDown: (e) => e.stopPropagation(),
		className: t("inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-lg font-medium transition-colors duration-100", "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary", i === "sm" ? "h-7 px-2.5 text-[13px]" : "h-9 px-3.5 text-sm", e ? "border border-transparent bg-primary-bg text-primary-fg hover:border-primary-border" : "border border-border bg-surface text-text-primary hover:bg-surface-hover", o),
		children: [e ? /* @__PURE__ */ Z(E, { size: i === "sm" ? 14 : 16 }) : /* @__PURE__ */ Z(M, { size: i === "sm" ? 14 : 18 }), e ? r.added : r.add]
	});
}
//#endregion
//#region src/components/shared/DocumentResultList.tsx
function Ai(e, t = Date.now()) {
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
function ji({ items: e, currentId: r, onCurrentChange: i, onOpen: a, onToggleAttach: o, draggable: s = !0, onDragStartItem: c, rowMenu: l, rowTrailing: u, emptyState: d, now: f, toggleLabels: p, "aria-label": m = "Documents", className: h, "data-testid": g = "document-result-list" }) {
	let _ = J(/* @__PURE__ */ new Map()), v = f ?? Date.now(), y = e.some((e) => e.id === r) ? r : e[0]?.id, b = W((t) => {
		let n = e[Math.max(0, Math.min(e.length - 1, t))];
		n && (_.current.get(n.id)?.focus(), i?.(n.id));
	}, [e, i]), S = (t, n, r) => {
		switch (t.key) {
			case "ArrowDown":
				t.preventDefault(), b(n + 1);
				break;
			case "ArrowUp":
				t.preventDefault(), b(n - 1);
				break;
			case "Home":
				t.preventDefault(), b(0);
				break;
			case "End":
				t.preventDefault(), b(e.length - 1);
				break;
			case "Enter":
			case " ": t.preventDefault(), a(r);
		}
	};
	return e.length ? /* @__PURE__ */ Z("ul", {
		"aria-label": m,
		"data-testid": g,
		className: t("m-0 flex list-none flex-col p-0", h),
		children: e.map((e, d) => {
			let f = e.id === r, m = e.id === y, h = Ai(e.updatedAt, v), g = l?.(e), b = u?.(e) ?? e.trailing ?? null;
			return /* @__PURE__ */ Q("li", {
				"data-testid": "document-result-row",
				"data-id": e.id,
				"data-current": f || void 0,
				className: t("group relative flex items-center gap-4 border-b border-border-subtle pl-4 pr-3 transition-colors duration-100", f ? "bg-primary-bg" : "hover:bg-surface-hover"),
				children: [
					f && /* @__PURE__ */ Z("span", {
						"aria-hidden": "true",
						className: "absolute inset-y-0 left-0 w-[3px] rounded-r bg-primary"
					}),
					/* @__PURE__ */ Q("div", {
						ref: (t) => {
							t ? _.current.set(e.id, t) : _.current.delete(e.id);
						},
						role: "link",
						tabIndex: m ? 0 : -1,
						"aria-current": f || void 0,
						draggable: s,
						onDragStart: s ? (t) => {
							n(t.dataTransfer, [{
								id: e.id,
								title: e.title,
								kind: e.kind
							}]), c?.(e, t.dataTransfer);
						} : void 0,
						onClick: () => a(e),
						onFocus: () => {
							e.id !== r && i?.(e.id);
						},
						onKeyDown: (t) => S(t, d, e),
						className: "flex min-w-0 flex-1 cursor-pointer items-center gap-[18px] py-2.5 outline-none focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary",
						children: [/* @__PURE__ */ Z(ke, {
							kind: e.kind,
							variant: "app",
							size: "xl"
						}), /* @__PURE__ */ Q("span", {
							className: "flex min-w-0 flex-col gap-0.5",
							children: [
								/* @__PURE__ */ Z("span", {
									className: "truncate text-sm font-semibold leading-snug text-text-primary",
									children: e.title
								}),
								e.summary && /* @__PURE__ */ Z("span", {
									className: "truncate text-sm leading-snug text-text-secondary",
									children: e.summary
								}),
								(e.folder || h) && /* @__PURE__ */ Q("span", {
									className: "flex min-w-0 items-center gap-1.5 text-sm leading-snug text-text-tertiary",
									children: [
										e.folder && /* @__PURE__ */ Z(k, {
											size: 15,
											className: "shrink-0"
										}),
										e.folder && /* @__PURE__ */ Z("span", {
											className: "truncate",
											children: e.folder
										}),
										e.folder && h && /* @__PURE__ */ Z("span", {
											"aria-hidden": "true",
											children: "·"
										}),
										h && /* @__PURE__ */ Z("span", {
											className: "shrink-0",
											children: h
										})
									]
								})
							]
						})]
					}),
					b != null && b !== !1 && /* @__PURE__ */ Z("span", {
						className: "flex max-h-8 shrink-0 items-center",
						"data-testid": "document-result-trailing",
						children: b
					}),
					o && /* @__PURE__ */ Z(ki, {
						attached: !!e.attached,
						onToggle: () => o(e),
						labels: p,
						tabIndex: m ? 0 : -1,
						"aria-label": `${e.attached ? "Remove" : "Add"} ${e.title}`,
						className: t(!e.attached && !f && "opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 focus-visible:opacity-100")
					}),
					g && g.length > 0 && /* @__PURE__ */ Z("span", {
						className: "shrink-0 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100",
						children: /* @__PURE__ */ Z(pe, {
							trigger: /* @__PURE__ */ Z(x, { size: 16 }),
							triggerLabel: `More actions for ${e.title}`,
							triggerTabIndex: m ? 0 : -1,
							triggerClassName: "h-8 w-8 border-none px-0",
							align: "end",
							sections: g,
							"data-testid": "document-result-menu"
						})
					})
				]
			}, e.id);
		})
	}) : /* @__PURE__ */ Z(X, { children: d ?? null });
}
//#endregion
//#region src/components/shared/FilePickerButton.tsx
function Mi({ onFiles: e, accept: n, multiple: r = !1, variant: i = "secondary", size: a = "md", icon: o, disabled: s, children: c, className: l, "aria-label": u, "data-testid": d = "file-picker-button" }) {
	let f = J(null);
	return /* @__PURE__ */ Q(X, { children: [/* @__PURE__ */ Q("button", {
		type: "button",
		disabled: s,
		"aria-label": u,
		"data-testid": d,
		"data-size": a === "sm" ? "sm" : void 0,
		onClick: () => f.current?.click(),
		className: t("inline-flex cursor-pointer items-center gap-2 rounded-lg text-sm font-medium transition-colors duration-100", a === "sm" ? "h-8 px-3" : "h-9 px-3.5", "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-50", i === "primary" ? "border-none bg-primary text-on-primary hover:bg-primary-hover" : "border border-border bg-surface text-text-primary hover:bg-surface-hover", l),
		children: [o, c]
	}), /* @__PURE__ */ Z("input", {
		ref: f,
		type: "file",
		hidden: !0,
		accept: n,
		multiple: r,
		"data-testid": `${d}-input`,
		onChange: (t) => {
			let n = Array.from(t.target.files ?? []);
			t.target.value = "", n.length && e(n);
		}
	})] });
}
//#endregion
//#region src/components/shared/Highlight.tsx
var Ni = (e) => e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
function Pi(e, t) {
	let n = Array.from(new Set(t.map((e) => e.trim()).filter(Boolean))).sort((e, t) => t.length - e.length).map((e) => Ni(e).replace(/\s+/g, "\\s+"));
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
function Fi({ text: e, terms: n, className: r, markClassName: i, "data-testid": a }) {
	let o = Pi(e, n);
	return /* @__PURE__ */ Z("span", {
		className: r,
		"data-testid": a,
		children: o.map((e, n) => e.match ? /* @__PURE__ */ Z("mark", {
			className: t("rounded-sm bg-primary-bg px-0.5 text-inherit [box-decoration-break:clone]", i),
			children: e.text
		}, n) : /* @__PURE__ */ Z(je, { children: e.text }, n))
	});
}
//#endregion
//#region src/components/shared/PersonPicker.tsx
var Ii = {
	sm: 18,
	md: 20
};
function Li({ people: e, value: t, onChange: n, placeholder: r = "Search people", emptyMessage: i = "Nobody matches", maxOptions: a = 50, size: o = "md", loading: s = !1, disabled: c, onQueryChange: l, className: u, ...d }) {
	let f = Ii[o], p = e.map((e) => ({
		value: e.id,
		label: e.name,
		...e.tag ? { meta: e.tag } : {},
		...e.detail ? { description: e.detail } : {},
		...e.disabled ? { disabled: !0 } : {},
		leading: /* @__PURE__ */ Z(V, {
			name: e.name,
			src: e.avatarUrl,
			size: f,
			showTitle: !1
		})
	})), m = e.find((e) => e.id === t);
	return /* @__PURE__ */ Z(oe, {
		...d,
		className: u,
		options: p,
		value: t,
		onChange: n,
		size: o,
		maxOptions: a,
		emptyMessage: i,
		placeholder: s ? "Loading people…" : r,
		disabled: c || s,
		...l ? { onQueryChange: l } : {},
		leading: m ? /* @__PURE__ */ Z(V, {
			name: m.name,
			src: m.avatarUrl,
			size: f,
			showTitle: !1
		}) : void 0
	});
}
//#endregion
//#region src/components/shared/dataAccent.tsx
var Ri = [
	1,
	2,
	3,
	4,
	5,
	6,
	7,
	8
];
function zi(e) {
	return e === void 0 || e === "" ? {} : typeof e == "number" ? { "data-accent": String(e) } : { style: { "--data-accent": e } };
}
function Bi({ accent: e, className: n, "data-testid": r }) {
	return /* @__PURE__ */ Z("span", {
		"aria-hidden": !0,
		"data-testid": r,
		...zi(e),
		className: t("block w-[5px] shrink-0 self-stretch bg-[var(--data-accent,var(--color-text-tertiary))]", n)
	});
}
//#endregion
//#region src/components/shared/Histogram.tsx
var Vi = 100, Hi = 3;
function Ui({ buckets: e, labels: n, accent: r, height: i = 48, className: a, "aria-label": o, "data-testid": s }) {
	let c = Math.max(e.length, 1), l = Math.max(...e, 1), u = (Vi - Hi * (c - 1)) / c, d = e.map((e, t) => `${n?.[t] ?? t + 1}: ${e}`).join(" | ");
	return /* @__PURE__ */ Q("svg", {
		role: "img",
		"aria-label": o ?? `Distribution — ${d}`,
		"data-testid": s,
		viewBox: `0 0 ${Vi} ${i}`,
		preserveAspectRatio: "none",
		height: i,
		width: "100%",
		...zi(r),
		className: t("block w-full", a),
		children: [/* @__PURE__ */ Z("title", { children: d }), e.map((e, t) => {
			let n = e / l, r = Math.max(2, Math.round(n * i));
			return /* @__PURE__ */ Z("rect", {
				"data-testid": s ? `${s}-bar-${t}` : void 0,
				x: t * (u + Hi),
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
//#region src/components/shared/activityTickerModel.ts
function Wi(e) {
	return {
		hidden: !1,
		dimmed: !1,
		paused: !1,
		quiet: !1,
		speed: "slow",
		categories: [...e]
	};
}
function Gi(e, t) {
	try {
		let n = e ? JSON.parse(e) : null;
		if (!n || typeof n != "object" || Array.isArray(n)) throw Error("Invalid preference");
		let r = n, i = r.categories;
		return {
			hidden: r.hidden === !0,
			dimmed: r.dimmed === !0,
			paused: r.paused === !0,
			quiet: r.quiet === !0,
			speed: r.speed === "fast" ? "fast" : "slow",
			categories: Array.isArray(i) ? t.filter((e) => i.includes(e)) : [...t]
		};
	} catch {
		return Wi(t);
	}
}
function Ki(e) {
	return e.count > 1 && !e.paused && !e.quiet && !e.engaged && !e.reducedMotion && e.pageVisible && !e.activeCall;
}
//#endregion
//#region src/components/shared/ActivityTicker.tsx
function qi(e) {
	let [t, n] = Y(() => typeof window < "u" && window.matchMedia(e).matches);
	return G(() => {
		let t = window.matchMedia(e), r = () => n(t.matches);
		return r(), t.addEventListener("change", r), () => t.removeEventListener("change", r);
	}, [e]), t;
}
function Ji(e, t) {
	try {
		return Gi(e ? localStorage.getItem(e) : null, t);
	} catch {
		return Gi(null, t);
	}
}
function Yi(e) {
	return /* @__PURE__ */ Z(Xi, { ...e }, e.preferencesKey ?? "unpersisted");
}
function Xi({ items: e, categories: t, placement: n = "footer", onPlacementChange: r, onMoveStart: i, onMoveEnd: o, sample: s = !1, activeCall: c = !1, preferencesKey: l = null, preferences: u, onPreferencesChange: d, preferencesHint: f, renderActions: p, "data-testid": m = "activity-ticker" }) {
	let h = t.map((e) => e.id), [g, b] = Y(() => Ji(l, h)), x = u ?? g, [S, T] = Y(0), [E, k] = Y(!1), [j, M] = Y(!1), [P, F] = Y(null), [re, ie] = Y(() => typeof document > "u" || !document.hidden), ae = J(null), oe = J(null), ce = J(null), le = J(void 0), R = J(null), z = J(!1), [B, ue] = Y(null), de = K(), fe = qi("(prefers-reduced-motion: reduce)"), pe = qi("(max-width: 1100px)") || c, me = e.filter((e) => x.categories.includes(e.category)), V = me[S % Math.max(me.length, 1)], he = E || j || P !== null, H = s ? "sample " : "", ge = s ? "Sample " : "";
	G(() => {
		if (!(!l || u)) try {
			localStorage.setItem(l, JSON.stringify(x));
		} catch {}
	}, [
		l,
		x,
		u
	]), G(() => {
		let e = () => ie(typeof document > "u" || !document.hidden);
		return document.addEventListener("visibilitychange", e), () => document.removeEventListener("visibilitychange", e);
	}, []);
	let _e = !x.hidden && Ki({
		paused: x.paused,
		quiet: x.quiet,
		engaged: he,
		reducedMotion: fe,
		pageVisible: re,
		activeCall: c,
		count: me.length
	});
	G(() => {
		if (!_e) return;
		let e = setInterval(() => T((e) => e + 1), x.speed === "fast" ? 6e3 : 12e3);
		return () => clearInterval(e);
	}, [_e, x.speed]), G(() => () => clearTimeout(le.current), []), Fe(() => {
		if (!he || x.hidden) {
			ue(null);
			return;
		}
		let e = () => {
			let e = oe.current?.getBoundingClientRect();
			e && ue({
				left: Math.max(8, Math.min(e.left, window.innerWidth - 220)),
				...e.top >= 48 ? { bottom: window.innerHeight - e.top } : { top: e.bottom }
			});
		};
		return e(), window.addEventListener("resize", e), window.addEventListener("scroll", e, !0), () => {
			window.removeEventListener("resize", e), window.removeEventListener("scroll", e, !0);
		};
	}, [
		he,
		x.hidden,
		pe
	]);
	function ve() {
		clearTimeout(le.current), k(!0);
	}
	function ye() {
		clearTimeout(le.current), le.current = setTimeout(() => k(!1), 150);
	}
	function be(e) {
		M(e instanceof Node && (!!ae.current?.contains(e) || !!ce.current?.contains(e)));
	}
	function U(e) {
		let t = {
			...x,
			...e
		};
		b(t), d?.(t);
	}
	Fe(() => {
		z.current && (z.current = !1, (x.hidden ? R.current : oe.current)?.focus());
	}, [x.hidden]);
	function xe() {
		z.current = !0, U({ hidden: !0 }), F(null), k(!1), M(!1);
	}
	return /* @__PURE__ */ Q("div", {
		ref: ae,
		className: "activity-ticker",
		"data-compact": pe || void 0,
		"data-call": c || void 0,
		"data-hidden": x.hidden || void 0,
		"data-testid": m,
		"data-placement": n,
		onMouseEnter: ve,
		onMouseLeave: ye,
		onFocusCapture: () => M(!0),
		onBlurCapture: (e) => be(e.relatedTarget),
		children: [
			r && /* @__PURE__ */ Z(L, {
				content: `Drag Today to the ${n === "footer" ? "header" : "footer"}, or click to move it`,
				children: /* @__PURE__ */ Z(_, {
					size: "sm",
					variant: "ghost",
					icon: /* @__PURE__ */ Z(C, { size: 14 }),
					className: "shrink-0 cursor-grab active:cursor-grabbing",
					"aria-label": `Move Today strip to ${n === "footer" ? "header" : "footer"}`,
					draggable: !0,
					onDragStart: (e) => {
						e.dataTransfer.setData("text/x-activity-ticker", "today"), e.dataTransfer.effectAllowed = "move", i?.();
					},
					onDragEnd: o,
					onClick: () => r(n === "footer" ? "header" : "footer"),
					"data-testid": `${m}-move`
				})
			}),
			x.hidden ? /* @__PURE__ */ Z(L, {
				content: `Restore ${H}Today strip`,
				children: /* @__PURE__ */ Z(_, {
					ref: R,
					"aria-label": `Restore ${H}Today strip`,
					size: "sm",
					icon: /* @__PURE__ */ Z(y, { size: 14 }),
					onClick: () => {
						z.current = !0, U({ hidden: !1 });
					}
				})
			}) : /* @__PURE__ */ Q(a, {
				ref: oe,
				variant: "ghost",
				size: "sm",
				className: "activity-ticker-summary",
				"data-dimmed": x.dimmed || void 0,
				"aria-label": V ? `${s ? "Demo today" : "Today"}: ${V.label}. ${V.summary}` : `${s ? "Demo today: no sample" : "Today: no"} categories selected`,
				"aria-describedby": de,
				"aria-haspopup": "dialog",
				"aria-expanded": P === "detail",
				onClick: () => F((e) => e === "detail" ? null : "detail"),
				onKeyDown: (e) => {
					e.key === "ArrowUp" && (e.preventDefault(), ce.current?.querySelector("button")?.focus());
				},
				children: [
					/* @__PURE__ */ Z("span", {
						"aria-hidden": "true",
						children: V?.icon ?? /* @__PURE__ */ Z(ee, { size: 14 })
					}),
					s && /* @__PURE__ */ Z("span", {
						className: "activity-ticker-demo",
						children: "Demo"
					}),
					/* @__PURE__ */ Z("span", {
						className: "activity-ticker-copy",
						children: V ? /* @__PURE__ */ Q(X, { children: [/* @__PURE__ */ Z("strong", { children: V.label }), /* @__PURE__ */ Q("span", {
							className: "activity-ticker-description",
							children: [" · ", V.summary]
						})] }) : "Today · No categories selected"
					})
				]
			}),
			/* @__PURE__ */ Q("span", {
				id: de,
				className: "sr-only",
				children: [s ? "Sample content. " : "", "Arrow Up opens the controls. Automatic rotation pauses while focused."]
			}),
			B && !x.hidden && Ie(/* @__PURE__ */ Q("div", {
				ref: ce,
				"data-uic-popover": "",
				role: "toolbar",
				"aria-label": `${ge}Today controls`,
				className: "activity-ticker-toolbar",
				style: {
					left: B.left,
					bottom: B.bottom,
					top: B.top
				},
				onMouseEnter: ve,
				onMouseLeave: ye,
				onFocusCapture: () => M(!0),
				onBlurCapture: (e) => be(e.relatedTarget),
				children: [
					/* @__PURE__ */ Z(L, {
						content: "Hide this strip",
						children: /* @__PURE__ */ Z(_, {
							"aria-label": `Hide ${H}Today strip`,
							size: "sm",
							icon: /* @__PURE__ */ Z(v, { size: 14 }),
							onClick: xe
						})
					}),
					/* @__PURE__ */ Z(L, {
						content: x.dimmed ? "Restore brightness" : "Dim this strip",
						children: /* @__PURE__ */ Z(_, {
							"aria-label": `Dim ${H}Today strip`,
							"aria-pressed": x.dimmed,
							size: "sm",
							icon: /* @__PURE__ */ Z(y, { size: 14 }),
							onClick: () => U({ dimmed: !x.dimmed })
						})
					}),
					/* @__PURE__ */ Z(L, {
						content: x.speed === "slow" ? "Slow · every 12 seconds" : "Fast · every 6 seconds",
						children: /* @__PURE__ */ Z(_, {
							"aria-label": `Rotation speed: ${x.speed}`,
							size: "sm",
							icon: /* @__PURE__ */ Z(w, { size: 14 }),
							onClick: () => U({ speed: x.speed === "slow" ? "fast" : "slow" })
						})
					}),
					/* @__PURE__ */ Z(L, {
						content: x.paused ? `Resume ${H}rotation` : `Pause ${H}rotation`,
						children: /* @__PURE__ */ Z(_, {
							size: "sm",
							"aria-label": x.paused ? `Resume ${H}rotation` : `Pause ${H}rotation`,
							"aria-pressed": x.paused,
							icon: x.paused ? /* @__PURE__ */ Z(N, { size: 14 }) : /* @__PURE__ */ Z(te, { size: 14 }),
							onClick: () => U({ paused: !x.paused })
						})
					}),
					/* @__PURE__ */ Z(L, {
						content: s ? "Next sample" : "Next item",
						children: /* @__PURE__ */ Z(_, {
							"aria-label": s ? "Next sample" : "Next item",
							size: "sm",
							disabled: me.length < 2,
							icon: /* @__PURE__ */ Z(A, {
								dir: "right",
								size: 14
							}),
							onClick: () => T((e) => e + 1)
						})
					}),
					/* @__PURE__ */ Z(L, {
						content: `${ge}Today settings`,
						children: /* @__PURE__ */ Z(_, {
							"aria-label": `${ge}Today settings`,
							size: "sm",
							"aria-haspopup": "dialog",
							"aria-expanded": P === "settings",
							icon: /* @__PURE__ */ Z(O, { size: 14 }),
							onClick: () => F((e) => e === "settings" ? null : "settings")
						})
					})
				]
			}), document.body),
			/* @__PURE__ */ Z(se, {
				trigger: oe,
				open: P !== null,
				onClose: () => F(null),
				placement: "bottom-start",
				"aria-label": `${ge}Today ${P === "settings" ? "settings" : "details"}`,
				className: "activity-ticker-panel",
				children: /* @__PURE__ */ Q(ne, {
					gap: "sm",
					children: [
						/* @__PURE__ */ Q("div", {
							className: "activity-ticker-panel-heading",
							children: [/* @__PURE__ */ Z(I, {
								size: "sm",
								weight: "semibold",
								children: P === "settings" ? "Today preferences" : V?.label ?? "Today"
							}), /* @__PURE__ */ Z(_, {
								"aria-label": "Close Today panel",
								size: "sm",
								icon: /* @__PURE__ */ Z(D, { size: 14 }),
								onClick: () => F(null)
							})]
						}),
						s && /* @__PURE__ */ Z(I, {
							size: "xs",
							tone: "secondary",
							children: "Demo · Sample content only. No live activity is connected."
						}),
						P === "settings" ? /* @__PURE__ */ Q(X, { children: [
							/* @__PURE__ */ Z(I, {
								size: "xs",
								weight: "semibold",
								children: "Categories"
							}),
							t.map((e) => /* @__PURE__ */ Q("label", {
								className: "activity-ticker-option",
								children: [/* @__PURE__ */ Z(Oe, {
									checked: x.categories.includes(e.id),
									onChange: (t) => {
										U({ categories: h.filter((n) => n === e.id ? t : x.categories.includes(n)) }), T(0);
									}
								}), e.label]
							}, e.id)),
							/* @__PURE__ */ Q("label", {
								className: "activity-ticker-option",
								children: [/* @__PURE__ */ Z(Oe, {
									checked: x.quiet,
									onChange: (e) => U({ quiet: e })
								}), "Quiet rotation · manual only"]
							}),
							/* @__PURE__ */ Z(I, {
								size: "xs",
								tone: "secondary",
								children: fe ? `Reduced motion is on. Use ${s ? "Next sample" : "Next item"} to rotate manually.` : "Rotation pauses on hover, focus, during a huddle, and while a panel is open."
							}),
							/* @__PURE__ */ Z(I, {
								size: "xs",
								tone: "secondary",
								children: f ?? (l ? "Preferences saved on this browser." : "Preferences are not saved.")
							})
						] }) : /* @__PURE__ */ Q(X, { children: [/* @__PURE__ */ Z(I, {
							size: "sm",
							children: V?.detail ?? "Choose a category in Today settings to show items."
						}), p?.(V, () => F(null))] })
					]
				})
			})
		]
	});
}
//#endregion
//#region src/components/shared/CollectionPage.tsx
function Zi({ title: e, description: n, headerActions: r, toolbar: i, back: a, children: o, className: s, ...c }) {
	return /* @__PURE__ */ Q("div", {
		className: t("flex min-w-0 flex-col gap-[var(--ui-section-gap,0.75rem)]", s),
		"data-collection-page": !0,
		...c,
		children: [
			/* @__PURE__ */ Z(U, {
				title: e,
				description: n,
				actions: r,
				back: a,
				density: "compact"
			}),
			i && /* @__PURE__ */ Z(ce, { ...i }),
			o
		]
	});
}
//#endregion
//#region src/components/shared/ComposerSurface.tsx
var Qi = Me(!1);
function $i({ children: e, className: n, compact: r, ...i }) {
	let a = Pe(Qi), s = o();
	return a ? /* @__PURE__ */ Z(X, { children: e }) : /* @__PURE__ */ Z(Qi.Provider, {
		value: !0,
		children: /* @__PURE__ */ Z("div", {
			...i,
			"data-composer-surface": !0,
			"data-density": r ?? s === "compact" ? "compact" : "comfortable",
			className: t("uic-composer-surface shrink-0 min-w-0", n),
			children: /* @__PURE__ */ Z("div", {
				className: "uic-composer-surface-content",
				children: e
			})
		})
	});
}
//#endregion
//#region src/components/shared/AssetGallery.tsx
function ea(e) {
	return typeof e == "object" && !!e && !Ne(e) && !Array.isArray(e) && typeof e.label == "string";
}
function ta({ item: e, variant: n, onOpen: r, actions: i, actionsVisibility: a, onDragStart: o }) {
	let s = K(), c = e.status, l = c != null && c !== !1 && c !== "";
	return /* @__PURE__ */ Q("div", {
		role: "listitem",
		className: "group relative min-w-0",
		children: [
			/* @__PURE__ */ Q("button", {
				type: "button",
				draggable: !!o,
				onDragStart: (t) => o?.(e, t),
				"aria-label": `Inspect ${e.title}`,
				"aria-describedby": l ? s : void 0,
				onClick: () => r(e),
				className: "block w-full min-w-0 rounded-lg text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
				children: [
					/* @__PURE__ */ Z("span", {
						"data-gallery-thumbnail": !0,
						className: t("flex aspect-square w-full items-center justify-center overflow-hidden rounded-lg bg-surface-muted transition-colors group-hover:bg-surface-hover", n === "images" && "aspect-[4/3]"),
						children: n === "avatars" ? /* @__PURE__ */ Z(V, {
							name: e.title,
							src: e.src,
							size: 88
						}) : e.src ? /* @__PURE__ */ Z("img", {
							draggable: !1,
							src: e.src,
							alt: e.title,
							loading: "lazy",
							className: "h-full w-full object-cover transition-transform group-hover:scale-105"
						}) : /* @__PURE__ */ Z("span", {
							className: "text-xs text-text-secondary",
							children: "Image unavailable"
						})
					}),
					/* @__PURE__ */ Z("span", {
						className: "mt-1 block truncate text-sm font-medium text-text-primary",
						title: e.title,
						children: e.title
					}),
					e.subtitle && /* @__PURE__ */ Z("span", {
						className: "block truncate text-xs text-text-secondary",
						title: e.subtitle,
						children: e.subtitle
					})
				]
			}),
			l && /* @__PURE__ */ Z("span", {
				id: s,
				"data-gallery-status": !0,
				className: "pointer-events-none absolute left-2 top-2 max-w-[calc(100%-1rem)]",
				children: ea(c) ? /* @__PURE__ */ Z(z, {
					size: "md",
					...c
				}) : c
			}),
			i && /* @__PURE__ */ Z("div", {
				"data-gallery-actions": a,
				className: t("flex h-8 items-center justify-end", a === "hover" && "opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 [@media(hover:none)]:opacity-100"),
				children: i(e)
			})
		]
	});
}
function na({ items: e, variant: n = "images", label: r, onOpen: i, actions: a, actionsVisibility: o = "hover", onDragStart: s, className: c }) {
	return /* @__PURE__ */ Z("div", {
		role: "list",
		"aria-label": r,
		"data-asset-gallery": n,
		className: t("grid gap-3", n === "avatars" ? "grid-cols-2 sm:grid-cols-4 lg:grid-cols-8" : "grid-cols-2 md:grid-cols-3 xl:grid-cols-4", c),
		children: e.map((e) => /* @__PURE__ */ Z(ta, {
			item: e,
			variant: n,
			onOpen: i,
			actions: a,
			actionsVisibility: o,
			onDragStart: s
		}, e.id))
	});
}
//#endregion
//#region src/components/shared/MediaCollectionCard.tsx
function ra({ title: e, headingAs: t = "h3", status: n, previews: r, onOpen: i, onPlay: a }) {
	let [o, s] = Y(0), l = Math.min(o, Math.max(0, r.length - 1)), u = r[l];
	return /* @__PURE__ */ Q(c, {
		padding: "none",
		className: "min-w-0 overflow-hidden",
		"data-media-collection": !0,
		children: [
			/* @__PURE__ */ Z(t, {
				className: "m-0 px-3 py-2 text-sm font-semibold",
				children: /* @__PURE__ */ Z("button", {
					type: "button",
					onClick: i,
					className: "block w-full truncate text-left text-text-primary hover:text-primary focus-visible:outline-2 focus-visible:outline-primary",
					title: e,
					children: e
				})
			}),
			/* @__PURE__ */ Q("button", {
				type: "button",
				disabled: !u,
				"aria-label": `Play ${e}`,
				onClick: () => u && a(u),
				className: "group relative flex aspect-video w-full items-center justify-center overflow-hidden bg-surface-muted text-text-secondary focus-visible:outline-2 focus-visible:outline-primary",
				children: [u?.image ? /* @__PURE__ */ Z("img", {
					src: u.image,
					alt: `${e} · ${u.label}`,
					className: "h-full w-full object-cover"
				}) : /* @__PURE__ */ Z("span", {
					className: "text-xs",
					children: u ? "Preview unavailable" : "No review movie"
				}), u && /* @__PURE__ */ Z("span", {
					className: "absolute rounded-full bg-surface p-1 opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100",
					children: /* @__PURE__ */ Z(j, { size: 24 })
				})]
			}),
			/* @__PURE__ */ Q("div", {
				className: "flex min-w-0 items-center justify-between gap-1 px-2 py-1 text-xs text-text-secondary",
				children: [/* @__PURE__ */ Z("span", {
					className: "shrink-0 tabular-nums",
					children: u?.duration || "Length unknown"
				}), n]
			}),
			u && /* @__PURE__ */ Q("div", {
				className: "flex min-w-0 items-center gap-1 border-t border-border px-1 py-1",
				children: [
					r.length > 1 && /* @__PURE__ */ Z(_, {
						size: "sm",
						"aria-label": `Previous preview for ${e}`,
						disabled: l === 0,
						onClick: () => s(l - 1),
						children: /* @__PURE__ */ Z(A, { dir: "left" })
					}),
					/* @__PURE__ */ Z("span", {
						className: "min-w-0 flex-1 truncate text-xs text-text-secondary",
						title: u.label,
						children: u.label
					}),
					r.length > 1 && /* @__PURE__ */ Q(X, { children: [/* @__PURE__ */ Q("span", {
						className: "text-xs tabular-nums text-text-secondary",
						children: [
							l + 1,
							"/",
							r.length
						]
					}), /* @__PURE__ */ Z(_, {
						size: "sm",
						"aria-label": `Next preview for ${e}`,
						disabled: l === r.length - 1,
						onClick: () => s(l + 1),
						children: /* @__PURE__ */ Z(A, { dir: "right" })
					})] })
				]
			})
		]
	});
}
//#endregion
export { Vn as $, kr as A, Ot as At, mr as B, ot as Bt, Zr as C, Vt as Ct, Ir as D, Pt as Dt, Wr as E, Ft as Et, Tr as F, ht as Ft, Kn as G, $n as H, $e as Ht, Sr as I, gt as It, Bn as J, Nn as K, xr as L, ct as Lt, Or as M, St as Mt, jr as N, bt as Nt, Pr as O, Nt as Ot, Er as P, _t as Pt, Rn as Q, yr as R, st as Rt, oi as S, Ut as St, Gr as T, It as Tt, Jn as U, Ve as Ut, hr as V, lt as Vt, or as W, Fn as X, In as Y, Ln as Z, Oi as _, sn as _t, Yi as a, En as at, fi as b, $t as bt, Ri as c, wn as ct, Fi as d, bn as dt, Un as et, Pi as f, vn as ft, ki as g, ln as gt, Ai as h, mn as ht, Zi as i, Dn as it, Dr as j, Et as jt, Fr as k, At as kt, zi as l, Sn as lt, ji as m, un as mt, na as n, Mn as nt, Ui as o, Tn as ot, Mi as p, hn as pt, Pn as q, $i as r, On as rt, Bi as s, Cn as st, ra as t, Wn as tt, Li as u, xn as ut, Ci as v, on as vt, Kr as w, zt as wt, ui as x, Yt as xt, hi as y, an as yt, _r as z, dt as zt };
