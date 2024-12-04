import { useRef, useEffect, useState, useCallback } from "react";

interface Friend {
  id: string;
  name: string;
}

export const useWebRTC = (localStream: MediaStream, friends: Friend[]) => {
  const socketRef = useRef<WebSocket | null>(null);
  const peerConnections = useRef<{ [key: string]: RTCPeerConnection }>({});
  const [remoteStreams, setRemoteStreams] = useState<Map<string, MediaStream>>(new Map());
  const [connectionStatus, setConnectionStatus] = useState<{ [key: string]: 'connecting' | 'connected' | 'disconnected' }>({});

  // ICE 서버 
  const configuration = {
    iceServers: [
      { urls: 'stun:stun.l.google.com:19302' },
      { urls: 'stun:stun1.l.google.com:19302' },
    ]
  };

  const updateConnectionStatus = useCallback((peerId: string, status: 'connecting' | 'connected' | 'disconnected') => {
    setConnectionStatus(prev => ({ ...prev, [peerId]: status }));
  }, []);

  const createPeerConnection = useCallback((targetId: string): RTCPeerConnection => {
    const peerConnection = new RTCPeerConnection(configuration);
    
    peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        socketRef.current?.send(JSON.stringify({
          type: "ice-candidate",
          candidate: event.candidate,
          targetId,
        }));
      }
    };

    peerConnection.ontrack = (event) => {
      const remoteStream = new MediaStream();
      event.streams[0].getTracks().forEach(track => remoteStream.addTrack(track));
      setRemoteStreams(prev => new Map(prev).set(targetId, remoteStream));
    };

    peerConnection.oniceconnectionstatechange = () => {
      switch(peerConnection.iceConnectionState) {
        case "connected":
          updateConnectionStatus(targetId, 'connected');
          break;
        case "disconnected":
          updateConnectionStatus(targetId, 'disconnected');
          break;
        case "failed":
          handleConnectionFailure(targetId);
          break;
      }
    };

    localStream.getTracks().forEach(track => {
      peerConnection.addTrack(track, localStream);
    });

    return peerConnection;
  }, [localStream, updateConnectionStatus]);

  const handleConnectionFailure = useCallback(async (peerId: string) => {
    const oldConnection = peerConnections.current[peerId];
    if (oldConnection) {
      oldConnection.close();
      delete peerConnections.current[peerId];
    }

    const newConnection = createPeerConnection(peerId);
    peerConnections.current[peerId] = newConnection;
    
    try {
      const offer = await newConnection.createOffer();
      await newConnection.setLocalDescription(offer);
      socketRef.current?.send(JSON.stringify({
        type: "offer",
        offer,
        targetId: peerId
      }));
    } catch (error) {
      console.error("연결 재시도 실패:", error);
    }
  }, [createPeerConnection]);

  // WebSocket 연결 설정
  useEffect(() => {
    const ws = new WebSocket("wss://localhost:443");
    socketRef.current = ws;

    const handleWebSocketError = () => {
      console.error("WebSocket 연결 오류");
      setTimeout(() => {
        if (socketRef.current?.readyState === WebSocket.CLOSED) {
        }
      }, 5000);
    };

    ws.onopen = () => {
      console.log("시그널링 서버에 연결되었습니다.");
      ws.send(JSON.stringify({ type: "register", id: "uniqueClientId" }));
    };

    ws.onmessage = async (event) => {
      try {
        const data = JSON.parse(event.data);
        switch (data.type) {
          case "offer":
            await handleOffer(data.offer, data.senderId);
            break;
          case "answer":
            await handleAnswer(data.answer, data.senderId);
            break;
          case "ice-candidate":
            await handleIceCandidate(data.candidate, data.senderId);
            break;
          default:
            console.log("알 수 없는 메시지 유형:", data.type);
        }
      } catch (error) {
        console.error("메시지 처리 중 오류 발생:", error);
      }
    };

    ws.onerror = handleWebSocketError;
    ws.onclose = () => {
      console.log("WebSocket 연결이 종료되었습니다.");
    };

    return () => {
      Object.values(peerConnections.current).forEach(connection => {
        connection.close();
      });
      ws.close();
    };
  }, []);

  const handleOffer = async (offer: RTCSessionDescriptionInit, senderId: string) => {
    try {
      const peerConnection = createPeerConnection(senderId);
      await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
      const answer = await peerConnection.createAnswer();
      await peerConnection.setLocalDescription(answer);
      
      socketRef.current?.send(JSON.stringify({
        type: "answer",
        answer,
        targetId: senderId
      }));
      
      peerConnections.current[senderId] = peerConnection;
      updateConnectionStatus(senderId, 'connecting');
    } catch (error) {
      console.error("Offer 처리 중 오류 발생:", error);
    }
  };

  const handleAnswer = async (answer: RTCSessionDescriptionInit, senderId: string) => {
    try {
      const peerConnection = peerConnections.current[senderId];
      if (peerConnection) {
        await peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
      }
    } catch (error) {
      console.error("Answer 처리 중 오류 발생:", error);
    }
  };

  const handleIceCandidate = async (candidate: RTCIceCandidateInit, senderId: string) => {
    try {
      const peerConnection = peerConnections.current[senderId];
      if (peerConnection) {
        await peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
      }
    } catch (error) {
      console.error("ICE candidate 처리 중 오류 발생:", error);
    }
  };

  const startCall = async () => {
    try {
      for (const friend of friends) {
        updateConnectionStatus(friend.id, 'connecting');
        const peerConnection = createPeerConnection(friend.id);
        const offer = await peerConnection.createOffer();
        await peerConnection.setLocalDescription(offer);
        
        socketRef.current?.send(JSON.stringify({
          type: "offer",
          offer,
          targetId: friend.id
        }));
        
        peerConnections.current[friend.id] = peerConnection;
      }
    } catch (error) {
      console.error("통화 시작 중 오류 발생:", error);
    }
  };

  const closeConnection = (peerId: string) => {
    const connection = peerConnections.current[peerId];
    if (connection) {
      connection.close();
      delete peerConnections.current[peerId];
      setRemoteStreams(prev => {
        const newStreams = new Map(prev);
        newStreams.delete(peerId);
        return newStreams;
      });
      updateConnectionStatus(peerId, 'disconnected');
    }
  };

  return {
    remoteStreams,
    startCall,
    closeConnection,
    connectionStatus
  };
};

export default useWebRTC;