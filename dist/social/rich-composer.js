import { t as e } from "../cn-DhjIN-s0.js";
import { E as t, b as n, g as r, j as i, u as a } from "../Icons-CQiDn2Ki.js";
import { t as o } from "../Avatar-BzicCOft.js";
import { t as s } from "../RovingToolbar-CmQag9q6.js";
import { i as c, n as l, r as u } from "../ReactionPickerPopover-CcL-n6gt.js";
import { a as d, n as f, o as p, r as m, t as h } from "../composerCommands-DXer0id_.js";
import { Fragment as g, forwardRef as _, useCallback as v, useEffect as y, useImperativeHandle as b, useLayoutEffect as x, useMemo as S, useRef as C, useState as w } from "react";
import { Fragment as T, jsx as E, jsxs as D } from "react/jsx-runtime";
import { EditorContent as ee, ReactRenderer as O, useEditor as te } from "@tiptap/react";
import ne from "@tiptap/starter-kit";
import re from "@tiptap/extension-placeholder";
import { Extension as ie, InputRule as ae, Mark as oe, PasteRule as se, combineTransactionSteps as ce, escapeForRegEx as le, findChildrenInRange as ue, getAttributes as de, getChangedRanges as fe, getMarksBetween as pe, markInputRule as me, markPasteRule as he, mergeAttributes as ge } from "@tiptap/core";
import { Plugin as _e, PluginKey as k } from "@tiptap/pm/state";
import ve from "@tiptap/extension-mention";
import { Decoration as ye, DecorationSet as be } from "@tiptap/pm/view";
//#region node_modules/linkifyjs/dist/linkify.mjs
var xe = "aaa1rp3bb0ott3vie4c1le2ogado5udhabi7c0ademy5centure6ountant0s9o1tor4d0s1ult4e0g1ro2tna4f0l1rica5g0akhan5ency5i0g1rbus3force5tel5kdn3l0ibaba4pay4lfinanz6state5y2sace3tom5m0azon4ericanexpress7family11x2fam3ica3sterdam8nalytics7droid5quan4z2o0l2partments8p0le4q0uarelle8r0ab1mco4chi3my2pa2t0e3s0da2ia2sociates9t0hleta5torney7u0ction5di0ble3o3spost5thor3o0s4w0s2x0a2z0ure5ba0by2idu3namex4d1k2r0celona5laycard4s5efoot5gains6seball5ketball8uhaus5yern5b0c1t1va3cg1n2d1e0ats2uty4er2rlin4st0buy5t2f1g1h0arti5i0ble3d1ke2ng0o3o1z2j1lack0friday9ockbuster8g1omberg7ue3m0s1w2n0pparibas9o0ats3ehringer8fa2m1nd2o0k0ing5sch2tik2on4t1utique6x2r0adesco6idgestone9oadway5ker3ther5ussels7s1t1uild0ers6siness6y1zz3v1w1y1z0h3ca0b1fe2l0l1vinklein9m0era3p2non3petown5ital0one8r0avan4ds2e0er0s4s2sa1e1h1ino4t0ering5holic7ba1n1re3c1d1enter4o1rn3f0a1d2g1h0anel2nel4rity4se2t2eap3intai5ristmas6ome4urch5i0priani6rcle4sco3tadel4i0c2y3k1l0aims4eaning6ick2nic1que6othing5ud3ub0med6m1n1o0ach3des3ffee4llege4ogne5m0mbank4unity6pany2re3uter5sec4ndos3struction8ulting7tact3ractors9oking4l1p2rsica5untry4pon0s4rses6pa2r0edit0card4union9icket5own3s1uise0s6u0isinella9v1w1x1y0mru3ou3z2dad1nce3ta1e1ing3sun4y2clk3ds2e0al0er2s3gree4livery5l1oitte5ta3mocrat6ntal2ist5si0gn4v2hl2iamonds6et2gital5rect0ory7scount3ver5h2y2j1k1m1np2o0cs1tor4g1mains5t1wnload7rive4tv2ubai3pont4rban5vag2r2z2earth3t2c0o2deka3u0cation8e1g1mail3erck5nergy4gineer0ing9terprises10pson4quipment8r0icsson6ni3s0q1tate5t1u0rovision8s2vents5xchange6pert3osed4ress5traspace10fage2il1rwinds6th3mily4n0s2rm0ers5shion4t3edex3edback6rrari3ero6i0delity5o2lm2nal1nce1ial7re0stone6mdale6sh0ing5t0ness6j1k1lickr3ghts4r2orist4wers5y2m1o0o0d1tball6rd1ex2sale4um3undation8x2r0ee1senius7l1ogans4ntier7tr2ujitsu5n0d2rniture7tbol5yi3ga0l0lery3o1up4me0s3p1rden4y2b0iz3d0n2e0a1nt0ing5orge5f1g0ee3h1i0ft0s3ves2ing5l0ass3e1obal2o4m0ail3bh2o1x2n1odaddy5ld0point6f2odyear5g0le4p1t1v2p1q1r0ainger5phics5tis4een3ipe3ocery4up4s1t1u0cci3ge2ide2tars5ru3w1y2hair2mburg5ngout5us3bo2dfc0bank7ealth0care8lp1sinki6re1mes5iphop4samitsu7tachi5v2k0t2m1n1ockey4ldings5iday5medepot5goods5s0ense7nda3rse3spital5t0ing5t0els3mail5use3w2r1sbc3t1u0ghes5yatt3undai7ibm2cbc2e1u2d1e0ee3fm2kano4l1m0amat4db2mo0bilien9n0c1dustries8finiti5o2g1k1stitute6urance4e4t0ernational10uit4vestments10o1piranga7q1r0ish4s0maili5t0anbul7t0au2v3jaguar4va3cb2e0ep2tzt3welry6io2ll2m0p2nj2o0bs1urg4t1y2p0morgan6rs3uegos4niper7kaufen5ddi3e0rryhotels6properties14fh2g1h1i0a1ds2m1ndle4tchen5wi3m1n1oeln3matsu5sher5p0mg2n2r0d1ed3uokgroup8w1y0oto4z2la0caixa5mborghini8er3nd0rover6xess5salle5t0ino3robe5w0yer5b1c1ds2ease3clerc5frak4gal2o2xus4gbt3i0dl2fe0insurance9style7ghting6ke2lly3mited4o2ncoln4k2ve1ing5k1lc1p2oan0s3cker3us3l1ndon4tte1o3ve3pl0financial11r1s1t0d0a3u0ndbeck6xe1ury5v1y2ma0drid4if1son4keup4n0agement7go3p1rket0ing3s4riott5shalls7ttel5ba2c0kinsey7d1e0d0ia3et2lbourne7me1orial6n0u2rck0msd7g1h1iami3crosoft7l1ni1t2t0subishi9k1l0b1s2m0a2n1o0bi0le4da2e1i1m1nash3ey2ster5rmon3tgage6scow4to0rcycles9v0ie4p1q1r1s0d2t0n1r2u0seum3ic4v1w1x1y1z2na0b1goya4me2vy3ba2c1e0c1t0bank4flix4work5ustar5w0s2xt0direct7us4f0l2g0o2hk2i0co2ke1on3nja3ssan1y5l1o0kia3rton4w0ruz3tv4p1r0a1w2tt2u1yc2z2obi1server7ffice5kinawa6layan0group9lo3m0ega4ne1g1l0ine5oo2pen3racle3nge4g0anic5igins6saka4tsuka4t2vh3pa0ge2nasonic7ris2s1tners4s1y3y2ccw3e0t2f0izer5g1h0armacy6d1ilips5one2to0graphy6s4ysio5ics1tet2ures6d1n0g1k2oneer5zza4k1l0ace2y0station9umbing5s3m1n0c2ohl2ker3litie5rn2st3r0axi3ess3ime3o0d0uctions8f1gressive8mo2perties3y5tection8u0dential9s1t1ub2w0c2y2qa1pon3uebec3st5racing4dio4e0ad1lestate6tor2y4cipes5d0umbrella9hab3ise0n3t2liance6n0t0als5pair3ort3ublican8st0aurant8view0s5xroth6ich0ardli6oh3l1o1p2o0cks3deo3gers4om3s0vp3u0gby3hr2n2w0e2yukyu6sa0arland6fe0ty4kura4le1on3msclub4ung5ndvik0coromant12ofi4p1rl2s1ve2xo3b0i1s2c0b1haeffler7midt4olarships8ol3ule3warz5ience5ot3d1e0arch3t2cure1ity6ek2lect4ner3rvices6ven3w1x0y3fr2g1h0angrila6rp3ell3ia1ksha5oes2p0ping5uji3w3i0lk2na1gles5te3j1k0i0n2y0pe4l0ing4m0art3ile4n0cf3o0ccer3ial4ftbank4ware6hu2lar2utions7ng1y2y2pa0ce3ort2t3r0l2s1t0ada2ples4r1tebank4farm7c0group6ockholm6rage3e3ream4udio2y3yle4u0cks3pplies3y2ort5rf1gery5zuki5v1watch4iss4x1y0dney4stems6z2tab1ipei4lk2obao4rget4tamotors6r2too4x0i3c0i2d0k2eam2ch0nology8l1masek5nnis4va3f1g1h0d1eater2re6iaa2ckets5enda4ps2res2ol4j0maxx4x2k0maxx5l1m0all4n1o0day3kyo3ols3p1ray3shiba5tal3urs3wn2yota3s3r0ade1ing4ining5vel0ers0insurance16ust3v2t1ube2i1nes3shu4v0s2w1z2ua1bank3s2g1k1nicom3versity8o2ol2ps2s1y1z2va0cations7na1guard7c1e0gas3ntures6risign5mögensberater2ung14sicherung10t2g1i0ajes4deo3g1king4llas4n1p1rgin4sa1ion4va1o3laanderen9n1odka3lvo3te1ing3o2yage5u2wales2mart4ter4ng0gou5tch0es6eather0channel12bcam3er2site5d0ding5ibo2r3f1hoswho6ien2ki2lliamhill9n0dows4e1ners6me2oodside6rk0s2ld3w2s1tc1f3xbox3erox4ihuan4n2xx2yz3yachts4hoo3maxun5ndex5e1odobashi7ga2kohama6u0tube6t1un3za0ppos4ra3ero3ip2m1one3uerich6w2", Se = "ελ1υ2бг1ел3дети4ею2католик6ом3мкд2он1сква6онлайн5рг3рус2ф2сайт3рб3укр3қаз3հայ3ישראל5קום3ابوظبي5رامكو5لاردن4بحرين5جزائر5سعودية6عليان5مغرب5مارات5یران5بارت2زار4يتك3ھارت5تونس4سودان3رية5شبكة4عراق2ب2مان4فلسطين6قطر3كاثوليك6وم3مصر2ليسيا5وريتانيا7قع4همراه5پاکستان7ڀارت4कॉम3नेट3भारत0म्3ोत5संगठन5বাংলা5ভারত2ৰত4ਭਾਰਤ4ભારત4ଭାରତ4இந்தியா6லங்கை6சிங்கப்பூர்11భారత్5ಭಾರತ4ഭാരതം5ලංකා4คอม3ไทย3ລາວ3გე2みんな3アマゾン4クラウド4グーグル4コム2ストア3セール3ファッション6ポイント4世界2中信1国1國1文网3亚马逊3企业2佛山2信息2健康2八卦2公司1益2台湾1灣2商城1店1标2嘉里0大酒店5在线2大拿2天主教3娱乐2家電2广东2微博2慈善2我爱你3手机2招聘2政务1府2新加坡2闻2时尚2書籍2机构2淡马锡3游戏2澳門2点看2移动2组织机构4网址1店1站1络2联通2谷歌2购物2通販2集团2電訊盈科4飞利浦3食品2餐厅2香格里拉3港2닷넷1컴2삼성2한국2", Ce = "numeric", we = "ascii", Te = "alpha", Ee = "asciinumeric", De = "alphanumeric", Oe = "domain", ke = "emoji", Ae = "scheme", je = "slashscheme", Me = "whitespace";
function Ne(e, t) {
	return e in t || (t[e] = []), t[e];
}
function A(e, t, n) {
	t[Ce] && (t[Ee] = !0, t[De] = !0), t[we] && (t[Ee] = !0, t[Te] = !0), t[Ee] && (t[De] = !0), t[Te] && (t[De] = !0), t[De] && (t[Oe] = !0), t[ke] && (t[Oe] = !0);
	for (let r in t) {
		let t = Ne(r, n);
		t.indexOf(e) < 0 && t.push(e);
	}
}
function Pe(e, t) {
	let n = {};
	for (let r in t) t[r].indexOf(e) >= 0 && (n[r] = !0);
	return n;
}
function j(e = null) {
	this.j = {}, this.jr = [], this.jd = null, this.t = e;
}
j.groups = {}, j.prototype = {
	accepts() {
		return !!this.t;
	},
	go(e) {
		let t = this, n = t.j[e];
		if (n) return n;
		for (let n = 0; n < t.jr.length; n++) {
			let r = t.jr[n][0], i = t.jr[n][1];
			if (i && r.test(e)) return i;
		}
		return t.jd;
	},
	has(e, t = !1) {
		return t ? e in this.j : !!this.go(e);
	},
	ta(e, t, n, r) {
		for (let i = 0; i < e.length; i++) this.tt(e[i], t, n, r);
	},
	tr(e, t, n, r) {
		r ||= j.groups;
		let i;
		return t && t.j ? i = t : (i = new j(t), n && r && A(t, n, r)), this.jr.push([e, i]), i;
	},
	ts(e, t, n, r) {
		let i = this, a = e.length;
		if (!a) return i;
		for (let t = 0; t < a - 1; t++) i = i.tt(e[t]);
		return i.tt(e[a - 1], t, n, r);
	},
	tt(e, t, n, r) {
		r ||= j.groups;
		let i = this;
		if (t && t.j) return i.j[e] = t, t;
		let a = t, o, s = i.go(e);
		return s ? (o = new j(), Object.assign(o.j, s.j), o.jr.push.apply(o.jr, s.jr), o.jd = s.jd, o.t = s.t) : o = new j(), a && (r && (o.t && typeof o.t == "string" ? A(a, Object.assign(Pe(o.t, r), n), r) : n && A(a, n, r)), o.t = a), i.j[e] = o, o;
	}
};
var M = (e, t, n, r, i) => e.ta(t, n, r, i), N = (e, t, n, r, i) => e.tr(t, n, r, i), P = (e, t, n, r, i) => e.ts(t, n, r, i), F = (e, t, n, r, i) => e.tt(t, n, r, i), I = "WORD", Fe = "UWORD", Ie = "ASCIINUMERICAL", Le = "ALPHANUMERICAL", L = "LOCALHOST", Re = "TLD", ze = "UTLD", Be = "SCHEME", Ve = "SLASH_SCHEME", He = "NUM", Ue = "WS", We = "NL", R = "OPENBRACE", Ge = "CLOSEBRACE", Ke = "OPENBRACKET", qe = "CLOSEBRACKET", Je = "OPENPAREN", z = "CLOSEPAREN", B = "OPENANGLEBRACKET", Ye = "CLOSEANGLEBRACKET", Xe = "FULLWIDTHLEFTPAREN", Ze = "FULLWIDTHRIGHTPAREN", Qe = "LEFTCORNERBRACKET", $e = "RIGHTCORNERBRACKET", et = "LEFTWHITECORNERBRACKET", tt = "RIGHTWHITECORNERBRACKET", nt = "FULLWIDTHLESSTHAN", rt = "FULLWIDTHGREATERTHAN", it = "AMPERSAND", at = "APOSTROPHE", ot = "ASTERISK", st = "AT", ct = "BACKSLASH", lt = "BACKTICK", ut = "CARET", dt = "COLON", ft = "COMMA", pt = "DOLLAR", V = "DOT", mt = "EQUALS", ht = "EXCLAMATION", H = "HYPHEN", gt = "PERCENT", _t = "PIPE", vt = "PLUS", yt = "POUND", bt = "QUERY", xt = "QUOTE", St = "FULLWIDTHMIDDLEDOT", Ct = "SEMI", U = "SLASH", wt = "TILDE", Tt = "UNDERSCORE", Et = "EMOJI", Dt = "SYM", Ot = /*#__PURE__*/ Object.freeze({
	__proto__: null,
	ALPHANUMERICAL: Le,
	AMPERSAND: it,
	APOSTROPHE: at,
	ASCIINUMERICAL: Ie,
	ASTERISK: ot,
	AT: st,
	BACKSLASH: ct,
	BACKTICK: lt,
	CARET: ut,
	CLOSEANGLEBRACKET: Ye,
	CLOSEBRACE: Ge,
	CLOSEBRACKET: qe,
	CLOSEPAREN: z,
	COLON: dt,
	COMMA: ft,
	DOLLAR: pt,
	DOT: V,
	EMOJI: Et,
	EQUALS: mt,
	EXCLAMATION: ht,
	FULLWIDTHGREATERTHAN: rt,
	FULLWIDTHLEFTPAREN: Xe,
	FULLWIDTHLESSTHAN: nt,
	FULLWIDTHMIDDLEDOT: St,
	FULLWIDTHRIGHTPAREN: Ze,
	HYPHEN: H,
	LEFTCORNERBRACKET: Qe,
	LEFTWHITECORNERBRACKET: et,
	LOCALHOST: L,
	NL: We,
	NUM: He,
	OPENANGLEBRACKET: B,
	OPENBRACE: R,
	OPENBRACKET: Ke,
	OPENPAREN: Je,
	PERCENT: gt,
	PIPE: _t,
	PLUS: vt,
	POUND: yt,
	QUERY: bt,
	QUOTE: xt,
	RIGHTCORNERBRACKET: $e,
	RIGHTWHITECORNERBRACKET: tt,
	SCHEME: Be,
	SEMI: Ct,
	SLASH: U,
	SLASH_SCHEME: Ve,
	SYM: Dt,
	TILDE: wt,
	TLD: Re,
	UNDERSCORE: Tt,
	UTLD: ze,
	UWORD: Fe,
	WORD: I,
	WS: Ue
}), W = /[a-z]/, kt = /\p{L}/u, At = /\p{Emoji}/u, G = /\d/, jt = /\s/, Mt = "\r", Nt = "\n", Pt = "️", Ft = "‍", It = "￼", Lt = null, Rt = null;
function zt(e = []) {
	let t = {};
	j.groups = t;
	let n = new j();
	Lt ??= Ut(xe), Rt ??= Ut(Se), F(n, "'", at), F(n, "{", R), F(n, "}", Ge), F(n, "[", Ke), F(n, "]", qe), F(n, "(", Je), F(n, ")", z), F(n, "<", B), F(n, ">", Ye), F(n, "（", Xe), F(n, "）", Ze), F(n, "「", Qe), F(n, "」", $e), F(n, "『", et), F(n, "』", tt), F(n, "＜", nt), F(n, "＞", rt), F(n, "&", it), F(n, "*", ot), F(n, "@", st), F(n, "`", lt), F(n, "^", ut), F(n, ":", dt), F(n, ",", ft), F(n, "$", pt), F(n, ".", V), F(n, "=", mt), F(n, "!", ht), F(n, "-", H), F(n, "%", gt), F(n, "|", _t), F(n, "+", vt), F(n, "#", yt), F(n, "?", bt), F(n, "\"", xt), F(n, "/", U), F(n, ";", Ct), F(n, "~", wt), F(n, "_", Tt), F(n, "\\", ct), F(n, "・", St);
	let r = N(n, G, He, { [Ce]: !0 });
	N(r, G, r);
	let i = N(r, W, Ie, { [Ee]: !0 }), a = N(r, kt, Le, { [De]: !0 }), o = N(n, W, I, { [we]: !0 });
	N(o, G, i), N(o, W, o), N(i, G, i), N(i, W, i);
	let s = N(n, kt, Fe, { [Te]: !0 });
	N(s, W), N(s, G, a), N(s, kt, s), N(a, G, a), N(a, W), N(a, kt, a);
	let c = F(n, Nt, We, { [Me]: !0 }), l = F(n, Mt, Ue, { [Me]: !0 }), u = N(n, jt, Ue, { [Me]: !0 });
	F(n, It, u), F(l, Nt, c), F(l, It, u), N(l, jt, u), F(u, Mt), F(u, Nt), N(u, jt, u), F(u, It, u);
	let d = N(n, At, Et, { [ke]: !0 });
	F(d, "#"), N(d, At, d), F(d, Pt, d);
	let f = F(d, Ft);
	F(f, "#"), N(f, At, d);
	let p = [[W, o], [G, i]], m = [
		[W, null],
		[kt, s],
		[G, a]
	];
	for (let e = 0; e < Lt.length; e++) Ht(n, Lt[e], Re, I, p);
	for (let e = 0; e < Rt.length; e++) Ht(n, Rt[e], ze, Fe, m);
	A(Re, {
		tld: !0,
		ascii: !0
	}, t), A(ze, {
		utld: !0,
		alpha: !0
	}, t), Ht(n, "file", Be, I, p), Ht(n, "mailto", Be, I, p), Ht(n, "http", Ve, I, p), Ht(n, "https", Ve, I, p), Ht(n, "ftp", Ve, I, p), Ht(n, "ftps", Ve, I, p), A(Be, {
		scheme: !0,
		ascii: !0
	}, t), A(Ve, {
		slashscheme: !0,
		ascii: !0
	}, t), e = e.sort((e, t) => e[0] > t[0] ? 1 : -1);
	for (let t = 0; t < e.length; t++) {
		let r = e[t][0], i = e[t][1] ? { [Ae]: !0 } : { [je]: !0 };
		r.indexOf("-") >= 0 ? i[Oe] = !0 : W.test(r) ? G.test(r) ? i[Ee] = !0 : i[we] = !0 : i[Ce] = !0, P(n, r, r, i);
	}
	return P(n, "localhost", L, { ascii: !0 }), n.jd = new j(Dt), {
		start: n,
		tokens: Object.assign({ groups: t }, Ot)
	};
}
function Bt(e, t) {
	let n = Vt(t.replace(/[A-Z]/g, (e) => e.toLowerCase())), r = n.length, i = [], a = 0, o = 0;
	for (; o < r;) {
		let s = e, c = null, l = 0, u = null, d = -1, f = -1;
		for (; o < r && (c = s.go(n[o]));) s = c, s.accepts() ? (d = 0, f = 0, u = s) : d >= 0 && (d += n[o].length, f++), l += n[o].length, a += n[o].length, o++;
		a -= d, o -= f, l -= d, i.push({
			t: u.t,
			v: t.slice(a - l, a),
			s: a - l,
			e: a
		});
	}
	return i;
}
function Vt(e) {
	let t = [], n = e.length, r = 0;
	for (; r < n;) {
		let i = e.charCodeAt(r), a, o = i < 55296 || i > 56319 || r + 1 === n || (a = e.charCodeAt(r + 1)) < 56320 || a > 57343 ? e[r] : e.slice(r, r + 2);
		t.push(o), r += o.length;
	}
	return t;
}
function Ht(e, t, n, r, i) {
	let a, o = t.length;
	for (let n = 0; n < o - 1; n++) {
		let o = t[n];
		e.j[o] ? a = e.j[o] : (a = new j(r), a.jr = i.slice(), e.j[o] = a), e = a;
	}
	return a = new j(n), a.jr = i.slice(), e.j[t[o - 1]] = a, a;
}
function Ut(e) {
	let t = [], n = [], r = 0;
	for (; r < e.length;) {
		let i = 0;
		for (; "0123456789".indexOf(e[r + i]) >= 0;) i++;
		if (i > 0) {
			t.push(n.join(""));
			for (let t = parseInt(e.substring(r, r + i), 10); t > 0; t--) n.pop();
			r += i;
		} else n.push(e[r]), r++;
	}
	return t;
}
var Wt = {
	defaultProtocol: "http",
	events: null,
	format: Kt,
	formatHref: Kt,
	nl2br: !1,
	tagName: "a",
	target: null,
	rel: null,
	validate: !0,
	truncate: Infinity,
	className: null,
	attributes: null,
	ignoreTags: [],
	render: null
};
function Gt(e, t = null) {
	let n = Object.assign({}, Wt);
	e && (n = Object.assign(n, e instanceof Gt ? e.o : e));
	let r = n.ignoreTags, i = [];
	for (let e = 0; e < r.length; e++) i.push(r[e].toUpperCase());
	this.o = n, t && (this.defaultRender = t), this.ignoreTags = i;
}
Gt.prototype = {
	o: Wt,
	ignoreTags: [],
	defaultRender(e) {
		return e;
	},
	check(e) {
		return this.get("validate", e.toString(), e);
	},
	get(e, t, n) {
		let r = t != null, i = this.o[e];
		return i && (typeof i == "object" ? (i = n.t in i ? i[n.t] : Wt[e], typeof i == "function" && r && (i = i(t, n))) : typeof i == "function" && r && (i = i(t, n.t, n)), i);
	},
	getObj(e, t, n) {
		let r = this.o[e];
		return typeof r == "function" && t != null && (r = r(t, n.t, n)), r;
	},
	render(e) {
		let t = e.render(this);
		return (this.get("render", null, e) || this.defaultRender)(t, e.t, e);
	}
};
function Kt(e) {
	return e;
}
function qt(e, t) {
	this.t = "token", this.v = e, this.tk = t;
}
qt.prototype = {
	isLink: !1,
	toString() {
		return this.v;
	},
	toHref(e) {
		return this.toString();
	},
	toFormattedString(e) {
		let t = this.toString(), n = e.get("truncate", t, this), r = e.get("format", t, this);
		return n && r.length > n ? r.substring(0, n) + "…" : r;
	},
	toFormattedHref(e) {
		return e.get("formatHref", this.toHref(e.get("defaultProtocol")), this);
	},
	startIndex() {
		return this.tk[0].s;
	},
	endIndex() {
		return this.tk[this.tk.length - 1].e;
	},
	toObject(e = Wt.defaultProtocol) {
		return {
			type: this.t,
			value: this.toString(),
			isLink: this.isLink,
			href: this.toHref(e),
			start: this.startIndex(),
			end: this.endIndex()
		};
	},
	toFormattedObject(e) {
		return {
			type: this.t,
			value: this.toFormattedString(e),
			isLink: this.isLink,
			href: this.toFormattedHref(e),
			start: this.startIndex(),
			end: this.endIndex()
		};
	},
	validate(e) {
		return e.get("validate", this.toString(), this);
	},
	render(e) {
		let t = this, n = this.toHref(e.get("defaultProtocol")), r = e.get("formatHref", n, this), i = e.get("tagName", n, t), a = this.toFormattedString(e), o = {}, s = e.get("className", n, t), c = e.get("target", n, t), l = e.get("rel", n, t), u = e.getObj("attributes", n, t), d = e.getObj("events", n, t);
		return o.href = r, s && (o.class = s), c && (o.target = c), l && (o.rel = l), u && Object.assign(o, u), {
			tagName: i,
			attributes: o,
			content: a,
			eventListeners: d
		};
	}
};
function Jt(e, t) {
	class n extends qt {
		constructor(t, n) {
			super(t, n), this.t = e;
		}
	}
	for (let e in t) n.prototype[e] = t[e];
	return n.t = e, n;
}
var Yt = Jt("email", {
	isLink: !0,
	toHref() {
		return "mailto:" + this.toString();
	}
}), Xt = Jt("text"), Zt = Jt("nl"), Qt = Jt("url", {
	isLink: !0,
	toHref(e = Wt.defaultProtocol) {
		return this.hasProtocol() ? this.v : `${e}://${this.v}`;
	},
	hasProtocol() {
		let e = this.tk;
		return e.length >= 2 && e[0].t !== L && e[1].t === dt;
	}
}), K = (e) => new j(e);
function $t({ groups: e }) {
	let t = e.domain.concat([
		it,
		ot,
		st,
		ct,
		lt,
		ut,
		pt,
		mt,
		H,
		He,
		gt,
		_t,
		vt,
		yt,
		U,
		Dt,
		wt,
		Tt
	]), n = [
		at,
		dt,
		ft,
		V,
		ht,
		gt,
		bt,
		xt,
		Ct,
		B,
		Ye,
		R,
		Ge,
		qe,
		Ke,
		Je,
		z,
		Xe,
		Ze,
		Qe,
		$e,
		et,
		tt,
		nt,
		rt
	], r = [
		it,
		at,
		ot,
		ct,
		lt,
		ut,
		pt,
		mt,
		H,
		R,
		Ge,
		gt,
		_t,
		vt,
		yt,
		bt,
		U,
		Dt,
		wt,
		Tt
	], i = K(), a = F(i, wt);
	M(a, r, a), M(a, e.domain, a);
	let o = K(), s = K(), c = K();
	M(i, e.domain, o), M(i, e.scheme, s), M(i, e.slashscheme, c), M(o, r, a), M(o, e.domain, o);
	let l = F(o, st);
	F(a, st, l), F(s, st, l), F(c, st, l);
	let u = F(a, V);
	M(u, r, a), M(u, e.domain, a);
	let d = K();
	M(l, e.domain, d), M(d, e.domain, d);
	let f = F(d, V);
	M(f, e.domain, d);
	let p = K(Yt);
	M(f, e.tld, p), M(f, e.utld, p), F(l, L, p);
	let m = F(d, H);
	F(m, H, m), M(m, e.domain, d), M(p, e.domain, d), F(p, V, f), F(p, H, m);
	let h = F(o, H), g = F(o, V);
	F(h, H, h), M(h, e.domain, o), M(g, r, a), M(g, e.domain, o);
	let _ = K(Qt);
	M(g, e.tld, _), M(g, e.utld, _), M(_, e.domain, o), M(_, r, a), F(_, V, g), F(_, H, h), F(_, st, l);
	let v = F(_, dt), y = K(Qt);
	M(v, e.numeric, y);
	let b = K(Qt), x = K();
	M(b, t, b), M(b, n, x), M(x, t, b), M(x, n, x), F(_, U, b), F(y, U, b);
	let S = F(s, dt), C = F(F(F(c, dt), U), U);
	M(s, e.domain, o), F(s, V, g), F(s, H, h), M(c, e.domain, o), F(c, V, g), F(c, H, h), M(S, e.domain, b), F(S, U, b), F(S, bt, b), M(C, e.domain, b), M(C, t, b), F(C, U, b);
	let w = [
		[R, Ge],
		[Ke, qe],
		[Je, z],
		[B, Ye],
		[Xe, Ze],
		[Qe, $e],
		[et, tt],
		[nt, rt]
	];
	for (let e = 0; e < w.length; e++) {
		let [r, i] = w[e], a = F(b, r);
		F(x, r, a);
		let o = K(Qt);
		M(a, t, o);
		let s = K();
		M(a, n, s), F(a, i, b), M(o, t, o), M(o, n, s), M(s, t, o), M(s, n, s), F(o, i, b), F(s, i, b);
	}
	return F(i, L, _), F(i, We, Zt), {
		start: i,
		tokens: Ot
	};
}
function en(e, t, n) {
	let r = n.length, i = 0, a = [], o = [];
	for (; i < r;) {
		let s = e, c = null, l = null, u = 0, d = null, f = -1;
		for (; i < r && !(c = s.go(n[i].t));) o.push(n[i++]);
		for (; i < r && (l = c || s.go(n[i].t));) c = null, s = l, s.accepts() ? (f = 0, d = s) : f >= 0 && f++, i++, u++;
		if (f < 0) i -= u, i < r && (o.push(n[i]), i++);
		else {
			o.length > 0 && (a.push(tn(Xt, t, o)), o = []), i -= f, u -= f;
			let e = d.t, r = n.slice(i - u, i);
			a.push(tn(e, t, r));
		}
	}
	return o.length > 0 && a.push(tn(Xt, t, o)), a;
}
function tn(e, t, n) {
	let r = n[0].s, i = n[n.length - 1].e;
	return new e(t.slice(r, i), n);
}
var nn = typeof console < "u" && console && console.warn || (() => {}), rn = "until manual call of linkify.init(). Register all schemes and plugins before invoking linkify the first time.", q = {
	scanner: null,
	parser: null,
	tokenQueue: [],
	pluginQueue: [],
	customSchemes: [],
	initialized: !1
};
function an() {
	return j.groups = {}, q.scanner = null, q.parser = null, q.tokenQueue = [], q.pluginQueue = [], q.customSchemes = [], q.initialized = !1, q;
}
function on(e, t = !1) {
	if (q.initialized && nn(`linkifyjs: already initialized - will not register custom scheme "${e}" ${rn}`), !/^[0-9a-z]+(-[0-9a-z]+)*$/.test(e)) throw Error("linkifyjs: incorrect scheme format.\n1. Must only contain digits, lowercase ASCII letters or \"-\"\n2. Cannot start or end with \"-\"\n3. \"-\" cannot repeat");
	q.customSchemes.push([e, t]);
}
function sn() {
	q.scanner = zt(q.customSchemes);
	for (let e = 0; e < q.tokenQueue.length; e++) q.tokenQueue[e][1]({ scanner: q.scanner });
	q.parser = $t(q.scanner.tokens);
	for (let e = 0; e < q.pluginQueue.length; e++) q.pluginQueue[e][1]({
		scanner: q.scanner,
		parser: q.parser
	});
	return q.initialized = !0, q;
}
function cn(e) {
	return q.initialized || sn(), en(q.parser.start, e, Bt(q.scanner.start, e));
}
cn.scan = Bt;
function ln(e, t = null, n = null) {
	if (t && typeof t == "object") {
		if (n) throw Error(`linkifyjs: Invalid link type ${t}; must be a string`);
		n = t, t = null;
	}
	let r = new Gt(n), i = cn(e), a = [];
	for (let e = 0; e < i.length; e++) {
		let n = i[e];
		n.isLink && (!t || n.t === t) && r.check(n) && a.push(n.toFormattedObject(r));
	}
	return a;
}
//#endregion
//#region node_modules/@tiptap/extension-link/dist/index.js
var un = "[\0- \xA0 ᠎ -\u2029 　]", dn = new RegExp(un), fn = RegExp(`${un}$`), pn = new RegExp(un, "g");
function mn(e) {
	return e.length === 1 ? e[0].isLink : e.length === 3 && e[1].isLink ? ["()", "[]"].includes(e[0].value + e[2].value) : !1;
}
function hn(e) {
	return new _e({
		key: new k("autolink"),
		appendTransaction: (t, n, r) => {
			let i = t.some((e) => e.docChanged) && !n.doc.eq(r.doc), a = t.some((e) => e.getMeta("preventAutolink"));
			if (!i || a) return;
			let { tr: o } = r, s = ce(n.doc, [...t]);
			if (fe(s).forEach(({ newRange: t }) => {
				let n = ue(r.doc, t, (e) => e.isTextblock), i, a;
				if (n.length > 1) i = n[0], a = r.doc.textBetween(i.pos, i.pos + i.node.nodeSize, void 0, " ");
				else if (n.length) {
					let e = r.doc.textBetween(t.from, t.to, " ", " ");
					if (!fn.test(e)) return;
					i = n[0], a = r.doc.textBetween(i.pos, t.to, void 0, " ");
				}
				if (i && a) {
					let t = a.split(dn).filter(Boolean);
					if (t.length <= 0) return !1;
					let n = t[t.length - 1], s = i.pos + a.lastIndexOf(n);
					if (!n) return !1;
					let c = cn(n).map((t) => t.toObject(e.defaultProtocol));
					if (!mn(c)) return !1;
					c.filter((e) => e.isLink).map((e) => ({
						...e,
						from: s + e.start + 1,
						to: s + e.end + 1
					})).filter((e) => !r.schema.marks.code || !r.doc.rangeHasMark(e.from, e.to, r.schema.marks.code)).filter((t) => e.validate(t.value)).filter((t) => e.shouldAutoLink(t.value)).forEach((t) => {
						pe(t.from, t.to, r.doc).some((t) => t.mark.type === e.type) || o.addMark(t.from, t.to, e.type.create({ href: t.href }));
					});
				}
			}), o.steps.length) return o;
		}
	});
}
function gn(e) {
	return new _e({
		key: new k("handleClickLink"),
		props: { handleClick: (t, n, r) => {
			if (r.button !== 0 || !t.editable) return !1;
			let i = null;
			if (r.target instanceof HTMLAnchorElement) i = r.target;
			else {
				let t = r.target;
				if (!t) return !1;
				let n = e.editor.view.dom;
				i = t.closest("a"), i && !n.contains(i) && (i = null);
			}
			if (!i) return !1;
			let a = !1;
			if (e.enableClickSelection && (a = e.editor.commands.extendMarkRange(e.type.name)), e.openOnClick) {
				let n = de(t.state, e.type.name), r = i.href ?? n.href, o = i.target ?? n.target;
				r && (window.open(r, o), a = !0);
			}
			return a;
		} }
	});
}
var _n = /\[([^[\]]+)\]\(((?:[^\s()]|\([^\s()]*\))+)(?:\s+(?:(["'])(.*?)\3|“(.*?)”|‘(.*?)’))?\)$/, vn = /\[([^[\]]+)\]\(((?:[^\s()]|\([^\s()]*\))+)(?:\s+(?:(["'])(.*?)\3|“(.*?)”|‘(.*?)’))?\)/g;
function yn(e, t) {
	let n = 0;
	for (let r = t - 1; r >= 0 && e[r] === "\\"; --r) n += 1;
	return n % 2 == 1;
}
function bn(e, t) {
	let n = 0, r = 0;
	for (; r < t;) {
		if (e[r] !== "`") {
			r += 1;
			continue;
		}
		if (n === 0 && yn(e, r)) {
			r += 1;
			continue;
		}
		let i = 0;
		for (; r < t && e[r] === "`";) i += 1, r += 1;
		n === 0 ? n = i : i === n && (n = 0);
	}
	return n > 0;
}
function xn(e, t, n) {
	let [, r, i] = t;
	return (t.index ? e[t.index - 1] : void 0) === "!" || yn(e, t.index ?? 0) || bn(e, t.index ?? 0) ? !1 : !!r.trim() && n(i);
}
function Sn(e) {
	let [t, n, r, , i, a, o] = e, s = i ?? a ?? o;
	return {
		index: e.index ?? 0,
		text: t,
		replaceWith: n,
		data: {
			href: r,
			title: s || null,
			markdown: !0
		}
	};
}
function Cn(e, t) {
	return e.index < t.index + t.text.length && t.index < e.index + e.text.length;
}
function wn(e) {
	return {
		href: e.data?.href,
		title: e.data?.title ?? null
	};
}
function Tn(e) {
	let t = me({
		find: (t) => {
			let n = _n.exec(t);
			return !n || !xn(t, n, e.isAllowedHref) ? null : Sn(n);
		},
		type: e.type,
		getAttributes: wn
	});
	return new ae({
		find: t.find,
		handler: (e) => {
			let n = t.handler(e);
			return n !== null && e.state.tr.steps.length && e.state.tr.setMeta("preventAutolink", !0), n;
		}
	});
}
function En(e) {
	let t = he({
		find: (t) => {
			let n = [];
			for (let r of t.matchAll(vn)) xn(t, r, e.isAllowedHref) && n.push(Sn(r));
			let r = (e.findPlainUrls?.call(e, t) ?? []).filter((e) => !n.some((t) => Cn(t, e)));
			return [...n, ...r];
		},
		type: e.type,
		getAttributes: wn
	});
	return new se({
		find: t.find,
		handler: (e) => {
			let n = t.handler(e);
			return n !== null && e.state.tr.steps.length && e.match.data?.markdown && e.state.tr.setMeta("preventAutolink", !0), n;
		}
	});
}
function Dn(e) {
	return new _e({
		key: new k("handlePasteLink"),
		props: { handlePaste: (t, n, r) => {
			let { shouldAutoLink: i } = e, { state: a } = t, { selection: o } = a, { empty: s } = o;
			if (s) return !1;
			let c = "";
			r.content.forEach((e) => {
				c += e.textContent;
			});
			let l = ln(c, { defaultProtocol: e.defaultProtocol }).find((e) => e.isLink && e.value === c);
			return !c || !l || i !== void 0 && !i(l.value) ? !1 : e.editor.commands.setMark(e.type, { href: l.href });
		} }
	});
}
function J(e, t) {
	let n = [
		"http",
		"https",
		"ftp",
		"ftps",
		"mailto",
		"tel",
		"callto",
		"sms",
		"cid",
		"xmpp"
	];
	return t && t.forEach((e) => {
		let t = typeof e == "string" ? e : e.scheme;
		t && n.push(t);
	}), !e || e.replace(pn, "").match(RegExp(`^(?:(?:${n.map((e) => e.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&")).join("|")}):|[^a-z]|[a-z0-9+.\\-]+(?:[^a-z+.\\-:]|$))`, "i"));
}
var On = oe.create({
	name: "link",
	priority: 1e3,
	keepOnSplit: !1,
	exitable: !0,
	onCreate() {
		this.options.validate && !this.options.shouldAutoLink && (this.options.shouldAutoLink = this.options.validate, console.warn("The `validate` option is deprecated. Rename to the `shouldAutoLink` option instead.")), this.options.protocols.forEach((e) => {
			if (typeof e == "string") {
				on(e);
				return;
			}
			on(e.scheme, e.optionalSlashes);
		});
	},
	onDestroy() {
		an();
	},
	inclusive() {
		return this.options.autolink;
	},
	addOptions() {
		return {
			openOnClick: !0,
			enableClickSelection: !1,
			linkOnPaste: !0,
			markdownLinks: !1,
			autolink: !0,
			protocols: [],
			defaultProtocol: "http",
			HTMLAttributes: {
				target: "_blank",
				rel: "noopener noreferrer nofollow",
				class: null
			},
			isAllowedUri: (e, t) => !!J(e, t.protocols),
			validate: (e) => !!e,
			shouldAutoLink: (e) => {
				let t = /^[a-z][a-z0-9+.-]*:\/\//i.test(e), n = /^[a-z][a-z0-9+.-]*:/i.test(e);
				if (t || n && !e.includes("@")) return !0;
				let r = (e.includes("@") ? e.split("@").pop() : e).split(/[/?#:]/)[0];
				return !(/^\d{1,3}(\.\d{1,3}){3}$/.test(r) || !/\./.test(r));
			}
		};
	},
	addAttributes() {
		return {
			href: {
				default: null,
				parseHTML(e) {
					return e.getAttribute("href");
				}
			},
			target: { default: this.options.HTMLAttributes.target ?? null },
			rel: { default: this.options.HTMLAttributes.rel ?? null },
			class: { default: this.options.HTMLAttributes.class ?? null },
			title: { default: null }
		};
	},
	parseHTML() {
		return [{
			tag: "a[href]",
			getAttrs: (e) => {
				let t = e.getAttribute("href");
				return !t || !this.options.isAllowedUri(t, {
					defaultValidate: (e) => !!J(e, this.options.protocols),
					protocols: this.options.protocols,
					defaultProtocol: this.options.defaultProtocol
				}) ? !1 : null;
			}
		}];
	},
	renderHTML({ HTMLAttributes: e }) {
		return this.options.isAllowedUri(e.href, {
			defaultValidate: (e) => !!J(e, this.options.protocols),
			protocols: this.options.protocols,
			defaultProtocol: this.options.defaultProtocol
		}) ? [
			"a",
			ge(this.options.HTMLAttributes, e),
			0
		] : [
			"a",
			ge(this.options.HTMLAttributes, {
				...e,
				href: ""
			}),
			0
		];
	},
	markdownTokenName: "link",
	parseMarkdown: (e, t) => t.applyMark("link", t.parseInline(e.tokens || []), {
		href: e.href,
		title: e.title || null
	}),
	renderMarkdown: (e, t) => {
		let n = e.attrs?.href ?? "", r = e.attrs?.title ?? "", i = t.renderChildren(e);
		return r ? `[${i}](${n} "${r}")` : `[${i}](${n})`;
	},
	addCommands() {
		return {
			setLink: (e) => ({ chain: t }) => {
				let { href: n } = e;
				return this.options.isAllowedUri(n, {
					defaultValidate: (e) => !!J(e, this.options.protocols),
					protocols: this.options.protocols,
					defaultProtocol: this.options.defaultProtocol
				}) ? t().setMark(this.name, e).setMeta("preventAutolink", !0).run() : !1;
			},
			toggleLink: (e) => ({ chain: t }) => {
				let { href: n } = e || {};
				return n && !this.options.isAllowedUri(n, {
					defaultValidate: (e) => !!J(e, this.options.protocols),
					protocols: this.options.protocols,
					defaultProtocol: this.options.defaultProtocol
				}) ? !1 : t().toggleMark(this.name, e, { extendEmptyMarkRange: !0 }).setMeta("preventAutolink", !0).run();
			},
			unsetLink: () => ({ chain: e }) => e().unsetMark(this.name, { extendEmptyMarkRange: !0 }).setMeta("preventAutolink", !0).run()
		};
	},
	addInputRules() {
		return this.options.markdownLinks ? [Tn({
			type: this.type,
			isAllowedHref: (e) => this.options.isAllowedUri(e, {
				defaultValidate: (e) => !!J(e, this.options.protocols),
				protocols: this.options.protocols,
				defaultProtocol: this.options.defaultProtocol
			})
		})] : [];
	},
	addPasteRules() {
		let e = (e) => {
			let t = [];
			if (e) {
				let { protocols: n, defaultProtocol: r } = this.options;
				ln(e).filter((e) => e.isLink && this.options.isAllowedUri(e.value, {
					defaultValidate: (e) => !!J(e, n),
					protocols: n,
					defaultProtocol: r
				})).forEach((e) => {
					this.options.shouldAutoLink(e.value) && t.push({
						text: e.value,
						data: { href: e.href },
						index: e.start
					});
				});
			}
			return t;
		};
		return this.options.markdownLinks ? [En({
			type: this.type,
			isAllowedHref: (e) => this.options.isAllowedUri(e, {
				defaultValidate: (e) => !!J(e, this.options.protocols),
				protocols: this.options.protocols,
				defaultProtocol: this.options.defaultProtocol
			}),
			findPlainUrls: e
		})] : [he({
			find: e,
			type: this.type,
			getAttributes: (e) => ({ href: e.data?.href })
		})];
	},
	addProseMirrorPlugins() {
		let e = [], { protocols: t, defaultProtocol: n } = this.options;
		return this.options.autolink && e.push(hn({
			type: this.type,
			defaultProtocol: this.options.defaultProtocol,
			validate: (e) => this.options.isAllowedUri(e, {
				defaultValidate: (e) => !!J(e, t),
				protocols: t,
				defaultProtocol: n
			}),
			shouldAutoLink: this.options.shouldAutoLink
		})), e.push(gn({
			type: this.type,
			editor: this.editor,
			openOnClick: this.options.openOnClick === "whenNotEditable" || this.options.openOnClick,
			enableClickSelection: this.options.enableClickSelection
		})), this.options.linkOnPaste && e.push(Dn({
			editor: this.editor,
			defaultProtocol: this.options.defaultProtocol,
			type: this.type,
			shouldAutoLink: this.options.shouldAutoLink
		})), e;
	}
}), kn = Math.min, An = Math.max, jn = Math.round, Mn = Math.floor, Y = (e) => ({
	x: e,
	y: e
}), Nn = {
	left: "right",
	right: "left",
	bottom: "top",
	top: "bottom"
};
function Pn(e, t) {
	return typeof e == "function" ? e(t) : e;
}
function Fn(e) {
	return e.split("-")[0];
}
function In(e) {
	return e.split("-")[1];
}
function Ln(e) {
	return e === "x" ? "y" : "x";
}
function Rn(e) {
	return e === "y" ? "height" : "width";
}
function zn(e) {
	let t = e[0];
	return t === "t" || t === "b" ? "y" : "x";
}
function Bn(e) {
	return Ln(zn(e));
}
function Vn(e, t, n) {
	n === void 0 && (n = !1);
	let r = In(e), i = Bn(e), a = Rn(i), o = i === "x" ? r === (n ? "end" : "start") ? "right" : "left" : r === "start" ? "bottom" : "top";
	return t.reference[a] > t.floating[a] && (o = Xn(o)), [o, Xn(o)];
}
function Hn(e) {
	let t = Xn(e);
	return [
		Un(e),
		t,
		Un(t)
	];
}
function Un(e) {
	return e.includes("start") ? e.replace("start", "end") : e.replace("end", "start");
}
var Wn = ["left", "right"], Gn = ["right", "left"], Kn = ["top", "bottom"], qn = ["bottom", "top"];
function Jn(e, t, n) {
	switch (e) {
		case "top":
		case "bottom": return n ? t ? Gn : Wn : t ? Wn : Gn;
		case "left":
		case "right": return t ? Kn : qn;
		default: return [];
	}
}
function Yn(e, t, n, r) {
	let i = In(e), a = Jn(Fn(e), n === "start", r);
	return i && (a = a.map((e) => e + "-" + i), t && (a = a.concat(a.map(Un)))), a;
}
function Xn(e) {
	let t = Fn(e);
	return Nn[t] + e.slice(t.length);
}
function Zn(e) {
	return {
		top: e.top ?? 0,
		right: e.right ?? 0,
		bottom: e.bottom ?? 0,
		left: e.left ?? 0
	};
}
function Qn(e) {
	return typeof e == "number" ? {
		top: e,
		right: e,
		bottom: e,
		left: e
	} : Zn(e);
}
function $n(e) {
	let { x: t, y: n, width: r, height: i } = e;
	return {
		width: r,
		height: i,
		top: n,
		left: t,
		right: t + r,
		bottom: n + i,
		x: t,
		y: n
	};
}
//#endregion
//#region node_modules/@floating-ui/core/dist/floating-ui.core.mjs
function er(e, t, n) {
	let { reference: r, floating: i } = e, a = zn(t), o = Bn(t), s = Rn(o), c = Fn(t), l = a === "y", u = r.x + r.width / 2 - i.width / 2, d = r.y + r.height / 2 - i.height / 2, f = r[s] / 2 - i[s] / 2, p;
	switch (c) {
		case "top":
			p = {
				x: u,
				y: r.y - i.height
			};
			break;
		case "bottom":
			p = {
				x: u,
				y: r.y + r.height
			};
			break;
		case "right":
			p = {
				x: r.x + r.width,
				y: d
			};
			break;
		case "left":
			p = {
				x: r.x - i.width,
				y: d
			};
			break;
		default: p = {
			x: r.x,
			y: r.y
		};
	}
	let m = In(t);
	return m && (p[o] += f * (m === "end" ? 1 : -1) * (n && l ? -1 : 1)), p;
}
async function tr(e, t) {
	t === void 0 && (t = {});
	let { x: n, y: r, platform: i, rects: a, elements: o, strategy: s } = e, { boundary: c = "clippingAncestors", rootBoundary: l = "viewport", elementContext: u = "floating", altBoundary: d = !1, padding: f = 0 } = Pn(t, e), p = Qn(f), m = o[d ? u === "floating" ? "reference" : "floating" : u], h = $n(await i.getClippingRect({
		element: await (i.isElement == null ? void 0 : i.isElement(m)) ?? !0 ? m : m.contextElement || await (i.getDocumentElement == null ? void 0 : i.getDocumentElement(o.floating)),
		boundary: c,
		rootBoundary: l,
		strategy: s
	})), g = u === "floating" ? {
		x: n,
		y: r,
		width: a.floating.width,
		height: a.floating.height
	} : a.reference, _ = await (i.getOffsetParent == null ? void 0 : i.getOffsetParent(o.floating)), v = await (i.isElement == null ? void 0 : i.isElement(_)) && await (i.getScale == null ? void 0 : i.getScale(_)) || {
		x: 1,
		y: 1
	}, y = $n(i.convertOffsetParentRelativeRectToViewportRelativeRect ? await i.convertOffsetParentRelativeRectToViewportRelativeRect({
		elements: o,
		rect: g,
		offsetParent: _,
		strategy: s
	}) : g);
	return {
		top: (h.top - y.top + p.top) / v.y,
		bottom: (y.bottom - h.bottom + p.bottom) / v.y,
		left: (h.left - y.left + p.left) / v.x,
		right: (y.right - h.right + p.right) / v.x
	};
}
var nr = 50, rr = async (e, t, n) => {
	let { placement: r = "bottom", strategy: i = "absolute", middleware: a = [], platform: o } = n, s = o.detectOverflow ? o : {
		...o,
		detectOverflow: tr
	}, c = await (o.isRTL == null ? void 0 : o.isRTL(t)), l = await o.getElementRects({
		reference: e,
		floating: t,
		strategy: i
	}), { x: u, y: d } = er(l, r, c), f = r, p = 0, m = {};
	for (let n = 0; n < a.length; n++) {
		let h = a[n];
		if (!h) continue;
		let { name: g, fn: _ } = h, { x: v, y, data: b, reset: x } = await _({
			x: u,
			y: d,
			initialPlacement: r,
			placement: f,
			strategy: i,
			middlewareData: m,
			rects: l,
			platform: s,
			elements: {
				reference: e,
				floating: t
			}
		});
		u = v ?? u, d = y ?? d, m[g] = {
			...m[g],
			...b
		}, x && p < nr && (p++, typeof x == "object" && (x.placement && (f = x.placement), x.rects && (l = x.rects === !0 ? await o.getElementRects({
			reference: e,
			floating: t,
			strategy: i
		}) : x.rects), {x: u, y: d} = er(l, f, c)), n = -1);
	}
	return {
		x: u,
		y: d,
		placement: f,
		strategy: i,
		middlewareData: m
	};
}, ir = function(e) {
	return e === void 0 && (e = {}), {
		name: "flip",
		options: e,
		async fn(t) {
			var n;
			let { placement: r, middlewareData: i, rects: a, initialPlacement: o, platform: s, elements: c } = t, { mainAxis: l = !0, crossAxis: u = !0, fallbackPlacements: d, fallbackStrategy: f = "bestFit", fallbackAxisSideDirection: p = "none", flipAlignment: m = !0, ...h } = Pn(e, t);
			if ((n = i.arrow) != null && n.alignmentOffset) return {};
			let g = Fn(r), _ = zn(o), v = Fn(o) === o, y = await (s.isRTL == null ? void 0 : s.isRTL(c.floating)), b = d || (v || !m ? [Xn(o)] : Hn(o)), x = p !== "none";
			!d && x && b.push(...Yn(o, m, p, y));
			let S = [o, ...b], C = await s.detectOverflow(t, h), w = [], T = i.flip?.overflows || [];
			if (l && w.push(C[g]), u) {
				let e = Vn(r, a, y);
				w.push(C[e[0]], C[e[1]]);
			}
			if (T = [...T, {
				placement: r,
				overflows: w
			}], !w.every((e) => e <= 0)) {
				let e = (i.flip?.index || 0) + 1, t = S[e];
				if (t && (u !== "alignment" || _ === zn(t) || T.every((e) => zn(e.placement) !== _ || e.overflows[0] > 0))) return {
					data: {
						index: e,
						overflows: T
					},
					reset: { placement: t }
				};
				let n = T.filter((e) => e.overflows[0] <= 0).sort((e, t) => e.overflows[1] - t.overflows[1])[0]?.placement;
				if (!n) switch (f) {
					case "bestFit": {
						let e = T.filter((e) => {
							if (x) {
								let t = zn(e.placement);
								return t === _ || t === "y";
							}
							return !0;
						}).map((e) => [e.placement, e.overflows.filter((e) => e > 0).reduce((e, t) => e + t, 0)]).sort((e, t) => e[1] - t[1])[0]?.[0];
						e && (n = e);
						break;
					}
					case "initialPlacement": n = o;
				}
				if (r !== n) return { reset: { placement: n } };
			}
			return {};
		}
	};
}, ar = /*#__PURE__*/ new Set(["left", "top"]);
async function or(e, t) {
	let { placement: n, platform: r, elements: i } = e, a = await (r.isRTL == null ? void 0 : r.isRTL(i.floating)), o = Fn(n), s = In(n), c = zn(n) === "y", l = ar.has(o) ? -1 : 1, u = a && c ? -1 : 1, d = Pn(t, e), { mainAxis: f, crossAxis: p, alignmentAxis: m } = typeof d == "number" ? {
		mainAxis: d,
		crossAxis: 0,
		alignmentAxis: null
	} : {
		mainAxis: d.mainAxis || 0,
		crossAxis: d.crossAxis || 0,
		alignmentAxis: d.alignmentAxis
	};
	return s && typeof m == "number" && (p = s === "end" ? m * -1 : m), c ? {
		x: p * u,
		y: f * l
	} : {
		x: f * l,
		y: p * u
	};
}
var sr = function(e) {
	return e === void 0 && (e = 0), {
		name: "offset",
		options: e,
		async fn(t) {
			var n;
			let { x: r, y: i, placement: a, middlewareData: o } = t, s = await or(t, e);
			return a === o.offset?.placement && (n = o.arrow) != null && n.alignmentOffset ? {} : {
				x: r + s.x,
				y: i + s.y,
				data: {
					...s,
					placement: a
				}
			};
		}
	};
};
//#endregion
//#region node_modules/@floating-ui/utils/dist/floating-ui.utils.dom.mjs
function cr() {
	return typeof window < "u";
}
function lr(e) {
	return ur(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function X(e) {
	var t;
	return (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function Z(e) {
	return ((ur(e) ? e.ownerDocument : e.document) || window.document)?.documentElement;
}
function ur(e) {
	return cr() ? e instanceof Node || e instanceof X(e).Node : !1;
}
function Q(e) {
	return cr() ? e instanceof Element || e instanceof X(e).Element : !1;
}
function dr(e) {
	return cr() ? e instanceof HTMLElement || e instanceof X(e).HTMLElement : !1;
}
function fr(e) {
	return !cr() || typeof ShadowRoot > "u" ? !1 : e instanceof ShadowRoot || e instanceof X(e).ShadowRoot;
}
function pr(e) {
	let { overflow: t, overflowX: n, overflowY: r, display: i } = $(e);
	return /auto|scroll|overlay|hidden|clip/.test(t + r + n) && i !== "inline" && i !== "contents";
}
function mr(e) {
	return /^(table|td|th)$/.test(lr(e));
}
function hr(e) {
	try {
		if (e.matches(":popover-open")) return !0;
	} catch {}
	try {
		return e.matches(":modal");
	} catch {
		return !1;
	}
}
var gr = /transform|translate|scale|rotate|perspective|filter/, _r = /paint|layout|strict|content/, vr = (e) => !!e && e !== "none", yr;
function br(e) {
	let t = Q(e) ? $(e) : e;
	return vr(t.transform) || vr(t.translate) || vr(t.scale) || vr(t.rotate) || vr(t.perspective) || !Sr() && (vr(t.backdropFilter) || vr(t.filter)) || gr.test(t.willChange || "") || _r.test(t.contain || "");
}
function xr(e) {
	let t = Tr(e);
	for (; dr(t) && !Cr(t);) {
		if (br(t)) return t;
		if (hr(t)) return null;
		t = Tr(t);
	}
	return null;
}
function Sr() {
	return yr ??= typeof CSS < "u" && CSS.supports && CSS.supports("-webkit-backdrop-filter", "none"), yr;
}
function Cr(e) {
	return /^(html|body|#document)$/.test(lr(e));
}
function $(e) {
	return X(e).getComputedStyle(e);
}
function wr(e) {
	return Q(e) ? {
		scrollLeft: e.scrollLeft,
		scrollTop: e.scrollTop
	} : {
		scrollLeft: e.scrollX,
		scrollTop: e.scrollY
	};
}
function Tr(e) {
	if (lr(e) === "html") return e;
	let t = e.assignedSlot || e.parentNode || fr(e) && e.host || Z(e);
	return fr(t) ? t.host : t;
}
function Er(e) {
	let t = Tr(e);
	return Cr(t) ? (e.ownerDocument || e).body : dr(t) && pr(t) ? t : Er(t);
}
function Dr(e, t, n) {
	t === void 0 && (t = []), n === void 0 && (n = !0);
	let r = Er(e), i = r === e.ownerDocument?.body, a = X(r);
	if (i) {
		let e = Or(a);
		return t.concat(a, a.visualViewport || [], pr(r) ? r : [], e && n ? Dr(e) : []);
	}
	return t.concat(r, Dr(r, [], n));
}
function Or(e) {
	return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
//#endregion
//#region node_modules/@floating-ui/dom/dist/floating-ui.dom.mjs
function kr(e) {
	let t = $(e), n = parseFloat(t.width) || 0, r = parseFloat(t.height) || 0, i = dr(e), a = i ? e.offsetWidth : n, o = i ? e.offsetHeight : r, s = jn(n) !== a || jn(r) !== o;
	return s && (n = a, r = o), {
		width: n,
		height: r,
		$: s
	};
}
function Ar(e) {
	return Q(e) ? e : e.contextElement;
}
function jr(e) {
	let t = Ar(e);
	if (!dr(t)) return Y(1);
	let n = t.getBoundingClientRect(), { width: r, height: i, $: a } = kr(t), o = (a ? jn(n.width) : n.width) / r, s = (a ? jn(n.height) : n.height) / i;
	return (!o || !Number.isFinite(o)) && (o = 1), (!s || !Number.isFinite(s)) && (s = 1), {
		x: o,
		y: s
	};
}
var Mr = /*#__PURE__*/ Y(0);
function Nr(e) {
	let t = X(e);
	return !Sr() || !t.visualViewport ? Mr : {
		x: t.visualViewport.offsetLeft,
		y: t.visualViewport.offsetTop
	};
}
function Pr(e, t, n) {
	return t === void 0 && (t = !1), !!n && t && n === X(e);
}
function Fr(e, t, n, r) {
	t === void 0 && (t = !1), n === void 0 && (n = !1);
	let i = e.getBoundingClientRect(), a = Ar(e), o = Y(1);
	t && (r ? Q(r) && (o = jr(r)) : o = jr(e));
	let s = Pr(a, n, r) ? Nr(a) : Y(0), c = (i.left + s.x) / o.x, l = (i.top + s.y) / o.y, u = i.width / o.x, d = i.height / o.y;
	if (a && r) {
		let e = X(a), t = Q(r) ? X(r) : r, n = e, i = Or(n);
		for (; i && t !== n;) {
			let e = jr(i), t = i.getBoundingClientRect(), r = $(i), a = t.left + (i.clientLeft + parseFloat(r.paddingLeft)) * e.x, o = t.top + (i.clientTop + parseFloat(r.paddingTop)) * e.y;
			c *= e.x, l *= e.y, u *= e.x, d *= e.y, c += a, l += o, n = X(i), i = Or(n);
		}
	}
	return $n({
		width: u,
		height: d,
		x: c,
		y: l
	});
}
function Ir(e, t) {
	let n = wr(e).scrollLeft;
	return t ? t.left + n : Fr(Z(e)).left + n;
}
function Lr(e, t) {
	let n = e.getBoundingClientRect();
	return {
		x: n.left + t.scrollLeft - Ir(e, n),
		y: n.top + t.scrollTop
	};
}
function Rr(e) {
	let { elements: t, rect: n, offsetParent: r, strategy: i } = e, a = i === "fixed", o = Z(r), s = t ? hr(t.floating) : !1;
	if (r === o || s && a) return n;
	let c = {
		scrollLeft: 0,
		scrollTop: 0
	}, l = Y(1), u = Y(0), d = dr(r);
	if ((d || !a) && ((lr(r) !== "body" || pr(o)) && (c = wr(r)), d)) {
		let e = Fr(r);
		l = jr(r), u.x = e.x + r.clientLeft, u.y = e.y + r.clientTop;
	}
	let f = o && !d && !a ? Lr(o, c) : Y(0);
	return {
		width: n.width * l.x,
		height: n.height * l.y,
		x: n.x * l.x - c.scrollLeft * l.x + u.x + f.x,
		y: n.y * l.y - c.scrollTop * l.y + u.y + f.y
	};
}
function zr(e) {
	return e.getClientRects ? Array.from(e.getClientRects()) : [];
}
function Br(e) {
	let t = wr(e), n = e.ownerDocument.body, r = An(e.scrollWidth, e.clientWidth, n.scrollWidth, n.clientWidth), i = An(e.scrollHeight, e.clientHeight, n.scrollHeight, n.clientHeight), a = -t.scrollLeft + Ir(e), o = -t.scrollTop;
	return $(n).direction === "rtl" && (a += An(e.clientWidth, n.clientWidth) - r), {
		width: r,
		height: i,
		x: a,
		y: o
	};
}
var Vr = 25;
function Hr(e, t, n) {
	n === void 0 && (n = "viewport");
	let r = n === "layoutViewport", i = X(e), a = Z(e), o = i.visualViewport, s = a.clientWidth, c = a.clientHeight, l = 0, u = 0;
	if (o) {
		let e = !Sr() || t === "fixed";
		r ? e || (l = -o.offsetLeft, u = -o.offsetTop) : (s = o.width, c = o.height, e && (l = o.offsetLeft, u = o.offsetTop));
	}
	if (Ir(a) <= 0) {
		let e = a.ownerDocument, t = e.body, n = getComputedStyle(t), r = e.compatMode === "CSS1Compat" && parseFloat(n.marginLeft) + parseFloat(n.marginRight) || 0, i = Math.abs(a.clientWidth - t.clientWidth - r), o = getComputedStyle(a).scrollbarGutter === "stable both-edges" ? i / 2 : i;
		o <= Vr && (s -= o);
	}
	return {
		width: s,
		height: c,
		x: l,
		y: u
	};
}
function Ur(e, t) {
	let n = Fr(e, !0, t === "fixed"), r = n.top + e.clientTop, i = n.left + e.clientLeft, a = jr(e);
	return {
		width: e.clientWidth * a.x,
		height: e.clientHeight * a.y,
		x: i * a.x,
		y: r * a.y
	};
}
function Wr(e, t, n) {
	let r;
	if (t === "viewport" || t === "layoutViewport") r = Hr(e, n, t);
	else if (t === "document") r = Br(Z(e));
	else if (Q(t)) r = Ur(t, n);
	else {
		let n = Nr(e);
		r = {
			x: t.x - n.x,
			y: t.y - n.y,
			width: t.width,
			height: t.height
		};
	}
	return $n(r);
}
function Gr(e, t) {
	let n = t.get(e);
	if (n) return n;
	let r = Dr(e, [], !1).filter((e) => Q(e) && lr(e) !== "body"), i = null, a = $(e).position === "fixed", o = a ? Tr(e) : e;
	for (; Q(o) && !Cr(o);) {
		let e = $(o), t = br(o), n = i ? i.position : a ? "fixed" : "";
		!t && (n === "fixed" || n === "absolute" && e.position === "static") ? r = r.filter((e) => e !== o) : i = e, o = Tr(o);
	}
	return t.set(e, r), r;
}
function Kr(e) {
	let { element: t, boundary: n, rootBoundary: r, strategy: i } = e, a = [...n === "clippingAncestors" ? hr(t) ? [] : Gr(t, this._c) : [].concat(n), r], o = Wr(t, a[0], i), s = o.top, c = o.right, l = o.bottom, u = o.left;
	for (let e = 1; e < a.length; e++) {
		let n = Wr(t, a[e], i);
		s = An(n.top, s), c = kn(n.right, c), l = kn(n.bottom, l), u = An(n.left, u);
	}
	return {
		width: c - u,
		height: l - s,
		x: u,
		y: s
	};
}
function qr(e) {
	let { width: t, height: n } = kr(e);
	return {
		width: t,
		height: n
	};
}
function Jr(e, t, n) {
	let r = dr(t), i = Z(t), a = n === "fixed", o = Fr(e, !0, a, t), s = {
		scrollLeft: 0,
		scrollTop: 0
	}, c = Y(0);
	if ((r || !a) && ((lr(t) !== "body" || pr(i)) && (s = wr(t)), r)) {
		let e = Fr(t, !0, a, t);
		c.x = e.x + t.clientLeft, c.y = e.y + t.clientTop;
	}
	!r && i && (c.x = Ir(i));
	let l = i && !r && !a ? Lr(i, s) : Y(0);
	return {
		x: o.left + s.scrollLeft - c.x - l.x,
		y: o.top + s.scrollTop - c.y - l.y,
		width: o.width,
		height: o.height
	};
}
function Yr(e) {
	return $(e).position === "static";
}
function Xr(e, t) {
	if (!dr(e) || $(e).position === "fixed") return null;
	if (t) return t(e);
	let n = e.offsetParent;
	return Z(e) === n && (n = n.ownerDocument.body), n;
}
function Zr(e, t) {
	let n = X(e);
	if (hr(e)) return n;
	if (!dr(e)) {
		let t = Tr(e);
		for (; t && !Cr(t);) {
			if (Q(t) && !Yr(t)) return t;
			t = Tr(t);
		}
		return n;
	}
	let r = Xr(e, t);
	for (; r && mr(r) && Yr(r);) r = Xr(r, t);
	return r && Cr(r) && Yr(r) && !br(r) ? n : r || xr(e) || n;
}
var Qr = async function(e) {
	let t = this.getOffsetParent || Zr, n = this.getDimensions, r = await n(e.floating);
	return {
		reference: Jr(e.reference, await t(e.floating), e.strategy),
		floating: {
			x: 0,
			y: 0,
			width: r.width,
			height: r.height
		}
	};
};
function $r(e) {
	return $(e).direction === "rtl";
}
var ei = {
	convertOffsetParentRelativeRectToViewportRelativeRect: Rr,
	getDocumentElement: Z,
	getClippingRect: Kr,
	getOffsetParent: Zr,
	getElementRects: Qr,
	getClientRects: zr,
	getDimensions: qr,
	getScale: jr,
	isElement: Q,
	isRTL: $r
};
function ti(e, t) {
	return e.x === t.x && e.y === t.y && e.width === t.width && e.height === t.height;
}
function ni(e, t, n) {
	let r = null, i, a = Z(e);
	function o() {
		var e;
		clearTimeout(i), (e = r) == null || e.disconnect(), r = null;
	}
	function s(n, c) {
		n === void 0 && (n = !1), c === void 0 && (c = 1), o();
		let l = e.getBoundingClientRect(), { left: u, top: d, width: f, height: p } = l;
		if (n || t(), !f || !p) return;
		let m = Mn(d), h = Mn(a.clientWidth - (u + f)), g = Mn(a.clientHeight - (d + p)), _ = Mn(u), v = {
			rootMargin: -m + "px " + -h + "px " + -g + "px " + -_ + "px",
			threshold: An(0, kn(1, c)) || 1
		}, y = !0;
		function b(t) {
			let n = t[0].intersectionRatio;
			if (!ti(l, e.getBoundingClientRect())) return s();
			if (n !== c) {
				if (!y) return s();
				n ? s(!1, n) : i = setTimeout(() => {
					s(!1, 1e-7);
				}, 1e3);
			}
			y = !1;
		}
		try {
			r = new IntersectionObserver(b, {
				...v,
				root: a.ownerDocument
			});
		} catch {
			r = new IntersectionObserver(b, v);
		}
		r.observe(e);
	}
	let c = X(e), l = () => s(n);
	return c.addEventListener("resize", l), s(!0), () => {
		c.removeEventListener("resize", l), o();
	};
}
function ri(e, t, n, r) {
	r === void 0 && (r = {});
	let { ancestorScroll: i = !0, ancestorResize: a = !0, elementResize: o = typeof ResizeObserver == "function", layoutShift: s = typeof IntersectionObserver == "function", animationFrame: c = !1 } = r, l = Ar(e), u = i || a ? [...l ? Dr(l) : [], ...t ? Dr(t) : []] : [];
	u.forEach((e) => {
		i && e.addEventListener("scroll", n), a && e.addEventListener("resize", n);
	});
	let d = l && s ? ni(l, n, a) : null, f = -1, p = null;
	o && (p = new ResizeObserver((e) => {
		let [r] = e;
		r && r.target === l && p && t && (p.unobserve(t), cancelAnimationFrame(f), f = requestAnimationFrame(() => {
			var e;
			(e = p) == null || e.observe(t);
		})), n();
	}), l && !c && p.observe(l), t && p.observe(t));
	let m, h = c ? Fr(e) : null;
	c && g();
	function g() {
		let t = Fr(e);
		h && !ti(h, t) && n(), h = t, m = requestAnimationFrame(g);
	}
	return n(), () => {
		var e;
		u.forEach((e) => {
			i && e.removeEventListener("scroll", n), a && e.removeEventListener("resize", n);
		}), d?.(), (e = p) == null || e.disconnect(), p = null, c && cancelAnimationFrame(m);
	};
}
var ii = sr, ai = ir, oi = (e, t, n) => {
	let r = /* @__PURE__ */ new Map(), i = n ?? {}, a = {
		...ei,
		...i.platform,
		_c: r
	};
	return rr(e, t, {
		...i,
		platform: a
	});
};
//#endregion
//#region node_modules/@tiptap/suggestion/dist/index.js
function si(e) {
	let { char: t, allowSpaces: n, allowToIncludeChar: r, allowedPrefixes: i, startOfLine: a, $position: o } = e, s = n && !r, c = le(t), l = RegExp(`\\s${c}$`), u = a ? "^" : "", d = r ? "" : c, f = RegExp(s ? `${u}${c}.*?(?=\\s${d}|$)` : `${u}(?:^)?${c}[^\\s${d}]*`, "gm"), p = o.nodeBefore?.isText && o.nodeBefore.text;
	if (!p) return null;
	let m = o.pos - p.length, h = Array.from(p.matchAll(f)).pop();
	if (!h || h.input === void 0 || h.index === void 0) return null;
	let g = h.input.slice(Math.max(0, h.index - 1), h.index), _ = RegExp(`^[${i?.join("")}\0]?$`).test(g);
	if (i !== null && !_) return null;
	let v = m + h.index, y = v + h[0].length;
	return s && l.test(p.slice(y - 1, y + 1)) && (h[0] += " ", y += 1), v < o.pos && y >= o.pos ? {
		range: {
			from: v,
			to: y
		},
		query: h[0].slice(t.length),
		text: h[0]
	} : null;
}
function ci(e) {
	return e.docChanged ? e.steps.some((e) => {
		let t = e.slice;
		if (!t?.content) return !1;
		let n = t.content.textBetween(0, t.content.size, "\n");
		return /\s/.test(n);
	}) : !1;
}
function li(e) {
	return () => {
		let t = e.state.selection.$anchor.pos, { top: n, right: r, bottom: i, left: a } = e.view.coordsAtPos(t);
		try {
			return new DOMRect(a, n, r - a, i - n);
		} catch {
			return null;
		}
	};
}
function ui(e, t, n, r) {
	return n ? () => {
		let n = r.getState(e.state)?.decorationId;
		return t.dom.querySelector(`[data-decoration-id="${n}"]`)?.getBoundingClientRect() || null;
	} : li(e);
}
function di({ match: e, dismissedRange: t, state: n, transaction: r, editor: i, shouldResetDismissed: a, effectiveAllowSpaces: o }) {
	return a?.({
		editor: i,
		state: n,
		range: t,
		match: e,
		transaction: r,
		allowSpaces: o
	}) ? !1 : o ? e.range.from === t.from : e.range.from === t.from && !ci(r);
}
function fi({ view: e, pluginKeyRef: t }) {
	let n = e.state.tr.setMeta(t, { exit: !0 });
	e.dispatch(n);
}
function pi({ pluginKey: e, decorationTag: t, decorationClass: n, decorationContent: r, decorationEmptyClass: i, renderer: a, dispatchExit: o }) {
	return {
		handleKeyDown(t, n) {
			var r;
			let i = e.getState(t.state);
			return i.active ? n.key === "Escape" || n.key === "Esc" ? ((r = a?.onKeyDown) == null || r.call(a, {
				view: t,
				event: n,
				range: i.range
			}), o(t), !0) : (a?.onKeyDown)?.call(a, {
				view: t,
				event: n,
				range: i.range
			}) || !1 : !1;
		},
		decorations(a) {
			let { active: o, range: s, decorationId: c, query: l } = e.getState(a);
			if (!o) return null;
			let u = !l?.length, d = [n];
			return u && d.push(i), be.create(a.doc, [ye.inline(s.from, s.to, {
				nodeName: t,
				class: d.join(" "),
				"data-decoration-id": c || void 0,
				"data-decoration-content": r
			})]);
		}
	};
}
function mi({ editor: e, char: t, effectiveAllowSpaces: n, allowToIncludeChar: r, allowedPrefixes: i, startOfLine: a, findSuggestionMatch: o, allow: s, shouldShow: c, shouldKeepDismissed: l, pluginKey: u }) {
	return {
		init() {
			return {
				active: !1,
				range: {
					from: 0,
					to: 0
				},
				query: null,
				text: null,
				composing: !1,
				dismissedRange: null
			};
		},
		apply(d, f, p, m) {
			let { isEditable: h } = e, { composing: g } = e.view, { selection: _ } = d, { empty: v, from: y } = _, b = { ...f }, x = d.getMeta(u);
			if (x && x.exit) return b.active = !1, b.decorationId = null, b.range = {
				from: 0,
				to: 0
			}, b.query = null, b.text = null, b.dismissedRange = f.active ? { ...f.range } : f.dismissedRange, b;
			if (b.composing = g, d.docChanged && b.dismissedRange !== null && (b.dismissedRange = {
				from: d.mapping.map(b.dismissedRange.from),
				to: d.mapping.map(b.dismissedRange.to)
			}), h && (v || e.view.composing)) {
				(y < f.range.from || y > f.range.to) && !g && !f.composing && (b.active = !1);
				let u = o({
					char: t,
					allowSpaces: n,
					allowToIncludeChar: r,
					allowedPrefixes: i,
					startOfLine: a,
					$position: _.$from
				}), p = `id_${Math.floor(Math.random() * 4294967295)}`;
				u && s({
					editor: e,
					state: m,
					range: u.range,
					isActive: f.active
				}) && (!c || c({
					editor: e,
					range: u.range,
					query: u.query,
					text: u.text,
					transaction: d
				})) ? (b.dismissedRange !== null && !l({
					match: u,
					dismissedRange: b.dismissedRange,
					state: m,
					transaction: d
				}) && (b.dismissedRange = null), b.dismissedRange === null ? (b.active = !0, b.decorationId = f.decorationId || p, b.range = u.range, b.query = u.query, b.text = u.text) : b.active = !1) : (u || (b.dismissedRange = null), b.active = !1);
			} else b.active = !1;
			return b.active || (b.decorationId = null, b.range = {
				from: 0,
				to: 0
			}, b.query = null, b.text = null), b;
		}
	};
}
function hi({ editor: e, items: t }) {
	let n = null, r = null, i = null, a = () => {
		r !== null && (clearTimeout(r), r = null), i?.(), i = null;
	}, o = (e) => new Promise((t) => {
		i = t, r = setTimeout(() => {
			r = null;
			let e = i;
			i = null, e?.();
		}, e);
	}), s = () => {
		n?.abort(), a(), n = null;
	};
	return {
		abort: s,
		fetch: async (r, i) => {
			s(), n = new AbortController();
			let a = n;
			if (i > 0 && await o(i), n !== a || a.signal.aborted) return { status: "aborted" };
			try {
				let i = await t({
					editor: e,
					query: r,
					signal: a.signal
				});
				return n !== a || a.signal.aborted ? { status: "aborted" } : {
					status: "resolved",
					items: i
				};
			} catch {
				return n !== a || a.signal.aborted ? { status: "aborted" } : { status: "error" };
			}
		}
	};
}
function gi({ placement: e, offset: t, flip: n, floatingUi: r }) {
	let i = [ii({
		mainAxis: t.mainAxis ?? 4,
		crossAxis: t.crossAxis ?? 0
	})];
	return n && i.push(ai()), r?.middleware?.length && i.push(...r.middleware), {
		placement: e,
		strategy: r?.strategy ?? "absolute",
		middleware: i
	};
}
function _i(e) {
	if (e instanceof HTMLElement) return e;
	if (typeof e == "string") try {
		let t = document.querySelector(e);
		if (t) return t;
	} catch {
		return document.body;
	}
	return document.body;
}
function vi({ getReferenceRect: e, contextElement: t, config: n, container: r, dismissOnOutsideClick: i, dismiss: a }) {
	return (o, s = {}) => {
		let c = {
			getBoundingClientRect: () => e() ?? new DOMRect(),
			contextElement: t
		}, l = !1, u = !o.isConnected;
		u && _i(r).appendChild(o), s.onPosition || (o.style.visibility = "hidden", o.style.width = "max-content");
		let d = ri(c, o, () => {
			oi(c, o, {
				placement: n.placement,
				strategy: n.strategy,
				middleware: n.middleware
			}).then(({ x: e, y: t, placement: n, strategy: r }) => {
				if (s.onPosition) {
					s.onPosition({
						x: e,
						y: t,
						placement: n,
						strategy: r
					});
					return;
				}
				Object.assign(o.style, {
					position: r,
					left: `${e}px`,
					top: `${t}px`
				}), l || (l = !0, o.style.visibility = "");
			});
		}, s.autoUpdate), f;
		return i && (f = (e) => {
			let n = e.target;
			!(n instanceof Node) || o.contains(n) || t.contains(n) || a();
		}, document.addEventListener("pointerdown", f, !0)), () => {
			d(), f && document.removeEventListener("pointerdown", f, !0), u && o.remove();
		};
	};
}
function yi({ editor: e, pluginKey: t, items: n, renderer: r, minQueryLength: i, debounce: a, initialItems: o, placement: s, offset: c, container: l, flip: u, floatingUi: d, dismissOnOutsideClick: f, command: p, clientRectFor: m, dispatchExit: h }) {
	let g, _ = hi({
		editor: e,
		items: n
	}), v = gi({
		placement: s,
		offset: c,
		flip: u,
		floatingUi: d
	});
	function y(e, t) {
		var n, i, a;
		switch (e) {
			case "started":
				(n = r?.onStart) == null || n.call(r, t);
				break;
			case "updated":
				(i = r?.onUpdate) == null || i.call(r, t);
				break;
			case "stopped": (a = r?.onExit) == null || a.call(r, t);
		}
	}
	return {
		update: async (n, d) => {
			var b, x;
			let S = t.getState(d), C = t.getState(n.state);
			if (!S || !C) return;
			let w = null, T = S.query !== C.query, E = S.text !== C.text, D = S.range.from !== C.range.from || S.range.to !== C.range.to, ee = T || E || D;
			if (!S.active && C.active) w = "started";
			else if (S.active && !C.active) w = "stopped";
			else if (C.active && ee) w = "updated";
			else return;
			let O = w === "stopped" ? S : C, te = n.dom.querySelector(`[data-decoration-id="${O.decorationId}"]`), ne = m(n, te), re = i === 0 || (O.query ? O.query.length >= i : !1), ie = (w === "started" || w === "updated") && re;
			if (g = {
				editor: e,
				range: O.range,
				query: O.query || "",
				text: O.text || "",
				items: o ?? [],
				command: (t) => p({
					editor: e,
					range: O.range,
					props: t
				}),
				decorationNode: te,
				clientRect: ne,
				loading: ie,
				placement: s,
				offset: {
					mainAxis: c.mainAxis ?? 4,
					crossAxis: c.crossAxis ?? 0
				},
				container: l,
				flip: u,
				floatingUi: v,
				mount: vi({
					getReferenceRect: ne,
					contextElement: n.dom,
					config: v,
					container: l,
					dismissOnOutsideClick: f,
					dismiss: () => h(e.view)
				})
			}, w === "started" && ((b = r?.onBeforeStart) == null || b.call(r, g)), w === "updated" && ((x = r?.onBeforeUpdate) == null || x.call(r, g)), w === "started" && y(w, g), w === "started" || w === "updated") {
				if (!ie) _.abort(), g = {
					...g,
					items: o ?? [],
					loading: !1
				};
				else {
					g = {
						...g,
						items: o ?? [],
						loading: !0
					}, w = "updated", y(w, g);
					let e = await _.fetch(O.query || "", a);
					if (e.status === "aborted") return;
					if (!t.getState(n.state)?.active) {
						_.abort();
						return;
					}
					g = e.status === "resolved" ? {
						...g,
						items: e.items,
						loading: !1
					} : {
						...g,
						loading: !1
					};
				}
			}
			if (w === "stopped") {
				_.abort(), y(w, g), g = void 0;
				return;
			}
			w === "updated" && y(w, g);
		},
		destroy: () => {
			var e;
			_.abort(), g && ((e = r?.onExit) == null || e.call(r, g));
		}
	};
}
var bi = new k("suggestion");
function xi({ pluginKey: e = bi, editor: t, char: n = "@", allowSpaces: r = !1, allowToIncludeChar: i = !1, allowedPrefixes: a = [" "], startOfLine: o = !1, decorationTag: s = "span", decorationClass: c = "suggestion", decorationContent: l = "", decorationEmptyClass: u = "is-empty", command: d = () => null, items: f = () => [], minQueryLength: p = 0, debounce: m = 0, initialItems: h, placement: g = "bottom-start", offset: _ = {}, container: v, flip: y = !0, floatingUi: b, dismissOnOutsideClick: x = !0, render: S = () => ({}), allow: C = () => !0, findSuggestionMatch: w = si, shouldShow: T, shouldResetDismissed: E }) {
	let D = S?.(), ee = r && !i, O = (n, r) => ui(t, n, r, e);
	function te(e) {
		return di({
			...e,
			editor: t,
			shouldResetDismissed: E,
			effectiveAllowSpaces: ee
		});
	}
	let ne = (t) => fi({
		view: t,
		pluginKeyRef: e
	});
	return new _e({
		key: e,
		view: () => yi({
			editor: t,
			pluginKey: e,
			items: f,
			renderer: D,
			minQueryLength: p,
			debounce: m,
			initialItems: h,
			placement: g,
			offset: _,
			container: v,
			flip: y,
			floatingUi: b,
			dismissOnOutsideClick: x,
			command: d,
			clientRectFor: O,
			dispatchExit: ne
		}),
		state: mi({
			editor: t,
			char: n,
			effectiveAllowSpaces: ee,
			allowToIncludeChar: i,
			allowedPrefixes: a,
			startOfLine: o,
			findSuggestionMatch: w,
			allow: C,
			shouldShow: T,
			shouldKeepDismissed: te,
			pluginKey: e
		}),
		props: pi({
			pluginKey: e,
			decorationTag: s,
			decorationClass: c,
			decorationContent: l,
			decorationEmptyClass: u,
			renderer: D,
			dispatchExit: ne
		})
	});
}
var Si = xi;
//#endregion
//#region src/components/social/ComposerAttachments.tsx
function Ci(e) {
	return e < 1024 ? `${e} B` : e < 1048576 ? `${Math.round(e / 1024)} KB` : `${(e / 1048576).toFixed(1)} MB`;
}
function wi({ file: e }) {
	let [t, n] = w(null);
	return y(() => {
		if (!e.type.startsWith("image/")) return;
		let t = URL.createObjectURL(e);
		return n(t), () => {
			URL.revokeObjectURL(t), n(null);
		};
	}, [e]), t ? /* @__PURE__ */ E("img", {
		src: t,
		alt: "",
		"aria-hidden": !0,
		className: "h-9 w-9 shrink-0 rounded object-cover",
		"data-testid": "composer-attachment-thumb"
	}) : /* @__PURE__ */ E("span", {
		"aria-hidden": !0,
		className: "grid h-9 w-9 shrink-0 place-items-center rounded bg-surface-inset text-text-tertiary",
		children: /* @__PURE__ */ E(a, { size: 16 })
	});
}
function Ti({ files: t, onRemove: n, disabled: r = !1, className: i, "data-testid": a = "composer-attachments" }) {
	return t.length === 0 ? null : /* @__PURE__ */ E("ul", {
		"data-testid": a,
		"aria-label": "Attachments",
		className: e("m-0 flex list-none flex-wrap gap-1.5 px-2 pt-2", i),
		children: t.map(({ id: e, file: t }) => /* @__PURE__ */ D("li", {
			"data-testid": "composer-attachment",
			className: "flex items-center gap-2 rounded-lg border border-border bg-surface-inset py-1 pl-1 pr-1.5",
			children: [
				/* @__PURE__ */ E(wi, { file: t }),
				/* @__PURE__ */ D("span", {
					className: "flex min-w-0 flex-col",
					children: [/* @__PURE__ */ E("span", {
						className: "max-w-[11rem] truncate text-xs text-text-primary",
						title: t.name,
						children: t.name
					}), /* @__PURE__ */ E("span", {
						className: "text-[11px] text-text-tertiary",
						children: Ci(t.size)
					})]
				}),
				/* @__PURE__ */ E("button", {
					type: "button",
					"aria-label": `Remove ${t.name}`,
					title: "Remove",
					disabled: r,
					onClick: () => n(e),
					className: "grid h-5 w-5 shrink-0 place-items-center rounded text-text-tertiary hover:bg-surface-hover hover:text-text-primary",
					children: "✕"
				})
			]
		}, e))
	});
}
//#endregion
//#region src/components/social/MentionSuggestions.tsx
var Ei = _(function({ items: t, command: n, onPickNonMember: r }, i) {
	let [a, s] = w(0), c = t.filter((e) => e.member !== !1), l = t.filter((e) => e.member === !1), u = [...c, ...l];
	y(() => s(0), [t]);
	let d = (e) => {
		let t = u[e];
		if (t) {
			if (t.member === !1) {
				r?.(t.id);
				return;
			}
			n({
				id: t.id,
				label: t.label
			});
		}
	};
	return b(i, () => ({ onKeyDown: ({ event: e }) => e.key === "ArrowUp" ? (s((e) => (e + u.length - 1) % u.length), !0) : e.key === "ArrowDown" ? (s((e) => (e + 1) % u.length), !0) : e.key === "Enter" || e.key === "Tab" ? (d(a), !0) : !1 })), t.length === 0 ? null : /* @__PURE__ */ E("div", {
		"data-testid": "mention-suggestions",
		role: "listbox",
		"aria-label": "People",
		className: "max-h-56 w-64 overflow-y-auto rounded-lg border border-border bg-surface py-1 shadow-lg",
		children: u.map((t, n) => /* @__PURE__ */ D(g, { children: [n === c.length && l.length > 0 && /* @__PURE__ */ E("div", {
			className: "mt-1 border-t border-border px-2 pb-0.5 pt-1.5 text-[11px] font-semibold uppercase tracking-wide text-text-tertiary",
			"data-testid": "mention-non-members-heading",
			children: "Not in this chat"
		}), /* @__PURE__ */ D("button", {
			type: "button",
			role: "option",
			"aria-selected": n === a,
			"data-testid": t.member === !1 ? "mention-option-non-member" : "mention-option",
			"data-user-id": t.id,
			onMouseDown: (e) => {
				e.preventDefault(), d(n);
			},
			onMouseEnter: () => s(n),
			className: e("flex w-full items-center gap-2 px-2 py-1.5 text-left text-sm", n === a ? "bg-surface-hover" : "bg-transparent"),
			children: [
				/* @__PURE__ */ E(o, {
					name: t.label,
					src: t.avatarUrl,
					color: t.color,
					size: 24
				}),
				/* @__PURE__ */ D("span", {
					className: "min-w-0 flex-1",
					children: [/* @__PURE__ */ E("span", {
						className: e("block truncate", t.member === !1 ? "text-text-secondary" : "text-text-primary"),
						children: t.label
					}), t.hint && /* @__PURE__ */ E("span", {
						className: "block truncate text-xs text-text-tertiary",
						children: t.hint
					})]
				}),
				t.member === !1 && /* @__PURE__ */ E("span", {
					className: "shrink-0 text-xs text-primary",
					"data-testid": "mention-add-hint",
					children: "Add to chat"
				})
			]
		})] }, t.id))
	});
}), Di = _(function({ items: t, command: n }, r) {
	let [i, o] = w(0);
	y(() => o(0), [t]);
	let s = (e) => {
		let r = t[e];
		r && n({
			id: r.id,
			label: r.label
		});
	};
	return b(r, () => ({ onKeyDown: ({ event: e }) => t.length === 0 ? !1 : e.key === "ArrowUp" ? (o((e) => (e + t.length - 1) % t.length), !0) : e.key === "ArrowDown" ? (o((e) => (e + 1) % t.length), !0) : e.key === "Enter" || e.key === "Tab" ? (s(i), !0) : !1 })), t.length === 0 ? null : /* @__PURE__ */ E("div", {
		"data-testid": "document-suggestions",
		role: "listbox",
		"aria-label": "Documents",
		className: "max-h-56 w-64 overflow-y-auto rounded-lg border border-border bg-surface py-1 shadow-lg",
		children: t.map((t, n) => /* @__PURE__ */ D("button", {
			type: "button",
			role: "option",
			"aria-selected": n === i,
			"data-testid": "document-option",
			onMouseDown: (e) => {
				e.preventDefault(), s(n);
			},
			onMouseEnter: () => o(n),
			className: e("flex w-full items-center gap-2 px-2 py-1.5 text-left text-sm", n === i ? "bg-surface-hover" : "bg-transparent"),
			children: [/* @__PURE__ */ E("span", {
				"aria-hidden": "true",
				className: e("w-6 shrink-0 text-center leading-none", t.icon ? "text-base" : "text-text-tertiary"),
				children: t.icon || /* @__PURE__ */ E(a, {
					size: 14,
					className: "inline-block"
				})
			}), /* @__PURE__ */ D("span", {
				className: "min-w-0 flex-1",
				children: [/* @__PURE__ */ E("span", {
					className: "block truncate text-text-primary",
					children: t.label
				}), t.hint && /* @__PURE__ */ E("span", {
					className: "block truncate text-xs text-text-tertiary",
					children: t.hint
				})]
			})]
		}, t.id))
	});
}), Oi = _(function({ items: t, command: n }, r) {
	let [i, a] = w(0);
	y(() => a(0), [t]);
	let o = (e) => {
		let r = t[e];
		r && n({ emoji: r.emoji });
	};
	return b(r, () => ({ onKeyDown: ({ event: e }) => e.key === "ArrowUp" ? (a((e) => (e + t.length - 1) % t.length), !0) : e.key === "ArrowDown" ? (a((e) => (e + 1) % t.length), !0) : e.key === "Enter" || e.key === "Tab" ? (o(i), !0) : !1 })), t.length === 0 ? null : /* @__PURE__ */ E("div", {
		"data-testid": "emoji-suggestions",
		role: "listbox",
		"aria-label": "Emoji",
		className: "max-h-56 w-56 overflow-y-auto rounded-lg border border-border bg-surface py-1 shadow-lg",
		children: t.map((t, n) => /* @__PURE__ */ D("button", {
			type: "button",
			role: "option",
			"aria-selected": n === i,
			"data-testid": "emoji-option",
			onMouseDown: (e) => {
				e.preventDefault(), o(n);
			},
			onMouseEnter: () => a(n),
			className: e("flex w-full items-center gap-2 px-2 py-1 text-left text-sm", n === i ? "bg-surface-hover" : "bg-transparent"),
			children: [/* @__PURE__ */ E("span", {
				"aria-hidden": !0,
				className: "text-base leading-none",
				children: t.emoji
			}), /* @__PURE__ */ D("span", {
				className: "truncate text-text-secondary",
				children: [
					":",
					t.code,
					":"
				]
			})]
		}, t.code))
	});
});
//#endregion
//#region src/components/social/CommandSuggestions.tsx
function ki(e, t) {
	return !e?.code || t === void 0 ? !1 : t.trim().toLowerCase() === e.code.toLowerCase();
}
function Ai(e) {
	return e.code && e.label === e.code && e.description ? e.description : e.label;
}
function ji(e) {
	if (!(e.hint && e.hint === Ai(e))) return e.hint;
}
var Mi = _(function({ items: t, command: n, label: r = "Commands", draft: i }, a) {
	let [o, s] = w(0);
	y(() => s(0), [t]);
	let c = (e) => {
		let r = t[e];
		r && n(r);
	};
	if (b(a, () => ({ onKeyDown: ({ event: e }) => t.length === 0 ? !1 : e.key === "ArrowUp" ? (s((e) => (e + t.length - 1) % t.length), !0) : e.key === "ArrowDown" ? (s((e) => (e + 1) % t.length), !0) : e.key === "Enter" && ki(t[o], i) ? !1 : e.key === "Enter" || e.key === "Tab" ? (c(o), !0) : !1 })), t.length === 0) return null;
	let l = t[o]?.description;
	return /* @__PURE__ */ D("div", {
		"data-testid": "command-suggestions",
		className: "w-[26rem] max-w-[calc(100vw-2rem)] rounded-lg border border-border bg-surface py-1 shadow-lg",
		children: [/* @__PURE__ */ E("div", {
			role: "listbox",
			"aria-label": r,
			className: "max-h-56 overflow-y-auto",
			children: t.map((t, n) => /* @__PURE__ */ D("button", {
				type: "button",
				role: "option",
				"aria-selected": n === o,
				"data-testid": "command-option",
				onMouseDown: (e) => {
					e.preventDefault(), c(n);
				},
				onMouseEnter: () => s(n),
				className: e("flex w-full items-center gap-2 px-2 py-1 text-left text-sm", n === o ? "bg-surface-hover" : "bg-transparent"),
				children: [
					t.code && /* @__PURE__ */ E("span", {
						className: "shrink-0 font-mono text-xs text-text-secondary",
						children: t.code
					}),
					!t.code && t.icon && /* @__PURE__ */ E("span", {
						"aria-hidden": !0,
						className: "shrink-0 text-base leading-none",
						children: t.icon
					}),
					/* @__PURE__ */ E("span", {
						className: "min-w-0 flex-1 truncate text-text-primary",
						children: Ai(t)
					}),
					ji(t) && /* @__PURE__ */ E("span", {
						className: "shrink-0 max-w-[45%] truncate text-xs text-text-tertiary",
						children: ji(t)
					})
				]
			}, t.id))
		}), l && /* @__PURE__ */ E("div", {
			"data-testid": "command-description",
			className: "truncate border-t border-border px-2 pt-1 text-xs text-text-secondary",
			children: l
		})]
	});
});
//#endregion
//#region src/components/social/RichChatComposer.tsx
function Ni() {
	let e = null;
	return {
		attach(t) {
			e = t, document.body.appendChild(t);
		},
		place(t) {
			if (!e || !t) return;
			e.style.position = "absolute", e.style.zIndex = "9600";
			let n = t.bottom + 240 > window.innerHeight;
			e.style.top = `${(n ? t.top - 6 : t.bottom + 6) + window.scrollY}px`, e.style.left = `${t.left + window.scrollX}px`, e.style.transform = n ? "translateY(-100%)" : "";
		},
		detach() {
			e?.remove(), e = null;
		}
	};
}
function Pi(e, t) {
	let n = /* @__PURE__ */ new Set(), r = [];
	return e.state.doc.descendants((e) => {
		if (e.type.name !== t) return;
		let i = String(e.attrs.id ?? "");
		!i || n.has(i) || (n.add(i), r.push({
			id: i,
			label: String(e.attrs.label ?? i)
		}));
	}), r;
}
function Fi(e) {
	return Pi(e, "mention");
}
function Ii(e) {
	return Pi(e, "docref");
}
function Li({ state: e, range: t }) {
	let n = e.doc.resolve(t.from);
	if (n.parentOffset === 0) return !0;
	let r = n.parent.textBetween(n.parentOffset - 1, n.parentOffset, void 0, "\0");
	return r === "" || /[\s\0(\[{"'“‘]/.test(r);
}
var Ri = ve.extend({ name: "docref" }), zi = new k("docrefSuggestion"), Bi = 0, Vi = new k("commandSuggestion"), Hi = new k("commandArgumentSuggestion");
function Ui(e, t, n = !1) {
	let r = null, i = [], a = Ni(), o = (r) => {
		let a = n ? { draft: r.editor.getText() } : {};
		return t && r.loading ? {
			...r,
			items: i,
			label: e,
			...a
		} : (i = r.items, {
			...r,
			label: e,
			...a
		});
	};
	return {
		onStart: (e) => {
			i = [], r = new O(Mi, {
				props: o(e),
				editor: e.editor
			}), a.attach(r.element), a.place(e.clientRect?.());
		},
		onUpdate: (e) => {
			r?.updateProps(o(e)), a.place(e.clientRect?.());
		},
		onKeyDown: (e) => e.event.key === "Escape" ? (a.detach(), !0) : (r?.ref)?.onKeyDown?.(e) ?? !1,
		onExit: () => {
			a.detach(), r?.destroy(), r = null;
		}
	};
}
var Wi = _(function({ onSend: a, onCommand: o, onSearchPeople: d, mentionMembers: g, onMentionNonMember: _, onSearchDocuments: ae, allowAttachments: oe = !1, allowEmoji: se = !1, onRequestLink: ce, placeholder: le = "Write a message…", commands: ue, disabled: de = !1, toolbarExtras: fe, className: pe, "data-testid": me = "rich-chat-composer" }, he) {
	let ge = C(() => {}), _e = C(() => {}), k = C(null), ye = C(null), [be, xe] = w(!1), [Se, Ce] = w({
		open: !1,
		href: "",
		text: ""
	}), [we, Te] = w([]), [Ee, De] = w(!0), Oe = oe && !de, ke = C(le);
	ke.current = le;
	let Ae = C(ue);
	Ae.current = ue;
	let je = C(d);
	je.current = d;
	let Me = C(g);
	Me.current = g;
	let Ne = C(_);
	Ne.current = _;
	let A = !!d, Pe = C(ae);
	Pe.current = ae;
	let j = !!ae, M = C(o);
	M.current = o;
	let N = C(null), [P, F] = w(null), [I, Fe] = w(!0);
	y(() => {
		let e = Ie.current;
		if (!e) return;
		let t = f(e.getText(), ue);
		F((e) => e?.trigger === t?.trigger && e?.disabled === t?.disabled ? e : t);
	}, [ue]);
	let Ie = C(null), Le = S(() => {
		let e = [
			ne.configure({
				heading: !1,
				horizontalRule: !1,
				link: !1
			}),
			re.configure({ placeholder: () => ke.current }),
			On.configure({
				openOnClick: !1,
				autolink: !0,
				HTMLAttributes: {
					rel: "noopener noreferrer nofollow",
					target: "_blank"
				}
			}),
			ie.create({
				name: "emojiSuggestion",
				priority: 101,
				addProseMirrorPlugins() {
					return [Si({
						editor: this.editor,
						char: ":",
						allow: ({ state: e, range: t }) => e.doc.textBetween(t.from, t.to, "\0").length >= 3,
						items: ({ query: e }) => p(e),
						command: ({ editor: e, range: t, props: n }) => {
							e.chain().focus().deleteRange(t).insertContent(n.emoji).run();
						},
						render: () => {
							let e = null, t = Ni();
							return {
								onStart: (n) => {
									e = new O(Oi, {
										props: n,
										editor: n.editor
									}), t.attach(e.element), t.place(n.clientRect?.());
								},
								onUpdate: (n) => {
									e?.updateProps(n), t.place(n.clientRect?.());
								},
								onKeyDown: (n) => n.event.key === "Escape" ? (t.detach(), !0) : (e?.ref)?.onKeyDown?.(n) ?? !1,
								onExit: () => {
									t.detach(), e?.destroy();
								}
							};
						}
					})];
				}
			}),
			ie.create({
				name: "commandSuggestion",
				priority: 101,
				addProseMirrorPlugins() {
					return [Si({
						pluginKey: Vi,
						editor: this.editor,
						char: "/",
						allow: ({ state: e, range: t }) => e.doc.textBetween(0, t.from, "\n", "\0").trim() === "",
						items: ({ query: e }) => {
							let t = e.toLowerCase();
							return (Ae.current ?? []).filter((e) => !e.disabled && e.trigger.slice(1).toLowerCase().startsWith(t)).map((e) => ({
								id: e.trigger,
								code: e.trigger,
								label: e.label,
								hint: e.hint,
								description: e.description
							}));
						},
						command: ({ editor: e, range: t, props: n }) => {
							e.chain().focus().deleteRange(t).insertContent(`${n.id} `).run();
						},
						render: () => Ui("Commands", !1, !0)
					})];
				}
			}),
			ie.create({
				name: "commandArgumentSuggestion",
				priority: 101,
				addProseMirrorPlugins() {
					return [Si({
						pluginKey: Hi,
						editor: this.editor,
						debounce: 120,
						findSuggestionMatch: ({ $position: e }) => {
							if (e.depth !== 1 || e.index(0) !== 0) return null;
							let t = e.parent.textBetween(0, e.parentOffset, void 0, "\0"), n = f(t, Ae.current);
							if (!n?.argument) return null;
							let r = t.length - t.trimStart().length + n.trigger.length + 1;
							if (e.parentOffset < r) return null;
							let i = t.slice(r), a = N.current;
							return a && a.trigger === n.trigger && i.includes(a.item.label) ? null : {
								range: {
									from: e.start() + r,
									to: e.pos
								},
								query: i.trimStart(),
								text: i
							};
						},
						items: async ({ editor: e, query: t }) => await f(e.getText(), Ae.current)?.argument?.search(t) ?? [],
						command: ({ editor: e, range: t, props: n }) => {
							let r = f(e.getText(), Ae.current);
							if (!r?.argument) return;
							let i = {
								id: n.id,
								label: n.label,
								hint: n.hint,
								icon: n.icon
							};
							if ((r.argument.onPick?.(i) ?? "insert") === "execute") {
								N.current = null, e.commands.clearContent(!0), M.current?.(r, i);
								return;
							}
							N.current = {
								trigger: r.trigger,
								item: i
							}, e.chain().focus().deleteRange(t).insertContent(`${i.label} `).run();
						},
						render: () => Ui("Arguments", !0)
					})];
				}
			}),
			ie.create({
				name: "chatComposerKeymap",
				addKeyboardShortcuts() {
					return {
						Enter: () => (ge.current(), !0),
						"Mod-k": () => (_e.current(), !0),
						"Shift-Enter": ({ editor: e }) => e.commands.setHardBreak()
					};
				}
			})
		];
		return A && e.push(ve.configure({
			HTMLAttributes: { class: "mention" },
			suggestion: {
				char: "@",
				items: async ({ query: e }) => {
					let t = await je.current?.(e) ?? [], n = Me.current;
					return n ? t.map((e) => ({
						...e,
						member: n.has(e.id)
					})) : t;
				},
				render: () => {
					let e = null, t = Ni(), n = (e) => ({
						...e,
						onPickNonMember: (n) => {
							t.detach(), e.editor.chain().focus().deleteRange(e.range).run(), Ne.current?.(n);
						}
					});
					return {
						onStart: (r) => {
							e = new O(Ei, {
								props: n(r),
								editor: r.editor
							}), t.attach(e.element), t.place(r.clientRect?.());
						},
						onUpdate: (r) => {
							e?.updateProps(n(r)), t.place(r.clientRect?.());
						},
						onKeyDown: (n) => n.event.key === "Escape" ? (t.detach(), !0) : (e?.ref)?.onKeyDown?.(n) ?? !1,
						onExit: () => {
							t.detach(), e?.destroy();
						}
					};
				}
			}
		})), j && e.push(Ri.configure({
			HTMLAttributes: { class: "docref" },
			renderText: ({ node: e }) => `#${e.attrs.label ?? e.attrs.id}`,
			renderHTML: ({ options: e, node: t }) => [
				"span",
				e.HTMLAttributes,
				`#${t.attrs.label ?? t.attrs.id}`
			],
			suggestion: {
				char: "#",
				pluginKey: zi,
				allow: Li,
				items: ({ query: e }) => Pe.current?.(e) ?? [],
				render: () => {
					let e = null, t = Ni();
					return {
						onStart: (n) => {
							e = new O(Di, {
								props: n,
								editor: n.editor
							}), t.attach(e.element), t.place(n.clientRect?.());
						},
						onUpdate: (n) => {
							e?.updateProps(n), t.place(n.clientRect?.());
						},
						onKeyDown: (n) => n.event.key === "Escape" ? (t.detach(), !0) : (e?.ref)?.onKeyDown?.(n) ?? !1,
						onExit: () => {
							t.detach(), e?.destroy();
						}
					};
				}
			}
		})), e;
	}, [A, j]), L = te({
		extensions: Le,
		editable: !de,
		onUpdate: ({ editor: e }) => {
			De(e.isEmpty), Ie.current = e;
			let t = e.getText(), n = f(t, Ae.current);
			F((e) => e?.trigger === n?.trigger ? e : n), Fe(!n || h(t, n).trim() === ""), N.current && N.current.trigger !== n?.trigger && (N.current = null);
		},
		editorProps: { attributes: {
			class: "chat-composer-input",
			"data-testid": `${me}-input`
		} }
	}, [Le]);
	y(() => {
		L?.setEditable(!de);
	}, [L, de]);
	let Re = !de && (!Ee || we.length > 0), ze = v(() => {
		if (!L) return;
		let { from: e, to: t } = L.state.selection;
		Ce({
			open: !0,
			href: L.getAttributes("link").href ?? "",
			text: L.state.doc.textBetween(e, t)
		});
	}, [L]), Be = v(({ href: e, text: t }) => {
		if (!L) return;
		let n = L.chain().focus(), { empty: r } = L.state.selection;
		r ? n.insertContent(`<a href="${e}">${t || e}</a>`).run() : t ? n.insertContent(`<a href="${e}">${t}</a>`).run() : n.setLink({ href: e }).run(), Ce({
			open: !1,
			href: "",
			text: ""
		});
	}, [L]), Ve = v(() => {
		if (!L || !Re) return;
		let e = L.getText(), t = f(e, Ae.current), n = N.current, r;
		t && (r = { trigger: t.trigger }, n && n.trigger === t.trigger && h(e, t).includes(n.item.label) && (r.argument = n.item));
		let i = Ii(L);
		a({
			html: L.isEmpty ? "" : L.getHTML(),
			text: e,
			mentions: Fi(L),
			files: we.map((e) => e.file),
			...i.length > 0 ? { documents: i } : {},
			...r ? { command: r } : {}
		}), N.current = null, L.commands.clearContent(!0), Te([]), De(!0);
	}, [
		L,
		Re,
		a,
		we
	]);
	ge.current = Ve, _e.current = ze, b(he, () => ({
		get editor() {
			return L;
		},
		focus: () => {
			L?.commands.focus();
		},
		insertText: (e) => {
			L?.chain().focus().insertContent(e).run();
		}
	}), [L]);
	let He = v((e) => {
		!Oe || e.length === 0 || Te((t) => [...t, ...e.map((e) => ({
			id: `staged-${Bi++}`,
			file: e
		}))]);
	}, [Oe]), [Ue, We] = w(null), R = C(null), Ge = C(null), Ke = v((e) => {
		if (R.current?.disconnect(), R.current = null, Ge.current = e, !e || typeof ResizeObserver > "u") return;
		let t = (e) => We(e > 0 ? e : null), n = new ResizeObserver(([e]) => t(e.contentRect.width));
		n.observe(e), R.current = n, t(e.getBoundingClientRect().width);
	}, []);
	y(() => () => R.current?.disconnect(), []), x(() => {
		let e = Ge.current;
		if (!e) return;
		let t = e.getBoundingClientRect().width;
		t > 0 && t !== Ue && We(t);
	});
	let qe = (e) => Ue === null || Ue >= e, Je = qe(360), z = qe(300), B = (t, n, r, i, a) => /* @__PURE__ */ E("button", {
		ref: a,
		type: "button",
		"aria-label": t,
		"aria-pressed": n,
		title: t,
		disabled: de,
		onMouseDown: (e) => {
			e.preventDefault(), r();
		},
		className: e("grid h-7 w-7 shrink-0 place-items-center rounded text-sm leading-none", n ? "bg-surface-hover text-text-primary" : "text-text-secondary hover:bg-surface-hover"),
		children: i
	}, t);
	return /* @__PURE__ */ E(u, {
		onFiles: He,
		disabled: !Oe,
		className: pe,
		children: /* @__PURE__ */ D("div", {
			"data-testid": me,
			"data-command": P?.trigger,
			className: e("chat-composer rounded-lg border bg-surface focus-within:ring-2", P ? P.disabled ? "border-warning focus-within:border-warning focus-within:ring-warning" : "border-info focus-within:border-info focus-within:ring-info" : "border-border focus-within:border-primary focus-within:ring-primary"),
			children: [
				P && /* @__PURE__ */ D("div", {
					role: "status",
					title: P.description ?? P.hint ?? P.label,
					"data-testid": `${me}-command`,
					className: e("flex items-center gap-1.5 rounded-t-lg px-2 py-1 text-[11px]", P.disabled ? "bg-warning-bg text-warning-fg" : "bg-info-bg text-info-fg"),
					children: [
						/* @__PURE__ */ E("span", {
							className: "font-mono",
							children: P.trigger
						}),
						/* @__PURE__ */ E("span", {
							className: "font-medium",
							children: P.label
						}),
						I && P.argument?.placeholder ? /* @__PURE__ */ D("span", {
							"data-testid": `${me}-command-placeholder`,
							className: "min-w-0 truncate italic opacity-80",
							children: ["— ", P.argument.placeholder]
						}) : P.hint && /* @__PURE__ */ D("span", {
							className: "min-w-0 truncate opacity-80",
							children: ["— ", P.hint]
						})
					]
				}),
				/* @__PURE__ */ E(ee, { editor: L }),
				/* @__PURE__ */ E(Ti, {
					files: we,
					disabled: de,
					onRemove: (e) => Te((t) => t.filter((t) => t.id !== e))
				}),
				/* @__PURE__ */ D("div", {
					ref: Ke,
					className: "flex items-center border-t border-border px-1.5 py-1",
					children: [/* @__PURE__ */ D(s, {
						label: "Message formatting",
						className: "min-w-0 gap-0.5",
						"data-testid": `${me}-format-toolbar`,
						children: [
							L && [
								B("Bold", L.isActive("bold"), () => L.chain().focus().toggleBold().run(), /* @__PURE__ */ E("b", { children: "B" })),
								B("Italic", L.isActive("italic"), () => L.chain().focus().toggleItalic().run(), /* @__PURE__ */ E("i", { children: "I" })),
								Je && B("Strikethrough", L.isActive("strike"), () => L.chain().focus().toggleStrike().run(), /* @__PURE__ */ E("s", { children: "S" })),
								Je && B("Code", L.isActive("code"), () => L.chain().focus().toggleCode().run(), /* @__PURE__ */ E("span", {
									className: "font-mono text-[11px]",
									children: "<>"
								})),
								B(L.isActive("link") ? "Edit link" : "Add link", L.isActive("link"), () => ze(), /* @__PURE__ */ E(r, { size: 16 })),
								z && /* @__PURE__ */ E("span", {
									"aria-hidden": !0,
									className: "mx-1 h-4 w-px shrink-0 bg-border"
								}, "sep1"),
								z && B("Bulleted list", L.isActive("bulletList"), () => L.chain().focus().toggleBulletList().run(), /* @__PURE__ */ E("span", { children: "•" })),
								z && B("Numbered list", L.isActive("orderedList"), () => L.chain().focus().toggleOrderedList().run(), /* @__PURE__ */ E("span", {
									className: "text-[11px]",
									children: "1."
								})),
								z && B("Quote", L.isActive("blockquote"), () => L.chain().focus().toggleBlockquote().run(), /* @__PURE__ */ E(t, { size: 16 }))
							],
							(se || Oe) && /* @__PURE__ */ E("span", {
								"aria-hidden": !0,
								className: "mx-1 h-4 w-px shrink-0 bg-border"
							}),
							se && L && /* @__PURE__ */ D("span", {
								className: "relative",
								children: [B("Emoji", be, () => xe((e) => !e), /* @__PURE__ */ E(i, { size: 16 }), ye), /* @__PURE__ */ E(l, {
									open: be,
									triggerRef: ye,
									onClose: () => xe(!1),
									onSelect: (e) => {
										L.chain().focus().insertContent(e).run(), xe(!1);
									}
								})]
							}),
							Oe && /* @__PURE__ */ D(T, { children: [B("Attach files", !1, () => k.current?.click(), /* @__PURE__ */ E(n, { size: 16 })), /* @__PURE__ */ E(c, {
								ref: k,
								multiple: !0,
								"data-testid": `${me}-file-input`,
								onFiles: He
							})] }),
							fe
						]
					}), /* @__PURE__ */ E("button", {
						type: "button",
						onClick: Ve,
						disabled: !Re,
						"data-testid": `${me}-send`,
						className: "ml-auto shrink-0 rounded bg-primary px-2.5 py-1 text-xs font-semibold text-white disabled:opacity-40",
						children: "Send"
					})]
				}),
				/* @__PURE__ */ E(m, {
					open: Se.open,
					initialHref: Se.href,
					initialText: Se.text,
					onSubmit: (e) => Be(ce ? {
						...e,
						href: ce(e.text) ?? e.href
					} : e),
					onRemove: () => {
						L?.chain().focus().unsetLink().run(), Ce({
							open: !1,
							href: "",
							text: ""
						});
					},
					onClose: () => {
						Ce({
							open: !1,
							href: "",
							text: ""
						}), L?.commands.focus();
					}
				})
			]
		})
	});
});
//#endregion
export { Mi as CommandSuggestions, Ti as ComposerAttachments, Di as DocumentSuggestions, d as EMOJI_SHORTCODES, Oi as EmojiSuggestions, Ei as MentionSuggestions, Wi as RichChatComposer, h as composerCommandArgumentText, f as matchComposerCommand, p as searchEmoji };
