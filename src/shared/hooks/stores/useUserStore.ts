import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export const useUserStore = create<User.UserStore>() (
    immer((set, get) => ({
        name: "",
        age: 0,
        gender: "",
        username: "",
        setUserAllInfo: (value) => {
            set((state) => {
                for (const key in value) {
                    if (value[key as keyof typeof value]) {
                        state[key as keyof typeof state] = value[key as keyof typeof value] as never;
                    }
                }
            });
        },
        getUserAllInfo: () => ({
            username: get().username,
            name: get().name,
            age: get().age,
            gender: get().gender,
        }),

        setUsername: (value) => {
            set((state) => {
                state.username = value;
            });
        },
        setName: (value) => {
            set((state) => {
                state.name = value;
            });
        },
        setAge: (value) => {
            set((state) => {
                state.age = value;
            });
        },
        setGender: (value) => {
            set((state) => {
                state.gender = value;
            });
        },
        
    }))
);