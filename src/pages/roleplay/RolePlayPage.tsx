import React, { useState, useEffect, useRef } from "react";
import io, { Socket } from "socket.io-client";
import styled from '@emotion/styled';
import { FaMask } from "react-icons/fa";
import { BookService } from "@/shared/hooks/services/BookService";
import { useLocation } from "react-router-dom";
import {  API, getAccess } from "@/shared";

const PageContainer = styled.div`
  background-color: #FFF9C4;
  min-height: 100vh;
  padding: 1.5rem;
  font-family: "Roboto", sans-serif;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 2rem;

  h1 {
    font-size: 2rem;
    color: #5D4037;
    margin-bottom: 0.5rem;
  }
`;

const VideoSection = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 2rem;
`;

const VideoBox = styled.div`
  background-color: #FFFDE7;
  border-radius: 16px;
  padding: 1rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 280px;

  h3 {
    color: #5D4037;
    margin-bottom: 0.5rem;
    font-size: 1.1rem;
  }
`;

const Video = styled.video`
  width: 100%;
  height: 210px;
  border-radius: 8px;
  object-fit: cover;
  border: 2px solid #FFB74D;
`;

const StorySection = styled.div`
  background-color: #FFFDE7;
  border-radius: 16px;
  padding: 2rem;
  margin: 2rem auto;
  max-width: 800px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const StoryImage = styled.img`
  width: 100%;
  max-height: 300px;
  object-fit: contain;
  border-radius: 8px;
  margin-bottom: 1rem;
`;

const StoryContent = styled.p`
  color: #5D4037;
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 1.5rem 0;
`;

const Button = styled.button`
  background-color: #FF8A65;
  color: white;
  border: none;
  border-radius: 25px;
  padding: 0.8rem 1.5rem;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
  }

  &:disabled {
    background-color: #BDBDBD;
    cursor: not-allowed;
  }
`;

const VisualizerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  height: 60px;
  gap: 2px;
  margin: 1rem 0;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 8px;
  padding: 0.5rem;
`;


const VisualizerBar = styled.div<{ height: number }>`
  width: 3px;
  height: ${(props) => props.height}px;
  background-color: ${(props) => (props.height > 30 ? "#FF8A65" : "#B0BEC5")};
  margin: 0 1px;
  
