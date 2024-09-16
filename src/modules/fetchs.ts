//fetch functions

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

const targetDt = getDateTime();

const Kofic_baseURL = "http://www.kobis.or.kr/kobisopenapi/webservice/rest/";
const Kofic_Key = "3a15c5393ac14d11f6b132d6a07f330c";

const KMDb_baseURL = "http://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp?collection=kmdb_new2"
const KMDb_Key = "5UPCXV6TPKSU1P8QHI31";

//KMDB 영화 상세정보 받아오기

export async function getMoviesInfo(movie: any){
    const getData = await (
        await fetch(`${KMDb_baseURL}&detail=Y&title=${movie?.movieNm}&ServiceKey=${KMDb_Key}`)
    ).json();

    return {
        "title": movie.movieNm,
        "rank": movie.rank,
        "openDt": movie.openDt,
        "audiCnt": movie.audiCnt,
        "posters": getData.Data[0].Result[0].posters,
    }
};

export async function getBoxOffice(){
    const BoxOfficeData = await(await (
        await fetch(`${Kofic_baseURL}/boxoffice/searchDailyBoxOfficeList.json?key=${Kofic_Key}&targetDt=${targetDt}`)
    ).json()).boxOfficeResult.dailyBoxOfficeList;

    /*
    const result = await(BoxOfficeData?.map((movie: any) => getMoviesInfo(movie)));
    
    await Promise.all(result).then((result) => {
        console.log(result)
    });*/
    return BoxOfficeData;
};