import { MainContainer } from "@/entities";
import { PAGE_URL } from "@/shared";
import { BookService } from "@/shared/hooks/services/BookService";
import { useBookStore } from "@/shared/hooks/stores/useBookStore";
import { useHeroStore } from "@/shared/hooks/stores/useHeroStore";
import { InfoHeader } from "@/widgets";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

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
  width: 50%;
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
const NameContainer = styled.div`
    width: 165px;
    height: 20px;
    border-radius: 0px 0px 9px 9px;
    border-top: 1px solid #000000;
    padding: 10px 0px 10px 5px;
    font-size: 1.2rem;
    font-weight: bold;
    background-color: white;
    position: absolute;
    bottom: 0;
    @media (max-width: 768px) {
        width: 145px;
    }
`;

interface HeroNameProps {
    image: string;
    name: string;
}

const HeroNamingPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [images, setImages] = useState<HeroNameProps[]>([]);
    const heroStore = useHeroStore();

    // const character = async () => {
    //     const formData = new FormData();
    //     heroStore.getImages().forEach((image, index) => {
    //         formData.append("images", image, `hero${index}`);
    //     });
    //     try{
    //         const res = await bookService.bookCharacter(bookStore.bookId, formData);
    //         console.log("Image upload success:", res);
    //         return res;
    //     } catch (error) {
    //         console.error("Image upload failed:", error);
    //       }
    // }
    useEffect(() => {
        const fetchCharacter = async () => {
            if (!heroStore.getImages().length) {
                navigate(PAGE_URL.Hero);
                return;
            }
        };
    
        fetchCharacter();
    }, [heroStore, navigate]);
    

    useEffect(() => {
        // heroStore.getImages()가 이미지를 반환한다고 가정하고, 이미지를 업데이트
        const newImages = heroStore.getImages().map((image, index) => ({
            image: URL.createObjectURL(image),
            name: heroStore.getName(index) || ""
        }));
        setImages(newImages); // 새로운 이미지 배열로 상태 업데이트
    }, [heroStore]); // heroStore의 상태가 바뀔 때마다 실행

    useEffect(() => {
        if (location.state) {
            const { index, name } = location.state;
            setImages((prevImages) => 
                prevImages.map((img, i) =>
                    i === index ? { ...img, name } : img
                )
            );
        }
    }, [location.state]);

    return (
        <MainContainer>
            <InfoHeader type="나만의 동화 만들기" />
            <SubContainer>
                <TitleContainer>
                    <Title>등장인물의 이름이 궁금해요!</Title>
                    <Title>사진을 눌러 이름을 알려주세요!</Title>
                </TitleContainer>
                <ImageContainer>
                    {images.map((image, index) => (
                        <ImageBlock key={index} onClick={() => {
                            navigate(PAGE_URL.Name, { state: { image: image.image, index: index } });
                        }}>
                            <Image src={image.image} />
                            {image.name ? (
                                <NameContainer>
                                    {image.name}
                                </NameContainer>
                            ) : null}
                        </ImageBlock>
                    ))}
                </ImageContainer>
                <ButtonContainer>
                    <ButtonSubContainer>
                        {`마음에 들지 않아요.
                        다시 이름을 알려줄게요!`}
                    </ButtonSubContainer>
                    <ButtonSubContainer onClick={() => navigate(PAGE_URL.Topic)}>
                        {`마음에 들어요!
                        이어서 하기`}
                    </ButtonSubContainer>
                </ButtonContainer>
            </SubContainer>
            <div style={{ height: "300px" }}></div>
        </MainContainer>
    );
};

export default HeroNamingPage;