`;

const ControlButton = styled.button`
  background-color: #FFB74D;
  color: white;
  border: none;
  border-radius: 25px;
  padding: 15px 30px;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #FF9800;
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }
`;


interface RoleInfo {
  friend: string;
  role: string;
}

const RolePlayPage: React.FC = () => {
  const location = useLocation();
  const { myBookId, role } = location.state || {};
  const roles = role as RoleInfo[];

  const [book, setBook] = useState([{
    pageNum: 0,
    image: "",
    content_scenario: "",
  }]);

  const [page, setPage] = useState<number>(0);
    const bookService = BookService();


    const [userInfo, setUserInfo] = useState<string>('');

  useEffect(() => {
    console.log(myBookId);
    const fetchUserInfo = async () => {
      try {
        const { data } = await API.get("/api/user", {
          headers: {
            "Authorization": `Bearer ${getAccess()}`
          }
        });
        setUserInfo(data.result.name);
      } catch (err) {
        console.error("사용자 정보 로드 실패:", err);
      }
    };
    fetchUserInfo();
  }, []);


    useEffect(() => {
      getDetail();
    }, []);

  
    const getDetail = async () => {
      try {
        const data = await bookService.myBookDetail(216);
        console.log("Book detail:", data);
        if (data?.result) {
          setBook(data.result.details);
        
        }
      } catch (error) {
        console.error("Failed to fetch book details:", error);
      }
    };

  const handleNextPage = () => {
    setPage(prev => Math.min(prev + 1, book.length - 1));
  };

  const handlePrevPage = () => {
    setPage(prev => Math.max(prev - 1, 0));
  };

  const myFaceRef = useRef<HTMLVideoElement | null>(null);
  const peerVideoRef = useRef<HTMLVideoElement | null>(null);
  const myStream = useRef<MediaStream | null>(null);
  const socket = useRef<Socket | null>(null);

  const myPeerConnection = useRef(
    new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    })
  );

  const roomId = 1234;

  useEffect(() => {
    socket.current = io("http://localhost:5004");

    socket.current.emit("join", roomId);

    socket.current.on("room-full", () => {
      alert("입장 인원 초과");
      window.location.reload();
    });

    socket.current.on("rtc-message", async (message: string) => {
      const content: { event: string; data: any } = JSON.parse(message);

      switch (content.event) {
        case "offer":
          console.log("Receive Offer", content.data);
          await handleReceiveOffer(content.data);
          break;

        case "answer":
          console.log("Receive Answer");
          await myPeerConnection.current.setRemoteDescription(content.data);
          break;

        case "candidate":
          console.log("Receive Candidate");
          if (content.data) {
            await myPeerConnection.current.addIceCandidate(content.data);
          }
          break;

        default:
          console.warn("Unknown RTC event:", content.event);
      }
    });

    myPeerConnection.current.onicecandidate = (event) => {
      if (event.candidate) {
        console.log("Send Candidate");
        sendMessage({
          event: "candidate",
          data: event.candidate,
        });
      }
    };

    myPeerConnection.current.addEventListener("addstream", handleAddStream);

    return () => {
      socket.current?.disconnect();
    };
  }, []);

  const sendMessage = (message: { event: string; data: any }) => {
    if (socket.current) {
      const data = { roomId, ...message };
      socket.current.emit("rtc-message", JSON.stringify(data));
    }
  };

  const handleAddStream = (event: any) => {
    console.log("Receive Streaming Data!");
    if (peerVideoRef.current) {
      peerVideoRef.current.srcObject = event.stream;
    }
  };

  const getMedia = async () => {
    try {
      myStream.current = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      if (myFaceRef.current) {
        myFaceRef.current.srcObject = myStream.current;
      }
    } catch (error) {
      alert("카메라 및 마이크 권한이 필요합니다.");
      console.error("미디어 스트림 에러", error);
    }
  };
  
  const createOffer = async () => {
    await getMedia();
    if (myStream.current) {
      myStream.current.getTracks().forEach((track) =>
        myPeerConnection.current.addTrack(track, myStream.current!)
      );
    }
    const offer = await myPeerConnection.current.createOffer();
    await myPeerConnection.current.setLocalDescription(offer);
    console.log("Send Offer");
    sendMessage({
      event: "offer",
      data: offer,
    });
  };

  

  const handleReceiveOffer = async (offer: RTCSessionDescriptionInit) => {
    await myPeerConnection.current.setRemoteDescription(offer);
    await getMedia();
    if (myStream.current) {
      myStream.current.getTracks().forEach((track) =>
        myPeerConnection.current.addTrack(track, myStream.current!)
      );
    }
    const answer = await myPeerConnection.current.createAnswer();
    await myPeerConnection.current.setLocalDescription(answer);
    console.log("Send Answer");
    sendMessage({
      event: "answer",
      data: answer,
    });
  };

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

        return () => {
          audioContextRef.current?.close();
        };
      }
    }, [stream]);
        

      return (
        <VisualizerContainer>
          {levels.map((level, index) => (
            <VisualizerBar key={index} height={level} />
          ))}
        </VisualizerContainer>
      );
    };

    const myRole = roles?.find((r: RoleInfo) => r.friend === userInfo)?.role;
    const peerRole = roles?.find((r: RoleInfo) => r.friend !== userInfo)?.role;
    
  
    return (
      <PageContainer>
        <Header>
          <h1>역할놀이</h1>
          <Button onClick={createOffer}>
              <FaMask />
              역할놀이 시작하기
            </Button>
        </Header>
  
        <VideoSection>
          <VideoBox>
            <Video ref={myFaceRef} playsInline autoPlay />
            <h3>나의 화면</h3>
            <p>{myRole ? `역할: ${myRole}` : '역할 없음'}</p>
            <AudioVisualizer stream={myStream.current} />
          </VideoBox>
          <VideoBox>
            
            <Video ref={peerVideoRef} playsInline autoPlay />
            <p>{peerRole ? `상대방 역할: ${peerRole}` : '역할 없음'}</p>
            <AudioVisualizer stream={null} />
          </VideoBox>
        </VideoSection>
  
        <StorySection>
          <StoryImage src={book[page].image}  />
          <StoryContent>{book[page].content_scenario}</StoryContent>
          <ButtonContainer>
          <ControlButton onClick={handlePrevPage} disabled={page === 0}>
              이전 페이지
            </ControlButton>
            
            <ControlButton onClick={handleNextPage} disabled={page === book.length - 1}>
              다음 페이지
            </ControlButton>
          </ButtonContainer>
        </StorySection>
      </PageContainer>
    );
  };
  
  export default RolePlayPage;