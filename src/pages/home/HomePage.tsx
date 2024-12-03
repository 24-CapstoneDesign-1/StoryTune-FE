import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthService, PAGE_URL, useUserStore } from "@/shared";
import { FaSearch, FaBookOpen, FaPlus, FaMask, FaPencilAlt } from "react-icons/fa";
import styled from "@emotion/styled";

const PageContainer = styled.div`
  background-color: #fff9c4;
  min-height: 100vh;
  padding: 1.5rem;
  font-family: "Roboto", sans-serif;
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 2rem;

  h1 {
    font-size: 2rem;
    color: #5d4037;
    margin-bottom: 0.5rem;
  }

  p {
    font-size: 1rem;
    color: #5d4037;
  }
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;

  input {
    flex: 1;
    padding: 0.8rem;
    border: 2px solid #ffcc80;
    border-radius: 25px;
    font-size: 1rem;
    margin-right: 1rem;
    background-color: #fffde7;
  }

  button {
    background-color: #ff8a65;
    color: #fff;
    border: none;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
`;

const Section = styled.section`
  margin-bottom: 2rem;
`;

const CardContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 2rem;
`;

const Card = styled.div`
  text-align: center;
  background-color: #fffde7;
  border-radius: 16px;
  padding: 1rem;
  width: 100px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;

  p {
    margin-top: 0.5rem;
    font-size: 0.9rem;
    color: #5d4037;
  }
`;

const BookListContainer = styled.div`
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  padding-bottom: 1rem;
`;

const BookCard = styled.div`
  min-width: 150px;
  background-color: #fffde7;
  border-radius: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  overflow: hidden;

  img {
    width: 100%;
    height: 150px;
    object-fit: cover;
  }

  div {
    padding: 0.8rem;

    p {
      font-size: 1rem;
      font-weight: bold;
      color: #5d4037;
    }

    small {
      color: #757575;
    }
  }
`;

const HomePage = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [bookList, setBookList] = useState([
    { title: "피노키오", createdAt: "2024.01.02", photo: "pinocchio-cover.jpg" },
    { title: "피노키오", createdAt: "2024.01.02", photo: "pinocchio-cover.jpg" },
    { title: "피노키오", createdAt: "2024.01.02", photo: "pinocchio-cover.jpg" },
    { title: "피노키오", createdAt: "2024.01.02", photo: "pinocchio-cover.jpg" },
  ]);
  const authService = AuthService();
  const userStore = useUserStore();

  const user = async () => {
    await authService.userInfo()
    .then((res) => {
        userStore.setUsername(res.result.userId);
        userStore.setName(res.result.name);
        console.log(userStore.getUserAllInfo());
    })
  }

  useEffect(() => {
    user();
  }, []);
  const handleSearch = () => {
    if (search.trim()) navigate(PAGE_URL.Search, { state: { search } });
  };

  return (
    <PageContainer>
      <Header>
        <h1>동화 나라 🌟</h1>
        <p>나만의 동화책을 만들고 친구들과 읽어보세요!</p>
      </Header>

      <SearchContainer>
        <input
          type="text"
          placeholder="동화책 검색하기"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={handleSearch}>
          <FaSearch size={18} />
        </button>
      </SearchContainer>

      <Section>
        <CardContainer>
          <Card onClick={() => navigate(PAGE_URL.RolePlayMain)}>
            <FaMask size={32} color="#FF8A65" />
            <p>역할놀이</p>
          </Card>
          <Card onClick={() => navigate(PAGE_URL.BookMain)}>
            <FaPencilAlt size={32} color="#FF8A65" />
            <p>동화책 만들기</p>
          </Card>
          <Card onClick={() => navigate(PAGE_URL.Maked)}>
            <FaBookOpen size={32} color="#FF8A65" />
            <p>동화책 읽어보기</p>
          </Card>
        </CardContainer>
      </Section>

      <Section>
        <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem", color: "#5D4037" }}>내가 만든 책</h2>
        <BookListContainer>
          {bookList.map((book, index) => (
            <BookCard key={index}>
              <img src={book.photo} alt={book.title} />
              <div>
                <p>{book.title}</p>
                <small>{book.createdAt}</small>
              </div>
            </BookCard>
          ))}
        </BookListContainer>
      </Section>
    </PageContainer>
  );
};

export default HomePage;
