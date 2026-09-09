import { useCallback as e, useEffect as t, useState as n } from "react";
//#region src/hooks/useMediaDevices.ts
function r(e, t) {
	return `${e === "audioinput" ? "Microphone" : e === "videoinput" ? "Camera" : "Speaker"} ${t + 1}`;
}
function i() {
	let i = typeof navigator < "u" && !!navigator.mediaDevices?.enumerateDevices, a = typeof HTMLMediaElement < "u" && typeof HTMLMediaElement.prototype.setSinkId == "function", [o, s] = n({
		microphones: [],
		cameras: [],
		speakers: [],
		loading: i,
		labelsHidden: !1
	}), c = e(async () => {
		if (i) try {
			let e = await navigator.mediaDevices.enumerateDevices(), t = (t) => e.filter((e) => e.kind === t && e.deviceId !== "").map((e, n) => ({
				deviceId: e.deviceId,
				kind: t,
				label: e.label || r(t, n)
			}));
			s({
				microphones: t("audioinput"),
				cameras: t("videoinput"),
				speakers: a ? t("audiooutput") : [],
				loading: !1,
				labelsHidden: e.some((e) => e.deviceId !== "" && !e.label)
			});
		} catch {
			s((e) => ({
				...e,
				loading: !1
			}));
		}
	}, [i, a]);
	return t(() => {
		if (!i) return;
		c();
		let e = navigator.mediaDevices;
		return e.addEventListener?.("devicechange", c), () => {
			e.removeEventListener?.("devicechange", c);
		};
	}, [i, c]), {
		...o,
		supported: i,
		canSelectSpeaker: a,
		refresh: c
	};
}
//#endregion
export { i as t };
