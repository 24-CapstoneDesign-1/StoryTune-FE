import { Loading, MainContainer } from "@/entities";
import { PAGE_URL } from "@/shared";
import { BookService } from "@/shared/hooks/services/BookService";
import { useBookStore } from "@/shared/hooks/stores/useBookStore";
import { useHeroStore } from "@/shared/hooks/stores/useHeroStore";
import { InfoHeader } from "@/widgets";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
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

const HeroPage = () => {
    const navigate = useNavigate();
    const [images, setImages] = useState<Blob[]>([]);
    const bookService = BookService();
    const [loading, setLoading] = useState<boolean>(true);
    const bookStore = useBookStore();
    const heroStore = useHeroStore();
    
    const character = async () => {
        const formData = new FormData();
        heroStore.getImages().forEach((f) => {
            formData.append("images", f);
        });
        try{
            const res = await bookService.bookCharacter(bookStore.bookId, formData)
            .then((res) => {
                res.result.myBookCharacterIds.forEach((id, index) => {
                    heroStore.setIds(index, id);
                });
            })
            .then(() => navigate(PAGE_URL.HeroNaming));
            return res;
        } catch (error) {
            console.error("Image upload failed:", error);
        }
    }
    
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
        const fetchHeroes = async () => {
            const res = await getHero();
            const heroImages = res.map((index) => bookStore.getImage(index))
            setImages(heroImages);
            setLoading(false);
        };
        fetchHeroes(); // 함수 호출
    }, []);

    if (loading) {
        return (
            <MainContainer>
                <InfoHeader type="나만의 동화 만들기" />
                <Loading />
                <div style={{height: "1000px"}}></div>
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
                        <ButtonSubContainer onClick={() => {
                            character();
                        }}>
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