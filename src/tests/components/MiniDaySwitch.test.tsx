import { fireEvent, render, screen } from "@testing-library/react";
import MiniDaySwitch from "src/components/UI/MiniDaySwitch";
import { WeekDay } from "src/domain/WeekDay";
import "@testing-library/jest-dom";

describe("MiniDayPicker", () => {
  let mockUpdateValue: jest.Mock;
  let mockValue: boolean;
  let day: WeekDay;

  beforeEach(() => {
    mockUpdateValue = jest.fn();
    day = "Tuesday";
  });

  it("renders correctly when off", () => {
    mockValue = false;
    render(
      <MiniDaySwitch
        value={mockValue}
        updateValue={mockUpdateValue}
        day={"Tuesday"}
      />
    );

    expect(screen.getByText(day.charAt(0))).toBeInTheDocument();
    expect(screen.getByText(day.charAt(0))).toHaveClass("bg-[#F2F4F5]");
  });

  it("renders correctly when on", () => {
    mockValue = true;
    render(
      <MiniDaySwitch
        value={mockValue}
        updateValue={mockUpdateValue}
        day={"Tuesday"}
      />
    );

    expect(screen.getByText(day.charAt(0))).toBeInTheDocument();
    expect(screen.getByText(day.charAt(0))).toHaveClass("bg-[#202329]");
    expect(screen.getByText(day.charAt(0))).toHaveClass("text-white");
  });

  it.each([false, true])("updates value correctly when set to %p", (value) => {
    mockValue = !value;
    render(
      <MiniDaySwitch
        value={mockValue}
        updateValue={mockUpdateValue}
        day={"Tuesday"}
      />
    );

    const miniDay = screen.getByText(day.charAt(0)) as HTMLInputElement;
    fireEvent.click(miniDay);

    expect(mockUpdateValue).toHaveBeenCalledWith(value);
  });
});
