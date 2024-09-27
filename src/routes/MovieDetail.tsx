import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getMovieDetails } from "../modules/fetchs";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { moviesData } from "../modules/atoms";

function MovieDetail(){
    //Detail Page 간단 작업
    //'베테랑 2' 클릭했다고 가정
    const {movieCd} = useParams();
    const MoviesData = useRecoilValue(moviesData);

    const ConvertData = MoviesData?.find((movies) => {
        return movies?.movieCd === movieCd;
    });

    const {isLoading, data} = useQuery({
        queryKey: "MovieDetail",
        queryFn: () => getMovieDetails(movieCd)
    });

    const Days: string[] = [
        "일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"
    ];

    const getDays = new Date(String(ConvertData?.openDt)).getDay();

    useEffect(() => {
        console.clear();
        console.log(getDays);
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
                    <img src={ConvertData?.posterURLs}/>
                </div>
                <ul>
                    <li>감독: {data?.directors[0].peopleNm} / {data?.directors[0].peopleNmEn}</li>
                    <li>개봉 일: {ConvertData?.openDt} {Days[getDays]}</li>
                </ul>
                <div>
                    <h4>줄거리</h4>
                    <div>{ConvertData?.plot}</div>
                </div>
            </div>
        </div>
    );
};

export default MovieDetail;