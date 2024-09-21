import { useQuery } from "react-query";
import { DailyBoxOffice, KMDB_Test, MovieInfos } from "../modules/fetchs";
import { useEffect, useState } from "react";
import { getDateTime } from "../modules/getDateTime";
import { getMovieNames } from "../modules/TestCodes";

interface I_movies {
    director: string|undefined;
    movieCd: string|undefined;
    movieNm: string|undefined;
    openDt: string|undefined;
    plot: string|undefined;
    posterURLs: string|undefined;
    rank: string|undefined;
}

interface I_BoxOffice {
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
}

const Kofic_baseURL = "http://www.kobis.or.kr/kobisopenapi/webservice/rest/";
const Kofic_Key = "3a15c5393ac14d11f6b132d6a07f330c";

const targetDt = getDateTime();

function Home(){
    const [Movies, setMovies] = useState<I_BoxOffice[]>([]);

    const {isLoading: TestLoading, data: API_Test} = useQuery({
        queryKey: "Test",
        //queryFn: () => KMDB_Test("베테랑2")
        queryFn: getMovieNames
    });

    useEffect(() => {
        console.log(API_Test);
    }, [TestLoading])

    return (
        <div>
            <header>
                    <h3>지금 영화 / Now Movies</h3>
            </header>
            <div>
                <ul>
                    {
                        TestLoading ? <h4>영화 데이터를 가져오고 있습니다...</h4>
                        : (
                            <div>
                                {
                                    API_Test?.map((movies) => {
                                        return (
                                            <li>
                                                <img src={movies.posters.split("|")[0]}/>
                                                {movies?.movieNm} / {movies?.director}
                                            </li>
                                        );
                                    })
                                }
                            </div>
                        )
                    }
                </ul>
            </div>
        </div>
    );
};

export default Home;