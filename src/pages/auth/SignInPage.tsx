import styled from "@emotion/styled";
import { Button, Title } from "@/entities";
import { useNavigate } from "react-router-dom";
import { PAGE_URL } from "@/shared";

const SignInContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #D2FFFF;
`;

const SignInSubContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const SignInForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
`;

const SignInInput = styled.input`
    width: 400px;
    height: 23px;
    padding: 10px;
    margin-bottom: 20px;
    border-radius: 10px;
    border: 1px solid black;
    font-size: 1rem;
    outline: none;
    @media (max-width: 768px) {
        width: 300px;
    }
`;
const SignUpButton = styled.div`
    font-size: 1rem;
    color: grey;
    margin: 20px 5px 0px 0px;
    &:hover {
        cursor: pointer;
    }
    @media (max-width: 768px) {
        font-size: 0.8rem;
    }
`;
const SignUpContainer = styled.div`
    display: flex;
    justify-content: center;
`;

const LoginButton = styled(Button)`
    width: 300px;
    height: 50px;
`;
const SignInPage = () => {
    const navigate = useNavigate();

    return (
        <SignInContainer>
            <SignInSubContainer>
                <Title>Story Tune</Title>
                <SignInForm>
                    <SignInInput type="text" placeholder="아이디" />
                    <SignInInput type="password" placeholder="비밀번호" />
                    <br />
                    <LoginButton type="submit" width="300px" height="50px">로그인 하기</LoginButton>
                </SignInForm>
                <SignUpContainer>
                    <SignUpButton onClick={() => navigate(PAGE_URL.SignUp)}>회원가입</SignUpButton>
                    <SignUpButton>|</SignUpButton>
                    <SignUpButton>아이디 찾기</SignUpButton>
                </SignUpContainer>
            </SignInSubContainer>
        </SignInContainer>
    );
};

export default SignInPage;