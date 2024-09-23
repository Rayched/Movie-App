//fetch functions
import { getDateTime } from "./DateTime";
import { I_boxOffices, I_movies } from "./movie_types";

const targetDt = getDateTime();

const Kofic_baseURL = "http://www.kobis.or.kr/kobisopenapi/webservice/rest/";
const Kofic_Key = "3a15c5393ac14d11f6b132d6a07f330c";

const KMDb_baseURL = "http://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp?collection=kmdb_new2"
const KMDb_Key = "5UPCXV6TPKSU1P8QHI31";

const MovieInfos = async(movie: I_movies) => {
    const getInfos = await(
        await (
            await fetch(`${KMDb_baseURL}&detail=Y&title=${movie?.movieNm}&releaseDts=${movie?.openDt?.split("-").join("")}&ServiceKey=${KMDb_Key}`)
        ).json()
    ).Data[0].Result[0];

    return {
        movieNm: movie?.movieNm,
        openDt: movie.openDt,
        movieCd: movie?.movieCd,
        director: getInfos?.directors.director[0].directorNm,
        posterURLs: getInfos?.posters,
        plot: getInfos.plots.plot[0].plotText
    };
};

export async function getMoviesData(){
    const DailyBoxoffice = await(
        await(
            await fetch(`${Kofic_baseURL}/boxoffice/searchDailyBoxOfficeList.json?key=${Kofic_Key}&targetDt=${targetDt}`)
        ).json()
    ).boxOfficeResult.dailyBoxOfficeList;

    const getDatas = await (
        DailyBoxoffice?.map((boxOffice: I_boxOffices) => {
            return {
                movieNm: boxOffice?.movieNm,
                movieCd: boxOffice?.movieCd,
                openDt: boxOffice?.openDt
            };
        })
    );

    const getMovieInfos = await (
        getDatas?.map((movie: I_movies) => MovieInfos(movie))
    );

    const moviesData = Promise.all(getMovieInfos).then((value) => value);

    return moviesData;
};

export async function getMovieDetails(movieCd : string|undefined){
    const getDetail = await(await(
        await fetch(`${Kofic_baseURL}/movie/searchMovieInfo.json?key=${Kofic_Key}&movieCd=${movieCd}`)
    ).json()).movieInfoResult.movieInfo;

    return getDetail;
};