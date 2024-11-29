import { InfoHeader, BookList } from "@/widgets";
import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Button, Search, MainContainer } from "@/entities";
import { PAGE_URL } from "@/shared";
import { useNavigate } from "react-router-dom";
import { BookService } from "@/shared/hooks/services/BookService";

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

const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-evenly;
    margin-top: 20px;
    @media (max-width: 768px) {
        flex-direction: column;
        align-items: center;
    }
`;

const CustomButton = styled(Button)`
    color: black;
    background-color: #FFFFFF;
    font-weight: bold;
    border-radius: 15px;
    @media (max-width: 768px) {
        font-size: 1rem;
        width: 230px;
        height: 50px;
        margin: 10px;
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
                    <CustomButton width="250px" height="70px" onClick={() => navigate(PAGE_URL.SelectBook)}>동화 만들러 가기</CustomButton>
                    <CustomButton width="250px" height="70px">이어서 만들래요!</CustomButton>
                </ButtonContainer>
            </MainSubContainer>
            <div style={{height: "140px"}}></div>
        </ MainContainer>
    )
};

export default MainPage;