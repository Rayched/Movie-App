//전역 state로 관리할 것
//영화 제목(title), 영화 포스터 url(posters)..?

import { atom } from "recoil";

export interface I_Poster {
    posterURLs: string|undefined;
}

export const PosterURL = atom<I_Poster[]>({
    key: "posters",
    default: []
})