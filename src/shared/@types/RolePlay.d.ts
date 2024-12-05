declare namespace RolePlay {

    export interface RoleSelectRes {
        result: [
            {
                name: string;
                characterName: string;
                image: string;
            }
        ]
    }
    interface RolePlayRoom {
      id: number;
      username: string;
      password: string;
      name: string;
      age: number;
      gender: "GIRL";
      friends: RolePlayParticipant[];
    }
  
    interface RolePlayParticipant {
      id: number;
      name: string;
      status: "PENDING" | "ACCEPTED";
    }
  
    interface RolePlayRole {
      id: number;
      name: string;
      description: string;
    }
  
    interface RolePlayStore {
      currentRoom: RolePlayRoom | null;
      currentRole: RolePlayRole | null;
      participants: RolePlayParticipant[];
      setRolePlayAllInfo: (value: Partial<RolePlayStore>) => void;
      getRolePlayAllInfo: () => {
        currentRoom: RolePlayRoom | null;
        currentRole: RolePlayRole | null;
        participants: RolePlayParticipant[];
      };
      setCurrentRoom: (room: RolePlayRoom | null) => void;
      updateFriendStatus: (friendId: number, status: "PENDING" | "ACCEPTED") => void;
      clearRoom: () => void;
      setCurrentRole: (role: RolePlayRole | null) => void;
      setParticipants: (participants: RolePlayParticipant[]) => void;
      addParticipant: (participant: RolePlayParticipant) => void;
      removeParticipant: (participantId: number) => void;
      getCurrentRoom: () => RolePlayRoom | null;
      getCurrentRole: () => RolePlayRole | null;
      getParticipants: () => RolePlayParticipant[];
    }
  
    interface CreateRolePlayRoomDto {
      name: string;
      username: string;
      password: string;
      age: number;
      gender: "GIRL";
    }
  
    interface RolePlayPage {
      rolePlayingRoomId: number;
      myBookId: number;
      pageNum: number;
    }
  
    interface InviteStatus {
      status: "PENDING" | "ACCEPTED";
    }

    interface RolePlayInvite {
        id: number;
        rolePlayingRoomId: number;
        ownerName: string;
      }
    
      interface RolePlayInviteResponse {
        status: string;
        message: string;
        result: RolePlayInvite[];
      }

     //   /api/roleplaying/{rolePlayingRoomId}/{myBookId}/{pageNum}
      interface RolePlayPageResult {
        name: string;
        content_scenario: string;
        image: string;
      }
      
      interface RolePlayPageResponse {
        status: number;
        message: string;
        result: RolePlayPageResult;
      }
      

      }