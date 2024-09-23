import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getMovieDetails } from "../modules/fetchs";
import { useEffect } from "react";

function MovieDetail(){
    //Detail Page 간단 작업
    //'베테랑 2' 클릭했다고 가정
    const {movieCd} = useParams();

    const {isLoading, data} = useQuery({
        queryKey: "MovieDetail",
        queryFn: () => getMovieDetails(movieCd)
    });

    useEffect(() => console.log(data), [isLoading]);

    return (
        <div>
            <header>
                <h3>{data?.movieNm}</h3>
            </header>
            <div>
                <div>
                    <img src="http://file.koreafilm.or.kr/thm/02/99/18/54/tn_DPK022660.jpg"/>
                </div>
                <ul>
                    <li>감독: {data?.directors[0].peopleNm} / {data?.directors[0].peopleNmEn}</li>
                    <li>개봉 일: {data?.openDt}</li>
                </ul>
                <div>
                    <h4>줄거리</h4>
                    <div>
                            <p>가족들도 못 챙기고 밤낮 없이 범죄들과 싸우는 베테랑 형사 '서도철'(황정민)과 강력범죄수사대 형사들.</p>
                            <p>어느 날, 한 교수의 죽음이 이전에 발생했던 살인 사건들과 연관성이 있는 것으로 밝혀지며 </p>
                            <p>전국은 연쇄살인범으로 인해 떠들썩해진다. </p>
                            <p>이에 단서를 추적하며 수사를 시작한 형사들. </p>
                            <p>하지만 이들을 비웃기라도 하듯, 연쇄살인범은 다음 살인 대상을 지목하는 예고편을 인터넷에 공개하며 또 한 번 전 국민을 흔들어 놓는다.</p>
                            <p>강력범죄수사대는 서도철의 눈에 든 정의감 넘치는 막내 형사 '박선우' (정해인)를 투입한다. </p>
                            <p>그리고 사건은 새로운 방향으로 흐르게 되는데..."</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieDetail;