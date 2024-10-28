import { CiRedo } from "react-icons/ci";
import { FaPlay } from "react-icons/fa";
import styled from "@emotion/styled";

const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-around;
    margin: 20px 0;
    width: 80%;
`;
const ButtonSubContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    font-weight: bold;
`;
const ReButton = styled(CiRedo)`
    font-size: 2rem;
`;
const PlayButton = styled(FaPlay)`

`;
interface RerollplayProps {
    onReroll: () => void;
    onPlay: () => void;
}
export const Rerollplay = ({ onReroll, onPlay }: RerollplayProps) => {
    return (
        <ButtonContainer> 
            <ButtonSubContainer onClick={onReroll}>
                <ReButton />
                다시 고르고 싶어요
            </ButtonSubContainer>
            <ButtonSubContainer onClick={onPlay}>
                <PlayButton />
                다 골랐어요!
            </ButtonSubContainer>
        </ButtonContainer>
    )
}
