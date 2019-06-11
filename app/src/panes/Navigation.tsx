import * as React from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";

import { Home } from "./Home";
import { LoginForm } from "../components/LoginForm";
import Greeting from "../components/Greeting";

import styled from "styled-components";

export interface NavProps {
  // NavLinks: any;
  updateLoginState: (
    loggedin: boolean,
    username: string,
    admin: boolean,
    owner: boolean
  ) => void;
  loggedin: boolean;
  username: string;
  admin: boolean;
  owner: boolean;
}

export const Navigation = (props: NavProps) => (
  <Nav>
    <LoginWrap>
      {props.loggedin && <Greeting username={props.username} />}
      {!props.loggedin && (
        <LoginForm
          updateLoginState={props.updateLoginState}
          username={props.username}
        />
      )}
    </LoginWrap>
    <MenuWrap>
      {/*      <props.NavLinks />*/}
      <ul>
        <Li>
          <StyledLink to="/">Home</StyledLink>
        </Li>
        <Li>
          <StyledLink to="/feedback">Feedback</StyledLink>
        </Li>
        {(props.admin || props.owner) && (
          <Li>
            <StyledLink to="/admin">Admin</StyledLink>
          </Li>
        )}
      </ul>
    </MenuWrap>
  </Nav>
);

//////////
// Style
//////////
const Nav = styled.nav`
  position: fixed;
  width: 25%;
  height: 100%;
  text-align: left;
  color: palevioletred;
  border-right: 2px rgba(0, 0, 0, 0.2) solid;
`;

const MenuWrap = styled.div`
  padding: 60px 0px 0px 0px;
  border-top: 2px rgba(0, 0, 0, 0.2) solid;
`;

const LoginWrap = styled.div`
  min-height: 330px;
`;

const Li = styled.li`
  line-height: 42px;

  &:hover {
    background-color: #f0f0f0;
    box-shadow: 1px 1px 1px 2px rgba(0, 0, 0, 0.1) inset;
  }
`;

const StyledLink = styled(Link)`
  padding-left: 20%;
  width: 80%;
  display: block;
  text-decoration: none;
`;
