import { MainContainer, Search } from "@/entities";
import { BookList, Header } from "@/widgets"
import { useState } from "react";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { PAGE_URL } from "@/shared";

const MainSubContainer = styled.div`
    width: 80%;
`;

const SearchButtonContainer = styled.div`
    width: 100%;
    display: flex;
    margin: 20px 0 10px 0;
`;

const HomePage = () => {
    const navigate = useNavigate();
    const [bookList, setBookList] = useState([
        {"title": "피노키오", "createdAt": "2021-10-01", "photo": "../public/images/temp.svg"},
        {"title": "피노키오", "createdAt": "2021-10-01", "photo": "../public/images/temp.svg"},
        {"title": "피노키오", "createdAt": "2021-10-01", "photo": "../public/images/temp.svg"},
        {"title": "피노키오", "createdAt": "2021-10-01", "photo": "../public/images/temp.svg"},
    ]);
    const [search, setSearch] = useState("");

    const handleSearch = () => {
        if (search.trim()) navigate(PAGE_URL.Search, { state: { search } });
    };


    return (
        <MainContainer>
            <Header />
            <MainSubContainer>
                <SearchButtonContainer>
                    <Search width="10000px" value={search} change={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)} onSearch={handleSearch}/>
                </SearchButtonContainer>
                <BookList title="내가 만든 책" bookList={bookList} /> 
                <BookList title="동화 목록" bookList={bookList} /> 
            </MainSubContainer>
        </MainContainer>
    );
};

export default HomePage;