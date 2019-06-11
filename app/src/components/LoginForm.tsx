import * as React from "react";
import axios from "axios";
import styled from "styled-components";

const config = require("../../config");

export interface LoginFormProps {
  username: string;
  updateLoginState: (
    loggedin: boolean,
    username: string,
    admin: boolean,
    owner: boolean
  ) => void;
}

export interface LoginFormState {
  username: string;
  password: string;
}

export class LoginForm extends React.Component<LoginFormProps, LoginFormState> {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: ""
    };

    this.submit = this.submit.bind(this);
    this.handleChangeUsername = this.handleChangeUsername.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
  }

  handleChangeUsername(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      username: e.currentTarget.value
    });
  }
  handleChangePassword(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      password: e.currentTarget.value
    });
  }

  submit(e: React.MouseEvent) {
    e.preventDefault();

    axios
      .put(`${config.API_HOST}/api/user/login`, {
        username: this.state.username,
        password: this.state.password
      })
      .then(response => {
        this.props.updateLoginState(
          response.data.success,
          response.data.username,
          response.data.admin,
          response.data.owner
        );
        this.setState({ username: "", password: "" });
      });
  }

  render() {
    const username = this.state ? this.state.username : "";
    const password = this.state ? this.state.password : "";

    return (
      <Form>
        <Label>LOG IN</Label>
        Username:
        <Input
          type="text"
          name="username"
          value={username}
          onChange={this.handleChangeUsername}
        />
        Password:
        <Input
          type="password"
          name="password"
          value={password}
          onChange={this.handleChangePassword}
        />
        <br />
        <SubmitButton className="button-submit" onClick={this.submit}>
          Log in
        </SubmitButton>
      </Form>
    );
  }
}

//////////
// Style
//////////
const Form = styled.form`
  display: block;
  padding: 30px 0px 30px 20%;
`;

const Input = styled.input`
  display: block;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 12px;
  padding-bottom: 12px;
  font-size: 21px;
`;

const SubmitButton = styled.button`
  display: block;
`;
