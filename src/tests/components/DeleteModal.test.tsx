import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import DeleteModal from "src/components/containers/Presets/DeleteModal";

class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

describe("DeleteModal", () => {
  window.ResizeObserver = ResizeObserver;

  it("should render correctly when open is true", () => {
    render(
      <DeleteModal
        open={true}
        onConfirmDelete={jest.fn()}
        onClose={jest.fn()}
      />
    );

    const modal = screen.getByRole("dialog");
    expect(modal).toBeInTheDocument();

    const deleteButton = screen.getByText("Delete");
    expect(deleteButton).toBeInTheDocument();

    const cancelButton = screen.getByText("Cancel");
    expect(cancelButton).toBeInTheDocument();
  });

  it("should call onConfirmDelete and onClose when the delete button is clicked", () => {
    const onConfirmDelete = jest.fn();
    const onClose = jest.fn();

    render(
      <DeleteModal
        open={true}
        onConfirmDelete={onConfirmDelete}
        onClose={onClose}
      />
    );

    const deleteButton = screen.getByText("Delete");
    fireEvent.click(deleteButton);

    expect(onConfirmDelete).toHaveBeenCalled();
    expect(onClose).toHaveBeenCalled();
  });

  it("should call onClose when the cancel button is clicked", () => {
    const onClose = jest.fn();

    render(
      <DeleteModal open={true} onConfirmDelete={jest.fn()} onClose={onClose} />
    );

    const cancelButton = screen.getByText("Cancel");
    fireEvent.click(cancelButton);

    expect(onClose).toHaveBeenCalled();
  });
});
