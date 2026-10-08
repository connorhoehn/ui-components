import { t as e } from "../cn-D4QmbyEy.js";
import { n as t } from "../Button-C2OEUpX-.js";
import { i as n } from "../Density-BgubVeSf.js";
import { o as r, s as i } from "../Tabs-5OOt62a7.js";
import { n as a } from "../Text-82JZ-0H8.js";
import { t as o } from "../Select-C6OGjVyH.js";
import { a as s, c, i as l, l as u, n as ee, r as d, t as f } from "../composerSendError-D9zJtYFp.js";
import { a as p, i as m, n as te, r as ne, t as h } from "../composerContext-BLn1-Nao.js";
import { a as re, c as ie, i as g, l as _, n as ae, o as v, r as oe, s as y, t as b, u as se } from "../RichChatComposer-C1MzXjUD.js";
import { t as ce } from "../ContextComposer-C-Hbo0Lb.js";
import { t as le } from "../AgentComposerDock-Bd1qkWte.js";
import { createContext as ue, useCallback as x, useContext as de, useEffect as S, useMemo as C, useRef as w, useState as T, useSyncExternalStore as E } from "react";
import { jsx as D, jsxs as O } from "react/jsx-runtime";
//#region src/components/social/conversationInputRegistry.ts
var k = { owner: "thread" };
function A(e, t) {
	if (!e) return k;
	for (let n = t.length - 1; n >= 0; --n) {
		let r = t[n];
		if (r.channels.includes(e)) return {
			owner: "composer",
			claimId: r.id,
			label: r.label,
			replies: r.replies
		};
	}
	return k;
}
var j = class {
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
		let t = A(e.channel, this.claimsValue);
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
}, M = new j(), N = ue(M);
function P({ children: e }) {
	let [t] = T(() => new j());
	return /* @__PURE__ */ D(N.Provider, {
		value: t,
		children: e
	});
}
function F() {
	return de(N);
}
function fe(e) {
	let t = F(), n = w(e.focus);
	n.current = e.focus;
	let r = e.channels.filter((e) => !!e), i = r.join("\n"), a = e.enabled !== !1 && r.length > 0;
	S(() => {
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
function pe(e) {
	let t = F(), n = E(t.subscribe, t.claims, t.claims), r = C(() => A(e, n), [e, n]), i = x((n) => !!e && t.focusThread({
		channel: e,
		...n ? { reply: n } : {}
	}), [t, e]);
	return C(() => ({
		...r,
		focus: i
	}), [r, i]);
}
function me(e, t = !0) {
	let n = F(), r = w(e);
	r.current = e, S(() => t ? n.onFocusRequest((e) => r.current(e)) : void 0, [n, t]);
}
function he(e, t = !0) {
	let n = F(), r = w(e);
	r.current = e, S(() => t ? n.onReveal((e) => r.current(e)) : void 0, [n, t]);
}
function I() {
	let e = F(), t = E(e.subscribe, e.composerPresent, e.composerPresent);
	return {
		request: x((t) => e.requestFocus(t), [e]),
		present: t
	};
}
function ge({ label: e, onFocus: n, "data-testid": r = "pane-input-handoff" }) {
	return /* @__PURE__ */ D(i, {
		gap: "none",
		className: "border-t border-border px-3 py-2",
		"data-testid": r,
		children: /* @__PURE__ */ O(t, {
			variant: "secondary",
			size: "sm",
			fullWidth: !0,
			onClick: n,
			title: `Write in ${e}`,
			"data-testid": `${r}-focus`,
			children: ["Reply in ", e]
		})
	});
}
function _e(e) {
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
function ve(e, t, n) {
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
function ye(e, t) {
	return [...new Set([e, ...t.map((e) => e.channel)].filter((e) => !!e))];
}
function L(e) {
	return e.replace(/<[^>]*>/g, "").trim();
}
function be(e) {
	return e.mode === "chat" && !!e.channel && e.recipientChannel === e.channel && L(e.html).length > 0;
}
function xe(e) {
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
function Se(e) {
	let t = e.trim();
	return /^\/agent\s+/i.test(t) ? t.replace(/^\/agent\s+/i, "") : t;
}
function R(e, t) {
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
var Ce = "ui.conversation-draft:";
function z(e) {
	return `${Ce}${e}`;
}
function we(e, t) {
	try {
		let n = e?.getItem(z(t));
		if (!n) return null;
		let r = JSON.parse(n);
		return r && typeof r.html == "string" && L(r.html) ? r.html : null;
	} catch {
		return null;
	}
}
function Te(e, t, n) {
	try {
		L(n) ? e?.setItem(z(t), JSON.stringify({ html: n })) : e?.removeItem(z(t));
	} catch {}
}
var B = "Conversation changed; draft retained.";
function V(e) {
	return `Upload failed: ${(e ?? "").replace(/^upload failed:?\s*/i, "").trim() || "unknown error"}`;
}
function Ee(e) {
	return e.map((e) => e.name).join(", ");
}
var De = class {
	pending = /* @__PURE__ */ new Map();
	wait(e, t, n) {
		return new Promise((r, i) => {
			let a = setTimeout(() => {
				this.pending.delete(e) && i(Error(V(`timed out (${n})`)));
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
}, Oe = "Message sent. Your current draft has been kept.", ke = "This destination is no longer available. Choose a current destination.", Ae = "This view has no page to attach.";
function je(e, t) {
	typeof e == "function" ? e(t) : e && (e.current = t);
}
function Me(e, t) {
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
function Ne() {
	try {
		return typeof window > "u" ? null : window.localStorage;
	} catch {
		return null;
	}
}
function Pe(e, t, n, r = 6e4) {
	let i = w(new De()), a = w(t);
	a.current = t, S(() => () => i.current.rejectAll(B), [t]);
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
	}), s = x(async (e) => {
		let t = a.current;
		if (!t) throw new f("This conversation cannot take files yet.");
		let n;
		try {
			n = await o(e);
		} catch (e) {
			throw new f(V(e instanceof Error ? e.message : String(e)));
		}
		if (a.current !== t) throw Error(B);
		if (n.status === "failed") throw new f(V(n.error));
		if (!n.transferId) throw new f(V(`no transfer id for ${e.name}`));
		try {
			return await i.current.wait(n.transferId, r, e.name);
		} catch (e) {
			throw e instanceof Error && e.message === "Conversation changed; draft retained." ? e : new f(e instanceof Error ? e.message : V(void 0));
		}
	}, [o, r]);
	return x((e) => Promise.all(e.map(s)), [s]);
}
function Fe({ id: e, value: t, recipients: n, onChange: i, "data-testid": s }) {
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
	return /* @__PURE__ */ O(r, {
		gap: "xs",
		align: "center",
		wrap: !1,
		className: "ml-1 min-w-0 self-start rounded-md border border-border bg-surface pl-2",
		children: [/* @__PURE__ */ D(a, {
			size: "xs",
			tone: "secondary",
			className: "shrink-0",
			children: "To:"
		}), /* @__PURE__ */ D(o, {
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
function H(e) {
	function t(t) {
		return /* @__PURE__ */ D(Ie, {
			rm: e,
			...t
		});
	}
	return t.displayName = "ConversationComposer", t;
}
function Ie({ rm: t, channel: o, chat: c, context: l, capabilities: u, identity: ee, offline: d, recipients: p, defaultRecipient: m, recipient: te, onRecipientChange: ne, commands: h = [], onAgent: re, callBlock: ie, reply: g, mode: _, onModeChange: ae, defaultMode: v, draftKey: oe, persistDraft: y = !0, claim: b = !1, answersFocus: se = !1, onReveal: le, disabled: ue, offModes: de, composerRef: E, onDraftChange: k, defaultDraft: A, draft: j, above: M, modeRowEnd: N, references: P, onRemoveReference: F, modePlaceholders: pe, contextChip: he, sendWithReferencesOnly: I, console: ge, "data-testid": L = "conversation-composer", ...Ce }) {
	let z = n() === "compact", B = ee?.displayName || "You", V = oe ?? o ?? `${l.kind}:${l.id}`, De = u.readOnlyReason || "You can read this conversation but not post to it.", H = C(() => {
		let e = p ?? (o ? [{
			id: "discussion",
			label: l.title || "This conversation",
			channel: o,
			attachments: !0
		}] : []);
		return e.map((t) => t.channel && t.channel === o && !u.maySend ? {
			...t,
			unavailableReason: t.unavailableReason ?? De,
			disabled: e.length > 1 || t.disabled
		} : t);
	}, [
		p,
		o,
		l.title,
		u.maySend,
		De
	]), [Ie, Le] = T(null), U = te === void 0 ? Ie : te, Re = !!U && !H.some((e) => e.id === U), W = Re ? {
		id: U,
		label: "Previous destination",
		disabled: !0,
		unavailableReason: ke
	} : ve(H, U, m), ze = H.filter((e) => !e.disabled && !e.unavailableReason).length, Be = H.length > 0, G = Me(_e({
		capabilities: u,
		hasChat: Be,
		choosable: ze,
		offline: d ?? null,
		chatOffReason: W?.unavailableReason ?? null
	}), de), Ve = v && G.modes.includes(v) ? v : G.modes.find((e) => !G.disabledModes.includes(e)) ?? G.modes[0] ?? "chat", [He, Ue] = T(Ve), K = _ ?? He, q = x((e) => {
		_ === void 0 && Ue(e), ae?.(e);
	}, [_, ae]), We = `${G.modes.join(",")}|${G.disabledModes.join(",")}`;
	S(() => {
		if (G.modes.includes(K) && !G.disabledModes.includes(K)) return;
		let e = G.modes.find((e) => !G.disabledModes.includes(e));
		e && e !== K && q(e);
	}, [
		We,
		K,
		q
	]);
	let [J, Ge] = T(!0), Y = l.reference ?? null;
	S(() => {
		Ge(!0);
	}, [Y?.id]);
	let Ke = !!W && W.carriesReference !== !1, qe = !!Y && !Y.page, Je = !!W && W.channel !== o, Ye = !!Y && J && !(K === "chat" && (!Ke || qe && Je)), X = K === "chat" && Ke && J && !(qe && Je) ? Y : null, Z = w(0), Q = j !== void 0, Xe = C(() => {
		if (Q || !y) return A;
		let e = we(Ne(), V);
		return e ? {
			html: e,
			files: []
		} : A;
	}, [V]), Ze = w(""), Qe = x((e, t) => {
		Z.current += 1, Ze.current = e.html, y && !Q && Te(Ne(), V, e.html), c?.setTyping?.(be({
			html: e.html,
			mode: K,
			recipientChannel: W?.channel,
			channel: o
		})), k?.(e, t);
	}, [
		y,
		Q,
		V,
		c,
		K,
		W?.channel,
		o,
		k
	]);
	S(() => {
		be({
			html: Ze.current,
			mode: K,
			recipientChannel: W?.channel,
			channel: o
		}) || c?.setTyping?.(!1);
	}, [
		K,
		W?.channel,
		o
	]);
	let $e = K === "chat" && u.mayAttach && W?.attachments && W.channel ? W.channel : null, et = Pe(t, $e, B), [tt, nt] = T(null), rt = w(null), it = x((e) => {
		rt.current = e, je(E, e);
	}, [E]), $ = x(() => {
		le?.();
		let e = 20, t = () => {
			rt.current ? rt.current.focus() : e-- > 0 && requestAnimationFrame(t);
		};
		requestAnimationFrame(t);
	}, [le]), at = x((e) => {
		Le(e), ne?.(e), Z.current += 1, nt(null), H.find((t) => t.id === e)?.onSelect?.();
	}, [H, ne]), ot = H.filter((e) => e.claim !== !1);
	fe({
		channels: b ? ye(u.maySend || p === void 0 ? o : null, ot) : [],
		label: b ? b.label : "",
		replies: b ? !!b.replies : !1,
		enabled: !!b && b.enabled !== !1,
		focus: (e) => {
			let t = ot.find((t) => t.channel === e.channel);
			return q("chat"), t && at(t.id), $(), !0;
		}
	}), me(x((e) => {
		if (e.mode === "agent") return !G.modes.includes("agent") || G.disabledModes.includes("agent") ? !1 : (q("agent"), $(), !0);
		if (!G.modes.includes("chat") || G.disabledModes.includes("chat")) return !1;
		let t = e.target, n = t ? t.kind === "discussion" ? H.find((e) => e.channel && e.channel === o) ?? (p ? H.find((e) => e.id === "discussion") : W) : t.kind === "huddle" ? ot.find((e) => e.id.startsWith("huddle:")) ?? null : t.kind === "person" ? H.find((e) => e.id === `person:${t.userId}`) ?? null : H.find((e) => e.channel === t.channel) ?? null : W;
		return !n || n.disabled ? !1 : (n.id !== W?.id && at(n.id), q("chat"), $(), !0);
	}, [
		G,
		q,
		$,
		W,
		H,
		p,
		ot,
		o,
		at
	]), se);
	let st = C(() => h.filter((e) => !e.modes || e.modes.includes(K)), [h, K]), ct = C(() => st.map((e) => ({
		trigger: e.trigger,
		label: e.label,
		...e.hint ? { hint: e.hint } : {},
		...e.description ? { description: e.description } : {},
		...e.icon ? { icon: e.icon } : {},
		...e.disabled ? { disabled: !0 } : {},
		...e.argument ? { argument: e.argument } : {}
	})), [st]), lt = (e) => {
		if (typeof e == "string") throw new f(e);
		return e !== !1;
	}, ut = async (e, t) => {
		nt(null);
		let n = (n, r, i) => ({
			trigger: r,
			text: n,
			argumentText: i,
			mode: t,
			reference: X ?? (J ? Y : null),
			recipientId: W?.id ?? null,
			message: e,
			...e.command?.argument ? { argument: {
				id: e.command.argument.id,
				label: e.command.argument.label
			} } : {}
		});
		if (t === "agent") {
			if (!u.agent?.allowed || d) return !1;
			let t = e.text.trim();
			if (!t) return !1;
			let r = h.filter((e) => !e.modes || e.modes.includes("agent")), i = Se(t), a = R(t, r) ?? (i === t ? null : R(i, r));
			if (a) {
				let e = R(t, [a.command]) ? t : i;
				return !a.command.disabled && lt(await a.command.run(n(e, a.command.trigger, a.argumentText)));
			}
			if (!i) return !1;
			if (re) return lt(await re(i, n(i, "", i)));
			let o = r.find((e) => e.trigger === "/agent");
			return o ? lt(await o.run(n(`/agent ${i}`, "/agent", i))) : !1;
		}
		if (!e.files.length) {
			let t = R(e.text, h.filter((e) => !e.modes || e.modes.includes("chat")));
			if (t) return !t.command.disabled && (c?.setTyping?.(!1), lt(await t.command.run(n(e.text.trim(), t.command.trigger, t.argumentText))));
		}
		if (!W || W.disabled || W.unavailableReason || d) return !1;
		let r = e.text.trim(), i = !r && !e.files.length && !!I && (!!X || (P?.length ?? 0) > 0);
		if (!r && !e.files.length && !i || e.files.length && !$e) return !1;
		c?.setTyping?.(!1);
		let a = Z.current, s = e.files.length ? await et(e.files) : [], l = !!W.channel && W.channel === o, ee = xe({
			displayName: B,
			reply: l ? g?.reply ?? null : null,
			reference: X,
			attachments: s
		}), f = r || Ee(s), p = {
			text: f,
			html: e.html,
			files: e.files,
			metadata: ee,
			reference: X
		}, m;
		return W.send ? m = await W.send(p) : c ? (c.sendMessage(f, ee), m = !0) : m = !1, m ? (l && g?.clear(), y && !Q && Te(Ne(), V, ""), Z.current === a || (nt(Oe), !1)) : !1;
	}, dt = Ye && Y ? /* @__PURE__ */ D(s, {
		references: [{
			id: Y.id,
			label: z ? Y.label.split(" › ").pop() ?? Y.label : Y.label,
			title: Y.label
		}],
		onRemove: () => {
			Ge(!1), Z.current += 1, F?.(Y.id);
		},
		removeLabel: (e) => `Remove ${e.label} from this draft`,
		size: "md",
		className: "min-w-0 max-w-[max(9rem,min(30rem,calc(100cqw-22rem)))] flex-nowrap p-0",
		"data-testid": "rich-chat-composer-references"
	}) : null, ft = Re && W ? [...H, W] : H, pt = K === "chat" && ft.length > 1, mt = K === "chat" && J && qe && Je && Ke, ht = K === "chat" && ft.length > 1 ? W?.unavailableReason ?? (W ? null : "Choose a destination.") : null, gt = K === "chat" ? W?.error ?? null : null, _t = pt || ht || tt || mt || gt || M != null && M !== !1 ? /* @__PURE__ */ O(i, {
		gap: "xs",
		children: [
			M,
			pt && /* @__PURE__ */ D(Fe, {
				id: `${V}-recipient`,
				value: W?.id ?? null,
				recipients: ft,
				onChange: at,
				"data-testid": `${L}-recipient`
			}),
			ht && /* @__PURE__ */ D(a, {
				size: "xs",
				tone: "tertiary",
				wrap: !0,
				"data-testid": `${L}-recipient-unavailable`,
				children: ht
			}),
			mt && /* @__PURE__ */ D(a, {
				size: "xs",
				tone: "tertiary",
				wrap: !0,
				children: Ae
			}),
			tt && /* @__PURE__ */ D(a, {
				size: "xs",
				tone: "secondary",
				wrap: !0,
				"data-testid": `${L}-note`,
				children: tt
			}),
			gt && /* @__PURE__ */ D(a, {
				size: "xs",
				className: "text-error",
				wrap: !0,
				"data-testid": `${L}-recipient-error`,
				children: gt
			})
		]
	}) : void 0, vt = !z, yt = vt && dt || N ? /* @__PURE__ */ O(r, {
		gap: "xs",
		align: "center",
		wrap: !1,
		className: "min-w-0",
		children: [vt ? dt : null, N]
	}) : void 0, bt = !vt && Ye && Y ? [{
		id: Y.id,
		label: Y.label.split(" › ").pop() ?? Y.label,
		title: Y.label
	}, ...P ?? []] : P, xt = (e) => {
		Y && e === Y.id && (Ge(!1), Z.current += 1), F?.(e);
	}, St = {
		...pe,
		...K === "chat" && W?.placeholder ? { chat: W.placeholder } : {}
	}, Ct = K === "chat" && (!W || !!W.unavailableReason || !!W.disabled);
	return /* @__PURE__ */ D(ce, {
		...Ce,
		context: l,
		composerRef: it,
		"data-testid": L,
		...z ? { responsive: "pane" } : {},
		console: ge ?? !!ie,
		dock: ie,
		mode: K,
		onModeChange: q,
		modes: G.modes,
		disabledModes: G.disabledModes,
		modeUnavailableReasons: G.reasons,
		chatAvailable: Be && !G.reasons.chat,
		contextChip: he ?? (!Y && void 0),
		..._t ? { above: _t } : {},
		...yt ? { modeRowEnd: yt } : {},
		...bt ? {
			references: bt,
			onRemoveReference: xt
		} : {},
		modePlaceholders: St,
		commands: ct,
		reply: K === "chat" && g?.reply && W?.channel === o ? {
			author: g.reply.author,
			quote: g.reply.text,
			messageId: g.reply.messageId,
			...g.reply.timestamp ? { timestamp: g.reply.timestamp } : {},
			onDismiss: g.clear
		} : null,
		allowAttachments: !!$e,
		...I === void 0 ? {} : { sendWithReferencesOnly: I },
		disabled: !!ue || !!d || Ct || K === "agent" && !u.agent?.allowed,
		draftKey: V,
		...Q ? { draft: j } : {},
		...Xe === void 0 ? {} : { defaultDraft: Xe },
		onDraftChange: Qe,
		onSend: (e, t) => ut(e, t.mode),
		className: e(Ce.className)
	});
}
//#endregion
export { le as AgentComposerDock, b as COMPOSER_BREAKPOINTS, h as COMPOSER_CONTEXT_KINDS, te as COMPOSER_CONTEXT_REASONS, ae as COMPOSER_MODE_ORDER, v as CommandSuggestions, se as ComposerAttachments, s as ComposerReferences, f as ComposerSendError, ce as ContextComposer, P as ConversationInputProvider, ie as DocumentSuggestions, c as EMOJI_SHORTCODES, y as EmojiSuggestions, _ as MentionSuggestions, oe as RichChatComposer, ge as ThreadInputHandoff, Ee as attachmentOnlyText, d as composerCommandArgumentText, ne as composerContextPreset, p as composerDraftOf, ee as composerSendErrorReason, g as composerSizeFor, H as createConversationComposer, m as identityDisplayName, l as matchComposerCommand, re as matchesModeTrigger, u as searchEmoji, I as useComposerFocus, he as useComposerFocusReveal, Pe as useConversationUploads, pe as useThreadInput };
