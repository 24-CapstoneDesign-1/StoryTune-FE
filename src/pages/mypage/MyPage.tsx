import React, { useState } from "react";
import styled from "@emotion/styled";
import { Button, Title } from "@/entities";

const AddFriendContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;
    background-color: #D2FFFF;
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
    const [myFriends, setMyFriends] = useState<any[]>([
        { id: "user0", name: "김정우" },
        { id: "user01", name: "이지원" },
        { id: "user02", name: "최가은" },
    ]);
    const [receivedRequests, setReceivedRequests] = useState<any[]>([
        { id: "user10", name: "박지성" },
        { id: "user11", name: "정다은" },
    ]);
    const [activeTab, setActiveTab] = useState("friends");

    const handleAcceptRequest = (userId: string) => {
        const acceptedFriend = receivedRequests.find(request => request.id === userId);
        if (acceptedFriend) {
            setReceivedRequests(receivedRequests.filter(request => request.id !== userId));
            setMyFriends([...myFriends, acceptedFriend]); // 친구 목록 업데이트
            alert(`${acceptedFriend.name}님을 친구로 추가했습니다.`);
        }
    };

    const handleDeclineRequest = (userId: string) => {
        setReceivedRequests(receivedRequests.filter(request => request.id !== userId));
        alert(`${userId}님의 요청을 거절했습니다.`);
    };

    const renderContent = () => {
        if (activeTab === "friends") {
            return (
                <UserList>
                    {myFriends.map(user => (
                        <UserItem key={user.id}>
                            <span>{user.name}</span>
                        </UserItem>
                    ))}
                </UserList>
            );
        } else if (activeTab === "requests") {
            return (
                <UserList>
                    {receivedRequests.map(request => (
                        <UserItem key={request.id}>
                            <span>{request.name}</span>
                            <Button onClick={() => handleAcceptRequest(request.id)}>수락</Button>
                            <Button onClick={() => handleDeclineRequest(request.id)}>거절</Button>
                        </UserItem>
                    ))}
                </UserList>
            );
        } else {
            return <p>추천 기능 구현 중...</p>;
        }
    };

    return (
        <AddFriendContainer>
            <Title>친구 관리</Title>
            <div>
                <Button onClick={() => setActiveTab("friends")}>친구 목록</Button>
                <Button onClick={() => setActiveTab("requests")}>친구 요청</Button>
                <Button onClick={() => setActiveTab("recommendations")}>추천</Button>
            </div>
            <div>{renderContent()}</div>
        </AddFriendContainer>
    );
};

export default FriendListPage;
