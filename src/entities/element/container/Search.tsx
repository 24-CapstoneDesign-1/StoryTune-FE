import styled from "@emotion/styled";
import { SearchButton } from "../button/Button";

const SearchContainer = styled.div`
    display: flex;
    width: 400px;
    justify-content: center;
    margin-top: 20px;
    @media (max-width: 768px) {
        margin-top: 10px;
    }
`;
const SearchInput = styled.input`
    width: 100%;
    height: 40px;
    padding-left: 15px;
    padding-right: 45px;
    font-size: 1.2rem;
    border-radius: 30px;
    border: 1px solid gray;
    box-shadow: 3px 3px 5px gray;
    outline: none;
    @media (max-width: 768px) {
        width: 250px;
        height: 40px;
    }
`;
const SearchButtonCustom = styled(SearchButton)`
    position: relative;
    right: 60px;
    top: 10px;
    @media (max-width: 768px) {
        right: 60px;
        top: 10px;
    }
`;
interface SearchProps {
    ref?: React.RefObject<HTMLInputElement>;
    value: string;
    change : React.ChangeEventHandler<HTMLInputElement>;
    onSearch: () => void;
}
export const Search = ({ ref, value, change, onSearch } : SearchProps) => {

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            onSearch();
        }
    };
    

    return (
        <SearchContainer>
            <SearchInput ref={ref} defaultValue={value} type="text" placeholder="찾고 싶은 책을 입력해 주세요." onChange={change} onKeyPress={handleKeyPress}/>
            <SearchButtonCustom />
        </SearchContainer>
    );
}