import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from '@emotion/styled'; 
import { MainContainer } from "@/entities";
import { InfoHeader } from "@/widgets";
import { io } from 'socket.io-client';
import { FaCamera } from "react-icons/fa";
import { BiSolidCameraOff, BiSolidCamera } from 'react-icons/bi'; 
import { PiSpeakerSimpleSlashDuotone, PiSpeakerSimpleHighDuotone } from "react-icons/pi";
import { useWebRTC } from '@/shared';

const SubContainer = styled.div`
    height: 20vh;
    @media (max-width: 768px) {
        flex-direction: column;
        height: 100%;
        width: 100%;
    }
`;

const PageContainer = styled.div`
  display: flex;
  width: 20%;
  justify-content: center;
  flex-direction : column;
  margin-top: 20px;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

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

const VisualizerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;

const VisualizerBar = styled.div<{ height: number }>`
  width: 3px;
  height: ${(props) => props.height}px;
  background-color: ${(props) => (props.height > 30 ? "#FF8A65" : "#B0BEC5")};
  margin: 0 1px;
  
`;

const RolePlayPage = () => {
  const location = useLocation();
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStreams, setRemoteStreams] = useState<MediaStream[]>([]);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true); 
  const [isVideoEnabled, setIsVideoEnabled] = useState(true); 
  const peerConnections = useRef<{ [id: string]: RTCPeerConnection }>({});
  const socketRef = useRef<any>(null); 

  const friends = [
    { id: 'user1', name: '김민수' },
    { id: 'user2', name: '이민영' },
    { id: 'user3', name: '박영수' },
  ]; // 친구 목록

  useEffect(() => {

    socketRef.current = io('http://localhost:5000'); // 시그널링 서버 URL

   
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setLocalStream(stream);
      })
      .catch((err) => console.error("오류가 발생했습니다.", err));

 
    socketRef.current.on('offer', handleReceiveOffer);
    socketRef.current.on('answer', handleReceiveAnswer);
    socketRef.current.on('candidate', handleReceiveCandidate);
    socketRef.current.on('newUser', handleNewUser); // 새로운 사용자가 들어올 때

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  const handleNewUser = async (newUserId: string) => {
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
    friends.forEach(async (friend) => {
      const peerConnection = createPeerConnection(friend.id);
      const offer = await peerConnection.createOffer();
      await peerConnection.setLocalDescription(offer);

      socketRef.current.emit('offer', { to: friend.id, offer });
    });
  };

 
  const toggleAudio = () => {
    if (localStream) {
      const audioTrack = localStream.getAudioTracks()[0];
      audioTrack.enabled = !audioTrack.enabled;
      setIsAudioEnabled(audioTrack.enabled);
    }
  };

  const toggleVideo = () => {
    if (localStream) {
      const videoTrack = localStream.getVideoTracks()[0];
      videoTrack.enabled = !videoTrack.enabled;
      setIsVideoEnabled(videoTrack.enabled);
    }
  };

  //마이크가 열려있는지 확인할 수 있도록 음량 시각화
  const AudioVisualizer = ({ stream }: { stream: MediaStream | null }) => {
    const [levels, setLevels] = useState<number[]>(new Array(20).fill(0));
    const analyserRef = useRef<AnalyserNode | null>(null);
    const audioContextRef = useRef<AudioContext | null>(null);
  
    useEffect(() => {
      if (stream) {
        const audioContext = new AudioContext();
        const analyser = audioContext.createAnalyser();
        const source = audioContext.createMediaStreamSource(stream);
  
        analyser.fftSize = 64; 
        source.connect(analyser);
  
        audioContextRef.current = audioContext;
        analyserRef.current = analyser;
  
        const dataArray = new Uint8Array(analyser.frequencyBinCount);
  
        const updateLevels = () => {
          analyser.getByteFrequencyData(dataArray);
          const normalizedLevels = Array.from(dataArray)
            .slice(0, 40) 
            .map((value) => (value / 255) * 100); 
  
          setLevels(normalizedLevels);
          requestAnimationFrame(updateLevels);
        };
  
        updateLevels();
      }
  
      return () => {
        audioContextRef.current?.close();
      };
    }, [stream]);

    return (
      <VisualizerContainer>
        {levels.map((level, index) => (
          <VisualizerBar key={index} height={level} />
        ))}
      </VisualizerContainer>
    );
  };

  return (
    <MainContainer>
      <InfoHeader type="역할 놀이" />
      <PageContainer>
      <h2>화상회의 테스트</h2>
      <VideoContainer>
        {localStream && <VideoBox autoPlay muted playsInline ref={(ref) => ref && (ref.srcObject = localStream)} />}

        {remoteStreams.map((stream, index) => (
          <VideoBox key={index} autoPlay playsInline ref={(ref) => ref && (ref.srcObject = stream)} />
        ))}
      </VideoContainer>
      <SubContainer>
      <AudioVisualizer stream={localStream} />
      </SubContainer>
      <button onClick={startCall}>역할놀이 시작</button>
      
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
      </PageContainer>
    </MainContainer>
  );
};

export default RolePlayPage;