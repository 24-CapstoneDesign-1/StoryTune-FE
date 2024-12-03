import { AxiosResponse } from "axios";
import { API, getAccess, setAccess, storeAccess } from "@/shared";

export const AuthService = () => {

    const signup = async (body: User.SignUpReqDto) => {
        const { data } = (await API.post(
            "/api/signup",
            body
        )) as AxiosResponse<User.SignUpResDto>;
        return data;
    };

    const signin = async (body: User.SignInReqDto) => {
        const { data } = (await API.post(
          "/api/login",
          body,
        )) as AxiosResponse<User.SignInResDto>;
        setAccess(data.result.accessToken);
        storeAccess(data.result.accessToken);
        return data;
      };

    const currentUser = async () => {
        const { data } = (await API.get(
            "/api/user", {
            headers: {
                Authorization: `Bearer ${getAccess()}`,
            }
          }
        )) as AxiosResponse<User.CurrentUserResDto>;
        return data;
    };

    return { signup, signin, currentUser };
};