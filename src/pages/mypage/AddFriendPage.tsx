import React, { useState } from "react";
import styled from "@emotion/styled";
import { Button, Title, ValidInput } from "@/entities"; 
import { useNavigate } from "react-router-dom";
import { API } from "@/shared"; 

const AddFriendContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;
    background-color: #D2FFFF;
`;

const SearchInput = styled.input`
    width: 400px;
    padding: 10px;
    border-radius: 10px;
    border: 1px solid black;
    font-size: 1rem;
    margin-bottom: 10px;
    outline: none;
    @media (max-width: 768px) {
        width: 300px;
    }
`;

const SearchButton = styled(Button)`
    margin-bottom: 20px;
`;

const UserList = styled.ul`
    list-style: none;
    padding: 0;
`;

const UserItem = styled.li`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 400px;
    margin: 5px 0;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 10px;
    background-color: white;
`;

const AddFriendPage = () => {
    const navigate = useNavigate();
    const [searchId, setSearchId] = useState("");
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const [error, setError] = useState("");

    const handleSearch = async () => {
        try {
            const response = await API.get(`/search-user?userId=${searchId}`);
            setSearchResults(response.data); 
            setError(""); 
        } catch (error) {
            setError("존재하지 않는 사용자입니다.");
            setSearchResults([]); 
        }
    };

    const addFriend = async (userId: string) => {
        try {
            await API.post('/add-friend', { userId });
            alert("친구 요청이 전송되었습니다.");
        } catch (error) {
            alert("존재하지 않는 사용자입니다");
        }
    };

    return (
        <AddFriendContainer>
            <Title>친구 추가</Title>
            <SearchInput 
                type="text" 
                value={searchId} 
                onChange={(e) => setSearchId(e.target.value)} 
                placeholder="아이디 검색" 
            />
            <SearchButton onClick={handleSearch}>검색</SearchButton>
            {error && <p>{error}</p>}
            <UserList>
                {searchResults.map(user => (
                    <UserItem key={user.id}>
                        <span>{user.name}</span>
                        <Button onClick={() => addFriend(user.id)}>친구 추가</Button>
                    </UserItem>
                ))}
            </UserList>
        </AddFriendContainer>
    );
};

export default AddFriendPage;
