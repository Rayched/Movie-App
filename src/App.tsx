import React, { useEffect } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { MoviesFetch } from './MovieFetch';

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
  const {isLoading, data: MoviesData, error} = useQuery({
    queryKey: "Movies",
    queryFn: MoviesFetch
  });

  useEffect(() => {
    console.log(isLoading);
    console.log(MoviesData);
  })

  return (
    <MainWrapper>
      <Title>
        <h3>Movie App</h3>
      </Title>
      <div className="Item">
        <h3>Hello World</h3>
      </div>
    </MainWrapper>
  );
}

export default App;