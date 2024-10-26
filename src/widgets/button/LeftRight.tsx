import { LeftButton, RightButton } from "@/entities";
import styled from "@emotion/styled";
import { Dispatch, SetStateAction } from "react";

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
    return (
        <ButtonContainer>
            <LeftButton onClick={() => setProgress(progress-1)}/>
            <RightButton onClick={() => setProgress(progress+1)}/>
        </ButtonContainer>
    )
};
