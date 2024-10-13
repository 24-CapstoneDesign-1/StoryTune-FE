import { InfoHeader, BookList } from "@/widgets";
import { useState } from "react";
import styled from "@emotion/styled";
import { SearchButton } from "@/entities";

const MainContainer = styled.div`
    background-color: #FFFCAD;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const MainSubContainer = styled.div`
    width: 80%;
`;

const SearchButtonCustom = styled(SearchButton)`
    font-size: 2rem;
`;
const SearchButtonContainer = styled.div`
    width: 80%;
    display: flex;
    justify-content: flex-end;
    margin: 20px 0;
`;

interface Book {
    title: string;
    author: string;
    createdAt: string;
    photo: string;
}

const MainPage = () => {
    const [bookList, setBookList] = useState([
        {"title": "피노키오", "createdAt": "2021-10-01", "photo": "../public/images/temp.svg"},
        {"title": "피노키오", "createdAt": "2021-10-01", "photo": "../public/images/temp.svg"},
        {"title": "피노키오", "createdAt": "2021-10-01", "photo": "../public/images/temp.svg"},
        {"title": "피노키오", "createdAt": "2021-10-01", "photo": "../public/images/temp.svg"},
    ]);
    return (
        <MainContainer>
            <InfoHeader />
            <MainSubContainer>
                <BookList title="나만의 동화 만들기" bookList={bookList} /> 
            </MainSubContainer>
            <SearchButtonContainer>
                <SearchButtonCustom />
            </SearchButtonContainer>
            <MainSubContainer>
                <BookList title="다른 친구들은 어떤 책으로 만들었을까?" bookList={bookList} /> 
            </MainSubContainer>
        </ MainContainer>
    )
};

export default MainPage;