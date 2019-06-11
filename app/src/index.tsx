import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter, Route, Link, Switch, Redirect } from "react-router-dom";

import { Navigation } from "./panes/Navigation";

import { Home } from "./panes/Home";
import { Admin } from "./panes/Admin";
import { Feedback } from "./panes/Feedback";

import styled, { createGlobalStyle } from "styled-components";
import { GlobalStyle } from "./GlobalStyle";

interface AppProps {}

interface AppState {
  loggedin: boolean;
  username: string;
  admin: boolean;
  owner: boolean;
}

// Entire App Component
class App extends React.Component<AppProps, AppState> {
  constructor(props) {
    super(props);

    this.state = { loggedin: false, username: "", admin: false, owner: false };
    this.updateLoginState = this.updateLoginState.bind(this);
  }

  updateLoginState(
    loggedin: boolean,
    username: string,
    admin: boolean,
    owner: boolean
  ): void {
    this.setState({
      loggedin: loggedin,
      username: username,
      admin: admin,
      owner: owner
    });
  }

  render() {
    const redirect = "/feedbackaa";

    const admin = !!this.state.loggedin && !!this.state.admin;
    const owner = !!this.state.loggedin && !!this.state.owner;
    console.log("admin");
    console.log(admin);
    console.log(owner);

    return (
      <React.Fragment>
        <BrowserRouter>
          <GlobalStyle />
          <div className="nav">
            <Navigation
              loggedin={this.state.loggedin}
              username={this.state.username}
              admin={this.state.admin}
              owner={this.state.owner}
              updateLoginState={this.updateLoginState}
            />
          </div>
          <div className="content">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route
                path="/feedback"
                render={props => (
                  <Feedback
                    loggedin={this.state.loggedin}
                    username={this.state.username}
                  />
                )}
              />
              {(admin || owner) && (
                <Route
                  path="/admin"
                  render={props => <Admin owner={this.state.owner} />}
                />
              )}
            </Switch>
          </div>
        </BrowserRouter>
      </React.Fragment>
    );
  }
}

//////////
// Style
//////////

///////////

// export ReactDOM
const Index = ReactDOM.render(<App />, document.getElementById("container"));

export default Index;
