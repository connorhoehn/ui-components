import { useEffect as e, useState as t } from "react";
//#region src/lib/video/useActiveSpeaker.ts
var n = null;
function r() {
	if (n) return n;
	try {
		return n = new AudioContext(), n;
	} catch {
		return null;
	}
}
function i({ participants: n, threshold: i = -40, smoothingTimeConstant: a = .8, pollIntervalMs: o = 200 }) {
	let [s, c] = t(null);
	return e(() => {
		let e = r();
		if (!e) return;
		let t = /* @__PURE__ */ new Map(), s = /* @__PURE__ */ new Map();
		for (let r of n) {
			let n = r.streams[0];
			if (!(!n || n.getAudioTracks().length === 0)) try {
				let i = e.createMediaStreamSource(n), o = e.createAnalyser();
				o.fftSize = 512, o.smoothingTimeConstant = a, i.connect(o), t.set(r.participantId, o), s.set(r.participantId, i);
			} catch {}
		}
		let l = setInterval(() => {
			let e = null, n = i;
			t.forEach((t, r) => {
				let i = new Float32Array(t.frequencyBinCount);
				t.getFloatTimeDomainData(i);
				let a = 0;
				for (let e = 0; e < i.length; e++) a += i[e] * i[e];
				let o = Math.sqrt(a / i.length), s = 20 * Math.log10(o);
				s > n && (n = s, e = r);
			}), c(e);
		}, o);
		return () => {
			clearInterval(l), s.forEach((e) => {
				try {
					e.disconnect();
				} catch {}
			}), t.forEach((e) => {
				try {
					e.disconnect();
				} catch {}
			});
		};
	}, [
		n,
		i,
		a,
		o
	]), { activeSpeakerId: s };
}
//#endregion
export { i as t };
