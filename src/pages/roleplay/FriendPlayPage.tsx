import { LeftRight, InfoHeader } from "@/widgets";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PAGE_URL } from "@/shared";
import { Button, SquareButton, CircleButton, MainContainer} from "@/entities";
import { LeftButton, RightButton } from "@/entities";
import styled from '@emotion/styled';

const NextButton = styled(SquareButton)`
    margin-left : 450px;
    margin-top : 50px;
    font-size : 15px;
    height: 7vh;
    width : 30vh;
    background-color: #f5f5f5;
`;


const SubCircleButton = styled(CircleButton)`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 90px;
    height: 90px;
    font-size: 0.9rem;
    font-weight: bold;
    margin-right: 0.5rem; 
`;

const SubContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 20px;
    height: 100vh;
   
`;

const FriendsContainer = styled.div`
    display: flex;
    gap: 0.5rem;
    margin-top: 1rem;
`;

const FriendPlayPage = () => {
    const navigate = useNavigate();
    const [bookList] = useState([
        { title: "피노키오", createdAt: "2024.01.02", photo: "pinocchio-cover.jpg" },
        { title: "피노키오", createdAt: "2024.01.02", photo: "pinocchio-cover.jpg" },
        { title: "피노키오", createdAt: "2024.01.02", photo: "pinocchio-cover.jpg" },
        { title: "피노키오", createdAt: "2024.01.02", photo: "pinocchio-cover.jpg" },
    ]);

    const friends = ["김가현", "김나현", "강지혜"];

    return (
        <>
            <MainContainer>
            <InfoHeader type="역할 놀이" />
                <SubContainer>
                <section>
                <h2 style={{ marginLeft: '1rem' }}>어떤 책이 좋을까요?</h2>
                <h3 style={{ marginLeft: '1rem' }}>함께 하는 친구들</h3>
                <FriendsContainer>
                        {friends.map((friend) => (
                            <SubCircleButton key={friend}>
                                {friend}
                            </SubCircleButton>
                        ))}
                    </FriendsContainer>
                    </section>
                
                
                <section>
                    <h2 style={{ marginLeft: '1rem' }}>내가 만든 동화책으로 할래요!</h2>
                    <div style={{ display: 'flex', gap: '1rem', padding: '1rem', overflowX: 'auto' }}>
                        {bookList.map((book, index) => (
                            <div key={index} style={{ minWidth: '150px', textAlign: 'center', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '8px', backgroundColor: '#FFF' }}>
                                <img src={book.photo} alt={book.title} style={{ width: '100%', borderRadius: '8px 8px 0 0' }} />
                                <p>{book.title}</p>
                                <small>{book.createdAt}</small>
                            </div>
                        ))}
                    </div>
                </section>
                <section>
                    <h2 style={{ marginLeft: '1rem' }}>기존 동화책으로 할래요!</h2>
                    <div style={{ display: 'flex', gap: '1rem', padding: '1rem', overflowX: 'auto' }}>
                        {bookList.map((book, index) => (
                            <div key={index} style={{ minWidth: '150px', textAlign: 'center', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '8px', backgroundColor: '#FFF' }}>
                                <img src={book.photo} alt={book.title} style={{ width: '100%', borderRadius: '8px 8px 0 0' }} />
                                <p>{book.title}</p>
                                <small>{book.createdAt}</small>
                            </div>
                        ))}
                    </div>
                </section>
                <NextButton onClick={() => navigate(PAGE_URL.RolePlay)}>역할 놀이 하러 가기</NextButton>
            </SubContainer>
            </MainContainer>
        </>
    );
};

export default FriendPlayPage;
