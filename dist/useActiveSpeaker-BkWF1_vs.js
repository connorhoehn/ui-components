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
function i({ participants: n, threshold: i = -40, smoothingTimeConstant: a = .8, pollIntervalMs: o = 200, holdMs: s = 600, marginDb: c = 3 }) {
	let [l, u] = t(null);
	return e(() => {
		let e = r();
		if (!e) return;
		let t = /* @__PURE__ */ new Map(), l = /* @__PURE__ */ new Map();
		for (let r of n) {
			let n = r.streams[0];
			if (n && n.getAudioTracks().length !== 0) try {
				let i = e.createMediaStreamSource(n), o = e.createAnalyser();
				o.fftSize = 512, o.smoothingTimeConstant = a, i.connect(o), t.set(r.participantId, {
					analyser: o,
					buffer: new Float32Array(o.frequencyBinCount)
				}), l.set(r.participantId, i);
			} catch {}
		}
		let d = null, f, p = 0, m = setInterval(() => {
			let e = null, n = i, r = /* @__PURE__ */ new Map();
			t.forEach(({ analyser: t, buffer: i }, a) => {
				t.getFloatTimeDomainData(i);
				let o = 0;
				for (let e = 0; e < i.length; e++) o += i[e] * i[e];
				let s = Math.sqrt(o / i.length), c = 20 * Math.log10(s);
				r.set(a, c), c > n && (n = c, e = a);
			});
			let a = (e) => {
				d = e, f = void 0, u(e);
			};
			if (s <= 0 || d === null) {
				a(e);
				return;
			}
			if (e === d) {
				f = void 0;
				return;
			}
			let o = r.get(d);
			if (!(e === null || n > (o != null && o > i ? o : -Infinity) + c)) {
				f = void 0;
				return;
			}
			let l = Date.now();
			f !== e && (f = e, p = l), l - p >= s && a(e);
		}, o);
		return () => {
			clearInterval(m), l.forEach((e) => {
				try {
					e.disconnect();
				} catch {}
			}), t.forEach(({ analyser: e }) => {
				try {
					e.disconnect();
				} catch {}
			});
		};
	}, [
		n,
		i,
		a,
		o,
		s,
		c
	]), { activeSpeakerId: l };
}
//#endregion
export { i as t };
