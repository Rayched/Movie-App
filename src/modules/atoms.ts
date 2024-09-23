//전역 state로 관리할 것
//영화 제목(title), 영화 포스터 url(posters)..?

import { atom, selector } from "recoil";
import { I_MoviesData } from "./movie_types";

export const moviesData = atom<I_MoviesData[]|undefined>({
    key: "MoviesData",
    default: []
});

export const movieData = selector({
    key: "MovieData",
    get: ({get}) => {
        const movies = get(moviesData);

        const result = movies?.map((movie) => {
            return {
                movidCd: movie?.movieCd,
                posters: movie?.posterURLs?.split("|")[0],
                plots: movie?.plot
            };
        });

        return result;
    }
});