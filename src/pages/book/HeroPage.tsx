import { Button, MainContainer } from "@/entities";
import { InfoHeader } from "@/widgets";
import styled from "@emotion/styled";
import { useState } from "react";


const TitleContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-self: flex-start;
    margin: 20px 0px 0px 20px;
`;
const Title = styled.h1`
    margin: 0px 0px 0px 0px;
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
`;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 40%;
  margin-top: 20px;
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
    return (
        <MainContainer>
            <InfoHeader type="나만의 동화 만들기" />
            <SubContainer>
                <TitleContainer>
                    <Title>Story Tune이 분석한</Title>
                    <Title>이야기 주인공이에요!</Title>
                </TitleContainer>
                <ImageContainer>
                    {images.map((image, index) => (
                        <AddImageBlock key={index}>
                            <Image src={image} />
                        </AddImageBlock>
                    ))}

                </ImageContainer>
                <ButtonContainer>
                    <ButtonSubContainer>
                        {`마음에 들지 않아요.
                        다시 분석하기`}
                    </ButtonSubContainer>
                    <ButtonSubContainer>
                        {`마음에 들어요! 
                        이어서 하기`}
                    </ButtonSubContainer>
                </ButtonContainer>
            </SubContainer>
            <div style={{height: "50px"}}></div>
        </MainContainer>
    )
};

export default HeroPage;