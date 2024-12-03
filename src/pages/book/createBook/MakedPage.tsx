import { MainContainer, SquareButton, Title } from "@/entities";
import { PAGE_URL } from "@/shared";
import { useBookStore } from "@/shared/hooks/stores/useBookStore";
import { InfoHeader } from "@/widgets";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";


const SubContainer = styled.div`
    display: flex;
    justify-content: space-between;
    width: 70%;
    height: 90vh;
    @media (max-width: 768px) {
        flex-direction: column;
        height: 100%;
        width: 100%;
    }
`;

const CustomTitle = styled(Title)`
    font-size: 1.8rem;
    margin-top: 20px;
    padding: 0px 20px 0px 20px;
    @media (max-width: 768px) {
        font-size: 1.4rem;
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
        margin-top: 20px;
    }
`;

const Photo = styled.img`
    width: 400px;
    height: 400px;
    margin-top: 20px;
    margin-bottom: 20px;
    @media (max-width: 768px) {
        margin-top: 0px;
    }
`;
const ButtonContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const ButtonSubContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 250px;
    @media (max-width: 768px) {
        height: 180px;
    }
`;

const MakedPage = () => {
    const navigate = useNavigate();
    const bookStore = useBookStore();
    return (
        <MainContainer>
            <InfoHeader type="나만의 동화 만들기" />
            <SubContainer>
                <PhotoContainer>
                    <CustomTitle>나만의 동화가 완성되었어요!</CustomTitle>
                    <Photo src="../public/images/temp.svg" />
                </PhotoContainer>
                <ButtonContainer>
                    <ButtonSubContainer>
                        <SquareButton width="300px" mobileWidth="300px" onClick={() => navigate(`/book/${bookStore.bookId}`)}>내가 만든 동화 보러 가기</SquareButton>
                        <SquareButton width="300px" mobileWidth="300px">영어 동화로 바꾸고 싶어요!</SquareButton>
                    </ButtonSubContainer>
                </ButtonContainer>
            </SubContainer>
            <div style={{height: "100px"}}></div>
        </MainContainer>
    )
}

export default MakedPage;