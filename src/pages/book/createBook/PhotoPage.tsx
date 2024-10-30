import styled from "@emotion/styled";
import { InfoHeader } from "@/widgets";
import { useState } from "react";
import { CiRedo } from "react-icons/ci";
import { FaCaretRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { PAGE_URL } from "@/shared";

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
  width: 80%;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;
const PhotoPage = () => {
  const navigate = useNavigate();
  const [images, setImages] = useState<string[]>(Array(10).fill("")); // 10개의 빈 이미지 슬롯을 준비

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const newImages = [...images];
        newImages[index] = reader.result as string;
        setImages(newImages);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <MainContainer>
      <InfoHeader type="나만의 동화 만들기" />
      <SubContainer>
        <TitleContainer>OO이의 동화책에 들어갈 사진을 골라주세요!</TitleContainer>
        {/* <TitleSubContainer>사진 업로드 하러 가기</TitleSubContainer> */}
        <ImageContainer>
          {images.map((image, index) => (
            <AddImageBlock key={index} htmlFor={`upload-${index}`} hasImage={!!image}>
              {image ? <Image src={image} alt={`Uploaded ${index}`} /> : "?"}
              <HiddenInput
                type="file"
                id={`upload-${index}`}
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
          <NextContainer onClick={() => navigate(PAGE_URL.Hero)}>
            <NextButton />
            다 골랐어요!
          </NextContainer>
        </ButtonContainer>
      </SubContainer>
    </MainContainer>
  );
};

export default PhotoPage;
