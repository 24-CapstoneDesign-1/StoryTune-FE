declare namespace Book {
    //dto

    export interface MyMakedRes {
        result: {
            myBookContentId: number;
            image: string;
            previousContent: string;
        }
    }
    export interface MyBookContentReq {
        audio: File;
        isLine: boolean;
        myBookCharacterId: number | null;
    }

    export interface MyBookRes {
        result: {
            myBookId: number;
            cover: string;
            title: string;
            updatedAt: string;
        }
    }

    export interface BookCharacterReq {
        myBookId: number;
        images: FormData;
    }
    export interface BookCharacterRes {
        result: {
            myBookCharacterIds: number[];
        }
    }

    export interface CoverReq {
        myBookContentId: number;
    }
    export interface TopicReq {
        topic: string;
    }
    
    export interface HeroReq {
        images: Blob;
    }

    export interface HeroRes {
        choices: [
            {
                message: {
                    content: Blob[];
                };
            }
        ]
    }

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
        images: FormData;
    }

    export interface bookImageRes {
        result: {
            myBookContentIds: number[];
        }
    };

    export interface BookRecordReq {
        file: File;
    }

    export interface BookRecordRes {
        text: string;
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

    export interface BasicBookInfo {
        image: Blob;
        name: string;
        story: string;
        myBookCharacterId: number;
    }

    export interface BookStore {
        books: { [id: number]: BasicBookInfo };
        heros: { [id: number]: string };
        index: number;
        bookId: number;

        setIndex: (index: number) => void; //표지 선택
        setMyBookCharacterId: (id: number, myBookCharacterId: number) => void; //캐릭터 선택
        setBookId: (id: number | null) => void; //책의 id 선택
        setSubject: (subject: string) => void;  //책의 주제 선택
        setImage: (id: number, image: Blob) => void; //책의 이미지 선택
        setBookImage: (formData: FormData) => void; //책의 이미지 선택(formData)
        setName: (id: number, name: string) => void; //책의 이름
        setStory: (id: number, story: string) => void; //책의 스토리
        setHero: (id: number, hero: string) => void; //책의 주인공

        getBook: (id: number) => BasicBookInfo | undefined;
        getMyBookCharacterId: (id: number) => number;
        getImages: () => Blob[];
        getImage: (id: number) => Blob;
        getAllBook: () => BasicBookInfo[];
        getIndex: () => number;
        getHero: (id: number) => string;
        getBookId: () => number;
    }
}