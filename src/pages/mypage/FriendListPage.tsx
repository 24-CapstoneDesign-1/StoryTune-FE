import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { FaUserCheck, FaUserPlus } from "react-icons/fa";
import { API, FriendService } from "@/shared";
import { getAccess } from "@/shared";
import { Loading } from "@/entities";

const PageContainer = styled.div`
  background-color: #fff9c4;
  min-height: 100vh;
  padding: 1.5rem;
`;

const SearchContainer = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const SearchInput = styled.input`
  width: 400px;
  padding: 10px;
  border-radius: 10px;
  border: 1px solid black;
  font-size: 1rem;
  margin-bottom: 10px;

  @media (max-width: 768px) {
    width: 300px;
  }
`;

const SearchButton = styled.button`
  padding: 10px 20px;
  background-color: #5d4037;
  color: white;
  border-radius: 5px;
  cursor: pointer;
`;

const Section = styled.section`
  margin-bottom: 2rem;

  h2 {
    font-size: 1.5rem;
    color: #5d4037;
    margin-bottom: 1rem;
  }

  div {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
  }
`;

const FriendCard = styled.div`
  text-align: center;
  background-color: #fffde7;
  border-radius: 16px;
  padding: 1rem;
  width: 150px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const FriendName = styled.p`
  margin-top: 0.5rem;
  font-size: 1rem;
  color: #5d4037;
`;

const RequestActions = styled.div`
  margin-top: 0.5rem;
  display: flex;
  justify-content: space-between;
`;

const ActionButton = styled.button<{ accept?: boolean, reject?: boolean }>`
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  ${({ accept }) =>
    accept &&
    `
      background-color: #A5DF00;
      color: white;
  `}

  ${({ reject }) =>
    reject &&
    `
      background-color: #F78181;
      color: white;
  `}
