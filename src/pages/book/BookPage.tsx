import { MainContainer, Title } from "@/entities";
import { BookService } from "@/shared/hooks/services/BookService";
import { InfoHeader, LeftRight } from "@/widgets";
import { PageOffset } from "@/widgets/button/LeftRight";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";

const SubContainer = styled.div`
    display: flex;
    justify-content: space-between;
    width: 90%;
    height: 90vh;
    @media (max-width: 768px) {
        flex-direction: column;
        height: 100%;
        width: 100%;
    }
`;

const CustomTitle = styled(Title)`
    font-size: 1.8rem;
    margin-top: 20px;
    padding: 0px 20px 0px 20px;
    @media (max-width: 768px) {
        font-size: 1.4rem;
        margin-top: 0px;
    }
`;
const CustomSubTitle = styled(Title)`
    font-size: 1rem;
    font-weight: normal;
    padding: 0px 20px 0px 20px;
    @media (max-width: 768px) {
        font-size: 1.4rem;
        margin-top: 0px;
    }
`;

const PhotoContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 90vh;
    align-items: center;
    @media (max-width: 768px) {
        height: 100%;
        margin-top: 20px;
    }
`;

const Photo = styled.img`
    width: 400px;
    height: 400px;
    margin-top: 20px;
    margin-bottom: 20px;
    @media (max-width: 768px) {
        margin-top: 0px;
    }
`;
const DescriptionContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 10px;
    width: 100%;
    height: 90%;
    border: 0.5px solid #000000;
    margin-top: 50px;
    border-radius: 20px;
    background-color: #FFFFFF;
    box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.3);
`;


const BookPage = (myBookId: number) => {
    const [book, setBook] = useState({
        myBookContentId: 0,
        image: "",
        previousContent: "",
    });
    const [page, setPage] = useState<number>(1);
    const bookService = BookService();

    useEffect(() => {
        getDetail();
    }, [page]);

    const getDetail = async () => {
        const data = await bookService.myMakedBook(myBookId, page);
        setBook(data.result);
        return data;
    }
    return (
        <MainContainer>
            {/* <InfoHeader type="내가 만든 동화" />
            <SubContainer>
                <PhotoContainer>
                    <CustomTitle>{book.}</CustomTitle>
                    <CustomSubTitle>{book.createdAt}</CustomSubTitle>
                    <Photo src={book.images[page]} />
                    <PageOffset page={page} setPage={setPage}/>
                </PhotoContainer>
                <DescriptionContainer>
                    {book.description}
                </DescriptionContainer>
            </SubContainer>
            <div style={{height: "100px"}}></div> */}
        </MainContainer>
    )
}
export default BookPage;