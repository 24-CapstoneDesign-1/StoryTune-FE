import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { PAGE_URL, getAccess, setAccess } from "@/shared";

const AuthRouter = ({ children }: { children: React.ReactNode }) => {
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
        const access_token = getAccess();
        if (!access_token) navigate(PAGE_URL.SignIn);
        else {
            setAccess(access_token);
            // await getUserInfo();
        }
        })();
    }, []);


    return <>{children}</>;
};

export default AuthRouter;
