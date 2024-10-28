import { CircleButton, MainContainer, RecordIcon, SquareButton, Title } from "@/entities";
import { InfoHeader, LeftRight } from "@/widgets";
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
`;

const RecordContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    @media (max-width: 768px) {
        height: 100%;
        margin-top: 30px;
    }
`;

const HeroContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 50%;
    @media (max-width: 768px) {
        height: 100%;
        margin-top: 30px;
        width: 100%;
    }
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 50px;
    width: 70%;
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
        margin-top: 30px;
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
`;

const StoryPage = () => {
    const navigate = useNavigate();
    const [record, setRecord] = useState<string>("");
    const [progress, setProgress] = useState<number>(0);
    const [hero, setHero] = useState<string[]>(["토끼", "사자", "호랑이", "곰", "여우", "늑대", "사슴", "코끼리", "기린", "원숭이"]);
    return (
        <MainContainer>
            <InfoHeader type="나만의 동화 만들기" />
            <SubContainer>
                <PhotoContainer>
                    <CustomTitle>이 사진을 보고 떠오르는 이야기를 들려주세요!</CustomTitle>
                    <Photo src="../public/images/temp.svg" />
                </PhotoContainer>
                {progress === 0 ? (
                    <RecordContainer>
                        <RecordIcon />
                        <CustomTitle>아이콘을 클릭해서 알려주세요!</CustomTitle>
                    </RecordContainer>
                ) : (progress === 1 ? (
                    <HeroContainer>
                         <CustomTitle>등장인물의 대사인가요?</CustomTitle>
                         <ButtonContainer>
                            <CircleButton onClick={() => setProgress(progress+1)}>네</CircleButton>
                            <CircleButton>아니요</CircleButton>
                         </ButtonContainer>
                    </HeroContainer>
                ) : (
                    <LineContainer>
                        <CustomTitle>누구의 대사인가요?</CustomTitle>
                        <HeroListContainer>
                            {hero.map((name, index) => (
                                <SquareButton width="50px" height="50px" key={index}>{name}</SquareButton>
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
export default StoryPage;