import { fireEvent, render, screen } from "@testing-library/react";
import Toggle from "src/components/UI/Toggle";

describe("Toggle", () => {
  let mockUpdateValue: jest.Mock;
  let mockValue: boolean;

  beforeEach(() => {
    mockUpdateValue = jest.fn();
  });

  it("renders correctly when off", () => {
    mockValue = false;
    render(<Toggle value={mockValue} updateValue={mockUpdateValue} />);
    const toggle = screen.getByRole("switch");
    expect(toggle).toBeInTheDocument();
    expect(toggle).not.toBeChecked();
    expect(toggle).toHaveClass("bg-stone-400");
  });

  it("renders correctly when on", () => {
    mockValue = true;
    render(<Toggle value={mockValue} updateValue={mockUpdateValue} />);
    const toggle = screen.getByRole("switch");
    expect(toggle).toBeInTheDocument();
    expect(toggle).toBeChecked();
    expect(toggle).toHaveClass("bg-neon");
  });

  it.each([false, true])("updates value correctly when set to %p", (value) => {
    mockValue = !value;
    render(<Toggle value={mockValue} updateValue={mockUpdateValue} />);
    let toggle = screen.getByRole("switch");
    fireEvent.click(toggle);
    expect(mockUpdateValue).toHaveBeenCalledWith(value);
  });
});
