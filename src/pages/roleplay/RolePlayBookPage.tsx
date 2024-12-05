import { InfoHeader } from "@/widgets";
import { useEffect, useState } from "react";
import { MainContainer, SquareButton, Loading } from "@/entities";
import { useNavigate, useLocation } from "react-router-dom";
import { PAGE_URL, BookService } from "@/shared";
import styled from "@emotion/styled";

const BookGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 2rem;
  padding: 1rem;
`;

const BookCard = styled.div`
  background-color: #FFFFFF;
  border-radius: 12px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.2s;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const BookImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const BookInfo = styled.div`
  padding: 1rem;
  text-align: center;
`;

const BookTitle = styled.h3`
  margin: 0.5rem 0;
  color: #333;
`;

const BookDate = styled.p`
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 1rem;
`;

interface Book {
  myBookId: number;
  cover: string;
  title: string;
  updatedAt: string;
}

const FriendPlayPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const bookService = BookService();
  const roomId = location.state?.rolePlayingRoomId;

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setIsLoading(true);
        const response = await bookService.myBook();
        if (response?.result?.myBooks) {
          setBooks(response.result.myBooks);
        }
      } catch (error) {
        console.error('Failed to fetch books:', error);
        setError('책 목록을 불러오는데 실패했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const handleBookSelect = async (myBookId: number) => {
    try {
      // 새로운 책 생성


      console.log('roleplay: ', roomId, myBookId);
      // 역할놀이 방으로 이동
      navigate(PAGE_URL.SelectRole, {
        state: {
          rolePlayingRoomId: roomId,
          myBookId: myBookId,
          pageNum: 1
        }
      });
    } catch (error) {
      console.error('Failed to create new book:', error);
      setError('책 생성에 실패했습니다.');
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <MainContainer>
      <InfoHeader type="역할 놀이" />
      <h2 style={{ margin: '2rem 1rem' }}>어떤 책으로 역할놀이를 할까요?</h2>
      <BookGrid>
        {books.map((book) => (
          <BookCard key={book.myBookId}>
            <BookImage src={book.cover} alt={book.title} />
            <BookInfo>
              <BookTitle>{book.title}</BookTitle>
              <BookDate>{book.updatedAt}</BookDate>
              <SquareButton onClick={() => handleBookSelect(book.myBookId)}>
                선택하기
              </SquareButton>
            </BookInfo>
          </BookCard>
        ))}
      </BookGrid>
    </MainContainer>
  );
};

export default FriendPlayPage;
