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

export interface I_BoxOfficeData {
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

interface I_MovieDetail {
    movieNm: string;
    movieCd: string;
    director: string;
    posters: string;
    plots: string;
};

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
export async function MovieInfo(movieNm: string) {
    const Infos = await (
        await fetch(`${KMDb_baseURL}&detail=Y&title=${movieNm}&ServiceKey=${KMDb_Key}`)
    ).json()

    return Infos;
};

export async function DailyBoxOffice(){
    const boxoffice = await(
        await(
            await fetch(`${Kofic_baseURL}/boxoffice/searchDailyBoxOfficeList.json?key=${Kofic_Key}&targetDt=${targetDt}`)
        ).json()
    ).boxOfficeResult.dailyBoxOfficeList;

    return boxoffice;
};

//Detail Page 용 fetch function
export async function MovieDetail({movieCd}: I_MovieDetail){
    const details = await (
        await (
            await fetch(`${Kofic_baseURL}/movie/searchMovieInfo.json?key=${Kofic_Key}&movieCd=${movieCd}`)
        ).json()
    ).movieInfoResult?.movieInfo;

    return details;
};