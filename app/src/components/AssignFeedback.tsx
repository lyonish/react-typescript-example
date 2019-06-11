import * as React from "react";
import axios from "axios";

import styled from "styled-components";
import { ContentWrapper } from "../CommonStyles";

const config = require("../../config");

export interface AssignFeedbackProps {
  employeeNames: string[];
  refreshTable: () => Promise<void | {}>;
}

export interface AssignFeedbackState {
  // open: boolean;
  reviewer: string;
  reviewee: string;
  dueDate: string;
}

export class AssignFeedback extends React.Component<
  AssignFeedbackProps,
  AssignFeedbackState
> {
  constructor(props) {
    super(props);

    this.state = {
      reviewer: "",
      reviewee: "",
      dueDate: ""
    };
  }

  componentDidMount() {
    // this.setState({
    //   reviewer: " --- ",
    //   reviewee: " --- "
    // });
  }

  // handleChangeText = (e: React.FormEvent<HTMLInputElement>) => {
  //   const name = e.target.name;
  //   this.setState({ [e.target.name]: e.currentTarget.value });
  // };

  // handleChangeCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const name = e.target.name;
  //   this.setState({ [name]: e.target.checked });
  // };

  handleChangeReviewer = (e: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({ reviewer: e.currentTarget.value });
  };

  handleChangeReviewee = (e: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({ reviewee: e.currentTarget.value });
  };

  handleChangeDueDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ dueDate: e.currentTarget.value });
  };

  submit = () => {
    axios
      .post(
        `${config.API_HOST}/api/feedbacks/create`,
        {
          reviewer: this.state.reviewer,
          reviewee: this.state.reviewee,
          dueDate: this.state.dueDate
        },
        { headers: { "Content-Type": "application/json" } }
      )
      .then(() => {
        this.setState({
          reviewer: "",
          reviewee: "",
          dueDate: ""
        });
        this.props.refreshTable();
      });
  };

  render() {
    const reviewer = !!this.state ? this.state.reviewer : "";
    const reviewee = !!this.state ? this.state.reviewee : "";
    const dueDate = !!this.state ? this.state.dueDate : "";

    return (
      <ContentWrapper>
        <h3>ASSIGN A FEEDBACK</h3>
        <Table>
          <thead>
            <tr>
              {/*<th />*/}
              <th>REVIWER</th>
              <th>REVIWEE</th>
              <th>DUE DATE</th>
              <th />
              <th />
            </tr>
          </thead>
          <tbody>
            <tr>
              {/*<td> ADD</td>*/}
              <td>
                {/*                <input
                  name="reviewer"
                  value={reviewer}
                  onChange={this.handleChangeReviewer}
                />{" "}*/}
                <select value={reviewer} onChange={this.handleChangeReviewer}>
                  <option> --- </option>
                  {this.props.employeeNames.map((name: string, idx: number) => {
                    return <option>{name}</option>;
                  })}
                </select>
              </td>
              <td>
                {/*                <input
                  name="reviewee"
                  type="reviewee"
                  value={reviewee}
                  onChange={this.handleChangeReviewee}
                />*/}
                <select value={reviewee} onChange={this.handleChangeReviewee}>
                  <option> --- </option>
                  {this.props.employeeNames.map((name: string, idx: number) => {
                    return <option>{name}</option>;
                  })}
                </select>
              </td>
              <td>
                <input
                  name="due_date"
                  type="text"
                  value={dueDate}
                  onChange={this.handleChangeDueDate}
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
  margin: 10px 10% 0;
  text-align: center;
`;

const Button = styled.button`
  padding: 0px 4px 2px 4px;
  font: 200 15px system-ui;
`;
