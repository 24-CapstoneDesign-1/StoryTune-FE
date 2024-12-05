import { Book, MainContainer, Search } from "@/entities";
import { PAGE_URL } from "@/shared";
import { BookService } from "@/shared/hooks/services/BookService";
import { useBookStore } from "@/shared/hooks/stores/useBookStore";
import { InfoHeader } from "@/widgets";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { SlMagicWand } from "react-icons/sl";

const MainSubContainer = styled.div`
 width: 90%;
 max-width: 1200px;
 margin: 0 auto;
 padding: 2rem;
`;

const TitleContainer = styled.div`
 text-align: center;
 margin-bottom: 3rem;
 
 h1 {
   font-size: 2rem;
   color: #5D4037;
   margin-bottom: 1rem;
 }
`;

const SearchContainer = styled.div`
 display: flex;
 align-items: center;
 gap: 1rem;
 max-width: 600px;
 margin: 0 auto;
 
 input {
   flex: 1;
   padding: 0.8rem 1.5rem;
   border: 2px solid;
   border-radius: 30px;
   font-size: 1rem;
   background: #FFF8E1;
   
   &:focus {
     outline: none;
     border-color: #FF9800;
   }
 }
`;

const BookListContainer = styled.div`
 display: grid;
 grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
 gap: 2rem;
 margin-top: 3rem;
`;

const BookCard = styled.div`
 background: white;
 border-radius: 20px;
 overflow: hidden;
 box-shadow: 0 4px 15px rgba(0,0,0,0.1);
 transition: transform 0.3s ease;
 cursor: pointer;

 &:hover {
   transform: translateY(-5px);
 }
`;

const BookImage = styled.img`
 width: 100%;
 height: 300px;
 object-fit: cover;
`;

const BookInfo = styled.div`
 padding: 1.5rem;
 
 h3 {
   font-size: 1.2rem;
   color: #5D4037;
   margin-bottom: 0.5rem;
 }
 
 p {
   color: #795548;
   font-size: 0.9rem;
 }
`;

const NewBookButton = styled.button`
 display: flex;
 align-items: center;
 gap: 0.5rem;
 padding: 1rem 2rem;
 background: #FFB74D;
 color: white;
 border: none;
 border-radius: 30px;
 font-size: 1.1rem;
 font-weight: bold;
 cursor: pointer;
 transition: all 0.2s ease;
 box-shadow: 0 4px 10px rgba(255,183,77,0.3);

 &:hover {
   background: #FF9800;
   transform: translateY(-2px);
 }

 svg {
   font-size: 1.2rem;
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
        myBook({ request: { bookId: bookId } });
        bookStore.setBookId(bookId);
        navigate(PAGE_URL.Topic, { state: { bookId: bookId } });
    };
    const myBook = async (body: newBook) => {
        const data = await bookService.newMakeBook(body)
            .then((res) => {
                bookStore.setBookId(res.result.myBookId);
                navigate(PAGE_URL.BookPhoto, { state: { bookId: res.result.myBookId } });
            });
        return data;
    }
    return (
        <MainSubContainer>
          <TitleContainer>
            <h1>{title}</h1>
            <SearchContainer>
              <input 
                type="text" 
                placeholder="동화책 검색하기..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <NewBookButton onClick={() => myBook({ request: { bookId: null } })}>
                <SlMagicWand />
                새로운 동화 만들기
              </NewBookButton>
            </SearchContainer>
          </TitleContainer>
          
          <BookListContainer>
            {bookList.map((book, index) => (
              <BookCard key={index} onClick={() => clickEvent(book.bookId)}>
                <BookImage src={book.cover} alt={book.title} />
                <BookInfo>
                  <h3>{book.title}</h3>
                  <p>{book.author}</p>
                </BookInfo>
              </BookCard>
            ))}
          </BookListContainer>
        </MainSubContainer>
      );
     };
               