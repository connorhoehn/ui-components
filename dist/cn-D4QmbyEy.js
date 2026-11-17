import { clsx as e } from "clsx";
import { extendTailwindMerge as t } from "tailwind-merge";
//#region src/lib/cn.ts
var n = t({ extend: { classGroups: { "font-family": [{ font: ["[inherit]"] }] } } });
function r(...t) {
	return n(e(t));
}
//#endregion
export { r as t };
