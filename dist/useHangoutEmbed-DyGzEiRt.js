import { useState as k, useRef as g, useEffect as J, useCallback as T } from "react";
import { LocalStageStream as w, SubscribeType as F, Stage as U, StageEvents as P } from "amazon-ivs-web-broadcast";
function B({
  stageToken: E,
  userId: y,
  participantId: L
}) {
  const [M, u] = k([]), [_, p] = k(!1), [C, h] = k(!1), [V, R] = k(null), v = g(null), n = g(null), s = g(null), i = g([]), o = g(null);
  J(() => {
    if (!E) return;
    let e = !0;
    return (async () => {
      R(null);
      try {
        const r = await navigator.mediaDevices.getUserMedia({
          video: { width: { ideal: 1280 }, height: { ideal: 720 } },
          audio: !0
        });
        if (!e) {
          r.getTracks().forEach((a) => a.stop());
          return;
        }
        n.current = r;
        const f = r.getTracks().map(
          (a) => new w(a)
        );
        i.current = f, v.current && (v.current.srcObject = r);
        const d = {
          stageStreamsToPublish: () => i.current,
          shouldPublishParticipant: () => !0,
          shouldSubscribeToParticipant: () => F.AUDIO_VIDEO
        }, l = new U(E, d);
        if (o.current = l, l.on(P.STAGE_PARTICIPANT_JOINED, (a) => {
          !e || a.isLocal || u((m) => [
            ...m,
            {
              participantId: a.id,
              userId: a.attributes?.userId || a.id,
              isLocal: !1,
              streams: [],
              isSpeaking: !1
            }
          ]);
        }), l.on(P.STAGE_PARTICIPANT_LEFT, (a) => {
          e && u((m) => m.filter((S) => S.participantId !== a.id));
        }), l.on(P.STAGE_PARTICIPANT_STREAMS_ADDED, (a, m) => {
          if (!e || a.isLocal) return;
          const S = [], A = [];
          for (const I of m) {
            const c = I.mediaStreamTrack;
            c && (c.contentHint === "detail" || c.label?.toLowerCase().includes("screen") ? S.push(c) : A.push(c));
          }
          const D = A.length > 0 ? new MediaStream(A) : void 0, G = S.length > 0 ? new MediaStream(S) : void 0;
          u(
            (I) => I.map((c) => c.participantId !== a.id ? c : {
              ...c,
              streams: D ? [D] : c.streams,
              screenStream: G || c.screenStream
            })
          );
        }), await l.join(), !e) {
          l.leave();
          return;
        }
        u((a) => [
          {
            participantId: L,
            userId: y,
            isLocal: !0,
            streams: [r],
            isSpeaking: !1
          },
          ...a
        ]), p(!0);
      } catch (r) {
        e && (R(r.message), console.error("[useHangoutEmbed] Failed to join stage:", r));
      }
    })(), () => {
      e = !1, o.current && (o.current.leave(), o.current = null), i.current = [], n.current && (n.current.getTracks().forEach((r) => r.stop()), n.current = null), s.current && (s.current.getTracks().forEach((r) => r.stop()), s.current = null), u([]), p(!1), h(!1);
    };
  }, [E, y, L]);
  const j = T((e) => {
    if (!n.current) return;
    const t = n.current.getAudioTracks()[0];
    t && (t.enabled = !e), i.current.forEach((r) => {
      r.mediaStreamTrack.kind === "audio" && r.setMuted(e);
    });
  }, []), b = T(() => {
    if (s.current && (s.current.getTracks().forEach((e) => e.stop()), s.current = null), n.current) {
      const e = n.current.getVideoTracks()[0];
      if (e) {
        const t = new w(e);
        i.current = [
          ...i.current.filter((r) => r.mediaStreamTrack.kind === "audio"),
          t
        ];
      }
    }
    o.current?.refreshStrategy(), u((e) => e.map((t) => t.isLocal ? { ...t, screenStream: void 0 } : t)), h(!1);
  }, []), H = T(async () => {
    try {
      const e = await navigator.mediaDevices.getDisplayMedia({
        video: { cursor: "always" },
        audio: !1
      });
      s.current = e;
      const t = e.getVideoTracks()[0];
      t.contentHint = "detail";
      const r = new w(t);
      i.current = [
        ...i.current.filter((f) => f.mediaStreamTrack.kind === "audio"),
        r
      ], o.current?.refreshStrategy(), u((f) => f.map((d) => d.isLocal ? { ...d, screenStream: e } : d)), h(!0), t.addEventListener("ended", () => {
        b();
      });
    } catch (e) {
      if (e.name === "AbortError" || e.name === "NotAllowedError") return;
      console.error("[useHangoutEmbed] Screen share failed:", e);
    }
  }, [b]), N = T((e) => {
    if (!n.current) return;
    const t = n.current.getVideoTracks()[0];
    t && (t.enabled = e), i.current.forEach((r) => {
      r.mediaStreamTrack.kind === "video" && r.setMuted(!e);
    });
  }, []), O = T(() => {
    o.current && (o.current.leave(), o.current = null), i.current = [], n.current && (n.current.getTracks().forEach((e) => e.stop()), n.current = null), s.current && (s.current.getTracks().forEach((e) => e.stop()), s.current = null), u([]), p(!1), h(!1);
  }, []);
  return { localVideoRef: v, participants: M, isJoined: _, isScreenSharing: C, error: V, toggleMute: j, toggleCamera: N, startScreenShare: H, stopScreenShare: b, leave: O };
}
export {
  B as u
};
