import { useState as p, useRef as h, useEffect as z, useCallback as k } from "react";
let M = null;
function P() {
  return M ??= import("amazon-ivs-web-broadcast"), M;
}
function K({
  stageToken: v,
  userId: y,
  participantId: C
}) {
  const [_, u] = p([]), [V, w] = p(!1), [j, E] = p(!1), [H, R] = p(null), b = h(null), n = h(null), s = h(null), o = h([]), i = h(null);
  z(() => {
    if (!v) return;
    let e = !0;
    return (async () => {
      R(null);
      try {
        const {
          Stage: r,
          SubscribeType: f,
          StageEvents: l,
          LocalStageStream: S
        } = await P(), m = await navigator.mediaDevices.getUserMedia({
          video: { width: { ideal: 1280 }, height: { ideal: 720 } },
          audio: !0
        });
        if (!e) {
          m.getTracks().forEach((a) => a.stop());
          return;
        }
        n.current = m;
        const F = m.getTracks().map(
          (a) => new S(a)
        );
        o.current = F, b.current && (b.current.srcObject = m);
        const U = {
          stageStreamsToPublish: () => o.current,
          shouldPublishParticipant: () => !0,
          shouldSubscribeToParticipant: () => f.AUDIO_VIDEO
        }, d = new r(v, U);
        if (i.current = d, d.on(l.STAGE_PARTICIPANT_JOINED, (a) => {
          !e || a.isLocal || u((g) => [
            ...g,
            {
              participantId: a.id,
              userId: a.attributes?.userId || a.id,
              isLocal: !1,
              streams: [],
              isSpeaking: !1
            }
          ]);
        }), d.on(l.STAGE_PARTICIPANT_LEFT, (a) => {
          e && u((g) => g.filter((T) => T.participantId !== a.id));
        }), d.on(l.STAGE_PARTICIPANT_STREAMS_ADDED, (a, g) => {
          if (!e || a.isLocal) return;
          const T = [], I = [];
          for (const L of g) {
            const c = L.mediaStreamTrack;
            c && (c.contentHint === "detail" || c.label?.toLowerCase().includes("screen") ? T.push(c) : I.push(c));
          }
          const D = I.length > 0 ? new MediaStream(I) : void 0, q = T.length > 0 ? new MediaStream(T) : void 0;
          u(
            (L) => L.map((c) => c.participantId !== a.id ? c : {
              ...c,
              streams: D ? [D] : c.streams,
              screenStream: q || c.screenStream
            })
          );
        }), await d.join(), !e) {
          d.leave();
          return;
        }
        u((a) => [
          {
            participantId: C,
            userId: y,
            isLocal: !0,
            streams: [m],
            isSpeaking: !1
          },
          ...a
        ]), w(!0);
      } catch (r) {
        e && (R(r.message), console.error("[useHangoutEmbed] Failed to join stage:", r));
      }
    })(), () => {
      e = !1, i.current && (i.current.leave(), i.current = null), o.current = [], n.current && (n.current.getTracks().forEach((r) => r.stop()), n.current = null), s.current && (s.current.getTracks().forEach((r) => r.stop()), s.current = null), u([]), w(!1), E(!1);
    };
  }, [v, y, C]);
  const N = k((e) => {
    if (!n.current) return;
    const t = n.current.getAudioTracks()[0];
    t && (t.enabled = !e), o.current.forEach((r) => {
      r.mediaStreamTrack.kind === "audio" && r.setMuted(e);
    });
  }, []), A = k(async () => {
    if (s.current && (s.current.getTracks().forEach((e) => e.stop()), s.current = null), n.current) {
      const e = n.current.getVideoTracks()[0];
      if (e) {
        const { LocalStageStream: t } = await P(), r = new t(e);
        o.current = [
          ...o.current.filter((f) => f.mediaStreamTrack.kind === "audio"),
          r
        ];
      }
    }
    i.current?.refreshStrategy(), u((e) => e.map((t) => t.isLocal ? { ...t, screenStream: void 0 } : t)), E(!1);
  }, []), O = k(async () => {
    try {
      const e = await navigator.mediaDevices.getDisplayMedia({
        video: { cursor: "always" },
        audio: !1
      });
      s.current = e;
      const t = e.getVideoTracks()[0];
      t.contentHint = "detail";
      const { LocalStageStream: r } = await P(), f = new r(t);
      o.current = [
        ...o.current.filter((l) => l.mediaStreamTrack.kind === "audio"),
        f
      ], i.current?.refreshStrategy(), u((l) => l.map((S) => S.isLocal ? { ...S, screenStream: e } : S)), E(!0), t.addEventListener("ended", () => {
        A();
      });
    } catch (e) {
      if (e.name === "AbortError" || e.name === "NotAllowedError") return;
      console.error("[useHangoutEmbed] Screen share failed:", e);
    }
  }, [A]), G = k((e) => {
    if (!n.current) return;
    const t = n.current.getVideoTracks()[0];
    t && (t.enabled = e), o.current.forEach((r) => {
      r.mediaStreamTrack.kind === "video" && r.setMuted(!e);
    });
  }, []), J = k(() => {
    i.current && (i.current.leave(), i.current = null), o.current = [], n.current && (n.current.getTracks().forEach((e) => e.stop()), n.current = null), s.current && (s.current.getTracks().forEach((e) => e.stop()), s.current = null), u([]), w(!1), E(!1);
  }, []);
  return { localVideoRef: b, participants: _, isJoined: V, isScreenSharing: j, error: H, toggleMute: N, toggleCamera: G, startScreenShare: O, stopScreenShare: A, leave: J };
}
export {
  K as u
};
