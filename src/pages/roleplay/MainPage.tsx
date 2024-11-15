import React, { useState, useRef } from 'react';
import styled from '@emotion/styled';
import { MainContainer, SquareButton, Title } from "@/entities";
import { useNavigate } from 'react-router-dom';
import { PAGE_URL } from '@/shared';
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
  const [invitedFriends, setInvitedFriends] = useState<any[]>([]); //친구 초대해서 저장

  const friends = [
    { id: 1, name: '김가현' },
    { id: 2, name: '김나현' },
    { id: 3, name: '강지혜' },
  ];

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const NextPage = () => {
    closeModal();
    navigate(PAGE_URL.SelectRole, { state: { friends: invitedFriends } });
  };

  const handleInviteFriend = (friendId: number) => {
    const invitedFriend = friends.find(friend => friend.id === friendId);
    if (invitedFriend && !invitedFriends.includes(invitedFriend)) {
      setInvitedFriends([...invitedFriends, invitedFriend]);
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
            <h3>친구 목록</h3>
            <FriendsList>
              {friends.map(friend => (
                <FriendItem key={friend.id}>
                  <span>{friend.name}</span>
                  {invitedFriends.some(invited => invited.id === friend.id) ? (
                    <span>초대된 친구</span>
                  ) : (
                    <SmallSquareButton onClick={() => handleInviteFriend(friend.id)}>친구 초대</SmallSquareButton>
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
