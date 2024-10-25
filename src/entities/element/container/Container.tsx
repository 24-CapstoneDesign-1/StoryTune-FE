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
        width: 180px;
        height: 270px;
    }
`;
const ImageContainer = styled.img`
    width: 220px;
    height: 75%;
    object-fit: cover;
    border-radius: 10px;
    @media (max-width: 768px) {
        width: 145px;
        height: 200px;
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

export const MainContainer = styled.div`
    background-color: #FFFCAD;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
`;
export const InputContainer = styled.input`
    width: 300px;
    height: 30px;
    padding-left: 15px;
    padding-right: 45px;
    border-radius: 30px;
    border: 1px solid gray;
    box-shadow: 3px 3px 5px gray;
    outline: none;
    @media (max-width: 768px) {
        width: 230px;
        height: 40px;
    }
`;