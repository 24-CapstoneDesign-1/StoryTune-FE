import { Button, MainContainer } from "@/entities";
import { PAGE_URL } from "@/shared";
import { InfoHeader } from "@/widgets";
import styled from "@emotion/styled";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


const TitleContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-self: flex-start;
    margin: 20px 0px 0px 20px;
`;
const Title = styled.h1`
    margin: 0px 0px 0px 0px;
    @media (max-width: 768px) {
        font-size: 1.5rem;
    }
`;
const AddImageBlock = styled.label`
  width: 170px;
  height: 200px;
  display: flex;
  background-color: transparent;
  border-radius: 10px;
  color: black;
  overflow: hidden;
  position: relative;
  border: 1px solid #000000;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.5);
  @media (max-width: 768px) {
    width: 150px;
    height: 150px;
  }
`;
const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
const ImageContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 30px;
  margin-top: 20px;
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 40%;
  margin-top: 20px;
  @media (max-width: 768px) {
    width: 100%;
  }
`;
const ButtonSubContainer = styled.p`
    font-size: 1.2rem;
    font-weight: bold;
    white-space: pre-line;
`;
const SubContainer = styled.div`
    width: 80%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;
const HeroPage = () => {
    const navigate = useNavigate();
    const [images, setImages] = useState<string[]>([
        "../public/images/temp.svg",
        "../public/images/temp.svg",
        "../public/images/temp.svg",
        "../public/images/temp.svg",
        "../public/images/temp.svg",
        "../public/images/temp.svg",
        "../public/images/temp.svg",
        "../public/images/temp.svg",
        "../public/images/temp.svg",
        "../public/images/temp.svg",
    ]);
    const [progress, setProgress] = useState<number>(0);
    
    return (
        <MainContainer>
            <InfoHeader type="나만의 동화 만들기" />
            <SubContainer>
                <TitleContainer>
                    {progress === 0 ? (
                        <>
                            <Title>Story Tune이 분석한</Title>
                            <Title>이야기 주인공이에요!</Title>
                        </>
                    ) : (
                        <>
                            <Title>등장인물의 이름이 궁금해요!</Title>
                            <Title>사진을 눌러 이름을 알려주세요!</Title>
                        </>
                    )}
                </TitleContainer>
                <ImageContainer>
                    {images.map((image, index) => (
                        <AddImageBlock key={index} onClick={() => {
                            if (progress === 1) {
                                navigate(PAGE_URL.Name);
                            }    
                        }}>
                            <Image src={image} />
                        </AddImageBlock>
                    ))}

                </ImageContainer>
                {progress === 0 ? (
                    <ButtonContainer>
                        <ButtonSubContainer>
                            {`마음에 들지 않아요.
                            다시 분석하기`}
                        </ButtonSubContainer>
                        <ButtonSubContainer onClick={() => setProgress(progress+1)}>
                            {`마음에 들어요! 
                            이어서 하기`}
                        </ButtonSubContainer>
                    </ButtonContainer>
                ) : (
                    <ButtonContainer>
                        <ButtonSubContainer>
                            {`마음에 들지 않아요.
                            다시 이름을 알려줄게요!`}
                        </ButtonSubContainer>
                        <ButtonSubContainer onClick={() => setProgress(progress+1)}>
                            {`마음에 들어요!
                            이어서 하기`}
                        </ButtonSubContainer>
                    </ButtonContainer>
                )}
            </SubContainer>
            <div style={{height: "50px"}}></div>
        </MainContainer>
    )
};

export default HeroPage;