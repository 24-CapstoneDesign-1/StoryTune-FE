import { LeftRight, InfoHeader } from "@/widgets";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PAGE_URL } from "@/shared";
import { Button, SquareButton, CircleButton, MainContainer} from "@/entities";
import { LeftButton, RightButton } from "@/entities";

const FriendPlayPage = () => {
    const navigate = useNavigate();
    const [bookList] = useState([
        { title: "피노키오", createdAt: "2024.01.02", photo: "pinocchio-cover.jpg" },
        { title: "피노키오", createdAt: "2024.01.02", photo: "pinocchio-cover.jpg" },
        { title: "피노키오", createdAt: "2024.01.02", photo: "pinocchio-cover.jpg" },
        { title: "피노키오", createdAt: "2024.01.02", photo: "pinocchio-cover.jpg" },
    ]);

    return (
        <>
            <MainContainer>
            <InfoHeader type="역할 놀이" />
                       
              <section>
                    <h2 style={{ marginLeft: '1rem' }}>어떤 책이 좋을까요?</h2>
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
            
            </MainContainer>
        </>
    );
};

export default FriendPlayPage;
