declare namespace Hero {
    //dto


    export interface BasicHeroInfo {
        images: Blob[];
        name: string[];
        id: number[];
    }

    export interface HeroStore extends Hero.BasicHeroInfo {
        setImage: (idx: number, image: Blob) => void;
        setName: (idx: number, name: string) => void;
        getName: (idx: number) => string;
        setIds: (idx: number, ids: number) => void;
        getAllName: () => string[];
        getImage: (idx: number) => Blob;
        getCharacterId: (idx: number) => number;
        getImages: () => Blob[];
        getIds: () => number[];
    }
}