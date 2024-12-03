import { MainContainer, SquareButton, Title } from "@/entities";
import { BookService } from "@/shared/hooks/services/BookService";
import { InfoHeader } from "@/widgets";
import { PageOffset } from "@/widgets/button/LeftRight";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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
    border-radius: 20px;
    @media (max-width: 768px) {
        margin-top: 0px;
        width: 300px;
        height: 300px;
    }
`;
const DescriptionContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 10px;
    width: 600px;
    height: 500px;
    border: 0.5px solid #000000;
    margin-top: 50px;
    border-radius: 20px;
    background-color: #FFFFFF;
    box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.3);
    white-space: pre-wrap;
    overflow-y: auto;
    @media (max-width: 768px) {
        width: 80%;
        height: 300px;
        margin: 20px 20px 0px 20px;
    }
`;

const DescriptionLargeContainer = styled.div`

`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-evenly;
    width: 100%;
    margin-top: 30px;

`;

const ButtonSubContainer = styled.div`
    display: flex;
    justify-content: space-between;

`;

const ButtonCustom = styled(SquareButton)`
    height: 60px;
    margin: 0px 10px 0px 10px;
    @media (max-width: 768px) {
        height: 40px;
    }
`;

const BookPage = () => {
    const [book, setBook] = useState([{
        pageNum: 0,
        image: "",
        content_scenario: "",
        content_story: "",
    }]);
    const [page, setPage] = useState<number>(0);
    const bookService = BookService();
    const params = useParams();
    const [isContent, setIsContent] = useState(true);
    const [title, setTitle] = useState("");
    const [createdAt, setCreatedAt] = useState("");
    const pageNum = book.length;
    useEffect(() => {
        getDetail();
    }, [page]);

    const getDetail = async () => {
        const id = Number(params.id);
        const data = await bookService.myBookDetail(id);
        console.log(data);
        setBook(data.result.details);
        setTitle(data.result.title);
        setCreatedAt(data.result.createdAt);
        return data;
    }
    return (
        <MainContainer>
            <InfoHeader type="내가 만든 동화" />
            <SubContainer>
                <PhotoContainer>
                    <CustomTitle>{title}</CustomTitle>
                    <CustomSubTitle>{createdAt}</CustomSubTitle>
                    <Photo src={book[page].image} />
                    <PageOffset pageNum={pageNum} page={page+1} setPage={setPage}/>
                </PhotoContainer>
                <DescriptionLargeContainer>
                    <ButtonContainer>
                        <ButtonSubContainer>
                            <ButtonCustom onClick={() => setIsContent(true)}>Content</ButtonCustom>
                            <ButtonCustom onClick={() => setIsContent(false)}>Senario</ButtonCustom>
                        </ButtonSubContainer>
                    </ButtonContainer>
                    <DescriptionContainer>
                        {isContent ? book[page].content_story : book[page].content_scenario}
                    </DescriptionContainer>
                </DescriptionLargeContainer>
            </SubContainer>
            <div style={{height: "100px"}}></div>
        </MainContainer>
    )
}
export default BookPage;