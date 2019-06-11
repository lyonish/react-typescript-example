import * as React from "react";
import axios from "axios";

import styled from "styled-components";
import { ContentWrapper } from "../CommonStyles";

const config = require("../../config");

export interface AddEmployeeProps {
  refreshTable: () => Promise<void | {}>;
}

export interface AddEmployeeState {
  // open: boolean;
  username: string;
  password: string;
  email: string;
  admin: boolean;
  owner: boolean;
}

export class AddEmployee extends React.Component<
  AddEmployeeProps,
  AddEmployeeState
> {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      email: "",
      admin: false,
      owner: false
    };
  }

  // handleChangeText = (e: React.FormEvent<HTMLInputElement>) => {
  //   const name = e.target.name;
  //   this.setState({ [e.target.name]: e.currentTarget.value });
  // };

  // handleChangeCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const name = e.target.name;
  //   this.setState({ [name]: e.target.checked });
  // };

  handleChangeUsername = (e: React.FormEvent<HTMLInputElement>) => {
    this.setState({ username: e.currentTarget.value });
  };

  handleChangePassword = (e: React.FormEvent<HTMLInputElement>) => {
    this.setState({ password: e.currentTarget.value });
  };

  handleChangeEmail = (e: React.FormEvent<HTMLInputElement>) => {
    this.setState({ email: e.currentTarget.value });
  };

  handleChangeAdmin = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ admin: e.target.checked });
  };

  handleChangeOwner = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ owner: e.target.checked });
  };

  submit = () => {
    // const array = new Uint32Array(1);
    // const rng = window.crypto.getRandomValues(array);

    axios
      .post(
        `${config.API_HOST}/api/user/create`,
        {
          username: this.state.username,
          password: this.state.password,
          email: this.state.email,
          admin: this.state.admin,
          owner: this.state.admin
        },
        { headers: { "Content-Type": "application/json" } }
      )
      .then(() => {
        this.setState({
          username: "",
          password: "",
          email: "",
          admin: false,
          owner: false
        });
        this.props.refreshTable();
      });
  };

  render() {
    const username = !!this.state ? this.state.username : "";
    const password = !!this.state ? this.state.password : "";
    const email = !!this.state ? this.state.email : "";
    const admin = !!this.state ? this.state.admin : false;
    const owner = !!this.state ? this.state.owner : false;

    return (
      <ContentWrapper>
        <h3>ADD AN EMPLOYEE</h3>
        <Table>
          <thead>
            <tr>
              {/*<th />*/}
              <th>USERNAME</th>
              <th>PASSWORD</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th>OWNER</th>
              <th />
              <th />
            </tr>
          </thead>
          <tbody>
            <tr>
              {/*<td> </td>*/}
              <td>
                <input
                  type="text"
                  name="username"
                  value={username}
                  onChange={this.handleChangeUsername}
                />{" "}
              </td>
              <td>
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={this.handleChangePassword}
                />{" "}
              </td>
              <td>
                <input
                  name="email"
                  type="email"
                  value={email}
                  onChange={this.handleChangeEmail}
                />
              </td>
              <td>
                <input
                  name="admin"
                  type="checkbox"
                  checked={admin}
                  onChange={this.handleChangeAdmin}
                />{" "}
              </td>
              <td>
                <input
                  name="owner"
                  type="checkbox"
                  checked={owner}
                  onChange={this.handleChangeOwner}
                />{" "}
              </td>
              <td />
              <td>
                {" "}
                <Button className="button-action" onClick={this.submit}>
                  +
                </Button>
              </td>
            </tr>
          </tbody>
        </Table>
      </ContentWrapper>
    );
  }
}

//////////
// Style
//////////
const Table = styled.table`
  width: 80%;
  margin: 0px 10%;
  text-align: center;
`;

const Button = styled.table`
  padding: 0px 4px;
  font-size: 4px;
`;
