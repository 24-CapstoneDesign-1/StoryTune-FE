import { Book, Button, MainContainer, Search } from "@/entities";
import { PAGE_URL } from "@/shared";
import { BookList, InfoHeader } from "@/widgets";
import styled from "@emotion/styled";
import { useState } from "react";
import { FaPlay } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

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

const SelectBookPage = () => {
    const navigate = useNavigate();
    const [bookList, setBookList] = useState([
        {"title": "피노키오", "createdAt": "2021-10-01", "photo": "../public/images/temp.svg"},
        {"title": "피노키오", "createdAt": "2021-10-01", "photo": "../public/images/temp.svg"},
        {"title": "피노키오", "createdAt": "2021-10-01", "photo": "../public/images/temp.svg"},
        {"title": "피노키오", "createdAt": "2021-10-01", "photo": "../public/images/temp.svg"},
    ]);
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
    justify-content: space-evenly;
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
    width: 330px;
`;

interface BookListProps {
    title: string;
    createdAt: string;
    photo: string;
}

const SelectBookList = ( {title, bookList}
    : {
        title: string,
        subTitle?: string,
        bookList: BookListProps[]
    }
) => {
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const handleSearch = () => {
        if (search.trim()) navigate(PAGE_URL.Search, { state: { search } });
    };

    const clickEvent = () => {
        navigate(PAGE_URL.Topic);
    };
    return (
        <div>
            <TitleContainer>
                <SubTitleContainer>
                    <TitleSubContainer>
                        <h1>{title}</h1>
                        <NewButtonContainer onClick={() => navigate(PAGE_URL.BookPhoto)}>
                            새로 만들기
                            <PlayButton />
                        </NewButtonContainer>
                    </TitleSubContainer>
                    <Search value={search} change={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)} onSearch={handleSearch}/>
                </SubTitleContainer>
            </TitleContainer>
            <BookListContainer>
                {bookList.map((book, index) => (
                    <Book key={index} {...book} clickEvent={clickEvent} />
                ))}
            </BookListContainer>
        </div>
    );
};