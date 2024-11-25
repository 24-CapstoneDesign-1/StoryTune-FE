import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from '@emotion/styled';
import { MainContainer } from "@/entities";
import { InfoHeader } from "@/widgets";
import { BiSolidCameraOff, BiSolidCamera } from 'react-icons/bi';
import { PiSpeakerSimpleSlashDuotone, PiSpeakerSimpleHighDuotone } from "react-icons/pi";
import { useWebRTC } from '@/shared';

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
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);

  const friends = [
    { id: 'user1', name: '김민수' },
    { id: 'user2', name: '이민영' },
    { id: 'user3', name: '박영수' },
  ];

  const [localStream, setLocalStream] = useState<MediaStream | null>(null);

  const { remoteStreams, startCall } = useWebRTC(localStream, friends);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setLocalStream(stream);
      })
      .catch((err) => console.error("연결할 수 없습니다. 다시 시도하세요.", err));
  }, []);

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
          {isAudioEnabled ? <PiSpeakerSimpleHighDuotone /> : <PiSpeakerSimpleSlashDuotone />}
          {isAudioEnabled ? '소리 끄기' : '소리 켜기'}
        </button>
      </div>
    </MainContainer>
  );
};

export default RolePlayPage;
