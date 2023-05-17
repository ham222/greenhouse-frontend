import { render, screen } from "@testing-library/react";
import Modal from "src/components/UI/Modal";

describe("Modal", () => {
  const onClose = jest.fn();

  it("renders children when open prop is true", async () => {
    render(
      <Modal title="Modal title" open={true} onClose={onClose}>
        <div>Modal content</div>
      </Modal>
    );
    expect(screen.getByText("Modal title")).toBeInTheDocument();
    expect(screen.getByText("Modal content")).toBeInTheDocument();
  });

  it("does not render children when open prop is false", async () => {
    render(
      <Modal title="Modal title" open={false} onClose={onClose}>
        <div>Modal content</div>
      </Modal>
    );
    expect(screen.queryByText("Modal content")).not.toBeInTheDocument();
    expect(screen.queryByText("Modal title")).not.toBeInTheDocument();
  });
});
