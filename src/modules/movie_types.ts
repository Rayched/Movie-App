//Movie App에서 사용할 interface 모음집

//일일 박스오피스 data types
export interface I_boxOffices {
    audiAcc? : string;
    audiChange? : string;
    audiCnt? : string;
    audiInten? : string;
    movieCd? : string;
    movieNm? : string;
    openDt? : string;
    rank? : string;
    rankInten? : string ;
    rankOldAndNew? : string;
    rnum? : string;
    salesAcc? : string;
    salesAmt? : string ;
    salesChange? : string;
    salesInten? : string;
    salesShare? : string;
    scrnCnt? : string;
    showCnt? : string;
};

//KMDB, 영화 상세정보 fetch function props type
//검색 결과의 정확도를 높이기 위해서 개봉일(openDt)도 추가
export interface I_movies {
    movieNm: string|undefined;
    openDt: string|undefined;
    movieCd: string|undefined;
};

//fetch function MoviesData return 값 types
export interface I_MoviesData {
    movieNm?: string;
    openDt?: string;
    movieCd?: string;
    director?: string;
    posterURLs?: string;
    plot?: string;
};