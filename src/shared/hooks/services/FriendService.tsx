import { AxiosResponse } from "axios";
import { API, getAccess } from "@/shared";
import { useFriendStore } from "../stores/useFriendStore";

export const FriendService = () => {
  const friendStore = useFriendStore((state) => state);

  const addFriend = async (userId: string) => {
    try {
      const { data } = await API.post(`/friend/${userId}`, {}, {
        headers: {
          "Authorization": `Bearer ${getAccess()}`
        }
      });
      return data;
    } catch (error) {
      console.error("Add friend error:", error);
      throw new Error("친구 추가에 실패했습니다.");
    }
  };

  const acceptRequest = async (friendId: string) => {
    try {
      const { data } = await API.patch(`/friend/request/${friendId}`, {
        status: "ACCEPTED"
      }, {
        headers: {
          "Authorization": `Bearer ${getAccess()}`
        }
      });
      return data;
    } catch (error) {
      console.error("Accept request error:", error);
      throw new Error("친구 요청 수락에 실패했습니다.");
    }
  };


  const rejectRequest = async (requestId: string) => {
    try {
      const { data } = await API.patch(`/friend/request/${requestId}`,{},{
        headers: {
            "Authorization" : `Bearer ${getAccess()}`,
        }
      });
      friendStore.setFriends(friendStore.friends.filter((friend) => friend.id !== requestId));
      return data;
    } catch (error) {
      console.error("친구 요청 거절 실패:", error);
      throw new Error("친구 요청 거절에 실패했습니다.");
    }
  };

  const fetchFriendList = async () => {
    try {
      const { data } = await API.get("/friend", {
        headers: {
          "Authorization": `Bearer ${getAccess()}`
        }
      });
      console.log("Friend list response:", data);
      
      const formattedFriends = data.map((friend: any) => ({
        id: friend.friend,
        name: friend.user,
        status: friend.status === "PENDING" ? "친구의 수락을 기다리고 있어요" : "친구"
      }));

      friendStore.setFriends(formattedFriends);
      return formattedFriends;
    } catch (error) {
      console.error("Friend list error:", error);
      throw new Error("친구 목록 조회에 실패했습니다.");
    }
  };


  const searchFriend = async (searchTerm: string) => {
    try {
      const { data } = await API.get(`/friend/search?query=${searchTerm}`, {
        headers: {
          "Authorization": `Bearer ${getAccess()}`
        }
      });
      return data?.result ? [{
        id: data.result.userId,
        name: data.result.name,
        username: data.result.username
      }] : [];
    } catch (error) {
      console.error("Search friend error:", error);
      throw new Error("친구 검색에 실패했습니다.");
    }
  };

  const fetchFriendRequests = async () => {
    try {
      const { data } = await API.get("/friend/request",
        {
            headers: {
            "Authorization" : `Bearer ${getAccess()}`,
        }}
      );
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
