import { t as e } from "./cn-DhjIN-s0.js";
import { t } from "./Button-cRZd1Oud.js";
import { t as n } from "./Modal-CyoyiNKN.js";
import { t as r } from "./Input-DLknWXri.js";
import { t as i } from "./Avatar-BzicCOft.js";
import { i as a, n as o, r as s } from "./ReactionPickerPopover-CcL-n6gt.js";
import { forwardRef as c, useCallback as l, useEffect as u, useImperativeHandle as d, useMemo as f, useRef as p, useState as m } from "react";
import { Fragment as h, jsx as g, jsxs as _ } from "react/jsx-runtime";
import { EditorContent as v, ReactRenderer as y, useEditor as b } from "@tiptap/react";
import { Extension as x, InputRule as S, Mark as C, PasteRule as w, combineTransactionSteps as T, escapeForRegEx as E, findChildrenInRange as ee, getAttributes as te, getChangedRanges as D, getMarksBetween as ne, markInputRule as re, markPasteRule as ie, mergeAttributes as ae } from "@tiptap/core";
import oe from "@tiptap/starter-kit";
import se from "@tiptap/extension-placeholder";
import ce from "@tiptap/extension-mention";
import { Plugin as O, PluginKey as k } from "@tiptap/pm/state";
import { Decoration as le, DecorationSet as ue } from "@tiptap/pm/view";
//#region src/components/social/emojiShortcodes.ts
var de = [
	{
		code: "+1",
		emoji: "👍",
		keywords: [
			"thumbsup",
			"yes",
			"lgtm",
			"approve"
		]
	},
	{
		code: "-1",
		emoji: "👎",
		keywords: ["thumbsdown", "no"]
	},
	{
		code: "heart",
		emoji: "❤️",
		keywords: ["love"]
	},
	{
		code: "fire",
		emoji: "🔥",
		keywords: ["lit", "hot"]
	},
	{
		code: "tada",
		emoji: "🎉",
		keywords: [
			"party",
			"celebrate",
			"ship"
		]
	},
	{
		code: "clap",
		emoji: "👏",
		keywords: ["applause"]
	},
	{
		code: "100",
		emoji: "💯",
		keywords: ["hundred", "perfect"]
	},
	{
		code: "eyes",
		emoji: "👀",
		keywords: ["look", "watching"]
	},
	{
		code: "rocket",
		emoji: "🚀",
		keywords: [
			"ship",
			"deploy",
			"launch"
		]
	},
	{
		code: "sparkles",
		emoji: "✨",
		keywords: ["new", "shiny"]
	},
	{
		code: "pray",
		emoji: "🙏",
		keywords: [
			"please",
			"thanks",
			"thankyou"
		]
	},
	{
		code: "muscle",
		emoji: "💪",
		keywords: ["strong"]
	},
	{
		code: "wave",
		emoji: "👋",
		keywords: [
			"hello",
			"hi",
			"bye"
		]
	},
	{
		code: "ok_hand",
		emoji: "👌",
		keywords: ["ok", "fine"]
	},
	{
		code: "handshake",
		emoji: "🤝",
		keywords: ["deal", "agree"]
	},
	{
		code: "crossed_fingers",
		emoji: "🤞",
		keywords: ["hope", "luck"]
	},
	{
		code: "salute",
		emoji: "🫡",
		keywords: [
			"yes",
			"ack",
			"onit"
		]
	},
	{
		code: "smile",
		emoji: "😀",
		keywords: ["happy"]
	},
	{
		code: "grin",
		emoji: "😁"
	},
	{
		code: "joy",
		emoji: "😂",
		keywords: [
			"lol",
			"laugh",
			"crying"
		]
	},
	{
		code: "rofl",
		emoji: "🤣",
		keywords: ["lmao", "laugh"]
	},
	{
		code: "sweat_smile",
		emoji: "😅",
		keywords: ["phew", "nervous"]
	},
	{
		code: "wink",
		emoji: "😉"
	},
	{
		code: "heart_eyes",
		emoji: "😍",
		keywords: ["love"]
	},
	{
		code: "smiling_face_with_tear",
		emoji: "🥲"
	},
	{
		code: "thinking",
		emoji: "🤔",
		keywords: ["hmm", "think"]
	},
	{
		code: "sunglasses",
		emoji: "😎",
		keywords: ["cool"]
	},
	{
		code: "upside_down",
		emoji: "🙃",
		keywords: ["irony"]
	},
	{
		code: "star_struck",
		emoji: "🤩",
		keywords: ["wow"]
	},
	{
		code: "cry",
		emoji: "😢",
		keywords: ["sad"]
	},
	{
		code: "sob",
		emoji: "😭",
		keywords: ["crying", "sad"]
	},
	{
		code: "rage",
		emoji: "😡",
		keywords: ["angry", "mad"]
	},
	{
		code: "exploding_head",
		emoji: "🤯",
		keywords: ["mindblown", "wow"]
	},
	{
		code: "scream",
		emoji: "😱",
		keywords: ["fear", "panic"]
	},
	{
		code: "sleeping",
		emoji: "😴",
		keywords: ["tired", "zzz"]
	},
	{
		code: "zany_face",
		emoji: "🤪",
		keywords: ["silly"]
	},
	{
		code: "melting_face",
		emoji: "🫠",
		keywords: ["dead", "overwhelmed"]
	},
	{
		code: "face_with_monocle",
		emoji: "🧐",
		keywords: ["inspect", "review"]
	},
	{
		code: "shushing_face",
		emoji: "🤫",
		keywords: ["quiet", "secret"]
	},
	{
		code: "partying_face",
		emoji: "🥳",
		keywords: ["party", "birthday"]
	},
	{
		code: "grimacing",
		emoji: "😬",
		keywords: ["yikes", "awkward"]
	},
	{
		code: "neutral_face",
		emoji: "😐",
		keywords: ["meh"]
	},
	{
		code: "expressionless",
		emoji: "😑",
		keywords: ["blank"]
	},
	{
		code: "smiling_imp",
		emoji: "😈",
		keywords: ["evil"]
	},
	{
		code: "bug",
		emoji: "🐛",
		keywords: ["defect", "issue"]
	},
	{
		code: "wrench",
		emoji: "🔧",
		keywords: ["fix", "tool"]
	},
	{
		code: "hammer",
		emoji: "🔨",
		keywords: ["build"]
	},
	{
		code: "gear",
		emoji: "⚙️",
		keywords: ["settings", "config"]
	},
	{
		code: "warning",
		emoji: "⚠️",
		keywords: ["careful", "caution"]
	},
	{
		code: "rotating_light",
		emoji: "🚨",
		keywords: [
			"alert",
			"incident",
			"siren"
		]
	},
	{
		code: "white_check_mark",
		emoji: "✅",
		keywords: [
			"done",
			"pass",
			"green"
		]
	},
	{
		code: "x",
		emoji: "❌",
		keywords: [
			"fail",
			"no",
			"red"
		]
	},
	{
		code: "heavy_check_mark",
		emoji: "✔️",
		keywords: ["done"]
	},
	{
		code: "hourglass",
		emoji: "⏳",
		keywords: [
			"wait",
			"pending",
			"slow"
		]
	},
	{
		code: "zap",
		emoji: "⚡",
		keywords: [
			"fast",
			"perf",
			"lightning"
		]
	},
	{
		code: "boom",
		emoji: "💥",
		keywords: ["crash", "break"]
	},
	{
		code: "memo",
		emoji: "📝",
		keywords: [
			"note",
			"docs",
			"write"
		]
	},
	{
		code: "chart_with_upwards_trend",
		emoji: "📈",
		keywords: [
			"metrics",
			"up",
			"growth"
		]
	},
	{
		code: "chart_with_downwards_trend",
		emoji: "📉",
		keywords: ["metrics", "down"]
	},
	{
		code: "lock",
		emoji: "🔒",
		keywords: [
			"secure",
			"auth",
			"private"
		]
	},
	{
		code: "key",
		emoji: "🔑",
		keywords: ["secret", "auth"]
	},
	{
		code: "mag",
		emoji: "🔍",
		keywords: [
			"search",
			"find",
			"investigate"
		]
	},
	{
		code: "link",
		emoji: "🔗",
		keywords: ["url"]
	},
	{
		code: "pushpin",
		emoji: "📌",
		keywords: ["pin", "important"]
	},
	{
		code: "calendar",
		emoji: "📅",
		keywords: ["date", "schedule"]
	},
	{
		code: "bulb",
		emoji: "💡",
		keywords: ["idea", "suggestion"]
	},
	{
		code: "construction",
		emoji: "🚧",
		keywords: ["wip", "progress"]
	},
	{
		code: "recycle",
		emoji: "♻️",
		keywords: ["refactor"]
	},
	{
		code: "lipstick",
		emoji: "💄",
		keywords: [
			"ui",
			"style",
			"polish"
		]
	},
	{
		code: "package",
		emoji: "📦",
		keywords: [
			"release",
			"build",
			"bundle"
		]
	},
	{
		code: "robot",
		emoji: "🤖",
		keywords: [
			"bot",
			"ai",
			"agent"
		]
	},
	{
		code: "ghost",
		emoji: "👻",
		keywords: ["flaky", "spooky"]
	},
	{
		code: "snail",
		emoji: "🐌",
		keywords: ["slow"]
	},
	{
		code: "trophy",
		emoji: "🏆",
		keywords: ["win", "best"]
	},
	{
		code: "dart",
		emoji: "🎯",
		keywords: ["target", "goal"]
	},
	{
		code: "brain",
		emoji: "🧠",
		keywords: ["smart", "think"]
	},
	{
		code: "coffee",
		emoji: "☕",
		keywords: ["brb", "morning"]
	},
	{
		code: "pizza",
		emoji: "🍕",
		keywords: ["lunch", "food"]
	},
	{
		code: "beers",
		emoji: "🍻",
		keywords: ["cheers", "friday"]
	},
	{
		code: "cake",
		emoji: "🍰",
		keywords: ["birthday"]
	},
	{
		code: "star",
		emoji: "⭐",
		keywords: ["favourite", "favorite"]
	},
	{
		code: "rainbow",
		emoji: "🌈"
	},
	{
		code: "sunny",
		emoji: "☀️",
		keywords: ["sun", "weather"]
	},
	{
		code: "snowflake",
		emoji: "❄️",
		keywords: ["cold", "freeze"]
	},
	{
		code: "dog",
		emoji: "🐶"
	},
	{
		code: "cat",
		emoji: "🐱"
	},
	{
		code: "unicorn",
		emoji: "🦄",
		keywords: ["rare"]
	},
	{
		code: "seedling",
		emoji: "🌱",
		keywords: ["new", "grow"]
	},
	{
		code: "anchor",
		emoji: "⚓",
		keywords: ["stable"]
	},
	{
		code: "balloon",
		emoji: "🎈",
		keywords: ["party"]
	},
	{
		code: "gift",
		emoji: "🎁",
		keywords: ["present"]
	}
];
function fe(e, t = de, n = 8) {
	let r = e.trim().toLowerCase();
	if (!r) return t.slice(0, n);
	let i = [], a = [], o = [];
	for (let e of t) e.code.startsWith(r) ? i.push(e) : e.code.includes(r) ? a.push(e) : e.keywords?.some((e) => e.startsWith(r)) && o.push(e);
	return [
		...i,
		...a,
		...o
	].slice(0, n);
}
//#endregion
//#region src/components/social/LinkDialog.tsx
function pe(e) {
	let t = e.trim();
	return t ? /^[a-z][a-z0-9+.-]*:/i.test(t) || t.startsWith("/") || t.startsWith("#") ? t : `https://${t}` : "";
}
function me({ open: e, initialText: i = "", initialHref: a = "", onSubmit: o, onRemove: s, onClose: c, "data-testid": l = "link-dialog" }) {
	let [d, f] = m(a), [h, v] = m(i), y = p(null);
	u(() => {
		if (!e) return;
		f(a), v(i);
		let t = setTimeout(() => y.current?.focus(), 0);
		return () => clearTimeout(t);
	}, [
		e,
		a,
		i
	]);
	let b = () => {
		let e = pe(d);
		e && o({
			href: e,
			text: h.trim()
		});
	};
	return /* @__PURE__ */ g(n, {
		open: e,
		onClose: c,
		title: a ? "Edit link" : "Add link",
		"data-testid": l,
		children: /* @__PURE__ */ _("div", {
			className: "flex flex-col gap-3 p-1",
			children: [
				/* @__PURE__ */ _("label", {
					className: "flex flex-col gap-1 text-xs text-text-secondary",
					children: ["Address", /* @__PURE__ */ g(r, {
						ref: y,
						value: d,
						placeholder: "https://example.com",
						"data-testid": `${l}-href`,
						onChange: (e) => f(e.target.value),
						onKeyDown: (e) => {
							e.key === "Enter" && (e.preventDefault(), b());
						}
					})]
				}),
				/* @__PURE__ */ _("label", {
					className: "flex flex-col gap-1 text-xs text-text-secondary",
					children: ["Text to display", /* @__PURE__ */ g(r, {
						value: h,
						placeholder: "Leave blank to use the address",
						"data-testid": `${l}-text`,
						onChange: (e) => v(e.target.value),
						onKeyDown: (e) => {
							e.key === "Enter" && (e.preventDefault(), b());
						}
					})]
				}),
				/* @__PURE__ */ _("div", {
					className: "mt-1 flex items-center gap-2",
					children: [
						/* @__PURE__ */ g(t, {
							variant: "primary",
							size: "sm",
							onClick: b,
							disabled: !d.trim(),
							"data-testid": `${l}-submit`,
							children: a ? "Update" : "Add link"
						}),
						/* @__PURE__ */ g(t, {
							variant: "ghost",
							size: "sm",
							onClick: c,
							children: "Cancel"
						}),
						s && a && /* @__PURE__ */ g(t, {
							variant: "danger",
							size: "sm",
							className: "ml-auto",
							onClick: s,
							"data-testid": `${l}-remove`,
							children: "Remove"
						})
					]
				})
			]
		})
	});
}
//#endregion
//#region node_modules/linkifyjs/dist/linkify.mjs
var he = "aaa1rp3bb0ott3vie4c1le2ogado5udhabi7c0ademy5centure6ountant0s9o1tor4d0s1ult4e0g1ro2tna4f0l1rica5g0akhan5ency5i0g1rbus3force5tel5kdn3l0ibaba4pay4lfinanz6state5y2sace3tom5m0azon4ericanexpress7family11x2fam3ica3sterdam8nalytics7droid5quan4z2o0l2partments8p0le4q0uarelle8r0ab1mco4chi3my2pa2t0e3s0da2ia2sociates9t0hleta5torney7u0ction5di0ble3o3spost5thor3o0s4w0s2x0a2z0ure5ba0by2idu3namex4d1k2r0celona5laycard4s5efoot5gains6seball5ketball8uhaus5yern5b0c1t1va3cg1n2d1e0ats2uty4er2rlin4st0buy5t2f1g1h0arti5i0ble3d1ke2ng0o3o1z2j1lack0friday9ockbuster8g1omberg7ue3m0s1w2n0pparibas9o0ats3ehringer8fa2m1nd2o0k0ing5sch2tik2on4t1utique6x2r0adesco6idgestone9oadway5ker3ther5ussels7s1t1uild0ers6siness6y1zz3v1w1y1z0h3ca0b1fe2l0l1vinklein9m0era3p2non3petown5ital0one8r0avan4ds2e0er0s4s2sa1e1h1ino4t0ering5holic7ba1n1re3c1d1enter4o1rn3f0a1d2g1h0anel2nel4rity4se2t2eap3intai5ristmas6ome4urch5i0priani6rcle4sco3tadel4i0c2y3k1l0aims4eaning6ick2nic1que6othing5ud3ub0med6m1n1o0ach3des3ffee4llege4ogne5m0mbank4unity6pany2re3uter5sec4ndos3struction8ulting7tact3ractors9oking4l1p2rsica5untry4pon0s4rses6pa2r0edit0card4union9icket5own3s1uise0s6u0isinella9v1w1x1y0mru3ou3z2dad1nce3ta1e1ing3sun4y2clk3ds2e0al0er2s3gree4livery5l1oitte5ta3mocrat6ntal2ist5si0gn4v2hl2iamonds6et2gital5rect0ory7scount3ver5h2y2j1k1m1np2o0cs1tor4g1mains5t1wnload7rive4tv2ubai3pont4rban5vag2r2z2earth3t2c0o2deka3u0cation8e1g1mail3erck5nergy4gineer0ing9terprises10pson4quipment8r0icsson6ni3s0q1tate5t1u0rovision8s2vents5xchange6pert3osed4ress5traspace10fage2il1rwinds6th3mily4n0s2rm0ers5shion4t3edex3edback6rrari3ero6i0delity5o2lm2nal1nce1ial7re0stone6mdale6sh0ing5t0ness6j1k1lickr3ghts4r2orist4wers5y2m1o0o0d1tball6rd1ex2sale4um3undation8x2r0ee1senius7l1ogans4ntier7tr2ujitsu5n0d2rniture7tbol5yi3ga0l0lery3o1up4me0s3p1rden4y2b0iz3d0n2e0a1nt0ing5orge5f1g0ee3h1i0ft0s3ves2ing5l0ass3e1obal2o4m0ail3bh2o1x2n1odaddy5ld0point6f2odyear5g0le4p1t1v2p1q1r0ainger5phics5tis4een3ipe3ocery4up4s1t1u0cci3ge2ide2tars5ru3w1y2hair2mburg5ngout5us3bo2dfc0bank7ealth0care8lp1sinki6re1mes5iphop4samitsu7tachi5v2k0t2m1n1ockey4ldings5iday5medepot5goods5s0ense7nda3rse3spital5t0ing5t0els3mail5use3w2r1sbc3t1u0ghes5yatt3undai7ibm2cbc2e1u2d1e0ee3fm2kano4l1m0amat4db2mo0bilien9n0c1dustries8finiti5o2g1k1stitute6urance4e4t0ernational10uit4vestments10o1piranga7q1r0ish4s0maili5t0anbul7t0au2v3jaguar4va3cb2e0ep2tzt3welry6io2ll2m0p2nj2o0bs1urg4t1y2p0morgan6rs3uegos4niper7kaufen5ddi3e0rryhotels6properties14fh2g1h1i0a1ds2m1ndle4tchen5wi3m1n1oeln3matsu5sher5p0mg2n2r0d1ed3uokgroup8w1y0oto4z2la0caixa5mborghini8er3nd0rover6xess5salle5t0ino3robe5w0yer5b1c1ds2ease3clerc5frak4gal2o2xus4gbt3i0dl2fe0insurance9style7ghting6ke2lly3mited4o2ncoln4k2ve1ing5k1lc1p2oan0s3cker3us3l1ndon4tte1o3ve3pl0financial11r1s1t0d0a3u0ndbeck6xe1ury5v1y2ma0drid4if1son4keup4n0agement7go3p1rket0ing3s4riott5shalls7ttel5ba2c0kinsey7d1e0d0ia3et2lbourne7me1orial6n0u2rck0msd7g1h1iami3crosoft7l1ni1t2t0subishi9k1l0b1s2m0a2n1o0bi0le4da2e1i1m1nash3ey2ster5rmon3tgage6scow4to0rcycles9v0ie4p1q1r1s0d2t0n1r2u0seum3ic4v1w1x1y1z2na0b1goya4me2vy3ba2c1e0c1t0bank4flix4work5ustar5w0s2xt0direct7us4f0l2g0o2hk2i0co2ke1on3nja3ssan1y5l1o0kia3rton4w0ruz3tv4p1r0a1w2tt2u1yc2z2obi1server7ffice5kinawa6layan0group9lo3m0ega4ne1g1l0ine5oo2pen3racle3nge4g0anic5igins6saka4tsuka4t2vh3pa0ge2nasonic7ris2s1tners4s1y3y2ccw3e0t2f0izer5g1h0armacy6d1ilips5one2to0graphy6s4ysio5ics1tet2ures6d1n0g1k2oneer5zza4k1l0ace2y0station9umbing5s3m1n0c2ohl2ker3litie5rn2st3r0axi3ess3ime3o0d0uctions8f1gressive8mo2perties3y5tection8u0dential9s1t1ub2w0c2y2qa1pon3uebec3st5racing4dio4e0ad1lestate6tor2y4cipes5d0umbrella9hab3ise0n3t2liance6n0t0als5pair3ort3ublican8st0aurant8view0s5xroth6ich0ardli6oh3l1o1p2o0cks3deo3gers4om3s0vp3u0gby3hr2n2w0e2yukyu6sa0arland6fe0ty4kura4le1on3msclub4ung5ndvik0coromant12ofi4p1rl2s1ve2xo3b0i1s2c0b1haeffler7midt4olarships8ol3ule3warz5ience5ot3d1e0arch3t2cure1ity6ek2lect4ner3rvices6ven3w1x0y3fr2g1h0angrila6rp3ell3ia1ksha5oes2p0ping5uji3w3i0lk2na1gles5te3j1k0i0n2y0pe4l0ing4m0art3ile4n0cf3o0ccer3ial4ftbank4ware6hu2lar2utions7ng1y2y2pa0ce3ort2t3r0l2s1t0ada2ples4r1tebank4farm7c0group6ockholm6rage3e3ream4udio2y3yle4u0cks3pplies3y2ort5rf1gery5zuki5v1watch4iss4x1y0dney4stems6z2tab1ipei4lk2obao4rget4tamotors6r2too4x0i3c0i2d0k2eam2ch0nology8l1masek5nnis4va3f1g1h0d1eater2re6iaa2ckets5enda4ps2res2ol4j0maxx4x2k0maxx5l1m0all4n1o0day3kyo3ols3p1ray3shiba5tal3urs3wn2yota3s3r0ade1ing4ining5vel0ers0insurance16ust3v2t1ube2i1nes3shu4v0s2w1z2ua1bank3s2g1k1nicom3versity8o2ol2ps2s1y1z2va0cations7na1guard7c1e0gas3ntures6risign5mögensberater2ung14sicherung10t2g1i0ajes4deo3g1king4llas4n1p1rgin4sa1ion4va1o3laanderen9n1odka3lvo3te1ing3o2yage5u2wales2mart4ter4ng0gou5tch0es6eather0channel12bcam3er2site5d0ding5ibo2r3f1hoswho6ien2ki2lliamhill9n0dows4e1ners6me2oodside6rk0s2ld3w2s1tc1f3xbox3erox4ihuan4n2xx2yz3yachts4hoo3maxun5ndex5e1odobashi7ga2kohama6u0tube6t1un3za0ppos4ra3ero3ip2m1one3uerich6w2", ge = "ελ1υ2бг1ел3дети4ею2католик6ом3мкд2он1сква6онлайн5рг3рус2ф2сайт3рб3укр3қаз3հայ3ישראל5קום3ابوظبي5رامكو5لاردن4بحرين5جزائر5سعودية6عليان5مغرب5مارات5یران5بارت2زار4يتك3ھارت5تونس4سودان3رية5شبكة4عراق2ب2مان4فلسطين6قطر3كاثوليك6وم3مصر2ليسيا5وريتانيا7قع4همراه5پاکستان7ڀارت4कॉम3नेट3भारत0म्3ोत5संगठन5বাংলা5ভারত2ৰত4ਭਾਰਤ4ભારત4ଭାରତ4இந்தியா6லங்கை6சிங்கப்பூர்11భారత్5ಭಾರತ4ഭാരതം5ලංකා4คอม3ไทย3ລາວ3გე2みんな3アマゾン4クラウド4グーグル4コム2ストア3セール3ファッション6ポイント4世界2中信1国1國1文网3亚马逊3企业2佛山2信息2健康2八卦2公司1益2台湾1灣2商城1店1标2嘉里0大酒店5在线2大拿2天主教3娱乐2家電2广东2微博2慈善2我爱你3手机2招聘2政务1府2新加坡2闻2时尚2書籍2机构2淡马锡3游戏2澳門2点看2移动2组织机构4网址1店1站1络2联通2谷歌2购物2通販2集团2電訊盈科4飞利浦3食品2餐厅2香格里拉3港2닷넷1컴2삼성2한국2", A = "numeric", _e = "ascii", ve = "alpha", ye = "asciinumeric", j = "alphanumeric", be = "domain", xe = "emoji", Se = "scheme", Ce = "slashscheme", we = "whitespace";
function M(e, t) {
	return e in t || (t[e] = []), t[e];
}
function Te(e, t, n) {
	t[A] && (t[ye] = !0, t[j] = !0), t[_e] && (t[ye] = !0, t[ve] = !0), t[ye] && (t[j] = !0), t[ve] && (t[j] = !0), t[j] && (t[be] = !0), t[xe] && (t[be] = !0);
	for (let r in t) {
		let t = M(r, n);
		t.indexOf(e) < 0 && t.push(e);
	}
}
function Ee(e, t) {
	let n = {};
	for (let r in t) t[r].indexOf(e) >= 0 && (n[r] = !0);
	return n;
}
function N(e = null) {
	this.j = {}, this.jr = [], this.jd = null, this.t = e;
}
N.groups = {}, N.prototype = {
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
		r ||= N.groups;
		let i;
		return t && t.j ? i = t : (i = new N(t), n && r && Te(t, n, r)), this.jr.push([e, i]), i;
	},
	ts(e, t, n, r) {
		let i = this, a = e.length;
		if (!a) return i;
		for (let t = 0; t < a - 1; t++) i = i.tt(e[t]);
		return i.tt(e[a - 1], t, n, r);
	},
	tt(e, t, n, r) {
		r ||= N.groups;
		let i = this;
		if (t && t.j) return i.j[e] = t, t;
		let a = t, o, s = i.go(e);
		return s ? (o = new N(), Object.assign(o.j, s.j), o.jr.push.apply(o.jr, s.jr), o.jd = s.jd, o.t = s.t) : o = new N(), a && (r && (o.t && typeof o.t == "string" ? Te(a, Object.assign(Ee(o.t, r), n), r) : n && Te(a, n, r)), o.t = a), i.j[e] = o, o;
	}
};
var P = (e, t, n, r, i) => e.ta(t, n, r, i), F = (e, t, n, r, i) => e.tr(t, n, r, i), De = (e, t, n, r, i) => e.ts(t, n, r, i), I = (e, t, n, r, i) => e.tt(t, n, r, i), L = "WORD", Oe = "UWORD", ke = "ASCIINUMERICAL", Ae = "ALPHANUMERICAL", je = "LOCALHOST", Me = "TLD", Ne = "UTLD", Pe = "SCHEME", Fe = "SLASH_SCHEME", Ie = "NUM", Le = "WS", Re = "NL", ze = "OPENBRACE", Be = "CLOSEBRACE", Ve = "OPENBRACKET", He = "CLOSEBRACKET", Ue = "OPENPAREN", We = "CLOSEPAREN", Ge = "OPENANGLEBRACKET", Ke = "CLOSEANGLEBRACKET", qe = "FULLWIDTHLEFTPAREN", Je = "FULLWIDTHRIGHTPAREN", Ye = "LEFTCORNERBRACKET", Xe = "RIGHTCORNERBRACKET", Ze = "LEFTWHITECORNERBRACKET", Qe = "RIGHTWHITECORNERBRACKET", $e = "FULLWIDTHLESSTHAN", et = "FULLWIDTHGREATERTHAN", tt = "AMPERSAND", nt = "APOSTROPHE", rt = "ASTERISK", R = "AT", it = "BACKSLASH", at = "BACKTICK", ot = "CARET", st = "COLON", ct = "COMMA", lt = "DOLLAR", z = "DOT", ut = "EQUALS", dt = "EXCLAMATION", B = "HYPHEN", ft = "PERCENT", pt = "PIPE", mt = "PLUS", ht = "POUND", gt = "QUERY", _t = "QUOTE", vt = "FULLWIDTHMIDDLEDOT", yt = "SEMI", V = "SLASH", bt = "TILDE", xt = "UNDERSCORE", St = "EMOJI", Ct = "SYM", wt = /*#__PURE__*/ Object.freeze({
	__proto__: null,
	ALPHANUMERICAL: Ae,
	AMPERSAND: tt,
	APOSTROPHE: nt,
	ASCIINUMERICAL: ke,
	ASTERISK: rt,
	AT: R,
	BACKSLASH: it,
	BACKTICK: at,
	CARET: ot,
	CLOSEANGLEBRACKET: Ke,
	CLOSEBRACE: Be,
	CLOSEBRACKET: He,
	CLOSEPAREN: We,
	COLON: st,
	COMMA: ct,
	DOLLAR: lt,
	DOT: z,
	EMOJI: St,
	EQUALS: ut,
	EXCLAMATION: dt,
	FULLWIDTHGREATERTHAN: et,
	FULLWIDTHLEFTPAREN: qe,
	FULLWIDTHLESSTHAN: $e,
	FULLWIDTHMIDDLEDOT: vt,
	FULLWIDTHRIGHTPAREN: Je,
	HYPHEN: B,
	LEFTCORNERBRACKET: Ye,
	LEFTWHITECORNERBRACKET: Ze,
	LOCALHOST: je,
	NL: Re,
	NUM: Ie,
	OPENANGLEBRACKET: Ge,
	OPENBRACE: ze,
	OPENBRACKET: Ve,
	OPENPAREN: Ue,
	PERCENT: ft,
	PIPE: pt,
	PLUS: mt,
	POUND: ht,
	QUERY: gt,
	QUOTE: _t,
	RIGHTCORNERBRACKET: Xe,
	RIGHTWHITECORNERBRACKET: Qe,
	SCHEME: Pe,
	SEMI: yt,
	SLASH: V,
	SLASH_SCHEME: Fe,
	SYM: Ct,
	TILDE: bt,
	TLD: Me,
	UNDERSCORE: xt,
	UTLD: Ne,
	UWORD: Oe,
	WORD: L,
	WS: Le
}), H = /[a-z]/, Tt = /\p{L}/u, Et = /\p{Emoji}/u, U = /\d/, Dt = /\s/, Ot = "\r", kt = "\n", At = "️", jt = "‍", Mt = "￼", Nt = null, Pt = null;
function Ft(e = []) {
	let t = {};
	N.groups = t;
	let n = new N();
	Nt ??= Rt(he), Pt ??= Rt(ge), I(n, "'", nt), I(n, "{", ze), I(n, "}", Be), I(n, "[", Ve), I(n, "]", He), I(n, "(", Ue), I(n, ")", We), I(n, "<", Ge), I(n, ">", Ke), I(n, "（", qe), I(n, "）", Je), I(n, "「", Ye), I(n, "」", Xe), I(n, "『", Ze), I(n, "』", Qe), I(n, "＜", $e), I(n, "＞", et), I(n, "&", tt), I(n, "*", rt), I(n, "@", R), I(n, "`", at), I(n, "^", ot), I(n, ":", st), I(n, ",", ct), I(n, "$", lt), I(n, ".", z), I(n, "=", ut), I(n, "!", dt), I(n, "-", B), I(n, "%", ft), I(n, "|", pt), I(n, "+", mt), I(n, "#", ht), I(n, "?", gt), I(n, "\"", _t), I(n, "/", V), I(n, ";", yt), I(n, "~", bt), I(n, "_", xt), I(n, "\\", it), I(n, "・", vt);
	let r = F(n, U, Ie, { [A]: !0 });
	F(r, U, r);
	let i = F(r, H, ke, { [ye]: !0 }), a = F(r, Tt, Ae, { [j]: !0 }), o = F(n, H, L, { [_e]: !0 });
	F(o, U, i), F(o, H, o), F(i, U, i), F(i, H, i);
	let s = F(n, Tt, Oe, { [ve]: !0 });
	F(s, H), F(s, U, a), F(s, Tt, s), F(a, U, a), F(a, H), F(a, Tt, a);
	let c = I(n, kt, Re, { [we]: !0 }), l = I(n, Ot, Le, { [we]: !0 }), u = F(n, Dt, Le, { [we]: !0 });
	I(n, Mt, u), I(l, kt, c), I(l, Mt, u), F(l, Dt, u), I(u, Ot), I(u, kt), F(u, Dt, u), I(u, Mt, u);
	let d = F(n, Et, St, { [xe]: !0 });
	I(d, "#"), F(d, Et, d), I(d, At, d);
	let f = I(d, jt);
	I(f, "#"), F(f, Et, d);
	let p = [[H, o], [U, i]], m = [
		[H, null],
		[Tt, s],
		[U, a]
	];
	for (let e = 0; e < Nt.length; e++) W(n, Nt[e], Me, L, p);
	for (let e = 0; e < Pt.length; e++) W(n, Pt[e], Ne, Oe, m);
	Te(Me, {
		tld: !0,
		ascii: !0
	}, t), Te(Ne, {
		utld: !0,
		alpha: !0
	}, t), W(n, "file", Pe, L, p), W(n, "mailto", Pe, L, p), W(n, "http", Fe, L, p), W(n, "https", Fe, L, p), W(n, "ftp", Fe, L, p), W(n, "ftps", Fe, L, p), Te(Pe, {
		scheme: !0,
		ascii: !0
	}, t), Te(Fe, {
		slashscheme: !0,
		ascii: !0
	}, t), e = e.sort((e, t) => e[0] > t[0] ? 1 : -1);
	for (let t = 0; t < e.length; t++) {
		let r = e[t][0], i = e[t][1] ? { [Se]: !0 } : { [Ce]: !0 };
		r.indexOf("-") >= 0 ? i[be] = !0 : H.test(r) ? U.test(r) ? i[ye] = !0 : i[_e] = !0 : i[A] = !0, De(n, r, r, i);
	}
	return De(n, "localhost", je, { ascii: !0 }), n.jd = new N(Ct), {
		start: n,
		tokens: Object.assign({ groups: t }, wt)
	};
}
function It(e, t) {
	let n = Lt(t.replace(/[A-Z]/g, (e) => e.toLowerCase())), r = n.length, i = [], a = 0, o = 0;
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
function Lt(e) {
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
		e.j[o] ? a = e.j[o] : (a = new N(r), a.jr = i.slice(), e.j[o] = a), e = a;
	}
	return a = new N(n), a.jr = i.slice(), e.j[t[o - 1]] = a, a;
}
function Rt(e) {
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
var zt = {
	defaultProtocol: "http",
	events: null,
	format: Vt,
	formatHref: Vt,
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
function Bt(e, t = null) {
	let n = Object.assign({}, zt);
	e && (n = Object.assign(n, e instanceof Bt ? e.o : e));
	let r = n.ignoreTags, i = [];
	for (let e = 0; e < r.length; e++) i.push(r[e].toUpperCase());
	this.o = n, t && (this.defaultRender = t), this.ignoreTags = i;
}
Bt.prototype = {
	o: zt,
	ignoreTags: [],
	defaultRender(e) {
		return e;
	},
	check(e) {
		return this.get("validate", e.toString(), e);
	},
	get(e, t, n) {
		let r = t != null, i = this.o[e];
		return i && (typeof i == "object" ? (i = n.t in i ? i[n.t] : zt[e], typeof i == "function" && r && (i = i(t, n))) : typeof i == "function" && r && (i = i(t, n.t, n)), i);
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
function Vt(e) {
	return e;
}
function Ht(e, t) {
	this.t = "token", this.v = e, this.tk = t;
}
Ht.prototype = {
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
	toObject(e = zt.defaultProtocol) {
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
function Ut(e, t) {
	class n extends Ht {
		constructor(t, n) {
			super(t, n), this.t = e;
		}
	}
	for (let e in t) n.prototype[e] = t[e];
	return n.t = e, n;
}
var Wt = Ut("email", {
	isLink: !0,
	toHref() {
		return "mailto:" + this.toString();
	}
}), Gt = Ut("text"), Kt = Ut("nl"), qt = Ut("url", {
	isLink: !0,
	toHref(e = zt.defaultProtocol) {
		return this.hasProtocol() ? this.v : `${e}://${this.v}`;
	},
	hasProtocol() {
		let e = this.tk;
		return e.length >= 2 && e[0].t !== je && e[1].t === st;
	}
}), G = (e) => new N(e);
function Jt({ groups: e }) {
	let t = e.domain.concat([
		tt,
		rt,
		R,
		it,
		at,
		ot,
		lt,
		ut,
		B,
		Ie,
		ft,
		pt,
		mt,
		ht,
		V,
		Ct,
		bt,
		xt
	]), n = [
		nt,
		st,
		ct,
		z,
		dt,
		ft,
		gt,
		_t,
		yt,
		Ge,
		Ke,
		ze,
		Be,
		He,
		Ve,
		Ue,
		We,
		qe,
		Je,
		Ye,
		Xe,
		Ze,
		Qe,
		$e,
		et
	], r = [
		tt,
		nt,
		rt,
		it,
		at,
		ot,
		lt,
		ut,
		B,
		ze,
		Be,
		ft,
		pt,
		mt,
		ht,
		gt,
		V,
		Ct,
		bt,
		xt
	], i = G(), a = I(i, bt);
	P(a, r, a), P(a, e.domain, a);
	let o = G(), s = G(), c = G();
	P(i, e.domain, o), P(i, e.scheme, s), P(i, e.slashscheme, c), P(o, r, a), P(o, e.domain, o);
	let l = I(o, R);
	I(a, R, l), I(s, R, l), I(c, R, l);
	let u = I(a, z);
	P(u, r, a), P(u, e.domain, a);
	let d = G();
	P(l, e.domain, d), P(d, e.domain, d);
	let f = I(d, z);
	P(f, e.domain, d);
	let p = G(Wt);
	P(f, e.tld, p), P(f, e.utld, p), I(l, je, p);
	let m = I(d, B);
	I(m, B, m), P(m, e.domain, d), P(p, e.domain, d), I(p, z, f), I(p, B, m);
	let h = I(o, B), g = I(o, z);
	I(h, B, h), P(h, e.domain, o), P(g, r, a), P(g, e.domain, o);
	let _ = G(qt);
	P(g, e.tld, _), P(g, e.utld, _), P(_, e.domain, o), P(_, r, a), I(_, z, g), I(_, B, h), I(_, R, l);
	let v = I(_, st), y = G(qt);
	P(v, e.numeric, y);
	let b = G(qt), x = G();
	P(b, t, b), P(b, n, x), P(x, t, b), P(x, n, x), I(_, V, b), I(y, V, b);
	let S = I(s, st), C = I(I(I(c, st), V), V);
	P(s, e.domain, o), I(s, z, g), I(s, B, h), P(c, e.domain, o), I(c, z, g), I(c, B, h), P(S, e.domain, b), I(S, V, b), I(S, gt, b), P(C, e.domain, b), P(C, t, b), I(C, V, b);
	let w = [
		[ze, Be],
		[Ve, He],
		[Ue, We],
		[Ge, Ke],
		[qe, Je],
		[Ye, Xe],
		[Ze, Qe],
		[$e, et]
	];
	for (let e = 0; e < w.length; e++) {
		let [r, i] = w[e], a = I(b, r);
		I(x, r, a);
		let o = G(qt);
		P(a, t, o);
		let s = G();
		P(a, n, s), I(a, i, b), P(o, t, o), P(o, n, s), P(s, t, o), P(s, n, s), I(o, i, b), I(s, i, b);
	}
	return I(i, je, _), I(i, Re, Kt), {
		start: i,
		tokens: wt
	};
}
function Yt(e, t, n) {
	let r = n.length, i = 0, a = [], o = [];
	for (; i < r;) {
		let s = e, c = null, l = null, u = 0, d = null, f = -1;
		for (; i < r && !(c = s.go(n[i].t));) o.push(n[i++]);
		for (; i < r && (l = c || s.go(n[i].t));) c = null, s = l, s.accepts() ? (f = 0, d = s) : f >= 0 && f++, i++, u++;
		if (f < 0) i -= u, i < r && (o.push(n[i]), i++);
		else {
			o.length > 0 && (a.push(Xt(Gt, t, o)), o = []), i -= f, u -= f;
			let e = d.t, r = n.slice(i - u, i);
			a.push(Xt(e, t, r));
		}
	}
	return o.length > 0 && a.push(Xt(Gt, t, o)), a;
}
function Xt(e, t, n) {
	let r = n[0].s, i = n[n.length - 1].e;
	return new e(t.slice(r, i), n);
}
var Zt = typeof console < "u" && console && console.warn || (() => {}), Qt = "until manual call of linkify.init(). Register all schemes and plugins before invoking linkify the first time.", K = {
	scanner: null,
	parser: null,
	tokenQueue: [],
	pluginQueue: [],
	customSchemes: [],
	initialized: !1
};
function $t() {
	return N.groups = {}, K.scanner = null, K.parser = null, K.tokenQueue = [], K.pluginQueue = [], K.customSchemes = [], K.initialized = !1, K;
}
function en(e, t = !1) {
	if (K.initialized && Zt(`linkifyjs: already initialized - will not register custom scheme "${e}" ${Qt}`), !/^[0-9a-z]+(-[0-9a-z]+)*$/.test(e)) throw Error("linkifyjs: incorrect scheme format.\n1. Must only contain digits, lowercase ASCII letters or \"-\"\n2. Cannot start or end with \"-\"\n3. \"-\" cannot repeat");
	K.customSchemes.push([e, t]);
}
function tn() {
	K.scanner = Ft(K.customSchemes);
	for (let e = 0; e < K.tokenQueue.length; e++) K.tokenQueue[e][1]({ scanner: K.scanner });
	K.parser = Jt(K.scanner.tokens);
	for (let e = 0; e < K.pluginQueue.length; e++) K.pluginQueue[e][1]({
		scanner: K.scanner,
		parser: K.parser
	});
	return K.initialized = !0, K;
}
function nn(e) {
	return K.initialized || tn(), Yt(K.parser.start, e, It(K.scanner.start, e));
}
nn.scan = It;
function rn(e, t = null, n = null) {
	if (t && typeof t == "object") {
		if (n) throw Error(`linkifyjs: Invalid link type ${t}; must be a string`);
		n = t, t = null;
	}
	let r = new Bt(n), i = nn(e), a = [];
	for (let e = 0; e < i.length; e++) {
		let n = i[e];
		n.isLink && (!t || n.t === t) && r.check(n) && a.push(n.toFormattedObject(r));
	}
	return a;
}
//#endregion
//#region node_modules/@tiptap/extension-link/dist/index.js
var an = "[\0- \xA0 ᠎ -\u2029 　]", on = new RegExp(an), sn = RegExp(`${an}$`), cn = new RegExp(an, "g");
function ln(e) {
	return e.length === 1 ? e[0].isLink : e.length === 3 && e[1].isLink ? ["()", "[]"].includes(e[0].value + e[2].value) : !1;
}
function un(e) {
	return new O({
		key: new k("autolink"),
		appendTransaction: (t, n, r) => {
			let i = t.some((e) => e.docChanged) && !n.doc.eq(r.doc), a = t.some((e) => e.getMeta("preventAutolink"));
			if (!i || a) return;
			let { tr: o } = r, s = T(n.doc, [...t]);
			if (D(s).forEach(({ newRange: t }) => {
				let n = ee(r.doc, t, (e) => e.isTextblock), i, a;
				if (n.length > 1) i = n[0], a = r.doc.textBetween(i.pos, i.pos + i.node.nodeSize, void 0, " ");
				else if (n.length) {
					let e = r.doc.textBetween(t.from, t.to, " ", " ");
					if (!sn.test(e)) return;
					i = n[0], a = r.doc.textBetween(i.pos, t.to, void 0, " ");
				}
				if (i && a) {
					let t = a.split(on).filter(Boolean);
					if (t.length <= 0) return !1;
					let n = t[t.length - 1], s = i.pos + a.lastIndexOf(n);
					if (!n) return !1;
					let c = nn(n).map((t) => t.toObject(e.defaultProtocol));
					if (!ln(c)) return !1;
					c.filter((e) => e.isLink).map((e) => ({
						...e,
						from: s + e.start + 1,
						to: s + e.end + 1
					})).filter((e) => !r.schema.marks.code || !r.doc.rangeHasMark(e.from, e.to, r.schema.marks.code)).filter((t) => e.validate(t.value)).filter((t) => e.shouldAutoLink(t.value)).forEach((t) => {
						ne(t.from, t.to, r.doc).some((t) => t.mark.type === e.type) || o.addMark(t.from, t.to, e.type.create({ href: t.href }));
					});
				}
			}), o.steps.length) return o;
		}
	});
}
function dn(e) {
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
				let n = te(t.state, e.type.name), r = i.href ?? n.href, o = i.target ?? n.target;
				r && (window.open(r, o), a = !0);
			}
			return a;
		} }
	});
}
var fn = /\[([^[\]]+)\]\(((?:[^\s()]|\([^\s()]*\))+)(?:\s+(?:(["'])(.*?)\3|“(.*?)”|‘(.*?)’))?\)$/, pn = /\[([^[\]]+)\]\(((?:[^\s()]|\([^\s()]*\))+)(?:\s+(?:(["'])(.*?)\3|“(.*?)”|‘(.*?)’))?\)/g;
function mn(e, t) {
	let n = 0;
	for (let r = t - 1; r >= 0 && e[r] === "\\"; --r) n += 1;
	return n % 2 == 1;
}
function hn(e, t) {
	let n = 0, r = 0;
	for (; r < t;) {
		if (e[r] !== "`") {
			r += 1;
			continue;
		}
		if (n === 0 && mn(e, r)) {
			r += 1;
			continue;
		}
		let i = 0;
		for (; r < t && e[r] === "`";) i += 1, r += 1;
		n === 0 ? n = i : i === n && (n = 0);
	}
	return n > 0;
}
function gn(e, t, n) {
	let [, r, i] = t;
	return (t.index ? e[t.index - 1] : void 0) === "!" || mn(e, t.index ?? 0) || hn(e, t.index ?? 0) ? !1 : !!r.trim() && n(i);
}
function _n(e) {
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
function vn(e, t) {
	return e.index < t.index + t.text.length && t.index < e.index + e.text.length;
}
function yn(e) {
	return {
		href: e.data?.href,
		title: e.data?.title ?? null
	};
}
function bn(e) {
	let t = re({
		find: (t) => {
			let n = fn.exec(t);
			return !n || !gn(t, n, e.isAllowedHref) ? null : _n(n);
		},
		type: e.type,
		getAttributes: yn
	});
	return new S({
		find: t.find,
		handler: (e) => {
			let n = t.handler(e);
			return n !== null && e.state.tr.steps.length && e.state.tr.setMeta("preventAutolink", !0), n;
		}
	});
}
function xn(e) {
	let t = ie({
		find: (t) => {
			let n = [];
			for (let r of t.matchAll(pn)) gn(t, r, e.isAllowedHref) && n.push(_n(r));
			let r = (e.findPlainUrls?.call(e, t) ?? []).filter((e) => !n.some((t) => vn(t, e)));
			return [...n, ...r];
		},
		type: e.type,
		getAttributes: yn
	});
	return new w({
		find: t.find,
		handler: (e) => {
			let n = t.handler(e);
			return n !== null && e.state.tr.steps.length && e.match.data?.markdown && e.state.tr.setMeta("preventAutolink", !0), n;
		}
	});
}
function Sn(e) {
	return new O({
		key: new k("handlePasteLink"),
		props: { handlePaste: (t, n, r) => {
			let { shouldAutoLink: i } = e, { state: a } = t, { selection: o } = a, { empty: s } = o;
			if (s) return !1;
			let c = "";
			r.content.forEach((e) => {
				c += e.textContent;
			});
			let l = rn(c, { defaultProtocol: e.defaultProtocol }).find((e) => e.isLink && e.value === c);
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
	}), !e || e.replace(cn, "").match(RegExp(`^(?:(?:${n.map((e) => e.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&")).join("|")}):|[^a-z]|[a-z0-9+.\\-]+(?:[^a-z+.\\-:]|$))`, "i"));
}
var Cn = C.create({
	name: "link",
	priority: 1e3,
	keepOnSplit: !1,
	exitable: !0,
	onCreate() {
		this.options.validate && !this.options.shouldAutoLink && (this.options.shouldAutoLink = this.options.validate, console.warn("The `validate` option is deprecated. Rename to the `shouldAutoLink` option instead.")), this.options.protocols.forEach((e) => {
			if (typeof e == "string") {
				en(e);
				return;
			}
			en(e.scheme, e.optionalSlashes);
		});
	},
	onDestroy() {
		$t();
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
			ae(this.options.HTMLAttributes, e),
			0
		] : [
			"a",
			ae(this.options.HTMLAttributes, {
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
		return this.options.markdownLinks ? [bn({
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
				rn(e).filter((e) => e.isLink && this.options.isAllowedUri(e.value, {
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
		return this.options.markdownLinks ? [xn({
			type: this.type,
			isAllowedHref: (e) => this.options.isAllowedUri(e, {
				defaultValidate: (e) => !!q(e, this.options.protocols),
				protocols: this.options.protocols,
				defaultProtocol: this.options.defaultProtocol
			}),
			findPlainUrls: e
		})] : [ie({
			find: e,
			type: this.type,
			getAttributes: (e) => ({ href: e.data?.href })
		})];
	},
	addProseMirrorPlugins() {
		let e = [], { protocols: t, defaultProtocol: n } = this.options;
		return this.options.autolink && e.push(un({
			type: this.type,
			defaultProtocol: this.options.defaultProtocol,
			validate: (e) => this.options.isAllowedUri(e, {
				defaultValidate: (e) => !!q(e, t),
				protocols: t,
				defaultProtocol: n
			}),
			shouldAutoLink: this.options.shouldAutoLink
		})), e.push(dn({
			type: this.type,
			editor: this.editor,
			openOnClick: this.options.openOnClick === "whenNotEditable" || this.options.openOnClick,
			enableClickSelection: this.options.enableClickSelection
		})), this.options.linkOnPaste && e.push(Sn({
			editor: this.editor,
			defaultProtocol: this.options.defaultProtocol,
			type: this.type,
			shouldAutoLink: this.options.shouldAutoLink
		})), e;
	}
}), wn = Math.min, Tn = Math.max, En = Math.round, Dn = Math.floor, J = (e) => ({
	x: e,
	y: e
}), On = {
	left: "right",
	right: "left",
	bottom: "top",
	top: "bottom"
};
function kn(e, t) {
	return typeof e == "function" ? e(t) : e;
}
function An(e) {
	return e.split("-")[0];
}
function jn(e) {
	return e.split("-")[1];
}
function Mn(e) {
	return e === "x" ? "y" : "x";
}
function Nn(e) {
	return e === "y" ? "height" : "width";
}
function Pn(e) {
	let t = e[0];
	return t === "t" || t === "b" ? "y" : "x";
}
function Fn(e) {
	return Mn(Pn(e));
}
function In(e, t, n) {
	n === void 0 && (n = !1);
	let r = jn(e), i = Fn(e), a = Nn(i), o = i === "x" ? r === (n ? "end" : "start") ? "right" : "left" : r === "start" ? "bottom" : "top";
	return t.reference[a] > t.floating[a] && (o = Gn(o)), [o, Gn(o)];
}
function Ln(e) {
	let t = Gn(e);
	return [
		Rn(e),
		t,
		Rn(t)
	];
}
function Rn(e) {
	return e.includes("start") ? e.replace("start", "end") : e.replace("end", "start");
}
var zn = ["left", "right"], Bn = ["right", "left"], Vn = ["top", "bottom"], Hn = ["bottom", "top"];
function Un(e, t, n) {
	switch (e) {
		case "top":
		case "bottom": return n ? t ? Bn : zn : t ? zn : Bn;
		case "left":
		case "right": return t ? Vn : Hn;
		default: return [];
	}
}
function Wn(e, t, n, r) {
	let i = jn(e), a = Un(An(e), n === "start", r);
	return i && (a = a.map((e) => e + "-" + i), t && (a = a.concat(a.map(Rn)))), a;
}
function Gn(e) {
	let t = An(e);
	return On[t] + e.slice(t.length);
}
function Kn(e) {
	return {
		top: e.top ?? 0,
		right: e.right ?? 0,
		bottom: e.bottom ?? 0,
		left: e.left ?? 0
	};
}
function qn(e) {
	return typeof e == "number" ? {
		top: e,
		right: e,
		bottom: e,
		left: e
	} : Kn(e);
}
function Jn(e) {
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
function Yn(e, t, n) {
	let { reference: r, floating: i } = e, a = Pn(t), o = Fn(t), s = Nn(o), c = An(t), l = a === "y", u = r.x + r.width / 2 - i.width / 2, d = r.y + r.height / 2 - i.height / 2, f = r[s] / 2 - i[s] / 2, p;
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
	let m = jn(t);
	return m && (p[o] += f * (m === "end" ? 1 : -1) * (n && l ? -1 : 1)), p;
}
async function Xn(e, t) {
	t === void 0 && (t = {});
	let { x: n, y: r, platform: i, rects: a, elements: o, strategy: s } = e, { boundary: c = "clippingAncestors", rootBoundary: l = "viewport", elementContext: u = "floating", altBoundary: d = !1, padding: f = 0 } = kn(t, e), p = qn(f), m = o[d ? u === "floating" ? "reference" : "floating" : u], h = Jn(await i.getClippingRect({
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
	}, y = Jn(i.convertOffsetParentRelativeRectToViewportRelativeRect ? await i.convertOffsetParentRelativeRectToViewportRelativeRect({
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
var Zn = 50, Qn = async (e, t, n) => {
	let { placement: r = "bottom", strategy: i = "absolute", middleware: a = [], platform: o } = n, s = o.detectOverflow ? o : {
		...o,
		detectOverflow: Xn
	}, c = await (o.isRTL == null ? void 0 : o.isRTL(t)), l = await o.getElementRects({
		reference: e,
		floating: t,
		strategy: i
	}), { x: u, y: d } = Yn(l, r, c), f = r, p = 0, m = {};
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
		}, x && p < Zn && (p++, typeof x == "object" && (x.placement && (f = x.placement), x.rects && (l = x.rects === !0 ? await o.getElementRects({
			reference: e,
			floating: t,
			strategy: i
		}) : x.rects), {x: u, y: d} = Yn(l, f, c)), n = -1);
	}
	return {
		x: u,
		y: d,
		placement: f,
		strategy: i,
		middlewareData: m
	};
}, $n = function(e) {
	return e === void 0 && (e = {}), {
		name: "flip",
		options: e,
		async fn(t) {
			var n;
			let { placement: r, middlewareData: i, rects: a, initialPlacement: o, platform: s, elements: c } = t, { mainAxis: l = !0, crossAxis: u = !0, fallbackPlacements: d, fallbackStrategy: f = "bestFit", fallbackAxisSideDirection: p = "none", flipAlignment: m = !0, ...h } = kn(e, t);
			if ((n = i.arrow) != null && n.alignmentOffset) return {};
			let g = An(r), _ = Pn(o), v = An(o) === o, y = await (s.isRTL == null ? void 0 : s.isRTL(c.floating)), b = d || (v || !m ? [Gn(o)] : Ln(o)), x = p !== "none";
			!d && x && b.push(...Wn(o, m, p, y));
			let S = [o, ...b], C = await s.detectOverflow(t, h), w = [], T = i.flip?.overflows || [];
			if (l && w.push(C[g]), u) {
				let e = In(r, a, y);
				w.push(C[e[0]], C[e[1]]);
			}
			if (T = [...T, {
				placement: r,
				overflows: w
			}], !w.every((e) => e <= 0)) {
				let e = (i.flip?.index || 0) + 1, t = S[e];
				if (t && (u !== "alignment" || _ === Pn(t) || T.every((e) => Pn(e.placement) !== _ || e.overflows[0] > 0))) return {
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
								let t = Pn(e.placement);
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
}, er = /*#__PURE__*/ new Set(["left", "top"]);
async function tr(e, t) {
	let { placement: n, platform: r, elements: i } = e, a = await (r.isRTL == null ? void 0 : r.isRTL(i.floating)), o = An(n), s = jn(n), c = Pn(n) === "y", l = er.has(o) ? -1 : 1, u = a && c ? -1 : 1, d = kn(t, e), { mainAxis: f, crossAxis: p, alignmentAxis: m } = typeof d == "number" ? {
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
var nr = function(e) {
	return e === void 0 && (e = 0), {
		name: "offset",
		options: e,
		async fn(t) {
			var n;
			let { x: r, y: i, placement: a, middlewareData: o } = t, s = await tr(t, e);
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
function rr() {
	return typeof window < "u";
}
function ir(e) {
	return ar(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function Y(e) {
	var t;
	return (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function X(e) {
	return ((ar(e) ? e.ownerDocument : e.document) || window.document)?.documentElement;
}
function ar(e) {
	return rr() ? e instanceof Node || e instanceof Y(e).Node : !1;
}
function Z(e) {
	return rr() ? e instanceof Element || e instanceof Y(e).Element : !1;
}
function Q(e) {
	return rr() ? e instanceof HTMLElement || e instanceof Y(e).HTMLElement : !1;
}
function or(e) {
	return !rr() || typeof ShadowRoot > "u" ? !1 : e instanceof ShadowRoot || e instanceof Y(e).ShadowRoot;
}
function sr(e) {
	let { overflow: t, overflowX: n, overflowY: r, display: i } = $(e);
	return /auto|scroll|overlay|hidden|clip/.test(t + r + n) && i !== "inline" && i !== "contents";
}
function cr(e) {
	return /^(table|td|th)$/.test(ir(e));
}
function lr(e) {
	try {
		if (e.matches(":popover-open")) return !0;
	} catch {}
	try {
		return e.matches(":modal");
	} catch {
		return !1;
	}
}
var ur = /transform|translate|scale|rotate|perspective|filter/, dr = /paint|layout|strict|content/, fr = (e) => !!e && e !== "none", pr;
function mr(e) {
	let t = Z(e) ? $(e) : e;
	return fr(t.transform) || fr(t.translate) || fr(t.scale) || fr(t.rotate) || fr(t.perspective) || !gr() && (fr(t.backdropFilter) || fr(t.filter)) || ur.test(t.willChange || "") || dr.test(t.contain || "");
}
function hr(e) {
	let t = yr(e);
	for (; Q(t) && !_r(t);) {
		if (mr(t)) return t;
		if (lr(t)) return null;
		t = yr(t);
	}
	return null;
}
function gr() {
	return pr ??= typeof CSS < "u" && CSS.supports && CSS.supports("-webkit-backdrop-filter", "none"), pr;
}
function _r(e) {
	return /^(html|body|#document)$/.test(ir(e));
}
function $(e) {
	return Y(e).getComputedStyle(e);
}
function vr(e) {
	return Z(e) ? {
		scrollLeft: e.scrollLeft,
		scrollTop: e.scrollTop
	} : {
		scrollLeft: e.scrollX,
		scrollTop: e.scrollY
	};
}
function yr(e) {
	if (ir(e) === "html") return e;
	let t = e.assignedSlot || e.parentNode || or(e) && e.host || X(e);
	return or(t) ? t.host : t;
}
function br(e) {
	let t = yr(e);
	return _r(t) ? (e.ownerDocument || e).body : Q(t) && sr(t) ? t : br(t);
}
function xr(e, t, n) {
	t === void 0 && (t = []), n === void 0 && (n = !0);
	let r = br(e), i = r === e.ownerDocument?.body, a = Y(r);
	if (i) {
		let e = Sr(a);
		return t.concat(a, a.visualViewport || [], sr(r) ? r : [], e && n ? xr(e) : []);
	}
	return t.concat(r, xr(r, [], n));
}
function Sr(e) {
	return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
//#endregion
//#region node_modules/@floating-ui/dom/dist/floating-ui.dom.mjs
function Cr(e) {
	let t = $(e), n = parseFloat(t.width) || 0, r = parseFloat(t.height) || 0, i = Q(e), a = i ? e.offsetWidth : n, o = i ? e.offsetHeight : r, s = En(n) !== a || En(r) !== o;
	return s && (n = a, r = o), {
		width: n,
		height: r,
		$: s
	};
}
function wr(e) {
	return Z(e) ? e : e.contextElement;
}
function Tr(e) {
	let t = wr(e);
	if (!Q(t)) return J(1);
	let n = t.getBoundingClientRect(), { width: r, height: i, $: a } = Cr(t), o = (a ? En(n.width) : n.width) / r, s = (a ? En(n.height) : n.height) / i;
	return (!o || !Number.isFinite(o)) && (o = 1), (!s || !Number.isFinite(s)) && (s = 1), {
		x: o,
		y: s
	};
}
var Er = /*#__PURE__*/ J(0);
function Dr(e) {
	let t = Y(e);
	return !gr() || !t.visualViewport ? Er : {
		x: t.visualViewport.offsetLeft,
		y: t.visualViewport.offsetTop
	};
}
function Or(e, t, n) {
	return t === void 0 && (t = !1), !!n && t && n === Y(e);
}
function kr(e, t, n, r) {
	t === void 0 && (t = !1), n === void 0 && (n = !1);
	let i = e.getBoundingClientRect(), a = wr(e), o = J(1);
	t && (r ? Z(r) && (o = Tr(r)) : o = Tr(e));
	let s = Or(a, n, r) ? Dr(a) : J(0), c = (i.left + s.x) / o.x, l = (i.top + s.y) / o.y, u = i.width / o.x, d = i.height / o.y;
	if (a && r) {
		let e = Y(a), t = Z(r) ? Y(r) : r, n = e, i = Sr(n);
		for (; i && t !== n;) {
			let e = Tr(i), t = i.getBoundingClientRect(), r = $(i), a = t.left + (i.clientLeft + parseFloat(r.paddingLeft)) * e.x, o = t.top + (i.clientTop + parseFloat(r.paddingTop)) * e.y;
			c *= e.x, l *= e.y, u *= e.x, d *= e.y, c += a, l += o, n = Y(i), i = Sr(n);
		}
	}
	return Jn({
		width: u,
		height: d,
		x: c,
		y: l
	});
}
function Ar(e, t) {
	let n = vr(e).scrollLeft;
	return t ? t.left + n : kr(X(e)).left + n;
}
function jr(e, t) {
	let n = e.getBoundingClientRect();
	return {
		x: n.left + t.scrollLeft - Ar(e, n),
		y: n.top + t.scrollTop
	};
}
function Mr(e) {
	let { elements: t, rect: n, offsetParent: r, strategy: i } = e, a = i === "fixed", o = X(r), s = t ? lr(t.floating) : !1;
	if (r === o || s && a) return n;
	let c = {
		scrollLeft: 0,
		scrollTop: 0
	}, l = J(1), u = J(0), d = Q(r);
	if ((d || !a) && ((ir(r) !== "body" || sr(o)) && (c = vr(r)), d)) {
		let e = kr(r);
		l = Tr(r), u.x = e.x + r.clientLeft, u.y = e.y + r.clientTop;
	}
	let f = o && !d && !a ? jr(o, c) : J(0);
	return {
		width: n.width * l.x,
		height: n.height * l.y,
		x: n.x * l.x - c.scrollLeft * l.x + u.x + f.x,
		y: n.y * l.y - c.scrollTop * l.y + u.y + f.y
	};
}
function Nr(e) {
	return e.getClientRects ? Array.from(e.getClientRects()) : [];
}
function Pr(e) {
	let t = vr(e), n = e.ownerDocument.body, r = Tn(e.scrollWidth, e.clientWidth, n.scrollWidth, n.clientWidth), i = Tn(e.scrollHeight, e.clientHeight, n.scrollHeight, n.clientHeight), a = -t.scrollLeft + Ar(e), o = -t.scrollTop;
	return $(n).direction === "rtl" && (a += Tn(e.clientWidth, n.clientWidth) - r), {
		width: r,
		height: i,
		x: a,
		y: o
	};
}
var Fr = 25;
function Ir(e, t, n) {
	n === void 0 && (n = "viewport");
	let r = n === "layoutViewport", i = Y(e), a = X(e), o = i.visualViewport, s = a.clientWidth, c = a.clientHeight, l = 0, u = 0;
	if (o) {
		let e = !gr() || t === "fixed";
		r ? e || (l = -o.offsetLeft, u = -o.offsetTop) : (s = o.width, c = o.height, e && (l = o.offsetLeft, u = o.offsetTop));
	}
	if (Ar(a) <= 0) {
		let e = a.ownerDocument, t = e.body, n = getComputedStyle(t), r = e.compatMode === "CSS1Compat" && parseFloat(n.marginLeft) + parseFloat(n.marginRight) || 0, i = Math.abs(a.clientWidth - t.clientWidth - r), o = getComputedStyle(a).scrollbarGutter === "stable both-edges" ? i / 2 : i;
		o <= Fr && (s -= o);
	}
	return {
		width: s,
		height: c,
		x: l,
		y: u
	};
}
function Lr(e, t) {
	let n = kr(e, !0, t === "fixed"), r = n.top + e.clientTop, i = n.left + e.clientLeft, a = Tr(e);
	return {
		width: e.clientWidth * a.x,
		height: e.clientHeight * a.y,
		x: i * a.x,
		y: r * a.y
	};
}
function Rr(e, t, n) {
	let r;
	if (t === "viewport" || t === "layoutViewport") r = Ir(e, n, t);
	else if (t === "document") r = Pr(X(e));
	else if (Z(t)) r = Lr(t, n);
	else {
		let n = Dr(e);
		r = {
			x: t.x - n.x,
			y: t.y - n.y,
			width: t.width,
			height: t.height
		};
	}
	return Jn(r);
}
function zr(e, t) {
	let n = t.get(e);
	if (n) return n;
	let r = xr(e, [], !1).filter((e) => Z(e) && ir(e) !== "body"), i = null, a = $(e).position === "fixed", o = a ? yr(e) : e;
	for (; Z(o) && !_r(o);) {
		let e = $(o), t = mr(o), n = i ? i.position : a ? "fixed" : "";
		!t && (n === "fixed" || n === "absolute" && e.position === "static") ? r = r.filter((e) => e !== o) : i = e, o = yr(o);
	}
	return t.set(e, r), r;
}
function Br(e) {
	let { element: t, boundary: n, rootBoundary: r, strategy: i } = e, a = [...n === "clippingAncestors" ? lr(t) ? [] : zr(t, this._c) : [].concat(n), r], o = Rr(t, a[0], i), s = o.top, c = o.right, l = o.bottom, u = o.left;
	for (let e = 1; e < a.length; e++) {
		let n = Rr(t, a[e], i);
		s = Tn(n.top, s), c = wn(n.right, c), l = wn(n.bottom, l), u = Tn(n.left, u);
	}
	return {
		width: c - u,
		height: l - s,
		x: u,
		y: s
	};
}
function Vr(e) {
	let { width: t, height: n } = Cr(e);
	return {
		width: t,
		height: n
	};
}
function Hr(e, t, n) {
	let r = Q(t), i = X(t), a = n === "fixed", o = kr(e, !0, a, t), s = {
		scrollLeft: 0,
		scrollTop: 0
	}, c = J(0);
	if ((r || !a) && ((ir(t) !== "body" || sr(i)) && (s = vr(t)), r)) {
		let e = kr(t, !0, a, t);
		c.x = e.x + t.clientLeft, c.y = e.y + t.clientTop;
	}
	!r && i && (c.x = Ar(i));
	let l = i && !r && !a ? jr(i, s) : J(0);
	return {
		x: o.left + s.scrollLeft - c.x - l.x,
		y: o.top + s.scrollTop - c.y - l.y,
		width: o.width,
		height: o.height
	};
}
function Ur(e) {
	return $(e).position === "static";
}
function Wr(e, t) {
	if (!Q(e) || $(e).position === "fixed") return null;
	if (t) return t(e);
	let n = e.offsetParent;
	return X(e) === n && (n = n.ownerDocument.body), n;
}
function Gr(e, t) {
	let n = Y(e);
	if (lr(e)) return n;
	if (!Q(e)) {
		let t = yr(e);
		for (; t && !_r(t);) {
			if (Z(t) && !Ur(t)) return t;
			t = yr(t);
		}
		return n;
	}
	let r = Wr(e, t);
	for (; r && cr(r) && Ur(r);) r = Wr(r, t);
	return r && _r(r) && Ur(r) && !mr(r) ? n : r || hr(e) || n;
}
var Kr = async function(e) {
	let t = this.getOffsetParent || Gr, n = this.getDimensions, r = await n(e.floating);
	return {
		reference: Hr(e.reference, await t(e.floating), e.strategy),
		floating: {
			x: 0,
			y: 0,
			width: r.width,
			height: r.height
		}
	};
};
function qr(e) {
	return $(e).direction === "rtl";
}
var Jr = {
	convertOffsetParentRelativeRectToViewportRelativeRect: Mr,
	getDocumentElement: X,
	getClippingRect: Br,
	getOffsetParent: Gr,
	getElementRects: Kr,
	getClientRects: Nr,
	getDimensions: Vr,
	getScale: Tr,
	isElement: Z,
	isRTL: qr
};
function Yr(e, t) {
	return e.x === t.x && e.y === t.y && e.width === t.width && e.height === t.height;
}
function Xr(e, t, n) {
	let r = null, i, a = X(e);
	function o() {
		var e;
		clearTimeout(i), (e = r) == null || e.disconnect(), r = null;
	}
	function s(n, c) {
		n === void 0 && (n = !1), c === void 0 && (c = 1), o();
		let l = e.getBoundingClientRect(), { left: u, top: d, width: f, height: p } = l;
		if (n || t(), !f || !p) return;
		let m = Dn(d), h = Dn(a.clientWidth - (u + f)), g = Dn(a.clientHeight - (d + p)), _ = Dn(u), v = {
			rootMargin: -m + "px " + -h + "px " + -g + "px " + -_ + "px",
			threshold: Tn(0, wn(1, c)) || 1
		}, y = !0;
		function b(t) {
			let n = t[0].intersectionRatio;
			if (!Yr(l, e.getBoundingClientRect())) return s();
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
function Zr(e, t, n, r) {
	r === void 0 && (r = {});
	let { ancestorScroll: i = !0, ancestorResize: a = !0, elementResize: o = typeof ResizeObserver == "function", layoutShift: s = typeof IntersectionObserver == "function", animationFrame: c = !1 } = r, l = wr(e), u = i || a ? [...l ? xr(l) : [], ...t ? xr(t) : []] : [];
	u.forEach((e) => {
		i && e.addEventListener("scroll", n), a && e.addEventListener("resize", n);
	});
	let d = l && s ? Xr(l, n, a) : null, f = -1, p = null;
	o && (p = new ResizeObserver((e) => {
		let [r] = e;
		r && r.target === l && p && t && (p.unobserve(t), cancelAnimationFrame(f), f = requestAnimationFrame(() => {
			var e;
			(e = p) == null || e.observe(t);
		})), n();
	}), l && !c && p.observe(l), t && p.observe(t));
	let m, h = c ? kr(e) : null;
	c && g();
	function g() {
		let t = kr(e);
		h && !Yr(h, t) && n(), h = t, m = requestAnimationFrame(g);
	}
	return n(), () => {
		var e;
		u.forEach((e) => {
			i && e.removeEventListener("scroll", n), a && e.removeEventListener("resize", n);
		}), d?.(), (e = p) == null || e.disconnect(), p = null, c && cancelAnimationFrame(m);
	};
}
var Qr = nr, $r = $n, ei = (e, t, n) => {
	let r = /* @__PURE__ */ new Map(), i = n ?? {}, a = {
		...Jr,
		...i.platform,
		_c: r
	};
	return Qn(e, t, {
		...i,
		platform: a
	});
};
//#endregion
//#region node_modules/@tiptap/suggestion/dist/index.js
function ti(e) {
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
function ni(e) {
	return e.docChanged ? e.steps.some((e) => {
		let t = e.slice;
		if (!t?.content) return !1;
		let n = t.content.textBetween(0, t.content.size, "\n");
		return /\s/.test(n);
	}) : !1;
}
function ri(e) {
	return () => {
		let t = e.state.selection.$anchor.pos, { top: n, right: r, bottom: i, left: a } = e.view.coordsAtPos(t);
		try {
			return new DOMRect(a, n, r - a, i - n);
		} catch {
			return null;
		}
	};
}
function ii(e, t, n, r) {
	return n ? () => {
		let n = r.getState(e.state)?.decorationId;
		return t.dom.querySelector(`[data-decoration-id="${n}"]`)?.getBoundingClientRect() || null;
	} : ri(e);
}
function ai({ match: e, dismissedRange: t, state: n, transaction: r, editor: i, shouldResetDismissed: a, effectiveAllowSpaces: o }) {
	return a?.({
		editor: i,
		state: n,
		range: t,
		match: e,
		transaction: r,
		allowSpaces: o
	}) ? !1 : o ? e.range.from === t.from : e.range.from === t.from && !ni(r);
}
function oi({ view: e, pluginKeyRef: t }) {
	let n = e.state.tr.setMeta(t, { exit: !0 });
	e.dispatch(n);
}
function si({ pluginKey: e, decorationTag: t, decorationClass: n, decorationContent: r, decorationEmptyClass: i, renderer: a, dispatchExit: o }) {
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
function ci({ editor: e, char: t, effectiveAllowSpaces: n, allowToIncludeChar: r, allowedPrefixes: i, startOfLine: a, findSuggestionMatch: o, allow: s, shouldShow: c, shouldKeepDismissed: l, pluginKey: u }) {
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
function li({ editor: e, items: t }) {
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
function ui({ placement: e, offset: t, flip: n, floatingUi: r }) {
	let i = [Qr({
		mainAxis: t.mainAxis ?? 4,
		crossAxis: t.crossAxis ?? 0
	})];
	return n && i.push($r()), r?.middleware?.length && i.push(...r.middleware), {
		placement: e,
		strategy: r?.strategy ?? "absolute",
		middleware: i
	};
}
function di(e) {
	if (e instanceof HTMLElement) return e;
	if (typeof e == "string") try {
		let t = document.querySelector(e);
		if (t) return t;
	} catch {
		return document.body;
	}
	return document.body;
}
function fi({ getReferenceRect: e, contextElement: t, config: n, container: r, dismissOnOutsideClick: i, dismiss: a }) {
	return (o, s = {}) => {
		let c = {
			getBoundingClientRect: () => e() ?? new DOMRect(),
			contextElement: t
		}, l = !1, u = !o.isConnected;
		u && di(r).appendChild(o), s.onPosition || (o.style.visibility = "hidden", o.style.width = "max-content");
		let d = Zr(c, o, () => {
			ei(c, o, {
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
function pi({ editor: e, pluginKey: t, items: n, renderer: r, minQueryLength: i, debounce: a, initialItems: o, placement: s, offset: c, container: l, flip: u, floatingUi: d, dismissOnOutsideClick: f, command: p, clientRectFor: m, dispatchExit: h }) {
	let g, _ = li({
		editor: e,
		items: n
	}), v = ui({
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
			let w = null, T = S.query !== C.query, E = S.text !== C.text, ee = S.range.from !== C.range.from || S.range.to !== C.range.to, te = T || E || ee;
			if (!S.active && C.active) w = "started";
			else if (S.active && !C.active) w = "stopped";
			else if (C.active && te) w = "updated";
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
				mount: fi({
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
var mi = new k("suggestion");
function hi({ pluginKey: e = mi, editor: t, char: n = "@", allowSpaces: r = !1, allowToIncludeChar: i = !1, allowedPrefixes: a = [" "], startOfLine: o = !1, decorationTag: s = "span", decorationClass: c = "suggestion", decorationContent: l = "", decorationEmptyClass: u = "is-empty", command: d = () => null, items: f = () => [], minQueryLength: p = 0, debounce: m = 0, initialItems: h, placement: g = "bottom-start", offset: _ = {}, container: v, flip: y = !0, floatingUi: b, dismissOnOutsideClick: x = !0, render: S = () => ({}), allow: C = () => !0, findSuggestionMatch: w = ti, shouldShow: T, shouldResetDismissed: E }) {
	let ee = S?.(), te = r && !i, D = (n, r) => ii(t, n, r, e);
	function ne(e) {
		return ai({
			...e,
			editor: t,
			shouldResetDismissed: E,
			effectiveAllowSpaces: te
		});
	}
	let re = (t) => oi({
		view: t,
		pluginKeyRef: e
	});
	return new O({
		key: e,
		view: () => pi({
			editor: t,
			pluginKey: e,
			items: f,
			renderer: ee,
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
		state: ci({
			editor: t,
			char: n,
			effectiveAllowSpaces: te,
			allowToIncludeChar: i,
			allowedPrefixes: a,
			startOfLine: o,
			findSuggestionMatch: w,
			allow: C,
			shouldShow: T,
			shouldKeepDismissed: ne,
			pluginKey: e
		}),
		props: si({
			pluginKey: e,
			decorationTag: s,
			decorationClass: c,
			decorationContent: l,
			decorationEmptyClass: u,
			renderer: ee,
			dispatchExit: re
		})
	});
}
var gi = hi;
//#endregion
//#region src/components/social/ComposerAttachments.tsx
function _i(e) {
	return e < 1024 ? `${e} B` : e < 1048576 ? `${Math.round(e / 1024)} KB` : `${(e / 1048576).toFixed(1)} MB`;
}
function vi({ file: e }) {
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
function yi({ files: t, onRemove: n, disabled: r = !1, className: i, "data-testid": a = "composer-attachments" }) {
	return t.length === 0 ? null : /* @__PURE__ */ g("ul", {
		"data-testid": a,
		"aria-label": "Attachments",
		className: e("m-0 flex list-none flex-wrap gap-1.5 px-2 pt-2", i),
		children: t.map(({ id: e, file: t }) => /* @__PURE__ */ _("li", {
			"data-testid": "composer-attachment",
			className: "flex items-center gap-2 rounded-lg border border-border bg-surface-inset py-1 pl-1 pr-1.5",
			children: [
				/* @__PURE__ */ g(vi, { file: t }),
				/* @__PURE__ */ _("span", {
					className: "flex min-w-0 flex-col",
					children: [/* @__PURE__ */ g("span", {
						className: "max-w-[11rem] truncate text-xs text-text-primary",
						title: t.name,
						children: t.name
					}), /* @__PURE__ */ g("span", {
						className: "text-[11px] text-text-tertiary",
						children: _i(t.size)
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
var bi = c(function({ items: t, command: n }, r) {
	let [a, o] = m(0);
	u(() => o(0), [t]);
	let s = (e) => {
		let r = t[e];
		r && n({
			id: r.id,
			label: r.label
		});
	};
	return d(r, () => ({ onKeyDown: ({ event: e }) => e.key === "ArrowUp" ? (o((e) => (e + t.length - 1) % t.length), !0) : e.key === "ArrowDown" ? (o((e) => (e + 1) % t.length), !0) : e.key === "Enter" || e.key === "Tab" ? (s(a), !0) : !1 })), t.length === 0 ? null : /* @__PURE__ */ g("div", {
		"data-testid": "mention-suggestions",
		role: "listbox",
		"aria-label": "People",
		className: "max-h-56 w-64 overflow-y-auto rounded-lg border border-border bg-surface py-1 shadow-lg",
		children: t.map((t, n) => /* @__PURE__ */ _("button", {
			type: "button",
			role: "option",
			"aria-selected": n === a,
			"data-testid": "mention-option",
			onMouseDown: (e) => {
				e.preventDefault(), s(n);
			},
			onMouseEnter: () => o(n),
			className: e("flex w-full items-center gap-2 px-2 py-1.5 text-left text-sm", n === a ? "bg-surface-hover" : "bg-transparent"),
			children: [/* @__PURE__ */ g(i, {
				name: t.label,
				src: t.avatarUrl,
				color: t.color,
				size: 24
			}), /* @__PURE__ */ _("span", {
				className: "min-w-0 flex-1",
				children: [/* @__PURE__ */ g("span", {
					className: "block truncate text-text-primary",
					children: t.label
				}), t.hint && /* @__PURE__ */ g("span", {
					className: "block truncate text-xs text-text-tertiary",
					children: t.hint
				})]
			})]
		}, t.id))
	});
}), xi = c(function({ items: t, command: n }, r) {
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
function Si(e, t) {
	if (!t || t.length === 0) return null;
	let n = e.trimStart().toLowerCase();
	return t.find((e) => {
		let t = e.trigger.toLowerCase();
		return n === t || n.startsWith(`${t} `) || n.startsWith(`${t}\n`);
	}) ?? null;
}
function Ci() {
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
function wi(e) {
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
var Ti = 0;
function Ei({ onSend: t, onSearchPeople: n, allowAttachments: r = !1, allowEmoji: i = !1, onRequestLink: c, placeholder: d = "Write a message…", commands: S, disabled: C = !1, toolbarExtras: w, className: T, "data-testid": E = "rich-chat-composer" }) {
	let ee = p(() => {}), te = p(() => {}), D = p(null), ne = p(null), [re, ie] = m(!1), [ae, O] = m({
		open: !1,
		href: "",
		text: ""
	}), [k, le] = m([]), [ue, de] = m(!0), pe = r && !C, he = p(d);
	he.current = d;
	let ge = p(S);
	ge.current = S;
	let [A, _e] = m(null);
	u(() => {
		let e = ve.current;
		if (!e) return;
		let t = Si(e.getText(), S);
		_e((e) => e?.trigger === t?.trigger && e?.disabled === t?.disabled ? e : t);
	}, [S]);
	let ve = p(null), ye = f(() => {
		let e = [
			oe.configure({
				heading: !1,
				horizontalRule: !1,
				link: !1
			}),
			se.configure({ placeholder: () => he.current }),
			Cn.configure({
				openOnClick: !1,
				autolink: !0,
				HTMLAttributes: {
					rel: "noopener noreferrer nofollow",
					target: "_blank"
				}
			}),
			x.create({
				name: "emojiSuggestion",
				priority: 101,
				addProseMirrorPlugins() {
					return [gi({
						editor: this.editor,
						char: ":",
						allow: ({ state: e, range: t }) => e.doc.textBetween(t.from, t.to, "\0").length >= 3,
						items: ({ query: e }) => fe(e),
						command: ({ editor: e, range: t, props: n }) => {
							e.chain().focus().deleteRange(t).insertContent(n.emoji).run();
						},
						render: () => {
							let e = null, t = Ci();
							return {
								onStart: (n) => {
									e = new y(xi, {
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
			x.create({
				name: "chatComposerKeymap",
				addKeyboardShortcuts() {
					return {
						Enter: () => (ee.current(), !0),
						"Mod-k": () => (te.current(), !0),
						"Shift-Enter": ({ editor: e }) => e.commands.setHardBreak()
					};
				}
			})
		];
		return n && e.push(ce.configure({
			HTMLAttributes: { class: "mention" },
			suggestion: {
				char: "@",
				items: ({ query: e }) => n(e),
				render: () => {
					let e = null, t = Ci();
					return {
						onStart: (n) => {
							e = new y(bi, {
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
	}, [n]), j = b({
		extensions: ye,
		editable: !C,
		onUpdate: ({ editor: e }) => {
			de(e.isEmpty), ve.current = e;
			let t = Si(e.getText(), ge.current);
			_e((e) => e?.trigger === t?.trigger ? e : t);
		},
		editorProps: { attributes: {
			class: "chat-composer-input",
			"data-testid": `${E}-input`
		} }
	}, [ye]);
	u(() => {
		j?.setEditable(!C);
	}, [j, C]);
	let be = !C && (!ue || k.length > 0), xe = l(() => {
		if (!j) return;
		let { from: e, to: t } = j.state.selection;
		O({
			open: !0,
			href: j.getAttributes("link").href ?? "",
			text: j.state.doc.textBetween(e, t)
		});
	}, [j]), Se = l(({ href: e, text: t }) => {
		if (!j) return;
		let n = j.chain().focus(), { empty: r } = j.state.selection;
		r ? n.insertContent(`<a href="${e}">${t || e}</a>`).run() : t ? n.insertContent(`<a href="${e}">${t}</a>`).run() : n.setLink({ href: e }).run(), O({
			open: !1,
			href: "",
			text: ""
		});
	}, [j]), Ce = l(() => {
		!j || !be || (t({
			html: j.isEmpty ? "" : j.getHTML(),
			text: j.getText(),
			mentions: wi(j),
			files: k.map((e) => e.file)
		}), j.commands.clearContent(!0), le([]), de(!0));
	}, [
		j,
		be,
		t,
		k
	]);
	ee.current = Ce, te.current = xe;
	let we = l((e) => {
		!pe || e.length === 0 || le((t) => [...t, ...e.map((e) => ({
			id: `staged-${Ti++}`,
			file: e
		}))]);
	}, [pe]), M = (t, n, r, i, a) => /* @__PURE__ */ g("button", {
		ref: a,
		type: "button",
		"aria-label": t,
		"aria-pressed": n,
		title: t,
		disabled: C,
		onMouseDown: (e) => {
			e.preventDefault(), r();
		},
		className: e("grid h-7 w-7 place-items-center rounded text-sm leading-none", n ? "bg-surface-hover text-text-primary" : "text-text-secondary hover:bg-surface-hover"),
		children: i
	}, t);
	return /* @__PURE__ */ g(s, {
		onFiles: we,
		disabled: !pe,
		className: T,
		children: /* @__PURE__ */ _("div", {
			"data-testid": E,
			"data-command": A?.trigger,
			className: e("chat-composer rounded-lg border bg-surface focus-within:ring-2", A ? A.disabled ? "border-warning focus-within:border-warning focus-within:ring-warning" : "border-info focus-within:border-info focus-within:ring-info" : "border-border focus-within:border-primary focus-within:ring-primary"),
			children: [
				A && /* @__PURE__ */ _("div", {
					role: "status",
					title: A.description ?? A.hint ?? A.label,
					"data-testid": `${E}-command`,
					className: e("flex items-center gap-1.5 rounded-t-lg px-2 py-1 text-[11px]", A.disabled ? "bg-warning-bg text-warning-fg" : "bg-info-bg text-info-fg"),
					children: [
						/* @__PURE__ */ g("span", {
							className: "font-mono",
							children: A.trigger
						}),
						/* @__PURE__ */ g("span", {
							className: "font-medium",
							children: A.label
						}),
						A.hint && /* @__PURE__ */ _("span", {
							className: "min-w-0 truncate opacity-80",
							children: ["— ", A.hint]
						})
					]
				}),
				/* @__PURE__ */ g(v, { editor: j }),
				/* @__PURE__ */ g(yi, {
					files: k,
					disabled: C,
					onRemove: (e) => le((t) => t.filter((t) => t.id !== e))
				}),
				/* @__PURE__ */ _("div", {
					className: "flex items-center gap-0.5 border-t border-border px-1.5 py-1",
					children: [
						j && [
							M("Bold", j.isActive("bold"), () => j.chain().focus().toggleBold().run(), /* @__PURE__ */ g("b", { children: "B" })),
							M("Italic", j.isActive("italic"), () => j.chain().focus().toggleItalic().run(), /* @__PURE__ */ g("i", { children: "I" })),
							M("Strikethrough", j.isActive("strike"), () => j.chain().focus().toggleStrike().run(), /* @__PURE__ */ g("s", { children: "S" })),
							M("Code", j.isActive("code"), () => j.chain().focus().toggleCode().run(), /* @__PURE__ */ g("span", {
								className: "font-mono text-[11px]",
								children: "<>"
							})),
							M(j.isActive("link") ? "Edit link" : "Add link", j.isActive("link"), () => xe(), /* @__PURE__ */ g("span", {
								"aria-hidden": !0,
								children: "🔗"
							})),
							/* @__PURE__ */ g("span", {
								"aria-hidden": !0,
								className: "mx-1 h-4 w-px bg-border"
							}, "sep1"),
							M("Bulleted list", j.isActive("bulletList"), () => j.chain().focus().toggleBulletList().run(), /* @__PURE__ */ g("span", { children: "•" })),
							M("Numbered list", j.isActive("orderedList"), () => j.chain().focus().toggleOrderedList().run(), /* @__PURE__ */ g("span", {
								className: "text-[11px]",
								children: "1."
							})),
							M("Quote", j.isActive("blockquote"), () => j.chain().focus().toggleBlockquote().run(), /* @__PURE__ */ g("span", { children: "❝" }))
						],
						(i || pe) && /* @__PURE__ */ g("span", {
							"aria-hidden": !0,
							className: "mx-1 h-4 w-px bg-border"
						}),
						i && j && /* @__PURE__ */ _("span", {
							className: "relative",
							children: [M("Emoji", re, () => ie((e) => !e), /* @__PURE__ */ g("span", { children: "🙂" }), ne), /* @__PURE__ */ g(o, {
								open: re,
								triggerRef: ne,
								onClose: () => ie(!1),
								onSelect: (e) => {
									j.chain().focus().insertContent(e).run(), ie(!1);
								}
							})]
						}),
						pe && /* @__PURE__ */ _(h, { children: [M("Attach files", !1, () => D.current?.click(), /* @__PURE__ */ g("span", { children: "📎" })), /* @__PURE__ */ g(a, {
							ref: D,
							multiple: !0,
							"data-testid": `${E}-file-input`,
							onFiles: we
						})] }),
						w,
						/* @__PURE__ */ g("button", {
							type: "button",
							onClick: Ce,
							disabled: !be,
							"data-testid": `${E}-send`,
							className: "ml-auto rounded bg-primary px-2.5 py-1 text-xs font-semibold text-white disabled:opacity-40",
							children: "Send"
						})
					]
				}),
				/* @__PURE__ */ g(me, {
					open: ae.open,
					initialHref: ae.href,
					initialText: ae.text,
					onSubmit: (e) => Se(c ? {
						...e,
						href: c(e.text) ?? e.href
					} : e),
					onRemove: () => {
						j?.chain().focus().unsetLink().run(), O({
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
						}), j?.commands.focus();
					}
				})
			]
		})
	});
}
//#endregion
export { yi as a, de as c, bi as i, fe as l, Si as n, me as o, xi as r, pe as s, Ei as t };
