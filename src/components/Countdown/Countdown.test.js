import React from "react";
import Countdown from "./index";
import { getByText, render, screen } from "@testing-library/react";
import { toHaveStyle } from "@testing-library/jest-dom";
import { act } from "react-dom/test-utils";

const mockCountTime = 20;
const mockIsCounting = jest.fn();
const mockFontSize = 10;
const mockTop = 10;
const mockLeft = 10;

describe("<Countdown /> 컴포넌트", () => {
  beforeEach(() => {
    render(
      <Countdown
        count={mockCountTime}
        setCount={mockIsCounting}
        fontSize={mockFontSize}
        top={mockTop}
        left={mockLeft}
      />
    );
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  it("Countdown 컴포넌트에 시작시간을 주면 해당 시간부터 카운트다운이 시작된다.", () => {
    expect(screen.getByText(20)).toBeDefined();
  });

  it("일정시간 후에는 다른 숫자가 보여야한다.", () => {
    jest.useFakeTimers();

    render(
      <Countdown
        count={mockCountTime}
        setCount={mockIsCounting}
        fontSize={mockFontSize}
        top={mockTop}
        left={mockLeft}
      />
    );

    act(() => {
      jest.advanceTimersByTime(5000);
    });

    expect(screen.getByText(15)).toBeDefined();
  });

  it("카운트다운이 끝나면 숫자가 0이 되어야 한다.", () => {
    jest.useFakeTimers();

    act(() => {
      jest.advanceTimersByTime(20000);
    });

    expect(screen.getByText(0)).toBeDefined();
  });

  it("Countdown 컴포넌트에 style props를 주면 해당 style값을 갖는다.", () => {
    expect(screen.getByText(20)).toHaveStyle(`top: ${mockTop}`);
    expect(screen.getByText(20)).toHaveStyle(`left: ${mockLeft}`);
  });
});
