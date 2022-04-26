import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import theme from "./theme";
import { ThemeProvider } from "@material-ui/core";
import { MoralisProvider } from "react-moralis";
import Moment from "react-moment";

Moment.startPooledTimer();
Moment.globalFormat = 'hh:mm:ss';

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <MoralisProvider initializeOnMount={false}>
    <ThemeProvider theme={theme}>
      <React.StrictMode>
        <App/>
      </React.StrictMode>
    </ThemeProvider>
  </MoralisProvider>
);
