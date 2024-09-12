//Movie Data Fetch File

//Fetch Function's
//주간 박스오피스 1 ~ 10위까지의 영화 data 받아오는
//fetch function

const KMDb_APIs = (
    "http://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp?collection=kmdb_new2&detail=Y&ServiceKey=5UPCXV6TPKSU1P8QHI31&title=파일럿&director=김한결"
);
export async function MoviesFetch(){
    const Kobis_Data = await fetch(
        `http://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=3a15c5393ac14d11f6b132d6a07f330c&targetDt=20240910`
    );
    const json = await Kobis_Data.json();
    return json;
};

export async function MovieDBFetch(){
    const KMDb_Data = await fetch(KMDb_APIs);
    const json = await KMDb_Data.json();

    return json;
};