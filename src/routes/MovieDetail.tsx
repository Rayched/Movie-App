import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getMovieDetails } from "../modules/fetchs";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { movieData } from "../modules/atoms";

function MovieDetail(){
    //Detail Page 간단 작업
    //'베테랑 2' 클릭했다고 가정
    const {movieCd} = useParams();
    const MoviesData = useRecoilValue(movieData);

    const ConvertData = MoviesData?.find((movies) => {
        return movies?.movidCd === movieCd;
    });

    const {isLoading, data} = useQuery({
        queryKey: "MovieDetail",
        queryFn: () => getMovieDetails(movieCd)
    });

    useEffect(() => {
        console.clear();
        console.log(data);
        console.log(ConvertData);
    }, [isLoading]);

    return (
        <div>
            <header>
                <h3>{data?.movieNm}</h3>
            </header>
            <div>
                <div>
                    <img src={ConvertData?.posters}/>
                </div>
                <ul>
                    <li>감독: {data?.directors[0].peopleNm} / {data?.directors[0].peopleNmEn}</li>
                    <li>개봉 일: {data?.openDt}</li>
                </ul>
                <div>
                    <h4>줄거리</h4>
                    <div>{ConvertData?.plots}</div>
                </div>
            </div>
        </div>
    );
};

export default MovieDetail;