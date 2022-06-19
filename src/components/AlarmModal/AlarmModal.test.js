import React from "react";
import AlarmModal from "./index";
import { render, screen } from "@testing-library/react";
import toBeInTheDocument from "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

const mockFn = jest.fn();
const mockMessage = "Mock Message";

beforeEach(() => {
  render(<AlarmModal setOpenModal={mockFn} message={mockMessage} />);
});

describe("<AlarmModal /> 컴포넌트", () => {
  it("AlarmModal 컴포넌트에 message props를 주면, 해당 메세지를 나타낸다.", () => {
    expect(screen.getByText(mockMessage)).toBeInTheDocument();
  });

  it("AlarmModal을 클릭하면, setOpenModal prop로 받은 함수가 실행된다.", () => {
    const component = document.querySelector(".alarm-modal");

    userEvent.click(component);

    expect(mockFn).toHaveBeenCalled();
  });
});
