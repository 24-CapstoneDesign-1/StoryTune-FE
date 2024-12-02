import { useRef, useEffect, useState } from "react";

export const useWebRTC = (localStream: MediaStream, friends: { id: string; name: string }[]) => {
  const socketRef = useRef<WebSocket | null>(null);
  const peerConnections = useRef<{ [key: string]: RTCPeerConnection }>({});
  const [remoteStreams, setRemoteStreams] = useState<MediaStream[]>([]);

  useEffect(() => {
    socketRef.current = new WebSocket("wss://localhost:443");

    socketRef.current.onopen = () => {
      console.log("시그널링 서버에 연결되었습니다.");
      socketRef.current?.send(JSON.stringify({ type: "register", id: "uniqueClientId" }));
    };

    socketRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      switch (data.type) {
        case "offer":
          handleOffer(data.offer, data.senderId);
          break;
        case "answer":
          handleAnswer(data.answer, data.senderId);
          break;
        case "ice-candidate":
          handleIceCandidate(data.candidate, data.senderId);
          break;
        default:
          console.log("알 수 없는 메시지 유형:", data.type);
      }
    };

    return () => {
      socketRef.current?.close();
    };
  }, []);

  const createPeerConnection = (targetId: string): RTCPeerConnection => {
    const peerConnection = new RTCPeerConnection();

    peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        socketRef.current?.send(
          JSON.stringify({
            type: "ice-candidate",
            candidate: event.candidate,
            targetId,
          })
        );
      }
    };

    peerConnection.ontrack = (event) => {
      const remoteStream = new MediaStream();
      event.streams[0].getTracks().forEach((track) => remoteStream.addTrack(track));
      setRemoteStreams((prev) => [...prev, remoteStream]);
    };

    localStream.getTracks().forEach((track) => {
      peerConnection.addTrack(track, localStream);
    });

    return peerConnection;
  };

  const handleOffer = async (offer: RTCSessionDescriptionInit, senderId: string) => {
    const peerConnection = createPeerConnection(senderId);
    await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
    const answer = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(answer);
    socketRef.current?.send(
      JSON.stringify({ type: "answer", answer, targetId: senderId })
    );
    peerConnections.current[senderId] = peerConnection;
  };

  const handleAnswer = async (answer: RTCSessionDescriptionInit, senderId: string) => {
    const peerConnection = peerConnections.current[senderId];
    if (peerConnection) {
      await peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
    }
  };

  const handleIceCandidate = (candidate: RTCIceCandidateInit, senderId: string) => {
    const peerConnection = peerConnections.current[senderId];
    if (peerConnection) {
      peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
    }
  };

  const startCall = async () => {
    for (const friend of friends) {
      const peerConnection = createPeerConnection(friend.id);
      const offer = await peerConnection.createOffer();
      await peerConnection.setLocalDescription(offer);
      socketRef.current?.send(
        JSON.stringify({ type: "offer", offer, targetId: friend.id })
      );
      peerConnections.current[friend.id] = peerConnection;
    }
  };

  return { remoteStreams, startCall };
};

export default useWebRTC;
