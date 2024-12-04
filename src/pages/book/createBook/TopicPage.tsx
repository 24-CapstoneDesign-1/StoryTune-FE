import { InfoHeader, Rerollplay } from "@/widgets";
import { Button, InputContainer, MainContainer } from "@/entities";
import styled from "@emotion/styled";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PAGE_URL } from "@/shared";
import { useBookStore } from "@/shared/hooks/stores/useBookStore";
import { BookService } from "@/shared/hooks/services/BookService";

const TopicPage = () => {
    const navigate = useNavigate();
    const [topic] = useState<string[]>(["우정", "사랑", "용기", "배려", "협력", "가족", "꿈", "여행", "감사"]);
    const [curTopic, setCurTopic] = useState<string>("");
    const bookService = BookService();
    
    const onReroll = () => {
        setCurTopic("");
    };
    
    const onPlay = () => {
        bookService.topic({ topic: curTopic })
        .then((res) => {
            console.log(res);
            bookStore.setSubject(curTopic)
            navigate(PAGE_URL.Story);
            });
    };
    const bookStore = useBookStore();
    const setTopicTrans = (topic: string) => {
        if (topic == "우정") {
            return "FRIENDSHIP";
        }
        else if (topic == "사랑") {
            return "LOVE";
        }
        else if (topic == "용기") {
            return "COURAGE";
        }
        else if (topic == "배려") {
            return "COMPASSION";
        }
        else if (topic == "협력") {
            return "COOPERATION";
        }
        else if (topic == "가족") {
            return "FAMILY";
        }
        else if (topic == "꿈") {
            return "DREAM";
        }
        else if (topic == "여행") {
            return "ADVENTURE";
        }
        else  {
            return "GRATITUDE";
        }
    }
    return (
        <MainContainer>
            <InfoHeader type="나만의 동화 만들기" />
            <SubContainer>
                <TitleContainer>
                    <div>
                        <MainTitle>새로운 이야기가 떠올랐어요!</MainTitle>
                        <SubTitle>새로운 이야기는 어떤 내용인가요?</SubTitle>
                    </div>
                </TitleContainer>
                <InputContainer 
                    placeholder="원하는 주제 입력하기"
                    value={curTopic} 
                    onChange={(e) => setCurTopic(e.target.value)}
                />
                <ButtonContainer>
                    {topic.map((topic) => (
                        <CustomButton key={topic} onClick={() => {
                            setCurTopic(() => setTopicTrans(topic));
                            bookStore.setSubject(topic);
                        }}>{topic}</CustomButton>
                    ))}
                </ButtonContainer>
                <Rerollplay onReroll={onReroll} onPlay={onPlay}/>
            </SubContainer>
        </MainContainer>
    )
}

export default TopicPage;

const SubContainer = styled.div`
    height: 100vh;
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    @media (max-width: 768px) {
        width: 100%;
        justify-content: flex-start;
        margin-top: 20px;
    }
`;
const TitleContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
`;
const MainTitle = styled.h1`
    margin-bottom: 0px;
    @media (max-width: 768px) {
        font-size: 1.5rem;
    }
`;
const SubTitle = styled.h3`
    margin-top: 0px;
    @media (max-width: 768px) {
        margin-top: 5px;
        font-size: 1.15rem;
    }
`;

const CustomButton = styled(Button)`
    width: 80px;
    height: 40px;
    background-color: #F3E71E;
    border: none;
    border-radius: 10px;
    font-size: 1.2rem;
    color: black;
`;
const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-top: 40px;
    margin-bottom: 20px;
    width: 80%;
    
    > button {
        flex: 1 1 calc(33.33% - 10px);
        margin: 5px;
    }
`;
