import React from "react";
import MatchResultModal from "./index";
import { render, screen } from "@testing-library/react";
import toBeInTheDocument from "@testing-library/jest-dom";

const mockFn = jest.fn();
const mockKillCount = 2;

beforeEach(() => {
  render(<MatchResultModal setIsGameOver={mockFn} killCount={mockKillCount} />);
});

describe("<MatchResultModal /> 컴포넌트", () => {
  it("MatchResultModal 컴포넌트에 killCount props를 주면, 해당 카운트를 보여준다.", () => {
    expect(screen.getByText(`Your kill: ${mockKillCount}`)).toBeInTheDocument();
  });
});
