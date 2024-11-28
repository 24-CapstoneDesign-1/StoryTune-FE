import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export const useHeroStore = create<Hero.HeroStore>() (
    immer((set, get) => ({
        name: [],
        setName(idx, name) {
            set((state) => {
                state.name[idx] = name;
            });
        },
        getName: (idx : number) => get().name[idx],
        getAllName: () => Object.values(get().name),
    }))
);