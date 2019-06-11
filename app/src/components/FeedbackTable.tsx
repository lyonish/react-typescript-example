import * as React from "react";

import { FeedbackTableRow } from "./FeedbackTableRow";
import { FeedbackType } from "../types";

import styled from "styled-components";
import { ContentWrapper } from "../CommonStyles";

export interface FeedbackTableProps {
  feedbacks: FeedbackType[];
  refreshTable: () => Promise<void | {}>;
}

export const FeedbackTable = (props: FeedbackTableProps) => (
  <ContentWrapper>
    <h3>FEEDBACKS</h3>
    <Table>
      <thead>
        <tr>
          <th>ID</th>
          <th>REVIEWER</th>
          <th>REVIEWEE</th>
          <th>ASSIGNED DATE</th>
          <th>DUE DATE</th>
          <th />
          <th />
        </tr>
      </thead>
      <tbody>
        {console.log(this.props)}
        {props.feedbacks.map((feedback: any, idx: number) => {
          return (
            <FeedbackTableRow
              key={idx}
              feedback={feedback}
              refreshTable={props.refreshTable}
            />
          );
        })}
      </tbody>
    </Table>
  </ContentWrapper>
);
//////////
// Style
//////////
const Table = styled.table`
  width: 80%;
  margin: 60px 10%;
  text-align: center;
`;
