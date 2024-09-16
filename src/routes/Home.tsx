import { useQuery } from "react-query";
import { getBoxOffice, getMoviesInfo } from "../modules/fetchs";
import { useRecoilState } from "recoil";
import { DailyList } from "../modules/atoms";
import { useEffect, useState } from "react";
import { useFetcher } from "react-router-dom";

function Home(){
    const [Loading, setLoading] = useState(true);

    const {isLoading, data} = useQuery({
        queryKey: "movies",
        queryFn: getBoxOffice
    });

    const [Movies, setMovies] = useRecoilState(DailyList);

    const getMovieDatas = async() => {
        const result = await(data?.map((movie: any) => getMoviesInfo(movie)));
        await Promise.all(result).then((result) => {
            setMovies(result);
            console.log(Movies);
            setLoading(false)
        });
    };

    useEffect(() => {
        getMovieDatas();
    }, [Loading])
    
    return (
        <div></div>
    );
};

export default Home;