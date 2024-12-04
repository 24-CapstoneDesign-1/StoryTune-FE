import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

declare namespace RolePlay {
  export interface RolePlayRoom {
    id: number;
    username: string;
    password: string;
    name: string;
    age: number;
    gender: "GIRL" | "BOY";
    friends: RoomFriend[];
  }

  export interface RoomFriend {
    createdAt: string;
    updatedAt: string;
    id: number;
    user: string;
    friend: string;
    status: "PENDING" | "ACCEPTED";
  }

  export interface RolePlayInvite {
    rolePlayingRoomId: number;
    userId: number;
  }

  export interface RolePlayPage {
    rolePlayingRoomId: number;
    myBookId: number;
    pageNum: number;
  }

  export interface RolePlayStore {
    currentRoom: RolePlayRoom | null;
    setCurrentRoom: (room: RolePlayRoom) => void;
    updateFriendStatus: (friendId: number, status: "PENDING" | "ACCEPTED") => void;
    currentRole: RolePlayRole | null;
    participants: RolePlayParticipant[];
    setCurrentRole: (role: RolePlayRole) => void;
    setParticipants: (participants: RolePlayParticipant[]) => void;
    addParticipant: (participant: RolePlayParticipant) => void;
    removeParticipant: (participantId: number) => void;
    clearRoom: () => void;
  }
}

  export interface RolePlayRole {
    content_scenario: string;
    image: string;
  }

  export interface RolePlayParticipant {
    id: number;
    name: string;
    role?: string;
  }


export const useRolePlayStore = create<RolePlay.RolePlayStore>()(
  immer((set, get) => ({
    currentRoom: null,
    setCurrentRoom: (room) => {
      set((state) => {
        state.currentRoom = room;
      });
    },

    updateFriendStatus: (friendId, status) => {
      set((state) => {
        if (state.currentRoom) {
          const friend = state.currentRoom.friends.find(f => f.id === friendId);
          if (friend) {
            friend.status = status;
          }
        }
      });
    },

    clearRoom: () => {
      set((state) => {
        state.currentRoom = null;
      });
    },
    currentRole: null,
    participants: [],

    setCurrentRole: (role) => {
      set((state) => {
        state.currentRole = role;
      });
    },

    setParticipants: (participants) => {
      set((state) => {
        state.participants = participants;
      });
    },

    addParticipant: (participant) => {
      set((state) => {
        state.participants.push(participant);
      });
    },

    removeParticipant: (participantId) => {
      set((state) => {
        state.participants = state.participants.filter(p => p.id !== participantId);
      });
    },
  }))
);

