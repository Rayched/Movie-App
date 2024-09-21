//전역 state로 관리할 것
//영화 제목(title), 영화 포스터 url(posters)..?

import { atom } from "recoil";

export interface I_MovieDatas {
    movieNm: string|undefined;
    openDt: string|undefined;
    director: string|undefined;
    posters: string|undefined;
    plots: string|undefined;
}

export const API_Datas = atom<I_MovieDatas[]|undefined>({
    key: "posters",
    default: []
})