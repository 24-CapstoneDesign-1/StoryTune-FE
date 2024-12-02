import { MainContainer } from "@/entities";
import { PAGE_URL } from "@/shared";
import { BookService } from "@/shared/hooks/services/BookService";
import { useBookStore } from "@/shared/hooks/stores/useBookStore";
import { useHeroStore } from "@/shared/hooks/stores/useHeroStore";
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
const SubLoadingContainer = styled.div`
    width: 100%;
    height: 80vh;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 3rem;
    font-weight: bold;
    margin-top: 20px;
`;
const NonContainer = styled.div`
    width: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.9rem;
    font-weight: bold;
    margin-top: 100px;
    margin-bottom: 200px;
`;

interface HeroNameProps {
    image: string;
    name: string;
}
const HeroPage = () => {
    const navigate = useNavigate();
    const [images, setImages] = useState<Blob[]>([]);
    const bookService = BookService();
    const [loading, setLoading] = useState<boolean>(true);
    const bookStore = useBookStore();
    const heroStore = useHeroStore();
    
    const getHero = async () => {
        const resList: any[] = [];

        // 이미지 목록을 비동기적으로 처리하고, 결과를 resList에 담기
        await Promise.all(
            bookStore.getImages().map(async (image, index) => {
                const res = await bookService.hero({
                    images: image // 'images' 속성으로 전달
                });
                console.log('res', res.data.choices[0].message.content);
                if (res.data.choices[0].message.content === "hero") {
                    resList.push(index);
                    heroStore.setImage(index, image);
                }
            })
        );

        return resList; // 비동기 결과를 반환
    };

    useEffect(() => {
        getHero().then((res) => {
            // API 응답을 처리하고 이미지 상태를 업데이트
            const heroImages = res.map((index) => bookStore.getImage(index));
            setImages(heroImages); // images 상태 업데이트
            
            setLoading(false); // 로딩이 완료되었음을 표시
        });
    }, []);

    if (loading) {
        return (
            <MainContainer>
            <InfoHeader type="나만의 동화 만들기" />
            <SubLoadingContainer>
                Loading ...
            </SubLoadingContainer>
            <div style={{height: "300px"}}></div>
        </MainContainer>
        );
    }

    return (
        <MainContainer>
            <InfoHeader type="나만의 동화 만들기" />
            <SubContainer>
                <TitleContainer>
                    <Title>Story Tune이 분석한</Title>
                    <Title>이야기 주인공이에요!</Title>
                </TitleContainer>
                <ImageContainer>
                    {images.length === 0 ? (
                        <>
                            <NonContainer>
                                주인공이 없습니다.
                            </NonContainer>
                        </>
                    ): (
                        <>
                            {images.map((image, index) => (
                                <>
                                    <ImageBlock key={index}>
                                        <Image src={URL.createObjectURL(image)} />
                                    </ImageBlock>
                                </>
                            ))}
                        </>
                    )}

                </ImageContainer>
                {images.length === 0 ? (
                    <>
                        <ButtonSubContainer onClick={() => navigate(PAGE_URL.Topic)}>
                            {`다음으로 넘어가기`}
                        </ButtonSubContainer>
                    </>
                ) : (
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
                )}
            </SubContainer>
            <div style={{height: "300px"}}></div>
        </MainContainer>
    )
};

export default HeroPage;