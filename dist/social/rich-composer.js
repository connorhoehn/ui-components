import { t as e } from "../cn-D4QmbyEy.js";
import { n as t } from "../Button-C2OEUpX-.js";
import { i as n, r } from "../Tabs-DqkWBCTi.js";
import { r as i } from "../Density-Bm-JmcDy.js";
import { n as a } from "../Text-BA4t3u5l.js";
import { t as o } from "../Select-C6OGjVyH.js";
import { a as s, c, i as l, l as u, n as d, r as f, t as p } from "../composerSendError-D9zJtYFp.js";
import { a as m, i as ee, n as h, r as te, t as g } from "../composerContext-BLn1-Nao.js";
import { a as ne, c as re, i as _, l as v, n as ie, o as y, r as ae, s as b, t as x, u as oe } from "../RichChatComposer-CoJBAQzx.js";
import { t as se } from "../ContextComposer-0GvwmTR4.js";
import { t as ce } from "../AgentComposerDock-B6cpCVPP.js";
import { createContext as le, useCallback as S, useContext as ue, useEffect as C, useMemo as w, useRef as T, useState as E, useSyncExternalStore as D } from "react";
import { jsx as O, jsxs as k } from "react/jsx-runtime";
//#region src/components/social/conversationInputRegistry.ts
var A = { owner: "thread" };
function j(e, t) {
	if (!e) return A;
	for (let n = t.length - 1; n >= 0; --n) {
		let r = t[n];
		if (r.channels.includes(e)) return {
			owner: "composer",
			claimId: r.id,
			label: r.label,
			replies: r.replies
		};
	}
	return A;
}
var M = class {
	entries = [];
	claimsValue = [];
	listeners = /* @__PURE__ */ new Set();
	focusListeners = [];
	revealers = /* @__PURE__ */ new Set();
	nextId = 1;
	claim(e) {
		let t = {
			claim: {
				id: this.nextId++,
				channels: [...new Set(e.channels)],
				label: e.label,
				replies: !!e.replies
			},
			focus: e.focus
		};
		return this.entries = [...this.entries, t], this.publish(), () => {
			let e = this.entries.length;
			this.entries = this.entries.filter((e) => e !== t), this.entries.length !== e && this.publish();
		};
	}
	focusThread(e) {
		let t = j(e.channel, this.claimsValue);
		if (t.owner !== "composer") return !1;
		let n = this.entries.find((e) => e.claim.id === t.claimId);
		return n ? n.focus(e) : !1;
	}
	claims = () => this.claimsValue;
	onFocusRequest(e) {
		return this.focusListeners.push(e), this.publish(), () => {
			let t = this.focusListeners.lastIndexOf(e);
			t >= 0 && (this.focusListeners.splice(t, 1), this.publish());
		};
	}
	onReveal(e) {
		return this.revealers.add(e), () => {
			this.revealers.delete(e);
		};
	}
	requestFocus(e) {
		for (let t of this.revealers) t(e);
		for (let t of [...this.focusListeners]) if (t(e)) return !0;
		return !1;
	}
	composerPresent = () => this.focusListeners.length > 0;
	subscribe = (e) => (this.listeners.add(e), () => {
		this.listeners.delete(e);
	});
	publish() {
		let e = this.entries.map((e) => e.claim);
		e.length === this.claimsValue.length && e.every((e, t) => e === this.claimsValue[t]) || (this.claimsValue = e);
		for (let e of this.listeners) e();
	}
}, N = new M(), de = le(N);
function fe({ children: e }) {
	let [t] = E(() => new M());
	return /* @__PURE__ */ O(de.Provider, {
		value: t,
		children: e
	});
}
function P() {
	return ue(de);
}
function pe(e) {
	let t = P(), n = T(e.focus);
	n.current = e.focus;
	let r = e.channels.filter((e) => !!e), i = r.join("\n"), a = e.enabled !== !1 && r.length > 0;
	C(() => {
		if (a) return t.claim({
			channels: i.split("\n"),
			label: e.label,
			replies: !!e.replies,
			focus: (e) => n.current(e)
		});
	}, [
		t,
		a,
		i,
		e.label,
		e.replies
	]);
}
function me(e) {
	let t = P(), n = D(t.subscribe, t.claims, t.claims), r = w(() => j(e, n), [e, n]), i = S((n) => !!e && t.focusThread({
		channel: e,
		...n ? { reply: n } : {}
	}), [t, e]);
	return w(() => ({
		...r,
		focus: i
	}), [r, i]);
}
function he(e, t = !0) {
	let n = P(), r = T(e);
	r.current = e, C(() => t ? n.onFocusRequest((e) => r.current(e)) : void 0, [n, t]);
}
function ge(e, t = !0) {
	let n = P(), r = T(e);
	r.current = e, C(() => t ? n.onReveal((e) => r.current(e)) : void 0, [n, t]);
}
function F() {
	let e = P(), t = D(e.subscribe, e.composerPresent, e.composerPresent);
	return {
		request: S((t) => e.requestFocus(t), [e]),
		present: t
	};
}
function _e({ label: e, onFocus: r, "data-testid": i = "pane-input-handoff" }) {
	return /* @__PURE__ */ O(n, {
		gap: "none",
		className: "border-t border-border px-3 py-2",
		"data-testid": i,
		children: /* @__PURE__ */ k(t, {
			variant: "secondary",
			size: "sm",
			fullWidth: !0,
			onClick: r,
			title: `Write in ${e}`,
			"data-testid": `${i}-focus`,
			children: ["Reply in ", e]
		})
	});
}
function ve(e) {
	let { capabilities: t, offline: n } = e, r = [], i = {};
	if (e.hasChat) {
		r.push("chat");
		let a = n || (e.choosable > 0 ? null : e.chatOffReason || t.readOnlyReason || "You can read this conversation but not post to it.");
		a && (i.chat = a);
	}
	if (t.agent) {
		r.push("agent");
		let e = t.agent.allowed ? n || null : t.agent.reason || "The agent is not available to you here.";
		e && (i.agent = e);
	}
	return {
		modes: r,
		disabledModes: r.filter((e) => !!i[e]),
		reasons: i
	};
}
function ye(e, t, n) {
	if (t) {
		let n = e.find((e) => e.id === t);
		if (n) return n;
	}
	if (n) {
		let t = e.find((e) => e.id === n);
		if (t) return t;
	}
	return e.find((e) => !e.disabled) ?? null;
}
function be(e, t) {
	return [...new Set([e, ...t.map((e) => e.channel)].filter((e) => !!e))];
}
function I(e) {
	return e.replace(/<[^>]*>/g, "").trim();
}
function xe(e) {
	return e.mode === "chat" && !!e.channel && e.recipientChannel === e.channel && I(e.html).length > 0;
}
function Se(e) {
	return {
		displayName: e.displayName,
		...e.reply ? { replyTo: e.reply } : {},
		...e.reference?.page ? { pageReference: {
			kind: e.reference.page.kind,
			id: e.reference.page.id
		} } : {},
		...e.attachments?.length ? { attachments: [...e.attachments] } : {}
	};
}
function Ce(e) {
	let t = e.trim();
	return /^\/agent\s+/i.test(t) ? t.replace(/^\/agent\s+/i, "") : t;
}
function L(e, t) {
	let n = e.trim(), r = n.toLowerCase();
	for (let e of t) {
		let t = e.trigger.toLowerCase();
		if (r === t || r.startsWith(`${t} `) || r.startsWith(`${t}\n`)) return {
			command: e,
			argumentText: n.slice(e.trigger.length).trim()
		};
	}
	return null;
}
var we = "ui.conversation-draft:";
function R(e) {
	return `${we}${e}`;
}
function Te(e, t) {
	try {
		let n = e?.getItem(R(t));
		if (!n) return null;
		let r = JSON.parse(n);
		return r && typeof r.html == "string" && I(r.html) ? r.html : null;
	} catch {
		return null;
	}
}
function Ee(e, t, n) {
	try {
		I(n) ? e?.setItem(R(t), JSON.stringify({ html: n })) : e?.removeItem(R(t));
	} catch {}
}
var z = "Conversation changed; draft retained.";
function B(e) {
	return `Upload failed: ${(e ?? "").replace(/^upload failed:?\s*/i, "").trim() || "unknown error"}`;
}
function De(e) {
	return e.map((e) => e.name).join(", ");
}
var Oe = class {
	pending = /* @__PURE__ */ new Map();
	wait(e, t, n) {
		return new Promise((r, i) => {
			let a = setTimeout(() => {
				this.pending.delete(e) && i(Error(B(`timed out (${n})`)));
			}, t);
			this.pending.set(e, {
				resolve: r,
				reject: i,
				timer: a
			});
		});
	}
	complete(e, t) {
		let n = this.pending.get(e);
		return n ? (this.pending.delete(e), clearTimeout(n.timer), n.resolve(t), !0) : !1;
	}
	rejectAll(e) {
		for (let t of this.pending.values()) clearTimeout(t.timer), t.reject(Error(e));
		this.pending.clear();
	}
	get size() {
		return this.pending.size;
	}
}, ke = "Message sent. Your current draft has been kept.", Ae = "This destination is no longer available. Choose a current destination.", je = "This view has no page to attach.";
function Me(e, t) {
	typeof e == "function" ? e(t) : e && (e.current = t);
}
function Ne(e, t) {
	if (!t) return e;
	let n = Object.keys(t).filter((n) => !e.modes.includes(n) && t[n]);
	return n.length ? {
		modes: [...e.modes, ...n],
		disabledModes: [...e.disabledModes, ...n],
		reasons: {
			...e.reasons,
			...Object.fromEntries(n.map((e) => [e, t[e]]))
		}
	} : e;
}
function Pe() {
	try {
		return typeof window > "u" ? null : window.localStorage;
	} catch {
		return null;
	}
}
function Fe(e, t, n, r = 6e4) {
	let i = T(new Oe()), a = T(t);
	a.current = t, C(() => () => i.current.rejectAll(z), [t]);
	let { upload: o } = e.useFileUpload(t ?? "chat:no-conversation", {
		displayName: n,
		onComplete: (e) => {
			e.mine && i.current.complete(e.transferId, {
				id: e.transferId,
				name: e.filename,
				size: e.size,
				contentType: e.contentType,
				url: e.downloadUrl,
				...e.width ? { width: e.width } : {},
				...e.height ? { height: e.height } : {}
			});
		}
	}), s = S(async (e) => {
		let t = a.current;
		if (!t) throw new p("This conversation cannot take files yet.");
		let n;
		try {
			n = await o(e);
		} catch (e) {
			throw new p(B(e instanceof Error ? e.message : String(e)));
		}
		if (a.current !== t) throw Error(z);
		if (n.status === "failed") throw new p(B(n.error));
		if (!n.transferId) throw new p(B(`no transfer id for ${e.name}`));
		try {
			return await i.current.wait(n.transferId, r, e.name);
		} catch (e) {
			throw e instanceof Error && e.message === "Conversation changed; draft retained." ? e : new p(e instanceof Error ? e.message : B(void 0));
		}
	}, [o, r]);
	return S((e) => Promise.all(e.map(s)), [s]);
}
function Ie({ id: e, value: t, recipients: n, onChange: i, "data-testid": s }) {
	let c = n.filter((e) => !e.group).map((e) => ({
		value: e.id,
		label: e.label,
		...e.disabled ? { disabled: !0 } : {}
	})), l = [...new Set(n.filter((e) => e.group).map((e) => e.group))].map((e) => ({
		label: e,
		options: n.filter((t) => t.group === e).map((e) => ({
			value: e.id,
			label: e.label,
			...e.disabled ? { disabled: !0 } : {}
		}))
	}));
	return /* @__PURE__ */ k(r, {
		gap: "xs",
		align: "center",
		wrap: !1,
		className: "ml-1 min-w-0 self-start rounded-md border border-border bg-surface pl-2",
		children: [/* @__PURE__ */ O(a, {
			size: "xs",
			tone: "secondary",
			className: "shrink-0",
			children: "To:"
		}), /* @__PURE__ */ O(o, {
			id: e,
			"aria-label": "Chat recipient",
			value: t ?? "",
			size: "sm",
			placeholder: "Choose a destination",
			wrapperClassName: "max-w-[12rem]",
			className: "max-w-[12rem] truncate border-0 bg-transparent pr-7 text-xs font-medium",
			options: c,
			groups: l,
			chevron: "custom",
			...s ? { "data-testid": s } : {},
			onChange: (e) => i(e.target.value)
		})]
	});
}
function V(e) {
	function t(t) {
		return /* @__PURE__ */ O(Le, {
			rm: e,
			...t
		});
	}
	return t.displayName = "ConversationComposer", t;
}
function Le({ rm: t, channel: o, chat: c, context: l, capabilities: u, identity: d, offline: f, recipients: m, defaultRecipient: ee, recipient: h, onRecipientChange: te, commands: g = [], onAgent: ne, callBlock: re, reply: _, mode: v, onModeChange: ie, defaultMode: y, draftKey: ae, persistDraft: b = !0, claim: x = !1, answersFocus: oe = !1, onReveal: ce, disabled: le, offModes: ue, composerRef: D, onDraftChange: A, defaultDraft: j, draft: M, above: N, modeRowEnd: de, references: fe, onRemoveReference: P, modePlaceholders: me, contextChip: ge, sendWithReferencesOnly: F, console: _e, "data-testid": I = "conversation-composer", ...we }) {
	let R = i() === "compact", z = d?.displayName || "You", B = ae ?? o ?? `${l.kind}:${l.id}`, Oe = u.readOnlyReason || "You can read this conversation but not post to it.", V = w(() => {
		let e = m ?? (o ? [{
			id: "discussion",
			label: l.title || "This conversation",
			channel: o,
			attachments: !0
		}] : []);
		return e.map((t) => t.channel && t.channel === o && !u.maySend ? {
			...t,
			unavailableReason: t.unavailableReason ?? Oe,
			disabled: e.length > 1 || t.disabled
		} : t);
	}, [
		m,
		o,
		l.title,
		u.maySend,
		Oe
	]), [Le, Re] = E(null), H = h === void 0 ? Le : h, ze = !!H && !V.some((e) => e.id === H), U = ze ? {
		id: H,
		label: "Previous destination",
		disabled: !0,
		unavailableReason: Ae
	} : ye(V, H, ee), Be = V.filter((e) => !e.disabled && !e.unavailableReason).length, Ve = V.length > 0, W = Ne(ve({
		capabilities: u,
		hasChat: Ve,
		choosable: Be,
		offline: f ?? null,
		chatOffReason: U?.unavailableReason ?? null
	}), ue), He = y && W.modes.includes(y) ? y : W.modes.find((e) => !W.disabledModes.includes(e)) ?? W.modes[0] ?? "chat", [Ue, We] = E(He), G = v ?? Ue, K = S((e) => {
		v === void 0 && We(e), ie?.(e);
	}, [v, ie]), Ge = `${W.modes.join(",")}|${W.disabledModes.join(",")}`;
	C(() => {
		if (W.modes.includes(G) && !W.disabledModes.includes(G)) return;
		let e = W.modes.find((e) => !W.disabledModes.includes(e));
		e && e !== G && K(e);
	}, [
		Ge,
		G,
		K
	]);
	let [q, Ke] = E(!0), J = l.reference ?? null;
	C(() => {
		Ke(!0);
	}, [J?.id]);
	let qe = !!U && U.carriesReference !== !1, Je = !!J && !J.page, Ye = !!U && U.channel !== o, Xe = !!J && q && !(G === "chat" && (!qe || Je && Ye)), Y = G === "chat" && qe && q && !(Je && Ye) ? J : null, X = T(0), Z = M !== void 0, Ze = d?.userId?.trim() || null, Q = Ze ? JSON.stringify([
		"actor",
		Ze,
		B
	]) : null, Qe = b && !Z ? JSON.stringify([
		"actor",
		Ze,
		B
	]) : B, $e = JSON.stringify([
		B,
		o ?? null,
		d?.userId ?? null,
		U?.id ?? null,
		U?.channel ?? null
	]), et = T($e);
	et.current !== $e && (et.current = $e, X.current += 1);
	let tt = T(M);
	tt.current = M;
	let nt = w(() => {
		if (Z || !b || !Q) return j;
		let e = Te(Pe(), Q);
		return e ? {
			html: e,
			files: []
		} : j;
	}, [
		Qe,
		Z,
		b
	]), rt = T(""), it = S((e, t) => {
		X.current += 1, rt.current = e.html, b && !Z && Q && Ee(Pe(), Q, e.html), c?.setTyping?.(xe({
			html: e.html,
			mode: G,
			recipientChannel: U?.channel,
			channel: o
		})), A?.(e, t);
	}, [
		b,
		Z,
		Q,
		c,
		G,
		U?.channel,
		o,
		A
	]);
	C(() => {
		xe({
			html: rt.current,
			mode: G,
			recipientChannel: U?.channel,
			channel: o
		}) || c?.setTyping?.(!1);
	}, [
		G,
		U?.channel,
		o
	]);
	let at = G === "chat" && u.mayAttach && U?.attachments && U.channel ? U.channel : null, ot = Fe(t, at, z), [st, ct] = E(null), lt = T(null), ut = S((e) => {
		lt.current = e, Me(D, e);
	}, [D]), $ = S(() => {
		ce?.();
		let e = 20, t = () => {
			lt.current ? lt.current.focus() : e-- > 0 && requestAnimationFrame(t);
		};
		requestAnimationFrame(t);
	}, [ce]), dt = S((e) => {
		Re(e), te?.(e), X.current += 1, ct(null), V.find((t) => t.id === e)?.onSelect?.();
	}, [V, te]), ft = V.filter((e) => e.claim !== !1);
	pe({
		channels: x ? be(u.maySend || m === void 0 ? o : null, ft) : [],
		label: x ? x.label : "",
		replies: x ? !!x.replies : !1,
		enabled: !!x && x.enabled !== !1,
		focus: (e) => {
			let t = ft.find((t) => t.channel === e.channel);
			return K("chat"), t && dt(t.id), $(), !0;
		}
	}), he(S((e) => {
		if (e.mode === "agent") return !W.modes.includes("agent") || W.disabledModes.includes("agent") ? !1 : (K("agent"), $(), !0);
		if (!W.modes.includes("chat") || W.disabledModes.includes("chat")) return !1;
		let t = e.target, n = t ? t.kind === "discussion" ? V.find((e) => e.channel && e.channel === o) ?? (m ? V.find((e) => e.id === "discussion") : U) : t.kind === "huddle" ? ft.find((e) => e.id.startsWith("huddle:")) ?? null : t.kind === "person" ? V.find((e) => e.id === `person:${t.userId}`) ?? null : V.find((e) => e.channel === t.channel) ?? null : U;
		return !n || n.disabled ? !1 : (n.id !== U?.id && dt(n.id), K("chat"), $(), !0);
	}, [
		W,
		K,
		$,
		U,
		V,
		m,
		ft,
		o,
		dt
	]), oe);
	let pt = w(() => g.filter((e) => !e.modes || e.modes.includes(G)), [g, G]), mt = w(() => pt.map((e) => ({
		trigger: e.trigger,
		label: e.label,
		...e.hint ? { hint: e.hint } : {},
		...e.description ? { description: e.description } : {},
		...e.icon ? { icon: e.icon } : {},
		...e.disabled ? { disabled: !0 } : {},
		...e.argument ? { argument: e.argument } : {}
	})), [pt]), ht = (e) => {
		if (typeof e == "string") throw new p(e);
		return e !== !1;
	}, gt = async (e, t) => {
		ct(null);
		let n = (n, r, i) => ({
			trigger: r,
			text: n,
			argumentText: i,
			mode: t,
			reference: Y ?? (q ? J : null),
			recipientId: U?.id ?? null,
			message: e,
			...e.command?.argument ? { argument: {
				id: e.command.argument.id,
				label: e.command.argument.label
			} } : {}
		});
		if (t === "agent") {
			if (!u.agent?.allowed || f) return !1;
			let t = e.text.trim();
			if (!t) return !1;
			let r = g.filter((e) => !e.modes || e.modes.includes("agent")), i = Ce(t), a = L(t, r) ?? (i === t ? null : L(i, r));
			if (a) {
				let e = L(t, [a.command]) ? t : i;
				return !a.command.disabled && ht(await a.command.run(n(e, a.command.trigger, a.argumentText)));
			}
			if (!i) return !1;
			if (ne) return ht(await ne(i, n(i, "", i)));
			let o = r.find((e) => e.trigger === "/agent");
			return o ? ht(await o.run(n(`/agent ${i}`, "/agent", i))) : !1;
		}
		if (!e.files.length) {
			let t = L(e.text, g.filter((e) => !e.modes || e.modes.includes("chat")));
			if (t) return !t.command.disabled && (c?.setTyping?.(!1), ht(await t.command.run(n(e.text.trim(), t.command.trigger, t.argumentText))));
		}
		if (!U || U.disabled || U.unavailableReason || f) return !1;
		let r = e.text.trim(), i = !r && !e.files.length && !!F && (!!Y || (fe?.length ?? 0) > 0);
		if (!r && !e.files.length && !i || e.files.length && !at) return !1;
		c?.setTyping?.(!1);
		let a = X.current, s = et.current, l = e.files.length ? await ot(e.files) : [], d = !!U.channel && U.channel === o, p = Se({
			displayName: z,
			reply: d ? _?.reply ?? null : null,
			reference: Y,
			attachments: l
		}), m = r || De(l), ee = {
			text: m,
			html: e.html,
			files: e.files,
			metadata: p,
			reference: Y
		}, h;
		return U.send ? h = await U.send(ee) : c ? (c.sendMessage(m, p), h = !0) : h = !1, h ? X.current !== a || tt.current !== M ? (et.current === s && ct(ke), !1) : (d && _?.clear(), b && !Z && Q && Ee(Pe(), Q, ""), !0) : !1;
	}, _t = Xe && J ? /* @__PURE__ */ O(s, {
		references: [{
			id: J.id,
			label: R ? J.label.split(" › ").pop() ?? J.label : J.label,
			title: J.label
		}],
		onRemove: () => {
			Ke(!1), X.current += 1, P?.(J.id);
		},
		removeLabel: (e) => `Remove ${e.label} from this draft`,
		size: "md",
		className: "min-w-0 max-w-[max(9rem,min(30rem,calc(100cqw-22rem)))] flex-nowrap p-0",
		"data-testid": "rich-chat-composer-references"
	}) : null, vt = ze && U ? [...V, U] : V, yt = G === "chat" && vt.length > 1, bt = G === "chat" && q && Je && Ye && qe, xt = G === "chat" && vt.length > 1 ? U?.unavailableReason ?? (U ? null : "Choose a destination.") : null, St = G === "chat" ? U?.error ?? null : null, Ct = yt || xt || st || bt || St || N != null && N !== !1 ? /* @__PURE__ */ k(n, {
		gap: "xs",
		children: [
			N,
			yt && /* @__PURE__ */ O(Ie, {
				id: `${B}-recipient`,
				value: U?.id ?? null,
				recipients: vt,
				onChange: dt,
				"data-testid": `${I}-recipient`
			}),
			xt && /* @__PURE__ */ O(a, {
				size: "xs",
				tone: "tertiary",
				wrap: !0,
				"data-testid": `${I}-recipient-unavailable`,
				children: xt
			}),
			bt && /* @__PURE__ */ O(a, {
				size: "xs",
				tone: "tertiary",
				wrap: !0,
				children: je
			}),
			st && /* @__PURE__ */ O(a, {
				size: "xs",
				tone: "secondary",
				wrap: !0,
				"data-testid": `${I}-note`,
				children: st
			}),
			St && /* @__PURE__ */ O(a, {
				size: "xs",
				className: "text-error",
				wrap: !0,
				"data-testid": `${I}-recipient-error`,
				children: St
			})
		]
	}) : void 0, wt = !R, Tt = wt && _t || de ? /* @__PURE__ */ k(r, {
		gap: "xs",
		align: "center",
		wrap: !1,
		className: "min-w-0",
		children: [wt ? _t : null, de]
	}) : void 0, Et = !wt && Xe && J ? [{
		id: J.id,
		label: J.label.split(" › ").pop() ?? J.label,
		title: J.label
	}, ...fe ?? []] : fe, Dt = (e) => {
		J && e === J.id && (Ke(!1), X.current += 1), P?.(e);
	}, Ot = {
		...me,
		...G === "chat" && U?.placeholder ? { chat: U.placeholder } : {}
	}, kt = G === "chat" && (!U || !!U.unavailableReason || !!U.disabled);
	return /* @__PURE__ */ O(se, {
		...we,
		context: l,
		composerRef: ut,
		"data-testid": I,
		...R ? { responsive: "pane" } : {},
		console: _e ?? !!re,
		dock: re,
		mode: G,
		onModeChange: K,
		modes: W.modes,
		disabledModes: W.disabledModes,
		modeUnavailableReasons: W.reasons,
		chatAvailable: Ve && !W.reasons.chat,
		contextChip: ge ?? (!J && void 0),
		...Ct ? { above: Ct } : {},
		...Tt ? { modeRowEnd: Tt } : {},
		...Et ? {
			references: Et,
			onRemoveReference: Dt
		} : {},
		modePlaceholders: Ot,
		commands: mt,
		reply: G === "chat" && _?.reply && U?.channel === o ? {
			author: _.reply.author,
			quote: _.reply.text,
			messageId: _.reply.messageId,
			..._.reply.timestamp ? { timestamp: _.reply.timestamp } : {},
			onDismiss: _.clear
		} : null,
		allowAttachments: !!at,
		...F === void 0 ? {} : { sendWithReferencesOnly: F },
		disabled: !!le || !!f || kt || G === "agent" && !u.agent?.allowed,
		draftKey: Qe,
		...Z ? { draft: M } : {},
		...nt === void 0 ? {} : { defaultDraft: nt },
		onDraftChange: it,
		onSend: (e, t) => gt(e, t.mode),
		className: e(we.className)
	});
}
//#endregion
export { ce as AgentComposerDock, x as COMPOSER_BREAKPOINTS, g as COMPOSER_CONTEXT_KINDS, h as COMPOSER_CONTEXT_REASONS, ie as COMPOSER_MODE_ORDER, y as CommandSuggestions, oe as ComposerAttachments, s as ComposerReferences, p as ComposerSendError, se as ContextComposer, fe as ConversationInputProvider, re as DocumentSuggestions, c as EMOJI_SHORTCODES, b as EmojiSuggestions, v as MentionSuggestions, ae as RichChatComposer, _e as ThreadInputHandoff, De as attachmentOnlyText, f as composerCommandArgumentText, te as composerContextPreset, m as composerDraftOf, d as composerSendErrorReason, _ as composerSizeFor, V as createConversationComposer, ee as identityDisplayName, l as matchComposerCommand, ne as matchesModeTrigger, u as searchEmoji, F as useComposerFocus, ge as useComposerFocusReveal, Fe as useConversationUploads, me as useThreadInput };
