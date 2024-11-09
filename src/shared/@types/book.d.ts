declare namespace Book {
    //dto


    export interface BasicBookInfo {
        image: string[];
        name: string[];
    }

    //store
    export interface BookStore extends BasicBookInfo {
        setBookAllInfo: (value: BasicInfo) => void;
        getBookAllInfo: () => BasicInfo;
        setImage: (value: string[]) => void;
        setName: (value: string[]) => void;    
    }
}