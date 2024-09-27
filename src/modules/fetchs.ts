//fetch functions

export function getDateTime(){
    const DateObj = new Date();

    const Years = String(DateObj.getFullYear());
    const Dates = String(DateObj.getDate() - 1);

    const getMonth = () => {
        const month = DateObj.getMonth() + 1;
        if(month < 10){
            return "0" + String(month);
        } else {
            return String(month);
        }
    };

    const FullDates = Years + getMonth() + Dates;

    return FullDates;
};

interface I_boxOffices {
    audiAcc? : string;
    audiChange? : string;
    audiCnt? : string;
    audiInten? : string;
    movieCd? : string;
    movieNm? : string;
    openDt? : string;
    rank? : string;
    rankInten? : string ;
    rankOldAndNew? : string;
    rnum? : string;
    salesAcc? : string;
    salesAmt? : string ;
    salesChange? : string;
    salesInten? : string;
    salesShare? : string;
    scrnCnt? : string;
    showCnt? : string;
};

export interface I_movies {
    movieNm: string|undefined;
    openDt: string|undefined;
    movieCd: string|undefined;
};

const Kofic_baseURL = "http://www.kobis.or.kr/kobisopenapi/webservice/rest/";

const KMDb_baseURL = "http://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp?collection=kmdb_new2"

const MovieInfos = async(movie: I_movies) => {
    const getInfos = await(
        await (
            await fetch(`${KMDb_baseURL}&detail=Y&title=${movie?.movieNm}&releaseDts=${movie?.openDt?.split("-").join("")}&ServiceKey=5UPCXV6TPKSU1P8QHI31`)
        ).json()
    ).Data[0].Result[0];

    return {
        movieNm: movie?.movieNm,
        openDt: movie.openDt,
        movieCd: movie?.movieCd,
        director: getInfos?.directors.director[0].directorNm,
        posterURLs: getInfos?.posters.split("|")[0],
        plot: getInfos.plots.plot[0].plotText
    };
};

export async function getMoviesData(){
    const targetDt = getDateTime();

    const DailyBoxoffice = await(
        await(
            await fetch(`${Kofic_baseURL}/boxoffice/searchDailyBoxOfficeList.json?key=3a15c5393ac14d11f6b132d6a07f330c&targetDt=${targetDt}`)
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
        await fetch(`${Kofic_baseURL}/movie/searchMovieInfo.json?key=3a15c5393ac14d11f6b132d6a07f330c&movieCd=${movieCd}`)
    ).json()).movieInfoResult.movieInfo;

    return getDetail;
};