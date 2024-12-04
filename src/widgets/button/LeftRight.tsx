import { LeftButton, RightButton } from "@/entities";
import { PAGE_URL } from "@/shared";
import styled from "@emotion/styled";
import { Dispatch, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";

const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-between;
    width: 30%;
    font-size: 2rem;
    margin-top: 40px;
    @media (max-width: 768px) {
        margin-top: 0px;
    }
`;

const PageContainer = styled.div`
    display: flex;
    justify-content: center;
    font-size: 1rem;
    margin-top: 7px;
    font-weight: bold;
`;

interface LeftRightProps {
    progress: number;
    setProgress: Dispatch<SetStateAction<number>>;
    pageNum: number;
}
export const LeftRight = ({progress, setProgress, pageNum}: LeftRightProps) => {
    const navigate = useNavigate();
    return (
        <ButtonContainer>
            {progress === 0 ? (
                <>
                    <LeftButton visibility={"hidden"}/>
                    <PageContainer>
                        {Math.floor(progress / 3) + 1}
                    </PageContainer>
                    <RightButton onClick={() => setProgress(progress+1)}/>
                </>
            ) : ((progress + 1) / 3 === pageNum ? (
                <>
                    <LeftButton onClick={() => setProgress(progress-1)}/>
                    <PageContainer>
                        {Math.floor(progress / 3) + 1}
                    </PageContainer>
                    <RightButton onClick={() => navigate(PAGE_URL.Index)}/>
                </>
            ) : (
                <>
                    <LeftButton onClick={() => setProgress(progress-1)}/>
                    <PageContainer>
                        {Math.floor(progress / 3) + 1}
                    </PageContainer>
                    <RightButton onClick={() => setProgress(progress+1)}/>
                </>
            ))}
        </ButtonContainer>
    )
};

export const PageOffset = ({pageNum, page, setPage}: {pageNum: number, page : number; setPage :  Dispatch<SetStateAction<number>>}) => {
    return (
        <ButtonContainer>
            {(page === 1) && (1 !== pageNum) ? (
                <>
                    <LeftButton visibility={"hidden"}/>
                    <PageContainer>
                        {page}
                    </PageContainer>
                    <RightButton onClick={() => setPage(page)}/>
                </>
            ) : ((page === pageNum) && (1 !== pageNum) ? (
                <>
                    <LeftButton onClick={() => setPage(page-2)}/>
                    <PageContainer>
                        {page}
                    </PageContainer>
                    <RightButton visibility={"hidden"}/>
                </>
            ) : (
                pageNum === 1 ? (
                    <>
                        <LeftButton visibility={"hidden"}/>
                            <PageContainer>
                                {page}
                            </PageContainer>
                        <RightButton visibility={"hidden"}/>
                    </>
                ):(
                    <>
                        <LeftButton onClick={() => setPage(page-2)}/>
                        <PageContainer>
                            {page}
                        </PageContainer>
                        <RightButton onClick={() => setPage(page)}/>
                    </>
                )
            ))}
        </ButtonContainer>
    )
};