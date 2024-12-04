import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from '@emotion/styled';
import { MainContainer, SquareButton } from "@/entities";
import { InfoHeader } from "@/widgets";
import { useNavigate } from 'react-router-dom';
import { PAGE_URL } from '@/shared';
import { BookService } from '@/shared';
const NextButton = styled(SquareButton)`
    margin-top : 50px;
    font-size : 15px;
    height: 7vh;
    width : 30vh;
    background-color: #f5f5f5;
`;

const SubContainer = styled.div`
    display: flex;
    margin-top: 10px;
    font-weight :bold;
    height: 10vh;
    font-size : 20px;
    justify-content: center;
    @media (max-width: 768px) {
        flex-direction: column;
        height: 100%;
        width: 100%;
    }
`;

const PageContainer = styled.div`
  background-color: #FFFCAD;
  min-height: 100vh; 
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
`;

const RoleContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
`;

const AssignedRoleContainer = styled.div`
  width: 150px;
  height: 150px;
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  text-align: center;
  font-size: 18px;
`;


interface Friend {
  id: string;
  name: string;
}

const roles = ['여주', '남주', '조연1', '조연2', '행인1', '행인2'];

const SelectRolePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // const friends: Friend[] = location.state?.friends || [];
  const friends: Friend[] = [
    { id: 'user1', name: '김민수' },
    { id: 'user2', name: '이민영' },
    { id: 'user3', name: '박영수' },
    { id: 'user4', name: '최수영' },
  ];


  const [assignedRoles, setAssignedRoles] = useState<{ friend: Friend; role: string }[]>([]);

  useEffect(() => {
    if (assignedRoles.length === 0 && friends.length > 0) {
      const shuffledRoles = [...roles].sort(() => Math.random() - 0.5); // 역할 랜덤으로 
      const assignRoles = [];

      let roleIndex = 0;
      let friendIndex = 0;

      while (roleIndex < shuffledRoles.length) {
        const friend = friends[friendIndex % friends.length];
        assignRoles.push({
          friend,
          role: shuffledRoles[roleIndex],
        });
        roleIndex++;
        friendIndex++;
      }

      setAssignedRoles(assignRoles);
    }
  }, [friends, assignedRoles]);

  return (
    <MainContainer>
      <InfoHeader type="역할 놀이" />
      <PageContainer>
        <SubContainer>
        <p>역할 배정이 끝났어요!</p>
        </SubContainer>
      <RoleContainer>
        {assignedRoles.map(({ friend, role }, index) => (
          <AssignedRoleContainer key={`${friend.id}-${index}`}>
            <div style={{ fontWeight: 'bold', fontSize: '20px' }}>{friend.name}</div>
            <div>{role}</div>
          </AssignedRoleContainer>
        ))}
      </RoleContainer>
      <NextButton onClick={() => navigate(PAGE_URL.FriendPlay)}>동화책 고르러 가기</NextButton>
      </PageContainer>
    </MainContainer>
  );
};

export default SelectRolePage;
