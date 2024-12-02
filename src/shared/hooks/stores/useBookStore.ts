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
        setBookImage: (formData) => {
            const images = formData.getAll("images");
            images.forEach((image, index) => {
                set((state) => ({
                    books: {
                        ...state.books,
                        [index]: {
                            ...state.books[index],
                            image: image,
                        },
                    },
                }));
            });
        },
        setMyBookCharacterId: (id, myBookCharacterId) => {
            set((state) => ({
                books: {
                    ...state.books,
                    [id]: {
                        ...state.books[id],
                        myBookCharacterId,
                    },
                },
            }));
        },

        setIndex: (index) => set((state) => ({ index })),
        setBookId: (bookId) => set((state) => ({ bookId })),
        setSubject: (subject) => set((state) => ({ subject })),
        getImages: () => Object.values(get().books).map((book) => book.image),
        getBook(id: number): any {
            const book = this.books[id];
            return book || undefined;
          },
        getImage: (id) => get().books[id].image,
        getMyBookCharacterId: (id) => get().books[id].myBookCharacterId,
        getIndex: () => get().index,
        getAllBook: () => Object.values(get().books),
        getHero: (id) => get().heros[id],
        getBookId: () => get().bookId,
    }))
);