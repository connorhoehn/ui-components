import { t as e } from "../cn-DhjIN-s0.js";
import { D as t, N as n, O as r, S as i, d as a, m as o, p as s, s as c, t as l, v as u } from "../DropdownMenu-DG43DgE_.js";
import { n as d } from "../Tabs-Bc6QoOAC.js";
import { t as f } from "../Avatar-BzicCOft.js";
import { t as p } from "../RovingToolbar-CmQag9q6.js";
import { n as m, t as h } from "../ParticlesBackground-FVwsOHUB.js";
import { i as g, n as _, r as v } from "../ReactionPickerPopover-CcL-n6gt.js";
import { i as y, n as b, o as x, r as S, s as C, t as w } from "../composerCommands-BvoP-BxY.js";
import { Fragment as ee, forwardRef as te, useCallback as ne, useEffect as T, useImperativeHandle as E, useLayoutEffect as re, useMemo as ie, useRef as D, useState as O } from "react";
import { Fragment as ae, jsx as k, jsxs as A } from "react/jsx-runtime";
import { EditorContent as oe, ReactRenderer as se, useEditor as ce } from "@tiptap/react";
import le from "@tiptap/starter-kit";
import ue from "@tiptap/extension-placeholder";
import { Extension as de, InputRule as fe, Mark as pe, PasteRule as me, combineTransactionSteps as he, escapeForRegEx as ge, findChildrenInRange as _e, getAttributes as ve, getChangedRanges as ye, getMarksBetween as be, markInputRule as xe, markPasteRule as Se, mergeAttributes as Ce } from "@tiptap/core";
import { Plugin as we, PluginKey as Te } from "@tiptap/pm/state";
import Ee from "@tiptap/extension-mention";
import { Decoration as De, DecorationSet as Oe } from "@tiptap/pm/view";
//#region node_modules/linkifyjs/dist/linkify.mjs
var ke = "aaa1rp3bb0ott3vie4c1le2ogado5udhabi7c0ademy5centure6ountant0s9o1tor4d0s1ult4e0g1ro2tna4f0l1rica5g0akhan5ency5i0g1rbus3force5tel5kdn3l0ibaba4pay4lfinanz6state5y2sace3tom5m0azon4ericanexpress7family11x2fam3ica3sterdam8nalytics7droid5quan4z2o0l2partments8p0le4q0uarelle8r0ab1mco4chi3my2pa2t0e3s0da2ia2sociates9t0hleta5torney7u0ction5di0ble3o3spost5thor3o0s4w0s2x0a2z0ure5ba0by2idu3namex4d1k2r0celona5laycard4s5efoot5gains6seball5ketball8uhaus5yern5b0c1t1va3cg1n2d1e0ats2uty4er2rlin4st0buy5t2f1g1h0arti5i0ble3d1ke2ng0o3o1z2j1lack0friday9ockbuster8g1omberg7ue3m0s1w2n0pparibas9o0ats3ehringer8fa2m1nd2o0k0ing5sch2tik2on4t1utique6x2r0adesco6idgestone9oadway5ker3ther5ussels7s1t1uild0ers6siness6y1zz3v1w1y1z0h3ca0b1fe2l0l1vinklein9m0era3p2non3petown5ital0one8r0avan4ds2e0er0s4s2sa1e1h1ino4t0ering5holic7ba1n1re3c1d1enter4o1rn3f0a1d2g1h0anel2nel4rity4se2t2eap3intai5ristmas6ome4urch5i0priani6rcle4sco3tadel4i0c2y3k1l0aims4eaning6ick2nic1que6othing5ud3ub0med6m1n1o0ach3des3ffee4llege4ogne5m0mbank4unity6pany2re3uter5sec4ndos3struction8ulting7tact3ractors9oking4l1p2rsica5untry4pon0s4rses6pa2r0edit0card4union9icket5own3s1uise0s6u0isinella9v1w1x1y0mru3ou3z2dad1nce3ta1e1ing3sun4y2clk3ds2e0al0er2s3gree4livery5l1oitte5ta3mocrat6ntal2ist5si0gn4v2hl2iamonds6et2gital5rect0ory7scount3ver5h2y2j1k1m1np2o0cs1tor4g1mains5t1wnload7rive4tv2ubai3pont4rban5vag2r2z2earth3t2c0o2deka3u0cation8e1g1mail3erck5nergy4gineer0ing9terprises10pson4quipment8r0icsson6ni3s0q1tate5t1u0rovision8s2vents5xchange6pert3osed4ress5traspace10fage2il1rwinds6th3mily4n0s2rm0ers5shion4t3edex3edback6rrari3ero6i0delity5o2lm2nal1nce1ial7re0stone6mdale6sh0ing5t0ness6j1k1lickr3ghts4r2orist4wers5y2m1o0o0d1tball6rd1ex2sale4um3undation8x2r0ee1senius7l1ogans4ntier7tr2ujitsu5n0d2rniture7tbol5yi3ga0l0lery3o1up4me0s3p1rden4y2b0iz3d0n2e0a1nt0ing5orge5f1g0ee3h1i0ft0s3ves2ing5l0ass3e1obal2o4m0ail3bh2o1x2n1odaddy5ld0point6f2odyear5g0le4p1t1v2p1q1r0ainger5phics5tis4een3ipe3ocery4up4s1t1u0cci3ge2ide2tars5ru3w1y2hair2mburg5ngout5us3bo2dfc0bank7ealth0care8lp1sinki6re1mes5iphop4samitsu7tachi5v2k0t2m1n1ockey4ldings5iday5medepot5goods5s0ense7nda3rse3spital5t0ing5t0els3mail5use3w2r1sbc3t1u0ghes5yatt3undai7ibm2cbc2e1u2d1e0ee3fm2kano4l1m0amat4db2mo0bilien9n0c1dustries8finiti5o2g1k1stitute6urance4e4t0ernational10uit4vestments10o1piranga7q1r0ish4s0maili5t0anbul7t0au2v3jaguar4va3cb2e0ep2tzt3welry6io2ll2m0p2nj2o0bs1urg4t1y2p0morgan6rs3uegos4niper7kaufen5ddi3e0rryhotels6properties14fh2g1h1i0a1ds2m1ndle4tchen5wi3m1n1oeln3matsu5sher5p0mg2n2r0d1ed3uokgroup8w1y0oto4z2la0caixa5mborghini8er3nd0rover6xess5salle5t0ino3robe5w0yer5b1c1ds2ease3clerc5frak4gal2o2xus4gbt3i0dl2fe0insurance9style7ghting6ke2lly3mited4o2ncoln4k2ve1ing5k1lc1p2oan0s3cker3us3l1ndon4tte1o3ve3pl0financial11r1s1t0d0a3u0ndbeck6xe1ury5v1y2ma0drid4if1son4keup4n0agement7go3p1rket0ing3s4riott5shalls7ttel5ba2c0kinsey7d1e0d0ia3et2lbourne7me1orial6n0u2rck0msd7g1h1iami3crosoft7l1ni1t2t0subishi9k1l0b1s2m0a2n1o0bi0le4da2e1i1m1nash3ey2ster5rmon3tgage6scow4to0rcycles9v0ie4p1q1r1s0d2t0n1r2u0seum3ic4v1w1x1y1z2na0b1goya4me2vy3ba2c1e0c1t0bank4flix4work5ustar5w0s2xt0direct7us4f0l2g0o2hk2i0co2ke1on3nja3ssan1y5l1o0kia3rton4w0ruz3tv4p1r0a1w2tt2u1yc2z2obi1server7ffice5kinawa6layan0group9lo3m0ega4ne1g1l0ine5oo2pen3racle3nge4g0anic5igins6saka4tsuka4t2vh3pa0ge2nasonic7ris2s1tners4s1y3y2ccw3e0t2f0izer5g1h0armacy6d1ilips5one2to0graphy6s4ysio5ics1tet2ures6d1n0g1k2oneer5zza4k1l0ace2y0station9umbing5s3m1n0c2ohl2ker3litie5rn2st3r0axi3ess3ime3o0d0uctions8f1gressive8mo2perties3y5tection8u0dential9s1t1ub2w0c2y2qa1pon3uebec3st5racing4dio4e0ad1lestate6tor2y4cipes5d0umbrella9hab3ise0n3t2liance6n0t0als5pair3ort3ublican8st0aurant8view0s5xroth6ich0ardli6oh3l1o1p2o0cks3deo3gers4om3s0vp3u0gby3hr2n2w0e2yukyu6sa0arland6fe0ty4kura4le1on3msclub4ung5ndvik0coromant12ofi4p1rl2s1ve2xo3b0i1s2c0b1haeffler7midt4olarships8ol3ule3warz5ience5ot3d1e0arch3t2cure1ity6ek2lect4ner3rvices6ven3w1x0y3fr2g1h0angrila6rp3ell3ia1ksha5oes2p0ping5uji3w3i0lk2na1gles5te3j1k0i0n2y0pe4l0ing4m0art3ile4n0cf3o0ccer3ial4ftbank4ware6hu2lar2utions7ng1y2y2pa0ce3ort2t3r0l2s1t0ada2ples4r1tebank4farm7c0group6ockholm6rage3e3ream4udio2y3yle4u0cks3pplies3y2ort5rf1gery5zuki5v1watch4iss4x1y0dney4stems6z2tab1ipei4lk2obao4rget4tamotors6r2too4x0i3c0i2d0k2eam2ch0nology8l1masek5nnis4va3f1g1h0d1eater2re6iaa2ckets5enda4ps2res2ol4j0maxx4x2k0maxx5l1m0all4n1o0day3kyo3ols3p1ray3shiba5tal3urs3wn2yota3s3r0ade1ing4ining5vel0ers0insurance16ust3v2t1ube2i1nes3shu4v0s2w1z2ua1bank3s2g1k1nicom3versity8o2ol2ps2s1y1z2va0cations7na1guard7c1e0gas3ntures6risign5mögensberater2ung14sicherung10t2g1i0ajes4deo3g1king4llas4n1p1rgin4sa1ion4va1o3laanderen9n1odka3lvo3te1ing3o2yage5u2wales2mart4ter4ng0gou5tch0es6eather0channel12bcam3er2site5d0ding5ibo2r3f1hoswho6ien2ki2lliamhill9n0dows4e1ners6me2oodside6rk0s2ld3w2s1tc1f3xbox3erox4ihuan4n2xx2yz3yachts4hoo3maxun5ndex5e1odobashi7ga2kohama6u0tube6t1un3za0ppos4ra3ero3ip2m1one3uerich6w2", Ae = "ελ1υ2бг1ел3дети4ею2католик6ом3мкд2он1сква6онлайн5рг3рус2ф2сайт3рб3укр3қаз3հայ3ישראל5קום3ابوظبي5رامكو5لاردن4بحرين5جزائر5سعودية6عليان5مغرب5مارات5یران5بارت2زار4يتك3ھارت5تونس4سودان3رية5شبكة4عراق2ب2مان4فلسطين6قطر3كاثوليك6وم3مصر2ليسيا5وريتانيا7قع4همراه5پاکستان7ڀارت4कॉम3नेट3भारत0म्3ोत5संगठन5বাংলা5ভারত2ৰত4ਭਾਰਤ4ભારત4ଭାରତ4இந்தியா6லங்கை6சிங்கப்பூர்11భారత్5ಭಾರತ4ഭാരതം5ලංකා4คอม3ไทย3ລາວ3გე2みんな3アマゾン4クラウド4グーグル4コム2ストア3セール3ファッション6ポイント4世界2中信1国1國1文网3亚马逊3企业2佛山2信息2健康2八卦2公司1益2台湾1灣2商城1店1标2嘉里0大酒店5在线2大拿2天主教3娱乐2家電2广东2微博2慈善2我爱你3手机2招聘2政务1府2新加坡2闻2时尚2書籍2机构2淡马锡3游戏2澳門2点看2移动2组织机构4网址1店1站1络2联通2谷歌2购物2通販2集团2電訊盈科4飞利浦3食品2餐厅2香格里拉3港2닷넷1컴2삼성2한국2", je = "numeric", Me = "ascii", Ne = "alpha", Pe = "asciinumeric", Fe = "alphanumeric", Ie = "domain", Le = "emoji", j = "scheme", Re = "slashscheme", ze = "whitespace";
function Be(e, t) {
	return e in t || (t[e] = []), t[e];
}
function Ve(e, t, n) {
	t[je] && (t[Pe] = !0, t[Fe] = !0), t[Me] && (t[Pe] = !0, t[Ne] = !0), t[Pe] && (t[Fe] = !0), t[Ne] && (t[Fe] = !0), t[Fe] && (t[Ie] = !0), t[Le] && (t[Ie] = !0);
	for (let r in t) {
		let t = Be(r, n);
		t.indexOf(e) < 0 && t.push(e);
	}
}
function He(e, t) {
	let n = {};
	for (let r in t) t[r].indexOf(e) >= 0 && (n[r] = !0);
	return n;
}
function M(e = null) {
	this.j = {}, this.jr = [], this.jd = null, this.t = e;
}
M.groups = {}, M.prototype = {
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
		r ||= M.groups;
		let i;
		return t && t.j ? i = t : (i = new M(t), n && r && Ve(t, n, r)), this.jr.push([e, i]), i;
	},
	ts(e, t, n, r) {
		let i = this, a = e.length;
		if (!a) return i;
		for (let t = 0; t < a - 1; t++) i = i.tt(e[t]);
		return i.tt(e[a - 1], t, n, r);
	},
	tt(e, t, n, r) {
		r ||= M.groups;
		let i = this;
		if (t && t.j) return i.j[e] = t, t;
		let a = t, o, s = i.go(e);
		return s ? (o = new M(), Object.assign(o.j, s.j), o.jr.push.apply(o.jr, s.jr), o.jd = s.jd, o.t = s.t) : o = new M(), a && (r && (o.t && typeof o.t == "string" ? Ve(a, Object.assign(He(o.t, r), n), r) : n && Ve(a, n, r)), o.t = a), i.j[e] = o, o;
	}
};
var N = (e, t, n, r, i) => e.ta(t, n, r, i), P = (e, t, n, r, i) => e.tr(t, n, r, i), Ue = (e, t, n, r, i) => e.ts(t, n, r, i), F = (e, t, n, r, i) => e.tt(t, n, r, i), I = "WORD", We = "UWORD", Ge = "ASCIINUMERICAL", Ke = "ALPHANUMERICAL", qe = "LOCALHOST", Je = "TLD", Ye = "UTLD", Xe = "SCHEME", Ze = "SLASH_SCHEME", Qe = "NUM", $e = "WS", L = "NL", et = "OPENBRACE", tt = "CLOSEBRACE", nt = "OPENBRACKET", R = "CLOSEBRACKET", z = "OPENPAREN", B = "CLOSEPAREN", rt = "OPENANGLEBRACKET", it = "CLOSEANGLEBRACKET", at = "FULLWIDTHLEFTPAREN", V = "FULLWIDTHRIGHTPAREN", ot = "LEFTCORNERBRACKET", st = "RIGHTCORNERBRACKET", ct = "LEFTWHITECORNERBRACKET", lt = "RIGHTWHITECORNERBRACKET", ut = "FULLWIDTHLESSTHAN", dt = "FULLWIDTHGREATERTHAN", ft = "AMPERSAND", H = "APOSTROPHE", U = "ASTERISK", W = "AT", pt = "BACKSLASH", mt = "BACKTICK", ht = "CARET", gt = "COLON", G = "COMMA", _t = "DOLLAR", K = "DOT", vt = "EQUALS", yt = "EXCLAMATION", q = "HYPHEN", bt = "PERCENT", xt = "PIPE", St = "PLUS", Ct = "POUND", wt = "QUERY", Tt = "QUOTE", Et = "FULLWIDTHMIDDLEDOT", Dt = "SEMI", J = "SLASH", Ot = "TILDE", kt = "UNDERSCORE", At = "EMOJI", jt = "SYM", Mt = /*#__PURE__*/ Object.freeze({
	__proto__: null,
	ALPHANUMERICAL: Ke,
	AMPERSAND: ft,
	APOSTROPHE: H,
	ASCIINUMERICAL: Ge,
	ASTERISK: U,
	AT: W,
	BACKSLASH: pt,
	BACKTICK: mt,
	CARET: ht,
	CLOSEANGLEBRACKET: it,
	CLOSEBRACE: tt,
	CLOSEBRACKET: R,
	CLOSEPAREN: B,
	COLON: gt,
	COMMA: G,
	DOLLAR: _t,
	DOT: K,
	EMOJI: At,
	EQUALS: vt,
	EXCLAMATION: yt,
	FULLWIDTHGREATERTHAN: dt,
	FULLWIDTHLEFTPAREN: at,
	FULLWIDTHLESSTHAN: ut,
	FULLWIDTHMIDDLEDOT: Et,
	FULLWIDTHRIGHTPAREN: V,
	HYPHEN: q,
	LEFTCORNERBRACKET: ot,
	LEFTWHITECORNERBRACKET: ct,
	LOCALHOST: qe,
	NL: L,
	NUM: Qe,
	OPENANGLEBRACKET: rt,
	OPENBRACE: et,
	OPENBRACKET: nt,
	OPENPAREN: z,
	PERCENT: bt,
	PIPE: xt,
	PLUS: St,
	POUND: Ct,
	QUERY: wt,
	QUOTE: Tt,
	RIGHTCORNERBRACKET: st,
	RIGHTWHITECORNERBRACKET: lt,
	SCHEME: Xe,
	SEMI: Dt,
	SLASH: J,
	SLASH_SCHEME: Ze,
	SYM: jt,
	TILDE: Ot,
	TLD: Je,
	UNDERSCORE: kt,
	UTLD: Ye,
	UWORD: We,
	WORD: I,
	WS: $e
}), Nt = /[a-z]/, Pt = /\p{L}/u, Ft = /\p{Emoji}/u, Y = /\d/, X = /\s/, It = "\r", Lt = "\n", Rt = "️", zt = "‍", Bt = "￼", Vt = null, Ht = null;
function Ut(e = []) {
	let t = {};
	M.groups = t;
	let n = new M();
	Vt ??= qt(ke), Ht ??= qt(Ae), F(n, "'", H), F(n, "{", et), F(n, "}", tt), F(n, "[", nt), F(n, "]", R), F(n, "(", z), F(n, ")", B), F(n, "<", rt), F(n, ">", it), F(n, "（", at), F(n, "）", V), F(n, "「", ot), F(n, "」", st), F(n, "『", ct), F(n, "』", lt), F(n, "＜", ut), F(n, "＞", dt), F(n, "&", ft), F(n, "*", U), F(n, "@", W), F(n, "`", mt), F(n, "^", ht), F(n, ":", gt), F(n, ",", G), F(n, "$", _t), F(n, ".", K), F(n, "=", vt), F(n, "!", yt), F(n, "-", q), F(n, "%", bt), F(n, "|", xt), F(n, "+", St), F(n, "#", Ct), F(n, "?", wt), F(n, "\"", Tt), F(n, "/", J), F(n, ";", Dt), F(n, "~", Ot), F(n, "_", kt), F(n, "\\", pt), F(n, "・", Et);
	let r = P(n, Y, Qe, { [je]: !0 });
	P(r, Y, r);
	let i = P(r, Nt, Ge, { [Pe]: !0 }), a = P(r, Pt, Ke, { [Fe]: !0 }), o = P(n, Nt, I, { [Me]: !0 });
	P(o, Y, i), P(o, Nt, o), P(i, Y, i), P(i, Nt, i);
	let s = P(n, Pt, We, { [Ne]: !0 });
	P(s, Nt), P(s, Y, a), P(s, Pt, s), P(a, Y, a), P(a, Nt), P(a, Pt, a);
	let c = F(n, Lt, L, { [ze]: !0 }), l = F(n, It, $e, { [ze]: !0 }), u = P(n, X, $e, { [ze]: !0 });
	F(n, Bt, u), F(l, Lt, c), F(l, Bt, u), P(l, X, u), F(u, It), F(u, Lt), P(u, X, u), F(u, Bt, u);
	let d = P(n, Ft, At, { [Le]: !0 });
	F(d, "#"), P(d, Ft, d), F(d, Rt, d);
	let f = F(d, zt);
	F(f, "#"), P(f, Ft, d);
	let p = [[Nt, o], [Y, i]], m = [
		[Nt, null],
		[Pt, s],
		[Y, a]
	];
	for (let e = 0; e < Vt.length; e++) Kt(n, Vt[e], Je, I, p);
	for (let e = 0; e < Ht.length; e++) Kt(n, Ht[e], Ye, We, m);
	Ve(Je, {
		tld: !0,
		ascii: !0
	}, t), Ve(Ye, {
		utld: !0,
		alpha: !0
	}, t), Kt(n, "file", Xe, I, p), Kt(n, "mailto", Xe, I, p), Kt(n, "http", Ze, I, p), Kt(n, "https", Ze, I, p), Kt(n, "ftp", Ze, I, p), Kt(n, "ftps", Ze, I, p), Ve(Xe, {
		scheme: !0,
		ascii: !0
	}, t), Ve(Ze, {
		slashscheme: !0,
		ascii: !0
	}, t), e = e.sort((e, t) => e[0] > t[0] ? 1 : -1);
	for (let t = 0; t < e.length; t++) {
		let r = e[t][0], i = e[t][1] ? { [j]: !0 } : { [Re]: !0 };
		r.indexOf("-") >= 0 ? i[Ie] = !0 : Nt.test(r) ? Y.test(r) ? i[Pe] = !0 : i[Me] = !0 : i[je] = !0, Ue(n, r, r, i);
	}
	return Ue(n, "localhost", qe, { ascii: !0 }), n.jd = new M(jt), {
		start: n,
		tokens: Object.assign({ groups: t }, Mt)
	};
}
function Wt(e, t) {
	let n = Gt(t.replace(/[A-Z]/g, (e) => e.toLowerCase())), r = n.length, i = [], a = 0, o = 0;
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
function Gt(e) {
	let t = [], n = e.length, r = 0;
	for (; r < n;) {
		let i = e.charCodeAt(r), a, o = i < 55296 || i > 56319 || r + 1 === n || (a = e.charCodeAt(r + 1)) < 56320 || a > 57343 ? e[r] : e.slice(r, r + 2);
		t.push(o), r += o.length;
	}
	return t;
}
function Kt(e, t, n, r, i) {
	let a, o = t.length;
	for (let n = 0; n < o - 1; n++) {
		let o = t[n];
		e.j[o] ? a = e.j[o] : (a = new M(r), a.jr = i.slice(), e.j[o] = a), e = a;
	}
	return a = new M(n), a.jr = i.slice(), e.j[t[o - 1]] = a, a;
}
function qt(e) {
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
var Jt = {
	defaultProtocol: "http",
	events: null,
	format: Xt,
	formatHref: Xt,
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
function Yt(e, t = null) {
	let n = Object.assign({}, Jt);
	e && (n = Object.assign(n, e instanceof Yt ? e.o : e));
	let r = n.ignoreTags, i = [];
	for (let e = 0; e < r.length; e++) i.push(r[e].toUpperCase());
	this.o = n, t && (this.defaultRender = t), this.ignoreTags = i;
}
Yt.prototype = {
	o: Jt,
	ignoreTags: [],
	defaultRender(e) {
		return e;
	},
	check(e) {
		return this.get("validate", e.toString(), e);
	},
	get(e, t, n) {
		let r = t != null, i = this.o[e];
		return i && (typeof i == "object" ? (i = n.t in i ? i[n.t] : Jt[e], typeof i == "function" && r && (i = i(t, n))) : typeof i == "function" && r && (i = i(t, n.t, n)), i);
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
function Xt(e) {
	return e;
}
function Zt(e, t) {
	this.t = "token", this.v = e, this.tk = t;
}
Zt.prototype = {
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
	toObject(e = Jt.defaultProtocol) {
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
function Qt(e, t) {
	class n extends Zt {
		constructor(t, n) {
			super(t, n), this.t = e;
		}
	}
	for (let e in t) n.prototype[e] = t[e];
	return n.t = e, n;
}
var $t = Qt("email", {
	isLink: !0,
	toHref() {
		return "mailto:" + this.toString();
	}
}), en = Qt("text"), tn = Qt("nl"), nn = Qt("url", {
	isLink: !0,
	toHref(e = Jt.defaultProtocol) {
		return this.hasProtocol() ? this.v : `${e}://${this.v}`;
	},
	hasProtocol() {
		let e = this.tk;
		return e.length >= 2 && e[0].t !== qe && e[1].t === gt;
	}
}), Z = (e) => new M(e);
function rn({ groups: e }) {
	let t = e.domain.concat([
		ft,
		U,
		W,
		pt,
		mt,
		ht,
		_t,
		vt,
		q,
		Qe,
		bt,
		xt,
		St,
		Ct,
		J,
		jt,
		Ot,
		kt
	]), n = [
		H,
		gt,
		G,
		K,
		yt,
		bt,
		wt,
		Tt,
		Dt,
		rt,
		it,
		et,
		tt,
		R,
		nt,
		z,
		B,
		at,
		V,
		ot,
		st,
		ct,
		lt,
		ut,
		dt
	], r = [
		ft,
		H,
		U,
		pt,
		mt,
		ht,
		_t,
		vt,
		q,
		et,
		tt,
		bt,
		xt,
		St,
		Ct,
		wt,
		J,
		jt,
		Ot,
		kt
	], i = Z(), a = F(i, Ot);
	N(a, r, a), N(a, e.domain, a);
	let o = Z(), s = Z(), c = Z();
	N(i, e.domain, o), N(i, e.scheme, s), N(i, e.slashscheme, c), N(o, r, a), N(o, e.domain, o);
	let l = F(o, W);
	F(a, W, l), F(s, W, l), F(c, W, l);
	let u = F(a, K);
	N(u, r, a), N(u, e.domain, a);
	let d = Z();
	N(l, e.domain, d), N(d, e.domain, d);
	let f = F(d, K);
	N(f, e.domain, d);
	let p = Z($t);
	N(f, e.tld, p), N(f, e.utld, p), F(l, qe, p);
	let m = F(d, q);
	F(m, q, m), N(m, e.domain, d), N(p, e.domain, d), F(p, K, f), F(p, q, m);
	let h = F(o, q), g = F(o, K);
	F(h, q, h), N(h, e.domain, o), N(g, r, a), N(g, e.domain, o);
	let _ = Z(nn);
	N(g, e.tld, _), N(g, e.utld, _), N(_, e.domain, o), N(_, r, a), F(_, K, g), F(_, q, h), F(_, W, l);
	let v = F(_, gt), y = Z(nn);
	N(v, e.numeric, y);
	let b = Z(nn), x = Z();
	N(b, t, b), N(b, n, x), N(x, t, b), N(x, n, x), F(_, J, b), F(y, J, b);
	let S = F(s, gt), C = F(F(F(c, gt), J), J);
	N(s, e.domain, o), F(s, K, g), F(s, q, h), N(c, e.domain, o), F(c, K, g), F(c, q, h), N(S, e.domain, b), F(S, J, b), F(S, wt, b), N(C, e.domain, b), N(C, t, b), F(C, J, b);
	let w = [
		[et, tt],
		[nt, R],
		[z, B],
		[rt, it],
		[at, V],
		[ot, st],
		[ct, lt],
		[ut, dt]
	];
	for (let e = 0; e < w.length; e++) {
		let [r, i] = w[e], a = F(b, r);
		F(x, r, a);
		let o = Z(nn);
		N(a, t, o);
		let s = Z();
		N(a, n, s), F(a, i, b), N(o, t, o), N(o, n, s), N(s, t, o), N(s, n, s), F(o, i, b), F(s, i, b);
	}
	return F(i, qe, _), F(i, L, tn), {
		start: i,
		tokens: Mt
	};
}
function an(e, t, n) {
	let r = n.length, i = 0, a = [], o = [];
	for (; i < r;) {
		let s = e, c = null, l = null, u = 0, d = null, f = -1;
		for (; i < r && !(c = s.go(n[i].t));) o.push(n[i++]);
		for (; i < r && (l = c || s.go(n[i].t));) c = null, s = l, s.accepts() ? (f = 0, d = s) : f >= 0 && f++, i++, u++;
		if (f < 0) i -= u, i < r && (o.push(n[i]), i++);
		else {
			o.length > 0 && (a.push(on(en, t, o)), o = []), i -= f, u -= f;
			let e = d.t, r = n.slice(i - u, i);
			a.push(on(e, t, r));
		}
	}
	return o.length > 0 && a.push(on(en, t, o)), a;
}
function on(e, t, n) {
	let r = n[0].s, i = n[n.length - 1].e;
	return new e(t.slice(r, i), n);
}
var sn = typeof console < "u" && console && console.warn || (() => {}), cn = "until manual call of linkify.init(). Register all schemes and plugins before invoking linkify the first time.", Q = {
	scanner: null,
	parser: null,
	tokenQueue: [],
	pluginQueue: [],
	customSchemes: [],
	initialized: !1
};
function ln() {
	return M.groups = {}, Q.scanner = null, Q.parser = null, Q.tokenQueue = [], Q.pluginQueue = [], Q.customSchemes = [], Q.initialized = !1, Q;
}
function un(e, t = !1) {
	if (Q.initialized && sn(`linkifyjs: already initialized - will not register custom scheme "${e}" ${cn}`), !/^[0-9a-z]+(-[0-9a-z]+)*$/.test(e)) throw Error("linkifyjs: incorrect scheme format.\n1. Must only contain digits, lowercase ASCII letters or \"-\"\n2. Cannot start or end with \"-\"\n3. \"-\" cannot repeat");
	Q.customSchemes.push([e, t]);
}
function dn() {
	Q.scanner = Ut(Q.customSchemes);
	for (let e = 0; e < Q.tokenQueue.length; e++) Q.tokenQueue[e][1]({ scanner: Q.scanner });
	Q.parser = rn(Q.scanner.tokens);
	for (let e = 0; e < Q.pluginQueue.length; e++) Q.pluginQueue[e][1]({
		scanner: Q.scanner,
		parser: Q.parser
	});
	return Q.initialized = !0, Q;
}
function fn(e) {
	return Q.initialized || dn(), an(Q.parser.start, e, Wt(Q.scanner.start, e));
}
fn.scan = Wt;
function pn(e, t = null, n = null) {
	if (t && typeof t == "object") {
		if (n) throw Error(`linkifyjs: Invalid link type ${t}; must be a string`);
		n = t, t = null;
	}
	let r = new Yt(n), i = fn(e), a = [];
	for (let e = 0; e < i.length; e++) {
		let n = i[e];
		n.isLink && (!t || n.t === t) && r.check(n) && a.push(n.toFormattedObject(r));
	}
	return a;
}
//#endregion
//#region node_modules/@tiptap/extension-link/dist/index.js
var mn = "[\0- \xA0 ᠎ -\u2029 　]", hn = new RegExp(mn), gn = RegExp(`${mn}$`), _n = new RegExp(mn, "g");
function vn(e) {
	return e.length === 1 ? e[0].isLink : e.length === 3 && e[1].isLink ? ["()", "[]"].includes(e[0].value + e[2].value) : !1;
}
function yn(e) {
	return new we({
		key: new Te("autolink"),
		appendTransaction: (t, n, r) => {
			let i = t.some((e) => e.docChanged) && !n.doc.eq(r.doc), a = t.some((e) => e.getMeta("preventAutolink"));
			if (!i || a) return;
			let { tr: o } = r, s = he(n.doc, [...t]);
			if (ye(s).forEach(({ newRange: t }) => {
				let n = _e(r.doc, t, (e) => e.isTextblock), i, a;
				if (n.length > 1) i = n[0], a = r.doc.textBetween(i.pos, i.pos + i.node.nodeSize, void 0, " ");
				else if (n.length) {
					let e = r.doc.textBetween(t.from, t.to, " ", " ");
					if (!gn.test(e)) return;
					i = n[0], a = r.doc.textBetween(i.pos, t.to, void 0, " ");
				}
				if (i && a) {
					let t = a.split(hn).filter(Boolean);
					if (t.length <= 0) return !1;
					let n = t[t.length - 1], s = i.pos + a.lastIndexOf(n);
					if (!n) return !1;
					let c = fn(n).map((t) => t.toObject(e.defaultProtocol));
					if (!vn(c)) return !1;
					c.filter((e) => e.isLink).map((e) => ({
						...e,
						from: s + e.start + 1,
						to: s + e.end + 1
					})).filter((e) => !r.schema.marks.code || !r.doc.rangeHasMark(e.from, e.to, r.schema.marks.code)).filter((t) => e.validate(t.value)).filter((t) => e.shouldAutoLink(t.value)).forEach((t) => {
						be(t.from, t.to, r.doc).some((t) => t.mark.type === e.type) || o.addMark(t.from, t.to, e.type.create({ href: t.href }));
					});
				}
			}), o.steps.length) return o;
		}
	});
}
function bn(e) {
	return new we({
		key: new Te("handleClickLink"),
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
				let n = ve(t.state, e.type.name), r = i.href ?? n.href, o = i.target ?? n.target;
				r && (window.open(r, o), a = !0);
			}
			return a;
		} }
	});
}
var xn = /\[([^[\]]+)\]\(((?:[^\s()]|\([^\s()]*\))+)(?:\s+(?:(["'])(.*?)\3|“(.*?)”|‘(.*?)’))?\)$/, Sn = /\[([^[\]]+)\]\(((?:[^\s()]|\([^\s()]*\))+)(?:\s+(?:(["'])(.*?)\3|“(.*?)”|‘(.*?)’))?\)/g;
function Cn(e, t) {
	let n = 0;
	for (let r = t - 1; r >= 0 && e[r] === "\\"; --r) n += 1;
	return n % 2 == 1;
}
function wn(e, t) {
	let n = 0, r = 0;
	for (; r < t;) {
		if (e[r] !== "`") {
			r += 1;
			continue;
		}
		if (n === 0 && Cn(e, r)) {
			r += 1;
			continue;
		}
		let i = 0;
		for (; r < t && e[r] === "`";) i += 1, r += 1;
		n === 0 ? n = i : i === n && (n = 0);
	}
	return n > 0;
}
function Tn(e, t, n) {
	let [, r, i] = t;
	return (t.index ? e[t.index - 1] : void 0) === "!" || Cn(e, t.index ?? 0) || wn(e, t.index ?? 0) ? !1 : !!r.trim() && n(i);
}
function En(e) {
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
function Dn(e, t) {
	return e.index < t.index + t.text.length && t.index < e.index + e.text.length;
}
function On(e) {
	return {
		href: e.data?.href,
		title: e.data?.title ?? null
	};
}
function kn(e) {
	let t = xe({
		find: (t) => {
			let n = xn.exec(t);
			return !n || !Tn(t, n, e.isAllowedHref) ? null : En(n);
		},
		type: e.type,
		getAttributes: On
	});
	return new fe({
		find: t.find,
		handler: (e) => {
			let n = t.handler(e);
			return n !== null && e.state.tr.steps.length && e.state.tr.setMeta("preventAutolink", !0), n;
		}
	});
}
function An(e) {
	let t = Se({
		find: (t) => {
			let n = [];
			for (let r of t.matchAll(Sn)) Tn(t, r, e.isAllowedHref) && n.push(En(r));
			let r = (e.findPlainUrls?.call(e, t) ?? []).filter((e) => !n.some((t) => Dn(t, e)));
			return [...n, ...r];
		},
		type: e.type,
		getAttributes: On
	});
	return new me({
		find: t.find,
		handler: (e) => {
			let n = t.handler(e);
			return n !== null && e.state.tr.steps.length && e.match.data?.markdown && e.state.tr.setMeta("preventAutolink", !0), n;
		}
	});
}
function jn(e) {
	return new we({
		key: new Te("handlePasteLink"),
		props: { handlePaste: (t, n, r) => {
			let { shouldAutoLink: i } = e, { state: a } = t, { selection: o } = a, { empty: s } = o;
			if (s) return !1;
			let c = "";
			r.content.forEach((e) => {
				c += e.textContent;
			});
			let l = pn(c, { defaultProtocol: e.defaultProtocol }).find((e) => e.isLink && e.value === c);
			return !c || !l || i !== void 0 && !i(l.value) ? !1 : e.editor.commands.setMark(e.type, { href: l.href });
		} }
	});
}
function Mn(e, t) {
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
	}), !e || e.replace(_n, "").match(RegExp(`^(?:(?:${n.map((e) => e.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&")).join("|")}):|[^a-z]|[a-z0-9+.\\-]+(?:[^a-z+.\\-:]|$))`, "i"));
}
var Nn = pe.create({
	name: "link",
	priority: 1e3,
	keepOnSplit: !1,
	exitable: !0,
	onCreate() {
		this.options.validate && !this.options.shouldAutoLink && (this.options.shouldAutoLink = this.options.validate, console.warn("The `validate` option is deprecated. Rename to the `shouldAutoLink` option instead.")), this.options.protocols.forEach((e) => {
			if (typeof e == "string") {
				un(e);
				return;
			}
			un(e.scheme, e.optionalSlashes);
		});
	},
	onDestroy() {
		ln();
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
			isAllowedUri: (e, t) => !!Mn(e, t.protocols),
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
					defaultValidate: (e) => !!Mn(e, this.options.protocols),
					protocols: this.options.protocols,
					defaultProtocol: this.options.defaultProtocol
				}) ? !1 : null;
			}
		}];
	},
	renderHTML({ HTMLAttributes: e }) {
		return this.options.isAllowedUri(e.href, {
			defaultValidate: (e) => !!Mn(e, this.options.protocols),
			protocols: this.options.protocols,
			defaultProtocol: this.options.defaultProtocol
		}) ? [
			"a",
			Ce(this.options.HTMLAttributes, e),
			0
		] : [
			"a",
			Ce(this.options.HTMLAttributes, {
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
					defaultValidate: (e) => !!Mn(e, this.options.protocols),
					protocols: this.options.protocols,
					defaultProtocol: this.options.defaultProtocol
				}) ? t().setMark(this.name, e).setMeta("preventAutolink", !0).run() : !1;
			},
			toggleLink: (e) => ({ chain: t }) => {
				let { href: n } = e || {};
				return n && !this.options.isAllowedUri(n, {
					defaultValidate: (e) => !!Mn(e, this.options.protocols),
					protocols: this.options.protocols,
					defaultProtocol: this.options.defaultProtocol
				}) ? !1 : t().toggleMark(this.name, e, { extendEmptyMarkRange: !0 }).setMeta("preventAutolink", !0).run();
			},
			unsetLink: () => ({ chain: e }) => e().unsetMark(this.name, { extendEmptyMarkRange: !0 }).setMeta("preventAutolink", !0).run()
		};
	},
	addInputRules() {
		return this.options.markdownLinks ? [kn({
			type: this.type,
			isAllowedHref: (e) => this.options.isAllowedUri(e, {
				defaultValidate: (e) => !!Mn(e, this.options.protocols),
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
				pn(e).filter((e) => e.isLink && this.options.isAllowedUri(e.value, {
					defaultValidate: (e) => !!Mn(e, n),
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
		return this.options.markdownLinks ? [An({
			type: this.type,
			isAllowedHref: (e) => this.options.isAllowedUri(e, {
				defaultValidate: (e) => !!Mn(e, this.options.protocols),
				protocols: this.options.protocols,
				defaultProtocol: this.options.defaultProtocol
			}),
			findPlainUrls: e
		})] : [Se({
			find: e,
			type: this.type,
			getAttributes: (e) => ({ href: e.data?.href })
		})];
	},
	addProseMirrorPlugins() {
		let e = [], { protocols: t, defaultProtocol: n } = this.options;
		return this.options.autolink && e.push(yn({
			type: this.type,
			defaultProtocol: this.options.defaultProtocol,
			validate: (e) => this.options.isAllowedUri(e, {
				defaultValidate: (e) => !!Mn(e, t),
				protocols: t,
				defaultProtocol: n
			}),
			shouldAutoLink: this.options.shouldAutoLink
		})), e.push(bn({
			type: this.type,
			editor: this.editor,
			openOnClick: this.options.openOnClick === "whenNotEditable" || this.options.openOnClick,
			enableClickSelection: this.options.enableClickSelection
		})), this.options.linkOnPaste && e.push(jn({
			editor: this.editor,
			defaultProtocol: this.options.defaultProtocol,
			type: this.type,
			shouldAutoLink: this.options.shouldAutoLink
		})), e;
	}
}), Pn = Math.min, Fn = Math.max, In = Math.round, Ln = Math.floor, Rn = (e) => ({
	x: e,
	y: e
}), zn = {
	left: "right",
	right: "left",
	bottom: "top",
	top: "bottom"
};
function Bn(e, t) {
	return typeof e == "function" ? e(t) : e;
}
function Vn(e) {
	return e.split("-")[0];
}
function Hn(e) {
	return e.split("-")[1];
}
function Un(e) {
	return e === "x" ? "y" : "x";
}
function Wn(e) {
	return e === "y" ? "height" : "width";
}
function Gn(e) {
	let t = e[0];
	return t === "t" || t === "b" ? "y" : "x";
}
function Kn(e) {
	return Un(Gn(e));
}
function qn(e, t, n) {
	n === void 0 && (n = !1);
	let r = Hn(e), i = Kn(e), a = Wn(i), o = i === "x" ? r === (n ? "end" : "start") ? "right" : "left" : r === "start" ? "bottom" : "top";
	return t.reference[a] > t.floating[a] && (o = nr(o)), [o, nr(o)];
}
function Jn(e) {
	let t = nr(e);
	return [
		Yn(e),
		t,
		Yn(t)
	];
}
function Yn(e) {
	return e.includes("start") ? e.replace("start", "end") : e.replace("end", "start");
}
var Xn = ["left", "right"], Zn = ["right", "left"], Qn = ["top", "bottom"], $n = ["bottom", "top"];
function er(e, t, n) {
	switch (e) {
		case "top":
		case "bottom": return n ? t ? Zn : Xn : t ? Xn : Zn;
		case "left":
		case "right": return t ? Qn : $n;
		default: return [];
	}
}
function tr(e, t, n, r) {
	let i = Hn(e), a = er(Vn(e), n === "start", r);
	return i && (a = a.map((e) => e + "-" + i), t && (a = a.concat(a.map(Yn)))), a;
}
function nr(e) {
	let t = Vn(e);
	return zn[t] + e.slice(t.length);
}
function rr(e) {
	return {
		top: e.top ?? 0,
		right: e.right ?? 0,
		bottom: e.bottom ?? 0,
		left: e.left ?? 0
	};
}
function ir(e) {
	return typeof e == "number" ? {
		top: e,
		right: e,
		bottom: e,
		left: e
	} : rr(e);
}
function ar(e) {
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
function or(e, t, n) {
	let { reference: r, floating: i } = e, a = Gn(t), o = Kn(t), s = Wn(o), c = Vn(t), l = a === "y", u = r.x + r.width / 2 - i.width / 2, d = r.y + r.height / 2 - i.height / 2, f = r[s] / 2 - i[s] / 2, p;
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
	let m = Hn(t);
	return m && (p[o] += f * (m === "end" ? 1 : -1) * (n && l ? -1 : 1)), p;
}
async function sr(e, t) {
	t === void 0 && (t = {});
	let { x: n, y: r, platform: i, rects: a, elements: o, strategy: s } = e, { boundary: c = "clippingAncestors", rootBoundary: l = "viewport", elementContext: u = "floating", altBoundary: d = !1, padding: f = 0 } = Bn(t, e), p = ir(f), m = o[d ? u === "floating" ? "reference" : "floating" : u], h = ar(await i.getClippingRect({
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
	}, y = ar(i.convertOffsetParentRelativeRectToViewportRelativeRect ? await i.convertOffsetParentRelativeRectToViewportRelativeRect({
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
var cr = 50, lr = async (e, t, n) => {
	let { placement: r = "bottom", strategy: i = "absolute", middleware: a = [], platform: o } = n, s = o.detectOverflow ? o : {
		...o,
		detectOverflow: sr
	}, c = await (o.isRTL == null ? void 0 : o.isRTL(t)), l = await o.getElementRects({
		reference: e,
		floating: t,
		strategy: i
	}), { x: u, y: d } = or(l, r, c), f = r, p = 0, m = {};
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
		}, x && p < cr && (p++, typeof x == "object" && (x.placement && (f = x.placement), x.rects && (l = x.rects === !0 ? await o.getElementRects({
			reference: e,
			floating: t,
			strategy: i
		}) : x.rects), {x: u, y: d} = or(l, f, c)), n = -1);
	}
	return {
		x: u,
		y: d,
		placement: f,
		strategy: i,
		middlewareData: m
	};
}, ur = function(e) {
	return e === void 0 && (e = {}), {
		name: "flip",
		options: e,
		async fn(t) {
			var n;
			let { placement: r, middlewareData: i, rects: a, initialPlacement: o, platform: s, elements: c } = t, { mainAxis: l = !0, crossAxis: u = !0, fallbackPlacements: d, fallbackStrategy: f = "bestFit", fallbackAxisSideDirection: p = "none", flipAlignment: m = !0, ...h } = Bn(e, t);
			if ((n = i.arrow) != null && n.alignmentOffset) return {};
			let g = Vn(r), _ = Gn(o), v = Vn(o) === o, y = await (s.isRTL == null ? void 0 : s.isRTL(c.floating)), b = d || (v || !m ? [nr(o)] : Jn(o)), x = p !== "none";
			!d && x && b.push(...tr(o, m, p, y));
			let S = [o, ...b], C = await s.detectOverflow(t, h), w = [], ee = i.flip?.overflows || [];
			if (l && w.push(C[g]), u) {
				let e = qn(r, a, y);
				w.push(C[e[0]], C[e[1]]);
			}
			if (ee = [...ee, {
				placement: r,
				overflows: w
			}], !w.every((e) => e <= 0)) {
				let e = (i.flip?.index || 0) + 1, t = S[e];
				if (t && (u !== "alignment" || _ === Gn(t) || ee.every((e) => Gn(e.placement) !== _ || e.overflows[0] > 0))) return {
					data: {
						index: e,
						overflows: ee
					},
					reset: { placement: t }
				};
				let n = ee.filter((e) => e.overflows[0] <= 0).sort((e, t) => e.overflows[1] - t.overflows[1])[0]?.placement;
				if (!n) switch (f) {
					case "bestFit": {
						let e = ee.filter((e) => {
							if (x) {
								let t = Gn(e.placement);
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
}, dr = /*#__PURE__*/ new Set(["left", "top"]);
async function fr(e, t) {
	let { placement: n, platform: r, elements: i } = e, a = await (r.isRTL == null ? void 0 : r.isRTL(i.floating)), o = Vn(n), s = Hn(n), c = Gn(n) === "y", l = dr.has(o) ? -1 : 1, u = a && c ? -1 : 1, d = Bn(t, e), { mainAxis: f, crossAxis: p, alignmentAxis: m } = typeof d == "number" ? {
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
var pr = function(e) {
	return e === void 0 && (e = 0), {
		name: "offset",
		options: e,
		async fn(t) {
			var n;
			let { x: r, y: i, placement: a, middlewareData: o } = t, s = await fr(t, e);
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
function mr() {
	return typeof window < "u";
}
function hr(e) {
	return _r(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function $(e) {
	var t;
	return (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function gr(e) {
	return ((_r(e) ? e.ownerDocument : e.document) || window.document)?.documentElement;
}
function _r(e) {
	return mr() ? e instanceof Node || e instanceof $(e).Node : !1;
}
function vr(e) {
	return mr() ? e instanceof Element || e instanceof $(e).Element : !1;
}
function yr(e) {
	return mr() ? e instanceof HTMLElement || e instanceof $(e).HTMLElement : !1;
}
function br(e) {
	return !mr() || typeof ShadowRoot > "u" ? !1 : e instanceof ShadowRoot || e instanceof $(e).ShadowRoot;
}
function xr(e) {
	let { overflow: t, overflowX: n, overflowY: r, display: i } = Mr(e);
	return /auto|scroll|overlay|hidden|clip/.test(t + r + n) && i !== "inline" && i !== "contents";
}
function Sr(e) {
	return /^(table|td|th)$/.test(hr(e));
}
function Cr(e) {
	try {
		if (e.matches(":popover-open")) return !0;
	} catch {}
	try {
		return e.matches(":modal");
	} catch {
		return !1;
	}
}
var wr = /transform|translate|scale|rotate|perspective|filter/, Tr = /paint|layout|strict|content/, Er = (e) => !!e && e !== "none", Dr;
function Or(e) {
	let t = vr(e) ? Mr(e) : e;
	return Er(t.transform) || Er(t.translate) || Er(t.scale) || Er(t.rotate) || Er(t.perspective) || !Ar() && (Er(t.backdropFilter) || Er(t.filter)) || wr.test(t.willChange || "") || Tr.test(t.contain || "");
}
function kr(e) {
	let t = Pr(e);
	for (; yr(t) && !jr(t);) {
		if (Or(t)) return t;
		if (Cr(t)) return null;
		t = Pr(t);
	}
	return null;
}
function Ar() {
	return Dr ??= typeof CSS < "u" && CSS.supports && CSS.supports("-webkit-backdrop-filter", "none"), Dr;
}
function jr(e) {
	return /^(html|body|#document)$/.test(hr(e));
}
function Mr(e) {
	return $(e).getComputedStyle(e);
}
function Nr(e) {
	return vr(e) ? {
		scrollLeft: e.scrollLeft,
		scrollTop: e.scrollTop
	} : {
		scrollLeft: e.scrollX,
		scrollTop: e.scrollY
	};
}
function Pr(e) {
	if (hr(e) === "html") return e;
	let t = e.assignedSlot || e.parentNode || br(e) && e.host || gr(e);
	return br(t) ? t.host : t;
}
function Fr(e) {
	let t = Pr(e);
	return jr(t) ? (e.ownerDocument || e).body : yr(t) && xr(t) ? t : Fr(t);
}
function Ir(e, t, n) {
	t === void 0 && (t = []), n === void 0 && (n = !0);
	let r = Fr(e), i = r === e.ownerDocument?.body, a = $(r);
	if (i) {
		let e = Lr(a);
		return t.concat(a, a.visualViewport || [], xr(r) ? r : [], e && n ? Ir(e) : []);
	}
	return t.concat(r, Ir(r, [], n));
}
function Lr(e) {
	return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
//#endregion
//#region node_modules/@floating-ui/dom/dist/floating-ui.dom.mjs
function Rr(e) {
	let t = Mr(e), n = parseFloat(t.width) || 0, r = parseFloat(t.height) || 0, i = yr(e), a = i ? e.offsetWidth : n, o = i ? e.offsetHeight : r, s = In(n) !== a || In(r) !== o;
	return s && (n = a, r = o), {
		width: n,
		height: r,
		$: s
	};
}
function zr(e) {
	return vr(e) ? e : e.contextElement;
}
function Br(e) {
	let t = zr(e);
	if (!yr(t)) return Rn(1);
	let n = t.getBoundingClientRect(), { width: r, height: i, $: a } = Rr(t), o = (a ? In(n.width) : n.width) / r, s = (a ? In(n.height) : n.height) / i;
	return (!o || !Number.isFinite(o)) && (o = 1), (!s || !Number.isFinite(s)) && (s = 1), {
		x: o,
		y: s
	};
}
var Vr = /*#__PURE__*/ Rn(0);
function Hr(e) {
	let t = $(e);
	return !Ar() || !t.visualViewport ? Vr : {
		x: t.visualViewport.offsetLeft,
		y: t.visualViewport.offsetTop
	};
}
function Ur(e, t, n) {
	return t === void 0 && (t = !1), !!n && t && n === $(e);
}
function Wr(e, t, n, r) {
	t === void 0 && (t = !1), n === void 0 && (n = !1);
	let i = e.getBoundingClientRect(), a = zr(e), o = Rn(1);
	t && (r ? vr(r) && (o = Br(r)) : o = Br(e));
	let s = Ur(a, n, r) ? Hr(a) : Rn(0), c = (i.left + s.x) / o.x, l = (i.top + s.y) / o.y, u = i.width / o.x, d = i.height / o.y;
	if (a && r) {
		let e = $(a), t = vr(r) ? $(r) : r, n = e, i = Lr(n);
		for (; i && t !== n;) {
			let e = Br(i), t = i.getBoundingClientRect(), r = Mr(i), a = t.left + (i.clientLeft + parseFloat(r.paddingLeft)) * e.x, o = t.top + (i.clientTop + parseFloat(r.paddingTop)) * e.y;
			c *= e.x, l *= e.y, u *= e.x, d *= e.y, c += a, l += o, n = $(i), i = Lr(n);
		}
	}
	return ar({
		width: u,
		height: d,
		x: c,
		y: l
	});
}
function Gr(e, t) {
	let n = Nr(e).scrollLeft;
	return t ? t.left + n : Wr(gr(e)).left + n;
}
function Kr(e, t) {
	let n = e.getBoundingClientRect();
	return {
		x: n.left + t.scrollLeft - Gr(e, n),
		y: n.top + t.scrollTop
	};
}
function qr(e) {
	let { elements: t, rect: n, offsetParent: r, strategy: i } = e, a = i === "fixed", o = gr(r), s = t ? Cr(t.floating) : !1;
	if (r === o || s && a) return n;
	let c = {
		scrollLeft: 0,
		scrollTop: 0
	}, l = Rn(1), u = Rn(0), d = yr(r);
	if ((d || !a) && ((hr(r) !== "body" || xr(o)) && (c = Nr(r)), d)) {
		let e = Wr(r);
		l = Br(r), u.x = e.x + r.clientLeft, u.y = e.y + r.clientTop;
	}
	let f = o && !d && !a ? Kr(o, c) : Rn(0);
	return {
		width: n.width * l.x,
		height: n.height * l.y,
		x: n.x * l.x - c.scrollLeft * l.x + u.x + f.x,
		y: n.y * l.y - c.scrollTop * l.y + u.y + f.y
	};
}
function Jr(e) {
	return e.getClientRects ? Array.from(e.getClientRects()) : [];
}
function Yr(e) {
	let t = Nr(e), n = e.ownerDocument.body, r = Fn(e.scrollWidth, e.clientWidth, n.scrollWidth, n.clientWidth), i = Fn(e.scrollHeight, e.clientHeight, n.scrollHeight, n.clientHeight), a = -t.scrollLeft + Gr(e), o = -t.scrollTop;
	return Mr(n).direction === "rtl" && (a += Fn(e.clientWidth, n.clientWidth) - r), {
		width: r,
		height: i,
		x: a,
		y: o
	};
}
var Xr = 25;
function Zr(e, t, n) {
	n === void 0 && (n = "viewport");
	let r = n === "layoutViewport", i = $(e), a = gr(e), o = i.visualViewport, s = a.clientWidth, c = a.clientHeight, l = 0, u = 0;
	if (o) {
		let e = !Ar() || t === "fixed";
		r ? e || (l = -o.offsetLeft, u = -o.offsetTop) : (s = o.width, c = o.height, e && (l = o.offsetLeft, u = o.offsetTop));
	}
	if (Gr(a) <= 0) {
		let e = a.ownerDocument, t = e.body, n = getComputedStyle(t), r = e.compatMode === "CSS1Compat" && parseFloat(n.marginLeft) + parseFloat(n.marginRight) || 0, i = Math.abs(a.clientWidth - t.clientWidth - r), o = getComputedStyle(a).scrollbarGutter === "stable both-edges" ? i / 2 : i;
		o <= Xr && (s -= o);
	}
	return {
		width: s,
		height: c,
		x: l,
		y: u
	};
}
function Qr(e, t) {
	let n = Wr(e, !0, t === "fixed"), r = n.top + e.clientTop, i = n.left + e.clientLeft, a = Br(e);
	return {
		width: e.clientWidth * a.x,
		height: e.clientHeight * a.y,
		x: i * a.x,
		y: r * a.y
	};
}
function $r(e, t, n) {
	let r;
	if (t === "viewport" || t === "layoutViewport") r = Zr(e, n, t);
	else if (t === "document") r = Yr(gr(e));
	else if (vr(t)) r = Qr(t, n);
	else {
		let n = Hr(e);
		r = {
			x: t.x - n.x,
			y: t.y - n.y,
			width: t.width,
			height: t.height
		};
	}
	return ar(r);
}
function ei(e, t) {
	let n = t.get(e);
	if (n) return n;
	let r = Ir(e, [], !1).filter((e) => vr(e) && hr(e) !== "body"), i = null, a = Mr(e).position === "fixed", o = a ? Pr(e) : e;
	for (; vr(o) && !jr(o);) {
		let e = Mr(o), t = Or(o), n = i ? i.position : a ? "fixed" : "";
		!t && (n === "fixed" || n === "absolute" && e.position === "static") ? r = r.filter((e) => e !== o) : i = e, o = Pr(o);
	}
	return t.set(e, r), r;
}
function ti(e) {
	let { element: t, boundary: n, rootBoundary: r, strategy: i } = e, a = [...n === "clippingAncestors" ? Cr(t) ? [] : ei(t, this._c) : [].concat(n), r], o = $r(t, a[0], i), s = o.top, c = o.right, l = o.bottom, u = o.left;
	for (let e = 1; e < a.length; e++) {
		let n = $r(t, a[e], i);
		s = Fn(n.top, s), c = Pn(n.right, c), l = Pn(n.bottom, l), u = Fn(n.left, u);
	}
	return {
		width: c - u,
		height: l - s,
		x: u,
		y: s
	};
}
function ni(e) {
	let { width: t, height: n } = Rr(e);
	return {
		width: t,
		height: n
	};
}
function ri(e, t, n) {
	let r = yr(t), i = gr(t), a = n === "fixed", o = Wr(e, !0, a, t), s = {
		scrollLeft: 0,
		scrollTop: 0
	}, c = Rn(0);
	if ((r || !a) && ((hr(t) !== "body" || xr(i)) && (s = Nr(t)), r)) {
		let e = Wr(t, !0, a, t);
		c.x = e.x + t.clientLeft, c.y = e.y + t.clientTop;
	}
	!r && i && (c.x = Gr(i));
	let l = i && !r && !a ? Kr(i, s) : Rn(0);
	return {
		x: o.left + s.scrollLeft - c.x - l.x,
		y: o.top + s.scrollTop - c.y - l.y,
		width: o.width,
		height: o.height
	};
}
function ii(e) {
	return Mr(e).position === "static";
}
function ai(e, t) {
	if (!yr(e) || Mr(e).position === "fixed") return null;
	if (t) return t(e);
	let n = e.offsetParent;
	return gr(e) === n && (n = n.ownerDocument.body), n;
}
function oi(e, t) {
	let n = $(e);
	if (Cr(e)) return n;
	if (!yr(e)) {
		let t = Pr(e);
		for (; t && !jr(t);) {
			if (vr(t) && !ii(t)) return t;
			t = Pr(t);
		}
		return n;
	}
	let r = ai(e, t);
	for (; r && Sr(r) && ii(r);) r = ai(r, t);
	return r && jr(r) && ii(r) && !Or(r) ? n : r || kr(e) || n;
}
var si = async function(e) {
	let t = this.getOffsetParent || oi, n = this.getDimensions, r = await n(e.floating);
	return {
		reference: ri(e.reference, await t(e.floating), e.strategy),
		floating: {
			x: 0,
			y: 0,
			width: r.width,
			height: r.height
		}
	};
};
function ci(e) {
	return Mr(e).direction === "rtl";
}
var li = {
	convertOffsetParentRelativeRectToViewportRelativeRect: qr,
	getDocumentElement: gr,
	getClippingRect: ti,
	getOffsetParent: oi,
	getElementRects: si,
	getClientRects: Jr,
	getDimensions: ni,
	getScale: Br,
	isElement: vr,
	isRTL: ci
};
function ui(e, t) {
	return e.x === t.x && e.y === t.y && e.width === t.width && e.height === t.height;
}
function di(e, t, n) {
	let r = null, i, a = gr(e);
	function o() {
		var e;
		clearTimeout(i), (e = r) == null || e.disconnect(), r = null;
	}
	function s(n, c) {
		n === void 0 && (n = !1), c === void 0 && (c = 1), o();
		let l = e.getBoundingClientRect(), { left: u, top: d, width: f, height: p } = l;
		if (n || t(), !f || !p) return;
		let m = Ln(d), h = Ln(a.clientWidth - (u + f)), g = Ln(a.clientHeight - (d + p)), _ = Ln(u), v = {
			rootMargin: -m + "px " + -h + "px " + -g + "px " + -_ + "px",
			threshold: Fn(0, Pn(1, c)) || 1
		}, y = !0;
		function b(t) {
			let n = t[0].intersectionRatio;
			if (!ui(l, e.getBoundingClientRect())) return s();
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
	let c = $(e), l = () => s(n);
	return c.addEventListener("resize", l), s(!0), () => {
		c.removeEventListener("resize", l), o();
	};
}
function fi(e, t, n, r) {
	r === void 0 && (r = {});
	let { ancestorScroll: i = !0, ancestorResize: a = !0, elementResize: o = typeof ResizeObserver == "function", layoutShift: s = typeof IntersectionObserver == "function", animationFrame: c = !1 } = r, l = zr(e), u = i || a ? [...l ? Ir(l) : [], ...t ? Ir(t) : []] : [];
	u.forEach((e) => {
		i && e.addEventListener("scroll", n), a && e.addEventListener("resize", n);
	});
	let d = l && s ? di(l, n, a) : null, f = -1, p = null;
	o && (p = new ResizeObserver((e) => {
		let [r] = e;
		r && r.target === l && p && t && (p.unobserve(t), cancelAnimationFrame(f), f = requestAnimationFrame(() => {
			var e;
			(e = p) == null || e.observe(t);
		})), n();
	}), l && !c && p.observe(l), t && p.observe(t));
	let m, h = c ? Wr(e) : null;
	c && g();
	function g() {
		let t = Wr(e);
		h && !ui(h, t) && n(), h = t, m = requestAnimationFrame(g);
	}
	return n(), () => {
		var e;
		u.forEach((e) => {
			i && e.removeEventListener("scroll", n), a && e.removeEventListener("resize", n);
		}), d?.(), (e = p) == null || e.disconnect(), p = null, c && cancelAnimationFrame(m);
	};
}
var pi = pr, mi = ur, hi = (e, t, n) => {
	let r = /* @__PURE__ */ new Map(), i = n ?? {}, a = {
		...li,
		...i.platform,
		_c: r
	};
	return lr(e, t, {
		...i,
		platform: a
	});
};
//#endregion
//#region node_modules/@tiptap/suggestion/dist/index.js
function gi(e) {
	let { char: t, allowSpaces: n, allowToIncludeChar: r, allowedPrefixes: i, startOfLine: a, $position: o } = e, s = n && !r, c = ge(t), l = RegExp(`\\s${c}$`), u = a ? "^" : "", d = r ? "" : c, f = RegExp(s ? `${u}${c}.*?(?=\\s${d}|$)` : `${u}(?:^)?${c}[^\\s${d}]*`, "gm"), p = o.nodeBefore?.isText && o.nodeBefore.text;
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
function _i(e) {
	return e.docChanged ? e.steps.some((e) => {
		let t = e.slice;
		if (!t?.content) return !1;
		let n = t.content.textBetween(0, t.content.size, "\n");
		return /\s/.test(n);
	}) : !1;
}
function vi(e) {
	return () => {
		let t = e.state.selection.$anchor.pos, { top: n, right: r, bottom: i, left: a } = e.view.coordsAtPos(t);
		try {
			return new DOMRect(a, n, r - a, i - n);
		} catch {
			return null;
		}
	};
}
function yi(e, t, n, r) {
	return n ? () => {
		let n = r.getState(e.state)?.decorationId;
		return t.dom.querySelector(`[data-decoration-id="${n}"]`)?.getBoundingClientRect() || null;
	} : vi(e);
}
function bi({ match: e, dismissedRange: t, state: n, transaction: r, editor: i, shouldResetDismissed: a, effectiveAllowSpaces: o }) {
	return a?.({
		editor: i,
		state: n,
		range: t,
		match: e,
		transaction: r,
		allowSpaces: o
	}) ? !1 : o ? e.range.from === t.from : e.range.from === t.from && !_i(r);
}
function xi({ view: e, pluginKeyRef: t }) {
	let n = e.state.tr.setMeta(t, { exit: !0 });
	e.dispatch(n);
}
function Si({ pluginKey: e, decorationTag: t, decorationClass: n, decorationContent: r, decorationEmptyClass: i, renderer: a, dispatchExit: o }) {
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
			return u && d.push(i), Oe.create(a.doc, [De.inline(s.from, s.to, {
				nodeName: t,
				class: d.join(" "),
				"data-decoration-id": c || void 0,
				"data-decoration-content": r
			})]);
		}
	};
}
function Ci({ editor: e, char: t, effectiveAllowSpaces: n, allowToIncludeChar: r, allowedPrefixes: i, startOfLine: a, findSuggestionMatch: o, allow: s, shouldShow: c, shouldKeepDismissed: l, pluginKey: u }) {
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
function wi({ editor: e, items: t }) {
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
function Ti({ placement: e, offset: t, flip: n, floatingUi: r }) {
	let i = [pi({
		mainAxis: t.mainAxis ?? 4,
		crossAxis: t.crossAxis ?? 0
	})];
	return n && i.push(mi()), r?.middleware?.length && i.push(...r.middleware), {
		placement: e,
		strategy: r?.strategy ?? "absolute",
		middleware: i
	};
}
function Ei(e) {
	if (e instanceof HTMLElement) return e;
	if (typeof e == "string") try {
		let t = document.querySelector(e);
		if (t) return t;
	} catch {
		return document.body;
	}
	return document.body;
}
function Di({ getReferenceRect: e, contextElement: t, config: n, container: r, dismissOnOutsideClick: i, dismiss: a }) {
	return (o, s = {}) => {
		let c = {
			getBoundingClientRect: () => e() ?? new DOMRect(),
			contextElement: t
		}, l = !1, u = !o.isConnected;
		u && Ei(r).appendChild(o), s.onPosition || (o.style.visibility = "hidden", o.style.width = "max-content");
		let d = fi(c, o, () => {
			hi(c, o, {
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
function Oi({ editor: e, pluginKey: t, items: n, renderer: r, minQueryLength: i, debounce: a, initialItems: o, placement: s, offset: c, container: l, flip: u, floatingUi: d, dismissOnOutsideClick: f, command: p, clientRectFor: m, dispatchExit: h }) {
	let g, _ = wi({
		editor: e,
		items: n
	}), v = Ti({
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
			let w = null, ee = S.query !== C.query, te = S.text !== C.text, ne = S.range.from !== C.range.from || S.range.to !== C.range.to, T = ee || te || ne;
			if (!S.active && C.active) w = "started";
			else if (S.active && !C.active) w = "stopped";
			else if (C.active && T) w = "updated";
			else return;
			let E = w === "stopped" ? S : C, re = n.dom.querySelector(`[data-decoration-id="${E.decorationId}"]`), ie = m(n, re), D = i === 0 || (E.query ? E.query.length >= i : !1), O = (w === "started" || w === "updated") && D;
			if (g = {
				editor: e,
				range: E.range,
				query: E.query || "",
				text: E.text || "",
				items: o ?? [],
				command: (t) => p({
					editor: e,
					range: E.range,
					props: t
				}),
				decorationNode: re,
				clientRect: ie,
				loading: O,
				placement: s,
				offset: {
					mainAxis: c.mainAxis ?? 4,
					crossAxis: c.crossAxis ?? 0
				},
				container: l,
				flip: u,
				floatingUi: v,
				mount: Di({
					getReferenceRect: ie,
					contextElement: n.dom,
					config: v,
					container: l,
					dismissOnOutsideClick: f,
					dismiss: () => h(e.view)
				})
			}, w === "started" && ((b = r?.onBeforeStart) == null || b.call(r, g)), w === "updated" && ((x = r?.onBeforeUpdate) == null || x.call(r, g)), w === "started" && y(w, g), w === "started" || w === "updated") {
				if (!O) _.abort(), g = {
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
					let e = await _.fetch(E.query || "", a);
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
var ki = new Te("suggestion");
function Ai({ pluginKey: e = ki, editor: t, char: n = "@", allowSpaces: r = !1, allowToIncludeChar: i = !1, allowedPrefixes: a = [" "], startOfLine: o = !1, decorationTag: s = "span", decorationClass: c = "suggestion", decorationContent: l = "", decorationEmptyClass: u = "is-empty", command: d = () => null, items: f = () => [], minQueryLength: p = 0, debounce: m = 0, initialItems: h, placement: g = "bottom-start", offset: _ = {}, container: v, flip: y = !0, floatingUi: b, dismissOnOutsideClick: x = !0, render: S = () => ({}), allow: C = () => !0, findSuggestionMatch: w = gi, shouldShow: ee, shouldResetDismissed: te }) {
	let ne = S?.(), T = r && !i, E = (n, r) => yi(t, n, r, e);
	function re(e) {
		return bi({
			...e,
			editor: t,
			shouldResetDismissed: te,
			effectiveAllowSpaces: T
		});
	}
	let ie = (t) => xi({
		view: t,
		pluginKeyRef: e
	});
	return new we({
		key: e,
		view: () => Oi({
			editor: t,
			pluginKey: e,
			items: f,
			renderer: ne,
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
			clientRectFor: E,
			dispatchExit: ie
		}),
		state: Ci({
			editor: t,
			char: n,
			effectiveAllowSpaces: T,
			allowToIncludeChar: i,
			allowedPrefixes: a,
			startOfLine: o,
			findSuggestionMatch: w,
			allow: C,
			shouldShow: ee,
			shouldKeepDismissed: re,
			pluginKey: e
		}),
		props: Si({
			pluginKey: e,
			decorationTag: s,
			decorationClass: c,
			decorationContent: l,
			decorationEmptyClass: u,
			renderer: ne,
			dispatchExit: ie
		})
	});
}
var ji = Ai;
//#endregion
//#region src/components/social/ComposerAttachments.tsx
function Mi(e) {
	return e < 1024 ? `${e} B` : e < 1048576 ? `${Math.round(e / 1024)} KB` : `${(e / 1048576).toFixed(1)} MB`;
}
function Ni({ file: e }) {
	let [t, n] = O(null);
	return T(() => {
		if (!e.type.startsWith("image/")) return;
		let t = URL.createObjectURL(e);
		return n(t), () => {
			URL.revokeObjectURL(t), n(null);
		};
	}, [e]), t ? /* @__PURE__ */ k("img", {
		src: t,
		alt: "",
		"aria-hidden": !0,
		className: "h-9 w-9 shrink-0 rounded object-cover",
		"data-testid": "composer-attachment-thumb"
	}) : /* @__PURE__ */ k("span", {
		"aria-hidden": !0,
		className: "grid h-9 w-9 shrink-0 place-items-center rounded bg-surface-inset text-text-tertiary",
		children: /* @__PURE__ */ k(a, { size: 16 })
	});
}
function Pi({ files: t, onRemove: n, disabled: r = !1, className: i, "data-testid": a = "composer-attachments" }) {
	return t.length === 0 ? null : /* @__PURE__ */ k("ul", {
		"data-testid": a,
		"aria-label": "Attachments",
		className: e("m-0 flex list-none flex-wrap gap-1.5 px-2 pt-2", i),
		children: t.map(({ id: e, file: t }) => /* @__PURE__ */ A("li", {
			"data-testid": "composer-attachment",
			className: "flex items-center gap-2 rounded-lg border border-border bg-surface-inset py-1 pl-1 pr-1.5",
			children: [
				/* @__PURE__ */ k(Ni, { file: t }),
				/* @__PURE__ */ A("span", {
					className: "flex min-w-0 flex-col",
					children: [/* @__PURE__ */ k("span", {
						className: "max-w-[11rem] truncate text-xs text-text-primary",
						title: t.name,
						children: t.name
					}), /* @__PURE__ */ k("span", {
						className: "text-[11px] text-text-tertiary",
						children: Mi(t.size)
					})]
				}),
				/* @__PURE__ */ k("button", {
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
var Fi = te(function({ items: t, command: n, onPickNonMember: r }, i) {
	let [a, o] = O(0), s = t.filter((e) => e.member !== !1), c = t.filter((e) => e.member === !1), l = [...s, ...c];
	T(() => o(0), [t]);
	let u = (e) => {
		let t = l[e];
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
	return E(i, () => ({ onKeyDown: ({ event: e }) => e.key === "ArrowUp" ? (o((e) => (e + l.length - 1) % l.length), !0) : e.key === "ArrowDown" ? (o((e) => (e + 1) % l.length), !0) : e.key === "Enter" || e.key === "Tab" ? (u(a), !0) : !1 })), t.length === 0 ? null : /* @__PURE__ */ k("div", {
		"data-testid": "mention-suggestions",
		role: "listbox",
		"aria-label": "People",
		className: "max-h-56 w-64 overflow-y-auto rounded-lg border border-border bg-surface py-1 shadow-lg",
		children: l.map((t, n) => /* @__PURE__ */ A(ee, { children: [n === s.length && c.length > 0 && /* @__PURE__ */ k("div", {
			className: "mt-1 border-t border-border px-2 pb-0.5 pt-1.5 text-[11px] font-semibold uppercase tracking-wide text-text-tertiary",
			"data-testid": "mention-non-members-heading",
			children: "Not in this chat"
		}), /* @__PURE__ */ A("button", {
			type: "button",
			role: "option",
			"aria-selected": n === a,
			"data-testid": t.member === !1 ? "mention-option-non-member" : "mention-option",
			"data-user-id": t.id,
			onMouseDown: (e) => {
				e.preventDefault(), u(n);
			},
			onMouseEnter: () => o(n),
			className: e("flex w-full items-center gap-2 px-2 py-1.5 text-left text-sm", n === a ? "bg-surface-hover" : "bg-transparent"),
			children: [
				/* @__PURE__ */ k(f, {
					name: t.label,
					src: t.avatarUrl,
					color: t.color,
					size: 24
				}),
				/* @__PURE__ */ A("span", {
					className: "min-w-0 flex-1",
					children: [/* @__PURE__ */ k("span", {
						className: e("block truncate", t.member === !1 ? "text-text-secondary" : "text-text-primary"),
						children: t.label
					}), t.hint && /* @__PURE__ */ k("span", {
						className: "block truncate text-xs text-text-tertiary",
						children: t.hint
					})]
				}),
				t.member === !1 && /* @__PURE__ */ k("span", {
					className: "shrink-0 text-xs text-primary",
					"data-testid": "mention-add-hint",
					children: "Add to chat"
				})
			]
		})] }, t.id))
	});
}), Ii = te(function({ items: t, command: n }, r) {
	let [i, o] = O(0);
	T(() => o(0), [t]);
	let s = (e) => {
		let r = t[e];
		r && n({
			id: r.id,
			label: r.label
		});
	};
	return E(r, () => ({ onKeyDown: ({ event: e }) => t.length === 0 ? !1 : e.key === "ArrowUp" ? (o((e) => (e + t.length - 1) % t.length), !0) : e.key === "ArrowDown" ? (o((e) => (e + 1) % t.length), !0) : e.key === "Enter" || e.key === "Tab" ? (s(i), !0) : !1 })), t.length === 0 ? null : /* @__PURE__ */ k("div", {
		"data-testid": "document-suggestions",
		role: "listbox",
		"aria-label": "Documents",
		className: "max-h-56 w-64 overflow-y-auto rounded-lg border border-border bg-surface py-1 shadow-lg",
		children: t.map((t, n) => /* @__PURE__ */ A("button", {
			type: "button",
			role: "option",
			"aria-selected": n === i,
			"data-testid": "document-option",
			onMouseDown: (e) => {
				e.preventDefault(), s(n);
			},
			onMouseEnter: () => o(n),
			className: e("flex w-full items-center gap-2 px-2 py-1.5 text-left text-sm", n === i ? "bg-surface-hover" : "bg-transparent"),
			children: [/* @__PURE__ */ k("span", {
				"aria-hidden": "true",
				className: e("w-6 shrink-0 text-center leading-none", t.icon ? "text-base" : "text-text-tertiary"),
				children: t.icon || /* @__PURE__ */ k(a, {
					size: 14,
					className: "inline-block"
				})
			}), /* @__PURE__ */ A("span", {
				className: "min-w-0 flex-1",
				children: [/* @__PURE__ */ k("span", {
					className: "block truncate text-text-primary",
					children: t.label
				}), t.hint && /* @__PURE__ */ k("span", {
					className: "block truncate text-xs text-text-tertiary",
					children: t.hint
				})]
			})]
		}, t.id))
	});
}), Li = te(function({ items: t, command: n }, r) {
	let [i, a] = O(0);
	T(() => a(0), [t]);
	let o = (e) => {
		let r = t[e];
		r && n({ emoji: r.emoji });
	};
	return E(r, () => ({ onKeyDown: ({ event: e }) => e.key === "ArrowUp" ? (a((e) => (e + t.length - 1) % t.length), !0) : e.key === "ArrowDown" ? (a((e) => (e + 1) % t.length), !0) : e.key === "Enter" || e.key === "Tab" ? (o(i), !0) : !1 })), t.length === 0 ? null : /* @__PURE__ */ k("div", {
		"data-testid": "emoji-suggestions",
		role: "listbox",
		"aria-label": "Emoji",
		className: "max-h-56 w-56 overflow-y-auto rounded-lg border border-border bg-surface py-1 shadow-lg",
		children: t.map((t, n) => /* @__PURE__ */ A("button", {
			type: "button",
			role: "option",
			"aria-selected": n === i,
			"data-testid": "emoji-option",
			onMouseDown: (e) => {
				e.preventDefault(), o(n);
			},
			onMouseEnter: () => a(n),
			className: e("flex w-full items-center gap-2 px-2 py-1 text-left text-sm", n === i ? "bg-surface-hover" : "bg-transparent"),
			children: [/* @__PURE__ */ k("span", {
				"aria-hidden": !0,
				className: "text-base leading-none",
				children: t.emoji
			}), /* @__PURE__ */ A("span", {
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
function Ri(e, t) {
	return !e?.code || t === void 0 ? !1 : t.trim().toLowerCase() === e.code.toLowerCase();
}
function zi(e) {
	return e.code && e.label === e.code && e.description ? e.description : e.label;
}
function Bi(e) {
	if (!(e.hint && e.hint === zi(e))) return e.hint;
}
var Vi = te(function({ items: t, command: n, label: r = "Commands", draft: i }, a) {
	let [o, s] = O(0);
	T(() => s(0), [t]);
	let c = (e) => {
		let r = t[e];
		r && n(r);
	};
	if (E(a, () => ({ onKeyDown: ({ event: e }) => t.length === 0 ? !1 : e.key === "ArrowUp" ? (s((e) => (e + t.length - 1) % t.length), !0) : e.key === "ArrowDown" ? (s((e) => (e + 1) % t.length), !0) : e.key === "Enter" && Ri(t[o], i) ? !1 : e.key === "Enter" || e.key === "Tab" ? (c(o), !0) : !1 })), t.length === 0) return null;
	let l = t[o]?.description;
	return /* @__PURE__ */ A("div", {
		"data-testid": "command-suggestions",
		className: "w-[26rem] max-w-[calc(100vw-2rem)] rounded-lg border border-border bg-surface py-1 shadow-lg",
		children: [/* @__PURE__ */ k("div", {
			role: "listbox",
			"aria-label": r,
			className: "max-h-56 overflow-y-auto",
			children: t.map((t, n) => /* @__PURE__ */ A("button", {
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
					t.code && /* @__PURE__ */ k("span", {
						className: "shrink-0 font-mono text-xs text-text-secondary",
						children: t.code
					}),
					!t.code && t.icon && /* @__PURE__ */ k("span", {
						"aria-hidden": !0,
						className: "shrink-0 text-base leading-none",
						children: t.icon
					}),
					/* @__PURE__ */ k("span", {
						className: "min-w-0 flex-1 truncate text-text-primary",
						children: zi(t)
					}),
					Bi(t) && /* @__PURE__ */ k("span", {
						className: "shrink-0 max-w-[45%] truncate text-xs text-text-tertiary",
						children: Bi(t)
					})
				]
			}, t.id))
		}), l && /* @__PURE__ */ k("div", {
			"data-testid": "command-description",
			className: "truncate border-t border-border px-2 pt-1 text-xs text-text-secondary",
			children: l
		})]
	});
}), Hi = {
	visible: "Visible to everyone",
	hidden: "Only you"
}, Ui = {
	chat: "Write a message…",
	agent: "Tell the agent what to do… (budget and model in the status line)",
	terminal: "$ command in the cloud shell"
}, Wi = {
	running: "bg-info animate-pulse motion-reduce:animate-none",
	idle: "bg-border-emphasis",
	failed: "bg-danger",
	done: "bg-success"
};
function Gi() {
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
function Ki(e, t) {
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
function qi(e) {
	return Ki(e, "mention");
}
function Ji(e) {
	return Ki(e, "docref");
}
function Yi({ state: e, range: t }) {
	let n = e.doc.resolve(t.from);
	if (n.parentOffset === 0) return !0;
	let r = n.parent.textBetween(n.parentOffset - 1, n.parentOffset, void 0, "\0");
	return r === "" || /[\s\0(\[{"'“‘]/.test(r);
}
var Xi = Ee.extend({ name: "docref" }), Zi = new Te("docrefSuggestion"), Qi = 0, $i = new Te("commandSuggestion"), ea = new Te("commandArgumentSuggestion");
function ta(e, t, n = !1) {
	let r = null, i = [], a = Gi(), o = (r) => {
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
			i = [], r = new se(Vi, {
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
var na = te(function({ onSend: a, draft: f, onDraftChange: x, onCommand: ee, onSearchPeople: te, mentionMembers: fe, onMentionNonMember: pe, onSearchDocuments: me, allowAttachments: he = !1, allowEmoji: ge = !1, onRequestLink: _e, placeholder: ve = "Write a message…", commands: ye, privacy: be = "visible", onPrivacyChange: xe, privacyLabels: Se, disabled: Ce = !1, references: we, onRemoveReference: Te, toolbarExtras: De, processes: Oe, mode: ke = "chat", onModeChange: Ae, modePlaceholders: je, hints: Me, onQuickOpen: Ne, sendOptions: Pe, onSendOption: Fe, onShellCommand: Ie, className: Le, "data-testid": j = "rich-chat-composer" }, Re) {
	let ze = D(() => {}), Be = D(() => {}), Ve = D(null), He = D(null), [M, N] = O(!1), [P, Ue] = O({
		open: !1,
		href: "",
		text: ""
	}), F = D(f), I = D(x);
	I.current = x;
	let [We, Ge] = O(() => (f?.files ?? []).map((e) => ({
		id: `staged-${Qi++}`,
		file: e
	}))), Ke = D(We), qe = D(() => {}), Je = D(!1), Ye = D(!0);
	T(() => (Ye.current = !0, () => {
		Ye.current = !1;
	}), []);
	let [Xe, Ze] = O(!1), [Qe, $e] = O(!1), L = Ce || Xe, [et, tt] = O(!0), nt = he && !L, R = !!Ae, z = R ? ke : "chat", B = z === "terminal", rt = R && z !== "chat", it = je?.[z] ?? (z === "chat" ? ve : Ui[z]), at = D(it);
	at.current = it;
	let V = D(ye);
	V.current = ye;
	let ot = D(te);
	ot.current = te;
	let st = D(fe);
	st.current = fe;
	let ct = D(pe);
	ct.current = pe;
	let lt = !!te, ut = D(me);
	ut.current = me;
	let dt = !!me, ft = D(ee);
	ft.current = ee;
	let H = D(f?.command?.argument ? {
		trigger: f.command.trigger,
		item: f.command.argument
	} : null), [U, W] = O(null), [pt, mt] = O(!0);
	T(() => {
		let e = ht.current;
		if (!e) return;
		let t = b(e.getText(), ye);
		W((e) => e?.trigger === t?.trigger && e?.disabled === t?.disabled ? e : t);
	}, [ye]);
	let ht = D(null), gt = ie(() => {
		let e = [
			le.configure({
				heading: !1,
				horizontalRule: !1,
				link: !1
			}),
			ue.configure({ placeholder: () => at.current }),
			Nn.configure({
				openOnClick: !1,
				autolink: !0,
				HTMLAttributes: {
					rel: "noopener noreferrer nofollow",
					target: "_blank"
				}
			}),
			de.create({
				name: "emojiSuggestion",
				priority: 101,
				addProseMirrorPlugins() {
					return [ji({
						editor: this.editor,
						char: ":",
						allow: ({ state: e, range: t }) => e.doc.textBetween(t.from, t.to, "\0").length >= 3,
						items: ({ query: e }) => C(e),
						command: ({ editor: e, range: t, props: n }) => {
							e.chain().focus().deleteRange(t).insertContent(n.emoji).run();
						},
						render: () => {
							let e = null, t = Gi();
							return {
								onStart: (n) => {
									e = new se(Li, {
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
			de.create({
				name: "commandSuggestion",
				priority: 101,
				addProseMirrorPlugins() {
					return [ji({
						pluginKey: $i,
						editor: this.editor,
						char: "/",
						allow: ({ state: e, range: t }) => e.doc.textBetween(0, t.from, "\n", "\0").trim() === "",
						items: ({ query: e }) => {
							let t = e.toLowerCase();
							return (V.current ?? []).filter((e) => !e.disabled && e.trigger.slice(1).toLowerCase().startsWith(t)).map((e) => ({
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
						render: () => ta("Commands", !1, !0)
					})];
				}
			}),
			de.create({
				name: "commandArgumentSuggestion",
				priority: 101,
				addProseMirrorPlugins() {
					return [ji({
						pluginKey: ea,
						editor: this.editor,
						debounce: 120,
						findSuggestionMatch: ({ $position: e }) => {
							if (e.depth !== 1 || e.index(0) !== 0) return null;
							let t = e.parent.textBetween(0, e.parentOffset, void 0, "\0"), n = b(t, V.current);
							if (!n?.argument) return null;
							let r = t.length - t.trimStart().length + n.trigger.length + 1;
							if (e.parentOffset < r) return null;
							let i = t.slice(r), a = H.current;
							return a && a.trigger === n.trigger && i.includes(a.item.label) ? null : {
								range: {
									from: e.start() + r,
									to: e.pos
								},
								query: i.trimStart(),
								text: i
							};
						},
						items: async ({ editor: e, query: t }) => await b(e.getText(), V.current)?.argument?.search(t) ?? [],
						command: ({ editor: e, range: t, props: n }) => {
							let r = b(e.getText(), V.current);
							if (!r?.argument) return;
							let i = {
								id: n.id,
								label: n.label,
								hint: n.hint,
								icon: n.icon
							};
							if ((r.argument.onPick?.(i) ?? "insert") === "execute") {
								H.current = null, e.commands.clearContent(!0), ft.current?.(r, i);
								return;
							}
							H.current = {
								trigger: r.trigger,
								item: i
							}, e.chain().focus().deleteRange(t).insertContent(`${i.label} `).run();
						},
						render: () => ta("Arguments", !0)
					})];
				}
			}),
			de.create({
				name: "chatComposerKeymap",
				addKeyboardShortcuts() {
					return {
						Enter: () => (ze.current(), !0),
						"Mod-k": () => (Be.current(), !0),
						"Shift-Enter": ({ editor: e }) => e.commands.setHardBreak()
					};
				}
			})
		];
		return lt && e.push(Ee.configure({
			HTMLAttributes: { class: "mention" },
			suggestion: {
				char: "@",
				items: async ({ query: e }) => {
					let t = await ot.current?.(e) ?? [], n = st.current;
					return n ? t.map((e) => ({
						...e,
						member: n.has(e.id)
					})) : t;
				},
				render: () => {
					let e = null, t = Gi(), n = (e) => ({
						...e,
						onPickNonMember: (n) => {
							t.detach(), e.editor.chain().focus().deleteRange(e.range).run(), ct.current?.(n);
						}
					});
					return {
						onStart: (r) => {
							e = new se(Fi, {
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
		})), dt && e.push(Xi.configure({
			HTMLAttributes: { class: "docref" },
			renderText: ({ node: e }) => `#${e.attrs.label ?? e.attrs.id}`,
			renderHTML: ({ options: e, node: t }) => [
				"span",
				e.HTMLAttributes,
				`#${t.attrs.label ?? t.attrs.id}`
			],
			suggestion: {
				char: "#",
				pluginKey: Zi,
				allow: Yi,
				items: ({ query: e }) => ut.current?.(e) ?? [],
				render: () => {
					let e = null, t = Gi();
					return {
						onStart: (n) => {
							e = new se(Ii, {
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
	}, [lt, dt]), G = ce({
		extensions: gt,
		content: f?.html ?? "",
		editable: !L,
		onUpdate: ({ editor: e }) => {
			tt(e.isEmpty), ht.current = e;
			let t = e.getText(), n = b(t, V.current);
			W((e) => e?.trigger === n?.trigger ? e : n), mt(!n || w(t, n).trim() === ""), H.current && H.current.trigger !== n?.trigger && (H.current = null), qe.current(e);
		},
		editorProps: { attributes: {
			class: "chat-composer-input",
			"data-testid": `${j}-input`
		} }
	}, [gt]);
	T(() => {
		G?.setEditable(!L);
	}, [G, L]), T(() => {
		!R || !G || G.isDestroyed || G.view.dispatch(G.state.tr);
	}, [
		G,
		z,
		R
	]);
	let [_t, K] = O(""), [vt, yt] = O([]), [q, bt] = O(-1), xt = ne(() => {
		let e = _t.trim();
		!e || L || !Ie || (yt((t) => t[t.length - 1] === e ? t : [...t, e]), K(""), bt(-1), Ie(e));
	}, [
		_t,
		L,
		Ie
	]), St = ne((e) => {
		if (!vt.length) return;
		let t = Math.min(vt.length - 1, Math.max(-1, q + e));
		bt(t), K(t < 0 ? "" : vt[vt.length - 1 - t] ?? "");
	}, [vt, q]), Ct = ie(() => Me || (!Ae && !Ne ? [] : [
		{
			key: "/",
			label: "for commands"
		},
		{
			key: ">_",
			label: "for shell",
			...Ae ? { onSelect: () => Ae("terminal") } : {}
		},
		{
			key: "⌘K",
			label: "to quickly open",
			...Ne ? { onSelect: Ne } : {}
		}
	]), [
		Me,
		Ae,
		Ne
	]), wt = B ? !L && !!Ie && _t.trim().length > 0 : !L && (!et || We.length > 0);
	qe.current = (e) => {
		let t = F.current, n = H.current, r = b(e.getText(), V.current), i = {
			html: e.isEmpty ? "" : e.getHTML(),
			files: Ke.current.map((e) => e.file),
			...r ? { command: {
				trigger: r.trigger,
				...n?.trigger === r.trigger && w(e.getText(), r).includes(n.item.label) ? { argument: n.item } : {}
			} } : {},
			...xe ? { privacy: be } : {}
		};
		t && t.html === i.html && t.files.length === i.files.length && t.files.every((e, t) => e === i.files[t]) && t.command?.trigger === i.command?.trigger && t.command?.argument === i.command?.argument && t.privacy === i.privacy || (F.current = i, I.current?.(i, t));
	};
	let Tt = (e) => {
		Ke.current = e, Ge(e), G && !G.isDestroyed && qe.current(G);
	};
	T(() => {
		if (!G) return;
		if (x && f !== F.current) {
			F.current = f, G.commands.setContent(f?.html ?? "", { emitUpdate: !1 }), H.current = f?.command?.argument ? {
				trigger: f.command.trigger,
				item: f.command.argument
			} : null;
			let e = (f?.files ?? []).map((e) => ({
				id: `staged-${Qi++}`,
				file: e
			}));
			Ke.current = e, Ge(e);
		}
		ht.current = G, tt(G.isEmpty);
		let e = b(G.getText(), V.current);
		W(e), mt(!e || w(G.getText(), e).trim() === "");
	}, [
		G,
		f,
		x
	]), T(() => {
		!xe || !G || G.isDestroyed || qe.current(G);
	}, [be, G]);
	let Et = ne(() => {
		if (!G) return;
		let { from: e, to: t } = G.state.selection;
		Ue({
			open: !0,
			href: G.getAttributes("link").href ?? "",
			text: G.state.doc.textBetween(e, t)
		});
	}, [G]), Dt = ne(({ href: e, text: t }) => {
		if (!G) return;
		let n = G.chain().focus(), { empty: r } = G.state.selection;
		r ? n.insertContent(`<a href="${e}">${t || e}</a>`).run() : t ? n.insertContent(`<a href="${e}">${t}</a>`).run() : n.setLink({ href: e }).run(), Ue({
			open: !1,
			href: "",
			text: ""
		});
	}, [G]), J = ne(() => {
		if (!G || !wt || B || Je.current) return;
		let e = G.getText(), t = z === "agent" && e.trim() && !/^\s*\/agent\b/i.test(e) ? `/agent ${e.trim()}` : e, n = b(t, V.current), r = H.current, i;
		n && (i = { trigger: n.trigger }, r && r.trigger === n.trigger && w(t, n).includes(r.item.label) && (i.argument = r.item));
		let o = Ji(G), s = {
			html: G.isEmpty ? "" : G.getHTML(),
			text: t,
			mentions: qi(G),
			privacy: be,
			files: We.map((e) => e.file),
			...o.length > 0 ? { documents: o } : {},
			...i ? { command: i } : {},
			...R ? { mode: z } : {}
		}, c = F.current, l = I.current, u = (e) => {
			e !== !1 && (!Ye.current || G.isDestroyed ? l?.({
				html: "",
				files: []
			}, c) : F.current === c && (H.current = null, Ke.current = [], Ge([]), G.commands.clearContent(!0), F.current === c && qe.current(G), tt(!0)));
		};
		Je.current = !0, $e(!1);
		try {
			let e = a(s);
			e && typeof e == "object" && "then" in e ? (Ze(!0), e.then(u, () => {
				Ye.current && !G.isDestroyed && $e(!0);
			}).finally(() => {
				Je.current = !1, Ye.current && !G.isDestroyed && Ze(!1);
			})) : (u(e), Je.current = !1);
		} catch {
			Je.current = !1, $e(!0);
		}
	}, [
		G,
		wt,
		a,
		We,
		be,
		B,
		z,
		R
	]);
	ze.current = J, Be.current = Et, E(Re, () => ({
		get editor() {
			return G;
		},
		focus: () => {
			G?.commands.focus();
		},
		insertText: (e) => {
			G?.chain().focus().insertContent(e).run();
		}
	}), [G]);
	let Ot = ne((e) => {
		!nt || e.length === 0 || Tt([...Ke.current, ...e.map((e) => ({
			id: `staged-${Qi++}`,
			file: e
		}))]);
	}, [nt, G]), [kt, At] = O(null), jt = D(null), Mt = D(null), Nt = ne((e) => {
		if (jt.current?.disconnect(), jt.current = null, Mt.current = e, !e || typeof ResizeObserver > "u") return;
		let t = (e) => At(e > 0 ? e : null), n = new ResizeObserver(([e]) => t(e.contentRect.width));
		n.observe(e), jt.current = n, t(e.getBoundingClientRect().width);
	}, []);
	T(() => () => jt.current?.disconnect(), []), re(() => {
		let e = Mt.current;
		if (!e) return;
		let t = e.getBoundingClientRect().width;
		t > 0 && t !== kt && At(t);
	});
	let Pt = (e) => kt === null || kt >= e, Ft = Pt(360), Y = Pt(300), X = (t, n, r, i, a, o) => /* @__PURE__ */ k("button", {
		ref: a,
		type: "button",
		"aria-label": t,
		"aria-pressed": n,
		title: t,
		disabled: L,
		"data-testid": o,
		onMouseDown: (e) => {
			e.preventDefault(), r();
		},
		onClick: (e) => {
			e.detail === 0 && r();
		},
		className: e("grid h-7 w-7 shrink-0 place-items-center rounded text-sm leading-none", n ? "bg-surface-hover text-text-primary" : "text-text-secondary hover:bg-surface-hover"),
		children: i
	}, o ?? t);
	return /* @__PURE__ */ k(v, {
		onFiles: Ot,
		disabled: !nt,
		className: Le,
		children: /* @__PURE__ */ A("div", {
			"data-testid": j,
			"data-command": U?.trigger,
			"data-mode": R ? z : void 0,
			"data-console": rt ? "true" : void 0,
			...rt ? { "data-theme": "dark" } : {},
			className: e("chat-composer relative isolate rounded-lg border bg-surface transition-colors duration-300 focus-within:ring-2 motion-reduce:transition-none", rt && "uic-chat-console", U ? U.disabled ? "border-warning focus-within:border-warning focus-within:ring-warning" : "border-info focus-within:border-info focus-within:ring-info" : "border-border focus-within:border-primary focus-within:ring-primary"),
			children: [
				/* @__PURE__ */ k(m, {
					active: rt,
					particleCount: 120,
					speed: .09,
					alphaParticles: !0,
					particleColors: h,
					particleBaseSize: 90,
					fallbackIntensity: "low",
					className: "pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-lg",
					"data-testid": `${j}-console`
				}),
				Qe && /* @__PURE__ */ k("p", {
					role: "alert",
					className: "px-2 py-1 text-sm text-danger-fg",
					children: "Unable to send. Your draft and attachments are saved. Try again."
				}),
				U && /* @__PURE__ */ A("div", {
					role: "status",
					title: U.description ?? U.hint ?? U.label,
					"data-testid": `${j}-command`,
					className: e("flex items-center gap-1.5 rounded-t-lg px-2 py-1 text-[11px]", U.disabled ? "bg-warning-bg text-warning-fg" : "bg-info-bg text-info-fg"),
					children: [
						/* @__PURE__ */ k("span", {
							className: "font-mono",
							children: U.trigger
						}),
						/* @__PURE__ */ k("span", {
							className: "font-medium",
							children: U.label
						}),
						pt && U.argument?.placeholder ? /* @__PURE__ */ A("span", {
							"data-testid": `${j}-command-placeholder`,
							className: "min-w-0 truncate italic opacity-80",
							children: ["— ", U.argument.placeholder]
						}) : U.hint && /* @__PURE__ */ A("span", {
							className: "min-w-0 truncate opacity-80",
							children: ["— ", U.hint]
						})
					]
				}),
				xe && be === "hidden" && /* @__PURE__ */ A("div", {
					role: "status",
					"data-testid": `${j}-privacy-hint`,
					className: e("flex items-center gap-1.5 bg-neutral-bg px-2 py-1 text-[11px] text-neutral-fg", !Qe && !U && "rounded-t-lg"),
					children: [/* @__PURE__ */ k(o, { size: 13 }), /* @__PURE__ */ k("span", { children: "Only you can see this" })]
				}),
				/* @__PURE__ */ k(S, {
					references: we ?? [],
					...Te ? { onRemove: Te } : {},
					removeLabel: (e) => `Remove ${e.label} from this draft`,
					"data-testid": `${j}-references`
				}),
				!!Oe?.length && /* @__PURE__ */ k("div", {
					role: "status",
					"data-testid": `${j}-processes`,
					className: "flex flex-wrap items-center gap-x-2 gap-y-1 px-2 pt-1 text-[11px] text-text-secondary",
					children: Oe.map((t, n) => /* @__PURE__ */ A("span", {
						className: "flex min-w-0 items-center gap-1.5",
						children: [
							n > 0 && /* @__PURE__ */ k("span", {
								"aria-hidden": "true",
								className: "text-text-tertiary",
								children: "·"
							}),
							/* @__PURE__ */ k("span", {
								"aria-hidden": "true",
								className: e("inline-block h-1.5 w-1.5 shrink-0 rounded-full", Wi[t.tone])
							}),
							/* @__PURE__ */ k("span", {
								className: "min-w-0 truncate",
								children: t.label
							})
						]
					}, t.id))
				}),
				R && /* @__PURE__ */ k("div", {
					className: "flex items-center gap-2 px-2 pt-1.5",
					"data-testid": `${j}-modes`,
					children: /* @__PURE__ */ k("div", {
						className: e("rounded-md transition-shadow duration-300 motion-reduce:transition-none", rt && "ring-1 ring-primary/60"),
						children: /* @__PURE__ */ k(d, {
							items: [
								{
									id: "chat",
									label: "Chat",
									icon: /* @__PURE__ */ k(c, { size: 13 })
								},
								{
									id: "agent",
									label: "Agent",
									icon: /* @__PURE__ */ k(t, { size: 13 })
								},
								{
									id: "terminal",
									label: "Terminal",
									icon: /* @__PURE__ */ k("span", {
										"aria-hidden": "true",
										className: "font-mono text-[11px]",
										children: ">_"
									})
								}
							],
							value: z,
							onValueChange: (e) => Ae?.(e),
							variant: "segmented",
							size: "sm",
							"aria-label": "Composer mode",
							idPrefix: `${j}-mode`
						})
					})
				}),
				/* @__PURE__ */ k("div", {
					...B ? { hidden: !0 } : {},
					children: /* @__PURE__ */ k(oe, { editor: G })
				}),
				B && /* @__PURE__ */ A("div", {
					className: "flex items-center gap-2 px-2 py-2",
					"data-testid": `${j}-shell`,
					children: [/* @__PURE__ */ k("span", {
						"aria-hidden": "true",
						className: "shrink-0 font-mono text-xs text-text-tertiary",
						children: "$"
					}), /* @__PURE__ */ k("input", {
						type: "text",
						value: _t,
						disabled: L,
						placeholder: it,
						"aria-label": it,
						"data-testid": `${j}-shell-input`,
						onChange: (e) => {
							K(e.target.value), bt(-1);
						},
						onKeyDown: (e) => {
							if (e.key === "Enter" && !e.shiftKey) {
								e.preventDefault(), xt();
								return;
							}
							if (e.key === "ArrowUp") {
								e.preventDefault(), St(1);
								return;
							}
							e.key === "ArrowDown" && (e.preventDefault(), St(-1));
						},
						className: "min-w-0 flex-1 border-none bg-transparent font-mono text-xs text-text-primary outline-none placeholder:text-text-tertiary disabled:cursor-not-allowed disabled:text-text-tertiary"
					})]
				}),
				!!Ct.length && /* @__PURE__ */ k("div", {
					className: "flex flex-wrap items-center gap-x-3 gap-y-1 px-2 pb-1 text-[11px] text-text-tertiary",
					"data-testid": `${j}-hints`,
					children: Ct.map((e) => {
						let t = /* @__PURE__ */ k("kbd", {
							className: "rounded border border-border bg-surface-inset px-1 font-mono text-[10px] text-text-secondary",
							children: e.key
						});
						return e.onSelect ? /* @__PURE__ */ A("button", {
							type: "button",
							onClick: e.onSelect,
							className: "flex cursor-pointer items-center gap-1 border-none bg-transparent p-0 text-[11px] text-text-tertiary hover:text-text-primary",
							children: [t, e.label]
						}, e.key) : /* @__PURE__ */ A("span", {
							className: "flex items-center gap-1",
							children: [t, e.label]
						}, e.key);
					})
				}),
				/* @__PURE__ */ k(Pi, {
					files: We,
					disabled: L,
					onRemove: (e) => Tt(Ke.current.filter((t) => t.id !== e))
				}),
				/* @__PURE__ */ A("div", {
					ref: Nt,
					className: "flex items-center border-t border-border px-1.5 py-1",
					children: [/* @__PURE__ */ A(p, {
						label: "Message formatting",
						className: "min-w-0 gap-0.5",
						"data-testid": `${j}-format-toolbar`,
						children: [
							G && [
								X("Bold", G.isActive("bold"), () => G.chain().focus().toggleBold().run(), /* @__PURE__ */ k("b", { children: "B" })),
								X("Italic", G.isActive("italic"), () => G.chain().focus().toggleItalic().run(), /* @__PURE__ */ k("i", { children: "I" })),
								Ft && X("Strikethrough", G.isActive("strike"), () => G.chain().focus().toggleStrike().run(), /* @__PURE__ */ k("s", { children: "S" })),
								Ft && X("Code", G.isActive("code"), () => G.chain().focus().toggleCode().run(), /* @__PURE__ */ k("span", {
									className: "font-mono text-[11px]",
									children: "<>"
								})),
								X(G.isActive("link") ? "Edit link" : "Add link", G.isActive("link"), () => Et(), /* @__PURE__ */ k(u, { size: 16 })),
								Y && /* @__PURE__ */ k("span", {
									"aria-hidden": !0,
									className: "mx-1 h-4 w-px shrink-0 bg-border"
								}, "sep1"),
								Y && X("Bulleted list", G.isActive("bulletList"), () => G.chain().focus().toggleBulletList().run(), /* @__PURE__ */ k("span", { children: "•" })),
								Y && X("Numbered list", G.isActive("orderedList"), () => G.chain().focus().toggleOrderedList().run(), /* @__PURE__ */ k("span", {
									className: "text-[11px]",
									children: "1."
								})),
								Y && X("Quote", G.isActive("blockquote"), () => G.chain().focus().toggleBlockquote().run(), /* @__PURE__ */ k(r, { size: 16 }))
							],
							(ge || nt || !!xe) && /* @__PURE__ */ k("span", {
								"aria-hidden": !0,
								className: "mx-1 h-4 w-px shrink-0 bg-border"
							}),
							ge && G && /* @__PURE__ */ A("span", {
								className: "relative",
								children: [X("Emoji", M, () => N((e) => !e), /* @__PURE__ */ k(n, { size: 16 }), He), /* @__PURE__ */ k(_, {
									open: M,
									triggerRef: He,
									onClose: () => N(!1),
									onSelect: (e) => {
										G.chain().focus().insertContent(e).run(), N(!1);
									}
								})]
							}),
							nt && /* @__PURE__ */ A(ae, { children: [X("Attach files", !1, () => Ve.current?.click(), /* @__PURE__ */ k(i, { size: 16 })), /* @__PURE__ */ k(g, {
								ref: Ve,
								multiple: !0,
								"data-testid": `${j}-file-input`,
								onFiles: Ot
							})] }),
							xe && (() => {
								let e = {
									...Hi,
									...Se
								}, t = be === "hidden";
								return X(t ? e.hidden : e.visible, t, () => xe(t ? "visible" : "hidden"), k(t ? o : s, { size: 16 }), void 0, `${j}-privacy-toggle`);
							})(),
							De
						]
					}), Pe?.length && Fe ? /* @__PURE__ */ A("span", {
						className: "ml-auto flex shrink-0 items-stretch",
						children: [/* @__PURE__ */ k("button", {
							type: "button",
							onClick: B ? xt : J,
							disabled: !wt,
							"data-testid": `${j}-send`,
							className: "shrink-0 rounded-l-md rounded-r-none bg-primary px-2.5 py-1 text-xs font-semibold text-white disabled:opacity-40",
							children: B ? "Run" : "Send"
						}), /* @__PURE__ */ k(l, {
							trigger: /* @__PURE__ */ k("span", {
								"aria-hidden": "true",
								className: "text-xs leading-none",
								children: "▾"
							}),
							triggerLabel: "Other ways to send",
							align: "end",
							triggerTestId: `${j}-send-options`,
							"data-testid": `${j}-send-menu`,
							triggerClassName: "rounded-l-none rounded-r-md border-0 border-l border-white/40 bg-primary px-1.5 py-1 text-white hover:bg-primary",
							sections: [{ items: Pe.map((e) => ({
								label: e.label,
								onSelect: () => Fe(e.id)
							})) }]
						})]
					}) : /* @__PURE__ */ k("button", {
						type: "button",
						onClick: B ? xt : J,
						disabled: !wt,
						"data-testid": `${j}-send`,
						className: "ml-auto shrink-0 rounded bg-primary px-2.5 py-1 text-xs font-semibold text-white disabled:opacity-40",
						children: B ? "Run" : "Send"
					})]
				}),
				/* @__PURE__ */ k(y, {
					open: P.open,
					initialHref: P.href,
					initialText: P.text,
					onSubmit: (e) => Dt(_e ? {
						...e,
						href: _e(e.text) ?? e.href
					} : e),
					onRemove: () => {
						G?.chain().focus().unsetLink().run(), Ue({
							open: !1,
							href: "",
							text: ""
						});
					},
					onClose: () => {
						Ue({
							open: !1,
							href: "",
							text: ""
						}), G?.commands.focus();
					}
				})
			]
		})
	});
});
//#endregion
export { Vi as CommandSuggestions, Pi as ComposerAttachments, S as ComposerReferences, Ii as DocumentSuggestions, x as EMOJI_SHORTCODES, Li as EmojiSuggestions, Fi as MentionSuggestions, na as RichChatComposer, w as composerCommandArgumentText, b as matchComposerCommand, C as searchEmoji };
