import { render, screen } from "@testing-library/react";
import Modal from "src/components/UI/Modal";
import "@testing-library/jest-dom";

describe("Modal", () => {
  const onClose = jest.fn();

  it("renders children when open prop is true", () => {
    render(
      <Modal open={true} onClose={onClose}>
        <div>Modal content</div>
      </Modal>
    );

    expect(screen.getByText("Modal content")).toBeInTheDocument();
  });

  it("does not render children when open prop is false", () => {
    render(
      <Modal open={false} onClose={onClose}>
        <div>Modal content</div>
      </Modal>
    );

    expect(screen.queryByText("Modal content")).not.toBeInTheDocument();
  });
});
