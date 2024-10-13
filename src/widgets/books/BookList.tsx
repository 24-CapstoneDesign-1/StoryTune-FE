import styled from "@emotion/styled";
import { Book } from "@/entities";

const TitleContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const BookListContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;
interface BookListProps {
    title: string;
    createdAt: string;
    photo: string;
}

export const BookList = ( {title, bookList}
    : {
        title: string,
        bookList: BookListProps[]
    }
) => {
    return (
        <div>
            <TitleContainer>
                <h1>{title}</h1>
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