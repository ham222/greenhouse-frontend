import { render, screen, fireEvent } from "@testing-library/react";
import ViewAllPresetsModal from "src/components/containers/Presets/ViewAllPresetsModal";

class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

describe("ViewAllPresetsModal", () => {
  window.ResizeObserver = ResizeObserver;

  it("renders the modal when open prop is true", () => {
    render(
      <ViewAllPresetsModal
        open={true}
        onClose={() => {}}
        presets={[]}
        onPresetClick={() => {}}
        onCreateNewClick={() => {}}
        onDeletePreset={() => {}}
      />
    );

    expect(screen.getByTestId("modal-small-screen")).toBeInTheDocument();
  });

  it("does not render the modal when open prop is false", () => {
    render(
      <ViewAllPresetsModal
        open={false}
        onClose={() => {}}
        presets={[]}
        onPresetClick={() => {}}
        onCreateNewClick={() => {}}
        onDeletePreset={() => {}}
      />
    );

    expect(screen.queryByTestId("modal-small-screen")).toBeNull();
  });

  it("renders preset items based on the presets prop", () => {
    const presets = [
      { id: 1, name: "Preset 1" },
      { id: 2, name: "Preset 2" },
    ];

    render(
      <ViewAllPresetsModal
        open={true}
        onClose={() => {}}
        presets={presets}
        onPresetClick={() => {}}
        onCreateNewClick={() => {}}
        onDeletePreset={() => {}}
      />
    );

    expect(screen.getAllByTestId("preset-item")).toHaveLength(2);
  });
});
