import { MenuButton, SearchButton } from "@/entities";
import styled from "@emotion/styled";
import { IoChevronBack } from "react-icons/io5";

const HeaderContainer = styled.header`
    display: flex;
    width: 100%;
    height: 60px;
    justify-content: center;
    align-items: center;
    padding: 10px;
    position: relative;
    border-bottom: 1px solid #e0e0e0;
`;

const BackButton = styled(IoChevronBack)`
    position: absolute;
    top: 20%;
    left: 20px;
    font-size: 3rem;
`;
const Title = styled.div`
    font-size: 1.5rem;
    font-weight: bold;
`;
export const Header = () => {
    return (
        <HeaderContainer>
            <MenuButton />
            <SearchButton />
        </HeaderContainer>
    );
};

export const InfoHeader = () => {
    return (
        <HeaderContainer>
            <BackButton />
            <Title>
                나만의 동화 만들기
            </Title>
        </HeaderContainer>
    );
};