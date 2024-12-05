import { API, getAccess } from "@/shared";
import { useFriendStore } from "../stores/useFriendStore";

export const FriendService = () => {
  const friendStore = useFriendStore((state) => state);

  const addFriend = async (userId: number) => {
    try {
      const { data } = await API.post(
        `/api/friend/${userId}`,{
        headers: {
          "Authorization": `Bearer ${getAccess()}`,
        },
      });
      // friendStore.setFriends([...friendStore.friends, data]); 
      return data;
    } catch (error) {
      console.error("친구 추가 실패:", error);
      throw new Error("친구 추가에 실패했습니다.");
    }
  };

  // 친구 요청 수락
  const acceptRequest = async (requestId: number, body: {status: string}) => {
    try {
      const { data } = await API.patch(
        `/api/friend/request/${requestId}`, body,
        {
          headers: {
            "Authorization": `Bearer ${getAccess()}`,
          },
        }
      );
      // friendStore.setFriends([...friendStore.friends, data]); 
      return data;
    } catch (error) {
      console.error("친구 요청 수락 실패:", error);
      throw new Error("친구 요청 수락에 실패했습니다.");
    }
  };

  const rejectRequest = async (requestId: number) => {
    try {
      const { data } = await API.patch(`/api/friend/request/${requestId}`);
      // friendStore.setFriends(friendStore.friends.filter((friend) => friend.id !== requestId));
      return data;
    } catch (error) {
      console.error("친구 요청 거절 실패:", error);
      throw new Error("친구 요청 거절에 실패했습니다.");
    }
  };

  const fetchFriendList = async () => {
    try {
      const { data } = await API.get(
        "/api/friend", {
          headers: {
            "Authorization": `Bearer ${getAccess()}`,
          },
        }
      );
      friendStore.setFriends(data); 
      console.log('data', data);
      return data;
    } catch (error) {
      throw new Error("친구 목록 조회에 실패했습니다.");
    }
  };

  const searchFriend = async (searchTerm: string) => {
    try {
      const { data } = await API.get(
        `/api/friend/search?username=${searchTerm}`, {
          headers: {
            "Authorization": `Bearer ${getAccess()}`,
          },
        }
      );
      return data;
    } catch (error) {
      throw new Error("친구 검색에 실패했습니다.");
    }
  };

  const fetchFriendRequests = async () => {
    try {
      const { data } = await API.get("/api/friend/request");
      return data;
    } catch (error) {
      throw new Error("친구 요청 목록 조회에 실패했습니다.");
    }
  };

  return {
    addFriend,
    acceptRequest,
    rejectRequest,
    fetchFriendList,
    searchFriend,
    fetchFriendRequests,
  };
};
