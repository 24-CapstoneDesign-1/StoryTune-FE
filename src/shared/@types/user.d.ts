declare namespace User {
  
    export interface BasicInfo {
        name: string;
        age: number;
        gender: "MALE" | "FEMALE";
    }

    export interface AllInfo extends BasicInfo {}

    //Store
    export interface UserStore extends BasicInfo {
      setName: (value: string) => void;
      setAge: (value: number) => void;
      setGender: (value: "MALE" | "FEMALE") => void;
      getUserAllInfo: () => AllInfo;
      setUserAllInfo: (value: AllInfo) => void;
    }
  
    //DTO
    export interface SignInResDto {
      result: {
        signupComplete: boolean;
        token_type: string;
        access_token: string;
      };
    }
  }