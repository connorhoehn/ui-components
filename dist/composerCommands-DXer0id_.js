import { t as e } from "./Button-BhS4-R6_.js";
import { t } from "./Modal-CyoyiNKN.js";
import { t as n } from "./Input-DLknWXri.js";
import { useEffect as r, useRef as i, useState as a } from "react";
import { jsx as o, jsxs as s } from "react/jsx-runtime";
//#region src/components/social/emojiShortcodes.ts
var c = [
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
function l(e, t = c, n = 8) {
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
function u(e) {
	let t = e.trim();
	return t ? /^[a-z][a-z0-9+.-]*:/i.test(t) || t.startsWith("/") || t.startsWith("#") ? t : `https://${t}` : "";
}
function d({ open: c, initialText: l = "", initialHref: d = "", onSubmit: f, onRemove: p, onClose: m, "data-testid": h = "link-dialog" }) {
	let [g, _] = a(d), [v, y] = a(l), b = i(null);
	r(() => {
		if (!c) return;
		_(d), y(l);
		let e = setTimeout(() => b.current?.focus(), 0);
		return () => clearTimeout(e);
	}, [
		c,
		d,
		l
	]);
	let x = () => {
		let e = u(g);
		e && f({
			href: e,
			text: v.trim()
		});
	};
	return /* @__PURE__ */ o(t, {
		open: c,
		onClose: m,
		title: d ? "Edit link" : "Add link",
		"data-testid": h,
		children: /* @__PURE__ */ s("div", {
			className: "flex flex-col gap-3 p-1",
			children: [
				/* @__PURE__ */ s("label", {
					className: "flex flex-col gap-1 text-xs text-text-secondary",
					children: ["Address", /* @__PURE__ */ o(n, {
						ref: b,
						value: g,
						placeholder: "https://example.com",
						"data-testid": `${h}-href`,
						onChange: (e) => _(e.target.value),
						onKeyDown: (e) => {
							e.key === "Enter" && (e.preventDefault(), x());
						}
					})]
				}),
				/* @__PURE__ */ s("label", {
					className: "flex flex-col gap-1 text-xs text-text-secondary",
					children: ["Text to display", /* @__PURE__ */ o(n, {
						value: v,
						placeholder: "Leave blank to use the address",
						"data-testid": `${h}-text`,
						onChange: (e) => y(e.target.value),
						onKeyDown: (e) => {
							e.key === "Enter" && (e.preventDefault(), x());
						}
					})]
				}),
				/* @__PURE__ */ s("div", {
					className: "mt-1 flex items-center gap-2",
					children: [
						/* @__PURE__ */ o(e, {
							variant: "primary",
							size: "sm",
							onClick: x,
							disabled: !g.trim(),
							"data-testid": `${h}-submit`,
							children: d ? "Update" : "Add link"
						}),
						/* @__PURE__ */ o(e, {
							variant: "ghost",
							size: "sm",
							onClick: m,
							children: "Cancel"
						}),
						p && d && /* @__PURE__ */ o(e, {
							variant: "danger",
							size: "sm",
							className: "ml-auto",
							onClick: p,
							"data-testid": `${h}-remove`,
							children: "Remove"
						})
					]
				})
			]
		})
	});
}
//#endregion
//#region src/components/social/composerCommands.ts
function f(e, t) {
	if (!t || t.length === 0) return null;
	let n = e.trimStart().toLowerCase();
	return t.find((e) => {
		let t = e.trigger.toLowerCase();
		return n === t || n.startsWith(`${t} `) || n.startsWith(`${t}\n`);
	}) ?? null;
}
function p(e, t) {
	return e.trimStart().slice(t.trigger.length).replace(/^[ \n]/, "");
}
//#endregion
export { c as a, u as i, f as n, l as o, d as r, p as t };
