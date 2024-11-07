import { AxiosResponse } from "axios";
import { API, setAccess, storeAccess } from "@/shared";
import { useUserStore } from "../stores/useUserStore";

export const AuthService = () => {
    const userStore = useUserStore((statue) => statue);

    const signup = async (body: User.SignUpReqDto) => {
        console.log('body: ', body);
        const { data } = (await API.post(
            "/api/signup",
            body
        )) as AxiosResponse<User.SignUpResDto>;
        console.log('data: ', data);
        return data;
    };

    const signin = async (body: User.SignInReqDto) => {
        console.log('body: ', body);
        const { data } = (await API.post(
          "/api/login",
          body,
        )) as AxiosResponse<User.SignInResDto>;
        console.log('data: ', data);
        setAccess(data.result.accessToken);
        storeAccess(data.result.accessToken);
        return data;
      };

    return { signup, signin };
};