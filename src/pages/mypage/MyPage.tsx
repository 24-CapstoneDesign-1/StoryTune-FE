import { InfoHeader } from "@/widgets";
import { useNavigate } from "react-router-dom";
import { PAGE_URL } from "@/shared";
import { useLocation } from 'react-router-dom';
import styled from "@emotion/styled";
import { MainContainer } from "@/entities";
import { Title} from "@/entities";
/*import { LogoutButton } from "@/entities";*/
import { API } from "@/shared";
import { useEffect, useState } from "react";

const TitleContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-self: flex-start;
    margin: 20px;
`;

const MenuContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction : column;
  margin-top: 20px;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const MenuSubContainer = styled.p`
    padding: 15px 0;
    border-bottom: 1px solid #ccc;
    font-size: 1.1rem;
    font-weight: bold;
    cursor: pointer;
    &:hover {
        color: #555;
    }
`;

const UserName = styled.h2`
    font-weight: bold;
`;

const LogoutButton = styled.button`
    width: 90%;
    margin-top: 20px;
    background-color: #FFEB3B;
    color: black;
    font-weight: bold;
    border-radius: 10px;
`;

const MyPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const name = params.get('name');
    const [userInfo, setUserInfo] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    
    const fetchUserInfo = async () => {
        try {
            const response = await API.get('/myinfo'); 
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
            <TitleContainer>
                <UserName>{userInfo.name}</UserName>
            </TitleContainer>
            <MenuContainer>
                <MenuSubContainer onClick={() => navigate(PAGE_URL.MyInfo)}>내 정보</MenuSubContainer>
                <MenuSubContainer onClick={() => navigate(PAGE_URL.Maked)}>내가 만든 책</MenuSubContainer>
                <MenuSubContainer onClick={() => navigate(PAGE_URL.ChangeInfo)}>아이디/비밀번호 변경</MenuSubContainer>
                <MenuSubContainer onClick={() => navigate(PAGE_URL.AddFriend)}>친구 추가</MenuSubContainer>
            </MenuContainer>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <LogoutButton onClick={() => {/* handle logout */}}>로그아웃</LogoutButton>
            </div>
        </MainContainer>
    );
};

        
export default MyPage;
