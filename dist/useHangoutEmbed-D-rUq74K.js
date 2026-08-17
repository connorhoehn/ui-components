import { useState as v, useRef as d, useEffect as _, useCallback as k } from "react";
let V = null;
function y() {
  return V ??= import("amazon-ivs-web-broadcast"), V;
}
function Q({
  stageToken: w,
  userId: R,
  participantId: C
}) {
  const [j, l] = v([]), [H, b] = v(!1), [N, E] = v(!1), [O, D] = v(null), A = d(null), n = d(null), c = d(null), i = d([]), u = d(null), p = d(!0);
  _(() => (p.current = !0, () => {
    p.current = !1;
  }), []), _(() => {
    if (!w) return;
    let e = !0;
    return (async () => {
      D(null);
      try {
        const {
          Stage: r,
          SubscribeType: S,
          StageEvents: s,
          LocalStageStream: m
        } = await y(), g = await navigator.mediaDevices.getUserMedia({
          video: { width: { ideal: 1280 }, height: { ideal: 720 } },
          audio: !0
        });
        if (!e) {
          g.getTracks().forEach((a) => a.stop());
          return;
        }
        n.current = g;
        const q = g.getTracks().map(
          (a) => new m(a)
        );
        i.current = q, A.current && (A.current.srcObject = g);
        const z = {
          stageStreamsToPublish: () => i.current,
          shouldPublishParticipant: () => !0,
          shouldSubscribeToParticipant: () => S.AUDIO_VIDEO
        }, f = new r(w, z);
        if (u.current = f, f.on(s.STAGE_PARTICIPANT_JOINED, (a) => {
          !e || a.isLocal || l((T) => [
            ...T,
            {
              participantId: a.id,
              userId: a.attributes?.userId || a.id,
              isLocal: !1,
              streams: [],
              isSpeaking: !1
            }
          ]);
        }), f.on(s.STAGE_PARTICIPANT_LEFT, (a) => {
          e && l((T) => T.filter((h) => h.participantId !== a.id));
        }), f.on(s.STAGE_PARTICIPANT_STREAMS_ADDED, (a, T) => {
          if (!e || a.isLocal) return;
          const h = [], L = [];
          for (const P of T) {
            const o = P.mediaStreamTrack;
            o && (o.contentHint === "detail" || o.label?.toLowerCase().includes("screen") ? h.push(o) : L.push(o));
          }
          const M = L.length > 0 ? new MediaStream(L) : void 0, B = h.length > 0 ? new MediaStream(h) : void 0;
          l(
            (P) => P.map((o) => o.participantId !== a.id ? o : {
              ...o,
              streams: M ? [M] : o.streams,
              screenStream: B || o.screenStream
            })
          );
        }), await f.join(), !e) {
          f.leave();
          return;
        }
        l((a) => [
          {
            participantId: C,
            userId: R,
            isLocal: !0,
            streams: [g],
            isSpeaking: !1
          },
          ...a
        ]), b(!0);
      } catch (r) {
        e && (D(r.message), console.error("[useHangoutEmbed] Failed to join stage:", r));
      }
    })(), () => {
      e = !1, u.current && (u.current.leave(), u.current = null), i.current = [], n.current && (n.current.getTracks().forEach((r) => r.stop()), n.current = null), c.current && (c.current.getTracks().forEach((r) => r.stop()), c.current = null), l([]), b(!1), E(!1);
    };
  }, [w, R, C]);
  const G = k((e) => {
    if (!n.current) return;
    const t = n.current.getAudioTracks()[0];
    t && (t.enabled = !e), i.current.forEach((r) => {
      r.mediaStreamTrack.kind === "audio" && r.setMuted(e);
    });
  }, []), I = k(async () => {
    if (c.current && (c.current.getTracks().forEach((e) => e.stop()), c.current = null), n.current) {
      const e = n.current.getVideoTracks()[0];
      if (e) {
        const { LocalStageStream: t } = await y(), r = new t(e);
        i.current = [
          ...i.current.filter((S) => S.mediaStreamTrack.kind === "audio"),
          r
        ];
      }
    }
    u.current?.refreshStrategy(), l((e) => e.map((t) => t.isLocal ? { ...t, screenStream: void 0 } : t)), E(!1);
  }, []), J = k(async () => {
    try {
      const e = await navigator.mediaDevices.getDisplayMedia({
        video: { cursor: "always" },
        audio: !1
      });
      if (!p.current) {
        e.getTracks().forEach((s) => s.stop());
        return;
      }
      c.current = e;
      const t = e.getVideoTracks()[0];
      t.contentHint = "detail";
      const { LocalStageStream: r } = await y();
      if (!p.current) {
        e.getTracks().forEach((s) => s.stop()), c.current = null;
        return;
      }
      const S = new r(t);
      i.current = [
        ...i.current.filter((s) => s.mediaStreamTrack.kind === "audio"),
        S
      ], u.current?.refreshStrategy(), l((s) => s.map((m) => m.isLocal ? { ...m, screenStream: e } : m)), E(!0), t.addEventListener("ended", () => {
        I();
      });
    } catch (e) {
      if (e.name === "AbortError" || e.name === "NotAllowedError") return;
      console.error("[useHangoutEmbed] Screen share failed:", e);
    }
  }, [I]), F = k((e) => {
    if (!n.current) return;
    const t = n.current.getVideoTracks()[0];
    t && (t.enabled = e), i.current.forEach((r) => {
      r.mediaStreamTrack.kind === "video" && r.setMuted(!e);
    });
  }, []), U = k(() => {
    u.current && (u.current.leave(), u.current = null), i.current = [], n.current && (n.current.getTracks().forEach((e) => e.stop()), n.current = null), c.current && (c.current.getTracks().forEach((e) => e.stop()), c.current = null), l([]), b(!1), E(!1);
  }, []);
  return { localVideoRef: A, participants: j, isJoined: H, isScreenSharing: N, error: O, toggleMute: G, toggleCamera: F, startScreenShare: J, stopScreenShare: I, leave: U };
}
export {
  Q as u
};
