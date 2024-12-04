import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export const useRolePlayStore = create<RolePlay.RolePlayStore>()(
  immer((set, get) => ({
    currentRoom: null,
    currentRole: null,
    participants: [],
    
    setRolePlayAllInfo: (value: Partial<RolePlay.RolePlayStore>) => {
      set(value);
    },
    
    getRolePlayAllInfo: () => ({
      currentRoom: get().currentRoom,
      currentRole: get().currentRole,
      participants: get().participants,
    }),
    
    setCurrentRoom: (room: RolePlay.RolePlayRoom | null) => set({ currentRoom: room }),
    
    updateFriendStatus: (friendId: number, status: "PENDING" | "ACCEPTED") => {
      set((state) => {
        const friend = state.currentRoom?.friends.find(f => f.id === friendId);
        if (friend) friend.status = status;
      });
    },
    
    clearRoom: () => set({ currentRoom: null }),
    
    setCurrentRole: (role: RolePlay.RolePlayRole | null) => set({ currentRole: role }),
    
    setParticipants: (participants: RolePlay.RolePlayParticipant[]) => set({ participants }),
    
    addParticipant: (participant: RolePlay.RolePlayParticipant) => 
      set((state) => ({ participants: [...state.participants, participant] })),
    
    removeParticipant: (participantId: number) => 
      set((state) => ({ 
        participants: state.participants.filter(p => p.id !== participantId)
      })),
    
    getCurrentRoom: () => get().currentRoom,
    getCurrentRole: () => get().currentRole, 
    getParticipants: () => get().participants,
  }))
);