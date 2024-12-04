import { MenuButton, SearchButton } from "@/entities";
import { PAGE_URL } from "@/shared";
import styled from "@emotion/styled";
import { IoChevronBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const HeaderContainer = styled.header`
    display: flex;
    width: 100%;
    height: 55px;
    justify-content: center;
    background-color: #FFFFFF;
    align-items: center;
    padding: 10px;
    position: relative;
    border-bottom: 1px solid black;
    @media (max-width: 768px) {
        height: 50px;
    }
`;

const BackButton = styled(IoChevronBack)`
    position: absolute;
    top: 20%;
    left: 20px;
    font-size: 3rem;
    @media (max-width: 768px) {
        font-size: 2rem;
        top: 25%;
    }
`;
const Title = styled.div`
    font-size: 2rem;
    font-weight: bold;
    @media (max-width: 768px) {
        font-size: 1.5rem;
    }
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
    const navigate = useNavigate();
    return (
        <HeaderContainer>
            <BackButton onClick={() => navigate(PAGE_URL.Home)}/>
            <Title>
                {type}
            </Title>
        </HeaderContainer>
    );
};