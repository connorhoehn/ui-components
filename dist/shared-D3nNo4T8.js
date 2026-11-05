import { n as e } from "./useFullscreen-DfIEvnsc.js";
import { t } from "./cn-D4QmbyEy.js";
import { t as n } from "./ToastProvider-D6jAeNNE.js";
import { c as r } from "./usePromptContext-CUNhKC01.js";
import "./GroupedList-eV4fTH7o.js";
import { c as i, l as a, n as o, o as s, s as c, u as l } from "./Button-C-I3BxWI.js";
import { t as u } from "./Card-sJqvEOtP.js";
import "./Table-CdQ9XNWU.js";
import { c as d, f, l as p, m, n as h, p as g, t as _, u as v } from "./overlayStack-DxIDMUs-.js";
import "./PageSection-6k9OwOwn.js";
import { t as y } from "./IconButton-Bf5Wy0tS.js";
import { B as b, D as x, E as S, I as C, J as w, K as T, M as E, P as D, T as O, W as k, f as A, h as j, ht as M, k as N, m as P, nt as F, rt as I, t as L } from "./Icons-CqVFbuiZ.js";
import { c as ee, d as R } from "./MediaIcons-_ai5Til2.js";
import { c as z, i as B, l as V, n as H, r as te, t as ne } from "./Text-BAAQrepu.js";
import "./FollowBanner-aWYO2oSH.js";
import "./Badge-D58pEJIm.js";
import "./Banner-400g6E1q.js";
import "./Chart-CHhWLl8U.js";
import { t as re } from "./Modal-PO0F6rAp.js";
import { t as ie } from "./ConfirmDialog-DrXzW1zj.js";
import { t as U } from "./Input-Brvp1kPv.js";
import { n as ae } from "./Select-CpZyUWay.js";
import { t as W } from "./Tooltip-Q0urBp4N.js";
import { t as oe } from "./InlinePopover-Dx8-r-XU.js";
import "./Toolbar-BKQZHGmO.js";
import "./FormField-CQ27qxWt.js";
import "./SearchInput-D5AvHiLn.js";
import { n as se, r as ce, t as le } from "./DataTable-BASH2GCG.js";
import { t as ue } from "./EmptyState-pOG782nO.js";
import { n as de, t as fe } from "./ThinkingDots-BHtlGy_Q.js";
import "./Drawer-DmPnSirj.js";
import "./Spinner-CYflBP-c.js";
import { n as pe, t as me } from "./StatusPill-cLjwbEQM.js";
import { t as he } from "./Sparkline-B-z1C40M.js";
import { i as ge } from "./focusTrap-D9J7npjl.js";
import "./FilterChip-BHmUM2tY.js";
import "./SkeletonCard-D3FL0TB7.js";
import { a as _e, o as ve, t as ye } from "./MessageActionBar-D5z_lwFP.js";
import "./Slider-DCKY5jPg.js";
import { t as be } from "./DropdownMenu-DP3rRjEd.js";
import "./DockedPanelContext-pH9A5z1h.js";
import { t as xe } from "./Textarea-CvdLeuO_.js";
import { n as Se, t as Ce } from "./Avatar-DkkMISPQ.js";
import { o as we } from "./DecisionPath-BC9qttuI.js";
import { t as Te } from "./TitledFrame-B0QW93da.js";
import "./DotMeter-B6ZDgLU7.js";
import "./StatusDot-GwVn-q5q.js";
import { i as Ee } from "./ChoiceList-e9ggV8ZP.js";
import "./SegmentedControl-DAjnOtF4.js";
import "./RovingToolbar-B1Fai5PF.js";
import { t as De } from "./InlineAlert-CnWUBrte.js";
import "./CardHeader-DzQxX5J-.js";
import { t as Oe } from "./Breadcrumbs-CirFL-yi.js";
import { a as ke, d as Ae, f as je, o as Me, p as Ne, t as Pe, u as Fe } from "./PageHeader-FYh2nElg.js";
import "./NotificationBell-C_8HFWNk.js";
import "./LogStream-DLqdcDhS.js";
import "./RisingParticles-BBIjT11W.js";
import "./backdropTone-BzPocySl.js";
import "./MeterRow-BfUJgW8q.js";
import "./FollowUpChips-DDg0E5cL.js";
import { t as Ie } from "./PresenceAvatars-DqCOZ057.js";
import "./FileUploadDrop-CF2-g14E.js";
import { t as Le } from "./ActivityFeed-BU9LDJNO.js";
import { a as Re, c as ze, d as Be, i as Ve, l as He, o as Ue } from "./railType-AsIPWdQ5.js";
import { i as We, t as Ge } from "./WorkspaceRail-DtmZ9NOf.js";
import "./useMeasuredWidth-B4suQnvy.js";
import "./SectionLabel-Ch_rkHQZ.js";
import "./InlinePlaceholder-DiPQ7hOM.js";
import "./FloatingPanel-DuSS0SFV.js";
import "./ChangeDiff-CGfT-mcu.js";
import "./Link-h2c9gcsw.js";
import { t as Ke } from "./MetaLine-DFn2XXGU.js";
import "./NumberInput-Cyc37Ssv.js";
import { t as qe } from "./Checkbox-BW-hyqCM.js";
import { n as Je } from "./FileKindMark-BZmXUxaT.js";
import { n as Ye } from "./ChatSidePanelRegistry-Dmfezd2N.js";
import { Children as Xe, Fragment as Ze, createContext as Qe, isValidElement as $e, useCallback as G, useContext as K, useEffect as q, useId as et, useLayoutEffect as tt, useMemo as J, useRef as Y, useState as X } from "react";
import { Fragment as Z, jsx as Q, jsxs as $ } from "react/jsx-runtime";
import { Command as nt } from "cmdk";
import { createPortal as rt } from "react-dom";
import it from "react-markdown";
import at from "remark-gfm";
//#region src/components/ui/SectionStack.tsx
var ot = {
	comfortable: "gap-6",
	compact: "gap-4"
}, st = {
	comfortable: "gap-12",
	compact: "gap-8"
};
function ct({ children: e, density: n, divided: r = !0, as: i = "div", className: a, ref: o, ...s }) {
	let l = c(n), u = i, d = Xe.toArray(e);
	return /* @__PURE__ */ Q(u, {
		ref: o,
		className: t("flex min-w-0 flex-col", r ? ot[l] : st[l], a),
		"data-ui-section-stack": l,
		"data-divided": r ? void 0 : "false",
		...s,
		children: d.flatMap((e, t) => r && t > 0 ? [/* @__PURE__ */ Q("hr", {
			className: "m-0 w-full self-stretch border-0 border-t border-border",
			"data-ui-section-rule": ""
		}, `rule-${t}`), e] : [e])
	});
}
//#endregion
//#region src/components/shared/CodeBlock.tsx
var lt = /* @__PURE__ */ "import.export.from.as.const.let.var.function.return.default.if.else.switch.case.break.new.typeof.instanceof.in.of.interface.type.extends.implements.class.async.await.true.false.null.undefined.this.super.try.catch.finally.throw.for.while.do.continue.public.private.protected.readonly.static.enum".split("."), ut = [
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
], dt = /* @__PURE__ */ "cd.ls.echo.cat.grep.sed.awk.find.cp.mv.rm.mkdir.rmdir.touch.chmod.chown.pwd.which.npm.yarn.pnpm.npx.git.node.curl.wget".split(".");
function ft(e) {
	return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function pt(e, t) {
	let n = e.replace(/(\/\/.*?)(\n|$)/g, `<span style="color:${t.comment}">$1</span>$2`);
	n = n.replace(/(\/\*[\s\S]*?\*\/)/g, `<span style="color:${t.comment}">$1</span>`), n = n.replace(/("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)/g, `<span style="color:${t.string}">$1</span>`);
	let r = RegExp(`\\b(${lt.join("|")})\\b`, "g");
	return n = n.replace(r, `<span style="color:${t.keyword}">$1</span>`), n = n.replace(/\b(\d+(?:\.\d+)?)\b/g, `<span style="color:${t.number}">$1</span>`), n;
}
function mt(e, t) {
	let n = e.replace(/("(?:[^"\\]|\\.)*")(\s*:)/g, `<span style="color:${t.property}">$1</span>$2`);
	return n = n.replace(/("(?:[^"\\]|\\.)*")/g, `<span style="color:${t.string}">$1</span>`), n = n.replace(/\b(true|false|null)\b/g, `<span style="color:${t.keyword}">$1</span>`), n = n.replace(/\b(-?\d+(?:\.\d+)?)\b/g, `<span style="color:${t.number}">$1</span>`), n;
}
function ht(e, t) {
	let n = e.replace(/(#.*?)(\n|$)/g, `<span style="color:${t.comment}">$1</span>$2`);
	n = n.replace(/("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')/g, `<span style="color:${t.string}">$1</span>`);
	let r = RegExp(`\\b(${ut.join("|")})\\b`, "g");
	n = n.replace(r, `<span style="color:${t.keyword}">$1</span>`);
	let i = RegExp(`\\b(${dt.join("|")})\\b`, "g");
	return n = n.replace(i, `<span style="color:${t.builtin}">$1</span>`), n = n.replace(/(\$\w+|\$\{[^}]+\})/g, `<span style="color:${t.variable}">$1</span>`), n;
}
var gt = {
	comment: "var(--color-neutral)",
	string: "#4ade80",
	keyword: "var(--color-state-pending)",
	number: "#fbbf24",
	property: "#7dd3fc",
	builtin: "#c4b5fd",
	variable: "#fbbf24"
}, _t = {
	comment: "var(--color-code-comment)",
	string: "var(--color-code-green)",
	keyword: "var(--color-code-mauve)",
	number: "var(--color-code-peach)",
	property: "var(--color-code-blue)",
	builtin: "var(--color-code-mauve)",
	variable: "var(--color-code-yellow)"
}, vt = {
	comment: "var(--color-neutral)",
	string: "#15803d",
	keyword: "var(--color-info-fg)",
	number: "#a16207",
	property: "#0369a1",
	builtin: "var(--color-cat-ai)",
	variable: "#a16207"
};
function yt(e, t, n) {
	let r = n === "light" ? vt : n === "console" ? _t : gt, i = ft(e);
	switch (t) {
		case "json": return mt(i, r);
		case "bash":
		case "sh": return ht(i, r);
		case "text": return i;
		default: return pt(i, r);
	}
}
function bt({ code: e, language: n = "tsx", theme: r = "dark", copyButton: i = !0, showLineNumbers: a = !1, className: o, style: s, "data-testid": c, ariaLabel: l }) {
	let [u, d] = X(!1), f = G(() => {
		typeof navigator > "u" || !navigator.clipboard || navigator.clipboard.writeText(e).then(() => {
			d(!0), setTimeout(() => d(!1), 1500);
		}).catch(() => {});
	}, [e]), p = r === "dark", m = r === "console", h = J(() => e.split("\n"), [e]), g = J(() => yt(e, n, r), [
		e,
		n,
		r
	]);
	return /* @__PURE__ */ $("div", {
		"data-testid": c,
		"data-language": n,
		"data-theme": r,
		className: t("relative flex rounded-lg border overflow-hidden", m ? "bg-code-bg text-code-text border-code-border" : p ? "bg-surface-inverse text-text-inverse border-border-emphasis" : "bg-surface-panel text-text-primary border-border", o),
		style: s,
		"aria-label": l ?? `Code (${n})`,
		children: [i && /* @__PURE__ */ Q("button", {
			"data-ui-part": "",
			type: "button",
			onClick: f,
			"aria-label": u ? "Copied" : "Copy code",
			className: t("order-2 m-3 shrink-0 self-start font-[inherit] text-xs font-medium px-2 py-1 rounded border transition-opacity", m ? "bg-code-panel text-code-text border-code-border hover:bg-code-raised" : p ? "bg-surface-inverse text-text-inverse border-border-emphasis hover:bg-neutral" : "bg-surface text-text-primary border-border-emphasis hover:bg-surface-hover"),
			"data-copied": u ? "true" : "false",
			children: u ? "Copied" : "Copy"
		}), /* @__PURE__ */ Q("pre", {
			className: "m-0 min-w-0 flex-1 px-4 py-3 overflow-x-auto font-mono text-xs leading-relaxed",
			children: a ? /* @__PURE__ */ $("div", {
				className: "flex",
				children: [/* @__PURE__ */ Q("div", {
					className: t("select-none pr-3 text-right", m ? "text-code-comment" : p ? "text-neutral" : "text-text-tertiary"),
					"aria-hidden": "true",
					children: h.map((e, t) => /* @__PURE__ */ Q("div", { children: t + 1 }, t))
				}), /* @__PURE__ */ Q("code", {
					className: "flex-1 block",
					dangerouslySetInnerHTML: { __html: g }
				})]
			}) : /* @__PURE__ */ Q("code", {
				className: "block",
				dangerouslySetInnerHTML: { __html: g }
			})
		})]
	});
}
//#endregion
//#region src/components/shared/CommandPalette.tsx
var xt = "cui:command-palette:recents", St = 5;
function Ct(e, t) {
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
function wt(e, t) {
	if (!(!e || typeof window > "u")) try {
		window.localStorage.setItem(e, JSON.stringify(t));
	} catch {}
}
var Tt = Qe(null);
function Et() {
	let e = K(Tt);
	if (!e) throw Error("useCommandPalette must be used inside a <CommandPaletteProvider>.");
	return e;
}
function Dt() {
	let { open: e, close: t, toggle: n, isOpen: r, query: i } = Et();
	return {
		open: e,
		close: t,
		toggle: n,
		isOpen: r,
		query: i
	};
}
function Ot(e, t) {
	let n = t.toLowerCase().split("+").map((e) => e.trim()).filter(Boolean);
	if (n.length === 0) return !1;
	let r = n[n.length - 1], i = new Set(n.slice(0, -1)), a = i.has("cmd") || i.has("meta"), o = i.has("ctrl"), s = i.has("mod"), c = i.has("shift"), l = i.has("alt");
	if (s) {
		if (!e.metaKey && !e.ctrlKey) return !1;
	} else if (a !== e.metaKey || o !== e.ctrlKey) return !1;
	return c !== e.shiftKey || l !== e.altKey ? !1 : e.key.toLowerCase() === r;
}
function kt({ commands: e, getDynamicCommands: t, recentsKey: n = xt, recentsLimit: r = St, children: i }) {
	let [a, o] = X(!1), [s, c] = X(""), [l, u] = X(() => /* @__PURE__ */ new Map()), [d, f] = X(() => Ct(n, r)), p = G((e) => {
		n !== null && f((t) => {
			let i = [e, ...t.filter((t) => t !== e)].slice(0, r);
			return wt(n, i), i;
		});
	}, [n, r]), m = G(() => o(!0), []), h = G(() => {
		o(!1), c("");
	}, []), g = G(() => o((e) => !e), []), _ = G((e) => {
		u((t) => {
			let n = new Map(t);
			return n.set(e.id, e), n;
		});
	}, []), v = G((e) => {
		u((t) => {
			if (!t.has(e)) return t;
			let n = new Map(t);
			return n.delete(e), n;
		});
	}, []);
	q(() => {
		let e = (e) => {
			(e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k" && (e.preventDefault(), o((e) => !e));
		};
		return window.addEventListener("keydown", e, !0), () => window.removeEventListener("keydown", e, !0);
	}, []);
	let y = J(() => {
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
	]), b = Y(y);
	b.current = y, q(() => {
		let e = (e) => {
			if (!((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k")) {
				for (let t of b.current) if (t.hotkey && Ot(e, t.hotkey)) {
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
	return /* @__PURE__ */ Q(Tt.Provider, {
		value: x,
		children: i
	});
}
function At(e) {
	let { registerCommand: t, unregisterCommand: n } = Et();
	q(() => (t(e), () => n(e.id)), [
		e,
		t,
		n
	]);
}
function jt(e) {
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
function Mt(e, t) {
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
var Nt = {
	status: "idle",
	groups: []
};
function Pt(e, t, n, r, i) {
	let [a, o] = X(Nt), [s, c] = X(0), l = Y(n);
	l.current = n;
	let u = t.trim(), d = e && !!n && u.length >= i;
	q(() => {
		if (!d) {
			o(Nt);
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
	let f = G(() => c((e) => e + 1), []);
	return {
		state: d ? a : Nt,
		retry: f
	};
}
var Ft = t("flex items-center gap-2 px-3 py-2 mx-1 rounded-md cursor-pointer text-sm", "text-text-primary aria-selected:bg-surface-hover");
function It({ placeholder: e = "Type a command or search…", emptyState: n, className: r, searchRecords: i, onOpenRecord: a, recordDebounceMs: o = 200, minRecordQueryLength: s = 2 } = {}) {
	let { isOpen: c, close: l, query: u, setQuery: d, mergedCommands: f, recents: p, noteSelection: m } = Et(), h = J(() => {
		if (u.trim() !== "" || p.length === 0) return [];
		let e = new Map(f.map((e) => [e.id, e]));
		return p.map((t) => e.get(t)).filter((e) => !!e);
	}, [
		f,
		u,
		p
	]), g = J(() => jt(f), [f]), { state: _, retry: v } = Pt(c, u, i, o, s), y = u.trim(), b = J(() => y === "" ? f.length : f.filter((e) => Mt(`${e.id} ${e.label} ${(e.keywords ?? []).join(" ")}`, y) > 0).length, [f, y]), x = b + _.groups.reduce((e, t) => e + t.items.length, 0), S = y !== "" && x === 0 && _.status !== "loading" && _.status !== "error", C = y === "" ? "" : _.status === "loading" ? `${b} commands. Searching records.` : _.status === "error" ? `${b} commands. Record search failed.` : x === 0 ? `No matches for ${y}` : `${x} ${x === 1 ? "result" : "results"}`, w = G((e) => {
		l(), Promise.resolve().then(() => {
			a ? a(e) : typeof window < "u" && window.location.assign(e.href);
		});
	}, [l, a]), T = G((e) => {
		m(e.id), l(), Promise.resolve().then(() => e.run());
	}, [l, m]);
	return /* @__PURE__ */ Q(re, {
		open: c,
		onClose: l,
		ariaLabel: "Command palette",
		maxWidth: 640,
		rawChildren: !0,
		backdropTestId: "command-palette-backdrop",
		children: /* @__PURE__ */ $(nt, {
			label: "Command palette",
			value: void 0,
			filter: (e, t, n) => Mt(`${e} ${(n ?? []).join(" ")}`, t),
			className: t("flex flex-col gap-0 w-full", r),
			"data-testid": "command-palette",
			children: [
				/* @__PURE__ */ Q(nt.Input, {
					value: u,
					onValueChange: d,
					placeholder: e,
					"data-autofocus": !0,
					className: t("w-full px-3 py-2.5 text-sm border-0 border-b border-border", "outline-none bg-transparent text-text-primary placeholder:text-text-tertiary"),
					"data-testid": "command-palette-input"
				}),
				/* @__PURE__ */ $(nt.List, {
					"data-ui-listbox": "command-palette",
					className: "max-h-[360px] overflow-y-auto py-2",
					children: [
						S ? /* @__PURE__ */ Q("div", {
							className: "px-3 py-6 text-center text-sm text-text-tertiary",
							"data-testid": "command-palette-empty",
							children: n ?? `No matches for \u201c${y}\u201d`
						}) : null,
						h.length > 0 && /* @__PURE__ */ Q(nt.Group, {
							heading: "Recent",
							"data-testid": "command-palette-group-recent",
							children: h.map((e) => /* @__PURE__ */ $(nt.Item, {
								value: `recent-${e.id} ${e.label}`,
								keywords: e.keywords,
								onSelect: () => T(e),
								"data-testid": `command-palette-recent-${e.id}`,
								className: t("flex items-center gap-2 px-3 py-2 mx-1 rounded-md cursor-pointer text-sm", "text-text-primary aria-selected:bg-surface-hover"),
								children: [e.icon && /* @__PURE__ */ Q("span", {
									className: "shrink-0 text-text-secondary",
									children: e.icon
								}), /* @__PURE__ */ Q("span", {
									className: "flex-1 truncate",
									children: e.label
								})]
							}, `recent-${e.id}`))
						}),
						g.map(({ groupName: e, items: n }) => /* @__PURE__ */ Q(nt.Group, {
							heading: e ?? void 0,
							children: n.map((e) => /* @__PURE__ */ $(nt.Item, {
								value: `${e.id} ${e.label} ${(e.keywords ?? []).join(" ")}`,
								keywords: e.keywords,
								onSelect: () => T(e),
								"data-testid": `command-palette-item-${e.id}`,
								className: t("flex items-center gap-2 px-3 py-2 mx-1 rounded-md cursor-pointer text-sm", "text-text-primary aria-selected:bg-surface-hover"),
								children: [
									e.icon && /* @__PURE__ */ Q("span", {
										className: "shrink-0 text-text-secondary",
										children: e.icon
									}),
									/* @__PURE__ */ Q("span", {
										className: "flex-1 truncate",
										children: e.label
									}),
									e.hint && /* @__PURE__ */ Q("span", {
										className: "text-xs text-text-tertiary truncate",
										children: e.hint
									}),
									e.shortcut && e.shortcut.length > 0 && /* @__PURE__ */ Q("span", {
										className: "flex items-center gap-1 shrink-0",
										children: e.shortcut.map((n, r) => /* @__PURE__ */ Q("kbd", {
											className: t("inline-flex items-center justify-center min-w-[18px] h-[18px] px-1", "text-[11px] font-mono font-medium", "bg-surface-hover text-text-secondary", "border border-border rounded"),
											children: n
										}, `${e.id}-kbd-${r}`))
									})
								]
							}, e.id))
						}, e ?? "__ungrouped__")),
						_.groups.map((e) => /* @__PURE__ */ Q(nt.Group, {
							heading: e.group,
							forceMount: !0,
							"data-testid": `command-palette-records-${e.group}`,
							children: e.items.map((t) => /* @__PURE__ */ $(nt.Item, {
								value: `record ${e.group} ${t.id} ${t.title}`,
								forceMount: !0,
								onSelect: () => w(t),
								"data-testid": `command-palette-record-${t.id}`,
								className: Ft,
								children: [
									t.icon && /* @__PURE__ */ Q("span", {
										className: "shrink-0 text-text-secondary",
										children: t.icon
									}),
									/* @__PURE__ */ $("span", {
										className: "min-w-0 flex-1",
										children: [/* @__PURE__ */ Q("span", {
											className: "block truncate",
											children: t.title
										}), t.subtitle && /* @__PURE__ */ Q("span", {
											className: "block truncate text-xs text-text-tertiary",
											children: t.subtitle
										})]
									}),
									/* @__PURE__ */ Q("span", {
										className: "shrink-0 rounded border border-border px-1.5 text-xs text-text-secondary",
										children: t.kind
									})
								]
							}, `${e.group}-${t.id}`))
						}, `records-${e.group}`)),
						_.status === "loading" && /* @__PURE__ */ Q("div", {
							className: "px-3 py-2 text-sm text-text-tertiary",
							"data-testid": "command-palette-records-loading",
							children: "Searching records…"
						}),
						_.status === "error" && /* @__PURE__ */ $("div", {
							className: "flex items-center gap-2 px-3 py-2 text-sm text-text-secondary",
							"data-testid": "command-palette-records-error",
							children: [/* @__PURE__ */ Q("span", {
								className: "flex-1",
								children: "Couldn’t search records."
							}), /* @__PURE__ */ Q("button", {
								"data-ui-part": "",
								type: "button",
								onClick: v,
								className: "rounded border border-border px-2 py-0.5 text-xs hover:bg-surface-hover",
								children: "Retry"
							})]
						})
					]
				}),
				/* @__PURE__ */ Q("div", {
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
function Lt({ className: e, label: n = "Search", size: r = "sm" } = {}) {
	let { toggle: i } = Et();
	return /* @__PURE__ */ $("button", {
		"data-ui-part": "",
		type: "button",
		onClick: i,
		"data-testid": "command-palette-hint",
		className: t("inline-flex items-center rounded-md border border-border", r === "md" ? "h-9 gap-2 bg-surface px-3 text-[13px] font-medium text-text-primary shadow-sm hover:bg-surface-hover" : "gap-1.5 px-2 py-1 text-xs text-text-secondary bg-surface-hover hover:bg-surface-panel", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", "cursor-pointer transition-colors", e),
		"aria-label": "Open command palette",
		"aria-keyshortcuts": "Meta+K Control+K",
		children: [/* @__PURE__ */ Q("kbd", {
			className: t("font-mono", r === "md" ? "text-[12px] text-text-secondary" : "text-[11px]"),
			children: "⌘K"
		}), /* @__PURE__ */ Q("span", { children: n })]
	});
}
//#endregion
//#region src/components/shared/PickerDialog.tsx
function Rt({ open: e, title: n, body: r, options: i, confirmLabel: a = "Choose", onPick: o, onCancel: s, searchPlaceholder: c = "Search…", emptyText: l = "Nothing to choose from.", loading: u = !1, initialId: d, "data-testid": f = "picker-dialog" }) {
	let [p, m] = X(""), [h, g] = X(d ?? null), _ = Y(null);
	q(() => {
		e && (m(""), g(d ?? null));
	}, [e, d]);
	let v = J(() => {
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
	return /* @__PURE__ */ Q(ie, {
		open: e,
		title: n,
		...r ? { body: r } : {},
		confirmLabel: a,
		confirmDisabled: !b,
		onConfirm: () => x(b?.id ?? null),
		onCancel: s,
		children: /* @__PURE__ */ $("div", {
			className: "flex flex-col gap-2",
			"data-testid": f,
			onKeyDown: S,
			children: [i.length > 6 && /* @__PURE__ */ Q(U, {
				autoFocus: !0,
				size: "md",
				value: p,
				onChange: (e) => m(e.target.value),
				placeholder: c,
				"aria-label": c,
				"data-testid": `${f}-search`
			}), /* @__PURE__ */ Q("div", {
				ref: _,
				role: "listbox",
				"data-ui-listbox": "picker",
				"aria-label": n,
				tabIndex: i.length > 6 ? -1 : 0,
				className: "flex max-h-[320px] flex-col overflow-y-auto rounded-md border border-border py-1",
				children: u ? /* @__PURE__ */ Q("div", {
					className: "px-3 py-2 text-[13px] text-text-tertiary",
					children: "Loading…"
				}) : v.length === 0 ? /* @__PURE__ */ Q("div", {
					className: "px-3 py-2 text-[13px] text-text-tertiary",
					"data-testid": `${f}-empty`,
					children: l
				}) : v.map((e) => {
					let n = e.id === b?.id;
					return /* @__PURE__ */ $("button", {
						"data-ui-part": "",
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
						className: t("flex w-full items-center gap-2.5 border-none py-1.5 pr-3 text-left text-[13px] font-[inherit]", zt[Math.min(e.depth ?? 0, zt.length - 1)], e.disabled ? "cursor-not-allowed bg-transparent text-text-tertiary" : n ? "cursor-pointer bg-primary-bg text-primary-fg" : "cursor-pointer bg-transparent text-text-primary hover:bg-surface-hover"),
						children: [e.icon && /* @__PURE__ */ Q("span", {
							className: "flex w-4 shrink-0 items-center justify-center",
							"aria-hidden": "true",
							children: e.icon
						}), /* @__PURE__ */ $("span", {
							className: "flex min-w-0 flex-1 flex-col",
							children: [/* @__PURE__ */ Q("span", {
								className: "truncate",
								children: e.label
							}), (e.description || e.disabled && e.disabledReason) && /* @__PURE__ */ Q("span", {
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
var zt = [
	"pl-3",
	"pl-7",
	"pl-11",
	"pl-[3.75rem]",
	"pl-[4.75rem]",
	"pl-[5.75rem]"
], Bt = "🔒";
function Vt({ capabilityName: e, title: t, description: n, actionLabel: r, onAction: i, actions: a, icon: o, testId: s = "capability-denied-fallback" }) {
	let c = t ?? (e ? `${e} is unavailable` : "Feature unavailable"), l = n ?? (e ? `${e} is not enabled for this workspace. Contact your administrator to request access.` : "This feature is not enabled for your account. Contact your administrator to request access.");
	return /* @__PURE__ */ Q(ue, {
		icon: o === null ? void 0 : o ?? Bt,
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
function Ht(e) {
	return e.rows ?? e.shortcuts ?? [];
}
function Ut(e) {
	return e.action ?? e.label ?? "";
}
var Wt = [
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
function Gt({ open: e, onClose: n, sections: r = Wt }) {
	return /* @__PURE__ */ $(re, {
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
			/* @__PURE__ */ Q("div", {
				className: "text-base font-semibold text-text-primary mb-2.5",
				children: "Keyboard shortcuts"
			}),
			/* @__PURE__ */ Q("div", {
				className: "overflow-y-auto pr-1",
				children: r.map((e, n) => /* @__PURE__ */ $("div", { children: [/* @__PURE__ */ Q("div", {
					className: t("text-[12px] font-bold text-text-primary uppercase tracking-[0.05em] mb-1.5", n === 0 ? "mt-0 pt-0" : "mt-4 pt-1.5 border-t border-border-subtle"),
					children: e.title
				}), /* @__PURE__ */ Q("div", { children: Ht(e).map((n, r) => /* @__PURE__ */ $("div", {
					className: t("flex items-baseline justify-between py-1 text-[13px] gap-4", n.planned && "opacity-60"),
					"data-planned": n.planned ? "true" : void 0,
					children: [Array.isArray(n.keys) ? /* @__PURE__ */ Q("span", {
						className: "flex shrink-0 items-baseline gap-1",
						children: n.keys.map((e, r) => /* @__PURE__ */ Q("span", {
							className: t("font-mono text-[12px] border rounded px-1.5 py-px whitespace-nowrap shrink-0", n.planned ? "text-text-tertiary bg-surface border-border-subtle line-through" : "text-text-primary bg-surface-hover border-border"),
							children: e
						}, `${e}-${r}`))
					}) : /* @__PURE__ */ Q("span", {
						className: t("font-mono text-[12px] border rounded px-1.5 py-px whitespace-nowrap shrink-0", n.planned ? "text-text-tertiary bg-surface border-border-subtle line-through" : "text-text-primary bg-surface-hover border-border"),
						children: n.keys
					}), /* @__PURE__ */ $("span", {
						className: "text-neutral text-right flex-1",
						children: [Ut(n), n.planned && /* @__PURE__ */ Q("span", {
							className: "ml-1.5 text-[10px] uppercase tracking-wide text-text-tertiary",
							children: "planned"
						})]
					})]
				}, `${e.title}-${r}`)) })] }, e.title))
			}),
			/* @__PURE__ */ Q("div", {
				className: "flex justify-end mt-[18px]",
				children: /* @__PURE__ */ Q("button", {
					"data-ui-part": "",
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
var Kt = {
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
function qt({ targetId: e = "main-content", children: t = "Skip to main content", className: n, onSkip: r }) {
	let [i, a] = X(!1);
	return /* @__PURE__ */ Q("a", {
		href: `#${e}`,
		className: n,
		style: i ? Kt : _e,
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
function Jt(e, t) {
	let [n, r] = X(e), i = Y(e), a = Y(0), o = Y(null);
	return q(() => {
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
	}, [e, t]), q(() => () => {
		o.current && clearTimeout(o.current);
	}, []), n;
}
function Yt({ message: e, politeness: t = "polite", atomic: n = !0, throttleMs: r = 0, role: i = "status", "data-testid": a }) {
	let o = Jt(e, r);
	return /* @__PURE__ */ Q(ve, {
		as: "div",
		"data-testid": a,
		children: /* @__PURE__ */ Q("div", {
			...i === "none" ? null : { role: i },
			"aria-live": t,
			"aria-atomic": n,
			children: o
		})
	});
}
//#endregion
//#region src/components/shared/StatCard.tsx
var Xt = {
	positive: "text-[var(--color-success)]",
	negative: "text-[var(--color-danger)]",
	neutral: "text-[var(--color-text-secondary)]"
};
function Zt(e) {
	return e.tone ?? (e.direction === "up" ? "positive" : "negative");
}
function Qt({ label: e, value: n, accent: r = !1, danger: i = !1, hint: o, title: s, delta: c, sparklineData: l, to: u, as: d, onClick: f, mono: p = !1, size: m, className: h, style: g, "data-testid": _ }) {
	let v = a("StatCard", m, {
		comfortable: "md",
		compact: "sm"
	}), y = t("block rounded-lg border p-3 no-underline transition-colors", !r && !i && "bg-[var(--color-surface)] border-[var(--color-border)]", r && "bg-[var(--color-primary-soft)] border-l-[3px] border-l-[var(--color-primary)] border-[var(--color-border)]", i && "bg-[var(--color-danger-bg)] border-l-[3px] border-l-[var(--color-danger)] border-[var(--color-border)]", (u || f) && "hover:bg-[var(--color-surface-hover)] cursor-pointer", h), b = l && l.length > 0 ? l : null, x = null;
	if (c) {
		let e = Zt(c), n = c.direction === "up" ? "▲" : "▼", r = c.direction === "up" ? "+" : "-", i = c.suffix ?? "%", a = Math.abs(c.value), o = c["aria-label"] ?? `${c.direction} ${a}${i}`;
		x = /* @__PURE__ */ $("div", {
			"data-testid": "stat-card-delta",
			"data-direction": c.direction,
			"data-tone": e,
			"aria-label": o,
			className: t("mt-1 text-[12px] font-medium leading-tight", Xt[e]),
			children: [
				/* @__PURE__ */ $("span", {
					"aria-hidden": "true",
					children: [n, " "]
				}),
				r,
				a,
				i
			]
		});
	}
	let S = /* @__PURE__ */ $(Z, { children: [
		/* @__PURE__ */ Q("div", {
			className: "text-[12px] uppercase tracking-wide text-[var(--color-text-tertiary)]",
			children: e
		}),
		/* @__PURE__ */ $("div", {
			className: "mt-1 flex items-center gap-2",
			children: [/* @__PURE__ */ Q("div", {
				className: t(v === "sm" ? "text-sm font-semibold leading-5 text-[var(--color-text-primary)]" : "text-[24px] font-bold leading-tight text-[var(--color-text-primary)]", p && "font-mono"),
				children: n
			}), b && /* @__PURE__ */ Q(he, {
				data: b,
				width: 80,
				height: 20
			})]
		}),
		x,
		o != null && /* @__PURE__ */ Q("div", {
			className: t("mt-1 italic text-[var(--color-text-tertiary)]", v === "sm" ? "text-xs" : "text-[11px]"),
			children: o
		})
	] });
	return u ? d ? /* @__PURE__ */ Q(d, {
		to: u,
		title: s,
		"data-testid": _,
		className: y,
		style: g,
		children: S
	}) : /* @__PURE__ */ Q("a", {
		href: u,
		title: s,
		"data-testid": _,
		className: y,
		style: g,
		children: S
	}) : f ? /* @__PURE__ */ Q("button", {
		"data-ui-part": "",
		type: "button",
		onClick: f,
		title: s,
		"data-testid": _,
		className: t(y, "w-full text-left"),
		style: g,
		children: S
	}) : /* @__PURE__ */ Q("div", {
		"data-testid": _,
		title: s,
		className: y,
		style: g,
		children: S
	});
}
//#endregion
//#region src/components/shared/FullscreenToggle.tsx
function $t({ target: t, label: n = "Full screen", exitLabel: r = "Exit full screen", onChange: i, size: a = "sm", variant: o = "ghost", "data-testid": s = "fullscreen-toggle", ...c }) {
	let l = e(t);
	if (!l.supported) return null;
	let u = l.active ? r : n;
	return /* @__PURE__ */ Q(y, {
		...c,
		size: a,
		variant: o,
		"aria-label": u,
		title: u,
		"aria-pressed": l.active,
		"data-testid": s,
		"data-fullscreen": l.active ? "true" : "false",
		icon: l.active ? /* @__PURE__ */ Q(T, { size: 16 }) : /* @__PURE__ */ Q(k, { size: 16 }),
		onClick: () => {
			l.toggle().then(() => i?.(!!t.current && document.fullscreenElement === t.current));
		}
	});
}
//#endregion
//#region src/components/shared/SuggestionCard.tsx
function en({ reason: e, title: n, label: r, tone: i = "neutral", meta: a, context: o, onSelect: s, actionLabel: c = "Use this", disabled: l = !1, className: u, "data-testid": d }) {
	return /* @__PURE__ */ $("button", {
		"data-ui-part": "",
		type: "button",
		"data-testid": d,
		onClick: s,
		disabled: l,
		"aria-label": `${n} — ${e}`,
		className: t("group w-full text-left flex flex-col gap-1.5 rounded-lg border p-3 transition-colors", "border-border bg-surface hover:border-border-emphasis hover:bg-surface-hover", "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1", l ? "opacity-60 cursor-not-allowed" : "cursor-pointer", u),
		children: [
			/* @__PURE__ */ $("span", {
				className: "flex items-center gap-2 min-w-0",
				children: [r && /* @__PURE__ */ Q("span", {
					className: t("shrink-0 text-[10px] font-semibold uppercase tracking-wide px-1.5 py-0.5 rounded", v[i]),
					children: r
				}), /* @__PURE__ */ Q("span", {
					className: "text-[11px] text-text-secondary truncate",
					children: e
				})]
			}),
			/* @__PURE__ */ Q("span", {
				className: "text-[13px] font-medium text-text-primary line-clamp-2",
				children: n
			}),
			(a || o) && /* @__PURE__ */ $("span", {
				className: "flex items-center gap-2 text-[11px] text-text-tertiary min-w-0",
				children: [a, o && /* @__PURE__ */ Q("span", {
					className: "truncate",
					children: o
				})]
			}),
			/* @__PURE__ */ $("span", {
				"aria-hidden": "true",
				className: "text-[11px] font-semibold text-primary opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity",
				children: [c, " →"]
			})
		]
	});
}
//#endregion
//#region src/components/shared/TaskComposer.tsx
function tn({ title: e, description: n, titlePlaceholder: r = "Title", promptPlaceholder: i = "What should it do?", suggestions: a, suggestionsTitle: s = "Suggested next", suggestionsLoading: c = !1, suggestionsEmpty: l, onSubmit: u, onChooseSuggestion: d, submitLabel: f = "Queue", hint: p, busy: m = !1, className: h, "data-testid": g }) {
	let [_, v] = X(""), [y, b] = X(""), [x, S] = X(void 0), C = et(), w = et();
	q(() => {
		x && a && !a.some((e) => e.id === x) && S(void 0);
	}, [x, a]);
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
	let O = c || (a?.length ?? 0) > 0 || !!l;
	return /* @__PURE__ */ $("section", {
		"data-ui-part": "",
		"data-testid": g,
		className: t("rounded-lg border border-border bg-surface overflow-hidden", h),
		children: [
			/* @__PURE__ */ $("div", {
				className: "px-3.5 pt-3 pb-1",
				children: [/* @__PURE__ */ Q("h3", {
					className: "text-xs font-semibold text-text-secondary tracking-wide select-none uppercase",
					children: e
				}), n && /* @__PURE__ */ Q("p", {
					className: "mt-1 text-[12px] text-text-tertiary",
					children: n
				})]
			}),
			O && /* @__PURE__ */ $("div", {
				className: "px-3.5 pt-2 pb-1",
				children: [/* @__PURE__ */ Q("div", {
					className: "text-[11px] font-semibold text-text-tertiary tracking-wide uppercase mb-2",
					children: s
				}), c ? /* @__PURE__ */ Q("div", {
					className: "grid gap-2 sm:grid-cols-2 lg:grid-cols-4",
					"aria-busy": "true",
					children: [
						0,
						1,
						2,
						3
					].map((e) => /* @__PURE__ */ Q("div", { className: "h-[92px] rounded-lg border border-border bg-surface-panel animate-pulse" }, e))
				}) : (a?.length ?? 0) > 0 ? /* @__PURE__ */ Q("div", {
					className: "grid gap-2 sm:grid-cols-2 lg:grid-cols-4",
					children: a.map((e) => /* @__PURE__ */ Q(en, {
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
				}) : /* @__PURE__ */ Q("div", {
					className: "text-[12px] text-text-tertiary",
					children: l
				})]
			}),
			/* @__PURE__ */ $("div", {
				className: "px-3.5 pt-2 pb-2 flex flex-col gap-2",
				children: [
					/* @__PURE__ */ Q("label", {
						className: "sr-only",
						htmlFor: C,
						children: r
					}),
					/* @__PURE__ */ Q(U, {
						id: C,
						value: _,
						onChange: (e) => v(e.target.value),
						placeholder: r,
						disabled: m
					}),
					/* @__PURE__ */ Q("label", {
						className: "sr-only",
						htmlFor: w,
						children: i
					}),
					/* @__PURE__ */ Q(xe, {
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
			/* @__PURE__ */ $("div", {
				className: "px-3.5 pb-3 flex items-center gap-3",
				children: [
					p && /* @__PURE__ */ Q("span", {
						className: "text-[11px] text-text-tertiary select-none",
						children: p
					}),
					/* @__PURE__ */ Q("span", { className: "flex-1" }),
					/* @__PURE__ */ Q(o, {
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
var nn = 4, rn = 3;
function an({ name: e, title: n, subtitle: r, imageUrl: i, matchedSkills: a, otherSkills: s = [], contexts: c = [], evidence: l = [], evidenceLabel: u = "Seen in", onAsk: d, askLabel: f = "Ask for help", footerExtra: p, onOpen: m, className: g, "data-testid": _ }) {
	let v = s.filter((e) => !a.some((t) => t.name.toLowerCase() === e.toLowerCase())), y = l.slice(0, rn), b = v.slice(0, nn);
	return /* @__PURE__ */ $("div", {
		"data-testid": _,
		onClick: m,
		className: t("flex flex-col gap-2.5 rounded-lg border border-border bg-surface p-3.5 min-w-0", m && "cursor-pointer hover:border-border-emphasis hover:bg-surface-hover transition-colors", g),
		children: [
			/* @__PURE__ */ $("div", {
				className: "flex items-center gap-2.5 min-w-0",
				children: [/* @__PURE__ */ Q(Ce, {
					name: e,
					size: 36,
					...i ? { src: i } : {}
				}), /* @__PURE__ */ $("div", {
					className: "flex flex-col min-w-0",
					children: [/* @__PURE__ */ Q("span", {
						className: "text-[13.5px] font-semibold text-text-primary truncate",
						children: e
					}), (n || r) && /* @__PURE__ */ $("span", {
						className: "text-[11.5px] text-text-secondary truncate",
						children: [
							n,
							n && r ? " · " : "",
							r
						]
					})]
				})]
			}),
			a.length > 0 && /* @__PURE__ */ $("div", {
				className: "flex flex-wrap items-center gap-1",
				children: [
					a.map((e) => /* @__PURE__ */ Q(h, {
						tone: "accent",
						size: "xs",
						solid: (e.strength ?? 0) >= .7,
						children: e.name
					}, e.name)),
					b.map((e) => /* @__PURE__ */ Q(h, {
						tone: "neutral",
						size: "xs",
						children: e
					}, e)),
					v.length > nn && /* @__PURE__ */ $("span", {
						className: "text-xs text-text-tertiary",
						children: ["+", v.length - nn]
					})
				]
			}),
			c.length > 0 && /* @__PURE__ */ $("div", {
				className: "text-xs text-text-tertiary truncate",
				title: c.join(", "),
				children: ["Working on ", c.join(", ")]
			}),
			y.length > 0 && /* @__PURE__ */ $("div", {
				className: "flex flex-col gap-1 min-w-0",
				children: [/* @__PURE__ */ Q("span", {
					className: "text-xs font-semibold uppercase tracking-wide text-text-tertiary select-none",
					children: u
				}), y.map((e) => /* @__PURE__ */ $("div", {
					className: "flex items-center gap-1.5 min-w-0",
					children: [e.source && /* @__PURE__ */ Q(h, {
						tone: "neutral",
						size: "xs",
						mono: !0,
						children: e.source
					}), e.href ? /* @__PURE__ */ Q("a", {
						href: e.href,
						onClick: (e) => e.stopPropagation(),
						className: "text-[11.5px] text-text-secondary no-underline hover:underline truncate",
						children: e.title
					}) : /* @__PURE__ */ Q("span", {
						className: "text-[11.5px] text-text-secondary truncate",
						children: e.title
					})]
				}, e.id))]
			}),
			(d || p) && /* @__PURE__ */ $("div", {
				className: "mt-auto pt-1 flex items-center gap-2",
				children: [
					p,
					/* @__PURE__ */ Q("span", { className: "flex-1" }),
					d && /* @__PURE__ */ Q(o, {
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
var on = {
	pending: "warning",
	answered: "success",
	expired: "neutral",
	withdrawn: "neutral"
};
function sn({ question: e, context: n, origin: r = [], askedAt: i, status: a, answer: s, answeredBy: c, onAnswer: l, answerPlaceholder: u = "Answer the agent — it is waiting on this…", busy: d = !1, footer: f, flush: p = !1, className: m, "data-testid": g }) {
	let [_, v] = X(""), y = _.trim().length > 0 && !d;
	function b() {
		!y || !l || (l(_.trim()), v(""));
	}
	return /* @__PURE__ */ $("section", {
		"data-ui-part": "",
		"data-testid": g,
		className: t("flex flex-col gap-2.5 min-w-0", !p && "rounded-lg border bg-surface p-3.5", !p && (a === "pending" ? "border-warning/50" : "border-border"), m),
		children: [
			/* @__PURE__ */ $("div", {
				className: "flex items-center gap-2 min-w-0",
				children: [
					/* @__PURE__ */ Q(h, {
						tone: on[a],
						size: "xs",
						dot: a === "pending" ? "pulse" : "static",
						uppercase: !0,
						children: a === "pending" ? "agent waiting" : a
					}),
					r.map((e) => /* @__PURE__ */ Q(h, {
						tone: "neutral",
						size: "xs",
						mono: !0,
						children: e
					}, e)),
					/* @__PURE__ */ Q("span", { className: "flex-1" }),
					i && /* @__PURE__ */ Q("span", {
						className: "text-xs text-text-tertiary whitespace-nowrap",
						children: i
					})
				]
			}),
			/* @__PURE__ */ Q("p", {
				className: "m-0 text-[13.5px] font-medium text-text-primary leading-snug",
				children: e
			}),
			n && /* @__PURE__ */ Q("p", {
				className: "m-0 text-[12px] text-text-secondary leading-snug border-l-2 border-border pl-2.5",
				children: n
			}),
			a === "answered" && s && /* @__PURE__ */ $("div", {
				className: "flex flex-col gap-1",
				children: [/* @__PURE__ */ $("span", {
					className: "text-xs font-semibold uppercase tracking-wide text-text-tertiary select-none",
					children: ["Answer", c ? ` — ${c}` : ""]
				}), /* @__PURE__ */ Q("p", {
					className: "m-0 text-[12.5px] text-text-primary leading-snug",
					children: s
				})]
			}),
			a === "expired" && /* @__PURE__ */ Q("p", {
				className: "m-0 text-[11.5px] text-text-tertiary",
				children: "Expired unanswered — the agent stopped waiting."
			}),
			a === "pending" && l && /* @__PURE__ */ $("div", {
				className: "flex flex-col gap-2",
				children: [/* @__PURE__ */ Q(xe, {
					value: _,
					onChange: (e) => v(e.target.value),
					placeholder: u,
					rows: 2,
					disabled: d,
					onKeyDown: (e) => {
						e.key === "Enter" && (e.metaKey || e.ctrlKey) && (e.preventDefault(), b());
					}
				}), /* @__PURE__ */ $("div", {
					className: "flex items-center gap-2",
					children: [
						f,
						/* @__PURE__ */ Q("span", { className: "flex-1" }),
						/* @__PURE__ */ Q(o, {
							size: "sm",
							onClick: b,
							disabled: !y,
							children: d ? "Sending…" : "Send answer"
						})
					]
				})]
			}),
			(a !== "pending" || !l) && f && /* @__PURE__ */ Q("div", {
				className: "flex items-center gap-2",
				children: f
			})
		]
	});
}
//#endregion
//#region src/components/shared/DiffViewer.tsx
var cn = /^@@ -(\d+)(?:,\d+)? \+(\d+)(?:,\d+)? @@/;
function ln(e) {
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
		let e = a.match(cn);
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
var un = {
	added: "success",
	deleted: "danger",
	renamed: "info",
	modified: "neutral"
}, dn = {
	critical: "danger",
	warning: "warning",
	info: "info"
}, fn = {
	add: "bg-success-bg/40",
	del: "bg-danger-bg/40",
	ctx: "",
	hunk: "bg-surface-hover"
};
function pn({ a: e }) {
	return /* @__PURE__ */ $("div", {
		className: "flex items-start gap-2 px-3 py-2 font-sans border-y border-border bg-surface-panel",
		children: [/* @__PURE__ */ Q(h, {
			tone: dn[e.severity ?? "info"],
			size: "md",
			uppercase: !0,
			children: e.severity ?? "note"
		}), /* @__PURE__ */ $("div", {
			className: "min-w-0",
			children: [/* @__PURE__ */ Q("span", {
				className: "text-[12px] text-text-primary leading-snug",
				children: e.note
			}), e.author && /* @__PURE__ */ $("span", {
				className: "ml-2 text-xs text-text-tertiary whitespace-nowrap",
				children: ["— ", e.author]
			})]
		})]
	});
}
function mn({ file: e, annotations: n, collapsed: r, onToggle: i, maxLines: a }) {
	let { pinned: o, floating: s } = J(() => {
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
	return /* @__PURE__ */ $("div", {
		className: "border border-border rounded-lg overflow-hidden bg-surface",
		children: [/* @__PURE__ */ $("button", {
			"data-ui-part": "",
			type: "button",
			onClick: i,
			"aria-expanded": !r,
			className: "w-full flex items-center gap-2 px-3 py-2 bg-surface-panel border-0 cursor-pointer text-left hover:bg-surface-hover min-w-0",
			children: [
				/* @__PURE__ */ Q(P, {
					dir: r ? "right" : "down",
					size: 12,
					className: "shrink-0 text-text-tertiary"
				}),
				/* @__PURE__ */ Q("span", {
					className: "text-[12px] font-mono font-semibold text-text-primary truncate",
					children: e.oldPath ? `${e.oldPath} → ${e.path}` : e.path
				}),
				/* @__PURE__ */ Q(h, {
					tone: un[e.status],
					size: "md",
					children: e.status
				}),
				n.length > 0 && /* @__PURE__ */ $(h, {
					tone: "warning",
					size: "md",
					mono: !0,
					children: [
						n.length,
						" note",
						n.length === 1 ? "" : "s"
					]
				}),
				/* @__PURE__ */ Q("span", { className: "flex-1" }),
				/* @__PURE__ */ $("span", {
					className: "text-xs font-mono tabular-nums whitespace-nowrap",
					children: [
						/* @__PURE__ */ $("span", {
							className: "text-success-fg",
							children: ["+", e.adds]
						}),
						" ",
						/* @__PURE__ */ $("span", {
							className: "text-danger-fg",
							children: ["−", e.dels]
						})
					]
				})
			]
		}), !r && /* @__PURE__ */ $("div", {
			"data-ui-diff-scroll": "",
			className: "overflow-x-auto",
			children: [s.map((e, t) => /* @__PURE__ */ Q(pn, { a: e }, `f${t}`)), e.binary ? /* @__PURE__ */ Q("div", {
				className: "px-3 py-2 text-[12px] text-text-tertiary",
				children: "Binary file — no text diff."
			}) : /* @__PURE__ */ Q("table", {
				"data-ui-part": "",
				"data-ui-table-rows": "code-diff",
				className: "w-full border-collapse font-mono text-xs leading-[1.5]",
				children: /* @__PURE__ */ $("tbody", { children: [c.map((e, n) => e.kind === "hunk" ? /* @__PURE__ */ Q("tr", {
					className: fn.hunk,
					children: /* @__PURE__ */ Q("td", {
						colSpan: 3,
						className: "px-3 py-0.5 text-xs text-text-tertiary select-none",
						children: e.text
					})
				}, n) : /* @__PURE__ */ $(Ze, { children: [/* @__PURE__ */ $("tr", {
					"data-diff-line": e.kind,
					className: fn[e.kind],
					children: [
						/* @__PURE__ */ Q("td", {
							"data-diff-cell": "gutter",
							className: "w-[3.2em] px-1.5 text-right text-xs leading-[1.5] text-text-tertiary select-none align-top tabular-nums border-r border-border/60",
							children: e.oldNo ?? ""
						}),
						/* @__PURE__ */ Q("td", {
							"data-diff-cell": "gutter",
							className: "w-[3.2em] px-1.5 text-right text-xs leading-[1.5] text-text-tertiary select-none align-top tabular-nums border-r border-border/60",
							children: e.newNo ?? ""
						}),
						/* @__PURE__ */ $("td", {
							"data-diff-cell": "code",
							className: t("px-2 whitespace-pre align-top", e.kind === "add" && "text-success-fg", e.kind === "del" && "text-danger-fg", e.kind === "ctx" && "text-text-secondary"),
							children: [/* @__PURE__ */ Q("span", {
								className: "select-none inline-block w-[1ch] mr-1 text-text-tertiary",
								children: e.kind === "add" ? "+" : e.kind === "del" ? "-" : " "
							}), e.text || " "]
						})
					]
				}), e.newNo != null && o.get(e.newNo)?.map((e, t) => /* @__PURE__ */ Q("tr", { children: /* @__PURE__ */ Q("td", {
					colSpan: 3,
					className: "p-0",
					children: /* @__PURE__ */ Q(pn, { a: e })
				}) }, `${n}-a${t}`))] }, n)), l && /* @__PURE__ */ Q("tr", { children: /* @__PURE__ */ $("td", {
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
function hn({ diff: e, annotations: n = [], defaultCollapsed: r = !1, maxLinesPerFile: i = 800, truncatedNote: a, className: o, "data-testid": s }) {
	let c = J(() => ln(e), [e]), [l, u] = X(() => r ? new Set(c.map((e) => e.path)) : /* @__PURE__ */ new Set()), d = Y(/* @__PURE__ */ new Map()), f = J(() => {
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
	if (c.length === 0) return /* @__PURE__ */ Q("div", {
		"data-testid": s,
		className: t("text-[12px] text-text-tertiary", o),
		children: "No parseable diff."
	});
	let h = c.reduce((e, t) => e + t.adds, 0), g = c.reduce((e, t) => e + t.dels, 0);
	return /* @__PURE__ */ $("div", {
		"data-testid": s,
		className: t("flex flex-col gap-2 min-w-0", o),
		children: [
			/* @__PURE__ */ $("div", {
				className: "flex items-center gap-1.5 flex-wrap",
				children: [/* @__PURE__ */ $("span", {
					className: "text-xs text-text-secondary font-medium whitespace-nowrap",
					children: [
						c.length,
						" file",
						c.length === 1 ? "" : "s",
						" ",
						/* @__PURE__ */ $("span", {
							className: "font-mono tabular-nums",
							children: [
								/* @__PURE__ */ $("span", {
									className: "text-success-fg",
									children: ["+", h]
								}),
								" ",
								/* @__PURE__ */ $("span", {
									className: "text-danger-fg",
									children: ["−", g]
								})
							]
						})
					]
				}), c.map((e) => /* @__PURE__ */ Q("button", {
					"data-ui-part": "",
					type: "button",
					onClick: () => m(e.path),
					title: e.path,
					className: t("px-1.5 py-0.5 rounded border border-border bg-surface text-xs cursor-pointer", "text-text-secondary hover:border-border-emphasis hover:text-text-primary truncate max-w-[220px]", (f.get(e.path)?.length ?? 0) > 0 && "border-warning/60"),
					children: /* @__PURE__ */ Q("code", {
						className: "font-mono",
						children: e.path.split("/").pop()
					})
				}, e.path))]
			}),
			a && /* @__PURE__ */ Q("div", {
				className: "text-xs text-warning",
				children: a
			}),
			c.map((e) => /* @__PURE__ */ Q("div", {
				ref: (t) => {
					d.current.set(e.path, t);
				},
				children: /* @__PURE__ */ Q(mn, {
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
var gn = {
	1: "sm:grid-cols-1",
	2: "sm:grid-cols-2",
	3: "sm:grid-cols-3",
	4: "sm:grid-cols-4"
}, _n = {
	1: "md:grid-cols-1",
	2: "md:grid-cols-2",
	3: "md:grid-cols-3",
	4: "md:grid-cols-4"
}, vn = {
	1: "lg:grid-cols-1",
	2: "lg:grid-cols-2",
	3: "lg:grid-cols-3",
	4: "lg:grid-cols-4"
};
function yn({ children: e, columns: n = 4, mdColumns: r, dense: i = !1, className: a, style: o, "data-testid": s = "kpi-grid" }) {
	return /* @__PURE__ */ Q("div", {
		"data-testid": s,
		className: t("grid grid-cols-1", r ? void 0 : gn[n], r && _n[r], r && vn[n], i ? "gap-2" : "gap-4", a),
		style: o,
		children: e
	});
}
//#endregion
//#region src/components/shared/Prose.tsx
var bn = "max-w-none text-text-primary [&>*:first-child]:mt-0 [&>*:last-child]:mb-0 [&_h1]:font-semibold [&_h2]:font-semibold [&_h3]:font-semibold [&_h4]:font-semibold [&_h1]:pb-2 [&_h1]:border-b [&_h1]:border-border [&_h4]:pb-1 [&_h4]:border-b [&_h4]:border-border [&_p]:my-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:my-2 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:my-2 [&_li]:mb-1 [&_li]:last:mb-0 [&_blockquote]:border-l-2 [&_blockquote]:border-border [&_blockquote]:pl-3 [&_blockquote]:my-2 [&_blockquote]:italic [&_blockquote]:text-text-secondary [&_code]:font-mono [&_code]:text-[0.85em] [&_code]:rounded [&_code]:px-1 [&_code]:py-0.5 [&_code]:bg-surface-inset [&_pre]:font-mono [&_pre]:text-xs [&_pre]:rounded-md [&_pre]:border [&_pre]:border-border [&_pre]:bg-surface-inset [&_pre]:p-3 [&_pre]:overflow-x-auto [&_pre]:my-2 [&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_pre_code]:rounded-none [&_pre_code]:text-[inherit] [&_a]:underline-offset-2 [&_a:hover]:underline", xn = {
	sm: "text-[13px] leading-snug [&_h1]:text-sm [&_h2]:text-sm [&_h3]:text-[13px] [&_h4]:text-[13px] [&_h1]:mt-3 [&_h2]:mt-3 [&_h3]:mt-2.5 [&_h4]:mt-2.5 [&_h1]:mb-1.5 [&_h2]:mb-1.5 [&_h3]:mb-1 [&_h4]:mb-1",
	md: "text-sm leading-relaxed [&_h1]:text-xl [&_h2]:text-lg [&_h3]:text-base [&_h4]:text-sm [&_h1]:mt-6 [&_h2]:mt-5 [&_h3]:mt-4 [&_h4]:mt-4 [&_h1]:mb-3 [&_h2]:mb-2 [&_h3]:mb-1.5 [&_h4]:mb-1.5"
}, Sn = "[&_h1]:text-text-primary [&_h2]:text-text-primary [&_h3]:text-text-primary [&_h4]:text-text-primary [&_a]:text-primary", Cn = {
	neutral: "[&_h1]:text-neutral-fg [&_h2]:text-neutral-fg [&_h3]:text-neutral-fg [&_h4]:text-neutral-fg [&_a]:text-neutral-fg",
	success: "[&_h1]:text-success-fg [&_h2]:text-success-fg [&_h3]:text-success-fg [&_h4]:text-success-fg [&_a]:text-success-fg",
	warning: "[&_h1]:text-warning-fg [&_h2]:text-warning-fg [&_h3]:text-warning-fg [&_h4]:text-warning-fg [&_a]:text-warning-fg",
	danger: "[&_h1]:text-danger-fg [&_h2]:text-danger-fg [&_h3]:text-danger-fg [&_h4]:text-danger-fg [&_a]:text-danger-fg",
	info: "[&_h1]:text-info-fg [&_h2]:text-info-fg [&_h3]:text-info-fg [&_h4]:text-info-fg [&_a]:text-info-fg",
	caution: "[&_h1]:text-caution-fg [&_h2]:text-caution-fg [&_h3]:text-caution-fg [&_h4]:text-caution-fg [&_a]:text-caution-fg",
	accent: "[&_h1]:text-accent-fg [&_h2]:text-accent-fg [&_h3]:text-accent-fg [&_h4]:text-accent-fg [&_a]:text-accent-fg"
};
function wn({ children: e, size: n = "md", tone: r, className: i, "data-testid": a }) {
	let o = r === void 0 ? void 0 : m(r);
	return /* @__PURE__ */ Q("div", {
		"data-testid": a,
		className: t(bn, xn[n], o ? Cn[o] : Sn, i),
		children: e
	});
}
//#endregion
//#region src/components/shared/UserChip.tsx
function Tn({ name: e, label: n, avatarSize: r = 20, avatarColor: i, presence: a, onClick: o, className: s, style: c, title: l, labelClassName: u, "data-testid": d = "user-chip" }) {
	return /* @__PURE__ */ $(o ? "button" : "span", {
		type: o ? "button" : void 0,
		onClick: o,
		title: l ?? e,
		"data-testid": d,
		className: t("inline-flex items-center gap-1.5 rounded-full px-1.5 py-0.5 text-[12px] text-text-primary", o && "hover:bg-surface-hover cursor-pointer transition-colors", !o && "cursor-default", s),
		style: c,
		children: [
			/* @__PURE__ */ Q(Ce, {
				name: e,
				size: r,
				color: i
			}),
			/* @__PURE__ */ Q("span", {
				className: t("font-medium leading-none", u),
				children: n ?? e
			}),
			a && /* @__PURE__ */ Q(Ee, {
				state: a,
				size: "xs"
			})
		]
	});
}
//#endregion
//#region src/components/shared/EntityCell.tsx
function En({ label: e, id: n, href: r, mono: i = !1, className: a, labelClassName: o }) {
	let s = /* @__PURE__ */ Q("span", {
		className: "truncate",
		children: e
	});
	return /* @__PURE__ */ $("div", {
		className: t("flex flex-col min-w-0", a),
		children: [/* @__PURE__ */ Q("div", {
			className: t("font-medium text-[var(--color-text-primary)] truncate text-sm", o),
			children: r ? /* @__PURE__ */ Q("a", {
				href: r,
				className: "hover:text-[var(--color-primary)] hover:underline",
				children: s
			}) : s
		}), n && /* @__PURE__ */ Q("div", {
			className: t("text-[10px] font-mono text-[var(--color-text-tertiary)] truncate mt-0.5", i && "tracking-tight"),
			children: n
		})]
	});
}
//#endregion
//#region src/components/shared/CollapsibleSection.tsx
function Dn(e, t) {
	if (!e || typeof window > "u") return t;
	try {
		let n = window.localStorage.getItem(e);
		return n === null ? t : n === "true";
	} catch {
		return t;
	}
}
function On({ title: e, defaultOpen: n = !1, badge: r, actions: i, children: a, className: o, storageKey: s, density: c = "default", "data-testid": l }) {
	let [u, d] = X(() => Dn(s, n)), f = c === "compact", p = et(), m = Y(null), h = Y(null);
	return q(() => {
		if (s && !(typeof window > "u")) try {
			window.localStorage.setItem(s, String(u));
		} catch {}
	}, [u, s]), /* @__PURE__ */ $("div", {
		className: t("shrink-0 border border-[var(--color-border)] rounded-lg overflow-hidden", o),
		children: [/* @__PURE__ */ $("div", {
			className: "flex items-stretch bg-[var(--color-surface)]",
			children: [/* @__PURE__ */ $("button", {
				"data-ui-part": "",
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
				children: [/* @__PURE__ */ Q("span", {
					className: t("font-semibold text-[var(--color-text-primary)]", f ? "text-xs" : "text-sm"),
					children: e
				}), /* @__PURE__ */ $("div", {
					className: "flex items-center gap-2",
					children: [r, /* @__PURE__ */ Q("svg", {
						className: t("text-[var(--color-text-tertiary)] transition-transform", f ? "w-3 h-3" : "w-4 h-4", u && "rotate-180"),
						viewBox: "0 0 16 16",
						fill: "none",
						"aria-hidden": "true",
						children: /* @__PURE__ */ Q("path", {
							d: "M4 6l4 4 4-4",
							stroke: "currentColor",
							strokeWidth: "1.5",
							strokeLinecap: "round",
							strokeLinejoin: "round"
						})
					})]
				})]
			}), i && /* @__PURE__ */ Q("div", {
				className: "flex items-center gap-2 pr-4 shrink-0",
				children: i
			})]
		}), u && /* @__PURE__ */ Q("div", {
			id: p,
			ref: h,
			className: "border-t border-[var(--color-border)] bg-surface",
			children: a
		})]
	});
}
//#endregion
//#region src/components/shared/useHeaderDensity.ts
var kn = 48, An = 1e3;
function jn(e) {
	if (typeof window > "u") return null;
	try {
		return window.localStorage.getItem(e) === "collapsed" ? "collapsed" : null;
	} catch {
		return null;
	}
}
function Mn(e, t) {
	try {
		t ? window.localStorage.setItem(e, "collapsed") : window.localStorage.removeItem(e);
	} catch {}
}
function Nn({ contentKind: e = "detail", containerHeight: t = null, preference: n = null, headerId: r = "page", scrollCollapse: i = !0 } = {}) {
	let a = je(r, e), o = Ne(e), { density: s, collapsed: c } = Ae({
		contentKind: e,
		containerHeight: t,
		preference: n
	}), [l, u] = X(() => ({
		key: a,
		manual: jn(a)
	})), [d, f] = X({
		key: a,
		on: !1
	}), p = l.key === a ? l.manual : jn(a), m = d.key === a && d.on;
	l.key !== a && u({
		key: a,
		manual: p
	}), d.key !== a && d.on && f({
		key: a,
		on: !1
	});
	let h = p === "collapsed" || p === null && (m && o || c), g = G(() => {
		h ? (Mn(a, !1), u({
			key: a,
			manual: "expanded"
		}), f({
			key: a,
			on: !1
		})) : (Mn(a, !0), u({
			key: a,
			manual: "collapsed"
		}));
	}, [h, a]), _ = Y({
		enabled: !1,
		key: a
	});
	_.current = {
		enabled: i && o && p === null,
		key: a
	};
	let [v, y] = X(null);
	return q(() => {
		if (!v) return;
		let e = 0, t = () => {
			e = Date.now();
		}, n = (t) => {
			if (!_.current.enabled || Date.now() - e > An) return;
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
function Pn({ title: e, description: n, category: r, categoryTone: i = "neutral", thumbnail: a, icon: o = "🧩", thumbnailHeight: s = 160, href: c, onClick: l, badge: u, meta: d, className: f, style: p, "data-testid": m = "thumbnail-card" }) {
	let g = t("group block w-full text-left bg-[var(--color-surface,#fff)]", "rounded-xl border border-[var(--color-border)] overflow-hidden", "transition-[box-shadow,transform] duration-150", (c || l) && "cursor-pointer hover:shadow-[0_8px_25px_rgba(0,0,0,0.08)] hover:-translate-y-0.5", f), _ = /* @__PURE__ */ $(Z, { children: [/* @__PURE__ */ $("div", {
		"data-testid": `${m}-thumb`,
		className: t("relative flex items-center justify-center", "bg-gradient-to-br from-[var(--color-primary-bg,#eef2ff)] to-[var(--color-surface,#ffffff)]", "border-b border-[var(--color-border)]"),
		style: { height: s },
		children: [a ? /* @__PURE__ */ Q("img", {
			src: a,
			alt: "",
			className: "w-full h-full object-cover"
		}) : /* @__PURE__ */ Q("span", {
			className: "text-5xl opacity-50",
			"aria-hidden": !0,
			children: o
		}), u && /* @__PURE__ */ Q("span", {
			"data-testid": `${m}-badge`,
			className: "absolute top-2 right-2",
			children: u
		})]
	}), /* @__PURE__ */ $("div", {
		className: "px-4 py-3",
		children: [
			/* @__PURE__ */ $("div", {
				className: "flex items-center gap-2 mb-1.5",
				children: [r && /* @__PURE__ */ Q(h, {
					tone: i,
					size: "xs",
					"data-testid": `${m}-category`,
					children: r
				}), d && /* @__PURE__ */ Q("span", {
					className: "ml-auto",
					children: d
				})]
			}),
			/* @__PURE__ */ Q("div", {
				className: "text-[14px] font-semibold text-[var(--color-text-primary)] leading-snug",
				children: e
			}),
			n && /* @__PURE__ */ Q("div", {
				className: "mt-1 text-[12px] text-[var(--color-text-secondary)] leading-snug",
				children: n
			})
		]
	})] });
	return c ? /* @__PURE__ */ Q("a", {
		href: c,
		onClick: l,
		"data-testid": m,
		className: t(g, "no-underline text-inherit"),
		style: p,
		children: _
	}) : l ? /* @__PURE__ */ Q("button", {
		"data-ui-part": "",
		type: "button",
		onClick: l,
		"data-testid": m,
		className: t(g, "font-inherit"),
		style: p,
		children: _
	}) : /* @__PURE__ */ Q("div", {
		"data-testid": m,
		className: g,
		style: p,
		children: _
	});
}
//#endregion
//#region src/components/shared/CatalogGrid.tsx
var Fn = {
	1: "grid-cols-[minmax(13rem,1fr)]",
	2: "grid-cols-[repeat(2,minmax(13rem,1fr))]",
	3: "grid-cols-[repeat(3,minmax(13rem,1fr))]",
	4: "grid-cols-[repeat(4,minmax(13rem,1fr))]",
	5: "grid-cols-[repeat(5,minmax(13rem,1fr))]"
}, In = {
	1: "sm:grid-cols-1",
	2: "sm:grid-cols-2",
	3: "sm:grid-cols-2 lg:grid-cols-3",
	4: "sm:grid-cols-2 lg:grid-cols-4",
	5: "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
};
function Ln({ children: e, columns: n = 3, dense: r = !1, variant: i = "tiles", className: a, style: o, "data-testid": s = "catalog-grid" }) {
	return /* @__PURE__ */ Q("div", {
		"data-testid": s,
		"data-columns": n,
		...i === "lanes" ? { "data-ui-board": "" } : {},
		className: t(i === "lanes" ? t("grid items-stretch overflow-x-auto", Fn[n]) : t("grid grid-cols-1", In[n]), r ? "gap-3" : "gap-5", a),
		style: o,
		children: e
	});
}
//#endregion
//#region src/components/shared/StackDiagram.tsx
function Rn({ orientation: e, variant: n }) {
	if (n === "none") return null;
	let r = e === "vertical", i = n === "arrow" ? r ? "↓" : "→" : r ? "│" : "─";
	return /* @__PURE__ */ Q("div", {
		"data-testid": "stack-diagram-connector",
		"aria-hidden": !0,
		className: t("flex items-center justify-center text-[var(--color-text-tertiary)]", r ? "h-5 text-base" : "w-5 text-base"),
		children: i
	});
}
function zn({ layers: e, orientation: n = "vertical", connector: r = "arrow", className: i, style: a, "data-testid": o = "stack-diagram" }) {
	let s = n === "vertical";
	return /* @__PURE__ */ Q("div", {
		"data-testid": o,
		"data-orientation": n,
		"data-connector": r,
		className: t("flex", s ? "flex-col items-stretch" : "flex-row items-stretch flex-wrap", i),
		style: a,
		children: e.map((i, a) => {
			let o = m(i.tone ?? "neutral");
			return /* @__PURE__ */ $("div", {
				className: t("flex", "flex-col"),
				children: [/* @__PURE__ */ $("div", {
					"data-testid": "stack-diagram-layer",
					"data-tone": o,
					className: t("rounded-md border px-3 py-2", d[o], p[o], !s && "min-w-[140px]"),
					children: [/* @__PURE__ */ $("div", {
						className: "flex items-center gap-2",
						children: [
							i.icon != null && /* @__PURE__ */ Q("span", {
								className: "shrink-0 text-[14px] leading-none",
								"aria-hidden": !0,
								children: i.icon
							}),
							/* @__PURE__ */ Q("span", {
								className: t("text-[12px] font-semibold", g[o]),
								children: i.label
							}),
							i.meta != null && /* @__PURE__ */ Q("span", {
								className: "ml-auto text-[10px] text-[var(--color-text-tertiary)] shrink-0",
								children: i.meta
							})
						]
					}), i.description != null && /* @__PURE__ */ Q("div", {
						className: "mt-0.5 text-[11px] leading-snug text-[var(--color-text-secondary)]",
						children: i.description
					})]
				}), a < e.length - 1 && /* @__PURE__ */ Q(Rn, {
					orientation: n,
					variant: r
				})]
			}, i.id);
		})
	});
}
var Bn = zn;
//#endregion
//#region src/components/shared/ChatComposer.tsx
function Vn({ value: e, onChange: n, onSubmit: r, disabled: i = !1, multiline: a = !1, placeholder: o, submitLabel: s = "→", className: c, style: l, autoFocus: u, maxRows: d = 4, "aria-label": f = "Message", "aria-labelledby": p, submitAriaLabel: m = "Send" }) {
	let h = !i && e.trim().length > 0, g = typeof s == "string" && /\p{L}|\p{N}/u.test(s) ? void 0 : m, _ = p ? void 0 : f, v = () => {
		h && r();
	}, y = (e) => {
		if (e.key === "Enter") {
			if (a && e.shiftKey) return;
			e.preventDefault(), v();
		}
	}, b = t("flex-1 px-3 py-2 text-sm rounded-lg border border-[var(--color-border-field,#d1d5db)] bg-surface text-[var(--color-text-primary)]", "placeholder:text-[var(--color-text-tertiary)]", "focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent", "resize-none", i && "opacity-50 cursor-not-allowed bg-[var(--color-surface-hover)]");
	return /* @__PURE__ */ $("div", {
		className: t("flex items-end gap-2 p-3 border-t border-[var(--color-border)] bg-[var(--color-surface)]", c),
		style: l,
		children: [a ? /* @__PURE__ */ Q("textarea", {
			"data-ui-part": "",
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
		}) : /* @__PURE__ */ Q("input", {
			"data-ui-part": "",
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
		}), /* @__PURE__ */ Q("button", {
			"data-ui-part": "",
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
function Hn({ name: e, done: n, title: r, className: i }) {
	return /* @__PURE__ */ $("span", {
		title: r,
		className: t("inline-flex items-center gap-1 text-[10.5px] font-mono px-2 py-0.5 rounded-full", n ? "bg-[var(--color-success-bg,#f0fdf4)] text-[var(--color-success,#16a34a)]" : "bg-[var(--color-info-bg,#eff6ff)] text-[var(--color-info,#1d4ed8)]", i),
		children: [e, n ? " ✓" : "…"]
	});
}
function Un({ toolCalls: e, className: n }) {
	return /* @__PURE__ */ Q("div", {
		className: t("flex flex-wrap gap-1.5 py-1", n),
		children: e.map((e) => /* @__PURE__ */ Q(Hn, {
			name: e.name,
			done: e.done
		}, e.id))
	});
}
//#endregion
//#region src/components/shared/MessageBubble.tsx
function Wn({ role: e, content: n, toolCalls: r, streaming: i = !1, agentName: a, userName: o, renderMarkdown: s, className: c }) {
	let l = e === "user" ? o || "You" : a || "Assistant";
	return /* @__PURE__ */ $("div", {
		className: t("flex flex-col gap-1.5 py-3", c),
		children: [
			/* @__PURE__ */ Q("div", {
				className: "text-[11px] font-semibold uppercase tracking-wide text-[var(--color-text-tertiary)]",
				children: l
			}),
			r && r.length > 0 && /* @__PURE__ */ Q(Un, { toolCalls: r }),
			e === "user" ? /* @__PURE__ */ Q("div", {
				className: "text-sm text-[var(--color-text-primary)] whitespace-pre-wrap",
				children: n
			}) : /* @__PURE__ */ Q("div", {
				className: "text-sm text-[var(--color-text-primary)] prose-sm max-w-none",
				children: n ? s ? s(n) : /* @__PURE__ */ Q("span", {
					className: "whitespace-pre-wrap",
					children: n
				}) : i ? /* @__PURE__ */ Q(fe, {}) : null
			})
		]
	});
}
//#endregion
//#region src/components/shared/ThinkingBlock.tsx
function Gn({ content: e, streaming: n = !1, defaultOpen: r = !1, className: i }) {
	let a = n || !e ? "Thinking" : "Thought";
	return /* @__PURE__ */ $("details", {
		open: r,
		className: t("rounded-md border border-[var(--color-border)] overflow-hidden text-sm group", i),
		children: [/* @__PURE__ */ $("summary", {
			className: "flex items-center gap-2 px-3 py-2 cursor-pointer select-none bg-[var(--color-surface)] hover:bg-[var(--color-surface-hover)] text-[var(--color-text-tertiary)] list-none",
			children: [
				/* @__PURE__ */ Q("svg", {
					className: "w-3.5 h-3.5 transition-transform group-open:rotate-90",
					xmlns: "http://www.w3.org/2000/svg",
					viewBox: "0 0 20 20",
					fill: "currentColor",
					"aria-hidden": "true",
					children: /* @__PURE__ */ Q("path", {
						fillRule: "evenodd",
						d: "M7.21 14.77a.75.75 0 010-1.06L10.94 10 7.21 6.29a.75.75 0 011.08-1.04l4.25 4.25a.75.75 0 010 1.06l-4.25 4.25a.75.75 0 01-1.08-.04z",
						clipRule: "evenodd"
					})
				}),
				/* @__PURE__ */ Q("span", {
					className: "text-[11px] font-semibold uppercase tracking-wide",
					children: a
				}),
				n && !e && /* @__PURE__ */ Q(fe, { size: "sm" })
			]
		}), /* @__PURE__ */ Q("div", {
			className: "px-3 py-2 text-xs text-[var(--color-text-secondary)] italic border-t border-[var(--color-border)] bg-surface whitespace-pre-wrap leading-relaxed",
			children: e || /* @__PURE__ */ Q(fe, {})
		})]
	});
}
//#endregion
//#region src/components/shared/QuickPromptGrid.tsx
function Kn({ prompts: e, onSelect: n, columns: r, title: i, className: a }) {
	let o = r ? `repeat(${r}, minmax(0, 1fr))` : "repeat(auto-fit, minmax(220px, 1fr))";
	return /* @__PURE__ */ $("div", {
		className: t("flex flex-col gap-3", a),
		children: [i && /* @__PURE__ */ Q("p", {
			className: "text-xs font-semibold uppercase tracking-wide text-[var(--color-text-tertiary)] text-center",
			children: i
		}), /* @__PURE__ */ Q("div", {
			style: {
				display: "grid",
				gridTemplateColumns: o,
				gap: 10
			},
			children: e.map((e, t) => /* @__PURE__ */ $("button", {
				"data-ui-part": "",
				type: "button",
				onClick: () => n(e.label),
				className: "flex flex-col gap-1 px-4 py-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] hover:bg-[var(--color-surface-hover)] hover:border-[var(--color-border-emphasis,#cbd5e1)] text-left transition-colors",
				children: [/* @__PURE__ */ Q("span", {
					className: "text-sm font-medium text-[var(--color-text-primary)]",
					children: e.label
				}), e.hint && /* @__PURE__ */ Q("span", {
					className: "text-xs text-[var(--color-text-tertiary)]",
					children: e.hint
				})]
			}, t))
		})]
	});
}
//#endregion
//#region src/components/shared/UserMenu.tsx
function qn({ user: e, items: n, className: r, "data-testid": i }) {
	let [a, o] = X(!1), s = Y(null), c = G(() => o(!1), []);
	return q(() => {
		if (!a) return;
		let e = (e) => {
			s.current && !s.current.contains(e.target) && c();
		};
		return document.addEventListener("mousedown", e), () => document.removeEventListener("mousedown", e);
	}, [a, c]), ge(a, c), /* @__PURE__ */ $("div", {
		ref: s,
		"data-testid": i,
		className: t("relative inline-block", r),
		children: [/* @__PURE__ */ $("button", {
			"data-ui-part": "",
			type: "button",
			"aria-label": `User menu for ${e.name}`,
			"aria-expanded": a,
			"aria-haspopup": "menu",
			onClick: () => o((e) => !e),
			className: t("flex items-center gap-2 bg-transparent border-none cursor-pointer p-1 rounded-lg", "hover:bg-[var(--color-surface-hover)] transition-colors duration-100", a && "bg-[var(--color-surface-hover)]"),
			children: [
				e.avatarUrl ? /* @__PURE__ */ Q("img", {
					src: e.avatarUrl,
					alt: e.name,
					className: "w-8 h-8 rounded-full object-cover"
				}) : /* @__PURE__ */ Q(Ce, {
					name: e.name,
					size: 32
				}),
				/* @__PURE__ */ $("div", {
					className: "flex flex-col items-start text-left min-w-0 hidden sm:flex",
					children: [/* @__PURE__ */ Q("span", {
						className: "text-sm font-medium text-[var(--color-text-primary)] leading-tight truncate max-w-[120px]",
						children: e.name
					}), /* @__PURE__ */ Q("span", {
						className: "text-xs text-[var(--color-text-tertiary)] leading-tight truncate max-w-[120px]",
						children: e.email
					})]
				}),
				/* @__PURE__ */ Q("svg", {
					width: "12",
					height: "12",
					viewBox: "0 0 12 12",
					fill: "none",
					"aria-hidden": "true",
					className: t("text-[var(--color-text-tertiary)] transition-transform duration-150", a ? "rotate-180" : "rotate-0"),
					children: /* @__PURE__ */ Q("path", {
						d: "M2 4l4 4 4-4",
						stroke: "currentColor",
						strokeWidth: "1.5",
						strokeLinecap: "round",
						strokeLinejoin: "round"
					})
				})
			]
		}), a && /* @__PURE__ */ $("div", {
			role: "menu",
			"aria-label": "User menu",
			className: t("absolute right-0 top-[calc(100%+6px)] min-w-[200px] z-[200]", "bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl shadow-md overflow-hidden"),
			children: [/* @__PURE__ */ $("div", {
				className: "px-3 py-2.5 border-b border-[var(--color-border)]",
				children: [/* @__PURE__ */ Q("p", {
					className: "text-sm font-semibold text-[var(--color-text-primary)] truncate",
					children: e.name
				}), /* @__PURE__ */ Q("p", {
					className: "text-xs text-[var(--color-text-tertiary)] truncate",
					children: e.email
				})]
			}), /* @__PURE__ */ Q("div", {
				className: "py-1",
				children: n.map((e, n) => /* @__PURE__ */ $("div", { children: [e.separator && n > 0 && /* @__PURE__ */ Q("div", { className: "my-1 border-t border-[var(--color-border)]" }), /* @__PURE__ */ $("button", {
					"data-ui-part": "",
					type: "button",
					role: "menuitem",
					onClick: () => {
						e.onClick(), c();
					},
					className: t("flex items-center gap-2.5 w-full text-left px-3 py-2", "text-sm border-none cursor-pointer font-[inherit] transition-colors duration-100", e.danger ? "text-danger-fg bg-transparent hover:bg-danger-bg" : "text-[var(--color-text-primary)] bg-transparent hover:bg-[var(--color-surface-hover)]"),
					children: [e.icon && /* @__PURE__ */ Q("span", {
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
var Jn = {
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
}, Yn = {
	bg: "var(--color-surface-hover)",
	border: "var(--color-border-field)",
	text: "var(--color-text-primary)",
	accent: "var(--color-neutral)"
};
function Xn({ status: e, colors: t }) {
	return /* @__PURE__ */ $("span", {
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
		children: [/* @__PURE__ */ Q("span", { style: {
			width: 5,
			height: 5,
			borderRadius: "50%",
			background: t.accent
		} }), e.replace(/_/g, " ")]
	});
}
function Zn({ name: e, id: t, status: n, statusColors: r, contributorNames: i = [], contributorCount: a, activityItems: o = [], presenceDotColor: s = "var(--color-border-field)", activityLabel: c = "", cardIndex: l = 0, onClick: u, className: d, style: f, minHeight: p = 190 }) {
	let m = {
		...Jn,
		...r
	}[(n ?? "unknown").toLowerCase().replace(/ /g, "_")] ?? Yn, h = a === void 0 ? 0 : Math.max(0, a - i.length), g = l % 8 * 525;
	return /* @__PURE__ */ $(u ? "button" : "div", {
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
			/* @__PURE__ */ $("div", {
				style: {
					display: "flex",
					alignItems: "flex-start",
					justifyContent: "space-between",
					gap: 8
				},
				children: [/* @__PURE__ */ $("div", {
					style: {
						flex: 1,
						minWidth: 0
					},
					children: [/* @__PURE__ */ Q("h3", {
						style: {
							margin: "0 0 3px",
							fontSize: 13.5,
							fontWeight: 700,
							color: "var(--color-text-primary, #111827)",
							lineHeight: 1.35
						},
						children: e
					}), t && /* @__PURE__ */ Q("span", {
						style: {
							fontSize: 10,
							fontFamily: "ui-monospace, \"SFMono-Regular\", Menlo, monospace",
							color: "var(--color-text-tertiary)",
							letterSpacing: "0.02em"
						},
						children: t
					})]
				}), n && /* @__PURE__ */ Q(Xn, {
					status: n,
					colors: m
				})]
			}),
			/* @__PURE__ */ Q(Le, {
				items: o,
				staggerMs: g
			}),
			/* @__PURE__ */ $("div", {
				style: {
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
					paddingTop: 8,
					borderTop: "1px solid var(--color-border-subtle, #f3f4f6)",
					gap: 8
				},
				children: [/* @__PURE__ */ $("div", {
					style: {
						display: "flex",
						alignItems: "center",
						gap: 8,
						minWidth: 0
					},
					children: [i.length > 0 ? /* @__PURE__ */ Q(Se, {
						names: i,
						maxVisible: 5,
						size: 24
					}) : /* @__PURE__ */ $("span", {
						style: {
							fontSize: 12,
							color: "var(--color-text-tertiary)"
						},
						children: [/* @__PURE__ */ Q("strong", {
							style: { color: "var(--color-text-primary)" },
							children: a ?? 0
						}), " contributors"]
					}), i.length > 0 && h > 0 && /* @__PURE__ */ $("span", {
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
				}), c && /* @__PURE__ */ $("div", {
					style: {
						display: "flex",
						alignItems: "center",
						gap: 5,
						flexShrink: 0
					},
					children: [/* @__PURE__ */ Q("span", { style: {
						width: 6,
						height: 6,
						borderRadius: "50%",
						background: s,
						flexShrink: 0
					} }), /* @__PURE__ */ Q("span", {
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
var Qn = 1180, $n = 768;
function er(e, t = {}) {
	let n = e.pathname.split("/").filter(Boolean), r = n.length > 0 && t.prefixes?.includes(n[0]) ? n.slice(1) : n, i = e.search ?? "", a = new URLSearchParams(i.startsWith("?") ? i.slice(1) : i), o = (t.drillParams ?? []).some((e) => a.get(e)), s = Math.max(1, r.length) + +!!o;
	return t.explored && !o && (s += 2), (t.leafRoutes ?? []).some((t) => t.test(e.pathname)) && (s = Math.max(s, 3)), s;
}
function tr(e) {
	return e >= 3 ? "deep" : "shallow";
}
function nr(e, t) {
	return `${e}.${t}`;
}
function rr(e) {
	return e === "collapsed" || e !== "open" && null;
}
var ir = Qe("shallow");
function ar({ band: e, children: t }) {
	return /* @__PURE__ */ Q(ir.Provider, {
		value: e,
		children: t
	});
}
function or() {
	return K(ir);
}
function sr(e) {
	if (typeof window > "u") return null;
	try {
		return rr(window.localStorage.getItem(e));
	} catch {
		return null;
	}
}
function cr({ storageKey: e, band: t, defaultFolded: n = !1 }) {
	let r = or(), i = t ?? r, [a, o] = X(() => ({
		shallow: sr(nr(e, "shallow")),
		deep: sr(nr(e, "deep"))
	})), [s, c] = X(e);
	s !== e && (c(e), o({
		shallow: sr(nr(e, "shallow")),
		deep: sr(nr(e, "deep"))
	}));
	let l = a[i], u = l ?? n;
	return {
		folded: u,
		toggle: G(() => {
			let t = !u;
			o((e) => ({
				...e,
				[i]: t
			}));
			try {
				window.localStorage.setItem(nr(e, i), t ? "collapsed" : "open");
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
function lr() {
	let [e, t] = X(() => typeof window > "u" ? 1680 : window.innerWidth);
	return q(() => {
		let e = () => t(window.innerWidth);
		return window.addEventListener("resize", e), () => window.removeEventListener("resize", e);
	}, []), e;
}
//#endregion
//#region src/components/shared/RailNavList.tsx
var ur = t("flex w-full min-w-0 items-center gap-2.5 rounded-md border-0 bg-transparent px-2.5 py-[6px] text-left", ze, "text-text-primary no-underline [font-family:inherit]", "transition-colors duration-100 hover:bg-surface-hover", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary");
function dr({ items: e, currentStyle: n = "weight", "aria-label": r = "Views", className: i, "data-testid": a = "rail-nav-list" }) {
	return e.length === 0 ? null : /* @__PURE__ */ Q("nav", {
		"aria-label": r,
		className: t("min-w-0", i),
		"data-testid": a,
		children: /* @__PURE__ */ Q("ul", {
			className: "m-0 flex list-none flex-col p-0",
			children: e.map((e) => {
				let r = /* @__PURE__ */ $(Z, { children: [
					e.icon != null && /* @__PURE__ */ Q("span", {
						className: "flex shrink-0 items-center text-text-secondary",
						children: e.icon
					}),
					/* @__PURE__ */ Q("span", {
						className: "min-w-0 flex-1 truncate",
						title: e.label,
						"data-ui-text": "rail-item",
						children: e.label
					}),
					typeof e.count == "number" && /* @__PURE__ */ Q("span", {
						className: t("shrink-0", "text-[12px] font-medium leading-4 tabular-nums text-text-secondary"),
						"aria-label": `${e.count} items`,
						"data-testid": `${a}-count-${e.id}`,
						children: e.count
					})
				] }), i = {
					className: t(ur, e.current && n === "weight" && "font-semibold", e.current && n === "tint" && "bg-primary/10", e.disabled ? "cursor-default opacity-60 hover:bg-transparent" : "cursor-pointer"),
					"data-testid": `${a}-item-${e.id}`,
					"data-current": e.current || void 0,
					"aria-current": e.current ? "page" : void 0
				};
				return /* @__PURE__ */ Q("li", {
					className: "min-w-0",
					children: e.href && !e.disabled ? /* @__PURE__ */ Q("a", {
						href: e.href,
						onClick: (t) => {
							e.onNavigate?.(t), e.onSelect?.();
						},
						...i,
						children: r
					}) : /* @__PURE__ */ Q("button", {
						"data-ui-part": "",
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
var fr = "border-y-0 border-r-0 border-l-[3px] border-solid border-transparent px-[14px]", pr = t("flex w-full min-w-0 items-center gap-2.5 bg-transparent text-left", fr, He, ze, "text-text-primary no-underline [font-family:inherit]", "transition-colors duration-100 hover:bg-surface-hover", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"), mr = "border-l-primary", hr = He, gr = "flex h-5 w-[18px] shrink-0 items-center justify-start text-text-secondary";
function _r({ cancelGap: e, children: n }) {
	return /* @__PURE__ */ Q("span", {
		className: t("flex shrink-0", e),
		"data-rail-gutter": "",
		children: n
	});
}
var vr = t("sr-only flex shrink-0 items-center gap-0.5", "group-hover/head:not-sr-only", "group-has-[:focus-visible]/head:not-sr-only", "group-data-[current]/head:not-sr-only", "has-[[aria-expanded=true]]:not-sr-only", "[@media(hover:none)]:not-sr-only"), yr = "hidden shrink-0 items-center pr-1 group-hover/row:flex group-focus-within/row:flex has-[[aria-expanded=true]]:flex";
function br(e) {
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
function xr(e) {
	return Array.isArray(e) && e.every((e) => e && typeof e == "object" && "label" in e && "onClick" in e);
}
function Sr({ actions: e, className: t, testId: n }) {
	if (e == null || e === !1) return null;
	let r = {
		className: t ?? "flex shrink-0 items-center gap-0.5",
		...n ? { "data-testid": n } : {}
	};
	return xr(e) ? e.length === 0 ? null : /* @__PURE__ */ Q("span", {
		...r,
		children: e.map((e) => /* @__PURE__ */ Q(y, {
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
	}) : /* @__PURE__ */ Q("span", {
		...r,
		children: e
	});
}
function Cr({ actions: e, title: t, testId: n }) {
	return !xr(e) || e.length < 2 ? /* @__PURE__ */ Q(Sr, { actions: e }) : /* @__PURE__ */ $(Z, { children: [/* @__PURE__ */ Q(Sr, {
		actions: e,
		className: "flex shrink-0 items-center gap-0.5 @max-[15rem]:hidden",
		testId: `${n}-actions`
	}), /* @__PURE__ */ Q("span", {
		className: "hidden shrink-0 items-center @max-[15rem]:flex",
		"data-testid": `${n}-actions-fold`,
		children: /* @__PURE__ */ Q(be, {
			trigger: /* @__PURE__ */ Q(w, { size: 14 }),
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
function wr(e, t) {
	return e.some((e) => t(e) || wr(e.children ?? [], t));
}
function Tr({ title: e, count: n, actions: r, groups: i, selectedId: a = null, currentStyle: o = "tint", "aria-label": s = "Navigation", className: c, "data-testid": l = "stacked-rail" }) {
	let u = Y(null), [d, f] = X({}), [p, m] = X({}), [h, g] = X(null), _ = (e) => e.collapsible === !1 ? !0 : e.onToggle && e.open !== void 0 ? e.open : d[e.id] ?? e.open ?? !0, v = (e, t) => {
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
		}, p = /* @__PURE__ */ $(Z, { children: [
			(n > 0 || i) && /* @__PURE__ */ $(_r, {
				cancelGap: "-mr-2.5",
				children: [Array.from({ length: n }, (e, t) => /* @__PURE__ */ Q("span", {
					className: "flex h-5 w-[18px] shrink-0 items-center justify-start text-text-secondary",
					"data-rail-step": "indent"
				}, t)), i && /* @__PURE__ */ Q("span", {
					className: "flex h-5 w-[18px] shrink-0 items-center justify-start text-text-secondary",
					"data-rail-step": "caret",
					"data-testid": `${u}-caret`,
					onClick: (t) => {
						t.preventDefault(), t.stopPropagation(), b(e, !a);
					},
					children: /* @__PURE__ */ Q(Be, { open: a })
				})]
			}),
			e.icon != null && /* @__PURE__ */ Q("span", {
				className: "flex shrink-0 items-center text-text-secondary",
				children: e.icon
			}),
			/* @__PURE__ */ Q("span", {
				className: "min-w-0 flex-1 truncate",
				title: e.label,
				"data-ui-text": "rail-item",
				children: e.label
			}),
			e.meta !== void 0 && e.meta !== "" && /* @__PURE__ */ Q("span", {
				className: t("shrink-0", "text-[12px] font-medium leading-4 tabular-nums text-text-secondary"),
				"data-testid": `${u}-meta`,
				"data-meta-kind": typeof e.meta == "number" ? "count" : "text",
				...typeof e.meta == "number" ? { "aria-label": `${e.meta} items` } : {},
				children: e.meta
			}),
			e.trailing != null && e.trailing !== !1 && /* @__PURE__ */ Q("span", {
				className: "flex h-5 shrink-0 items-center",
				"data-testid": `${u}-trailing`,
				children: e.trailing
			})
		] }), m = {
			className: t(pr, s && mr, s && (o === "tint" ? "bg-primary/8" : "font-semibold"), e.disabled ? "cursor-default opacity-60 hover:bg-transparent" : "cursor-pointer", e.pending && "opacity-60"),
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
			...br(e)
		};
		return /* @__PURE__ */ $("li", {
			className: "min-w-0",
			children: [/* @__PURE__ */ $("div", {
				className: "group/row flex min-w-0 items-center",
				children: [e.href && !e.disabled ? /* @__PURE__ */ Q("a", {
					href: e.href,
					onClick: (e) => f(e),
					...m,
					children: p
				}) : /* @__PURE__ */ Q("button", {
					"data-ui-part": "",
					type: "button",
					onClick: () => f(),
					...m,
					children: p
				}), d != null && d !== !1 && /* @__PURE__ */ Q("span", {
					className: yr,
					"data-testid": `${u}-menu`,
					children: d
				})]
			}), a && /* @__PURE__ */ Q("ul", {
				className: "m-0 flex list-none flex-col p-0",
				"data-testid": `${u}-children`,
				children: r.map((e) => O(e, n + 1))
			})]
		}, e.id);
	}, k = i.length > 0, A = `${l}-title`;
	return !k && !e ? null : /* @__PURE__ */ $("nav", {
		ref: u,
		"aria-label": s,
		className: t("flex min-w-0 flex-col", c),
		"data-testid": l,
		onKeyDown: D,
		children: [e && /* @__PURE__ */ $("div", {
			className: t("@container flex h-9 min-w-0 items-center gap-2", fr),
			children: [
				/* @__PURE__ */ Q(_r, {
					cancelGap: "-mr-2",
					children: /* @__PURE__ */ Q("span", {
						className: "flex h-5 w-[18px] shrink-0 items-center justify-start text-text-secondary",
						"data-rail-step": "caption"
					})
				}),
				/* @__PURE__ */ Q("span", {
					className: t("min-w-0 truncate", "text-[12px] font-semibold uppercase leading-4 tracking-wide", "text-text-secondary"),
					title: e,
					"data-testid": A,
					"data-ui-text": "rail-caption",
					children: e
				}),
				typeof n == "number" && /* @__PURE__ */ Q("span", {
					className: t("shrink-0", "text-[12px] font-medium leading-4 normal-case tracking-normal tabular-nums text-text-tertiary"),
					"aria-label": `${n} items`,
					"data-testid": `${l}-count`,
					"data-ui-text": "rail-caption",
					children: n
				}),
				/* @__PURE__ */ Q("span", { className: "flex-1" }),
				r != null && /* @__PURE__ */ Q(Cr, {
					actions: r,
					title: e,
					testId: l
				})
			]
		}), i.map((e) => {
			let n = e.collapsible !== !1, r = _(e), i = e.testId ?? `${l}-group-${e.id}`, a = `${i}-header`, o = `g:${e.id}`, s = /* @__PURE__ */ $(Z, { children: [
				/* @__PURE__ */ Q(_r, {
					cancelGap: "-mr-2",
					children: /* @__PURE__ */ Q("span", {
						className: gr,
						"data-rail-step": n ? "caret" : "caption",
						"data-testid": `${a}-caret`,
						children: n && /* @__PURE__ */ Q(Be, { open: r })
					})
				}),
				/* @__PURE__ */ Q("span", {
					className: "min-w-0 truncate",
					"data-testid": `${a}-label`,
					"data-ui-text": "rail-caption",
					children: e.title
				}),
				typeof e.count == "number" && /* @__PURE__ */ Q("span", {
					className: t("shrink-0", "text-[12px] font-medium leading-4 normal-case tracking-normal tabular-nums text-text-tertiary"),
					"aria-label": `${e.count} items`,
					"data-testid": `${i}-count`,
					"data-ui-text": "rail-caption",
					children: e.count
				})
			] }), c = e.actions != null && e.actions !== !1 && !(Array.isArray(e.actions) && e.actions.length === 0), u = e.trailing != null && e.trailing !== !1, d = e.current ?? wr(e.rows, C), f = t("flex min-w-0 flex-1 items-center gap-2 bg-transparent text-left [font-family:inherit]", fr, (c || u) && "pr-0", hr, Ve, Re);
			return /* @__PURE__ */ $("section", {
				"data-ui-part": "",
				"aria-labelledby": a,
				"aria-busy": e.pending || void 0,
				className: t("flex min-w-0 flex-col", e.pending && "opacity-60"),
				"data-testid": i,
				"data-group-id": e.id,
				"data-open": r,
				"data-pending": e.pending || void 0,
				children: [/* @__PURE__ */ $("div", {
					className: "group/head relative flex min-w-0 items-center gap-1 pr-1",
					"data-current": d || void 0,
					"data-testid": `${i}-head`,
					children: [
						n ? /* @__PURE__ */ Q("button", {
							"data-ui-part": "",
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
							...br(e),
							children: s
						}) : /* @__PURE__ */ Q("h3", {
							id: a,
							"data-testid": a,
							title: e.title,
							className: t("m-0", f),
							...br(e),
							children: s
						}),
						u && /* @__PURE__ */ Q("span", {
							className: "flex shrink-0 items-center",
							"data-testid": `${i}-trailing`,
							children: e.trailing
						}),
						c && /* @__PURE__ */ Q(Sr, {
							actions: e.actions,
							className: vr,
							testId: `${i}-actions`
						})
					]
				}), r && /* @__PURE__ */ Q("ul", {
					className: "m-0 flex list-none flex-col p-0",
					"data-testid": `${i}-rows`,
					children: e.rows.length === 0 ? /* @__PURE__ */ Q("li", {
						className: t("text-xs leading-5", fr, hr, "text-text-tertiary"),
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
var Er = {
	narrow: "w-44",
	default: "w-56",
	wide: "w-64"
}, Dr = {
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
function Or(e, t) {
	return e.id ?? e.to ?? `item-${t}`;
}
function kr(e, t, n) {
	return !t || !e.to ? !1 : t === e.to ? !0 : n === "exact" || e.to === "/" ? !1 : t.startsWith(e.to.endsWith("/") ? e.to : `${e.to}/`);
}
function Ar(e) {
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
function jr({ item: e, active: n, palette: r, renderLink: i, size: a = "sm" }) {
	let o = /* @__PURE__ */ $(Z, { children: [/* @__PURE__ */ $("span", {
		className: "flex items-center gap-2 min-w-0",
		children: [
			e.icon && /* @__PURE__ */ Q("span", {
				className: "flex-none",
				"aria-hidden": "true",
				children: e.icon
			}),
			/* @__PURE__ */ Q("span", {
				className: t("truncate", ze, r.labelActive),
				"data-ui-text": "rail-item",
				children: e.label
			}),
			e.badge != null && /* @__PURE__ */ Q("span", {
				className: t("ml-auto flex-none", "text-[12px] font-medium leading-4 tabular-nums text-text-secondary", r.label),
				"data-testid": "nav-rail-badge",
				children: e.badge
			})
		]
	}), e.hint && /* @__PURE__ */ Q("span", {
		className: t("mt-0.5 block truncate text-[12px] leading-4", r.hint),
		children: e.hint
	})] }), s = t("block w-full border-l-[3px] border-transparent text-left no-underline", a === "md" ? "ml-[18px] w-auto mr-2 rounded-r pl-[15px] pr-2" : "px-3", He, r.hover, n && r.active, e.disabled && "pointer-events-none opacity-50");
	if (e.onClick || !e.to) return /* @__PURE__ */ Q("button", {
		"data-ui-part": "",
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
	return i ? /* @__PURE__ */ Q(Z, { children: i(e, c) }) : /* @__PURE__ */ Q("a", { ...c });
}
function Mr({ name: e, items: n, activeHref: r, match: i, palette: a, storageKey: o, renderLink: s, size: c = "sm", divided: l = !1 }) {
	let [u, d] = X(() => {
		if (!o || typeof window > "u") return !1;
		try {
			return window.localStorage?.getItem(o) === "1";
		} catch {
			return !1;
		}
	});
	q(() => {
		if (!(!o || typeof window > "u")) try {
			u ? window.localStorage?.setItem(o, "1") : window.localStorage?.removeItem(o);
		} catch {}
	}, [u, o]);
	let f = et(), p = Y(null), m = Y(null), h = G(() => {
		if (!u) {
			let e = typeof document > "u" ? null : document.activeElement;
			e && m.current?.contains(e) && p.current?.focus();
		}
		d((e) => !e);
	}, [u]);
	return /* @__PURE__ */ $("section", {
		"data-ui-part": "",
		className: t(c === "md" && "pb-1"),
		children: [
			l && /* @__PURE__ */ Q("div", {
				"aria-hidden": "true",
				className: t("mx-5 mb-2 mt-1 border-t", a.divider)
			}),
			/* @__PURE__ */ $("button", {
				"data-ui-part": "",
				ref: p,
				type: "button",
				onClick: h,
				"aria-expanded": !u,
				"aria-controls": f,
				className: t("flex w-full cursor-pointer items-center gap-1.5 border-none bg-transparent text-left", Ve, Ue, c === "md" ? "px-3.5" : "px-2", a.group),
				children: [/* @__PURE__ */ Q("span", {
					"aria-hidden": "true",
					className: "grid h-5 w-5 shrink-0 place-items-center",
					children: /* @__PURE__ */ Q(Be, { open: !u })
				}), /* @__PURE__ */ Q("span", {
					className: "flex-1 truncate",
					children: e
				})]
			}),
			!u && /* @__PURE__ */ Q("div", {
				id: f,
				ref: m,
				children: n.map((e, t) => /* @__PURE__ */ Q(jr, {
					item: e,
					active: kr(e, r, i),
					palette: a,
					renderLink: s,
					size: c
				}, Or(e, t)))
			})
		]
	});
}
function Nr({ title: e, items: n, activeHref: r, match: i = "prefix", titleAction: a, header: o, footer: s, width: c = "default", storageKey: l, renderLink: u, tone: d = "surface", size: f = "sm", "aria-label": p, className: m, "data-testid": h }) {
	let g = Dr[d], _ = J(() => Ar(n), [n]);
	return /* @__PURE__ */ $("nav", {
		"aria-label": p ?? (typeof e == "string" ? e : void 0) ?? "Navigation",
		"data-testid": h,
		className: t("flex flex-none flex-col overflow-hidden border-r", Er[c], g.rail, m),
		children: [
			(e != null || a) && /* @__PURE__ */ $("div", {
				className: t("flex flex-none items-center justify-between gap-2", f === "md" ? "h-12 pl-5 pr-3" : "border-b px-3 py-2.5", g.divider),
				children: [/* @__PURE__ */ Q("span", {
					className: t("truncate text-[11px] font-semibold uppercase tracking-[0.05em]", g.title),
					children: e
				}), a]
			}),
			o && /* @__PURE__ */ Q("div", {
				className: t("flex-none border-b px-2 py-2", g.divider),
				children: o
			}),
			/* @__PURE__ */ Q("div", {
				className: "min-h-0 flex-1 overflow-y-auto py-1",
				children: _.map((e, t) => e.name === null ? /* @__PURE__ */ Q("div", { children: e.items.map((e, t) => /* @__PURE__ */ Q(jr, {
					item: e,
					active: kr(e, r, i),
					palette: g,
					renderLink: u,
					size: f
				}, Or(e, t))) }, "__ungrouped") : /* @__PURE__ */ Q(Mr, {
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
			s && /* @__PURE__ */ Q("div", {
				className: t("flex-none border-t px-2 py-2", g.divider),
				children: s
			})
		]
	});
}
function Pr({ rails: e, activeHref: n, renderLink: r, tone: i, storageKey: a, children: o, className: s, "data-testid": c }) {
	return /* @__PURE__ */ $("div", {
		"data-testid": c,
		className: t("flex h-full min-h-0 w-full", s),
		children: [e.map(({ id: e, ...t }) => /* @__PURE__ */ Q(Nr, {
			...t,
			activeHref: t.activeHref ?? n,
			renderLink: t.renderLink ?? r,
			tone: t.tone ?? i,
			storageKey: a ? `${a}.${e}` : void 0
		}, e)), /* @__PURE__ */ Q("div", {
			className: "flex min-h-0 min-w-0 flex-1 flex-col",
			children: o
		})]
	});
}
//#endregion
//#region src/components/shared/WorkArea.tsx
var Fr = {
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
function Ir({ breadcrumbs: e, toolbar: n, children: r, status: i, footer: a, padded: o = !0, tone: s = "surface", className: c, bodyClassName: l, "data-testid": u }) {
	let d = Fr[s];
	return /* @__PURE__ */ $("div", {
		"data-testid": u,
		className: t("flex h-full min-h-0 min-w-0 flex-1 flex-col", d.column, c),
		children: [
			e && /* @__PURE__ */ Q("div", {
				className: t("flex flex-none items-center overflow-x-auto border-b px-3 py-1.5", d.divider),
				children: e
			}),
			n,
			/* @__PURE__ */ Q("div", {
				className: t("min-h-0 flex-1 overflow-auto", o && "p-[var(--ui-page-gutter,1.5rem)]", l),
				children: r
			}),
			i && /* @__PURE__ */ Q("div", {
				className: t("flex flex-none items-center gap-3 border-t px-3 py-1 text-[11px]", d.divider, d.status),
				children: i
			}),
			a && /* @__PURE__ */ Q("div", {
				className: "min-w-0 shrink-0",
				"data-workarea-footer": !0,
				children: a
			})
		]
	});
}
//#endregion
//#region src/components/shared/InlineMenu.tsx
var Lr = {
	"bottom-start": "top-full left-0 mt-1",
	"bottom-end": "top-full right-0 mt-1",
	"top-start": "bottom-full left-0 mb-1",
	"top-end": "bottom-full right-0 mb-1"
};
function Rr({ open: e, onClose: n, placement: r = "bottom-start", trigger: i, role: a = "group", className: o, "data-testid": s = "inline-menu", "aria-label": c, "aria-labelledby": l, children: u }) {
	let d = Y(null), f = _(e);
	return q(() => {
		if (!e) return;
		let t = (e) => {
			e.key === "Escape" && f() && (e.stopPropagation(), n());
		};
		return window.addEventListener("keydown", t), () => window.removeEventListener("keydown", t);
	}, [
		e,
		n,
		f
	]), q(() => {
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
	]), e ? /* @__PURE__ */ Q("div", {
		ref: d,
		role: a,
		"aria-label": c,
		"aria-labelledby": l,
		"data-testid": s,
		"data-placement": r,
		className: t("absolute z-20 min-w-[160px] rounded-lg border border-border bg-surface", "shadow-lg p-1 text-sm text-text-primary", Lr[r], o),
		children: u
	}) : null;
}
//#endregion
//#region src/components/pipelines/nodes/NodeCard.tsx
var zr = {
	success: "border-success",
	error: "border-danger",
	warning: "border-warning",
	info: "border-info",
	neutral: "border-border-emphasis",
	pending: "border-accent"
};
function Br({ icon: e, label: n, subtitle: r, status: i = "neutral", statusLabel: a, body: o, selected: s = !1, accentClass: c, className: l, onClick: d }) {
	let f = a ?? i.charAt(0).toUpperCase() + i.slice(1), p = zr[i];
	return /* @__PURE__ */ $(u, {
		className: t("relative w-40 transition-shadow duration-200 border-2", d && "cursor-pointer", p, s && "shadow-[0_0_0_3px_rgba(99,102,241,0.25)]", !s && "shadow-sm", !s && d && "hover:shadow-md", l),
		onClick: d,
		children: [
			c && /* @__PURE__ */ Q("div", { className: t("absolute left-0 top-0 bottom-0 w-1 rounded-l-lg", c) }),
			/* @__PURE__ */ $("div", {
				className: t("flex items-center justify-between gap-2 px-2.5 py-2 border-b border-border-subtle", c && "pl-3.5"),
				children: [/* @__PURE__ */ $("div", {
					className: "flex items-center gap-1.5 min-w-0",
					children: [/* @__PURE__ */ Q("span", {
						className: "text-sm leading-none shrink-0",
						"aria-hidden": "true",
						children: e
					}), /* @__PURE__ */ Q("span", {
						className: "text-xs font-semibold text-text-primary truncate",
						children: n
					})]
				}), /* @__PURE__ */ Q(me, {
					state: i,
					label: f,
					size: "sm"
				})]
			}),
			r && /* @__PURE__ */ Q("div", {
				className: "px-2.5 pt-1.5 pb-0 text-[11px] text-neutral truncate",
				children: r
			}),
			o && /* @__PURE__ */ Q("div", {
				className: "px-2.5 pb-2 pt-1 text-xs text-text-secondary",
				children: o
			})
		]
	});
}
//#endregion
//#region src/components/shared/BoardColumn.tsx
function Vr({ label: e, count: n, children: r, emptyLabel: i = "Nothing here", action: a, className: o, "data-testid": s }) {
	let c = r == null || r === !1 || Array.isArray(r) && r.length === 0;
	return /* @__PURE__ */ $("section", {
		"data-ui-part": "",
		className: t("flex h-full min-h-48 min-w-0 flex-col gap-2 rounded-lg p-2", "bg-[color-mix(in_srgb,var(--color-text-primary)_4%,transparent)]", o),
		"data-ui-board-lane": "",
		"data-testid": s,
		children: [/* @__PURE__ */ $("header", {
			className: "flex h-6 shrink-0 items-center justify-between gap-2 px-1 text-[11px] font-semibold uppercase tracking-[0.04em] text-text-secondary",
			children: [/* @__PURE__ */ Q("span", {
				className: "truncate",
				children: e
			}), a ?? (n === void 0 ? null : /* @__PURE__ */ Q("span", {
				className: "tabular-nums text-text-tertiary",
				children: n
			}))]
		}), c ? /* @__PURE__ */ Q("div", {
			"data-board-lane-empty": "",
			className: "flex flex-1 items-center justify-center rounded-md border border-dashed border-border px-2 py-6 text-center text-[12px] text-text-tertiary",
			children: i
		}) : /* @__PURE__ */ Q("div", {
			className: "flex flex-col gap-2",
			children: r
		})]
	});
}
//#endregion
//#region src/components/shared/FormRow.tsx
var Hr = {
	sm: "gap-2",
	md: "gap-3",
	lg: "gap-4"
}, Ur = {
	sm: "flex-col sm:flex-row",
	md: "flex-col md:flex-row"
};
function Wr({ children: e, stackBelow: n = "sm", gap: r = "md", className: i, "data-testid": a }) {
	return /* @__PURE__ */ Q("div", {
		className: t("flex items-start", Ur[n], Hr[r], i),
		"data-testid": a,
		children: Xe.map(e, (e) => $e(e) ? /* @__PURE__ */ Q("div", {
			className: "flex-1 basis-0 min-w-0",
			children: e
		}) : e)
	});
}
//#endregion
//#region src/components/shared/DetailHeader.tsx
function Gr({ title: e, badge: n, description: r, meta: i, aside: a, asideWidth: o = 260, as: s = "h2", className: c, "data-testid": l }) {
	return /* @__PURE__ */ $("div", {
		className: t("flex flex-wrap items-start justify-between gap-3", c),
		"data-testid": l,
		children: [/* @__PURE__ */ $("div", {
			className: "flex flex-col gap-1.5 min-w-0 flex-1",
			children: [
				/* @__PURE__ */ $("div", {
					className: "flex flex-wrap items-center gap-2",
					children: [/* @__PURE__ */ Q(s, {
						className: "m-0 text-sm font-semibold text-text-primary",
						children: e
					}), n]
				}),
				r ? /* @__PURE__ */ Q("p", {
					className: "m-0 max-w-[72ch] text-xs text-text-secondary",
					children: r
				}) : null,
				i
			]
		}), a ? /* @__PURE__ */ Q("div", {
			className: "flex max-w-full flex-col gap-2 shrink-0",
			style: { width: o },
			"data-detail-aside": "",
			children: a
		}) : null]
	});
}
//#endregion
//#region src/components/shared/ReviewThread.tsx
var Kr = {
	problem: "problem statement",
	analysis: "analysis",
	option: "options",
	question: "question",
	answer: "answer",
	artifact: "artifact",
	revision: "revision",
	decision: "decision"
}, qr = {
	problem: "info",
	analysis: "neutral",
	option: "info",
	question: "warning",
	answer: "success",
	artifact: "purple",
	revision: "info",
	decision: "accent"
};
function Jr({ name: e, type: t, url: n }) {
	return /* @__PURE__ */ $("div", {
		className: "flex items-center gap-3 rounded-md border border-dashed border-border bg-surface-hover/40 px-3 py-2.5",
		children: [
			/* @__PURE__ */ Q("span", {
				className: "text-lg",
				role: "img",
				"aria-label": "artifact",
				children: "🖼️"
			}),
			/* @__PURE__ */ $("div", {
				className: "min-w-0",
				children: [/* @__PURE__ */ Q("div", {
					className: "truncate text-xs font-medium text-text-primary",
					children: e
				}), t && /* @__PURE__ */ Q("div", {
					className: "text-xs text-text-tertiary",
					children: t
				})]
			}),
			/* @__PURE__ */ Q("div", { className: "flex-1" }),
			n ? /* @__PURE__ */ Q("a", {
				href: n,
				target: "_blank",
				rel: "noreferrer",
				className: "text-xs text-primary no-underline hover:underline",
				children: "open →"
			}) : /* @__PURE__ */ Q("span", {
				className: "text-xs text-text-tertiary",
				children: "stored with the run"
			})
		]
	});
}
function Yr({ post: e, labels: n, tones: r, onAnswer: i, busy: a, placeholder: s, submitLabel: c, inline: l }) {
	let [u, d] = X(""), f = e.kind === "question" && !e.resolved;
	return /* @__PURE__ */ $("div", {
		className: t("border-b border-border py-3 last:border-b-0", l ? "px-0" : "px-4", f && "bg-warning-bg/20"),
		children: [
			/* @__PURE__ */ $("div", {
				className: "flex min-w-0 items-center gap-2",
				children: [
					e.authorKind === "human" ? /* @__PURE__ */ Q(Ce, {
						name: e.authorName,
						src: e.avatarUrl,
						size: 20
					}) : /* @__PURE__ */ Q("span", {
						className: "text-[13px]",
						role: "img",
						"aria-label": "agent",
						children: "🤖"
					}),
					/* @__PURE__ */ Q("span", {
						className: "truncate text-xs font-semibold text-text-primary",
						children: e.authorName
					}),
					/* @__PURE__ */ Q(h, {
						tone: r[e.kind] ?? "neutral",
						size: "xs",
						uppercase: !0,
						children: n[e.kind] ?? e.kind
					}),
					f && /* @__PURE__ */ Q(h, {
						tone: "warning",
						size: "xs",
						dot: "pulse",
						children: "needs a human"
					}),
					e.kind === "question" && e.resolved && /* @__PURE__ */ Q(h, {
						tone: "success",
						size: "xs",
						children: "resolved"
					}),
					/* @__PURE__ */ Q("div", { className: "flex-1" }),
					e.timeLabel && /* @__PURE__ */ Q("span", {
						className: "whitespace-nowrap text-xs text-text-tertiary",
						children: e.timeLabel
					})
				]
			}),
			/* @__PURE__ */ Q("div", {
				className: "mt-1.5 whitespace-pre-wrap pl-7 text-xs leading-relaxed text-text-secondary",
				children: e.body
			}),
			e.artifact && /* @__PURE__ */ Q("div", {
				className: "mt-2 ml-7",
				children: /* @__PURE__ */ Q(Jr, {
					name: e.artifact.name,
					type: e.artifact.type,
					url: e.artifact.url
				})
			}),
			f && i && /* @__PURE__ */ $("div", {
				className: "mt-2.5 ml-7 flex flex-col gap-2",
				children: [/* @__PURE__ */ Q(xe, {
					value: u,
					onChange: (e) => d(e.target.value),
					placeholder: s,
					rows: 2,
					"aria-label": "Answer this question"
				}), /* @__PURE__ */ Q("div", { children: /* @__PURE__ */ Q(o, {
					size: "sm",
					variant: "primary",
					disabled: !u.trim() || a,
					onClick: () => i(e.id, u.trim()),
					children: a ? "Sending…" : c
				}) })]
			})
		]
	});
}
function Xr({ variant: e = "card", posts: n, onAnswer: r, answerBusy: i = !1, answerPlaceholder: a = "Answer the agent — your answer resolves the question and the loop continues.", answerLabel: o = "Answer & continue the loop", kindLabels: s, kindTones: c, emptyLabel: l = "No posts yet — an agent opens the thread by restating the problem.", className: u, "data-testid": d }) {
	let f = {
		...Kr,
		...s
	}, p = {
		...qr,
		...c
	};
	return /* @__PURE__ */ Q("div", {
		className: t("min-w-0 bg-surface", e === "card" && "overflow-hidden rounded-lg border border-border", u),
		"data-variant": e,
		...d ? { "data-testid": d } : {},
		children: n.length === 0 ? /* @__PURE__ */ Q("div", {
			className: "px-4 py-8 text-center text-xs text-text-tertiary",
			children: l
		}) : n.map((t) => /* @__PURE__ */ Q(Yr, {
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
var Zr = {
	sm: "lg:w-[260px]",
	md: "lg:w-[300px]",
	lg: "lg:w-[340px]"
}, Qr = Qe("card");
function $r({ children: e, rail: n, railWidth: r = "md", variant: i = "card", className: a, "data-testid": o }) {
	return i === "plain" ? /* @__PURE__ */ Q("div", {
		className: t("@container min-w-0", a),
		"data-testid": o,
		"data-variant": "plain",
		children: /* @__PURE__ */ $("div", {
			className: "flex min-w-0 flex-col gap-6 @3xl:flex-row @3xl:items-start",
			children: [/* @__PURE__ */ Q("div", {
				className: "min-w-0 flex-1",
				children: e
			}), /* @__PURE__ */ Q("aside", {
				"aria-label": "Record context",
				className: "w-full min-w-0 shrink-0 border-t border-border @3xl:w-[260px] @3xl:border-t-0 @3xl:border-l @3xl:pl-5",
				children: /* @__PURE__ */ Q(Qr.Provider, {
					value: "plain",
					children: n
				})
			})]
		})
	}) : /* @__PURE__ */ $("div", {
		className: t("flex flex-col gap-4 lg:flex-row lg:items-start", a),
		...o ? { "data-testid": o } : {},
		children: [/* @__PURE__ */ Q("div", {
			className: "min-w-0 flex-1",
			children: e
		}), /* @__PURE__ */ Q("aside", {
			className: t("w-full shrink-0 lg:sticky lg:top-4", Zr[r]),
			children: /* @__PURE__ */ Q("div", {
				className: "overflow-hidden rounded-lg border border-border bg-surface",
				children: n
			})
		})]
	});
}
function ei({ title: e, children: n, className: r, variant: i }) {
	let a = K(Qr), o = i ?? a, s = o === "plain" ? "h2" : "h3";
	return /* @__PURE__ */ $("section", {
		"data-ui-part": "",
		className: t("border-b border-border py-3 last:border-b-0", o === "card" && "px-3.5", r),
		children: [/* @__PURE__ */ Q(s, {
			className: t("mb-2", Ve, Re),
			"data-testid": "rail-section-title",
			children: e
		}), /* @__PURE__ */ Q("div", {
			className: "flex flex-col gap-2 text-xs text-text-secondary",
			children: n
		})]
	});
}
//#endregion
//#region src/components/shared/SignoffPanel.tsx
function ti({ variant: e = "card", signoffs: n, required: r = 2, actions: i, emptyHint: a, className: o, "data-testid": s }) {
	let c = n.filter((e) => e.decision === "approve").length, l = a ?? `none yet — ${r} approvals ratify the decision`;
	return /* @__PURE__ */ $("div", {
		className: t("flex flex-wrap items-center gap-3 border-border bg-surface py-3", e === "inline" ? "border-t" : "rounded-lg border px-4", o),
		"data-variant": e,
		...s ? { "data-testid": s } : {},
		children: [
			/* @__PURE__ */ Q("span", {
				className: "text-xs font-semibold text-text-primary",
				children: "Sign-offs"
			}),
			n.length === 0 ? /* @__PURE__ */ Q("span", {
				className: "text-xs text-text-tertiary",
				children: l
			}) : /* @__PURE__ */ $(Z, { children: [n.map((e) => /* @__PURE__ */ $("span", {
				className: "flex items-center gap-1.5",
				title: e.role ? `${e.name} · ${e.role}` : e.name,
				children: [
					/* @__PURE__ */ Q(Ce, {
						name: e.name,
						src: e.avatarUrl,
						size: 18
					}),
					/* @__PURE__ */ Q("span", {
						className: "text-xs text-text-secondary",
						children: e.name
					}),
					/* @__PURE__ */ Q(h, {
						tone: e.decision === "approve" ? "success" : "danger",
						size: "xs",
						children: e.decision === "approve" ? "✓" : "✕"
					})
				]
			}, e.name)), /* @__PURE__ */ $("span", {
				className: "text-[11px] text-text-tertiary",
				children: [
					c,
					"/",
					r,
					" approvals"
				]
			})] }),
			/* @__PURE__ */ Q("div", { className: "flex-1" }),
			i
		]
	});
}
//#endregion
//#region src/components/shared/StatStrip.tsx
var ni = {
	default: "text-text-primary",
	accent: "text-primary",
	danger: "text-danger"
};
function ri({ progress: e, label: t }) {
	return !e || !(e.max > 0) || !Number.isFinite(e.value) ? null : /* @__PURE__ */ Q(we, {
		value: e.value,
		max: e.max,
		size: "sm",
		"aria-label": t,
		className: "mt-2 max-w-[20rem]",
		"data-testid": "stat-strip-progress"
	});
}
function ii({ item: e, first: n, last: r }) {
	return /* @__PURE__ */ $("div", {
		className: t("min-w-0 py-3", n ? "pl-0 pr-6" : "px-6", r && !n && "pr-0"),
		"data-testid": "stat-strip-cluster",
		children: [
			/* @__PURE__ */ $("div", {
				className: "flex min-w-0 items-baseline gap-1.5 whitespace-nowrap",
				children: [/* @__PURE__ */ Q("span", {
					className: t("text-sm font-semibold leading-6 tabular-nums", ni[e.tone ?? "default"]),
					children: e.value
				}), /* @__PURE__ */ Q("span", {
					className: "min-w-0 truncate text-sm leading-6 text-text-secondary",
					children: e.label
				})]
			}),
			/* @__PURE__ */ Q(ri, {
				progress: e.progress,
				label: e.label
			}),
			e.hint != null && /* @__PURE__ */ Q("div", {
				className: "mt-0.5 truncate text-[12px] text-text-tertiary",
				children: e.hint
			})
		]
	});
}
function ai({ item: e, sm: n = !1 }) {
	let r = e.progress && e.progress.max > 0 && Number.isFinite(e.progress.value);
	return /* @__PURE__ */ $("span", {
		className: "flex min-w-0 items-center whitespace-nowrap",
		"data-testid": "stat-strip-cluster",
		children: [/* @__PURE__ */ $("span", {
			className: "flex min-w-0 items-baseline gap-1.5",
			children: [/* @__PURE__ */ Q("span", {
				className: t("font-semibold tabular-nums", n ? "text-sm leading-5" : "text-[16px] leading-6", ni[e.tone ?? "default"]),
				children: e.value
			}), /* @__PURE__ */ Q("span", {
				className: t("min-w-0 truncate text-text-secondary", n ? "text-sm leading-5" : "text-[15px] leading-6"),
				children: e.label
			})]
		}), e.track == null ? r && /* @__PURE__ */ Q(we, {
			value: e.progress.value,
			max: e.progress.max,
			size: "sm",
			"aria-label": e.label,
			className: "ml-[18px] w-[150px] shrink-0",
			"data-testid": "stat-strip-progress"
		}) : /* @__PURE__ */ Q("span", {
			className: "ml-[18px] flex shrink-0 items-center",
			"data-testid": "stat-strip-track",
			children: e.track
		})]
	});
}
var oi = {
	row: "@max-[40rem]:flex-col",
	cell: "@max-[40rem]:flex-none",
	cluster: "@max-[40rem]:flex @max-[40rem]:flex-wrap @max-[40rem]:items-baseline @max-[40rem]:gap-x-3 @max-[40rem]:gap-y-0.5 @max-[40rem]:py-1.5",
	inline: "@max-[40rem]:mt-0"
};
function si({ item: e, flush: n, control: r = !1, flow: i = !1 }) {
	return /* @__PURE__ */ $("div", {
		"data-stat-control": r || void 0,
		className: t("min-w-0 px-4 py-2.5", (n === "start" || n === "both") && "pl-0", (n === "end" || n === "both") && "pr-0", i && oi.cluster, i === "frameless" && "@max-[40rem]:px-0"),
		children: [
			/* @__PURE__ */ Q("div", {
				className: t("truncate uppercase tracking-wide text-text-tertiary", r ? "text-xs font-normal" : "text-xs font-semibold"),
				...e.title ? {} : { title: e.label },
				"data-testid": "stat-strip-label",
				children: e.label
			}),
			/* @__PURE__ */ $("div", {
				className: t("mt-0.5 flex min-w-0 items-baseline gap-2", i && oi.inline),
				children: [/* @__PURE__ */ Q("span", {
					className: t("leading-none tabular-nums", "text-sm font-semibold", ni[e.tone ?? "default"]),
					children: e.value
				}), e.hint != null && /* @__PURE__ */ Q("span", {
					className: t("min-w-0 truncate text-text-tertiary", "text-xs"),
					children: e.hint
				})]
			}),
			e.status && /* @__PURE__ */ $("div", {
				className: t("mt-1 flex min-w-0 items-center gap-1.5 text-[12px]", i && oi.inline),
				"data-testid": "stat-strip-status",
				children: [/* @__PURE__ */ Q("span", {
					"aria-hidden": "true",
					className: t("inline-block h-2 w-2 shrink-0 rounded-full", f[e.status.tone ?? "neutral"])
				}), /* @__PURE__ */ Q("span", {
					className: t("min-w-0 truncate", e.status.tone && e.status.tone !== "neutral" ? g[e.status.tone] : "text-text-secondary"),
					children: e.status.label
				})]
			}),
			/* @__PURE__ */ Q(ri, {
				progress: e.progress,
				label: e.label
			})
		]
	});
}
function ci({ connector: e, frameless: n = !1 }) {
	let r = e?.tone;
	return /* @__PURE__ */ $("div", {
		className: t("flex shrink-0 flex-col items-center justify-center gap-1 self-center px-1", "@max-[40rem]:flex-row @max-[40rem]:self-start @max-[40rem]:gap-1.5 @max-[40rem]:py-0.5", n ? "@max-[40rem]:px-0" : "@max-[40rem]:px-4", r ? g[r] : "text-text-tertiary"),
		"data-testid": "stat-strip-connector",
		children: [
			/* @__PURE__ */ $("svg", {
				"aria-hidden": "true",
				width: "56",
				height: "8",
				viewBox: "0 0 56 8",
				className: "block @max-[40rem]:hidden",
				children: [/* @__PURE__ */ Q("line", {
					x1: "0",
					y1: "4",
					x2: "50",
					y2: "4",
					stroke: "currentColor",
					strokeWidth: "1.25"
				}), /* @__PURE__ */ Q("path", {
					d: "M49 0.5 L55 4 L49 7.5 Z",
					fill: "currentColor"
				})]
			}),
			/* @__PURE__ */ $("svg", {
				"aria-hidden": "true",
				width: "8",
				height: "14",
				viewBox: "0 0 8 14",
				className: "hidden @max-[40rem]:block",
				children: [/* @__PURE__ */ Q("line", {
					x1: "4",
					y1: "0",
					x2: "4",
					y2: "8",
					stroke: "currentColor",
					strokeWidth: "1.25"
				}), /* @__PURE__ */ Q("path", {
					d: "M0.5 7 L4 13 L7.5 7 Z",
					fill: "currentColor"
				})]
			}),
			e?.label && /* @__PURE__ */ Q("span", {
				className: "whitespace-nowrap text-[12px] leading-none",
				children: e.label
			})
		]
	});
}
function li({ items: e, frameless: n = !1, connectors: r, variant: i = "default", size: o, className: s, "aria-label": c, "data-testid": l }) {
	let u = a("StatStrip", o, {
		comfortable: "md",
		compact: "sm"
	}), d = !!r && r.length > 0;
	if (i === "line") return /* @__PURE__ */ Q("div", {
		role: "group",
		"data-variant": "line",
		...u === "sm" ? { "data-size": "sm" } : {},
		className: t("flex min-w-0 flex-wrap items-center gap-y-1", s),
		...c ? { "aria-label": c } : {},
		...l ? { "data-testid": l } : {},
		children: e.map((n, r) => {
			let i = n.title ? { title: n.title } : {}, a = /* @__PURE__ */ Q(ai, {
				item: n,
				sm: u === "sm"
			}), o;
			return o = n.href ? /* @__PURE__ */ Q("a", {
				href: n.href,
				className: "min-w-0 rounded no-underline hover:underline",
				...i,
				children: a
			}) : n.onSelect ? /* @__PURE__ */ Q("button", {
				"data-ui-part": "",
				type: "button",
				onClick: n.onSelect,
				className: "min-w-0 cursor-pointer rounded border-none bg-transparent p-0 text-left hover:underline",
				...i,
				children: a
			}) : /* @__PURE__ */ Q("span", {
				className: "min-w-0",
				...i,
				children: a
			}), /* @__PURE__ */ $("span", {
				className: "inline-flex min-w-0 items-baseline",
				"data-testid": "stat-strip-unit",
				children: [o, r < e.length - 1 && /* @__PURE__ */ Q("span", {
					"aria-hidden": "true",
					className: t("mx-5 text-text-secondary", u === "sm" ? "text-sm leading-5" : "text-[15px] leading-6"),
					"data-testid": "stat-strip-separator",
					children: "•"
				})]
			}, n.label);
		})
	});
	if (i === "inline") return /* @__PURE__ */ Q("div", {
		role: "group",
		"data-variant": "inline",
		className: t("flex items-center divide-x divide-border overflow-x-auto border-b border-border pb-1", s),
		...c ? { "aria-label": c } : {},
		...l ? { "data-testid": l } : {},
		children: e.map((t, n) => {
			let r = t.title ? { title: t.title } : {}, i = /* @__PURE__ */ Q(ii, {
				item: t,
				first: n === 0,
				last: n === e.length - 1
			});
			return t.href ? /* @__PURE__ */ Q("a", {
				href: t.href,
				className: "min-w-0 flex-1 no-underline hover:bg-surface-hover",
				...r,
				children: i
			}, t.label) : t.onSelect ? /* @__PURE__ */ Q("button", {
				"data-ui-part": "",
				type: "button",
				onClick: t.onSelect,
				className: "min-w-0 flex-1 cursor-pointer border-none bg-transparent p-0 text-left hover:bg-surface-hover",
				...r,
				children: i
			}, t.label) : /* @__PURE__ */ Q("div", {
				className: "min-w-0 flex-1",
				...r,
				children: i
			}, t.label);
		})
	});
	let f = d ? n ? "frameless" : "framed" : !1, p = e.map((i, a) => {
		let o = n ? e.length === 1 ? "both" : a === 0 ? "start" : a === e.length - 1 ? "end" : void 0 : void 0, s = i.title ? { title: i.title } : {}, c;
		return c = i.href ? /* @__PURE__ */ Q("a", {
			href: i.href,
			className: t("min-w-0 flex-1 no-underline transition-colors hover:bg-surface-hover", d && oi.cell),
			...s,
			children: /* @__PURE__ */ Q(si, {
				item: i,
				flush: o,
				control: !0,
				flow: f
			})
		}) : i.onSelect ? /* @__PURE__ */ Q("button", {
			"data-ui-part": "",
			type: "button",
			onClick: i.onSelect,
			className: t("min-w-0 flex-1 cursor-pointer border-none bg-transparent p-0 text-left transition-colors hover:bg-surface-hover", d && oi.cell),
			...s,
			children: /* @__PURE__ */ Q(si, {
				item: i,
				flush: o,
				control: !0,
				flow: f
			})
		}) : /* @__PURE__ */ Q("div", {
			className: t("min-w-0 flex-1", d && oi.cell),
			...s,
			children: /* @__PURE__ */ Q(si, {
				item: i,
				flush: o,
				flow: f
			})
		}), /* @__PURE__ */ $(Ze, { children: [c, d && a < e.length - 1 && /* @__PURE__ */ Q(ci, {
			connector: r[a],
			frameless: n
		})] }, i.label);
	}), m = !n && "rounded-lg border border-border bg-surface", h = {
		role: "group",
		...c ? { "aria-label": c } : {},
		...l ? { "data-testid": l } : {}
	};
	return d ? /* @__PURE__ */ Q("div", {
		...h,
		"data-flow": "",
		className: t("@container min-w-0", m, s),
		children: /* @__PURE__ */ Q("div", {
			className: t("flex items-stretch overflow-x-auto", oi.row),
			"data-stat-strip-row": "",
			children: p
		})
	}) : /* @__PURE__ */ Q("div", {
		...h,
		className: t("flex overflow-x-auto divide-x divide-border", m, s),
		children: p
	});
}
//#endregion
//#region src/components/shared/KeyValue.tsx
function ui({ items: e, layout: n = "row", labelWidth: r = "w-28", divided: i = !1, responsive: a = !1, className: o, "aria-label": s, "data-testid": c = "key-value" }) {
	if (e.length === 0) return null;
	let l = n === "row", u = l && i;
	return /* @__PURE__ */ Q("dl", {
		className: t("m-0 min-w-0", a && "@container/key-value", n === "grid" ? "grid grid-cols-2 gap-x-6 gap-y-3" : u ? "flex flex-col border-t border-border" : l ? "flex flex-col gap-1.5" : "flex flex-col gap-3", o),
		"data-layout": n,
		"data-divided": u || void 0,
		"data-testid": c,
		...s ? { "aria-label": s } : {},
		children: e.map((e, n) => /* @__PURE__ */ $("div", {
			className: t("min-w-0", a && u && "flex-wrap @lg/key-value:flex-nowrap", u ? "flex min-h-[38px] items-center gap-3 border-b border-border px-2.5 py-1.5" : l ? "flex items-baseline gap-3" : "flex flex-col gap-0.5"),
			"data-testid": `${c}-item`,
			children: [
				/* @__PURE__ */ Q("dt", {
					className: t("m-0", a && u && "basis-full @lg/key-value:basis-auto", u ? t("shrink-0 text-sm text-text-primary", r) : "text-text-secondary", !u && (l ? t("shrink-0 text-xs", r) : "text-[12px]")),
					children: e.label
				}),
				/* @__PURE__ */ Q("dd", {
					className: t("m-0 min-w-0 truncate", "text-sm", e.muted ? "text-text-tertiary" : "text-text-primary", l && "flex-1", e.mono && "font-mono text-[12px]"),
					...e.title ? { title: e.title } : {},
					children: e.value
				}),
				l && e.action != null && e.action !== !1 && /* @__PURE__ */ Q("dd", {
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
function di({ person: e, children: n, actions: r, details: i, interactiveChild: a = !1, openDelay: o = 450, closeDelay: s = 250, className: c, "data-testid": l = "person-hover-card" }) {
	let u = Y(null), [d, f] = X(!1), p = Y(null), m = G(() => {
		p.current &&= (clearTimeout(p.current), null);
	}, []);
	q(() => m, [m]);
	let h = G(() => {
		m(), p.current = setTimeout(() => f(!0), o);
	}, [m, o]), g = G(() => {
		m(), p.current = setTimeout(() => f(!1), s);
	}, [m, s]);
	return /* @__PURE__ */ $(Z, { children: [/* @__PURE__ */ Q("span", {
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
	}), /* @__PURE__ */ Q(oe, {
		trigger: u,
		open: d,
		onClose: () => {
			m(), f(!1);
		},
		placement: "bottom-start",
		"aria-label": `About ${e.displayName}`,
		"data-testid": l,
		children: /* @__PURE__ */ $("div", {
			className: "w-72 p-3",
			onMouseEnter: m,
			onMouseLeave: g,
			children: [
				/* @__PURE__ */ $("div", {
					className: "flex items-start gap-3",
					children: [/* @__PURE__ */ Q(Ce, {
						name: e.displayName,
						src: e.avatarUrl,
						color: e.color,
						size: 40
					}), /* @__PURE__ */ $("div", {
						className: "min-w-0 flex-1",
						children: [
							/* @__PURE__ */ $("div", {
								className: "flex items-center gap-1.5",
								children: [/* @__PURE__ */ Q("span", {
									className: "truncate text-sm font-semibold text-text-primary",
									children: e.displayName
								}), e.online !== void 0 && /* @__PURE__ */ Q(Ee, { state: e.online ? "online" : "offline" })]
							}),
							e.title && /* @__PURE__ */ Q("div", {
								className: "truncate text-xs text-text-secondary",
								children: e.title
							}),
							e.department && /* @__PURE__ */ Q("div", {
								className: "truncate text-xs text-text-tertiary",
								children: e.department
							})
						]
					})]
				}),
				e.statusText && /* @__PURE__ */ Q("div", {
					className: "mt-2 truncate text-xs italic text-text-secondary",
					children: e.statusText
				}),
				(e.email || e.localTime) && /* @__PURE__ */ $("div", {
					className: "mt-2 space-y-0.5 border-t border-border pt-2",
					children: [e.email && /* @__PURE__ */ Q("div", {
						className: "truncate text-xs text-text-secondary",
						children: e.email
					}), e.localTime && /* @__PURE__ */ $("div", {
						className: "text-xs text-text-tertiary",
						children: [e.localTime, " local time"]
					})]
				}),
				i && /* @__PURE__ */ Q("div", {
					className: "mt-2 border-t border-border pt-2",
					children: i
				}),
				r && /* @__PURE__ */ Q("div", {
					className: "mt-3 flex items-center gap-2",
					children: r
				})
			]
		})
	})] });
}
//#endregion
//#region src/components/shared/MasterDetail.tsx
function fi(e) {
	if (!e || typeof window > "u") return !1;
	try {
		return window.localStorage.getItem(e) === "compact";
	} catch {
		return !1;
	}
}
function pi(e, t) {
	if (!(!e || typeof window > "u")) try {
		window.localStorage.setItem(e, t ? "compact" : "expanded");
	} catch {}
}
function mi({ direction: e }) {
	return /* @__PURE__ */ Q("svg", {
		className: t("h-4 w-4", e === "right" && "rotate-180"),
		viewBox: "0 0 16 16",
		fill: "none",
		"aria-hidden": "true",
		children: /* @__PURE__ */ Q("path", {
			d: "M10 3L5 8l5 5",
			stroke: "currentColor",
			strokeWidth: "1.5",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		})
	});
}
function hi({ index: e, selected: n }) {
	return /* @__PURE__ */ Q("span", {
		className: t("flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-semibold", n ? "bg-primary text-on-primary" : "bg-surface-inset text-text-tertiary"),
		children: e + 1
	});
}
function gi({ items: e, keyOf: n, selectedKey: r, onSelect: i, renderRow: a, renderCompactRow: o, renderDetail: s, railTitle: c, railWidth: l = 340, compactWidth: u = 72, storageKey: d, emptyDetail: f, paneFooter: p, className: m, "data-testid": h = "master-detail" }) {
	let [g, _] = X(() => fi(d)), v = G(() => {
		_((e) => {
			let t = !e;
			return pi(d, t), t;
		});
	}, [d]), y = J(() => e.findIndex((e) => n(e) === r), [
		e,
		n,
		r
	]), b = y >= 0 ? e[y] : null, x = (t) => {
		if (t.key !== "ArrowDown" && t.key !== "ArrowUp" || e.length === 0) return;
		t.preventDefault();
		let r = t.key === "ArrowDown" ? 1 : -1;
		i(n(e[((y >= 0 ? y : r > 0 ? -1 : 0) + r + e.length) % e.length]));
	}, S = b ? s(b, y) : f;
	return /* @__PURE__ */ $("div", {
		className: t("flex overflow-hidden rounded-lg border border-border bg-surface", m),
		"data-testid": h,
		children: [/* @__PURE__ */ $("nav", {
			className: "flex flex-shrink-0 flex-col overflow-y-auto border-r border-border",
			style: { width: g ? u : l },
			onKeyDown: x,
			"aria-label": typeof c == "string" ? c : "Items",
			"data-testid": `${h}-rail`,
			children: [/* @__PURE__ */ $("div", {
				className: t("flex items-center gap-1 border-b border-border px-3 py-2", g ? "justify-center" : "justify-between"),
				children: [!g && c && /* @__PURE__ */ Q("span", {
					className: "truncate text-xs font-semibold uppercase tracking-wide text-text-tertiary",
					children: c
				}), /* @__PURE__ */ Q("button", {
					"data-ui-part": "",
					type: "button",
					onClick: v,
					"aria-label": g ? "Expand list" : "Collapse list",
					"data-testid": `${h}-toggle`,
					className: "flex-shrink-0 rounded-md p-1 text-text-tertiary transition-colors hover:bg-surface-hover hover:text-text-primary",
					children: /* @__PURE__ */ Q(mi, { direction: g ? "right" : "left" })
				})]
			}), /* @__PURE__ */ Q("div", {
				className: "flex flex-col",
				children: e.map((e, s) => {
					let c = n(e), l = c === r;
					return /* @__PURE__ */ Q("div", {
						"data-ui-part": "",
						role: "button",
						tabIndex: 0,
						"aria-current": l,
						onClick: () => i(c),
						onKeyDown: (e) => {
							(e.key === "Enter" || e.key === " ") && (e.preventDefault(), i(c));
						},
						"data-testid": `${h}-row-${c}`,
						className: t("cursor-pointer border-l-2 text-left transition-colors", l ? "border-primary bg-surface-hover" : "border-transparent hover:bg-surface-hover"),
						children: g ? o?.(e, s, l) ?? /* @__PURE__ */ Q("div", {
							className: "flex justify-center py-2.5",
							children: /* @__PURE__ */ Q(hi, {
								index: s,
								selected: l
							})
						}) : a(e, s, l)
					}, c);
				})
			})]
		}), p == null ? /* @__PURE__ */ Q("div", {
			className: "min-w-0 flex-1 overflow-y-auto",
			"data-testid": `${h}-detail`,
			children: S
		}) : /* @__PURE__ */ $("div", {
			className: "flex min-h-0 min-w-0 flex-1 flex-col",
			"data-testid": `${h}-pane-column`,
			children: [/* @__PURE__ */ Q("div", {
				className: "min-h-0 flex-1 overflow-y-auto",
				"data-testid": `${h}-detail`,
				children: S
			}), /* @__PURE__ */ Q("div", {
				className: "shrink-0 bg-surface",
				"data-testid": `${h}-pane-footer`,
				children: p
			})]
		})]
	});
}
//#endregion
//#region src/components/shared/TreeView.tsx
function _i(e) {
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
function vi(e) {
	return typeof CSS < "u" && typeof CSS.escape == "function" ? CSS.escape(e) : e;
}
function yi(e, t) {
	let n = /* @__PURE__ */ new Set();
	if (!t) return n;
	let r = new Map(e.map((e) => [e.id, e])), i = r.get(t);
	for (; i?.parentId;) n.add(i.parentId), i = r.get(i.parentId);
	return n;
}
function bi({ expanded: e }) {
	return /* @__PURE__ */ Q("svg", {
		className: t("h-3.5 w-3.5 transition-transform", e ? "" : "-rotate-90"),
		viewBox: "0 0 16 16",
		fill: "none",
		"aria-hidden": "true",
		children: /* @__PURE__ */ Q("path", {
			d: "M4 6l4 4 4-4",
			stroke: "currentColor",
			strokeWidth: "1.5",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		})
	});
}
function xi(e) {
	let t = e.currentTarget.getBoundingClientRect(), n = e.clientY - t.top;
	return n < t.height / 3 ? "before" : n > t.height * 2 / 3 ? "after" : "into";
}
function Si({ entry: e, depth: n, expanded: r, onToggle: i, selectedId: a, onSelect: o, renderTrailing: s, rowMenu: c, rowMenuLabel: l, dragEnabled: u, canDragNode: d, canDrop: f, dragRef: p, dropTarget: m, setDropTarget: h, onDrop: g, testId: _, focusedId: v, setFocusedId: y, size: b }) {
	let x = r.has(e.id), S = e.children.length > 0, C = e.id === a, w = m?.id === e.id, T = u && !e.disabled && e.status !== "pending" && (d?.(e) ?? !0), E = c?.(e), D = !!E && E.some((e) => e.items.length > 0), O = b === "rail", k = b === "md" || O;
	return /* @__PURE__ */ $("div", { children: [/* @__PURE__ */ $("div", {
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
			let r = xi(t);
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
			let r = xi(t);
			h(null), f(n.id, e.id, r) && g(e.id, r), p.current = null;
		},
		onDragEnd: () => {
			p.current = null, h(null);
		},
		onClick: () => {
			e.disabled || (o(e.id), S && i(e.id));
		},
		...D ? { onContextMenu: (e) => {
			e.preventDefault(), Ci(e.currentTarget);
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
		className: t("group relative flex items-center border-l-2 transition-colors", "select-none outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary", O ? t("min-h-9 gap-1.5 pr-2.5", He, ze) : k ? "min-h-8 gap-1.5 py-1 pr-2.5 text-[15px] leading-6" : "gap-1 py-1.5 pr-2 text-sm", T ? "cursor-grab active:cursor-grabbing" : "cursor-pointer", C ? k ? "border-primary bg-primary-bg font-medium text-primary-fg" : "border-primary bg-surface-hover font-semibold text-text-primary" : k ? "border-transparent text-text-primary hover:bg-surface-hover" : "border-transparent text-text-secondary hover:bg-surface-hover", e.disabled && "cursor-not-allowed opacity-50", e.status === "pending" && "pointer-events-none opacity-50", e.status === "moved" && "bg-success/10", w && m?.position === "into" && "ring-1 ring-inset ring-primary", w && m?.position === "before" && "shadow-[inset_0_2px_0_0_var(--color-primary)]", w && m?.position === "after" && "shadow-[inset_0_-2px_0_0_var(--color-primary)]"),
		style: { paddingLeft: n * (k ? 18 : 14) + 8 },
		children: [
			S ? /* @__PURE__ */ Q("button", {
				"data-ui-part": "",
				type: "button",
				onClick: (t) => {
					t.stopPropagation(), i(e.id);
				},
				"aria-label": x ? "Collapse" : "Expand",
				className: "flex h-5 w-5 flex-shrink-0 items-center justify-center text-text-tertiary hover:text-text-primary",
				children: /* @__PURE__ */ Q(bi, { expanded: x })
			}) : /* @__PURE__ */ Q("span", {
				className: "h-5 w-5 flex-shrink-0",
				"aria-hidden": "true"
			}),
			e.icon && /* @__PURE__ */ Q("span", {
				className: t("flex flex-shrink-0 items-center", k && (C ? "text-primary-fg" : "text-text-secondary")),
				"data-testid": `${_}-icon-${e.id}`,
				children: e.icon
			}),
			/* @__PURE__ */ Q("span", {
				className: "min-w-0 flex-1 truncate",
				title: e.title,
				"data-ui-text": O ? "rail-item" : void 0,
				children: e.title
			}),
			e.meta && /* @__PURE__ */ Q("span", {
				className: t("flex-shrink-0 text-text-tertiary", O ? "text-[12px] font-medium leading-4 tabular-nums text-text-secondary" : k ? "text-[13px] tabular-nums" : "text-xs"),
				children: e.meta
			}),
			e.hoverMeta && /* @__PURE__ */ Q("span", {
				"data-testid": `${_}-hover-meta-${e.id}`,
				className: t("sr-only flex-shrink-0 text-text-tertiary", O ? "text-[12px] font-medium leading-4 tabular-nums text-text-secondary" : "text-xs", "group-hover:not-sr-only group-focus:not-sr-only group-focus-within:not-sr-only"),
				children: e.hoverMeta
			}),
			e.badge,
			s?.(e),
			D && /* @__PURE__ */ Q("span", {
				"data-tree-row-menu": "",
				className: t("flex flex-shrink-0 items-center", k && "pointer-events-none absolute inset-y-0 right-1.5 opacity-0 group-hover:pointer-events-auto group-hover:opacity-100 group-focus:pointer-events-auto group-focus:opacity-100 group-focus-within:pointer-events-auto group-focus-within:opacity-100 has-[[aria-expanded=true]]:pointer-events-auto has-[[aria-expanded=true]]:opacity-100"),
				onClick: (e) => e.stopPropagation(),
				onContextMenu: (e) => e.stopPropagation(),
				children: /* @__PURE__ */ Q(be, {
					trigger: /* @__PURE__ */ Q("span", {
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
	}), x && e.children.map((e) => /* @__PURE__ */ Q(Si, {
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
function Ci(e) {
	let t = e.querySelector("[data-tree-row-menu] button[aria-haspopup=\"menu\"]");
	return t ? (t.getAttribute("aria-expanded") !== "true" && t.click(), !0) : !1;
}
function wi(e, t) {
	let n = [], r = (e) => {
		for (let i of e) n.push(i.id), t.has(i.id) && i.children.length > 0 && r(i.children);
	};
	return r(e), n;
}
function Ti({ nodes: e, selectedId: n, onSelect: r, defaultExpanded: i, expanded: a, onToggle: o, onReorder: s, canDragNode: c, canDropNode: l, renderTrailing: u, rowMenu: d, rowMenuLabel: f, size: p = "sm", className: m, "data-testid": h = "tree-view" }) {
	let g = J(() => _i(e), [e]), [_, v] = X(() => new Set(i ?? [])), y = a !== void 0, b = J(() => y ? new Set(a) : _, [
		y,
		a,
		_
	]), [x, S] = X(null), C = Y(null), w = Y(null), [T, E] = X(null), D = J(() => new Map(e.map((e) => [e.id, e])), [e]);
	q(() => {
		let t = yi(e, n);
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
	}, k = (e) => O(e, !b.has(e)), A = J(() => wi(g, b), [g, b]), j = x && A.includes(x) ? x : n && A.includes(n) ? n : A[0] ?? null, M = (e) => {
		e && (S(e), w.current?.querySelector(`[data-testid="${h}-row-${vi(e)}"]`)?.focus());
	}, N = (t) => {
		let n = t.target, i = n.closest("[role=\"treeitem\"]");
		if (!i || n.closest("[data-tree-row-menu]")) return;
		if (t.key === "F10" && t.shiftKey || t.key === "ContextMenu") {
			Ci(i) && t.preventDefault();
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
	}, P = (t, n) => {
		let r = C.current?.id;
		if (!r || !s) return;
		let i = D.get(t);
		if (!i || !F(r, t, n)) return;
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
	function F(e, t, n) {
		let r = D.get(e), i = D.get(t);
		if (!r || !i || e === t || r.disabled || i.disabled || r.status === "pending" || i.status === "pending" || c?.(r) === !1 || l?.(r, i, n) === !1) return !1;
		let a = i;
		for (; a?.parentId;) {
			if (a.parentId === e) return !1;
			a = D.get(a.parentId);
		}
		return !0;
	}
	return e.length === 0 ? null : /* @__PURE__ */ Q("div", {
		ref: w,
		role: "tree",
		className: t("flex flex-col", m),
		"data-testid": h,
		onKeyDown: N,
		children: g.map((e) => /* @__PURE__ */ Q(Si, {
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
			canDrop: F,
			dragRef: C,
			dropTarget: T,
			setDropTarget: E,
			onDrop: P,
			testId: h,
			focusedId: j,
			setFocusedId: S
		}, e.id))
	});
}
//#endregion
//#region src/components/shared/WorkflowStepper.tsx
var Ei = {
	sm: "h-5 w-5",
	md: "h-6 w-6",
	compact: "h-4 w-4"
}, Di = {
	sm: "text-[10px] font-medium leading-none",
	md: "text-[11px] font-medium leading-none",
	compact: "text-xs font-semibold leading-4"
};
function Oi({ compact: e }) {
	return /* @__PURE__ */ Q("svg", {
		viewBox: "0 0 16 16",
		fill: "none",
		className: e ? "h-2.5 w-2.5" : "h-3 w-3",
		"aria-hidden": "true",
		children: /* @__PURE__ */ Q("path", {
			d: "M3.5 8.5l3 3 6-6.5",
			stroke: "currentColor",
			strokeWidth: "1.75",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		})
	});
}
function ki({ steps: e, size: n, wrap: r = !1, className: i, "aria-label": a, "data-testid": o = "workflow-stepper" }) {
	let s = c();
	n === "sm" && l("WorkflowStepper", "sm");
	let u = n ?? (s === "compact" ? "compact" : "md"), d = u === "compact", f = e.some((e) => e.description != null);
	return /* @__PURE__ */ Q("ol", {
		className: t(f || d ? "m-0 inline-flex w-fit max-w-full list-none p-0" : "flex", r ? "flex-wrap gap-y-2" : "overflow-x-auto", f ? "items-start" : "items-center", i),
		...r ? { "data-wrap": "" } : {},
		"data-testid": o,
		...d ? { "data-density": "compact" } : {},
		...a ? { "aria-label": a } : {},
		children: e.map((n, r) => {
			let i = r === e.length - 1, a = e[r + 1], o = n.done ? a?.done ? "bg-success" : "bg-gradient-to-r from-success to-success/30" : "bg-border", s = n.outcome ?? (n.done ? "done" : n.active ? "active" : "pending"), c = /* @__PURE__ */ Q("div", {
				className: t("flex flex-shrink-0 items-center justify-center rounded-full transition-colors", Ei[u], n.outcome === "failed" ? "border-2 border-danger bg-danger-bg text-danger" : n.outcome === "cancelled" ? "border-2 border-border bg-surface-inset text-text-secondary" : n.done ? "bg-success text-white" : n.active ? t(d ? "border-[1.5px]" : "border-2", "border-info bg-info-bg") : "border border-border bg-surface-inset"),
				children: n.outcome ? /* @__PURE__ */ Q("span", { className: t("rounded-full", n.outcome === "failed" ? "bg-danger" : "bg-text-secondary", d ? "h-1.5 w-1.5" : "h-2 w-2") }) : n.done ? /* @__PURE__ */ Q(Oi, { compact: d }) : n.active ? /* @__PURE__ */ Q("span", { className: t("rounded-full bg-info", d ? "h-1.5 w-1.5" : "h-2 w-2") }) : null
			}), l = /* @__PURE__ */ Q("span", {
				className: t(f ? "block text-xs font-semibold leading-4" : Di[u], n.active ? "text-text-primary" : n.done ? "text-text-secondary" : "text-text-tertiary"),
				children: n.label
			});
			return f ? /* @__PURE__ */ $("li", {
				"aria-current": n.active ? "step" : void 0,
				"data-state": s,
				className: t("shrink-0", d ? "w-32" : "w-40"),
				children: [/* @__PURE__ */ $("div", {
					className: "flex items-center",
					children: [c, !i && /* @__PURE__ */ Q("div", {
						"aria-hidden": "true",
						"data-workflow-connector": "",
						className: t("h-0.5 flex-1", o)
					})]
				}), /* @__PURE__ */ $("div", {
					className: "mt-2 pr-3 space-y-1",
					children: [l, n.description != null && /* @__PURE__ */ Q("div", {
						"data-ui-text": "workflow-step-description",
						className: "text-xs text-text-secondary leading-5 break-words",
						children: n.description
					})]
				})]
			}, n.step) : /* @__PURE__ */ $("li", {
				"aria-current": n.active ? "step" : void 0,
				"data-state": s,
				className: d ? "flex items-center" : "flex flex-1 items-center last:flex-none",
				children: [/* @__PURE__ */ $("div", {
					className: t("flex items-center whitespace-nowrap", d ? "gap-1" : "gap-1.5"),
					children: [c, l]
				}), !i && /* @__PURE__ */ Q("div", {
					"aria-hidden": "true",
					className: t(d ? "mx-2 h-0.5 w-3" : "mx-2 h-1 flex-1", "rounded-full transition-colors", o)
				})]
			}, n.step);
		})
	});
}
//#endregion
//#region src/components/shared/Wizard.tsx
function Ai() {
	return /* @__PURE__ */ Q("svg", {
		viewBox: "0 0 16 16",
		fill: "none",
		className: "h-3 w-3",
		"aria-hidden": "true",
		children: /* @__PURE__ */ Q("path", {
			d: "M3.5 8.5l3 3 6-6.5",
			stroke: "currentColor",
			strokeWidth: "1.75",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		})
	});
}
function ji({ steps: e, activeKey: n, onStep: r, onFinish: i, finishLabel: a = "Finish", className: o, "data-testid": s = "wizard" }) {
	let c = e.findIndex((e) => e.key === n), l = c >= 0 ? e[c] : e[0], u = l?.canAdvance ?? !0, d = c === e.length - 1;
	return /* @__PURE__ */ $("div", {
		className: t("flex flex-col gap-4 sm:flex-row", o),
		"data-testid": s,
		children: [/* @__PURE__ */ Q("ol", {
			className: "flex flex-shrink-0 flex-col gap-1 sm:w-56",
			"data-testid": `${s}-rail`,
			children: e.map((e, i) => {
				let a = i < c, o = e.key === n;
				return /* @__PURE__ */ Q("li", { children: /* @__PURE__ */ $("button", {
					"data-ui-part": "",
					type: "button",
					onClick: () => r(e.key),
					"aria-current": o ? "step" : void 0,
					"data-testid": `${s}-step-${e.key}`,
					className: t("flex w-full items-center gap-2.5 rounded-md px-2.5 py-2 text-left text-sm transition-colors", o ? "bg-surface-hover font-semibold text-text-primary" : "text-text-secondary hover:bg-surface-hover"),
					children: [/* @__PURE__ */ Q("span", {
						className: t("flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full text-xs font-semibold", a ? "bg-success text-white" : o ? "border-2 border-info bg-info-bg text-info-fg" : "border border-border bg-surface-inset text-text-tertiary"),
						children: a ? /* @__PURE__ */ Q(Ai, {}) : i + 1
					}), /* @__PURE__ */ Q("span", {
						className: "truncate",
						children: e.label
					})]
				}) }, e.key);
			})
		}), /* @__PURE__ */ $("div", {
			className: "flex min-w-0 flex-1 flex-col gap-4",
			children: [/* @__PURE__ */ Q("div", {
				className: "min-w-0 flex-1",
				"data-testid": `${s}-content`,
				children: l?.content
			}), /* @__PURE__ */ $("div", {
				className: "flex items-center justify-between gap-2 border-t border-border pt-3",
				children: [/* @__PURE__ */ Q("button", {
					"data-ui-part": "",
					type: "button",
					onClick: () => {
						c > 0 && r(e[c - 1].key);
					},
					disabled: c <= 0,
					"data-testid": `${s}-back`,
					className: "rounded-md px-3 py-1.5 text-sm font-semibold text-text-secondary transition-colors hover:bg-surface-hover disabled:cursor-not-allowed disabled:opacity-50",
					children: "Back"
				}), /* @__PURE__ */ Q("button", {
					"data-ui-part": "",
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
var Mi = "input:not([type=\"hidden\"]):not([disabled]), select:not([disabled]), textarea:not([disabled]), [role=\"combobox\"], button:not([disabled])";
function Ni(e) {
	e && (e.querySelector("[aria-invalid=\"true\"]") ?? e.querySelector(Mi))?.focus();
}
function Pi({ sections: e, mode: n = "single", stepper: r, activeKey: i, onStepChange: a, summary: s, summaryTitle: c = "Summary", aside: l, actionsPlacement: u = "summary", onSubmit: d, submitLabel: f = "Submit", submittingLabel: p = "Submitting…", submitting: m = !1, submitDisabled: h = !1, submitError: g, onDismissError: _, secondaryActions: v, backLabel: y = "Back", nextLabel: b = "Next", "aria-label": x, className: S, "data-testid": C = "form-wizard" }) {
	let w = et(), T = J(() => e.filter((e) => !e.hidden), [e]), E = n === "stepped", [D, O] = X(void 0), k = i ?? D, A = Math.max(0, T.findIndex((e) => e.key === k)), j = T[A], M = A >= T.length - 1, [N, P] = X(() => /* @__PURE__ */ new Set()), [F, I] = X(null), L = Y(/* @__PURE__ */ new Map()), ee = G((e) => {
		i === void 0 && O(e), a?.(e);
	}, [i, a]);
	q(() => {
		if (!F) return;
		let e = L.current.get(F.key) ?? null;
		F.invalid ? Ni(e) : e?.querySelector("[data-form-wizard-heading]")?.focus(), I(null);
	}, [F, A]);
	let R = (e) => P((t) => /* @__PURE__ */ new Set([...t, ...e])), z = () => {
		if (!j) return;
		if (j.error) {
			R([j.key]), I({
				key: j.key,
				invalid: !0
			});
			return;
		}
		let e = T[A + 1];
		e && (ee(e.key), I({
			key: e.key,
			invalid: !1
		}));
	}, B = () => {
		let e = T[A - 1];
		e && (ee(e.key), I({
			key: e.key,
			invalid: !1
		}));
	}, V = () => {
		if (m || h) return;
		let e = T.filter((e) => e.error);
		if (e.length) {
			R(e.map((e) => e.key));
			let t = e[0];
			E && t.key !== j?.key && ee(t.key), I({
				key: t.key,
				invalid: !0
			});
			return;
		}
		d();
	}, H = (e) => {
		e.preventDefault(), E && !M ? z() : V();
	}, te = r ?? E, ne = T.map((e, t) => ({
		step: t + 1,
		label: e.label ?? e.title,
		done: E ? t < A : !e.error,
		active: E ? t === A : !1
	})), re = E ? j ? [j] : [] : T, ie = s !== void 0 || l !== void 0, U = !E && s !== void 0 && u === "summary", ae = T.filter((e) => e.error && N.has(e.key)).length, W = E && !M ? /* @__PURE__ */ Q(o, {
		type: "submit",
		size: "sm",
		variant: "primary",
		"data-testid": `${C}-next`,
		children: b
	}) : /* @__PURE__ */ Q(o, {
		type: "submit",
		size: "sm",
		variant: "primary",
		disabled: m || h,
		"aria-busy": m || void 0,
		className: U ? "w-full justify-center" : void 0,
		"data-testid": `${C}-submit`,
		children: m ? p : f
	}), oe = /* @__PURE__ */ $("div", {
		className: "flex flex-col gap-3",
		"data-form-wizard-actions": U ? "summary" : "form",
		children: [
			g && /* @__PURE__ */ Q(De, {
				tone: "error",
				onDismiss: _,
				"data-testid": `${C}-error`,
				children: g
			}),
			ae > 0 && !E && /* @__PURE__ */ Q("p", {
				className: "m-0 text-xs leading-4 text-danger-fg",
				role: "status",
				children: ae === 1 ? "One section needs attention above." : `${ae} sections need attention above.`
			}),
			U ? /* @__PURE__ */ $("div", {
				className: "flex flex-col gap-2",
				children: [W, v]
			}) : /* @__PURE__ */ $("div", {
				className: t("flex items-center gap-2", !E && "border-t border-border pt-4"),
				children: [E && /* @__PURE__ */ Q(o, {
					type: "button",
					size: "sm",
					variant: "ghost",
					onClick: B,
					disabled: A === 0,
					"data-testid": `${C}-back`,
					children: y
				}), /* @__PURE__ */ $("div", {
					className: "ml-auto flex items-center gap-2",
					children: [v, W]
				})]
			})
		]
	});
	return /* @__PURE__ */ Q(Z, { children: /* @__PURE__ */ Q("div", {
		className: t("@container w-full min-w-0", S),
		"data-form-wizard": "",
		"data-form-wizard-mode": n,
		"data-testid": C,
		children: /* @__PURE__ */ $("form", {
			noValidate: !0,
			"aria-label": x,
			onSubmit: H,
			className: t("grid items-start gap-6", ie && "@min-[56rem]:grid-cols-[minmax(0,48rem)_20rem]"),
			children: [/* @__PURE__ */ $("div", {
				className: "flex min-w-0 max-w-3xl flex-col gap-6",
				"data-form-wizard-column": "",
				children: [
					te && T.length > 1 && /* @__PURE__ */ Q(ki, {
						size: "compact",
						steps: ne,
						"aria-label": E ? `Step ${A + 1} of ${T.length}` : "Form sections",
						"data-testid": `${C}-stepper`
					}),
					re.map((e, n) => {
						let r = `${w}-${e.key}-title`, i = `${w}-${e.key}-error`, a = !!e.error && N.has(e.key);
						return /* @__PURE__ */ $("section", {
							"data-ui-part": "",
							ref: (t) => {
								t ? L.current.set(e.key, t) : L.current.delete(e.key);
							},
							"aria-labelledby": r,
							"aria-describedby": a ? i : void 0,
							"data-form-wizard-section": e.key,
							"data-testid": e["data-testid"] ?? `${C}-section-${e.key}`,
							className: t("flex min-w-0 flex-col gap-4", !E && n > 0 && "border-t border-border pt-6"),
							children: [/* @__PURE__ */ $("header", {
								className: "flex flex-col gap-1",
								children: [
									/* @__PURE__ */ Q("h2", {
										id: r,
										tabIndex: -1,
										"data-form-wizard-heading": "",
										className: "m-0 text-sm font-semibold leading-5 text-text-primary outline-none",
										children: e.title
									}),
									e.description && /* @__PURE__ */ Q("p", {
										className: "m-0 text-xs font-normal leading-4 text-text-secondary",
										children: e.description
									}),
									a && /* @__PURE__ */ Q("p", {
										id: i,
										role: "alert",
										className: "m-0 text-xs font-normal leading-4 text-danger-fg",
										"data-testid": `${C}-section-${e.key}-error`,
										children: e.error
									})
								]
							}), /* @__PURE__ */ Q("div", {
								className: "flex min-w-0 flex-col gap-4",
								children: e.content
							})]
						}, e.key);
					}),
					!U && oe
				]
			}), ie && /* @__PURE__ */ $("div", {
				className: "flex min-w-0 flex-col gap-4 @min-[56rem]:sticky @min-[56rem]:top-4",
				"data-form-wizard-side": "",
				children: [s !== void 0 && /* @__PURE__ */ $("section", {
					"data-ui-part": "",
					"aria-labelledby": `${w}-summary`,
					"data-form-wizard-summary": "",
					className: "flex flex-col gap-4 rounded-lg border border-border bg-surface-panel p-4",
					"data-testid": `${C}-summary`,
					children: [
						/* @__PURE__ */ Q("h2", {
							id: `${w}-summary`,
							className: "m-0 text-sm font-semibold leading-5 text-text-primary",
							children: c
						}),
						/* @__PURE__ */ Q("div", {
							className: "flex min-w-0 flex-col gap-3",
							children: s
						}),
						U && oe
					]
				}), l !== void 0 && /* @__PURE__ */ Q("div", {
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
var Fi = [
	"tsx",
	"ts",
	"jsx",
	"js",
	"json",
	"bash",
	"sh",
	"text"
];
function Ii(e) {
	let t = /language-(\w+)/.exec(e ?? "")?.[1]?.toLowerCase();
	return Fi.includes(t ?? "") ? t : "text";
}
function Li(e) {
	return typeof e == "string" || typeof e == "number" ? String(e) : Array.isArray(e) ? e.map(Li).join("") : e && typeof e == "object" && "props" in e ? Li(e.props?.children) : "";
}
var Ri = {
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
function zi(e) {
	let n = Ri[e], r = {
		table({ children: e }) {
			return /* @__PURE__ */ Q("div", {
				className: "overflow-x-auto",
				children: /* @__PURE__ */ Q("table", {
					"data-ui-part": "",
					className: t("w-full border-collapse", n.body),
					children: e
				})
			});
		},
		th({ children: e }) {
			return /* @__PURE__ */ Q("th", {
				className: "border-b border-border px-3 py-1.5 text-left font-semibold text-text-primary",
				children: e
			});
		},
		td({ children: e }) {
			return /* @__PURE__ */ Q("td", {
				className: "border-b border-border px-3 py-1.5 text-text-secondary",
				children: e
			});
		},
		a({ href: e, children: t }) {
			return /* @__PURE__ */ Q("a", {
				href: e,
				target: "_blank",
				rel: "noreferrer",
				className: "text-primary underline underline-offset-2 hover:text-primary-hover",
				children: t
			});
		},
		h1({ children: e }) {
			return /* @__PURE__ */ Q("h1", {
				className: t(n.h1, "text-text-primary first:mt-0"),
				children: e
			});
		},
		h2({ children: e }) {
			return /* @__PURE__ */ Q("h2", {
				className: t(n.h2, "text-text-primary first:mt-0"),
				children: e
			});
		},
		h3({ children: e }) {
			return /* @__PURE__ */ Q("h3", {
				className: t(n.h3, "text-text-primary first:mt-0"),
				children: e
			});
		},
		p({ children: e }) {
			return /* @__PURE__ */ Q("p", {
				className: t("mb-3 leading-relaxed text-text-secondary last:mb-0", n.body),
				children: e
			});
		},
		ul({ children: e }) {
			return /* @__PURE__ */ Q("ul", {
				className: t("mb-3 list-disc space-y-1 pl-5 text-text-secondary", n.body),
				children: e
			});
		},
		ol({ children: e }) {
			return /* @__PURE__ */ Q("ol", {
				className: t("mb-3 list-decimal space-y-1 pl-5 text-text-secondary", n.body),
				children: e
			});
		},
		blockquote({ children: e }) {
			return /* @__PURE__ */ Q("blockquote", {
				className: t("mb-3 border-l-2 border-border pl-3 italic text-text-tertiary", n.body),
				children: e
			});
		},
		hr() {
			return /* @__PURE__ */ Q("hr", { className: "my-4 border-border" });
		},
		pre({ children: e, className: t }) {
			return /* @__PURE__ */ Q(Vi, {
				className: t,
				children: e
			});
		},
		code({ className: e, children: r }) {
			return e ? /* @__PURE__ */ Q("code", {
				className: e,
				children: r
			}) : /* @__PURE__ */ Q("code", {
				"data-ui-inline-code": "",
				className: t("rounded bg-surface-inset px-1 py-0.5 text-text-primary", n.inlineCode),
				children: r
			});
		}
	};
	return n.h4 && (r.h4 = ({ children: e }) => /* @__PURE__ */ Q("h4", {
		className: t(n.h4, "text-text-primary first:mt-0"),
		children: e
	})), r;
}
var Bi = {
	sm: zi("sm"),
	md: zi("md"),
	lg: zi("lg")
};
function Vi({ children: e, className: t }) {
	let n = Array.isArray(e) ? e[0] : e, r = Ii(n && typeof n == "object" && "props" in n ? n.props?.className : void 0), i = Li(e).replace(/\n$/, "");
	return /* @__PURE__ */ Q(bt, {
		code: i,
		language: r,
		className: "mb-3",
		copyButton: !0
	});
}
function Hi({ markdown: e, scale: n = "md", className: r, "data-testid": i = "markdown-view" }) {
	return /* @__PURE__ */ Q("div", {
		className: t("min-w-0", r),
		"data-scale": n,
		"data-testid": i,
		children: /* @__PURE__ */ Q(it, {
			remarkPlugins: [at],
			components: Bi[n] ?? Bi.md,
			children: e
		})
	});
}
//#endregion
//#region src/components/shared/TenantSwitcher.tsx
var Ui = 250, Wi = 300;
function Gi(e, t) {
	return e > 0 ? `${e} unread ${e === 1 ? "notice" : "notices"} in this inbox.${t ? "" : " Live updates are currently unavailable."}` : t ? "No unread notices in this inbox." : "Live notification updates are currently unavailable.";
}
function Ki({ compact: e = !1 }) {
	return /* @__PURE__ */ $("svg", {
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.25",
		className: e ? "size-5" : "size-6",
		children: [/* @__PURE__ */ Q("circle", {
			cx: "12",
			cy: "12",
			r: "6.5"
		}), /* @__PURE__ */ Q("ellipse", {
			cx: "12",
			cy: "12",
			rx: "11",
			ry: "3.5",
			transform: "rotate(-22 12 12)"
		})]
	});
}
function qi({ label: e, size: n = "md", healthy: r = !1, motion: i = !0, destinations: a, onSelect: s, live: c = !1, showActivity: l = !0, blockedReason: u, emptyMessage: d = "No other tenants are available for your account.", resetKey: f, avatarColor: p = "var(--color-primary-bg)", avatarForeground: m = "var(--color-primary-fg)", triggerLabel: h, dialogLabel: g = "Switch tenant", errorFallback: _ = "Could not switch workspace. Try again.", className: v, "data-testid": y = "tenant-switcher" }) {
	let [b, x] = X(!1), [S, w] = X(!1), [T, E] = X(""), D = Y(null), O = Y(null), k = Y(void 0), A = et(), j = u != null && u !== !1, M = () => {
		clearTimeout(k.current), x(!1), E("");
	};
	q(() => () => clearTimeout(k.current), []), q(() => {
		M(), w(!1);
	}, [f]), q(() => {
		if (!b) return;
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
	}, [b]);
	let N = async (e) => {
		if (!(S || j)) {
			w(!0), E("");
			try {
				await s(e);
			} catch (e) {
				E(e instanceof Error && e.message ? e.message : _), w(!1);
			}
		}
	};
	return /* @__PURE__ */ $("div", {
		ref: D,
		className: t("tenant-switcher relative z-[60] min-w-0 max-w-full shrink-0", v),
		"data-testid": y,
		onPointerEnter: (e) => {
			e.pointerType === "mouse" && (clearTimeout(k.current), k.current = setTimeout(() => x(!0), Ui));
		},
		onPointerLeave: () => {
			clearTimeout(k.current), D.current?.contains(document.activeElement) || (k.current = setTimeout(M, Wi));
		},
		onBlur: (e) => {
			e.currentTarget.contains(e.relatedTarget) || M();
		},
		onKeyDown: (e) => {
			e.key === "Escape" && (e.preventDefault(), M(), O.current?.focus()), e.key === "ArrowDown" && e.target === O.current && (e.preventDefault(), x(!0), requestAnimationFrame(() => D.current?.querySelector("[role=\"dialog\"] button")?.focus()));
		},
		children: [/* @__PURE__ */ $("button", {
			"data-ui-part": "",
			ref: O,
			type: "button",
			className: t("tenant-switcher-trigger flex min-w-0 max-w-full cursor-pointer items-center gap-2 rounded-lg border-0 bg-transparent px-1 py-0.5 font-[inherit] text-text-primary", "hover:bg-surface-hover aria-expanded:bg-surface-hover", "focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-primary"),
			"aria-label": h ?? `${e}: switch tenant`,
			"aria-haspopup": "dialog",
			"aria-expanded": b,
			"aria-controls": b ? A : void 0,
			"data-testid": `${y}-trigger`,
			onClick: () => {
				clearTimeout(k.current), x(!0);
			},
			children: [/* @__PURE__ */ $("span", {
				className: t("tenant-brand-planet relative grid shrink-0 place-items-center text-text-secondary", n === "sm" ? "size-[22px]" : "size-[26px]"),
				"aria-hidden": "true",
				children: [/* @__PURE__ */ Q(Ki, { compact: n === "sm" }), r && /* @__PURE__ */ Q("span", {
					className: t("tenant-brand-orbit pointer-events-none absolute inset-0 [transform:rotate(12deg)]", i && "animate-[tenant-orbit-plane_40s_ease-in-out_infinite] motion-reduce:animate-none"),
					"aria-hidden": "true",
					"data-motion": i ? "on" : "off",
					children: /* @__PURE__ */ Q("span", { className: t("absolute left-[calc(50%-2px)] top-[calc(50%-2px)] size-1 rounded-full bg-success shadow-[0_0_0_1px_var(--color-surface)] [transform:translate(12px,7px)]", i && "animate-[tenant-orbit_5s_linear_infinite] motion-reduce:animate-none") })
				})]
			}), /* @__PURE__ */ Q(H, {
				size: n === "sm" ? "sm" : "base",
				weight: n === "sm" ? "medium" : "bold",
				className: t("tenant-brand-label min-w-0 truncate", n === "sm" ? "leading-5" : "leading-[22px]"),
				children: e
			})]
		}), b && /* @__PURE__ */ Q("div", {
			id: A,
			role: "dialog",
			"aria-label": g,
			"data-testid": `${y}-panel`,
			className: t("tenant-switcher-panel absolute left-0 top-[calc(100%+8px)] w-[min(224px,calc(100vw-32px))] rounded-xl border border-border bg-surface p-1.5 shadow-lg", "before:absolute before:inset-x-0 before:-top-2.5 before:h-2.5 before:content-['']"),
			children: /* @__PURE__ */ $(V, {
				gap: "sm",
				children: [
					T && /* @__PURE__ */ Q(De, {
						tone: "error",
						children: T
					}),
					j && /* @__PURE__ */ Q(H, {
						as: "p",
						size: "xs",
						tone: "secondary",
						className: "m-0",
						children: u
					}),
					a.length > 0 && /* @__PURE__ */ Q(V, {
						gap: "none",
						className: "tenant-destinations",
						children: a.map((e) => {
							let n = Math.max(0, e.unread ?? 0), r = Gi(n, c);
							return /* @__PURE__ */ $(z, {
								role: "group",
								gap: "none",
								align: "center",
								wrap: !1,
								className: "tenant-destination rounded-md hover:bg-surface-hover focus-within:bg-surface-hover",
								"aria-label": n > 0 ? `${e.label}, ${n} unread notifications` : e.label,
								"data-testid": `${y}-destination-${e.id}`,
								children: [/* @__PURE__ */ $(o, {
									variant: "ghost",
									size: "sm",
									className: t("tenant-destination-action h-[38px] min-w-0 flex-1 justify-start gap-2 border-0 bg-transparent px-2 py-1.5", "enabled:hover:bg-transparent focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary"),
									"aria-label": e.label,
									disabled: S || j,
									onClick: () => void N(e.id),
									children: [/* @__PURE__ */ Q("span", {
										"aria-hidden": "true",
										"data-tenant": e.id,
										children: /* @__PURE__ */ Q(Ce, {
											name: e.label,
											initials: e.initials ?? e.label.slice(0, 2),
											size: 24,
											color: p,
											foreground: m,
											showTitle: !1
										})
									}), /* @__PURE__ */ Q(H, {
										size: "sm",
										weight: "semibold",
										children: e.label
									})]
								}), l && /* @__PURE__ */ Q(W, {
									content: r,
									placement: "right",
									children: /* @__PURE__ */ Q("span", {
										tabIndex: 0,
										role: "img",
										"aria-label": `${e.label}: ${r}`,
										className: t("tenant-activity mr-2 inline-flex h-[30px] min-w-6 items-center justify-end gap-1 rounded-sm px-0.5 text-text-tertiary", "focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary", n > 0 && "tenant-activity-unread text-primary"),
										"data-status": n > 0 ? "unread" : c ? "empty" : "unavailable",
										children: n > 0 ? /* @__PURE__ */ $(Z, { children: [/* @__PURE__ */ Q(L, {
											size: 14,
											"aria-hidden": "true"
										}), /* @__PURE__ */ Q("span", {
											className: "tenant-unread text-xs font-semibold tabular-nums",
											"aria-hidden": "true",
											children: n
										})] }) : /* @__PURE__ */ Q(C, {
											size: 14,
											"aria-hidden": "true"
										})
									})
								})]
							}, e.id);
						})
					}),
					a.length === 0 && /* @__PURE__ */ Q(H, {
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
function Ji({ attached: e, onToggle: n, labels: r = {
	add: "Add",
	added: "Added"
}, size: i = "md", tabIndex: a, className: o, "aria-label": s, "data-testid": c = "attach-toggle" }) {
	return /* @__PURE__ */ $("button", {
		"data-ui-part": "",
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
		children: [e ? /* @__PURE__ */ Q(A, { size: i === "sm" ? 14 : 16 }) : /* @__PURE__ */ Q(I, { size: i === "sm" ? 14 : 18 }), e ? r.added : r.add]
	});
}
//#endregion
//#region src/components/shared/DocumentResultList.tsx
function Yi(e, t = Date.now()) {
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
function Xi({ items: e, currentId: n, onCurrentChange: i, onOpen: a, onToggleAttach: o, draggable: s = !0, onDragStartItem: c, rowMenu: l, rowTrailing: u, emptyState: d, now: f, toggleLabels: p, "aria-label": m = "Documents", className: h, "data-testid": g = "document-result-list" }) {
	let _ = Y(/* @__PURE__ */ new Map()), v = f ?? Date.now(), y = e.some((e) => e.id === n) ? n : e[0]?.id, b = G((t) => {
		let n = e[Math.max(0, Math.min(e.length - 1, t))];
		n && (_.current.get(n.id)?.focus(), i?.(n.id));
	}, [e, i]), x = (t, n, r) => {
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
	return e.length ? /* @__PURE__ */ Q("ul", {
		"aria-label": m,
		"data-testid": g,
		className: t("m-0 flex list-none flex-col p-0", h),
		children: e.map((e, d) => {
			let f = e.id === n, m = e.id === y, h = Yi(e.updatedAt, v), g = l?.(e), b = u?.(e) ?? e.trailing ?? null;
			return /* @__PURE__ */ $("li", {
				"data-testid": "document-result-row",
				"data-id": e.id,
				"data-current": f || void 0,
				className: t("group relative flex items-center gap-4 border-b border-border-subtle pl-4 pr-3 transition-colors duration-100", f ? "bg-primary-bg" : "hover:bg-surface-hover"),
				children: [
					f && /* @__PURE__ */ Q("span", {
						"aria-hidden": "true",
						className: "absolute inset-y-0 left-0 w-[3px] rounded-r bg-primary"
					}),
					/* @__PURE__ */ $("div", {
						ref: (t) => {
							t ? _.current.set(e.id, t) : _.current.delete(e.id);
						},
						role: "link",
						tabIndex: m ? 0 : -1,
						"aria-current": f || void 0,
						draggable: s,
						onDragStart: s ? (t) => {
							r(t.dataTransfer, [{
								id: e.id,
								title: e.title,
								kind: e.kind
							}]), c?.(e, t.dataTransfer);
						} : void 0,
						onClick: () => a(e),
						onFocus: () => {
							e.id !== n && i?.(e.id);
						},
						onKeyDown: (t) => x(t, d, e),
						className: "flex min-w-0 flex-1 cursor-pointer items-center gap-[18px] py-2.5 outline-none focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary",
						children: [/* @__PURE__ */ Q(Je, {
							kind: e.kind,
							variant: "app",
							size: "xl"
						}), /* @__PURE__ */ $("span", {
							className: "flex min-w-0 flex-col gap-0.5",
							children: [
								/* @__PURE__ */ Q("span", {
									className: "truncate text-sm font-semibold leading-snug text-text-primary",
									children: e.title
								}),
								e.summary && /* @__PURE__ */ Q("span", {
									className: "truncate text-sm leading-snug text-text-secondary",
									children: e.summary
								}),
								(e.folder || h) && /* @__PURE__ */ $("span", {
									className: "flex min-w-0 items-center gap-1.5 text-sm leading-snug text-text-tertiary",
									children: [
										e.folder && /* @__PURE__ */ Q(N, {
											size: 15,
											className: "shrink-0"
										}),
										e.folder && /* @__PURE__ */ Q("span", {
											className: "truncate",
											children: e.folder
										}),
										e.folder && h && /* @__PURE__ */ Q("span", {
											"aria-hidden": "true",
											children: "·"
										}),
										h && /* @__PURE__ */ Q("span", {
											className: "shrink-0",
											children: h
										})
									]
								})
							]
						})]
					}),
					b != null && b !== !1 && /* @__PURE__ */ Q("span", {
						className: "flex max-h-8 shrink-0 items-center",
						"data-testid": "document-result-trailing",
						children: b
					}),
					o && /* @__PURE__ */ Q(Ji, {
						attached: !!e.attached,
						onToggle: () => o(e),
						labels: p,
						tabIndex: m ? 0 : -1,
						"aria-label": `${e.attached ? "Remove" : "Add"} ${e.title}`,
						className: t(!e.attached && !f && "opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 focus-visible:opacity-100")
					}),
					g && g.length > 0 && /* @__PURE__ */ Q("span", {
						className: "shrink-0 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100",
						children: /* @__PURE__ */ Q(be, {
							trigger: /* @__PURE__ */ Q(w, { size: 16 }),
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
	}) : /* @__PURE__ */ Q(Z, { children: d ?? null });
}
//#endregion
//#region src/components/shared/FilePickerButton.tsx
function Zi({ onFiles: e, accept: n, multiple: r = !1, variant: i = "secondary", size: a = "md", icon: o, disabled: s, children: c, className: l, "aria-label": u, "data-testid": d = "file-picker-button" }) {
	let f = Y(null);
	return /* @__PURE__ */ $(Z, { children: [/* @__PURE__ */ $("button", {
		"data-ui-part": "",
		type: "button",
		disabled: s,
		"aria-label": u,
		"data-testid": d,
		"data-size": a === "sm" ? "sm" : void 0,
		onClick: () => f.current?.click(),
		className: t("inline-flex cursor-pointer items-center gap-2 rounded-lg text-sm font-medium transition-colors duration-100", a === "sm" ? "h-8 px-3" : "h-9 px-3.5", "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-50", i === "primary" ? "border-none bg-primary text-on-primary hover:bg-primary-hover" : "border border-border bg-surface text-text-primary hover:bg-surface-hover", l),
		children: [o, c]
	}), /* @__PURE__ */ Q("input", {
		"data-ui-part": "",
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
var Qi = (e) => e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
function $i(e, t) {
	let n = Array.from(new Set(t.map((e) => e.trim()).filter(Boolean))).sort((e, t) => t.length - e.length).map((e) => Qi(e).replace(/\s+/g, "\\s+"));
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
function ea({ text: e, terms: n, className: r, markClassName: i, "data-testid": a }) {
	let o = $i(e, n);
	return /* @__PURE__ */ Q("span", {
		className: r,
		"data-testid": a,
		children: o.map((e, n) => e.match ? /* @__PURE__ */ Q("mark", {
			className: t("rounded-sm bg-primary-bg px-0.5 text-inherit [box-decoration-break:clone]", i),
			children: e.text
		}, n) : /* @__PURE__ */ Q(Ze, { children: e.text }, n))
	});
}
//#endregion
//#region src/components/shared/PersonPicker.tsx
var ta = {
	sm: 18,
	md: 20
};
function na({ people: e, value: t, onChange: n, placeholder: r = "Search people", emptyMessage: i = "Nobody matches", maxOptions: a = 50, size: o = "md", loading: s = !1, disabled: c, onQueryChange: l, className: u, ...d }) {
	let f = ta[o], p = e.map((e) => ({
		value: e.id,
		label: e.name,
		...e.tag ? { meta: e.tag } : {},
		...e.detail ? { description: e.detail } : {},
		...e.disabled ? { disabled: !0 } : {},
		leading: /* @__PURE__ */ Q(Ce, {
			name: e.name,
			src: e.avatarUrl,
			size: f,
			showTitle: !1
		})
	})), m = e.find((e) => e.id === t);
	return /* @__PURE__ */ Q(ae, {
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
		leading: m ? /* @__PURE__ */ Q(Ce, {
			name: m.name,
			src: m.avatarUrl,
			size: f,
			showTitle: !1
		}) : void 0
	});
}
//#endregion
//#region src/components/shared/dataAccent.tsx
var ra = [
	1,
	2,
	3,
	4,
	5,
	6,
	7,
	8
];
function ia(e) {
	return e === void 0 || e === "" ? {} : typeof e == "number" ? { "data-accent": String(e) } : { style: { "--data-accent": e } };
}
function aa({ accent: e, className: n, "data-testid": r }) {
	return /* @__PURE__ */ Q("span", {
		"aria-hidden": !0,
		"data-testid": r,
		...ia(e),
		className: t("block w-[5px] shrink-0 self-stretch bg-[var(--data-accent,var(--color-text-tertiary))]", n)
	});
}
//#endregion
//#region src/components/shared/Histogram.tsx
var oa = 100, sa = 3;
function ca({ buckets: e, labels: n, accent: r, height: i = 48, className: a, "aria-label": o, "data-testid": s }) {
	let c = Math.max(e.length, 1), l = Math.max(...e, 1), u = (oa - sa * (c - 1)) / c, d = e.map((e, t) => `${n?.[t] ?? t + 1}: ${e}`).join(" | ");
	return /* @__PURE__ */ $("svg", {
		role: "img",
		"aria-label": o ?? `Distribution — ${d}`,
		"data-testid": s,
		viewBox: `0 0 ${oa} ${i}`,
		preserveAspectRatio: "none",
		height: i,
		width: "100%",
		...ia(r),
		className: t("block w-full", a),
		children: [/* @__PURE__ */ Q("title", { children: d }), e.map((e, t) => {
			let n = e / l, r = Math.max(2, Math.round(n * i));
			return /* @__PURE__ */ Q("rect", {
				"data-testid": s ? `${s}-bar-${t}` : void 0,
				x: t * (u + sa),
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
function la(e) {
	return {
		hidden: !1,
		dimmed: !1,
		paused: !1,
		quiet: !1,
		speed: "slow",
		categories: [...e]
	};
}
function ua(e, t) {
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
		return la(t);
	}
}
function da(e) {
	return e.count > 1 && !e.paused && !e.quiet && !e.engaged && !e.reducedMotion && e.pageVisible && !e.activeCall;
}
//#endregion
//#region src/components/shared/ActivityTicker.tsx
function fa(e) {
	let [t, n] = X(() => typeof window < "u" && window.matchMedia(e).matches);
	return q(() => {
		let t = window.matchMedia(e), r = () => n(t.matches);
		return r(), t.addEventListener("change", r), () => t.removeEventListener("change", r);
	}, [e]), t;
}
function pa(e, t) {
	try {
		return ua(e ? localStorage.getItem(e) : null, t);
	} catch {
		return ua(null, t);
	}
}
function ma(e) {
	return /* @__PURE__ */ Q(ha, { ...e }, e.preferencesKey ?? "unpersisted");
}
function ha({ items: e, categories: t, placement: n = "footer", onPlacementChange: r, onMoveStart: i, onMoveEnd: a, sample: s = !1, activeCall: c = !1, preferencesKey: l = null, preferences: u, onPreferencesChange: d, preferencesHint: f, renderActions: p, "data-testid": m = "activity-ticker" }) {
	let h = t.map((e) => e.id), [g, _] = X(() => pa(l, h)), v = u ?? g, [b, C] = X(0), [w, T] = X(!1), [O, k] = X(!1), [A, N] = X(null), [F, I] = X(() => typeof document > "u" || !document.hidden), z = Y(null), B = Y(null), H = Y(null), te = Y(void 0), re = Y(null), ie = Y(!1), [U, ae] = X(null), se = et(), ce = fa("(prefers-reduced-motion: reduce)"), le = fa("(max-width: 1100px)") || c, ue = e.filter((e) => v.categories.includes(e.category)), de = ue[b % Math.max(ue.length, 1)], fe = w || O || A !== null, pe = s ? "sample " : "", me = s ? "Sample " : "";
	q(() => {
		if (!(!l || u)) try {
			localStorage.setItem(l, JSON.stringify(v));
		} catch {}
	}, [
		l,
		v,
		u
	]), q(() => {
		let e = () => I(typeof document > "u" || !document.hidden);
		return document.addEventListener("visibilitychange", e), () => document.removeEventListener("visibilitychange", e);
	}, []);
	let he = !v.hidden && da({
		paused: v.paused,
		quiet: v.quiet,
		engaged: fe,
		reducedMotion: ce,
		pageVisible: F,
		activeCall: c,
		count: ue.length
	});
	q(() => {
		if (!he) return;
		let e = setInterval(() => C((e) => e + 1), v.speed === "fast" ? 6e3 : 12e3);
		return () => clearInterval(e);
	}, [he, v.speed]), q(() => () => clearTimeout(te.current), []), tt(() => {
		if (!fe || v.hidden) {
			ae(null);
			return;
		}
		let e = () => {
			let e = B.current?.getBoundingClientRect();
			e && ae({
				left: Math.max(8, Math.min(e.left, window.innerWidth - 220)),
				...e.top >= 48 ? { bottom: window.innerHeight - e.top } : { top: e.bottom }
			});
		};
		return e(), window.addEventListener("resize", e), window.addEventListener("scroll", e, !0), () => {
			window.removeEventListener("resize", e), window.removeEventListener("scroll", e, !0);
		};
	}, [
		fe,
		v.hidden,
		le
	]);
	function ge() {
		clearTimeout(te.current), T(!0);
	}
	function _e() {
		clearTimeout(te.current), te.current = setTimeout(() => T(!1), 150);
	}
	function ve(e) {
		k(e instanceof Node && (!!z.current?.contains(e) || !!H.current?.contains(e)));
	}
	function ye(e) {
		let t = {
			...v,
			...e
		};
		_(t), d?.(t);
	}
	tt(() => {
		ie.current && (ie.current = !1, (v.hidden ? re.current : B.current)?.focus());
	}, [v.hidden]);
	function be() {
		ie.current = !0, ye({ hidden: !0 }), N(null), T(!1), k(!1);
	}
	return /* @__PURE__ */ $("div", {
		ref: z,
		className: "activity-ticker",
		"data-compact": le || void 0,
		"data-call": c || void 0,
		"data-hidden": v.hidden || void 0,
		"data-testid": m,
		"data-placement": n,
		onMouseEnter: ge,
		onMouseLeave: _e,
		onFocusCapture: () => k(!0),
		onBlurCapture: (e) => ve(e.relatedTarget),
		children: [
			r && /* @__PURE__ */ Q(W, {
				content: `Drag Today to the ${n === "footer" ? "header" : "footer"}, or click to move it`,
				children: /* @__PURE__ */ Q(y, {
					size: "sm",
					variant: "ghost",
					icon: /* @__PURE__ */ Q(E, { size: 14 }),
					className: "shrink-0 cursor-grab active:cursor-grabbing",
					"aria-label": `Move Today strip to ${n === "footer" ? "header" : "footer"}`,
					draggable: !0,
					onDragStart: (e) => {
						e.dataTransfer.setData("text/x-activity-ticker", "today"), e.dataTransfer.effectAllowed = "move", i?.();
					},
					onDragEnd: a,
					onClick: () => r(n === "footer" ? "header" : "footer"),
					"data-testid": `${m}-move`
				})
			}),
			v.hidden ? /* @__PURE__ */ Q(W, {
				content: `Restore ${pe}Today strip`,
				children: /* @__PURE__ */ Q(y, {
					ref: re,
					"aria-label": `Restore ${pe}Today strip`,
					size: "sm",
					icon: /* @__PURE__ */ Q(S, { size: 14 }),
					onClick: () => {
						ie.current = !0, ye({ hidden: !1 });
					}
				})
			}) : /* @__PURE__ */ $(o, {
				ref: B,
				variant: "ghost",
				size: "sm",
				className: "activity-ticker-summary",
				"data-dimmed": v.dimmed || void 0,
				"aria-label": de ? `${s ? "Demo today" : "Today"}: ${de.label}. ${de.summary}` : `${s ? "Demo today: no sample" : "Today: no"} categories selected`,
				"aria-describedby": se,
				"aria-haspopup": "dialog",
				"aria-expanded": A === "detail",
				onClick: () => N((e) => e === "detail" ? null : "detail"),
				onKeyDown: (e) => {
					e.key === "ArrowUp" && (e.preventDefault(), H.current?.querySelector("button")?.focus());
				},
				children: [
					/* @__PURE__ */ Q("span", {
						"aria-hidden": "true",
						children: de?.icon ?? /* @__PURE__ */ Q(L, { size: 14 })
					}),
					s && /* @__PURE__ */ Q("span", {
						className: "activity-ticker-demo",
						children: "Demo"
					}),
					/* @__PURE__ */ Q("span", {
						className: "activity-ticker-copy",
						children: de ? /* @__PURE__ */ $(Z, { children: [/* @__PURE__ */ Q("strong", { children: de.label }), /* @__PURE__ */ $("span", {
							className: "activity-ticker-description",
							children: [" · ", de.summary]
						})] }) : "Today · No categories selected"
					})
				]
			}),
			/* @__PURE__ */ $("span", {
				id: se,
				className: "sr-only",
				children: [s ? "Sample content. " : "", "Arrow Up opens the controls. Automatic rotation pauses while focused."]
			}),
			U && !v.hidden && rt(/* @__PURE__ */ $("div", {
				ref: H,
				"data-uic-popover": "",
				role: "toolbar",
				"aria-label": `${me}Today controls`,
				className: "activity-ticker-toolbar",
				style: {
					left: U.left,
					bottom: U.bottom,
					top: U.top
				},
				onMouseEnter: ge,
				onMouseLeave: _e,
				onFocusCapture: () => k(!0),
				onBlurCapture: (e) => ve(e.relatedTarget),
				children: [
					/* @__PURE__ */ Q(W, {
						content: "Hide this strip",
						children: /* @__PURE__ */ Q(y, {
							"aria-label": `Hide ${pe}Today strip`,
							size: "sm",
							icon: /* @__PURE__ */ Q(x, { size: 14 }),
							onClick: be
						})
					}),
					/* @__PURE__ */ Q(W, {
						content: v.dimmed ? "Restore brightness" : "Dim this strip",
						children: /* @__PURE__ */ Q(y, {
							"aria-label": `Dim ${pe}Today strip`,
							"aria-pressed": v.dimmed,
							size: "sm",
							icon: /* @__PURE__ */ Q(S, { size: 14 }),
							onClick: () => ye({ dimmed: !v.dimmed })
						})
					}),
					/* @__PURE__ */ Q(W, {
						content: v.speed === "slow" ? "Slow · every 12 seconds" : "Fast · every 6 seconds",
						children: /* @__PURE__ */ Q(y, {
							"aria-label": `Rotation speed: ${v.speed}`,
							size: "sm",
							icon: /* @__PURE__ */ Q(D, { size: 14 }),
							onClick: () => ye({ speed: v.speed === "slow" ? "fast" : "slow" })
						})
					}),
					/* @__PURE__ */ Q(W, {
						content: v.paused ? `Resume ${pe}rotation` : `Pause ${pe}rotation`,
						children: /* @__PURE__ */ Q(y, {
							size: "sm",
							"aria-label": v.paused ? `Resume ${pe}rotation` : `Pause ${pe}rotation`,
							"aria-pressed": v.paused,
							icon: v.paused ? /* @__PURE__ */ Q(R, { size: 14 }) : /* @__PURE__ */ Q(ee, { size: 14 }),
							onClick: () => ye({ paused: !v.paused })
						})
					}),
					/* @__PURE__ */ Q(W, {
						content: s ? "Next sample" : "Next item",
						children: /* @__PURE__ */ Q(y, {
							"aria-label": s ? "Next sample" : "Next item",
							size: "sm",
							disabled: ue.length < 2,
							icon: /* @__PURE__ */ Q(P, {
								dir: "right",
								size: 14
							}),
							onClick: () => C((e) => e + 1)
						})
					}),
					/* @__PURE__ */ Q(W, {
						content: `${me}Today settings`,
						children: /* @__PURE__ */ Q(y, {
							"aria-label": `${me}Today settings`,
							size: "sm",
							"aria-haspopup": "dialog",
							"aria-expanded": A === "settings",
							icon: /* @__PURE__ */ Q(M, { size: 14 }),
							onClick: () => N((e) => e === "settings" ? null : "settings")
						})
					})
				]
			}), document.body),
			/* @__PURE__ */ Q(oe, {
				trigger: B,
				open: A !== null,
				onClose: () => N(null),
				placement: "bottom-start",
				"aria-label": `${me}Today ${A === "settings" ? "settings" : "details"}`,
				className: "activity-ticker-panel",
				children: /* @__PURE__ */ $(V, {
					gap: "sm",
					children: [
						/* @__PURE__ */ $("div", {
							className: "activity-ticker-panel-heading",
							children: [/* @__PURE__ */ Q(ne, {
								size: "sm",
								weight: "semibold",
								children: A === "settings" ? "Today preferences" : de?.label ?? "Today"
							}), /* @__PURE__ */ Q(y, {
								"aria-label": "Close Today panel",
								size: "sm",
								icon: /* @__PURE__ */ Q(j, { size: 14 }),
								onClick: () => N(null)
							})]
						}),
						s && /* @__PURE__ */ Q(ne, {
							size: "xs",
							tone: "secondary",
							children: "Demo · Sample content only. No live activity is connected."
						}),
						A === "settings" ? /* @__PURE__ */ $(Z, { children: [
							/* @__PURE__ */ Q(ne, {
								size: "xs",
								weight: "semibold",
								children: "Categories"
							}),
							t.map((e) => /* @__PURE__ */ $("label", {
								className: "activity-ticker-option",
								children: [/* @__PURE__ */ Q(qe, {
									checked: v.categories.includes(e.id),
									onChange: (t) => {
										ye({ categories: h.filter((n) => n === e.id ? t : v.categories.includes(n)) }), C(0);
									}
								}), e.label]
							}, e.id)),
							/* @__PURE__ */ $("label", {
								className: "activity-ticker-option",
								children: [/* @__PURE__ */ Q(qe, {
									checked: v.quiet,
									onChange: (e) => ye({ quiet: e })
								}), "Quiet rotation · manual only"]
							}),
							/* @__PURE__ */ Q(ne, {
								size: "xs",
								tone: "secondary",
								children: ce ? `Reduced motion is on. Use ${s ? "Next sample" : "Next item"} to rotate manually.` : "Rotation pauses on hover, focus, during a huddle, and while a panel is open."
							}),
							/* @__PURE__ */ Q(ne, {
								size: "xs",
								tone: "secondary",
								children: f ?? (l ? "Preferences saved on this browser." : "Preferences are not saved.")
							})
						] }) : /* @__PURE__ */ $(Z, { children: [/* @__PURE__ */ Q(ne, {
							size: "sm",
							children: de?.detail ?? "Choose a category in Today settings to show items."
						}), p?.(de, () => N(null))] })
					]
				})
			})
		]
	});
}
//#endregion
//#region src/components/layout/SplitPane.tsx
var ga = (e, t, n) => Math.min(n, Math.max(t, e));
function _a({ primary: e, secondary: n, defaultRatio: r = .55, ratio: i, onRatioChange: a, minPrimaryPx: o = 280, minSecondaryPx: s = 360, dividerLabel: c = "Resize panes", onDividerActivate: l, resizable: u = !0, primaryHidden: d = !1, className: f, "data-testid": p = "split-pane" }) {
	let m = Y(null), [h, g] = X(r), _ = i ?? h, v = Y(!1), y = G((e) => {
		let t = m.current?.getBoundingClientRect().width ?? 0, n = t > 0 ? o / t : .15, r = t > 0 ? 1 - s / t : .85, c = Math.round(ga(e, Math.min(n, r), Math.max(n, r)) * 1e3) / 1e3;
		i === void 0 && g(c), a?.(c);
	}, [
		i,
		o,
		s,
		a
	]), b = (e) => {
		v.current = !0, e.currentTarget.setPointerCapture(e.pointerId), e.preventDefault();
	}, x = (e) => {
		if (!v.current) return;
		let t = m.current?.getBoundingClientRect();
		!t || t.width === 0 || y((e.clientX - t.left) / t.width);
	}, S = (e) => {
		if (v.current) {
			v.current = !1;
			try {
				e.currentTarget.releasePointerCapture(e.pointerId);
			} catch {}
		}
	}, C = (e) => {
		let t = e.shiftKey ? .1 : .02;
		e.key === "ArrowLeft" ? (e.preventDefault(), y(_ - t)) : e.key === "ArrowRight" ? (e.preventDefault(), y(_ + t)) : e.key === "Home" ? (e.preventDefault(), y(0)) : e.key === "End" ? (e.preventDefault(), y(1)) : (e.key === "Enter" || e.key === " ") && l && (e.preventDefault(), l());
	};
	if (q(() => {
		if (!u) return;
		let e = () => y(_);
		return window.addEventListener("resize", e), () => window.removeEventListener("resize", e);
	}, [
		_,
		y,
		u
	]), n == null) return /* @__PURE__ */ Q("div", {
		ref: m,
		"data-testid": p,
		className: t("flex h-full min-h-0 min-w-0", f),
		children: /* @__PURE__ */ Q("div", {
			"data-testid": `${p}-primary`,
			className: "flex min-h-0 min-w-0 flex-1 flex-col",
			children: e
		})
	});
	let w = Math.round(_ * 1e3) / 10;
	return /* @__PURE__ */ $("div", {
		ref: m,
		"data-testid": p,
		className: t("flex h-full min-h-0 min-w-0", f),
		children: [
			/* @__PURE__ */ Q("div", {
				"data-testid": `${p}-primary`,
				hidden: d,
				className: t("min-h-0 min-w-0 flex-col", d ? "hidden" : "flex"),
				style: {
					flexBasis: `${w}%`,
					flexGrow: 0,
					flexShrink: 0
				},
				children: e
			}),
			u && /* @__PURE__ */ Q("div", {
				role: "separator",
				"aria-orientation": "vertical",
				"aria-label": c,
				"aria-valuemin": 0,
				"aria-valuemax": 100,
				"aria-valuenow": Math.round(w),
				tabIndex: 0,
				"data-testid": `${p}-divider`,
				onPointerDown: b,
				onPointerMove: x,
				onPointerUp: S,
				onPointerCancel: S,
				onKeyDown: C,
				className: "group relative z-10 -mx-1 w-2 shrink-0 cursor-col-resize select-none touch-none bg-transparent outline-none focus-visible:bg-primary/20",
				children: /* @__PURE__ */ Q("div", { className: "absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-border transition-colors group-hover:bg-primary group-focus-visible:bg-primary" })
			}),
			/* @__PURE__ */ Q("div", {
				"data-testid": `${p}-secondary`,
				className: "flex min-h-0 min-w-0 flex-1 flex-col",
				children: n
			})
		]
	});
}
//#endregion
//#region src/components/layout/SidePane.tsx
var va = {
	defaultRatio: .72,
	ratioMin: .4,
	ratioMax: .85,
	minPrimaryPx: 520,
	minSecondaryPx: 320,
	fitPrimaryPx: 840
};
function ya(e, t = va) {
	let n = e == null || e === "" ? NaN : Number(e);
	return Number.isFinite(n) ? Math.min(t.ratioMax, Math.max(t.ratioMin, n)) : t.defaultRatio;
}
function ba(e, t = !0) {
	return e === "1" || e !== "0" && t;
}
function xa(e, t = va) {
	return e == null || e >= t.fitPrimaryPx + t.minSecondaryPx;
}
function Sa(e, t, n) {
	return !n || t == null || t <= 0 ? e : 1 - Math.min(n.max, Math.max(n.min, (1 - e) * t)) / t;
}
var Ca = Qe(null);
function wa(e) {
	return e.registration?.presentation === "document" && e.width != null && e.width < Math.max(640, e.bounds.minPrimaryPx) + 600;
}
function Ta(e) {
	if (wa(e)) return 0;
	let t = e.sized ? e.ratio : Sa(e.ratio, e.width, e.registration?.widthPx);
	return e.registration?.presentation === "document" && e.width ? Math.max(Math.max(640, e.bounds.minPrimaryPx) / e.width, t) : t;
}
function Ea(e) {
	if (typeof window > "u") return null;
	try {
		return window.localStorage.getItem(e);
	} catch {
		return null;
	}
}
function Da(e, t) {
	try {
		window.localStorage.setItem(e, t);
	} catch {}
}
function Oa({ storageKey: e = "uic.side-pane", defaultOpen: t = !0, bounds: n, children: r }) {
	let i = `${e}.open`, a = `${e}.folded`, o = (t) => t === "page" ? `${e}.ratio` : `${e}.ratio.${t}`, s = J(() => ({
		...va,
		...n ?? {}
	}), [
		n?.defaultRatio,
		n?.ratioMin,
		n?.ratioMax,
		n?.minPrimaryPx,
		n?.minSecondaryPx,
		n?.fitPrimaryPx
	]), [c] = X(() => {
		if (typeof document > "u") return null;
		let e = document.createElement("div");
		return e.className = "flex h-full min-h-0 flex-col", e;
	}), [l, u] = X(null), d = G((e) => (u(e), () => u((t) => t === e ? null : t)), []), [f, p] = X(() => ba(Ea(i), t)), [m, h] = X(() => Ea(a) === "1"), g = l?.paneId ?? "page", [_, v] = X({}), y = g in _ ? null : Ea(o(g)), b = g in _ ? _[g] : y == null || y === "" ? null : ya(y, s), x = b != null, S = b ?? s.defaultRatio, [C, w] = X(!1), [T, E] = X(null), D = xa(T, s);
	q(() => {
		w(!1);
	}, [D]);
	let O = !!l?.onClose, k = l?.presentation === "document", A = !!l && (f || O) && (D || C || k), j = Y(null), M = Y(k);
	M.current = k;
	let N = G(() => {
		document.activeElement instanceof HTMLElement && (j.current = document.activeElement), p(!0), Da(i, "1"), w(!0), h(!1), Da(a, "0");
	}, [i, a]), P = G(() => {
		p(!1), Da(i, "0"), w(!1), M.current && requestAnimationFrame(() => {
			j.current?.isConnected && j.current.focus({ preventScroll: !0 });
		});
	}, [i]), F = G(() => h((e) => (Da(a, e ? "0" : "1"), !e)), [a]), I = G((e) => {
		let t = Math.min(s.ratioMax, Math.max(s.ratioMin, e));
		v((e) => ({
			...e,
			[g]: t
		})), Da(o(g), String(t));
	}, [
		s.ratioMax,
		s.ratioMin,
		g,
		e
	]), L = J(() => ({
		node: c,
		registration: l,
		register: d,
		open: f || O,
		shown: A,
		fits: D,
		ratio: S,
		width: T,
		bounds: s,
		sized: x,
		folded: m,
		setWidth: E,
		setRatio: I,
		reveal: N,
		collapse: P,
		toggleFolded: F
	}), [
		c,
		l,
		d,
		f,
		O,
		A,
		D,
		S,
		T,
		s,
		x,
		m,
		I,
		N,
		P,
		F
	]);
	return /* @__PURE__ */ Q(Ca.Provider, {
		value: L,
		children: r
	});
}
var ka = {
	fits: !0,
	registered: !1,
	asked: !1,
	shown: !1,
	explored: !1,
	reveal: () => {},
	collapse: () => {},
	folded: !1,
	toggleFolded: () => {},
	paneWidthPx: 0
};
function Aa() {
	let e = K(Ca);
	return J(() => {
		if (!e) return ka;
		let t = !!e.registration, n = t && e.open, r = Ta(e), i = !e.shown || e.folded ? 0 : e.width == null ? null : Math.round((1 - r) * e.width);
		return {
			fits: e.fits,
			registered: t,
			asked: n,
			shown: e.shown,
			explored: n && !!e.registration?.explores,
			reveal: e.reveal,
			collapse: e.collapse,
			folded: e.folded,
			toggleFolded: e.toggleFolded,
			paneWidthPx: i
		};
	}, [e]);
}
function ja() {
	return K(Ca) != null;
}
function Ma() {
	let e = K(Ca), t = e?.node ?? null, n = !!e?.shown, r = e?.reveal;
	return J(() => ({
		visible: n,
		reveal: r ?? (() => {}),
		attached: () => !!t?.isConnected
	}), [
		n,
		r,
		t
	]);
}
function Na({ children: e, before: n, after: r, paneTestId: i = "side-pane", dividerLabel: a = "Resize page and pane", className: o, "data-testid": c = "side-pane-split" }) {
	let l = K(Ca), [u, d] = X(null), f = l.setWidth;
	tt(() => {
		if (!u) return;
		let e = () => {
			let e = u.getBoundingClientRect().width;
			f(e > 0 ? e : null);
		};
		if (e(), typeof ResizeObserver > "u") return;
		let t = new ResizeObserver(e);
		return t.observe(u), () => t.disconnect();
	}, [u, f]);
	let [p, m] = X(null), { node: h, registration: g } = l, _ = l.shown;
	tt(() => {
		h && (_ && p ? h.parentElement !== p && p.appendChild(h) : h.remove());
	}, [
		h,
		p,
		_
	]);
	let v = n != null || r != null, b = g?.title ?? "", x = _ && g ? /* @__PURE__ */ Q(s, {
		density: "compact",
		children: /* @__PURE__ */ Q(Ye, {
			titleAs: wa(l) ? "h1" : void 0,
			title: g.title,
			...g.subtitle ? { subtitle: g.subtitle } : {},
			closeLabel: g.closeLabel ?? `Collapse ${g.title.toLowerCase()}`,
			onClose: g.onClose ?? l.collapse,
			actions: /* @__PURE__ */ Q(W, {
				content: `Minimize ${b.toLowerCase()} to the edge`,
				placement: "bottom",
				children: /* @__PURE__ */ Q(y, {
					"aria-label": `Minimize ${b.toLowerCase()}`,
					"aria-expanded": !0,
					onClick: l.toggleFolded,
					icon: /* @__PURE__ */ Q(P, {
						dir: "right",
						size: 14
					}),
					"data-testid": `${i}-minimize`
				})
			}),
			className: "min-h-0 flex-1 border-l border-border bg-surface",
			"data-testid": i,
			children: /* @__PURE__ */ Q("div", {
				ref: m,
				className: "flex h-full min-h-0 flex-col",
				"data-testid": `${i}-slot`
			})
		})
	}) : null, S = l.folded && (_ || v), C = S ? null : x || v ? x && !v ? x : /* @__PURE__ */ $("div", {
		className: "flex h-full min-h-0 flex-col bg-surface",
		"data-testid": `${c}-stack`,
		children: [
			n,
			x,
			r
		]
	}) : null, w = _ && !S && wa(l), T = _ ? Ta(l) : l.ratio;
	return /* @__PURE__ */ $("div", {
		ref: d,
		className: t("flex h-full min-h-0 min-w-0 flex-row", o),
		children: [/* @__PURE__ */ Q("div", {
			className: "flex h-full min-h-0 min-w-0 flex-1 flex-col",
			children: /* @__PURE__ */ Q(_a, {
				primary: e,
				secondary: C,
				ratio: T,
				onRatioChange: l.setRatio,
				primaryHidden: w,
				resizable: !w,
				onDividerActivate: l.toggleFolded,
				minPrimaryPx: l.bounds.minPrimaryPx,
				minSecondaryPx: l.bounds.minSecondaryPx,
				dividerLabel: a,
				className: "h-full min-h-0",
				"data-testid": c
			})
		}), S && /* @__PURE__ */ Q("aside", {
			"aria-label": `${b || "Side pane"} (minimized)`,
			className: "flex w-11 min-w-11 shrink-0 flex-col items-center border-l border-border bg-surface py-1.5",
			"data-testid": `${i}-strip`,
			children: /* @__PURE__ */ Q(W, {
				content: `Restore ${b.toLowerCase() || "the pane"}`,
				placement: "left",
				children: /* @__PURE__ */ Q(y, {
					variant: "ghost",
					"aria-label": `Restore ${b.toLowerCase() || "the pane"}`,
					"aria-expanded": !1,
					onClick: l.toggleFolded,
					icon: /* @__PURE__ */ Q(P, {
						dir: "left",
						size: 14
					}),
					"data-testid": `${i}-restore`
				})
			})
		})]
	});
}
function Pa(e) {
	return K(Ca) ? /* @__PURE__ */ Q(Na, { ...e }) : /* @__PURE__ */ Q(Oa, { children: /* @__PURE__ */ Q(Na, { ...e }) });
}
function Fa({ tabs: e, value: t, onValueChange: n, trailing: r, label: i = "Pane sections", "data-testid": a = "pane-header" }) {
	return /* @__PURE__ */ $("div", {
		className: "flex shrink-0 flex-wrap items-center justify-between gap-x-3 gap-y-1 min-h-11 py-1.5 border-b border-border pl-1 pr-[var(--ui-content-gutter,1rem)]",
		"data-testid": a,
		children: [/* @__PURE__ */ Q(B, {
			size: "md",
			variant: "underline",
			indicator: "bar",
			"aria-label": i,
			className: "min-w-0 max-w-full shrink-0 after:hidden",
			overflowBelow: 360,
			items: [...e],
			value: t,
			onValueChange: n
		}), r && /* @__PURE__ */ Q("div", {
			className: "ml-auto flex min-h-12 min-w-0 flex-wrap items-center justify-end gap-1 py-1",
			"data-testid": `${a}-actions`,
			children: r
		})]
	});
}
function Ia({ title: e, subtitle: t, closeLabel: n, onClose: r, widthPx: i, paneId: a, explores: o = !1, presentation: c, tabs: l, value: u, onValueChange: d, trailing: f, footer: p, density: m = "compact", children: h, "data-testid": g = "side-pane-content" }) {
	let _ = K(Ca), v = _?.register, y = Y(r);
	y.current = r;
	let b = !!r, x = i?.min, S = i?.max;
	if (q(() => v?.({
		title: e,
		...t ? { subtitle: t } : {},
		...n ? { closeLabel: n } : {},
		...a ? { paneId: a } : {},
		explores: o,
		presentation: c,
		...b ? { onClose: () => y.current?.() } : {},
		...x != null && S != null ? { widthPx: {
			min: x,
			max: S
		} } : {}
	}), [
		v,
		e,
		t,
		n,
		a,
		o,
		c,
		b,
		x,
		S
	]), !_?.node) return null;
	let C = l && l.length > 0 && u != null && d ? /* @__PURE__ */ Q(Fa, {
		tabs: l.map((e) => ({
			...e,
			testId: e.testId ?? `${g}-tab-${e.id}`
		})),
		value: u,
		onValueChange: d,
		...f ? { trailing: f } : {},
		"data-testid": `${g}-header-row`
	}) : null;
	return rt(/* @__PURE__ */ Q(s, {
		value: m,
		children: /* @__PURE__ */ $("div", {
			className: "flex h-full min-h-0 min-w-0 flex-col",
			"data-ui-pane": "side",
			"data-testid": g,
			children: [
				C,
				/* @__PURE__ */ Q("div", {
					className: "flex min-h-0 min-w-0 flex-1 flex-col",
					children: h
				}),
				p != null && /* @__PURE__ */ Q("div", {
					className: "shrink-0 min-w-0",
					"data-testid": `${g}-footer`,
					children: p
				})
			]
		})
	}), _.node);
}
//#endregion
//#region src/components/work/ScopeHeader.tsx
var La = {
	warning: f.warning,
	danger: f.danger,
	info: f.info
}, Ra = {
	warning: "needs attention",
	danger: "has a problem",
	info: "has updates"
};
function za(e) {
	if (e > 0 && e < .01) return "<$0.01";
	let t = e >= 1e3 ? 0 : 2;
	return `$${e.toLocaleString("en-US", {
		minimumFractionDigits: t,
		maximumFractionDigits: t
	})}`;
}
function Ba(e) {
	return e.variant === "crumbs" ? /* @__PURE__ */ Q(eo, { ...e }) : e.variant === "inline" ? /* @__PURE__ */ Q(oo, { ...e }) : /* @__PURE__ */ Q(so, { ...e });
}
function Va({ controls: e, link: n, menu: r, menuLabel: i, title: a, testId: o, linkStyle: s = "inline", controlsMode: c = "fixed", controlsMenu: l, controlsLabel: u = "Filters", ghost: d = !1 }) {
	let f = e != null && e !== !1, p = c === "collapsed" && !!l && l.some((e) => e.items.length > 0), m = [...p ? l.filter((e) => e.items.length > 0).map((e, t) => t === 0 && !e.label ? {
		...e,
		label: u
	} : e) : [], ...r ?? []], h = m.some((e) => e.items.length > 0);
	return /* @__PURE__ */ $(Z, { children: [
		f && c !== "collapsed" && /* @__PURE__ */ Q("div", {
			className: t("flex items-center gap-2", c === "shrink" ? "min-w-0 shrink flex-nowrap overflow-hidden whitespace-nowrap [&_*]:whitespace-nowrap [&>*]:shrink-0 [&>*]:flex-nowrap [&>*>*]:shrink-0" : "shrink-0"),
			"data-scope-controls": "",
			"data-testid": `${o}-controls`,
			children: e
		}),
		f && c === "collapsed" && !p && /* @__PURE__ */ Q(Ha, {
			label: u,
			testId: o,
			children: e
		}),
		f && c === "collapsed" && d && /* @__PURE__ */ Q("div", {
			"aria-hidden": "true",
			inert: !0,
			"data-scope-controls-ghost": "",
			className: "pointer-events-none invisible absolute right-0 top-0 h-0 w-0 overflow-hidden",
			children: /* @__PURE__ */ Q("div", {
				className: "flex w-max flex-nowrap items-center gap-2 whitespace-nowrap [&_*]:whitespace-nowrap [&>*]:shrink-0 [&>*]:flex-nowrap [&>*>*]:shrink-0",
				children: e
			})
		}),
		n && s === "button" && /* @__PURE__ */ $("a", {
			href: n.href,
			target: "_blank",
			rel: "noreferrer",
			"data-testid": `${o}-link`,
			"data-link-style": "button",
			className: "inline-flex h-9 min-w-0 shrink-0 items-center gap-1.5 rounded-lg border border-border bg-surface px-3.5 text-sm font-medium text-text-primary no-underline transition-colors hover:bg-surface-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
			children: [/* @__PURE__ */ Q("span", {
				className: "max-w-[16rem] truncate",
				children: n.label
			}), n.icon ?? /* @__PURE__ */ Q(O, { size: 14 })]
		}),
		n && s !== "button" && /* @__PURE__ */ $("a", {
			href: n.href,
			target: "_blank",
			rel: "noreferrer",
			"data-testid": `${o}-link`,
			className: "flex min-w-0 items-center gap-1.5 border-l border-border pl-4 text-[14px] font-medium text-primary no-underline hover:underline",
			children: [n.icon ?? /* @__PURE__ */ Q(b, { size: 14 }), /* @__PURE__ */ Q("span", {
				className: "max-w-[16rem] truncate",
				children: n.label
			})]
		}),
		h && /* @__PURE__ */ Q(be, {
			trigger: /* @__PURE__ */ Q("span", {
				"aria-hidden": "true",
				className: "text-sm leading-none",
				children: "⋯"
			}),
			triggerLabel: i ?? `Actions for ${a}`,
			triggerTestId: `${o}-menu`,
			align: "end",
			sections: m,
			triggerClassName: "h-8 w-8 shrink-0 border-transparent px-0 py-0 text-text-secondary hover:border-transparent hover:bg-surface-hover"
		})
	] });
}
function Ha({ label: e, testId: n, children: r }) {
	let [i, a] = X(!1), o = Y(null);
	return /* @__PURE__ */ $(Z, { children: [/* @__PURE__ */ $("button", {
		"data-ui-part": "",
		ref: o,
		type: "button",
		"aria-haspopup": "dialog",
		"aria-expanded": i,
		onClick: () => a((e) => !e),
		"data-testid": `${n}-controls-toggle`,
		"data-scope-controls-toggle": "",
		className: t("inline-flex h-7 shrink-0 cursor-pointer items-center gap-1 whitespace-nowrap rounded-md border border-border bg-transparent px-2.5 text-text-secondary transition-colors duration-100 hover:bg-surface-hover hover:text-text-primary", ze, i && "text-text-primary"),
		children: [e, /* @__PURE__ */ Q("span", {
			"aria-hidden": "true",
			children: "▾"
		})]
	}), /* @__PURE__ */ Q(oe, {
		trigger: o,
		open: i,
		onClose: () => a(!1),
		placement: "bottom-end",
		"aria-label": e,
		className: "p-2",
		"data-testid": `${n}-controls-popover`,
		children: /* @__PURE__ */ Q(V, {
			gap: "sm",
			align: "stretch",
			"data-testid": `${n}-controls-stack`,
			className: t("min-w-[16rem] whitespace-nowrap [&_*]:whitespace-nowrap", "[&>div:only-child:has(>*+*)]:contents", "[&>*]:shrink-0 [&>*]:justify-start [&>div:only-child>*]:shrink-0 [&>div:only-child>*]:justify-start"),
			children: r
		})
	})] });
}
var Ua = 192;
function Wa(e) {
	return parseFloat(getComputedStyle(e).minWidth) || Ua;
}
var Ga = 64, Ka = 48;
function qa(e) {
	let t = Array.from(e.querySelectorAll("[data-crumb]")), n = (e) => {
		let t = parseFloat(getComputedStyle(e).maxWidth);
		return Math.min(e.scrollWidth, Number.isFinite(t) ? t : Infinity);
	}, r = e.querySelector("h1"), i = r ? Wa(r) : 0, a = t[0] ? n(t[0]) : 0, o = t.length > 1 ? Math.min(n(t[t.length - 1]), Ka) : 0;
	return i + a + o + (t.length > 0 ? Ga : 0);
}
function Ja(e) {
	let t = parseFloat(getComputedStyle(e).maxWidth), n = Math.min(e.scrollWidth, Number.isFinite(t) ? t : Infinity), r = e.getBoundingClientRect().width, i = r > 0 ? r : e.clientWidth;
	return Math.max(0, n - i);
}
function Ya(e) {
	return Math.max(e.scrollWidth, e.offsetWidth || 0);
}
function Xa(e) {
	let t = getComputedStyle(e).position;
	return t === "absolute" || t === "fixed" || e.hasAttribute("data-scope-controls-ghost");
}
function Za(e) {
	let t = (e) => parseFloat(e) || 0, n = Array.from(e.children).filter((e) => !Xa(e)), r = 0;
	for (let e of n) e.tagName === "H1" ? r += Wa(e) : e.tagName === "NAV" ? (r += Ya(e), e.querySelectorAll("[data-crumb]").forEach((e) => {
		r += Ja(e);
	})) : r += Ya(e);
	r += t(getComputedStyle(e).columnGap) * Math.max(0, n.length - 1);
	let i = parseFloat(e.dataset.fullWidth ?? "");
	return Number.isFinite(i) ? Math.max(r, i) : r;
}
function Qa(e, t, n) {
	let r = getComputedStyle(e), i = (e) => parseFloat(e) || 0, a = Array.from(e.children).filter((e) => !Xa(e)), o = i(r.paddingLeft) + i(r.paddingRight);
	for (let e of a) if (e === t) o += Za(t);
	else if (e.getAttribute("data-testid")?.endsWith("-right")) {
		let t = Array.from(e.children).filter((e) => !Xa(e) && !e.hasAttribute("data-scope-controls") && !e.hasAttribute("data-scope-controls-toggle")), r = t.length + +(n > 0);
		o += t.reduce((e, t) => e + Ya(t), 0) + Math.max(0, n) + i(getComputedStyle(e).columnGap) * Math.max(0, r - 1);
	} else o += Ya(e);
	return o + i(r.columnGap) * Math.max(0, a.length - 1);
}
var $a = 2;
function eo({ breadcrumbs: e, title: n, controls: r, link: i, menu: a, menuLabel: o, linkStyle: s, collapsed: c = !1, onToggleCollapsed: l, className: u, "data-testid": d = "scope-header" }) {
	let f = e && e.length > 0 ? e[e.length - 1].label : void 0, p = n ?? (typeof f == "string" ? f : "this scope"), m = r != null && r !== !1 || !!i || !!a && a.some((e) => e.items.length > 0), h = c, g = h ? Fe(e, n) : e ?? [];
	return /* @__PURE__ */ $("div", {
		"data-testid": d,
		"data-variant": "crumbs",
		"data-page-trail": "",
		"data-collapsed": h ? "true" : "false",
		className: t("flex min-w-0 items-start gap-4 px-[var(--ui-page-gutter,1.5rem)] pb-1 pt-2", u),
		children: [/* @__PURE__ */ $("div", {
			className: "flex h-5 min-w-0 flex-1 items-center gap-2",
			children: [g.length > 0 && /* @__PURE__ */ Q(Oe, {
				"aria-label": `${n ?? "Scope"} location`,
				items: g,
				separator: "›",
				maxItems: 5,
				className: "min-w-0",
				"data-testid": `${d}-crumbs`
			}), h && l && /* @__PURE__ */ Q(ke, {
				collapsed: !0,
				onToggle: l,
				"data-testid": `${d}-collapse-toggle`
			})]
		}), m && /* @__PURE__ */ Q("div", {
			className: "relative z-10 -mb-[14px] ml-auto mt-3 flex shrink-0 items-center gap-4",
			"data-hang": "10",
			"data-testid": `${d}-right`,
			children: /* @__PURE__ */ Q(Va, {
				controls: r,
				link: i,
				menu: a,
				menuLabel: o,
				title: p,
				testId: d,
				linkStyle: s
			})
		})]
	});
}
function to(e, n) {
	return e.map((e) => ({
		id: e.id,
		label: e.label,
		...e.disabled ? { disabled: !0 } : {},
		...typeof e.count == "number" || e.dot ? { badge: /* @__PURE__ */ $("span", {
			className: "inline-flex items-center gap-1.5",
			children: [typeof e.count == "number" && /* @__PURE__ */ Q("span", {
				"aria-label": `${e.count} in ${e.label}`,
				children: e.count
			}), e.dot && /* @__PURE__ */ Q("span", {
				role: "img",
				"aria-label": `${e.label} ${e.dot === !0 ? "has updates" : Ra[e.dot]}`,
				"data-testid": `${n}-tab-${e.id}-dot`,
				"data-dot": e.dot === !0 ? "brand" : e.dot,
				className: t("inline-block h-2 w-2 shrink-0 rounded-full", e.dot === !0 ? "bg-primary" : La[e.dot])
			})]
		}) } : {},
		testId: `${n}-tab-${e.id}`
	}));
}
var no = t("block min-w-0 truncate whitespace-nowrap text-text-secondary transition-colors duration-100", ze), ro = "shrink-0 select-none text-[14px] leading-5 text-text-tertiary";
function io({ item: e, last: n, testId: r }) {
	let i = t(no, n ? "max-w-[15rem]" : "max-w-[10rem]"), a = {
		title: e.label,
		"data-crumb": "",
		"data-testid": `${r}-crumb`
	};
	return e.href ? /* @__PURE__ */ Q("a", {
		href: e.href,
		onClick: e.onClick,
		className: t(i, "no-underline hover:text-text-primary"),
		...a,
		children: e.label
	}) : e.onClick ? /* @__PURE__ */ Q("button", {
		"data-ui-part": "",
		type: "button",
		onClick: e.onClick,
		className: t(i, "cursor-pointer border-none bg-transparent p-0 text-left [font-family:inherit] hover:text-text-primary"),
		...a,
		children: e.label
	}) : /* @__PURE__ */ Q("span", {
		className: i,
		...a,
		children: e.label
	});
}
function ao({ crumbs: e, title: n, titleHint: r, lg: i, sm: a = !1, after: o, testId: s }) {
	let c = Y(null), [l, u] = X(!1), d = Y(Infinity), f = e.length > 2, p = e.map((e) => e.label).join("\0"), m = G(() => {
		let e = c.current;
		if (!e) return;
		if (l) {
			e.clientWidth >= d.current && (delete e.dataset.fullWidth, u(!1));
			return;
		}
		if (!f) return;
		let t = 0;
		e.querySelectorAll("[data-crumb]").forEach((e) => {
			let n = parseFloat(getComputedStyle(e).maxWidth), r = Math.min(e.scrollWidth, Number.isFinite(n) ? n : Infinity);
			e.clientWidth + 1 < r && (t += r - e.clientWidth);
		}), t > 0 && (d.current = e.clientWidth + t, e.dataset.fullWidth = String(Math.ceil(d.current)), u(!0));
	}, [l, f]);
	tt(() => {
		u(!1), d.current = Infinity, c.current && delete c.current.dataset.fullWidth;
	}, [p]), tt(() => {
		m();
		let e = c.current;
		if (!e || typeof ResizeObserver > "u") return;
		let t = new ResizeObserver(() => m());
		return t.observe(e), () => t.disconnect();
	}, [m, p]);
	let h = l && f ? e.slice(1, -1) : [], g = h.length > 0 ? [
		e[0],
		null,
		e[e.length - 1]
	] : e;
	return /* @__PURE__ */ $("div", {
		ref: c,
		className: "flex min-w-0 flex-1 flex-nowrap items-center gap-1 overflow-hidden",
		"data-testid": `${s}-trail`,
		children: [
			e.length > 0 && /* @__PURE__ */ Q("nav", {
				"aria-label": `${n ?? "Scope"} location`,
				"data-testid": `${s}-crumbs`,
				"data-collapsed": h.length > 0 ? "true" : void 0,
				className: "flex min-w-0 shrink items-center overflow-hidden",
				children: /* @__PURE__ */ Q("ol", {
					className: "m-0 flex min-w-0 list-none flex-nowrap items-center gap-1 p-0",
					children: g.map((e, n) => /* @__PURE__ */ $("li", {
						className: t("flex items-center gap-1", e && n > 0 ? "min-w-0" : "shrink-0"),
						"data-crumb-item": n === 0 ? "first" : void 0,
						children: [e ? /* @__PURE__ */ Q(io, {
							item: e,
							last: n === g.length - 1,
							testId: s
						}) : /* @__PURE__ */ Q("span", {
							className: t("shrink-0 select-none whitespace-nowrap text-text-secondary", "text-[14px] font-medium leading-5"),
							title: h.map((e) => e.label).join(" › "),
							"aria-label": `${h.length} hidden: ${h.map((e) => e.label).join(", ")}`,
							"data-testid": `${s}-crumbs-more`,
							children: "…"
						}), n < g.length - 1 && /* @__PURE__ */ Q("span", {
							"aria-hidden": "true",
							className: ro,
							children: "›"
						})]
					}, e ? `${n}-${e.label}` : "collapsed"))
				})
			}),
			e.length > 0 && n && /* @__PURE__ */ Q("span", {
				"aria-hidden": "true",
				className: ro,
				children: "›"
			}),
			n && /* @__PURE__ */ Q("h1", {
				"aria-current": "page",
				title: r ?? n,
				"data-testid": `${s}-title`,
				className: t("m-0 min-w-[12rem] flex-1 truncate whitespace-nowrap text-text-primary", a ? "text-sm font-semibold leading-5" : i ? "text-[20px] font-bold leading-7 tracking-[-0.01em]" : "text-[20px] font-semibold leading-7"),
				children: n
			}),
			o
		]
	});
}
function oo({ breadcrumbs: e, title: n, titleHint: r, controls: a, controlsMenu: o, controlsCollapseAt: s, controlsLabel: c, link: l, menu: u, menuLabel: d, linkStyle: f, tabs: p, activeTab: m, onTabChange: h, tabSize: g, titleSize: _ = "md", density: v, collapsed: y = !1, onToggleCollapsed: b, className: x, "data-testid": S = "scope-header" }) {
	let C = e ?? [], w = i(v), T = w === "compact" || y, E = y, D = C.length > 0 ? C[C.length - 1].label : void 0, O = n ?? D ?? "this scope", k = !!p && p.length > 0, A = k ? p.some((e) => e.id === m) ? m : p[0].id : void 0, j = a != null && a !== !1, M = j || !!l || !!u && u.some((e) => e.items.length > 0), N = _ === "lg", P = Y(null), [F, I] = X(!1), [L, ee] = X(!1), R = Y({
		controls: null,
		wanted: null,
		collapsedAt: 0
	}), z = Y(!1), V = Y(null), H = Y(() => {}), te = G(() => {
		let e = P.current;
		if (!e || !j) return;
		let t = e.clientWidth;
		if (t <= 0) return;
		let n = typeof s == "number" && t < s, r = e.querySelector(`[data-testid="${S}-trail"]`);
		if (F) {
			if (n) return;
			let i = R.current.controls;
			if (i == null) {
				let t = e.querySelector("[data-scope-controls-ghost] > *");
				if (!t) {
					ee(!0);
					return;
				}
				i = Ya(t), R.current.controls = i, ee(!1);
			}
			let a = Math.max(Qa(e, r, i), R.current.wanted ?? 0);
			t > R.current.collapsedAt && t >= a + $a && (z.current = !0, I(!1));
			return;
		}
		if (n) {
			R.current.collapsedAt = t, I(!0);
			return;
		}
		if (z.current && (V.current == null && typeof requestAnimationFrame == "function" ? V.current = requestAnimationFrame(() => {
			V.current = null, z.current = !1, H.current();
		}) : typeof requestAnimationFrame != "function" && (z.current = !1), z.current)) return;
		let i = e.querySelector("[data-scope-controls]"), a = e.querySelector(`[data-testid="${S}-right"]`), o = i ? Ya(i) : 0;
		o > 0 && (R.current.controls = o);
		let c = Qa(e, r, o), l = c - t, u = i ? i.scrollWidth - i.clientWidth : 0, d = a ? a.scrollWidth - a.clientWidth : 0, f = r ? qa(r) - r.clientWidth : 0;
		if (Math.max(l, u, d, f) > $a) {
			R.current.wanted = c, R.current.collapsedAt = t, I(!0);
			return;
		}
		R.current.wanted = null, R.current.collapsedAt = 0;
	}, [
		j,
		s,
		F,
		S
	]);
	return tt(() => {
		H.current = te, te();
	}, [te, L]), tt(() => {
		let e = P.current;
		if (!e || typeof ResizeObserver > "u") return;
		let t = new ResizeObserver(() => {
			z.current = !1, H.current();
		});
		return t.observe(e), () => {
			t.disconnect(), V.current != null && typeof cancelAnimationFrame == "function" && cancelAnimationFrame(V.current), V.current = null;
		};
	}, []), /* @__PURE__ */ $("div", {
		ref: P,
		"data-testid": S,
		"data-variant": "inline",
		...j ? { "data-controls": F ? "collapsed" : "inline" } : {},
		"data-title-size": _,
		"data-density": w,
		"data-collapsed": E ? "true" : "false",
		...g ? { "data-tab-size": g } : {},
		className: t("flex min-w-0 flex-nowrap items-center gap-4 px-[var(--ui-page-gutter,1.5rem)]", T ? "h-10" : "h-12", x),
		children: [
			/* @__PURE__ */ Q(ao, {
				crumbs: C,
				title: n,
				titleHint: r,
				lg: N,
				sm: T,
				testId: S,
				after: b ? /* @__PURE__ */ Q(ke, {
					collapsed: E,
					onToggle: b,
					"data-testid": `${S}-collapse-toggle`
				}) : void 0
			}),
			k && /* @__PURE__ */ Q(B, {
				items: to(p, S),
				value: A,
				onValueChange: (e) => h?.(e),
				variant: "underline",
				size: "md",
				badgeStyle: "plain",
				indicator: "bar",
				...g === "md" ? { indicatorWeight: 3 } : {},
				itemClassName: t("h-full py-0", g === "md" ? "gap-0 px-2 text-sm" : "gap-0"),
				"aria-label": `${O} views`,
				"data-testid": `${S}-tabs`,
				className: "shrink-0 items-stretch self-stretch after:hidden"
			}),
			M && /* @__PURE__ */ Q("div", {
				className: t("relative flex flex-nowrap items-center gap-3", F || E ? "shrink-0" : "min-w-0 shrink-[100]"),
				"data-testid": `${S}-right`,
				children: /* @__PURE__ */ Q(Va, {
					controls: a,
					controlsMenu: o,
					controlsLabel: c,
					controlsMode: F || E ? "collapsed" : "shrink",
					ghost: F && !E && L,
					link: l,
					menu: u,
					menuLabel: d,
					title: O,
					testId: S,
					linkStyle: f
				})
			})
		]
	});
}
function so({ breadcrumbs: e, title: n = "", status: r, progress: a, spentUsd: o, stats: s, people: c, link: l, controls: u, menu: d, menuLabel: f, tabs: p, activeTab: m, onTabChange: h, titleSize: g = "md", description: _, peopleStyle: v = "avatars", linkStyle: y = "inline", statsPlacement: b = "inline", tabSize: x, tabsRule: S = "host", descriptionSize: C = "md", density: w, collapsed: T = !1, onToggleCollapsed: E, className: D, "data-testid": O = "scope-header" }) {
	let k = i(w), A = k === "compact" || T, j = T, M = [];
	a && a.total > 0 && Number.isFinite(a.done) && M.push(/* @__PURE__ */ $("span", {
		"data-testid": `${O}-progress`,
		children: [
			a.done,
			" / ",
			a.total,
			" ",
			a.unit ?? "points",
			" ",
			a.verb ?? "delivered"
		]
	}, "progress")), typeof o == "number" && Number.isFinite(o) && M.push(/* @__PURE__ */ $("span", {
		"data-testid": `${O}-spent`,
		children: [za(o), " spent"]
	}, "spent")), (s ?? []).forEach((e, t) => {
		e && M.push(/* @__PURE__ */ Q("span", { children: e }, `stat-${t}`));
	});
	let N = (c ?? []).filter((e) => e.people.length > 0), P = !A && v === "names" && N.length > 0, F = !A && v === "inline" && N.length > 0, I = !P && !F, L = !A && g === "lg", ee = !A && b === "below", R = _ != null && _ !== !1, z = !A && R, V = M.length > 0 ? /* @__PURE__ */ Q(Ke, {
		items: M,
		size: "sm",
		tone: "secondary",
		className: t("min-w-0", ee ? "text-[15px]" : "text-[14px]"),
		"data-testid": `${O}-stats`
	}) : null, H = !!p && p.length > 0, te = H ? p.some((e) => e.id === m) ? m : p[0].id : void 0, ne = r ? /* @__PURE__ */ Q(me, {
		label: r.label,
		state: r.tone ?? "info",
		variant: A ? "text" : "label",
		className: "shrink-0",
		"data-testid": `${O}-status`
	}) : null, re = H ? /* @__PURE__ */ Q(B, {
		items: to(p, O),
		value: te,
		onValueChange: (e) => h?.(e),
		variant: "underline",
		size: A ? "sm" : "md",
		badgeStyle: "plain",
		...x === "md" ? {
			indicator: "bar",
			indicatorWeight: 3
		} : {},
		...A ? {} : x === "md" ? { itemClassName: "gap-0 pb-4 pl-1 pr-3 pt-2 text-sm" } : x === "sm" ? {} : L ? { itemClassName: "gap-0 text-sm" } : {},
		"aria-label": `${n} views`,
		className: t(S === "inset" ? "" : x === "md" ? "-mb-px after:hidden" : "-mb-px border-b-0", x === "md" && !A && "gap-7", A ? "mt-1" : F ? x === "md" ? "mt-5" : "mt-4" : L ? z || P ? "mt-5" : "mt-2" : z || P ? "mt-3" : "mt-1")
	}) : null, ie = /* @__PURE__ */ Q(Va, {
		controls: u,
		link: l,
		menu: d,
		menuLabel: f,
		title: n,
		testId: O,
		linkStyle: y
	});
	if (j) {
		let r = Fe(e, n);
		return /* @__PURE__ */ $("div", {
			"data-testid": O,
			"data-title-size": g,
			"data-density": k,
			"data-collapsed": "true",
			className: t("flex min-w-0 flex-col gap-1 px-[var(--ui-page-gutter,1.5rem)] pt-2", !H && "pb-2", D),
			children: [/* @__PURE__ */ $("div", {
				className: "flex h-7 min-w-0 items-center gap-2",
				children: [
					r.length > 0 && /* @__PURE__ */ Q(Oe, {
						"aria-label": `${n ?? "Scope"} location`,
						items: r,
						separator: "›",
						maxItems: 5,
						className: "min-w-0",
						"data-testid": `${O}-crumbs`
					}),
					ne,
					E && /* @__PURE__ */ Q(ke, {
						collapsed: !0,
						onToggle: E,
						"data-testid": `${O}-collapse-toggle`
					}),
					/* @__PURE__ */ Q("div", {
						className: "ml-auto flex shrink-0 items-center gap-3",
						children: ie
					})
				]
			}), re]
		});
	}
	return /* @__PURE__ */ $("div", {
		"data-testid": O,
		"data-title-size": g,
		"data-density": k,
		"data-collapsed": "false",
		...x ? { "data-tab-size": x } : {},
		...H && S === "inset" ? { "data-tabs-rule": "inset" } : {},
		className: t("flex min-w-0 flex-col gap-1.5 px-[var(--ui-page-gutter,1.5rem)] pt-3", A && "gap-1 pt-2", L && "gap-0 pt-4", !H && (L ? "pb-4" : A ? "pb-2" : "pb-3"), D),
		children: [
			e && e.length > 0 && /* @__PURE__ */ Q(Oe, {
				"aria-label": `${n ?? "Scope"} location`,
				items: e,
				separator: "›",
				maxItems: 5,
				className: "min-w-0",
				"data-testid": `${O}-crumbs`
			}),
			/* @__PURE__ */ $("div", {
				className: t("flex min-w-0 items-center gap-x-4 gap-y-2", A ? "h-7 flex-nowrap" : "flex-wrap"),
				children: [
					/* @__PURE__ */ $("div", {
						className: "flex min-w-0 items-center gap-3",
						children: [
							/* @__PURE__ */ Q("h1", {
								className: t("m-0 min-w-0 truncate text-text-primary", A ? "text-sm font-semibold leading-5" : L ? "text-[28px] font-bold leading-9 tracking-[-0.01em]" : "text-[20px] font-semibold leading-7"),
								title: n,
								"data-testid": `${O}-title`,
								children: n
							}),
							ne,
							A && R && /* @__PURE__ */ Q(Me, {
								title: n,
								description: _,
								"data-testid": `${O}-description`
							}),
							E && /* @__PURE__ */ Q(ke, {
								collapsed: !1,
								onToggle: E,
								"data-testid": `${O}-collapse-toggle`
							})
						]
					}),
					!ee && V,
					/* @__PURE__ */ $("div", {
						className: t("ml-auto flex shrink-0 items-center", y === "button" ? "gap-3" : "gap-5"),
						children: [I && N.map((e) => /* @__PURE__ */ $("div", {
							className: "flex items-center gap-2",
							"data-testid": `${O}-people-${e.label.toLowerCase()}`,
							children: [/* @__PURE__ */ Q("span", {
								className: "text-[11px] font-semibold uppercase tracking-wide text-text-tertiary",
								children: e.label
							}), /* @__PURE__ */ Q(Ie, {
								users: e.people,
								size: A ? 24 : 26,
								maxVisible: 4
							})]
						}, e.label)), ie]
					})
				]
			}),
			ee && V,
			z && /* @__PURE__ */ Q("p", {
				className: t("m-0 min-w-0 whitespace-pre-line text-text-secondary", C === "sm" ? "text-[15px] leading-[22px]" : "text-base leading-6"),
				"data-testid": `${O}-description`,
				"data-size": C === "sm" ? "sm" : void 0,
				children: _
			}),
			P && /* @__PURE__ */ Q("div", {
				className: "flex min-w-0 flex-wrap items-center gap-x-6 gap-y-1 text-sm leading-6 text-text-secondary",
				"data-testid": `${O}-people`,
				children: N.map((e) => /* @__PURE__ */ $("span", {
					className: "min-w-0",
					"data-testid": `${O}-people-${e.label.toLowerCase()}`,
					children: [
						e.people.map((e) => e.name).join(", "),
						/* @__PURE__ */ Q("span", {
							"aria-hidden": "true",
							children: " · "
						}),
						e.label
					]
				}, e.label))
			}),
			F && /* @__PURE__ */ Q("div", {
				className: t("flex min-w-0 flex-wrap items-center gap-x-7 gap-y-2", z ? "mt-5" : "mt-3"),
				"data-testid": `${O}-people`,
				"data-people-style": "inline",
				children: N.map((e, t) => /* @__PURE__ */ $("div", {
					className: "flex min-w-0 items-center gap-7",
					"data-testid": `${O}-people-${e.label.toLowerCase()}`,
					children: [t > 0 && /* @__PURE__ */ Q("span", {
						"aria-hidden": "true",
						className: "h-6 w-px shrink-0 bg-border",
						"data-testid": `${O}-people-rule`
					}), /* @__PURE__ */ $("div", {
						className: "flex min-w-0 items-center gap-4",
						role: "group",
						"aria-label": e.label,
						children: [/* @__PURE__ */ Q("span", {
							className: "shrink-0 text-[15px] leading-6 text-text-secondary",
							children: e.label
						}), /* @__PURE__ */ Q("span", {
							className: "flex min-w-0 flex-wrap items-center gap-x-7 gap-y-2",
							children: e.people.map((e) => /* @__PURE__ */ $("span", {
								className: "flex min-w-0 items-center gap-3",
								"data-testid": `${O}-person-${e.id}`,
								children: [/* @__PURE__ */ Q(Ce, {
									name: e.name,
									size: 32,
									...e.avatarUrl ? { src: e.avatarUrl } : {},
									...e.color ? { color: e.color } : {}
								}), /* @__PURE__ */ Q("span", {
									className: "truncate text-[15px] font-medium leading-6 text-text-primary",
									children: e.name
								})]
							}, e.id))
						})]
					})]
				}, e.label))
			}),
			re
		]
	});
}
function co(e) {
	return e.trailControls != null || e.trailLink != null || e.collapsed != null || e.onToggleCollapsed != null;
}
function lo({ title: e, description: n, breadcrumbs: r, actions: i, badge: a, back: o, density: s = "compact", titleAs: c, gutter: l }) {
	let u = !!r && r.length > 0;
	return /* @__PURE__ */ Q(Pe, {
		title: e,
		...n ? { description: n } : {},
		...i == null ? {} : { actions: i },
		...a == null ? {} : { badge: a },
		...o ? { back: o } : {},
		...u ? { breadcrumbs: r } : {},
		density: s,
		...c ? { as: c } : {},
		className: t("shrink-0", l === "page" && "px-[var(--ui-page-gutter,1.5rem)]", l === "page" && !u && "pt-3")
	});
}
function uo({ title: e, description: n, breadcrumbs: r, actions: i, badge: a, back: o, density: s = "compact", titleAs: c, trailControls: l, trailLink: u, collapsed: d = !1, onToggleCollapsed: f, gutter: p }) {
	let m = l != null || !!u;
	return /* @__PURE__ */ $(Z, { children: [/* @__PURE__ */ Q(Ba, {
		variant: "crumbs",
		...r ? { breadcrumbs: r } : {},
		title: e,
		collapsed: d,
		...f ? { onToggleCollapsed: f } : {},
		...l == null ? {} : { controls: l },
		...u ? { link: u } : {},
		className: t("shrink-0", p === "none" && "px-0"),
		"data-testid": "page-trail"
	}), !d && /* @__PURE__ */ Q("div", {
		className: t("shrink-0 min-w-0", p === "page" && "px-[var(--ui-page-gutter,1.5rem)]", s === "compact" ? "pb-2 pt-1" : t("pb-4", m ? "pt-1" : "pt-3")),
		"data-page-title": "",
		children: /* @__PURE__ */ Q(Pe, {
			title: e,
			density: s,
			...c ? { as: c } : {},
			...n ? { description: n } : {},
			...i == null ? {} : { actions: i },
			...a == null ? {} : { badge: a },
			...o ? { back: o } : {},
			...f ? { onToggleCollapsed: f } : {}
		})
	})] });
}
function fo(e, n) {
	return t("min-h-0 min-w-0 flex-1 overflow-auto", e === "page" && t("px-[var(--ui-page-gutter,1.5rem)]", "pb-[var(--ui-page-gutter,1.5rem)]"), n);
}
//#endregion
//#region src/components/shared/CollectionPage.tsx
function po(e) {
	return typeof e == "object" && !!e && !$e(e) && "title" in e;
}
function mo({ title: e, description: n, headerActions: r, toolbar: i, toolbarPlacement: a = "auto", back: o, children: s, breadcrumbs: c, badge: l, density: u, titleAs: d, table: f, loading: p = !1, error: m, onRetry: h, empty: g, isEmpty: _, detail: v, gutter: y = "none", className: b, ...x }) {
	let S = ja(), C = !!i && (a === "header" || a === "auto" && ce(i)), w = C ? /* @__PURE__ */ $(Z, { children: [/* @__PURE__ */ Q(se, {
		...i,
		placement: "header"
	}), r] }) : r, T = f ? f.data.length : null, E = !p && m == null && (f ? T === 0 : !!_) && g != null, D;
	D = m != null && m !== !1 ? typeof m == "string" ? /* @__PURE__ */ Q(de, {
		title: "Couldn't load this list",
		description: m,
		...h ? {
			actionLabel: "Retry",
			onAction: h
		} : {}
	}) : m : E ? po(g) ? /* @__PURE__ */ Q(ue, {
		title: g.title,
		...g.description == null ? {} : { description: g.description },
		...g.action == null ? {} : { action: g.action }
	}) : g : f ? /* @__PURE__ */ Q(le, {
		striped: !0,
		...f,
		loading: p || !!f.loading
	}) : p ? /* @__PURE__ */ Q(pe, {}) : s;
	let O = /* @__PURE__ */ $("div", {
		className: t("flex h-full min-h-0 min-w-0 flex-col gap-[var(--ui-section-gap,0.75rem)]", b),
		"data-collection-page": !0,
		"data-page-template": "collection",
		"data-page-column": "",
		...x,
		children: [
			/* @__PURE__ */ Q(lo, {
				title: e,
				gutter: y,
				actions: w,
				density: u ?? "compact",
				...d ? { titleAs: d } : {},
				...n ? { description: n } : {},
				...o ? { back: o } : {},
				...c ? { breadcrumbs: c } : {},
				...l == null ? {} : { badge: l }
			}),
			i && !C && (y === "page" ? /* @__PURE__ */ Q("div", {
				className: "shrink-0 min-w-0 px-[var(--ui-page-gutter,1.5rem)]",
				children: /* @__PURE__ */ Q(se, { ...i })
			}) : /* @__PURE__ */ Q(se, { ...i })),
			/* @__PURE__ */ Q("div", {
				className: fo(y),
				"data-collection-body": "",
				"data-state": m != null && m !== !1 ? "error" : E ? "empty" : p ? "loading" : "ready",
				children: D
			}),
			v && (() => {
				let { content: e, ...t } = v;
				return /* @__PURE__ */ Q(Ia, {
					...t,
					children: e
				});
			})()
		]
	});
	return v !== void 0 && !S ? /* @__PURE__ */ Q(Pa, { children: O }) : O;
}
//#endregion
//#region src/components/layout/DockedColumn.tsx
var ho = Qe(void 0);
function go({ children: e, className: n, bodyClassName: r, body: i = "scroll", bodyProps: a, ...o }) {
	let [s, c] = X(null);
	return /* @__PURE__ */ $("div", {
		className: t("flex min-h-0 min-w-0 flex-1 flex-col", n),
		"data-docked-column": "",
		...o,
		children: [/* @__PURE__ */ Q("div", {
			...a,
			className: t("min-h-0 min-w-0 flex-1", i === "scroll" ? "overflow-auto" : "flex flex-col overflow-hidden", r, a?.className),
			"data-docked-column-body": "",
			children: /* @__PURE__ */ Q(ho.Provider, {
				value: s,
				children: e
			})
		}), /* @__PURE__ */ Q("div", {
			ref: c,
			className: "flex min-w-0 shrink-0 flex-col empty:hidden",
			"data-column-dock": ""
		})]
	});
}
function _o({ children: e }) {
	let t = K(ho);
	return t === void 0 ? /* @__PURE__ */ Q(Z, { children: e }) : t === null ? null : rt(e, t);
}
function vo() {
	return K(ho) !== void 0;
}
//#endregion
//#region src/components/shared/PageFrame.tsx
function yo({ title: e, description: n, breadcrumbs: r, actions: i, badge: a, back: o, density: s, titleAs: c, trailControls: l, trailLink: u, collapsed: d, onToggleCollapsed: f, children: p, body: m = "scroll", dockedBody: h = "scroll", footer: g, gutter: _ = "page", bodyGutter: v, bodyClassName: y, className: b, ...x }) {
	let S = co({
		trailControls: l,
		trailLink: u,
		collapsed: d,
		onToggleCollapsed: f
	}), C = v ?? _, w = {
		title: e,
		description: n,
		breadcrumbs: r,
		actions: i,
		badge: a,
		back: o,
		density: s,
		titleAs: c,
		gutter: _
	};
	return /* @__PURE__ */ $("div", {
		className: t("flex h-full min-h-0 min-w-0 flex-col", !S && "gap-[var(--ui-section-gap,0.75rem)]", b),
		"data-page-template": "page-frame",
		"data-page-column": "",
		"data-shell-flush": "",
		...x,
		children: [
			S ? /* @__PURE__ */ Q(uo, {
				...w,
				trailControls: l,
				trailLink: u,
				collapsed: d,
				onToggleCollapsed: f
			}) : /* @__PURE__ */ Q(lo, { ...w }),
			m === "docked" ? /* @__PURE__ */ $(go, {
				body: h,
				bodyClassName: t("flex flex-col gap-3", C === "page" && t("px-[var(--ui-page-gutter,1.5rem)]", "pb-[var(--ui-page-gutter,1.5rem)]"), y),
				bodyProps: { "data-page-body": "docked" },
				children: [p, g != null && /* @__PURE__ */ Q(_o, { children: g })]
			}) : /* @__PURE__ */ Q("div", {
				className: m === "scroll" ? fo(C, t("flex flex-col gap-3", y)) : t("flex min-h-0 min-w-0 flex-1 flex-col gap-3 overflow-hidden", C === "page" && t("px-[var(--ui-page-gutter,1.5rem)]", !g && "pb-[var(--ui-page-gutter,1.5rem)]"), y),
				"data-page-body": m,
				children: p
			}),
			m !== "docked" && g != null && /* @__PURE__ */ Q("div", {
				className: "shrink-0 min-w-0",
				"data-page-footer": "",
				children: g
			})
		]
	});
}
//#endregion
//#region src/components/layout/ExplorerLayout.tsx
function bo({ rail: e, children: n, aside: r, railWidth: i = "md", railResize: a, header: o, paneHeader: s, paneFooter: c, railCount: l, railCountStyle: u, railBack: d, railHeading: f = "compact", railCollapsed: p = !1, onToggleRail: m, railLabel: h = "the list", railTitle: g, railActions: _, railHeader: v, railFooter: b, panePadding: x = "md", asidePlacement: S = "stack", className: C, "data-testid": w = "explorer-layout" }) {
	let T = Y(null), [E, D] = X(0), O = {
		xs: 220,
		sm: 240,
		ms: 264,
		md: 300,
		ml: 320,
		lg: 368
	}[i], A = a?.minPx ?? 260, j = a?.maxPx ?? 560, [M, N] = X(() => {
		try {
			let e = a?.storageKey ? Number(localStorage.getItem(a.storageKey)) : NaN;
			return Number.isFinite(e) && e > 0 ? Math.max(A, Math.min(j, e)) : O;
		} catch {
			return O;
		}
	});
	tt(() => {
		let e = T.current;
		if (!e || !a) return;
		let t = () => D(e.getBoundingClientRect().width);
		t();
		let n = typeof ResizeObserver > "u" ? null : new ResizeObserver(t);
		return n?.observe(e), () => n?.disconnect();
	}, [!!a]);
	let P = E > 0 ? Math.min(j, Math.max(A, E - 480)) : j, F = p ? 36 : Math.min(P, Math.max(A, M)), I = (e) => {
		let t = Math.round(Math.min(P, Math.max(A, e)));
		N(t);
		try {
			a?.storageKey && localStorage.setItem(a.storageKey, String(t));
		} catch {}
	}, L = F > O + 20, ee = a && /* @__PURE__ */ Q(W, {
		content: L ? `Reset ${h} width` : `Widen ${h}`,
		children: /* @__PURE__ */ Q(y, {
			variant: "ghost",
			size: "sm",
			icon: /* @__PURE__ */ Q(k, { size: 14 }),
			"aria-label": L ? `Reset ${h} width` : `Widen ${h}`,
			"aria-pressed": L,
			onClick: () => I(L ? O : P),
			"data-testid": `${w}-widen`
		})
	}), R = /* @__PURE__ */ Q("div", {
		"data-testid": `${w}-pane`,
		className: t("flex min-h-0 min-w-0 flex-1 flex-col overflow-y-auto bg-surface", x === "md" && "p-[var(--ui-page-gutter,1.5rem)]"),
		children: n
	}), z = /* @__PURE__ */ $("div", {
		className: t("flex min-h-0 min-w-0 flex-1", S === "beside" ? "flex-row" : "flex-col 2xl:flex-row"),
		children: [s != null || c != null ? /* @__PURE__ */ $("div", {
			className: "flex min-h-0 min-w-0 flex-1 flex-col",
			"data-testid": `${w}-pane-column`,
			children: [
				s != null && /* @__PURE__ */ Q("div", {
					"data-testid": `${w}-pane-header`,
					className: "shrink-0 bg-surface",
					children: s
				}),
				R,
				c != null && /* @__PURE__ */ Q("div", {
					"data-testid": `${w}-pane-footer`,
					className: "shrink-0 bg-surface",
					children: c
				})
			]
		}) : R, r ? /* @__PURE__ */ Q("aside", {
			"data-testid": `${w}-aside`,
			"data-placement": S,
			className: t("flex min-h-0", S === "beside" ? "flex-shrink-0" : "border-t border-border 2xl:flex-shrink-0 2xl:border-t-0"),
			children: r
		}) : null]
	}), B = /* @__PURE__ */ Q(Ge, {
		title: g,
		label: "Explorer",
		actions: a ? /* @__PURE__ */ $(Z, { children: [_, ee] }) : _,
		header: v,
		footer: b,
		width: i,
		...typeof l == "number" ? { count: l } : {},
		heading: f,
		className: a ? "w-full" : void 0,
		...u ? { countStyle: u } : {},
		...d ? { back: d } : {},
		collapsed: p,
		onToggle: m,
		toggleLabel: `${p ? "Show" : "Hide"} ${h}`,
		"data-testid": `${w}-rail`,
		children: e
	}), V = /* @__PURE__ */ Q("div", {
		ref: T,
		"data-testid": w,
		className: t("flex h-full min-h-0", o ? "min-w-0 flex-1" : C),
		children: a ? /* @__PURE__ */ Q(_a, {
			primary: B,
			secondary: z,
			className: "min-w-0 flex-1",
			ratio: E > 0 ? F / E : .25,
			onRatioChange: (e) => I(e * E),
			minPrimaryPx: A,
			minSecondaryPx: 480,
			resizable: !p,
			dividerLabel: `Resize ${h}`,
			"data-testid": `${w}-rail-split`
		}) : /* @__PURE__ */ $(Z, { children: [B, z] })
	});
	return o ? /* @__PURE__ */ $("div", {
		"data-testid": `${w}-with-header`,
		className: t("flex h-full min-h-0 flex-col", C),
		children: [/* @__PURE__ */ Q("div", {
			"data-testid": `${w}-header`,
			className: "shrink-0 border-b border-border bg-surface-panel",
			children: o
		}), /* @__PURE__ */ Q("div", {
			className: "flex min-h-0 flex-1",
			children: V
		})]
	}) : V;
}
//#endregion
//#region src/components/layout/ListRailLayout.tsx
function xo({ list: e, header: t, children: n, aside: r, footer: i, fold: a, railWidth: o = "ms", countStyle: s = "chip", className: c, "data-testid": l }) {
	return /* @__PURE__ */ Q("div", {
		className: "flex h-full min-h-0 min-w-0 flex-1 flex-col",
		"data-list-rail": "",
		children: /* @__PURE__ */ Q(bo, {
			className: c ?? "min-h-0 min-w-0 flex-1",
			railWidth: o,
			railHeading: "caption",
			railCountStyle: s,
			railTitle: e.title,
			...e.count == null ? {} : { railCount: e.count },
			...e.back ? { railBack: e.back } : {},
			railActions: e.actions,
			railHeader: e.header,
			railFooter: e.footer,
			railLabel: e.label,
			rail: e.body,
			...a ? {
				railCollapsed: a.folded,
				onToggleRail: a.onToggle
			} : {},
			panePadding: "none",
			asidePlacement: "beside",
			aside: r,
			...t == null ? {} : { paneHeader: t },
			...i == null ? {} : { paneFooter: i },
			...l ? { "data-testid": l } : {},
			children: n
		})
	});
}
//#endregion
//#region src/components/shared/MasterDetailPage.tsx
function So({ title: e, description: n, breadcrumbs: r, actions: i, badge: a, back: o, density: s, titleAs: c, list: l, children: u, emptyDetail: d, aside: f, footer: p, body: m = "scroll", dockedBody: h = "scroll", fold: g, railWidth: _, gutter: v = "page", className: y, "data-testid": b }) {
	let x = u != null && u !== !1, S = m === "docked", C = t("flex min-w-0 flex-col gap-3 pt-3", v === "page" && t("px-[var(--ui-page-gutter,1.5rem)]", "pb-[var(--ui-page-gutter,1.5rem)]")), w = x ? u : d ?? /* @__PURE__ */ Q(ue, { title: "Select an item from the list" });
	return /* @__PURE__ */ Q("div", {
		className: t("flex h-full min-h-0 min-w-0 flex-col", y),
		"data-page-template": "master-detail",
		"data-testid": b,
		children: /* @__PURE__ */ Q(xo, {
			list: l,
			header: /* @__PURE__ */ Q(lo, {
				title: e,
				description: n,
				breadcrumbs: r,
				actions: i,
				badge: a,
				back: o,
				density: s,
				titleAs: c,
				gutter: v
			}),
			...f == null ? {} : { aside: f },
			...p != null && !S ? { footer: p } : {},
			...g ? { fold: g } : {},
			..._ ? { railWidth: _ } : {},
			children: S ? /* @__PURE__ */ $(go, {
				body: h,
				bodyClassName: C,
				bodyProps: {
					"data-page-body": "docked",
					"data-master-detail-body": x ? "selected" : "empty"
				},
				children: [w, p != null && /* @__PURE__ */ Q(_o, { children: p })]
			}) : /* @__PURE__ */ Q("div", {
				className: C,
				"data-master-detail-body": x ? "selected" : "empty",
				children: w
			})
		})
	});
}
//#endregion
//#region src/components/shared/DetailPage.tsx
function Co({ title: e, badge: n, description: r, meta: i, actions: a, breadcrumbs: o, titleAs: s = "h1", tabs: c, activeTab: l, onTabChange: u, children: d, aside: f, gutter: p = "page", className: m, "data-testid": h }) {
	let g = et(), _ = c?.find((e) => !e.disabled)?.id ?? c?.[0]?.id ?? "", [v, y] = X(_), b = l ?? v, x = c?.some((e) => e.id === b) ? b : _, S = (e) => {
		l ?? y(e), u?.(e);
	}, C = p === "page" && "px-[var(--ui-page-gutter,1.5rem)]", w = t("min-h-0 min-w-0 flex-1 overflow-auto pt-3", C, p === "page" && "pb-[var(--ui-page-gutter,1.5rem)]"), T = !!c && c.length > 0, E = !!o && o.length > 0;
	return /* @__PURE__ */ $("div", {
		className: t("flex h-full min-h-0 min-w-0 flex-row", m),
		"data-page-template": "detail",
		"data-testid": h,
		children: [/* @__PURE__ */ $("div", {
			className: "flex min-h-0 min-w-0 flex-1 flex-col",
			"data-page-column": "",
			children: [/* @__PURE__ */ $("div", {
				className: t("flex shrink-0 min-w-0 flex-col gap-2", C, E ? "pt-2" : "pt-3"),
				"data-detail-page-header": "",
				"data-page-trail": "",
				children: [E && /* @__PURE__ */ Q(Oe, {
					items: o,
					separator: "›",
					maxItems: 5,
					className: "min-w-0"
				}), /* @__PURE__ */ $("div", {
					className: "flex min-w-0 items-start gap-3",
					children: [/* @__PURE__ */ Q(Gr, {
						title: e,
						as: s,
						className: "min-w-0 flex-1",
						...n == null ? {} : { badge: n },
						...r == null ? {} : { description: r },
						...i == null ? {} : { meta: i }
					}), a != null && /* @__PURE__ */ Q("div", {
						className: "flex shrink-0 items-center gap-2",
						"data-detail-page-actions": "",
						children: a
					})]
				})]
			}), T ? /* @__PURE__ */ $(Z, { children: [/* @__PURE__ */ Q("div", {
				className: t("shrink-0 min-w-0 border-b border-border", C),
				children: /* @__PURE__ */ Q(B, {
					items: c.map(({ id: e, label: t, badge: n, icon: r, disabled: i }) => ({
						id: e,
						label: t,
						...n == null ? {} : { badge: n },
						...r == null ? {} : { icon: r },
						...i ? { disabled: i } : {}
					})),
					value: x,
					onValueChange: S,
					idPrefix: g,
					variant: "underline",
					size: "sm",
					badgeStyle: "plain",
					"aria-label": "Sections"
				})
			}), c.map((e) => /* @__PURE__ */ Q(te, {
				id: e.id,
				when: x,
				idPrefix: g,
				className: w,
				children: e.content
			}, e.id))] }) : /* @__PURE__ */ Q("div", {
				className: w,
				"data-detail-page-body": "",
				children: d
			})]
		}), f != null && /* @__PURE__ */ Q("div", {
			className: "flex h-full min-h-0 shrink-0",
			"data-detail-page-aside": "",
			children: f
		})]
	});
}
//#endregion
//#region src/components/shared/DashboardPage.tsx
var wo = {
	2: "lg:grid-cols-2",
	3: "lg:grid-cols-3",
	4: "lg:grid-cols-4"
}, To = {
	1: "",
	2: "md:col-span-2",
	3: "md:col-span-2 lg:col-span-3"
};
function Eo({ title: e, description: n, breadcrumbs: r, actions: i, badge: a, back: o, density: s, titleAs: c, stats: l, kpis: u, panels: d, columns: f = 3, children: p, gutter: m = "page", className: h, "data-testid": g }) {
	let _ = m === "page" && "px-[var(--ui-page-gutter,1.5rem)]", v = u ?? (l && l.length > 0 ? /* @__PURE__ */ Q(li, {
		items: l,
		size: "sm",
		"aria-label": `${e} summary`
	}) : null);
	return /* @__PURE__ */ $("div", {
		className: t("flex h-full min-h-0 min-w-0 flex-col gap-[var(--ui-section-gap,0.75rem)]", h),
		"data-page-template": "dashboard",
		"data-page-column": "",
		"data-testid": g,
		children: [
			/* @__PURE__ */ Q(lo, {
				title: e,
				description: n,
				breadcrumbs: r,
				actions: i,
				badge: a,
				back: o,
				density: s,
				titleAs: c,
				gutter: m
			}),
			v != null && /* @__PURE__ */ Q("div", {
				className: t("shrink-0 min-w-0", _),
				"data-dashboard-stats": "",
				children: v
			}),
			/* @__PURE__ */ Q("div", {
				className: t("grid min-h-0 min-w-0 flex-1 grid-cols-1 gap-4 overflow-auto pt-2 md:grid-cols-2", "auto-rows-[minmax(12rem,1fr)]", wo[f], _, m === "page" && "pb-[var(--ui-page-gutter,1.5rem)]"),
				"data-dashboard-grid": "",
				children: d ? d.map((e) => /* @__PURE__ */ Q(Te, {
					title: e.title,
					tone: "surface",
					...e.action == null ? {} : { titleAction: e.action },
					className: t("min-w-0", To[e.span ?? 1]),
					bodyClassName: "overflow-auto p-3",
					"data-testid": `dashboard-panel-${e.id}`,
					children: e.content
				}, e.id)) : p
			})
		]
	});
}
//#endregion
//#region src/components/layout/SettingsLayout.tsx
function Do({ title: e, subtitle: n, sections: r, activeSectionId: i, onSectionChange: a, dirty: o = !1, saveLabel: s = "Save changes", cancelLabel: c = "Cancel", onSave: l, onCancel: u, saving: d = !1, saveBarSlot: f, railWidth: p = 220, className: m, style: h, "data-testid": g = "settings-layout" }) {
	let _ = r[0]?.id ?? null, [v, y] = X(_), b = i ?? v, x = Y(null);
	q(() => {
		i == null && _ && v == null && y(_);
	}, [
		i,
		_,
		v
	]);
	let S = r.find((e) => e.id === b) ?? r[0], C = (e) => {
		i ?? y(e), a?.(e);
	};
	return /* @__PURE__ */ $("div", {
		"data-testid": g,
		"data-dirty": o || void 0,
		className: t("flex flex-col h-full min-h-0 bg-[var(--color-surface,#fff)]", m),
		style: h,
		children: [/* @__PURE__ */ $("div", {
			className: "flex flex-1 min-h-0",
			children: [/* @__PURE__ */ $("aside", {
				ref: x,
				role: "navigation",
				"aria-label": "Settings sections",
				"data-testid": `${g}-rail`,
				className: "shrink-0 border-r border-[var(--color-border)] overflow-y-auto py-4 px-2",
				style: { width: p },
				children: [/* @__PURE__ */ $("div", {
					className: "px-3 pb-3 border-b border-[var(--color-border)] mb-3",
					children: [/* @__PURE__ */ Q("div", {
						className: "text-[14px] font-semibold text-[var(--color-text-primary)] leading-tight",
						children: e
					}), n != null && /* @__PURE__ */ Q("div", {
						className: "mt-0.5 text-[11px] text-[var(--color-text-secondary)] leading-snug",
						children: n
					})]
				}), /* @__PURE__ */ Q("nav", {
					className: "flex flex-col gap-0.5",
					children: r.map((e) => {
						let n = e.id === b;
						return /* @__PURE__ */ $("button", {
							"data-ui-part": "",
							type: "button",
							"data-testid": `${g}-rail-item`,
							"data-section-id": e.id,
							"data-active": n || void 0,
							onClick: () => C(e.id),
							className: t("flex flex-col items-start gap-0.5 px-3 py-2 rounded-md text-left", "border-l-[2px] cursor-pointer", n ? "bg-[var(--color-primary-bg,#eef2ff)] border-l-[var(--color-primary,#6366f1)] text-[var(--color-primary,#4338ca)]" : "border-l-transparent hover:bg-[var(--color-surface-subtle,#f8fafc)] text-[var(--color-text-primary)]"),
							children: [/* @__PURE__ */ $("span", {
								className: "flex items-center gap-1.5 text-[12px] font-semibold",
								children: [e.icon != null && /* @__PURE__ */ Q("span", {
									className: "shrink-0",
									"aria-hidden": !0,
									children: e.icon
								}), e.label]
							}), e.description != null && /* @__PURE__ */ Q("span", {
								className: t("text-[10px] leading-snug", n ? "text-[var(--color-primary,#4338ca)] opacity-80" : "text-[var(--color-text-tertiary)]"),
								children: e.description
							})]
						}, e.id);
					})
				})]
			}), /* @__PURE__ */ Q("main", {
				role: "main",
				"data-testid": `${g}-body`,
				className: "flex-1 min-w-0 overflow-y-auto",
				children: /* @__PURE__ */ Q("div", {
					"data-testid": `${g}-section`,
					"data-section-id": S?.id,
					className: "p-6 max-w-3xl mx-auto",
					children: S?.content
				})
			})]
		}), o && /* @__PURE__ */ $("div", {
			role: "region",
			"aria-label": "Unsaved changes",
			"data-testid": `${g}-save-bar`,
			className: t("sticky bottom-0 left-0 right-0 z-10", "flex items-center gap-3 px-4 py-3", "border-t border-[var(--color-border)]", "bg-[var(--color-surface,#fff)] shadow-[0_-4px_12px_rgba(0,0,0,0.05)]"),
			children: [
				/* @__PURE__ */ Q("span", {
					className: "text-[12px] text-[var(--color-text-secondary)]",
					children: "You have unsaved changes."
				}),
				f != null && /* @__PURE__ */ Q("span", {
					className: "text-[11px] text-[var(--color-text-tertiary)]",
					children: f
				}),
				/* @__PURE__ */ $("div", {
					className: "ml-auto flex items-center gap-2",
					children: [u && /* @__PURE__ */ Q("button", {
						"data-ui-part": "",
						type: "button",
						onClick: u,
						"data-testid": `${g}-cancel`,
						className: t("px-3 py-1.5 text-[12px] font-semibold rounded-md", "border border-[var(--color-border)] bg-transparent", "text-[var(--color-text-primary)] hover:bg-[var(--color-surface-subtle,#f8fafc)]", "cursor-pointer"),
						disabled: d,
						children: c
					}), l && /* @__PURE__ */ Q("button", {
						"data-ui-part": "",
						type: "button",
						onClick: l,
						"data-testid": `${g}-save`,
						disabled: d,
						className: t("px-3 py-1.5 text-[12px] font-semibold rounded-md", "bg-[var(--color-primary,#6366f1)] text-white border-none", d ? "opacity-70 cursor-progress" : "cursor-pointer hover:opacity-90"),
						children: d ? "Saving…" : s
					})]
				})
			]
		})]
	});
}
//#endregion
//#region src/components/shared/SettingsPage.tsx
function Oo({ breadcrumbs: e, gutter: n = "page", className: r, "data-testid": i = "settings-page", ...a }) {
	let o = !!e && e.length > 0;
	return /* @__PURE__ */ $("div", {
		className: t("flex h-full min-h-0 min-w-0 flex-col", r),
		"data-page-template": "settings",
		"data-page-column": "",
		"data-testid": i,
		children: [o && /* @__PURE__ */ Q("div", {
			className: t("shrink-0 min-w-0 border-b border-border py-2", n === "page" && "px-[var(--ui-page-gutter,1.5rem)]"),
			"data-page-trail": "",
			children: /* @__PURE__ */ Q(Oe, {
				items: e,
				separator: "›",
				maxItems: 5,
				className: "min-w-0"
			})
		}), /* @__PURE__ */ Q(Do, {
			...a,
			className: "min-h-0 flex-1",
			"data-testid": `${i}-layout`
		})]
	});
}
//#endregion
//#region src/components/layout/ViewportFillRegion.tsx
function ko(e, t, n, r) {
	return Math.max(r, t - e - n);
}
function Ao({ bottomGap: e = 0, minHeight: n = 240, className: r, children: i, "data-testid": a }) {
	let o = Y(null), [s, c] = X(null), l = G(() => {
		let t = o.current;
		if (!t || typeof window > "u") return;
		let r = t.getBoundingClientRect().top + window.scrollY;
		c(ko(r, window.innerHeight, e, n));
	}, [e, n]);
	return tt(() => {
		l();
	}, [l]), q(() => {
		if (typeof window > "u") return;
		let e = window.requestAnimationFrame(l);
		window.addEventListener("resize", l);
		let t = o.current, n = typeof ResizeObserver > "u" ? null : new ResizeObserver(() => l());
		return n && (t?.parentElement && n.observe(t.parentElement), n.observe(document.body)), () => {
			window.cancelAnimationFrame(e), window.removeEventListener("resize", l), n?.disconnect();
		};
	}, [l]), /* @__PURE__ */ Q("div", {
		ref: o,
		"data-testid": a,
		className: t("min-h-0", r),
		style: s === null ? void 0 : {
			height: s,
			maxHeight: s
		},
		children: i
	});
}
//#endregion
//#region src/components/shared/SectionLayout.tsx
function jo(e, t) {
	let n = `${e.folded ? "Show" : "Hide"} ${t}`;
	return /* @__PURE__ */ Q(y, {
		size: "sm",
		variant: "ghost",
		"aria-label": n,
		title: n,
		"aria-expanded": !e.folded,
		onClick: e.onToggle,
		icon: /* @__PURE__ */ Q(P, {
			dir: e.folded ? "right" : "left",
			size: 14
		}),
		"data-testid": "section-layout-rail-fold"
	});
}
function Mo({ title: e, items: n, renderNavItem: r, storageKey: i, railWidth: a, titleAction: o, railHeader: s, railContent: c, railLabel: l, railFold: u, secondary: d, list: f, listFold: p, listRailWidth: m, aside: h, header: g, body: _ = "scroll", gutter: v = "page", footer: y, fill: b = "viewport", bottomGap: x = 0, contentLabel: S, bodyClassName: C, children: w, className: T, "data-testid": E = "section-layout" }) {
	let D = y == null ? null : /* @__PURE__ */ Q(_o, { children: y }), O;
	if (g) {
		let { breadcrumbs: e, title: n, description: r, badge: i, actions: a, titleAs: o, density: s, trailControls: c, trailLink: l, collapsed: u, onToggleCollapsed: d } = g;
		O = /* @__PURE__ */ $("div", {
			className: "flex h-full min-h-0 min-w-0 flex-1 flex-col",
			"data-page-column": "",
			"data-section-layout-column": "",
			children: [n == null ? /* @__PURE__ */ Q(Ba, {
				variant: "crumbs",
				className: "shrink-0",
				"data-testid": "page-trail",
				...e ? { breadcrumbs: e } : {},
				...c == null ? {} : { controls: c },
				...l ? { link: l } : {}
			}) : /* @__PURE__ */ Q(uo, {
				gutter: "page",
				title: n,
				breadcrumbs: e,
				description: r,
				badge: i,
				actions: a,
				titleAs: o,
				density: s,
				trailControls: c,
				trailLink: l,
				collapsed: u,
				onToggleCollapsed: d
			}), /* @__PURE__ */ $(go, {
				body: _,
				bodyClassName: t("flex flex-col gap-3", v === "page" && t("px-[var(--ui-page-gutter,1.5rem)]", "pb-[var(--ui-page-gutter,1.5rem)]"), n == null && "pt-3", C),
				bodyProps: { "data-page-body": _ },
				children: [w, D]
			})]
		});
	} else O = /* @__PURE__ */ $("div", {
		className: "flex h-full min-h-0 min-w-0 flex-1 flex-col",
		"data-section-layout-column": "",
		children: [/* @__PURE__ */ Q("div", {
			className: t("flex min-h-0 min-w-0 flex-1 flex-col", C),
			children: w
		}), y != null && /* @__PURE__ */ Q("div", {
			className: "flex min-w-0 shrink-0 flex-col",
			"data-page-footer": "",
			children: y
		})]
	});
	let k = f ? /* @__PURE__ */ Q(xo, {
		list: f,
		...p ? { fold: {
			folded: p.folded,
			onToggle: p.onToggle
		} } : {},
		...m ? { railWidth: m } : {},
		...h == null ? {} : { aside: h },
		"data-testid": `${E}-list`,
		children: O
	}) : O, A = u ? /* @__PURE__ */ $(Z, { children: [o, jo(u, `${e} navigation`)] }) : o, j = /* @__PURE__ */ Q("div", {
		className: t("flex h-full min-h-0 min-w-0 flex-col bg-surface", T),
		"data-page-template": "section-layout",
		"data-shell-flush": "",
		"data-section-layout": f ? "list" : "section",
		"data-testid": E,
		children: /* @__PURE__ */ Q(We, {
			title: e,
			items: n,
			contentPadding: "none",
			contentAs: "section",
			contentLabel: S ?? `${e} workspace`,
			railLabel: l ?? `${e} navigation`,
			...i ? { storageKey: i } : {},
			...a ? { railWidth: a } : {},
			...A == null ? {} : { titleAction: A },
			...s == null ? {} : { railHeader: s },
			...c == null ? {} : { railContent: c },
			...r ? { renderNavItem: r } : {},
			...u ? { collapsed: u.folded } : {},
			...d?.items.length ? {
				secondaryItems: d.items,
				...d.title ? { secondaryTitle: d.title } : {},
				...d.storageKey ? { secondaryStorageKey: d.storageKey } : {},
				...d.railWidth ? { secondaryRailWidth: d.railWidth } : {}
			} : {},
			children: k
		})
	});
	return b === "viewport" ? /* @__PURE__ */ Q(Ao, {
		bottomGap: x,
		"data-testid": `${E}-fill`,
		children: j
	}) : j;
}
//#endregion
//#region src/components/shared/ActivityResumeChip.tsx
function No(e, t = Date.now()) {
	let n = e instanceof Date ? e.getTime() : typeof e == "number" ? e : Date.parse(e);
	if (!Number.isFinite(n)) return "";
	let r = Math.max(0, t - n);
	return r < 6e4 ? "just now" : r < 36e5 ? `${Math.floor(r / 6e4)}m ago` : r < 864e5 ? `${Math.floor(r / 36e5)}h ago` : r < 6048e5 ? `${Math.floor(r / 864e5)}d ago` : new Date(n).toLocaleDateString();
}
function Po({ label: e, status: n, tone: r = "neutral", at: i, now: a, onResume: o, "aria-label": s, className: c, "data-testid": l = "activity-resume-chip" }) {
	let u = i == null ? "" : No(i, a);
	return /* @__PURE__ */ $("button", {
		type: "button",
		onClick: o,
		"aria-label": s ?? `Resume ${e} · ${n}${u ? ` · ${u}` : ""}`,
		title: `${e} · ${n}${u ? ` · ${u}` : ""}`,
		"data-testid": l,
		"data-activity-resume": "",
		className: t("inline-flex h-7 max-w-full min-w-0 items-center gap-1.5 rounded-full border border-border bg-surface px-2.5 text-xs text-text-secondary", "transition-colors hover:bg-surface-hover hover:text-text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary cursor-pointer", c),
		children: [
			/* @__PURE__ */ Q("span", {
				"aria-hidden": !0,
				className: t("h-2 w-2 shrink-0 rounded-full", f[m(r)])
			}),
			/* @__PURE__ */ Q("span", {
				className: "min-w-0 truncate font-medium text-text-primary",
				children: e
			}),
			/* @__PURE__ */ Q("span", {
				"aria-hidden": !0,
				className: "text-text-tertiary",
				children: "·"
			}),
			/* @__PURE__ */ Q("span", {
				className: "shrink-0",
				children: n
			}),
			u && /* @__PURE__ */ $(Z, { children: [/* @__PURE__ */ Q("span", {
				"aria-hidden": !0,
				className: "text-text-tertiary",
				children: "·"
			}), /* @__PURE__ */ Q("span", {
				className: "shrink-0 text-text-tertiary",
				children: u
			})] })
		]
	});
}
//#endregion
//#region src/components/shared/ComposerSurface.tsx
var Fo = Qe(!1);
function Io({ children: e, className: n, compact: r, ...i }) {
	let a = K(Fo), o = c();
	return a ? /* @__PURE__ */ Q(Z, { children: e }) : /* @__PURE__ */ Q(Fo.Provider, {
		value: !0,
		children: /* @__PURE__ */ Q("div", {
			...i,
			"data-composer-surface": !0,
			"data-density": r ?? o === "compact" ? "compact" : "comfortable",
			className: t("uic-composer-surface shrink-0 min-w-0", n),
			children: /* @__PURE__ */ Q("div", {
				className: "uic-composer-surface-content",
				children: e
			})
		})
	});
}
//#endregion
//#region src/components/shared/AssetGallery.tsx
function Lo({ item: e, variant: n, onOpen: r, actions: i, tileActions: a, menuOnSelect: s, onDragStart: c }) {
	let l = Y(null), [u, d] = X(!1), f = !!a && a.length > 0, p = f && s, m = () => {
		f && d(!0);
	}, g = (e) => {
		d(!1), e.onClick(l.current ?? document.body), l.current?.focus();
	};
	return /* @__PURE__ */ $("div", {
		role: "listitem",
		className: "group relative min-w-0",
		"data-gallery-tile": e.id,
		children: [
			/* @__PURE__ */ $("button", {
				"data-ui-part": "",
				ref: l,
				type: "button",
				draggable: !!c,
				onDragStart: (t) => c?.(e, t),
				"aria-label": p ? `${e.title}: actions` : `Inspect ${e.title}`,
				"aria-haspopup": f ? "dialog" : void 0,
				"aria-expanded": f ? u : void 0,
				onClick: () => p ? m() : r(e),
				onKeyDown: (e) => {
					f && (e.key === "ContextMenu" || e.key === "F10" && e.shiftKey) && (e.preventDefault(), m());
				},
				onContextMenu: f ? (e) => {
					e.preventDefault(), m();
				} : void 0,
				className: "block w-full min-w-0 rounded-lg text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
				children: [
					/* @__PURE__ */ $("span", {
						"data-gallery-thumbnail": !0,
						className: t("relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-lg bg-surface-muted transition-colors group-hover:bg-surface-hover", n === "images" && "aspect-[4/3]"),
						children: [n === "avatars" ? /* @__PURE__ */ Q(Ce, {
							name: e.title,
							src: e.src,
							size: 88
						}) : e.src ? /* @__PURE__ */ Q("img", {
							draggable: !1,
							src: e.src,
							alt: e.title,
							loading: "lazy",
							className: "h-full w-full object-cover transition-transform group-hover:scale-105"
						}) : /* @__PURE__ */ Q("span", {
							className: "text-xs text-text-secondary",
							children: e.status ? "No image yet" : "Image unavailable"
						}), e.status && /* @__PURE__ */ Q("span", {
							className: "absolute bottom-1.5 left-1.5 max-w-[calc(100%-0.75rem)]",
							"data-gallery-status": !0,
							children: /* @__PURE__ */ Q(h, {
								size: "xs",
								tone: e.status.tone ?? "neutral",
								children: e.status.label
							})
						})]
					}),
					/* @__PURE__ */ Q("span", {
						className: "mt-1 block truncate text-sm font-medium text-text-primary",
						title: e.title,
						children: e.title
					}),
					e.subtitle && /* @__PURE__ */ Q("span", {
						className: "block truncate text-xs text-text-secondary",
						title: e.subtitle,
						children: e.subtitle
					})
				]
			}),
			f && /* @__PURE__ */ Q(ye, {
				label: `${e.title} actions`,
				actions: a,
				"data-testid": `gallery-tile-actions-${e.id}`,
				className: "absolute right-1.5 top-1.5 opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100 [@media(hover:none)]:opacity-100"
			}),
			f && /* @__PURE__ */ $(oe, {
				open: u,
				onClose: () => d(!1),
				trigger: l,
				placement: "bottom-start",
				"aria-label": `${e.title} actions`,
				className: "flex min-w-44 flex-col p-1",
				"data-testid": `gallery-tile-menu-${e.id}`,
				children: [s && /* @__PURE__ */ Q(o, {
					variant: "ghost",
					size: "sm",
					className: "justify-start",
					autoFocus: !0,
					onClick: () => {
						d(!1), r(e);
					},
					children: "Open"
				}), a.map((e, t) => /* @__PURE__ */ $(o, {
					variant: "ghost",
					size: "sm",
					className: "justify-start gap-2",
					disabled: e.disabled,
					autoFocus: !s && t === 0,
					onClick: () => g(e),
					children: [/* @__PURE__ */ Q("span", {
						"aria-hidden": !0,
						className: "inline-flex shrink-0 [&_svg]:size-4",
						children: e.icon
					}), e.label]
				}, e.id))]
			}),
			i && /* @__PURE__ */ Q("div", {
				className: "flex h-8 items-center justify-end opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 [@media(hover:none)]:opacity-100",
				children: i(e)
			})
		]
	});
}
function Ro({ items: e, variant: n = "images", label: r, onOpen: i, actions: a, tileActions: o, menuOnSelect: s = !1, onDragStart: c, className: l }) {
	return /* @__PURE__ */ Q("div", {
		role: "list",
		"aria-label": r,
		"data-asset-gallery": n,
		className: t("grid gap-3", n === "avatars" ? "grid-cols-2 sm:grid-cols-4 lg:grid-cols-8" : "grid-cols-2 md:grid-cols-3 xl:grid-cols-4", l),
		children: e.map((e) => /* @__PURE__ */ Q(Lo, {
			item: e,
			variant: n,
			onOpen: i,
			actions: a,
			tileActions: o?.(e),
			menuOnSelect: s,
			onDragStart: c
		}, e.id))
	});
}
//#endregion
//#region src/components/shared/MediaCollectionCard.tsx
function zo({ title: e, headingAs: t = "h3", status: n, previews: r, onOpen: i, onPlay: a }) {
	let [o, s] = X(0), c = Math.min(o, Math.max(0, r.length - 1)), l = r[c];
	return /* @__PURE__ */ $(u, {
		padding: "none",
		className: "min-w-0 overflow-hidden",
		"data-media-collection": !0,
		children: [
			/* @__PURE__ */ Q(t, {
				className: "m-0 px-3 py-2 text-sm font-semibold",
				children: /* @__PURE__ */ Q("button", {
					"data-ui-part": "",
					type: "button",
					onClick: i,
					className: "block w-full truncate text-left text-text-primary hover:text-primary focus-visible:outline-2 focus-visible:outline-primary",
					title: e,
					children: e
				})
			}),
			/* @__PURE__ */ $("button", {
				"data-ui-part": "",
				type: "button",
				disabled: !l,
				"aria-label": `Play ${e}`,
				onClick: () => l && a(l),
				className: "group relative flex aspect-video w-full items-center justify-center overflow-hidden bg-surface-muted text-text-secondary focus-visible:outline-2 focus-visible:outline-primary",
				children: [l?.image ? /* @__PURE__ */ Q("img", {
					src: l.image,
					alt: `${e} · ${l.label}`,
					className: "h-full w-full object-cover"
				}) : /* @__PURE__ */ Q("span", {
					className: "text-xs",
					children: l ? "Preview unavailable" : "No review movie"
				}), l && /* @__PURE__ */ Q("span", {
					className: "absolute rounded-full bg-surface p-1 opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100",
					children: /* @__PURE__ */ Q(F, { size: 24 })
				})]
			}),
			/* @__PURE__ */ $("div", {
				className: "flex min-w-0 items-center justify-between gap-1 px-2 py-1 text-xs text-text-secondary",
				children: [/* @__PURE__ */ Q("span", {
					className: "shrink-0 tabular-nums",
					children: l?.duration || "Length unknown"
				}), n]
			}),
			l && /* @__PURE__ */ $("div", {
				className: "flex min-w-0 items-center gap-1 border-t border-border px-1 py-1",
				children: [
					r.length > 1 && /* @__PURE__ */ Q(y, {
						size: "sm",
						"aria-label": `Previous preview for ${e}`,
						disabled: c === 0,
						onClick: () => s(c - 1),
						children: /* @__PURE__ */ Q(P, { dir: "left" })
					}),
					/* @__PURE__ */ Q("span", {
						className: "min-w-0 flex-1 truncate text-xs text-text-secondary",
						title: l.label,
						children: l.label
					}),
					r.length > 1 && /* @__PURE__ */ $(Z, { children: [/* @__PURE__ */ $("span", {
						className: "text-xs tabular-nums text-text-secondary",
						children: [
							c + 1,
							"/",
							r.length
						]
					}), /* @__PURE__ */ Q(y, {
						size: "sm",
						"aria-label": `Next preview for ${e}`,
						disabled: c === r.length - 1,
						onClick: () => s(c + 1),
						children: /* @__PURE__ */ Q(P, { dir: "right" })
					})] })
				]
			})
		]
	});
}
//#endregion
//#region src/components/layout/AppShell.tsx
function Bo({ children: e }) {
	return /* @__PURE__ */ Q("div", {
		role: "status",
		"aria-label": "Loading",
		className: "fixed inset-0 z-[9000] flex items-center justify-center bg-[var(--color-surface)] bg-opacity-80",
		children: e ?? /* @__PURE__ */ $("div", {
			className: "flex flex-col items-center gap-3",
			children: [/* @__PURE__ */ Q("div", { className: "w-8 h-8 rounded-full border-2 border-[var(--color-border)] border-t-[var(--color-primary)] animate-spin" }), /* @__PURE__ */ Q("span", {
				className: "text-sm text-[var(--color-text-secondary)]",
				children: "Loading…"
			})]
		})
	});
}
function Vo({ sidebar: e, header: r, subheader: i, children: a, toastRegion: o, loading: s, apiDegraded: c, commandPalette: l, className: u, sidebarWidth: d = 260, headerHeight: f = 53, subheaderHeight: p = 36, subheaderInset: m, contentPadding: h = "md", sidebarClassName: g, sidebarLabel: _ = "App sidebar", sidebarTestId: v = "app-sidebar", subheaderTestId: y = "app-subheader", sidebarFullHeight: b = !1, layout: x = "document" }) {
	let S = x === "fill", C = f + (i ? p : 0), w = {
		"--app-shell-header-h": `${f}px`,
		"--app-shell-chrome-h": `${C}px`
	}, T = /* @__PURE__ */ $("div", {
		className: t("relative font-sans", S ? "flex h-dvh flex-col overflow-hidden" : "min-h-screen", "bg-[var(--color-surface-panel)] text-[var(--color-text-primary)]", u),
		style: w,
		"data-chrome-height": C,
		"data-layout": x,
		children: [
			/* @__PURE__ */ $("div", {
				className: t("sticky top-0 z-50", S && "shrink-0"),
				...e && b ? {
					style: { marginLeft: d },
					"data-beside-sidebar": "true"
				} : {},
				children: [
					/* @__PURE__ */ Q("div", {
						className: "flex items-center gap-4 border-b border-[var(--color-border)] bg-[var(--color-surface)] px-6",
						style: { height: f },
						"data-testid": "app-shell-header",
						children: r
					}),
					i && /* @__PURE__ */ Q("div", {
						className: "border-b border-[var(--color-border)] bg-[var(--color-surface)]",
						style: {
							height: p,
							paddingLeft: m,
							paddingRight: "1.5rem",
							boxSizing: "border-box"
						},
						"data-testid": y,
						children: i
					}),
					c && /* @__PURE__ */ Q("div", {
						className: "border-b border-[var(--color-border)]",
						children: c
					})
				]
			}),
			/* @__PURE__ */ $("div", {
				className: t("flex", S ? "min-h-0 flex-1 overflow-hidden" : "min-h-[calc(100vh-var(--app-shell-chrome-h))]"),
				"data-testid": "app-shell-body",
				children: [e && /* @__PURE__ */ Q("nav", {
					role: "navigation",
					"aria-label": _,
					"data-testid": v,
					className: t("fixed left-0 bottom-0 box-border flex shrink-0 flex-col overflow-y-auto overflow-x-hidden border-r border-[var(--color-border)] bg-[var(--color-surface)] transition-[width,padding] duration-200", b ? "z-[51]" : "z-40", g),
					style: {
						width: d,
						top: b ? 0 : "var(--app-shell-chrome-h)"
					},
					"data-full-height": b ? "true" : void 0,
					children: e
				}), /* @__PURE__ */ Q("main", {
					className: t("relative z-[1] flex min-h-0 min-w-0 flex-1 flex-col bg-[var(--color-surface-panel)]", S && "overflow-hidden"),
					style: e ? {
						marginLeft: d,
						width: `calc(100% - ${d}px)`
					} : void 0,
					children: /* @__PURE__ */ Q("div", {
						className: t("flex min-h-0 flex-1 flex-col", S && "overflow-hidden", h === "md" ? "gap-4 px-[var(--ui-page-gutter,1.5rem)] pb-[var(--ui-page-gutter,1.5rem)] pt-4" : "gap-0 p-0"),
						"data-testid": "app-shell-content",
						"data-padding": h,
						children: a
					})
				})]
			}),
			s && /* @__PURE__ */ Q(Bo, { children: typeof s == "boolean" ? void 0 : s }),
			l
		]
	});
	return o === null ? T : o === void 0 ? /* @__PURE__ */ Q(n, { children: T }) : /* @__PURE__ */ $(Z, { children: [T, o] });
}
//#endregion
//#region src/theme/presets.ts
var Ho = {
	primary: "#5a61ff",
	primaryDark: "#4f55ff",
	primaryLight: "#93c5fd",
	danger: "#dc2626",
	dangerLight: "#fca5a5",
	success: "#16a34a",
	successLight: "#6ee7b7",
	warning: "#d97706",
	warningLight: "#fcd34d",
	info: "#2563eb",
	infoLight: "#7dd3fc",
	textPrimary: "#0f172a",
	textSecondary: "#475569",
	textMuted: "#64748b",
	textInverse: "#ffffff",
	background: "#f8fafc",
	surface: "#ffffff",
	surfaceRaised: "#ffffff",
	surfaceOverlay: "rgba(15, 23, 42, 0.5)",
	border: "#e2e8f0",
	borderLight: "#f1f5f9",
	spaceXs: "4px",
	spaceSm: "8px",
	spaceMd: "16px",
	spaceLg: "24px",
	spaceXl: "32px",
	fontXs: "11px",
	fontSm: "13px",
	fontMd: "14px",
	fontLg: "16px",
	fontXl: "22px",
	radiusSm: "4px",
	radiusMd: "6px",
	radiusLg: "8px",
	radiusXl: "12px",
	radiusFull: "9999px",
	shadowSm: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.08)",
	shadowMd: "0 4px 6px rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.06)",
	shadowLg: "0 10px 15px rgba(0,0,0,0.1), 0 4px 6px rgba(0,0,0,0.05)",
	shadowXl: "0 20px 25px rgba(0,0,0,0.15), 0 10px 10px rgba(0,0,0,0.04)"
}, Uo = {
	primary: "#8b91ff",
	primaryDark: "#646cff",
	primaryLight: "#312e81",
	danger: "#f87171",
	dangerLight: "#7f1d1d",
	success: "#34d399",
	successLight: "#064e3b",
	warning: "#fbbf24",
	warningLight: "#78350f",
	info: "#38bdf8",
	infoLight: "#0c4a6e",
	textPrimary: "#f1f5f9",
	textSecondary: "#cbd5e1",
	textMuted: "#64748b",
	textInverse: "#0f172a",
	background: "#0f172a",
	surface: "#1e293b",
	surfaceRaised: "#334155",
	surfaceOverlay: "rgba(0, 0, 0, 0.6)",
	border: "#334155",
	borderLight: "#1e293b",
	spaceXs: "4px",
	spaceSm: "8px",
	spaceMd: "16px",
	spaceLg: "24px",
	spaceXl: "32px",
	fontXs: "11px",
	fontSm: "13px",
	fontMd: "14px",
	fontLg: "16px",
	fontXl: "22px",
	radiusSm: "4px",
	radiusMd: "6px",
	radiusLg: "8px",
	radiusXl: "12px",
	radiusFull: "9999px",
	shadowSm: "0 1px 3px rgba(0,0,0,0.3), 0 1px 2px rgba(0,0,0,0.2)",
	shadowMd: "0 4px 6px rgba(0,0,0,0.25), 0 2px 4px rgba(0,0,0,0.15)",
	shadowLg: "0 10px 15px rgba(0,0,0,0.3), 0 4px 6px rgba(0,0,0,0.15)",
	shadowXl: "0 20px 25px rgba(0,0,0,0.4), 0 10px 10px rgba(0,0,0,0.2)"
};
//#endregion
//#region src/theme/css-variables.ts
function Wo(e) {
	return `--ui-${e.replace(/([A-Z])/g, "-$1").toLowerCase()}`;
}
function Go(e) {
	let t = {};
	for (let n of Object.keys(e)) t[Wo(n)] = e[n];
	return t;
}
function Ko(e) {
	let t = Go(e);
	return `:root {\n${Object.entries(t).map(([e, t]) => `  ${e}: ${t};`).join("\n")}\n}`;
}
function qo(e) {
	return `var(${Wo(e)})`;
}
var Jo = {
	primary: "--color-primary",
	primaryDark: "--color-primary-hover",
	danger: "--color-danger",
	success: "--color-success",
	warning: "--color-warning",
	info: "--color-info",
	textPrimary: "--color-text-primary",
	textSecondary: "--color-text-secondary",
	textMuted: "--color-text-tertiary",
	surface: "--color-surface",
	border: "--color-border",
	radiusSm: "--radius-sm",
	radiusMd: "--radius-md",
	radiusLg: "--radius-lg"
}, Yo = {
	base: "",
	bg: "-bg",
	fg: "-fg",
	border: "-border"
};
function Xo(e, t) {
	return `--color-${e}${Yo[t]}`;
}
//#endregion
//#region src/theme/ThemeProvider.tsx
var Zo = Qe(Ho), Qo = Qe(!1);
function $o({ children: e, preset: t = "light", theme: n, tones: r }) {
	let i = t === "dark" ? Uo : Ho, a = K(Qo), o = Y(!1), s = JSON.stringify(n ?? null), c = JSON.stringify(r ?? null), l = J(() => ({
		...i,
		...n
	}), [i, s]);
	return a && !o.current && process.env.NODE_ENV !== "production" && (o.current = !0, console.warn("[ThemeProvider] A nested ThemeProvider has no visual effect. Both write CSS custom properties to :root, and React runs child effects before parent effects, so the OUTER provider wins. useTheme() will report the inner tokens while the page renders the outer ones. Use a single app-level ThemeProvider, or scope a subtree by setting the --color-* variables on a wrapper element yourself.")), q(() => {
		if (a) return;
		let e = document.documentElement, t = Object.keys(l), n = [], i = (t, r) => {
			e.style.setProperty(t, r), n.push(t);
		};
		for (let e of t) {
			i(Wo(e), l[e]);
			let t = Jo[e];
			t && i(t, l[e]);
		}
		for (let [e, t] of Object.entries(r ?? {})) for (let [n, r] of Object.entries(t)) r && i(Xo(e, n), r);
		return () => {
			for (let t of n) e.style.removeProperty(t);
		};
	}, [
		l,
		c,
		a
	]), /* @__PURE__ */ Q(Qo.Provider, {
		value: !0,
		children: /* @__PURE__ */ Q(Zo.Provider, {
			value: l,
			children: e
		})
	});
}
function es() {
	return K(Zo);
}
//#endregion
//#region src/theme/useTheme.ts
function ts() {
	return es();
}
//#endregion
export { ea as $, zn as $t, go as A, ct as An, vr as At, Sa as B, rr as Bt, Eo as C, Lt as Cn, Wr as Ct, bo as D, Dt as Dn, Ir as Dt, xo as E, Mt as En, Rr as Et, Fa as F, $n as Ft, Aa as G, qn as Gt, ya as H, cr as Ht, va as I, ar as It, ca as J, Wn as Jt, _a as K, Kn as Kt, Ia as L, tr as Lt, mo as M, Tr as Mt, Ba as N, dr as Nt, yo as O, At as On, Nr as Ot, za as P, Qn as Pt, na as Q, Bn as Qt, Oa as R, er as Rt, Do as S, It as Sn, Gr as St, So as T, Ot as Tn, Br as Tt, xa as U, lr as Ut, ba as V, or as Vt, Ma as W, Zn as Wt, ra as X, Un as Xt, aa as Y, Hn as Yt, ia as Z, Vn as Zt, No as _, Yt as _n, ei as _t, qo as a, En as an, qi as at, ko as b, Vt as bn, qr as bt, Wo as c, yn as cn, ji as ct, Ho as d, sn as dn, gi as dt, Ln as en, $i as et, Vo as f, an as fn, di as ft, Po as g, Qt as gn, $r as gt, Io as h, $t as hn, ti as ht, Jo as i, On as in, Ji as it, vo as j, pr as jt, _o as k, bt as kn, Pr as kt, Xo as l, hn as ln, ki as lt, Ro as m, en as mn, li as mt, $o as n, kn as nn, Xi as nt, Ko as o, Tn as on, Hi as ot, zo as p, tn as pn, ui as pt, ma as q, Gn as qt, es as r, Nn as rn, Yi as rt, Go as s, wn as sn, Pi as st, ts as t, Pn as tn, Zi as tt, Uo as u, ln as un, Ti as ut, Mo as v, qt as vn, Jr as vt, Co as w, kt as wn, Vr as wt, Oo as x, Rt as xn, Xr as xt, Ao as y, Gt as yn, Kr as yt, Pa as z, nr as zt };
