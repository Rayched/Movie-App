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
export async function MovieInfo(movie: I_BoxOfficeData) {
    const movieInfos = await(
        await fetch(`${KMDb_baseURL}&detail=Y&title=${movie?.movieNm}&ServiceKey=${KMDb_Key}`)
    ).json();

    const result = movieInfos?.Data[0].Result[0];
    return result;
};

export async function DailyBoxOffice(){
    const boxoffice = await(
        await(
            await fetch(`${Kofic_baseURL}/boxoffice/searchDailyBoxOfficeList.json?key=${Kofic_Key}&targetDt=${targetDt}`)
        ).json()
    ).boxOfficeResult.dailyBoxOfficeList;

    const movieInfos = await (
        boxoffice?.map((movie: I_BoxOfficeData) => MovieInfo(movie))
    );
    /**
     * movieInfos에 전달된 것은 promise 뿐이다.
     * 여기서 'then()' method로 처리가 완료된 데이터를 받아오거나
     * 아니면 MovieInfo 함수에서 처리 완료된 데이터를 return해야 한다...
     */

    return {
        boxoffice, movieInfos
    }
};