import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { MainContainer, SquareButton, Loading } from "@/entities";
import { useNavigate } from 'react-router-dom';
import { PAGE_URL, RolePlayService, FriendService, AuthService } from '@/shared';

// Styled Components
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
        <h3>친구 초대하기</h3>
        <FriendsList>

          {friends.map((friend) => (
            <FriendItem>
              <span>{friend.name}</span>
              {invitedFriends.some(invited => invited.userId === friend.userId) ? (
                <span>초대됨</span>
              ) : (
                <>{console.log(friend)}
                <SquareButton onClick={() => onInvite(friend.userId)}>초대하기</SquareButton></>
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

const AcceptModal = ({ isInvited, onClose, invitedList, curUserId, onInvite }: {
  isInvited: boolean;
  onClose: () => void;
  invitedList: any;
  curUserId: number;
  onInvite: (userId: number) => void;
}) => {
  if (!isInvited) return null;

  return (
    <ModalContainer onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <h3>친구 초대가 왔어요!</h3>
        <FriendsList>

          {invitedList.map((invite:any) => (
            <FriendItem>
              <span>{invite.ownerName}</span>
              <SquareButton onClick={() => onInvite(curUserId)}>들어가기</SquareButton>
            </FriendItem>
          ))}
        </FriendsList>
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
  const [invitedList, setinvitedList] = useState<Friend[]>([]);
  const [isInvitedList, setIsInvitedList] = useState(false);
  const rolePlayService = RolePlayService();
  const friendService = FriendService();
  const authService = AuthService();
  const [curUserId, setCurUserId] = useState<number>(0);

  // 친구 목록 가져오기
  useEffect(() => {
    const fetchFriends = async () => {

        try {
          const friendList = await friendService.fetchFriendList();
          const invitedList = await rolePlayService.inviteList();
          const curUser = await authService.currentUser();
          setCurUserId(curUser.result.userId);
          setFriends(friendList.result);
          setinvitedList(invitedList.result);
          console.log('invitedList', invitedList);
          if(invitedList.result.length > 0) {
            setIsInvitedList(true);
          }
        } catch (error) {
          console.error('Failed to fetch friends:', error);
        }

    };

    fetchFriends();
  }, []);

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
      console.log('Inviting friend:', friendId);
      await rolePlayService.inviteUser(currentRoomId, Number(friendId));
      const invitedFriend = friends.find(friend => friend.userId === friendId);
      if (invitedFriend) {
        setInvitedFriends(prev => [...prev, invitedFriend]);
      }
      console.log('Invited friend:', invitedFriend);
    } catch (error) {
      console.error('Failed to invite friend:', error);
    }
  };

  // 다음 페이지로 이동
  const handleNext = () => {
    if (!currentRoomId || !invitedFriends.length) return;
    console.log('state: ', currentRoomId, invitedFriends);
    navigate(PAGE_URL.FriendPlay, {
      state: {
        rolePlayingRoomId: currentRoomId,
        participants: invitedFriends,
      },
    });
  };
  const onInvite = async (userId: number) => {
    await rolePlayService.updateInviteStatus(Number(userId), {status:'ACCEPTED'})
    .then(() => {
      // navigate(PAGE_URL.RolePlay, {state: {rolePlayingRoomId: invitedList[0].rolePlayingRoomId}});
      navigate(PAGE_URL.RolePlay);
    })

  }

  const handleCloseModal = () => {
    setModalOpen(false);
    setIsInvitedList(false);
    setInvitedFriends([]);
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
        <AcceptModal
          isInvited={isInvitedList}
          onClose={handleCloseModal}
          invitedList={invitedList}
          curUserId={curUserId}
          onInvite={onInvite}
          />
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
