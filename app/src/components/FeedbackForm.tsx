import * as React from "react";
import axios from "axios";

import styled from "styled-components";

const config = require("../../config");

export interface FeedbackFormProps {
  id: number;
  reviewee: string;
  username: string;
  refreshTable: () => Promise<void | {}>;
}

interface FeedbackFormState {
  evalscore: string;
  field1: string;
  field2: string;
  field3: string;
}

export class FeedbackForm extends React.Component<
  FeedbackFormProps,
  FeedbackFormState
> {
  constructor(props) {
    super(props);

    this.state = {
      evalscore: "",
      field1: "",
      field2: "",
      field3: ""
    };
    this.handleChangeTextarea = this.handleChangeTextarea.bind(this);
    this.handleChangeOptions = this.handleChangeOptions.bind(this);
    this.submit = this.submit.bind(this);
  }

  handleChangeTextarea(e: React.ChangeEvent<HTMLTextAreaElement>) {
    this.setState({
      [e.currentTarget.name]: e.currentTarget.value
    } as Pick<FeedbackFormState, keyof FeedbackFormState>);
  }

  handleChangeOptions(e: React.ChangeEvent<HTMLSelectElement>) {
    this.setState({
      evalscore: e.currentTarget.value
    });
  }

  submit(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    axios
      .put(`${config.API_HOST}/api/feedback/update`, {
        id: this.props.id,
        evalscore: this.state.evalscore,
        field1: this.state.field1,
        field2: this.state.field2,
        field3: this.state.field3
      })
      .then(response => {
        console.log("response");
        console.log(response);
        this.setState({
          evalscore: "",
          field1: "",
          field2: "",
          field3: ""
        });
      });
  }

  render() {
    return (
      <Form>
        <label>Overall Evaluation Score (1-5)</label>
        <label>
          Reviewee: {this.props.reviewee}
          <Select
            value={this.state.evalscore}
            onChange={this.handleChangeOptions}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </Select>
        </label>

        <TextareaWrapper>
          Field 1
          <br />
          <Textarea
            name="field1"
            value={this.state.field1}
            onChange={this.handleChangeTextarea}
          />
        </TextareaWrapper>

        <TextareaWrapper>
          Field 2
          <br />
          <Textarea
            name="field2"
            value={this.state.field2}
            onChange={this.handleChangeTextarea}
          />
        </TextareaWrapper>

        <TextareaWrapper>
          Field 3
          <br />
          <Textarea
            name="field3"
            value={this.state.field3}
            onChange={this.handleChangeTextarea}
          />
        </TextareaWrapper>

        <Submit type="submit" className="button-submit" onClick={this.submit}>
          Submit
        </Submit>
      </Form>
    );
  }
}

//////////
// Style
//////////
const Form = styled.form`
  display: grid;
  grid-template-row: 300px;
  grid-template-column: 1fr;
  width: 80%;
  margin: auto;
`;

const Select = styled.select`
  width: 60px;
  height: 30px;
  margin-left: 12px;
  text-align: left;
`;

const Textarea = styled.textarea`
  width: 90%;
  height: 150px;
`;

const TextareaWrapper = styled.div`
  width: 100%;
  margin: 30px auto;
`;

const Submit = styled.button`
  width: fit-content;
  height: 30px;
  text-align: left;
`;
