import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { MainContainer, SquareButton, Loading } from "@/entities";
import { useNavigate } from 'react-router-dom';
import { PAGE_URL, RolePlayService, FriendService } from '@/shared';
import { FaUsers, FaPlay } from 'react-icons/fa';

// Styled Components
const SubContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  padding: 40px 20px;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 50px;

  h1 {
    font-size: 2.5rem;
    color: #333;
    margin: 0;
  }

  p {
    font-size: 1.2rem;
    color: #666;
  }
`;

const TitleIcon = styled.div`
  font-size: 3rem;
  color: #0078d4;
  margin-bottom: 10px;
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
  border-radius: 16px;
  padding: 20px;
  width: 400px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.2);
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #888;
  &:hover {
    color: #333;
  }
`;

const FriendsList = styled.ul`
  list-style: none;
  padding: 0;
`;

const FriendItem = styled.li<{ invited: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #eee;
  background: ${({ invited }) => (invited ? "#f0f8ff" : "white")};
  font-weight: ${({ invited }) => (invited ? "bold" : "normal")};
  color: ${({ invited }) => (invited ? "#0078d4" : "inherit")};
`;

const AnimatedButton = styled(SquareButton)`
  transition: transform 0.3s ease, background-color 0.3s ease;
  background-color: ##f0f8ff;
  color: black;
  border: none;
  border-radius: 8px; 
  padding: 10px 20px;

  &:hover {
    transform: scale(1.05);
    background-color: #ff7043; 
  }

  &:focus {
    outline: none; 
    box-shadow: 0 0 0 3px rgba(255, 138, 101, 0.3);
  }

  &:active {
    transform: scale(0.95); 
  }
`;

// Loading Animation
const LoadingAnimation = styled.div`
  border: 4px solid #f3f3f3;
  border-top: 4px solid #0078d4;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

// Interfaces
interface Friend {
  userId: string;
  name: string;
  status: string;
}

interface InviteModalProps {
  isOpen: boolean;
  onClose: () => void;
  friends: Friend[];
  onInvite: (friendId: string) => void;
  invitedFriends: Friend[];
  onNext: () => void;
}

// Components
const InviteModal = ({ isOpen, onClose, friends, onInvite, invitedFriends, onNext }: InviteModalProps) => {
  if (!isOpen) return null;

  return (
    <ModalContainer onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <h3>친구 초대하기</h3>
        <FriendsList>
          {friends.map((friend) => (
            <FriendItem key={friend.userId} invited={invitedFriends.some((invited) => invited.userId === friend.userId)}>
              <span>{friend.name}</span>
              {invitedFriends.some(invited => invited.userId === friend.userId) ? (
                <span>초대됨</span>
              ) : (
                <AnimatedButton onClick={() => onInvite(friend.userId)}>초대하기</AnimatedButton>
              )}
            </FriendItem>
          ))}
        </FriendsList>
        {invitedFriends.length > 0 && (
          <AnimatedButton onClick={onNext}>역할놀이 시작하기</AnimatedButton>
        )}
      </ModalContent>
    </ModalContainer>
  );
};

const MainPage = () => {
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(false);
  const [friends, setFriends] = useState<Friend[]>([]);
  const [invitedFriends, setInvitedFriends] = useState<Friend[]>([]);
  const [currentRoomId, setCurrentRoomId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const rolePlayService = RolePlayService();
  const friendService = FriendService();

  // 친구 목록 가져오기
  useEffect(() => {
    const fetchFriends = async () => {
      if (isModalOpen) {
        try {
          const friendList = await friendService.fetchFriendList();
          setFriends(friendList.result);
        } catch (error) {
          console.error('Failed to fetch friends:', error);
        }
      }
    };

    fetchFriends();
  }, [isModalOpen]);

  // 방 생성 및 모달 열기
  const handleCreateRoom = async () => {
    setIsLoading(true);
    try {
      const room = await rolePlayService.createRoom();
      setCurrentRoomId(room.result.rolePlayingRoomId);
      setModalOpen(true);
    } catch (error) {
      console.error('Failed to create room:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // 친구 초대하기
  const handleInvite = async (friendId: string) => {
    if (!currentRoomId) return;

    try {
      await rolePlayService.inviteUser(currentRoomId, Number(friendId));
      const invitedFriend = friends.find(friend => friend.userId === friendId);
      if (invitedFriend) {
        setInvitedFriends(prev => [...prev, invitedFriend]);
      }
    } catch (error) {
      console.error('Failed to invite friend:', error);
    }
  };

  // 다음 페이지로 이동
  const handleNext = () => {
    if (!currentRoomId || !invitedFriends.length) return;
    navigate(PAGE_URL.FriendPlay, {
      state: {
        rolePlayingRoomId: currentRoomId,
        participants: invitedFriends,
      },
    });
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setInvitedFriends([]);
  };

  if (isLoading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <LoadingAnimation />
      </div>
    );
  }

  return (
    <MainContainer>
      <SubContainer>
        <Header>
          <TitleIcon>
            <FaUsers size={70} color="#FF8A65" />
          </TitleIcon>
          <h1>역할놀이</h1>
          <p>친구를 초대하거나 혼자 플레이를 시작하세요</p>
        </Header>

        <ButtonContainer>
          <AnimatedButton onClick={handleCreateRoom}>
            <FaUsers size={32} color="#FF8A65" style={{ marginRight: "3px" }} />
            친구와 함께 하기
          </AnimatedButton>
          <AnimatedButton onClick={() => navigate(PAGE_URL.RolePlay)}>
            <FaPlay size={32} color="#FF8A65" style={{ marginRight: "10px" }} />
            혼자 하기
          </AnimatedButton>
        </ButtonContainer>

        <InviteModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          friends={friends}
          onInvite={handleInvite}
          invitedFriends={invitedFriends}
          onNext={handleNext}
        />
      </SubContainer>
    </MainContainer>
  );
};

export default MainPage;
