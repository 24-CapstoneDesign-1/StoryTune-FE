import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export const useBookStore = create<Book.BookStore>() (
    immer((set, get) => ({
        image: [],
        name: [],
        setBookAllInfo: (value) => {
            set((state) => {
                for (const key in value) {
                    if (value[key as keyof typeof value]) {
                        state[key as keyof typeof state] = value[key as keyof typeof value] as never;
                    }
                }
            });
        },
        getBookAllInfo: () => ({
            image: get().image,
            name: get().name,    
        }),

        setImage: (value) => {
            set((state) => {
                state.image = value;
            });
        },
        setName: (value) => {
            set((state) => {
                state.name = value;
            });
        },
    }))
);