import * as React from "react";
import axios from "axios";

const config = require("../../config");

import styled from "styled-components";

import { FeedbackType } from "../types";

export interface AssignedFeedbackRowProps {
  feedback: FeedbackType;
  key: number;
  switchFormReviewee: (
    e: React.MouseEvent<HTMLTableRowElement, MouseEvent>
  ) => void;
}

export class AssignedFeedbackRow extends React.Component<
  AssignedFeedbackRowProps
> {
  // public static defaultProps: AssignedFeedbackRowProps = {
  // employee: {id: },
  // key: 0,
  // refreshTable: () => Promise<void | {}>
  // };

  constructor(props) {
    super(props);
  }

  render() {
    const feedback = this.props.feedback;

    return (
      <Tr key={this.props.key} onClick={this.props.switchFormReviewee}>
        <td>{feedback.id}</td>
        <td>{feedback.reviewee}</td>
        <td>{feedback.assignedDate}</td>
        <td>{feedback.dueDate}</td>
      </Tr>
    );
  }
}

//////////
// Style
//////////
const Tr = styled.tr`
  &:hover {
    background-color: rgba(0, 0, 0, 0.2);
  }
`;

const Button = styled.button`
  padding: 2px 6px 4px;
`;
