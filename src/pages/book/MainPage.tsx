import { InfoHeader, BookList } from "@/widgets";
import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Button, Search, MainContainer } from "@/entities";
import { PAGE_URL } from "@/shared";
import { useNavigate } from "react-router-dom";
import { BookService } from "@/shared/hooks/services/BookService";
import {  FaBookOpen } from 'react-icons/fa6';
import { SlMagicWand } from "react-icons/sl";

const ButtonContainer = styled.div`
 display: flex;
 justify-content: center;
 gap: 20px;
 margin-top: 30px;
 @media (max-width: 768px) {
   flex-direction: row;
   align-items: center;
 }
`;

const StyledButton = styled(Button)`
display: inline-flex;
 background: #fff;
 color: #5D4037;
 border: 2px solid #FFB74D;
 border-radius: 20px;
 padding: 12px 40px;
 font-weight: bold;
 display: inline-flex;
 align-items: center;
 justify-content: center;
 gap: 10px;
 box-shadow: 0 4px 8px rgba(0,0,0,0.1);
 transition: all 0.2s ease;
font-size: 1rem; 
white-space: nowrap;
 &:hover {
   transform: translateY(-2px);
   background: #FFF8E1;
   box-shadow: 0 6px 12px rgba(255,183,77,0.2);
 }

 svg {
   font-size:100px;
   color: #FFB74D;
 }

 @media (max-width: 768px) {
   width: 220px;
   height: 50px;
   margin: 8px;
   font-size: 0.9rem;
 }
`;

const MainSubContainer = styled.div`
    width: 80%;
`;

const SearchButtonContainer = styled.div`
    width: 80%;
    display: flex;
    margin: 20px 0 10px 0;
`;
const TitleContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
    @media (max-width: 768px) {
        font-size: 0.7rem;
    }
`;



interface Book {
    bookId: number;
    cover: string;
    title: string;
    author: string;
}

const MainPage = () => {
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const bookService = BookService();
    const [bookList, setBookList] = useState<Book[]>([]);

    const handleSearch = () => {
        if (search.trim()) navigate(PAGE_URL.Search, { state: { search } });
    };

    const getBookList = async () => {
        const data = await bookService.book()
            .then((res) => setBookList(res.result.books));
        return data;
    }

    useEffect(() => {
        getBookList();
    }, []);

    return (
        <MainContainer>
            <InfoHeader type="나만의 동화 만들기" />
            <SearchButtonContainer>
                <Search value={search} change={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)} onSearch={handleSearch}/>
            </SearchButtonContainer>
            <MainSubContainer>
                <BookList title="다른 친구들은 어떤 책으로 만들었을까?" bookList={
                    bookList.map((book) => ({
                        bookId: book.bookId,
                        title: book.title,
                        author: book.author,
                        cover: book.cover
                    }))
                } /> 
            </MainSubContainer>
            <MainSubContainer>
            <TitleContainer>
                <div>
                    <h1>나만의 동화를 만들고 싶어요!</h1>
                </div>
            </TitleContainer>
            <ButtonContainer>
 <StyledButton onClick={() => navigate(PAGE_URL.SelectBook)}>
   <SlMagicWand />
   동화 만들러 가기
 </StyledButton>
 <StyledButton>
   <FaBookOpen />
   이어서 만들래요!
 </StyledButton>
</ButtonContainer>
            </MainSubContainer>
            <div style={{height: "140px"}}></div>
        </ MainContainer>
    )
};

export default MainPage;