import { InfoHeader } from "@/widgets";
import { MainContainer } from "@/entities";
import styled from "styled-components";

const MainSubContainer = styled.div`
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const MainPage = () => {

    return (
        <MainContainer>
            <InfoHeader type="404" />
            <MainSubContainer>
                <h1>404 Not Found</h1>
            </MainSubContainer>
            <div style={{height: "140px"}}></div>
        </ MainContainer>
    )
};

export default MainPage;