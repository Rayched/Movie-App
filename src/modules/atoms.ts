//전역 state로 관리할 것
//영화 제목(title), 영화 포스터 url(posters)..?

import { atom } from "recoil";
import { I_MoviesData } from "../routes/AllMovies";

export const moviesData = atom<I_MoviesData[]|undefined>({
    key: "MoviesData",
    default: []
});

export const isDark = atom({
    key: "isDark",
    default: false
});