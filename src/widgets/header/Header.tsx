import { MenuButton, SearchButton } from "@/entities";
import styled from "@emotion/styled";

const HeaderContainer = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    background-color: #f0f0f0;
    border-bottom: 1px solid #e0e0e0;
`;

export const Header = () => {
    return (
        <HeaderContainer>
            <MenuButton />
            <SearchButton />
        </HeaderContainer>
    );
};
