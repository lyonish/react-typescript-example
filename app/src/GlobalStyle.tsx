import * as React from "react";
import * as ReactDOM from "react-dom";
import style, { createGlobalStyle } from "styled-components";

const GlobalStyleSheet = createGlobalStyle`
  html {
    height: 100%;
  }
  body {
    height: 100%;
    margin: 0px;
  }

  #container {
    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: 25% 1fr;
    height: 100%;
  }

  input[type="text"] ,input[type="email"],input[type="password"] {
    height: 24px;
    margin: 6px 0;
    padding: 0px 6px;
    box-shadow: 3px 3px 1px rgba(0,0,0,0.1);
    border: 2px solid rgba(0,0,0,0.2);
    border-radius: 6px;
    font-size: 12px;
  }

  input[type="checkbox"] {
    width: 18px;
    height: 18px;
    border-radius: 6px;
    border: 2px rgba(0,0,0,0.2) solid;
  }

  textarea {
    box-shadow: 3px 3px 1px rgba(0,0,0,0.1);
    border: 2px solid rgba(0,0,0,0.2);
    border-radius: 6px;
    overflow-y: auto;
    overflow-x: hidden;
  }

  .button-submit {
    height: 36px;
    margin: 6px 0;
    padding: 3px 12px;
    font-size: 18px;
    border-radius: 6px;
    box-shadow: 1px 1px 1px rgba(0,0,0,0.1);
  }

  .button-action {
    border: 2px rgba(0,0,0,0.2) solid;
    border-radius: 6px;
    box-shadow: 1px 1px 1px rgba(0,0,0,0.1);
  }

  .button-table {
    border-radius: 6px;
    background-color: white;
  }

  ul {
    list-style: none;
    padding: 0px;
  }

  tbody:before {
      content: "-";
      display: block;
      line-height: 1em;
      color: transparent;
  }

`;

// export default const is prohibited
// https://koukitips.net/es6-the-reason-export-default-is-not-available-in-const/
export const GlobalStyle = () => (
  <React.Fragment>
    <GlobalStyleSheet />
  </React.Fragment>
);
