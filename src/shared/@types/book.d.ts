declare namespace Book {
    //dto
    export interface BookRecordReq {
        file: FormData;
    }

    export interface BookRecordRes {
        text: string;
    }

    export interface BasicBookInfo {
        image: string;
        name: string;
        story: string;
    }
    export interface BookListRes {
        result: {
            bookId: number;
            cover: string;
            title: string;
            author: string;
        }
    }
    export interface BookHelpReq {
        message: string;
    }
    export interface BookHelpRes {
        choices: [
            {
                message: {
                    content: string;
                };
            }
        ]
    }

    export interface BookStore {
        books: { [id: number]: BasicBookInfo };
        heros: { [id: number]: string };
        index: number;
        setImage: (id: number, image: string) => void;
        setName: (id: number, name: string) => void;
        setSubject: (subject: string) => void;
        setStory: (id: number, story: string) => void;
        setIndex: (index: number) => void;
        setHero: (id: number, hero: string) => void;
        getBook: (id: number) => BasicBookInfo | undefined;
        getImage: (id: number) => string;
        getAllBook: () => BasicBookInfo[];
        getIndex: () => number;
        getHero: (id: number) => string;
    }
}