import { render, screen, fireEvent } from "@testing-library/react";
import HourPicker from "src/components/UI/HourPicker";
import { DateTime } from "luxon";

describe("HourPicker component", () => {
  let mockUpdateValue: jest.Mock;
  let mockValue: DateTime;

  beforeEach(() => {
    mockValue = DateTime.fromObject({ hour: 9, minute: 30 });
    mockUpdateValue = jest.fn();
  });

  test("renders correctly with initial value", () => {
    render(<HourPicker updateValue={mockUpdateValue} value={mockValue} />);

    const hoursInput = screen.getByTestId("hour-input") as HTMLInputElement;
    const minutesInput = screen.getByTestId("minute-input") as HTMLInputElement;

    expect(hoursInput.value).toEqual("09");
    expect(screen.getByText(":")).toBeDefined();
    expect(minutesInput.value).toEqual("30");
  });

  test("updates hours correctly", () => {
    render(<HourPicker updateValue={mockUpdateValue} value={mockValue} />);

    const hoursInput = screen.getByTestId("hour-input") as HTMLInputElement;
    fireEvent.change(hoursInput, { target: { value: 13 } });

    expect(mockUpdateValue).toHaveBeenCalledWith(
      expect.objectContaining({
        hour: 13,
        minute: 30,
      })
    );
  });

  test("updates minutes correctly", () => {
    render(<HourPicker updateValue={mockUpdateValue} value={mockValue} />);

    const minutesInput = screen.getByTestId("minute-input") as HTMLInputElement;
    fireEvent.change(minutesInput, { target: { value: 5 } });

    expect(mockUpdateValue).toHaveBeenCalledWith(
      expect.objectContaining({
        hour: 9,
        minute: 5,
      })
    );
  });

  test.each([25, -1, "string"])(
    "does not update hours with invalid input: %p",
    (invalid) => {
      render(<HourPicker updateValue={mockUpdateValue} value={mockValue} />);

      const hoursInput = screen.getByTestId("hour-input") as HTMLInputElement;
      fireEvent.change(hoursInput, { target: { value: invalid } });

      expect(mockUpdateValue).not.toHaveBeenCalled();
    }
  );

  test.each([61, -1, "string"])(
    "does not update minutes with invalid input: %p",
    (invalid) => {
      render(<HourPicker updateValue={mockUpdateValue} value={mockValue} />);

      const minutesInput = screen.getByTestId(
        "minute-input"
      ) as HTMLInputElement;
      fireEvent.change(minutesInput, { target: { value: invalid } });

      expect(mockUpdateValue).not.toHaveBeenCalled();
    }
  );
});
