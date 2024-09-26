import { lazy, Suspense } from "react";
import {
    Navigate,
    BrowserRouter as RootRouter,
    Route,
    Routes,
  } from "react-router-dom";
import { Loading } from "@/entities";
import AppStyles from "./AppStyles";

import AuthRouter from "./AuthRouter";

import { PAGE_URL } from "@/shared";

const Home = lazy(() => import("@/pages/home/HomePage"));
const SignIn = lazy(() => import("@/pages/auth/SignInPage"));
const SignUp = lazy(() => import("@/pages/auth/SignUpPage"));

const PageRouter = () => {
    return (
        <Suspense fallback={<Loading />}>
            <RootRouter>
                <AppStyles />
                <AuthRouter>
                    <Routes>
                        <Route path={PAGE_URL.SignIn} element={<SignIn />} />
                        <Route path={PAGE_URL.SignUp} element={<SignUp />} />
                        <Route>
                            <Route index element={<Navigate to={PAGE_URL.Home} replace />} />
                            <Route path={PAGE_URL.Home} element={<Home />} />
                        </Route>
                    </Routes>
                </AuthRouter>
            </RootRouter>
        </Suspense>
    );
};

export default PageRouter;