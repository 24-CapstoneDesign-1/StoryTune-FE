import { InfoHeader } from "@/widgets";
import { useEffect, useState } from "react";
import { MainContainer, SquareButton, Loading } from "@/entities";
import { useNavigate, useLocation } from "react-router-dom";
import { PAGE_URL, BookService } from "@/shared";
import styled from "@emotion/styled";
import { FaArrowRight } from "react-icons/fa"; // React Icon 추가

const BookGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  padding: 1.5rem 1rem;
  justify-content: center;
`;

const BookCard = styled.div`
  background-color: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;
  width: 250px;  // 고정 너비 설정
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
  }
`;

const BookImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-bottom: 2px solid #ddd;
`;

const BookInfo = styled.div`
  padding: 1rem;
  text-align: center;
`;

const BookTitle = styled.h3`
  font-size: 1.2rem;
  color: #333;
  margin-bottom: 0.5rem;
`;

const BookDate = styled.p`
  color: #888;
  font-size: 0.9rem;
  margin-bottom: 1.2rem;
`;

const StyledSquareButton = styled(SquareButton)`
  width: 100%;
  height: 50px;
 background-color: #FFB74D;
 color: white;
 font-size: 1rem;
 padding: 0.1rem 0.1rem;
 border-radius: 15px;
 border: none;
 box-shadow: 0 2px 4px rgba(255, 183, 77, 0.2);
 transition: all 0.2s ease;
 display: flex;
 align-items: center;
 gap: 0.3rem;

 &:hover {
   transform: scale(1.03);
   background-color: #FFA726;
   box-shadow: 0 3px 6px rgba(255, 183, 77, 0.3);
 }

 svg {
   font-size: 0.9rem;
 }
`;

interface Book {
  myBookId: number;
  cover: string;
  title: string;
  updatedAt: string;
}

const RolePlayBookPage = () => {
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
      console.log('roleplay: ', roomId, myBookId);
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
      <h2 style={{ margin: '2rem 1rem', fontSize: '1.5rem', color: '#5d4037' }}>어떤 책으로 역할놀이를 할까요?</h2>
      <BookGrid>
        {books.map((book) => (
          <BookCard key={book.myBookId}>
            <BookImage src={book.cover} alt={book.title} />
            <BookInfo>
              <BookTitle>{book.title}</BookTitle>
              <BookDate>{book.updatedAt}</BookDate>
              <StyledSquareButton onClick={() => handleBookSelect(book.myBookId)}>
                <FaArrowRight size={18} style={{ marginRight: '0.5rem' }} />
                선택하기
              </StyledSquareButton>
            </BookInfo>
          </BookCard>
        ))}
      </BookGrid>
    </MainContainer>
  );
};

export default RolePlayBookPage;
