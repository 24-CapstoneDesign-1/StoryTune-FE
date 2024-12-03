import { AxiosResponse } from "axios";
import { API, getAccess } from "@/shared";

interface RolePlayData {
    rolePlayingRoomId: number;
    myBookId: number;
    pageNum: number;

  }
  
interface RolePlayRoom {
  id: number;
  username: string;
  password: string;
  name: string;
  age: number;
  gender: "GIRL" | "BOY";
  friends: {
    createdAt: string;
    updatedAt: string;
    id: number;
    user: string;
    friend: string;
    status: "PENDING" | "ACCEPTED";
  }[];
}

interface CreateRolePlayRoomDto {
  username: string;
  password: string;
  name: string;
  age: number;
  gender: "GIRL" | "BOY";
  friends: {
    user: string;
    friend: string;
    status: "PENDING";
  }[];
}

export const RolePlayService = () => {
    const createRoom = async (body: CreateRolePlayRoomDto) => {
      const { data } = (await API.post(
        "/api/roleplaying",
        body
      )) as AxiosResponse<RolePlayRoom>;
      return data;
    };
  
    const getRoomById = async (roomId: number) => {
      const { data } = (await API.get(
        `/api/roleplaying/${roomId}`
      )) as AxiosResponse<RolePlayRoom>;
      return data;
    };
  
    const joinRoom = async (roomId: number, userId: string) => {
      const { data } = (await API.post(
        `/api/roleplaying/${roomId}/join`,
        { userId }
      )) as AxiosResponse<RolePlayRoom>;
      return data;
    };
  
    const leaveRoom = async (roomId: number, userId: string) => {
      const { data } = (await API.post(
        `/api/roleplaying/${roomId}/leave`,
        { userId }
      )) as AxiosResponse<void>;
      return data;
    };
  
    const getRolePlayPage = async ({
      rolePlayingRoomId,
      myBookId,
      pageNum
    }: {
      rolePlayingRoomId: number;
      myBookId: number;
      pageNum: number;
    }) => {
      const { data } = (await API.get(
        `/api/roleplaying/${rolePlayingRoomId}/${myBookId}/${pageNum}`,
        {
          headers: {
            Authorization: `Bearer ${getAccess()}`
          }
        }
      )) as AxiosResponse<RolePlayData>;
      return data;
    };
  
    return {
      createRoom,
      getRoomById,
      joinRoom,
      leaveRoom,
      getRolePlayPage
    };
  };