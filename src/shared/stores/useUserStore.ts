import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export const useUserStore = create<User.UserStore>()(
    immer((set, get) => ({
        //State
        name: "",
        age: 1,
        gender: "MALE",

        setUserAllInfo: (value: any) => {
            set((state) => {
              for (const key in value) {
                if (value[key as keyof typeof value]) {
                  state[key as keyof typeof state] = value[
                    key as keyof typeof value
                  ] as never;
                }
              }
            });
        },

        //Actions
        setName: (value) => {
            set(() => ({ name: value }));
        },
        setAge: (value) => {
            set(() => ({ age: value }));
        },
        setGender: (value) => {
            set(() => ({ gender: value }));
        },
        
        getUserAllInfo: () => ({
            name: get().name,
            age: get().age,
            gender: get().gender,
        }),
  }))
);