import React, { useState , useEffect} from "react";
import styled from "@emotion/styled";
import { Button, Title, ValidInput } from "@/entities"; 
import { useNavigate } from "react-router-dom";


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

const FriendListPage = () => {
    const navigate = useNavigate();
    const [searchId, setSearchId] = useState("");
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const [error, setError] = useState("");

    const dummyData = [
        { id: "user1", name: "송서은" },
        { id: "user2", name: "박수호" },
        { id: "user3", name: "이설아" },
        { id: "user4", name: "김영서" },
        { id: "user5", name: "김민지" },
    ];

    const myFriends = [
        { id: "user0", name: "김정우" },
        { id: "user01", name: "이지원" },
        { id: "user02", name: "최가은" },
    ];

    const handleSearch = () => {
        const results = dummyData.filter(user => 
            (user.id.includes(searchId) || user.name.includes(searchId)) &&
            !isFriend(user.id)
        );

        if (results.length > 0) {
            setSearchResults(results);
            setError("");
        } else {
            setSearchResults([]);
            setError("존재하지 않는 사용자이거나 이미 친구입니다.");
        }
    };

    const isFriend = (userId: string) => {
        return myFriends.some(friend => friend.id === userId);
    };


    const addFriend = (userId: string) => {
        alert(`친구 요청이 전송되었습니다. (userId: ${userId})`);
    };

    const displayedUsers = searchResults.length > 0 ? searchResults : myFriends;

    return (
        <AddFriendContainer>
            <Title>친구 추가</Title>
            <SearchInput 
                type="text" 
                value={searchId} 
                onChange={(e) => setSearchId(e.target.value)} 
                placeholder="아이디나 이름으로 검색" 
            />
            <SearchButton onClick={handleSearch}>검색</SearchButton>
            {error && <p>{error}</p>}
            <UserList>
                {displayedUsers.map(user => (
                    <UserItem key={user.id}>
                        <span>{user.name}</span>
                        {isFriend(user.id) ? (
                            <span></span>
                        ) : (
                            <Button onClick={() => addFriend(user.id)}>친구 추가</Button>
                        )}
                    </UserItem>
                ))}
            </UserList>
        </AddFriendContainer>
    );
};

export default FriendListPage;