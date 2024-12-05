import { InfoHeader } from "@/widgets";
import { AuthService } from "@/shared";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { MainContainer } from "@/entities";

const PageContainer = styled.div`
  background-color: #fff9c4;
  min-height: 100vh;
  padding: 1.5rem;
`;

const InfoCard = styled.div`
  background-color: white;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  width: 500px;
  padding: 20px;
  margin: 15px 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const InfoItem = styled.div`
  font-size: 1.2rem;
  color: #5d4037;
  margin: 10px 0;
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 5px 0;
  border-bottom: 1px solid #ccc;
  
  &:last-child {
    border-bottom: none;
  }
`;

const MyInfo = () => {
  const [error] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useState({
    userId: 0,
    name: "",
  })
  const authService = AuthService();

  useEffect(() => {
    authService.currentUser()
    .then((data) => {
      setUserInfo(data.result);
    })
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <MainContainer>
      <InfoHeader type="내 정보" />
      <PageContainer>
        <InfoCard>
          <InfoItem>
            <span>이름</span>
            <span>{userInfo.name}</span>
          </InfoItem>
          <InfoItem>
            <span>아이디</span>
            <span>{userInfo.userId}</span>
          </InfoItem>
          <InfoItem>
            <span>나이</span>
            <span>{}</span>
          </InfoItem>
          <InfoItem>
            <span>성별</span>
            <span>{}</span>
          </InfoItem>
        </InfoCard>
      </PageContainer>
    </MainContainer>
  );
};

export default MyInfo;
