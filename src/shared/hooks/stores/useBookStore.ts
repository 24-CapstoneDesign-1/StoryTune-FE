import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export const useBookStore = create<Book.BookStore>() (
    immer((set, get) => ({
        bookId: 0,
        books: {},
        heros: {},
        index: 0,
        setStory: (id, story) =>
            set((state) => ({
                books: {
                    ...state.books,
                    [id]: {
                        ...state.books[id],
                        story : story,
                    },
                },
            })),
        setName: (id, name) =>
            set((state) => ({
                books: {
                    ...state.books,
                    [id]: {
                        ...state.books[id],
                        name : name,
                    },
                },
            })),
        setImage: (id, image) =>
            set((state) => ({
                books: {
                    ...state.books,
                    [id]: {
                        ...state.books[id],
                        image,
                    },
                },
            })),
        setHero: (id, hero) =>
            set((state) => ({
                heros: {
                    ...state.heros,
                    [id]: hero,
                },
            })),

        setIndex: (index) => set((state) => ({ index })),
        setSubject: (subject) => set((state) => ({ subject })),
        getBook: (id) => get().books[id],
        getImage: (id) => get().books[id].image,
        getIndex: () => get().index,
        getAllBook: () => Object.values(get().books),
        getHero: (id) => get().heros[id],
    }))
);