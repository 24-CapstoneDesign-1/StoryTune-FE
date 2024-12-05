import { AxiosResponse } from "axios";
import { API, getAccess } from "@/shared";
import { useRolePlayStore } from '../stores/useRolePlayStore';

export const RolePlayService = () => {
  const {
    setCurrentRole,
    setParticipants,
    setRolePlayAllInfo
  } = useRolePlayStore();

  const createRoom = async () => {
    const { data } = await API.post(
        "/api/roleplaying", {
        headers: {
            "Authorization": `Bearer ${getAccess()}`,
        },
    }) as AxiosResponse;
    setRolePlayAllInfo(data);
    return data;
  };

  const getRoomById = async (roomId: number) => {
    const { data } = await API.get(`/api/roleplaying/${roomId}`, {
      headers: {
        "Authorization": `Bearer ${getAccess()}`,
      },
    }) as AxiosResponse;
    setRolePlayAllInfo(data);
    return data;
  };

  const getRolePlayPage = async (params: RolePlay.RolePlayPage) => {
    const { rolePlayingRoomId, myBookId, pageNum } = params;
    const { data } = await API.get(`/api/roleplaying/${rolePlayingRoomId}/${myBookId}/${pageNum}`, {
      headers: {
        "Authorization": `Bearer ${getAccess()}`,
      },
    }) as AxiosResponse;
    setRolePlayAllInfo(data);
    return data;
  };

  const getRolePlayRole = async (rolePlayingRoomId: number, myBookId: number) => {
    const { data } = await API.get(`/api/roleplaying/${rolePlayingRoomId}/${myBookId}/role`, {
      headers: {
        "Authorization": `Bearer ${getAccess()}`,
      },
    }) as AxiosResponse;
    setCurrentRole(data.result);
    return data;
  };

  const getParticipants = async (rolePlayingRoomId: number) => {
    const { data } = await API.get(`/api/roleplaying/${rolePlayingRoomId}/participant`, {
      headers: {
        "Authorization": `Bearer ${getAccess()}`,
      },
    }) as AxiosResponse;
    setParticipants(data.result);
    return data;
  };

  const inviteUser = async (rolePlayingRoomId: number, userId: number) => {
    const { data } = await API.post(`/api/roleplaying/invite`, { rolePlayingRoomId, userId }, {
      headers: {
        "Authorization": `Bearer ${getAccess()}`,
      },
    }) as AxiosResponse;
    return data;
  };

  const inviteList = async () => {
    const { data } = await API.get(`/api/roleplaying/invite`, {
      headers: {
        "Authorization": `Bearer ${getAccess()}`,
      },
    }) as AxiosResponse;
    return data;
  };

  const updateInviteStatus = async (participantId: number, status: any) => {
    const { data } = await API.patch(`/api/roleplaying/invite/${participantId}`,
      status , {
        headers: {
          "Authorization": `Bearer ${getAccess()}`,
        },
      }) as AxiosResponse;
    return data;
  };

const roleSelect = async (myRoomId: number, bookId: number) => {
    const { data } = await API.get(`/api/roleplaying/${myRoomId}/${bookId}/role`, {
      headers: {
        "Authorization": `Bearer ${getAccess()}`,
        },
    }) as AxiosResponse<RolePlay.RoleSelectRes>;
    // setCurrentRole(data.result);
    return data;
}

  return {
    inviteList,
    roleSelect,
    createRoom,
    getRoomById,
    getRolePlayPage,
    getRolePlayRole,
    getParticipants,
    inviteUser,
    updateInviteStatus,
  };
};