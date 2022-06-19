import React from "react";
import TextBox from "./TextBox";
import { render, screen } from "@testing-library/react";
import { toHaveStyle } from "@testing-library/jest-dom";

const mockMessage = "Test Message";
const mockTop = 10;

beforeEach(() => {
  render(<TextBox message={mockMessage} top={mockTop} />);
});

describe("<TextBox /> 컴포넌트", () => {
  it("TextBox 컴포넌트에 message props를 주면 해당 message를 나타낸다.", () => {
    expect(screen.getByText(mockMessage)).toBeInTheDocument();
  });

  it("TextBox 컴포넌트에 top props를 주면 해당 top값을 style로 갖는다.", () => {
    const component = screen.getByText(mockMessage);

    expect(component).toHaveStyle(`top: ${mockTop}`);
  });
});
