import { useCallback as e, useEffect as t, useRef as n, useState as r } from "react";
//#region src/lib/video/useHangoutEmbed.ts
var i = null;
function a() {
	return i ??= import("amazon-ivs-web-broadcast"), i;
}
function o({ stageToken: i, userId: o, participantId: s }) {
	let [c, l] = r([]), [u, d] = r(!1), [f, p] = r(!1), [m, h] = r(null), g = n(null), _ = n(null), v = n(null), y = n([]), b = n(null), x = n(!0);
	t(() => (x.current = !0, () => {
		x.current = !1;
	}), []), t(() => {
		if (!i) return;
		let e = !0;
		return (async () => {
			h(null);
			try {
				let { Stage: t, SubscribeType: n, StageEvents: r, LocalStageStream: c } = await a(), u = await navigator.mediaDevices.getUserMedia({
					video: {
						width: { ideal: 1280 },
						height: { ideal: 720 }
					},
					audio: !0
				});
				if (!e) {
					u.getTracks().forEach((e) => e.stop());
					return;
				}
				_.current = u;
				let f = u.getTracks().map((e) => new c(e));
				y.current = f, g.current && (g.current.srcObject = u);
				let p = new t(i, {
					stageStreamsToPublish: () => y.current,
					shouldPublishParticipant: () => !0,
					shouldSubscribeToParticipant: () => n.AUDIO_VIDEO
				});
				if (b.current = p, p.on(r.STAGE_PARTICIPANT_JOINED, (t) => {
					!e || t.isLocal || l((e) => [...e, {
						participantId: t.id,
						userId: t.attributes?.userId || t.id,
						isLocal: !1,
						streams: [],
						isSpeaking: !1
					}]);
				}), p.on(r.STAGE_PARTICIPANT_LEFT, (t) => {
					e && l((e) => e.filter((e) => e.participantId !== t.id));
				}), p.on(r.STAGE_PARTICIPANT_STREAMS_ADDED, (t, n) => {
					if (!e || t.isLocal) return;
					let r = [], i = [];
					for (let e of n) {
						let t = e.mediaStreamTrack;
						t && (t.contentHint === "detail" || t.label?.toLowerCase().includes("screen") ? r.push(t) : i.push(t));
					}
					let a = i.length > 0 ? new MediaStream(i) : void 0, o = r.length > 0 ? new MediaStream(r) : void 0;
					l((e) => e.map((e) => e.participantId === t.id ? {
						...e,
						streams: a ? [a] : e.streams,
						screenStream: o || e.screenStream
					} : e));
				}), await p.join(), !e) {
					p.leave();
					return;
				}
				l((e) => [{
					participantId: s,
					userId: o,
					isLocal: !0,
					streams: [u],
					isSpeaking: !1
				}, ...e]), d(!0);
			} catch (t) {
				e && (h(t.message), console.error("[useHangoutEmbed] Failed to join stage:", t));
			}
		})(), () => {
			e = !1, b.current &&= (b.current.leave(), null), y.current = [], _.current &&= (_.current.getTracks().forEach((e) => e.stop()), null), v.current &&= (v.current.getTracks().forEach((e) => e.stop()), null), l([]), d(!1), p(!1);
		};
	}, [
		i,
		o,
		s
	]);
	let S = e((e) => {
		if (!_.current) return;
		let t = _.current.getAudioTracks()[0];
		t && (t.enabled = !e), y.current.forEach((t) => {
			t.mediaStreamTrack.kind === "audio" && t.setMuted(e);
		});
	}, []), C = e(async () => {
		if (v.current &&= (v.current.getTracks().forEach((e) => e.stop()), null), _.current) {
			let e = _.current.getVideoTracks()[0];
			if (e) {
				let { LocalStageStream: t } = await a(), n = new t(e);
				y.current = [...y.current.filter((e) => e.mediaStreamTrack.kind === "audio"), n];
			}
		}
		b.current?.refreshStrategy(), l((e) => e.map((e) => e.isLocal ? {
			...e,
			screenStream: void 0
		} : e)), p(!1);
	}, []), w = e(async () => {
		try {
			let e = await navigator.mediaDevices.getDisplayMedia({
				video: { cursor: "always" },
				audio: !1
			});
			if (!x.current) {
				e.getTracks().forEach((e) => e.stop());
				return;
			}
			v.current = e;
			let t = e.getVideoTracks()[0];
			t.contentHint = "detail";
			let { LocalStageStream: n } = await a();
			if (!x.current) {
				e.getTracks().forEach((e) => e.stop()), v.current = null;
				return;
			}
			let r = new n(t);
			y.current = [...y.current.filter((e) => e.mediaStreamTrack.kind === "audio"), r], b.current?.refreshStrategy(), l((t) => t.map((t) => t.isLocal ? {
				...t,
				screenStream: e
			} : t)), p(!0), t.addEventListener("ended", () => {
				C();
			});
		} catch (e) {
			if (e.name === "AbortError" || e.name === "NotAllowedError") return;
			console.error("[useHangoutEmbed] Screen share failed:", e);
		}
	}, [C]);
	return {
		localVideoRef: g,
		participants: c,
		isJoined: u,
		isScreenSharing: f,
		error: m,
		toggleMute: S,
		toggleCamera: e((e) => {
			if (!_.current) return;
			let t = _.current.getVideoTracks()[0];
			t && (t.enabled = e), y.current.forEach((t) => {
				t.mediaStreamTrack.kind === "video" && t.setMuted(!e);
			});
		}, []),
		startScreenShare: w,
		stopScreenShare: C,
		leave: e(() => {
			b.current &&= (b.current.leave(), null), y.current = [], _.current &&= (_.current.getTracks().forEach((e) => e.stop()), null), v.current &&= (v.current.getTracks().forEach((e) => e.stop()), null), l([]), d(!1), p(!1);
		}, [])
	};
}
//#endregion
export { o as t };
