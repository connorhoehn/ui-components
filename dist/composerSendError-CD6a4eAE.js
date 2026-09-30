import { t as e } from "./cn-D4QmbyEy.js";
import { v as t } from "./overlayStack-DWxp7Rsz.js";
import { m as n, p as r, y as i } from "./Icons-_hcrQmPz.js";
import { t as a } from "./Modal-R-ipbeZi.js";
import { t as o } from "./Input-CpLq80dw.js";
import { t as s } from "./DropdownMenu-BWgk2cUe.js";
import { useEffect as c, useRef as l, useState as u } from "react";
import { Fragment as d, jsx as f, jsxs as p } from "react/jsx-runtime";
//#region src/components/social/emojiShortcodes.ts
var m = [
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
function h(e, t = m, n = 8) {
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
function g(e) {
	let t = e.trim();
	return t ? /^[a-z][a-z0-9+.-]*:/i.test(t) || t.startsWith("/") || t.startsWith("#") ? t : `https://${t}` : "";
}
function _({ open: e, initialText: n = "", initialHref: r = "", onSubmit: i, onRemove: s, onClose: d, "data-testid": m = "link-dialog" }) {
	let [h, _] = u(r), [v, y] = u(n), b = l(null);
	c(() => {
		if (!e) return;
		_(r), y(n);
		let t = setTimeout(() => b.current?.focus(), 0);
		return () => clearTimeout(t);
	}, [
		e,
		r,
		n
	]);
	let x = () => {
		let e = g(h);
		e && i({
			href: e,
			text: v.trim()
		});
	};
	return /* @__PURE__ */ f(a, {
		open: e,
		onClose: d,
		title: r ? "Edit link" : "Add link",
		"data-testid": m,
		children: /* @__PURE__ */ p("div", {
			className: "flex flex-col gap-3 p-1",
			children: [
				/* @__PURE__ */ p("label", {
					className: "flex flex-col gap-1 text-xs text-text-secondary",
					children: ["Address", /* @__PURE__ */ f(o, {
						ref: b,
						value: h,
						placeholder: "https://example.com",
						"data-testid": `${m}-href`,
						onChange: (e) => _(e.target.value),
						onKeyDown: (e) => {
							e.key === "Enter" && (e.preventDefault(), x());
						}
					})]
				}),
				/* @__PURE__ */ p("label", {
					className: "flex flex-col gap-1 text-xs text-text-secondary",
					children: ["Text to display", /* @__PURE__ */ f(o, {
						value: v,
						placeholder: "Leave blank to use the address",
						"data-testid": `${m}-text`,
						onChange: (e) => y(e.target.value),
						onKeyDown: (e) => {
							e.key === "Enter" && (e.preventDefault(), x());
						}
					})]
				}),
				/* @__PURE__ */ p("div", {
					className: "mt-1 flex items-center gap-2",
					children: [
						/* @__PURE__ */ f(t, {
							variant: "primary",
							size: "sm",
							onClick: x,
							disabled: !h.trim(),
							"data-testid": `${m}-submit`,
							children: r ? "Update" : "Add link"
						}),
						/* @__PURE__ */ f(t, {
							variant: "ghost",
							size: "sm",
							onClick: d,
							children: "Cancel"
						}),
						s && r && /* @__PURE__ */ f(t, {
							variant: "danger",
							size: "sm",
							className: "ml-auto",
							onClick: s,
							"data-testid": `${m}-remove`,
							children: "Remove"
						})
					]
				})
			]
		})
	});
}
//#endregion
//#region src/components/social/ComposerReferences.tsx
var v = (e) => `Remove ${e.label}`;
function y({ references: t, onRemove: a, removeLabel: o = v, className: c, size: l = "xs", "data-testid": u = "composer-references" }) {
	return t.length === 0 ? null : /* @__PURE__ */ f("ul", {
		"data-testid": u,
		className: e("flex flex-wrap items-center gap-1 px-2 py-1.5", c),
		children: t.map((t) => {
			let c = l === "md" ? "gap-1.5 rounded-md bg-surface-inset py-1 pl-2.5 pr-1.5 text-[13px]" : l === "sm" ? "py-1 text-xs" : "py-0.5 text-[11px]", m = t.icon ? /* @__PURE__ */ f("span", {
				"aria-hidden": "true",
				className: "shrink-0",
				children: t.icon
			}) : t.marker === "dot" ? /* @__PURE__ */ f("span", {
				"aria-hidden": "true",
				"data-testid": `${u}-dot`,
				className: e("inline-block shrink-0 rounded-full bg-primary", l === "md" ? "mx-1 h-1.5 w-1.5" : "mx-0.5 h-1.5 w-1.5")
			}) : /* @__PURE__ */ f(i, {
				size: l === "md" ? 14 : 12,
				className: e("shrink-0", l === "md" ? "text-text-secondary" : "text-text-tertiary"),
				"aria-hidden": "true"
			});
			return t.menu && t.menu.some((e) => e.items.length > 0) ? /* @__PURE__ */ f("li", {
				"data-testid": `${u}-item`,
				"data-reference-id": t.id,
				"data-menu": "true",
				title: t.title ?? t.label,
				className: "inline-flex min-w-0 max-w-full items-center",
				children: /* @__PURE__ */ f(s, {
					trigger: /* @__PURE__ */ p(d, { children: [
						m,
						/* @__PURE__ */ f("span", {
							className: "min-w-0 truncate",
							children: t.label
						}),
						/* @__PURE__ */ f(r, {
							dir: "down",
							size: l === "md" ? 12 : 10,
							"aria-hidden": "true",
							className: "shrink-0 text-text-tertiary"
						})
					] }),
					triggerLabel: t.menuLabel ?? t.label,
					triggerTestId: `${u}-menu-trigger`,
					align: "end",
					sections: [...t.menu],
					triggerClassName: e("min-w-0 max-w-full gap-1 border-border bg-surface pl-2 pr-1.5 font-normal text-text-primary hover:bg-surface-hover", c, "rounded-md"),
					"data-testid": `${u}-menu`
				})
			}, t.id) : /* @__PURE__ */ p("li", {
				"data-testid": `${u}-item`,
				"data-reference-id": t.id,
				title: t.title ?? t.label,
				className: e("inline-flex min-w-0 max-w-full items-center gap-1 rounded-full border border-border bg-surface pl-2 pr-1 text-text-primary", c),
				children: [
					m,
					/* @__PURE__ */ f("span", {
						className: "min-w-0 truncate",
						children: t.label
					}),
					a && /* @__PURE__ */ f("button", {
						type: "button",
						"aria-label": o(t),
						onClick: () => a(t.id),
						"data-testid": `${u}-remove`,
						className: "shrink-0 rounded-full p-0.5 text-text-tertiary hover:bg-surface-hover hover:text-text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary",
						children: /* @__PURE__ */ f(n, { size: 10 })
					})
				]
			}, t.id);
		})
	});
}
//#endregion
//#region src/components/social/composerCommands.ts
function b(e, t) {
	if (!t || t.length === 0) return null;
	let n = e.trimStart().toLowerCase();
	return t.find((e) => {
		let t = e.trigger.toLowerCase();
		return n === t || n.startsWith(`${t} `) || n.startsWith(`${t}\n`);
	}) ?? null;
}
function x(e, t) {
	return e.trimStart().slice(t.trigger.length).replace(/^[ \n]/, "");
}
//#endregion
//#region src/components/social/composerSendError.ts
var S = class extends Error {
	constructor(e, t) {
		super(e, t), this.name = "ComposerSendError";
	}
};
function C(e) {
	return !(e instanceof Error) || e.name !== "ComposerSendError" ? null : e.message.trim() || null;
}
//#endregion
export { y as a, m as c, b as i, h as l, C as n, _ as o, x as r, g as s, S as t };
