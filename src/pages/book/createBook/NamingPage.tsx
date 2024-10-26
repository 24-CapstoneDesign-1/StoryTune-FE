import { Button, MainContainer, SquareButton, Title } from "@/entities";
import { InfoHeader } from "@/widgets";
import { PiRecordFill } from "react-icons/pi";
import styled from "@emotion/styled";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PAGE_URL } from "@/shared";

const SubContainer = styled.div`
    display: flex;
    justify-content: space-between;
    width: 70%;
    @media (max-width: 768px) {
        flex-direction: column;
    }
`;

const CustomTitle = styled(Title)`
    font-size: 1.8rem;
`;
const Photo = styled.img`
    width: 400px;
    height: 400px;
    margin-top: 20px;
    margin-bottom: 20px;
`;
const PhotoContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100vh;
    align-items: center;
    @media (max-width: 768px) {
        height: 100%;
        margin-top: 30px;
    }
`;
const InputContianer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
const RecordIcon = styled(PiRecordFill)`
    font-size: 60px;
    margin-top: 20px;
    margin-bottom: 20px;
`;
const CustomButton = styled(Button)`
    border-radius: 30px;
    background-color: #FFFFFF;
    color: black;
    font-weight: bold;
    margin-top: 50px;
    @media (max-width: 768px) {
        margin-top: 0px;
        width: 300px;
    }
`;
const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-evenly;
    width: 500px;
    margin-top: 50px;
    @media (max-width: 768px) {
        width: 400px;
    }
`;
const NamingPage = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("a");
    return (
        <MainContainer>
            <InfoHeader type="나만의 동화 만들기" />
            <SubContainer>
                <PhotoContainer>
                    <CustomTitle>이 친구의 이름은 무엇인가요?</CustomTitle>
                    <Photo src="../public/images/temp.svg" />
                </PhotoContainer>
                {name.length === 0 ? (
                    <InputContianer>
                        <RecordIcon />
                        <CustomTitle>아이콘을 클릭해서 알려주세요!</CustomTitle>
                        <CustomButton width="400px" height="50px">직접 입력할래요!</CustomButton>
                    </InputContianer>
                ) : (
                    <InputContianer>
                        <CustomButton width="400px" height="50px">{name}</CustomButton>
                        <ButtonContainer>
                            <SquareButton>{`이름이 틀렸어요.
                            다시 말하기`}</SquareButton>
                            <SquareButton onClick={() => navigate(PAGE_URL.Hero)}>{`맞아요!
                            이어서 하기`}</SquareButton>
                        </ButtonContainer>
                    </InputContianer>
                )}
            </SubContainer>
            <div style={{height: "100px"}}></div>
        </MainContainer>
    )
};

export default NamingPage;