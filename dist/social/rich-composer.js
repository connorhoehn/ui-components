import { t as e } from "../cn-D4QmbyEy.js";
import { c as t } from "../Button-uREUOWUk.js";
import { c as n, l as r, n as i } from "../Text-DtCnB-EA.js";
import { t as a } from "../Select-DcKBWGgP.js";
import { a as o, c as s, i as c, l, n as u, r as d, t as f } from "../composerSendError-CGnAqRRn.js";
import { a as p, i as m, n as ee, r as h, t as te } from "../composerContext-BLn1-Nao.js";
import { a as ne, i as g, n as re, o as ie, r as ae, s as _, t as v } from "../ConversationInputs-B2Y9iIaf.js";
import { a as oe, c as y, i as se, l as b, n as x, o as ce, r as le, s as ue, t as de, u as fe } from "../RichChatComposer-j0S880eo.js";
import { t as pe } from "../ContextComposer-CfAW-ePs.js";
import { t as me } from "../AgentComposerDock-m78azCjz.js";
import { useCallback as S, useEffect as C, useMemo as w, useRef as T, useState as E } from "react";
import { jsx as D, jsxs as he } from "react/jsx-runtime";
function ge(e) {
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
function _e(e, t, n) {
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
function ve(e, t) {
	return [...new Set([e, ...t.map((e) => e.channel)].filter((e) => !!e))];
}
function O(e) {
	return e.replace(/<[^>]*>/g, "").trim();
}
function ye(e) {
	return e.mode === "chat" && !!e.channel && e.recipientChannel === e.channel && O(e.html).length > 0;
}
function be(e) {
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
function xe(e) {
	let t = e.trim();
	return /^\/agent\s+/i.test(t) ? t.replace(/^\/agent\s+/i, "") : t;
}
function k(e, t) {
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
var A = "ui.conversation-draft:";
function j(e) {
	return `${A}${e}`;
}
function Se(e, t) {
	try {
		let n = e?.getItem(j(t));
		if (!n) return null;
		let r = JSON.parse(n);
		return r && typeof r.html == "string" && O(r.html) ? r.html : null;
	} catch {
		return null;
	}
}
function Ce(e, t, n) {
	try {
		O(n) ? e?.setItem(j(t), JSON.stringify({ html: n })) : e?.removeItem(j(t));
	} catch {}
}
var M = "Conversation changed; draft retained.";
function N(e) {
	return `Upload failed: ${(e ?? "").replace(/^upload failed:?\s*/i, "").trim() || "unknown error"}`;
}
function we(e) {
	return e.map((e) => e.name).join(", ");
}
var Te = class {
	pending = /* @__PURE__ */ new Map();
	wait(e, t, n) {
		return new Promise((r, i) => {
			let a = setTimeout(() => {
				this.pending.delete(e) && i(Error(N(`timed out (${n})`)));
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
}, Ee = "Message sent. Your current draft has been kept.", De = "This destination is no longer available. Choose a current destination.", Oe = "This view has no page to attach.";
function ke(e, t) {
	typeof e == "function" ? e(t) : e && (e.current = t);
}
function Ae(e, t) {
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
function je() {
	try {
		return typeof window > "u" ? null : window.localStorage;
	} catch {
		return null;
	}
}
function Me(e, t, n, r = 6e4) {
	let i = T(new Te()), a = T(t);
	a.current = t, C(() => () => i.current.rejectAll(M), [t]);
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
		if (!t) throw new f("This conversation cannot take files yet.");
		let n;
		try {
			n = await o(e);
		} catch (e) {
			throw new f(N(e instanceof Error ? e.message : String(e)));
		}
		if (a.current !== t) throw Error(M);
		if (n.status === "failed") throw new f(N(n.error));
		if (!n.transferId) throw new f(N(`no transfer id for ${e.name}`));
		try {
			return await i.current.wait(n.transferId, r, e.name);
		} catch (e) {
			throw e instanceof Error && e.message === "Conversation changed; draft retained." ? e : new f(e instanceof Error ? e.message : N(void 0));
		}
	}, [o, r]);
	return S((e) => Promise.all(e.map(s)), [s]);
}
function Ne({ id: e, value: t, recipients: r, onChange: o, "data-testid": s }) {
	let c = r.filter((e) => !e.group).map((e) => ({
		value: e.id,
		label: e.label,
		...e.disabled ? { disabled: !0 } : {}
	})), l = [...new Set(r.filter((e) => e.group).map((e) => e.group))].map((e) => ({
		label: e,
		options: r.filter((t) => t.group === e).map((e) => ({
			value: e.id,
			label: e.label,
			...e.disabled ? { disabled: !0 } : {}
		}))
	}));
	return /* @__PURE__ */ he(n, {
		gap: "xs",
		align: "center",
		wrap: !1,
		className: "ml-1 min-w-0 self-start rounded-md border border-border bg-surface pl-2",
		children: [/* @__PURE__ */ D(i, {
			size: "xs",
			tone: "secondary",
			className: "shrink-0",
			children: "To:"
		}), /* @__PURE__ */ D(a, {
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
			onChange: (e) => o(e.target.value)
		})]
	});
}
function Pe(e) {
	function t(t) {
		return /* @__PURE__ */ D(Fe, {
			rm: e,
			...t
		});
	}
	return t.displayName = "ConversationComposer", t;
}
function Fe({ rm: a, channel: s, chat: c, context: l, capabilities: u, identity: d, offline: p, recipients: m, defaultRecipient: ee, recipient: h, onRecipientChange: te, commands: g = [], onAgent: re, callBlock: ie, reply: _, mode: v, onModeChange: oe, defaultMode: y, draftKey: se, persistDraft: b = !0, claim: x = !1, answersFocus: ce = !1, onReveal: le, disabled: ue, offModes: de, composerRef: fe, onDraftChange: me, defaultDraft: O, draft: A, above: j, modeRowEnd: M, references: N, onRemoveReference: Te, modePlaceholders: Pe, contextChip: Fe, sendWithReferencesOnly: Ie, console: Le, "data-testid": P = "conversation-composer", ...Re }) {
	let ze = t() === "compact", Be = d?.displayName || "You", F = se ?? s ?? `${l.kind}:${l.id}`, Ve = u.readOnlyReason || "You can read this conversation but not post to it.", I = w(() => {
		let e = m ?? (s ? [{
			id: "discussion",
			label: l.title || "This conversation",
			channel: s,
			attachments: !0
		}] : []);
		return e.map((t) => t.channel && t.channel === s && !u.maySend ? {
			...t,
			unavailableReason: t.unavailableReason ?? Ve,
			disabled: e.length > 1 || t.disabled
		} : t);
	}, [
		m,
		s,
		l.title,
		u.maySend,
		Ve
	]), [He, Ue] = E(null), L = h === void 0 ? He : h, We = !!L && !I.some((e) => e.id === L), R = We ? {
		id: L,
		label: "Previous destination",
		disabled: !0,
		unavailableReason: De
	} : _e(I, L, ee), Ge = I.filter((e) => !e.disabled && !e.unavailableReason).length, Ke = I.length > 0, z = Ae(ge({
		capabilities: u,
		hasChat: Ke,
		choosable: Ge,
		offline: p ?? null,
		chatOffReason: R?.unavailableReason ?? null
	}), de), qe = y && z.modes.includes(y) ? y : z.modes.find((e) => !z.disabledModes.includes(e)) ?? z.modes[0] ?? "chat", [Je, Ye] = E(qe), B = v ?? Je, V = S((e) => {
		v === void 0 && Ye(e), oe?.(e);
	}, [v, oe]), Xe = `${z.modes.join(",")}|${z.disabledModes.join(",")}`;
	C(() => {
		if (z.modes.includes(B) && !z.disabledModes.includes(B)) return;
		let e = z.modes.find((e) => !z.disabledModes.includes(e));
		e && e !== B && V(e);
	}, [
		Xe,
		B,
		V
	]);
	let [H, Ze] = E(!0), U = l.reference ?? null;
	C(() => {
		Ze(!0);
	}, [U?.id]);
	let Qe = !!R && R.carriesReference !== !1, $e = !!U && !U.page, et = !!R && R.channel !== s, tt = !!U && H && !(B === "chat" && (!Qe || $e && et)), W = B === "chat" && Qe && H && !($e && et) ? U : null, G = T(0), K = A !== void 0, nt = d?.userId?.trim() || null, q = nt ? JSON.stringify([
		"actor",
		nt,
		F
	]) : null, rt = b && !K ? JSON.stringify([
		"actor",
		nt,
		F
	]) : F, it = JSON.stringify([
		F,
		s ?? null,
		d?.userId ?? null,
		R?.id ?? null,
		R?.channel ?? null
	]), J = T(it);
	J.current !== it && (J.current = it, G.current += 1);
	let at = T(A);
	at.current = A;
	let ot = w(() => {
		if (K || !b || !q) return O;
		let e = Se(je(), q);
		return e ? {
			html: e,
			files: []
		} : O;
	}, [
		rt,
		K,
		b
	]), st = T(""), ct = S((e, t) => {
		G.current += 1, st.current = e.html, b && !K && q && Ce(je(), q, e.html), c?.setTyping?.(ye({
			html: e.html,
			mode: B,
			recipientChannel: R?.channel,
			channel: s
		})), me?.(e, t);
	}, [
		b,
		K,
		q,
		c,
		B,
		R?.channel,
		s,
		me
	]);
	C(() => {
		ye({
			html: st.current,
			mode: B,
			recipientChannel: R?.channel,
			channel: s
		}) || c?.setTyping?.(!1);
	}, [
		B,
		R?.channel,
		s
	]);
	let lt = B === "chat" && u.mayAttach && R?.attachments && R.channel ? R.channel : null, ut = Me(a, lt, Be), [dt, ft] = E(null), pt = T(null), mt = S((e) => {
		pt.current = e, ke(fe, e);
	}, [fe]), Y = S(() => {
		le?.();
		let e = 20, t = () => {
			pt.current ? pt.current.focus() : e-- > 0 && requestAnimationFrame(t);
		};
		requestAnimationFrame(t);
	}, [le]), X = S((e) => {
		Ue(e), te?.(e), G.current += 1, ft(null), I.find((t) => t.id === e)?.onSelect?.();
	}, [I, te]), Z = I.filter((e) => e.claim !== !1);
	ae({
		channels: x ? ve(u.maySend || m === void 0 ? s : null, Z) : [],
		label: x ? x.label : "",
		replies: x ? !!x.replies : !1,
		enabled: !!x && x.enabled !== !1,
		focus: (e) => {
			let t = Z.find((t) => t.channel === e.channel);
			return V("chat"), t && X(t.id), Y(), !0;
		}
	});
	let ht = S((e) => {
		if (e.mode === "agent") return !z.modes.includes("agent") || z.disabledModes.includes("agent") ? !1 : (V("agent"), Y(), !0);
		if (!z.modes.includes("chat") || z.disabledModes.includes("chat")) return !1;
		let t = e.target, n = t ? t.kind === "discussion" ? I.find((e) => e.channel && e.channel === s) ?? (m ? I.find((e) => e.id === "discussion") : R) : t.kind === "huddle" ? Z.find((e) => e.id.startsWith("huddle:")) ?? null : t.kind === "person" ? I.find((e) => e.id === `person:${t.userId}`) ?? null : I.find((e) => e.channel === t.channel) ?? null : R;
		return !n || n.disabled ? !1 : (n.id !== R?.id && X(n.id), V("chat"), Y(), !0);
	}, [
		z,
		V,
		Y,
		R,
		I,
		m,
		Z,
		s,
		X
	]);
	ne(ht, ce);
	let gt = w(() => g.filter((e) => !e.modes || e.modes.includes(B)), [g, B]), _t = w(() => gt.map((e) => ({
		trigger: e.trigger,
		label: e.label,
		...e.hint ? { hint: e.hint } : {},
		...e.description ? { description: e.description } : {},
		...e.icon ? { icon: e.icon } : {},
		...e.disabled ? { disabled: !0 } : {},
		...e.argument ? { argument: e.argument } : {}
	})), [gt]), Q = (e) => {
		if (typeof e == "string") throw new f(e);
		return e !== !1;
	}, vt = async (e, t) => {
		ft(null);
		let n = (n, r, i) => ({
			trigger: r,
			text: n,
			argumentText: i,
			mode: t,
			reference: W ?? (H ? U : null),
			recipientId: R?.id ?? null,
			message: e,
			...e.command?.argument ? { argument: {
				id: e.command.argument.id,
				label: e.command.argument.label
			} } : {}
		});
		if (t === "agent") {
			if (!u.agent?.allowed || p) return !1;
			let t = e.text.trim();
			if (!t) return !1;
			let r = g.filter((e) => !e.modes || e.modes.includes("agent")), i = xe(t), a = k(t, r) ?? (i === t ? null : k(i, r));
			if (a) {
				let e = k(t, [a.command]) ? t : i;
				return !a.command.disabled && Q(await a.command.run(n(e, a.command.trigger, a.argumentText)));
			}
			if (!i) return !1;
			if (re) return Q(await re(i, n(i, "", i)));
			let o = r.find((e) => e.trigger === "/agent");
			return o ? Q(await o.run(n(`/agent ${i}`, "/agent", i))) : !1;
		}
		if (!e.files.length) {
			let t = k(e.text, g.filter((e) => !e.modes || e.modes.includes("chat")));
			if (t) return !t.command.disabled && (c?.setTyping?.(!1), Q(await t.command.run(n(e.text.trim(), t.command.trigger, t.argumentText))));
		}
		if (!R || R.disabled || R.unavailableReason || p) return !1;
		let r = e.text.trim(), i = !r && !e.files.length && !!Ie && (!!W || (N?.length ?? 0) > 0);
		if (!r && !e.files.length && !i || e.files.length && !lt) return !1;
		c?.setTyping?.(!1);
		let a = G.current, o = J.current, l = e.files.length ? await ut(e.files) : [], d = !!R.channel && R.channel === s, f = be({
			displayName: Be,
			reply: d ? _?.reply ?? null : null,
			reference: W,
			attachments: l
		}), m = r || we(l), ee = {
			text: m,
			html: e.html,
			files: e.files,
			metadata: f,
			reference: W
		}, h;
		return R.send ? h = await R.send(ee) : c ? (c.sendMessage(m, f), h = !0) : h = !1, h ? G.current !== a || at.current !== A ? (J.current === o && ft(Ee), !1) : (d && _?.clear(), b && !K && q && Ce(je(), q, ""), !0) : !1;
	}, yt = tt && U ? /* @__PURE__ */ D(o, {
		references: [{
			id: U.id,
			label: ze ? U.label.split(" › ").pop() ?? U.label : U.label,
			title: U.label
		}],
		onRemove: () => {
			Ze(!1), G.current += 1, Te?.(U.id);
		},
		removeLabel: (e) => `Remove ${e.label} from this draft`,
		size: "md",
		className: "min-w-0 max-w-[max(9rem,min(30rem,calc(100cqw-22rem)))] flex-nowrap p-0",
		"data-testid": "rich-chat-composer-references"
	}) : null, bt = We && R ? [...I, R] : I, xt = B === "chat" && bt.length > 1, St = B === "chat" && H && $e && et && Qe, Ct = B === "chat" && bt.length > 1 ? R?.unavailableReason ?? (R ? null : "Choose a destination.") : null, wt = B === "chat" ? R?.error ?? null : null, Tt = xt || Ct || dt || St || wt || j != null && j !== !1 ? /* @__PURE__ */ he(r, {
		gap: "xs",
		children: [
			j,
			xt && /* @__PURE__ */ D(Ne, {
				id: `${F}-recipient`,
				value: R?.id ?? null,
				recipients: bt,
				onChange: X,
				"data-testid": `${P}-recipient`
			}),
			Ct && /* @__PURE__ */ D(i, {
				size: "xs",
				tone: "tertiary",
				wrap: !0,
				"data-testid": `${P}-recipient-unavailable`,
				children: Ct
			}),
			St && /* @__PURE__ */ D(i, {
				size: "xs",
				tone: "tertiary",
				wrap: !0,
				children: Oe
			}),
			dt && /* @__PURE__ */ D(i, {
				size: "xs",
				tone: "secondary",
				wrap: !0,
				"data-testid": `${P}-note`,
				children: dt
			}),
			wt && /* @__PURE__ */ D(i, {
				size: "xs",
				className: "text-error",
				wrap: !0,
				"data-testid": `${P}-recipient-error`,
				children: wt
			})
		]
	}) : void 0, $ = !ze, Et = $ && yt || M ? /* @__PURE__ */ he(n, {
		gap: "xs",
		align: "center",
		wrap: !1,
		className: "min-w-0",
		children: [$ ? yt : null, M]
	}) : void 0, Dt = !$ && tt && U ? [{
		id: U.id,
		label: U.label.split(" › ").pop() ?? U.label,
		title: U.label
	}, ...N ?? []] : N, Ot = (e) => {
		U && e === U.id && (Ze(!1), G.current += 1), Te?.(e);
	}, kt = {
		...Pe,
		...B === "chat" && R?.placeholder ? { chat: R.placeholder } : {}
	}, At = B === "chat" && (!R || !!R.unavailableReason || !!R.disabled);
	return /* @__PURE__ */ D(pe, {
		...Re,
		context: l,
		composerRef: mt,
		"data-testid": P,
		...ze ? { responsive: "pane" } : {},
		console: Le ?? !!ie,
		dock: ie,
		mode: B,
		onModeChange: V,
		modes: z.modes,
		disabledModes: z.disabledModes,
		modeUnavailableReasons: z.reasons,
		chatAvailable: Ke && !z.reasons.chat,
		contextChip: Fe ?? (!U && void 0),
		...Tt ? { above: Tt } : {},
		...Et ? { modeRowEnd: Et } : {},
		...Dt ? {
			references: Dt,
			onRemoveReference: Ot
		} : {},
		modePlaceholders: kt,
		commands: _t,
		reply: B === "chat" && _?.reply && R?.channel === s ? {
			author: _.reply.author,
			quote: _.reply.text,
			messageId: _.reply.messageId,
			..._.reply.timestamp ? { timestamp: _.reply.timestamp } : {},
			onDismiss: _.clear
		} : null,
		allowAttachments: !!lt,
		...Ie === void 0 ? {} : { sendWithReferencesOnly: Ie },
		disabled: !!ue || !!p || At || B === "agent" && !u.agent?.allowed,
		draftKey: rt,
		...K ? { draft: A } : {},
		...ot === void 0 ? {} : { defaultDraft: ot },
		onDraftChange: ct,
		onSend: (e, t) => vt(e, t.mode),
		className: e(Re.className)
	});
}
//#endregion
export { me as AgentComposerDock, de as COMPOSER_BREAKPOINTS, te as COMPOSER_CONTEXT_KINDS, ee as COMPOSER_CONTEXT_REASONS, x as COMPOSER_MODE_ORDER, ce as CommandSuggestions, fe as ComposerAttachments, o as ComposerReferences, f as ComposerSendError, pe as ContextComposer, v as ConversationInputProvider, y as DocumentSuggestions, s as EMOJI_SHORTCODES, ue as EmojiSuggestions, b as MentionSuggestions, le as RichChatComposer, re as ThreadInputHandoff, we as attachmentOnlyText, d as composerCommandArgumentText, h as composerContextPreset, p as composerDraftOf, u as composerSendErrorReason, se as composerSizeFor, Pe as createConversationComposer, m as identityDisplayName, c as matchComposerCommand, oe as matchesModeTrigger, l as searchEmoji, g as useComposerFocus, ie as useComposerFocusReveal, Me as useConversationUploads, _ as useThreadInput };
