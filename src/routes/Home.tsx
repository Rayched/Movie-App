import { useQuery } from "react-query";
import { DailyBoxOffice } from "../modules/fetchs";

function Home(){
    const {isLoading: isMovies, data: movieData} = useQuery({
        queryKey: "movies",
        queryFn: DailyBoxOffice
    });

    console.log(movieData);
    
    return (
        <div></div>
    );
};

export default Home;