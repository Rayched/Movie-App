//API 관련 코드들을 Test하기 위한 function 모음집
import { getDateTime } from "./getDateTime";

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

const targetDt = getDateTime();

const Kofic_baseURL = "http://www.kobis.or.kr/kobisopenapi/webservice/rest/";
const Kofic_Key = "3a15c5393ac14d11f6b132d6a07f330c";

const KMDb_baseURL = "http://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp?collection=kmdb_new2"
const KMDb_Key = "5UPCXV6TPKSU1P8QHI31";

interface I_movies {
    movieNm: string|undefined;
    openDt: string|undefined;
}

//KMDB API Key 정상 여부 테스트
export async function KMDB_Test(movie: I_movies) {
    //movieNm: 영화 이름
    //현재 상영 중인 영화 이름 아무거나 전달
    const resp = await (await(
        await fetch(`${KMDb_baseURL}&detail=Y&title=${movie?.movieNm}&releaseDts=${movie?.openDt?.split("-").join("")}&ServiceKey=${KMDb_Key}`)
    ).json()).Data[0].Result[0];

    return {
        movieNm: movie?.movieNm,
        //openDt: resp?.repRlsDate,
        openDt: movie?.openDt,
        director: resp?.directors.director[0].directorNm,
        posters: resp?.posters,
        plots: resp.plots.plot[0].plotText
    };
};

//일일 박스오피스 데이터에서 영화 이름, movieNm만 추출
//추출한 이름들로 새로운 배열을 만들어서 return하는 함수
export async function getMovieNames() {
    const resp = await (await(
        await fetch(`${Kofic_baseURL}/boxoffice/searchDailyBoxOfficeList.json?key=${Kofic_Key}&targetDt=${targetDt}`)
    ).json()).boxOfficeResult.dailyBoxOfficeList;

    const getNames = await (
        resp?.map((movie: I_boxOffices) => {
            return {
                movieNm: movie.movieNm,
                openDt: movie?.openDt
            };
        })
    );

    const convert = await (
        getNames?.map((movie: I_movies) => KMDB_Test(movie))
    );

    const result = Promise.all(convert).then((value) => value);

    return result;
};