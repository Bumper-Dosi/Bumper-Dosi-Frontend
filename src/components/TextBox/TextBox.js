import React from "react";
import styled from "styled-components";

const TextBoxLayout = styled.div`
  position: absolute;
  top: 20%;
  top: ${(props) => props.top};
  right: 5%;

  font-size: 20px;
  font-weight: bold;
  text-shadow: -1px 0 #000, 0 1px #000, 1px 0 #000, 0 -1px #000;
  color: white;
  white-space: pre-line;
`;

function TextBox({ message, top }) {
  return (
    <TextBoxLayout style={{ top: `${top}` }}>
      <pre>{message}</pre>
    </TextBoxLayout>
  );
}

export default TextBox;
