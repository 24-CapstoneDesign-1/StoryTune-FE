import React, { useState, useRef } from 'react';
import styled from '@emotion/styled';
import { MainContainer, SquareButton } from "@/entities";
import { useNavigate } from 'react-router-dom';
import { PAGE_URL, RolePlayService } from '@/shared';
import { useRolePlayStore } from '@/shared/hooks/stores/useRolePlayStore';

const SubContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  margin-top: 150px;
  @media (max-width: 768px) {
    margin-top: 80px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
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

const ModalContent = styled.div`
  background: white;
  border-radius: 8px;
  padding: 20px;
  text-align: center;
  width: 400px;
`;

const FriendsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 20px 0;
`;

const FriendItem = styled.li`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
`;

const SmallButton = styled(SquareButton)`
  width: 120px;
  height: 40px;
`;

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  participants: RolePlay.RolePlayParticipant[];
  invited: RolePlay.RolePlayParticipant[];
  onInvite: (id: number) => void;
  onNext: () => void;
}

const InviteModal: React.FC<ModalProps> = ({ isOpen, onClose, participants, invited, onInvite, onNext }) => {
  if (!isOpen) return null;

  return (
    <ModalContainer onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <h3>친구 초대하기</h3>
        <FriendsList>
          {participants.map((participant) => (
            <FriendItem key={participant.id}>
              <span>{participant.name}</span>
              {invited.some((inv) => inv.id === participant.id) ? (
                <span>초대됨</span>
              ) : (
                <SmallButton onClick={() => onInvite(participant.id)}>초대</SmallButton>
              )}
            </FriendItem>
          ))}
        </FriendsList>
        <ButtonContainer>
        <SmallButton onClick={onClose}>닫기</SmallButton>
          {invited.length > 0 && (
            <SmallButton onClick={onNext}>역할 배정하기</SmallButton>
          )}
        </ButtonContainer>
      </ModalContent>
    </ModalContainer>
  );
};

const MainPage: React.FC = () => {
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(false);
  const [participants, setParticipants] = useState<RolePlay.RolePlayParticipant[]>([]);
  const [invitedParticipants, setInvitedParticipants] = useState<RolePlay.RolePlayParticipant[]>([]);
  const [currentRoomId, setCurrentRoomId] = useState<number | null>(null);

  const rolePlayService = RolePlayService();

  const openModal = async () => {
    try {
      const room = await rolePlayService.createRoom({ username: '', password: '', name: '', age: 0, gender: 'GIRL' });
      const roomId = room.result.rolePlayingRoomId;
      setCurrentRoomId(roomId);

      if (roomId) {
        const { result } = await rolePlayService.getParticipants(roomId);
        setParticipants(result);
      }
      setModalOpen(true);
    } catch (error) {
      console.error('Failed to open modal:', error);
    }
  };

  const closeModal = () => setModalOpen(false);

  const handleInvite = async (id: number) => {
    if (!currentRoomId) return;

    try {
      await rolePlayService.inviteUser(currentRoomId, id);
      const { result } = await rolePlayService.getParticipants(currentRoomId);
      setParticipants(result);
      const newInvite = result.find((p) => p.id === id);
      if (newInvite) setInvitedParticipants((prev) => [...prev, newInvite]);
    } catch (error) {
      console.error('Failed to invite participant:', error);
    }
  };

  const navigateToRoleSelection = () => {
    closeModal();
    navigate(PAGE_URL.SelectRole, {
      state: {
        rolePlayingRoomId: currentRoomId,
        participants: invitedParticipants,
      },
    });
  };

  return (
    <MainContainer>
      <SubContainer>
        <ButtonContainer>
          <SquareButton onClick={openModal}>친구와 함께 하기</SquareButton>
          <SquareButton onClick={() => navigate(PAGE_URL.RolePlay)}>혼자 하기</SquareButton>
        </ButtonContainer>
        <InviteModal
          isOpen={isModalOpen}
          onClose={closeModal}
          participants={participants}
          invited={invitedParticipants}
          onInvite={handleInvite}
        />
      </SubContainer>
    </MainContainer>
  );
};

export default MainPage;
