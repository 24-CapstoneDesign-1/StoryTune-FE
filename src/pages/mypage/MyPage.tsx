import { InfoHeader } from "@/widgets";
import { useNavigate } from "react-router-dom";
import { PAGE_URL } from "@/shared";
import { useLocation } from "react-router-dom";
import styled from "@emotion/styled";
import { MainContainer } from "@/entities";
import { Title } from "@/entities";
import { API } from "@/shared";
import { useEffect, useState } from "react";

const SubContainer = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 20px;
`;

const UserName = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  color: #5d4037;
`;

const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;

const MenuItem = styled.p`
  padding: 15px 0;
  border-bottom: 1px solid #ccc;
  font-size: 1.1rem;
  font-weight: bold;
  color: #5d4037;
  cursor: pointer;

  &:hover {
    color: #555;
  }
`;

const LogoutButton = styled.button`
  width: 90%;
  margin-top: 20px;
  background-color: #FFEB3B;
  color: black;
  font-weight: bold;
  border-radius: 10px;
  padding: 10px;
  cursor: pointer;

  &:hover {
    background-color: #f4c300;
  }
`;

const MyPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const name = params.get("name");
  const [userInfo, setUserInfo] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchUserInfo = async () => {
    try {
      const response = await API.get("/myinfo");
      setUserInfo(response.data);
    } catch (err) {
      console.error(err);
      setError("사용자 정보를 불러오는 데 실패했습니다.");
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  return (
    <MainContainer>
      <InfoHeader type="마이페이지" />
      <SubContainer>
      <TitleContainer>
        <UserName>{userInfo?.name}</UserName>
      </TitleContainer>
      <MenuContainer>
        <MenuItem onClick={() => navigate(PAGE_URL.MyInfo)}>내 정보</MenuItem>
        <MenuItem onClick={() => navigate(PAGE_URL.ChangeInfo)}>내 정보 수정</MenuItem>
        <MenuItem onClick={() => navigate(PAGE_URL.Maked)}>나의 책장</MenuItem>
        <MenuItem onClick={() => navigate(PAGE_URL.FriendList)}>친구 목록</MenuItem>
      </MenuContainer>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <LogoutButton onClick={() => {}}>로그아웃</LogoutButton>
      </div>
      </SubContainer>
    </MainContainer>
  );
};

export default MyPage;
