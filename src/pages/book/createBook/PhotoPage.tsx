import styled from "@emotion/styled";
import { InfoHeader } from "@/widgets";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { CiRedo } from "react-icons/ci";
import { FaCaretRight } from "react-icons/fa";
import { PAGE_URL } from "@/shared";
import { useBookStore } from "@/shared/hooks/stores/useBookStore";
import { BookService } from "@/shared/hooks/services/BookService";

const PhotoPage = () => {
  const navigate = useNavigate();
  const [images, setImages] = useState<string[]>([]);
  const bookStore = useBookStore();
  const bookService = BookService();
  const [bookId, setBookId] = useState(bookStore.getBookId());
  const [file, setFile] = useState<File[] | null>(null);

  useEffect(() => {
    console.log('bookId', bookId);
  }, [bookId]);

  // 이미지 변경 시 호출되는 함수
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile((prevFile) => {
        const newFiles = prevFile ? [...prevFile] : [];
        newFiles[index] = file;
        return newFiles;
      });
      const reader = new FileReader();
      reader.onload = () => {
        setImages((prevImages) => {
          const updatedImages = [...prevImages];
          while (updatedImages.length <= index) {
            updatedImages.push(""); // 배열 길이 확장
          }
          updatedImages[index] = reader.result as string; // URL로 저장
          return updatedImages;
        });
      };
      reader.readAsDataURL(file); // 이미지 파일을 Data URL로 읽기
    }
  };

  // 다중 이미지 업로드 처리
  const handleMultiImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    files.forEach((file, index) => {
      setFile((prevFiles) => {
        const newFiles = prevFiles ? [...prevFiles] : [];
        newFiles[index] = file;
        return newFiles;
      });
      const reader = new FileReader();
      reader.onload = () => {
        setImages((prevImages) => {
          const newImages = [...prevImages];
          newImages[index] = reader.result as string; // URL로 저장
          return newImages;
        });
      };
      reader.readAsDataURL(file); // 파일을 Data URL로 읽기
    });
  };
  
  // handleNextButton 수정
  const handleNextButton = async () => {
    const formData = new FormData();
    console.log(file);
    if (!file) return;
    file.forEach((f, index) => {
      formData.append("images", f, `image-${index}.png`);
    });
    try {
      const res = await bookService.bookImage({
        myBookId: bookId,
        body: formData,
      });
      res.result.myBookContentIds.forEach((id, index) => {
        bookStore.setMyBookCharacterId(index, id);
      });
      console.log('res', res);
      console.log(bookStore.getMyBookCharacterId(0));
      bookStore.setBookImage(formData);
      navigate(PAGE_URL.Hero);
    } catch (error) {
      console.error("Image upload failed:", error);
    }
  };

  return (
    <MainContainer>
      <InfoHeader type="나만의 동화 만들기" />
      <form>
        <SubContainer>
          <TitleContainer>OO이의 동화책에 들어갈 사진을 골라주세요!</TitleContainer>
          <TitleSubContainer onClick={() => {
            setImages(Array(10).fill(""));
            document.getElementById("upload-multi")?.click();
          }}>
            <div>사진 업로드 하러 가기</div>
          </TitleSubContainer>
          <HiddenInput
            type="file"
            id="upload-multi"
            accept="image/*"
            multiple
            onChange={handleMultiImageUpload}
          />
          <ImageContainer>
            {Array.from({ length: Math.max(images.length, 10) }).map((_, index) => (
              <AddImageBlock key={index} hasImage={!!images[index]} htmlFor={`block-${index}`}>
                {images[index] ? <Image src={images[index]} alt={`Uploaded ${index}`} /> : "?"}
                <HiddenInput
                  type="file"
                  id={`block-${index}`}
                  accept="image/*"
                  onChange={(e) => handleImageChange(e, index)}
                />
              </AddImageBlock>
            ))}
          </ImageContainer>
          <ButtonContainer>
            <RerollContainer onClick={() => setImages(Array(10).fill(""))}>
              <RerollButton />
              다시 고르고 싶어요
            </RerollContainer>
            <NextContainer onClick={() => {
              handleNextButton();
            }}>
              <NextButton />
              다 골랐어요!
            </NextContainer>
          </ButtonContainer>
        </SubContainer>
      </form>
    </MainContainer>
  );
};

export default PhotoPage;

// Styled Components
const MainContainer = styled.div`
  background-color: #FFFCAD;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 100px;
`;

const TitleContainer = styled.div`
  display: flex;
  align-self: flex-start;
  font-size: 1.5rem;
  font-weight: bold;
  margin-top: 20px;
  margin-left: 20px;
`;

const TitleSubContainer = styled.div`
  display: flex;
  align-self: flex-start;
  font-size: 1.2rem;
  font-weight: bold;
  margin-top: 10px;
  margin-left: 20px;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
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

const AddImageBlock = styled.label<{ hasImage: boolean }>`
  width: 200px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${(props) => (props.hasImage ? "0" : "100px")};
  background-color: ${(props) => (props.hasImage ? "transparent" : "#FFFFFF")};
  border-radius: 10px;
  color: black;
  overflow: hidden;
  position: relative;
  border: 1px solid #000000;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.5);
  cursor: pointer;
  @media (max-width: 768px) {
    width: 150px;
    height: 150px;
  }
`;

const HiddenInput = styled.input`
  display: none;
`;

const RerollButton = styled(CiRedo)`
  font-size: 2rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 30%;
  margin-top: 40px;
  @media (max-width: 768px) {
    font-size: 1rem;
    width: 75%;
    margin-top: 20px;
  }
`;

const NextButton = styled(FaCaretRight)`
  font-size: 2rem;
`;

const RerollContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 20px;
  margin-top: 20px;
  font-size: 1.2rem;
  font-weight: bold;
`;

const NextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  font-size: 1.2rem;
  font-weight: bold;
`;

const SubContainer = styled.div`
  display: flex;
  width: 100%;
  height: 1000px;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;
