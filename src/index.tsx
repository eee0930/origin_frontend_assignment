import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import { GlobalStyle, BasicStyle } from './globalStyled';
import { ThemeProvider } from 'styled-components';
import { lightTheme } from './theme';
import { RecoilRoot } from 'recoil';

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <GlobalStyle />
      <BasicStyle />
      <ThemeProvider theme={lightTheme}>
        <App />
      </ThemeProvider>
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById('root')
);
