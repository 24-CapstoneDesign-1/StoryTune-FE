import { Header } from "@/widgets";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PAGE_URL } from "@/shared";

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
        <>
            <Header />
            <div style={{ padding: "1rem", backgroundColor: "#FFF9C4" }}>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
                    <input 
                        type="text" 
                        placeholder="검색하기" 
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        style={{ 
                            width: '85%', 
                            padding: '0.5rem', 
                            borderRadius: '1rem', 
                            border: '1px solid #ccc' 
                        }} 
                    />
                    <button 
                        onClick={handleSearch}
                        style={{ marginLeft: '0.5rem', fontSize: '1.2rem', background: 'none', border: 'none' }}
                    >
                        🔍
                    </button>
                </div>

                <section>
                    <h2 style={{ marginLeft: '1rem' }}>내가 만든 책</h2>
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


                <section style={{ marginTop: '2rem' }}>
                    <h2 style={{ marginLeft: '1rem' }}>동화 목록</h2>
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
            </div>
        </>
    );
};

export default HomePage;
