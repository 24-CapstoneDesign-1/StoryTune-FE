import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export const useBookStore = create<Book.BookStore>() (
    immer((set, get) => ({
        books: {},
        heros: {},

        setStory: (id, story) =>
            set((state) => ({
                books: {
                    ...state.books,
                    [id]: story,
                },
            })),
        setName: (id, name) =>
            set((state) => ({
                books: {
                    ...state.books,
                    [id]: name,
                },
            })),
        setImage: (id, image) =>
            set((state) => ({
                books: {
                    ...state.books,
                    [id]: image,
                },
            }),
        ),
        setHero: (id, hero) =>
            set((state) => ({
                heros: {
                    ...state.heros,
                    [id]: hero,
                },
            }),
        ),
        setSubject: (subject) => set((state) => ({ subject })),
        getHero: (id) => get().heros[id],
        getAllHero: () => Object.values(get().heros),
        getBook: (id) => get().books[id],
        getAllBook: () => Object.values(get().books),
    }))
);