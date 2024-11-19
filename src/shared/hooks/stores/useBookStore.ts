import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export const useBookStore = create<Book.BookStore>() (
    immer((set, get) => ({
        books: {},
        heros: {},
        index: 0,
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
        setIndex: (index) => set((state) => ({ index })),
        setSubject: (subject) => set((state) => ({ subject })),
        getBook: (id) => get().books[id],
        getImage: (id) => get().books[id].image,
        getIndex: () => get().index,
        getAllBook: () => Object.values(get().books),
    }))
);