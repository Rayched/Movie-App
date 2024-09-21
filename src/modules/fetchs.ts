//fetch functions
import { getDateTime } from "./getDateTime";

const targetDt = getDateTime();

const Kofic_baseURL = "http://www.kobis.or.kr/kobisopenapi/webservice/rest/";
const Kofic_Key = "3a15c5393ac14d11f6b132d6a07f330c";

const KMDb_baseURL = "http://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp?collection=kmdb_new2"
const KMDb_Key = "5UPCXV6TPKSU1P8QHI31";

export const MovieInfos = async(movie: any) => {
    const getMovieInfos = await(
        await (
            await fetch(`${KMDb_baseURL}&detail=Y&title=${movie?.movieNm}&ServiceKey=${KMDb_Key}`)
        ).json()
    ).Data[0].Result[0];

    return {
        "rank": movie?.rank,
        "movieCd": movie?.movieCd,
        "movieNm": movie?.movieNm,
        "director": getMovieInfos?.directors.director[0].directorNm,
        "openDt": movie.openDt,
        "posterURLs": getMovieInfos?.posters,
        "plot": getMovieInfos.plots.plot.plotText
    };
};

export async function DailyBoxOffice(){
    const getBoxoffice = await(
        await(
            await fetch(`${Kofic_baseURL}/boxoffice/searchDailyBoxOfficeList.json?key=${Kofic_Key}&targetDt=${targetDt}`)
        ).json()
    ).boxOfficeResult.dailyBoxOfficeList;

    const BoxOffice = await (getBoxoffice?.map((movie: any) => MovieInfos(movie.movieNm)));
    const result = await Promise.all(BoxOffice).then((resp) => {
        //console.log(resp);
        return [...resp];
    });

    return result;
};

export async function KMDB_Test(movieNm: string) {
    const resp = await (await(
        await fetch(`${KMDb_baseURL}&detail=Y&title=${movieNm}&ServiceKey=${KMDb_Key}`)
    ).json()).Data[0].Result[0];

    return resp;
};