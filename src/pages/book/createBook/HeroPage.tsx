import { MainContainer } from "@/entities";
import { PAGE_URL } from "@/shared";
import { BookService } from "@/shared/hooks/services/BookService";
import { useBookStore } from "@/shared/hooks/stores/useBookStore";
import { InfoHeader } from "@/widgets";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { set } from "react-hook-form";
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
const ImageBlock = styled.label`
    width: 170px;
    height: 200px;
    display: flex;
    background-color: transparent;
    border-radius: 10px;
    color: black;
    // overflow: hidden;
    position: relative;
    border: 1px solid #000000;
    box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.5);
    flex-direction: column;
    @media (max-width: 768px) {
        width: 150px;
        height: 150px;
    }
`;
const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 10px;
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

interface HeroNameProps {
    image: string;
    name: string;
}
const HeroPage = () => {
    const navigate = useNavigate();
    const [images, setImages] = useState<Blob[]>([]);
    const bookService = BookService();
    const bookStore = useBookStore();
    
    const getHero = async () => {
        const res = await bookService.hero({
            images: bookStore.getImages() // 'images' 속성으로 전달
        });
        console.log(res);
        return res;
    };
    useEffect(() => {
        getHero().then((res) => {
            setImages(res.images);
        });
    }, []);
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
                        <>
                        <ImageBlock key={index}>
                            <Image src={URL.createObjectURL(image)} />
                        </ImageBlock>
                        </>
                    ))}

                </ImageContainer>
                <ButtonContainer>
                        <ButtonSubContainer>
                            {`마음에 들지 않아요.
                            다시 분석하기`}
                        </ButtonSubContainer>
                        <ButtonSubContainer onClick={() => navigate(PAGE_URL.HeroNaming)}>
                            {`마음에 들어요! 
                            이어서 하기`}
                        </ButtonSubContainer>
                    </ButtonContainer>
            </SubContainer>
            <div style={{height: "300px"}}></div>
        </MainContainer>
    )
};

export default HeroPage;