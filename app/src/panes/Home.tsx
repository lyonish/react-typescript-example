import * as React from "react";

import styled from "styled-components";

export interface HomeProps {}

export const Home = (props: HomeProps) => (
  <Div>
    Home
    <br />
    If you need ...
  </Div>
);

//////////
// Style
//////////
const Div = styled.div`
  text-align: center;
  margin: 60px auto;
  line-height: 42px;
  color: palevioletred;
  font-size: 24px;
`;
