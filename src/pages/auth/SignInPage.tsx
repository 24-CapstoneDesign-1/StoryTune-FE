import styled from "@emotion/styled";
import { Button } from "@/entities";
import { useNavigate } from "react-router-dom";
import { PAGE_URL } from "@/shared";

const SignInContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80vh;
`;

const SignInSubContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const SignInForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const SignInInput = styled.input`
    width: 300px;
    padding: 10px;
    margin-bottom: 20px;
    border-radius: 10px;
    border: 1px solid black;
`;
const SignUpButton = styled.div`
    font-size: 1rem;
    color: grey;
    margin: 20px 5px 0px 0px;
`;
const SignUpContainer = styled.div`
    display: flex;
    justify-content: center;
`;
const SignInPage = () => {
    const navigate = useNavigate();

    return (
        <SignInContainer>
            <SignInSubContainer>
                <h1>Sign In</h1>
                <SignInForm>
                    <SignInInput type="text" placeholder="아이디" />
                    <SignInInput type="password" placeholder="비밀번호" />
                    <Button type="submit" width="250px">Sign In</Button>
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