import * as React from "react";

import styled from "styled-components";

export interface GreetingProps {
  username: string;
}

export default class Greeting extends React.Component<GreetingProps> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Message>
        Hello,{this.props.username}
        <br />
        <br />
        Some information could be here.
      </Message>
    );
  }
}

//////////
// Style
//////////
const Message = styled.div`
  display: block;
  padding: 30px 15% 30px 20%;
`;
