import { InfoHeader, BookList } from "@/widgets";
import { useState } from "react";
import styled from "@emotion/styled";
import { Search } from "@/entities";
const MainContainer = styled.div`
    background-color: #FFFCAD;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const MainSubContainer = styled.div`
    width: 80%;
`;

const SearchButtonContainer = styled.div`
    width: 80%;
    display: flex;
    margin: 20px 0 5px 0;
`;


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
                <Search />
            </SearchButtonContainer>
            <MainSubContainer>
                <BookList title="다른 친구들은 어떤 책으로 만들었을까?" bookList={bookList} /> 
            </MainSubContainer>
            <div style={{height: "100px"}}></div>
        </ MainContainer>
    )
};

export default MainPage;