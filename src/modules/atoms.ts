//전역 state로 관리할 것
//영화 제목(title), 영화 포스터 url(posters)..?

import { atom } from "recoil";

export const Movies = atom({
    key: "Movies",
    default: [] as any
})