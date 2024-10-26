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
const Main = lazy(() => import("@/pages/auth/MainPage"));
const BookMain = lazy(() => import("@/pages/book/MainPage"));
const BooKPhoto = lazy(() => import("@/pages/book/createBook/PhotoPage"));
const Topic = lazy(() => import("@/pages/book/createBook/TopicPage"));
const Hero = lazy(() => import("@/pages/book/createBook/HeroPage"));
const Name = lazy(() => import("@/pages/book/createBook/NamingPage"));
const Story = lazy(() => import("@/pages/book/createBook/StoryPage"));

const PageRouter = () => {
    return (
        <Suspense fallback={<Loading />}>
            <RootRouter>
                <AppStyles />
                <AuthRouter>
                    <Routes>
                        <Route path={PAGE_URL.Main} element={<Main />} />
                        <Route path={PAGE_URL.SignIn} element={<SignIn />} />
                        <Route path={PAGE_URL.SignUp} element={<SignUp />} />
                        <Route>
                            {/* <Route index element={<Navigate to={PAGE_URL.Home} replace />} /> */}
                            <Route path={PAGE_URL.Home} element={<Home />} />
                            <Route path={PAGE_URL.BookMain} element={<BookMain />} />
                            <Route path={PAGE_URL.BookPhoto} element={<BooKPhoto />} />
                            <Route path={PAGE_URL.Topic} element={<Topic />} />
                            <Route path={PAGE_URL.Hero} element={<Hero />} />
                            <Route path={PAGE_URL.Name} element={<Name />} />
                            <Route path={PAGE_URL.Story} element={<Story />} />
                        </Route>
                    </Routes>
                </AuthRouter>
            </RootRouter>
        </Suspense>
    );
};

export default PageRouter;