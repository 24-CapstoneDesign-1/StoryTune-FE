import styled from "@emotion/styled";
import { InfoHeader } from "@/widgets";
const MainContainer = styled.div`
    background-color: #FFFCAD;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 100px;
`;

const PhotoPage = () => {
  return (
    <MainContainer>
        <InfoHeader type="나만의 동화 만들기"/>
        
    </MainContainer>
  );
};

export default PhotoPage;