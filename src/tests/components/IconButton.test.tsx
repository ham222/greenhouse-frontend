import { fireEvent, render, screen } from "@testing-library/react";
import IconButton from "src/components/UI/IconButton";

describe("Icon button", () => {
  it("renders", () => {
    const mockFn = jest.fn();

    render(<IconButton onClick={mockFn} icon={<div>$</div>} />);
  });

  it("calls update function on click", () => {
    const mockFn = jest.fn();

    render(<IconButton onClick={mockFn} icon={<div>$</div>} />);

    fireEvent.click(screen.getByText("$"));

    expect(mockFn).toHaveBeenCalledTimes(1);
  });
});
