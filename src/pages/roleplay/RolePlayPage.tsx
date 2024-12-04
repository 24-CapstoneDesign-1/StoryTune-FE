import { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled'; 
import { MainContainer } from "@/entities";
import { InfoHeader } from "@/widgets";
import { io, Socket } from 'socket.io-client';
import { FaCamera } from "react-icons/fa";
import { BiSolidCameraOff, BiSolidCamera } from 'react-icons/bi'; 
import { PiSpeakerSimpleSlashDuotone, PiSpeakerSimpleHighDuotone } from "react-icons/pi";
import { useWebRTC, RolePlayService } from '@/shared';
import { useLocation } from 'react-router-dom';

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
  const [remoteStreams, setRemoteStreams] = useState<Map<string, MediaStream>>(new Map());
  const [isAudioEnabled, setIsAudioEnabled] = useState(true); 
  const [isVideoEnabled, setIsVideoEnabled] = useState(true); 
  const [isConnected, setIsConnected] = useState(false);
  const [roomId] = useState(location.state?.roomId || '');
  const [myBookId] = useState(location.state?.myBookId || '');
  const [pageNum, setPageNum] = useState(1);
  
  const [roomData, setRoomData] = useState<RolePlay.RolePlayRoom | null>(null);
  const [pageData, setPageData] = useState<RolePlay.RolePlayPageResDto | null>(null);
  const [currentRole, setCurrentRole] = useState<RolePlay.RolePlayRoleResDto | null>(null);
  const [participants, setParticipants] = useState<RolePlay.RolePlayParticipant[]>([]);

  useEffect(() => {
    const fetchRoomData = async () => {
      if (!roomId) return;

      try {
        // 방 정보 조회
        const roomResponse = await rolePlayService.getRoomById(Number(roomId));
        setRoomData(roomResponse.data);

        // 페이지 정보 조회
        const pageResponse = await rolePlayService.getRolePlayPage({
          rolePlayingRoomId: Number(roomId),
          myBookId: Number(myBookId),
          pageNum
        });
        setPageData(pageResponse.data);

        // 역할 정보 조회
        const roleResponse = await rolePlayService.getRolePlayRole(Number(roomId), Number(myBookId));
        setCurrentRole(roleResponse.data);

        // 참가자 정보 조회
        const participantsResponse = await rolePlayService.getParticipants(Number(roomId));
        setParticipants(participantsResponse.data.result);

      } catch (error) {
        console.error('실패:', error);
      }
    };

    fetchRoomData();
  }, [roomId, myBookId]);

  const peerConnections = useRef<Map<string, RTCPeerConnection>>(new Map());
  const socketRef = useRef<Socket | null>(null);

  const rolePlayService = RolePlayService();

  const startCall = async () => {
    if (!socketRef.current || !localStream) return;

    try {
      socketRef.current.emit('join-room', roomId);
    } catch (error) {
      console.error('역할놀이 시작 실패:', error);
    }
  };

  useEffect(() => {
    socketRef.current = io('http://localhost:3001', {
      withCredentials: true,
      transports: ['websocket'],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      timeout: 10000
    });

    return () => {
      localStream?.getTracks().forEach(track => track.stop());
      peerConnections.current.forEach(connection => connection.close());
      socketRef.current?.disconnect();
      
      if (roomId) {
        rolePlayService.updateInviteStatus(Number(roomId), 'REJECTED')
      }
    };
  }, [roomId]);


  useEffect(() => {

    const socket = io('http://localhost:3001', {
      withCredentials: true,
      transports: ['websocket'],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      timeout: 10000,
    });
  
    socketRef.current = socket;

socketRef.current.on('connect_error', (error) => {
  console.error('Socket 연결 오류:', error);
});

socketRef.current.on('connect_timeout', () => {
  console.error('Socket 연결 타임아웃');
});
  
    socketRef.current.on('connect', () => {
      console.log('시그널링 서버 연결됨');
      setIsConnected(true);
      socketRef.current?.emit('join-room', roomId);
    });

    socketRef.current.on('error', (error) => {
      console.error('Socket error:', error);
    });

    socketRef.current.on('offer', async ({ from, offer }) => {
      console.log('Offer 수신:', from);
      try {
        const peerConnection = createPeerConnection(from);
        
        // 원격
        await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
        console.log('원격 설명 설정됨');
        
        const answer = await peerConnection.createAnswer();
        console.log('응답 생성됨');
        
        // 로컬 
        await peerConnection.setLocalDescription(answer);
        console.log('로컬 설명 설정됨');
        
        
        socketRef.current?.emit('answer', { 
          to: from, 
          answer,
          from: socketRef.current.id 
        });
      } catch (error) {
        console.error('Offer 처리 중 오류:', error);
      }
    });

    // 미디어 스트림 획득 -> 원격만 지금 되고 있음
    navigator.mediaDevices.getUserMedia({ 
      video: true, 
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
        autoGainControl: true
      } 
    })
    .then(stream => {
      setLocalStream(stream);
    })
    .catch(err => console.error("미디어 스트림 획득 실패:", err));

    return () => {
      localStream?.getTracks().forEach(track => track.stop());
      peerConnections.current.forEach(connection => connection.close());
      socketRef.current?.disconnect();

      if (roomId) {
        rolePlayService.updateInviteStatus(Number(roomId), 'REJECTED')
      }
    };
  }, [roomId]);

  useEffect(() => {
    if (!socketRef.current || !localStream) return;

    socketRef.current.on('new-user', handleNewUser);

    
    socketRef.current.on('users-in-room', ({ users }) => {
      console.log('방의 현재 사용자들:', users);
      users.forEach(async (userId: string) => {
        if (!peerConnections.current.has(userId)) {
          const peerConnection = createPeerConnection(userId);
          const offer = await peerConnection.createOffer({
            offerToReceiveAudio: true,
            offerToReceiveVideo: true
          });
          await peerConnection.setLocalDescription(offer);
          socketRef.current?.emit('offer', { 
            to: userId, 
            offer,
            from: socketRef.current.id 
          });
        }
      });
    });

    socketRef.current.on('user-left', ({ userId }) => {
      console.log('사용자 퇴장:', userId);
      if (peerConnections.current.has(userId)) {
        peerConnections.current.get(userId)?.close();
        peerConnections.current.delete(userId);
        setRemoteStreams(prevStreams => {
          const newStreams = new Map(prevStreams);
          newStreams.delete(userId);
          return newStreams;
        });
      }
    });

    socketRef.current.on('offer', async ({ from, offer }) => {
      console.log('Offer 수신:', from);
      try {
        if (peerConnections.current.has(from)) {
          peerConnections.current.get(from)?.close();
          peerConnections.current.delete(from);
        }
        
        const peerConnection = createPeerConnection(from);
        await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
        
        const answer = await peerConnection.createAnswer();
        const modifiedAnswer = {
          type: answer.type,
          sdp: answer.sdp
        };
        
        await peerConnection.setLocalDescription(modifiedAnswer);
        socketRef.current?.emit('answer', { to: from, answer: modifiedAnswer });
      } catch (error) {
        console.error('Offer 처리 중 오류:', error);
      }
    });

    socketRef.current.on('answer', async ({ from, answer }) => {
      console.log('Answer 수신:', from);
      const peerConnection = peerConnections.current.get(from);
      if (peerConnection) {
        await peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
      }
    });

    socketRef.current.on('ice-candidate', async ({ from, candidate }) => {
      console.log('ICE candidate 수신:', from);
      const peerConnection = peerConnections.current.get(from);
      if (peerConnection) {
        await peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
      }
    });

  }, [localStream]);

  const createPeerConnection = (userId: string) => {
    if (peerConnections.current.has(userId)) {
      console.log('기존 연결 재사용:', userId);
      return peerConnections.current.get(userId)!;
    }
  
    console.log('새 연결 생성:', userId);
    const peerConnection = new RTCPeerConnection({
      iceServers: [
        { urls: 'stun:stun.l.google.com:19302' },
        { urls: 'stun:stun1.l.google.com:19302' }
      ]
    });
  
    peerConnection.oniceconnectionstatechange = () => {
      console.log(`ICE 연결 상태 (${userId}):`, peerConnection.iceConnectionState);
    };

    peerConnection.onconnectionstatechange = () => {
      console.log(`연결 상태 (${userId}):`, peerConnection.connectionState);
    };
  
    peerConnection.ontrack = (event) => {
      console.log('트랙 이벤트 발생:', {
        userId,
        trackKind: event.track.kind,
        trackEnabled: event.track.enabled,
        streamActive: event.streams[0].active
      });
    
      setRemoteStreams(prevStreams => {
        const newStreams = new Map(prevStreams);
        newStreams.set(userId, event.streams[0]);
        return newStreams;
      });
    
      event.track.onended = () => {
        console.log('트랙 종료:', userId, event.track.kind);
      };
    };

    if (localStream) {
      console.log(`로컬 트랙 추가 (${userId}):`, localStream.getTracks().length);
      localStream.getTracks().forEach(track => {
        peerConnection.addTrack(track, localStream);
      });
    }
  
    peerConnections.current.set(userId, peerConnection);
    return peerConnection;
  };

  const handleNewUser = async (newUserId: string) => {
    console.log('새 사용자 연결 시작:', newUserId);
    
    if (peerConnections.current.has(newUserId)) {
      peerConnections.current.get(newUserId)?.close();
      peerConnections.current.delete(newUserId);
    }
    
    const peerConnection = createPeerConnection(newUserId);
    
    try {
      const offer = await peerConnection.createOffer({
        offerToReceiveAudio: true,
        offerToReceiveVideo: true
      });

      const modifiedOffer = {
        type: offer.type,
        sdp: offer.sdp
      };
      
      await peerConnection.setLocalDescription(modifiedOffer);
      console.log('Offer 생성 완료, 전송');
      
      socketRef.current?.emit('offer', {
        to: newUserId,
        offer: modifiedOffer
      });
    } catch (error) {
      console.error('Offer 생성 중 오류:', error);
      peerConnection.close();
      peerConnections.current.delete(newUserId);
    }
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
      {roomData && (
          <div>
            <h3>방 정보</h3>
            <p>방 이름: {roomData.name}</p>
          </div>
        )}

        {currentRole && (
          <div>
            <h3>내 역할</h3>
            <p>캐릭터: {currentRole.result.characterName}</p>
          </div>
        )}

    
        {pageData && (
          <div>
            <h3>현재 페이지</h3>
            <p>시나리오: {pageData.result.content_scenario}</p>
            {pageData.result.image && (
              <img src={pageData.result.image} alt="페이지 이미지" />
            )}
          </div>
        )}

        <div>
          <h3>참가자 목록</h3>
          {participants.map(participant => (
            <div key={participant.id}>
              {participant.name} {participant.role && `(${participant.role})`}
            </div>
          ))}
        </div>


      <VideoContainer>
  {/* 로컬 비디오 */}
  {localStream && (
    <VideoBox 
      autoPlay 
      muted 
      playsInline 
      ref={ref => {
        if (ref) {
          ref.srcObject = localStream;
          console.log('로컬 비디오 소스 설정됨');
        }
      }} 
    />
  )}

  {/* 원격 비디오 */}
  {Array.from(remoteStreams.entries()).map(([userId, stream]) => (
    <VideoBox
      key={userId}
      autoPlay
      playsInline
      ref={ref => {
        if (ref) {
          ref.srcObject = stream;
          console.log('원격 비디오 소스 설정됨:', userId);
          
          // 비디오 재생 상태 모니터링 -> 콘솔에 로드도 안 뜨고 실패도 안 뜸
          ref.onloadedmetadata = () => {
            console.log('비디오 메타데이터 로드됨:', userId);
            ref.play().catch(e => console.error('비디오 재생 실패:', e));
          };

          ref.onplay = () => console.log('비디오 재생 시작:', userId);
          ref.onpause = () => console.log('비디오 일시정지:', userId);
          ref.onerror = (e) => console.error('비디오 에러:', userId, e);
        }
      }}
      style={{
        border: '2px solid red', 
        minWidth: '300px',
        minHeight: '200px'
      }}
    />
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