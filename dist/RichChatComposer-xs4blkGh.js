import { t as e } from "./cn-DhjIN-s0.js";
import { t } from "./IconButton-C3DMtvSx.js";
import { D as n, N as r, O as i, S as a, d as o, m as s, p as c, s as l, t as u, v as d } from "./DropdownMenu-Ct9zTKPJ.js";
import { n as f } from "./Tabs-BGZyr2nH.js";
import { t as p } from "./Avatar-DeJWic2B.js";
import { t as m } from "./RovingToolbar-CmQag9q6.js";
import { a as h, i as g, n as _, o as v, s as y } from "./backdropTone-BF54k8gW.js";
import { i as b, n as x, r as S } from "./ReactionPickerPopover-CcL-n6gt.js";
import { n as C, o as w, r as ee, t as te } from "./composerCommands-CPHsHCqp.js";
import { t as ne } from "./ComposerReferences-UMETBZqe.js";
import { Fragment as re, forwardRef as T, useCallback as ie, useEffect as E, useImperativeHandle as ae, useLayoutEffect as oe, useMemo as se, useRef as D, useState as O } from "react";
import { Fragment as ce, jsx as k, jsxs as A } from "react/jsx-runtime";
import { EditorContent as le, ReactRenderer as ue, useEditor as de } from "@tiptap/react";
import fe from "@tiptap/starter-kit";
import pe from "@tiptap/extension-placeholder";
import { Extension as me, InputRule as he, Mark as ge, PasteRule as _e, combineTransactionSteps as ve, escapeForRegEx as ye, findChildrenInRange as be, getAttributes as xe, getChangedRanges as Se, getMarksBetween as Ce, markInputRule as we, markPasteRule as Te, mergeAttributes as Ee } from "@tiptap/core";
import { Plugin as De, PluginKey as j } from "@tiptap/pm/state";
import Oe from "@tiptap/extension-mention";
import { Decoration as ke, DecorationSet as Ae } from "@tiptap/pm/view";
//#region ../../../../../../../Users/connorhoehn/Projects/ui-components/node_modules/linkifyjs/dist/linkify.mjs
var je = "aaa1rp3bb0ott3vie4c1le2ogado5udhabi7c0ademy5centure6ountant0s9o1tor4d0s1ult4e0g1ro2tna4f0l1rica5g0akhan5ency5i0g1rbus3force5tel5kdn3l0ibaba4pay4lfinanz6state5y2sace3tom5m0azon4ericanexpress7family11x2fam3ica3sterdam8nalytics7droid5quan4z2o0l2partments8p0le4q0uarelle8r0ab1mco4chi3my2pa2t0e3s0da2ia2sociates9t0hleta5torney7u0ction5di0ble3o3spost5thor3o0s4w0s2x0a2z0ure5ba0by2idu3namex4d1k2r0celona5laycard4s5efoot5gains6seball5ketball8uhaus5yern5b0c1t1va3cg1n2d1e0ats2uty4er2rlin4st0buy5t2f1g1h0arti5i0ble3d1ke2ng0o3o1z2j1lack0friday9ockbuster8g1omberg7ue3m0s1w2n0pparibas9o0ats3ehringer8fa2m1nd2o0k0ing5sch2tik2on4t1utique6x2r0adesco6idgestone9oadway5ker3ther5ussels7s1t1uild0ers6siness6y1zz3v1w1y1z0h3ca0b1fe2l0l1vinklein9m0era3p2non3petown5ital0one8r0avan4ds2e0er0s4s2sa1e1h1ino4t0ering5holic7ba1n1re3c1d1enter4o1rn3f0a1d2g1h0anel2nel4rity4se2t2eap3intai5ristmas6ome4urch5i0priani6rcle4sco3tadel4i0c2y3k1l0aims4eaning6ick2nic1que6othing5ud3ub0med6m1n1o0ach3des3ffee4llege4ogne5m0mbank4unity6pany2re3uter5sec4ndos3struction8ulting7tact3ractors9oking4l1p2rsica5untry4pon0s4rses6pa2r0edit0card4union9icket5own3s1uise0s6u0isinella9v1w1x1y0mru3ou3z2dad1nce3ta1e1ing3sun4y2clk3ds2e0al0er2s3gree4livery5l1oitte5ta3mocrat6ntal2ist5si0gn4v2hl2iamonds6et2gital5rect0ory7scount3ver5h2y2j1k1m1np2o0cs1tor4g1mains5t1wnload7rive4tv2ubai3pont4rban5vag2r2z2earth3t2c0o2deka3u0cation8e1g1mail3erck5nergy4gineer0ing9terprises10pson4quipment8r0icsson6ni3s0q1tate5t1u0rovision8s2vents5xchange6pert3osed4ress5traspace10fage2il1rwinds6th3mily4n0s2rm0ers5shion4t3edex3edback6rrari3ero6i0delity5o2lm2nal1nce1ial7re0stone6mdale6sh0ing5t0ness6j1k1lickr3ghts4r2orist4wers5y2m1o0o0d1tball6rd1ex2sale4um3undation8x2r0ee1senius7l1ogans4ntier7tr2ujitsu5n0d2rniture7tbol5yi3ga0l0lery3o1up4me0s3p1rden4y2b0iz3d0n2e0a1nt0ing5orge5f1g0ee3h1i0ft0s3ves2ing5l0ass3e1obal2o4m0ail3bh2o1x2n1odaddy5ld0point6f2odyear5g0le4p1t1v2p1q1r0ainger5phics5tis4een3ipe3ocery4up4s1t1u0cci3ge2ide2tars5ru3w1y2hair2mburg5ngout5us3bo2dfc0bank7ealth0care8lp1sinki6re1mes5iphop4samitsu7tachi5v2k0t2m1n1ockey4ldings5iday5medepot5goods5s0ense7nda3rse3spital5t0ing5t0els3mail5use3w2r1sbc3t1u0ghes5yatt3undai7ibm2cbc2e1u2d1e0ee3fm2kano4l1m0amat4db2mo0bilien9n0c1dustries8finiti5o2g1k1stitute6urance4e4t0ernational10uit4vestments10o1piranga7q1r0ish4s0maili5t0anbul7t0au2v3jaguar4va3cb2e0ep2tzt3welry6io2ll2m0p2nj2o0bs1urg4t1y2p0morgan6rs3uegos4niper7kaufen5ddi3e0rryhotels6properties14fh2g1h1i0a1ds2m1ndle4tchen5wi3m1n1oeln3matsu5sher5p0mg2n2r0d1ed3uokgroup8w1y0oto4z2la0caixa5mborghini8er3nd0rover6xess5salle5t0ino3robe5w0yer5b1c1ds2ease3clerc5frak4gal2o2xus4gbt3i0dl2fe0insurance9style7ghting6ke2lly3mited4o2ncoln4k2ve1ing5k1lc1p2oan0s3cker3us3l1ndon4tte1o3ve3pl0financial11r1s1t0d0a3u0ndbeck6xe1ury5v1y2ma0drid4if1son4keup4n0agement7go3p1rket0ing3s4riott5shalls7ttel5ba2c0kinsey7d1e0d0ia3et2lbourne7me1orial6n0u2rck0msd7g1h1iami3crosoft7l1ni1t2t0subishi9k1l0b1s2m0a2n1o0bi0le4da2e1i1m1nash3ey2ster5rmon3tgage6scow4to0rcycles9v0ie4p1q1r1s0d2t0n1r2u0seum3ic4v1w1x1y1z2na0b1goya4me2vy3ba2c1e0c1t0bank4flix4work5ustar5w0s2xt0direct7us4f0l2g0o2hk2i0co2ke1on3nja3ssan1y5l1o0kia3rton4w0ruz3tv4p1r0a1w2tt2u1yc2z2obi1server7ffice5kinawa6layan0group9lo3m0ega4ne1g1l0ine5oo2pen3racle3nge4g0anic5igins6saka4tsuka4t2vh3pa0ge2nasonic7ris2s1tners4s1y3y2ccw3e0t2f0izer5g1h0armacy6d1ilips5one2to0graphy6s4ysio5ics1tet2ures6d1n0g1k2oneer5zza4k1l0ace2y0station9umbing5s3m1n0c2ohl2ker3litie5rn2st3r0axi3ess3ime3o0d0uctions8f1gressive8mo2perties3y5tection8u0dential9s1t1ub2w0c2y2qa1pon3uebec3st5racing4dio4e0ad1lestate6tor2y4cipes5d0umbrella9hab3ise0n3t2liance6n0t0als5pair3ort3ublican8st0aurant8view0s5xroth6ich0ardli6oh3l1o1p2o0cks3deo3gers4om3s0vp3u0gby3hr2n2w0e2yukyu6sa0arland6fe0ty4kura4le1on3msclub4ung5ndvik0coromant12ofi4p1rl2s1ve2xo3b0i1s2c0b1haeffler7midt4olarships8ol3ule3warz5ience5ot3d1e0arch3t2cure1ity6ek2lect4ner3rvices6ven3w1x0y3fr2g1h0angrila6rp3ell3ia1ksha5oes2p0ping5uji3w3i0lk2na1gles5te3j1k0i0n2y0pe4l0ing4m0art3ile4n0cf3o0ccer3ial4ftbank4ware6hu2lar2utions7ng1y2y2pa0ce3ort2t3r0l2s1t0ada2ples4r1tebank4farm7c0group6ockholm6rage3e3ream4udio2y3yle4u0cks3pplies3y2ort5rf1gery5zuki5v1watch4iss4x1y0dney4stems6z2tab1ipei4lk2obao4rget4tamotors6r2too4x0i3c0i2d0k2eam2ch0nology8l1masek5nnis4va3f1g1h0d1eater2re6iaa2ckets5enda4ps2res2ol4j0maxx4x2k0maxx5l1m0all4n1o0day3kyo3ols3p1ray3shiba5tal3urs3wn2yota3s3r0ade1ing4ining5vel0ers0insurance16ust3v2t1ube2i1nes3shu4v0s2w1z2ua1bank3s2g1k1nicom3versity8o2ol2ps2s1y1z2va0cations7na1guard7c1e0gas3ntures6risign5mögensberater2ung14sicherung10t2g1i0ajes4deo3g1king4llas4n1p1rgin4sa1ion4va1o3laanderen9n1odka3lvo3te1ing3o2yage5u2wales2mart4ter4ng0gou5tch0es6eather0channel12bcam3er2site5d0ding5ibo2r3f1hoswho6ien2ki2lliamhill9n0dows4e1ners6me2oodside6rk0s2ld3w2s1tc1f3xbox3erox4ihuan4n2xx2yz3yachts4hoo3maxun5ndex5e1odobashi7ga2kohama6u0tube6t1un3za0ppos4ra3ero3ip2m1one3uerich6w2", Me = "ελ1υ2бг1ел3дети4ею2католик6ом3мкд2он1сква6онлайн5рг3рус2ф2сайт3рб3укр3қаз3հայ3ישראל5קום3ابوظبي5رامكو5لاردن4بحرين5جزائر5سعودية6عليان5مغرب5مارات5یران5بارت2زار4يتك3ھارت5تونس4سودان3رية5شبكة4عراق2ب2مان4فلسطين6قطر3كاثوليك6وم3مصر2ليسيا5وريتانيا7قع4همراه5پاکستان7ڀارت4कॉम3नेट3भारत0म्3ोत5संगठन5বাংলা5ভারত2ৰত4ਭਾਰਤ4ભારત4ଭାରତ4இந்தியா6லங்கை6சிங்கப்பூர்11భారత్5ಭಾರತ4ഭാരതം5ලංකා4คอม3ไทย3ລາວ3გე2みんな3アマゾン4クラウド4グーグル4コム2ストア3セール3ファッション6ポイント4世界2中信1国1國1文网3亚马逊3企业2佛山2信息2健康2八卦2公司1益2台湾1灣2商城1店1标2嘉里0大酒店5在线2大拿2天主教3娱乐2家電2广东2微博2慈善2我爱你3手机2招聘2政务1府2新加坡2闻2时尚2書籍2机构2淡马锡3游戏2澳門2点看2移动2组织机构4网址1店1站1络2联通2谷歌2购物2通販2集团2電訊盈科4飞利浦3食品2餐厅2香格里拉3港2닷넷1컴2삼성2한국2", Ne = "numeric", Pe = "ascii", Fe = "alpha", Ie = "asciinumeric", Le = "alphanumeric", Re = "domain", ze = "emoji", Be = "scheme", Ve = "slashscheme", He = "whitespace";
function Ue(e, t) {
	return e in t || (t[e] = []), t[e];
}
function We(e, t, n) {
	t[Ne] && (t[Ie] = !0, t[Le] = !0), t[Pe] && (t[Ie] = !0, t[Fe] = !0), t[Ie] && (t[Le] = !0), t[Fe] && (t[Le] = !0), t[Le] && (t[Re] = !0), t[ze] && (t[Re] = !0);
	for (let r in t) {
		let t = Ue(r, n);
		t.indexOf(e) < 0 && t.push(e);
	}
}
function Ge(e, t) {
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
		return t && t.j ? i = t : (i = new M(t), n && r && We(t, n, r)), this.jr.push([e, i]), i;
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
		return s ? (o = new M(), Object.assign(o.j, s.j), o.jr.push.apply(o.jr, s.jr), o.jd = s.jd, o.t = s.t) : o = new M(), a && (r && (o.t && typeof o.t == "string" ? We(a, Object.assign(Ge(o.t, r), n), r) : n && We(a, n, r)), o.t = a), i.j[e] = o, o;
	}
};
var N = (e, t, n, r, i) => e.ta(t, n, r, i), P = (e, t, n, r, i) => e.tr(t, n, r, i), Ke = (e, t, n, r, i) => e.ts(t, n, r, i), F = (e, t, n, r, i) => e.tt(t, n, r, i), qe = "WORD", Je = "UWORD", Ye = "ASCIINUMERICAL", Xe = "ALPHANUMERICAL", I = "LOCALHOST", Ze = "TLD", Qe = "UTLD", $e = "SCHEME", et = "SLASH_SCHEME", tt = "NUM", L = "WS", nt = "NL", rt = "OPENBRACE", it = "CLOSEBRACE", at = "OPENBRACKET", ot = "CLOSEBRACKET", st = "OPENPAREN", ct = "CLOSEPAREN", lt = "OPENANGLEBRACKET", ut = "CLOSEANGLEBRACKET", dt = "FULLWIDTHLEFTPAREN", ft = "FULLWIDTHRIGHTPAREN", pt = "LEFTCORNERBRACKET", mt = "RIGHTCORNERBRACKET", ht = "LEFTWHITECORNERBRACKET", gt = "RIGHTWHITECORNERBRACKET", _t = "FULLWIDTHLESSTHAN", vt = "FULLWIDTHGREATERTHAN", yt = "AMPERSAND", bt = "APOSTROPHE", xt = "ASTERISK", St = "AT", R = "BACKSLASH", Ct = "BACKTICK", wt = "CARET", Tt = "COLON", Et = "COMMA", z = "DOLLAR", B = "DOT", Dt = "EQUALS", Ot = "EXCLAMATION", V = "HYPHEN", kt = "PERCENT", At = "PIPE", jt = "PLUS", Mt = "POUND", Nt = "QUERY", Pt = "QUOTE", Ft = "FULLWIDTHMIDDLEDOT", It = "SEMI", Lt = "SLASH", H = "TILDE", Rt = "UNDERSCORE", zt = "EMOJI", Bt = "SYM", Vt = /*#__PURE__*/ Object.freeze({
	__proto__: null,
	ALPHANUMERICAL: Xe,
	AMPERSAND: yt,
	APOSTROPHE: bt,
	ASCIINUMERICAL: Ye,
	ASTERISK: xt,
	AT: St,
	BACKSLASH: R,
	BACKTICK: Ct,
	CARET: wt,
	CLOSEANGLEBRACKET: ut,
	CLOSEBRACE: it,
	CLOSEBRACKET: ot,
	CLOSEPAREN: ct,
	COLON: Tt,
	COMMA: Et,
	DOLLAR: z,
	DOT: B,
	EMOJI: zt,
	EQUALS: Dt,
	EXCLAMATION: Ot,
	FULLWIDTHGREATERTHAN: vt,
	FULLWIDTHLEFTPAREN: dt,
	FULLWIDTHLESSTHAN: _t,
	FULLWIDTHMIDDLEDOT: Ft,
	FULLWIDTHRIGHTPAREN: ft,
	HYPHEN: V,
	LEFTCORNERBRACKET: pt,
	LEFTWHITECORNERBRACKET: ht,
	LOCALHOST: I,
	NL: nt,
	NUM: tt,
	OPENANGLEBRACKET: lt,
	OPENBRACE: rt,
	OPENBRACKET: at,
	OPENPAREN: st,
	PERCENT: kt,
	PIPE: At,
	PLUS: jt,
	POUND: Mt,
	QUERY: Nt,
	QUOTE: Pt,
	RIGHTCORNERBRACKET: mt,
	RIGHTWHITECORNERBRACKET: gt,
	SCHEME: $e,
	SEMI: It,
	SLASH: Lt,
	SLASH_SCHEME: et,
	SYM: Bt,
	TILDE: H,
	TLD: Ze,
	UNDERSCORE: Rt,
	UTLD: Qe,
	UWORD: Je,
	WORD: qe,
	WS: L
}), Ht = /[a-z]/, Ut = /\p{L}/u, Wt = /\p{Emoji}/u, U = /\d/, W = /\s/, Gt = "\r", Kt = "\n", qt = "️", Jt = "‍", Yt = "￼", G = null, Xt = null;
function Zt(e = []) {
	let t = {};
	M.groups = t;
	let n = new M();
	G ??= tn(je), Xt ??= tn(Me), F(n, "'", bt), F(n, "{", rt), F(n, "}", it), F(n, "[", at), F(n, "]", ot), F(n, "(", st), F(n, ")", ct), F(n, "<", lt), F(n, ">", ut), F(n, "（", dt), F(n, "）", ft), F(n, "「", pt), F(n, "」", mt), F(n, "『", ht), F(n, "』", gt), F(n, "＜", _t), F(n, "＞", vt), F(n, "&", yt), F(n, "*", xt), F(n, "@", St), F(n, "`", Ct), F(n, "^", wt), F(n, ":", Tt), F(n, ",", Et), F(n, "$", z), F(n, ".", B), F(n, "=", Dt), F(n, "!", Ot), F(n, "-", V), F(n, "%", kt), F(n, "|", At), F(n, "+", jt), F(n, "#", Mt), F(n, "?", Nt), F(n, "\"", Pt), F(n, "/", Lt), F(n, ";", It), F(n, "~", H), F(n, "_", Rt), F(n, "\\", R), F(n, "・", Ft);
	let r = P(n, U, tt, { [Ne]: !0 });
	P(r, U, r);
	let i = P(r, Ht, Ye, { [Ie]: !0 }), a = P(r, Ut, Xe, { [Le]: !0 }), o = P(n, Ht, qe, { [Pe]: !0 });
	P(o, U, i), P(o, Ht, o), P(i, U, i), P(i, Ht, i);
	let s = P(n, Ut, Je, { [Fe]: !0 });
	P(s, Ht), P(s, U, a), P(s, Ut, s), P(a, U, a), P(a, Ht), P(a, Ut, a);
	let c = F(n, Kt, nt, { [He]: !0 }), l = F(n, Gt, L, { [He]: !0 }), u = P(n, W, L, { [He]: !0 });
	F(n, Yt, u), F(l, Kt, c), F(l, Yt, u), P(l, W, u), F(u, Gt), F(u, Kt), P(u, W, u), F(u, Yt, u);
	let d = P(n, Wt, zt, { [ze]: !0 });
	F(d, "#"), P(d, Wt, d), F(d, qt, d);
	let f = F(d, Jt);
	F(f, "#"), P(f, Wt, d);
	let p = [[Ht, o], [U, i]], m = [
		[Ht, null],
		[Ut, s],
		[U, a]
	];
	for (let e = 0; e < G.length; e++) en(n, G[e], Ze, qe, p);
	for (let e = 0; e < Xt.length; e++) en(n, Xt[e], Qe, Je, m);
	We(Ze, {
		tld: !0,
		ascii: !0
	}, t), We(Qe, {
		utld: !0,
		alpha: !0
	}, t), en(n, "file", $e, qe, p), en(n, "mailto", $e, qe, p), en(n, "http", et, qe, p), en(n, "https", et, qe, p), en(n, "ftp", et, qe, p), en(n, "ftps", et, qe, p), We($e, {
		scheme: !0,
		ascii: !0
	}, t), We(et, {
		slashscheme: !0,
		ascii: !0
	}, t), e = e.sort((e, t) => e[0] > t[0] ? 1 : -1);
	for (let t = 0; t < e.length; t++) {
		let r = e[t][0], i = e[t][1] ? { [Be]: !0 } : { [Ve]: !0 };
		r.indexOf("-") >= 0 ? i[Re] = !0 : Ht.test(r) ? U.test(r) ? i[Ie] = !0 : i[Pe] = !0 : i[Ne] = !0, Ke(n, r, r, i);
	}
	return Ke(n, "localhost", I, { ascii: !0 }), n.jd = new M(Bt), {
		start: n,
		tokens: Object.assign({ groups: t }, Vt)
	};
}
function Qt(e, t) {
	let n = $t(t.replace(/[A-Z]/g, (e) => e.toLowerCase())), r = n.length, i = [], a = 0, o = 0;
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
function $t(e) {
	let t = [], n = e.length, r = 0;
	for (; r < n;) {
		let i = e.charCodeAt(r), a, o = i < 55296 || i > 56319 || r + 1 === n || (a = e.charCodeAt(r + 1)) < 56320 || a > 57343 ? e[r] : e.slice(r, r + 2);
		t.push(o), r += o.length;
	}
	return t;
}
function en(e, t, n, r, i) {
	let a, o = t.length;
	for (let n = 0; n < o - 1; n++) {
		let o = t[n];
		e.j[o] ? a = e.j[o] : (a = new M(r), a.jr = i.slice(), e.j[o] = a), e = a;
	}
	return a = new M(n), a.jr = i.slice(), e.j[t[o - 1]] = a, a;
}
function tn(e) {
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
var nn = {
	defaultProtocol: "http",
	events: null,
	format: an,
	formatHref: an,
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
function rn(e, t = null) {
	let n = Object.assign({}, nn);
	e && (n = Object.assign(n, e instanceof rn ? e.o : e));
	let r = n.ignoreTags, i = [];
	for (let e = 0; e < r.length; e++) i.push(r[e].toUpperCase());
	this.o = n, t && (this.defaultRender = t), this.ignoreTags = i;
}
rn.prototype = {
	o: nn,
	ignoreTags: [],
	defaultRender(e) {
		return e;
	},
	check(e) {
		return this.get("validate", e.toString(), e);
	},
	get(e, t, n) {
		let r = t != null, i = this.o[e];
		return i && (typeof i == "object" ? (i = n.t in i ? i[n.t] : nn[e], typeof i == "function" && r && (i = i(t, n))) : typeof i == "function" && r && (i = i(t, n.t, n)), i);
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
function an(e) {
	return e;
}
function on(e, t) {
	this.t = "token", this.v = e, this.tk = t;
}
on.prototype = {
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
	toObject(e = nn.defaultProtocol) {
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
function sn(e, t) {
	class n extends on {
		constructor(t, n) {
			super(t, n), this.t = e;
		}
	}
	for (let e in t) n.prototype[e] = t[e];
	return n.t = e, n;
}
var cn = sn("email", {
	isLink: !0,
	toHref() {
		return "mailto:" + this.toString();
	}
}), ln = sn("text"), un = sn("nl"), dn = sn("url", {
	isLink: !0,
	toHref(e = nn.defaultProtocol) {
		return this.hasProtocol() ? this.v : `${e}://${this.v}`;
	},
	hasProtocol() {
		let e = this.tk;
		return e.length >= 2 && e[0].t !== I && e[1].t === Tt;
	}
}), K = (e) => new M(e);
function fn({ groups: e }) {
	let t = e.domain.concat([
		yt,
		xt,
		St,
		R,
		Ct,
		wt,
		z,
		Dt,
		V,
		tt,
		kt,
		At,
		jt,
		Mt,
		Lt,
		Bt,
		H,
		Rt
	]), n = [
		bt,
		Tt,
		Et,
		B,
		Ot,
		kt,
		Nt,
		Pt,
		It,
		lt,
		ut,
		rt,
		it,
		ot,
		at,
		st,
		ct,
		dt,
		ft,
		pt,
		mt,
		ht,
		gt,
		_t,
		vt
	], r = [
		yt,
		bt,
		xt,
		R,
		Ct,
		wt,
		z,
		Dt,
		V,
		rt,
		it,
		kt,
		At,
		jt,
		Mt,
		Nt,
		Lt,
		Bt,
		H,
		Rt
	], i = K(), a = F(i, H);
	N(a, r, a), N(a, e.domain, a);
	let o = K(), s = K(), c = K();
	N(i, e.domain, o), N(i, e.scheme, s), N(i, e.slashscheme, c), N(o, r, a), N(o, e.domain, o);
	let l = F(o, St);
	F(a, St, l), F(s, St, l), F(c, St, l);
	let u = F(a, B);
	N(u, r, a), N(u, e.domain, a);
	let d = K();
	N(l, e.domain, d), N(d, e.domain, d);
	let f = F(d, B);
	N(f, e.domain, d);
	let p = K(cn);
	N(f, e.tld, p), N(f, e.utld, p), F(l, I, p);
	let m = F(d, V);
	F(m, V, m), N(m, e.domain, d), N(p, e.domain, d), F(p, B, f), F(p, V, m);
	let h = F(o, V), g = F(o, B);
	F(h, V, h), N(h, e.domain, o), N(g, r, a), N(g, e.domain, o);
	let _ = K(dn);
	N(g, e.tld, _), N(g, e.utld, _), N(_, e.domain, o), N(_, r, a), F(_, B, g), F(_, V, h), F(_, St, l);
	let v = F(_, Tt), y = K(dn);
	N(v, e.numeric, y);
	let b = K(dn), x = K();
	N(b, t, b), N(b, n, x), N(x, t, b), N(x, n, x), F(_, Lt, b), F(y, Lt, b);
	let S = F(s, Tt), C = F(F(F(c, Tt), Lt), Lt);
	N(s, e.domain, o), F(s, B, g), F(s, V, h), N(c, e.domain, o), F(c, B, g), F(c, V, h), N(S, e.domain, b), F(S, Lt, b), F(S, Nt, b), N(C, e.domain, b), N(C, t, b), F(C, Lt, b);
	let w = [
		[rt, it],
		[at, ot],
		[st, ct],
		[lt, ut],
		[dt, ft],
		[pt, mt],
		[ht, gt],
		[_t, vt]
	];
	for (let e = 0; e < w.length; e++) {
		let [r, i] = w[e], a = F(b, r);
		F(x, r, a);
		let o = K(dn);
		N(a, t, o);
		let s = K();
		N(a, n, s), F(a, i, b), N(o, t, o), N(o, n, s), N(s, t, o), N(s, n, s), F(o, i, b), F(s, i, b);
	}
	return F(i, I, _), F(i, nt, un), {
		start: i,
		tokens: Vt
	};
}
function pn(e, t, n) {
	let r = n.length, i = 0, a = [], o = [];
	for (; i < r;) {
		let s = e, c = null, l = null, u = 0, d = null, f = -1;
		for (; i < r && !(c = s.go(n[i].t));) o.push(n[i++]);
		for (; i < r && (l = c || s.go(n[i].t));) c = null, s = l, s.accepts() ? (f = 0, d = s) : f >= 0 && f++, i++, u++;
		if (f < 0) i -= u, i < r && (o.push(n[i]), i++);
		else {
			o.length > 0 && (a.push(mn(ln, t, o)), o = []), i -= f, u -= f;
			let e = d.t, r = n.slice(i - u, i);
			a.push(mn(e, t, r));
		}
	}
	return o.length > 0 && a.push(mn(ln, t, o)), a;
}
function mn(e, t, n) {
	let r = n[0].s, i = n[n.length - 1].e;
	return new e(t.slice(r, i), n);
}
var hn = typeof console < "u" && console && console.warn || (() => {}), gn = "until manual call of linkify.init(). Register all schemes and plugins before invoking linkify the first time.", q = {
	scanner: null,
	parser: null,
	tokenQueue: [],
	pluginQueue: [],
	customSchemes: [],
	initialized: !1
};
function _n() {
	return M.groups = {}, q.scanner = null, q.parser = null, q.tokenQueue = [], q.pluginQueue = [], q.customSchemes = [], q.initialized = !1, q;
}
function vn(e, t = !1) {
	if (q.initialized && hn(`linkifyjs: already initialized - will not register custom scheme "${e}" ${gn}`), !/^[0-9a-z]+(-[0-9a-z]+)*$/.test(e)) throw Error("linkifyjs: incorrect scheme format.\n1. Must only contain digits, lowercase ASCII letters or \"-\"\n2. Cannot start or end with \"-\"\n3. \"-\" cannot repeat");
	q.customSchemes.push([e, t]);
}
function yn() {
	q.scanner = Zt(q.customSchemes);
	for (let e = 0; e < q.tokenQueue.length; e++) q.tokenQueue[e][1]({ scanner: q.scanner });
	q.parser = fn(q.scanner.tokens);
	for (let e = 0; e < q.pluginQueue.length; e++) q.pluginQueue[e][1]({
		scanner: q.scanner,
		parser: q.parser
	});
	return q.initialized = !0, q;
}
function bn(e) {
	return q.initialized || yn(), pn(q.parser.start, e, Qt(q.scanner.start, e));
}
bn.scan = Qt;
function xn(e, t = null, n = null) {
	if (t && typeof t == "object") {
		if (n) throw Error(`linkifyjs: Invalid link type ${t}; must be a string`);
		n = t, t = null;
	}
	let r = new rn(n), i = bn(e), a = [];
	for (let e = 0; e < i.length; e++) {
		let n = i[e];
		n.isLink && (!t || n.t === t) && r.check(n) && a.push(n.toFormattedObject(r));
	}
	return a;
}
//#endregion
//#region ../../../../../../../Users/connorhoehn/Projects/ui-components/node_modules/@tiptap/extension-link/dist/index.js
var Sn = "[\0- \xA0 ᠎ -\u2029 　]", Cn = new RegExp(Sn), wn = RegExp(`${Sn}$`), Tn = new RegExp(Sn, "g");
function En(e) {
	return e.length === 1 ? e[0].isLink : e.length === 3 && e[1].isLink ? ["()", "[]"].includes(e[0].value + e[2].value) : !1;
}
function Dn(e) {
	return new De({
		key: new j("autolink"),
		appendTransaction: (t, n, r) => {
			let i = t.some((e) => e.docChanged) && !n.doc.eq(r.doc), a = t.some((e) => e.getMeta("preventAutolink"));
			if (!i || a) return;
			let { tr: o } = r, s = ve(n.doc, [...t]);
			if (Se(s).forEach(({ newRange: t }) => {
				let n = be(r.doc, t, (e) => e.isTextblock), i, a;
				if (n.length > 1) i = n[0], a = r.doc.textBetween(i.pos, i.pos + i.node.nodeSize, void 0, " ");
				else if (n.length) {
					let e = r.doc.textBetween(t.from, t.to, " ", " ");
					if (!wn.test(e)) return;
					i = n[0], a = r.doc.textBetween(i.pos, t.to, void 0, " ");
				}
				if (i && a) {
					let t = a.split(Cn).filter(Boolean);
					if (t.length <= 0) return !1;
					let n = t[t.length - 1], s = i.pos + a.lastIndexOf(n);
					if (!n) return !1;
					let c = bn(n).map((t) => t.toObject(e.defaultProtocol));
					if (!En(c)) return !1;
					c.filter((e) => e.isLink).map((e) => ({
						...e,
						from: s + e.start + 1,
						to: s + e.end + 1
					})).filter((e) => !r.schema.marks.code || !r.doc.rangeHasMark(e.from, e.to, r.schema.marks.code)).filter((t) => e.validate(t.value)).filter((t) => e.shouldAutoLink(t.value)).forEach((t) => {
						Ce(t.from, t.to, r.doc).some((t) => t.mark.type === e.type) || o.addMark(t.from, t.to, e.type.create({ href: t.href }));
					});
				}
			}), o.steps.length) return o;
		}
	});
}
function On(e) {
	return new De({
		key: new j("handleClickLink"),
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
				let n = xe(t.state, e.type.name), r = i.href ?? n.href, o = i.target ?? n.target;
				r && (window.open(r, o), a = !0);
			}
			return a;
		} }
	});
}
var kn = /\[([^[\]]+)\]\(((?:[^\s()]|\([^\s()]*\))+)(?:\s+(?:(["'])(.*?)\3|“(.*?)”|‘(.*?)’))?\)$/, An = /\[([^[\]]+)\]\(((?:[^\s()]|\([^\s()]*\))+)(?:\s+(?:(["'])(.*?)\3|“(.*?)”|‘(.*?)’))?\)/g;
function jn(e, t) {
	let n = 0;
	for (let r = t - 1; r >= 0 && e[r] === "\\"; --r) n += 1;
	return n % 2 == 1;
}
function Mn(e, t) {
	let n = 0, r = 0;
	for (; r < t;) {
		if (e[r] !== "`") {
			r += 1;
			continue;
		}
		if (n === 0 && jn(e, r)) {
			r += 1;
			continue;
		}
		let i = 0;
		for (; r < t && e[r] === "`";) i += 1, r += 1;
		n === 0 ? n = i : i === n && (n = 0);
	}
	return n > 0;
}
function J(e, t, n) {
	let [, r, i] = t;
	return (t.index ? e[t.index - 1] : void 0) === "!" || jn(e, t.index ?? 0) || Mn(e, t.index ?? 0) ? !1 : !!r.trim() && n(i);
}
function Nn(e) {
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
function Pn(e, t) {
	return e.index < t.index + t.text.length && t.index < e.index + e.text.length;
}
function Fn(e) {
	return {
		href: e.data?.href,
		title: e.data?.title ?? null
	};
}
function In(e) {
	let t = we({
		find: (t) => {
			let n = kn.exec(t);
			return !n || !J(t, n, e.isAllowedHref) ? null : Nn(n);
		},
		type: e.type,
		getAttributes: Fn
	});
	return new he({
		find: t.find,
		handler: (e) => {
			let n = t.handler(e);
			return n !== null && e.state.tr.steps.length && e.state.tr.setMeta("preventAutolink", !0), n;
		}
	});
}
function Ln(e) {
	let t = Te({
		find: (t) => {
			let n = [];
			for (let r of t.matchAll(An)) J(t, r, e.isAllowedHref) && n.push(Nn(r));
			let r = (e.findPlainUrls?.call(e, t) ?? []).filter((e) => !n.some((t) => Pn(t, e)));
			return [...n, ...r];
		},
		type: e.type,
		getAttributes: Fn
	});
	return new _e({
		find: t.find,
		handler: (e) => {
			let n = t.handler(e);
			return n !== null && e.state.tr.steps.length && e.match.data?.markdown && e.state.tr.setMeta("preventAutolink", !0), n;
		}
	});
}
function Rn(e) {
	return new De({
		key: new j("handlePasteLink"),
		props: { handlePaste: (t, n, r) => {
			let { shouldAutoLink: i } = e, { state: a } = t, { selection: o } = a, { empty: s } = o;
			if (s) return !1;
			let c = "";
			r.content.forEach((e) => {
				c += e.textContent;
			});
			let l = xn(c, { defaultProtocol: e.defaultProtocol }).find((e) => e.isLink && e.value === c);
			return !c || !l || i !== void 0 && !i(l.value) ? !1 : e.editor.commands.setMark(e.type, { href: l.href });
		} }
	});
}
function Y(e, t) {
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
	}), !e || e.replace(Tn, "").match(RegExp(`^(?:(?:${n.map((e) => e.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&")).join("|")}):|[^a-z]|[a-z0-9+.\\-]+(?:[^a-z+.\\-:]|$))`, "i"));
}
var zn = ge.create({
	name: "link",
	priority: 1e3,
	keepOnSplit: !1,
	exitable: !0,
	onCreate() {
		this.options.validate && !this.options.shouldAutoLink && (this.options.shouldAutoLink = this.options.validate, console.warn("The `validate` option is deprecated. Rename to the `shouldAutoLink` option instead.")), this.options.protocols.forEach((e) => {
			if (typeof e == "string") {
				vn(e);
				return;
			}
			vn(e.scheme, e.optionalSlashes);
		});
	},
	onDestroy() {
		_n();
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
			isAllowedUri: (e, t) => !!Y(e, t.protocols),
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
					defaultValidate: (e) => !!Y(e, this.options.protocols),
					protocols: this.options.protocols,
					defaultProtocol: this.options.defaultProtocol
				}) ? !1 : null;
			}
		}];
	},
	renderHTML({ HTMLAttributes: e }) {
		return this.options.isAllowedUri(e.href, {
			defaultValidate: (e) => !!Y(e, this.options.protocols),
			protocols: this.options.protocols,
			defaultProtocol: this.options.defaultProtocol
		}) ? [
			"a",
			Ee(this.options.HTMLAttributes, e),
			0
		] : [
			"a",
			Ee(this.options.HTMLAttributes, {
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
					defaultValidate: (e) => !!Y(e, this.options.protocols),
					protocols: this.options.protocols,
					defaultProtocol: this.options.defaultProtocol
				}) ? t().setMark(this.name, e).setMeta("preventAutolink", !0).run() : !1;
			},
			toggleLink: (e) => ({ chain: t }) => {
				let { href: n } = e || {};
				return n && !this.options.isAllowedUri(n, {
					defaultValidate: (e) => !!Y(e, this.options.protocols),
					protocols: this.options.protocols,
					defaultProtocol: this.options.defaultProtocol
				}) ? !1 : t().toggleMark(this.name, e, { extendEmptyMarkRange: !0 }).setMeta("preventAutolink", !0).run();
			},
			unsetLink: () => ({ chain: e }) => e().unsetMark(this.name, { extendEmptyMarkRange: !0 }).setMeta("preventAutolink", !0).run()
		};
	},
	addInputRules() {
		return this.options.markdownLinks ? [In({
			type: this.type,
			isAllowedHref: (e) => this.options.isAllowedUri(e, {
				defaultValidate: (e) => !!Y(e, this.options.protocols),
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
				xn(e).filter((e) => e.isLink && this.options.isAllowedUri(e.value, {
					defaultValidate: (e) => !!Y(e, n),
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
		return this.options.markdownLinks ? [Ln({
			type: this.type,
			isAllowedHref: (e) => this.options.isAllowedUri(e, {
				defaultValidate: (e) => !!Y(e, this.options.protocols),
				protocols: this.options.protocols,
				defaultProtocol: this.options.defaultProtocol
			}),
			findPlainUrls: e
		})] : [Te({
			find: e,
			type: this.type,
			getAttributes: (e) => ({ href: e.data?.href })
		})];
	},
	addProseMirrorPlugins() {
		let e = [], { protocols: t, defaultProtocol: n } = this.options;
		return this.options.autolink && e.push(Dn({
			type: this.type,
			defaultProtocol: this.options.defaultProtocol,
			validate: (e) => this.options.isAllowedUri(e, {
				defaultValidate: (e) => !!Y(e, t),
				protocols: t,
				defaultProtocol: n
			}),
			shouldAutoLink: this.options.shouldAutoLink
		})), e.push(On({
			type: this.type,
			editor: this.editor,
			openOnClick: this.options.openOnClick === "whenNotEditable" || this.options.openOnClick,
			enableClickSelection: this.options.enableClickSelection
		})), this.options.linkOnPaste && e.push(Rn({
			editor: this.editor,
			defaultProtocol: this.options.defaultProtocol,
			type: this.type,
			shouldAutoLink: this.options.shouldAutoLink
		})), e;
	}
}), Bn = Math.min, X = Math.max, Vn = Math.round, Hn = Math.floor, Z = (e) => ({
	x: e,
	y: e
}), Un = {
	left: "right",
	right: "left",
	bottom: "top",
	top: "bottom"
};
function Wn(e, t) {
	return typeof e == "function" ? e(t) : e;
}
function Q(e) {
	return e.split("-")[0];
}
function Gn(e) {
	return e.split("-")[1];
}
function Kn(e) {
	return e === "x" ? "y" : "x";
}
function qn(e) {
	return e === "y" ? "height" : "width";
}
function Jn(e) {
	let t = e[0];
	return t === "t" || t === "b" ? "y" : "x";
}
function Yn(e) {
	return Kn(Jn(e));
}
function Xn(e, t, n) {
	n === void 0 && (n = !1);
	let r = Gn(e), i = Yn(e), a = qn(i), o = i === "x" ? r === (n ? "end" : "start") ? "right" : "left" : r === "start" ? "bottom" : "top";
	return t.reference[a] > t.floating[a] && (o = ar(o)), [o, ar(o)];
}
function Zn(e) {
	let t = ar(e);
	return [
		Qn(e),
		t,
		Qn(t)
	];
}
function Qn(e) {
	return e.includes("start") ? e.replace("start", "end") : e.replace("end", "start");
}
var $n = ["left", "right"], er = ["right", "left"], tr = ["top", "bottom"], nr = ["bottom", "top"];
function rr(e, t, n) {
	switch (e) {
		case "top":
		case "bottom": return n ? t ? er : $n : t ? $n : er;
		case "left":
		case "right": return t ? tr : nr;
		default: return [];
	}
}
function ir(e, t, n, r) {
	let i = Gn(e), a = rr(Q(e), n === "start", r);
	return i && (a = a.map((e) => e + "-" + i), t && (a = a.concat(a.map(Qn)))), a;
}
function ar(e) {
	let t = Q(e);
	return Un[t] + e.slice(t.length);
}
function or(e) {
	return {
		top: e.top ?? 0,
		right: e.right ?? 0,
		bottom: e.bottom ?? 0,
		left: e.left ?? 0
	};
}
function sr(e) {
	return typeof e == "number" ? {
		top: e,
		right: e,
		bottom: e,
		left: e
	} : or(e);
}
function cr(e) {
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
//#region ../../../../../../../Users/connorhoehn/Projects/ui-components/node_modules/@floating-ui/core/dist/floating-ui.core.mjs
function lr(e, t, n) {
	let { reference: r, floating: i } = e, a = Jn(t), o = Yn(t), s = qn(o), c = Q(t), l = a === "y", u = r.x + r.width / 2 - i.width / 2, d = r.y + r.height / 2 - i.height / 2, f = r[s] / 2 - i[s] / 2, p;
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
	let m = Gn(t);
	return m && (p[o] += f * (m === "end" ? 1 : -1) * (n && l ? -1 : 1)), p;
}
async function ur(e, t) {
	t === void 0 && (t = {});
	let { x: n, y: r, platform: i, rects: a, elements: o, strategy: s } = e, { boundary: c = "clippingAncestors", rootBoundary: l = "viewport", elementContext: u = "floating", altBoundary: d = !1, padding: f = 0 } = Wn(t, e), p = sr(f), m = o[d ? u === "floating" ? "reference" : "floating" : u], h = cr(await i.getClippingRect({
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
	}, y = cr(i.convertOffsetParentRelativeRectToViewportRelativeRect ? await i.convertOffsetParentRelativeRectToViewportRelativeRect({
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
var dr = 50, fr = async (e, t, n) => {
	let { placement: r = "bottom", strategy: i = "absolute", middleware: a = [], platform: o } = n, s = o.detectOverflow ? o : {
		...o,
		detectOverflow: ur
	}, c = await (o.isRTL == null ? void 0 : o.isRTL(t)), l = await o.getElementRects({
		reference: e,
		floating: t,
		strategy: i
	}), { x: u, y: d } = lr(l, r, c), f = r, p = 0, m = {};
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
		}, x && p < dr && (p++, typeof x == "object" && (x.placement && (f = x.placement), x.rects && (l = x.rects === !0 ? await o.getElementRects({
			reference: e,
			floating: t,
			strategy: i
		}) : x.rects), {x: u, y: d} = lr(l, f, c)), n = -1);
	}
	return {
		x: u,
		y: d,
		placement: f,
		strategy: i,
		middlewareData: m
	};
}, pr = function(e) {
	return e === void 0 && (e = {}), {
		name: "flip",
		options: e,
		async fn(t) {
			var n;
			let { placement: r, middlewareData: i, rects: a, initialPlacement: o, platform: s, elements: c } = t, { mainAxis: l = !0, crossAxis: u = !0, fallbackPlacements: d, fallbackStrategy: f = "bestFit", fallbackAxisSideDirection: p = "none", flipAlignment: m = !0, ...h } = Wn(e, t);
			if ((n = i.arrow) != null && n.alignmentOffset) return {};
			let g = Q(r), _ = Jn(o), v = Q(o) === o, y = await (s.isRTL == null ? void 0 : s.isRTL(c.floating)), b = d || (v || !m ? [ar(o)] : Zn(o)), x = p !== "none";
			!d && x && b.push(...ir(o, m, p, y));
			let S = [o, ...b], C = await s.detectOverflow(t, h), w = [], ee = i.flip?.overflows || [];
			if (l && w.push(C[g]), u) {
				let e = Xn(r, a, y);
				w.push(C[e[0]], C[e[1]]);
			}
			if (ee = [...ee, {
				placement: r,
				overflows: w
			}], !w.every((e) => e <= 0)) {
				let e = (i.flip?.index || 0) + 1, t = S[e];
				if (t && (u !== "alignment" || _ === Jn(t) || ee.every((e) => Jn(e.placement) !== _ || e.overflows[0] > 0))) return {
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
								let t = Jn(e.placement);
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
}, mr = /*#__PURE__*/ new Set(["left", "top"]);
async function hr(e, t) {
	let { placement: n, platform: r, elements: i } = e, a = await (r.isRTL == null ? void 0 : r.isRTL(i.floating)), o = Q(n), s = Gn(n), c = Jn(n) === "y", l = mr.has(o) ? -1 : 1, u = a && c ? -1 : 1, d = Wn(t, e), { mainAxis: f, crossAxis: p, alignmentAxis: m } = typeof d == "number" ? {
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
var gr = function(e) {
	return e === void 0 && (e = 0), {
		name: "offset",
		options: e,
		async fn(t) {
			var n;
			let { x: r, y: i, placement: a, middlewareData: o } = t, s = await hr(t, e);
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
//#region ../../../../../../../Users/connorhoehn/Projects/ui-components/node_modules/@floating-ui/utils/dist/floating-ui.utils.dom.mjs
function _r() {
	return typeof window < "u";
}
function vr(e) {
	return br(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function $(e) {
	var t;
	return (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function yr(e) {
	return ((br(e) ? e.ownerDocument : e.document) || window.document)?.documentElement;
}
function br(e) {
	return _r() ? e instanceof Node || e instanceof $(e).Node : !1;
}
function xr(e) {
	return _r() ? e instanceof Element || e instanceof $(e).Element : !1;
}
function Sr(e) {
	return _r() ? e instanceof HTMLElement || e instanceof $(e).HTMLElement : !1;
}
function Cr(e) {
	return !_r() || typeof ShadowRoot > "u" ? !1 : e instanceof ShadowRoot || e instanceof $(e).ShadowRoot;
}
function wr(e) {
	let { overflow: t, overflowX: n, overflowY: r, display: i } = Fr(e);
	return /auto|scroll|overlay|hidden|clip/.test(t + r + n) && i !== "inline" && i !== "contents";
}
function Tr(e) {
	return /^(table|td|th)$/.test(vr(e));
}
function Er(e) {
	try {
		if (e.matches(":popover-open")) return !0;
	} catch {}
	try {
		return e.matches(":modal");
	} catch {
		return !1;
	}
}
var Dr = /transform|translate|scale|rotate|perspective|filter/, Or = /paint|layout|strict|content/, kr = (e) => !!e && e !== "none", Ar;
function jr(e) {
	let t = xr(e) ? Fr(e) : e;
	return kr(t.transform) || kr(t.translate) || kr(t.scale) || kr(t.rotate) || kr(t.perspective) || !Nr() && (kr(t.backdropFilter) || kr(t.filter)) || Dr.test(t.willChange || "") || Or.test(t.contain || "");
}
function Mr(e) {
	let t = Lr(e);
	for (; Sr(t) && !Pr(t);) {
		if (jr(t)) return t;
		if (Er(t)) return null;
		t = Lr(t);
	}
	return null;
}
function Nr() {
	return Ar ??= typeof CSS < "u" && CSS.supports && CSS.supports("-webkit-backdrop-filter", "none"), Ar;
}
function Pr(e) {
	return /^(html|body|#document)$/.test(vr(e));
}
function Fr(e) {
	return $(e).getComputedStyle(e);
}
function Ir(e) {
	return xr(e) ? {
		scrollLeft: e.scrollLeft,
		scrollTop: e.scrollTop
	} : {
		scrollLeft: e.scrollX,
		scrollTop: e.scrollY
	};
}
function Lr(e) {
	if (vr(e) === "html") return e;
	let t = e.assignedSlot || e.parentNode || Cr(e) && e.host || yr(e);
	return Cr(t) ? t.host : t;
}
function Rr(e) {
	let t = Lr(e);
	return Pr(t) ? (e.ownerDocument || e).body : Sr(t) && wr(t) ? t : Rr(t);
}
function zr(e, t, n) {
	t === void 0 && (t = []), n === void 0 && (n = !0);
	let r = Rr(e), i = r === e.ownerDocument?.body, a = $(r);
	if (i) {
		let e = Br(a);
		return t.concat(a, a.visualViewport || [], wr(r) ? r : [], e && n ? zr(e) : []);
	}
	return t.concat(r, zr(r, [], n));
}
function Br(e) {
	return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
//#endregion
//#region ../../../../../../../Users/connorhoehn/Projects/ui-components/node_modules/@floating-ui/dom/dist/floating-ui.dom.mjs
function Vr(e) {
	let t = Fr(e), n = parseFloat(t.width) || 0, r = parseFloat(t.height) || 0, i = Sr(e), a = i ? e.offsetWidth : n, o = i ? e.offsetHeight : r, s = Vn(n) !== a || Vn(r) !== o;
	return s && (n = a, r = o), {
		width: n,
		height: r,
		$: s
	};
}
function Hr(e) {
	return xr(e) ? e : e.contextElement;
}
function Ur(e) {
	let t = Hr(e);
	if (!Sr(t)) return Z(1);
	let n = t.getBoundingClientRect(), { width: r, height: i, $: a } = Vr(t), o = (a ? Vn(n.width) : n.width) / r, s = (a ? Vn(n.height) : n.height) / i;
	return (!o || !Number.isFinite(o)) && (o = 1), (!s || !Number.isFinite(s)) && (s = 1), {
		x: o,
		y: s
	};
}
var Wr = /*#__PURE__*/ Z(0);
function Gr(e) {
	let t = $(e);
	return !Nr() || !t.visualViewport ? Wr : {
		x: t.visualViewport.offsetLeft,
		y: t.visualViewport.offsetTop
	};
}
function Kr(e, t, n) {
	return t === void 0 && (t = !1), !!n && t && n === $(e);
}
function qr(e, t, n, r) {
	t === void 0 && (t = !1), n === void 0 && (n = !1);
	let i = e.getBoundingClientRect(), a = Hr(e), o = Z(1);
	t && (r ? xr(r) && (o = Ur(r)) : o = Ur(e));
	let s = Kr(a, n, r) ? Gr(a) : Z(0), c = (i.left + s.x) / o.x, l = (i.top + s.y) / o.y, u = i.width / o.x, d = i.height / o.y;
	if (a && r) {
		let e = $(a), t = xr(r) ? $(r) : r, n = e, i = Br(n);
		for (; i && t !== n;) {
			let e = Ur(i), t = i.getBoundingClientRect(), r = Fr(i), a = t.left + (i.clientLeft + parseFloat(r.paddingLeft)) * e.x, o = t.top + (i.clientTop + parseFloat(r.paddingTop)) * e.y;
			c *= e.x, l *= e.y, u *= e.x, d *= e.y, c += a, l += o, n = $(i), i = Br(n);
		}
	}
	return cr({
		width: u,
		height: d,
		x: c,
		y: l
	});
}
function Jr(e, t) {
	let n = Ir(e).scrollLeft;
	return t ? t.left + n : qr(yr(e)).left + n;
}
function Yr(e, t) {
	let n = e.getBoundingClientRect();
	return {
		x: n.left + t.scrollLeft - Jr(e, n),
		y: n.top + t.scrollTop
	};
}
function Xr(e) {
	let { elements: t, rect: n, offsetParent: r, strategy: i } = e, a = i === "fixed", o = yr(r), s = t ? Er(t.floating) : !1;
	if (r === o || s && a) return n;
	let c = {
		scrollLeft: 0,
		scrollTop: 0
	}, l = Z(1), u = Z(0), d = Sr(r);
	if ((d || !a) && ((vr(r) !== "body" || wr(o)) && (c = Ir(r)), d)) {
		let e = qr(r);
		l = Ur(r), u.x = e.x + r.clientLeft, u.y = e.y + r.clientTop;
	}
	let f = o && !d && !a ? Yr(o, c) : Z(0);
	return {
		width: n.width * l.x,
		height: n.height * l.y,
		x: n.x * l.x - c.scrollLeft * l.x + u.x + f.x,
		y: n.y * l.y - c.scrollTop * l.y + u.y + f.y
	};
}
function Zr(e) {
	return e.getClientRects ? Array.from(e.getClientRects()) : [];
}
function Qr(e) {
	let t = Ir(e), n = e.ownerDocument.body, r = X(e.scrollWidth, e.clientWidth, n.scrollWidth, n.clientWidth), i = X(e.scrollHeight, e.clientHeight, n.scrollHeight, n.clientHeight), a = -t.scrollLeft + Jr(e), o = -t.scrollTop;
	return Fr(n).direction === "rtl" && (a += X(e.clientWidth, n.clientWidth) - r), {
		width: r,
		height: i,
		x: a,
		y: o
	};
}
var $r = 25;
function ei(e, t, n) {
	n === void 0 && (n = "viewport");
	let r = n === "layoutViewport", i = $(e), a = yr(e), o = i.visualViewport, s = a.clientWidth, c = a.clientHeight, l = 0, u = 0;
	if (o) {
		let e = !Nr() || t === "fixed";
		r ? e || (l = -o.offsetLeft, u = -o.offsetTop) : (s = o.width, c = o.height, e && (l = o.offsetLeft, u = o.offsetTop));
	}
	if (Jr(a) <= 0) {
		let e = a.ownerDocument, t = e.body, n = getComputedStyle(t), r = e.compatMode === "CSS1Compat" && parseFloat(n.marginLeft) + parseFloat(n.marginRight) || 0, i = Math.abs(a.clientWidth - t.clientWidth - r), o = getComputedStyle(a).scrollbarGutter === "stable both-edges" ? i / 2 : i;
		o <= $r && (s -= o);
	}
	return {
		width: s,
		height: c,
		x: l,
		y: u
	};
}
function ti(e, t) {
	let n = qr(e, !0, t === "fixed"), r = n.top + e.clientTop, i = n.left + e.clientLeft, a = Ur(e);
	return {
		width: e.clientWidth * a.x,
		height: e.clientHeight * a.y,
		x: i * a.x,
		y: r * a.y
	};
}
function ni(e, t, n) {
	let r;
	if (t === "viewport" || t === "layoutViewport") r = ei(e, n, t);
	else if (t === "document") r = Qr(yr(e));
	else if (xr(t)) r = ti(t, n);
	else {
		let n = Gr(e);
		r = {
			x: t.x - n.x,
			y: t.y - n.y,
			width: t.width,
			height: t.height
		};
	}
	return cr(r);
}
function ri(e, t) {
	let n = t.get(e);
	if (n) return n;
	let r = zr(e, [], !1).filter((e) => xr(e) && vr(e) !== "body"), i = null, a = Fr(e).position === "fixed", o = a ? Lr(e) : e;
	for (; xr(o) && !Pr(o);) {
		let e = Fr(o), t = jr(o), n = i ? i.position : a ? "fixed" : "";
		!t && (n === "fixed" || n === "absolute" && e.position === "static") ? r = r.filter((e) => e !== o) : i = e, o = Lr(o);
	}
	return t.set(e, r), r;
}
function ii(e) {
	let { element: t, boundary: n, rootBoundary: r, strategy: i } = e, a = [...n === "clippingAncestors" ? Er(t) ? [] : ri(t, this._c) : [].concat(n), r], o = ni(t, a[0], i), s = o.top, c = o.right, l = o.bottom, u = o.left;
	for (let e = 1; e < a.length; e++) {
		let n = ni(t, a[e], i);
		s = X(n.top, s), c = Bn(n.right, c), l = Bn(n.bottom, l), u = X(n.left, u);
	}
	return {
		width: c - u,
		height: l - s,
		x: u,
		y: s
	};
}
function ai(e) {
	let { width: t, height: n } = Vr(e);
	return {
		width: t,
		height: n
	};
}
function oi(e, t, n) {
	let r = Sr(t), i = yr(t), a = n === "fixed", o = qr(e, !0, a, t), s = {
		scrollLeft: 0,
		scrollTop: 0
	}, c = Z(0);
	if ((r || !a) && ((vr(t) !== "body" || wr(i)) && (s = Ir(t)), r)) {
		let e = qr(t, !0, a, t);
		c.x = e.x + t.clientLeft, c.y = e.y + t.clientTop;
	}
	!r && i && (c.x = Jr(i));
	let l = i && !r && !a ? Yr(i, s) : Z(0);
	return {
		x: o.left + s.scrollLeft - c.x - l.x,
		y: o.top + s.scrollTop - c.y - l.y,
		width: o.width,
		height: o.height
	};
}
function si(e) {
	return Fr(e).position === "static";
}
function ci(e, t) {
	if (!Sr(e) || Fr(e).position === "fixed") return null;
	if (t) return t(e);
	let n = e.offsetParent;
	return yr(e) === n && (n = n.ownerDocument.body), n;
}
function li(e, t) {
	let n = $(e);
	if (Er(e)) return n;
	if (!Sr(e)) {
		let t = Lr(e);
		for (; t && !Pr(t);) {
			if (xr(t) && !si(t)) return t;
			t = Lr(t);
		}
		return n;
	}
	let r = ci(e, t);
	for (; r && Tr(r) && si(r);) r = ci(r, t);
	return r && Pr(r) && si(r) && !jr(r) ? n : r || Mr(e) || n;
}
var ui = async function(e) {
	let t = this.getOffsetParent || li, n = this.getDimensions, r = await n(e.floating);
	return {
		reference: oi(e.reference, await t(e.floating), e.strategy),
		floating: {
			x: 0,
			y: 0,
			width: r.width,
			height: r.height
		}
	};
};
function di(e) {
	return Fr(e).direction === "rtl";
}
var fi = {
	convertOffsetParentRelativeRectToViewportRelativeRect: Xr,
	getDocumentElement: yr,
	getClippingRect: ii,
	getOffsetParent: li,
	getElementRects: ui,
	getClientRects: Zr,
	getDimensions: ai,
	getScale: Ur,
	isElement: xr,
	isRTL: di
};
function pi(e, t) {
	return e.x === t.x && e.y === t.y && e.width === t.width && e.height === t.height;
}
function mi(e, t, n) {
	let r = null, i, a = yr(e);
	function o() {
		var e;
		clearTimeout(i), (e = r) == null || e.disconnect(), r = null;
	}
	function s(n, c) {
		n === void 0 && (n = !1), c === void 0 && (c = 1), o();
		let l = e.getBoundingClientRect(), { left: u, top: d, width: f, height: p } = l;
		if (n || t(), !f || !p) return;
		let m = Hn(d), h = Hn(a.clientWidth - (u + f)), g = Hn(a.clientHeight - (d + p)), _ = Hn(u), v = {
			rootMargin: -m + "px " + -h + "px " + -g + "px " + -_ + "px",
			threshold: X(0, Bn(1, c)) || 1
		}, y = !0;
		function b(t) {
			let n = t[0].intersectionRatio;
			if (!pi(l, e.getBoundingClientRect())) return s();
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
function hi(e, t, n, r) {
	r === void 0 && (r = {});
	let { ancestorScroll: i = !0, ancestorResize: a = !0, elementResize: o = typeof ResizeObserver == "function", layoutShift: s = typeof IntersectionObserver == "function", animationFrame: c = !1 } = r, l = Hr(e), u = i || a ? [...l ? zr(l) : [], ...t ? zr(t) : []] : [];
	u.forEach((e) => {
		i && e.addEventListener("scroll", n), a && e.addEventListener("resize", n);
	});
	let d = l && s ? mi(l, n, a) : null, f = -1, p = null;
	o && (p = new ResizeObserver((e) => {
		let [r] = e;
		r && r.target === l && p && t && (p.unobserve(t), cancelAnimationFrame(f), f = requestAnimationFrame(() => {
			var e;
			(e = p) == null || e.observe(t);
		})), n();
	}), l && !c && p.observe(l), t && p.observe(t));
	let m, h = c ? qr(e) : null;
	c && g();
	function g() {
		let t = qr(e);
		h && !pi(h, t) && n(), h = t, m = requestAnimationFrame(g);
	}
	return n(), () => {
		var e;
		u.forEach((e) => {
			i && e.removeEventListener("scroll", n), a && e.removeEventListener("resize", n);
		}), d?.(), (e = p) == null || e.disconnect(), p = null, c && cancelAnimationFrame(m);
	};
}
var gi = gr, _i = pr, vi = (e, t, n) => {
	let r = /* @__PURE__ */ new Map(), i = n ?? {}, a = {
		...fi,
		...i.platform,
		_c: r
	};
	return fr(e, t, {
		...i,
		platform: a
	});
};
//#endregion
//#region ../../../../../../../Users/connorhoehn/Projects/ui-components/node_modules/@tiptap/suggestion/dist/index.js
function yi(e) {
	let { char: t, allowSpaces: n, allowToIncludeChar: r, allowedPrefixes: i, startOfLine: a, $position: o } = e, s = n && !r, c = ye(t), l = RegExp(`\\s${c}$`), u = a ? "^" : "", d = r ? "" : c, f = RegExp(s ? `${u}${c}.*?(?=\\s${d}|$)` : `${u}(?:^)?${c}[^\\s${d}]*`, "gm"), p = o.nodeBefore?.isText && o.nodeBefore.text;
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
function bi(e) {
	return e.docChanged ? e.steps.some((e) => {
		let t = e.slice;
		if (!t?.content) return !1;
		let n = t.content.textBetween(0, t.content.size, "\n");
		return /\s/.test(n);
	}) : !1;
}
function xi(e) {
	return () => {
		let t = e.state.selection.$anchor.pos, { top: n, right: r, bottom: i, left: a } = e.view.coordsAtPos(t);
		try {
			return new DOMRect(a, n, r - a, i - n);
		} catch {
			return null;
		}
	};
}
function Si(e, t, n, r) {
	return n ? () => {
		let n = r.getState(e.state)?.decorationId;
		return t.dom.querySelector(`[data-decoration-id="${n}"]`)?.getBoundingClientRect() || null;
	} : xi(e);
}
function Ci({ match: e, dismissedRange: t, state: n, transaction: r, editor: i, shouldResetDismissed: a, effectiveAllowSpaces: o }) {
	return a?.({
		editor: i,
		state: n,
		range: t,
		match: e,
		transaction: r,
		allowSpaces: o
	}) ? !1 : o ? e.range.from === t.from : e.range.from === t.from && !bi(r);
}
function wi({ view: e, pluginKeyRef: t }) {
	let n = e.state.tr.setMeta(t, { exit: !0 });
	e.dispatch(n);
}
function Ti({ pluginKey: e, decorationTag: t, decorationClass: n, decorationContent: r, decorationEmptyClass: i, renderer: a, dispatchExit: o }) {
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
			return u && d.push(i), Ae.create(a.doc, [ke.inline(s.from, s.to, {
				nodeName: t,
				class: d.join(" "),
				"data-decoration-id": c || void 0,
				"data-decoration-content": r
			})]);
		}
	};
}
function Ei({ editor: e, char: t, effectiveAllowSpaces: n, allowToIncludeChar: r, allowedPrefixes: i, startOfLine: a, findSuggestionMatch: o, allow: s, shouldShow: c, shouldKeepDismissed: l, pluginKey: u }) {
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
function Di({ editor: e, items: t }) {
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
function Oi({ placement: e, offset: t, flip: n, floatingUi: r }) {
	let i = [gi({
		mainAxis: t.mainAxis ?? 4,
		crossAxis: t.crossAxis ?? 0
	})];
	return n && i.push(_i()), r?.middleware?.length && i.push(...r.middleware), {
		placement: e,
		strategy: r?.strategy ?? "absolute",
		middleware: i
	};
}
function ki(e) {
	if (e instanceof HTMLElement) return e;
	if (typeof e == "string") try {
		let t = document.querySelector(e);
		if (t) return t;
	} catch {
		return document.body;
	}
	return document.body;
}
function Ai({ getReferenceRect: e, contextElement: t, config: n, container: r, dismissOnOutsideClick: i, dismiss: a }) {
	return (o, s = {}) => {
		let c = {
			getBoundingClientRect: () => e() ?? new DOMRect(),
			contextElement: t
		}, l = !1, u = !o.isConnected;
		u && ki(r).appendChild(o), s.onPosition || (o.style.visibility = "hidden", o.style.width = "max-content");
		let d = hi(c, o, () => {
			vi(c, o, {
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
function ji({ editor: e, pluginKey: t, items: n, renderer: r, minQueryLength: i, debounce: a, initialItems: o, placement: s, offset: c, container: l, flip: u, floatingUi: d, dismissOnOutsideClick: f, command: p, clientRectFor: m, dispatchExit: h }) {
	let g, _ = Di({
		editor: e,
		items: n
	}), v = Oi({
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
			let w = null, ee = S.query !== C.query, te = S.text !== C.text, ne = S.range.from !== C.range.from || S.range.to !== C.range.to, re = ee || te || ne;
			if (!S.active && C.active) w = "started";
			else if (S.active && !C.active) w = "stopped";
			else if (C.active && re) w = "updated";
			else return;
			let T = w === "stopped" ? S : C, ie = n.dom.querySelector(`[data-decoration-id="${T.decorationId}"]`), E = m(n, ie), ae = i === 0 || (T.query ? T.query.length >= i : !1), oe = (w === "started" || w === "updated") && ae;
			if (g = {
				editor: e,
				range: T.range,
				query: T.query || "",
				text: T.text || "",
				items: o ?? [],
				command: (t) => p({
					editor: e,
					range: T.range,
					props: t
				}),
				decorationNode: ie,
				clientRect: E,
				loading: oe,
				placement: s,
				offset: {
					mainAxis: c.mainAxis ?? 4,
					crossAxis: c.crossAxis ?? 0
				},
				container: l,
				flip: u,
				floatingUi: v,
				mount: Ai({
					getReferenceRect: E,
					contextElement: n.dom,
					config: v,
					container: l,
					dismissOnOutsideClick: f,
					dismiss: () => h(e.view)
				})
			}, w === "started" && ((b = r?.onBeforeStart) == null || b.call(r, g)), w === "updated" && ((x = r?.onBeforeUpdate) == null || x.call(r, g)), w === "started" && y(w, g), w === "started" || w === "updated") {
				if (!oe) _.abort(), g = {
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
					let e = await _.fetch(T.query || "", a);
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
var Mi = new j("suggestion");
function Ni({ pluginKey: e = Mi, editor: t, char: n = "@", allowSpaces: r = !1, allowToIncludeChar: i = !1, allowedPrefixes: a = [" "], startOfLine: o = !1, decorationTag: s = "span", decorationClass: c = "suggestion", decorationContent: l = "", decorationEmptyClass: u = "is-empty", command: d = () => null, items: f = () => [], minQueryLength: p = 0, debounce: m = 0, initialItems: h, placement: g = "bottom-start", offset: _ = {}, container: v, flip: y = !0, floatingUi: b, dismissOnOutsideClick: x = !0, render: S = () => ({}), allow: C = () => !0, findSuggestionMatch: w = yi, shouldShow: ee, shouldResetDismissed: te }) {
	let ne = S?.(), re = r && !i, T = (n, r) => Si(t, n, r, e);
	function ie(e) {
		return Ci({
			...e,
			editor: t,
			shouldResetDismissed: te,
			effectiveAllowSpaces: re
		});
	}
	let E = (t) => wi({
		view: t,
		pluginKeyRef: e
	});
	return new De({
		key: e,
		view: () => ji({
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
			clientRectFor: T,
			dispatchExit: E
		}),
		state: Ei({
			editor: t,
			char: n,
			effectiveAllowSpaces: re,
			allowToIncludeChar: i,
			allowedPrefixes: a,
			startOfLine: o,
			findSuggestionMatch: w,
			allow: C,
			shouldShow: ee,
			shouldKeepDismissed: ie,
			pluginKey: e
		}),
		props: Ti({
			pluginKey: e,
			decorationTag: s,
			decorationClass: c,
			decorationContent: l,
			decorationEmptyClass: u,
			renderer: ne,
			dispatchExit: E
		})
	});
}
var Pi = Ni;
//#endregion
//#region src/components/social/ComposerAttachments.tsx
function Fi(e) {
	return e < 1024 ? `${e} B` : e < 1048576 ? `${Math.round(e / 1024)} KB` : `${(e / 1048576).toFixed(1)} MB`;
}
function Ii({ file: e }) {
	let [t, n] = O(null);
	return E(() => {
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
		children: /* @__PURE__ */ k(o, { size: 16 })
	});
}
function Li({ files: t, onRemove: n, disabled: r = !1, className: i, "data-testid": a = "composer-attachments" }) {
	return t.length === 0 ? null : /* @__PURE__ */ k("ul", {
		"data-testid": a,
		"aria-label": "Attachments",
		className: e("m-0 flex list-none flex-wrap gap-1.5 px-2 pt-2", i),
		children: t.map(({ id: e, file: t }) => /* @__PURE__ */ A("li", {
			"data-testid": "composer-attachment",
			className: "flex items-center gap-2 rounded-lg border border-border bg-surface-inset py-1 pl-1 pr-1.5",
			children: [
				/* @__PURE__ */ k(Ii, { file: t }),
				/* @__PURE__ */ A("span", {
					className: "flex min-w-0 flex-col",
					children: [/* @__PURE__ */ k("span", {
						className: "max-w-[11rem] truncate text-xs text-text-primary",
						title: t.name,
						children: t.name
					}), /* @__PURE__ */ k("span", {
						className: "text-[11px] text-text-tertiary",
						children: Fi(t.size)
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
var Ri = T(function({ items: t, command: n, onPickNonMember: r }, i) {
	let [a, o] = O(0), s = t.filter((e) => e.member !== !1), c = t.filter((e) => e.member === !1), l = [...s, ...c];
	E(() => o(0), [t]);
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
	return ae(i, () => ({ onKeyDown: ({ event: e }) => e.key === "ArrowUp" ? (o((e) => (e + l.length - 1) % l.length), !0) : e.key === "ArrowDown" ? (o((e) => (e + 1) % l.length), !0) : e.key === "Enter" || e.key === "Tab" ? (u(a), !0) : !1 })), t.length === 0 ? null : /* @__PURE__ */ k("div", {
		"data-testid": "mention-suggestions",
		role: "listbox",
		"aria-label": "People",
		className: "max-h-56 w-64 overflow-y-auto rounded-lg border border-border bg-surface py-1 shadow-lg",
		children: l.map((t, n) => /* @__PURE__ */ A(re, { children: [n === s.length && c.length > 0 && /* @__PURE__ */ k("div", {
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
				/* @__PURE__ */ k(p, {
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
}), zi = T(function({ items: t, command: n }, r) {
	let [i, a] = O(0);
	E(() => a(0), [t]);
	let s = (e) => {
		let r = t[e];
		r && n({
			id: r.id,
			label: r.label
		});
	};
	return ae(r, () => ({ onKeyDown: ({ event: e }) => t.length === 0 ? !1 : e.key === "ArrowUp" ? (a((e) => (e + t.length - 1) % t.length), !0) : e.key === "ArrowDown" ? (a((e) => (e + 1) % t.length), !0) : e.key === "Enter" || e.key === "Tab" ? (s(i), !0) : !1 })), t.length === 0 ? null : /* @__PURE__ */ k("div", {
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
			onMouseEnter: () => a(n),
			className: e("flex w-full items-center gap-2 px-2 py-1.5 text-left text-sm", n === i ? "bg-surface-hover" : "bg-transparent"),
			children: [/* @__PURE__ */ k("span", {
				"aria-hidden": "true",
				className: e("w-6 shrink-0 text-center leading-none", t.icon ? "text-base" : "text-text-tertiary"),
				children: t.icon || /* @__PURE__ */ k(o, {
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
}), Bi = T(function({ items: t, command: n }, r) {
	let [i, a] = O(0);
	E(() => a(0), [t]);
	let o = (e) => {
		let r = t[e];
		r && n({ emoji: r.emoji });
	};
	return ae(r, () => ({ onKeyDown: ({ event: e }) => e.key === "ArrowUp" ? (a((e) => (e + t.length - 1) % t.length), !0) : e.key === "ArrowDown" ? (a((e) => (e + 1) % t.length), !0) : e.key === "Enter" || e.key === "Tab" ? (o(i), !0) : !1 })), t.length === 0 ? null : /* @__PURE__ */ k("div", {
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
function Vi(e, t) {
	return !e?.code || t === void 0 ? !1 : t.trim().toLowerCase() === e.code.toLowerCase();
}
function Hi(e) {
	return e.code && e.label === e.code && e.description ? e.description : e.label;
}
function Ui(e) {
	if (!(e.hint && e.hint === Hi(e))) return e.hint;
}
var Wi = T(function({ items: t, command: n, label: r = "Commands", draft: i }, a) {
	let [o, s] = O(0);
	E(() => s(0), [t]);
	let c = (e) => {
		let r = t[e];
		r && n(r);
	};
	if (ae(a, () => ({ onKeyDown: ({ event: e }) => t.length === 0 ? !1 : e.key === "ArrowUp" ? (s((e) => (e + t.length - 1) % t.length), !0) : e.key === "ArrowDown" ? (s((e) => (e + 1) % t.length), !0) : e.key === "Enter" && Vi(t[o], i) ? !1 : e.key === "Enter" || e.key === "Tab" ? (c(o), !0) : !1 })), t.length === 0) return null;
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
						children: Hi(t)
					}),
					Ui(t) && /* @__PURE__ */ k("span", {
						className: "shrink-0 max-w-[45%] truncate text-xs text-text-tertiary",
						children: Ui(t)
					})
				]
			}, t.id))
		}), l && /* @__PURE__ */ k("div", {
			"data-testid": "command-description",
			className: "truncate border-t border-border px-2 pt-1 text-xs text-text-secondary",
			children: l
		})]
	});
}), Gi = {
	narrow: 380,
	wide: 600
};
function Ki(e) {
	return e === null ? "wide" : e < Gi.narrow ? "narrow" : e < Gi.wide ? "medium" : "wide";
}
var qi = {
	none: "0px",
	sm: "4px",
	md: "6px",
	lg: "8px",
	xl: "12px"
}, Ji = {
	visible: "Visible to everyone",
	hidden: "Only you"
}, Yi = [
	"chat",
	"agent",
	"terminal"
], Xi = {
	chat: "Chat",
	agent: "Agent",
	terminal: "Terminal"
}, Zi = {
	chat: /* @__PURE__ */ k(l, { size: 13 }),
	agent: /* @__PURE__ */ k(n, { size: 13 }),
	terminal: /* @__PURE__ */ k("span", {
		className: "font-mono text-[11px]",
		children: ">_"
	})
}, Qi = ">", $i = "/run";
function ea(e, t) {
	return t ? e === `${t} ` || e === `${t}\u00a0` || e === t && t.length === 1 && !/[\p{L}\p{N}]/u.test(t) : !1;
}
var ta = {
	chat: "Write a message…",
	agent: "Tell the agent what to do… (budget and model in the status line)",
	terminal: "$ command in the cloud shell"
}, na = {
	info: "bg-info",
	success: "bg-success",
	warning: "bg-warning",
	danger: "bg-danger"
}, ra = {
	running: "bg-info animate-pulse motion-reduce:animate-none",
	idle: "bg-border-emphasis",
	failed: "bg-danger",
	done: "bg-success"
};
function ia() {
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
function aa(e, t) {
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
function oa(e) {
	return aa(e, "mention");
}
function sa(e) {
	return aa(e, "docref");
}
function ca({ state: e, range: t }) {
	let n = e.doc.resolve(t.from);
	if (n.parentOffset === 0) return !0;
	let r = n.parent.textBetween(n.parentOffset - 1, n.parentOffset, void 0, "\0");
	return r === "" || /[\s\0(\[{"'“‘]/.test(r);
}
var la = Oe.extend({ name: "docref" }), ua = new j("docrefSuggestion"), da = 0, fa = new j("commandSuggestion"), pa = new j("commandArgumentSuggestion");
function ma(e, t, n = !1) {
	let r = null, i = [], a = ia(), o = (r) => {
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
			i = [], r = new ue(Wi, {
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
var ha = T(function({ onSend: o, draft: p, onDraftChange: re, onCommand: T, onSearchPeople: he, mentionMembers: ge, onMentionNonMember: _e, onSearchDocuments: ve, allowAttachments: ye = !1, allowEmoji: be = !1, onRequestLink: xe, placeholder: Se = "Write a message…", commands: Ce, privacy: we = "visible", onPrivacyChange: Te, privacyLabels: Ee, disabled: De = !1, references: j, onRemoveReference: ke, toolbarExtras: Ae, processes: je, mode: Me = "chat", onModeChange: Ne, fixedMode: Pe, modePlaceholders: Fe, hints: Ie, onQuickOpen: Le, sendOptions: Re, onSendOption: ze, onShellCommand: Be, modeControl: Ve = "tabs", modeShortcuts: He = !1, modeTriggers: Ue, disabledModes: We, modeUnavailableReasons: Ge, modeHints: M, submitLead: N, submitLabel: P, radius: Ke, backdropTone: F = "auto", working: qe, maxInputHeight: Je, layout: Ye = "auto", density: Xe = "comfortable", status: I, suggestions: Ze, onSuggestion: Qe, modeRowEnd: $e, collapseWhenIdle: et = !1, className: tt, "data-testid": L = "rich-chat-composer" }, nt) {
	let rt = D(() => {}), it = D(() => {}), at = D(null), ot = D(null), [st, ct] = O(!1), [lt, ut] = O({
		open: !1,
		href: "",
		text: ""
	}), dt = D(p), ft = D(re);
	ft.current = re;
	let [pt, mt] = O(() => (p?.files ?? []).map((e) => ({
		id: `staged-${da++}`,
		file: e
	}))), ht = D(pt), gt = D(() => {}), _t = D(!1), vt = D(!0);
	E(() => (vt.current = !0, () => {
		vt.current = !1;
	}), []);
	let [yt, bt] = O(!1), [xt, St] = O(!1), R = De || yt, [Ct, wt] = O(!0), Tt = ye && !R, Et = !!Ne || !!Pe, z = Pe ?? (Et ? Me : "chat"), B = z === "terminal", Dt = Et && z !== "chat", Ot = Fe?.[z] ?? (z === "chat" ? Se : ta[z]), V = !!Ne && !Pe, kt = D(null), At = D(!1), [jt, Mt] = O(null), Nt = (e) => !!We?.includes(e), Pt = (e) => V ? Nt(e) ? (Mt(Ge?.[e] ?? `${Xi[e]} is not available here`), !1) : (Mt(null), e !== z && (At.current = !0, Ne?.(e)), !0) : !1, Ft = Ue && V ? {
		terminal: (typeof Ue == "object" ? Ue.terminalPrefix : void 0) ?? Qi,
		agent: (typeof Ue == "object" ? Ue.agentPrefix : void 0) ?? $i
	} : null, It = D(() => !1);
	It.current = (e) => {
		if (!Ft) return jt && Mt(null), !1;
		let t = e.getText(), n = null;
		return z !== "terminal" && ea(t, Ft.terminal) ? n = "terminal" : z !== "agent" && ea(t, Ft.agent) && (n = "agent"), n ? Pt(n) ? (e.commands.clearContent(!0), !0) : !1 : (jt && Mt(null), !1);
	};
	let Lt = D(Ot);
	Lt.current = Ot;
	let H = D(Ce);
	H.current = Ce;
	let Rt = D(he);
	Rt.current = he;
	let zt = D(ge);
	zt.current = ge;
	let Bt = D(_e);
	Bt.current = _e;
	let Vt = !!he, Ht = D(ve);
	Ht.current = ve;
	let Ut = !!ve, Wt = D(T);
	Wt.current = T;
	let U = D(p?.command?.argument ? {
		trigger: p.command.trigger,
		item: p.command.argument
	} : null), [W, Gt] = O(null), [Kt, qt] = O(!0);
	E(() => {
		let e = Jt.current;
		if (!e || e.isDestroyed) return;
		let t = C(e.getText(), Ce);
		Gt((e) => e?.trigger === t?.trigger && e?.disabled === t?.disabled ? e : t);
	}, [Ce]);
	let Jt = D(null), Yt = se(() => {
		let e = [
			fe.configure({
				heading: !1,
				horizontalRule: !1,
				link: !1
			}),
			pe.configure({ placeholder: () => Lt.current }),
			zn.configure({
				openOnClick: !1,
				autolink: !0,
				HTMLAttributes: {
					rel: "noopener noreferrer nofollow",
					target: "_blank"
				}
			}),
			me.create({
				name: "emojiSuggestion",
				priority: 101,
				addProseMirrorPlugins() {
					return [Pi({
						editor: this.editor,
						char: ":",
						allow: ({ state: e, range: t }) => e.doc.textBetween(t.from, t.to, "\0").length >= 3,
						items: ({ query: e }) => w(e),
						command: ({ editor: e, range: t, props: n }) => {
							e.chain().focus().deleteRange(t).insertContent(n.emoji).run();
						},
						render: () => {
							let e = null, t = ia();
							return {
								onStart: (n) => {
									e = new ue(Bi, {
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
			me.create({
				name: "commandSuggestion",
				priority: 101,
				addProseMirrorPlugins() {
					return [Pi({
						pluginKey: fa,
						editor: this.editor,
						char: "/",
						allow: ({ state: e, range: t }) => e.doc.textBetween(0, t.from, "\n", "\0").trim() === "",
						items: ({ query: e }) => {
							let t = e.toLowerCase();
							return (H.current ?? []).filter((e) => !e.disabled && e.trigger.slice(1).toLowerCase().startsWith(t)).map((e) => ({
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
						render: () => ma("Commands", !1, !0)
					})];
				}
			}),
			me.create({
				name: "commandArgumentSuggestion",
				priority: 101,
				addProseMirrorPlugins() {
					return [Pi({
						pluginKey: pa,
						editor: this.editor,
						debounce: 120,
						findSuggestionMatch: ({ $position: e }) => {
							if (e.depth !== 1 || e.index(0) !== 0) return null;
							let t = e.parent.textBetween(0, e.parentOffset, void 0, "\0"), n = C(t, H.current);
							if (!n?.argument) return null;
							let r = t.length - t.trimStart().length + n.trigger.length + 1;
							if (e.parentOffset < r) return null;
							let i = t.slice(r), a = U.current;
							return a && a.trigger === n.trigger && i.includes(a.item.label) ? null : {
								range: {
									from: e.start() + r,
									to: e.pos
								},
								query: i.trimStart(),
								text: i
							};
						},
						items: async ({ editor: e, query: t }) => await C(e.getText(), H.current)?.argument?.search(t) ?? [],
						command: ({ editor: e, range: t, props: n }) => {
							let r = C(e.getText(), H.current);
							if (!r?.argument) return;
							let i = {
								id: n.id,
								label: n.label,
								hint: n.hint,
								icon: n.icon
							};
							if ((r.argument.onPick?.(i) ?? "insert") === "execute") {
								U.current = null, e.commands.clearContent(!0), Wt.current?.(r, i);
								return;
							}
							U.current = {
								trigger: r.trigger,
								item: i
							}, e.chain().focus().deleteRange(t).insertContent(`${i.label} `).run();
						},
						render: () => ma("Arguments", !0)
					})];
				}
			}),
			me.create({
				name: "chatComposerKeymap",
				addKeyboardShortcuts() {
					return {
						Enter: () => (rt.current(), !0),
						"Mod-k": () => (it.current(), !0),
						"Shift-Enter": ({ editor: e }) => e.commands.setHardBreak()
					};
				}
			})
		];
		return Vt && e.push(Oe.configure({
			HTMLAttributes: { class: "mention" },
			suggestion: {
				char: "@",
				items: async ({ query: e }) => {
					let t = await Rt.current?.(e) ?? [], n = zt.current;
					return n ? t.map((e) => ({
						...e,
						member: n.has(e.id)
					})) : t;
				},
				render: () => {
					let e = null, t = ia(), n = (e) => ({
						...e,
						onPickNonMember: (n) => {
							t.detach(), e.editor.chain().focus().deleteRange(e.range).run(), Bt.current?.(n);
						}
					});
					return {
						onStart: (r) => {
							e = new ue(Ri, {
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
		})), Ut && e.push(la.configure({
			HTMLAttributes: { class: "docref" },
			renderText: ({ node: e }) => `#${e.attrs.label ?? e.attrs.id}`,
			renderHTML: ({ options: e, node: t }) => [
				"span",
				e.HTMLAttributes,
				`#${t.attrs.label ?? t.attrs.id}`
			],
			suggestion: {
				char: "#",
				pluginKey: ua,
				allow: ca,
				items: ({ query: e }) => Ht.current?.(e) ?? [],
				render: () => {
					let e = null, t = ia();
					return {
						onStart: (n) => {
							e = new ue(zi, {
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
	}, [Vt, Ut]), G = de({
		extensions: Yt,
		content: p?.html ?? "",
		editable: !R,
		onUpdate: ({ editor: e }) => {
			if (It.current(e)) return;
			wt(e.isEmpty), Jt.current = e;
			let t = e.getText(), n = C(t, H.current);
			Gt((e) => e?.trigger === n?.trigger ? e : n), qt(!n || te(t, n).trim() === ""), U.current && U.current.trigger !== n?.trigger && (U.current = null), gt.current(e);
		},
		editorProps: { attributes: {
			class: "chat-composer-input",
			"data-testid": `${L}-input`
		} }
	}, [Yt]);
	E(() => {
		G?.setEditable(!R);
	}, [G, R]), E(() => {
		!G || G.isDestroyed || G.view.dispatch(G.state.tr);
	}, [
		G,
		z,
		Et,
		Ot
	]), E(() => {
		At.current && (At.current = !1, z === "terminal" ? kt.current?.focus() : G && !G.isDestroyed && G.commands.focus("end"));
	}, [z, G]);
	let [Xt, Zt] = O(""), [Qt, $t] = O([]), [en, tn] = O(-1), nn = ie(() => {
		let e = Xt.trim();
		!e || R || !Be || ($t((t) => t[t.length - 1] === e ? t : [...t, e]), Zt(""), tn(-1), Be(e));
	}, [
		Xt,
		R,
		Be
	]), rn = ie((e) => {
		if (!Qt.length) return;
		let t = Math.min(Qt.length - 1, Math.max(-1, en + e));
		tn(t), Zt(t < 0 ? "" : Qt[Qt.length - 1 - t] ?? "");
	}, [Qt, en]), an = se(() => M?.[z] || Ie || (!Ne && !Le ? [] : [
		{
			key: "/",
			label: "for commands"
		},
		{
			key: ">_",
			label: "for shell",
			...Ne ? { onSelect: () => Ne("terminal") } : {}
		},
		{
			key: "⌘K",
			label: "to quickly open",
			...Le ? { onSelect: Le } : {}
		}
	]), [
		Ie,
		Ne,
		Le,
		M,
		z
	]), on = (typeof P == "string" ? P : P?.[z]) ?? (B ? "Run" : "Send"), sn = B ? !R && !!Be && Xt.trim().length > 0 : !R && (!Ct || pt.length > 0);
	gt.current = (e) => {
		let t = dt.current, n = U.current, r = C(e.getText(), H.current), i = {
			html: e.isEmpty ? "" : e.getHTML(),
			files: ht.current.map((e) => e.file),
			...r ? { command: {
				trigger: r.trigger,
				...n?.trigger === r.trigger && te(e.getText(), r).includes(n.item.label) ? { argument: n.item } : {}
			} } : {},
			...Te ? { privacy: we } : {}
		};
		t && t.html === i.html && t.files.length === i.files.length && t.files.every((e, t) => e === i.files[t]) && t.command?.trigger === i.command?.trigger && t.command?.argument === i.command?.argument && t.privacy === i.privacy || (dt.current = i, ft.current?.(i, t));
	};
	let cn = (e) => {
		ht.current = e, mt(e), G && !G.isDestroyed && gt.current(G);
	};
	E(() => {
		if (!G || G.isDestroyed) return;
		if (re && p !== dt.current) {
			dt.current = p, G.commands.setContent(p?.html ?? "", { emitUpdate: !1 }), U.current = p?.command?.argument ? {
				trigger: p.command.trigger,
				item: p.command.argument
			} : null;
			let e = (p?.files ?? []).map((e) => ({
				id: `staged-${da++}`,
				file: e
			}));
			ht.current = e, mt(e);
		}
		Jt.current = G, wt(G.isEmpty);
		let e = C(G.getText(), H.current);
		Gt(e), qt(!e || te(G.getText(), e).trim() === "");
	}, [
		G,
		p,
		re
	]), E(() => {
		!Te || !G || G.isDestroyed || gt.current(G);
	}, [we, G]);
	let ln = ie(() => {
		if (!G) return;
		let { from: e, to: t } = G.state.selection;
		ut({
			open: !0,
			href: G.getAttributes("link").href ?? "",
			text: G.state.doc.textBetween(e, t)
		});
	}, [G]), un = ie(({ href: e, text: t }) => {
		if (!G) return;
		let n = G.chain().focus(), { empty: r } = G.state.selection;
		r ? n.insertContent(`<a href="${e}">${t || e}</a>`).run() : t ? n.insertContent(`<a href="${e}">${t}</a>`).run() : n.setLink({ href: e }).run(), ut({
			open: !1,
			href: "",
			text: ""
		});
	}, [G]), dn = ie(() => {
		if (!G || !sn || B || _t.current) return;
		let e = G.getText(), t = z === "agent" && !Pe && e.trim() && !/^\s*\/agent\b/i.test(e) ? `/agent ${e.trim()}` : e, n = C(t, H.current), r = U.current, i;
		n && (i = { trigger: n.trigger }, r && r.trigger === n.trigger && te(t, n).includes(r.item.label) && (i.argument = r.item));
		let a = sa(G), s = {
			html: G.isEmpty ? "" : G.getHTML(),
			text: t,
			mentions: oa(G),
			privacy: we,
			files: pt.map((e) => e.file),
			...a.length > 0 ? { documents: a } : {},
			...i ? { command: i } : {},
			...Et ? { mode: z } : {}
		}, c = dt.current, l = ft.current, u = (e) => {
			e !== !1 && (!vt.current || G.isDestroyed ? l?.({
				html: "",
				files: []
			}, c) : dt.current === c && (U.current = null, ht.current = [], mt([]), G.commands.clearContent(!0), dt.current === c && gt.current(G), wt(!0)));
		};
		_t.current = !0, St(!1);
		try {
			let e = o(s);
			e && typeof e == "object" && "then" in e ? (bt(!0), e.then(u, () => {
				vt.current && !G.isDestroyed && St(!0);
			}).finally(() => {
				_t.current = !1, vt.current && !G.isDestroyed && bt(!1);
			})) : (u(e), _t.current = !1);
		} catch {
			_t.current = !1, St(!0);
		}
	}, [
		G,
		sn,
		o,
		pt,
		we,
		B,
		z,
		Et,
		Pe
	]);
	rt.current = dn, it.current = ln, ae(nt, () => ({
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
	let K = ie((e) => {
		!Tt || e.length === 0 || cn([...ht.current, ...e.map((e) => ({
			id: `staged-${da++}`,
			file: e
		}))]);
	}, [Tt, G]), [fn, pn] = O(null), mn = D(null), hn = D(null), [gn, q] = O(!1), [_n, vn] = O(!1), yn = D(null);
	E(() => () => {
		yn.current !== null && clearTimeout(yn.current);
	}, []);
	let bn = D(null), xn = ie((e) => {
		if (mn.current?.disconnect(), mn.current = null, hn.current = e, !e || typeof ResizeObserver > "u") return;
		let t = (e) => pn(e > 0 ? e : null), n = new ResizeObserver(([e]) => t(e.contentRect.width));
		n.observe(e), mn.current = n, t(e.getBoundingClientRect().width);
	}, []);
	E(() => () => mn.current?.disconnect(), []), oe(() => {
		let e = hn.current;
		if (!e) return;
		let t = e.getBoundingClientRect().width;
		t > 0 && t !== fn && pn(t), gn && yn.current === null && typeof document < "u" && (!document.activeElement || document.activeElement === document.body) && (q(!1), vn(!1));
	});
	let Sn = Ye === "auto" ? Ki(fn) : Ye, Cn = Sn === "wide", wn = Sn === "narrow", Tn = Xe === "compact", En = Et && !Pe && (Ve === "compact" || Ve === "menu" || wn), Dn = En && Ve === "menu" && !wn, On = En && (Tn || Dn), kn = Cn && !Tn && Ve !== "menu", An = !!Ze?.length && !!Qe, jn = An && Cn && Ct && gn && !(et && !_n), Mn = An && !Cn, J = et && !_n && Ct && !I && !je?.length && !pt.length && !W && !xt && !jt && !B && !lt.open && !(Te && we === "hidden"), Nn = et && "motion-safe:[animation:composerReveal_140ms_ease-out]", [Pn, Fn] = O(!1), In = wn && !Pn || J, Ln = Cn, Rn = Cn, Y = h(hn, F, Dt), Bn = g(), X = Dt && Y !== "none" && !(J && !Bn?.painting), Vn = X && !!Bn?.painting, Hn = X && !Vn, Z = qe ?? Bn?.working ?? !1, Un = {};
	Ke && (Un["--composer-radius"] = qi[Ke]), Je !== void 0 && (Un["--composer-input-max"] = typeof Je == "number" ? `${Je}px` : Je);
	let Wn = Z ? 30 : 22, Q = (t, n, r, i, a, o) => /* @__PURE__ */ k("button", {
		ref: a,
		type: "button",
		"aria-label": t,
		"aria-pressed": n,
		title: t,
		disabled: R,
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
	return /* @__PURE__ */ k(S, {
		onFiles: K,
		disabled: !Tt,
		className: e("min-w-0", tt),
		children: /* @__PURE__ */ A("div", {
			"data-testid": L,
			"data-command": W?.trigger,
			"data-mode": Et ? z : void 0,
			"data-console": X ? "true" : void 0,
			"data-composer-size": Sn,
			"data-backdrop-tone": X ? Y : void 0,
			"data-console-sky": X ? Vn ? "inherited" : "own" : void 0,
			"data-working": Z ? "true" : void 0,
			ref: xn,
			"data-density": Xe,
			"data-collapsed": et ? J ? "true" : "false" : void 0,
			onFocusCapture: (e) => {
				yn.current !== null && (clearTimeout(yn.current), yn.current = null), q(!0), et && bn.current?.contains(e.target) && vn(!0);
			},
			onBlurCapture: (e) => {
				let t = e.relatedTarget;
				t && e.currentTarget.contains(t) || (yn.current !== null && clearTimeout(yn.current), yn.current = setTimeout(() => {
					yn.current = null, q(!1), vn(!1);
				}, 0));
			},
			...Object.keys(Un).length ? { style: Un } : {},
			...X ? { "data-theme": "dark" } : {},
			...He && V ? { onKeyDownCapture: (e) => {
				if (!e.altKey || e.ctrlKey || e.metaKey) return;
				let t = [
					"Digit1",
					"Digit2",
					"Digit3"
				].indexOf(e.code);
				t < 0 || (e.preventDefault(), e.stopPropagation(), Pt(Yi[t]));
			} } : {},
			className: e("uic-composer chat-composer relative isolate w-full min-w-0 max-w-full rounded-[var(--composer-radius,12px)] border bg-surface shadow-[var(--composer-shadow,var(--uic-composer-shadow))] transition-colors duration-300 focus-within:ring-2 motion-reduce:transition-none", X && "uic-chat-console", Vn && "bg-surface-inset", W ? W.disabled ? "border-warning focus-within:border-warning focus-within:ring-warning" : "border-info focus-within:border-info focus-within:ring-info" : "border-border focus-within:border-primary focus-within:ring-primary"),
			children: [
				/* @__PURE__ */ k(y, {
					active: Hn,
					tone: Y === "graphite" ? "graphite" : "night",
					particleCount: Z ? 180 : 120,
					density: Wn,
					speed: Z ? .15 : .09,
					alphaParticles: !0,
					particleColors: Y === "graphite" ? _ : v,
					particleBaseSize: (Y === "graphite" ? 80 : 90) + (Z ? 15 : 0),
					fallbackIntensity: Z ? "medium" : "low",
					className: "pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-[inherit]",
					"data-testid": `${L}-console`
				}),
				xt && /* @__PURE__ */ k("p", {
					role: "alert",
					className: "px-2 py-1 text-sm text-danger-fg",
					children: "Unable to send. Your draft and attachments are saved. Try again."
				}),
				W && /* @__PURE__ */ A("div", {
					role: "status",
					title: W.description ?? W.hint ?? W.label,
					"data-testid": `${L}-command`,
					className: e("flex items-center gap-1.5 rounded-t-[calc(var(--composer-radius,12px)-1px)] px-2 py-1 text-[11px]", W.disabled ? "bg-warning-bg text-warning-fg" : "bg-info-bg text-info-fg"),
					children: [
						/* @__PURE__ */ k("span", {
							className: "font-mono",
							children: W.trigger
						}),
						/* @__PURE__ */ k("span", {
							className: "font-medium",
							children: W.label
						}),
						Kt && W.argument?.placeholder ? /* @__PURE__ */ A("span", {
							"data-testid": `${L}-command-placeholder`,
							className: "min-w-0 truncate italic opacity-80",
							children: ["— ", W.argument.placeholder]
						}) : W.hint && /* @__PURE__ */ A("span", {
							className: "min-w-0 truncate opacity-80",
							children: ["— ", W.hint]
						})
					]
				}),
				Te && we === "hidden" && /* @__PURE__ */ A("div", {
					role: "status",
					"data-testid": `${L}-privacy-hint`,
					className: e("flex items-center gap-1.5 bg-neutral-bg px-2 py-1 text-[11px] text-neutral-fg", !xt && !W && "rounded-t-[calc(var(--composer-radius,12px)-1px)]"),
					children: [/* @__PURE__ */ k(s, { size: 13 }), /* @__PURE__ */ k("span", { children: "Only you can see this" })]
				}),
				!On && !J && /* @__PURE__ */ k(ne, {
					references: j ?? [],
					...ke ? { onRemove: ke } : {},
					removeLabel: (e) => `Remove ${e.label} from this draft`,
					"data-testid": `${L}-references`
				}),
				!!je?.length && /* @__PURE__ */ k("div", {
					role: "status",
					"data-testid": `${L}-processes`,
					className: "flex flex-wrap items-center gap-x-2 gap-y-1 px-2 pt-1 text-[11px] text-text-secondary",
					children: je.map((t, n) => /* @__PURE__ */ A("span", {
						className: "flex min-w-0 items-center gap-1.5",
						children: [
							n > 0 && /* @__PURE__ */ k("span", {
								"aria-hidden": "true",
								className: "text-text-tertiary",
								children: "·"
							}),
							/* @__PURE__ */ k("span", {
								"aria-hidden": "true",
								className: e("inline-block h-1.5 w-1.5 shrink-0 rounded-full", ra[t.tone])
							}),
							/* @__PURE__ */ k("span", {
								className: "min-w-0 truncate",
								children: t.label
							})
						]
					}, t.id))
				}),
				I && /* @__PURE__ */ A("div", {
					role: "status",
					"data-testid": I["data-testid"] ?? `${L}-status`,
					"data-tone": I.tone ?? "info",
					className: e("flex min-w-0 items-center gap-1.5 px-2 pt-1 text-[11px] text-text-secondary", Nn),
					children: [
						/* @__PURE__ */ k("span", {
							"aria-hidden": "true",
							className: e("inline-block h-1.5 w-1.5 shrink-0 rounded-full", na[I.tone ?? "info"])
						}),
						/* @__PURE__ */ k("span", {
							className: "min-w-0 flex-1 truncate",
							title: I.text,
							children: I.text
						}),
						I.action && /* @__PURE__ */ k("button", {
							type: "button",
							onClick: I.action.onSelect,
							"data-testid": I.action["data-testid"] ?? `${L}-status-action`,
							className: "-my-1 inline-flex min-h-6 shrink-0 cursor-pointer items-center rounded border-none bg-transparent px-1.5 text-[11px] font-semibold text-primary hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-primary",
							children: I.action.label
						}),
						I.onDismiss && /* @__PURE__ */ k("button", {
							type: "button",
							"aria-label": "Dismiss",
							onClick: I.onDismiss,
							"data-testid": `${L}-status-dismiss`,
							className: "-my-1 inline-flex h-6 w-6 shrink-0 cursor-pointer items-center justify-center rounded border-none bg-transparent text-[13px] leading-none text-text-tertiary hover:text-text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary",
							children: "×"
						})
					]
				}),
				En && !J && /* @__PURE__ */ A("div", {
					className: e("flex min-w-0 items-center gap-1.5 px-2 pt-1 text-xs", Tn && "flex-wrap", Nn),
					"data-testid": `${L}-modes`,
					"data-mode-control": Dn ? "menu" : "compact",
					children: [
						Dn ? /* @__PURE__ */ k(u, {
							trigger: /* @__PURE__ */ A("span", {
								className: "flex items-center gap-1.5 text-sm font-semibold text-text-primary",
								"data-testid": `${L}-mode-label`,
								children: [
									/* @__PURE__ */ k("span", {
										"aria-hidden": "true",
										className: "flex w-4 justify-center text-primary",
										children: Zi[z]
									}),
									Xi[z],
									/* @__PURE__ */ k("span", {
										"aria-hidden": "true",
										className: "text-[11px] leading-none text-text-tertiary",
										children: "▾"
									})
								]
							}),
							triggerLabel: `Composer mode: ${Xi[z]}`,
							triggerTitle: "Composer mode",
							triggerTestId: `${L}-mode-menu`,
							"data-testid": `${L}-mode-menu-list`,
							align: "start",
							triggerClassName: "rounded-md border-0 bg-transparent px-1.5 py-0.5 hover:bg-surface-hover",
							sections: [{ items: Yi.map((e, t) => {
								let n = Nt(e) ? Ge?.[e] : void 0;
								return {
									label: Xi[e],
									icon: Zi[e],
									active: e === z,
									...n ? { description: n } : {},
									...He ? { trailing: /* @__PURE__ */ A("kbd", {
										className: "rounded border border-border bg-surface-inset px-1 font-mono text-[10px] text-text-secondary",
										children: ["⌥", t + 1]
									}) } : {},
									onSelect: () => {
										Pt(e);
									}
								};
							}) }]
						}) : /* @__PURE__ */ A("span", {
							className: "flex items-center gap-1 font-semibold text-text-primary",
							"data-testid": `${L}-mode-label`,
							children: [/* @__PURE__ */ k("span", {
								"aria-hidden": "true",
								className: "flex w-4 justify-center text-text-secondary",
								children: Zi[z]
							}), Xi[z]]
						}),
						!Dn && /* @__PURE__ */ k("span", {
							role: "group",
							"aria-label": "Composer mode",
							className: "flex items-center gap-0.5",
							children: Yi.map((n, r) => {
								let i = Nt(n), a = i ? Ge?.[n] : void 0;
								return /* @__PURE__ */ k(t, {
									size: "sm",
									"aria-label": Xi[n],
									"aria-pressed": n === z,
									"aria-keyshortcuts": He ? `Alt+${r + 1}` : void 0,
									title: `${Xi[n]}${He ? ` (⌥${r + 1})` : ""}${a ? ` — ${a}` : ""}`,
									disabled: i || R,
									onClick: () => Pt(n),
									"data-testid": `${L}-mode-${n}`,
									className: e("h-5 w-5 text-[11px] font-semibold tabular-nums", n === z ? "bg-info-bg text-info-fg hover:bg-info-bg" : "text-text-tertiary", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"),
									children: r + 1
								}, n);
							})
						}),
						He && !wn && /* @__PURE__ */ A("kbd", {
							className: e("rounded border border-border bg-surface-inset px-1 font-mono text-text-secondary", Dn ? "py-0.5 text-[11px]" : "text-[10px]"),
							"data-testid": `${L}-mode-kbd`,
							children: ["⌥", Yi.indexOf(z) + 1]
						}),
						On && !!j?.length && /* @__PURE__ */ k(ne, {
							references: j,
							...ke ? { onRemove: ke } : {},
							removeLabel: (e) => `Remove ${e.label} from this draft`,
							className: e("min-w-0 flex-nowrap p-0", Dn && "ml-auto justify-end"),
							...Dn ? { size: "sm" } : {},
							"data-testid": `${L}-references`
						}),
						$e != null && /* @__PURE__ */ k("span", {
							className: e("flex shrink-0 items-center", Dn && j?.length ? "ml-2" : "ml-auto"),
							"data-testid": `${L}-mode-row-end`,
							children: $e
						})
					]
				}),
				Et && !Pe && !En && !J && /* @__PURE__ */ k("div", {
					className: e("flex items-center gap-2 px-2 pt-1.5", Nn),
					"data-testid": `${L}-modes`,
					children: /* @__PURE__ */ k("div", {
						className: e("rounded-md transition-shadow duration-300 motion-reduce:transition-none", X && "ring-1 ring-primary/60"),
						children: /* @__PURE__ */ k(f, {
							items: [
								{
									id: "chat",
									label: "Chat",
									icon: /* @__PURE__ */ k(l, { size: 13 })
								},
								{
									id: "agent",
									label: "Agent",
									icon: /* @__PURE__ */ k(n, { size: 13 })
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
							onValueChange: (e) => Ne?.(e),
							variant: "segmented",
							size: "sm",
							"aria-label": "Composer mode",
							idPrefix: `${L}-mode`
						})
					})
				}),
				jt && /* @__PURE__ */ k("p", {
					role: "status",
					className: "m-0 px-2 pt-1 text-[11px] text-warning-fg",
					"data-testid": `${L}-mode-notice`,
					children: jt
				}),
				jn && /* @__PURE__ */ k("div", {
					className: e("flex flex-wrap items-center gap-1 px-2 pt-1", Nn),
					"data-testid": `${L}-suggestions`,
					children: Ze.map((e) => /* @__PURE__ */ k("button", {
						type: "button",
						onMouseDown: (e) => e.preventDefault(),
						onClick: () => Qe?.(e),
						className: "cursor-pointer rounded-full border border-border bg-surface px-2 py-0.5 text-[11px] text-text-secondary hover:border-border-emphasis hover:text-text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary",
						children: e
					}, e))
				}),
				/* @__PURE__ */ A("div", {
					className: e(In && "flex flex-wrap items-end"),
					"data-testid": `${L}-body`,
					children: [
						J && Et && !Pe && /* @__PURE__ */ A("button", {
							type: "button",
							onClick: () => G?.commands.focus(),
							title: `${Xi[z]} — click to write`,
							"data-testid": `${L}-mode-pill`,
							className: "mb-1.5 ml-1.5 flex shrink-0 items-center gap-1 self-end rounded-full bg-surface-inset px-2 py-0.5 text-xs font-semibold text-text-secondary hover:text-text-primary",
							children: [/* @__PURE__ */ k("span", {
								"aria-hidden": "true",
								className: "flex w-4 justify-center",
								children: Zi[z]
							}), Xi[z]]
						}),
						J && !!j?.length && /* @__PURE__ */ k(ne, {
							references: j,
							...ke ? { onRemove: ke } : {},
							removeLabel: (e) => `Remove ${e.label} from this draft`,
							className: "mb-1.5 ml-1.5 min-w-0 max-w-[45%] shrink flex-nowrap self-end overflow-hidden p-0",
							"data-testid": `${L}-references`
						}),
						/* @__PURE__ */ k("div", {
							ref: bn,
							className: e(In && "min-w-0 flex-1"),
							...Ct && Ot ? { title: Ot } : {},
							...B ? { hidden: !0 } : {},
							children: /* @__PURE__ */ k(le, { editor: G })
						}),
						B && /* @__PURE__ */ A("div", {
							className: e("flex items-center gap-2 px-2 py-2", In && "min-w-0 flex-1"),
							"data-testid": `${L}-shell`,
							children: [/* @__PURE__ */ k("span", {
								"aria-hidden": "true",
								className: "shrink-0 font-mono text-xs text-text-tertiary",
								children: "$"
							}), /* @__PURE__ */ k("input", {
								ref: kt,
								type: "text",
								value: Xt,
								disabled: R,
								placeholder: Ot,
								"aria-label": Ot,
								"data-testid": `${L}-shell-input`,
								onChange: (e) => {
									Zt(e.target.value), tn(-1);
								},
								onKeyDown: (e) => {
									if (e.key === "Enter" && !e.shiftKey) {
										e.preventDefault(), nn();
										return;
									}
									if (e.key === "ArrowUp") {
										e.preventDefault(), rn(1);
										return;
									}
									e.key === "ArrowDown" && (e.preventDefault(), rn(-1));
								},
								className: "min-w-0 flex-1 border-none bg-transparent font-mono text-xs text-text-primary outline-none placeholder:text-text-tertiary disabled:cursor-not-allowed disabled:text-text-tertiary"
							})]
						}),
						kn && !!an.length && !J && /* @__PURE__ */ k("div", {
							className: "flex flex-wrap items-center gap-x-3 gap-y-1 px-2 pb-1 text-[11px] text-text-tertiary",
							"data-testid": `${L}-hints`,
							children: an.map((e) => {
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
						/* @__PURE__ */ k("div", {
							className: e(In && "order-last basis-full"),
							children: /* @__PURE__ */ k(Li, {
								files: pt,
								disabled: R,
								onRemove: (e) => cn(ht.current.filter((t) => t.id !== e))
							})
						}),
						/* @__PURE__ */ A("div", {
							className: e("flex min-w-0 items-center px-1.5 py-1", In ? "shrink-0" : "border-t border-border", wn && !In && "flex-wrap gap-y-1", !In && Nn),
							"data-testid": `${L}-toolbar`,
							children: [
								wn && !J && Q(Pn ? "Hide formatting" : "Show formatting", Pn, () => Fn((e) => !e), /* @__PURE__ */ k("span", {
									className: "text-xs font-semibold",
									children: "Aa"
								}), void 0, `${L}-format-toggle`),
								!In && /* @__PURE__ */ A(m, {
									label: "Message formatting",
									className: e("min-w-0 gap-0.5", wn && "flex-wrap"),
									"data-testid": `${L}-format-toolbar`,
									children: [
										G && [
											Q("Bold", G.isActive("bold"), () => G.chain().focus().toggleBold().run(), /* @__PURE__ */ k("b", { children: "B" })),
											Q("Italic", G.isActive("italic"), () => G.chain().focus().toggleItalic().run(), /* @__PURE__ */ k("i", { children: "I" })),
											Ln && Q("Strikethrough", G.isActive("strike"), () => G.chain().focus().toggleStrike().run(), /* @__PURE__ */ k("s", { children: "S" })),
											Ln && Q("Code", G.isActive("code"), () => G.chain().focus().toggleCode().run(), /* @__PURE__ */ k("span", {
												className: "font-mono text-[11px]",
												children: "<>"
											})),
											Q(G.isActive("link") ? "Edit link" : "Add link", G.isActive("link"), () => ln(), /* @__PURE__ */ k(d, { size: 16 })),
											Rn && /* @__PURE__ */ k("span", {
												"aria-hidden": !0,
												className: "mx-1 h-4 w-px shrink-0 bg-border"
											}, "sep1"),
											Rn && Q("Bulleted list", G.isActive("bulletList"), () => G.chain().focus().toggleBulletList().run(), /* @__PURE__ */ k("span", { children: "•" })),
											Rn && Q("Numbered list", G.isActive("orderedList"), () => G.chain().focus().toggleOrderedList().run(), /* @__PURE__ */ k("span", {
												className: "text-[11px]",
												children: "1."
											})),
											Rn && Q("Quote", G.isActive("blockquote"), () => G.chain().focus().toggleBlockquote().run(), /* @__PURE__ */ k(i, { size: 16 })),
											!Cn && /* @__PURE__ */ k(u, {
												trigger: /* @__PURE__ */ k("span", {
													"aria-hidden": "true",
													className: "text-sm leading-none",
													children: "⋯"
												}),
												triggerLabel: "More formatting",
												triggerTitle: "More formatting",
												triggerTabIndex: -1,
												triggerTestId: `${L}-format-more`,
												"data-testid": `${L}-format-more-menu`,
												triggerClassName: "grid h-7 w-7 shrink-0 place-items-center rounded text-text-secondary hover:bg-surface-hover border-0 p-0",
												sections: [{ items: [
													{
														label: "Strikethrough",
														checked: G.isActive("strike"),
														onSelect: () => G.chain().focus().toggleStrike().run()
													},
													{
														label: "Code",
														checked: G.isActive("code"),
														onSelect: () => G.chain().focus().toggleCode().run()
													},
													{
														label: "Bulleted list",
														checked: G.isActive("bulletList"),
														onSelect: () => G.chain().focus().toggleBulletList().run()
													},
													{
														label: "Numbered list",
														checked: G.isActive("orderedList"),
														onSelect: () => G.chain().focus().toggleOrderedList().run()
													},
													{
														label: "Quote",
														checked: G.isActive("blockquote"),
														onSelect: () => G.chain().focus().toggleBlockquote().run()
													}
												] }]
											}, "format-more")
										],
										(be || Tt || !!Te) && /* @__PURE__ */ k("span", {
											"aria-hidden": !0,
											className: "mx-1 h-4 w-px shrink-0 bg-border"
										}),
										be && G && /* @__PURE__ */ A("span", {
											className: "relative",
											children: [Q("Emoji", st, () => ct((e) => !e), /* @__PURE__ */ k(r, { size: 16 }), ot), /* @__PURE__ */ k(x, {
												open: st,
												triggerRef: ot,
												onClose: () => ct(!1),
												onSelect: (e) => {
													G.chain().focus().insertContent(e).run(), ct(!1);
												}
											})]
										}),
										Tt && /* @__PURE__ */ A(ce, { children: [Q("Attach files", !1, () => at.current?.click(), /* @__PURE__ */ k(a, { size: 16 })), /* @__PURE__ */ k(b, {
											ref: at,
											multiple: !0,
											"data-testid": `${L}-file-input`,
											onFiles: K
										})] }),
										Te && (() => {
											let e = {
												...Ji,
												...Ee
											}, t = we === "hidden";
											return Q(t ? e.hidden : e.visible, t, () => Te(t ? "visible" : "hidden"), k(t ? s : c, { size: 16 }), void 0, `${L}-privacy-toggle`);
										})(),
										Ae
									]
								}),
								!J && Cn && !!Ce?.length && /* @__PURE__ */ k("span", {
									className: "ml-1 shrink-0 select-none border-l border-border pl-2 text-xs text-text-tertiary",
									"data-testid": `${L}-commands-hint`,
									children: "/ commands"
								}),
								!J && (!kn && an.length || Mn) ? /* @__PURE__ */ k(u, {
									trigger: /* @__PURE__ */ k("span", {
										"aria-hidden": "true",
										className: "text-xs font-semibold leading-none",
										children: "?"
									}),
									triggerLabel: "Keyboard hints",
									triggerTitle: "Keyboard hints",
									triggerTestId: `${L}-hints-toggle`,
									"data-testid": `${L}-hints-menu`,
									align: "end",
									triggerClassName: "grid h-7 w-7 shrink-0 place-items-center rounded text-text-tertiary hover:bg-surface-hover hover:text-text-primary border-0 p-0",
									sections: [...Mn ? [{
										label: "Suggestions",
										items: Ze.map((e) => ({
											label: e,
											onSelect: () => Qe?.(e)
										}))
									}] : [], ...!kn && an.length ? [{
										...Mn ? { label: "Keys" } : {},
										items: an.map((e) => ({
											label: e.label,
											trailing: /* @__PURE__ */ k("kbd", {
												className: "rounded border border-border bg-surface-inset px-1 font-mono text-[10px] text-text-secondary",
												children: e.key
											}),
											...e.onSelect ? { onSelect: e.onSelect } : {}
										}))
									}] : []]
								}) : null,
								N != null && !J && /* @__PURE__ */ k("span", {
									className: e("ml-auto flex shrink-0 items-center pr-1.5 text-text-secondary", Dn ? "text-sm" : "text-xs"),
									"data-testid": `${L}-submit-lead`,
									children: N
								}),
								Re?.length && ze ? /* @__PURE__ */ A("span", {
									className: e((N == null || J) && "ml-auto", "flex shrink-0 items-stretch"),
									children: [/* @__PURE__ */ k("button", {
										type: "button",
										onClick: B ? nn : dn,
										disabled: !sn,
										"data-testid": `${L}-send`,
										className: "shrink-0 rounded-l-md rounded-r-none bg-primary px-2.5 py-1 text-xs font-semibold text-on-primary disabled:opacity-40",
										children: on
									}), /* @__PURE__ */ k(u, {
										trigger: /* @__PURE__ */ k("span", {
											"aria-hidden": "true",
											className: "text-xs leading-none",
											children: "▾"
										}),
										triggerLabel: "Other ways to send",
										align: "end",
										triggerTestId: `${L}-send-options`,
										"data-testid": `${L}-send-menu`,
										triggerClassName: "rounded-l-none rounded-r-md border-0 border-l border-on-primary/40 bg-primary px-1.5 py-1 text-on-primary hover:bg-primary",
										sections: [{ items: Re.map((e) => ({
											label: e.label,
											onSelect: () => ze(e.id)
										})) }]
									})]
								}) : /* @__PURE__ */ A("button", {
									type: "button",
									onClick: B ? nn : dn,
									disabled: !sn,
									"data-testid": `${L}-send`,
									className: e((N == null || J) && "ml-auto", "shrink-0 rounded bg-primary font-semibold text-on-primary disabled:opacity-40", Dn ? "rounded-md px-3 py-1.5 text-sm" : "px-2.5 py-1 text-xs"),
									children: [on, Dn && /* @__PURE__ */ k("span", {
										"aria-hidden": "true",
										className: "ml-1.5",
										children: "→"
									})]
								})
							]
						})
					]
				}),
				/* @__PURE__ */ k(ee, {
					open: lt.open,
					initialHref: lt.href,
					initialText: lt.text,
					onSubmit: (e) => un(xe ? {
						...e,
						href: xe(e.text) ?? e.href
					} : e),
					onRemove: () => {
						G?.chain().focus().unsetLink().run(), ut({
							open: !1,
							href: "",
							text: ""
						});
					},
					onClose: () => {
						ut({
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
export { ea as a, zi as c, Ki as i, Ri as l, Yi as n, Wi as o, ha as r, Bi as s, Gi as t, Li as u };
