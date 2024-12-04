import { AxiosResponse } from "axios";
import { API, getAccess } from "@/shared";

export const FriendService = () => {
  const addFriend = async (userId: string) => {
    const { data } = await API.post(
      `api/friend/${userId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${getAccess()}`,
        },
      }
    );
    return data;
  };

  const acceptRequest = async (friendId: string) => {
    const { data } = await API.patch(
      `api/friend/request/${friendId}`,
      { status: "ACCEPTED" },
      {
        headers: {
          Authorization: `Bearer ${getAccess()}`,
        },
      }
    );
    return data;
  };

  const rejectRequest = async (requestId: string) => {
    const { data } = await API.patch(
      `api/friend/request/${requestId}`,
      { status: "REJECTED" },
      {
        headers: {
          Authorization: `Bearer ${getAccess()}`,
        },
      }
    );
    return data;
  };

  const fetchFriendList = async () => {
    try {
      const { data } = await API.get("api/friend", {
        headers: {
          Authorization: `Bearer ${getAccess()}`
        }
      });
  
      if (!data || !data.result) {
        return [];
      }
  
      // result가 배열이 아닐 경우 배열로 변환
      const friendsArray = Array.isArray(data.result) ? data.result : [data.result];
  
      return friendsArray.map((friend: any) => ({
        id: friend.userId || friend.id,
        name: friend.name,
        status: friend.status === "PENDING" ? "친구의 수락을 기다리고 있어요" : "친구"
      }));
    } catch (error) {
      console.error('친구 목록 가져오기 실패:', error);
      return [];
    }
  };

  
  const searchFriend = async (searchTerm: string) => {
    const { data } = await API.get(`api/friend/search?username=${searchTerm}`, {
      headers: {
        Authorization: `Bearer ${getAccess()}`,
      },
    });

    return data?.result
      ? [
          {
            id: data.result.userId,
            name: data.result.name,
            username: data.result.username,
          },
        ]
      : [];
  };

  const fetchFriendRequests = async () => {
    try {
      const { data } = await API.get("api/friend/request", {
        headers: {
          Authorization: `Bearer ${getAccess()}`
        }
      });
  
      if (!data || !data.result) {
        return [];
      }
  
      const requestsArray = Array.isArray(data.result) ? data.result : [data.result];
  
      return requestsArray.map((request: any) => ({
        id: request.userId || request.id,
        name: request.name,
        status: "PENDING"
      }));
    } catch (error) {
      console.error('친구 요청 목록 가져오기 실패:', error);
      return [];
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
