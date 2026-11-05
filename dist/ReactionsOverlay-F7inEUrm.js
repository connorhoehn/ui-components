import { t as e } from "./cn-D4QmbyEy.js";
import { jsx as t } from "react/jsx-runtime";
//#region src/components/collaboration/ReactionsOverlay.tsx
var n = {
	"❤️": "[animation:reaction-heart_2.5s_ease-out_forwards]",
	"😂": "[animation:reaction-laugh_2.5s_ease-out_forwards]",
	"👍": "[animation:reaction-thumbsup_2.5s_ease-out_forwards]",
	"👎": "[animation:reaction-thumbsdown_2.5s_ease-out_forwards]",
	"😮": "[animation:reaction-wow_2.5s_ease-out_forwards]",
	"😢": "[animation:reaction-cry_2.5s_ease-out_forwards]",
	"😡": "[animation:reaction-angry_1.8s_ease-out_forwards]",
	"🎉": "[animation:reaction-party_2.5s_ease-out_forwards]",
	"🔥": "[animation:reaction-fire_2.5s_ease-out_forwards]",
	"⚡": "[animation:reaction-lightning_1.5s_ease-out_forwards]",
	"💯": "[animation:reaction-hundred_2.0s_ease-out_forwards]",
	"🚀": "[animation:reaction-rocket_2.0s_ease-out_forwards]"
};
function r({ reactions: r }) {
	return /* @__PURE__ */ t("div", {
		className: "fixed inset-0 w-full h-full pointer-events-none z-[9999]",
		children: r.map((r) => /* @__PURE__ */ t("span", {
			className: e("absolute text-[2rem] select-none", n[r.emoji] ?? "[animation:reaction-fade-up_2.5s_ease-out_forwards]"),
			style: {
				left: `${r.x}%`,
				top: `${r.y}%`
			},
			children: r.emoji
		}, r.id))
	});
}
//#endregion
export { r as t };
