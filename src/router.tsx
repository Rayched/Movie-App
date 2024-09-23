//React-Router return하는 router function

import { BrowserRouter, Route, Routes } from "react-router-dom";
import AllMovies from "./routes/AllMovies";
import MovieDetail from "./routes/MovieDetail";


function Router(){
    return (
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <Routes>
                <Route path="/" element={<AllMovies />}/>
                <Route path="/:movieNm" element={<MovieDetail />}/>
            </Routes>
        </BrowserRouter>
    );
};

export default Router;