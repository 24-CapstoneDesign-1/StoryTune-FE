import React, { useState, useRef, useEffect } from 'react';
import styled from '@emotion/styled';
import { MainContainer, SquareButton } from "@/entities";
import { useNavigate } from 'react-router-dom';
import { PAGE_URL, API, getAccess, RolePlayService } from '@/shared';
//Modal.tsx에서 가져오니까 오류생겨서 일단 여기에 함 

const SubContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 280px;
    height: 100vh;
    @media (max-width: 768px) {
        flex-direction: column;
        height: 100%;
        width: 100%;
    }
`;

const ButtonSubContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 35%;
  @media (max-width: 768px) {
    height: 200px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px; 
  margin-top: 20px; 
`;

const SmallSquareButton = styled(SquareButton)`
  width: 200px; 
  height: 50px; 
  background: rgba(0, 0, 0, 0.1);
  font-size: 16px; 
`;
const ImageContainer = styled.img`
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 50vh;
    margin-top: -100px;
    @media (max-width: 768px) {
        height: 100%;
        margin-top: 30px;
    }
`;

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;
const FriendsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  text-align: left;
`;

const FriendItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  padding: 8px 0;
  border-bottom: 1px solid #eee;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  text-align: center;
`;

interface ModalProps {
    open: boolean; 
    onClose: () => void;
    onNavigate: () => void;
    title: string;
    children: React.ReactNode;
  }

  
const Modal : React.FC<ModalProps>= ({ open, onClose, onNavigate, title, children }) => {
  const modalBackground = useRef(null);

  if (!open) return null;

  return (
    <ModalContainer
      ref={modalBackground}
      onClick={(e) => {
        if (e.target === modalBackground.current) {
          onClose();
        }
      }}
    >
      <ModalContent>
        <h2>{title}</h2>
        <p>{children}</p>
        <ButtonContainer>
            <SmallSquareButton onClick={onClose}>닫기</SmallSquareButton>
            <SmallSquareButton onClick={onNavigate}>역할 배정하러 가기</SmallSquareButton>
        </ButtonContainer>
      </ModalContent>
    </ModalContainer>
  );
};

const MainPage = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [invitedParticipants, setInvitedParticipants] = useState<RolePlay.RolePlayParticipant[]>([]);
  const [currentRoomId, setCurrentRoomId] = useState<number | null>(null);
  const [participants, setParticipants] = useState<RolePlay.RolePlayParticipant[]>([]);
  
  const rolePlayService = RolePlayService();

  const openModal = async () => {
    try {
      // 방 생성
      const createRoomData: RolePlay.CreateRolePlayRoomDto = {
        username: "", 
        password: "", 
        name: "",    
        age: 0,      
        gender: "GIRL" 
      };
      
      const roomData = await rolePlayService.createRoom(createRoomData);
      const roomId = roomData.result.rolePlayingRoomId;
      setCurrentRoomId(roomId);
      
      // 참가자 목록 조회
      if (roomId) {
        const participantsData = await rolePlayService.getParticipants(roomId);
        setParticipants(participantsData.result);
      }
      
      setIsModalOpen(true);
    } catch (error) {
      console.error('Failed to create room:', error);
    }
  };


  const closeModal = () => setIsModalOpen(false);

  const NextPage = () => {
    closeModal();
    if (currentRoomId) {
      navigate(PAGE_URL.SelectRole, { 
        state: { 
          rolePlayingRoomId: currentRoomId,
          participants: invitedParticipants 
        } 
      });
    }
  };


  const handleInviteParticipant = async (id: number) => {
    if (!currentRoomId) return;
    
    try {
      const inviteData: RolePlay.RolePlayInviteReqDto = {
        rolePlayingRoomId: currentRoomId,
        userId: id
      };
      
      await rolePlayService.inviteUser(currentRoomId, id);
      
      // 참가자 목록 갱신
      const updatedParticipants = await rolePlayService.getParticipants(currentRoomId);
      setParticipants(updatedParticipants.result);
      
      const invitedParticipant = updatedParticipants.result.find(
        (p: RolePlay.RolePlayParticipant) => p.id === id
      );
      if (invitedParticipant && !invitedParticipants.some(invited => invited.id === id)) {
        setInvitedParticipants([...invitedParticipants, invitedParticipant]);
      }
    } catch (error) {
      console.error('초대 안됨', error);
    }
  };
  
  return (
    <MainContainer>
        <SubContainer>
            <ImageContainer src="./public/images/logo.svg" />
                <ButtonSubContainer>
                <SquareButton width="400px" onClick={openModal}>친구와 함께 하기</SquareButton>
                <SquareButton width="400px" onClick={() => navigate(PAGE_URL.RolePlay)}>혼자 하기</SquareButton>
                </ButtonSubContainer>

                <Modal open={isModalOpen} onClose={closeModal} onNavigate={NextPage} title="친구 초대하기">
          <div>
            <h3>참가자 목록</h3>
            <FriendsList>
              {participants.map(participant => (
                <FriendItem key={participant.id}>
                  <span>{participant.name}</span>
                  {invitedParticipants.some(invited => invited.id === participant.id) ? (
                    <span>초대된 친구</span>
                  ) : (
                    <SmallSquareButton onClick={() => handleInviteParticipant(participant.id)}>
                      친구 초대
                    </SmallSquareButton>
                  )}
                </FriendItem>
              ))}
            </FriendsList>
          </div>
        </Modal>
        </SubContainer>
    </MainContainer>
  );
};

export default MainPage;