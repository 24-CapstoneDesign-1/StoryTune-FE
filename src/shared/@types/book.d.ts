declare namespace Book {
    //dto

    export interface NewMakeBookReq {
        request: {
            bookId: number | null;
        }
    };

    export interface NewMakeBookRes {
        result: {
            myBookId: number;
        }
    };

    export interface bookImageReq {
        images: [string];
    }

    export interface bookImageRes {
        result: {
            myBookContentIds: number[];
        }
    };

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
            books: [
                {
                    bookId: number;
                    cover: string;
                    title: string;
                    author: string;
                }
            ]
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
        bookId: number;
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