import { useQuery } from "react-query";
import { DailyBoxOffice, I_BoxOfficeData, MovieInfo } from "../modules/fetchs";
import { useRecoilState, useSetRecoilState } from "recoil";
import { useEffect } from "react";
import { movieInfoDatas, movieNames } from "../modules/atoms";

function Home(){
    const {isLoading: isMovies, data: boxOffice} = useQuery<I_BoxOfficeData[]>({
        queryKey: "movies",
        queryFn: DailyBoxOffice
    });

    const [names, setNames] = useRecoilState(movieNames);
    const setMovieInfo = useSetRecoilState(movieInfoDatas);

    useEffect(() => {
        setNames(() => boxOffice?.map((movie) => movie.movieNm));
        console.log(names);

        const getInfo = async () => {
            const info = await (
                names?.map((movie) => MovieInfo(movie))
            );
        }
        
        getInfo();
    }, [boxOffice])
    
    return (
        <div>
            {
                isMovies ? <div>로딩 중...</div>
                : (
                <div>
                    {
                        boxOffice?.map((props) => {
                            return <div>{props?.movieNm}</div>
                        })
                    }
                </div>)
            }
        </div>
    );
};

export default Home;