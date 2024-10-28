import { MainContainer, Search } from "@/entities";
import { BookList, InfoHeader, SearchBookList } from "@/widgets";
import { useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";
import { useLocation, useNavigate } from "react-router-dom";

const SearchContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    // border-top: 1px solid #000000;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    border-radius: 20px;
    background-color: #FFFFFF;
    margin-top: 20px;
    @media (max-width: 768px) {
        width: 90%;
    }
`;

const SearchSubContainer = styled.div`
    display: flex;
    width: 90%;
    flex-direction: column;
    @media (max-width: 768px) {
        width: 90%;
    }
`;
const SearchMainContainer = styled.div`
    display: flex;
    width: 80%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    @media (max-width: 768px) {
        width: 100%;
    }
`;

const SearchInputContainer = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
`;
const SearchPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const searchInputRef = useRef<HTMLInputElement>(null);
    const [search, setSearch] = useState(location.state ? location.state.search : "");
    const [searchList, setSearchList] = useState([
        {"title": "피노키오", "createdAt": "2021-10-01", "photo": "../public/images/temp.svg"},
        {"title": "피노키오", "createdAt": "2021-10-01", "photo": "../public/images/temp.svg"},
        {"title": "피노키오", "createdAt": "2021-10-01", "photo": "../public/images/temp.svg"},
        {"title": "피노키오", "createdAt": "2021-10-01", "photo": "../public/images/temp.svg"},
        {"title": "피노키오", "createdAt": "2021-10-01", "photo": "../public/images/temp.svg"},
        {"title": "피노키오", "createdAt": "2021-10-01", "photo": "../public/images/temp.svg"},
        {"title": "피노키오", "createdAt": "2021-10-01", "photo": "../public/images/temp.svg"},
        {"title": "피노키오", "createdAt": "2021-10-01", "photo": "../public/images/temp.svg"},
        {"title": "피노키오", "createdAt": "2021-10-01", "photo": "../public/images/temp.svg"},
        {"title": "피노키오", "createdAt": "2021-10-01", "photo": "../public/images/temp.svg"},
        {"title": "피노키오", "createdAt": "2021-10-01", "photo": "../public/images/temp.svg"},
        {"title": "피노키오", "createdAt": "2021-10-01", "photo": "../public/images/temp.svg"},
        {"title": "피노키오", "createdAt": "2021-10-01", "photo": "../public/images/temp.svg"},
    ]);

    useEffect(() => {
        searchInputRef.current?.focus();
    }, []);
    return (
        <MainContainer>
            <InfoHeader type="검색하기" />
            <SearchMainContainer>
                <SearchInputContainer>
                    <Search value={search} ref={searchInputRef} change={(e) => setSearch(e.target.value)} onSearch={() => {}} />
                </SearchInputContainer>
                {search ? (
                    <SearchContainer>
                        <SearchSubContainer>
                            <SearchBookList title={`'${search}'의 검색 결과`} bookList={searchList} /> 
                        </SearchSubContainer>
                    </SearchContainer>
                ) : (
                    <div style={{height: "100vh"}}>
                    </div>
                )}
            </SearchMainContainer>
            <div style={{height: "100px"}}></div>
        </MainContainer>
    )
}
export default SearchPage;