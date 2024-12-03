declare namespace User {
    //dto

    export interface UserInfoRes {
        result: {
            userId: string;
            name: string;
        }
    }
    
    export interface SignInReqDto {
        username: string;
        password: string;
    }

    export interface SignInResDto {
        result: {
            accessToken: string;
            refreshToken: string;
        }
    }
    
    export interface SignUpReqDto {
        username: string;
        password: string;
        name: string;
        age: number;
        gender: string;
    }

    export interface SignUpResDto {
        result: {
            text: string;
        }
    };

    export interface BasicInfo {
        username: string;
        name: string;
        age: number;
        gender: string;
    }

    //store
    export interface UserStore extends BasicInfo {
        setUserAllInfo: (value: BasicInfo) => void;
        getUserAllInfo: () => BasicInfo;
        setUsername: (value: string) => void;
        setName: (value: string) => void;
        setAge: (value: number) => void;
        setGender: (value: string) => void;
    }
}