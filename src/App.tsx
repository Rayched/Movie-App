import React, { useEffect } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { DailyBoxOffice_Fetch, KMDb_MovieInfo } from './modules/fetchs';

const MainWrapper = styled.div`
  padding: 5px 0px;
  height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${(props) => props.theme.bgColor};
  color: ${(props) => props.theme.textColor};

  .Item {
    width: 150px;
    height: 90px;
    display: flex;
    justify-content: center;
    align-items: center;

    background-color: ${(props) => props.theme.itemColor};
  }
`;

const Title = styled.header`
  font-weight: bold;
  background-color: inherit;
  color: inherit;
`;

function App(){
  const {isLoading: KoficLoading, data: KoficData, error} = useQuery({
    queryKey: "Movies",
    queryFn: DailyBoxOffice_Fetch
  });

  const {isLoading: KMDbLoading, data: KMDb_Data} = useQuery({
    queryKey: "MovieDetail",
    queryFn: KMDb_MovieInfo
  });

  useEffect(() => {
    console.log(KMDb_Data);
    console.log(KoficData);
  });

  const PosterURL = "http://file.koreafilm.or.kr/thm/02/99/18/33/tn_DPK021733.jpg";

  return (
    <MainWrapper>
      <Title>
        <h3>Movie App</h3>
      </Title>
      <div className="Item">
        <h3>Hello World</h3>
      </div>
      <div>
        <img src={PosterURL} />
      </div>
    </MainWrapper>
  );
}

export default App;