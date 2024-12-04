import { Book, MainContainer, Search } from "@/entities";
import { PAGE_URL } from "@/shared";
import { BookService } from "@/shared/hooks/services/BookService";
import { useBookStore } from "@/shared/hooks/stores/useBookStore";
import { InfoHeader } from "@/widgets";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { FaPlay } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const MainSubContainer = styled.div`
    width: 80%;
`;

const TitleContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
    width: 100%;
    @media (max-width: 768px) {
        font-size: 0.7rem;
    }
`;


interface Book {
    bookId: number;
    cover: string;
    title: string;
    author?: string;
    createdAt?: string;
}
const SelectBookPage = () => {
    const bookService = BookService();
    const getBookList = async () => {
        const data = await bookService.book()
            .then((res) => setBookList(res.result.books));
        return data;
    }

    useEffect(() => {
        getBookList();
    }, []);
    const [bookList, setBookList] = useState<Book[]>([]);
    return (
        <MainContainer>
            <InfoHeader type="나만의 동화 만들기" />
            <MainSubContainer>
                <SelectBookList title="동화책을 선택해 주세요!" bookList={bookList}/>
            </MainSubContainer>
            <div style={{height: "140px"}}></div>
        </MainContainer>
    )
}

export default SelectBookPage;

const SubTitleContainer = styled.div`
    width: 80%;
    margin-bottom: 10px;
`;

const BookListContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    flex-wrap: wrap;
    white-space: nowrap;
    padding-bottom: 10px;
`;

const NewButtonContainer = styled.div`
    display: flex;
    justify-content: space-evenly;
    margin-top: 20px;
    font-weight: bold;
    @media (max-width: 768px) {
        align-items: center;
        margin-bottom: 20px;
    }
`;

const PlayButton = styled(FaPlay)`
    margin-left: 10px;
`;

const TitleSubContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 120%;
`;

interface Book {
    bookId: number;
    cover: string;
    title: string;
    author?: string;
    createdAt?: string;

}

interface newBook {
    request: {
        bookId: number | null;
    }
}
const SelectBookList = ( {title, bookList}
    : {
        title: string,
        subTitle?: string,
        bookList: Book[]
    }
) => {
    const bookService = BookService();
    const navigate = useNavigate();
    const bookStore = useBookStore();
    const [search, setSearch] = useState("");
    const handleSearch = () => {
        if (search.trim()) navigate(PAGE_URL.Search, { state: { search } });
    };

    const clickEvent = (bookId: number) => {
        myBook({ request: { bookId: bookId } })
        bookStore.setBookId(bookId);
    };
    const myBook = async (body: newBook) => {
        const data = await bookService.newMakeBook(body)
            .then((res) => {
                bookStore.setBookId(res.result.myBookId);
                navigate(PAGE_URL.Topic, { state: { bookId: res.result.myBookId } });
            });
        return data;
    }
    return (
        <div>
            <TitleContainer>
                <SubTitleContainer>
                    <TitleSubContainer>
                        <h1>{title}</h1>
                        <NewButtonContainer onClick={() => {
                            myBook({ request: { bookId: null } });
                        }}>
                            새로 만들기
                            <PlayButton />
                        </NewButtonContainer>
                    </TitleSubContainer>
                    <Search value={search} change={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)} onSearch={handleSearch}/>
                </SubTitleContainer>
            </TitleContainer>
            <BookListContainer>
                {bookList.map((book, index) => (
                    index < 4 ? (
                        <Book key={index} {...book} clickEvent={() => clickEvent(book.bookId)} />
                    ) : null
                ))}
            </BookListContainer>
        </div>
    );
};