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

    export interface RolePlayInviteReqDto {
        rolePlayingRoomId: number;
        userId: number;
    }

    export interface InviteStatus {
        status: "PENDING" | "ACCEPTED" | "REJECTED";
    }

    export interface UpdateInviteReqDto {
        status: InviteStatus["status"];
    }

    export interface UpdateInviteResDto {
        status: number;
        message: string;
        result: Record<string, unknown>;
    }

    export interface RolePlayPage {
      rolePlayingRoomId: number;
      myBookId: number;
      pageNum: number;
    }

    export interface RolePlayPageResDto {
        status: number;
        message: string;
        result: {
            name: string;
            content_scenario: string;
            image: string;
        }
    }

    export interface RolePlayRoleResDto {
        status: number;
        message: string;
        result: {
            name: string;
            characterName: string;  
            image: string;
        }
    }

    export interface RolePlayParticipantResDto {
        status: number;
        message: string;
        result: {
            participantId: number;
            name: string;  
        }
    }
    
    export interface RolePlayData {
      rolePlayingRoomId: number;
      myBookId: number;
      pageNum: number;
    }
    
    export interface CreateRolePlayRoomDto {
      username: string;
      password: string;
      name: string;
      age: number;
      gender: "GIRL" | "BOY";
    }

    export interface CreateRolePlayRoomResDto {
        status: number;
        message: string;
        result: {
            rolePlayingRoomId: number;
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
    
    export interface RolePlayStore {
      currentRoom: RolePlayRoom | null;
      setCurrentRoom: (room: RolePlayRoom) => void;
      setRolePlayAllInfo: (value: Partial<RolePlayStore>) => void;
      getRolePlayAllInfo: () => {
      currentRoom: RolePlayRoom | null;
      currentRole: RolePlayRole | null;
      participants: RolePlayParticipant[];
    };
      updateFriendStatus: (friendId: number, status: "PENDING" | "ACCEPTED") => void;
      currentRole: RolePlayRole | null;
      participants: RolePlayParticipant[];
      setCurrentRole: (role: RolePlayRole) => void;
      setParticipants: (participants: RolePlayParticipant[]) => void;
      addParticipant: (participant: RolePlayParticipant) => void;
      removeParticipant: (participantId: number) => void;
      getCurrentRoom: () => RolePlayRoom | null;
      getCurrentRole: () => RolePlayRole | null;
      getParticipants: () => RolePlayParticipant[];
      clearRoom: () => void;
    }
}

