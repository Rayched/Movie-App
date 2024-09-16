import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider } from 'styled-components';
import { DarkTheme, LightTheme } from './modules/theme';
import { QueryClient, QueryClientProvider } from 'react-query';
import { RecoilRoot } from 'recoil';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const queryClient = new QueryClient();

const isDark = false;

root.render(
  <React.StrictMode>
    <ThemeProvider theme={isDark ? DarkTheme : LightTheme}>
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <App />
        </RecoilRoot>
      </QueryClientProvider>
    </ThemeProvider>
  </React.StrictMode>
);
