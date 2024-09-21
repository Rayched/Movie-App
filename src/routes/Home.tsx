import { useQuery } from "react-query";
import { useEffect } from "react";
import { getMovieNames } from "../modules/TestCodes";
import { useRecoilState } from "recoil";
import { API_Datas, I_MovieDatas } from "../modules/atoms";

function Home(){
    const [poster, setPoster] = useRecoilState<I_MovieDatas[]|undefined>(API_Datas);

    const {isLoading: TestLoading, data: API_Test} = useQuery<I_MovieDatas[]>({
        queryKey: "Test",
        queryFn: getMovieNames
    });

    useEffect(() => {
        setPoster(API_Test);
    }, [TestLoading]);

    useEffect(() => {
        console.log("poster is recoil state (atom)");
        console.log(poster);
    }, [poster]);

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
                                                <img src={movies?.posters?.split("|")[0]}/>
                                                {movies?.movieNm} / {movies?.director} / {movies.openDt}
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

/**
 * string.split("|")
 * 
 * string 객체를 지정한 구분자 ("|", " " 등)를 이용해서
 * 문자열 하나를 여러 개의 문자열로 나누는 string method
 * 
 * "|"로 구분된 poster prop의 값을 여러 개의 문자열 객체로 나누고
 * 화면에 띄우고 싶은 것은 첫번째 포스터
 * [0]번 index의 url이므로 아래와 같이 <img />의 src 지정하였다.
 * 
 * <img src={API_Test?.poster.split("|")[0]}/>
 */