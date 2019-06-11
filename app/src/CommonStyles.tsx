import * as React from "react";
import * as ReactDOM from "react-dom";
import styled, { createGlobalStyle } from "styled-components";

export const ContentWrapper = styled.div`
  margin: 0px 5%;
`;

export const Field = styled.div`
  display: grid;
  grid-template-rows: auto;
  padding: 30px 0px;

  &:nth-child(odd) {
    background: linear-gradient(
      0.5turn,
      rgba(0, 0, 0, 0.025),
      rgba(0, 0, 0, 0.05),
      rgba(0, 0, 0, 0.075),
      rgba(0, 0, 0, 0.05),
      rgba(0, 0, 0, 0.025)
    );
  }
`;
