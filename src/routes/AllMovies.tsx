import { useQuery } from "react-query";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { getMoviesData } from "../modules/fetchs";
import { I_MoviesData } from "../modules/movie_types";
import { moviesData } from "../modules/atoms";
import { Link } from "react-router-dom";

function AllMovies(){
    const setPoster = useSetRecoilState(moviesData);

    const {isLoading: isMovies, data: MoviesData} = useQuery<I_MoviesData[]>({
        queryKey: "Test",
        queryFn: getMoviesData
    });

    useEffect(() => {
        console.log(MoviesData);
        setPoster(MoviesData);
    }, [isMovies]);
    
    return (
        <div>
            <header>
                    <h3>지금 영화 / Now Movies</h3>
            </header>
            <div>
                <ul>
                    {
                        isMovies ? <h4>영화 데이터를 가져오고 있습니다...</h4>
                        : (
                            <div>
                                {
                                    MoviesData?.map((movies) => {
                                        return (
                                            <li>
                                                <Link to={`/${movies?.movieCd}`}>
                                                    <img src={movies?.posterURLs?.split("|")[0]}/>
                                                    {movies?.movieNm} / {movies?.director} / {movies.openDt}
                                                </Link>
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

export default AllMovies;

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