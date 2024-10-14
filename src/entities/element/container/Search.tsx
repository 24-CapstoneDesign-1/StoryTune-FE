import styled from "@emotion/styled";
import { SearchButton } from "../button/Button";

const SearchContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 20px;
`;
const SearchInput = styled.input`
    width: 300px;
    height: 30px;
    padding-left: 15px;
    padding-right: 45px;
    border-radius: 30px;
    border: 1px solid gray;
    box-shadow: 3px 3px 5px gray;
    outline: none;
`;
const SearchButtonCustom = styled(SearchButton)`
    position: relative;
    right: 60px;
    top: 6px;
`;
export const Search = () => {
    return (
        <SearchContainer>
            <SearchInput type="text" placeholder="찾고 싶은 책을 입력해 주세요." />
            <SearchButtonCustom />
        </SearchContainer>
    );
}