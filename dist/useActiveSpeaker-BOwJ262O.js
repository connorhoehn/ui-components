import { useState as I, useEffect as x } from "react";
let o = null;
function M() {
  if (o) return o;
  try {
    return o = new AudioContext(), o;
  } catch {
    return null;
  }
}
function k({
  participants: i,
  threshold: l = -40,
  smoothingTimeConstant: f = 0.8,
  pollIntervalMs: d = 200
}) {
  const [S, y] = I(null);
  return x(() => {
    const s = M();
    if (!s) return;
    const u = /* @__PURE__ */ new Map(), h = /* @__PURE__ */ new Map();
    for (const t of i) {
      const e = t.streams[0];
      if (!(!e || e.getAudioTracks().length === 0))
        try {
          const r = s.createMediaStreamSource(e), n = s.createAnalyser();
          n.fftSize = 512, n.smoothingTimeConstant = f, r.connect(n), u.set(t.participantId, n), h.set(t.participantId, r);
        } catch {
        }
    }
    const A = setInterval(() => {
      let t = null, e = l;
      u.forEach((r, n) => {
        const a = new Float32Array(r.frequencyBinCount);
        r.getFloatTimeDomainData(a);
        let p = 0;
        for (let c = 0; c < a.length; c++) p += a[c] * a[c];
        const g = Math.sqrt(p / a.length), m = 20 * Math.log10(g);
        m > e && (e = m, t = n);
      }), y(t);
    }, d);
    return () => {
      clearInterval(A), h.forEach((t) => {
        try {
          t.disconnect();
        } catch {
        }
      }), u.forEach((t) => {
        try {
          t.disconnect();
        } catch {
        }
      });
    };
  }, [i, l, f, d]), { activeSpeakerId: S };
}
export {
  k as u
};
