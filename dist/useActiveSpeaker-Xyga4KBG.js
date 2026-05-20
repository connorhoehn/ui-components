import { useState as g, useEffect as y } from "react";
function M({
  participants: s,
  threshold: c = -40,
  smoothingTimeConstant: l = 0.8
}) {
  const [h, I] = g(null);
  return y(() => {
    const u = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map();
    let d;
    return s.forEach((e) => {
      if (!(e.streams.length === 0 || e.streams[0].getAudioTracks().length === 0))
        try {
          const t = new AudioContext(), r = t.createAnalyser();
          r.fftSize = 512, r.smoothingTimeConstant = l, t.createMediaStreamSource(e.streams[0]).connect(r), u.set(e.participantId, t), i.set(e.participantId, r);
        } catch (t) {
          console.error("Failed to create audio analyzer:", t);
        }
    }), d = setInterval(() => {
      let e = null, n = c;
      i.forEach((t, r) => {
        const a = new Float32Array(t.frequencyBinCount);
        t.getFloatTimeDomainData(a);
        let f = 0;
        for (let o = 0; o < a.length; o++)
          f += a[o] * a[o];
        const S = Math.sqrt(f / a.length), m = 20 * Math.log10(S);
        m > n && (n = m, e = r);
      }), I(e);
    }, 100), () => {
      clearInterval(d), u.forEach((e) => {
        e.close().catch(console.error);
      });
    };
  }, [s, c, l]), { activeSpeakerId: h };
}
export {
  M as u
};
