import { render, screen, fireEvent } from "@testing-library/react";
import DurationPicker from "src/components/UI/DurationPicker";

describe("DurationPicker component", () => {
  let mockUpdateValue: jest.Mock;
  let mockValue: number;

  beforeEach(() => {
    mockValue = 5;
    mockUpdateValue = jest.fn();
  });

  it("renders correctly with initial value", () => {
    render(<DurationPicker updateValue={mockUpdateValue} value={mockValue} />);

    const minutesInput = screen.getByTestId(
      "minute-duration"
    ) as HTMLInputElement;

    expect(minutesInput.value).toEqual(mockValue.toString());
  });

  it("updates duration correctly", () => {
    render(<DurationPicker updateValue={mockUpdateValue} value={mockValue} />);

    const minutesInput = screen.getByTestId(
      "minute-duration"
    ) as HTMLInputElement;

    fireEvent.change(minutesInput, { target: { value: 13 } });

    expect(mockUpdateValue).toHaveBeenCalledWith(13);
  });

  it.each([601, -1])(
    "does not update duration with invalid input: %p",
    (invalid) => {
      render(
        <DurationPicker updateValue={mockUpdateValue} value={mockValue} />
      );

      const minutesInput = screen.getByTestId(
        "minute-duration"
      ) as HTMLInputElement;

      fireEvent.input(minutesInput, { target: { value: invalid } });

      expect(mockUpdateValue).not.toHaveBeenCalled();
    }
  );
});
