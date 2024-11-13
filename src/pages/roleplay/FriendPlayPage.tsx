import { LeftRight, InfoHeader } from "@/widgets";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PAGE_URL } from "@/shared";
import { Button, SquareButton, CircleButton} from "@/entities";
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
            <InfoHeader type="역할놀이" />
            <div style={{ padding: "1rem", backgroundColor: "#FFEB3B;" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem" }}>
                    <div>
                        <h2>어떤 책이 좋을까요?</h2>
                        <p>함께 하는 친구들</p>
                        <div style={{ display: "flex", gap: "0.5rem" }}>
                            {["지혜", "", "", ""].map((friend, index) => (
                                <CircleButton key={index}>
                                    <span>{friend}</span>
                                </CircleButton>
                            ))}
                        </div>
                    </div>
                    <Button 
                        onClick={() => navigate(PAGE_URL.SelectRole)} //역할놀이 페이지로
                        width="150px"
                        height="50px"
                    >
                    </Button>
                </div>

                {/* 내가 만든 동화책 섹션 */}
                <section style={{ marginTop: "2rem" }}>
                    <h2 style={{ marginLeft: "1rem" }}>내가 만든 동화책으로 할래요!</h2>
                    <div style={{ display: "flex", gap: "1rem", padding: "1rem", overflowX: "auto" }}>
                        {bookList.map((book, index) => (
                            <SquareButton key={index} width="150px" height="150px">
                                <img src={book.photo} alt={book.title} style={{ width: "100%", borderRadius: "8px 8px 0 0" }} />
                                <p>{book.title}</p>
                                <small>{book.createdAt}</small>
                            </SquareButton>
                        ))}
                        <SquareButton width="100px" height="150px">
                            + 더보기
                        </SquareButton>
                    </div>
                </section>
            </div>
        </>
    );
};

export default FriendPlayPage;
