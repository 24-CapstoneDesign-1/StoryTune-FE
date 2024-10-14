import { MenuButton, SearchButton } from "@/entities";
import styled from "@emotion/styled";
import { IoChevronBack } from "react-icons/io5";

const HeaderContainer = styled.header`
    display: flex;
    width: 100%;
    height: 60px;
    justify-content: center;
    background-color: #FFFFFF;
    align-items: center;
    padding: 10px;
    position: relative;
    border-bottom: 1px solid black;
`;

const BackButton = styled(IoChevronBack)`
    position: absolute;
    top: 20%;
    left: 20px;
    font-size: 3rem;
`;
const Title = styled.div`
    font-size: 2rem;
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

export const InfoHeader = ({type} : {type : string}) => {
    return (
        <HeaderContainer>
            <BackButton />
            <Title>
                {type}
            </Title>
        </HeaderContainer>
    );
};