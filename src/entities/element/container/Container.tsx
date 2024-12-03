import styled from "@emotion/styled";

export const Title = styled.div`
    font-size: 3rem;
    font-weight: bold;
    margin-bottom: 20px;
    display: flex;
    justify-content: center;
`;

export const ValidInput = styled.div`
    font-size: 0.8rem;
    align-self: flex-start;
    color: red;
    margin-top: 5px;
    margin-left: 10px;
    margin-bottom: 20px;
`;

const BookContainer = styled.div`
    background-color: #FFFFFF;
    border: 1px solid black;
    border-radius: 10px;
    width: 220px;
    height: 400px;
    box-shadow: 5px 5px 5px gray;
    margin: 10px;
    @media (max-width: 768px) {
        width: 120px;
        height: 245px;
    }
`;
const ImageContainer = styled.img`
    width: 220px;
    height: 75%;
    object-fit: cover;
    border-radius: 10px;
    @media (max-width: 768px) {
        width: 123px;
        height: 170px;
    }
`;
const TitleContainer = styled.div`
    font-weight: bold;
`;
const CreatedContainer = styled.div`
    color: gray;
`;
const InfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 20%;
    padding: 10px;
`;
export const Book = ({
    bookId,
    title,
    createdAt,
    author,
    cover,
    clickEvent,
}: {
    bookId: number;
    title: string;
    createdAt?: string;
    author?: string;
    cover: string;
    clickEvent?: () => void;
}) => {
    return (
        <BookContainer onClick={clickEvent}>
            <ImageContainer src={cover} />
            <InfoContainer>
                <TitleContainer>{title}</TitleContainer>
                <CreatedContainer>{author ? author : createdAt}</CreatedContainer>
            </InfoContainer>
        </BookContainer>
    );
};

export const MainContainer = styled.div`
    background-color: #fff9c4;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
`;
export const InputContainer = styled.input`
    width: 300px;
    height: 40px;
    padding-left: 15px;
    padding-right: 45px;
    border-radius: 30px;
    border: 1px solid gray;
    box-shadow: 3px 3px 5px gray;
    outline: none;
    @media (max-width: 768px) {
        width: 240px;
        height: 40px;
    }
`;