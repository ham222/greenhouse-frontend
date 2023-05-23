import { render, screen } from "@testing-library/react";
import Presets from "src/components/containers/Presets/Presets";

describe("Presets", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders preset name input", () => {
    render(<Presets />);
    const presetNameInput = screen.getByTestId(
      "preset-name"
    ) as HTMLInputElement;
    expect(presetNameInput).toBeInTheDocument();
  });
});
