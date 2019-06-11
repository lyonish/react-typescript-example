import * as React from "react";
import axios from "axios";

const config = require("../../config");

import styled from "styled-components";

import { EmployeeType } from "../types";

export interface AdminTableRowProps {
  employee: EmployeeType;
  key: number;
  refreshTable: () => Promise<void | {}>;
}

export class AdminTableRow extends React.Component<AdminTableRowProps> {
  // public static defaultProps: AdminTableRowProps = {
  // employee: {id: },
  // key: 0,
  // refreshTable: () => Promise<void | {}>
  // };

  constructor(props) {
    super(props);

    this.handleClickDeleteButton = this.handleClickDeleteButton.bind(this);
  }

  // need to be handled here otherwise can't take the parameters cleanly like this.props
  handleClickDeleteButton() {
    axios
      .delete(
        `http://localhost:7071/api/users/destroy?name=${
          this.props.employee.name
        }`
      )
      .then(response => {
        this.props.refreshTable();
      });
  }

  render() {
    const employee = this.props.employee;
    const admin = employee.admin === true ? "○" : "x";
    const owner = employee.owner === true ? "○" : "x";

    return (
      <Tr key={this.props.key}>
        <td>{employee.id}</td>
        <td>{employee.name}</td>
        <td>{employee.email}</td>
        <td>{admin}</td>
        <td>{owner}</td>
        <td />
        <td>
          <Button
            className="button-action"
            onClick={this.handleClickDeleteButton}
          >
            x
          </Button>
        </td>
      </Tr>
    );
  }
}

//////////
// Style
//////////
const Tr = styled.tr``;

const Button = styled.button`
  padding: 2px 6px 4px;
`;
