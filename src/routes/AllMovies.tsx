import { useQuery } from "react-query";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { getDateTime, getMoviesData } from "../modules/fetchs";
import { moviesData } from "../modules/atoms";
import { Link } from "react-router-dom";
import styled from "styled-components";
import ToggleBtn from "../modules/ToggleBtn";

export interface I_MoviesData {
    movieNm?: string;
    openDt?: string;
    movieCd?: string;
    director?: string;
    posterURLs?: string;
    plot?: string;
};

const MainWrapper = styled.div`
    color: ${(props) => props.theme.textColor};
    background-color: inherit;
    display: flex;
    flex-direction: column;
`;

const Headers = styled.header`
    display: flex;
    justify-content: center;

    h3 {
        width: 500px;
        border-bottom: 5px double ${(props) => props.theme.textColor};
        font-weight: bold;
        text-align: center;
        padding: 20px;
        font-size: 20px;
    }

    margin-bottom: 10px;
`;

const MovieList = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const MovieItem = styled.div`
    a {
        display: flex;
        width: 500px;
        text-decoration: none;
        color: inherit;
    };
    justify-content: center;
    display: flex;
    padding: 10px;
    margin: 5px;
    background-color: ${(props) => props.theme.itemColor};
`;

const MoviePoster = styled.img`
    width: 200px;
    height: 240px;
    display: block;
`;

const MovieInfos = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 10px;
    font-weight: bold;
    font-size: 18px;
`;

const Footer = styled.footer`
    display: flex;
    justify-content: right;

    button {
        position: fixed;
        top: 90%;
        left: 90%;
    }
`;

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
        <MainWrapper>
            <Headers>
                    <h3>지금 영화 / Now Movies</h3>
            </Headers>
                {
                    isMovies ? "영화 데이터를 가져오고 있습니다..."
                    : (
                        <MovieList>
                            {
                                MoviesData?.map((movie) => {
                                    return (
                                        <MovieItem key={movie?.movieCd}>
                                            <Link to={`/${movie?.movieCd}`}>
                                                <MoviePoster src={movie?.posterURLs}/>
                                                <MovieInfos>
                                                    <span>{movie.movieNm}</span>
                                                    <span>{movie.openDt}</span>
                                                </MovieInfos>
                                            </Link>
                                        </MovieItem>
                                    );
                                })
                            }
                        </MovieList>
                    )
                }
            <Footer>
                <ToggleBtn />
            </Footer>
        </MainWrapper>
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