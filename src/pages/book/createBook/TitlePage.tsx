import { Button, InputContainer, MainContainer, Record, RecordIcon, SquareButton, Title } from "@/entities";
import { PAGE_URL } from "@/shared";
import { BookService } from "@/shared/hooks/services/BookService";
import { InfoHeader } from "@/widgets";
import styled from "@emotion/styled";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SubContainer = styled.div`
    display: flex;
    justify-content: space-between;
    width: 70%;
    height: 90vh;
    @media (max-width: 768px) {
        flex-direction: column;
        height: 100%;
        width: 100%;
    }
`;

const CustomTitle = styled(Title)`
    font-size: 1.8rem;
    margin-top: 20px;
    padding: 0px 20px 0px 20px;
    @media (max-width: 768px) {
        font-size: 1.4rem;
        margin-top: 0px;
    }
`;

const PhotoContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 90vh;
    align-items: center;
    @media (max-width: 768px) {
        height: 100%;
        margin-top: 30px;
    }
`;

const Photo = styled.img`
    width: 400px;
    height: 400px;
    margin-top: 20px;
    margin-bottom: 20px;
    @media (max-width: 768px) {
        margin-top: 0px;
    }
`;

const RecordContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    @media (max-width: 768px) {
        height: 100%;
        margin-top: 0px;
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

const TitlePage = () => {
    const [image, setImage] = useState("../public/images/temp.svg");
    const [name, setName] = useState("");
    const [typing, setTyping] = useState(false);
    const [finalName, setFinalName] = useState("");
    const [progress, setProgress] = useState(0);
    const bookService = BookService();
    const navigate = useNavigate();
    return (
        <MainContainer>
            <InfoHeader type="나만의 동화 만들기" />
            <SubContainer>
                <PhotoContainer>
                    <CustomTitle>이 동화의 제목은 무엇인가요?</CustomTitle>
                    <Photo src={image} />
                </PhotoContainer>
                {progress === 0 ? (
                    <>
                        {finalName.length === 0 ? (
                        <InputContianer>
                            {!typing ? (
                                <>
                                    <Record recordApi={bookService.recordTitle} />
                                    <CustomTitle>아이콘을 클릭해서 알려주세요!</CustomTitle>
                                </>
                            ): (
                                <>
                                    <InputContainer placeholder="이름을 입력해 주세요" value={name} onChange={(e) => setName(e.target.value)}></InputContainer>
                                    <div style={{height: "50px"}}></div>
                                    <SquareButton width="230px" height="60px" onClick={() => {
                                        setTyping(!typing)
                                        setFinalName(name)
                                    }}>제목을 입력했어요!</SquareButton>
                                </>
                            )}
                            
                        </InputContianer>
                        ) : (
                            <InputContianer>
                                <CustomButton width="400px" height="50px">{name}</CustomButton>
                                <ButtonContainer>
                                    <SquareButton width="160px" height="100px" onClick={() => setFinalName("")}>{`제목이 틀렸어요.
                                    다시 말하기`}</SquareButton>
                                    <SquareButton width="160px" height="100px" onClick={() => {
                                        setProgress(progress+1);
                                    }}>{`맞아요!
                                    이어서 하기`}</SquareButton>
                                </ButtonContainer>
                            </InputContianer>
                        )}
                    </>
                ) : (
                    <>
                        <RecordContainer>
                            <CustomTitle>이 동화의 제목은</CustomTitle>
                            <CustomTitle>{finalName} 이에요!</CustomTitle>
                            <CustomButton width="400px" height="50px" onClick={() => {
                                bookService.bookCompleted()
                                .then(() => navigate(PAGE_URL.Maked));
                            }}>{`다음으로 넘어가기`}</CustomButton>
                        </RecordContainer>
                    </>
                )}
                
            </SubContainer>
            <div style={{height: "100px"}}></div>
        </MainContainer>
    )
}

export default TitlePage;