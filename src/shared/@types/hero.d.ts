declare namespace Hero {
    //dto


    export interface BasicHeroInfo {
        name: string[];
    }

    export interface HeroStore extends Hero.BasicHeroInfo {
        setName: (idx: number, name: string) => void;
        getName: (idx: number) => string;
        getAllName: () => string[];
    }
}