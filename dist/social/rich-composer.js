import { t as e } from "../cn-DhjIN-s0.js";
import { t } from "../Avatar-BzicCOft.js";
import { i as n, n as r, r as i } from "../ReactionPickerPopover-8eSV-aRw.js";
import { i as a, r as o, t as s } from "../LinkDialog-DazAeDjI.js";
import { forwardRef as c, useCallback as l, useEffect as u, useImperativeHandle as d, useMemo as f, useRef as p, useState as m } from "react";
import { Fragment as h, jsx as g, jsxs as _ } from "react/jsx-runtime";
import { EditorContent as v, ReactRenderer as y, useEditor as b } from "@tiptap/react";
import x from "@tiptap/starter-kit";
import S from "@tiptap/extension-placeholder";
import { Extension as C, InputRule as w, Mark as T, PasteRule as ee, combineTransactionSteps as te, escapeForRegEx as E, findChildrenInRange as D, getAttributes as ne, getChangedRanges as re, getMarksBetween as ie, markInputRule as ae, markPasteRule as oe, mergeAttributes as se } from "@tiptap/core";
import { Plugin as O, PluginKey as k } from "@tiptap/pm/state";
import ce from "@tiptap/extension-mention";
import { Decoration as le, DecorationSet as ue } from "@tiptap/pm/view";
//#region ../../../Users/connorhoehn/Projects/ui-components/node_modules/linkifyjs/dist/linkify.mjs
var de = "aaa1rp3bb0ott3vie4c1le2ogado5udhabi7c0ademy5centure6ountant0s9o1tor4d0s1ult4e0g1ro2tna4f0l1rica5g0akhan5ency5i0g1rbus3force5tel5kdn3l0ibaba4pay4lfinanz6state5y2sace3tom5m0azon4ericanexpress7family11x2fam3ica3sterdam8nalytics7droid5quan4z2o0l2partments8p0le4q0uarelle8r0ab1mco4chi3my2pa2t0e3s0da2ia2sociates9t0hleta5torney7u0ction5di0ble3o3spost5thor3o0s4w0s2x0a2z0ure5ba0by2idu3namex4d1k2r0celona5laycard4s5efoot5gains6seball5ketball8uhaus5yern5b0c1t1va3cg1n2d1e0ats2uty4er2rlin4st0buy5t2f1g1h0arti5i0ble3d1ke2ng0o3o1z2j1lack0friday9ockbuster8g1omberg7ue3m0s1w2n0pparibas9o0ats3ehringer8fa2m1nd2o0k0ing5sch2tik2on4t1utique6x2r0adesco6idgestone9oadway5ker3ther5ussels7s1t1uild0ers6siness6y1zz3v1w1y1z0h3ca0b1fe2l0l1vinklein9m0era3p2non3petown5ital0one8r0avan4ds2e0er0s4s2sa1e1h1ino4t0ering5holic7ba1n1re3c1d1enter4o1rn3f0a1d2g1h0anel2nel4rity4se2t2eap3intai5ristmas6ome4urch5i0priani6rcle4sco3tadel4i0c2y3k1l0aims4eaning6ick2nic1que6othing5ud3ub0med6m1n1o0ach3des3ffee4llege4ogne5m0mbank4unity6pany2re3uter5sec4ndos3struction8ulting7tact3ractors9oking4l1p2rsica5untry4pon0s4rses6pa2r0edit0card4union9icket5own3s1uise0s6u0isinella9v1w1x1y0mru3ou3z2dad1nce3ta1e1ing3sun4y2clk3ds2e0al0er2s3gree4livery5l1oitte5ta3mocrat6ntal2ist5si0gn4v2hl2iamonds6et2gital5rect0ory7scount3ver5h2y2j1k1m1np2o0cs1tor4g1mains5t1wnload7rive4tv2ubai3pont4rban5vag2r2z2earth3t2c0o2deka3u0cation8e1g1mail3erck5nergy4gineer0ing9terprises10pson4quipment8r0icsson6ni3s0q1tate5t1u0rovision8s2vents5xchange6pert3osed4ress5traspace10fage2il1rwinds6th3mily4n0s2rm0ers5shion4t3edex3edback6rrari3ero6i0delity5o2lm2nal1nce1ial7re0stone6mdale6sh0ing5t0ness6j1k1lickr3ghts4r2orist4wers5y2m1o0o0d1tball6rd1ex2sale4um3undation8x2r0ee1senius7l1ogans4ntier7tr2ujitsu5n0d2rniture7tbol5yi3ga0l0lery3o1up4me0s3p1rden4y2b0iz3d0n2e0a1nt0ing5orge5f1g0ee3h1i0ft0s3ves2ing5l0ass3e1obal2o4m0ail3bh2o1x2n1odaddy5ld0point6f2odyear5g0le4p1t1v2p1q1r0ainger5phics5tis4een3ipe3ocery4up4s1t1u0cci3ge2ide2tars5ru3w1y2hair2mburg5ngout5us3bo2dfc0bank7ealth0care8lp1sinki6re1mes5iphop4samitsu7tachi5v2k0t2m1n1ockey4ldings5iday5medepot5goods5s0ense7nda3rse3spital5t0ing5t0els3mail5use3w2r1sbc3t1u0ghes5yatt3undai7ibm2cbc2e1u2d1e0ee3fm2kano4l1m0amat4db2mo0bilien9n0c1dustries8finiti5o2g1k1stitute6urance4e4t0ernational10uit4vestments10o1piranga7q1r0ish4s0maili5t0anbul7t0au2v3jaguar4va3cb2e0ep2tzt3welry6io2ll2m0p2nj2o0bs1urg4t1y2p0morgan6rs3uegos4niper7kaufen5ddi3e0rryhotels6properties14fh2g1h1i0a1ds2m1ndle4tchen5wi3m1n1oeln3matsu5sher5p0mg2n2r0d1ed3uokgroup8w1y0oto4z2la0caixa5mborghini8er3nd0rover6xess5salle5t0ino3robe5w0yer5b1c1ds2ease3clerc5frak4gal2o2xus4gbt3i0dl2fe0insurance9style7ghting6ke2lly3mited4o2ncoln4k2ve1ing5k1lc1p2oan0s3cker3us3l1ndon4tte1o3ve3pl0financial11r1s1t0d0a3u0ndbeck6xe1ury5v1y2ma0drid4if1son4keup4n0agement7go3p1rket0ing3s4riott5shalls7ttel5ba2c0kinsey7d1e0d0ia3et2lbourne7me1orial6n0u2rck0msd7g1h1iami3crosoft7l1ni1t2t0subishi9k1l0b1s2m0a2n1o0bi0le4da2e1i1m1nash3ey2ster5rmon3tgage6scow4to0rcycles9v0ie4p1q1r1s0d2t0n1r2u0seum3ic4v1w1x1y1z2na0b1goya4me2vy3ba2c1e0c1t0bank4flix4work5ustar5w0s2xt0direct7us4f0l2g0o2hk2i0co2ke1on3nja3ssan1y5l1o0kia3rton4w0ruz3tv4p1r0a1w2tt2u1yc2z2obi1server7ffice5kinawa6layan0group9lo3m0ega4ne1g1l0ine5oo2pen3racle3nge4g0anic5igins6saka4tsuka4t2vh3pa0ge2nasonic7ris2s1tners4s1y3y2ccw3e0t2f0izer5g1h0armacy6d1ilips5one2to0graphy6s4ysio5ics1tet2ures6d1n0g1k2oneer5zza4k1l0ace2y0station9umbing5s3m1n0c2ohl2ker3litie5rn2st3r0axi3ess3ime3o0d0uctions8f1gressive8mo2perties3y5tection8u0dential9s1t1ub2w0c2y2qa1pon3uebec3st5racing4dio4e0ad1lestate6tor2y4cipes5d0umbrella9hab3ise0n3t2liance6n0t0als5pair3ort3ublican8st0aurant8view0s5xroth6ich0ardli6oh3l1o1p2o0cks3deo3gers4om3s0vp3u0gby3hr2n2w0e2yukyu6sa0arland6fe0ty4kura4le1on3msclub4ung5ndvik0coromant12ofi4p1rl2s1ve2xo3b0i1s2c0b1haeffler7midt4olarships8ol3ule3warz5ience5ot3d1e0arch3t2cure1ity6ek2lect4ner3rvices6ven3w1x0y3fr2g1h0angrila6rp3ell3ia1ksha5oes2p0ping5uji3w3i0lk2na1gles5te3j1k0i0n2y0pe4l0ing4m0art3ile4n0cf3o0ccer3ial4ftbank4ware6hu2lar2utions7ng1y2y2pa0ce3ort2t3r0l2s1t0ada2ples4r1tebank4farm7c0group6ockholm6rage3e3ream4udio2y3yle4u0cks3pplies3y2ort5rf1gery5zuki5v1watch4iss4x1y0dney4stems6z2tab1ipei4lk2obao4rget4tamotors6r2too4x0i3c0i2d0k2eam2ch0nology8l1masek5nnis4va3f1g1h0d1eater2re6iaa2ckets5enda4ps2res2ol4j0maxx4x2k0maxx5l1m0all4n1o0day3kyo3ols3p1ray3shiba5tal3urs3wn2yota3s3r0ade1ing4ining5vel0ers0insurance16ust3v2t1ube2i1nes3shu4v0s2w1z2ua1bank3s2g1k1nicom3versity8o2ol2ps2s1y1z2va0cations7na1guard7c1e0gas3ntures6risign5mögensberater2ung14sicherung10t2g1i0ajes4deo3g1king4llas4n1p1rgin4sa1ion4va1o3laanderen9n1odka3lvo3te1ing3o2yage5u2wales2mart4ter4ng0gou5tch0es6eather0channel12bcam3er2site5d0ding5ibo2r3f1hoswho6ien2ki2lliamhill9n0dows4e1ners6me2oodside6rk0s2ld3w2s1tc1f3xbox3erox4ihuan4n2xx2yz3yachts4hoo3maxun5ndex5e1odobashi7ga2kohama6u0tube6t1un3za0ppos4ra3ero3ip2m1one3uerich6w2", fe = "ελ1υ2бг1ел3дети4ею2католик6ом3мкд2он1сква6онлайн5рг3рус2ф2сайт3рб3укр3қаз3հայ3ישראל5קום3ابوظبي5رامكو5لاردن4بحرين5جزائر5سعودية6عليان5مغرب5مارات5یران5بارت2زار4يتك3ھارت5تونس4سودان3رية5شبكة4عراق2ب2مان4فلسطين6قطر3كاثوليك6وم3مصر2ليسيا5وريتانيا7قع4همراه5پاکستان7ڀارت4कॉम3नेट3भारत0म्3ोत5संगठन5বাংলা5ভারত2ৰত4ਭਾਰਤ4ભારત4ଭାରତ4இந்தியா6லங்கை6சிங்கப்பூர்11భారత్5ಭಾರತ4ഭാരതം5ලංකා4คอม3ไทย3ລາວ3გე2みんな3アマゾン4クラウド4グーグル4コム2ストア3セール3ファッション6ポイント4世界2中信1国1國1文网3亚马逊3企业2佛山2信息2健康2八卦2公司1益2台湾1灣2商城1店1标2嘉里0大酒店5在线2大拿2天主教3娱乐2家電2广东2微博2慈善2我爱你3手机2招聘2政务1府2新加坡2闻2时尚2書籍2机构2淡马锡3游戏2澳門2点看2移动2组织机构4网址1店1站1络2联通2谷歌2购物2通販2集团2電訊盈科4飞利浦3食品2餐厅2香格里拉3港2닷넷1컴2삼성2한국2", pe = "numeric", A = "ascii", me = "alpha", he = "asciinumeric", ge = "alphanumeric", _e = "domain", ve = "emoji", j = "scheme", ye = "slashscheme", be = "whitespace";
function xe(e, t) {
	return e in t || (t[e] = []), t[e];
}
function Se(e, t, n) {
	t[pe] && (t[he] = !0, t[ge] = !0), t[A] && (t[he] = !0, t[me] = !0), t[he] && (t[ge] = !0), t[me] && (t[ge] = !0), t[ge] && (t[_e] = !0), t[ve] && (t[_e] = !0);
	for (let r in t) {
		let t = xe(r, n);
		t.indexOf(e) < 0 && t.push(e);
	}
}
function Ce(e, t) {
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
		return t && t.j ? i = t : (i = new M(t), n && r && Se(t, n, r)), this.jr.push([e, i]), i;
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
		return s ? (o = new M(), Object.assign(o.j, s.j), o.jr.push.apply(o.jr, s.jr), o.jd = s.jd, o.t = s.t) : o = new M(), a && (r && (o.t && typeof o.t == "string" ? Se(a, Object.assign(Ce(o.t, r), n), r) : n && Se(a, n, r)), o.t = a), i.j[e] = o, o;
	}
};
var N = (e, t, n, r, i) => e.ta(t, n, r, i), P = (e, t, n, r, i) => e.tr(t, n, r, i), we = (e, t, n, r, i) => e.ts(t, n, r, i), F = (e, t, n, r, i) => e.tt(t, n, r, i), I = "WORD", Te = "UWORD", Ee = "ASCIINUMERICAL", De = "ALPHANUMERICAL", Oe = "LOCALHOST", ke = "TLD", Ae = "UTLD", je = "SCHEME", Me = "SLASH_SCHEME", Ne = "NUM", Pe = "WS", Fe = "NL", Ie = "OPENBRACE", Le = "CLOSEBRACE", Re = "OPENBRACKET", ze = "CLOSEBRACKET", Be = "OPENPAREN", Ve = "CLOSEPAREN", He = "OPENANGLEBRACKET", Ue = "CLOSEANGLEBRACKET", We = "FULLWIDTHLEFTPAREN", Ge = "FULLWIDTHRIGHTPAREN", Ke = "LEFTCORNERBRACKET", qe = "RIGHTCORNERBRACKET", Je = "LEFTWHITECORNERBRACKET", Ye = "RIGHTWHITECORNERBRACKET", Xe = "FULLWIDTHLESSTHAN", Ze = "FULLWIDTHGREATERTHAN", Qe = "AMPERSAND", $e = "APOSTROPHE", et = "ASTERISK", L = "AT", tt = "BACKSLASH", nt = "BACKTICK", rt = "CARET", R = "COLON", it = "COMMA", at = "DOLLAR", z = "DOT", ot = "EQUALS", st = "EXCLAMATION", B = "HYPHEN", ct = "PERCENT", lt = "PIPE", ut = "PLUS", dt = "POUND", ft = "QUERY", pt = "QUOTE", mt = "FULLWIDTHMIDDLEDOT", ht = "SEMI", V = "SLASH", gt = "TILDE", _t = "UNDERSCORE", vt = "EMOJI", yt = "SYM", bt = /*#__PURE__*/ Object.freeze({
	__proto__: null,
	ALPHANUMERICAL: De,
	AMPERSAND: Qe,
	APOSTROPHE: $e,
	ASCIINUMERICAL: Ee,
	ASTERISK: et,
	AT: L,
	BACKSLASH: tt,
	BACKTICK: nt,
	CARET: rt,
	CLOSEANGLEBRACKET: Ue,
	CLOSEBRACE: Le,
	CLOSEBRACKET: ze,
	CLOSEPAREN: Ve,
	COLON: R,
	COMMA: it,
	DOLLAR: at,
	DOT: z,
	EMOJI: vt,
	EQUALS: ot,
	EXCLAMATION: st,
	FULLWIDTHGREATERTHAN: Ze,
	FULLWIDTHLEFTPAREN: We,
	FULLWIDTHLESSTHAN: Xe,
	FULLWIDTHMIDDLEDOT: mt,
	FULLWIDTHRIGHTPAREN: Ge,
	HYPHEN: B,
	LEFTCORNERBRACKET: Ke,
	LEFTWHITECORNERBRACKET: Je,
	LOCALHOST: Oe,
	NL: Fe,
	NUM: Ne,
	OPENANGLEBRACKET: He,
	OPENBRACE: Ie,
	OPENBRACKET: Re,
	OPENPAREN: Be,
	PERCENT: ct,
	PIPE: lt,
	PLUS: ut,
	POUND: dt,
	QUERY: ft,
	QUOTE: pt,
	RIGHTCORNERBRACKET: qe,
	RIGHTWHITECORNERBRACKET: Ye,
	SCHEME: je,
	SEMI: ht,
	SLASH: V,
	SLASH_SCHEME: Me,
	SYM: yt,
	TILDE: gt,
	TLD: ke,
	UNDERSCORE: _t,
	UTLD: Ae,
	UWORD: Te,
	WORD: I,
	WS: Pe
}), H = /[a-z]/, xt = /\p{L}/u, St = /\p{Emoji}/u, U = /\d/, Ct = /\s/, wt = "\r", Tt = "\n", Et = "️", Dt = "‍", Ot = "￼", kt = null, At = null;
function jt(e = []) {
	let t = {};
	M.groups = t;
	let n = new M();
	kt ??= Pt(de), At ??= Pt(fe), F(n, "'", $e), F(n, "{", Ie), F(n, "}", Le), F(n, "[", Re), F(n, "]", ze), F(n, "(", Be), F(n, ")", Ve), F(n, "<", He), F(n, ">", Ue), F(n, "（", We), F(n, "）", Ge), F(n, "「", Ke), F(n, "」", qe), F(n, "『", Je), F(n, "』", Ye), F(n, "＜", Xe), F(n, "＞", Ze), F(n, "&", Qe), F(n, "*", et), F(n, "@", L), F(n, "`", nt), F(n, "^", rt), F(n, ":", R), F(n, ",", it), F(n, "$", at), F(n, ".", z), F(n, "=", ot), F(n, "!", st), F(n, "-", B), F(n, "%", ct), F(n, "|", lt), F(n, "+", ut), F(n, "#", dt), F(n, "?", ft), F(n, "\"", pt), F(n, "/", V), F(n, ";", ht), F(n, "~", gt), F(n, "_", _t), F(n, "\\", tt), F(n, "・", mt);
	let r = P(n, U, Ne, { [pe]: !0 });
	P(r, U, r);
	let i = P(r, H, Ee, { [he]: !0 }), a = P(r, xt, De, { [ge]: !0 }), o = P(n, H, I, { [A]: !0 });
	P(o, U, i), P(o, H, o), P(i, U, i), P(i, H, i);
	let s = P(n, xt, Te, { [me]: !0 });
	P(s, H), P(s, U, a), P(s, xt, s), P(a, U, a), P(a, H), P(a, xt, a);
	let c = F(n, Tt, Fe, { [be]: !0 }), l = F(n, wt, Pe, { [be]: !0 }), u = P(n, Ct, Pe, { [be]: !0 });
	F(n, Ot, u), F(l, Tt, c), F(l, Ot, u), P(l, Ct, u), F(u, wt), F(u, Tt), P(u, Ct, u), F(u, Ot, u);
	let d = P(n, St, vt, { [ve]: !0 });
	F(d, "#"), P(d, St, d), F(d, Et, d);
	let f = F(d, Dt);
	F(f, "#"), P(f, St, d);
	let p = [[H, o], [U, i]], m = [
		[H, null],
		[xt, s],
		[U, a]
	];
	for (let e = 0; e < kt.length; e++) W(n, kt[e], ke, I, p);
	for (let e = 0; e < At.length; e++) W(n, At[e], Ae, Te, m);
	Se(ke, {
		tld: !0,
		ascii: !0
	}, t), Se(Ae, {
		utld: !0,
		alpha: !0
	}, t), W(n, "file", je, I, p), W(n, "mailto", je, I, p), W(n, "http", Me, I, p), W(n, "https", Me, I, p), W(n, "ftp", Me, I, p), W(n, "ftps", Me, I, p), Se(je, {
		scheme: !0,
		ascii: !0
	}, t), Se(Me, {
		slashscheme: !0,
		ascii: !0
	}, t), e = e.sort((e, t) => e[0] > t[0] ? 1 : -1);
	for (let t = 0; t < e.length; t++) {
		let r = e[t][0], i = e[t][1] ? { [j]: !0 } : { [ye]: !0 };
		r.indexOf("-") >= 0 ? i[_e] = !0 : H.test(r) ? U.test(r) ? i[he] = !0 : i[A] = !0 : i[pe] = !0, we(n, r, r, i);
	}
	return we(n, "localhost", Oe, { ascii: !0 }), n.jd = new M(yt), {
		start: n,
		tokens: Object.assign({ groups: t }, bt)
	};
}
function Mt(e, t) {
	let n = Nt(t.replace(/[A-Z]/g, (e) => e.toLowerCase())), r = n.length, i = [], a = 0, o = 0;
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
function Nt(e) {
	let t = [], n = e.length, r = 0;
	for (; r < n;) {
		let i = e.charCodeAt(r), a, o = i < 55296 || i > 56319 || r + 1 === n || (a = e.charCodeAt(r + 1)) < 56320 || a > 57343 ? e[r] : e.slice(r, r + 2);
		t.push(o), r += o.length;
	}
	return t;
}
function W(e, t, n, r, i) {
	let a, o = t.length;
	for (let n = 0; n < o - 1; n++) {
		let o = t[n];
		e.j[o] ? a = e.j[o] : (a = new M(r), a.jr = i.slice(), e.j[o] = a), e = a;
	}
	return a = new M(n), a.jr = i.slice(), e.j[t[o - 1]] = a, a;
}
function Pt(e) {
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
var Ft = {
	defaultProtocol: "http",
	events: null,
	format: Lt,
	formatHref: Lt,
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
function It(e, t = null) {
	let n = Object.assign({}, Ft);
	e && (n = Object.assign(n, e instanceof It ? e.o : e));
	let r = n.ignoreTags, i = [];
	for (let e = 0; e < r.length; e++) i.push(r[e].toUpperCase());
	this.o = n, t && (this.defaultRender = t), this.ignoreTags = i;
}
It.prototype = {
	o: Ft,
	ignoreTags: [],
	defaultRender(e) {
		return e;
	},
	check(e) {
		return this.get("validate", e.toString(), e);
	},
	get(e, t, n) {
		let r = t != null, i = this.o[e];
		return i && (typeof i == "object" ? (i = n.t in i ? i[n.t] : Ft[e], typeof i == "function" && r && (i = i(t, n))) : typeof i == "function" && r && (i = i(t, n.t, n)), i);
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
function Lt(e) {
	return e;
}
function Rt(e, t) {
	this.t = "token", this.v = e, this.tk = t;
}
Rt.prototype = {
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
	toObject(e = Ft.defaultProtocol) {
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
function zt(e, t) {
	class n extends Rt {
		constructor(t, n) {
			super(t, n), this.t = e;
		}
	}
	for (let e in t) n.prototype[e] = t[e];
	return n.t = e, n;
}
var Bt = zt("email", {
	isLink: !0,
	toHref() {
		return "mailto:" + this.toString();
	}
}), Vt = zt("text"), Ht = zt("nl"), Ut = zt("url", {
	isLink: !0,
	toHref(e = Ft.defaultProtocol) {
		return this.hasProtocol() ? this.v : `${e}://${this.v}`;
	},
	hasProtocol() {
		let e = this.tk;
		return e.length >= 2 && e[0].t !== Oe && e[1].t === R;
	}
}), G = (e) => new M(e);
function Wt({ groups: e }) {
	let t = e.domain.concat([
		Qe,
		et,
		L,
		tt,
		nt,
		rt,
		at,
		ot,
		B,
		Ne,
		ct,
		lt,
		ut,
		dt,
		V,
		yt,
		gt,
		_t
	]), n = [
		$e,
		R,
		it,
		z,
		st,
		ct,
		ft,
		pt,
		ht,
		He,
		Ue,
		Ie,
		Le,
		ze,
		Re,
		Be,
		Ve,
		We,
		Ge,
		Ke,
		qe,
		Je,
		Ye,
		Xe,
		Ze
	], r = [
		Qe,
		$e,
		et,
		tt,
		nt,
		rt,
		at,
		ot,
		B,
		Ie,
		Le,
		ct,
		lt,
		ut,
		dt,
		ft,
		V,
		yt,
		gt,
		_t
	], i = G(), a = F(i, gt);
	N(a, r, a), N(a, e.domain, a);
	let o = G(), s = G(), c = G();
	N(i, e.domain, o), N(i, e.scheme, s), N(i, e.slashscheme, c), N(o, r, a), N(o, e.domain, o);
	let l = F(o, L);
	F(a, L, l), F(s, L, l), F(c, L, l);
	let u = F(a, z);
	N(u, r, a), N(u, e.domain, a);
	let d = G();
	N(l, e.domain, d), N(d, e.domain, d);
	let f = F(d, z);
	N(f, e.domain, d);
	let p = G(Bt);
	N(f, e.tld, p), N(f, e.utld, p), F(l, Oe, p);
	let m = F(d, B);
	F(m, B, m), N(m, e.domain, d), N(p, e.domain, d), F(p, z, f), F(p, B, m);
	let h = F(o, B), g = F(o, z);
	F(h, B, h), N(h, e.domain, o), N(g, r, a), N(g, e.domain, o);
	let _ = G(Ut);
	N(g, e.tld, _), N(g, e.utld, _), N(_, e.domain, o), N(_, r, a), F(_, z, g), F(_, B, h), F(_, L, l);
	let v = F(_, R), y = G(Ut);
	N(v, e.numeric, y);
	let b = G(Ut), x = G();
	N(b, t, b), N(b, n, x), N(x, t, b), N(x, n, x), F(_, V, b), F(y, V, b);
	let S = F(s, R), C = F(F(F(c, R), V), V);
	N(s, e.domain, o), F(s, z, g), F(s, B, h), N(c, e.domain, o), F(c, z, g), F(c, B, h), N(S, e.domain, b), F(S, V, b), F(S, ft, b), N(C, e.domain, b), N(C, t, b), F(C, V, b);
	let w = [
		[Ie, Le],
		[Re, ze],
		[Be, Ve],
		[He, Ue],
		[We, Ge],
		[Ke, qe],
		[Je, Ye],
		[Xe, Ze]
	];
	for (let e = 0; e < w.length; e++) {
		let [r, i] = w[e], a = F(b, r);
		F(x, r, a);
		let o = G(Ut);
		N(a, t, o);
		let s = G();
		N(a, n, s), F(a, i, b), N(o, t, o), N(o, n, s), N(s, t, o), N(s, n, s), F(o, i, b), F(s, i, b);
	}
	return F(i, Oe, _), F(i, Fe, Ht), {
		start: i,
		tokens: bt
	};
}
function Gt(e, t, n) {
	let r = n.length, i = 0, a = [], o = [];
	for (; i < r;) {
		let s = e, c = null, l = null, u = 0, d = null, f = -1;
		for (; i < r && !(c = s.go(n[i].t));) o.push(n[i++]);
		for (; i < r && (l = c || s.go(n[i].t));) c = null, s = l, s.accepts() ? (f = 0, d = s) : f >= 0 && f++, i++, u++;
		if (f < 0) i -= u, i < r && (o.push(n[i]), i++);
		else {
			o.length > 0 && (a.push(Kt(Vt, t, o)), o = []), i -= f, u -= f;
			let e = d.t, r = n.slice(i - u, i);
			a.push(Kt(e, t, r));
		}
	}
	return o.length > 0 && a.push(Kt(Vt, t, o)), a;
}
function Kt(e, t, n) {
	let r = n[0].s, i = n[n.length - 1].e;
	return new e(t.slice(r, i), n);
}
var qt = typeof console < "u" && console && console.warn || (() => {}), Jt = "until manual call of linkify.init(). Register all schemes and plugins before invoking linkify the first time.", K = {
	scanner: null,
	parser: null,
	tokenQueue: [],
	pluginQueue: [],
	customSchemes: [],
	initialized: !1
};
function Yt() {
	return M.groups = {}, K.scanner = null, K.parser = null, K.tokenQueue = [], K.pluginQueue = [], K.customSchemes = [], K.initialized = !1, K;
}
function Xt(e, t = !1) {
	if (K.initialized && qt(`linkifyjs: already initialized - will not register custom scheme "${e}" ${Jt}`), !/^[0-9a-z]+(-[0-9a-z]+)*$/.test(e)) throw Error("linkifyjs: incorrect scheme format.\n1. Must only contain digits, lowercase ASCII letters or \"-\"\n2. Cannot start or end with \"-\"\n3. \"-\" cannot repeat");
	K.customSchemes.push([e, t]);
}
function Zt() {
	K.scanner = jt(K.customSchemes);
	for (let e = 0; e < K.tokenQueue.length; e++) K.tokenQueue[e][1]({ scanner: K.scanner });
	K.parser = Wt(K.scanner.tokens);
	for (let e = 0; e < K.pluginQueue.length; e++) K.pluginQueue[e][1]({
		scanner: K.scanner,
		parser: K.parser
	});
	return K.initialized = !0, K;
}
function Qt(e) {
	return K.initialized || Zt(), Gt(K.parser.start, e, Mt(K.scanner.start, e));
}
Qt.scan = Mt;
function $t(e, t = null, n = null) {
	if (t && typeof t == "object") {
		if (n) throw Error(`linkifyjs: Invalid link type ${t}; must be a string`);
		n = t, t = null;
	}
	let r = new It(n), i = Qt(e), a = [];
	for (let e = 0; e < i.length; e++) {
		let n = i[e];
		n.isLink && (!t || n.t === t) && r.check(n) && a.push(n.toFormattedObject(r));
	}
	return a;
}
//#endregion
//#region ../../../Users/connorhoehn/Projects/ui-components/node_modules/@tiptap/extension-link/dist/index.js
var en = "[\0- \xA0 ᠎ -\u2029 　]", tn = new RegExp(en), nn = RegExp(`${en}$`), rn = new RegExp(en, "g");
function an(e) {
	return e.length === 1 ? e[0].isLink : e.length === 3 && e[1].isLink ? ["()", "[]"].includes(e[0].value + e[2].value) : !1;
}
function on(e) {
	return new O({
		key: new k("autolink"),
		appendTransaction: (t, n, r) => {
			let i = t.some((e) => e.docChanged) && !n.doc.eq(r.doc), a = t.some((e) => e.getMeta("preventAutolink"));
			if (!i || a) return;
			let { tr: o } = r, s = te(n.doc, [...t]);
			if (re(s).forEach(({ newRange: t }) => {
				let n = D(r.doc, t, (e) => e.isTextblock), i, a;
				if (n.length > 1) i = n[0], a = r.doc.textBetween(i.pos, i.pos + i.node.nodeSize, void 0, " ");
				else if (n.length) {
					let e = r.doc.textBetween(t.from, t.to, " ", " ");
					if (!nn.test(e)) return;
					i = n[0], a = r.doc.textBetween(i.pos, t.to, void 0, " ");
				}
				if (i && a) {
					let t = a.split(tn).filter(Boolean);
					if (t.length <= 0) return !1;
					let n = t[t.length - 1], s = i.pos + a.lastIndexOf(n);
					if (!n) return !1;
					let c = Qt(n).map((t) => t.toObject(e.defaultProtocol));
					if (!an(c)) return !1;
					c.filter((e) => e.isLink).map((e) => ({
						...e,
						from: s + e.start + 1,
						to: s + e.end + 1
					})).filter((e) => !r.schema.marks.code || !r.doc.rangeHasMark(e.from, e.to, r.schema.marks.code)).filter((t) => e.validate(t.value)).filter((t) => e.shouldAutoLink(t.value)).forEach((t) => {
						ie(t.from, t.to, r.doc).some((t) => t.mark.type === e.type) || o.addMark(t.from, t.to, e.type.create({ href: t.href }));
					});
				}
			}), o.steps.length) return o;
		}
	});
}
function sn(e) {
	return new O({
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
				let n = ne(t.state, e.type.name), r = i.href ?? n.href, o = i.target ?? n.target;
				r && (window.open(r, o), a = !0);
			}
			return a;
		} }
	});
}
var cn = /\[([^[\]]+)\]\(((?:[^\s()]|\([^\s()]*\))+)(?:\s+(?:(["'])(.*?)\3|“(.*?)”|‘(.*?)’))?\)$/, ln = /\[([^[\]]+)\]\(((?:[^\s()]|\([^\s()]*\))+)(?:\s+(?:(["'])(.*?)\3|“(.*?)”|‘(.*?)’))?\)/g;
function un(e, t) {
	let n = 0;
	for (let r = t - 1; r >= 0 && e[r] === "\\"; --r) n += 1;
	return n % 2 == 1;
}
function dn(e, t) {
	let n = 0, r = 0;
	for (; r < t;) {
		if (e[r] !== "`") {
			r += 1;
			continue;
		}
		if (n === 0 && un(e, r)) {
			r += 1;
			continue;
		}
		let i = 0;
		for (; r < t && e[r] === "`";) i += 1, r += 1;
		n === 0 ? n = i : i === n && (n = 0);
	}
	return n > 0;
}
function fn(e, t, n) {
	let [, r, i] = t;
	return (t.index ? e[t.index - 1] : void 0) === "!" || un(e, t.index ?? 0) || dn(e, t.index ?? 0) ? !1 : !!r.trim() && n(i);
}
function pn(e) {
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
function mn(e, t) {
	return e.index < t.index + t.text.length && t.index < e.index + e.text.length;
}
function hn(e) {
	return {
		href: e.data?.href,
		title: e.data?.title ?? null
	};
}
function gn(e) {
	let t = ae({
		find: (t) => {
			let n = cn.exec(t);
			return !n || !fn(t, n, e.isAllowedHref) ? null : pn(n);
		},
		type: e.type,
		getAttributes: hn
	});
	return new w({
		find: t.find,
		handler: (e) => {
			let n = t.handler(e);
			return n !== null && e.state.tr.steps.length && e.state.tr.setMeta("preventAutolink", !0), n;
		}
	});
}
function _n(e) {
	let t = oe({
		find: (t) => {
			let n = [];
			for (let r of t.matchAll(ln)) fn(t, r, e.isAllowedHref) && n.push(pn(r));
			let r = (e.findPlainUrls?.call(e, t) ?? []).filter((e) => !n.some((t) => mn(t, e)));
			return [...n, ...r];
		},
		type: e.type,
		getAttributes: hn
	});
	return new ee({
		find: t.find,
		handler: (e) => {
			let n = t.handler(e);
			return n !== null && e.state.tr.steps.length && e.match.data?.markdown && e.state.tr.setMeta("preventAutolink", !0), n;
		}
	});
}
function vn(e) {
	return new O({
		key: new k("handlePasteLink"),
		props: { handlePaste: (t, n, r) => {
			let { shouldAutoLink: i } = e, { state: a } = t, { selection: o } = a, { empty: s } = o;
			if (s) return !1;
			let c = "";
			r.content.forEach((e) => {
				c += e.textContent;
			});
			let l = $t(c, { defaultProtocol: e.defaultProtocol }).find((e) => e.isLink && e.value === c);
			return !c || !l || i !== void 0 && !i(l.value) ? !1 : e.editor.commands.setMark(e.type, { href: l.href });
		} }
	});
}
function q(e, t) {
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
	}), !e || e.replace(rn, "").match(RegExp(`^(?:(?:${n.map((e) => e.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&")).join("|")}):|[^a-z]|[a-z0-9+.\\-]+(?:[^a-z+.\\-:]|$))`, "i"));
}
var yn = T.create({
	name: "link",
	priority: 1e3,
	keepOnSplit: !1,
	exitable: !0,
	onCreate() {
		this.options.validate && !this.options.shouldAutoLink && (this.options.shouldAutoLink = this.options.validate, console.warn("The `validate` option is deprecated. Rename to the `shouldAutoLink` option instead.")), this.options.protocols.forEach((e) => {
			if (typeof e == "string") {
				Xt(e);
				return;
			}
			Xt(e.scheme, e.optionalSlashes);
		});
	},
	onDestroy() {
		Yt();
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
			isAllowedUri: (e, t) => !!q(e, t.protocols),
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
					defaultValidate: (e) => !!q(e, this.options.protocols),
					protocols: this.options.protocols,
					defaultProtocol: this.options.defaultProtocol
				}) ? !1 : null;
			}
		}];
	},
	renderHTML({ HTMLAttributes: e }) {
		return this.options.isAllowedUri(e.href, {
			defaultValidate: (e) => !!q(e, this.options.protocols),
			protocols: this.options.protocols,
			defaultProtocol: this.options.defaultProtocol
		}) ? [
			"a",
			se(this.options.HTMLAttributes, e),
			0
		] : [
			"a",
			se(this.options.HTMLAttributes, {
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
					defaultValidate: (e) => !!q(e, this.options.protocols),
					protocols: this.options.protocols,
					defaultProtocol: this.options.defaultProtocol
				}) ? t().setMark(this.name, e).setMeta("preventAutolink", !0).run() : !1;
			},
			toggleLink: (e) => ({ chain: t }) => {
				let { href: n } = e || {};
				return n && !this.options.isAllowedUri(n, {
					defaultValidate: (e) => !!q(e, this.options.protocols),
					protocols: this.options.protocols,
					defaultProtocol: this.options.defaultProtocol
				}) ? !1 : t().toggleMark(this.name, e, { extendEmptyMarkRange: !0 }).setMeta("preventAutolink", !0).run();
			},
			unsetLink: () => ({ chain: e }) => e().unsetMark(this.name, { extendEmptyMarkRange: !0 }).setMeta("preventAutolink", !0).run()
		};
	},
	addInputRules() {
		return this.options.markdownLinks ? [gn({
			type: this.type,
			isAllowedHref: (e) => this.options.isAllowedUri(e, {
				defaultValidate: (e) => !!q(e, this.options.protocols),
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
				$t(e).filter((e) => e.isLink && this.options.isAllowedUri(e.value, {
					defaultValidate: (e) => !!q(e, n),
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
		return this.options.markdownLinks ? [_n({
			type: this.type,
			isAllowedHref: (e) => this.options.isAllowedUri(e, {
				defaultValidate: (e) => !!q(e, this.options.protocols),
				protocols: this.options.protocols,
				defaultProtocol: this.options.defaultProtocol
			}),
			findPlainUrls: e
		})] : [oe({
			find: e,
			type: this.type,
			getAttributes: (e) => ({ href: e.data?.href })
		})];
	},
	addProseMirrorPlugins() {
		let e = [], { protocols: t, defaultProtocol: n } = this.options;
		return this.options.autolink && e.push(on({
			type: this.type,
			defaultProtocol: this.options.defaultProtocol,
			validate: (e) => this.options.isAllowedUri(e, {
				defaultValidate: (e) => !!q(e, t),
				protocols: t,
				defaultProtocol: n
			}),
			shouldAutoLink: this.options.shouldAutoLink
		})), e.push(sn({
			type: this.type,
			editor: this.editor,
			openOnClick: this.options.openOnClick === "whenNotEditable" || this.options.openOnClick,
			enableClickSelection: this.options.enableClickSelection
		})), this.options.linkOnPaste && e.push(vn({
			editor: this.editor,
			defaultProtocol: this.options.defaultProtocol,
			type: this.type,
			shouldAutoLink: this.options.shouldAutoLink
		})), e;
	}
}), bn = Math.min, xn = Math.max, Sn = Math.round, Cn = Math.floor, J = (e) => ({
	x: e,
	y: e
}), wn = {
	left: "right",
	right: "left",
	bottom: "top",
	top: "bottom"
};
function Tn(e, t) {
	return typeof e == "function" ? e(t) : e;
}
function En(e) {
	return e.split("-")[0];
}
function Dn(e) {
	return e.split("-")[1];
}
function On(e) {
	return e === "x" ? "y" : "x";
}
function kn(e) {
	return e === "y" ? "height" : "width";
}
function An(e) {
	let t = e[0];
	return t === "t" || t === "b" ? "y" : "x";
}
function jn(e) {
	return On(An(e));
}
function Mn(e, t, n) {
	n === void 0 && (n = !1);
	let r = Dn(e), i = jn(e), a = kn(i), o = i === "x" ? r === (n ? "end" : "start") ? "right" : "left" : r === "start" ? "bottom" : "top";
	return t.reference[a] > t.floating[a] && (o = Vn(o)), [o, Vn(o)];
}
function Nn(e) {
	let t = Vn(e);
	return [
		Pn(e),
		t,
		Pn(t)
	];
}
function Pn(e) {
	return e.includes("start") ? e.replace("start", "end") : e.replace("end", "start");
}
var Fn = ["left", "right"], In = ["right", "left"], Ln = ["top", "bottom"], Rn = ["bottom", "top"];
function zn(e, t, n) {
	switch (e) {
		case "top":
		case "bottom": return n ? t ? In : Fn : t ? Fn : In;
		case "left":
		case "right": return t ? Ln : Rn;
		default: return [];
	}
}
function Bn(e, t, n, r) {
	let i = Dn(e), a = zn(En(e), n === "start", r);
	return i && (a = a.map((e) => e + "-" + i), t && (a = a.concat(a.map(Pn)))), a;
}
function Vn(e) {
	let t = En(e);
	return wn[t] + e.slice(t.length);
}
function Hn(e) {
	return {
		top: e.top ?? 0,
		right: e.right ?? 0,
		bottom: e.bottom ?? 0,
		left: e.left ?? 0
	};
}
function Un(e) {
	return typeof e == "number" ? {
		top: e,
		right: e,
		bottom: e,
		left: e
	} : Hn(e);
}
function Wn(e) {
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
//#region ../../../Users/connorhoehn/Projects/ui-components/node_modules/@floating-ui/core/dist/floating-ui.core.mjs
function Gn(e, t, n) {
	let { reference: r, floating: i } = e, a = An(t), o = jn(t), s = kn(o), c = En(t), l = a === "y", u = r.x + r.width / 2 - i.width / 2, d = r.y + r.height / 2 - i.height / 2, f = r[s] / 2 - i[s] / 2, p;
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
	let m = Dn(t);
	return m && (p[o] += f * (m === "end" ? 1 : -1) * (n && l ? -1 : 1)), p;
}
async function Kn(e, t) {
	t === void 0 && (t = {});
	let { x: n, y: r, platform: i, rects: a, elements: o, strategy: s } = e, { boundary: c = "clippingAncestors", rootBoundary: l = "viewport", elementContext: u = "floating", altBoundary: d = !1, padding: f = 0 } = Tn(t, e), p = Un(f), m = o[d ? u === "floating" ? "reference" : "floating" : u], h = Wn(await i.getClippingRect({
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
	}, y = Wn(i.convertOffsetParentRelativeRectToViewportRelativeRect ? await i.convertOffsetParentRelativeRectToViewportRelativeRect({
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
var qn = 50, Jn = async (e, t, n) => {
	let { placement: r = "bottom", strategy: i = "absolute", middleware: a = [], platform: o } = n, s = o.detectOverflow ? o : {
		...o,
		detectOverflow: Kn
	}, c = await (o.isRTL == null ? void 0 : o.isRTL(t)), l = await o.getElementRects({
		reference: e,
		floating: t,
		strategy: i
	}), { x: u, y: d } = Gn(l, r, c), f = r, p = 0, m = {};
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
		}, x && p < qn && (p++, typeof x == "object" && (x.placement && (f = x.placement), x.rects && (l = x.rects === !0 ? await o.getElementRects({
			reference: e,
			floating: t,
			strategy: i
		}) : x.rects), {x: u, y: d} = Gn(l, f, c)), n = -1);
	}
	return {
		x: u,
		y: d,
		placement: f,
		strategy: i,
		middlewareData: m
	};
}, Yn = function(e) {
	return e === void 0 && (e = {}), {
		name: "flip",
		options: e,
		async fn(t) {
			var n;
			let { placement: r, middlewareData: i, rects: a, initialPlacement: o, platform: s, elements: c } = t, { mainAxis: l = !0, crossAxis: u = !0, fallbackPlacements: d, fallbackStrategy: f = "bestFit", fallbackAxisSideDirection: p = "none", flipAlignment: m = !0, ...h } = Tn(e, t);
			if ((n = i.arrow) != null && n.alignmentOffset) return {};
			let g = En(r), _ = An(o), v = En(o) === o, y = await (s.isRTL == null ? void 0 : s.isRTL(c.floating)), b = d || (v || !m ? [Vn(o)] : Nn(o)), x = p !== "none";
			!d && x && b.push(...Bn(o, m, p, y));
			let S = [o, ...b], C = await s.detectOverflow(t, h), w = [], T = i.flip?.overflows || [];
			if (l && w.push(C[g]), u) {
				let e = Mn(r, a, y);
				w.push(C[e[0]], C[e[1]]);
			}
			if (T = [...T, {
				placement: r,
				overflows: w
			}], !w.every((e) => e <= 0)) {
				let e = (i.flip?.index || 0) + 1, t = S[e];
				if (t && (u !== "alignment" || _ === An(t) || T.every((e) => An(e.placement) !== _ || e.overflows[0] > 0))) return {
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
								let t = An(e.placement);
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
}, Xn = /*#__PURE__*/ new Set(["left", "top"]);
async function Zn(e, t) {
	let { placement: n, platform: r, elements: i } = e, a = await (r.isRTL == null ? void 0 : r.isRTL(i.floating)), o = En(n), s = Dn(n), c = An(n) === "y", l = Xn.has(o) ? -1 : 1, u = a && c ? -1 : 1, d = Tn(t, e), { mainAxis: f, crossAxis: p, alignmentAxis: m } = typeof d == "number" ? {
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
var Qn = function(e) {
	return e === void 0 && (e = 0), {
		name: "offset",
		options: e,
		async fn(t) {
			var n;
			let { x: r, y: i, placement: a, middlewareData: o } = t, s = await Zn(t, e);
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
//#region ../../../Users/connorhoehn/Projects/ui-components/node_modules/@floating-ui/utils/dist/floating-ui.utils.dom.mjs
function $n() {
	return typeof window < "u";
}
function er(e) {
	return tr(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function Y(e) {
	var t;
	return (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function X(e) {
	return ((tr(e) ? e.ownerDocument : e.document) || window.document)?.documentElement;
}
function tr(e) {
	return $n() ? e instanceof Node || e instanceof Y(e).Node : !1;
}
function Z(e) {
	return $n() ? e instanceof Element || e instanceof Y(e).Element : !1;
}
function Q(e) {
	return $n() ? e instanceof HTMLElement || e instanceof Y(e).HTMLElement : !1;
}
function nr(e) {
	return !$n() || typeof ShadowRoot > "u" ? !1 : e instanceof ShadowRoot || e instanceof Y(e).ShadowRoot;
}
function rr(e) {
	let { overflow: t, overflowX: n, overflowY: r, display: i } = $(e);
	return /auto|scroll|overlay|hidden|clip/.test(t + r + n) && i !== "inline" && i !== "contents";
}
function ir(e) {
	return /^(table|td|th)$/.test(er(e));
}
function ar(e) {
	try {
		if (e.matches(":popover-open")) return !0;
	} catch {}
	try {
		return e.matches(":modal");
	} catch {
		return !1;
	}
}
var or = /transform|translate|scale|rotate|perspective|filter/, sr = /paint|layout|strict|content/, cr = (e) => !!e && e !== "none", lr;
function ur(e) {
	let t = Z(e) ? $(e) : e;
	return cr(t.transform) || cr(t.translate) || cr(t.scale) || cr(t.rotate) || cr(t.perspective) || !fr() && (cr(t.backdropFilter) || cr(t.filter)) || or.test(t.willChange || "") || sr.test(t.contain || "");
}
function dr(e) {
	let t = hr(e);
	for (; Q(t) && !pr(t);) {
		if (ur(t)) return t;
		if (ar(t)) return null;
		t = hr(t);
	}
	return null;
}
function fr() {
	return lr ??= typeof CSS < "u" && CSS.supports && CSS.supports("-webkit-backdrop-filter", "none"), lr;
}
function pr(e) {
	return /^(html|body|#document)$/.test(er(e));
}
function $(e) {
	return Y(e).getComputedStyle(e);
}
function mr(e) {
	return Z(e) ? {
		scrollLeft: e.scrollLeft,
		scrollTop: e.scrollTop
	} : {
		scrollLeft: e.scrollX,
		scrollTop: e.scrollY
	};
}
function hr(e) {
	if (er(e) === "html") return e;
	let t = e.assignedSlot || e.parentNode || nr(e) && e.host || X(e);
	return nr(t) ? t.host : t;
}
function gr(e) {
	let t = hr(e);
	return pr(t) ? (e.ownerDocument || e).body : Q(t) && rr(t) ? t : gr(t);
}
function _r(e, t, n) {
	t === void 0 && (t = []), n === void 0 && (n = !0);
	let r = gr(e), i = r === e.ownerDocument?.body, a = Y(r);
	if (i) {
		let e = vr(a);
		return t.concat(a, a.visualViewport || [], rr(r) ? r : [], e && n ? _r(e) : []);
	}
	return t.concat(r, _r(r, [], n));
}
function vr(e) {
	return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
//#endregion
//#region ../../../Users/connorhoehn/Projects/ui-components/node_modules/@floating-ui/dom/dist/floating-ui.dom.mjs
function yr(e) {
	let t = $(e), n = parseFloat(t.width) || 0, r = parseFloat(t.height) || 0, i = Q(e), a = i ? e.offsetWidth : n, o = i ? e.offsetHeight : r, s = Sn(n) !== a || Sn(r) !== o;
	return s && (n = a, r = o), {
		width: n,
		height: r,
		$: s
	};
}
function br(e) {
	return Z(e) ? e : e.contextElement;
}
function xr(e) {
	let t = br(e);
	if (!Q(t)) return J(1);
	let n = t.getBoundingClientRect(), { width: r, height: i, $: a } = yr(t), o = (a ? Sn(n.width) : n.width) / r, s = (a ? Sn(n.height) : n.height) / i;
	return (!o || !Number.isFinite(o)) && (o = 1), (!s || !Number.isFinite(s)) && (s = 1), {
		x: o,
		y: s
	};
}
var Sr = /*#__PURE__*/ J(0);
function Cr(e) {
	let t = Y(e);
	return !fr() || !t.visualViewport ? Sr : {
		x: t.visualViewport.offsetLeft,
		y: t.visualViewport.offsetTop
	};
}
function wr(e, t, n) {
	return t === void 0 && (t = !1), !!n && t && n === Y(e);
}
function Tr(e, t, n, r) {
	t === void 0 && (t = !1), n === void 0 && (n = !1);
	let i = e.getBoundingClientRect(), a = br(e), o = J(1);
	t && (r ? Z(r) && (o = xr(r)) : o = xr(e));
	let s = wr(a, n, r) ? Cr(a) : J(0), c = (i.left + s.x) / o.x, l = (i.top + s.y) / o.y, u = i.width / o.x, d = i.height / o.y;
	if (a && r) {
		let e = Y(a), t = Z(r) ? Y(r) : r, n = e, i = vr(n);
		for (; i && t !== n;) {
			let e = xr(i), t = i.getBoundingClientRect(), r = $(i), a = t.left + (i.clientLeft + parseFloat(r.paddingLeft)) * e.x, o = t.top + (i.clientTop + parseFloat(r.paddingTop)) * e.y;
			c *= e.x, l *= e.y, u *= e.x, d *= e.y, c += a, l += o, n = Y(i), i = vr(n);
		}
	}
	return Wn({
		width: u,
		height: d,
		x: c,
		y: l
	});
}
function Er(e, t) {
	let n = mr(e).scrollLeft;
	return t ? t.left + n : Tr(X(e)).left + n;
}
function Dr(e, t) {
	let n = e.getBoundingClientRect();
	return {
		x: n.left + t.scrollLeft - Er(e, n),
		y: n.top + t.scrollTop
	};
}
function Or(e) {
	let { elements: t, rect: n, offsetParent: r, strategy: i } = e, a = i === "fixed", o = X(r), s = t ? ar(t.floating) : !1;
	if (r === o || s && a) return n;
	let c = {
		scrollLeft: 0,
		scrollTop: 0
	}, l = J(1), u = J(0), d = Q(r);
	if ((d || !a) && ((er(r) !== "body" || rr(o)) && (c = mr(r)), d)) {
		let e = Tr(r);
		l = xr(r), u.x = e.x + r.clientLeft, u.y = e.y + r.clientTop;
	}
	let f = o && !d && !a ? Dr(o, c) : J(0);
	return {
		width: n.width * l.x,
		height: n.height * l.y,
		x: n.x * l.x - c.scrollLeft * l.x + u.x + f.x,
		y: n.y * l.y - c.scrollTop * l.y + u.y + f.y
	};
}
function kr(e) {
	return e.getClientRects ? Array.from(e.getClientRects()) : [];
}
function Ar(e) {
	let t = mr(e), n = e.ownerDocument.body, r = xn(e.scrollWidth, e.clientWidth, n.scrollWidth, n.clientWidth), i = xn(e.scrollHeight, e.clientHeight, n.scrollHeight, n.clientHeight), a = -t.scrollLeft + Er(e), o = -t.scrollTop;
	return $(n).direction === "rtl" && (a += xn(e.clientWidth, n.clientWidth) - r), {
		width: r,
		height: i,
		x: a,
		y: o
	};
}
var jr = 25;
function Mr(e, t, n) {
	n === void 0 && (n = "viewport");
	let r = n === "layoutViewport", i = Y(e), a = X(e), o = i.visualViewport, s = a.clientWidth, c = a.clientHeight, l = 0, u = 0;
	if (o) {
		let e = !fr() || t === "fixed";
		r ? e || (l = -o.offsetLeft, u = -o.offsetTop) : (s = o.width, c = o.height, e && (l = o.offsetLeft, u = o.offsetTop));
	}
	if (Er(a) <= 0) {
		let e = a.ownerDocument, t = e.body, n = getComputedStyle(t), r = e.compatMode === "CSS1Compat" && parseFloat(n.marginLeft) + parseFloat(n.marginRight) || 0, i = Math.abs(a.clientWidth - t.clientWidth - r), o = getComputedStyle(a).scrollbarGutter === "stable both-edges" ? i / 2 : i;
		o <= jr && (s -= o);
	}
	return {
		width: s,
		height: c,
		x: l,
		y: u
	};
}
function Nr(e, t) {
	let n = Tr(e, !0, t === "fixed"), r = n.top + e.clientTop, i = n.left + e.clientLeft, a = xr(e);
	return {
		width: e.clientWidth * a.x,
		height: e.clientHeight * a.y,
		x: i * a.x,
		y: r * a.y
	};
}
function Pr(e, t, n) {
	let r;
	if (t === "viewport" || t === "layoutViewport") r = Mr(e, n, t);
	else if (t === "document") r = Ar(X(e));
	else if (Z(t)) r = Nr(t, n);
	else {
		let n = Cr(e);
		r = {
			x: t.x - n.x,
			y: t.y - n.y,
			width: t.width,
			height: t.height
		};
	}
	return Wn(r);
}
function Fr(e, t) {
	let n = t.get(e);
	if (n) return n;
	let r = _r(e, [], !1).filter((e) => Z(e) && er(e) !== "body"), i = null, a = $(e).position === "fixed", o = a ? hr(e) : e;
	for (; Z(o) && !pr(o);) {
		let e = $(o), t = ur(o), n = i ? i.position : a ? "fixed" : "";
		!t && (n === "fixed" || n === "absolute" && e.position === "static") ? r = r.filter((e) => e !== o) : i = e, o = hr(o);
	}
	return t.set(e, r), r;
}
function Ir(e) {
	let { element: t, boundary: n, rootBoundary: r, strategy: i } = e, a = [...n === "clippingAncestors" ? ar(t) ? [] : Fr(t, this._c) : [].concat(n), r], o = Pr(t, a[0], i), s = o.top, c = o.right, l = o.bottom, u = o.left;
	for (let e = 1; e < a.length; e++) {
		let n = Pr(t, a[e], i);
		s = xn(n.top, s), c = bn(n.right, c), l = bn(n.bottom, l), u = xn(n.left, u);
	}
	return {
		width: c - u,
		height: l - s,
		x: u,
		y: s
	};
}
function Lr(e) {
	let { width: t, height: n } = yr(e);
	return {
		width: t,
		height: n
	};
}
function Rr(e, t, n) {
	let r = Q(t), i = X(t), a = n === "fixed", o = Tr(e, !0, a, t), s = {
		scrollLeft: 0,
		scrollTop: 0
	}, c = J(0);
	if ((r || !a) && ((er(t) !== "body" || rr(i)) && (s = mr(t)), r)) {
		let e = Tr(t, !0, a, t);
		c.x = e.x + t.clientLeft, c.y = e.y + t.clientTop;
	}
	!r && i && (c.x = Er(i));
	let l = i && !r && !a ? Dr(i, s) : J(0);
	return {
		x: o.left + s.scrollLeft - c.x - l.x,
		y: o.top + s.scrollTop - c.y - l.y,
		width: o.width,
		height: o.height
	};
}
function zr(e) {
	return $(e).position === "static";
}
function Br(e, t) {
	if (!Q(e) || $(e).position === "fixed") return null;
	if (t) return t(e);
	let n = e.offsetParent;
	return X(e) === n && (n = n.ownerDocument.body), n;
}
function Vr(e, t) {
	let n = Y(e);
	if (ar(e)) return n;
	if (!Q(e)) {
		let t = hr(e);
		for (; t && !pr(t);) {
			if (Z(t) && !zr(t)) return t;
			t = hr(t);
		}
		return n;
	}
	let r = Br(e, t);
	for (; r && ir(r) && zr(r);) r = Br(r, t);
	return r && pr(r) && zr(r) && !ur(r) ? n : r || dr(e) || n;
}
var Hr = async function(e) {
	let t = this.getOffsetParent || Vr, n = this.getDimensions, r = await n(e.floating);
	return {
		reference: Rr(e.reference, await t(e.floating), e.strategy),
		floating: {
			x: 0,
			y: 0,
			width: r.width,
			height: r.height
		}
	};
};
function Ur(e) {
	return $(e).direction === "rtl";
}
var Wr = {
	convertOffsetParentRelativeRectToViewportRelativeRect: Or,
	getDocumentElement: X,
	getClippingRect: Ir,
	getOffsetParent: Vr,
	getElementRects: Hr,
	getClientRects: kr,
	getDimensions: Lr,
	getScale: xr,
	isElement: Z,
	isRTL: Ur
};
function Gr(e, t) {
	return e.x === t.x && e.y === t.y && e.width === t.width && e.height === t.height;
}
function Kr(e, t, n) {
	let r = null, i, a = X(e);
	function o() {
		var e;
		clearTimeout(i), (e = r) == null || e.disconnect(), r = null;
	}
	function s(n, c) {
		n === void 0 && (n = !1), c === void 0 && (c = 1), o();
		let l = e.getBoundingClientRect(), { left: u, top: d, width: f, height: p } = l;
		if (n || t(), !f || !p) return;
		let m = Cn(d), h = Cn(a.clientWidth - (u + f)), g = Cn(a.clientHeight - (d + p)), _ = Cn(u), v = {
			rootMargin: -m + "px " + -h + "px " + -g + "px " + -_ + "px",
			threshold: xn(0, bn(1, c)) || 1
		}, y = !0;
		function b(t) {
			let n = t[0].intersectionRatio;
			if (!Gr(l, e.getBoundingClientRect())) return s();
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
	let c = Y(e), l = () => s(n);
	return c.addEventListener("resize", l), s(!0), () => {
		c.removeEventListener("resize", l), o();
	};
}
function qr(e, t, n, r) {
	r === void 0 && (r = {});
	let { ancestorScroll: i = !0, ancestorResize: a = !0, elementResize: o = typeof ResizeObserver == "function", layoutShift: s = typeof IntersectionObserver == "function", animationFrame: c = !1 } = r, l = br(e), u = i || a ? [...l ? _r(l) : [], ...t ? _r(t) : []] : [];
	u.forEach((e) => {
		i && e.addEventListener("scroll", n), a && e.addEventListener("resize", n);
	});
	let d = l && s ? Kr(l, n, a) : null, f = -1, p = null;
	o && (p = new ResizeObserver((e) => {
		let [r] = e;
		r && r.target === l && p && t && (p.unobserve(t), cancelAnimationFrame(f), f = requestAnimationFrame(() => {
			var e;
			(e = p) == null || e.observe(t);
		})), n();
	}), l && !c && p.observe(l), t && p.observe(t));
	let m, h = c ? Tr(e) : null;
	c && g();
	function g() {
		let t = Tr(e);
		h && !Gr(h, t) && n(), h = t, m = requestAnimationFrame(g);
	}
	return n(), () => {
		var e;
		u.forEach((e) => {
			i && e.removeEventListener("scroll", n), a && e.removeEventListener("resize", n);
		}), d?.(), (e = p) == null || e.disconnect(), p = null, c && cancelAnimationFrame(m);
	};
}
var Jr = Qn, Yr = Yn, Xr = (e, t, n) => {
	let r = /* @__PURE__ */ new Map(), i = n ?? {}, a = {
		...Wr,
		...i.platform,
		_c: r
	};
	return Jn(e, t, {
		...i,
		platform: a
	});
};
//#endregion
//#region ../../../Users/connorhoehn/Projects/ui-components/node_modules/@tiptap/suggestion/dist/index.js
function Zr(e) {
	let { char: t, allowSpaces: n, allowToIncludeChar: r, allowedPrefixes: i, startOfLine: a, $position: o } = e, s = n && !r, c = E(t), l = RegExp(`\\s${c}$`), u = a ? "^" : "", d = r ? "" : c, f = RegExp(s ? `${u}${c}.*?(?=\\s${d}|$)` : `${u}(?:^)?${c}[^\\s${d}]*`, "gm"), p = o.nodeBefore?.isText && o.nodeBefore.text;
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
function Qr(e) {
	return e.docChanged ? e.steps.some((e) => {
		let t = e.slice;
		if (!t?.content) return !1;
		let n = t.content.textBetween(0, t.content.size, "\n");
		return /\s/.test(n);
	}) : !1;
}
function $r(e) {
	return () => {
		let t = e.state.selection.$anchor.pos, { top: n, right: r, bottom: i, left: a } = e.view.coordsAtPos(t);
		try {
			return new DOMRect(a, n, r - a, i - n);
		} catch {
			return null;
		}
	};
}
function ei(e, t, n, r) {
	return n ? () => {
		let n = r.getState(e.state)?.decorationId;
		return t.dom.querySelector(`[data-decoration-id="${n}"]`)?.getBoundingClientRect() || null;
	} : $r(e);
}
function ti({ match: e, dismissedRange: t, state: n, transaction: r, editor: i, shouldResetDismissed: a, effectiveAllowSpaces: o }) {
	return a?.({
		editor: i,
		state: n,
		range: t,
		match: e,
		transaction: r,
		allowSpaces: o
	}) ? !1 : o ? e.range.from === t.from : e.range.from === t.from && !Qr(r);
}
function ni({ view: e, pluginKeyRef: t }) {
	let n = e.state.tr.setMeta(t, { exit: !0 });
	e.dispatch(n);
}
function ri({ pluginKey: e, decorationTag: t, decorationClass: n, decorationContent: r, decorationEmptyClass: i, renderer: a, dispatchExit: o }) {
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
			return u && d.push(i), ue.create(a.doc, [le.inline(s.from, s.to, {
				nodeName: t,
				class: d.join(" "),
				"data-decoration-id": c || void 0,
				"data-decoration-content": r
			})]);
		}
	};
}
function ii({ editor: e, char: t, effectiveAllowSpaces: n, allowToIncludeChar: r, allowedPrefixes: i, startOfLine: a, findSuggestionMatch: o, allow: s, shouldShow: c, shouldKeepDismissed: l, pluginKey: u }) {
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
function ai({ editor: e, items: t }) {
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
function oi({ placement: e, offset: t, flip: n, floatingUi: r }) {
	let i = [Jr({
		mainAxis: t.mainAxis ?? 4,
		crossAxis: t.crossAxis ?? 0
	})];
	return n && i.push(Yr()), r?.middleware?.length && i.push(...r.middleware), {
		placement: e,
		strategy: r?.strategy ?? "absolute",
		middleware: i
	};
}
function si(e) {
	if (e instanceof HTMLElement) return e;
	if (typeof e == "string") try {
		let t = document.querySelector(e);
		if (t) return t;
	} catch {
		return document.body;
	}
	return document.body;
}
function ci({ getReferenceRect: e, contextElement: t, config: n, container: r, dismissOnOutsideClick: i, dismiss: a }) {
	return (o, s = {}) => {
		let c = {
			getBoundingClientRect: () => e() ?? new DOMRect(),
			contextElement: t
		}, l = !1, u = !o.isConnected;
		u && si(r).appendChild(o), s.onPosition || (o.style.visibility = "hidden", o.style.width = "max-content");
		let d = qr(c, o, () => {
			Xr(c, o, {
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
function li({ editor: e, pluginKey: t, items: n, renderer: r, minQueryLength: i, debounce: a, initialItems: o, placement: s, offset: c, container: l, flip: u, floatingUi: d, dismissOnOutsideClick: f, command: p, clientRectFor: m, dispatchExit: h }) {
	let g, _ = ai({
		editor: e,
		items: n
	}), v = oi({
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
			let w = null, T = S.query !== C.query, ee = S.text !== C.text, te = S.range.from !== C.range.from || S.range.to !== C.range.to, E = T || ee || te;
			if (!S.active && C.active) w = "started";
			else if (S.active && !C.active) w = "stopped";
			else if (C.active && E) w = "updated";
			else return;
			let D = w === "stopped" ? S : C, ne = n.dom.querySelector(`[data-decoration-id="${D.decorationId}"]`), re = m(n, ne), ie = i === 0 || (D.query ? D.query.length >= i : !1), ae = (w === "started" || w === "updated") && ie;
			if (g = {
				editor: e,
				range: D.range,
				query: D.query || "",
				text: D.text || "",
				items: o ?? [],
				command: (t) => p({
					editor: e,
					range: D.range,
					props: t
				}),
				decorationNode: ne,
				clientRect: re,
				loading: ae,
				placement: s,
				offset: {
					mainAxis: c.mainAxis ?? 4,
					crossAxis: c.crossAxis ?? 0
				},
				container: l,
				flip: u,
				floatingUi: v,
				mount: ci({
					getReferenceRect: re,
					contextElement: n.dom,
					config: v,
					container: l,
					dismissOnOutsideClick: f,
					dismiss: () => h(e.view)
				})
			}, w === "started" && ((b = r?.onBeforeStart) == null || b.call(r, g)), w === "updated" && ((x = r?.onBeforeUpdate) == null || x.call(r, g)), w === "started" && y(w, g), w === "started" || w === "updated") {
				if (!ae) _.abort(), g = {
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
					let e = await _.fetch(D.query || "", a);
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
var ui = new k("suggestion");
function di({ pluginKey: e = ui, editor: t, char: n = "@", allowSpaces: r = !1, allowToIncludeChar: i = !1, allowedPrefixes: a = [" "], startOfLine: o = !1, decorationTag: s = "span", decorationClass: c = "suggestion", decorationContent: l = "", decorationEmptyClass: u = "is-empty", command: d = () => null, items: f = () => [], minQueryLength: p = 0, debounce: m = 0, initialItems: h, placement: g = "bottom-start", offset: _ = {}, container: v, flip: y = !0, floatingUi: b, dismissOnOutsideClick: x = !0, render: S = () => ({}), allow: C = () => !0, findSuggestionMatch: w = Zr, shouldShow: T, shouldResetDismissed: ee }) {
	let te = S?.(), E = r && !i, D = (n, r) => ei(t, n, r, e);
	function ne(e) {
		return ti({
			...e,
			editor: t,
			shouldResetDismissed: ee,
			effectiveAllowSpaces: E
		});
	}
	let re = (t) => ni({
		view: t,
		pluginKeyRef: e
	});
	return new O({
		key: e,
		view: () => li({
			editor: t,
			pluginKey: e,
			items: f,
			renderer: te,
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
			clientRectFor: D,
			dispatchExit: re
		}),
		state: ii({
			editor: t,
			char: n,
			effectiveAllowSpaces: E,
			allowToIncludeChar: i,
			allowedPrefixes: a,
			startOfLine: o,
			findSuggestionMatch: w,
			allow: C,
			shouldShow: T,
			shouldKeepDismissed: ne,
			pluginKey: e
		}),
		props: ri({
			pluginKey: e,
			decorationTag: s,
			decorationClass: c,
			decorationContent: l,
			decorationEmptyClass: u,
			renderer: te,
			dispatchExit: re
		})
	});
}
var fi = di;
//#endregion
//#region src/components/social/ComposerAttachments.tsx
function pi(e) {
	return e < 1024 ? `${e} B` : e < 1048576 ? `${Math.round(e / 1024)} KB` : `${(e / 1048576).toFixed(1)} MB`;
}
function mi({ file: e }) {
	let [t, n] = m(null);
	return u(() => {
		if (!e.type.startsWith("image/")) return;
		let t = URL.createObjectURL(e);
		return n(t), () => {
			URL.revokeObjectURL(t), n(null);
		};
	}, [e]), t ? /* @__PURE__ */ g("img", {
		src: t,
		alt: "",
		"aria-hidden": !0,
		className: "h-9 w-9 shrink-0 rounded object-cover",
		"data-testid": "composer-attachment-thumb"
	}) : /* @__PURE__ */ g("span", {
		"aria-hidden": !0,
		className: "grid h-9 w-9 shrink-0 place-items-center rounded bg-surface-inset text-sm",
		children: "📄"
	});
}
function hi({ files: t, onRemove: n, disabled: r = !1, className: i, "data-testid": a = "composer-attachments" }) {
	return t.length === 0 ? null : /* @__PURE__ */ g("ul", {
		"data-testid": a,
		"aria-label": "Attachments",
		className: e("m-0 flex list-none flex-wrap gap-1.5 px-2 pt-2", i),
		children: t.map(({ id: e, file: t }) => /* @__PURE__ */ _("li", {
			"data-testid": "composer-attachment",
			className: "flex items-center gap-2 rounded-lg border border-border bg-surface-inset py-1 pl-1 pr-1.5",
			children: [
				/* @__PURE__ */ g(mi, { file: t }),
				/* @__PURE__ */ _("span", {
					className: "flex min-w-0 flex-col",
					children: [/* @__PURE__ */ g("span", {
						className: "max-w-[11rem] truncate text-xs text-text-primary",
						title: t.name,
						children: t.name
					}), /* @__PURE__ */ g("span", {
						className: "text-[11px] text-text-tertiary",
						children: pi(t.size)
					})]
				}),
				/* @__PURE__ */ g("button", {
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
var gi = c(function({ items: n, command: r }, i) {
	let [a, o] = m(0);
	u(() => o(0), [n]);
	let s = (e) => {
		let t = n[e];
		t && r({
			id: t.id,
			label: t.label
		});
	};
	return d(i, () => ({ onKeyDown: ({ event: e }) => e.key === "ArrowUp" ? (o((e) => (e + n.length - 1) % n.length), !0) : e.key === "ArrowDown" ? (o((e) => (e + 1) % n.length), !0) : e.key === "Enter" || e.key === "Tab" ? (s(a), !0) : !1 })), n.length === 0 ? null : /* @__PURE__ */ g("div", {
		"data-testid": "mention-suggestions",
		role: "listbox",
		"aria-label": "People",
		className: "max-h-56 w-64 overflow-y-auto rounded-lg border border-border bg-surface py-1 shadow-lg",
		children: n.map((n, r) => /* @__PURE__ */ _("button", {
			type: "button",
			role: "option",
			"aria-selected": r === a,
			"data-testid": "mention-option",
			onMouseDown: (e) => {
				e.preventDefault(), s(r);
			},
			onMouseEnter: () => o(r),
			className: e("flex w-full items-center gap-2 px-2 py-1.5 text-left text-sm", r === a ? "bg-surface-hover" : "bg-transparent"),
			children: [/* @__PURE__ */ g(t, {
				name: n.label,
				src: n.avatarUrl,
				color: n.color,
				size: 24
			}), /* @__PURE__ */ _("span", {
				className: "min-w-0 flex-1",
				children: [/* @__PURE__ */ g("span", {
					className: "block truncate text-text-primary",
					children: n.label
				}), n.hint && /* @__PURE__ */ g("span", {
					className: "block truncate text-xs text-text-tertiary",
					children: n.hint
				})]
			})]
		}, n.id))
	});
}), _i = c(function({ items: t, command: n }, r) {
	let [i, a] = m(0);
	u(() => a(0), [t]);
	let o = (e) => {
		let r = t[e];
		r && n({ emoji: r.emoji });
	};
	return d(r, () => ({ onKeyDown: ({ event: e }) => e.key === "ArrowUp" ? (a((e) => (e + t.length - 1) % t.length), !0) : e.key === "ArrowDown" ? (a((e) => (e + 1) % t.length), !0) : e.key === "Enter" || e.key === "Tab" ? (o(i), !0) : !1 })), t.length === 0 ? null : /* @__PURE__ */ g("div", {
		"data-testid": "emoji-suggestions",
		role: "listbox",
		"aria-label": "Emoji",
		className: "max-h-56 w-56 overflow-y-auto rounded-lg border border-border bg-surface py-1 shadow-lg",
		children: t.map((t, n) => /* @__PURE__ */ _("button", {
			type: "button",
			role: "option",
			"aria-selected": n === i,
			"data-testid": "emoji-option",
			onMouseDown: (e) => {
				e.preventDefault(), o(n);
			},
			onMouseEnter: () => a(n),
			className: e("flex w-full items-center gap-2 px-2 py-1 text-left text-sm", n === i ? "bg-surface-hover" : "bg-transparent"),
			children: [/* @__PURE__ */ g("span", {
				"aria-hidden": !0,
				className: "text-base leading-none",
				children: t.emoji
			}), /* @__PURE__ */ _("span", {
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
//#region src/components/social/RichChatComposer.tsx
function vi() {
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
function yi(e) {
	let t = /* @__PURE__ */ new Set(), n = [];
	return e.state.doc.descendants((e) => {
		if (e.type.name !== "mention") return;
		let r = String(e.attrs.id ?? "");
		!r || t.has(r) || (t.add(r), n.push({
			id: r,
			label: String(e.attrs.label ?? r)
		}));
	}), n;
}
var bi = 0;
function xi({ onSend: t, onSearchPeople: o, allowAttachments: c = !1, allowEmoji: u = !1, onRequestLink: d, placeholder: w = "Write a message…", disabled: T = !1, toolbarExtras: ee, className: te, "data-testid": E = "rich-chat-composer" }) {
	let D = p(() => {}), ne = p(() => {}), re = p(null), ie = p(null), [ae, oe] = m(!1), [se, O] = m({
		open: !1,
		href: "",
		text: ""
	}), [k, le] = m([]), [ue, de] = m(!0), fe = c && !T, pe = f(() => {
		let e = [
			x.configure({
				heading: !1,
				horizontalRule: !1,
				link: !1
			}),
			S.configure({ placeholder: w }),
			yn.configure({
				openOnClick: !1,
				autolink: !0,
				HTMLAttributes: {
					rel: "noopener noreferrer nofollow",
					target: "_blank"
				}
			}),
			C.create({
				name: "emojiSuggestion",
				priority: 101,
				addProseMirrorPlugins() {
					return [fi({
						editor: this.editor,
						char: ":",
						allow: ({ state: e, range: t }) => e.doc.textBetween(t.from, t.to, "\0").length >= 3,
						items: ({ query: e }) => a(e),
						command: ({ editor: e, range: t, props: n }) => {
							e.chain().focus().deleteRange(t).insertContent(n.emoji).run();
						},
						render: () => {
							let e = null, t = vi();
							return {
								onStart: (n) => {
									e = new y(_i, {
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
			C.create({
				name: "chatComposerKeymap",
				addKeyboardShortcuts() {
					return {
						Enter: () => (D.current(), !0),
						"Mod-k": () => (ne.current(), !0),
						"Shift-Enter": ({ editor: e }) => e.commands.setHardBreak()
					};
				}
			})
		];
		return o && e.push(ce.configure({
			HTMLAttributes: { class: "mention" },
			suggestion: {
				char: "@",
				items: ({ query: e }) => o(e),
				render: () => {
					let e = null, t = vi();
					return {
						onStart: (n) => {
							e = new y(gi, {
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
	}, [w, o]), A = b({
		extensions: pe,
		editable: !T,
		onUpdate: ({ editor: e }) => de(e.isEmpty),
		editorProps: { attributes: {
			class: "chat-composer-input",
			"data-testid": `${E}-input`
		} }
	}, [pe, T]), me = !T && (!ue || k.length > 0), he = l(() => {
		if (!A) return;
		let { from: e, to: t } = A.state.selection;
		O({
			open: !0,
			href: A.getAttributes("link").href ?? "",
			text: A.state.doc.textBetween(e, t)
		});
	}, [A]), ge = l(({ href: e, text: t }) => {
		if (!A) return;
		let n = A.chain().focus(), { empty: r } = A.state.selection;
		r ? n.insertContent(`<a href="${e}">${t || e}</a>`).run() : t ? n.insertContent(`<a href="${e}">${t}</a>`).run() : n.setLink({ href: e }).run(), O({
			open: !1,
			href: "",
			text: ""
		});
	}, [A]), _e = l(() => {
		!A || !me || (t({
			html: A.isEmpty ? "" : A.getHTML(),
			text: A.getText(),
			mentions: yi(A),
			files: k.map((e) => e.file)
		}), A.commands.clearContent(!0), le([]), de(!0));
	}, [
		A,
		me,
		t,
		k
	]);
	D.current = _e, ne.current = he;
	let ve = l((e) => {
		!fe || e.length === 0 || le((t) => [...t, ...e.map((e) => ({
			id: `staged-${bi++}`,
			file: e
		}))]);
	}, [fe]), j = (t, n, r, i, a) => /* @__PURE__ */ g("button", {
		ref: a,
		type: "button",
		"aria-label": t,
		"aria-pressed": n,
		title: t,
		disabled: T,
		onMouseDown: (e) => {
			e.preventDefault(), r();
		},
		className: e("grid h-7 w-7 place-items-center rounded text-sm leading-none", n ? "bg-surface-hover text-text-primary" : "text-text-secondary hover:bg-surface-hover"),
		children: i
	}, t);
	return /* @__PURE__ */ g(i, {
		onFiles: ve,
		disabled: !fe,
		className: te,
		children: /* @__PURE__ */ _("div", {
			"data-testid": E,
			className: "chat-composer rounded-lg border border-border bg-surface focus-within:border-primary",
			children: [
				/* @__PURE__ */ g(v, { editor: A }),
				/* @__PURE__ */ g(hi, {
					files: k,
					disabled: T,
					onRemove: (e) => le((t) => t.filter((t) => t.id !== e))
				}),
				/* @__PURE__ */ _("div", {
					className: "flex items-center gap-0.5 border-t border-border px-1.5 py-1",
					children: [
						A && [
							j("Bold", A.isActive("bold"), () => A.chain().focus().toggleBold().run(), /* @__PURE__ */ g("b", { children: "B" })),
							j("Italic", A.isActive("italic"), () => A.chain().focus().toggleItalic().run(), /* @__PURE__ */ g("i", { children: "I" })),
							j("Strikethrough", A.isActive("strike"), () => A.chain().focus().toggleStrike().run(), /* @__PURE__ */ g("s", { children: "S" })),
							j("Code", A.isActive("code"), () => A.chain().focus().toggleCode().run(), /* @__PURE__ */ g("span", {
								className: "font-mono text-[11px]",
								children: "<>"
							})),
							j(A.isActive("link") ? "Edit link" : "Add link", A.isActive("link"), () => he(), /* @__PURE__ */ g("span", {
								"aria-hidden": !0,
								children: "🔗"
							})),
							/* @__PURE__ */ g("span", {
								"aria-hidden": !0,
								className: "mx-1 h-4 w-px bg-border"
							}, "sep1"),
							j("Bulleted list", A.isActive("bulletList"), () => A.chain().focus().toggleBulletList().run(), /* @__PURE__ */ g("span", { children: "•" })),
							j("Numbered list", A.isActive("orderedList"), () => A.chain().focus().toggleOrderedList().run(), /* @__PURE__ */ g("span", {
								className: "text-[11px]",
								children: "1."
							})),
							j("Quote", A.isActive("blockquote"), () => A.chain().focus().toggleBlockquote().run(), /* @__PURE__ */ g("span", { children: "❝" }))
						],
						(u || fe) && /* @__PURE__ */ g("span", {
							"aria-hidden": !0,
							className: "mx-1 h-4 w-px bg-border"
						}),
						u && A && /* @__PURE__ */ _("span", {
							className: "relative",
							children: [j("Emoji", ae, () => oe((e) => !e), /* @__PURE__ */ g("span", { children: "🙂" }), ie), /* @__PURE__ */ g(r, {
								open: ae,
								triggerRef: ie,
								onClose: () => oe(!1),
								onSelect: (e) => {
									A.chain().focus().insertContent(e).run(), oe(!1);
								}
							})]
						}),
						fe && /* @__PURE__ */ _(h, { children: [j("Attach files", !1, () => re.current?.click(), /* @__PURE__ */ g("span", { children: "📎" })), /* @__PURE__ */ g(n, {
							ref: re,
							multiple: !0,
							"data-testid": `${E}-file-input`,
							onFiles: ve
						})] }),
						ee,
						/* @__PURE__ */ g("button", {
							type: "button",
							onClick: _e,
							disabled: !me,
							"data-testid": `${E}-send`,
							className: "ml-auto rounded bg-primary px-2.5 py-1 text-xs font-semibold text-white disabled:opacity-40",
							children: "Send"
						})
					]
				}),
				/* @__PURE__ */ g(s, {
					open: se.open,
					initialHref: se.href,
					initialText: se.text,
					onSubmit: (e) => ge(d ? {
						...e,
						href: d(e.text) ?? e.href
					} : e),
					onRemove: () => {
						A?.chain().focus().unsetLink().run(), O({
							open: !1,
							href: "",
							text: ""
						});
					},
					onClose: () => {
						O({
							open: !1,
							href: "",
							text: ""
						}), A?.commands.focus();
					}
				})
			]
		})
	});
}
//#endregion
export { hi as ComposerAttachments, o as EMOJI_SHORTCODES, _i as EmojiSuggestions, gi as MentionSuggestions, xi as RichChatComposer, a as searchEmoji };
