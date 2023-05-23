import { render, screen, fireEvent } from "@testing-library/react";
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

  it("updates preset name on input change", () => {
    render(<Presets />);
    const presetNameInput = screen.getByTestId(
      "preset-name"
    ) as HTMLInputElement;
    fireEvent.change(presetNameInput, { target: { value: "New Preset" } });
    expect(presetNameInput.value).toBe("New Preset");
  });

  // it("calls addPreset when save button is clicked", () => {
  //   render(<Presets />);
  //   const saveButton = screen.getByText("Save");
  //   fireEvent.click(saveButton);
  //   expect(axios.post).toHaveBeenCalledTimes(1);
  //   expect(axios.post).toHaveBeenCalledWith(
  //     expect.stringContaining("/preset"),
  //     expect.anything()
  //   );
  // });

  // it("calls onUpdate when update button is clicked", () => {
  //   render(<Presets />);
  //   const updateButton = screen.getByText("Update");
  //   fireEvent.click(updateButton);
  //   expect(axios.put).toHaveBeenCalledTimes(1);
  //   expect(axios.put).toHaveBeenCalledWith(
  //     expect.stringContaining("/preset"),
  //     expect.anything()
  //   );
  // });

  // Add more test cases based on your component's functionality
});
