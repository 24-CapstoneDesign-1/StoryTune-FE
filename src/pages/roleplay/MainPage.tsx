import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { MainContainer, SquareButton } from "@/entities";
import { useNavigate } from 'react-router-dom';
import { PAGE_URL, RolePlayService, FriendService } from '@/shared';
import { Loading } from '@/entities';

// 스타일 컴포넌트
const SubContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  margin-top: 150px;
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
  width: 400px;
`;

const FriendsList = styled.ul`
  list-style: none;
  padding: 0;
`;

const FriendItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #eee;
`;

interface Friend {
  id: string;
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

const InviteModal = ({ isOpen, onClose, friends, onInvite, invitedFriends, onNext }: InviteModalProps) => {
  if (!isOpen) return null;

  return (
    <ModalContainer onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <h3>친구 초대하기</h3>
        <FriendsList>
          {friends.map((friend) => (
            <FriendItem key={friend.id}>
              <span>{friend.name}</span>
              {invitedFriends.some(invited => invited.id === friend.id) ? (
                <span>초대됨</span>
              ) : (
                <SquareButton onClick={() => onInvite(friend.id)}>초대하기</SquareButton>
              )}
            </FriendItem>
          ))}
        </FriendsList>
        {invitedFriends.length > 0 && (
          <SquareButton onClick={onNext}>역할놀이 시작하기</SquareButton>
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
          setFriends(friendList);
        } catch (error) {
          console.error('Failed to fetch friends:', error);
        }
      }
    };

    fetchFriends();
  }, [isModalOpen]);

  // 방 생성하고 모달 열기
  const handleCreateRoom = async () => {
    setIsLoading(true);
    try {
      const room = await rolePlayService.createRoom({
        name: "새로운 역할놀이방",
        username: "",
        password: "",
        age: 0,
        gender: "GIRL"
      });
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
      const invitedFriend = friends.find(friend => friend.id === friendId);
      if (invitedFriend) {
        setInvitedFriends(prev => [...prev, invitedFriend]);
      }
    } catch (error) {
      console.error('Failed to invite friend:', error);
    }
  };

  // 다음 페이지로 이동
  const handleNext = () => {
    navigate(PAGE_URL.SelectRole, {
      state: {
        rolePlayingRoomId: currentRoomId,
        participants: invitedFriends
      }
    });
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <MainContainer>
      <SubContainer>
        <ButtonContainer>
          <SquareButton onClick={handleCreateRoom}>친구와 함께 하기</SquareButton>
          <SquareButton onClick={() => navigate(PAGE_URL.RolePlay)}>혼자 하기</SquareButton>
        </ButtonContainer>

        <InviteModal
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
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