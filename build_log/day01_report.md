
## 'Movie App' Project 레포트

- **📆 1일차 / 2024.09.11 수요일**

---

### 초기 프로젝트 세팅

- **Movie App** 개발할 때 사용할 라이브러리들을 설치해줬다.
- 설치한 라이브러리의 목록은 다음과 같다.

``` ts
const Libs = {
    CSS: "styled-components",
    Data_Fetch: "react-query",
    Routing: "react-router-dom"
}
```

- `CSS` 부분은 프로젝트의 규모가 크진 않기 때문에 <br/>
    Component 별로 Style 설정할 수 있는 `styled-components` 채용하였다.
- Open API 통해서 영화 정보를 받아와서 이걸 웹 페이지에 출력할텐데
- Data Fetch 하는 부분은 `react-query`의 숙련도도 높일 겸해서 <br/>
    `react-query` 채용하게 됐다.
- 마지막으로 React 환경에서 Routing 구현하는 방법으로는 <br/>
    `react-router` 쪽이 제일 익숙하기 때문에 자연스럽게 채용하였다.

---

### 테스트 용, 'LightTheme', 'DarkTheme' 구현

- 일단 간단하게 'Light/Dark' 테마를 구현하였다.

<img src="ref/theme_sample.png"/>

- 최상위 Components인 `index.tsx`에 `<ThemeProvider>` import
- 변수 `isDark`의 값이 `true`이면 `DarkTheme`, `false`이면 `LightTheme` theme으로 가진다.

``` tsx
import { ThemeProvider } from 'styled-components';
import { DarkTheme, LightTheme } from './theme';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const queryClient = new QueryClient();

const isDark = false;

root.render(
  <React.StrictMode>
    <ThemeProvider theme={isDark ? DarkTheme : LightTheme}>
        <App />
    </ThemeProvider>
  </React.StrictMode>
);
```
- 테마 전환 기능은 Movie App의 기본적인 부분을 구현한 뒤에
- 진행해도 늦지는 않으니, 지금은 이 정도만 작업하고 마친다.

---

### Open API, 영화 data fetch하기

- 이전 버전에서는 영화진흥위원회 Open API로, 영화 data를 fetch 했는데
- 국내 영화에 대한 정보를 보여주고 싶었기 때문에
- 나름 적합한 Open API였지만, 조금 아쉬운 부분이 있었다.

- `포스터`, `스틸컷`, `줄거리`,.. 없던게 아쉬웠었다.
- 물론 그때 당시에는 이러한 아쉬운 점을 해결할 지식이 없었기에 <br/> 
    아쉬운대로 개발을 진행했었다.
- 이후, 프로젝트를 마치고 