import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import Preset from "src/components/containers/Presets/Preset";

jest.mock("axios");

describe("Preset", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test("renders preset name input", () => {
    render(<Preset />);
    const presetNameInput = screen.getByTestId(
      "name-input"
    ) as HTMLInputElement;
    expect(presetNameInput).toBeInTheDocument();
  });

  test("updates preset name input value", () => {
    render(<Preset />);
    const presetNameInput = screen.getByTestId(
      "name-input"
    ) as HTMLInputElement;

    fireEvent.change(presetNameInput, { target: { value: "Test Preset" } });
    expect(presetNameInput.value).toBe("Test Preset");
  });

  test("calls addPreset and fetchData when save button is clicked", async () => {
    const mockPost = axios.post as jest.Mock;
    const mockGet = axios.get as jest.Mock;

    mockPost.mockResolvedValueOnce({ data: {} });
    mockGet.mockResolvedValueOnce({ data: [] });

    render(<Preset />);
    const saveButton = screen.getByText("Save");
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(mockPost).toHaveBeenCalledTimes(1);
      expect(mockGet).toHaveBeenCalledTimes(1);
    });
  });

  test('renders all presets modal when "See all presets" button is clicked', () => {
    render(<Preset />);
    const seeAllPresetsButton = screen.getByText("See all presets");
    fireEvent.click(seeAllPresetsButton);
    const modal = screen.getByTestId("all-presets-modal");
    expect(modal).toBeInTheDocument();
  });
});
