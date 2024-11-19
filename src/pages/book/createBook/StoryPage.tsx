import { CircleButton, MainContainer, RecordIcon, SquareButton, Title } from "@/entities";
import { useBookStore } from "@/shared/hooks/stores/useBookStore";
import { useHeroStore } from "@/shared/hooks/stores/useHeroStore";
import { InfoHeader, LeftRight } from "@/widgets";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RxChatBubble } from "react-icons/rx";
import { before } from "node:test";

const StoryPage = () => {
    const navigate = useNavigate();
    const [record, setRecord] = useState<string>("");
    const [progress, setProgress] = useState<number>(0);
    const heroStore = useHeroStore();
    const bookStore = useBookStore();
    const [hero, setHero] = useState<string[]>(heroStore.getAllName());
    const [isRecord, setIsRecord] = useState<boolean>(false);
    const [recordProgress, setRecordProgress] = useState<boolean>(false);

    return (
        <MainContainer>
            <InfoHeader type="나만의 동화 만들기" />
            <SubContainer>
                <PhotoContainer>
                    <CustomTitle>이 사진을 보고 떠오르는 이야기를 들려주세요!</CustomTitle>
                    <Photo src={bookStore.getImage(0)} />
                    <>
                    {console.log(bookStore.getImage(0))}
                    </>
                </PhotoContainer>
                {(progress % 3) === 0 ? (
                    <>
                        {(!isRecord) ? (
                            <>
                                <RecordContainer>
                                    <ImageContainer>
                                        <HelpImg src="../public/images/help.svg" onClick={() => {console.log('click')}}/>
                                        <BalloonContainer>
                                            <MessageContainer>
                                                <MessageBox>
                                                    도움이 필요해요!
                                                </MessageBox>
                                            </MessageContainer>
                                        </BalloonContainer>
                                    </ImageContainer>
                                    <RecordIcon onClick={() => setIsRecord(true)}/>
                                    <CustomTitle>아이콘을 클릭해서 알려주세요!</CustomTitle>
                                </RecordContainer>
                            </>
                        ) : (
                            <>
                                {(!recordProgress) ? (
                                    <RecordContainer>
                                        <CustomTitle>이야기를 만들어 주세요</CustomTitle>
                                        <textarea onChange={(e) => setRecord(e.target.value)} value={record} style={{width: "80%", height: "60%"}}/>
                                        <SquareButton onClick={() => {
                                            setRecordProgress(true);
                                        }}>완료</SquareButton>
                                    </RecordContainer>
                                ) : (
                                    <>
                                        <RecordContainer>
                                            <CustomTitle>{record}</CustomTitle>
                                            <SquareButton onClick={() => {
                                                setIsRecord(false);
                                                setRecordProgress(false);
                                                bookStore.setStory(Math.floor(progress / 3) + 1, record);
                                                setProgress(progress+1);
                                            }}>다음</SquareButton>
                                        </RecordContainer>
                                    </>
                                )}

                            </>
                        )}
                    </>
                ) : ((progress % 3) === 1 ? (
                    <HeroContainer>
                         <CustomTitle>등장인물의 대사인가요?</CustomTitle>
                         <ButtonContainer>
                            <CircleButton onClick={() => setProgress(progress+1)}>네</CircleButton>
                            <CircleButton onClick={() => setProgress(progress + 2)}>아니요</CircleButton>
                         </ButtonContainer>
                    </HeroContainer>
                ) : (
                    <LineContainer>
                        <CustomTitle>누구의 대사인가요?</CustomTitle>
                        <HeroListContainer>
                            {hero.map((name, index) => (
                                <SquareButton width="50px" height="50px" key={index} onClick={() => {
                                    setProgress(progress+1);
                                }}>{name}</SquareButton>
                            ))}
                        </HeroListContainer>
                    </LineContainer>
                ))}
            </SubContainer>
            <LeftRight progress={progress} setProgress={setProgress}/>
            <div style={{height: "100px"}}></div>
        </MainContainer>
    )
}

const ImageContainer = styled.div`

`;
const HelpImg = styled.img`
    position: absolute;
    top: 120px;
    right: 40px;
    width: 80px;
    @media (max-width: 768px) {
        width: 40px;
        top: 500px;
        right: 30px;
    }
`;

const BalloonContainer = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    @media (max-width: 768px) {
        width: 100%;
        height: 70px;
    }
`;

const MessageContainer = styled.div`
    flex-shrink: 1;
    height: 250px;
    width: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-right: 5%;
    
    &::before {
        content: "";
        position: absolute;
        top: 22%;
        right: 8em;
        border: 1em solid transparent;
        border-left: 1em solid black;
        transform: translateY(-50%);
        z-index: 0;
    }
    @media (max-width: 768px) {
    display: none;
    }
`;
const MessageBox = styled.div`
    display: flex;
    position: absolute;
    font-size: 1.5rem;
    font-weight: bold;
    top: 17%;
    right: 6.6em;
    width: 20%;
    height: 10%;
    justify-content: center;
    align-items: center;
    border: 2px solid black;
    border-radius: 15px;
    padding-left: 1.8em;
    padding-right: 1.8em;
    @media (max-width: 768px) {
        height: 50px;
        width: 120px;
        font-size: 1rem;
        top: 71.2%;
        right: 5.51em;
    }
`;

const SubContainer = styled.div`
    display: flex;
    justify-content: space-between;
    width: 70%;
    height: 85vh;
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
        width: 300px;
        height: 300px;
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

const HeroContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 50%;
    margin-bottom: 20px;
    @media (max-width: 768px) {
        height: 100%;
        width: 100%;
    }
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 0px;
    width: 90%;
    @media (max-width: 768px) {
        width: 70%;
    }
`;

const LineContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 50%;
    @media (max-width: 768px) {
        height: 100%;
        width: 100%;
    }
`;

const HeroListContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    margin-top: 40px;
    margin-bottom: 20px;
    width: 80%;
    
    > button {
        width: 100%;
        height: 50px;
    }
    @media (max-width: 768px) {
        margin-top: 0px;
    }
`;


export default StoryPage;