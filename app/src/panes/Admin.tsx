import * as React from "react";
import axios from "axios";

import styled from "styled-components";
import { Field } from "../CommonStyles";

// import config from "../../config.js";
const config = require("../../config");

import { AdminTable } from "../components/AdminTable";
import { AddEmployee } from "../components/AddEmployee";
import { AssignFeedback } from "../components/AssignFeedback";
import { FeedbackTable } from "../components/FeedbackTable";

import { EmployeeType, FeedbackType } from "../types";

export interface AdminProps {
  owner: boolean;
}

export interface AdminState {
  employees: EmployeeType[];
  feedbacks: FeedbackType[];
}

export class Admin extends React.Component<AdminProps, AdminState> {
  constructor(props) {
    super(props);

    this.refreshAdminTable = this.refreshAdminTable.bind(this);
    this.refreshFeedbackTable = this.refreshFeedbackTable.bind(this);
    this.onSubmitNewAssignment = this.onSubmitNewAssignment.bind(this);
  }

  async refreshAdminTable(): Promise<void | {}> {
    return await axios
      .get(`${config.API_HOST}/api/users/list`)
      .then(response => {
        this.setState({ employees: response.data });
      });
  }
  async refreshFeedbackTable(): Promise<void | {}> {
    return await axios
      .get(`${config.API_HOST}/api/feedbacks/list`)
      .then(response => {
        this.setState({ feedbacks: response.data });
      });
  }

  async onSubmitNewAssignment() {
    this.refreshAdminTable();
    this.refreshFeedbackTable();
  }

  async componentWillMount() {
    this.refreshAdminTable();
    this.refreshFeedbackTable();
  }

  render() {
    // wait data
    if (!this.state) {
      return <div />;
    }
    if (!this.state.employees || !this.state.feedbacks) {
      return <div />;
    }

    const employees = this.state.employees;
    const employeeNames = employees.map(employee => {
      return employee.name;
    });
    const feedbacks = this.state.feedbacks;

    return (
      <div>
        {this.props.owner && (
          <React.Fragment>
            <Field>
              <AddEmployee refreshTable={this.refreshAdminTable} />
            </Field>
            <Field>
              <AdminTable
                employees={employees}
                refreshTable={this.refreshAdminTable}
              />
            </Field>
          </React.Fragment>
        )}
        <Field>
          <AssignFeedback
            employeeNames={employeeNames}
            refreshTable={this.onSubmitNewAssignment}
          />
        </Field>
        <Field>
          <FeedbackTable
            feedbacks={feedbacks}
            refreshTable={this.refreshFeedbackTable}
          />
        </Field>
      </div>
    );
  }
}

// import * as React from "react";

// import styled from "styled-components";

// export const Admin = (props: AdminProps) => <Div>Admin</Div>;

//////////
// Style
//////////
