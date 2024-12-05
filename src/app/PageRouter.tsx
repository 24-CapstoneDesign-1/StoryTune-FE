import { lazy, Suspense } from "react";
import {
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
const Title = lazy(() => import("@/pages/book/createBook/TitlePage"));
const Maked = lazy(() => import ("@/pages/book/createBook/MakedPage"));
const HeroNaming = lazy(() => import("@/pages/book/createBook/HeroNamingPage"));
const Search = lazy(() => import("@/pages/search/SearchPage"));
const MyPage = lazy(() => import("@/pages/mypage/MyPage"));
const MyInfo = lazy(() => import("@/pages/mypage/MyInfoPage"));
const ChangeInfo = lazy(() => import("@/pages/mypage/ChangeInfoPage"));
const FriendList = lazy(() => import("@/pages/mypage/FriendListPage"));
const RolePlayMain = lazy(() => import("@/pages/roleplay/MainPage"));
const FriendPlay = lazy(() => import("@/pages/roleplay/RolePlayBookPage"));
const SelectRole = lazy(() => import("@/pages/roleplay/RoleSelectPage"));
const RolePlay = lazy(() => import("@/pages/roleplay/RolePlayPage"));


const Index = lazy(() => import("@/pages/book/createBook/IndexPage"));
const SelectBook = lazy(() => import("@/pages/book/SelectBookPage"));
const Book = lazy(() => import("@/pages/book/BookPage"));
const Error = lazy(() => import("@/pages/ErrorPage"));

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
                        
                        <Route path={PAGE_URL.MyPage} element={<MyPage />} />
                        <Route path={PAGE_URL.MyInfo} element={<MyInfo />} />
                        <Route path={PAGE_URL.ChangeInfo} element={<ChangeInfo />} />
                        <Route path={PAGE_URL.FriendList} element={<FriendList />} />
                        
                        <Route path={PAGE_URL.RolePlayMain} element={<RolePlayMain />} />
                        <Route path={PAGE_URL.SelectRole} element={<SelectRole />} />
                        <Route path={PAGE_URL.FriendPlay} element={<FriendPlay />} />
                        <Route path={PAGE_URL.RolePlay} element={<RolePlay />} />
                        {/* <Route index element={<Navigate to={PAGE_URL.Home} replace />} /> */}
                            
                            
                        
                        <Route>
                            {/* <Route index element={<Navigate to={PAGE_URL.Home} replace />} /> */}
                            <Route path={PAGE_URL.Home} element={<Home />} />
                            <Route path={PAGE_URL.BookMain} element={<BookMain />} />
                            <Route path={PAGE_URL.SelectBook} element={<SelectBook />} />
                            <Route path={PAGE_URL.BookPhoto} element={<BooKPhoto />} />
                            <Route path={PAGE_URL.Topic} element={<Topic />} />
                            <Route path={PAGE_URL.Hero} element={<Hero />} />
                            <Route path={PAGE_URL.Name} element={<Name />} />
                            <Route path={PAGE_URL.Story} element={<Story />} />
                            <Route path={PAGE_URL.Title} element={<Title />} />
                            <Route path={PAGE_URL.Maked} element={<Maked />} />
                            <Route path={PAGE_URL.HeroNaming} element={<HeroNaming />} />
                            <Route path={PAGE_URL.Index} element={<Index />} />
                            <Route path={PAGE_URL.Search} element={<Search />} />
                            <Route path={PAGE_URL.Book} element={<Book />} />
                            <Route path="*" element={<Error />} />
                        </Route>
                    </Routes>
                </AuthRouter>
            </RootRouter>
        </Suspense>
    );
};

export default PageRouter;