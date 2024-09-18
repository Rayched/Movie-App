//fetch functions

import { stringify } from "querystring";
import { getDateTime } from "./getDateTime";

/*
import { getDays } from "./getDays";

interface I_KoficMovieDetail {
    movieID: string;
}

interface I_KMDbDetail {
    movieNm: string;
}

//일일 박스오피스 fetch
export async function DailyBoxOffice_Fetch(){
    const Dailys = await fetch(
        `${Kofic_baseURL}/boxoffice/searchDailyBoxOfficeList.json?key=${Kofic_Key}&targetDt=${targetDts}`
    );

    const json = await Dailys.json();

    return json;
};

//Kofic 영화 상세정보 fetch
export async function Kofic_MovieInfo({movieID}: I_KoficMovieDetail){
    const MovieInfo = await fetch(
        `${Kofic_baseURL}/movie/searchMovieInfo.json?key=${Kofic_Key}c&movieCd=${movieID}`
    );

    const json = await MovieInfo.json();

    return json;
};*/

interface I_BoxOfficeData {
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

export interface I_movieData {
    title: string|undefined;
    rank: string|undefined;
    openDt: string|undefined;
    audiCnt: string|undefined;
    posters: string|undefined;
}
const targetDt = getDateTime();

const Kofic_baseURL = "http://www.kobis.or.kr/kobisopenapi/webservice/rest/";
const Kofic_Key = "3a15c5393ac14d11f6b132d6a07f330c";

const KMDb_baseURL = "http://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp?collection=kmdb_new2"
const KMDb_Key = "5UPCXV6TPKSU1P8QHI31";

//Home 화면용 fetch functions
/**
 * API List
 * KMDB - 영화 상세정보 api
 * Kofic - 일일 박스오피스 api
 */
export async function MovieInfo() {
    const movieInfos = await (
        await (
            await fetch(`${KMDb_baseURL}&detail=Y&title=파묘&ServiceKey=${KMDb_Key}`)
        ).json()
    ).Data[0].Result[0];

    return movieInfos;
};

export async function DailyBoxOffice(){
    const boxoffice = await(
        await(
            await fetch(`${Kofic_baseURL}/boxoffice/searchDailyBoxOfficeList.json?key=${Kofic_Key}&targetDt=${targetDt}`)
        ).json()
    ).boxOfficeResult.dailyBoxOfficeList;

    return boxoffice;
};

interface I_MovieDetail {
    movieNm: string|undefined;
    movieCd: string|undefined;
};

//Detail Page 용 fetch function
export async function MovieDetail({movieNm, movieCd}: I_MovieDetail){
    const details = await (
        await (
            await fetch(`${Kofic_baseURL}`)
        ).json()
    );

    return details;
};