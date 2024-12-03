import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { useUserStore } from "./useUserStore";

declare namespace User {
    export interface Friend {
        id: string; 
        name: string; 
        status : "친구" | "친구의 수락을 기다리고 있어요" | "거절됨"
    }

    export interface FriendStore {
        friends: Friend[];
        addFriend: (friend: Friend) => void;
        updateFriendStatus: (id: string, status: "친구" | "친구의 수락을 기다리고 있어요" | "거절됨") => void;
        setFriends: (friends: Friend[]) => void;
        removeFriend: (id: string) => void;
    }
}

export const useFriendStore = create<User.FriendStore>()(
    immer((set, get) => ({
        friends: [],

        addFriend: (friend) => {
            set((state) => {
                state.friends.push(friend);
            });
        },

        updateFriendStatus: (id, status) => {
            set((state) => {
                const friend = state.friends.find((f:User.Friend) => f.id === id);
                if (friend) {
                    friend.status = status;
                }
            });
        },

        setFriends: (friends) => {
            set((state) => {
                state.friends = friends;
            });
        },

        removeFriend: (id) => {
            set((state) => {
                state.friends = state.friends.filter((f: User.Friend) => f.id !== id);
            });
        },
        addCurrentUserFriend: () => {
            const user = useUserStore.getState();
            const newFriend = {
                id: user.username, 
                name: user.name, 
                status: "친구" as "친구" | "친구의 수락을 기다리고 있어요" | "거절됨",
            };
            set((state) => {
                state.friends.push(newFriend);
            });
        },
    }))
);
