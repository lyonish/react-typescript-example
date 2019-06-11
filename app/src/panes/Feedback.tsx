import * as React from "react";
import axios from "axios";

import styled from "styled-components";
import { Field } from "../CommonStyles";

const config = require("../../config");

import { AssignedFeedbacks } from "../components/AssignedFeedbacks";
import { FeedbackForm } from "../components/FeedbackForm";
import { FeedbackType } from "../types";

export interface FeedbackProps {
  loggedin: boolean;
  username: string;
}

export interface FeedbackState {
  feedbacks: FeedbackType[];
  form: {
    id: number;
    reviewee: string;
    // ,
    // field1: string,
    // feild2: string,
    // feild3: string
  };
}

async function refreshTable() {
  console.log("refreshtable");
}

export class Feedback extends React.Component<FeedbackProps, FeedbackState> {
  constructor(props) {
    super(props);

    this.state = {
      feedbacks: [],
      form: {
        id: null,
        reviewee: ""
        // ,
        // field1: '',
        // feild2: '',
        // feild3: ''
      }
    };

    this.refreshTable = this.refreshTable.bind(this);
    this.switchFormReviewee = this.switchFormReviewee.bind(this);
  }

  async refreshTable() {
    return await axios
      .get(
        `${config.API_HOST}/api/feedbacks/list?reviewer=${this.props.username}`
      )
      .then(response => {
        this.setState({ feedbacks: response.data });
      });
  }

  async componentWillMount() {
    if (this.props.loggedin) {
      this.refreshTable();
    }
  }

  switchFormReviewee(e: React.MouseEvent<HTMLTableRowElement>) {
    console.log("switchFillingFeedback");
    console.log(e.currentTarget.children[0]);
    const fidTD: HTMLElement = e.currentTarget.querySelectorAll("td")[0]; // .children doesn't return HTMLElement
    const reviewerTD: HTMLElement = e.currentTarget.querySelectorAll("td")[1]; // .children doesn't return HTMLElement
    const _id: number = Number.parseInt(fidTD.innerText);
    console.log("NNNNNN_id");
    console.log(_id);
    const _reviewee: string = reviewerTD.innerText;
    let form = { ...this.state.form };
    form.id = _id;
    form.reviewee = _reviewee;
    this.setState({
      form
    });
  }

  notLoggedinMessage = () => (
    <NotLoggedin>
      Please log in. <br /> If you don't have an account, please contact to your
      manager.
    </NotLoggedin>
  );

  render() {
    // wait data
    if (!this.state) {
      return <div />;
    }
    if (!this.state.feedbacks) {
      return <div />;
    }

    const Form = props => {
      if (!this.state.form.id) {
        return <div />;
      }
      return (
        <FeedbackForm
          username={this.props.username}
          id={this.state.form.id}
          reviewee={this.state.form.reviewee}
          refreshTable={this.refreshTable}
        />
      );
    };

    return (
      <React.Fragment>
        {!this.props.loggedin && <this.notLoggedinMessage />}
        {this.props.loggedin && (
          <div>
            <Field>
              <AssignedFeedbacks
                feedbacks={this.state.feedbacks}
                switchFormReviewee={this.switchFormReviewee}
              />
            </Field>
            <Field>
              <Form />
            </Field>
          </div>
        )}
      </React.Fragment>
    );
  }
}

//////////
// Style
//////////
const Div = styled.div`
  height: 100%;
  padding: 30px 60px;
  text-align: left;
  color: palevioletred;
`;

const NotLoggedin = styled.div`
  text-align: center;
  margin: 60px auto;
  line-height: 42px;
  color: palevioletred;
  font-size: 24px;
`;
