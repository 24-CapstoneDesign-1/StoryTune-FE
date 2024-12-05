import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { MainContainer, SquareButton } from "@/entities";
import { InfoHeader } from "@/widgets";
import { useLocation, useNavigate } from 'react-router-dom';
import { PAGE_URL, RolePlayService } from '@/shared';
import { FaPlay, FaTheaterMasks, FaHeart } from 'react-icons/fa';

const NextButton = styled(SquareButton)`
 height : 50px;
 margin-top: 30px;
 padding: 1px 1px;
 background-color: #FFB74D;
 border-radius: 25px;
 border: none;
 font-size: 16px;
 color: white;
 display: flex;
 align-items: center;
 gap: 10px;
 box-shadow: 0 4px 15px rgba(255, 183, 77, 0.3);
 transform: translateY(0);
 transition: all 0.2s ease;

 &:hover {
   background-color: #FFA726;
   transform: translateY(-2px);
   box-shadow: 0 6px 20px rgba(255, 183, 77, 0.4);
 }

 svg {
   font-size: 18px;
 }
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
  height: 50px;
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

const Photo = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  object-fit: cover;
  @media (max-width: 768px) {
    width: 100px;
    height: 100px;
  }
`;

const RoleSubContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;


const SelectRolePage = () => {
  const navigate = useNavigate();
  // const friends: Friend[] = location.state?.friends || [];


  const [assignedRoles, setAssignedRoles] = useState<{ friend: string, role: string, image: string }[]>([]);
  const rolePlayService = RolePlayService();
  const location = useLocation();
  const myBookId = location.state?.myBookId;
  const roomId = location.state?.rolePlayingRoomId;

  useEffect(() => {
    console.log('myBookId', myBookId);
    console.log('roomId', roomId);
    rolePlayService.roleSelect(roomId, myBookId)
    .then((res) => {
      const roles = res.result;
      console.log(roles);
      const assignedRoles = roles.map(({name, characterName, image}) => ({ 
        friend: name,
        role: characterName,
        image: image,
      }));
      setAssignedRoles(assignedRoles);
    })
  }, []);

  return (
    <MainContainer>
      <InfoHeader type="역할 놀이" />
      <PageContainer>
        <SubContainer>
          <p>역할 배정이 끝났어요!</p>
        </SubContainer>
      <RoleContainer>
        {assignedRoles.map(({ friend, role, image }) => (
          <RoleSubContainer>
            <Photo src={image}/>
            <AssignedRoleContainer>
              <div style={{ fontWeight: 'bold', fontSize: '20px' }}>{friend}</div>
              <div>{role}</div>
            </AssignedRoleContainer>
          </RoleSubContainer>
        ))}
      </RoleContainer>
      <>
        {console.log(assignedRoles)}
      </>
      <NextButton onClick={() => {navigate(PAGE_URL.RolePlay, {
 state: {myRoomId: roomId, myBookId: myBookId, role: assignedRoles}
})}}>
 <FaTheaterMasks />
 역할 놀이 시작하기
</NextButton>
      </PageContainer>
    </MainContainer>
  );
};

export default SelectRolePage;
