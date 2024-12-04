import { AxiosResponse } from "axios";
import { API, setAccess, storeAccess, getAccess } from "@/shared";
import { useUserStore } from "../stores/useUserStore";

export const AuthService = () => {
    const userStore = useUserStore((statue) => statue);

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

      const getCurrentUser = async () => {
        try {
          const { data } = await API.get("/api/user", {
            headers: {
              Authorization: `Bearer ${getAccess()}`
            }
          }) as AxiosResponse<User.CurrentUserResDto>;
    
          if (data?.result) {
            userStore.setUserAllInfo({
              username: String(data.result.userId),
              name: data.result.name,
              age: 0,
              gender: ''
            });
          }
          return data;
        } catch (error) {
          console.error('Failed to get user info:', error);
          throw error;
        }
      };

    return { signup, signin, getCurrentUser };
};