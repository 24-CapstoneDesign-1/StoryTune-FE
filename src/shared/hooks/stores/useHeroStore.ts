import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export const useHeroStore = create<Hero.HeroStore>() (
    immer((set, get) => ({
        name: [],
        images: [],
        id: [],
        setName(idx, name) {
            set((state) => {
                state.name[idx] = name;
            });
        },
        setImage(idx, images) {
            set((state) => {
                state.images[idx] = images;
            });
        },
        setIds(ids) {
            set((state) => {
                state.id = [ids];
            });
        },
        getName: (idx : number) => get().name[idx],
        getAllName: () => Object.values(get().name),
        getImage: (idx : number) => get().images[idx],
        getImages: () => Object.values(get().images),
        getIds: () => get().id,
    }))
);