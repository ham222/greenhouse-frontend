import { fireEvent, render, screen } from "@testing-library/react";
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

  it("calls the onPresetClick callback when a preset item is clicked", () => {
    const onPresetClick = jest.fn();

    render(
      <ViewAllPresetsModal
        open={true}
        onClose={() => {}}
        presets={[{ id: 1, name: "Preset 1" }]}
        onPresetClick={onPresetClick}
        onCreateNewClick={() => {}}
        onDeletePreset={() => {}}
      />
    );

    fireEvent.click(screen.getByTestId("preset-item"));

    expect(onPresetClick).toHaveBeenCalledTimes(1);
  });

  it("calls the onCreateNewClick callback when 'Create new Preset' button is clicked", () => {
    const onCreateNewClick = jest.fn();

    render(
      <ViewAllPresetsModal
        open={true}
        onClose={() => {}}
        presets={[]}
        onPresetClick={() => {}}
        onCreateNewClick={onCreateNewClick}
        onDeletePreset={() => {}}
      />
    );

    fireEvent.click(screen.getByText("Create new Preset"));

    expect(onCreateNewClick).toHaveBeenCalledTimes(1);
  });

  it("calls the onClose callback when 'Go Back' button is clicked", () => {
    const onClose = jest.fn();

    render(
      <ViewAllPresetsModal
        open={true}
        onClose={onClose}
        presets={[]}
        onPresetClick={() => {}}
        onCreateNewClick={() => {}}
        onDeletePreset={() => {}}
      />
    );

    fireEvent.click(screen.getByText("Go Back"));

    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
