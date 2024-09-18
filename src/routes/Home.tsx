import { useQuery } from "react-query";
import { DailyBoxOffice, MovieInfo } from "../modules/fetchs";
import { useEffect } from "react";

function Home(){
    const {isLoading: isMovies, data: boxOffice} = useQuery({
        queryKey: "movies",
        queryFn: DailyBoxOffice
    });

    const {isLoading: isInfos, data: movieInfo} = useQuery({
        queryKey: "movieInfos",
        queryFn: MovieInfo
    });

    const isLoading = isMovies || isInfos;

    useEffect(() => {
        console.log({boxOffice, movieInfo});
    }, [isLoading]);
    
    return (
        <div>
            {
                isLoading ? <div>로딩 중...</div>
                : <div>데이터 로딩 완료!!</div>
            }
        </div>
    );
};

export default Home;