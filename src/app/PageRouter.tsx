import { lazy, Suspense } from "react";
import {
    BrowserRouter as RootRouter,
    Route,
    Routes,
  } from "react-router-dom";
import { Loading } from "@/entities";
import AppStyles from "./AppStyles";

import { PAGE_URL } from "@/shared";

const Home = lazy(() => import("@/pages/home/HomePage"));

const PageRouter = () => {
    return (
        <Suspense fallback={<Loading />}>
            <RootRouter>
                <AppStyles />
                <Routes>
                    <Route>
                        <Route path={PAGE_URL.HOME} element={<Home />} />
                    </Route>
                </Routes>
            </RootRouter>
        </Suspense>
    );
};

export default PageRouter;