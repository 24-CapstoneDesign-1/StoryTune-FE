declare namespace Book {
    //dto


    export interface BasicBookInfo {
        image: string;
        name: string;
        story: string;
    }

    export interface BookStore {
        books: { [id: number]: BasicBookInfo };
        heros: { [id: number]: string };
        index: number;
        setImage: (id: number, image: string) => void;
        setName: (id: number, name: string) => void;
        setSubject: (subject: string) => void;
        setHero: (id: number, hero: string) => void;
        setStory: (id: number, story: string) => void;
        setIndex: (index: number) => void;
        getHero: (id: number) => string | undefined;
        getAllHero: () => string[];
        getBook: (id: number) => BasicBookInfo | undefined;
        getAllBook: () => BasicBookInfo[];
        getIndex: () => number;
    }
}