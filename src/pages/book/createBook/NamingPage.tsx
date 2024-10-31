import { Button, MainContainer, SquareButton, Title, RecordIcon, InputContainer } from "@/entities";
import { InfoHeader } from "@/widgets";
import styled from "@emotion/styled";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
    font-size: 1.4rem;
`;
const Photo = styled.img`
    width: 400px;
    height: 400px;
    margin-top: 5px;
    margin-bottom: 50px;
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

const CustomButton = styled(Button)`
    border-radius: 20px;
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
    const location = useLocation();
    const [image, setImage] = useState(location.state.image);
    const [curIndex, setCurIndex] = useState(location.state.index);
    const [name, setName] = useState("");
    const [typing, setTyping] = useState(false);
    const [finalName, setFinalName] = useState("");
    return (
        <MainContainer>
            <InfoHeader type="나만의 동화 만들기" />
            <SubContainer>
                <PhotoContainer>
                    <CustomTitle>이 친구의 이름은 무엇인가요?</CustomTitle>
                    <Photo src={image} />
                </PhotoContainer>
                {finalName.length === 0 ? (
                    <InputContianer>
                        {!typing ? (
                            <>
                                <RecordIcon />
                                <CustomTitle>아이콘을 클릭해서 알려주세요!</CustomTitle>
                                <CustomButton width="400px" height="50px" onClick={() => setTyping(!typing)}>직접 입력할래요!</CustomButton>
                            </>
                        ): (
                            <>
                                <InputContainer placeholder="이름을 입력해 주세요" value={name} onChange={(e) => setName(e.target.value)}></InputContainer>
                                <div style={{height: "50px"}}></div>
                                <SquareButton width="230px" height="60px" onClick={() => {
                                    setTyping(!typing)
                                    setFinalName(name)
                                }}>이름을 입력했어요!</SquareButton>
                            </>
                        )}
                        
                    </InputContianer>
                ) : (
                    <InputContianer>
                        <CustomButton width="400px" height="50px">{name}</CustomButton>
                        <ButtonContainer>
                            <SquareButton width="160px" height="100px">{`이름이 틀렸어요.
                            다시 말하기`}</SquareButton>
                            <SquareButton width="160px" height="100px" onClick={() => navigate(PAGE_URL.HeroNaming, {state: {index: curIndex, name: finalName}})}>{`맞아요!
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