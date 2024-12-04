import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { MainContainer, SquareButton } from "@/entities";
import { InfoHeader } from "@/widgets";
import { useNavigate, useLocation } from 'react-router-dom';
import { PAGE_URL } from '@/shared';
import { BookService, RolePlayService } from '@/shared';

const NextButton = styled(SquareButton)`
    margin-top: 50px;
    font-size: 15px;
    height: 7vh;
    width: 30vh;
    background-color: #f5f5f5;
`;

const SubContainer = styled.div`
    display: flex;
    margin-top: 10px;
    font-weight: bold;
    height: 10vh;
    font-size: 20px;
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

interface Participant {
  id: number;
  name: string;
  role?: string;
}

const roles = ['여주', '남주', '조연1', '조연2', '행인1', '행인2'];

const SelectRolePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const rolePlayService = RolePlayService();
  const bookService = BookService();

  const [participants, setParticipants] = useState<Participant[]>([]);
  const [assignedRoles, setAssignedRoles] = useState<{ participant: Participant; role: string }[]>([]);
  const rolePlayingRoomId = location.state?.rolePlayingRoomId;
  const [bookId, setBookId] = useState<number | null>(null);

  useEffect(() => {
    const fetchBookInfo = async () => {
      try {
        const response = await bookService.myBook();
        if (response?.result) {
          setBookId(response.result.myBookId);
        }
      } catch (error) {
        console.error('Failed to fetch book info:', error);
      }
    };

    fetchBookInfo();
  }, []);


  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        if (rolePlayingRoomId) {
          const response = await rolePlayService.getParticipants(rolePlayingRoomId);
          setParticipants(response.result);
        }
      } catch (error) {
        console.error('Failed to fetch participants:', error);
      }
    };

    fetchParticipants();
  }, [rolePlayingRoomId]);

  useEffect(() => {
    if (participants.length > 0 && assignedRoles.length === 0) {
      const shuffledRoles = [...roles].sort(() => Math.random() - 0.5);
      const assignments = participants.map((participant, index) => ({
        participant,
        role: shuffledRoles[index % shuffledRoles.length],
      }));
      setAssignedRoles(assignments);
    }
  }, [participants, assignedRoles]);

  const handleNext = async () => {
    try {
      if (!rolePlayingRoomId || !bookId) {
        throw new Error('Required IDs are missing');
      }

      const roleResponse = await rolePlayService.getRolePlayRole(rolePlayingRoomId, bookId);

      if (roleResponse.success) {
        navigate(PAGE_URL.FriendPlay, {
          state: {
            rolePlayingRoomId,
            bookId,
            roles: roleResponse.result,
          },
        });
      }
    } catch (error) {
      console.error('역할 저장 실패:', error);
    }
  };

  return (
    <MainContainer>
      <InfoHeader type="역할 놀이" />
      <PageContainer>
        <SubContainer>
          <p>역할 배정이 끝났어요!</p>
        </SubContainer>
        <RoleContainer>
          {assignedRoles.map(({ participant, role }, index) => (
            <AssignedRoleContainer key={`${participant.id}-${index}`}>
              <div style={{ fontWeight: 'bold', fontSize: '20px' }}>{participant.name}</div>
              <div>{role}</div>
            </AssignedRoleContainer>
          ))}
        </RoleContainer>
        <NextButton onClick={handleNext}>동화책 고르러 가기</NextButton>
      </PageContainer>
    </MainContainer>
  );
};

export default SelectRolePage;
