import * as React from "react";
import axios from "axios";

const config = require("../../config");

import styled from "styled-components";

import { FeedbackType } from "../types";

export interface FeedbackTableRowProps {
  feedback: FeedbackType;
  key: number;
  refreshTable: () => Promise<void | {}>;
}

export class FeedbackTableRow extends React.Component<FeedbackTableRowProps> {
  constructor(props) {
    super(props);

    this.handleClickDeleteButton = this.handleClickDeleteButton.bind(this);
  }

  // need to be handled here otherwise can't take the parameters cleanly like this.props
  handleClickDeleteButton() {
    axios
      .delete(
        `http://localhost:7071/api/feedbacks/destroy?id=${
          this.props.feedback.id
        }`
      )
      .then(response => {
        this.props.refreshTable();
      });
  }

  render() {
    const { reviewer, reviewee } = this.props.feedback;
    const fid = this.props.feedback.id;
    const assignedDate =
      this.props.feedback.assignedDate.substring(0, 10) +
      " " +
      this.props.feedback.assignedDate.substring(11, 19);
    const dueDate =
      this.props.feedback.dueDate.substring(0, 10) +
      " " +
      this.props.feedback.dueDate.substring(11, 19);

    return (
      <Tr key={this.props.key}>
        <td>{fid}</td>
        <td>{reviewer}</td>
        <td>{reviewee}</td>
        <td>{assignedDate}</td>
        <td>{dueDate}</td>
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
