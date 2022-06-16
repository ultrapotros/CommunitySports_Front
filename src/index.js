import React from "react";
import ReactDOM from "react-dom";
import i18next from "i18next";
import global_en from "./translations/en/global"
import global_es from "./translations/es/global"
import { I18nextProvider } from "react-i18next";
import "./style.scss";

import App from "./App";
import reportWebVitals from "./reportWebVitals";

i18next.init({
  interpolation: { escapeValue: false },
  lng: "es",
  resources: {
    es: {
      global: global_es,
    },
    en: {
      global: global_en,
    },
  },
});

ReactDOM.render(
  <I18nextProvider i18n={i18next}>
    <App />
  </I18nextProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
