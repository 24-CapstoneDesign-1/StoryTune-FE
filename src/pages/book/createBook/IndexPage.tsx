import { MainContainer, SquareButton } from "@/entities";
import { PAGE_URL } from "@/shared";
import { BookService } from "@/shared/hooks/services/BookService";
import { useBookStore } from "@/shared/hooks/stores/useBookStore";
import { InfoHeader } from "@/widgets";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const IndexPage = () => {
    const bookStore = useBookStore();
    const [images, setImages] = useState<
    { image: string; myBookCharacterId: number; name: string; story: string }[]
>([]);

    const [progress, setProgress] = useState<number>(0);
    const navigate = useNavigate();
    const bookService = BookService();

    useEffect(() => {
        const fetchCharacter = async () => {
            const res = await bookStore.getAllBook(); // 데이터를 가져옵니다.
            console.log(res);
            // Blob을 문자열로 변환
            const formattedImages = res.map((book: any) => ({
                image: URL.createObjectURL(book.image), // Blob → string 변환
                myBookCharacterId: book.myBookCharacterId,
                name: book.name,
                story: book.story,
            }));
    
            setImages(formattedImages); // 상태 업데이트
        };
    
        fetchCharacter();
    }, []);

    return (
        <MainContainer>
            <InfoHeader type="나만의 동화 만들기" />
                {progress === 0 ? (
                    <SubContainer>
                        <TitleContainer>이 동화책의 표지를 선택해 주세요!</TitleContainer>
                        <ImageContainer>
                            {images.map((image, index) => (
                                <ImageBlock key={index}>
                                    <Image src={image.image} onClick={() => {
                                        setProgress(progress+1);
                                        bookStore.setIndex(index);
                                    }}/>
                                </ImageBlock>
                            ))}
                        </ImageContainer>
                    </SubContainer>
                ) : (
                    <>
                        <ValidContainer>
                            <PhotoContainer>
                                <TitleContainer>동화책의 표지가 맞나요?</TitleContainer>
                                <Photo src={images[bookStore.getIndex()].image} />
                            </PhotoContainer>
                            <InputContianer>
                                <ButtonContainer>
                                    <SquareButton width="180px" height="100px" onClick={() => setProgress(progress-1)}>{`표지가 틀렸어요.
                                    다시 말하기`}</SquareButton>
                                    <SquareButton width="180px" height="100px" onClick={() => {
                                        navigate(PAGE_URL.Title);
                                        bookService.cover({myBookContentId: bookStore.getMyBookCharacterId(bookStore.getIndex())});
                                    }}>{`맞아요!
                                    이어서 하기`}</SquareButton>
                                </ButtonContainer>
                            </InputContianer>
                        </ValidContainer>
                    </>
                )}
            <div style={{height: "250px"}}></div>
        </MainContainer>
    )
}

export default IndexPage;

const TitleContainer = styled.div`
  display: flex;
  font-size: 2rem;
  font-weight: bold;
  margin: 20px 0px 10px 0px;
  @media (max-width: 768px) {
    font-size: 1.5rem;
    }
`;
const ValidContainer = styled.div`
    display: flex;
    justify-content: space-between;
    width: 70%;
    height: 100vh;
    @media (max-width: 768px) {
        flex-direction: column;
        height: 100%;
        width: 100%;
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
    }
`;

const Photo = styled.img`
    width: 320px;
    height: 400px;
    margin-top: 20px;
    margin-bottom: 20px;
    border-radius: 20px;
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
  gap: 20px;
  margin-top: 20px;
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;


const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-between;
    width: 110%;
    margin-top: 40px;
    @media (max-width: 768px) {
        font-size: 1rem;
        width: 75%;
        margin-top: 20px;
    }
    @media (max-width: 768px) {
        width: 75%;
    }
`;

const InputContianer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    @media (max-width: 768px) {
        width: 100%;
    }
`;



const SubContainer = styled.div`
  display: flex;
  width: 80%;
  height: 1000px;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  @media (max-width: 768px) {
    margin-top:0px;
  }
`;