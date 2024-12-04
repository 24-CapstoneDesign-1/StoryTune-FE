import { InfoHeader } from "@/widgets";
import { useNavigate } from "react-router-dom";
import { PAGE_URL, AuthService} from "@/shared";
import styled from "@emotion/styled";
import { MainContainer } from "@/entities";
import { useState, useEffect } from "react";
import { FaUser, FaEdit, FaBook, FaUserFriends, FaSignOutAlt } from "react-icons/fa";
import { useUserStore } from "@/shared/hooks/stores/useUserStore";


const SubContainer = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProfileSection = styled.div`
  width: 100%;
  padding: 20px;
  background-color: #fffde7;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
  text-align: center;
`;

const User = styled.div`
  width: 80px;
  height: 80px;
  background-color: #ffeb3b;
  border-radius: 50%;
  margin: 0 auto 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  svg {
    font-size: 40px;
    color: #5d4037;
  }
`;

const UserName = styled.h2`
  font-size: 1.8rem;
  font-weight: bold;
  color: #5d4037;
  margin-bottom: 10px;
`;

const MenuContainer = styled.div`
  width: 100%;
  background-color: white;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const MenuItem = styled.div`
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 15px;
  cursor: pointer;
  transition: all 0.2s ease;
  border-bottom: 1px solid #f0f0f0;

  svg {
    color: #5d4037;
    font-size: 20px;
  }

  &:hover {
    background-color: #fff9c4;
    transform: translateX(5px);
  }

  &:last-child {
    border-bottom: none;
  }
`;

const MenuText = styled.span`
  font-size: 1.1rem;
  color: #5d4037;
  font-weight: 500;
`;

const LogoutButton = styled.button`
  width: 100%;
  margin-top: 30px;
  background-color: #fff;
  color: #d32f2f;
  font-weight: bold;
  border: 2px solid #d32f2f;
  border-radius: 10px;
  padding: 15px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: all 0.2s ease;

  &:hover {
    background-color: #d32f2f;
    color: white;
  }
`;

const MyPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const userStore = useUserStore();
  const auth = AuthService(); // 여기서 service 생성

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        setIsLoading(true);
        const response = await auth.getCurrentUser(); 
        
        if (response?.result) {
          userStore.setUserAllInfo({
            username: String(response.result.userId),
            name: response.result.name,
            age: 0,
            gender: ''
          });
        }
      } catch (err) {
        setError("사용자 정보를 불러오는데 실패했습니다.");
        console.error("Failed to fetch user info:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserInfo();
  }, []);
  
  

  const userInfo = userStore.getUserAllInfo();

  const handleLogout = () => {
    navigate(PAGE_URL.SignIn);
  };

  return (
    <MainContainer>
      <InfoHeader type="마이페이지" />
      <SubContainer>
        <ProfileSection>
          <User>
            <FaUser />
          </User>
          <UserName>{userInfo.name || "환영합니다"}</UserName>
        </ProfileSection>

        <MenuContainer>
          <MenuItem onClick={() => navigate(PAGE_URL.MyInfo)}>
            <FaUser />
            <MenuText>내 정보</MenuText>
          </MenuItem>
          <MenuItem onClick={() => navigate(PAGE_URL.ChangeInfo)}>
            <FaEdit />
            <MenuText>내 정보 수정</MenuText>
          </MenuItem>
          <MenuItem onClick={() => navigate(PAGE_URL.Maked)}>
            <FaBook />
            <MenuText>나의 책장</MenuText>
          </MenuItem>
          <MenuItem onClick={() => navigate(PAGE_URL.FriendList)}>
            <FaUserFriends />
            <MenuText>친구 목록</MenuText>
          </MenuItem>
        </MenuContainer>

        <LogoutButton onClick={ handleLogout}>
          <FaSignOutAlt />
          로그아웃
        </LogoutButton>
      </SubContainer>
    </MainContainer>
  );
};

export default MyPage;