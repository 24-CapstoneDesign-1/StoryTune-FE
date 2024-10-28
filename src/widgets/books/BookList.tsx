import styled from "@emotion/styled";
import { Book } from "@/entities";

const TitleContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    @media (max-width: 768px) {
        font-size: 0.7rem;
    }
`;

const BookListContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    width: 100%;
    overflow-x: auto;
    overflow-y: hidden;
    white-space: nowrap;
    padding-bottom: 10px;
`;
const SearchBookListContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    white-space: nowrap;
    flex-wrap: wrap;
    padding-bottom: 10px;
`;
const SubTitleContainer = styled.div`
    width: 80%;
`;
interface BookListProps {
    title: string;
    createdAt: string;
    photo: string;
}

export const BookList = ( {title, subTitle, bookList}
    : {
        title: string,
        subTitle?: string,
        bookList: BookListProps[]
    }
) => {
    return (
        <div>
            <TitleContainer>
                <SubTitleContainer>
                    <h1>{title}</h1>
                    <h3>{subTitle}</h3>
                </SubTitleContainer>
                + 더보기
            </TitleContainer>
            <BookListContainer>
                {bookList.map((book, index) => (
                    <Book key={index} {...book} />
                ))}
            </BookListContainer>
        </div>
    );
};

export const SearchBookList = ( {title, bookList} : {
    title: string,
    bookList: BookListProps[]
}) => {
    return (
        <>
            <TitleContainer>
                <SubTitleContainer>
                    <h1>{title}</h1>
                </SubTitleContainer>
            </TitleContainer>
            <SearchBookListContainer>
                {bookList.map((book, index) => (
                    <Book key={index} {...book} />
                ))}
            </SearchBookListContainer>
        </>
    );
};