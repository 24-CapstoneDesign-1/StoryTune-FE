import styled from "@emotion/styled";
import { Title, Button } from "@/entities";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUpContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #D2FFFF;

`;
const SignUpForm = styled.form`
    display: flex;
    flex-direction: column;
    background-color: white;
    border-radius: 20px;
    width: 350px;
    height: 50vh;
    padding: 40px 70px;
    @media (max-width: 768px) {
        width: 250px;
        height: 40vh;
        padding: 40px 50px;
    }

`;
const GenderButton = styled.div`
    width: 100px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #D9D9D9;
    border: 2px solid #D9D9D9;
    border-radius: 10px;
    margin: 10px 20px 10px 0px;
    &:hover {
        background-color: white;
        border: 2px solid #1F9EF9;
    }
`;
const SignUpInput = styled.input<{ width?: string; }>`
    width: ${(props) => props.width || "100%"};
    height: 30px;
    border: none;
    margin-bottom: 40px;
    border-bottom: 1px solid black;
    font-size: 1rem;
    outline: none;
    @media (max-width: 768px) {
        width: ${(props) => props.width || "100%"};
    }
`;
const GenderContainer = styled.div`
    display: flex;
`;
const NextConatiner = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 30px;
`;
const BackButton = styled.img`
    width: 25px;
    height: 25px;
    margin-bottom: 20px;
`;
const AgeContainer = styled.div`
    display: flex;
`;
const AgeLabel = styled.div`
    display: flex;
    margin-left: 10px;
`;
const SignUpPage = () => {
    const [progress, setProgress] = useState(0);
    const navigate = useNavigate();

    return (
        <SignUpContainer>
            <Title>Story Tune</Title>
            <SignUpForm>
                {progress === 0 ? (
                <>
                    <label>이름</label>
                    <SignUpInput type="text" />
                    <label>나이</label>
                    <AgeContainer>
                        <SignUpInput type="number" width="20%" />
                        <AgeLabel>
                            살
                        </AgeLabel>
                    </AgeContainer>
                    <label>성별</label>
                    <GenderContainer>
                        <GenderButton>남</GenderButton>
                        <GenderButton>여</GenderButton>
                    </GenderContainer>
                    <NextConatiner>
                        <Button width="400px" height="50px" onClick={() => setProgress(progress + 1)}>계속하기</Button>
                    </NextConatiner>
                </>
                ) : (
                    <>
                        <BackButton src="./public/images/back.svg" onClick={() => setProgress(progress - 1)} />
                        <label>아이디</label>
                        <SignUpInput type="text" placeholder="아이디를 입력하세요" />
                        <label>비밀번호</label>
                        <SignUpInput type="password" placeholder="비밀번호를 입력하세요" />
                        <label>비밀번호 확인</label>
                        <SignUpInput type="password" placeholder="비밀번호를 다시 입력하세요" />
                        <NextConatiner>
                            <Button width="400px" height="50px">회원가입 하기</Button>
                        </NextConatiner>
                    </>
                )}
            </SignUpForm>
        </SignUpContainer>
    );
};

export default SignUpPage;