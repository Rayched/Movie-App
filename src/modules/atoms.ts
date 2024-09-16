import { atom } from "recoil";

interface I_AllMovies {
    audiAcc: string;
    audiChange: string;
    audiCnt: string;
    audiInten: string;
    movieCd: string;
    movieNm: string;
    openDt: string;
    rank: string;
    rankInten: string ;
    rankOldAndNew: string;
    rnum: string;
    salesAcc: string;
    salesAmt: string ;
    salesChange: string;
    salesInten: string;
    salesShare: string;
    scrnCnt: string;
    showCnt: string;
};

export const DailyList= atom<I_AllMovies[]>({
    key: "DailyList",
    default: []
});