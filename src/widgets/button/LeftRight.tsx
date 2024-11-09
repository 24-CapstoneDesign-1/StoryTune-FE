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
`;

interface LeftRightProps {
    progress: number;
    setProgress: Dispatch<SetStateAction<number>>;
}
export const LeftRight = ({progress, setProgress}: LeftRightProps) => {
    const navigate = useNavigate();
    return (
        <ButtonContainer>
            {progress === 0 ? (
                <>
                    <LeftButton visibility={"hidden"}/>
                    <RightButton onClick={() => setProgress(progress+1)}/>
                </>
            ) : (progress === 29 ? (
                <>
                    <LeftButton onClick={() => setProgress(progress-1)}/>
                    <RightButton onClick={() => navigate(PAGE_URL.Title)}/>
                </>
            ) : (
                <>
                    <LeftButton onClick={() => setProgress(progress-1)}/>
                    <RightButton onClick={() => setProgress(progress+1)}/>
                </>
            ))}
        </ButtonContainer>
    )
};
