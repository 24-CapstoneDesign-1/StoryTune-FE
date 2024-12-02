import { AxiosResponse } from "axios";
import { API } from "@/shared";
import { useFriendStore } from "../stores/useFriendStore";

export const FriendService = () => {
  const friendStore = useFriendStore((state) => state);

  const addFriend = async (userId: string) => {
    try {
      const { data } = await API.post(`/api/friend/${userId}`);
      friendStore.setFriends([...friendStore.friends, data]); 
      return data;
    } catch (error) {
      console.error("친구 추가 실패:", error);
      throw new Error("친구 추가에 실패했습니다.");
    }
  };

  // 친구 요청 수락
  const acceptRequest = async (requestId: string) => {
    try {
      const { data } = await API.patch(`/api/friend/request/${requestId}`);
      friendStore.setFriends([...friendStore.friends, data]); 
      return data;
    } catch (error) {
      console.error("친구 요청 수락 실패:", error);
      throw new Error("친구 요청 수락에 실패했습니다.");
    }
  };

  const rejectRequest = async (requestId: string) => {
    try {
      const { data } = await API.patch(`/api/friend/request/${requestId}`);
      friendStore.setFriends(friendStore.friends.filter((friend) => friend.id !== requestId));
      return data;
    } catch (error) {
      console.error("친구 요청 거절 실패:", error);
      throw new Error("친구 요청 거절에 실패했습니다.");
    }
  };

  const fetchFriendList = async () => {
    try {
      const { data } = await API.get("/api/friend");
      friendStore.setFriends(data); 
      return data;
    } catch (error) {
      throw new Error("친구 목록 조회에 실패했습니다.");
    }
  };

  const searchFriend = async (searchTerm: string) => {
    try {
      const { data } = await API.get(`/api/friend/search?query=${searchTerm}`);
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
