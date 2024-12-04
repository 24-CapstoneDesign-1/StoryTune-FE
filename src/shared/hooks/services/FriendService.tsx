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
    const { data } = await API.get("api/friend", {
      headers: {
        Authorization: `Bearer ${getAccess()}`,
      },
    });

    return data.map((friend: any) => ({
      id: friend.friend,
      name: friend.user,
      status: friend.status === "PENDING" ? "친구의 수락을 기다리고 있어요" : "친구",
    }));
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
    const { data } = await API.get("api/friend/request", {
      headers: {
        Authorization: `Bearer ${getAccess()}`,
      },
    });
    return data;
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
