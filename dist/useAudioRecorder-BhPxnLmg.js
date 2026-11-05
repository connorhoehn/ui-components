import { useCallback as e, useEffect as t, useRef as n, useState as r } from "react";
//#region src/hooks/useMediaDevices.ts
function i(e, t) {
	return `${e === "audioinput" ? "Microphone" : e === "videoinput" ? "Camera" : "Speaker"} ${t + 1}`;
}
function a() {
	let n = typeof navigator < "u" && !!navigator.mediaDevices?.enumerateDevices, a = typeof HTMLMediaElement < "u" && typeof HTMLMediaElement.prototype.setSinkId == "function", [o, s] = r({
		microphones: [],
		cameras: [],
		speakers: [],
		loading: n,
		labelsHidden: !1
	}), c = e(async () => {
		if (n) try {
			let e = await navigator.mediaDevices.enumerateDevices(), t = (t) => e.filter((e) => e.kind === t && e.deviceId !== "").map((e, n) => ({
				deviceId: e.deviceId,
				kind: t,
				label: e.label || i(t, n)
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
	}, [n, a]);
	return t(() => {
		if (!n) return;
		c();
		let e = navigator.mediaDevices;
		return e.addEventListener?.("devicechange", c), () => {
			e.removeEventListener?.("devicechange", c);
		};
	}, [n, c]), {
		...o,
		supported: n,
		canSelectSpeaker: a,
		refresh: c
	};
}
//#endregion
//#region src/hooks/useAudioRecorder.ts
var o = [
	"audio/webm;codecs=opus",
	"audio/webm",
	"audio/mp4",
	"audio/ogg;codecs=opus"
];
function s(e) {
	let t = globalThis.MediaRecorder;
	if (!t?.isTypeSupported) return e;
	for (let n of [e, ...o]) if (n && t.isTypeSupported(n)) return n;
}
function c({ getStream: i, maxMs: a = 6e4, mimeType: o, audioBitsPerSecond: c = 24e3 }) {
	let [l, u] = r("idle"), [d, f] = r(0), [p, m] = r(null), [h, g] = r(null), [_, v] = r(null), [y, b] = r(null), x = n(null), S = n(null), C = n([]), w = n(0), T = n(null), E = n(null), D = () => {
		T.current &&= (clearInterval(T.current), null);
	}, O = () => {
		S.current?.getTracks().forEach((e) => e.stop()), S.current = null;
	}, k = () => {
		if (E.current) {
			try {
				URL.revokeObjectURL(E.current);
			} catch {}
			E.current = null;
		}
	}, A = e(() => {
		let e = x.current;
		e && e.state !== "inactive" ? e.stop() : O(), D();
	}, []), j = e(async () => {
		if (typeof MediaRecorder > "u") {
			b("This browser cannot record audio."), u("error");
			return;
		}
		b(null), m(null), k(), g(null), f(0), C.current = [], u("starting");
		let e;
		try {
			e = await i();
		} catch (e) {
			b(e instanceof Error && e.name === "NotAllowedError" ? "Microphone access was blocked." : "Could not open the microphone."), u("error");
			return;
		}
		S.current = e;
		let t = s(o), n;
		try {
			n = new MediaRecorder(e, {
				...t ? { mimeType: t } : {},
				audioBitsPerSecond: c
			});
		} catch {
			O(), b("Could not start recording."), u("error");
			return;
		}
		x.current = n, n.ondataavailable = (e) => {
			e.data && e.data.size > 0 && C.current.push(e.data);
		}, n.onstop = () => {
			let e = n.mimeType || t || "audio/webm", r = new Blob(C.current, { type: e });
			O(), D(), f(Date.now() - w.current), m(r), v(e);
			let i = null;
			try {
				i = URL.createObjectURL(r);
			} catch {}
			E.current = i, g(i), u("recorded");
		}, n.onerror = () => {
			O(), D(), b("Recording failed."), u("error");
		}, w.current = Date.now(), n.start(1e3), u("recording"), T.current = setInterval(() => {
			let e = Date.now() - w.current;
			f(e), e >= a && A();
		}, 200);
	}, [
		i,
		a,
		o,
		c,
		A
	]), M = e(() => {
		A(), k(), C.current = [], m(null), g(null), v(null), f(0), b(null), u("idle");
	}, [A]);
	return t(() => () => {
		A(), k();
	}, [A]), {
		state: l,
		elapsedMs: d,
		blob: p,
		url: h,
		mimeType: _,
		error: y,
		start: j,
		stop: A,
		reset: M
	};
}
//#endregion
export { c as n, a as r, s as t };
