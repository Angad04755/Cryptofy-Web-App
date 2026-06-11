import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
const HomePage = lazy(() => import("../pages/HomePage"));
const PriceList = lazy(() => import("../components/pricelist/PriceList"))
const PriceDetails = lazy(() => import("../components/pricedetails/PriceDetails"))
const Search = lazy(() => import("../components/search/Search"));
function AppRoutes() {
    return (
        <Suspense>
        <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/prices" element={<PriceList/>}/>
        <Route path="/coin/:id" element={<PriceDetails/>}/>
        <Route path="/search" element={<Search/>}/>
        </Routes>
        </Suspense>
    )
}
export default AppRoutes;