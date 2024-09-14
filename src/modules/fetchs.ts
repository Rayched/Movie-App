//fetch functions

import { getDays } from "./getDays";

interface I_MovieData {
    movieID?: string;
}

const Kofic_baseURL = "http://www.kobis.or.kr/kobisopenapi/webservice/rest/";
const KMDb_baseURL = "http://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp?collection=kmdb_new2"


//일일 박스오피스 fetch
export async function DailyBoxOffice_Fetch(){
    const targetDates = getDays();

    const Dailys = await fetch(
        `${Kofic_baseURL}/boxoffice/searchDailyBoxOfficeList.json?key=3a15c5393ac14d11f6b132d6a07f330c&targetDt=${targetDates}`
    );

    const json = await Dailys.json();

    return json;
};

//Kofic 영화 상세정보 fetch
export async function Kofic_MovieInfo({movieID}: I_MovieData){
    const MovieInfo = await fetch(
        `${Kofic_baseURL}/movie/searchMovieInfo.json?key=3a15c5393ac14d11f6b132d6a07f330c&movieCd=${movieID}`
    );

    const json = await MovieInfo.json();

    return json;
};

//KMDb 영화 상세정보 fetch
export async function KMDb_MovieInfo(){
    const MovieNm = "파묘";

    const MovieInfo = await fetch(
        `${KMDb_baseURL}&detail=Y&title=${MovieNm}&ServiceKey=5UPCXV6TPKSU1P8QHI31`
    );

    const json = await MovieInfo.json();

    return json;
};