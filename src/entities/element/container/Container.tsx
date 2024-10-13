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
    width: 200px;
    height: 300px;
`;
const ImageContainer = styled.img`
    width: 100%;
    height: 75%;
    object-fit: cover;
    border-radius: 10px;
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
    title,
    createdAt,
    photo,
}: {
    title: string;
    createdAt: string;
    photo: string;
}) => {
    return (
        <BookContainer>
            <ImageContainer src={photo} />
            <InfoContainer>
                <TitleContainer>{title}</TitleContainer>
                <CreatedContainer>{createdAt}</CreatedContainer>
            </InfoContainer>
        </BookContainer>
    );
};