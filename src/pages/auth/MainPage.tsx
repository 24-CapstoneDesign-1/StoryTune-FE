import styled from "@emotion/styled";
import { Button } from "@/entities";
import { useNavigate } from "react-router-dom";
import { PAGE_URL } from "@/shared";

const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #D2FFFF;
    height: 100vh;
`;

const ImageContainer = styled.img`
    width: 200px;
    margin-bottom: 50px;
`;

const LoginButton = styled(Button)`
    width: 300px;
    height: 50px;
    color: black;
    font-weight: bold;
    background-color: #FFD700;
    font-size: 1.5rem;
`;

const MainPage = () => {
    const navigate = useNavigate();

    return (
        <MainContainer>
            <ImageContainer src="./public/images/logo.svg" />
            <LoginButton width="300px" height="50px" onClick={() => navigate(PAGE_URL.SignIn)}>로그인</LoginButton>
        </MainContainer>
    );
};

export default MainPage;