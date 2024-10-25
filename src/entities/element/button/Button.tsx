import styled from "@emotion/styled";
import { IoMenu, IoSearchSharp } from "react-icons/io5";

export const Button = styled.button<{
    width?: string;
    height?: string;
}>`
    display: flex;
    justify-content: center;
    align-items: center;
    height: ${(props) => props.height || "40px"};
    width: ${(props) => props.width || "100px"};
    background-color: #1F9EF9;
    border-radius: 10px;
    color: white;
    margin-top: 0px;
    margin-bottom: 0px;
    border: none;
    outline: none;
    font-size: 1.5rem;
    box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25);
    border: 0.3px solid #000000;
    @media (max-width: 768px) {
        width: 80%;
        height: 45px;
        font-size: 1.2rem;
    }
`;

export const ProfileButton = styled(Button)`
`;
export const MenuButton = styled(IoMenu)`
    font-size: 1.5rem;
    margin-right: 20px;
`;

export const SearchButton = styled(IoSearchSharp)`
    font-size: 1.5rem;
    margin-left: 20px;
`;
