import { MainContainer, RecordIcon, Title } from "@/entities";
import { InfoHeader } from "@/widgets";
import styled from "@emotion/styled";

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
`;

const PhotoContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 90vh;
    align-items: center;
    @media (max-width: 768px) {
        height: 100%;
        margin-top: 30px;
    }
`;

const Photo = styled.img`
    width: 400px;
    height: 400px;
    margin-top: 20px;
    margin-bottom: 20px;
`;

const RecordContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    @media (max-width: 768px) {
        height: 100%;
        margin-top: 30px;
    }
`;


const TitlePage = () => {
    return (
        <MainContainer>
            <InfoHeader type="나만의 동화 만들기" />
            <SubContainer>
                <PhotoContainer>
                    <CustomTitle>나만의 동화가 완성되었어요!</CustomTitle>
                    <Photo src="../public/images/temp.svg" />
                </PhotoContainer>
                    <RecordContainer>
                        <CustomTitle>이 동화의 제목은 무엇인가요?</CustomTitle>
                        <RecordIcon />
                        <CustomTitle>아이콘을 클릭해서 알려주세요!</CustomTitle>
                    </RecordContainer>
            </SubContainer>
            <div style={{height: "100px"}}></div>
        </MainContainer>
    )
}

export default TitlePage;