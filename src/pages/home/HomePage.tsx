import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PAGE_URL } from "@/shared";
import { FaSearch, FaBookOpen, FaPlus, FaMask, FaPencilAlt} from "react-icons/fa";

const HomePage = () => {
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const [bookList, setBookList] = useState([
        { title: "피노키오", createdAt: "2024.01.02", photo: "pinocchio-cover.jpg" },
        { title: "피노키오", createdAt: "2024.01.02", photo: "pinocchio-cover.jpg" },
        { title: "피노키오", createdAt: "2024.01.02", photo: "pinocchio-cover.jpg" },
        { title: "피노키오", createdAt: "2024.01.02", photo: "pinocchio-cover.jpg" },
    ]);

    const handleSearch = () => {
        if (search.trim()) navigate(PAGE_URL.Search, { state: { search } });
    };

    return (
        <div style={{ backgroundColor: "#FFF9C4", minHeight: "100vh", padding: "1.5rem", fontFamily: "'Roboto', sans-serif" }}>
            <header style={{ textAlign: "center", marginBottom: "2rem" }}>
                <h1 style={{ fontSize: "2rem", color: "#5D4037", marginBottom: "0.5rem" }}>동화 나라 🌟</h1> {/* 홈화면 이름 ..?  */}
                <p style={{ fontSize: "1rem", color: "#5D4037" }}>나만의 동화책을 만들고 친구들과 읽어보세요!</p>
            </header>

            <div style={{ display: "flex", alignItems: "center", marginBottom: "2rem" }}>
                <input
                    type="text"
                    placeholder="동화책 검색하기"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    style={{
                        flex: 1,
                        padding: "0.8rem",
                        border: "2px solid #FFCC80",
                        borderRadius: "25px",
                        fontSize: "1rem",
                        marginRight: "1rem",
                        backgroundColor: "#FFFDE7",
                    }}
                />
                <button
                    onClick={handleSearch}
                    style={{
                        backgroundColor: "#FF8A65",
                        color: "#FFF",
                        border: "none",
                        borderRadius: "50%",
                        width: "40px",
                        height: "40px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        cursor: "pointer",
                    }}
                >
                    <FaSearch size={18} />
                </button>
            </div>

            <section style={{ display: "flex", justifyContent: "space-around", marginBottom: "2rem" }}>
                {/* 역할놀이부분 */}
                <div
                    style={{
                        textAlign: "center",
                        backgroundColor: "#FFFDE7",
                        borderRadius: "16px",
                        padding: "1rem",
                        width: "100px",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                        cursor: "pointer",
                    }}
                    onClick={() => navigate(PAGE_URL.RolePlayMain)}
                >
                    <FaMask size={32} color="#FF8A65" />
                    <p style={{ marginTop: "0.5rem", fontSize: "0.9rem", color: "#5D4037" }}>역할놀이</p>
                </div>

                {/* 동화책 만들기 */}
                <div
                    style={{
                        textAlign: "center",
                        backgroundColor: "#FFFDE7",
                        borderRadius: "16px",
                        padding: "1rem",
                        width: "100px",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                        cursor: "pointer",
                    }}
                    onClick={() => navigate(PAGE_URL.BookMain)}
                >
                    <FaPencilAlt size={32} color="#FF8A65" />
                    <p style={{ marginTop: "0.5rem", fontSize: "0.9rem", color: "#5D4037" }}>동화책 만들기</p>
                </div>
                
                <div
                    style={{
                        textAlign: "center",
                        backgroundColor: "#FFFDE7",
                        borderRadius: "16px",
                        padding: "1rem",
                        width: "100px",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                        cursor: "pointer",
                    }}
                    onClick={() => navigate(PAGE_URL.Maked)}
                >
                    <FaBookOpen size={32} color="#FF8A65" />
                    <p style={{ marginTop: "0.5rem", fontSize: "0.9rem", color: "#5D4037" }}>동화책 읽어보기</p>
                </div>
            </section>

            {/* 내가 만든 책 */}
            <section style={{ marginTop: "2rem" }}>
                <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem", color: "#5D4037" }}>내가 만든 책</h2>
                <div style={{ display: "flex", gap: "1rem", overflowX: "auto", paddingBottom: "1rem" }}>
                    {bookList.map((book, index) => (
                        <div
                            key={index}
                            style={{
                                minWidth: "150px",
                                backgroundColor: "#FFFDE7",
                                borderRadius: "16px",
                                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                                textAlign: "center",
                                overflow: "hidden",
                            }}
                        >
                            <img
                                src={book.photo}
                                alt={book.title}
                                style={{ width: "100%", height: "150px", objectFit: "cover" }}
                            />
                            <div style={{ padding: "0.8rem" }}>
                                <p style={{ fontSize: "1rem", fontWeight: "bold", color: "#5D4037" }}>{book.title}</p>
                                <small style={{ color: "#757575" }}>{book.createdAt}</small>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default HomePage;