`;

const FriendListPage = () => {
//   const [friends, setFriends] = useState([
//     { id: "gildong_1", name: "홍길동" },
//     { id: "gildong_2", name: "김철수" },
//     { id: "gildong_3", name: "이영희" },
//   ]);

//   const [receivedRequests, setReceivedRequests] = useState([
//     { id: "gildong_6", name: "박민수" },
//     { id: "gildong_7", name: "최현정" },
//   ]);

//   // 서버에 있는 사용자들
//   const users = [
//     { id: "gildong_6", name: "이@@" },
//     { id: "gildong_7", name: "최@@" },
//     { id: "gildong_8", name: "강@@" },
//   ]; 

  const friendService = FriendService(); 
  const [friends, setFriends] = useState<{ id: string; name: string }[]>([]);
  const [receivedRequests, setReceivedRequests] = useState<{ id: string; name: string }[]>([]);
  const [searchId, setSearchId] = useState("");
  const [searchResults, setSearchResults] = useState<{ id: string; name: string }[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFriendsData = async () => {
      try {
        setIsLoading(true);
        const friendsResponse = await friendService.fetchFriendList();
        const requestsResponse = await friendService.fetchFriendRequests();
    
        setFriends(Array.isArray(friendsResponse) ? friendsResponse : []);
        setReceivedRequests(Array.isArray(requestsResponse) ? requestsResponse : []);
      } catch (error) {
        console.error("데이터 로딩 실패:", error);
        setError("데이터 로딩 실패:");
        setFriends([]);
        setReceivedRequests([]);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchFriendsData();
  }, [friendService]);
    
  if (isLoading) {
    return <Loading />;
  }

  const handleSearch = async () => {
    if (!searchId.trim()) {
      setError("찾을 친구를 입력해주세요.");
      return;
    }

    try {
      const results = await friendService.searchFriend(searchId);
      console.log("API Response:", results);
      if (Array.isArray(results) && results.length > 0) {
        const filteredResults = results.filter(
          user => !friends.some(friend => friend.id === user.id)
        );
        setSearchResults(filteredResults);
        setError("");
      } else {
        setSearchResults([]);
        setError("검색 결과가 없습니다.");
      }
    } catch (error) {
      console.error("검색 실패", error);
      setError("검색 중 오류가 발생했습니다.");
    }
  };

  const handleSendRequest = async (user: { id: string; name: string }) => {
    try {
      await friendService.addFriend(user.id);
      setSearchResults(prev => prev.filter(result => result.id !== user.id));
      alert(`${user.name}님에게 친구 요청을 보냈습니다.`);
    } catch (error) {
      console.error("친구 요청 실패:", error);
      alert("친구 요청을 보내는데 실패했습니다.");
    }
  };

  const handleAcceptRequest = async (id: string) => {
    try {
      await friendService.acceptRequest(id);
      const acceptedRequest = receivedRequests.find(request => request.id === id);
      if (acceptedRequest) {
        setFriends(prev => [...prev, acceptedRequest]);
        setReceivedRequests(prev => prev.filter(request => request.id !== id));
      }
      alert("친구 요청을 수락했습니다.");
    } catch (error) {
      console.error("요청 수락 실패:", error);
      alert("요청 수락에 실패했습니다.");
    }
  };

  const handleRejectRequest = async (id: string) => {
    try {
      await friendService.rejectRequest(id);
      setReceivedRequests(prev => prev.filter(request => request.id !== id));
      alert("친구 요청을 거절했습니다.");
    } catch (error) {
      console.error("요청 거절 실패:", error);
      alert("요청 거절에 실패했습니다.");
    }
  };

//   const handleSendRequest = (user: { id: string; name: string }) => {
//     setSentRequests([...sentRequests, user]);
//     alert(`"${user.name}"님에게 친구 요청을 보냈습니다.`);
//   };

//   const handleAcceptRequest = (id: string) => {
//     const request = receivedRequests.find((req) => req.id === id);
//     if (request) {
//       setFriends([...friends, { id: request.id, name: request.name }]);
//       setReceivedRequests(receivedRequests.filter((req) => req.id !== id));
//       alert(`"${request.name}"님의 요청을 수락했습니다.`);
//     }
//   };


//   const handleRejectRequest = (id: string) => {
//     const request = receivedRequests.find((req) => req.id === id);
//     if (request) {
//       setReceivedRequests(receivedRequests.filter((req) => req.id !== id));
//       alert(`"${request.name}"님의 요청을 거절했습니다.`);
//     }
//   };

return (
    <PageContainer>
      <header style={{ textAlign: "center", marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "2rem", color: "#5D4037", marginBottom: "0.5rem" }}>
          친구 검색
        </h1>
        <p style={{ fontSize: "1rem", color: "#5D4037" }}>친구 목록을 확인하세요!</p>
      </header>

      <SearchContainer>
        <SearchInput
          type="text"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          placeholder="아이디나 이름으로 검색하세요."
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
        />
        <SearchButton onClick={handleSearch}>검색</SearchButton>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {searchResults.length > 0 && (
          <Section>
            <div>
              {searchResults.map((result) => (
                <FriendCard key={result.id}>
                  <FaUserPlus size={32} color="#FF8A65" />
                  <FriendName>{result.name}</FriendName>
                  <small style={{ backgroundColor: "#E6E6E6", padding: "2px 4px", borderRadius: "4px" }}>
                    {result.id}
                  </small>
                  <RequestActions>
                    <ActionButton onClick={() => handleSendRequest(result)}>
                      친구 요청
                    </ActionButton>
                  </RequestActions>
                </FriendCard>
              ))}
            </div>
          </Section>
        )}
      </SearchContainer>

      <Section>
        <h2>친구 목록</h2>
        <div>
      {Array.isArray(friends) && friends.length > 0 ? (
        friends.map((friend) => (
          <FriendCard key={friend.id}>
            <FaUserCheck size={32} color="#FF8A65" />
            <FriendName>{friend.name}</FriendName>
            <small style={{ backgroundColor: "#E6E6E6", padding: "2px 4px", borderRadius: "4px" }}>
              {friend.id}
            </small>
          </FriendCard>
        ))
      ) : (
        <div>새로운 친구를 찾아보세요!</div>
      )}
    </div>
      </Section>

      <Section>
        <h2>받은 친구 요청</h2>
        <div>
          {receivedRequests.map((request) => (
            <FriendCard key={request.id}>
              <FaUserPlus size={32} color="#FF8A65" />
              <FriendName>{request.name}</FriendName>
              <small style={{ backgroundColor: "#E6E6E6", padding: "2px 4px", borderRadius: "4px" }}>
                {request.id}
              </small>

              <RequestActions>
                <ActionButton
                  accept
                  onClick={() => handleAcceptRequest(request.id)}
                >
                  수락
                </ActionButton>
                <ActionButton
                  reject
                  onClick={() => handleRejectRequest(request.id)}
                >
                  거절
                </ActionButton>
              </RequestActions>
            </FriendCard>
          ))}
        </div>
      </Section>
    </PageContainer>
  );
};

export default FriendListPage;
