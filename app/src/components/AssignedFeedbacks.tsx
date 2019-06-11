import * as React from "react";

import styled from "styled-components";
import { ContentWrapper } from "../CommonStyles";

import { AssignedFeedbackRow } from "./AssignedFeedbackRow";

import { FeedbackType } from "../types";

export interface AssignedFeedbacksProps {
  feedbacks: FeedbackType[];
  switchFormReviewee: (
    e: React.MouseEvent<HTMLTableRowElement, MouseEvent>
  ) => void;
  // refreshTable: () => Promise<void | {}>;
}

export const AssignedFeedbacks = (props: AssignedFeedbacksProps) => {
  return (
    <ContentWrapper>
      <h3>ASSIGNED FEEDBACKS</h3>
      {props.feedbacks.length === 0 && (
        <div>You Do Not Have Any Assigned Feedback.</div>
      )}
      {props.feedbacks.length > 0 && (
        <Table>
          <thead>
            <tr>
              <th>FID</th>
              <th>REVIEWEE</th>
              <th>ASSIGNED DATE</th>
              <th>DUE DATE</th>
            </tr>
          </thead>
          <tbody>
            {props.feedbacks.map((feedback: FeedbackType, idx: number) => {
              return (
                <AssignedFeedbackRow
                  key={idx}
                  feedback={feedback}
                  switchFormReviewee={props.switchFormReviewee}
                />
              );
            })}
          </tbody>
        </Table>
      )}
    </ContentWrapper>
  );
};
//////////
// Style
//////////
const Table = styled.table`
  width: 80%;
  margin: 10px 10%;
  text-align: center;
  border-collapse: collapse;
`;

const Wrapper = styled.div`
  margin: 60px 10%;
  text-align: left;
`;
