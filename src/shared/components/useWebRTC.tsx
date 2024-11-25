import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from '@emotion/styled'; 
import { MainContainer } from "@/entities";
import { InfoHeader } from "@/widgets";
import { io } from 'socket.io-client';
import { FaCamera } from "react-icons/fa";
import { BiSolidCameraOff, BiSolidCamera } from 'react-icons/bi'; 
import { PiSpeakerSimpleSlashDuotone, PiSpeakerSimpleHighDuotone } from "react-icons/pi";

const VideoContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
`;

const VideoBox = styled.video`
  width: 300px;
  height: 200px;
  background-color: black;
  border-radius: 8px;
`;

const RolePlayPage = () => {
  const location = useLocation();
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStreams, setRemoteStreams] = useState<MediaStream[]>([]);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true); // 마이크 상태
  const [isVideoEnabled, setIsVideoEnabled] = useState(true); // 비디오 상태
  const peerConnections = useRef<{ [id: string]: RTCPeerConnection }>({});
  const socketRef = useRef<any>(null); // 시그널링 서버 연결

  const friends = [
    { id: 'user1', name: '김민수' },
    { id: 'user2', name: '이민영' },
    { id: 'user3', name: '박영수' },
  ]; // 친구 목록

  useEffect(() => {
    // Socket.IO 연결
    socketRef.current = io('http://localhost:5000'); // 시그널링 서버 URL

    // 사용자 미디어 요청
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setLocalStream(stream);
      })
      .catch((err) => console.error("연결할 수 없습니다. 다시 시도하세요.", err));

    // Socket 이벤트 리스너 등록
    socketRef.current.on('offer', handleReceiveOffer);
    socketRef.current.on('answer', handleReceiveAnswer);
    socketRef.current.on('candidate', handleReceiveCandidate);
    socketRef.current.on('newUser', handleNewUser); // 새로운 사용자가 들어올 때

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  const handleNewUser = async (newUserId: string) => {
    // 새로 들어온 사용자에게 기존의 `offer`를 전송
    const peerConnection = createPeerConnection(newUserId);
    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);
    socketRef.current.emit('offer', { to: newUserId, offer });
  };

  const handleReceiveOffer = async ({ from, offer }: any) => {
    const peerConnection = createPeerConnection(from);
    await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));

    const answer = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(answer);

    socketRef.current.emit('answer', { to: from, answer });
  };

  const handleReceiveAnswer = async ({ from, answer }: any) => {
    const peerConnection = peerConnections.current[from];
    if (peerConnection) {
      await peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
    }
  };

  const handleReceiveCandidate = async ({ from, candidate }: any) => {
    const peerConnection = peerConnections.current[from];
    if (peerConnection) {
      await peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
    }
  };

  const createPeerConnection = (id: string) => {
    const peerConnection = new RTCPeerConnection({
      iceServers: [
        { urls: 'stun:stun.l.google.com:19302' }, 
      ],
    });

    peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        socketRef.current.emit('candidate', { to: id, candidate: event.candidate });
      }
    };

    peerConnection.ontrack = (event) => {
      setRemoteStreams((prev) => [...prev, event.streams[0]]);
    };

    if (localStream) {
      localStream.getTracks().forEach((track) => {
        peerConnection.addTrack(track, localStream);
      });
    }

    peerConnections.current[id] = peerConnection;
    return peerConnection;
  };

  const startCall = async () => {
    // 방에 들어온 모든 사용자들과 연결 시작
    friends.forEach(async (friend) => {
      const peerConnection = createPeerConnection(friend.id);
      const offer = await peerConnection.createOffer();
      await peerConnection.setLocalDescription(offer);

      socketRef.current.emit('offer', { to: friend.id, offer });
    });
  };

  // 마이크 토글
  const toggleAudio = () => {
    if (localStream) {
      const audioTrack = localStream.getAudioTracks()[0];
      audioTrack.enabled = !audioTrack.enabled;
      setIsAudioEnabled(audioTrack.enabled);
    }
  };

  // 비디오 토글
  const toggleVideo = () => {
    if (localStream) {
      const videoTrack = localStream.getVideoTracks()[0];
      videoTrack.enabled = !videoTrack.enabled;
      setIsVideoEnabled(videoTrack.enabled);
    }
  };

  return (
    <MainContainer>
      <InfoHeader type="역할 놀이" />
      <h2>화상회의 테스트</h2>

      <VideoContainer>
        {/* 로컬 비디오 */}
        {localStream && <VideoBox autoPlay muted playsInline ref={(ref) => ref && (ref.srcObject = localStream)} />}

        {/* 원격 비디오 */}
        {remoteStreams.map((stream, index) => (
          <VideoBox key={index} autoPlay playsInline ref={(ref) => ref && (ref.srcObject = stream)} />
        ))}
      </VideoContainer>

      <button onClick={startCall}>역할놀이 시작</button>
      
      {/* 마이크/비디오 토글 버튼 */}
      <div>
      <button onClick={toggleVideo}>
        {isVideoEnabled ? <BiSolidCamera /> : <BiSolidCameraOff />}
        {isVideoEnabled ? '비디오 끄기' : '비디오 켜기'}
      </button>

        <button onClick={toggleAudio}>
        {isVideoEnabled ? <PiSpeakerSimpleSlashDuotone /> : <PiSpeakerSimpleHighDuotone />}
          {isAudioEnabled ? '소리 끄기' : '소리 켜기'}
        </button>
      </div>
    </MainContainer>
  );
};

export default RolePlayPage; 